// A conversa com o cérebro (UX §4.5): a conversa interna da sessão, mostrada em #conversa (página) e no
// painel das áreas, e uma conversa própria por cliente do Portal (painel do portal). Streaming com linhas
// de ferramenta, Markdown seguro, fontes numeradas, Parar, erros, Copiar, "Ensinar algo sobre isso" (fora
// do Portal) e o registro pela conversa ("anota que…").
//
// Conversas ("fios"): 'interna' (todas as telas internas) e 'portal:<CLI-…>' (o Portal, por cliente do
// "Ver como"). Cada fio tem a sua chave no sessionStorage (chaveDaConversa): td_conv_<demo> e
// td_conv_<demo>:portal:<cliente>. O painel do portal mostra só o fio do cliente escolhido agora e troca
// de fio quando o "Ver como" muda (aoTrocarClientePortal); a conversa interna nunca mostra o portal.
//
// API (a casca usa createConversa se existir):
//   createConversa(getCtx) → { perguntar(texto, {modulo, perfil, enviar=true, painel}), enviar(texto, {modulo, perfil, cliente}), render(el, ctx), nova(), mensagensDe({modulo, cliente}) }
//   perguntar(ctx, texto, opts) · render(el, ctx) · sugestoesInicio(ctx, n) · montarConversa(el, ctx, {modo, modulo})
//   fioDaConversa({modulo, cliente}) · chaveDaConversa(demoId, {modulo, cliente}) · sugestoesDoPainel(ctx, modulo, cliente, n)

import { h, icon, button, iconButton, toast, copyText, sheet as uiSheet } from '../ui.js';
import { renderMarkdown, criaCitas, textoParaCopiar, markdownToText, refsDoTexto } from './markdown.js';
import { blocoFontes, citeNodeLigado, rotulosParaCopiar, atualizaQuandos, marco, ctxDoCliente } from './fontes.js';
import { abrirEnsinar, perguntaDerivada } from './ensinar.js';
import { createAssistant, clientePortalAtual, aoTrocarClientePortal } from '../ai/assistant.js';
import * as motor from '../ai/local-engine.js';
import { CONTATO_URL } from '../features.js';

/* ------------------------------------------------------------------ */
/* Estado da conversa (um por sessão)                                  */
/* ------------------------------------------------------------------ */

const S = {
  // fio → mensagens {id, role, texto, fontes, estado, ferramentas, aprendidos, desfeitos, modulo, cliente, pergunta, erro, aviso}
  fios: new Map(),
  ativo: null, // {id, ctl}
  perfil: null,
  limite: false,
  respostas: 0,
  dicaUsada: false,
  rascunho: '',
  focar: false,
  demoId: null,
};
const ouvintes = new Set();
let seq = 0;
const novoId = () => `m${Date.now().toString(36)}${(seq++).toString(36)}`;

/** avisa as views: `fio` = conversa da mensagem (null = todas, ex.: reset geral). */
function avisa(msgId, tipo = 'msg', fio = null) {
  for (const fn of [...ouvintes]) {
    try { fn(msgId, tipo, fio); } catch (e) { console.error('[conversa] view', e); }
  }
}

const FIO_INTERNO = 'interna';
/** Conversa de uma pergunta: 'portal:<cliente>' no Portal (com cliente), senão 'interna'. */
export function fioDaConversa({ modulo, cliente } = {}) {
  return modulo === 'portal' && typeof cliente === 'string' && cliente ? `portal:${cliente}` : FIO_INTERNO;
}
/** Chave no sessionStorage: td_conv_<demo> (interna) ou td_conv_<demo>:portal:<cliente>. null sem demo. */
export function chaveDaConversa(demoId, opts = {}) {
  if (!demoId) return null;
  const fio = fioDaConversa(opts);
  return fio === FIO_INTERNO ? `td_conv_${demoId}` : `td_conv_${demoId}:${fio}`;
}
const chaveDoFio = (fio) => (fio === FIO_INTERNO
  ? chaveDaConversa(S.demoId)
  : chaveDaConversa(S.demoId, { modulo: 'portal', cliente: fio.slice('portal:'.length) }));
const fioDaMsg = (m) => fioDaConversa({ modulo: m?.modulo, cliente: m?.cliente });

const revive = (lista) => lista.map((m) => ({ desfeitos: [], ...m, estado: m.estado === 'streaming' ? 'parado' : m.estado }));

/** Mensagens de um fio (carrega do sessionStorage na primeira vez). */
function msgsDo(fio) {
  let lista = S.fios.get(fio);
  if (lista) return lista;
  lista = [];
  const k = S.demoId ? chaveDoFio(fio) : null;
  if (k && fio !== FIO_INTERNO) {
    try {
      const j = JSON.parse(sessionStorage.getItem(k) || 'null');
      if (j && Array.isArray(j.msgs)) lista = revive(j.msgs.filter((m) => m?.modulo === 'portal' && fioDaMsg(m) === fio));
    } catch { /* ignora */ }
  }
  S.fios.set(fio, lista);
  return lista;
}

function salva(fio = FIO_INTERNO) {
  const k = S.demoId ? chaveDoFio(fio) : null;
  if (!k) return;
  try {
    const msgs = msgsDo(fio).filter((m) => m.estado !== 'streaming').slice(-30)
      .map(({ id, role, texto, fontes, estado, ferramentas, aprendidos, modulo, cliente, pergunta, aviso }) => ({ id, role, texto, fontes, estado, ferramentas, aprendidos, modulo, cliente, pergunta, aviso }));
    sessionStorage.setItem(k, JSON.stringify(fio === FIO_INTERNO ? { msgs, perfil: S.perfil } : { msgs }));
  } catch { /* sem storage */ }
}
function restaura(ctx) {
  const id = ctx?.demo?.id ?? ctx?.api?.demoId ?? null;
  if (!id || S.demoId === id) return;
  S.demoId = id;
  if (msgsDo(FIO_INTERNO).length) return;
  try {
    const j = JSON.parse(sessionStorage.getItem(chaveDaConversa(id)) || 'null');
    if (j && Array.isArray(j.msgs)) {
      // sessões antigas misturavam o portal na conversa interna: ali só fica o que é interno
      S.fios.set(FIO_INTERNO, revive(j.msgs.filter((m) => m?.modulo !== 'portal')));
      S.perfil = j.perfil ?? null;
      S.respostas = msgsDo(FIO_INTERNO).filter((m) => m.role === 'assistant' && m.estado === 'ok').length;
    }
  } catch { /* ignora */ }
}

/* ------------------------------------------------------------------ */
/* Utilidades                                                          */
/* ------------------------------------------------------------------ */

const term = (ctx, k) => (typeof ctx?.term === 'function' ? ctx.term(k) : k);
const ligado = (ctx, m) => (typeof ctx?.isEnabled === 'function' ? !!ctx.isEnabled(m) : true);
export function empresaCurta(ctx) {
  const nome = ctx?.empresaCurta || ctx?.empresa || ctx?.data?.empresa?.nome || 'empresa';
  return String(nome).replace(/\s*(,\s*)?\b(S\.?\s?A\.?|S\/A|Ltda\.?|LTDA\.?|EIRELI|ME|EPP)\s*$/i, '').trim();
}
/** "Cérebro da Malharia" (duas primeiras palavras). */
const cerebroDe = (ctx) => {
  const ws = empresaCurta(ctx).split(/\s+/);
  const curto = ws[0] && ws[0].length <= 3 && ws[1] ? `${ws[0]} ${ws[1]}` : ws[0];
  return `Cérebro da ${curto || 'empresa'}`;
};
function assistenteDe(ctx) {
  if (ctx?.assistant && typeof ctx.assistant.perguntar === 'function') return ctx.assistant;
  return createAssistant(() => ctx);
}
const reduzMovimento = () => typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
const desktop = () => typeof matchMedia === 'function' && matchMedia('(min-width: 1024px)').matches;

const AREA_DO_MODULO = { producao: 'producao', qualidade: 'qualidade', manutencao: 'manutencao', comercial: 'comercial', marketing: 'marketing', operadores: 'operadores', portal: 'comercial' };

/**
 * As 4 sugestões do Início (UX §4.4), em ordem fixa; depois de um registro, a 4ª vira a pergunta
 * derivada dele. → [{texto, derivada?}]
 */
export function sugestoesInicio(ctx, n = 4) {
  const todas = motor.sugeridasLigadas({ ...ctx, aprendizado: [] });
  const doMod = (m) => todas.filter((p) => p.modulo === m);
  const out = [];
  const add = (p) => { if (p && !out.some((x) => x.texto === p.pergunta)) out.push({ texto: p.pergunta }); };
  const vg = doMod('visao-geral');
  add(vg.find((p) => /\bhoje\b/i.test(p.pergunta)) ?? vg[0]);
  add(doMod('cerebro')[0]);
  const areas = ['producao', 'manutencao', 'qualidade', 'comercial'].filter((m) => ligado(ctx, m) && doMod(m).length);
  for (const m of areas) { if (out.length >= n) break; add(doMod(m)[0]); }
  for (const p of todas) { if (out.length >= n) break; add(p); }
  const ultimo = ctx?.learning?.list?.()[0];
  if (ultimo && !String(ultimo.id).startsWith('tmp-')) {
    const d = { texto: perguntaDerivada(ultimo, ctx), derivada: true };
    if (out.length >= n) out[n - 1] = d; else out.push(d);
  }
  return out.slice(0, n);
}

/**
 * Sugestões do painel. No Portal saem da visão do cliente (sugestoesDoPortal → visaoDoCliente): só os
 * pedidos dele e as condições públicas, nunca o pedido de outro cliente nem a fábrica por dentro.
 */
export function sugestoesDoPainel(ctx, modulo, cliente, n = 3) {
  if (modulo === 'portal') return cliente ? motor.sugestoesDoPortal({ ...ctx, aprendizado: [] }, cliente, n) : [];
  return motor.sugestoes({ ...ctx, aprendizado: [] }, modulo, n);
}

/** "Consultando ordens de produção" → "ordens de produção". */
function objetoDaFerramenta(rotulo) {
  return String(rotulo ?? '').replace(/[.…]+$/, '')
    .replace(/^(Consultando|Procurando( em| no| nos| nas| na)?|Buscando( em| no| nos| nas| na)?|Lendo|Conferindo|Verificando|Registrando( no| em)?)\s+/i, '')
    .trim();
}
function resumoFerramentas(fs) {
  const objs = [...new Set(fs.map((f) => objetoDaFerramenta(f.rotulo || f.nome)).filter(Boolean))];
  if (!objs.length) return 'Consultou os dados';
  const lista = objs.length === 1 ? objs[0] : `${objs.slice(0, -1).join(', ')} e ${objs.at(-1)}`;
  return `Consultou ${lista}`;
}
const ICONE_FERRAMENTA = {
  consultar_ordens: 'factory', resumo_turnos: 'clock', consultar_ncs: 'shield-check', consultar_manutencao: 'wrench',
  consultar_pedidos: 'box', consultar_estoque_preco: 'box', consultar_clientes_representantes: 'building',
  regras_comerciais: 'scale', consultar_kpis: 'chart', buscar_saberes: 'users', buscar_documentos: 'file',
  buscar_aprendizado: 'lightbulb', registrar_aprendizado: 'lightbulb', status_integracoes: 'plug',
  perfis_e_registro_uso: 'lock', fichas_marketing: 'megaphone',
};

/** Área e máquina para o "Ensinar algo sobre isso" a partir das fontes da resposta. */
function contextoEnsinar(ctx, m) {
  let area = null;
  let maquina = null;
  for (const ref of m.fontes ?? []) {
    let r = null;
    try { r = ctx.resolveRef?.(ref); } catch { r = null; }
    if (!r) continue;
    const d = r.detalhe ?? {};
    if (!area) {
      area = r.tipo === 'aprendizado' ? d.area : r.tipo === 'doc' ? d.doc?.area : r.tipo === 'saber' ? 'operadores' : AREA_DO_MODULO[r.modulo] ?? null;
    }
    if (!maquina) maquina = r.tipo === 'maq' ? d.id : (r.tipo === 'os' || r.tipo === 'saber' || r.tipo === 'aprendizado') ? d.maquina || null : null;
    if (area && maquina) break;
  }
  if (maquina && area !== 'operadores') area = 'manutencao';
  return { area: area || AREA_DO_MODULO[m.modulo] || undefined, maquina: maquina || undefined, origem: 'resposta' };
}

/* ------------------------------------------------------------------ */
/* Envio                                                               */
/* ------------------------------------------------------------------ */

/**
 * Histórico que vai junto da pergunta (até 10 mensagens), tirado do fio da pergunta. No Portal do cliente
 * o fio já é só desse cliente; cada turno vai marcado com `cliente` (o servidor descarta o que não vier assim).
 */
function historicoParaApi(lista, ate, { cliente } = {}) {
  const out = [];
  for (const m of lista) {
    if (m.id === ate) break;
    if (cliente && (m.modulo !== 'portal' || m.cliente !== cliente)) continue;
    const marca = cliente ? { cliente } : {};
    if (m.role === 'user') out.push({ role: 'user', content: m.texto, ...marca });
    else if (m.estado === 'ok' && m.texto) out.push({ role: 'assistant', content: m.texto, ...marca });
    else if (out.length && out.at(-1).role === 'user') out.pop(); // pergunta sem resposta não vai
  }
  return out.slice(-10);
}

function parar() {
  if (S.ativo) { try { S.ativo.ctl.abort(); } catch { /* ok */ } }
}

/** Cliente de uma pergunta do Portal: o informado (mensagem refeita) → o do "Ver como" agora → o padrão do portal. */
function clienteDoPortal(ctx, cliente) {
  const existe = (id) => !!id && (ctx?.data?.clientes ?? []).some((c) => c.id === id);
  if (existe(cliente)) return cliente;
  const atual = clientePortalAtual();
  if (existe(atual)) return atual;
  return motor.clientePadraoDoPortal(ctx?.data) ?? cliente ?? atual ?? null;
}

async function enviar(ctx, texto, { modulo, perfil, cliente } = {}) {
  const pergunta = String(texto ?? '').trim();
  if (!pergunta || S.limite) return null;
  restaura(ctx);
  if (S.ativo) parar();
  // o cliente fica gravado na própria mensagem: "Tentar de novo" e a sessão recarregada usam o mesmo
  const cli = modulo === 'portal' ? clienteDoPortal(ctx, cliente) : null;
  const fio = fioDaConversa({ modulo, cliente: cli });
  const lista = msgsDo(fio);
  const u = { id: novoId(), role: 'user', texto: pergunta, modulo, cliente: cli };
  const a = { id: novoId(), role: 'assistant', texto: '', fontes: [], estado: 'streaming', ferramentas: [], aprendidos: [], desfeitos: [], modulo, cliente: cli, pergunta, perfil: perfil ?? S.perfil };
  lista.push(u, a);
  const ctl = new AbortController();
  S.ativo = { id: a.id, ctl };
  avisa(u.id, 'novo', fio);
  avisa(a.id, 'novo', fio);

  const marca = cli ? { cliente: cli } : {};
  const mensagens = [...historicoParaApi(lista, u.id, marca), { role: 'user', content: pergunta, ...marca }];
  const assistant = assistenteDe(ctx);
  try {
    const r = await assistant.perguntar({
      mensagens, modulo, perfil: a.perfil, ...marca, signal: ctl.signal,
      onTexto: (delta, acumulado, extra) => {
        if (extra?.reinicio) { a.texto = ''; avisa(a.id, 'msg', fio); return; }
        a.texto = typeof acumulado === 'string' ? acumulado : a.texto + (delta || '');
        avisa(a.id, 'msg', fio);
      },
      onFerramenta: (f) => { a.ferramentas.push({ nome: f?.nome, rotulo: f?.rotulo }); avisa(a.id, 'msg', fio); },
      onAprendizado: (item) => {
        if (!item?.id) return;
        a.aprendidos.push(item);
        const L = ctx.learning;
        try { if (typeof L?.receber === 'function') L.receber(item); else L?.add?.(item); } catch (e) { console.error(e); }
        marco('ensino');
        avisa(a.id, 'msg', fio);
      },
    });
    a.texto = r.texto || a.texto;
    a.fontes = r.fontes ?? [];
    a.aviso = typeof r.aviso === 'string' && r.aviso.trim() ? r.aviso.trim() : null;
    a.estado = 'ok';
    S.respostas += 1;
    marco('pergunta');
    // "Usado em {n} respostas": aprendizado citado (no texto ou nas fontes)
    const usados = [...new Set([...a.fontes, ...refsDoTexto(a.texto)])].filter((x) => x.startsWith('aprendizado:')).map((x) => x.slice(12));
    if (usados.length) ctx.learning?.marcarUso?.(usados);
  } catch (err) {
    if (err?.abortado || err?.name === 'AbortError' || ctl.signal.aborted) {
      a.estado = 'parado';
      if (err?.texto && !a.texto) a.texto = err.texto;
    } else if (err?.status === 429 || /limite/i.test(String(err?.mensagem ?? err?.message ?? ''))) {
      a.estado = 'limite';
      S.limite = true;
    } else {
      a.estado = 'erro';
      a.erro = err?.status ?? 0;
      if (err?.status !== 401) console.warn('[conversa] falhou', err);
    }
  } finally {
    if (S.ativo?.id === a.id) S.ativo = null;
    avisa(a.id, 'fim', fio);
    salva(fio);
  }
  return a;
}

function tentarDeNovo(ctx, a) {
  const fio = fioDaMsg(a);
  const lista = msgsDo(fio);
  const i = lista.findIndex((m) => m.id === a.id);
  if (i < 1) return;
  const u = lista[i - 1];
  lista.splice(i - 1, 2);
  avisa(null, 'reset', fio);
  enviar(ctx, u.texto, { modulo: a.modulo, perfil: a.perfil, cliente: a.cliente ?? u.cliente });
}

function novaConversa(ctx, fio = FIO_INTERNO) {
  parar();
  const antes = { msgs: msgsDo(fio), perfil: S.perfil };
  S.fios.set(fio, []);
  S.limite = false;
  avisa(null, 'reset', fio);
  salva(fio);
  toast('Nova conversa.', {
    acao: {
      label: 'Desfazer',
      onClick: () => { if (!msgsDo(fio).length) { S.fios.set(fio, antes.msgs); S.perfil = antes.perfil; avisa(null, 'reset', fio); salva(fio); } },
    },
    duration: 6000,
  });
}

/* ------------------------------------------------------------------ */
/* Mensagem da resposta (DOM)                                          */
/* ------------------------------------------------------------------ */

function linhasFerramenta(m, streamingSemTexto) {
  const fs = m.ferramentas;
  if (streamingSemTexto) {
    const vis = fs.slice(-4);
    const ul = h('ul', { class: 'cv-tools' },
      vis.map((f, i) => {
        const atual = i === vis.length - 1;
        return h('li', { class: ['cv-tools__l', atual ? 'is-live' : 'is-done'] },
          atual ? h('span', { class: 'cv-dots', 'aria-hidden': 'true' }, h('i'), h('i'), h('i')) : icon('check', { size: 14 }),
          icon(ICONE_FERRAMENTA[f.nome] || 'search', { size: 14, class: 'cv-tools__ico' }),
          h('span', null, `${String(f.rotulo || 'Consultando os dados').replace(/[.…]+$/, '')}…`));
      }));
    if (!fs.length) {
      ul.append(h('li', { class: 'cv-tools__l is-live' }, h('span', { class: 'cv-dots', 'aria-hidden': 'true' }, h('i'), h('i'), h('i')), h('span', null, 'Pensando…')));
    }
    return ul;
  }
  if (!fs.length) return null;
  const lista = h('ul', { class: 'cv-tools cv-tools--aberto', hidden: true },
    fs.map((f) => h('li', { class: 'cv-tools__l is-done' }, icon('check', { size: 14 }), h('span', null, String(f.rotulo || f.nome || '').replace(/[.…]+$/, '')))));
  const btn = h('button', {
    type: 'button', class: 'cv-tools__resumo', 'aria-expanded': 'false',
    onClick: () => { lista.hidden = !lista.hidden; btn.setAttribute('aria-expanded', String(!lista.hidden)); },
  }, icon('check', { size: 14 }), h('span', null, resumoFerramentas(fs)), icon('chevron-down', { size: 14, class: 'cv-tools__caret' }));
  return h('div', { class: 'cv-tools-wrap' }, btn, lista);
}

function cartaoRegistroConversa(ctx, m, item) {
  const desfeito = m.desfeitos?.includes(item.id);
  if (desfeito) return h('p', { class: 'cv-reg cv-reg--desfeito' }, 'Registro desfeito.');
  const box = h('div', { class: 'cv-reg' },
    h('div', { class: 'cv-reg__l1' }, icon('check-circle', { size: 16 }), h('span', null, 'Registrado no cérebro')),
    h('div', { class: 'cv-reg__titulo' }, item.titulo || ''),
    h('div', { class: 'cv-reg__links' },
      ligado(ctx, 'cerebro') ? h('button', { type: 'button', class: 'link-btn', onClick: () => ctx.navigate?.('#cerebro') }, 'Ver no Cérebro') : null,
      h('button', {
        type: 'button', class: 'link-btn',
        onClick: async (e) => {
          const b = e.currentTarget;
          b.disabled = true;
          try {
            await ctx.learning?.remove?.(item.id);
            (m.desfeitos ||= []).push(item.id);
            avisa(m.id, 'msg', fioDaMsg(m));
            salva(fioDaMsg(m));
          } catch {
            b.disabled = false;
            toast('Não conseguimos desfazer agora. Tente de novo.');
          }
        },
      }, 'Desfazer')));
  return box;
}

/** Cliente do Portal de uma mensagem (C3: fontes na versão desse cliente), ou undefined fora do portal. */
const clienteDaMsg = (m) => (m?.modulo === 'portal' && m.cliente ? m.cliente : undefined);

function corpoResposta(ctx, m, raiz) {
  const streaming = m.estado === 'streaming';
  const cliente = clienteDaMsg(m);
  // no Portal, a numeração só aceita o que resolve na versão do cliente (nunca nos dados internos)
  const ctxCitas = cliente ? ctxDoCliente(ctx, cliente) : ctx;
  const citas = ctxCitas ? criaCitas({ ctx: ctxCitas }) : criaCitas({ aceita: () => false });
  const citeNode = citeNodeLigado(raiz, ctx, { cliente });
  const partes = [];
  const semTexto = !m.texto;
  const tools = linhasFerramenta(m, streaming && semTexto);
  if (tools) partes.push(tools);
  if (m.texto) partes.push(renderMarkdown(m.texto, { ctx, parcial: streaming, cursor: streaming, citas, citeNode, class: 'cv-md' }));
  for (const item of m.aprendidos ?? []) partes.push(cartaoRegistroConversa(ctx, m, item));

  if (m.estado === 'parado') {
    partes.push(h('p', { class: 'cv-nota' }, 'Resposta interrompida.'));
  } else if (m.estado === 'erro') {
    partes.push(h('div', { class: 'cv-erro' },
      h('p', null, 'Não consegui responder agora.'),
      button('Tentar de novo', { variant: 'secondary', size: 'sm', icone: 'refresh', onClick: () => tentarDeNovo(ctx, m) })));
  } else if (m.estado === 'limite') {
    partes.push(h('p', { class: 'cv-erro cv-erro--limite' },
      h('span', null, 'Esta demonstração chegou ao limite de perguntas de hoje. Amanhã ela volta; se quiser continuar agora, fale com quem te enviou o link.'),
      linkContato()));
  } else if (m.estado === 'ok') {
    if (m.aviso) partes.push(notaAviso(m.aviso));
    const fontes = blocoFontes({ ctx, refs: m.fontes ?? [], citas, learning: ctx.learning, cliente });
    if (fontes) partes.push(fontes);
    partes.push(acoesResposta(ctx, m, citas));
  }
  return partes;
}

function linkContato() {
  return h('a', { class: 'cv-contato', href: CONTATO_URL, target: '_blank', rel: 'noopener' }, 'Falar com a Torno');
}

/** Aviso do servidor (limite diário da IA, resposta pelo roteiro local): nota discreta sob a resposta. */
function notaAviso(texto) {
  return h('p', { class: 'cv-nota cv-aviso', role: 'note' },
    icon('info', { size: 14 }),
    h('span', null, texto),
    /limite/i.test(texto) ? linkContato() : null);
}

function acoesResposta(ctx, m, citas) {
  const copiar = button('Copiar', {
    variant: 'ghost', size: 'sm', icone: 'copy', class: 'cv-acao',
    onClick: async () => {
      const rot = rotulosParaCopiar(ctx, citas.ordem.length ? citas.ordem : m.fontes ?? [], citas, { cliente: clienteDaMsg(m) });
      await copyText(textoParaCopiar(m.texto, rot));
      copiar.replaceChildren(icon('check', { size: 16 }), h('span', { class: 'btn__label' }, 'Copiado'));
      setTimeout(() => { copiar.replaceChildren(icon('copy', { size: 16 }), h('span', { class: 'btn__label' }, 'Copiar')); }, 1500);
    },
  });
  // no Portal o cliente não ensina o cérebro da fábrica (o servidor também não registra): só Copiar
  if (ctx?.cliente || m?.modulo === 'portal') return h('div', { class: 'cv-acoes' }, copiar);
  const dica = !S.dicaUsada && S.respostas <= 1;
  const ensinarBtn = button('Ensinar algo sobre isso', {
    variant: 'ghost', size: 'sm', icone: 'lightbulb', class: ['cv-acao', dica && 'has-dica'].filter(Boolean).join(' '),
    onClick: () => {
      S.dicaUsada = true;
      ensinarBtn.classList.remove('has-dica');
      const o = contextoEnsinar(ctx, m);
      if (typeof ctx.ensinar === 'function') ctx.ensinar(o); else abrirEnsinar(ctx, o);
    },
  });
  if (dica) ensinarBtn.append(h('span', { class: 'cv-dica', 'aria-hidden': 'true' }));
  return h('div', { class: 'cv-acoes' }, copiar, ensinarBtn);
}

function noResposta(ctx, m) {
  const raiz = h('article', { class: ['cv-msg', 'cv-msg--bot', `is-${m.estado}`], 'data-id': m.id, 'aria-busy': m.estado === 'streaming' ? 'true' : 'false' });
  const rotulo = h('div', { class: 'cv-msg__rotulo' }, h('span', { class: 'cv-orb', 'aria-hidden': 'true' }), m.estado === 'streaming' && !m.texto ? 'Cérebro…' : cerebroDe(ctx));
  raiz.append(rotulo, ...corpoResposta(ctx, m, raiz));
  return raiz;
}

function noPergunta(m) {
  return h('div', { class: 'cv-msg cv-msg--user', 'data-id': m.id }, h('div', { class: 'cv-bolha' }, m.texto));
}

/* ------------------------------------------------------------------ */
/* View                                                                */
/* ------------------------------------------------------------------ */

/**
 * montarConversa(el, ctx, {modo: 'pagina'|'painel', modulo}) → {el, destroy, focus, enviar}
 * Com modulo 'portal', a view mostra a conversa do cliente escolhido agora no "Ver como" e troca de
 * conversa quando ele muda; as outras views mostram a conversa interna.
 */
export function montarConversa(host, ctx, { modo = 'pagina', modulo } = {}) {
  restaura(ctx);
  const pagina = modo === 'pagina';
  const portal = modulo === 'portal';
  const clienteDaView = () => (portal ? clienteDoPortal(ctx, null) : null);
  const fioDaView = () => fioDaConversa({ modulo, cliente: clienteDaView() });
  const msgs = () => msgsDo(fioDaView());
  const opcoesEnvio = () => ({ modulo, perfil: S.perfil, ...(portal ? { cliente: clienteDaView() } : {}) });
  const nos = new Map();
  let raf = 0;
  const pendentes = new Set();

  const log = h('div', { class: 'cv__log', role: 'log', 'aria-label': 'Conversa com o cérebro', 'aria-live': 'off' });
  const vivo = h('div', { class: 'sr-only', role: 'status', 'aria-live': 'polite' });
  const vazio = h('div', { class: 'cv__vazio' });

  const campo = h('textarea', {
    class: 'cv__campo', rows: '1', 'aria-label': 'Sua pergunta para o cérebro', autocomplete: 'off', enterkeyhint: 'send',
    placeholder: 'Pergunte outra coisa ou diga “anota que…”',
  });
  const btnEnviar = iconButton('arrow-up', { label: 'Enviar pergunta', variant: 'primary', class: 'cv__enviar', size: 18 });
  btnEnviar.type = 'submit';
  const form = h('form', {
    class: 'cv__form',
    onSubmit: (e) => {
      e.preventDefault();
      if (S.ativo) { parar(); return; }
      const t = campo.value.trim();
      if (!t) return;
      campo.value = '';
      S.rascunho = '';
      autoAltura();
      enviar(ctx, t, opcoesEnvio());
    },
  }, campo, btnEnviar);
  campo.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) { e.preventDefault(); form.requestSubmit(); }
  });
  campo.addEventListener('input', () => { S.rascunho = campo.value; autoAltura(); pintaCompositor(); });
  function autoAltura() { campo.style.height = 'auto'; campo.style.height = `${Math.min(campo.scrollHeight, 160)}px`; }

  const compositor = h('div', { class: 'cv__compositor' }, form,
    pagina ? h('p', { class: 'cv__rodape' }, 'Respostas citam a fonte. Confira antes de decidir.') : null);

  const seloPerfil = h('div', { class: 'cv__perfil', hidden: true });
  const barra = pagina ? h('div', { class: 'cv__barra' },
    h('button', { type: 'button', class: 'cv__voltar', onClick: () => ctx.navigate?.('#inicio') }, icon('chevron-left', { size: 18 }), h('span', null, 'Início')),
    seloPerfil,
    button('Nova conversa', { variant: 'ghost', size: 'sm', icone: 'plus', class: 'cv__nova', onClick: () => novaConversa(ctx, fioDaView()) })) : null;

  const raiz = h('div', { class: ['cv', `cv--${modo}`] }, barra, pagina ? null : seloPerfil, vazio, log, vivo, compositor);
  host.replaceChildren(raiz);

  function pintaCompositor() {
    const ativo = !!S.ativo;
    btnEnviar.replaceChildren(icon(ativo ? 'stop' : 'arrow-up', { size: 18 }));
    btnEnviar.setAttribute('aria-label', ativo ? 'Parar resposta' : 'Enviar pergunta');
    btnEnviar.title = ativo ? 'Parar resposta' : 'Enviar pergunta';
    btnEnviar.classList.toggle('is-stop', ativo);
    btnEnviar.disabled = !ativo && (!campo.value.trim() || S.limite);
    campo.disabled = S.limite;
    if (S.limite) campo.placeholder = 'Esta demonstração chegou ao limite de perguntas de hoje.';
  }

  function pintaPerfil() {
    const p = S.perfil;
    const nome = p ? ((ctx.data?.perfis_acesso ?? []).find((x) => x.id === (typeof p === 'object' ? p.id : p))?.nome ?? (typeof p === 'object' ? p.nome : p)) : null;
    seloPerfil.hidden = !nome;
    if (nome) {
      seloPerfil.replaceChildren(h('span', null, `Perguntando como ${nome}`),
        h('button', { type: 'button', class: 'cv__perfil-x', 'aria-label': 'Voltar ao perfil completo', onClick: () => { S.perfil = null; pintaPerfil(); salva(); } }, icon('x', { size: 14 })));
    }
  }

  function pintaVazio() {
    const temMsgs = msgs().length > 0;
    vazio.hidden = temMsgs;
    raiz.classList.toggle('is-vazia', !temMsgs);
    if (temMsgs) return;
    const sug = pagina ? sugestoesInicio(ctx).map((s) => s.texto) : sugestoesDoPainel(ctx, modulo, clienteDaView(), 3);
    vazio.replaceChildren(
      pagina ? h('h1', { class: 'cv__titulo' }, `Pergunte à operação da ${empresaCurta(ctx)}`) : null,
      sug.length ? h('div', { class: 'cv__sugestoes', role: 'group', 'aria-label': 'Perguntas sugeridas' },
        sug.map((s) => h('button', { type: 'button', class: 'pill-sug', title: s, onClick: () => enviar(ctx, s, opcoesEnvio()) }, h('span', null, s)))) : null);
  }

  const pertoDoFim = () => {
    if (pagina) return window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 160;
    const sc = raiz.closest('.sheet__body') ?? raiz;
    return sc.scrollTop + sc.clientHeight >= sc.scrollHeight - 160;
  };
  const rolaAoFim = (suave = false) => {
    const comp = !pagina ? (raiz.closest('.sheet__body') ?? raiz) : null;
    const opts = { behavior: suave && !reduzMovimento() ? 'smooth' : 'auto' };
    if (pagina) window.scrollTo({ top: document.documentElement.scrollHeight, ...opts });
    else if (comp) comp.scrollTo({ top: comp.scrollHeight, ...opts });
  };

  function desenha(id) {
    const m = msgs().find((x) => x.id === id);
    if (!m) return;
    const novo = m.role === 'user' ? noPergunta(m) : noResposta(ctx, m);
    const velho = nos.get(id);
    if (velho && velho.isConnected) velho.replaceWith(novo);
    else log.appendChild(novo);
    nos.set(id, novo);
  }

  function redesenhaTudo() {
    nos.clear();
    log.replaceChildren();
    for (const m of msgs()) desenha(m.id);
    pintaVazio();
    pintaCompositor();
    pintaPerfil();
  }

  const ouvinte = (id, tipo, fio) => {
    if (fio && fio !== fioDaView()) return; // mensagem de outra conversa (interna × portal, outro cliente)
    if (tipo === 'reset') { redesenhaTudo(); return; }
    if (tipo === 'novo') {
      const estavaPerto = true;
      desenha(id);
      pintaVazio();
      pintaCompositor();
      pintaPerfil();
      if (estavaPerto) requestAnimationFrame(() => rolaAoFim(true));
      return;
    }
    if (tipo === 'fim') {
      pendentes.delete(id);
      const perto = pertoDoFim();
      desenha(id);
      pintaCompositor();
      const m = msgs().find((x) => x.id === id);
      if (m?.estado === 'ok') {
        const n = nos.get(id)?.querySelectorAll('.fontes .fonte').length ?? 0;
        vivo.textContent = `Resposta pronta, ${n} ${n === 1 ? 'fonte' : 'fontes'}. ${markdownToText(m.texto).slice(0, 400)}`;
      } else if (m?.estado === 'erro') vivo.textContent = 'Não consegui responder agora.';
      if (perto) requestAnimationFrame(() => rolaAoFim(false));
      return;
    }
    // atualização de streaming: um redesenho por quadro
    pendentes.add(id);
    if (!raf) {
      raf = requestAnimationFrame(() => {
        raf = 0;
        const perto = pertoDoFim();
        for (const x of pendentes) desenha(x);
        pendentes.clear();
        if (perto) rolaAoFim(false);
      });
    }
  };
  ouvintes.add(ouvinte);
  // Portal: trocou o "Ver como" → mostra a conversa daquele cliente
  const offCliente = portal ? aoTrocarClientePortal(() => redesenhaTudo()) : null;

  // a lista de aprendizado mudou (desfazer, apagar no Cérebro): fontes e sugestões se ajustam
  const offLearning = ctx.learning?.subscribe?.((_, ev) => {
    if (ev?.tipo === 'uso') return;
    if (!msgs().length) pintaVazio();
  });

  const relogio = setInterval(() => atualizaQuandos(raiz), 30000);

  campo.value = S.rascunho || '';
  redesenhaTudo();
  autoAltura();
  if (S.focar || (!msgs().length && desktop())) {
    S.focar = false;
    requestAnimationFrame(() => { try { campo.focus({ preventScroll: true }); } catch { /* ok */ } });
  }
  if (msgs().length) requestAnimationFrame(() => rolaAoFim(false));

  const api = {
    el: raiz,
    focus: () => campo.focus(),
    enviar: (t) => enviar(ctx, t, opcoesEnvio()),
    destroy() {
      ouvintes.delete(ouvinte);
      if (typeof offCliente === 'function') offCliente();
      if (raf) cancelAnimationFrame(raf);
      clearInterval(relogio);
      if (typeof offLearning === 'function') offLearning();
    },
  };
  return api;
}

/* ------------------------------------------------------------------ */
/* Entradas públicas                                                   */
/* ------------------------------------------------------------------ */

/** Rota #conversa: render(el, ctx) → cleanup. */
export function render(el, ctx) {
  const v = montarConversa(el, ctx, { modo: 'pagina' });
  return () => v.destroy();
}

function abrirPainel(ctx, modulo) {
  const area = (ctx.data?.areas ?? []).find((a) => a.id === modulo);
  const nomes = { producao: 'produção', qualidade: 'qualidade', manutencao: 'manutenção', comercial: 'comercial', marketing: 'marketing', portal: 'o portal', operadores: 'o chão de fábrica' };
  const titulo = `Pergunte sobre ${nomes[modulo] ?? (area?.nome ?? 'a operação').toLowerCase()}`;
  const fn = typeof ctx.sheet === 'function' ? ctx.sheet : uiSheet;
  const host = h('div', { class: 'cv-painel-host' });
  const folha = fn({ titulo, lado: 'direita', largura: 440, classe: 'sheet--conversa', rotulo: titulo, corpo: host });
  const v = montarConversa(host, ctx, { modo: 'painel', modulo });
  folha.onClose?.(() => v.destroy());
  return { folha, view: v };
}

/**
 * ctx.perguntar(texto, {modulo, perfil, enviar = true, painel}). O Portal sempre abre no painel (a
 * conversa dele é a do cliente, não a interna da página #conversa).
 */
export function perguntar(ctx, texto, { modulo, perfil, enviar: enviarJa = true, painel = false } = {}) {
  restaura(ctx);
  if (perfil !== undefined) S.perfil = perfil || null;
  const t = String(texto ?? '').trim();
  if (painel || modulo === 'portal') {
    const { view } = abrirPainel(ctx, modulo);
    if (t && enviarJa) view.enviar(t);
    return;
  }
  if (t && !enviarJa) S.rascunho = t;
  if (!t || !enviarJa) S.focar = true;
  const jaNaConversa = typeof location !== 'undefined' && /^#conversa\b/.test(location.hash);
  if (!jaNaConversa) ctx.navigate?.('#conversa');
  else avisa(null, 'reset');
  if (t && enviarJa) enviar(ctx, t, { modulo, perfil: S.perfil });
}

/** Fábrica usada pela casca: liga a conversa ao ctx atual. */
export function createConversa(getCtx) {
  const ctxDe = () => (typeof getCtx === 'function' ? getCtx() : getCtx) || {};
  return {
    perguntar: (texto, opts) => perguntar(ctxDe(), texto, opts),
    render: (el, ctx) => render(el, ctx || ctxDe()),
    nova: () => novaConversa(ctxDe()),
    /** envia sem abrir tela (o fio sai de {modulo, cliente}); → Promise da mensagem de resposta */
    enviar: (texto, opts = {}) => enviar(ctxDe(), texto, opts),
    parar,
    /** a conversa interna (as telas internas) */
    get mensagens() { restaura(ctxDe()); return msgsDo(FIO_INTERNO).slice(); },
    /** a conversa de um fio: {modulo:'portal', cliente} → a do cliente no Portal; sem nada → a interna */
    mensagensDe: (opts = {}) => { restaura(ctxDe()); return msgsDo(fioDaConversa(opts)).slice(); },
  };
}

export default createConversa;
