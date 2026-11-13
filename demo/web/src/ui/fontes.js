// Fontes da resposta (UX §4.5.4): sobrescritos numerados ligados a cartões com o sistema de origem.
//
//   blocoFontes({ctx, refs, citas, learning, max}) → <section> "Fontes" com cartões (aprendido primeiro)
//   cartaoFonte(ctx, ref, n, {realce}) → <button> cartão de 72 px (ou null se a ref não resolve)
//   cartaoAprendido(item, {ctx, estatico}) → cartão "Registrado por {autor} · agora"
//   citeNodeLigado(raiz, ctx) → fábrica de sobrescritos: hover/foco destaca o cartão, clique abre a gaveta
//   sistemaDaRef(resolved, ctx) · quando(iso) · rotulosParaCopiar(ctx, refs, citas)

import { h, icon } from '../ui.js';
import { statusLabel } from '../ai/local-engine.js';

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

/** Sistema de origem de uma fonte (linha 1 do cartão). */
export function sistemaDaRef(r, ctx) {
  const d = r?.detalhe ?? {};
  const temMes = (ctx?.data?.integracoes ?? []).some((i) => /\bMES\b/i.test(`${i.tipo} ${i.nome}`));
  switch (r?.tipo) {
    case 'doc': return d.doc?.origem || 'Documento';
    case 'op': case 'turno': return temMes ? 'MES' : 'ERP';
    case 'pedido': case 'sku': case 'cliente': case 'rep': case 'regra': return 'ERP';
    case 'nc': return 'Qualidade';
    case 'os': case 'maq': return 'Manutenção';
    case 'saber': return 'Saber de operador';
    case 'kpi': return 'Indicador';
    case 'integ': return 'Integrações';
    default: return '';
  }
}

/** Linha 3 do cartão: status, data, trecho. */
function detalheDaRef(r, ctx) {
  const d = r?.detalhe ?? {};
  const t = (k) => (typeof ctx?.term === 'function' ? ctx.term(k) : k);
  switch (r?.tipo) {
    case 'op': return [statusLabel(d.status), d.progresso != null ? `${d.progresso}%` : null, d.prazo ? `prazo ${dataBr(d.prazo)}` : null].filter(Boolean).join(' · ');
    case 'pedido': return [statusLabel(d.status), d.previsao_entrega ? `previsão ${dataBr(d.previsao_entrega)}` : null].filter(Boolean).join(' · ');
    case 'nc': return [statusLabel(d.status), d.severidade ? `severidade ${d.severidade}` : null].filter(Boolean).join(' · ');
    case 'os': return [statusLabel(d.status), d.tecnico].filter(Boolean).join(' · ');
    case 'maq': return [statusLabel(d.status), d.proxima_preventiva ? `preventiva ${dataBr(d.proxima_preventiva)}` : null].filter(Boolean).join(' · ');
    case 'doc': return d.trecho ? curto(d.trecho.texto, 90) : d.doc?.atualizado ? `atualizado ${dataBr(d.doc.atualizado)}` : '';
    case 'turno': return `${d.produzido ?? '—'} produzidas · ${d.paradas_min ?? 0} min de parada`;
    case 'sku': return d.estoque != null ? `estoque ${d.estoque.toLocaleString('pt-BR')} · mínimo ${Number(d.estoque_minimo ?? 0).toLocaleString('pt-BR')}` : '';
    case 'cliente': return [d.cidade && d.uf ? `${d.cidade}/${d.uf}` : null, d.tabela_preco].filter(Boolean).join(' · ');
    case 'rep': return d.meta_mes ? `${Math.round((d.realizado_mes / d.meta_mes) * 100)}% da meta do mês` : t('representante');
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

/** Cartão de um registro aprendido (fonte, confirmação e listas). */
export function cartaoAprendido(item, { ctx, n, estatico = false, realce = false, onClick } = {}) {
  const autor = item?.autor || 'Você';
  const quem = autor === 'Você' ? 'você' : autor;
  const linha1 = h('span', { class: 'fonte__l1 fonte__l1--aprendido' },
    n ? h('span', { class: 'fonte__n num' }, String(n)) : null,
    icon('lightbulb', { size: 14 }),
    h('span', null, `Registrado por ${quem} · `, h('span', { class: 'fonte__quando', 'data-quando': item?.criado_em || '' }, quando(item?.criado_em))));
  const filhos = [linha1,
    h('span', { class: 'fonte__l2' }, item?.titulo || curto(item?.texto, 60)),
    h('span', { class: 'fonte__l3' }, curto(item?.texto, 110))];
  const cls = ['fonte', 'fonte--aprendido', realce && 'is-new'];
  if (estatico) return h('div', { class: cls, 'data-ref': `aprendizado:${item?.id}` }, ...filhos);
  return h('button', {
    type: 'button', class: cls, 'data-ref': `aprendizado:${item?.id}`,
    'aria-label': `${n ? `Fonte ${n}: ` : ''}registrado por ${quem}: ${item?.titulo ?? ''}`,
    onClick: onClick ?? (() => ctx?.openRef?.(`aprendizado:${item?.id}`)),
  }, ...filhos);
}

/** Cartão de fonte (botão que abre a gaveta). null quando a ref não resolve. */
export function cartaoFonte(ctx, ref, n, { realce = false } = {}) {
  const r = resolve(ctx, ref);
  if (!r) return null;
  if (r.tipo === 'aprendizado') return cartaoAprendido(r.detalhe, { ctx, n, realce });
  const sistema = sistemaDaRef(r, ctx);
  const det = detalheDaRef(r, ctx);
  return h('button', {
    type: 'button', class: 'fonte', 'data-ref': ref,
    'aria-label': `Fonte ${n ?? ''}: ${r.tipoNome}${sistema ? `, ${sistema}` : ''}: ${r.rotulo}`,
    onClick: () => ctx?.openRef?.(ref),
  },
  h('span', { class: 'fonte__l1' },
    n ? h('span', { class: 'fonte__n num' }, String(n)) : null,
    icon(ICONE[r.tipo] || 'file', { size: 14 }),
    h('span', null, sistema ? `${r.tipoNome} · ${sistema}` : r.tipoNome)),
  h('span', { class: 'fonte__l2' }, r.rotulo),
  det ? h('span', { class: 'fonte__l3' }, det) : null);
}

/**
 * Seção "Fontes". `refs` = fontes da resposta; `citas` (criaCitas de markdown.js) já numerou as do
 * texto; as que vieram só em `fontes` ganham os números seguintes. Aprendido primeiro; 4 visíveis.
 */
export function blocoFontes({ ctx, refs = [], citas, learning, max = 4 } = {}) {
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
    if (ref.startsWith('aprendizado:') && learning?.primeiraVez) realce = learning.primeiraVez(ref.slice(12));
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
 * data-ref; clique abre a gaveta).
 */
export function citeNodeLigado(raiz, ctx) {
  const marca = (ref, on) => {
    for (const c of raiz.querySelectorAll('.fonte[data-ref]')) if (c.dataset.ref === ref) c.classList.toggle('is-linked', on);
  };
  return (ref, n) => {
    const b = h('button', {
      type: 'button', class: 'md-cite', 'data-ref': ref, 'aria-label': `Fonte ${n}`,
      onClick: (e) => { e.preventDefault(); e.stopPropagation(); ctx?.openRef?.(ref); },
      onMouseenter: () => marca(ref, true), onMouseleave: () => marca(ref, false),
      onFocus: () => marca(ref, true), onBlur: () => marca(ref, false),
    }, String(n));
    return h('sup', { class: 'md-sup' }, b);
  };
}

/** [{n, tipo, rotulo}] para o "Copiar". */
export function rotulosParaCopiar(ctx, refs, citas) {
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
