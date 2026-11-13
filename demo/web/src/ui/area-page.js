// Páginas de área (UX §4.8) e gavetas de detalhe por tipo de registro (UX §7.4).
//
//   areaPage({ ctx, modulo, titulo, subtitulo, numeros, depoisNumeros, corpo }) → { el, cleanup, onLearning }
//   statRow(numeros) · rowList({...}) · listSection({...}) · teamNotes(ctx, {...}) · areaAssistant(ctx, {...})
//   areaResumo(ctx, modulo) → { frase, tom, n } (índice #areas e menu "Áreas ▾")
//   export const drawers = { op, turno, os, maq, nc, pedido, cliente, rep, sku, regra, integ }
//     drawer(info, ctx) → { titulo, subtitulo, eyebrow, corpo: Node, acoes: Node|null } | null
//     info = resolveRef(ref) (+ close/sheet, como o app.openRef passa) ou a string "tipo:id".
//     drawerNode(out) junta corpo + ações num Node só.
//
// Só usa o contrato do ctx (term, areaName, isEnabled, resolveRef, openRef, navigate, fmt, learning,
// perguntar, ensinar, renderMarkdown, sheet, api, demo, ia). Qualquer peça ausente: o botão some.
import * as ui from '../ui.js';
import * as F from '../format.js';

const h = (...a) => ui.h(...a);
const BASE_FMT = F.fmt || F.default;
const norm = (s) => (F.normalize || BASE_FMT.normalize)(s);
/** "parada"/"parado" (format.js); sem o helper, cai na concordância local por gen(). */
export const paradoDe = (ctx, o = {}) => {
  if (typeof F.parado === 'function') return F.parado(ctx, o);
  const txt = `parad${gen(T(ctx, 'maquina'))}${o.plural ? 's' : ''}`;
  return o.maiuscula ? cap(txt) : txt;
};

function icon(name, o) {
  try { return ui.icon(name, o); } catch { return null; }
}

// ---------------------------------------------------------------------------
// CSS

export function ensureAreaCss() {
  if (typeof document === 'undefined') return;
  if (document.querySelector('link[data-css="areas"], link[href*="css/areas.css"]')) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = new URL('../../css/areas.css', import.meta.url).href;
  link.dataset.css = 'areas';
  document.head.appendChild(link);
}
ensureAreaCss();

// ---------------------------------------------------------------------------
// Utilitários de texto e de ctx

export const AREAS = ['producao', 'qualidade', 'manutencao', 'comercial', 'marketing'];
export const AREA_CURTA = {
  producao: 'Produção', qualidade: 'Qualidade', manutencao: 'Manutenção', comercial: 'Comercial',
  marketing: 'Marketing', portal: 'Portal do cliente', operadores: 'Chão de fábrica', gestao: 'Diretoria',
};
const AREA_ICONE = { producao: 'factory', qualidade: 'shield-check', manutencao: 'wrench', comercial: 'handshake', marketing: 'megaphone' };

export const cap = (s) => { s = String(s ?? ''); return s.charAt(0).toUpperCase() + s.slice(1); };
export const fmtOf = (ctx) => ctx?.fmt || BASE_FMT;
export function T(ctx, k) {
  try { return (ctx?.term && ctx.term(k)) || k; } catch { return k; }
}
export function on(ctx, modulo) {
  try { return typeof ctx?.isEnabled === 'function' ? !!ctx.isEnabled(modulo) : true; } catch { return true; }
}
/** 'a' para termos femininos ("máquina", "OP"), 'o' para masculinos ("equipamento"). */
export function gen(termo) {
  const n = norm(termo).split(/\s+/)[0] || '';
  return /^(op|os|ordem|nc)$/.test(n) || /a$/.test(n) ? 'a' : 'o';
}
const plural = (n, um, varios) => (n === 1 ? um : varios);
const corta = (t, n = 70) => {
  const s = String(t ?? '').trim();
  if (s.length <= n) return s;
  const c = s.slice(0, n - 1);
  const i = c.lastIndexOf(' ');
  return `${(i > n * 0.6 ? c.slice(0, i) : c).replace(/[\s,.;:–-]+$/, '')}…`;
};
const list = (ctx, k) => (Array.isArray(ctx?.data?.[k]) ? ctx.data[k] : []);
const byId = (ctx, k, id, key = 'id') => list(ctx, k).find((x) => x && x[key] === id) || null;
const linhaNome = (ctx, id) => byId(ctx, 'linhas', id)?.nome || id || '';
const produto = (ctx, sku) => byId(ctx, 'produtos', sku, 'sku');
const today = (ctx) => ctx?.today || BASE_FMT.TODAY || '2026-11-13';
const resolve = (ctx, ref) => {
  try { return ctx.resolveRef ? ctx.resolveRef(ref) : null; } catch { return null; }
};
const can = (ctx, fn) => typeof ctx?.[fn] === 'function';

function abrirRef(ctx, ref) {
  try { ctx.openRef?.(ref); } catch (err) { console.error('[área] openRef', err); }
}

function navegar(ctx, rota) {
  try {
    if (can(ctx, 'navigate')) ctx.navigate(rota);
    else location.hash = `#${rota}`;
  } catch { location.hash = `#${rota}`; }
}

function perguntar(ctx, texto, opts) {
  try { ctx.perguntar(texto, opts); } catch (err) { console.error('[área] perguntar', err); }
}

function ensinar(ctx, opts) {
  try { ctx.ensinar(opts); } catch (err) { console.error('[área] ensinar', err); }
}

/** Fecha a folha que contém `node` (ou usa o close recebido). */
function fecharFolha(node, sheetApi) {
  try {
    if (sheetApi && typeof sheetApi.close === 'function') { sheetApi.close(); return; }
    const dlg = node?.closest?.('[role="dialog"]');
    const b = dlg?.querySelector('.sheet__close, [data-sheet-close], [aria-label="Fechar"]');
    if (b) b.click();
  } catch { /* nada */ }
}

function btn(label, { variant = 'secondary', icone, onClick, size, ...rest } = {}) {
  if (typeof ui.button === 'function') return ui.button(label, { variant, icone, onClick, size, ...rest });
  return h('button', { type: 'button', class: ['btn', `btn--${variant}`, size && `btn--${size}`], onClick, ...rest },
    icone ? icon(icone, { size: 16 }) : null, label);
}

async function copiar(texto) {
  if (typeof ui.copyText === 'function') return ui.copyText(texto);
  try { await navigator.clipboard.writeText(texto); return true; } catch { return false; }
}

// ---------------------------------------------------------------------------
// Status e selos

const STATUS = {
  planejada: ['Planejada', 'neutral'], em_producao: ['Em produção', 'accent'], atrasada: ['Atrasada', 'danger'],
  concluida: ['Concluída', 'ok'], atrasado: ['Atrasado', 'danger'], aberta: ['Aberta', 'warn'],
  em_analise: ['Em análise', 'neutral'], encerrada: ['Encerrada', 'ok'], em_execucao: ['Em execução', 'accent'],
  aprovado: ['Aprovado', 'ok'], faturado: ['Faturado', 'neutral'], entregue: ['Entregue', 'ok'],
  operando: ['Operando', 'ok'], alerta: ['Em alerta', 'warn'], parada: ['Parada', 'danger'],
  manutencao: ['Em manutenção', 'neutral'], rascunho: ['Rascunho', 'neutral'], em_revisao: ['Em revisão', 'warn'],
  baixa: ['Baixa', 'neutral'], media: ['Média', 'warn'], alta: ['Alta', 'danger'],
  corretiva: ['Corretiva', 'neutral'], preventiva: ['Preventiva', 'neutral'], preditiva: ['Preditiva', 'neutral'],
  interna: ['Interna', 'neutral'], cliente: ['Cliente', 'neutral'], fornecedor: ['Fornecedor', 'neutral'],
  conectado: ['Conectado', 'ok'], sincronizando: ['Sincronizando', 'neutral'], erro: ['Erro', 'danger'],
  planejado: ['Planejado', 'neutral'],
};

/** "B" → "turno B"; "3º" ou "3" → "3º turno"; "Noite" → "turno Noite"; já com "turno" fica como está. */
export function nomeTurno(t) {
  const s = String(t ?? '').trim();
  if (!s) return 'turno';
  if (/\bturno\b/i.test(s)) return s;
  const ord = /^(\d+)\s*[º°o]?$/i.exec(s);
  if (ord) return `${ord[1]}º turno`;
  return `turno ${s}`;
}

export function statusInfo(status, ctx) {
  const s = STATUS[status];
  let label = s ? s[0] : cap(String(status ?? '').replace(/_/g, ' '));
  // "Parada"/"Parado" conforme o termo de máquina do setor (regra única em format.js)
  if (ctx && status === 'parada') label = paradoDe(ctx, { maiuscula: true });
  return { label, tone: s ? s[1] : 'neutral' };
}

export function statusBadge(status, ctx, label) {
  const i = statusInfo(status, ctx);
  return h('span', { class: `badge badge--${i.tone} badge--status ar-badge`, 'data-status': status },
    h('span', { class: 'badge__dot', 'aria-hidden': 'true' }), label || i.label);
}

function tag(texto, tone = 'neutral') {
  return h('span', { class: `badge badge--${tone} ar-badge` }, texto);
}

/** Selo cobalto "n registros" (registros da equipe ligados à linha). */
export function seloRegistros(n) {
  if (!n) return null;
  return h('span', { class: 'ar-selo', title: 'Registros da equipe ligados a este item' },
    icon('lightbulb', { size: 12 }), `${n} ${plural(n, 'registro', 'registros')}`);
}

function barra(valor, { tom } = {}) {
  const v = Math.max(0, Math.min(100, Number(valor) || 0));
  return h('span', { class: `ar-bar${tom ? ` ar-bar--${tom}` : ''}`, role: 'img', 'aria-label': `${Math.round(v)}%` },
    h('span', { class: 'ar-bar__fill', style: `width:${v}%` }));
}

// ---------------------------------------------------------------------------
// Aprendizado (registros da equipe)

export function learnItems(ctx) {
  try {
    const l = ctx?.learning;
    if (l && typeof l.list === 'function') {
      const r = l.list({});
      return Array.isArray(r) ? r.filter(Boolean) : [];
    }
  } catch (err) { console.warn('[área] learning.list', err); }
  return [];
}

export function onLearning(ctx, fn) {
  try {
    const l = ctx?.learning;
    if (l && typeof l.subscribe === 'function') {
      const off = l.subscribe(() => { try { fn(); } catch (err) { console.error('[área] atualização', err); } });
      return typeof off === 'function' ? off : () => {};
    }
  } catch (err) { console.warn('[área] learning.subscribe', err); }
  return () => {};
}

const escRe = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
function cita(texto, id) {
  if (!id) return false;
  return new RegExp(`(^|[^\\p{L}\\p{N}])${escRe(id)}(?![\\p{L}\\p{N}])`, 'iu').test(texto);
}
const recentes = (a, b) => String(b.criado_em || b.id || '').localeCompare(String(a.criado_em || a.id || ''));

/**
 * Registros ligados a um item: mesma máquina, ou texto/título que cita um dos ids.
 * Sem máquina nem ids: os da área.
 */
export function notesFor(ctx, { area, maquina, ids } = {}, todos = learnItems(ctx)) {
  const chaves = [maquina, ...(ids || [])].filter(Boolean);
  return todos.filter((it) => {
    if (maquina && it.maquina && norm(it.maquina) === norm(maquina)) return true;
    const txt = `${it.titulo || ''}\n${it.texto || ''}`;
    if (chaves.some((id) => cita(txt, id))) return true;
    if (!chaves.length && area) return it.area === area;
    return false;
  }).sort(recentes);
}

export function quando(iso) {
  const t = Date.parse(iso);
  if (!Number.isFinite(t)) return '';
  const s = (Date.now() - t) / 1000;
  if (s < 60) return 'agora';
  if (s < 3600) return `há ${Math.floor(s / 60)} min`;
  if (s < 86400) return `há ${Math.floor(s / 3600)} h`;
  if (s < 172800) return 'ontem';
  return BASE_FMT.date(String(iso).slice(0, 10));
}

const autorDe = (it) => (it.autor && String(it.autor).trim()) || 'Você';

function noteRow(ctx, it, { completo = false } = {}) {
  const meta = `${autorDe(it)} · ${quando(it.criado_em)}`.replace(/ · $/, '');
  const conteudo = [
    icon('lightbulb', { size: 16, class: 'ar-note__ico' }),
    h('span', { class: 'ar-note__body' },
      h('span', { class: completo ? 'ar-note__text is-full' : 'ar-note__text' }, it.texto || it.titulo || ''),
      h('span', { class: 'ar-note__meta' }, completo ? `Registrado por ${autorDe(it) === 'Você' ? 'você' : autorDe(it)} · ${quando(it.criado_em)}` : meta)),
  ];
  if (!it.id || !can(ctx, 'openRef')) return h('div', { class: 'ar-note' }, conteudo);
  return h('button', { type: 'button', class: 'ar-note', onClick: () => abrirRef(ctx, `aprendizado:${it.id}`) },
    conteudo, completo ? null : icon('chevron-right', { size: 16, class: 'ar-note__chev' }));
}

/**
 * teamNotes(ctx, {area, maquina, ids, titulo, limite, verTodos, completo}) → Node | null
 * Faixa "Registrado pela equipe" (página da área) ou seção "Registros da equipe" (gaveta).
 */
export function teamNotes(ctx, { area, maquina, ids, titulo = 'Registros da equipe', limite = 0, verTodos = false, completo = true } = {}) {
  const itens = notesFor(ctx, { area, maquina, ids });
  if (!itens.length) return null;
  const mostrar = limite ? itens.slice(0, limite) : itens;
  const mais = verTodos && on(ctx, 'cerebro') && (itens.length > mostrar.length || limite)
    ? h('a', {
      href: '#cerebro', class: 'ar-link ar-notes__all',
      onClick: (e) => { e.preventDefault(); navegar(ctx, 'cerebro'); },
    }, itens.length > mostrar.length ? `Ver todos (${itens.length}) ›` : 'Ver no Cérebro ›')
    : null;
  return h('section', { class: 'ar-notes', 'aria-label': titulo },
    h('div', { class: 'ar-notes__head' }, h('h3', { class: 'ar-notes__title' }, titulo), mais),
    h('div', { class: 'ar-notes__list' }, mostrar.map((it) => noteRow(ctx, it, { completo }))));
}

// ---------------------------------------------------------------------------
// Peças da página

/** statRow([{valor, rotulo, tom}]) — 3 números no máximo; só o 1º leva ponto de status. */
export function statRow(numeros = []) {
  return h('div', { class: 'ar-stats', role: 'list' },
    numeros.slice(0, 3).map((n, i) => h('div', { class: 'ar-stat', role: 'listitem' },
      h('div', { class: 'ar-stat__valor num' },
        i === 0 && n.tom ? h('span', { class: `ar-dot ar-dot--${n.tom}`, 'aria-hidden': 'true' }) : null,
        String(n.valor)),
      h('div', { class: 'ar-stat__rotulo' }, n.rotulo))));
}

/**
 * rowList({colunas, linhas, chave, onClick, rotulo})
 *   colunas: [{ m: 'id'|'main'|'sub'|'status'|null, largura, render(row), num }]
 *   No celular cada linha vira 2 linhas: id + status em cima, main + sub embaixo; o resto some.
 * → { el, draw(linhas) }
 */
export function rowList({ colunas = [], linhas = [], chave = (r) => r.id, onClick, rotulo } = {}) {
  const tpl = colunas.map((c) => c.largura || 'minmax(0,1fr)').join(' ');
  const ul = h('ul', { class: 'ar-rows', 'aria-label': rotulo || null });
  let ativo = null;
  let atuais = linhas;
  function marca() {
    ul.querySelectorAll('.ar-row').forEach((b) => {
      const sim = b.dataset.key === ativo;
      b.classList.toggle('is-active', sim);
      if (sim) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current');
    });
  }
  function draw(rows = atuais) {
    atuais = rows;
    ul.replaceChildren(...rows.map((r) => {
      const k = String(chave(r));
      const cells = colunas.map((c) => {
        let conteudo = null;
        try { conteudo = c.render(r); } catch (err) { console.error('[área] célula', err); }
        return h('span', {
          class: ['ar-cell', c.m && `ar-cell--${c.m}`, c.num && 'ar-cell--num', c.classe],
          'data-m': c.m || 'x',
        }, conteudo);
      });
      const tagName = onClick ? 'button' : 'div';
      const row = h(tagName, {
        type: onClick ? 'button' : null, class: 'ar-row', style: `--ar-cols:${tpl}`, 'data-key': k,
        onClick: onClick ? () => { ativo = k; marca(); onClick(r); } : null,
      }, cells);
      return h('li', { class: 'ar-rows__item' }, row);
    }));
    marca();
  }
  draw(linhas);
  return { el: ul, draw };
}

function pills({ opcoes, value, onChange, label }) {
  if (typeof ui.segmented === 'function') {
    try {
      return ui.segmented({ opcoes, value, onChange, label, size: 'sm', class: 'ar-filtros' });
    } catch { /* cai no próprio */ }
  }
  let atual = value;
  const grupo = h('div', { class: 'segmented ar-filtros', role: 'radiogroup', 'aria-label': label || null });
  const pinta = () => grupo.querySelectorAll('button').forEach((b) => b.setAttribute('aria-checked', String(b.dataset.value === String(atual))));
  grupo.append(...opcoes.map((o) => h('button', {
    type: 'button', role: 'radio', class: 'segmented__opt', 'data-value': String(o.value),
    onClick: () => { atual = o.value; pinta(); onChange?.(o.value); },
  }, h('span', null, o.label), o.contagem != null ? h('span', { class: 'segmented__count num' }, String(o.contagem)) : null)));
  pinta();
  grupo.setValue = (v) => { atual = v; pinta(); };
  return grupo;
}

/**
 * listSection({filtros:[{id,label,fn}], inicial, busca:{placeholder, texto(row)}, linhas: () => rows,
 *   colunas, chave, onClick, ordenar, vazio: (filtroLabel) => texto, rotulo})
 * Filtro em pílulas (máx. 3) + busca + linhas. → { el, refresh() }
 */
export function listSection({
  filtros = [], inicial, busca, linhas, colunas, chave, onClick, ordenar, vazio, rotulo,
} = {}) {
  const fonte = typeof linhas === 'function' ? linhas : () => linhas || [];
  let filtro = inicial ?? filtros[0]?.id ?? null;
  let termo = '';
  const filtroDe = (id) => filtros.find((f) => f.id === id);
  // filtro inicial vazio cai para o último (normalmente "Todas")
  if (filtro && filtroDe(filtro) && !fonte().filter(filtroDe(filtro).fn).length && filtros.length > 1) {
    filtro = filtros[filtros.length - 1].id;
  }
  const lista = rowList({ colunas, linhas: [], chave, onClick, rotulo });
  const vazioEl = h('div', { class: 'ar-empty', hidden: true });
  let grupo = null;
  const opcoes = () => filtros.slice(0, 3).map((f) => ({ value: f.id, label: f.label, contagem: fonte().filter(f.fn).length }));
  const campo = busca ? h('input', {
    type: 'search', class: 'ar-search__input', placeholder: busca.placeholder || 'Buscar',
    'aria-label': busca.placeholder || 'Buscar', autocomplete: 'off', enterkeyhint: 'search',
    onInput: (e) => { termo = e.target.value; refresh(); },
  }) : null;
  const barraEl = h('div', { class: 'ar-toolbar' });

  function montaFiltros() {
    if (!filtros.length) return;
    const novo = pills({ opcoes: opcoes(), value: filtro, label: 'Filtro', onChange: (v) => { filtro = v; refresh(); } });
    if (grupo) grupo.replaceWith(novo); else barraEl.prepend(novo);
    grupo = novo;
  }
  if (campo) barraEl.append(h('label', { class: 'ar-search' }, icon('search', { size: 16 }), campo));
  montaFiltros();

  function refresh() {
    const q = norm(termo);
    const f = filtroDe(filtro);
    let rows = fonte().filter((r) => (f ? f.fn(r) : true));
    if (q && busca?.texto) rows = rows.filter((r) => norm(busca.texto(r)).includes(q));
    if (ordenar) rows = [...rows].sort(ordenar);
    lista.draw(rows);
    lista.el.hidden = !rows.length;
    vazioEl.hidden = !!rows.length;
    if (!rows.length) {
      const rot = q ? `para “${termo.trim()}”` : (f?.vazio || norm(f?.label || ''));
      vazioEl.replaceChildren(
        h('p', null, vazio ? vazio(rot) : 'Nada por aqui.'),
        (f && f.id !== filtros[filtros.length - 1]?.id) || q ? btn('Limpar filtro', {
          variant: 'ghost', size: 'sm',
          onClick: () => {
            termo = '';
            if (campo) campo.value = '';
            filtro = filtros[filtros.length - 1]?.id ?? null;
            montaFiltros();
            refresh();
          },
        }) : null);
    }
  }
  refresh();
  return {
    el: h('div', { class: 'ar-list' }, barraEl.childNodes.length ? barraEl : null, lista.el, vazioEl),
    refresh() { montaFiltros(); refresh(); },
  };
}

function areaSwitcher(ctx, atual) {
  const ligadas = AREAS.filter((a) => on(ctx, a));
  if (ligadas.length < 2 || !ligadas.includes(atual)) return null;
  return h('nav', { class: 'ar-switch', 'aria-label': 'Áreas' },
    ligadas.map((a) => h('a', {
      href: `#${a}`, class: 'ar-switch__pill', 'aria-current': a === atual ? 'page' : null,
    }, AREA_CURTA[a])));
}

/** "dados do ERP e do MES, atualizados às 07:40" a partir das integrações conectadas. */
const SISTEMAS = {
  producao: ['MES', 'ERP', 'Planilha', 'Planilhas', 'Plano de corte', 'EDI'],
  qualidade: ['Qualidade', 'LIMS', 'Metrologia', 'Banco de testes', 'Documentos', 'MES', 'ERP'],
  manutencao: ['Manutenção', 'MES', 'Documentos', 'ERP'],
  comercial: ['ERP', 'EDI', 'Mensageria', 'Mensagens', 'Chamados', 'E-mail'],
  marketing: ['PLM', 'Projeto', 'Documentos', 'ERP'],
};
export function origemDados(ctx, modulo) {
  const integ = list(ctx, 'integracoes').filter((i) => i.status === 'conectado' || i.status === 'sincronizando');
  const usados = [];
  for (const t of SISTEMAS[modulo] || ['ERP']) {
    const i = integ.find((x) => x.tipo === t);
    if (i && !usados.includes(i)) usados.push(i);
    if (usados.length === 2) break;
  }
  if (!usados.length) return '';
  const nome = (i) => (/^[A-Z]{2,}$/.test(i.tipo) ? `do ${i.tipo}` : `de ${i.tipo.toLowerCase()}`);
  const ultima = usados.map((i) => i.ultima_sync).filter(Boolean).sort().pop();
  const hoje = ultima && String(ultima).slice(0, 10) === today(ctx);
  const hora = ultima ? BASE_FMT.time(ultima) : '';
  return `dados ${usados.map(nome).join(' e ')}${hoje && hora ? `, atualizados às ${hora}` : ''}`;
}

/**
 * areaAssistant(ctx, {modulo, nome, sugestoes}) → Node | null
 * Barra recolhida "◉ Pergunte sobre {área}"; aberta mostra 3 sugestões e um campo. Enviar chama
 * ctx.perguntar(texto, {modulo, painel:true}) — a conversa é a mesma do Início (B).
 */
export function areaAssistant(ctx, { modulo, nome, sugestoes, perfil, prefixo } = {}) {
  if (!can(ctx, 'perguntar')) return null;
  const area = nome || (AREA_CURTA[modulo] || modulo).toLowerCase();
  const sug = (sugestoes || list(ctx, 'perguntas_sugeridas').filter((p) => p.modulo === modulo).map((p) => p.pergunta))
    .filter(Boolean).slice(0, 3);
  const pid = `ar-assist-${modulo}-${Math.random().toString(36).slice(2, 7)}`;
  const root = h('div', { class: 'ar-assist', 'data-open': 'false' });
  const enviar = (texto) => {
    const t = String(texto || '').trim();
    if (!t) return;
    fecha();
    perguntar(ctx, prefixo ? prefixo(t) : t, { modulo, painel: true, ...(perfil ? { perfil } : {}) });
  };
  const campo = h('input', {
    type: 'text', class: 'ar-assist__input', placeholder: `Pergunte sobre ${area}`, 'aria-label': `Pergunte sobre ${area}`,
    autocomplete: 'off', enterkeyhint: 'send',
  });
  const enviarBtn = h('button', { type: 'submit', class: 'ar-assist__send', 'aria-label': 'Enviar pergunta', disabled: true },
    icon('arrow-up', { size: 18 }));
  campo.addEventListener('input', () => { enviarBtn.disabled = !campo.value.trim(); });
  const painel = h('div', { class: 'ar-assist__panel', id: pid, hidden: true, role: 'group', 'aria-label': `Pergunte sobre ${area}` },
    h('div', { class: 'ar-assist__head' },
      h('span', { class: 'ar-assist__title' }, h('span', { class: 'ar-assist__orb', 'aria-hidden': 'true' }), `Pergunte sobre ${area}`),
      h('button', { type: 'button', class: 'icon-btn ar-assist__close', 'aria-label': 'Recolher', onClick: () => fecha(true) }, icon('chevron-down', { size: 18 }))),
    sug.length ? h('div', { class: 'ar-assist__sug' }, sug.map((s) => h('button', {
      type: 'button', class: 'ar-assist__chip', title: s, onClick: () => enviar(s),
    }, s))) : null,
    h('form', {
      class: 'ar-assist__form',
      onSubmit: (e) => { e.preventDefault(); enviar(campo.value); campo.value = ''; enviarBtn.disabled = true; },
    }, campo, enviarBtn));
  const barraBtn = h('button', {
    type: 'button', class: 'ar-assist__bar', 'aria-expanded': 'false', 'aria-controls': pid,
    onClick: () => abre(),
  }, h('span', { class: 'ar-assist__orb', 'aria-hidden': 'true' }), h('span', { class: 'ar-assist__bar-label' }, `Pergunte sobre ${area}`),
  icon('chevron-down', { size: 16, class: 'ar-assist__caret' }));
  function abre() {
    root.dataset.open = 'true';
    painel.hidden = false;
    barraBtn.hidden = true;
    barraBtn.setAttribute('aria-expanded', 'true');
    requestAnimationFrame(() => campo.focus({ preventScroll: true }));
  }
  function fecha(foco = false) {
    root.dataset.open = 'false';
    painel.hidden = true;
    barraBtn.hidden = false;
    barraBtn.setAttribute('aria-expanded', 'false');
    if (foco) barraBtn.focus({ preventScroll: true });
  }
  painel.addEventListener('keydown', (e) => { if (e.key === 'Escape') { e.stopPropagation(); fecha(true); } });
  root.append(barraBtn, painel);
  return root;
}

/**
 * areaPage({ctx, modulo, titulo, subtitulo, numeros, depoisNumeros, corpo, assistente})
 * → { el, cleanup(), onLearning(fn) }   (render(el, ctx) do módulo devolve cleanup)
 */
export function areaPage({ ctx, modulo, titulo, subtitulo, numeros, depoisNumeros, corpo, assistente = true, notas = true } = {}) {
  ensureAreaCss();
  const ouvintes = new Set();
  const faixa = h('div', { class: 'ar-strip-host' });
  const pintaFaixa = () => {
    if (!notas) return;
    const n = teamNotes(ctx, { area: modulo, titulo: 'Registrado pela equipe', limite: 3, verTodos: true, completo: false });
    faixa.replaceChildren(...(n ? [n] : []));
    faixa.hidden = !n;
  };
  pintaFaixa();
  const registrar = can(ctx, 'ensinar')
    ? btn('Ensinar', { variant: 'secondary', icone: 'lightbulb', onClick: () => ensinar(ctx, { area: modulo, origem: `area:${modulo}` }) })
    : null;
  const el = h('div', { class: `ar-page ar-page--${modulo}` },
    areaSwitcher(ctx, modulo),
    h('header', { class: 'ar-head' },
      h('div', { class: 'ar-head__text' },
        h('h1', { class: 'ar-title' }, titulo),
        subtitulo ? h('p', { class: 'ar-sub' }, subtitulo) : null),
      registrar ? h('div', { class: 'ar-head__acoes' }, registrar) : null),
    numeros?.length ? statRow(numeros) : null,
    depoisNumeros || null,
    faixa,
    corpo || null,
    assistente ? areaAssistant(ctx, { modulo }) : null);
  const off = onLearning(ctx, () => {
    pintaFaixa();
    for (const fn of ouvintes) { try { fn(); } catch (err) { console.error('[área] ouvinte', err); } }
  });
  return {
    el,
    onLearning(fn) { ouvintes.add(fn); return () => ouvintes.delete(fn); },
    cleanup() { off(); ouvintes.clear(); },
  };
}

// ---------------------------------------------------------------------------
// Resumo de cada área (índice #areas, menu "Áreas ▾", Início)

export function areaResumo(ctx, modulo) {
  try {
    switch (modulo) {
      case 'producao': {
        const n = list(ctx, 'ordens').filter((o) => o.status === 'atrasada').length;
        const g = gen(T(ctx, 'ordem'));
        return n
          ? { n, tom: 'danger', frase: `${n} ${n === 1 ? T(ctx, 'ordem') : T(ctx, 'ordens')} ${n === 1 ? `atrasad${g}` : `atrasad${g}s`}` }
          : { n: 0, tom: null, frase: `Nenhum${g === 'a' ? 'a' : ''} ${T(ctx, 'ordem')} atrasad${g}` };
      }
      case 'manutencao': {
        const maqs = list(ctx, 'maquinas');
        const p = maqs.filter((m) => m.status === 'parada');
        const a = maqs.filter((m) => m.status === 'alerta');
        if (p.length === 1) return { n: 1, tom: 'danger', frase: `${p[0].id} ${paradoDe(ctx)}` };
        if (p.length > 1) return { n: p.length, tom: 'danger', frase: `${p.length} ${T(ctx, 'maquinas')} ${paradoDe(ctx, { plural: true })}` };
        if (a.length) return { n: a.length, tom: 'warn', frase: a.length === 1 ? `${a[0].id} em alerta` : `${a.length} ${T(ctx, 'maquinas')} em alerta` };
        return { n: 0, tom: null, frase: `${cap(T(ctx, 'maquinas'))} operando` };
      }
      case 'qualidade': {
        // "abertas" = status aberta; "em análise" conta à parte (igual à página e à conversa)
        const ncs = list(ctx, 'nao_conformidades');
        const emAberto = ncs.filter((n) => n.status !== 'encerrada');
        const abertas = ncs.filter((n) => n.status === 'aberta').length;
        const analise = ncs.filter((n) => n.status === 'em_analise').length;
        const graves = emAberto.filter((n) => n.severidade === 'alta');
        if (graves.length) return { n: graves.length, tom: 'danger', frase: `${graves.length} ${plural(graves.length, 'NC grave', 'NCs graves')}` };
        if (!emAberto.length) return { n: 0, tom: null, frase: 'Nenhuma NC aberta' };
        const partes = [abertas ? `${abertas} ${plural(abertas, 'NC aberta', 'NCs abertas')}` : null, analise ? `${analise} ${abertas ? '' : `${plural(analise, 'NC', 'NCs')} `}em análise` : null].filter(Boolean);
        return { n: emAberto.length, tom: 'warn', frase: partes.join(' e ') };
      }
      case 'comercial': {
        const n = list(ctx, 'pedidos').filter((p) => p.status === 'atrasado').length;
        return n ? { n, tom: 'danger', frase: `${n} ${plural(n, 'pedido atrasado', 'pedidos atrasados')}` } : { n: 0, tom: null, frase: 'Nenhum pedido atrasado' };
      }
      case 'marketing': {
        const n = list(ctx, 'marketing').filter((m) => m.status === 'em_revisao').length;
        return n ? { n, tom: 'warn', frase: `${n} ${plural(n, 'conteúdo em revisão', 'conteúdos em revisão')}` } : { n: 0, tom: null, frase: 'Conteúdos em dia' };
      }
      default: return { n: 0, tom: null, frase: '' };
    }
  } catch {
    return { n: 0, tom: null, frase: '' };
  }
}

export function areaIcone(modulo) { return AREA_ICONE[modulo] || 'grid'; }

// ---------------------------------------------------------------------------
// Peças das gavetas

function secao(titulo, ...corpo) {
  const nodes = corpo.flat().filter((x) => x != null && x !== false);
  if (!nodes.length) return null;
  return h('section', { class: 'ar-dsec' }, titulo ? h('h3', { class: 'ar-dsec__title' }, titulo) : null, ...nodes);
}

function fatos(pares) {
  const ok = pares.filter((p) => p && p[1] != null && p[1] !== '' && p[1] !== false);
  if (!ok.length) return null;
  return h('dl', { class: 'ar-facts' }, ok.map(([k, v]) => h('div', { class: 'ar-facts__row' }, h('dt', null, k), h('dd', null, v))));
}

const REF_ICONE = {
  doc: 'file', op: 'factory', turno: 'clock', pedido: 'box', sku: 'box', cliente: 'building', rep: 'user',
  regra: 'scale', nc: 'shield-check', os: 'wrench', maq: 'cpu', kpi: 'chart', saber: 'users', integ: 'plug', aprendizado: 'lightbulb',
};

function sistemaDe(ctx, r) {
  switch (r.tipo) {
    case 'doc': return r.detalhe?.doc?.origem || 'Documento';
    case 'op': case 'turno': return list(ctx, 'integracoes').some((i) => i.tipo === 'MES') ? 'MES' : 'ERP';
    case 'pedido': case 'sku': case 'cliente': case 'rep': case 'regra': return 'ERP';
    case 'nc': return 'Qualidade';
    case 'os': case 'maq': return 'Manutenção';
    case 'saber': return 'Saber de operador';
    case 'kpi': return 'Indicador';
    default: return '';
  }
}

function detalheCurto(ctx, r) {
  const d = r.detalhe || {};
  const f = fmtOf(ctx);
  switch (r.tipo) {
    case 'op': return `${statusInfo(d.status).label} · prazo ${f.date(d.prazo)}`;
    case 'pedido': return `${statusInfo(d.status).label} · ${d.status === 'atrasado' ? 'nova previsão' : 'previsão'} ${f.date(d.previsao_entrega)}`;
    case 'nc': return `${statusInfo(d.status).label} · severidade ${statusInfo(d.severidade).label.toLowerCase()}`;
    case 'os': return `${statusInfo(d.status).label} · ${d.tecnico || f.date(d.data)}`;
    case 'maq': return statusInfo(d.status, ctx).label;
    case 'sku': return `${f.money(d.preco)} · estoque ${f.num(d.estoque)}`;
    case 'cliente': return [d.cidade, d.uf].filter(Boolean).join('/');
    case 'rep': return d.regiao || '';
    case 'doc': return d.trecho ? corta(d.trecho.texto, 60) : `atualizado ${f.date(d.doc?.atualizado)}`;
    case 'saber': return `${d.autor || ''}${d.funcao ? ` · ${d.funcao}` : ''}`;
    default: return '';
  }
}

/** Cartão de fonte/ligação: "tipo · sistema", rótulo e detalhe. null se a ref não resolve. */
export function refCard(ctx, ref) {
  const r = resolve(ctx, ref);
  if (!r) return null;
  const sis = sistemaDe(ctx, r);
  return h('button', { type: 'button', class: 'ar-refcard', 'data-ref': ref, onClick: () => abrirRef(ctx, ref) },
    h('span', { class: 'ar-refcard__l1' }, icon(REF_ICONE[r.tipo] || 'file', { size: 14 }), `${r.tipoNome}${sis ? ` · ${sis}` : ''}`),
    h('span', { class: 'ar-refcard__l2' }, r.rotulo),
    (() => { const t = detalheCurto(ctx, r); return t ? h('span', { class: 'ar-refcard__l3' }, t) : null; })());
}

export function refCards(ctx, refs) {
  const vistos = new Set();
  const cards = (refs || []).filter((r) => r && !vistos.has(r) && vistos.add(r)).map((r) => refCard(ctx, r)).filter(Boolean);
  return cards.length ? h('div', { class: 'ar-refcards' }, cards) : null;
}

function miniLinha(ctx, ref, principal, secundario, status) {
  const r = resolve(ctx, ref);
  const conteudo = [
    h('span', { class: 'ar-mini__main' }, h('strong', null, principal), secundario ? h('span', { class: 'ar-mini__sub' }, secundario) : null),
    status || null,
  ];
  return r
    ? h('button', { type: 'button', class: 'ar-mini', onClick: () => abrirRef(ctx, ref) }, conteudo)
    : h('div', { class: 'ar-mini' }, conteudo);
}

function bloco(tom, titulo, texto) {
  if (!texto) return null;
  return h('div', { class: `ar-callout ar-callout--${tom}` },
    h('p', { class: 'ar-callout__title' }, titulo),
    h('p', { class: 'ar-callout__text' }, texto));
}

/**
 * Monta a gaveta: cabeçalho (status/subtítulo), seções e ações no fim.
 * acoes: [{label, icone, onClick, variant}] — a 1ª primária quando `primaria` for true.
 */
function gaveta(ctx, sheetApi, { titulo, subtitulo, eyebrow, topo, secoes, acoes, pergunta, modulo, area, maquina, origem }) {
  const corpo = h('div', { class: 'ar-drawer' });
  const lista = [];
  for (const a of acoes || []) {
    lista.push(btn(a.label, {
      variant: a.variant || 'secondary', icone: a.icone,
      onClick: () => { fecharFolha(corpo, sheetApi); a.onClick(); },
    }));
  }
  if (pergunta && can(ctx, 'perguntar')) {
    lista.push(btn('Perguntar sobre isto', {
      variant: lista.length ? 'secondary' : 'primary', icone: 'message',
      onClick: () => { fecharFolha(corpo, sheetApi); perguntar(ctx, pergunta, { modulo }); },
    }));
  }
  if (can(ctx, 'ensinar')) {
    lista.push(btn('Ensinar algo sobre isto', {
      variant: lista.length ? 'ghost' : 'secondary', icone: 'lightbulb',
      onClick: () => { fecharFolha(corpo, sheetApi); ensinar(ctx, { area: area || modulo, maquina: maquina || null, origem }); },
    }));
  }
  corpo.append(...[topo, ...(secoes || [])].flat().filter(Boolean));
  const acoesEl = lista.length ? h('div', { class: 'ar-drawer__acoes' }, lista) : null;
  // { titulo, subtitulo, eyebrow, corpo, acoes } — app.openRef põe o título na folha, o corpo e as
  // ações no rodapé (acoes: null = sem ações; nunca as padrão por cima das nossas).
  return { titulo, subtitulo: subtitulo ?? null, eyebrow: eyebrow || null, corpo, acoes: acoesEl };
}

/** Para quem quer só um Node (harness, outra tela): corpo com as ações no fim. */
export function drawerNode(out) {
  if (!out) return null;
  if (out instanceof Node) return out;
  const n = h('div', { class: 'ar-drawer-wrap' }, out.corpo, out.acoes || null);
  n.titulo = out.titulo;
  return n;
}

function topoStatus(...itens) {
  const ok = itens.flat().filter(Boolean);
  return ok.length ? h('div', { class: 'ar-dtop' }, ok) : null;
}

function asResolved(arg, ctx, tipo) {
  if (typeof arg === 'string') return resolve(ctx, arg.includes(':') ? arg : `${tipo}:${arg}`);
  return arg || null;
}

/** O app passa {…resolved, close, sheet}; aceita também um sheetApi explícito. */
const folhaDe = (arg, sheetApi) => sheetApi || (arg && typeof arg === 'object' && typeof arg.close === 'function' ? arg : null);

// ---------------------------------------------------------------------------
// Produção

function ritmoEsperado(o, hoje) {
  const total = BASE_FMT.daysFromToday(o.prazo, o.inicio);
  const passou = BASE_FMT.daysFromToday(hoje, o.inicio);
  if (total == null || passou == null || total <= 0) return null;
  return Math.max(0, Math.min(100, Math.round((passou / total) * 100)));
}

/** Situação de risco de uma OP (v1 "Alerta de atraso"): {atrasada, risco, sugestao}. */
export function riscoOP(ctx, o) {
  if (!o || o.status === 'concluida') return null;
  const f = fmtOf(ctx);
  const dias = BASE_FMT.daysFromToday(o.prazo, today(ctx));
  const prog = o.progresso ?? 0;
  const esperado = ritmoEsperado(o, today(ctx));
  const late = o.status === 'atrasada' || (dias != null && dias < 0);
  const risk = !late && dias != null && dias <= 5 && (prog < 60 || (esperado != null && prog < esperado - 10));
  if (!late && !risk) return null;
  const restante = Math.round((o.quantidade || 0) * (1 - prog / 100));
  const linha = linhaNome(ctx, o.linha);
  const unidade = produto(ctx, o.sku)?.unidade || T(ctx, 'unidade');
  const cli = T(ctx, 'cliente');
  const sugestao = late
    ? `Priorizar ${o.id} na sequência de ${linha}${o.pedido ? ` e combinar nova data do pedido ${o.pedido} com o ${cli}` : ''}. Faltam ${f.num(restante)} ${unidade}.`
    : `Para cumprir ${f.date(o.prazo)}, ${linha} precisa de ${f.num(Math.ceil(restante / Math.max(dias, 1)))} ${unidade}/dia. Antecipar na sequência ou abrir turno extra.`;
  return { atrasada: late, risco: risk, sugestao, dias, prog, esperado };
}

function trilha(o, prod) {
  const etapas = prod?.ficha?.roteiro || [];
  if (!etapas.length) return null;
  const n = etapas.length;
  const prog = o.progresso ?? 0;
  const atual = o.status === 'concluida' ? n : o.status === 'planejada' && prog === 0 ? -1 : Math.min(n - 1, Math.floor((prog / 100) * n));
  return h('ol', { class: 'ar-trail', 'aria-label': 'Roteiro' }, etapas.map((e, i) => {
    const st = o.status === 'concluida' || i < atual ? 'feito' : i === atual ? 'atual' : 'proximo';
    return h('li', { class: `ar-trail__step is-${st}`, 'aria-current': st === 'atual' ? 'step' : null },
      h('span', { class: 'ar-trail__dot', 'aria-hidden': 'true' }), h('span', { class: 'ar-trail__name' }, e));
  }));
}

function fichaTecnica(ctx, prod, { aberta = false } = {}) {
  const fi = prod?.ficha || {};
  const attrs = Object.entries(fi.atributos || {});
  const specs = fi.especificacoes || [];
  if (!attrs.length && !specs.length && !(fi.roteiro || []).length) return null;
  return h('details', { class: 'ar-details', open: aberta || null },
    h('summary', null, 'Ficha técnica'),
    attrs.length ? fatos(attrs.map(([k, v]) => [cap(k.replace(/_/g, ' ')), String(v)])) : null,
    specs.length ? h('ul', { class: 'ar-specs' }, specs.map((s) => h('li', null,
      h('span', null, s.caracteristica),
      h('span', { class: 'num' }, `${s.nominal ?? '—'}${s.unidade ? ` ${s.unidade}` : ''}${s.tolerancia ? ` (${s.tolerancia})` : ''}`)))) : null);
}

function historico(ctx, eventos) {
  const f = fmtOf(ctx);
  const hist = [...(eventos || [])].sort((a, b) => String(b.data).localeCompare(String(a.data)));
  if (!hist.length) return null;
  const item = (e) => h('li', null, h('span', { class: 'ar-tl__date num' }, f.date(e.data)), h('span', null, e.evento));
  const resto = hist.slice(3);
  return [
    h('ul', { class: 'ar-tl' }, hist.slice(0, 3).map(item)),
    resto.length ? h('details', { class: 'ar-details ar-details--plain' },
      h('summary', null, `Ver tudo (${hist.length})`), h('ul', { class: 'ar-tl' }, resto.map(item))) : null,
  ];
}

function drawerOP(arg, ctx, sheetApi) {
  const r = asResolved(arg, ctx, 'op');
  const o = r?.detalhe;
  if (!o) return null;
  const f = fmtOf(ctx);
  const prod = produto(ctx, o.sku);
  const risco = riscoOP(ctx, o);
  const atrasoTxt = o.status !== 'concluida' && BASE_FMT.daysFromToday(o.prazo, today(ctx)) < 0;
  const ncs = list(ctx, 'nao_conformidades').filter((n) => n.sku === o.sku && n.status !== 'encerrada');
  const turnosOp = list(ctx, 'turnos').filter((t) => (t.resumo || '').includes(o.id) || (t.ocorrencias || []).some((x) => String(x).includes(o.id)));
  return gaveta(ctx, folhaDe(arg, sheetApi), {
    titulo: `${o.id} · ${prod?.nome || o.sku}`,
    eyebrow: `${cap(T(ctx, 'ordem'))} de produção`,
    topo: [
      topoStatus(statusBadge(o.status), h('span', { class: 'ar-dtop__meta' }, `${o.sku} · ${f.num(o.quantidade)} ${prod?.unidade || T(ctx, 'unidade')} · ${linhaNome(ctx, o.linha)}`)),
      h('div', { class: 'ar-prog' },
        h('div', { class: 'ar-prog__nums' },
          h('strong', { class: 'num' }, `${o.progresso ?? 0}%`),
          h('span', { class: `num${atrasoTxt ? ' ar-late' : ''}` }, `prazo ${f.date(o.prazo)} (${f.rel(o.prazo, today(ctx))})`)),
        barra(o.progresso ?? 0, { tom: o.status === 'atrasada' ? 'warn' : null })),
    ],
    secoes: [
      bloco('warn', 'Motivo do atraso', o.motivo_atraso),
      risco ? bloco('neutral', 'Sugestão', risco.sugestao) : null,
      teamNotes(ctx, { ids: [o.id, o.pedido].filter(Boolean) }),
      secao('Roteiro', trilha(o, prod)),
      fichaTecnica(ctx, prod),
      secao('Histórico', historico(ctx, o.historico)),
      secao('Ligações', refCards(ctx, [
        o.pedido ? `pedido:${o.pedido}` : null, `sku:${o.sku}`,
        ...ncs.map((n) => `nc:${n.id}`),
        ...turnosOp.slice(0, 2).map((t) => `turno:${t.data}|${t.turno}|${t.linha}`),
      ])),
    ],
    pergunta: o.status === 'atrasada' ? `Por que a ${o.id} atrasou e o que falta para entregar?` : `Como está a ${o.id}?`,
    modulo: 'producao', area: 'producao', origem: `op:${o.id}`,
  });
}

function drawerTurno(arg, ctx, sheetApi) {
  const r = asResolved(arg, ctx, 'turno');
  const t = r?.detalhe;
  if (!t) return null;
  const f = fmtOf(ctx);
  const refPct = t.produzido ? (t.refugo / t.produzido) * 100 : 0;
  const ops = list(ctx, 'ordens').filter((o) => (t.resumo || '').includes(o.id) || (t.ocorrencias || []).some((x) => String(x).includes(o.id)));
  return gaveta(ctx, folhaDe(arg, sheetApi), {
    titulo: `${cap(nomeTurno(t.turno))} · ${linhaNome(ctx, t.linha)}`,
    subtitulo: f.dateLong ? f.dateLong(t.data) : f.date(t.data),
    eyebrow: 'Passagem de turno',
    topo: statRow([
      { valor: f.num(t.produzido), rotulo: 'produzido' },
      { valor: f.pct(refPct), rotulo: 'de refugo' },
      { valor: `${f.num(t.paradas_min)} min`, rotulo: 'de paradas' },
    ]),
    secoes: [
      t.resumo ? secao('Resumo', h('p', { class: 'ar-p' }, t.resumo)) : null,
      (t.ocorrencias || []).length ? secao('Ocorrências para o próximo turno', h('ul', { class: 'ar-ul' }, t.ocorrencias.map((x) => h('li', null, x)))) : null,
      secao('Ligações', refCards(ctx, ops.map((o) => `op:${o.id}`))),
    ],
    pergunta: `O que aconteceu no ${nomeTurno(t.turno)} de ${f.date(t.data)} em ${linhaNome(ctx, t.linha)}?`,
    modulo: 'producao', area: 'producao', origem: r.ref,
  });
}

// ---------------------------------------------------------------------------
// Manutenção

const OS_RANK = (os) => ({ aberta: 0, em_execucao: 1, concluida: 2 }[os.status] ?? 3);

function drawerOS(arg, ctx, sheetApi) {
  const r = asResolved(arg, ctx, 'os');
  const os = r?.detalhe;
  if (!os) return null;
  const f = fmtOf(ctx);
  const maq = byId(ctx, 'maquinas', os.maquina);
  return gaveta(ctx, folhaDe(arg, sheetApi), {
    titulo: `${os.id} · ${maq?.nome || os.maquina}`,
    eyebrow: 'Ordem de serviço',
    topo: topoStatus(statusBadge(os.status), tag(statusInfo(os.tipo).label), h('span', { class: 'ar-dtop__meta' }, f.date(os.data))),
    secoes: [
      os.descricao ? h('p', { class: 'ar-lead' }, os.descricao) : null,
      fatos([
        ['Técnico', os.tecnico],
        ['Duração', typeof os.duracao_h === 'number' ? `${f.num(os.duracao_h)} h` : null],
        ['Peças', (os.pecas || []).join(', ') || null],
      ]),
      teamNotes(ctx, { maquina: os.maquina, ids: [os.id] }),
      secao('Ligações', refCards(ctx, [`maq:${os.maquina}`, os.procedimento ? `doc:${os.procedimento}` : null])),
    ],
    pergunta: os.status === 'concluida' ? `O que foi feito na ${os.id}?` : `O que falta para fechar a ${os.id}?`,
    modulo: 'manutencao', area: 'manutencao', maquina: os.maquina, origem: `os:${os.id}`,
  });
}

function drawerMaq(arg, ctx, sheetApi) {
  const r = asResolved(arg, ctx, 'maq');
  const m = r?.detalhe;
  if (!m) return null;
  const f = fmtOf(ctx);
  const oss = list(ctx, 'manutencao').filter((o) => o.maquina === m.id)
    .sort((a, b) => OS_RANK(a) - OS_RANK(b) || String(b.data).localeCompare(String(a.data)));
  const abertas = oss.filter((o) => o.status !== 'concluida');
  const ultimas = oss.filter((o) => o.status === 'concluida').slice(0, 3);
  const saberes = on(ctx, 'operadores') ? list(ctx, 'saberes').filter((s) => s.maquina === m.id) : [];
  const procs = [...new Set(oss.map((o) => o.procedimento).filter(Boolean))];
  const osLinha = (o) => miniLinha(ctx, `os:${o.id}`, o.id, `${statusInfo(o.tipo).label} · ${corta(o.descricao, 64)}`, statusBadge(o.status));
  const prevDias = BASE_FMT.daysFromToday(m.proxima_preventiva, today(ctx));
  return gaveta(ctx, folhaDe(arg, sheetApi), {
    titulo: `${m.id} · ${m.nome}`,
    eyebrow: cap(T(ctx, 'maquina')),
    topo: topoStatus(statusBadge(m.status, ctx),
      h('span', { class: 'ar-dtop__meta' }, [linhaNome(ctx, m.linha), m.fabricante, m.ano].filter(Boolean).join(' · '))),
    secoes: [
      fatos([
        ['Horímetro', m.horimetro != null ? `${f.num(m.horimetro)} h` : null],
        ['MTBF', m.mtbf_h != null ? `${f.num(m.mtbf_h)} h` : null],
        ['Próxima preventiva', m.proxima_preventiva ? h('span', { class: prevDias != null && prevDias <= 3 ? 'ar-late' : null }, `${f.date(m.proxima_preventiva)} (${f.rel(m.proxima_preventiva, today(ctx))})`) : null],
      ]),
      teamNotes(ctx, { maquina: m.id }),
      abertas.length ? secao('Ordens de serviço abertas', h('div', { class: 'ar-minis' }, abertas.map(osLinha))) : null,
      ultimas.length ? secao('Últimas ordens de serviço', h('div', { class: 'ar-minis' }, ultimas.map(osLinha))) : null,
      saberes.length ? secao('Saber dos operadores', h('div', { class: 'ar-minis' }, saberes.map((s) =>
        miniLinha(ctx, `saber:${s.id}`, s.titulo, `${s.autor}${s.funcao ? `, ${s.funcao}` : ''}${s.tempo_casa_anos ? ` · ${s.tempo_casa_anos} anos de casa` : ''}`, null)))) : null,
      secao('Procedimentos e manual', refCards(ctx, [...procs.map((p) => `doc:${p}`), m.manual ? `doc:${m.manual}` : null])),
    ],
    pergunta: `O que está acontecendo com a ${m.id}?`,
    modulo: 'manutencao', area: 'manutencao', maquina: m.id, origem: `maq:${m.id}`,
  });
}

// ---------------------------------------------------------------------------
// Qualidade

const D_ROT = {
  D1: 'Equipe', D2: 'Descrição do problema', D3: 'Contenção', D4: 'Causa raiz',
  D5: 'Ação corretiva', D6: 'Implementação', D7: 'Prevenção', D8: 'Encerramento',
};
const ORIGEM = { interna: 'interna', cliente: 'reclamação de cliente', fornecedor: 'fornecedor' };

/** Rascunho de 8D determinístico (motor local), em Markdown com fontes [[tipo:id]]. */
export function rascunho8D(ctx, nc) {
  const prod = produto(ctx, nc.sku);
  const linha = linhaNome(ctx, nc.linha);
  const prodNome = prod?.nome || nc.sku || T(ctx, 'produto');
  const similares = list(ctx, 'nao_conformidades').filter((n) => n.id !== nc.id && (n.sku === nc.sku || (nc.linha && n.linha === nc.linha)));
  const d = {
    D1: `${nc.responsavel || 'Responsável da qualidade'} (qualidade), líder de ${linha || T(ctx, 'linha')} e engenharia de ${prodNome}.`,
    D2: `${String(nc.descricao || 'Não conformidade registrada').replace(/[.\s]+$/, '')}${nc.sku ? ` (${T(ctx, 'produto')} **${nc.sku}**${linha ? `, ${T(ctx, 'linha')} ${linha}` : ''})` : ''}. Origem: ${ORIGEM[nc.origem] || nc.origem}; severidade ${statusInfo(nc.severidade).label.toLowerCase()}. [[nc:${nc.id}]]`,
    D3: nc.acao ? `${nc.acao}` : `Segregar o ${T(ctx, 'lote')} afetado de ${prodNome} e inspecionar 100% antes de liberar.`,
    D4: nc.causa ? `Causa provável: ${nc.causa}` : 'Causa raiz a confirmar com 5 porquês e análise do processo.',
    D5: nc.acao ? `${nc.acao}` : `Ajustar o processo em ${linha || T(ctx, 'linha')} e atualizar a instrução de trabalho.`,
    D6: `Implantar em ${linha || T(ctx, 'linha')} e acompanhar os próximos ${T(ctx, 'lote')}s de ${prodNome}.`,
    D7: similares.length
      ? `Recorrente: **${similares.length}** ${plural(similares.length, 'NC parecida', 'NCs parecidas')} (${similares.slice(0, 3).map((n) => `${n.id} [[nc:${n.id}]]`).join(', ')}). Revisar FMEA e padrão de inspeção.`
      : 'Atualizar FMEA e checklist de inspeção; treinar a equipe no padrão revisado.',
    D8: `Encerrar depois de 2 ${T(ctx, 'lote')}s sem reincidência e comunicar ${nc.origem === 'cliente' ? `o ${T(ctx, 'cliente')}` : 'as áreas envolvidas'}.`,
  };
  return [`Rascunho de 8D da **${nc.id}**${nc.sku ? ` [[sku:${nc.sku}]]` : ''}.`, '',
    ...Object.keys(D_ROT).map((k) => `- **${k} · ${D_ROT[k]}.** ${d[k]}`)].join('\n');
}

const semMarcas = (t) => String(t || '').replace(/\s*\[\[[^\]]*\]\]/g, '');

/** Fallback sem markdown.js: parágrafos e listas, **negrito**, sem marcadores. */
function mdSimples(texto) {
  const strong = (s) => {
    const out = [];
    const re = /\*\*([^*]+)\*\*/g;
    let i = 0; let m;
    while ((m = re.exec(s))) { if (m.index > i) out.push(s.slice(i, m.index)); out.push(h('strong', null, m[1])); i = re.lastIndex; }
    if (i < s.length) out.push(s.slice(i));
    return out;
  };
  const root = h('div', { class: 'ar-md' });
  let ul = null;
  for (const ln of semMarcas(texto).split('\n')) {
    const t = ln.trim();
    if (!t) { ul = null; continue; }
    const li = /^[-*•]\s+(.*)$/.exec(t);
    if (li) { if (!ul) { ul = h('ul'); root.append(ul); } ul.append(h('li', null, strong(li[1]))); } else { ul = null; root.append(h('p', null, strong(t))); }
  }
  return root;
}

function renderMd(ctx, texto) {
  if (can(ctx, 'renderMarkdown')) {
    try { const n = ctx.renderMarkdown(texto, { ctx }); if (n instanceof Node) return n; } catch (err) { console.warn('[área] renderMarkdown', err); }
  }
  return mdSimples(texto);
}

/** Gera o rascunho de 8D no corpo da gaveta, transmitindo o texto. IA real quando houver. */
function gerar8D(ctx, nc, host, botao) {
  botao.disabled = true;
  const rotulo = h('p', { class: 'ar-gen-label' }, icon('sparkles', { size: 14 }), 'Rascunho do cérebro · revise antes de enviar');
  const alvo = h('div', { class: 'ar-gen-body', 'aria-live': 'off' });
  const copiarBtn = btn('Copiar', { variant: 'ghost', size: 'sm', icone: 'copy', hidden: true });
  const status = h('p', { class: 'sr-only', role: 'status' });
  host.replaceChildren(rotulo, alvo, copiarBtn, status);
  let buffer = '';
  let pendente = false;
  const pinta = () => {
    pendente = false;
    if (!host.isConnected) return;
    alvo.replaceChildren(renderMd(ctx, buffer));
  };
  const agenda = () => { if (!pendente) { pendente = true; requestAnimationFrame(pinta); } };
  const fim = () => {
    pinta();
    copiarBtn.hidden = false;
    status.textContent = 'Rascunho pronto.';
    copiarBtn.addEventListener('click', async () => {
      const ok = await copiar(semMarcas(buffer));
      const lbl = copiarBtn.querySelector('.btn__label') || copiarBtn;
      lbl.textContent = ok ? 'Copiado' : 'Não foi possível copiar';
      setTimeout(() => { lbl.textContent = 'Copiar'; }, 1500);
    });
  };
  const local = () => new Promise((res) => {
    const texto = rascunho8D(ctx, nc);
    const partes = texto.match(/\S+\s*/g) || [texto];
    buffer = '';
    let i = 0;
    const reduz = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
    const passo = () => {
      if (!host.isConnected) return res();
      buffer += partes.slice(i, i + (reduz ? partes.length : 4)).join('');
      i += reduz ? partes.length : 4;
      agenda();
      if (i < partes.length) setTimeout(passo, 24); else res();
    };
    passo();
  });
  const ia = async () => {
    const api = ctx.api;
    const id = ctx.demo?.id;
    if (!ctx.ia?.disponivel || !api || typeof api.conversa !== 'function' || !id) return false;
    const ctl = new AbortController();
    let corpo = { mensagens: [{ role: 'user', content: `Gera o rascunho de 8D da ${nc.id}, D1 a D8, curto, em lista.` }], modulo: 'qualidade' };
    for (let rodada = 0; rodada < 5; rodada += 1) {
      if (!host.isConnected) { ctl.abort(); return true; }
      const r = await api.conversa(id, corpo, {
        signal: ctl.signal,
        onTexto: (d) => { buffer += typeof d === 'string' ? d : (d?.delta || ''); agenda(); },
        onFerramenta: () => {}, onAprendizado: () => {},
      });
      if (!r?.continuar) {
        if (r?.texto && r.texto.length > buffer.length) buffer = r.texto;
        return !!buffer.trim();
      }
      corpo = { estado: r.estado, modulo: 'qualidade' };
    }
    return !!buffer.trim();
  };
  (async () => {
    let ok = false;
    try { ok = await ia(); } catch (err) { console.warn('[qualidade] 8D pela IA falhou; usando rascunho local', err); buffer = ''; }
    if (!ok) await local();
    if (host.isConnected) fim();
  })();
}

function drawerNC(arg, ctx, sheetApi) {
  const r = asResolved(arg, ctx, 'nc');
  const nc = r?.detalhe;
  if (!nc) return null;
  const f = fmtOf(ctx);
  const prod = produto(ctx, nc.sku);
  let oitoD;
  if (nc.oito_d && typeof nc.oito_d === 'object') {
    oitoD = h('details', { class: 'ar-details' },
      h('summary', null, '8D registrado'),
      h('dl', { class: 'ar-8d' }, Object.keys(D_ROT).filter((k) => nc.oito_d[k]).map((k) =>
        h('div', null, h('dt', null, `${k} · ${D_ROT[k]}`), h('dd', null, nc.oito_d[k])))));
  } else {
    const host = h('div', { class: 'ar-gen' });
    const b = btn('Gerar rascunho de 8D', { variant: 'secondary', icone: 'sparkles', onClick: () => gerar8D(ctx, nc, host, b) });
    host.append(b);
    oitoD = secao('8D', host);
  }
  return gaveta(ctx, folhaDe(arg, sheetApi), {
    titulo: `${nc.id} · ${prod?.nome || nc.sku || 'Não conformidade'}`,
    eyebrow: 'Não conformidade',
    topo: topoStatus(statusBadge(nc.status), statusBadge(nc.severidade, null, `Severidade ${statusInfo(nc.severidade).label.toLowerCase()}`),
      tag(cap(ORIGEM[nc.origem] || nc.origem || ''))),
    secoes: [
      nc.descricao ? h('p', { class: 'ar-lead' }, nc.descricao) : null,
      fatos([
        ['Data', f.date(nc.data)],
        [cap(T(ctx, 'linha')), linhaNome(ctx, nc.linha)],
        ['Responsável', nc.responsavel],
        ['Causa', nc.causa],
        ['Ação', nc.acao],
      ]),
      teamNotes(ctx, { ids: [nc.id, nc.sku].filter(Boolean) }),
      oitoD,
      secao('Ligações', refCards(ctx, [nc.sku ? `sku:${nc.sku}` : null,
        ...list(ctx, 'ordens').filter((o) => o.sku === nc.sku && o.status !== 'concluida').slice(0, 2).map((o) => `op:${o.id}`)])),
    ],
    pergunta: nc.status === 'encerrada' ? `Como a ${nc.id} foi resolvida?` : `O que falta para encerrar a ${nc.id}?`,
    modulo: 'qualidade', area: 'qualidade', origem: `nc:${nc.id}`,
  });
}

// ---------------------------------------------------------------------------
// Comercial

const totalPedido = (p) => (p.itens || []).reduce((s, i) => s + (i.quantidade || 0) * (i.preco_unit || 0), 0);

/** "14/11" da observação ("Previsão original 14/11", "Entrega original 13/11") → AAAA-MM-DD, ou null. */
function previsaoOriginal(p, ref) {
  const m = /\b(?:previs[aã]o|entrega|prazo|data)\s+original\s+(?:de\s+|era\s+)?(\d{1,2})\/(\d{1,2})(?:\/(\d{2,4}))?/i.exec(String(p?.observacao ?? ''));
  if (!m) return null;
  const ano = m[3] ? (m[3].length === 2 ? `20${m[3]}` : m[3]) : String(ref).slice(0, 4);
  return `${ano}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}`;
}

/**
 * Linha de previsão do pedido. Atrasado com data futura não é "previsão em 8 dias" em vermelho:
 * é "nova previsão 21 nov (era 14 nov)". → {texto, vencida}
 */
function previsaoPedido(ctx, p) {
  const f = fmtOf(ctx);
  const dias = BASE_FMT.daysFromToday(p.previsao_entrega, today(ctx));
  const vencida = dias != null && dias < 0 && !['entregue', 'faturado'].includes(p.status);
  if (p.status === 'atrasado' && !vencida) {
    const orig = previsaoOriginal(p, today(ctx));
    const era = orig && orig !== p.previsao_entrega ? ` (era ${f.date(orig)})` : '';
    return { texto: `nova previsão ${f.date(p.previsao_entrega)}${era}`, vencida: false };
  }
  return { texto: `previsão ${f.date(p.previsao_entrega)} (${f.rel(p.previsao_entrega, today(ctx))})`, vencida };
}

const curto = (nome) => String(nome || '').split(/\s+[—–-]\s+/)[0];

function drawerPedido(arg, ctx, sheetApi) {
  const r = asResolved(arg, ctx, 'pedido');
  const p = r?.detalhe;
  if (!p) return null;
  const f = fmtOf(ctx);
  const cli = byId(ctx, 'clientes', p.cliente);
  const rep = byId(ctx, 'representantes', p.representante);
  const op = p.ordem ? byId(ctx, 'ordens', p.ordem) : null;
  const atrasado = p.status === 'atrasado';
  const previsao = previsaoPedido(ctx, p);
  const acoes = can(ctx, 'perguntar') ? [{
    label: `Escrever resposta ao ${T(ctx, 'cliente')}`, icone: 'message', variant: 'primary',
    onClick: () => perguntar(ctx, `Escreve uma resposta curta ao ${T(ctx, 'cliente')} ${curto(cli?.nome) || p.cliente} sobre o pedido ${p.id}: situação e previsão de entrega.`, { modulo: 'comercial' }),
  }] : [];
  return gaveta(ctx, folhaDe(arg, sheetApi), {
    titulo: `${p.id} · ${curto(cli?.nome) || p.cliente}`,
    eyebrow: 'Pedido',
    topo: topoStatus(statusBadge(p.status), h('span', { class: `ar-dtop__meta num${previsao.vencida ? ' ar-late' : ''}` }, previsao.texto)),
    secoes: [
      fatos([
        [cap(T(ctx, 'cliente')), cli?.nome || p.cliente],
        [cap(T(ctx, 'representante')), rep?.nome || p.representante],
        ['Data do pedido', f.date(p.data)],
        ['Total', h('span', { class: 'num' }, f.money(totalPedido(p)))],
      ]),
      p.observacao ? bloco(atrasado ? 'warn' : 'neutral', 'Observação', p.observacao) : null,
      teamNotes(ctx, { ids: [p.id, p.ordem].filter(Boolean) }),
      secao('Itens', h('ul', { class: 'ar-itens' }, (p.itens || []).map((i) => {
        const pr = produto(ctx, i.sku);
        return h('li', null,
          h('span', { class: 'ar-itens__nome' }, pr?.nome || i.sku, h('span', { class: 'ar-itens__sku' }, i.sku)),
          h('span', { class: 'ar-itens__val num' }, `${f.num(i.quantidade)} × ${f.money(i.preco_unit)}`),
          h('strong', { class: 'num' }, f.money((i.quantidade || 0) * (i.preco_unit || 0))));
      }))),
      op ? secao(`${T(ctx, 'ordem')} ligada`, refCards(ctx, [`op:${op.id}`])) : null,
      secao('Ligações', refCards(ctx, [`cliente:${p.cliente}`, `rep:${p.representante}`])),
    ],
    acoes,
    pergunta: `Quando o pedido ${p.id} vai ser entregue?`,
    modulo: 'comercial', area: 'comercial', origem: `pedido:${p.id}`,
  });
}

function acoesVisita(ctx, { visita, proposta }) {
  if (!can(ctx, 'perguntar')) return [];
  return [
    { label: 'Preparar visita', icone: 'calendar', variant: 'primary', onClick: () => perguntar(ctx, visita, { modulo: 'comercial' }) },
    { label: 'Montar proposta', icone: 'file', onClick: () => perguntar(ctx, proposta, { modulo: 'comercial' }) },
  ];
}

function drawerCliente(arg, ctx, sheetApi) {
  const r = asResolved(arg, ctx, 'cliente');
  const c = r?.detalhe;
  if (!c) return null;
  const f = fmtOf(ctx);
  const rep = byId(ctx, 'representantes', c.representante);
  const peds = list(ctx, 'pedidos').filter((p) => p.cliente === c.id).sort((a, b) => String(b.data).localeCompare(String(a.data)));
  return gaveta(ctx, folhaDe(arg, sheetApi), {
    titulo: c.nome,
    eyebrow: cap(T(ctx, 'cliente')),
    topo: topoStatus(h('span', { class: 'ar-dtop__meta' }, [[c.cidade, c.uf].filter(Boolean).join('/'), c.segmento].filter(Boolean).join(' · '))),
    secoes: [
      fatos([
        [cap(T(ctx, 'representante')), rep?.nome || c.representante],
        ['Tabela de preço', c.tabela_preco],
        ['Pagamento', c.condicao_pagamento],
        ['Limite de crédito', c.limite_credito != null ? f.money(c.limite_credito) : null],
        ['Último pedido', c.ultimo_pedido ? `${f.date(c.ultimo_pedido)} (${f.rel(c.ultimo_pedido, today(ctx))})` : null],
      ]),
      teamNotes(ctx, { ids: [c.id, curto(c.nome)] }),
      peds.length ? secao('Pedidos', h('div', { class: 'ar-minis' }, peds.slice(0, 6).map((p) =>
        miniLinha(ctx, `pedido:${p.id}`, p.id, `${p.status === 'atrasado' ? 'nova previsão' : 'previsão'} ${f.date(p.previsao_entrega)} · ${f.money(totalPedido(p))}`, statusBadge(p.status))))) : null,
    ],
    acoes: acoesVisita(ctx, {
      visita: `Prepara a visita à ${curto(c.nome)}${c.cidade ? ` em ${c.cidade}` : ''}.`,
      proposta: `Monta uma proposta para a ${curto(c.nome)} seguindo as regras comerciais.`,
    }),
    pergunta: `Como está a conta da ${curto(c.nome)}?`,
    modulo: 'comercial', area: 'comercial', origem: `cliente:${c.id}`,
  });
}

function drawerRep(arg, ctx, sheetApi) {
  const r = asResolved(arg, ctx, 'rep');
  const rp = r?.detalhe;
  if (!rp) return null;
  const f = fmtOf(ctx);
  const pct = rp.meta_mes ? (rp.realizado_mes / rp.meta_mes) * 100 : 0;
  const clientes = list(ctx, 'clientes').filter((c) => c.representante === rp.id);
  const abertos = list(ctx, 'pedidos').filter((p) => p.representante === rp.id && !['faturado', 'entregue'].includes(p.status));
  return gaveta(ctx, folhaDe(arg, sheetApi), {
    titulo: rp.nome,
    eyebrow: cap(T(ctx, 'representante')),
    topo: topoStatus(h('span', { class: 'ar-dtop__meta' }, [rp.regiao, rp.telefone].filter(Boolean).join(' · '))),
    secoes: [
      h('div', { class: 'ar-prog' },
        h('div', { class: 'ar-prog__nums' }, h('strong', { class: 'num' }, f.pct(pct, 0)),
          h('span', { class: 'num' }, `${f.money(rp.realizado_mes, { compact: true })} de ${f.money(rp.meta_mes, { compact: true })} da meta do mês`)),
        barra(pct)),
      teamNotes(ctx, { ids: [rp.id, rp.nome] }),
      clientes.length ? secao(`${cap(T(ctx, 'clientes'))} (${clientes.length})`, h('div', { class: 'ar-minis' }, clientes.slice(0, 8).map((c) =>
        miniLinha(ctx, `cliente:${c.id}`, curto(c.nome), [c.cidade, c.segmento].filter(Boolean).join(' · '), null)))) : null,
      abertos.length ? secao('Pedidos em aberto', h('div', { class: 'ar-minis' }, abertos.map((p) =>
        miniLinha(ctx, `pedido:${p.id}`, p.id, curto(byId(ctx, 'clientes', p.cliente)?.nome || p.cliente), statusBadge(p.status))))) : null,
    ],
    acoes: acoesVisita(ctx, {
      visita: `Prepara a próxima visita do ${rp.nome}: quais ${T(ctx, 'clientes')} priorizar e o que levar.`,
      proposta: `Monta uma proposta para um ${T(ctx, 'cliente')} do ${rp.nome} seguindo as regras comerciais.`,
    }),
    pergunta: `Como está a carteira do ${rp.nome} este mês?`,
    modulo: 'comercial', area: 'comercial', origem: `rep:${rp.id}`,
  });
}

function drawerSku(arg, ctx, sheetApi) {
  const r = asResolved(arg, ctx, 'sku');
  const p = r?.detalhe;
  if (!p) return null;
  const f = fmtOf(ctx);
  const baixo = p.estoque < p.estoque_minimo;
  const ops = list(ctx, 'ordens').filter((o) => o.sku === p.sku && o.status !== 'concluida');
  return gaveta(ctx, folhaDe(arg, sheetApi), {
    titulo: p.nome,
    eyebrow: cap(T(ctx, 'produto')),
    topo: topoStatus(baixo ? tag('Abaixo do mínimo', 'warn') : tag('Estoque em dia', 'ok'), h('span', { class: 'ar-dtop__meta' }, [p.sku, p.familia].filter(Boolean).join(' · '))),
    secoes: [
      p.descricao_comercial ? h('p', { class: 'ar-lead' }, p.descricao_comercial) : null,
      fatos([
        ['Preço', f.money(p.preco)],
        ['Prazo', p.prazo_dias != null ? `${p.prazo_dias} dias` : null],
        ['Estoque', `${f.num(p.estoque)} ${p.unidade || ''}`.trim()],
        ['Estoque mínimo', f.num(p.estoque_minimo)],
      ]),
      teamNotes(ctx, { ids: [p.sku] }),
      fichaTecnica(ctx, p),
      ops.length ? secao('Ligações', refCards(ctx, ops.slice(0, 3).map((o) => `op:${o.id}`))) : null,
    ],
    pergunta: `Tem ${p.nome} em estoque e qual o prazo?`,
    modulo: on(ctx, 'comercial') ? 'comercial' : 'marketing', area: on(ctx, 'comercial') ? 'comercial' : 'marketing', origem: `sku:${p.sku}`,
  });
}

function drawerRegra(arg, ctx, sheetApi) {
  const r = asResolved(arg, ctx, 'regra');
  const g = r?.detalhe;
  if (!g) return null;
  return gaveta(ctx, folhaDe(arg, sheetApi), {
    titulo: g.titulo || g.id,
    eyebrow: 'Regra comercial',
    secoes: [h('p', { class: 'ar-lead' }, g.texto), teamNotes(ctx, { ids: [g.id] })],
    pergunta: `Como aplico a regra “${corta(g.titulo, 50)}”?`,
    modulo: 'comercial', area: 'comercial', origem: `regra:${g.id}`,
  });
}

function drawerInteg(arg, ctx, sheetApi) {
  const r = asResolved(arg, ctx, 'integ');
  const i = r?.detalhe;
  if (!i) return null;
  const f = fmtOf(ctx);
  return gaveta(ctx, folhaDe(arg, sheetApi), {
    titulo: i.nome,
    eyebrow: 'Integração',
    topo: topoStatus(statusBadge(i.status), i.tipo ? tag(i.tipo) : null),
    secoes: [fatos([
      ['Última sincronização', i.ultima_sync ? `${f.datetime(i.ultima_sync)} (${f.rel(i.ultima_sync, today(ctx))})` : null],
      ['Registros', i.registros != null ? f.num(i.registros) : null],
      ['Observação', i.observacao],
    ])],
    pergunta: null,
    modulo: 'integracoes', area: 'gestao', origem: `integ:${i.id}`,
  });
}

/**
 * Gavetas por tipo de ref. Assinatura: drawer(info | "tipo:id", ctx) → {titulo, subtitulo, corpo, acoes} | null.
 * B entrega doc/saber/kpi/aprendizado (drawersCerebro); A junta os dois mapas em ctx.openRef.
 */
export const drawers = {
  op: drawerOP,
  turno: drawerTurno,
  os: drawerOS,
  maq: drawerMaq,
  nc: drawerNC,
  pedido: drawerPedido,
  cliente: drawerCliente,
  rep: drawerRep,
  sku: drawerSku,
  regra: drawerRegra,
  integ: drawerInteg,
};

/**
 * Abre uma folha própria (conteúdo de marketing, que não é ref). Usa ctx.sheet; sem ele, uma
 * folha mínima local.
 */
export function abrirFolha(ctx, { titulo, subtitulo, eyebrow, corpo, acoes }) {
  if (can(ctx, 'sheet')) {
    try { return ctx.sheet({ titulo, subtitulo, eyebrow, corpo, acoes, lado: 'direita' }); } catch (err) { console.error('[área] sheet', err); }
  }
  if (typeof ui.sheet === 'function') {
    try { return ui.sheet({ titulo, subtitulo, eyebrow, corpo, acoes }); } catch (err) { console.error('[área] ui.sheet', err); }
  }
  // folha mínima (só para o harness antigo)
  const fechar = () => { layer.remove(); document.removeEventListener('keydown', esc, true); };
  const esc = (e) => { if (e.key === 'Escape') fechar(); };
  const layer = h('div', { class: 'ar-fsheet' },
    h('div', { class: 'ar-fsheet__scrim', onClick: fechar }),
    h('div', { class: 'ar-fsheet__panel', role: 'dialog', 'aria-modal': 'true', 'aria-label': titulo },
      h('header', { class: 'ar-fsheet__head' }, h('h2', null, titulo),
        h('button', { type: 'button', class: 'icon-btn sheet__close', 'aria-label': 'Fechar', onClick: fechar }, icon('x', { size: 18 }))),
      corpo, acoes || null));
  document.body.append(layer);
  document.addEventListener('keydown', esc, true);
  return { el: layer, close: fechar };
}

export { renderMd, semMarcas, corta, totalPedido, curto, barra, tag, gaveta, secao, fatos, bloco, miniLinha };
