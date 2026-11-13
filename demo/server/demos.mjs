// CRUD das demos (PLANO-V2 §4 e §5). Registro: demo/<id>.
// Acessos do visitante: no máximo uma chave por sessão a cada 10 min, em acessos/<id>/<janela>-<sid>
// (janela = início do bloco de 10 min, 13 dígitos; sid = id da sessão no cookie). A chave é sempre a
// mesma dentro da janela, então GETs paralelos da mesma sessão gravam uma vez só; nunca regrava
// demo/<id> (não desfaz uma edição do admin feita ao mesmo tempo). A listagem do admin compacta: soma
// as chaves com mais de 20 min em acessos_resumo/<id> {total, ultimo_acesso, ate} e apaga as somadas
// (`ate` = última chave somada; chaves <= ate não contam de novo, mesmo se o apagar falhar no meio).

import { randomBytes, randomInt } from 'node:crypto';
import { hashSenha } from './auth.mjs';
import { SETOR_IDS, pacote, normalizaModulos } from './catalogo.mjs';

const ALFABETO = 'abcdefghijklmnopqrstuvwxyz234567';
export const ID_RE = /^[a-z2-7]{12}$/;

export function novoId() {
  return [...randomBytes(12)].map((b) => ALFABETO[b % 32]).join(''); // 256 % 32 = 0: sem viés
}

const PALAVRAS_A = ['torno', 'fresa', 'prensa', 'forja', 'solda', 'tear', 'molde', 'lixa', 'broca', 'rosca', 'polia', 'eixo', 'mola', 'trilho', 'fio', 'lote'];
const PALAVRAS_B = ['mare', 'serra', 'vento', 'rio', 'sol', 'lua', 'ipe', 'cedro', 'pinho', 'ponte', 'vale', 'praia', 'campo', 'trigo', 'milho', 'neve'];

/** Senha legível, sem acento: palavra-NNNN-palavra (ex.: torno-4821-mare). */
export function novaSenha() {
  const a = PALAVRAS_A[randomInt(PALAVRAS_A.length)];
  const b = PALAVRAS_B[randomInt(PALAVRAS_B.length)];
  return `${a}-${String(randomInt(10000)).padStart(4, '0')}-${b}`;
}

export class ErroValidacao extends Error {}
const falha = (msg) => { throw new ErroValidacao(msg); };

const limpa = (v) => String(v ?? '').replace(/[\u0000-\u0008\u000b-\u001f\u007f​-‏‪-‮⁦-⁩]/g, '').trim();

function texto(v, campo, max, { obrigatorio = false } = {}) {
  if (v == null || v === '') { if (obrigatorio) falha(`Informe ${campo}`); return ''; }
  if (typeof v !== 'string') falha(`${campo} deve ser texto`);
  const t = limpa(v);
  if (obrigatorio && !t) falha(`Informe ${campo}`);
  if (t.length > max) falha(`${campo}: no máximo ${max} caracteres`);
  return t;
}

function data(v) {
  if (v == null || v === '') return null;
  if (typeof v !== 'string') falha('expira_em deve ser uma data (AAAA-MM-DD) ou null');
  const m = /^(\d{4}-\d{2}-\d{2})(T.*)?$/.exec(v);
  const t = Date.parse(m && !m[2] ? `${m[1]}T23:59:59-03:00` : v); // data pura = fim do dia em Brasília
  if (!m || isNaN(t)) falha('expira_em deve ser uma data (AAAA-MM-DD) ou null');
  return new Date(t).toISOString();
}

function senhaValida(s) {
  if (typeof s !== 'string') falha('senha deve ser texto');
  if (s.length < 6 || s.length > 128) falha('A senha deve ter de 6 a 128 caracteres');
  return s;
}

export const publica = (d) => {
  if (!d) return null;
  const { senha, senha_v, ...resto } = d; // nunca devolve o hash
  return resto;
};

export function disponivel(d, agora = Date.now()) {
  return !!d && d.ativo !== false && !(d.expira_em && Date.parse(d.expira_em) < agora);
}

export const getDemo = (store, id) => (ID_RE.test(String(id)) ? store.get(`demo/${id}`) : null);

export async function criaDemo(store, body) {
  const nome = texto(body.nome, 'nome', 120, { obrigatorio: true });
  const setor = String(body.setor ?? '');
  if (!SETOR_IDS.includes(setor)) falha('Setor desconhecido');
  let modulos;
  try { modulos = normalizaModulos(body.modulos); } catch (e) { falha(e.message); }
  const senha = body.senha ? senhaValida(body.senha) : novaSenha();
  let id;
  do { id = novoId(); } while (await store.get(`demo/${id}`));
  const d = {
    id, nome, setor,
    empresa_nome: texto(body.empresa_nome, 'empresa_nome', 120) || pacote(setor).empresa?.nome || '',
    modulos,
    senha: await hashSenha(senha), senha_v: 1,
    ativo: true,
    criado_em: new Date().toISOString(),
    expira_em: data(body.expira_em),
    nota: texto(body.nota, 'nota', 2000),
    acessos: 0, ultimo_acesso: null,
  };
  await store.set(`demo/${id}`, d);
  return { demo: publica(d), senha };
}

export async function editaDemo(store, id, body) {
  const d = await getDemo(store, id);
  if (!d) return null;
  if ('nome' in body) d.nome = texto(body.nome, 'nome', 120, { obrigatorio: true });
  if ('setor' in body) {
    if (!SETOR_IDS.includes(String(body.setor))) falha('Setor desconhecido');
    if (body.setor !== d.setor && !('empresa_nome' in body) && d.empresa_nome === pacote(d.setor)?.empresa?.nome) {
      d.empresa_nome = pacote(body.setor).empresa?.nome ?? '';
    }
    d.setor = body.setor;
  }
  if ('empresa_nome' in body) d.empresa_nome = texto(body.empresa_nome, 'empresa_nome', 120) || pacote(d.setor).empresa?.nome || '';
  if ('modulos' in body) {
    try { d.modulos = normalizaModulos({ ...d.modulos, ...(body.modulos ?? {}) }); } catch (e) { falha(e.message); }
  }
  if ('ativo' in body) { if (typeof body.ativo !== 'boolean') falha('ativo deve ser true ou false'); d.ativo = body.ativo; }
  if ('expira_em' in body) d.expira_em = data(body.expira_em);
  if ('nota' in body) d.nota = texto(body.nota, 'nota', 2000);
  let senha;
  if (body.nova_senha === true) senha = novaSenha();
  else if (body.nova_senha != null && body.nova_senha !== false) senha = senhaValida(body.nova_senha);
  if (senha) { d.senha = await hashSenha(senha); d.senha_v = (d.senha_v ?? 1) + 1; } // senha_v invalida sessões antigas
  d.atualizado_em = new Date().toISOString();
  await store.set(`demo/${id}`, d);
  const demo = publica(await comAcessos(store, d, await store.list(`acessos/${id}/`))); // o painel mescla a resposta na linha
  return senha ? { demo, senha } : { demo };
}

const LOTE = 50;
/** Apaga as chaves em lotes de LOTE (não abre centenas de requisições de uma vez no Blobs). */
async function apagaEmLotes(store, chaves) {
  for (let i = 0; i < chaves.length; i += LOTE) await Promise.all(chaves.slice(i, i + LOTE).map((k) => store.delete(k)));
}

/**
 * Apaga a demo e tudo dela. O registro demo/<id> sai PRIMEIRO: se algo falhar no meio, o link já está
 * morto (sobram chaves órfãs; a listagem do admin limpa as de aprendizado e de acessos).
 */
export async function apagaDemo(store, id) {
  const d = await getDemo(store, id);
  if (!d) return false;
  await store.delete(`demo/${id}`);
  const chaves = (await Promise.all(['aprendizado', 'uso', 'tentativas', 'acessos'].map((p) => store.list(`${p}/${id}/`)))).flat();
  await apagaEmLotes(store, [...chaves, `acessos_resumo/${id}`]);
  return true;
}

export const JANELA_ACESSO = 10 * 60 * 1000;
const COMPACTA_APOS = 2 * JANELA_ACESSO; // a janela anterior à atual fica: registraAcesso consulta

/** Hora (ms) de uma chave acessos/<id>/<ts>-<…> (início da janela; nas chaves antigas, a hora do acesso), ou NaN. */
const tsDaChave = (k) => Number(String(k).split('/')[2]?.split('-')[0]);
const isoMax = (a, b) => (!a ? b ?? null : !b ? a : Date.parse(b) > Date.parse(a) ? b : a);
const resumoVazio = () => ({ total: 0, ultimo_acesso: null, ate: '' });

/** Hora do último acesso numa lista de chaves (lê o valor da mais recente: a chave só tem a janela). */
async function ultimoDe(store, chaves) {
  const k = chaves.at(-1);
  if (!k) return null;
  const v = await store.get(k).catch(() => null);
  if (v?.em && !isNaN(Date.parse(v.em))) return v.em;
  const t = tsDaChave(k);
  return Number.isFinite(t) ? new Date(t).toISOString() : null;
}

/** Junta os campos legados do registro (acessos, ultimo_acesso), o resumo e as chaves ainda não somadas. */
async function comAcessos(store, d, chaves, resumo) {
  const r = resumo ?? (await store.get(`acessos_resumo/${d.id}`)) ?? resumoVazio();
  const novas = chaves.filter((k) => k > (r.ate ?? ''));
  const ultimo = isoMax(isoMax(d.ultimo_acesso ?? null, r.ultimo_acesso ?? null), await ultimoDe(store, novas));
  return { ...d, acessos: (d.acessos ?? 0) + (r.total ?? 0) + novas.length, ultimo_acesso: ultimo };
}

/**
 * Compacta os acessos de uma demo (só na listagem do admin): soma em acessos_resumo/<id> as chaves com
 * mais de 20 min e as apaga. Idempotente: duas listagens ao mesmo tempo gravam o mesmo resumo, e o
 * `ate` impede somar de novo uma chave que ficou para trás. → {resumo, restantes}
 */
async function compactaAcessos(store, id, chaves) {
  const k = `acessos_resumo/${id}`;
  const r = (await store.get(k)) ?? resumoVazio();
  const ate = r.ate ?? '';
  const limite = Date.now() - COMPACTA_APOS;
  const jaSomadas = chaves.filter((c) => c <= ate);
  const velhas = chaves.filter((c) => c > ate && tsDaChave(c) < limite);
  let resumo = r;
  if (velhas.length) {
    resumo = { total: (r.total ?? 0) + velhas.length, ultimo_acesso: isoMax(r.ultimo_acesso ?? null, await ultimoDe(store, velhas)), ate: velhas.at(-1) };
    await store.set(k, resumo);
  }
  if (jaSomadas.length || velhas.length) await apagaEmLotes(store, [...jaSomadas, ...velhas]).catch(() => {});
  const fora = new Set([...jaSomadas, ...velhas]);
  return { resumo, restantes: chaves.filter((c) => !fora.has(c)) };
}

/** Demo com a contagem de acessos agregada (GET /api/admin/demos/<id>). */
export async function demoComAcessos(store, id) {
  const d = await getDemo(store, id);
  return d ? comAcessos(store, d, await store.list(`acessos/${id}/`)) : null;
}

/** Listagem do admin: agrega e compacta os acessos; limpa chaves órfãs (demo apagada) de acessos e aprendizado. */
export async function listaDemos(store) {
  const [chaves, apr, acessos] = await Promise.all([store.list('demo/'), store.list('aprendizado/'), store.list('acessos/')]);
  const demos = (await Promise.all(chaves.map((k) => store.get(k)))).filter(Boolean);
  const ids = new Set(chaves.map((k) => k.split('/')[1]));
  const qtd = {};
  const orfas = [];
  for (const k of apr) { const id = k.split('/')[1]; if (ids.has(id)) qtd[id] = (qtd[id] ?? 0) + 1; else orfas.push(k); }
  const porDemo = {};
  for (const k of acessos) { const id = k.split('/')[1]; if (ids.has(id)) (porDemo[id] ??= []).push(k); else orfas.push(k); }
  if (orfas.length) await apagaEmLotes(store, orfas).catch(() => {});
  const linhas = await Promise.all(demos.map(async (d) => {
    const { resumo, restantes } = await compactaAcessos(store, d.id, porDemo[d.id] ?? []);
    return { ...publica(await comAcessos(store, d, restantes, resumo)), aprendizado_qtd: qtd[d.id] ?? 0, url: `/demo/${d.id}`, disponivel: disponivel(d) };
  }));
  return linhas.sort((a, b) => (b.criado_em ?? '').localeCompare(a.criado_em ?? ''));
}

const SID_RE = /^[a-z0-9]{6,16}$/;

/**
 * Conta um acesso (GET /estado de visitante), no máximo um por sessão (`sid`) a cada 10 min: a chave
 * acessos/<id>/<janela>-<sid> é a mesma dentro da janela de 10 min (GETs paralelos gravam uma vez), e
 * se a janela anterior já tem acesso há menos de 10 min, não grava. O registro da demo não é lido nem
 * regravado aqui. → true se gravou.
 */
export async function registraAcesso(store, id, sid) {
  if (!ID_RE.test(String(id))) return false;
  const s = SID_RE.test(String(sid ?? '')) ? sid : randomBytes(6).toString('hex');
  const agora = Date.now();
  const janela = Math.floor(agora / JANELA_ACESSO) * JANELA_ACESSO;
  const chave = (t) => `acessos/${id}/${String(t).padStart(13, '0')}-${s}`;
  if (await store.get(chave(janela))) return false;
  const anterior = await store.get(chave(janela - JANELA_ACESSO));
  if (anterior?.em && agora - Date.parse(anterior.em) < JANELA_ACESSO) return false;
  await store.set(chave(janela), { em: new Date(agora).toISOString() });
  return true;
}
