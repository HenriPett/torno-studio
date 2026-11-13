// Fontes da resposta (UX §4.5.4): sobrescritos numerados ligados a cartões com o sistema de origem.
//
//   blocoFontes({ctx, refs, citas, learning, max, cliente}) → <section> "Fontes" com cartões (aprendido primeiro)
//   cartaoFonte(ctx, ref, n, {realce, cliente}) → <button> cartão de 72 px (ou null se a ref não resolve)
//   cartaoAprendido(item, {ctx, estatico}) → cartão "Registrado por {autor} · agora"
//   citeNodeLigado(raiz, ctx, {cliente}) → fábrica de sobrescritos: hover/foco destaca o cartão, clique abre a gaveta
//   sistemaDaRef(resolved, ctx) (origem: origemDoRef de origem.js) · quando(iso) · rotulosParaCopiar(ctx, refs, citas, {cliente})
//   abrirFonte(ctx, ref, {cliente}) → abre a gaveta (o rodapé "Origem: …" é do openRef) e dispara o marco 'fonte'
//   ctxDoCliente(ctx, cliente) → ctx na versão do cliente do Portal (visaoDoCliente), ou ctx sem cliente
//
// `cliente` (id CLI-… do Portal, opcional): o cartão, o sobrescrito e a gaveta resolvem o registro e a
// origem a partir de visaoDoCliente (local-engine.js): representante sem "% da meta", ordem sem
// histórico interno, sem registros da equipe. Cliente que não existe no pacote: nenhuma fonte aparece.
//   marco(tipo) → window 'torno:marco' {tipo} (roteiro guiado do Início)
//   partesDoRegistro(item) → {titulo, corpo} sem repetir o título nem mexer na capitalização

import { h, icon } from '../ui.js';
import { fmt } from '../format.js';
import { statusLabel, severidadeLabel, visaoDoCliente } from '../ai/local-engine.js';
import { resolveRef as resolveRefData } from '../adapters/data-source.js';
import { tituloDoTexto } from '../learning.js';
import { origemDoRef, sistemaDoRef } from '../origem.js';

const ICONE = {
  doc: 'file', op: 'factory', turno: 'clock', pedido: 'box', sku: 'box', cliente: 'building', rep: 'user', regra: 'scale',
  nc: 'shield-check', os: 'wrench', maq: 'cpu', kpi: 'chart', saber: 'users', integ: 'plug', aprendizado: 'lightbulb',
};

const dataBr = (iso) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(iso ?? ''));
  return m ? `${m[3]}/${m[2]}` : '';
};
const curto = (s, n = 90) => {
  const t = String(s ?? '').replace(/\s+/g, ' ').trim();
  return t.length > n ? `${t.slice(0, n - 1).replace(/\s+\S*$/, '')}…` : t;
};

/** "agora", "há 5 min", "há 2 h", "ontem", "12/11". Usa o relógio real (os registros são de agora). */
export function quando(iso, agora = Date.now()) {
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return 'agora';
  const s = Math.max(0, Math.round((agora - t) / 1000));
  if (s < 60) return 'agora';
  const min = Math.round(s / 60);
  if (min < 60) return `há ${min} min`;
  const hh = Math.round(min / 60);
  if (hh < 24) return `há ${hh} h`;
  if (hh < 48) return 'ontem';
  return dataBr(iso) || 'antes';
}

/** Dispara um marco do roteiro guiado do Início ('pergunta' | 'fonte' | 'ensino'). */
export function marco(tipo) {
  try { window.dispatchEvent(new CustomEvent('torno:marco', { detail: { tipo } })); } catch { /* sem window */ }
}

const fmtDe = (ctx) => ctx?.fmt ?? fmt;
const hojeDe = (ctx) => ctx?.today ?? ctx?.data?.data_referencia ?? fmt.TODAY;
/** "07:40" se for hoje nos dados; senão "12 nov, 18:30". */
function horaSync(iso, ctx) {
  if (!iso) return '';
  const f = fmtDe(ctx);
  return String(iso).slice(0, 10) === hojeDe(ctx) && f.time(iso) ? f.time(iso) : f.datetime(iso);
}

/** Sistema de origem de uma fonte (linha 1 do cartão): a regra única de origem.js. */
export const sistemaDaRef = (r, ctx) => sistemaDoRef(ctx?.data ?? {}, r);

/** "MES · sincronizado 07:40" (linha 1 do cartão, depois do tipo). '' quando repetiria o tipo. */
function linhaOrigem(r, ctx) {
  const o = origemDoRef(ctx?.data ?? {}, r);
  const sist = o?.sistema || sistemaDaRef(r, ctx);
  if (!sist || sist === r?.tipoNome) return ''; // evita "Saber de operador · Saber de operador"
  if (!o?.sync) return sist;
  return `${sist} · ${o.erro ? 'última sincronização' : 'sincronizado'} ${horaSync(o.sync, ctx)}`;
}

// ctx já na versão de um cliente (não refaz a visão em cima da visão)
const VISOES = new WeakSet();

/**
 * ctx na versão do cliente `cliente` do Portal (C3). Sem `cliente`, devolve o próprio ctx.
 * Os dados vêm de visaoDoCliente (só os registros dele, sem meta do representante, sem histórico
 * interno da ordem, sem registros da equipe); resolveRef devolve o registro resolvido sobre esses
 * dados; openRef abre a gaveta também na versão do cliente; perguntar vai para o assistente do Portal.
 * → ctx | null (cliente que não existe no pacote: nada se mostra, em vez de cair nos dados internos)
 */
export function ctxDoCliente(ctx, cliente) {
  if (!cliente) return ctx;
  if (VISOES.has(ctx) && ctx.cliente === cliente) return ctx;
  let v = null;
  try { v = visaoDoCliente(ctx, cliente); } catch (e) { console.error('[fontes] visaoDoCliente', e); }
  if (!v) return null;
  const confere = v.resolveRef;
  const base = ctx;
  const out = {
    ...v,
    learning: null,
    aprendizado: [],
    resolveRef: (ref) => {
      try { return confere(ref) ? resolveRefData(v.data, ref, v.isEnabled, { aprendizado: [] }) : null; } catch { return null; }
    },
    openRef: (ref, o = {}) => base?.openRef?.(ref, { ...o, cliente }) ?? null,
    perguntar: typeof base?.perguntar === 'function'
      ? (texto, o = {}) => base.perguntar(texto, { ...o, modulo: 'portal', painel: true })
      : undefined,
  };
  VISOES.add(out);
  return out;
}

/**
 * Abre a gaveta de uma fonte (cartão ou sobrescrito) e avisa o roteiro guiado. A linha "Origem: …"
 * fica no rodapé que o próprio openRef põe (app.js). Com `cliente`, a gaveta abre na versão dele
 * (app.openRef(ref, {cliente})). → a folha aberta ou null.
 */
export function abrirFonte(ctx, ref, { cliente } = {}) {
  let s = null;
  try {
    s = (cliente ? ctx?.openRef?.(ref, { cliente }) : ctx?.openRef?.(ref)) ?? null;
  } catch (e) { console.error('[fontes] openRef', e); }
  if (!s) return null;
  marco('fonte');
  return s;
}

/** Linha 3 do cartão: status, data, trecho. */
function detalheDaRef(r, ctx) {
  const d = r?.detalhe ?? {};
  const t = (k) => (typeof ctx?.term === 'function' ? ctx.term(k) : k);
  switch (r?.tipo) {
    case 'op': return [statusLabel(d.status), d.progresso != null ? `${d.progresso}%` : null, d.prazo ? `prazo ${dataBr(d.prazo)}` : null].filter(Boolean).join(' · ');
    case 'pedido': return [statusLabel(d.status), d.previsao_entrega ? `${d.status === 'atrasado' ? 'nova previsão' : 'previsão'} ${dataBr(d.previsao_entrega)}` : null].filter(Boolean).join(' · ');
    case 'nc': return [statusLabel(d.status), d.severidade ? `severidade ${severidadeLabel(d.severidade)}` : null].filter(Boolean).join(' · ');
    case 'os': return [statusLabel(d.status), d.tecnico].filter(Boolean).join(' · ');
    case 'maq': return [statusLabel(d.status), d.proxima_preventiva ? `preventiva ${dataBr(d.proxima_preventiva)}` : null].filter(Boolean).join(' · ');
    case 'doc': return d.trecho ? curto(d.trecho.texto, 90) : d.doc?.atualizado ? `atualizado ${dataBr(d.doc.atualizado)}` : '';
    case 'turno': return `${d.produzido ?? '—'} produzidas · ${d.paradas_min ?? 0} min de parada`;
    case 'sku': return d.estoque != null ? `estoque ${d.estoque.toLocaleString('pt-BR')} · mínimo ${Number(d.estoque_minimo ?? 0).toLocaleString('pt-BR')}` : '';
    case 'cliente': return [d.cidade && d.uf ? `${d.cidade}/${d.uf}` : null, d.tabela_preco].filter(Boolean).join(' · ');
    case 'rep': return d.meta_mes && d.realizado_mes != null ? `${Math.round((d.realizado_mes / d.meta_mes) * 100)}% da meta do mês` : t('representante');
    case 'regra': return curto(d.texto, 90);
    case 'kpi': return d.valor != null ? `${String(d.valor).replace('.', ',')}${d.unidade === '%' ? '%' : d.unidade ? ` ${d.unidade}` : ''} · meta ${String(d.meta).replace('.', ',')}${d.unidade === '%' ? '%' : ''}` : '';
    case 'saber': return [d.autor, d.funcao, d.tempo_casa_anos ? `${d.tempo_casa_anos} anos de casa` : null].filter(Boolean).join(' · ');
    case 'integ': return statusLabel(d.status);
    default: return '';
  }
}

const resolve = (ctx, ref) => {
  if (typeof ctx?.resolveRef !== 'function') return null;
  try { return ctx.resolveRef(ref); } catch { return null; }
};

/**
 * Título e corpo de um registro, sem repetir o título no corpo e sem mexer na capitalização do texto.
 * Título cortado ("… depois que o…") → o corpo continua do ponto do corte, recuando até o começo da
 * palavra partida ("…laboratório liberar o lote 3"). Título que é a 1ª frase → o corpo é o resto.
 * Texto que cabe no título → corpo vazio. → {titulo, corpo}
 */
export function partesDoRegistro(item) {
  const texto = String(item?.texto ?? '').replace(/\s+/g, ' ').trim();
  let titulo = String(item?.titulo || tituloDoTexto(texto)).trim();
  if (!texto) return { titulo, corpo: '' };
  const cortado = /(…|\.\.\.)$/.test(titulo);
  const base = titulo.replace(/\s*(…|\.\.\.)$/, '');
  const letra = /[\p{L}\p{N}]/u;
  if (base && texto.toLocaleLowerCase('pt-BR').startsWith(base.toLocaleLowerCase('pt-BR'))) {
    let i = base.length;
    if (cortado) {
      // corte no meio da palavra ("laborat…"): título e corpo recuam para o começo dela
      if (letra.test(texto[i] ?? '') && letra.test(texto[i - 1] ?? '')) {
        const j = texto.lastIndexOf(' ', i);
        if (j > 0) {
          i = j;
          titulo = `${base.slice(0, j).replace(/[\s,;:—–-]+$/, '')}…`;
        }
      }
      const resto = texto.slice(i).replace(/^[\s,;:—–-]+/, '').trimEnd();
      return { titulo, corpo: letra.test(resto) ? `…${resto}` : '' };
    }
    const resto = texto.slice(i).replace(/^[\s.,;:!?…—–-]+/, '');
    return { titulo, corpo: letra.test(resto) ? resto : '' };
  }
  // título escrito por outra via (ex.: a IA no "anota que…"): o corpo é o texto, como foi escrito
  const igual = texto.replace(/[.!?…\s]+$/, '').toLocaleLowerCase('pt-BR') === base.replace(/[.!?…\s]+$/, '').toLocaleLowerCase('pt-BR');
  return { titulo, corpo: igual ? '' : texto };
}

/**
 * Título de registro com corte visual (line-clamp 2): se mesmo assim ele não couber, a linha 3 passa
 * a mostrar o texto completo, para que título + corpo nunca pulem um trecho no meio.
 */
function vigiaTituloCortado(l2, l3, resto, completo) {
  if (!completo || typeof window === 'undefined') return;
  const confere = () => {
    if (!l2.isConnected) return;
    const cortado = l2.scrollHeight > l2.clientHeight + 1;
    const texto = cortado ? completo : resto;
    if (l3.textContent !== texto) l3.textContent = texto;
    l3.hidden = !texto;
    l3.classList.toggle('is-completo', cortado);
    if (cortado) l2.title = l2.textContent;
    else l2.removeAttribute('title');
  };
  if (typeof ResizeObserver !== 'function') { requestAnimationFrame(confere); return; }
  // o observer vive enquanto o título estiver na página. Ao sair do DOM (conversa limpa, gaveta fechada,
  // lista refeita) o tamanho vira 0×0 e o observer é chamado: aí ele se desconecta. Cartão criado fora
  // da página (ex.: os "+ N fontes" ainda escondidos) espera o primeiro encaixe.
  let montado = false;
  const ro = new ResizeObserver(() => {
    if (!l2.isConnected) {
      if (montado) ro.disconnect();
      return;
    }
    montado = true;
    confere();
  });
  ro.observe(l2);
}

/** Cartão de um registro aprendido (fonte, confirmação e listas). */
export function cartaoAprendido(item, { ctx, n, estatico = false, realce = false, onClick } = {}) {
  const autor = item?.autor || 'Você';
  const quem = autor === 'Você' ? 'você' : autor;
  const linha1 = h('span', { class: 'fonte__l1 fonte__l1--aprendido' },
    n ? h('span', { class: 'fonte__n num' }, String(n)) : null,
    icon('lightbulb', { size: 14 }),
    h('span', null, `Registrado por ${quem} · `, h('span', { class: 'fonte__quando', 'data-quando': item?.criado_em || '' }, quando(item?.criado_em))));
  // linha 2 = título (até 2 linhas); linha 3 = o que o título não mostrou do texto
  const { titulo, corpo } = partesDoRegistro(item);
  const l2 = h('span', { class: 'fonte__l2' }, titulo);
  const resto = corpo ? curto(corpo, estatico ? 220 : 110) : '';
  const l3 = h('span', { class: 'fonte__l3', hidden: !resto }, resto);
  vigiaTituloCortado(l2, l3, resto, String(item?.texto ?? '').replace(/\s+/g, ' ').trim());
  const filhos = [linha1, l2, l3];
  const cls = ['fonte', 'fonte--aprendido', realce && 'is-new'];
  if (estatico) return h('div', { class: cls, 'data-ref': `aprendizado:${item?.id}` }, ...filhos);
  return h('button', {
    type: 'button', class: cls, 'data-ref': `aprendizado:${item?.id}`,
    'aria-label': `${n ? `Fonte ${n}: ` : ''}registrado por ${quem}: ${titulo}`,
    onClick: onClick ?? (() => abrirFonte(ctx, `aprendizado:${item?.id}`)),
  }, ...filhos);
}

/**
 * Cartão de fonte (botão que abre a gaveta). null quando a ref não resolve. Com `cliente`, o registro,
 * a origem e a gaveta vêm da versão do cliente (ctxDoCliente).
 */
export function cartaoFonte(ctx, ref, n, { realce = false, cliente } = {}) {
  if (cliente) ctx = ctxDoCliente(ctx, cliente);
  const r = resolve(ctx, ref);
  if (!r) return null;
  if (r.tipo === 'aprendizado') return cartaoAprendido(r.detalhe, { ctx, n, realce });
  const origem = linhaOrigem(r, ctx);
  const l1 = origem ? `${r.tipoNome} · ${origem}` : r.tipoNome;
  const det = detalheDaRef(r, ctx);
  return h('button', {
    type: 'button', class: 'fonte', 'data-ref': ref,
    'aria-label': `Fonte ${n ?? ''}: ${r.tipoNome}${origem ? `, ${origem}` : ''}: ${r.rotulo}`,
    onClick: () => abrirFonte(ctx, ref),
  },
  h('span', { class: 'fonte__l1' },
    n ? h('span', { class: 'fonte__n num' }, String(n)) : null,
    icon(ICONE[r.tipo] || 'file', { size: 14 }),
    h('span', { title: l1 }, l1)),
  h('span', { class: 'fonte__l2' }, r.rotulo),
  det ? h('span', { class: 'fonte__l3' }, det) : null);
}

/**
 * Seção "Fontes". `refs` = fontes da resposta; `citas` (criaCitas de markdown.js) já numerou as do
 * texto; as que vieram só em `fontes` ganham os números seguintes. Aprendido primeiro; 4 visíveis.
 */
export function blocoFontes({ ctx, refs = [], citas, learning, max = 4, cliente } = {}, opcoes = {}) {
  cliente ??= opcoes?.cliente;
  if (cliente) ctx = ctxDoCliente(ctx, cliente);
  const ordem = citas ? citas.completar(refs) : [...new Set(refs)];
  const numero = (ref) => (citas ? citas.consulta(ref) : ordem.indexOf(ref) + 1);
  const ordenadas = [...ordem].sort((a, b) => {
    const aa = a.startsWith('aprendizado:') ? 0 : 1;
    const bb = b.startsWith('aprendizado:') ? 0 : 1;
    return aa - bb || numero(a) - numero(b);
  });
  const cartoes = [];
  for (const ref of ordenadas) {
    let realce = false;
    if (ref.startsWith('aprendizado:') && learning?.primeiraVez && !cliente) realce = learning.primeiraVez(ref.slice(12));
    const c = cartaoFonte(ctx, ref, numero(ref), { realce });
    if (c) cartoes.push(c);
  }
  if (!cartoes.length) return null;
  cartoes.forEach((c, i) => c.style.setProperty('--i', String(i)));
  const grade = h('div', { class: 'fontes__grade' }, cartoes.slice(0, max));
  const resto = cartoes.slice(max);
  const mais = resto.length ? h('button', {
    type: 'button', class: 'fontes__mais',
    onClick: (e) => { grade.append(...resto); e.currentTarget.remove(); resto[0]?.focus(); },
  }, `+ ${resto.length} ${resto.length === 1 ? 'fonte' : 'fontes'}`) : null;
  return h('section', { class: 'fontes', 'aria-label': 'Fontes' }, h('h3', { class: 'fontes__titulo' }, 'Fontes'), grade, mais);
}

/**
 * Sobrescrito de citação ligado aos cartões dentro de `raiz` (hover/foco destaca o cartão com o mesmo
 * data-ref; clique abre a gaveta; com `cliente`, na versão do cliente).
 */
export function citeNodeLigado(raiz, ctx, { cliente } = {}) {
  if (cliente) ctx = ctxDoCliente(ctx, cliente);
  const marca = (ref, on) => {
    for (const c of raiz.querySelectorAll('.fonte[data-ref]')) if (c.dataset.ref === ref) c.classList.toggle('is-linked', on);
  };
  return (ref, n) => {
    const b = h('button', {
      type: 'button', class: 'md-cite', 'data-ref': ref, 'aria-label': `Fonte ${n}`,
      onClick: (e) => { e.preventDefault(); e.stopPropagation(); abrirFonte(ctx, ref); },
      onMouseenter: () => marca(ref, true), onMouseleave: () => marca(ref, false),
      onFocus: () => marca(ref, true), onBlur: () => marca(ref, false),
    }, String(n));
    return h('sup', { class: 'md-sup' }, b);
  };
}

/** [{n, tipo, rotulo}] para o "Copiar" (com `cliente`, só o que a versão do cliente resolve). */
export function rotulosParaCopiar(ctx, refs, citas, { cliente } = {}) {
  if (cliente) ctx = ctxDoCliente(ctx, cliente);
  const out = [];
  for (const ref of refs) {
    const r = resolve(ctx, ref);
    if (!r) continue;
    const n = citas?.consulta?.(ref) ?? out.length + 1;
    out.push({ n, tipo: r.tipo === 'aprendizado' ? `Registrado por ${r.detalhe?.autor || 'você'}` : r.tipoNome, rotulo: r.rotulo });
  }
  return out.sort((a, b) => a.n - b.n);
}

/** Atualiza os "há 5 min" visíveis (chamado de tempos em tempos pela conversa e pelo Cérebro). */
export function atualizaQuandos(raiz = document) {
  for (const el of raiz.querySelectorAll('.fonte__quando[data-quando]')) el.textContent = quando(el.dataset.quando);
}
