// Componentes de tela da demo (PLANO §5.3). Todos devolvem elementos DOM.
import { fmt } from './format.js';

// ---------------------------------------------------------------------------
// h(): cria elementos

const PROP_ATTRS = new Set(['value', 'checked', 'selected', 'disabled', 'hidden', 'indeterminate']);

function appendChildren(el, children) {
  for (const c of children) {
    if (c == null || c === false || c === true) continue;
    if (Array.isArray(c)) appendChildren(el, c);
    else if (c instanceof Node) el.appendChild(c);
    else el.appendChild(document.createTextNode(String(c)));
  }
}

/**
 * h(tag, attrs, ...children)
 * attrs: class (string|array), style (string|objeto), on<Evento>: handler, data-*, aria-*,
 * value/checked/disabled/hidden como propriedade, demais como atributo (true → "", false/null → omitido).
 */
export function h(tag, attrs, ...children) {
  const el = document.createElement(tag);
  if (attrs && (attrs instanceof Node || Array.isArray(attrs) || typeof attrs !== 'object')) {
    children.unshift(attrs);
    attrs = null;
  }
  if (attrs) {
    for (const [k, v] of Object.entries(attrs)) {
      if (v == null || v === false) {
        if (PROP_ATTRS.has(k)) el[k] = false;
        continue;
      }
      if (k === 'class' || k === 'className') {
        el.className = Array.isArray(v) ? v.filter(Boolean).join(' ') : v;
      } else if (k === 'style') {
        if (typeof v === 'string') el.setAttribute('style', v);
        else Object.assign(el.style, v);
      } else if (k.startsWith('on') && typeof v === 'function') {
        el.addEventListener(k.slice(2).toLowerCase(), v);
      } else if (PROP_ATTRS.has(k)) {
        el[k] = v;
        if (v === true) el.setAttribute(k, '');
      } else if (k === 'text') {
        el.textContent = v;
      } else {
        el.setAttribute(k, v === true ? '' : String(v));
      }
    }
  }
  appendChildren(el, children);
  return el;
}

let uid = 0;
export function uniqueId(prefix = 'ui') {
  uid += 1;
  return `${prefix}-${uid}`;
}

// ---------------------------------------------------------------------------
// Ícones: traço 1.75px, 24×24, desenhados no estilo lucide.
// Cada item: string = path; "c:cx,cy,r"; "r:x,y,w,h,rx"; "e:cx,cy,rx,ry".

const ICONS = {
  gauge: ['m12 14 4-4', 'M3.34 19a10 10 0 1 1 17.32 0'],
  brain: [
    'M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z',
    'M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z',
    'M12 5v13', 'M9 13a4.5 4.5 0 0 0 3-4', 'M15 13a4.5 4.5 0 0 1-3-4',
  ],
  factory: [
    'M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z',
    'M17 18h1', 'M12 18h1', 'M7 18h1',
  ],
  'shield-check': [
    'M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z',
    'm9 12 2 2 4-4',
  ],
  wrench: [
    'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z',
  ],
  handshake: [
    'm11 17 2 2a1 1 0 1 0 3-3',
    'm14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4',
    'm21 3 1 11h-2', 'M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3', 'M3 4h8',
  ],
  megaphone: ['m3 11 18-5v12L3 14v-3z', 'M11.6 16.8a3 3 0 1 1-5.8-1.6'],
  users: ['M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2', 'c:9,7,4', 'M22 21v-2a4 4 0 0 0-3-3.87', 'M16 3.13a4 4 0 0 1 0 7.75'],
  store: [
    'm2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7', 'M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8',
    'M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4', 'M2 7h20', 'M22 7v3a2 2 0 0 1-2 2 3 3 0 0 1-2.5-1.3A3 3 0 0 1 15 12a3 3 0 0 1-3-1.3A3 3 0 0 1 9 12a3 3 0 0 1-2.5-1.3A3 3 0 0 1 4 12a2 2 0 0 1-2-2V7',
  ],
  plug: ['M12 22v-5', 'M9 8V2', 'M15 8V2', 'M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z'],
  lock: ['r:3,11,18,11,2', 'M7 11V7a5 5 0 0 1 10 0v4'],
  search: ['c:11,11,8', 'm21 21-4.3-4.3'],
  send: [
    'M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.497.497 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z',
    'm21.854 2.147-10.94 10.939',
  ],
  file: ['M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z', 'M14 2v4a2 2 0 0 0 2 2h4', 'M8 13h8', 'M8 17h5'],
  alert: ['m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3', 'M12 9v4', 'M12 17h.01'],
  check: ['M20 6 9 17l-5-5'],
  x: ['M18 6 6 18', 'm6 6 12 12'],
  'chevron-right': ['m9 18 6-6-6-6'],
  'chevron-left': ['m15 18-6-6 6-6'],
  'chevron-down': ['m6 9 6 6 6-6'],
  phone: ['r:5,2,14,20,2', 'M12 18h.01'],
  clock: ['c:12,12,10', 'M12 6v6l4 2'],
  sparkles: [
    'M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z',
    'M20 3v4', 'M22 5h-4',
  ],
  filter: ['M22 3H2l8 9.46V19l4 2v-8.54L22 3z'],
  external: ['M15 3h6v6', 'M10 14 21 3', 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6'],
  user: ['M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2', 'c:12,7,4'],
  box: [
    'M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z',
    'm3.3 7 8.7 5 8.7-5', 'M12 22V12',
  ],
  truck: [
    'M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2', 'M15 18H9',
    'M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14', 'c:17,18,2', 'c:7,18,2',
  ],
  menu: ['M4 6h16', 'M4 12h16', 'M4 18h16'],
  'settings-2': ['M20 7h-9', 'M14 17H5', 'c:17,17,3', 'c:7,7,3'],
  // extras do núcleo
  'arrow-up': ['M12 19V5', 'm5 12 7-7 7 7'],
  'arrow-down': ['M12 5v14', 'm19 12-7 7-7-7'],
  'arrow-right': ['M5 12h14', 'm12 5 7 7-7 7'],
  minus: ['M5 12h14'],
  plus: ['M5 12h14', 'M12 5v14'],
  trash: ['M3 6h18', 'M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6', 'M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2', 'M10 11v6', 'M14 11v6'],
  info: ['c:12,12,10', 'M12 16v-4', 'M12 8h.01'],
  cpu: ['r:4,4,16,16,2', 'r:9,9,6,6,1', 'M15 2v2', 'M15 20v2', 'M2 15h2', 'M2 9h2', 'M20 15h2', 'M20 9h2', 'M9 2v2', 'M9 20v2'],
  database: ['e:12,5,9,3', 'M3 5v14a9 3 0 0 0 18 0V5', 'M3 12a9 3 0 0 0 18 0'],
  book: ['M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20'],
  scale: ['M12 3v18', 'M7 21h10', 'M5 7h14', 'm5 7-3 7a3 3 0 0 0 6 0Z', 'm19 7-3 7a3 3 0 0 0 6 0Z'],
  layers: ['m12.83 2.18 8.58 3.9a1 1 0 0 1 0 1.83l-8.58 3.9a2 2 0 0 1-1.66 0L2.6 7.9a1 1 0 0 1 0-1.83l8.58-3.9a2 2 0 0 1 1.66 0Z', 'm2.6 12 8.57 3.9a2 2 0 0 0 1.66 0L21.4 12', 'm2.6 17 8.57 3.9a2 2 0 0 0 1.66 0L21.4 17'],
  refresh: ['M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8', 'M21 3v5h-5', 'M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16', 'M8 16H3v5'],
  message: ['M7.9 20A9 9 0 1 0 4 16.1L2 22Z'],
  calendar: ['r:3,4,18,18,2', 'M16 2v4', 'M8 2v4', 'M3 10h18'],
  chart: ['M3 3v18h18', 'm19 9-5 5-4-4-3 3'],
  building: ['r:4,2,16,20,2', 'M9 22v-4h6v4', 'M8 6h.01', 'M16 6h.01', 'M12 6h.01', 'M12 10h.01', 'M12 14h.01', 'M16 10h.01', 'M16 14h.01', 'M8 10h.01', 'M8 14h.01'],
};

const ICON_ALIASES = { 'alert-triangle': 'alert', 'external-link': 'external', smartphone: 'phone', sliders: 'settings-2', close: 'x', 'file-text': 'file' };

const SVG_NS = 'http://www.w3.org/2000/svg';

/** SVG inline de traço. Ícone desconhecido vira um círculo neutro (nunca quebra). */
export function icon(name, { size = 18, class: cls = '', label } = {}) {
  const parts = ICONS[name] || ICONS[ICON_ALIASES[name]] || ['c:12,12,4'];
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('width', String(size));
  svg.setAttribute('height', String(size));
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '1.75');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  svg.setAttribute('class', `icon icon-${name}${cls ? ` ${cls}` : ''}`);
  if (label) {
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', label);
  } else {
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
  }
  for (const p of parts) {
    let el;
    if (p.startsWith('c:')) {
      const [cx, cy, r] = p.slice(2).split(',');
      el = document.createElementNS(SVG_NS, 'circle');
      el.setAttribute('cx', cx); el.setAttribute('cy', cy); el.setAttribute('r', r);
    } else if (p.startsWith('r:')) {
      const [x, y, w, hh, rx] = p.slice(2).split(',');
      el = document.createElementNS(SVG_NS, 'rect');
      el.setAttribute('x', x); el.setAttribute('y', y); el.setAttribute('width', w); el.setAttribute('height', hh);
      if (rx) el.setAttribute('rx', rx);
    } else if (p.startsWith('e:')) {
      const [cx, cy, rx, ry] = p.slice(2).split(',');
      el = document.createElementNS(SVG_NS, 'ellipse');
      el.setAttribute('cx', cx); el.setAttribute('cy', cy); el.setAttribute('rx', rx); el.setAttribute('ry', ry);
    } else {
      el = document.createElementNS(SVG_NS, 'path');
      el.setAttribute('d', p);
    }
    svg.appendChild(el);
  }
  return svg;
}

// ---------------------------------------------------------------------------
// Estrutura de página

export function pageHeader({ titulo, subtitulo, acoes } = {}) {
  return h('div', { class: 'page-header' },
    h('div', { class: 'page-header__text' },
      titulo ? h('h2', { class: 'page-title' }, titulo) : null,
      subtitulo ? h('p', { class: 'page-subtitle' }, subtitulo) : null),
    acoes ? h('div', { class: 'page-header__actions' }, acoes) : null);
}

export function card({ titulo, subtitulo, acoes, corpo, class: cls, id } = {}) {
  const hasHead = titulo || acoes;
  return h('section', { class: ['card', cls], id },
    hasHead
      ? h('header', { class: 'card__head' },
        h('div', { class: 'card__titles' },
          titulo ? h('h3', { class: 'card__title' }, titulo) : null,
          subtitulo ? h('p', { class: 'card__subtitle' }, subtitulo) : null),
        acoes ? h('div', { class: 'card__actions' }, acoes) : null)
      : null,
    h('div', { class: 'card__body' }, corpo));
}

export function toolbar(...children) {
  return h('div', { class: 'toolbar', role: 'group' }, ...children);
}

export function emptyState(texto, { icone = 'search' } = {}) {
  return h('div', { class: 'empty-state' }, icon(icone, { size: 22 }), h('p', null, texto || 'Nada por aqui.'));
}

// ---------------------------------------------------------------------------
// Badges

export function badge(text, tone = 'neutral') {
  return h('span', { class: `badge badge--${tone}` }, text);
}

const STATUS = {
  planejada: ['Planejada', 'neutral'],
  em_producao: ['Em produção', 'accent'],
  atrasada: ['Atrasada', 'danger'],
  atrasado: ['Atrasado', 'danger'],
  concluida: ['Concluída', 'ok'],
  aberta: ['Aberta', 'warn'],
  em_analise: ['Em análise', 'accent'],
  encerrada: ['Encerrada', 'ok'],
  em_execucao: ['Em execução', 'accent'],
  aprovado: ['Aprovado', 'ok'],
  faturado: ['Faturado', 'accent'],
  entregue: ['Entregue', 'ok'],
  operando: ['Operando', 'ok'],
  alerta: ['Alerta', 'warn'],
  parada: ['Parada', 'danger'],
  manutencao: ['Em manutenção', 'warn'],
  conectado: ['Conectado', 'ok'],
  sincronizando: ['Sincronizando', 'accent'],
  erro: ['Erro', 'danger'],
  planejado: ['Planejado', 'neutral'],
  rascunho: ['Rascunho', 'neutral'],
  em_revisao: ['Em revisão', 'warn'],
  baixa: ['Baixa', 'neutral'],
  media: ['Média', 'warn'],
  alta: ['Alta', 'danger'],
  corretiva: ['Corretiva', 'warn'],
  preventiva: ['Preventiva', 'neutral'],
  preditiva: ['Preditiva', 'accent'],
  interna: ['Interna', 'neutral'],
  cliente: ['Cliente', 'warn'],
  fornecedor: ['Fornecedor', 'neutral'],
};

export function statusInfo(status) {
  const s = STATUS[status];
  if (s) return { label: s[0], tone: s[1] };
  const label = String(status ?? '').replace(/_/g, ' ');
  return { label: label.charAt(0).toUpperCase() + label.slice(1), tone: 'neutral' };
}

export function statusBadge(status) {
  const { label, tone } = statusInfo(status);
  return h('span', { class: `badge badge--${tone} badge--status`, 'data-status': status }, h('span', { class: 'badge__dot', 'aria-hidden': 'true' }), label);
}

const REF_ICON = {
  doc: 'file', op: 'factory', turno: 'clock', pedido: 'box', sku: 'box', cliente: 'building', rep: 'user',
  regra: 'scale', nc: 'shield-check', os: 'wrench', maq: 'cpu', kpi: 'chart', saber: 'users', integ: 'plug',
};

/** Chip clicável de fonte. Some (null) quando a ref não resolve ou o módulo dono está desligado. */
export function refChip(ref, ctx) {
  const r = ctx && typeof ctx.resolveRef === 'function' ? ctx.resolveRef(ref) : null;
  if (!r) return null;
  return h('button', {
    type: 'button',
    class: 'ref-chip',
    'data-ref': ref,
    title: `${r.tipoNome || 'Fonte'}: ${r.rotulo}`,
    onClick: (e) => {
      e.preventDefault();
      e.stopPropagation();
      ctx.openRef(ref);
    },
  }, icon(REF_ICON[r.tipo] || 'file', { size: 14 }), h('span', { class: 'ref-chip__label' }, r.rotulo));
}

// ---------------------------------------------------------------------------
// KPI e sparkline

function smoothPath(pts) {
  if (pts.length < 2) return '';
  let d = `M${pts[0][0].toFixed(2)},${pts[0][1].toFixed(2)}`;
  for (let i = 0; i < pts.length - 1; i += 1) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C${c1x.toFixed(2)},${c1y.toFixed(2)} ${c2x.toFixed(2)},${c2y.toFixed(2)} ${p2[0].toFixed(2)},${p2[1].toFixed(2)}`;
  }
  return d;
}

/** Sparkline com área suave e ponto final. Cor = currentColor (use a classe para tingir). */
export function sparkline(values, { width = 120, height = 36, class: cls = '', label } = {}) {
  const vals = (values || []).map(Number).filter((v) => Number.isFinite(v));
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  svg.setAttribute('width', String(width));
  svg.setAttribute('height', String(height));
  svg.setAttribute('class', `sparkline ${cls}`.trim());
  if (label) {
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', label);
  } else svg.setAttribute('aria-hidden', 'true');
  if (vals.length < 2) return svg;
  const pad = 3;
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const span = max - min || 1;
  const pts = vals.map((v, i) => [
    pad + (i * (width - pad * 2)) / (vals.length - 1),
    pad + (1 - (v - min) / span) * (height - pad * 2),
  ]);
  const line = smoothPath(pts);
  const last = pts[pts.length - 1];
  const area = document.createElementNS(SVG_NS, 'path');
  area.setAttribute('d', `${line} L${last[0].toFixed(2)},${height} L${pts[0][0].toFixed(2)},${height} Z`);
  area.setAttribute('class', 'sparkline__area');
  const path = document.createElementNS(SVG_NS, 'path');
  path.setAttribute('d', line);
  path.setAttribute('class', 'sparkline__line');
  const dot = document.createElementNS(SVG_NS, 'circle');
  dot.setAttribute('cx', last[0].toFixed(2));
  dot.setAttribute('cy', last[1].toFixed(2));
  dot.setAttribute('r', '2.75');
  dot.setAttribute('class', 'sparkline__dot');
  svg.append(area, path, dot);
  return svg;
}

/** Valor com unidade: 71,4% · R$ 1,2 mi · 3,1 dias. */
export function formatValue(valor, unidade) {
  if (typeof valor !== 'number') return String(valor ?? '—');
  const u = unidade || '';
  if (u === '%') return fmt.pct(valor);
  if (u === 'R$') return fmt.money(valor, { compact: true });
  if (u.startsWith('R$')) return `R$ ${fmt.num(valor)} ${u.slice(2).trim()}`.trim();
  return u ? `${fmt.num(valor)} ${u}` : fmt.num(valor);
}

/** Variação do último mês contra o anterior, com tom semântico conforme kpi.direcao. */
export function kpiDelta(kpi) {
  const t = Array.isArray(kpi?.tendencia) ? kpi.tendencia.filter((v) => typeof v === 'number') : [];
  if (t.length < 2) return null;
  const cur = t[t.length - 1];
  const prev = t[t.length - 2];
  const diff = cur - prev;
  const better = kpi.direcao === 'menor_melhor' ? diff < 0 : diff > 0;
  const tone = Math.abs(diff) < 1e-9 ? 'neutral' : better ? 'ok' : 'danger';
  let text;
  if (kpi.unidade === '%') text = `${diff > 0 ? '+' : diff < 0 ? '−' : ''}${fmt.num(Math.abs(diff), 1)} p.p.`;
  else if (prev !== 0) {
    const rel = (diff / Math.abs(prev)) * 100;
    text = `${rel > 0 ? '+' : rel < 0 ? '−' : ''}${fmt.num(Math.abs(rel), 1)}%`;
  } else text = `${diff > 0 ? '+' : ''}${fmt.num(diff)}`;
  return { diff, tone, text, dir: diff > 0 ? 'up' : diff < 0 ? 'down' : 'flat' };
}

export function kpiTile({ kpi, onClick } = {}) {
  if (!kpi) return null;
  const delta = kpiDelta(kpi);
  const meetsGoal = typeof kpi.meta === 'number' && typeof kpi.valor === 'number'
    ? (kpi.direcao === 'menor_melhor' ? kpi.valor <= kpi.meta : kpi.valor >= kpi.meta)
    : null;
  const interactive = typeof onClick === 'function';
  const tile = h('div', {
    class: ['kpi-tile', interactive && 'kpi-tile--interactive'],
    role: interactive ? 'button' : null,
    tabindex: interactive ? '0' : null,
    'data-kpi': kpi.id,
    onClick: interactive ? () => onClick(kpi) : null,
    onKeydown: interactive
      ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(kpi);
        }
      }
      : null,
  },
  h('div', { class: 'kpi-tile__name' }, kpi.nome),
  h('div', { class: 'kpi-tile__value num' }, formatValue(kpi.valor, kpi.unidade)),
  h('div', { class: 'kpi-tile__meta' },
    typeof kpi.meta === 'number'
      ? h('span', { class: ['kpi-tile__goal', meetsGoal === false && 'is-off'] }, `Meta ${formatValue(kpi.meta, kpi.unidade)}`)
      : null,
    delta
      ? h('span', { class: `kpi-tile__delta tone-${delta.tone}`, title: 'Variação contra o mês anterior' },
        icon(delta.dir === 'up' ? 'arrow-up' : delta.dir === 'down' ? 'arrow-down' : 'minus', { size: 14 }),
        h('span', { class: 'num' }, delta.text),
        h('span', { class: 'sr-only' }, ' em relação ao mês anterior'))
      : null),
  sparkline(kpi.tendencia, {
    width: 160, height: 40, class: 'kpi-tile__spark',
    label: `Tendência de 12 meses de ${kpi.nome}`,
  }));
  return tile;
}

// ---------------------------------------------------------------------------
// Tabela

/**
 * table({columns:[{key,label,render?,align?,width?}], rows, onRowClick?, empty?, sticky?, caption?, rowClass?})
 * Rola dentro do próprio container. Linhas clicáveis respondem a Enter e Espaço.
 */
export function table({ columns = [], rows = [], onRowClick, empty, sticky = true, caption, rowClass } = {}) {
  if (!rows || rows.length === 0) {
    return typeof empty === 'string' || !empty ? emptyState(empty || 'Nenhum registro para mostrar.') : empty;
  }
  const clickable = typeof onRowClick === 'function';
  const thead = h('thead', null, h('tr', null, columns.map((c) => h('th', {
    scope: 'col', class: c.align ? `align-${c.align}` : null, style: c.width ? { width: c.width } : null,
  }, c.label ?? ''))));
  const tbody = h('tbody', null, rows.map((row, i) => {
    const tr = h('tr', {
      class: [clickable && 'is-clickable', typeof rowClass === 'function' ? rowClass(row) : null],
      tabindex: clickable ? '0' : null,
      onClick: clickable ? (e) => {
        if (e.target.closest('button, a, input, select, textarea') && e.target.closest('tr') === tr) {
          if (!e.target.closest('td')?.classList.contains('cell-pass')) return;
        }
        onRowClick(row, i);
      } : null,
      onKeydown: clickable ? (e) => {
        if ((e.key === 'Enter' || e.key === ' ') && e.target === tr) {
          e.preventDefault();
          onRowClick(row, i);
        }
      } : null,
    }, columns.map((c) => {
      const v = c.render ? c.render(row, i) : row[c.key];
      return h('td', { class: c.align ? `align-${c.align}` : null }, v instanceof Node || Array.isArray(v) ? v : v == null ? '' : String(v));
    }));
    return tr;
  }));
  return h('div', { class: ['table-wrap', sticky && 'table-wrap--sticky'], tabindex: '0', role: 'region', 'aria-label': caption || 'Tabela' },
    h('table', { class: 'table' }, caption ? h('caption', { class: 'sr-only' }, caption) : null, thead, tbody));
}

// ---------------------------------------------------------------------------
// Abas acessíveis

/** tabs([{id, label, render}], {initial, onChange}) → render(panel) pode devolver um Node ou preencher o painel. */
export function tabs(items = [], { initial, onChange } = {}) {
  const base = uniqueId('tabs');
  const root = h('div', { class: 'tabs' });
  const list = h('div', { class: 'tabs__list', role: 'tablist' });
  const panel = h('div', { class: 'tabs__panel', role: 'tabpanel', tabindex: '0' });
  const buttons = [];
  let active = null;

  function select(id, focus = false) {
    const item = items.find((t) => t.id === id) || items[0];
    if (!item) return;
    active = item.id;
    for (const b of buttons) {
      const on = b.dataset.tab === item.id;
      b.setAttribute('aria-selected', on ? 'true' : 'false');
      b.tabIndex = on ? 0 : -1;
      if (on && focus) b.focus();
    }
    panel.setAttribute('aria-labelledby', `${base}-${item.id}`);
    panel.replaceChildren();
    try {
      const out = item.render ? item.render(panel) : null;
      if (out instanceof Node) panel.appendChild(out);
    } catch (err) {
      console.error('[tabs] falha ao renderizar aba', item.id, err);
      panel.appendChild(emptyState('Não foi possível mostrar esta aba.', { icone: 'alert' }));
    }
    if (typeof onChange === 'function') onChange(item.id);
  }

  items.forEach((t) => {
    const b = h('button', {
      type: 'button', role: 'tab', class: 'tabs__tab', id: `${base}-${t.id}`,
      'aria-controls': `${base}-panel`, 'data-tab': t.id, 'aria-selected': 'false', tabindex: '-1',
      onClick: () => select(t.id),
      onKeydown: (e) => {
        const idx = items.findIndex((x) => x.id === t.id);
        let next = null;
        if (e.key === 'ArrowRight') next = items[(idx + 1) % items.length];
        else if (e.key === 'ArrowLeft') next = items[(idx - 1 + items.length) % items.length];
        else if (e.key === 'Home') next = items[0];
        else if (e.key === 'End') next = items[items.length - 1];
        if (next) {
          e.preventDefault();
          select(next.id, true);
        }
      },
    }, t.label);
    buttons.push(b);
    list.appendChild(b);
  });
  panel.id = `${base}-panel`;
  root.append(list, panel);
  select(initial || items[0]?.id);
  root.select = (id) => select(id);
  root.getActive = () => active;
  return root;
}

// ---------------------------------------------------------------------------
// Controles

/** select({id, label, options:[{value,label}], value, onChange}) → <label> com o <select> dentro (.control). */
export function select({ id, label, options = [], value, onChange, hideLabel = false } = {}) {
  const sid = id || uniqueId('sel');
  const sel = h('select', {
    id: sid, class: 'select',
    onChange: (e) => typeof onChange === 'function' && onChange(e.target.value),
  }, options.map((o) => h('option', { value: o.value, selected: String(o.value) === String(value) }, o.label)));
  if (value != null) sel.value = String(value);
  return h('label', { class: 'control', for: sid },
    label ? h('span', { class: ['control__label', hideLabel && 'sr-only'] }, label) : null,
    h('span', { class: 'select-wrap' }, sel, icon('chevron-down', { size: 16, class: 'select-wrap__chev' })));
}

export function searchInput({ id, placeholder = 'Buscar', onInput, value = '', label } = {}) {
  const sid = id || uniqueId('busca');
  const input = h('input', {
    id: sid, type: 'search', class: 'search-input__field', placeholder, value,
    'aria-label': label || placeholder, autocomplete: 'off',
    onInput: (e) => typeof onInput === 'function' && onInput(e.target.value),
  });
  return h('div', { class: 'search-input' }, icon('search', { size: 16 }), input);
}

export function progress(value, { tone, label } = {}) {
  const v = Math.max(0, Math.min(100, Number(value) || 0));
  return h('div', {
    class: ['progress', tone && `progress--${tone}`], role: 'progressbar',
    'aria-valuemin': '0', 'aria-valuemax': '100', 'aria-valuenow': String(Math.round(v)),
    'aria-label': label || 'Progresso',
  }, h('div', { class: 'progress__bar', style: { width: `${v}%` } }));
}

export function phoneFrame(children) {
  return h('div', { class: 'phone-frame' },
    h('div', { class: 'phone-frame__notch', 'aria-hidden': 'true' }),
    h('div', { class: 'phone-frame__screen' }, children));
}

export function toast(texto, { tone = 'neutral', duration = 3600 } = {}) {
  let region = document.getElementById('toast-region');
  if (!region) {
    region = h('div', { id: 'toast-region', class: 'toast-region', role: 'status', 'aria-live': 'polite' });
    document.body.appendChild(region);
  }
  const t = h('div', { class: `toast toast--${tone}` }, texto);
  region.appendChild(t);
  setTimeout(() => {
    t.classList.add('is-leaving');
    setTimeout(() => t.remove(), 250);
  }, duration);
  return t;
}

/** Lista de pares rótulo/valor (usada na gaveta e úteis nas telas). */
export function facts(pairs = []) {
  return h('dl', { class: 'facts' }, pairs.filter((p) => p && p[1] != null && p[1] !== '').map(([k, v]) =>
    h('div', { class: 'facts__row' }, h('dt', null, k), h('dd', null, v))));
}

export function button(label, { variant = 'secondary', icone, onClick, type = 'button', size, ...rest } = {}) {
  return h('button', { type, class: ['btn', `btn--${variant}`, size && `btn--${size}`], onClick, ...rest },
    icone ? icon(icone, { size: 16 }) : null, label);
}
