// Demo v2 da Torno — boot por location.pathname, senha, boas-vindas, casca, roteador e ctx (UX §3, §4.3, §7.4).
//   /admin       → painel (admin/admin.js)
//   /demo/<id>   → GET /api/demo/<id>/estado; 401 → senha; depois a demo (rotas no hash)
// Pacote A. Telas de B e C são importadas dinamicamente; o que ainda não existir vira um stub de
// mesma assinatura, para nada quebrar.

import { fmt, TODAY } from './format.js';
import {
  FEATURES, FEATURE_BY_ID, AREA_IDS, isFeatureOn, normalizeModulos, enabledAreas, navItems, navOf, resolveRoute,
} from './features.js';
import { resolveRef as resolveRefData, REF_TYPES } from './adapters/data-source.js';
import { api, ApiError, onNaoAutorizado } from './api.js';
import * as ui from './ui.js';

const { h, icon, toast } = ui;

const ID_RE = /^[a-z2-7]{12}$/;
const root = () => document.getElementById('app') || document.body;

// ---------------------------------------------------------------------------
// localStorage com try/catch (pode faltar em aba privada ou prévia)

export const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { if (v == null || v === '') localStorage.removeItem(k); else localStorage.setItem(k, v); } catch { /* sem storage */ } },
};

// ---------------------------------------------------------------------------
// Tema (UX §5.1): data-theme no <html>, preferência em localStorage["td_tema"]

export function temaAtual() {
  const forced = document.documentElement.getAttribute('data-theme');
  if (forced === 'dark' || forced === 'light') return forced;
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
const temaOuvintes = new Set();
export function alternarTema() {
  const novo = temaAtual() === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', novo);
  store.set('td_tema', novo);
  for (const fn of [...temaOuvintes]) fn(novo);
}
/** Botão de alternar tema (ícone sun/moon). */
export function themeToggle({ class: cls } = {}) {
  const btn = h('button', { type: 'button', class: ['icon-btn', 'theme-switch', cls], onClick: () => alternarTema() });
  const pinta = () => {
    if (btn.dataset.montado && !btn.isConnected) { temaOuvintes.delete(pinta); return; }
    if (btn.isConnected) btn.dataset.montado = '1';
    const dark = temaAtual() === 'dark';
    btn.replaceChildren(icon(dark ? 'sun' : 'moon', { size: 18 }));
    btn.setAttribute('aria-label', dark ? 'Tema claro' : 'Tema escuro');
    btn.title = dark ? 'Tema claro' : 'Tema escuro';
  };
  pinta();
  temaOuvintes.add(pinta);
  matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', pinta);
  return btn;
}

// ---------------------------------------------------------------------------
// Boot

function telaBoot() {
  const msg = h('p', { class: 'boot__msg' }, 'Preparando a demonstração…');
  const el = h('div', { class: 'boot', 'aria-busy': 'true', 'aria-live': 'polite' },
    h('div', { class: 'loadbar', 'aria-hidden': 'true' }),
    h('span', { class: 'boot__mark' }, 'Torno'),
    msg);
  setTimeout(() => msg.classList.add('is-visible'), 600);
  root().replaceChildren(el);
}

function telaInvalida() {
  document.title = 'Torno · Demonstração';
  root().replaceChildren(h('main', { class: 'auth' },
    h('div', { class: 'auth__card' },
      h('div', { class: 'auth__brand' }, h('span', { class: 'wordmark' }, 'Torno')),
      h('h1', { class: 'auth__title' }, 'Link ou senha inválidos.'),
      h('p', { class: 'auth__lead' }, 'Confira a mensagem que você recebeu.'))));
}

function telaErroCarregar(tentar) {
  root().replaceChildren(h('main', { class: 'boot' },
    h('div', { class: 'boot-error', role: 'alert' },
      h('span', { class: 'boot__mark' }, 'Torno'),
      h('p', null, 'Não conseguimos carregar a demonstração.'),
      ui.button('Tentar de novo', { variant: 'primary', icone: 'refresh', onClick: tentar }))));
}

async function boot() {
  const path = location.pathname.replace(/\/+$/, '') || '/';
  if (path === '/admin' || path.startsWith('/admin/')) {
    try {
      const mod = await import('./admin/admin.js');
      mod.render(root(), { api, ui, fmt, themeToggle });
    } catch (err) {
      console.error('[admin] falha ao abrir o painel', err);
      telaErroCarregar(() => location.reload());
    }
    return;
  }
  const m = path.match(/^\/demo\/([^/]+)$/);
  if (!m || !ID_RE.test(m[1])) {
    telaInvalida();
    return;
  }
  demoId = m[1];
  await carregar();
}

// ---------------------------------------------------------------------------
// Estado da demo

let demoId = null;
let estado = null; // resposta de /estado
let data = null; // pacote do setor
let modulos = null; // {id: bool} normalizado
let learning = null;
let assistant = null;
const B = { conversa: null, ensinar: null, markdown: null, learningMod: null };
let drawerMap = {};
let shellPronta = false;
let reautenticando = false;

async function carregar({ silencioso = false } = {}) {
  if (!silencioso) telaBoot();
  let r;
  try {
    r = await api.estado(demoId);
  } catch (err) {
    if (err instanceof ApiError && err.status === 401) {
      mostrarSenha();
      return;
    }
    if (err instanceof ApiError && (err.status === 404 || err.status === 403)) {
      telaInvalida();
      return;
    }
    console.warn('[boot] /estado falhou', err);
    telaErroCarregar(() => carregar());
    return;
  }
  if (!r || !r.demo || !r.setor) {
    telaInvalida();
    return;
  }
  try {
    await iniciar(r);
  } catch (err) {
    console.error('[boot] falha ao montar a demo', err);
    telaErroCarregar(() => carregar());
  }
}

async function mostrarSenha({ expirada = false } = {}) {
  const { renderEntrar } = await import('./screens/entrar.js');
  const alvo = expirada ? overlayReauth() : root();
  renderEntrar(alvo, {
    titulo: 'Esta demonstração é privada.',
    apoio: 'Digite a senha que veio junto com o link.',
    aviso: expirada ? 'Sua sessão expirou. Digite a senha de novo.' : null,
    entrar: (senha) => api.entrar(demoId, senha),
    onSucesso: async () => {
      if (expirada) {
        fecharReauth();
        // atualiza o aprendizado sem perder a conversa em memória
        try {
          const r = await api.estado(demoId);
          if (r && Array.isArray(r.aprendizado) && learning && typeof learning.replace === 'function') learning.replace(r.aprendizado);
        } catch { /* segue com o que tem */ }
      } else {
        await carregar();
      }
    },
  });
}

let reauthEl = null;
function overlayReauth() {
  if (!reauthEl) {
    reauthEl = h('div', { class: 'reauth', style: { position: 'fixed', inset: '0', zIndex: '200', overflow: 'auto' } });
    document.body.appendChild(reauthEl);
  }
  return reauthEl;
}
function fecharReauth() {
  reauthEl?.remove();
  reauthEl = null;
  reautenticando = false;
}

onNaoAutorizado((escopo) => {
  if (escopo !== 'demo' || !shellPronta || reautenticando) return;
  reautenticando = true;
  ui.closeAllSheets();
  mostrarSenha({ expirada: true });
});

async function iniciar(r) {
  estado = r;
  data = r.setor;
  modulos = normalizeModulos(r.demo.modulos);
  document.title = `${empresaNome()} · Demonstração`;

  // módulos de B (com stubs), drawers de B e C, assistente
  await Promise.all([carregarB(), carregarDrawers(), carregarAssistente()]);
  learning = criarLearning(Array.isArray(r.aprendizado) ? r.aprendizado : []);

  if (!store.get(`td_bv_${demoId}`)) {
    const { renderBoasVindas } = await import('./screens/boas-vindas.js');
    renderBoasVindas(root(), {
      ctx: buildCtx(),
      onComecar: (nome) => {
        store.set(`td_bv_${demoId}`, '1');
        if (nome != null) store.set(`td_autor_${demoId}`, nome.trim());
        montarApp();
      },
    });
    return;
  }
  montarApp();
}

function empresaNome() {
  return (estado?.demo?.empresa_nome || '').trim() || data?.empresa?.nome || 'a empresa';
}
function empresaCurta(nome = empresaNome()) {
  return nome.replace(/\s*(,\s*)?\b(S\.?\s?A\.?|S\/A|Ltda\.?|LTDA\.?|EIRELI|ME|EPP)\s*$/i, '').trim() || nome;
}

// ---------------------------------------------------------------------------
// Módulos de B (conversa, ensinar, markdown, learning) com stubs de mesma assinatura

async function tryImport(path) {
  try {
    return await import(path);
  } catch (err) {
    console.info(`[app] ${path} ainda não disponível; usando o substituto.`, err?.message || err);
    return null;
  }
}

async function carregarB() {
  const [conversa, ensinar, markdown, learningMod] = await Promise.all([
    tryImport('./ui/conversa.js'), tryImport('./ui/ensinar.js'), tryImport('./ui/markdown.js'), tryImport('./learning.js'),
  ]);
  Object.assign(B, { conversa, ensinar, markdown, learningMod });
}

async function carregarDrawers() {
  const [c, b] = await Promise.all([tryImport('./ui/area-page.js'), tryImport('./modules/cerebro.js')]);
  drawerMap = { ...((c && c.drawers) || {}), ...((b && b.drawersCerebro) || {}) };
}

async function carregarAssistente() {
  const mod = await tryImport('./ai/assistant.js');
  try {
    if (mod && typeof mod.createAssistant === 'function') {
      assistant = mod.createAssistant(() => buildCtx());
      if (assistant) return;
    }
  } catch (err) {
    console.warn('[app] assistente indisponível', err);
  }
  assistant = { ask: async () => ({ texto: '', fontes: [] }), sugestoes: () => [], buscar: () => [], modo: () => 'local', setPreferencia: () => {} };
}

/** learning (B) instanciado com a lista do /estado; stub com a mesma interface. */
function criarLearning(lista) {
  const mod = B.learningMod;
  const fab = mod && (mod.createLearning || mod.createLearningStore || mod.default);
  if (typeof fab === 'function') {
    try {
      const inst = fab(lista, { api, demoId, getCtx: () => buildCtx() });
      if (inst && typeof inst.list === 'function' && typeof inst.subscribe === 'function') return inst;
    } catch (err) {
      console.warn('[app] learning.js falhou; usando o substituto', err);
    }
  }
  return stubLearning(lista);
}

function stubLearning(lista) {
  let itens = [...lista].sort((a, b) => String(b.criado_em).localeCompare(String(a.criado_em)));
  const ouvintes = new Set();
  const avisa = () => { for (const fn of ouvintes) { try { fn(itens); } catch (e) { console.error(e); } } };
  return {
    list({ area, maquina } = {}) {
      return itens.filter((i) => (!area || i.area === area) && (!maquina || i.maquina === maquina));
    },
    get(id) { return itens.find((i) => i.id === id) || null; },
    async add(item) {
      let it = item;
      if (!it.id) it = (await api.aprendizado.criar(demoId, item)).item;
      if (!itens.some((x) => x.id === it.id)) itens = [it, ...itens];
      avisa();
      return it;
    },
    async remove(id) {
      await api.aprendizado.apagar(demoId, id);
      itens = itens.filter((i) => i.id !== id);
      avisa();
    },
    replace(novos) { itens = [...novos].sort((a, b) => String(b.criado_em).localeCompare(String(a.criado_em))); avisa(); },
    subscribe(fn) { ouvintes.add(fn); return () => ouvintes.delete(fn); },
  };
}

function renderMarkdown(texto, opts = {}) {
  const fn = B.markdown && (B.markdown.renderMarkdown || B.markdown.render || B.markdown.default);
  if (typeof fn === 'function') {
    try { return fn(texto, { ctx: buildCtx(), ...opts }); } catch (err) { console.error('[markdown]', err); }
  }
  // substituto: parágrafos de texto puro, sem marcadores [[…]] nem asteriscos
  const limpo = String(texto ?? '').replace(/\[\[[^\]]*\]\]/g, '').replace(/\*\*([^*]+)\*\*/g, '$1');
  return h('div', { class: 'md' }, limpo.split(/\n{2,}/).filter(Boolean).map((p) => h('p', null, p)));
}

// --- conversa: ctx.perguntar delega a ui/conversa.js (B) ---------------------------------

let conversaInst = null;
function conversaPort() {
  const mod = B.conversa;
  if (!mod) return null;
  if (!conversaInst && typeof mod.createConversa === 'function') {
    try { conversaInst = mod.createConversa(() => buildCtx()); } catch (err) { console.error('[conversa]', err); }
  }
  return conversaInst || mod;
}

let perguntaPendente = null; // usada pelo substituto da conversa

function perguntar(texto, opts = {}) {
  const port = conversaPort();
  const fn = port && port.perguntar;
  if (typeof fn === 'function') {
    try {
      return port === B.conversa ? fn(buildCtx(), texto, opts) : fn(texto, opts);
    } catch (err) {
      console.error('[conversa] perguntar falhou', err);
    }
  }
  perguntaPendente = texto ? { texto, opts } : null;
  navigate('#conversa');
  return undefined;
}

function ensinar(opts = {}) {
  const mod = B.ensinar;
  const fn = mod && (mod.abrirEnsinar || mod.ensinar || mod.openEnsinar || mod.open || mod.default);
  if (typeof fn === 'function') {
    try { return fn(buildCtx(), opts); } catch (err) { console.error('[ensinar] falhou', err); }
  }
  return ensinarSubstituto(opts);
}

// ---------------------------------------------------------------------------
// ctx (UX §7.4)

function isEnabled(id) {
  return isFeatureOn(modulos || {}, id);
}

function resolveRef(ref) {
  if (typeof ref !== 'string') return null;
  if (ref.startsWith('aprendizado:')) {
    const id = ref.slice('aprendizado:'.length);
    const viaData = safe(() => resolveRefData(data, ref, isEnabled, { aprendizado: learning?.list() || [] }));
    if (viaData) return viaData;
    const item = learning?.get ? learning.get(id) : learning?.list().find((i) => i.id === id);
    if (!item) return null;
    return {
      ref, tipo: 'aprendizado', tipoNome: 'Registro da equipe', id, rotulo: item.titulo || 'Registro da equipe',
      detalhe: item, modulo: item.area && FEATURE_BY_ID[item.area] ? item.area : 'cerebro',
    };
  }
  return safe(() => resolveRefData(data, ref, isEnabled, { aprendizado: learning?.list() || [] }));
}

function safe(fn) {
  try { return fn(); } catch (err) { console.error(err); return null; }
}

let rotaAtual = 'inicio';

function areaAtual() {
  if (AREA_IDS.includes(rotaAtual)) return rotaAtual;
  if (rotaAtual === 'portal') return 'comercial';
  return null;
}

function buildCtx() {
  const term = (key) => (data?.vocabulario && data.vocabulario[key]) || key;
  const areaName = (areaId) => data?.areas?.find((a) => a.id === areaId)?.nome || FEATURE_BY_ID[areaId]?.nome || areaId;
  const features = FEATURES.filter((f) => isEnabled(f.id));
  const autorSalvo = () => (store.get(`td_autor_${demoId}`) || '').trim();
  return {
    // v1
    data,
    sector: { id: estado?.demo?.setor, nome: data?.setor || estado?.demo?.setor },
    empresa: empresaNome(),
    empresaCurta: empresaCurta(),
    today: data?.data_referencia || TODAY,
    features,
    isEnabled,
    term,
    areaName,
    resolveRef,
    openRef,
    navigate,
    fmt,
    ui,
    assistant,
    // v2
    demo: estado ? { ...estado.demo, modulos } : null,
    ia: estado?.ia || { disponivel: false, modelo: null },
    autor: () => autorSalvo() || 'Você',
    autorSalvo,
    setAutor: (nome) => store.set(`td_autor_${demoId}`, String(nome || '').trim()),
    api: {
      ...api,
      // atalhos já com o id desta demo
      demoId,
    },
    learning,
    perguntar,
    ensinar,
    renderMarkdown,
    sheet: ui.sheet,
    themeToggle,
    alternarTema,
    route: rotaAtual,
    areaAtual,
    areas: enabledAreas(modulos || {}),
    REF_TYPES,
  };
}

// ---------------------------------------------------------------------------
// Casca

const el = {};

function montarApp() {
  shellPronta = true;
  const app = h('div', { class: 'app' });
  el.app = app;
  el.empresa = h('span', { class: 'topbar__empresa', title: empresaNome() }, empresaNome());
  el.nav = h('nav', { class: 'topbar__nav', 'aria-label': 'Principal' });
  el.bottom = h('ul', { class: 'bottombar__list' });
  el.content = h('main', { class: 'content', id: 'conteudo', tabindex: '-1' });

  const fict = h('span', {
    class: 'pill pill--fict', title: 'Empresa, pessoas e números inventados para esta demonstração',
  }, h('span', { class: 'fict-long' }, 'Dados fictícios'), h('span', { class: 'fict-short' }, 'Fictícia'));

  const ask = ui.button('Perguntar', {
    icone: 'search', class: 'topbar__ask', title: 'Perguntar (atalho: /)',
    onClick: () => abrirConversa(),
  });
  const teach = ui.button('Ensinar', {
    icone: 'lightbulb', class: 'btn--teach', title: 'Ensinar o cérebro',
    onClick: () => ensinar({ area: areaAtual() || undefined, origem: 'topo' }),
  });
  teach.setAttribute('aria-label', 'Ensinar o cérebro');

  const topbar = h('header', { class: 'topbar' },
    h('div', { class: 'topbar__inner' },
      h('div', { class: 'topbar__brand' },
        h('a', { class: 'topbar__wordmark', href: '#inicio' }, 'Torno'),
        h('span', { class: 'topbar__divider', 'aria-hidden': 'true' }),
        h('div', { class: 'topbar__company' }, el.empresa, fict)),
      el.nav,
      h('div', { class: 'topbar__actions' }, ask, teach, themeToggle({ class: 'topbar__theme' }))));

  const bottombar = h('nav', { class: 'bottombar', 'aria-label': 'Principal' }, el.bottom);
  app.append(h('a', { class: 'sr-only skip', href: '#conteudo' }, 'Pular para o conteúdo'), topbar, el.content, bottombar);
  root().replaceChildren(app);

  desenharNav();
  learning.subscribe(() => atualizarContador(true));

  document.addEventListener('keydown', atalhos);
  document.addEventListener('click', fecharMenusFora);
  window.addEventListener('hashchange', onHashChange);
  onHashChange();
}

function abrirConversa() {
  if (rotaAtual === 'conversa') {
    document.querySelector('.content textarea, .content input[type="text"]')?.focus();
    return;
  }
  navigate('#conversa');
}

function atalhos(e) {
  if (e.key !== '/' || e.ctrlKey || e.metaKey || e.altKey) return;
  const t = e.target;
  if (t && (t.isContentEditable || /^(input|textarea|select)$/i.test(t.tagName))) return;
  if (document.documentElement.classList.contains('has-sheet')) return;
  e.preventDefault();
  abrirConversa();
}

function contagemRegistros() {
  try { return learning.list().length; } catch { return 0; }
}

let ultimaContagem = null;
function atualizarContador(animar = false) {
  const n = contagemRegistros();
  const subiu = ultimaContagem != null && n > ultimaContagem;
  ultimaContagem = n;
  for (const link of document.querySelectorAll('[data-nav="cerebro"]')) {
    let badge = link.querySelector('.nav-count');
    if (n > 0) {
      if (!badge) {
        badge = h('span', { class: 'nav-count', 'aria-hidden': 'true' });
        link.appendChild(badge);
      }
      badge.textContent = String(n);
      if (animar && subiu) {
        badge.classList.remove('is-pulse');
        void badge.offsetWidth;
        badge.classList.add('is-pulse');
      }
      link.setAttribute('aria-label', `Cérebro, ${n} ${n === 1 ? 'registro seu' : 'registros seus'}`);
    } else {
      badge?.remove();
      link.removeAttribute('aria-label');
    }
  }
}

/** Frase de estado de cada área (menu Áreas). */
export function areaHint(id, d = data) {
  if (!d) return '';
  const vocab = d.vocabulario || {};
  const fem = (s) => /a$/.test(String(s || '')) ;
  try {
    if (id === 'producao') {
      const n = (d.ordens || []).filter((o) => o.status === 'atrasada').length;
      return n ? `${n} ${vocab.ordens || 'ordens'} atrasad${n === 1 ? 'a' : 'as'}` : 'Tudo no prazo';
    }
    if (id === 'manutencao') {
      const ms = d.maquinas || [];
      const p = ms.find((m) => m.status === 'parada');
      if (p) return `${p.id} ${fem(vocab.maquina) ? 'parada' : 'parado'}`;
      const a = ms.find((m) => m.status === 'alerta');
      return a ? `${a.id} em alerta` : 'Tudo operando';
    }
    if (id === 'qualidade') {
      const n = (d.nao_conformidades || []).filter((x) => x.severidade === 'alta' && x.status !== 'encerrada').length;
      return n ? `${n} ${n === 1 ? 'NC grave' : 'NCs graves'}` : 'Sem NC grave aberta';
    }
    if (id === 'comercial') {
      const n = (d.pedidos || []).filter((p) => p.status === 'atrasado').length;
      return n ? `${n} ${n === 1 ? 'pedido atrasado' : 'pedidos atrasados'}` : 'Pedidos em dia';
    }
    if (id === 'marketing') {
      const itens = Array.isArray(d.marketing) ? d.marketing : (d.marketing?.conteudos || []);
      const n = itens.filter((x) => x.status === 'em_revisao').length;
      return n ? `${n} ${n === 1 ? 'conteúdo' : 'conteúdos'} em revisão` : 'Conteúdos em dia';
    }
  } catch { /* dados incompletos */ }
  return '';
}

const AREA_ICON = { producao: 'factory', qualidade: 'shield-check', manutencao: 'wrench', comercial: 'handshake', marketing: 'megaphone' };
export { AREA_ICON };

let menuAberto = null;
function fecharMenusFora(e) {
  if (menuAberto && !menuAberto.wrap.contains(e.target)) menuAberto.close();
}

function desenharNav() {
  const areaName = (id) => data?.areas?.find((a) => a.id === id)?.nome || FEATURE_BY_ID[id]?.nome || id;
  const items = navItems(modulos, areaName);
  el.nav.replaceChildren();
  el.bottom.replaceChildren();
  for (const item of items) {
    // topo (desktop)
    if (item.id === 'areas' && !item.unica) {
      el.nav.appendChild(menuAreas(item));
    } else {
      el.nav.appendChild(h('a', {
        class: 'nav-item', href: item.rotaEfetiva, 'data-nav': item.id,
      }, h('span', null, item.nomeEfetivo)));
    }
    // barra inferior (celular)
    const curto = item.unica ? (item.nomeCurto || 'Áreas') : (item.nomeCurto || item.nomeEfetivo);
    el.bottom.appendChild(h('li', null, h('a', {
      class: 'tab', href: item.rotaEfetiva, 'data-nav': item.id,
    }, icon(item.icone, { size: 20 }), h('span', { class: 'tab__label' }, item.unica ? 'Áreas' : curto))));
  }
  marcarAtivo();
  atualizarContador(false);
}

function menuAreas(item) {
  const btn = h('button', {
    type: 'button', class: 'nav-item', 'data-nav': 'areas', 'aria-haspopup': 'true', 'aria-expanded': 'false',
  }, h('span', null, item.nome), icon('chevron-down', { size: 14 }));
  const wrap = h('div', { class: 'menu-wrap' }, btn);
  let menu = null;
  const close = (foco = false) => {
    menu?.remove();
    menu = null;
    btn.setAttribute('aria-expanded', 'false');
    if (menuAberto?.wrap === wrap) menuAberto = null;
    if (foco) btn.focus();
  };
  const open = () => {
    if (menuAberto) menuAberto.close();
    const areas = enabledAreas(modulos);
    const links = areas.map((id) => h('a', { class: 'menu__item', href: `#${id}`, role: 'menuitem', onClick: () => close() },
      icon(AREA_ICON[id] || 'grid', { size: 18 }),
      h('span', { class: 'menu__item-text' },
        h('span', null, data?.areas?.find((a) => a.id === id)?.nome || FEATURE_BY_ID[id]?.nome || id),
        h('span', { class: 'menu__item-hint' }, areaHint(id)))));
    const todas = h('a', { class: 'menu__item', href: '#areas', role: 'menuitem', onClick: () => close() },
      icon('grid', { size: 18 }), h('span', { class: 'menu__item-text' }, 'Todas as áreas'));
    menu = h('div', {
      class: 'menu', role: 'menu',
      onKeydown: (e) => {
        const all = [...menu.querySelectorAll('.menu__item')];
        const i = all.indexOf(document.activeElement);
        if (e.key === 'Escape') { e.preventDefault(); close(true); }
        if (e.key === 'ArrowDown') { e.preventDefault(); all[(i + 1) % all.length].focus(); }
        if (e.key === 'ArrowUp') { e.preventDefault(); all[(i - 1 + all.length) % all.length].focus(); }
        if (e.key === 'Tab') close();
      },
    }, links, h('div', { class: 'menu__sep', role: 'separator' }), todas);
    wrap.appendChild(menu);
    btn.setAttribute('aria-expanded', 'true');
    menuAberto = { wrap, close };
    menu.querySelector('.menu__item')?.focus();
  };
  btn.addEventListener('click', () => (menu ? close() : open()));
  btn.addEventListener('keydown', (e) => { if (e.key === 'ArrowDown' && !menu) { e.preventDefault(); open(); } });
  return wrap;
}

function marcarAtivo() {
  const ativo = navOf(rotaAtual);
  const unica = enabledAreas(modulos).length === 1;
  for (const a of document.querySelectorAll('[data-nav]')) {
    let on = a.dataset.nav === ativo;
    if (unica && a.dataset.nav === 'areas') on = ativo === 'areas';
    a.classList.toggle('is-active', on);
    if (on && a.tagName === 'A') a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  }
}

// ---------------------------------------------------------------------------
// Roteador (UX §3.4)

const ROTA_MODULO = {
  inicio: './modules/visao-geral.js',
  conversa: './ui/conversa.js',
  cerebro: './modules/cerebro.js',
  areas: './screens/areas.js',
  producao: './modules/producao.js',
  qualidade: './modules/qualidade.js',
  manutencao: './modules/manutencao.js',
  comercial: './modules/comercial.js',
  marketing: './modules/marketing.js',
  portal: './modules/portal.js',
  'como-funciona': './screens/como-funciona.js',
};

let renderToken = 0;
let cleanup = null;

export function navigate(route) {
  const hash = route.startsWith('#') ? route : `#${route}`;
  if (location.hash === hash) onHashChange();
  else location.hash = hash;
}

function onHashChange() {
  const raw = (location.hash || '').replace(/^#/, '');
  const r = resolveRoute(raw, modulos);
  if (r.bloqueada) {
    toast('Essa área não faz parte desta demonstração.');
    history.replaceState(null, '', '#inicio');
  } else if (r.desconhecida && raw) {
    history.replaceState(null, '', '#inicio');
  } else if (raw.split('/')[0].toLowerCase() !== r.rota) {
    // alias (#visao-geral, #operadores, #integracoes…): normaliza o hash sem empilhar histórico
    history.replaceState(null, '', `#${r.rota}`);
  }
  renderRota(r.rota, r.secao);
}

async function renderRota(rota, secao) {
  const token = ++renderToken;
  const mudou = rota !== rotaAtual || !el.content.firstChild;
  if (menuAberto) menuAberto.close();
  if (mudou) ui.closeAllSheets();
  rodaCleanup();
  rotaAtual = rota;
  marcarAtivo();
  el.app.classList.toggle('is-fullscreen', rota === 'conversa');
  el.app.dataset.rota = rota;

  const host = h('div', { class: `module module--${rota}`, 'data-rota': rota });
  el.content.replaceChildren(host);
  const ctx = { ...buildCtx(), secao: secao || null };

  try {
    let mod = null;
    if (rota === 'conversa') {
      const port = conversaPort();
      mod = port && typeof port.render === 'function' ? port : null;
    } else {
      mod = await tryImport(ROTA_MODULE_PATH(rota));
    }
    if (token !== renderToken) return;
    if (mod && typeof mod.render === 'function') {
      const out = mod.render(host, ctx);
      if (typeof out === 'function') cleanup = out;
      else if (out && typeof out.then === 'function') out.then((fn) => { if (typeof fn === 'function' && token === renderToken) cleanup = fn; }).catch((err) => console.error(`[${rota}]`, err));
    } else if (rota === 'conversa') {
      cleanup = conversaSubstituta(host, ctx);
    } else {
      host.appendChild(emConstrucao());
    }
  } catch (err) {
    if (token !== renderToken) return;
    console.error(`[${rota}] erro ao renderizar`, err);
    host.replaceChildren(emConstrucao());
  }

  if (secao) {
    requestAnimationFrame(() => {
      const alvo = host.querySelector(`[data-secao="${CSS.escape(secao)}"]`) || document.getElementById(secao);
      if (alvo) alvo.scrollIntoView({ block: 'start', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    });
  } else if (mudou) {
    window.scrollTo(0, 0);
    if (!document.activeElement || document.activeElement === document.body || !document.activeElement.isConnected) {
      el.content.focus({ preventScroll: true });
    }
  }
}

function ROTA_MODULE_PATH(rota) {
  return ROTA_MODULO[rota] || ROTA_MODULO.inicio;
}

function rodaCleanup() {
  if (typeof cleanup === 'function') {
    try { cleanup(); } catch (err) { console.error('[app] cleanup', err); }
  }
  cleanup = null;
}

function emConstrucao() {
  return h('div', { class: 'empty-state' },
    icon('layers', { size: 22 }),
    h('p', null, 'Esta parte da demonstração ainda está sendo preparada.'),
    ui.button('Voltar ao início', { onClick: () => navigate('#inicio') }));
}

// ---------------------------------------------------------------------------
// openRef: gaveta do registro (drawers de C e B; fallback genérico legível)

const TIPO_AREA = {
  op: 'producao', turno: 'producao', pedido: 'comercial', sku: 'comercial', cliente: 'comercial', rep: 'comercial',
  regra: 'comercial', nc: 'qualidade', os: 'manutencao', maq: 'manutencao', saber: 'operadores', doc: null, kpi: 'gestao',
};

function openRef(ref) {
  const ctx = buildCtx();
  const resolved = ctx.resolveRef(ref);
  if (!resolved) {
    toast('Esse registro não faz parte desta demonstração.');
    return null;
  }
  const s = ui.sheet({
    eyebrow: [icon(refIcon(resolved.tipo), { size: 16 }), h('span', null, resolved.tipoNome)],
    titulo: resolved.rotulo,
    rotulo: `${resolved.tipoNome}: ${resolved.rotulo}`,
  });
  const info = { ...resolved, ref, close: s.close, sheet: s };
  let out = null;
  const fn = drawerMap[resolved.tipo];
  if (typeof fn === 'function') {
    try {
      out = fn(info, ctx);
    } catch (err) {
      console.error(`[gaveta ${resolved.tipo}] falhou; usando a genérica`, err);
      out = null;
    }
  }
  let acoes = 'padrao';
  if (out instanceof Node) {
    s.setCorpo(out);
  } else if (out && typeof out === 'object') {
    if (out.eyebrow) s.setEyebrow(out.eyebrow);
    if (out.titulo !== undefined) s.setTitulo(out.titulo, out.subtitulo);
    else if (out.subtitulo !== undefined) s.setTitulo(resolved.rotulo, out.subtitulo);
    s.setCorpo(out.corpo);
    if ('acoes' in out) acoes = out.acoes;
  } else {
    const corpo = h('div', { class: 'drawer-generic' });
    try {
      genericDrawer(corpo, resolved, ctx);
    } catch (err) {
      console.error('[gaveta] genérica falhou', err);
      corpo.replaceChildren(ui.emptyState('Não foi possível mostrar este registro.', { icone: 'alert' }));
    }
    s.setCorpo(corpo);
  }
  if (acoes === 'padrao') s.setAcoes(acoesPadrao(resolved, s));
  else s.setAcoes(acoes);
  return s;
}

function refIcon(tipo) {
  return {
    doc: 'file', op: 'factory', turno: 'clock', pedido: 'box', sku: 'box', cliente: 'building', rep: 'user', regra: 'scale',
    nc: 'shield-check', os: 'wrench', maq: 'cpu', kpi: 'chart', saber: 'users', integ: 'plug', aprendizado: 'lightbulb',
  }[tipo] || 'file';
}

/** [Perguntar sobre isto] [Ensinar algo sobre isto] para qualquer registro. */
export function acoesPadrao(resolved, s) {
  const d = resolved.detalhe || {};
  const area = resolved.tipo === 'aprendizado' ? d.area
    : resolved.tipo === 'doc' ? d.doc?.area : TIPO_AREA[resolved.tipo] || resolved.modulo;
  const maquina = resolved.tipo === 'maq' ? d.id : (resolved.tipo === 'os' || resolved.tipo === 'saber' ? d.maquina : null);
  const modulo = resolved.modulo && FEATURE_BY_ID[resolved.modulo] ? resolved.modulo : undefined;
  const nome = resolved.tipo === 'maq' || resolved.tipo === 'op' || resolved.tipo === 'os' || resolved.tipo === 'nc' || resolved.tipo === 'pedido'
    ? resolved.id : resolved.rotulo;
  return [
    ui.button('Perguntar sobre isto', {
      variant: 'primary', icone: 'search',
      onClick: () => { s.close(); perguntar(`O que preciso saber sobre ${nome}?`, { modulo }); },
    }),
    ui.button('Ensinar algo sobre isto', {
      icone: 'lightbulb',
      onClick: () => { s.close(); ensinar({ area: area || undefined, maquina: maquina || undefined, origem: resolved.ref }); },
    }),
  ];
}

/** Gaveta genérica legível por tipo (nunca JSON cru). Herdada da v1, em tom calmo. */
function genericDrawer(rootEl, resolved, ctx) {
  const f = ctx.fmt;
  const d = resolved.detalhe;
  const byId = (k, id, key = 'id') => (ctx.data?.[k] || []).find((x) => x && x[key] === id);
  const facts = (pairs) => ui.facts(pairs);
  const chips = (refs) => {
    const items = (refs || []).map((r) => ui.refChip(r, ctx)).filter(Boolean);
    return items.length ? h('div', { class: 'ref-chips' }, items) : null;
  };
  const section = (label, body) => (body ? h('section', { class: 'drawer-section' }, h('h3', { class: 'drawer-section__title' }, label), body) : null);
  const linha = (id) => ctx.data?.linhas?.find((l) => l.id === id)?.nome || id;
  const unidade = ctx.term('unidade') === 'unidade' ? '' : ctx.term('unidade');

  switch (resolved.tipo) {
    case 'op': {
      const prod = byId('produtos', d.sku, 'sku');
      rootEl.append(
        h('div', { class: 'detail__badges' }, ui.statusBadge(d.status), prod ? h('span', { class: 'muted' }, prod.nome) : null),
        ui.progress(d.progresso, { tone: d.status === 'atrasada' ? 'danger' : 'accent', label: `Progresso ${d.progresso}%` }),
        facts([
          ['Quantidade', `${f.num(d.quantidade)} ${unidade}`.trim()],
          [ctx.term('linha'), linha(d.linha)],
          ['Prazo', `${f.date(d.prazo)} (${f.rel(d.prazo)})`],
          ['Progresso', `${d.progresso}%`],
          ['Pedido', d.pedido ? (chips([`pedido:${d.pedido}`]) || d.pedido) : null],
        ]),
        d.motivo_atraso ? section('Motivo do atraso', h('p', { class: 'detail__lead' }, d.motivo_atraso)) : null,
        section('Histórico', d.historico?.length
          ? h('ul', { class: 'timeline' }, d.historico.slice(-3).map((ev) => h('li', null,
            h('span', { class: 'timeline__date' }, f.date(ev.data)), h('span', null, ev.evento)))) : null));
      break;
    }
    case 'pedido': {
      rootEl.append(
        ui.statusBadge(d.status),
        facts([
          [ctx.term('cliente'), chips([`cliente:${d.cliente}`]) || d.cliente],
          [ctx.term('representante'), chips([`rep:${d.representante}`]) || d.representante],
          ['Data', f.date(d.data)],
          ['Previsão de entrega', `${f.date(d.previsao_entrega)} (${f.rel(d.previsao_entrega)})`],
          [ctx.term('ordem'), d.ordem ? (chips([`op:${d.ordem}`]) || d.ordem) : null],
          ['Observação', d.observacao || null],
        ]),
        section('Itens', (d.itens || []).length ? h('ul', { class: 'bullets' }, d.itens.map((it) => h('li', null,
          `${byId('produtos', it.sku, 'sku')?.nome || it.sku} · ${f.num(it.quantidade)} × ${f.money(it.preco_unit)}`))) : null));
      break;
    }
    case 'sku':
      rootEl.append(
        d.descricao_comercial ? h('p', { class: 'detail__lead' }, d.descricao_comercial) : null,
        facts([
          ['Preço', f.money(d.preco)],
          ['Prazo', d.prazo_dias != null ? `${d.prazo_dias} dias` : null],
          ['Estoque', `${f.num(d.estoque)} ${d.unidade || ''}`.trim()],
          ['Estoque mínimo', f.num(d.estoque_minimo)],
        ]),
        d.estoque < d.estoque_minimo ? ui.badge('Estoque abaixo do mínimo', 'warn') : null);
      break;
    case 'nc':
      rootEl.append(
        h('div', { class: 'detail__badges' }, ui.statusBadge(d.status), ui.statusBadge(d.severidade)),
        h('p', { class: 'detail__lead' }, d.descricao),
        facts([
          ['Data', f.date(d.data)],
          [ctx.term('produto'), d.sku ? (chips([`sku:${d.sku}`]) || d.sku) : null],
          ['Causa', d.causa],
          ['Ação', d.acao],
          ['Responsável', d.responsavel],
        ]));
      break;
    case 'os': {
      rootEl.append(
        h('div', { class: 'detail__badges' }, ui.statusBadge(d.status), ui.statusBadge(d.tipo)),
        h('p', { class: 'detail__lead' }, d.descricao),
        facts([
          [ctx.term('maquina'), chips([`maq:${d.maquina}`]) || d.maquina],
          ['Data', f.date(d.data)],
          ['Técnico', d.tecnico],
          ['Peças', (d.pecas || []).join(', ') || null],
          ['Procedimento', d.procedimento ? (chips([`doc:${d.procedimento}`]) || d.procedimento) : null],
        ]));
      break;
    }
    case 'maq': {
      const osList = (ctx.data.manutencao || []).filter((o) => o.maquina === d.id);
      const registros = learning ? learning.list({ maquina: d.id }) : [];
      rootEl.append(
        h('div', { class: 'detail__badges' }, ui.statusBadge(d.status), h('span', { class: 'muted' }, d.tipo)),
        facts([
          [ctx.term('linha'), linha(d.linha)],
          ['Horímetro', typeof d.horimetro === 'number' ? `${f.num(d.horimetro)} h` : null],
          ['MTBF', typeof d.mtbf_h === 'number' ? `${f.num(d.mtbf_h)} h` : null],
          ['Próxima preventiva', d.proxima_preventiva ? `${f.date(d.proxima_preventiva)} (${f.rel(d.proxima_preventiva)})` : null],
        ]),
        registros.length ? section('Registros da equipe', h('div', { class: 'stack' }, registros.map(learnedCard))) : null,
        section('Ordens de serviço', chips(osList.map((o) => `os:${o.id}`))));
      break;
    }
    case 'kpi':
      rootEl.append(
        ui.kpiTile({ kpi: d }),
        d.explicacao ? section('O que mudou', h('p', { class: 'detail__lead' }, d.explicacao)) : null,
        section('Caminho até o dado', d.caminho?.length ? h('ol', { class: 'path' }, d.caminho.map((p) => h('li', null, p))) : null),
        section('Fontes', chips(d.fontes)));
      break;
    case 'doc': {
      const doc = d.doc;
      const hl = d.trecho?.id;
      rootEl.append(
        h('p', { class: 'muted' }, `${doc.tipo || 'Documento'} · ${doc.origem || ''} · atualizado ${f.date(doc.atualizado)}`),
        section('Trechos', (doc.trechos || []).length ? h('div', { class: 'doc-trechos' }, doc.trechos.map((t) =>
          h('blockquote', { class: ['doc-trecho', t.id === hl && 'is-highlight'] }, h('cite', null, t.secao), h('p', null, t.texto)))) : null));
      break;
    }
    case 'cliente': {
      const pedidos = (ctx.data.pedidos || []).filter((p) => p.cliente === d.id);
      rootEl.append(
        facts([
          ['Cidade', [d.cidade, d.uf].filter(Boolean).join(' · ')],
          ['Segmento', d.segmento],
          [ctx.term('representante'), chips([`rep:${d.representante}`]) || d.representante],
          ['Condição', d.condicao_pagamento],
          ['Tabela', d.tabela_preco],
          ['Último pedido', f.date(d.ultimo_pedido)],
        ]),
        section('Pedidos', chips(pedidos.map((p) => `pedido:${p.id}`))));
      break;
    }
    case 'rep': {
      const pct = d.meta_mes ? (d.realizado_mes / d.meta_mes) * 100 : 0;
      rootEl.append(
        facts([['Região', d.regiao], ['Meta do mês', f.money(d.meta_mes)], ['Realizado', f.money(d.realizado_mes)], ['Atingimento', `${f.num(pct, 0)}%`]]),
        ui.progress(pct, { tone: pct >= 100 ? 'ok' : pct >= 70 ? 'accent' : 'warn' }));
      break;
    }
    case 'regra':
      rootEl.append(h('p', { class: 'detail__lead' }, d.texto));
      break;
    case 'turno':
      rootEl.append(
        facts([
          ['Produzido', `${f.num(d.produzido)} ${unidade}`.trim()],
          ['Refugo', f.num(d.refugo)],
          ['Paradas', `${f.num(d.paradas_min)} min`],
        ]),
        d.resumo ? h('p', { class: 'detail__lead' }, d.resumo) : null,
        section('Ocorrências', d.ocorrencias?.length ? h('ul', { class: 'bullets' }, d.ocorrencias.map((o) => h('li', null, o))) : null));
      break;
    case 'saber':
      rootEl.append(
        h('p', { class: 'detail__lead' }, d.dica),
        facts([
          ['Quem', `${d.autor} · ${d.funcao}`],
          ['Anos de casa', d.tempo_casa_anos],
          [ctx.term('maquina'), d.maquina ? (chips([`maq:${d.maquina}`]) || d.maquina) : null],
          ['Validado por', d.validado_por],
        ]),
        (d.tags || []).length ? h('div', { class: 'tag-row' }, d.tags.map((t) => ui.badge(t, 'neutral'))) : null);
      break;
    case 'integ':
      rootEl.append(ui.statusBadge(d.status), facts([
        ['Última sincronização', d.ultima_sync ? f.datetime(d.ultima_sync) : null],
        ['Registros', typeof d.registros === 'number' ? f.num(d.registros) : null],
        ['Observação', d.observacao],
      ]));
      break;
    case 'aprendizado':
      rootEl.append(learnedCard(d));
      break;
    default:
      rootEl.append(ui.emptyState('Sem visualização para este tipo de registro.'));
  }
}

function learnedCard(item) {
  return h('div', { class: 'drawer-learned' },
    h('span', { class: 'drawer-learned__by' }, icon('lightbulb', { size: 14 }),
      `Registrado por ${item.autor && item.autor !== 'Você' ? item.autor : 'você'} · ${quando(item.criado_em)}`),
    item.titulo ? h('strong', null, item.titulo) : null,
    h('p', null, item.texto));
}

export function quando(iso) {
  const t = Date.parse(iso || '');
  if (!Number.isFinite(t)) return '';
  const min = Math.round((Date.now() - t) / 60000);
  if (min < 2) return 'agora';
  if (min < 60) return `há ${min} min`;
  const hrs = Math.round(min / 60);
  if (hrs < 24) return `há ${hrs} h`;
  const dias = Math.round(hrs / 24);
  return dias === 1 ? 'ontem' : `há ${dias} dias`;
}

// ---------------------------------------------------------------------------
// Substitutos enquanto B não entrega (mesma assinatura; leves)

function conversaSubstituta(host, ctx) {
  const log = h('div', { class: 'stack', 'aria-live': 'polite' });
  const input = h('textarea', { class: 'textarea', rows: '2', placeholder: 'Pergunte outra coisa ou diga “anota que…”', 'aria-label': 'Pergunta' });
  const historico = [];
  let ac = null;
  async function enviar(texto) {
    if (!texto.trim()) return;
    historico.push({ role: 'user', content: texto });
    log.append(h('p', { style: { alignSelf: 'flex-end', background: 'var(--surface-muted)', padding: '8px 12px', borderRadius: '16px' } }, texto));
    const linha = h('p', { class: 'muted' }, 'Pensando…');
    const corpo = h('div');
    log.append(linha, corpo);
    ac = new AbortController();
    try {
      const r = await api.conversa(demoId, { mensagens: historico, modulo: 'visao-geral', autor: ctx.autorSalvo() || undefined }, {
        signal: ac.signal,
        onFerramenta: (f) => { linha.textContent = f.rotulo || 'Consultando…'; },
        onTexto: (_d, total) => { linha.textContent = ''; corpo.replaceChildren(renderMarkdown(total)); },
        onAprendizado: (item) => { learning.add(item).catch(() => {}); },
      });
      corpo.replaceChildren(renderMarkdown(r.texto));
      const fontes = r.fontes.map((ref) => ui.refChip(ref, buildCtx())).filter(Boolean);
      if (fontes.length) corpo.append(h('div', { class: 'ref-chips' }, fontes));
      historico.push({ role: 'assistant', content: r.texto });
      linha.remove();
    } catch (err) {
      if (err.abortado) { linha.textContent = 'Resposta interrompida.'; return; }
      linha.textContent = 'Não consegui responder agora.';
    }
  }
  const form = h('form', {
    class: 'stack',
    onSubmit: (e) => { e.preventDefault(); const t = input.value; input.value = ''; enviar(t); },
  }, input, h('div', { class: 'row' }, ui.button('Enviar', { type: 'submit', variant: 'primary', icone: 'arrow-up' })));
  host.append(h('div', { class: 'page page--read' },
    h('div', { class: 'row' }, ui.button('Início', { variant: 'ghost', icone: 'chevron-left', onClick: () => navigate('#inicio') })),
    log, form));
  if (perguntaPendente) {
    const p = perguntaPendente;
    perguntaPendente = null;
    enviar(p.texto);
  } else {
    input.focus();
  }
  return () => ac?.abort();
}

function ensinarSubstituto({ area, maquina } = {}) {
  const ctx = buildCtx();
  const areas = (data?.areas || []).filter((a) => !FEATURE_BY_ID[a.id] || isEnabled(a.id));
  const texto = h('textarea', { class: 'textarea', rows: '5', maxlength: '2000', autofocus: true, 'aria-label': 'O que o cérebro precisa saber?' });
  const sel = ui.select({ label: 'Área', options: areas.map((a) => ({ value: a.id, label: a.nome })), value: area || areas[0]?.id });
  const erro = h('p', { class: 'field__error', role: 'alert' });
  const s = ui.sheet({
    titulo: 'Ensinar o cérebro',
    subtitulo: 'O que você registrar aqui vale para as próximas respostas.',
    corpo: [h('label', { class: 'field' }, h('span', { class: 'field__label' }, 'O que o cérebro precisa saber?'), texto), sel, erro],
  });
  const enviar = ui.button('Ensinar ao cérebro', {
    variant: 'primary',
    onClick: async () => {
      const t = texto.value.trim();
      if (t.length < 12) { erro.textContent = 'Escreva um pouco mais para o cérebro entender.'; return; }
      enviar.disabled = true;
      try {
        const titulo = (t.split(/(?<=[.!?])\s/)[0] || t).slice(0, 80);
        await learning.add({ tipo: 'saber', titulo, texto: t, area: sel.querySelector('select').value, maquina: maquina || null, autor: ctx.autor() });
        s.setCorpo(h('div', { class: 'stack' }, h('h3', null, 'O cérebro aprendeu.')));
        s.setAcoes(ui.button('Fechar', { onClick: () => s.close() }));
      } catch {
        erro.textContent = 'Não conseguimos registrar agora. Tente de novo.';
        enviar.disabled = false;
      }
    },
  });
  s.setAcoes([enviar, ui.button('Cancelar', { variant: 'ghost', onClick: () => s.close() })]);
  return s;
}

// depuração manual
window.__tornoDemo = { buildCtx: () => buildCtx(), navigate, openRef };

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
else boot();
