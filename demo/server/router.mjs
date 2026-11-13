// Roteador da API da demo: handle(request, {env, store, fetch?}) → Response.
// Usado pela Netlify Function (netlify/functions/demo-api.mjs) e pelo servidor de dev (demo/scripts/serve.mjs).
// Contrato: demo/PLANO-V2.md §5.

import { randomBytes } from 'node:crypto';
import {
  confereSenha, igualConstante, assina, confere, impressao, leCookies, cookie, apagaCookie, checaOrigem, espera,
} from './auth.mjs';
import {
  getDemo, demoComAcessos, criaDemo, editaDemo, apagaDemo, listaDemos, registraAcesso, disponivel, publica, ErroValidacao, ID_RE,
} from './demos.mjs';
import { listaAprendizado, criaAprendizado, apagaAprendizado, zeraAprendizado } from './learning.mjs';
import { conversa, iaInfo, ErroConversa } from './ai.mjs';
import { pacote, SETORES, MODULOS, AREAS } from './catalogo.mjs';
import { TIPOS } from './learning.mjs';

const LIMITE_CORPO = 64 * 1024;
const LIMITE_CONVERSA = 200 * 1024;
const TTL_DEMO = 12 * 3600 * 1000;
const TTL_ADMIN = 8 * 3600 * 1000;
const ATRASO_FALHA = 400;
const MAX_FALHAS_HORA = 20;
const INVALIDO = 'Link ou senha inválidos';
const DESATIVADO = 'Este link foi desativado ou expirou.';

const BASE_HEADERS = {
  'cache-control': 'no-store',
  'x-robots-tag': 'noindex, nofollow, noarchive',
  'x-content-type-options': 'nosniff',
  'referrer-policy': 'no-referrer',
};

export function json(dados, status = 200, extra = {}) {
  const h = new Headers({ ...BASE_HEADERS, 'content-type': 'application/json; charset=utf-8' });
  for (const [k, v] of Object.entries(extra)) {
    if (Array.isArray(v)) for (const x of v) h.append(k, x); else h.set(k, v);
  }
  return new Response(JSON.stringify(dados), { status, headers: h });
}
const erro = (status, mensagem, extra) => json({ erro: mensagem }, status, extra);

class ErroHttp extends Error { constructor(status, msg) { super(msg); this.status = status; } }

async function leCorpo(request, limite) {
  const cl = Number(request.headers.get('content-length') ?? 0);
  if (cl > limite) throw new ErroHttp(413, 'Requisição grande demais');
  const txt = await request.text();
  if (Buffer.byteLength(txt) > limite) throw new ErroHttp(413, 'Requisição grande demais');
  if (!txt) return {};
  try {
    const v = JSON.parse(txt);
    if (!v || typeof v !== 'object' || Array.isArray(v)) throw new Error();
    return v;
  } catch { throw new ErroHttp(400, 'JSON inválido'); }
}

/* ------------------------------------------------------------------ */
/* Sessões                                                             */
/* ------------------------------------------------------------------ */

// Segredo curto = sessões forjáveis por força bruta: trata como ausente (falha fechado, 503).
const segredoDe = (env) => (String(env.DEMO_SESSION_SECRET ?? '').length >= 32 ? env.DEMO_SESSION_SECRET : null);

function sessaoAdmin(request, env) {
  const segredo = segredoDe(env);
  if (!segredo || !env.DEMO_ADMIN_PASSWORD) return false;
  const p = confere(leCookies(request).ta, segredo);
  return !!p && p.t === 'admin' && p.ph === impressao(segredo, env.DEMO_ADMIN_PASSWORD);
}

/** → {demo, admin:bool} ou null. Admin logado abre qualquer demo (sem contar acesso). */
async function sessaoDemo(request, env, store, id) {
  const segredo = segredoDe(env);
  if (!ID_RE.test(id)) return null;
  const admin = sessaoAdmin(request, env);
  const p = admin ? null : confere(leCookies(request)[`td_${id}`], segredo);
  if (!admin && (!p || p.t !== 'demo' || p.id !== id)) return null;
  const d = await getDemo(store, id);
  if (!d) return null;
  if (admin) return { demo: d, admin: true };
  if (!disponivel(d) || p.sv !== (d.senha_v ?? 1)) return null;
  // sessões de antes do sid: a impressão do próprio token faz o papel
  return { demo: d, admin: false, sid: typeof p.sid === 'string' && /^[a-f0-9]{12}$/.test(p.sid) ? p.sid : impressao(segredo, leCookies(request)[`td_${id}`]).replace(/[^a-z0-9]/gi, '').slice(0, 12).toLowerCase() };
}

/**
 * O cookie td_<id> é válido, assinado para esta demo e da senha atual, mas a demo existe e está
 * desativada ou expirada? (só aí o /estado responde 410; qualquer outra falha continua 401)
 */
async function sessaoDeDemoIndisponivel(request, segredo, store, id) {
  if (!ID_RE.test(id)) return false;
  const p = confere(leCookies(request)[`td_${id}`], segredo);
  if (!p || p.t !== 'demo' || p.id !== id) return false;
  const d = await getDemo(store, id);
  return !!d && !disponivel(d) && p.sv === (d.senha_v ?? 1);
}

/* ------------------------------------------------------------------ */
/* Rotas                                                               */
/* ------------------------------------------------------------------ */

async function rotaDemo(request, env, store, partes, deps) {
  const [id, recurso, sub] = partes;
  const m = request.method;
  const segredo = segredoDe(env);
  if (!segredo) return erro(503, 'Configure DEMO_SESSION_SECRET (32+ caracteres) na Netlify');

  if (recurso === 'entrar' && m === 'POST' && !sub) {
    const body = await leCorpo(request, LIMITE_CORPO);
    const d = ID_RE.test(id) ? await getDemo(store, id) : null;
    // Limite de tentativas erradas por demo e por hora (a senha legível tem ~21 bits): passou do
    // limite, responde igual a senha errada. Cada falha é uma chave própria (sem corrida de
    // ler-somar-gravar entre requisições paralelas). Id inexistente não grava nada. As janelas de
    // horas anteriores não contam mais: são apagadas aqui mesmo.
    const hora = Math.floor(Date.now() / 3600e3);
    let falhas = 0;
    if (d) {
      const chaves = await store.list(`tentativas/${id}/`);
      const daHora = (k) => Number(k.split('/')[2]?.split('-')[0]);
      const velhas = chaves.filter((k) => daHora(k) < hora);
      falhas = chaves.filter((k) => daHora(k) >= hora).length;
      if (velhas.length) await Promise.all(velhas.map((k) => store.delete(k).catch(() => {})));
    }
    const ok = await confereSenha(typeof body.senha === 'string' ? body.senha.slice(0, 200) : '', d?.senha);
    if (!ok || !disponivel(d) || falhas >= MAX_FALHAS_HORA) {
      if (d && !ok) await store.set(`tentativas/${id}/${hora}-${randomBytes(6).toString('hex')}`, { em: new Date().toISOString() });
      await espera(ATRASO_FALHA);
      // Senha certa, fora do limite de tentativas, mas a demo foi desativada ou expirou: 410, para a tela
      // dizer isso (e não "senha errada"). Só quem sabe a senha descobre que o link existiu.
      if (ok && falhas < MAX_FALHAS_HORA) return erro(410, DESATIVADO);
      return erro(401, INVALIDO);
    }
    // sid: identifica a sessão na contagem de acessos (um acesso por sessão a cada 10 min)
    const token = assina({ t: 'demo', id, sv: d.senha_v ?? 1, sid: randomBytes(6).toString('hex') }, segredo, TTL_DEMO);
    return json({ ok: true }, 200, { 'set-cookie': cookie(request, `td_${id}`, token, TTL_DEMO / 1000) });
  }
  if (recurso === 'sair' && m === 'POST' && !sub) {
    return json({ ok: true }, 200, { 'set-cookie': apagaCookie(request, `td_${ID_RE.test(id) ? id : 'x'}`) });
  }

  const s = await sessaoDemo(request, env, store, id);
  if (!s) {
    // C2: GET /estado com cookie válido e assinado para ESTA demo (a pessoa já tinha a senha), mas a demo foi
    // desativada ou expirou → 410, para a tela final dizer isso. Sem cookie válido continua 401 (sem enumeração).
    if (recurso === 'estado' && m === 'GET' && !sub && await sessaoDeDemoIndisponivel(request, segredo, store, id)) return erro(410, DESATIVADO);
    return erro(401, INVALIDO);
  }
  const { demo } = s;

  if (recurso === 'estado' && m === 'GET' && !sub) {
    const aprendizado = await listaAprendizado(store, id);
    if (!s.admin) await registraAcesso(store, id, s.sid);
    return json({
      demo: { id: demo.id, nome: demo.nome, setor: demo.setor, empresa_nome: demo.empresa_nome, modulos: demo.modulos },
      setor: pacote(demo.setor),
      aprendizado,
      // C1: 'real' só com ANTHROPIC_API_KEY no servidor; sem ela a conversa é o motor local (o front não promete IA real)
      ia: iaInfo(env).disponivel ? 'real' : 'local',
      ia_modelo: iaInfo(env).modelo,
      admin: s.admin,
    });
  }
  if (recurso === 'aprendizado' && !sub && m === 'GET') return json(await listaAprendizado(store, id));
  if (recurso === 'aprendizado' && !sub && m === 'POST') {
    const body = await leCorpo(request, LIMITE_CORPO);
    const item = await criaAprendizado(store, id, body, 'formulario');
    return json({ item }, 201);
  }
  if (recurso === 'aprendizado' && sub && m === 'DELETE') {
    return (await apagaAprendizado(store, id, sub)) ? json({ ok: true }) : erro(404, 'Registro não encontrado');
  }
  if (recurso === 'conversa' && m === 'POST' && !sub) {
    const body = await leCorpo(request, LIMITE_CONVERSA);
    return conversa({ request, env, store, demo, body, segredo, fetch: deps.fetch });
  }
  return erro(404, 'Rota não encontrada');
}

async function rotaAdmin(request, env, store, partes) {
  const m = request.method;
  const segredo = segredoDe(env);
  if (!env.DEMO_ADMIN_PASSWORD) return erro(503, 'Configure DEMO_ADMIN_PASSWORD na Netlify');
  if (!segredo) return erro(503, 'Configure DEMO_SESSION_SECRET (32+ caracteres) na Netlify');
  const [r0, r1, r2, r3] = partes;

  if (r0 === 'entrar' && m === 'POST' && !r1) {
    const body = await leCorpo(request, LIMITE_CORPO);
    const senha = typeof body.senha === 'string' ? body.senha.slice(0, 300) : '';
    if (!igualConstante(senha, env.DEMO_ADMIN_PASSWORD)) { await espera(ATRASO_FALHA); return erro(401, 'Senha inválida'); }
    const token = assina({ t: 'admin', ph: impressao(segredo, env.DEMO_ADMIN_PASSWORD) }, segredo, TTL_ADMIN);
    return json({ ok: true, ia: iaInfo(env) }, 200, { 'set-cookie': cookie(request, 'ta', token, TTL_ADMIN / 1000) });
  }
  if (r0 === 'sair' && m === 'POST' && !r1) return json({ ok: true }, 200, { 'set-cookie': apagaCookie(request, 'ta') });

  if (!sessaoAdmin(request, env)) return erro(401, 'Entre com a senha de admin');

  if (r0 === 'sessao' && m === 'GET' && !r1) return json({ ok: true, ia: iaInfo(env) });
  if (r0 === 'opcoes' && m === 'GET' && !r1) {
    return json({ setores: SETORES, modulos: MODULOS.map(({ id, nome, sempreLigado, depende }) => ({ id, nome, sempreLigado: !!sempreLigado, depende })), areas: AREAS, tipos: TIPOS });
  }
  if (r0 === 'demos' && !r1) {
    if (m === 'GET') return json(await listaDemos(store));
    if (m === 'POST') {
      const r = await criaDemo(store, await leCorpo(request, LIMITE_CORPO));
      return json({ ...r, demo: { ...r.demo, url: `/demo/${r.demo.id}`, aprendizado_qtd: 0 } }, 201);
    }
  }
  if (r0 === 'demos' && r1 && !r2) {
    if (!ID_RE.test(r1)) return erro(404, 'Demo não encontrada');
    if (m === 'GET') {
      const d = await demoComAcessos(store, r1);
      return d ? json({ ...publica(d), url: `/demo/${d.id}`, disponivel: disponivel(d) }) : erro(404, 'Demo não encontrada');
    }
    if (m === 'PATCH') {
      const r = await editaDemo(store, r1, await leCorpo(request, LIMITE_CORPO));
      return r ? json({ ...r, demo: { ...r.demo, url: `/demo/${r1}` } }) : erro(404, 'Demo não encontrada');
    }
    if (m === 'DELETE') return (await apagaDemo(store, r1)) ? json({ ok: true }) : erro(404, 'Demo não encontrada');
  }
  if (r0 === 'demos' && r1 && r2 === 'aprendizado' && !r3) {
    if (!ID_RE.test(r1) || !(await getDemo(store, r1))) return erro(404, 'Demo não encontrada');
    if (m === 'GET') return json(await listaAprendizado(store, r1));
    if (m === 'DELETE') return json({ ok: true, apagados: await zeraAprendizado(store, r1) });
  }
  if (r0 === 'demos' && r1 && r2 === 'aprendizado' && r3 && m === 'DELETE') {
    return (await apagaAprendizado(store, r1, r3)) ? json({ ok: true }) : erro(404, 'Registro não encontrado');
  }
  return erro(404, 'Rota não encontrada');
}

/**
 * @param request  Request (Fetch API)
 * @param o {env, store, fetch?}  env: variáveis (process.env); store: FileStore/BlobsStore; fetch: injeção para testes
 */
export async function handle(request, { env = process.env, store, fetch } = {}) {
  try {
    const url = new URL(request.url);
    const partes = url.pathname.split('/').filter(Boolean).map((p) => { try { return decodeURIComponent(p); } catch { return '\u0000'; } });
    if (partes[0] !== 'api' || !['demo', 'admin'].includes(partes[1])) return erro(404, 'Rota não encontrada');
    if (partes.length > 6) return erro(404, 'Rota não encontrada');
    const csrf = checaOrigem(request);
    if (csrf) return erro(403, csrf);
    if (!store) return erro(500, 'Armazenamento indisponível');
    if (partes[1] === 'demo') {
      if (!partes[2]) return erro(404, 'Rota não encontrada');
      return await rotaDemo(request, env, store, partes.slice(2), { fetch });
    }
    return await rotaAdmin(request, env, store, partes.slice(2));
  } catch (e) {
    if (e instanceof ErroHttp) return erro(e.status, e.message);
    if (e instanceof ErroValidacao || e instanceof ErroConversa) return erro(400, e.message);
    console.error(`[demo-api] erro interno: ${e?.stack ?? e}`);
    return erro(500, 'Erro interno. Tente de novo.');
  }
}
