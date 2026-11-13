// Boot, roteador, casca (barra lateral + topo + faixa) e gaveta de detalhe da demo da Torno.
import { fmt, TODAY } from './format.js';
import {
  FEATURES, FEATURE_BY_ID, OFERTAS, enabledFeatures, isFeatureOn,
} from './features.js';
import { SECTOR_IDS, normalizeConfig } from './config.js';
import { getState, setState, subscribe, readSectorOverride, writeSectorOverride } from './state.js';
import { createConfigStore } from './adapters/config-store.js';
import { FictitiousDataSource, resolveRef as resolveRefData, REF_TYPES } from './adapters/data-source.js';
import * as ui from './ui.js';

const { h, icon, toast } = ui;

const dataSource = new FictitiousDataSource();
let configStore = null;
let assistant = null;
const moduleCache = new Map(); // id → módulo importado (ou {erro})
let currentCleanup = null;
let mountedContext = null;
let renderToken = 0; // invalida renders em corrida (um await pode terminar depois de outro render começar)
let sectorMeta = []; // de sectors.json

const el = {};

// ---------------------------------------------------------------------------
// ctx entregue a cada render(el, ctx)

function sectorNome(id) {
  return sectorMeta.find((s) => s.id === id)?.nome || getState().data?.setor || id;
}

function buildCtx() {
  const s = getState();
  const data = s.data;
  const enabled = enabledFeatures(s.config);
  const isEnabled = (id) => isFeatureOn(enabledConfigModulos(s.config), id);
  const term = (key) => (data?.vocabulario && data.vocabulario[key]) || key;
  const areaName = (areaId) => data?.areas?.find((a) => a.id === areaId)?.nome || areaId;
  const resolveRef = (ref) => resolveRefData(data, ref, isEnabled);
  const empresa = (s.config?.empresa_nome || '').trim() || data?.empresa?.nome || sectorNome(s.sectorId);

  return {
    data,
    sector: { id: s.sectorId, nome: sectorNome(s.sectorId) },
    empresa,
    today: TODAY,
    features: enabled,
    isEnabled,
    term,
    areaName,
    resolveRef,
    openRef: (ref) => openRef(ref),
    navigate: (route) => navigate(route),
    assistant,
    fmt,
    ui,
  };
}

function enabledConfigModulos(config) {
  // objeto { id: bool } já com dependências aplicadas (enabledFeatures faz a cascata)
  const on = new Set(enabledFeatures(config).map((f) => f.id));
  return Object.fromEntries(FEATURES.map((f) => [f.id, on.has(f.id)]));
}

// ---------------------------------------------------------------------------
// Boot

async function boot() {
  buildShell();
  renderLoading();

  // 1. sectors.json (índice) — sem ele a demo não roda
  try {
    sectorMeta = await dataSource.listSectors();
  } catch (err) {
    console.error('[boot] falha ao carregar sectors.json', err);
    renderFatal('Não foi possível carregar a lista de setores da demo.', err);
    return;
  }

  // 2. config (db no claude.ai, localStorage fora dele)
  try {
    configStore = await createConfigStore();
    const config = await configStore.load();
    setState({ config, canEdit: configStore.canEdit(), storeKind: configStore.kind });
  } catch (err) {
    console.warn('[boot] config indisponível; seguindo com o padrão', err);
    setState({ config: normalizeConfig(null), canEdit: false, storeKind: 'local' });
  }

  // escuta mudanças de config vindas de outro aparelho/aba
  if (configStore) {
    configStore.subscribe((config) => {
      const prev = getState().config;
      if (JSON.stringify({ ...prev, atualizado_em: null }) === JSON.stringify({ ...config, atualizado_em: null })) return;
      setState({ config });
      resolveSector();
      renderShell();
      loadSectorThen(renderRoute);
    });
  }

  // 3. assistente (import dinâmico; stub se falhar)
  assistant = await loadAssistant();
  setState({ mode: assistant.modo ? assistant.modo() : 'local' });

  // o assistente detecta a IA de forma assíncrona (e pode perdê-la): mantém o selo do topo em dia
  if (typeof assistant.onModeChange === 'function') {
    assistant.onModeChange((modo) => {
      if (getState().mode === modo) return;
      setState({ mode: modo });
      if (el.modeTag) updateModeTag();
    });
  }

  // 4. setor efetivo + dados (sem renderizar a rota aqui: onHashChange faz o primeiro render,
  //    para não disparar dois renderRoute em corrida no boot)
  resolveSector();
  renderShell();
  await loadSectorThen();

  window.addEventListener('hashchange', onHashChange);
  onHashChange();
}

async function loadAssistant() {
  try {
    const mod = await import('./ai/assistant.js');
    if (mod && typeof mod.createAssistant === 'function') {
      const a = mod.createAssistant(() => mountedContext || buildCtx());
      if (a && typeof a.ask === 'function') return a;
    }
    throw new Error('createAssistant ausente ou inválido');
  } catch (err) {
    console.warn('[boot] assistente indisponível; usando stub local', err);
    return stubAssistant();
  }
}

function stubAssistant() {
  return {
    async ask() {
      return { texto: 'Assistente indisponível nesta visualização.', fontes: [], modo: 'local', aviso: 'indisponivel' };
    },
    sugestoes: () => [],
    buscar: () => [],
    modo: () => 'local',
    setPreferencia: () => {},
  };
}

function resolveSector() {
  const override = readSectorOverride();
  const s = getState();
  const want = (override && SECTOR_IDS.includes(override) && override)
    || (SECTOR_IDS.includes(s.config?.setor) && s.config.setor)
    || 'textil';
  setState({ sectorId: want, sectorOverride: override && SECTOR_IDS.includes(override) ? override : null });
}

async function loadSectorThen(after) {
  const id = getState().sectorId;
  setState({ dataError: null });
  renderLoading();
  try {
    const data = await dataSource.loadSector(id);
    setState({ data, dataError: null });
  } catch (err) {
    console.warn(`[dados] setor ${id} indisponível`, err);
    setState({ data: null, dataError: err.status === 404 ? 'faltando' : 'erro' });
  }
  // o nome da empresa e o vocabulário vêm do pacote recém-carregado: atualiza a casca
  if (el.shell) renderShell();
  if (typeof after === 'function') after();
}

// ---------------------------------------------------------------------------
// Casca (shell)

function buildShell() {
  const root = document.getElementById('app') || document.body;
  root.replaceChildren();

  el.band = h('div', { class: 'disclaimer', role: 'note' },
    icon('info', { size: 14 }),
    h('span', null, 'Dados fictícios para demonstração · empresa, pessoas e números inventados.'));

  el.menuBtn = h('button', {
    type: 'button', class: 'icon-btn menu-btn', 'aria-label': 'Abrir menu', 'aria-expanded': 'false',
    onClick: () => toggleDrawerNav(true),
  }, icon('menu', { size: 20 }));

  el.topTitle = h('h1', { class: 'topbar__title' }, 'Visão geral');
  el.sectorSelect = h('div', { class: 'topbar__sector' });
  el.empresaTag = h('span', { class: 'topbar__empresa' });
  el.modeTag = h('span', { class: 'mode-tag' });

  el.topbar = h('header', { class: 'topbar' },
    el.menuBtn,
    h('div', { class: 'topbar__main' }, el.topTitle, el.empresaTag),
    h('div', { class: 'topbar__right' }, el.sectorSelect, el.modeTag));

  el.nav = h('nav', { class: 'sidebar__nav', 'aria-label': 'Módulos' });
  el.sidebarFoot = h('div', { class: 'sidebar__foot' });
  el.brandSub = h('div', { class: 'brand__sub' });
  el.sidebar = h('aside', { class: 'sidebar', id: 'sidebar' },
    h('div', { class: 'sidebar__brand' },
      h('a', {
        class: 'brand', href: '#visao-geral', onClick: () => toggleDrawerNav(false),
      },
      h('span', { class: 'brand__mark' }, 'Torno'),
      h('span', { class: 'brand__tag' }, 'demo')),
      el.brandSub),
    el.nav,
    el.sidebarFoot);

  el.scrim = h('div', { class: 'scrim', onClick: () => toggleDrawerNav(false) });
  el.content = h('main', { class: 'content', id: 'conteudo', tabindex: '-1' });

  el.shell = h('div', { class: 'shell' }, el.sidebar, el.scrim,
    h('div', { class: 'shell__main' }, el.topbar, el.content));

  root.append(el.band, el.shell);
}

function toggleDrawerNav(open) {
  const isOpen = open ?? !el.sidebar.classList.contains('is-open');
  el.sidebar.classList.toggle('is-open', isOpen);
  el.scrim.classList.toggle('is-visible', isOpen);
  el.menuBtn.setAttribute('aria-expanded', String(isOpen));
  document.body.classList.toggle('nav-open', isOpen);
}

function renderShell() {
  const s = getState();
  const ctx = buildCtx();

  el.brandSub.replaceChildren(
    h('span', { class: 'brand__company' }, ctx.empresa),
    h('span', { class: 'brand__sector' }, sectorNome(s.sectorId)));

  // Navegação agrupada por oferta
  el.nav.replaceChildren();
  const enabled = enabledFeatures(s.config);
  const enabledIds = new Set(enabled.map((f) => f.id));
  for (const oferta of OFERTAS) {
    const items = FEATURES.filter((f) => f.oferta === oferta.id && enabledIds.has(f.id));
    if (!items.length) continue;
    const group = h('div', { class: 'nav-group' }, h('p', { class: 'nav-group__label' }, oferta.nome));
    for (const f of items) {
      group.appendChild(h('a', {
        class: ['nav-link', s.route === f.id && 'is-active'],
        href: f.rota, 'data-route': f.id,
        'aria-current': s.route === f.id ? 'page' : null,
        onClick: () => toggleDrawerNav(false),
      }, icon(f.icone, { size: 18 }), h('span', null, f.nome)));
    }
    el.nav.appendChild(group);
  }

  // Rodapé: link Admin só para quem edita
  el.sidebarFoot.replaceChildren();
  if (s.canEdit) {
    el.sidebarFoot.appendChild(h('a', {
      class: ['nav-link', 'nav-link--admin', s.route === 'admin' && 'is-active'],
      href: '#admin', onClick: () => toggleDrawerNav(false),
    }, icon('settings-2', { size: 18 }), h('span', null, 'Admin')));
  }
  el.sidebarFoot.appendChild(h('p', { class: 'sidebar__note' }, s.storeKind === 'local' ? 'Modo local' : 'Configuração compartilhada'));

  // Topo: seletor de setor + empresa + modo
  el.sectorSelect.replaceChildren(ui.select({
    id: 'seletor-setor', label: 'Setor', hideLabel: false,
    options: sectorMeta.map((x) => ({ value: x.id, label: x.nome })),
    value: s.sectorId,
    onChange: (id) => changeSector(id),
  }));
  el.empresaTag.textContent = ctx.empresa;
  updateModeTag();
}

function updateModeTag() {
  if (!el.modeTag) return;
  const ia = (getState().mode || 'local') === 'ia';
  el.modeTag.replaceChildren(
    icon(ia ? 'sparkles' : 'cpu', { size: 14 }),
    h('span', null, ia ? 'IA ativa' : 'Roteiro local'));
  el.modeTag.className = `mode-tag ${ia ? 'mode-tag--ia' : 'mode-tag--local'}`;
  el.modeTag.title = ia
    ? 'As respostas usam o modelo de IA desta visualização.'
    : 'Sem IA nesta visualização: as respostas vêm de um roteiro determinístico sobre os dados.';
}

function changeSector(id) {
  if (!SECTOR_IDS.includes(id) || id === getState().sectorId) return;
  // Troca só a sessão (vale para admin e não-admin; a config persistente muda no #admin).
  writeSectorOverride(id);
  setState({ sectorId: id, sectorOverride: id });
  renderShell();
  loadSectorThen(() => {
    if (getState().route === 'admin') renderRoute();
    else renderRoute();
  });
}

// ---------------------------------------------------------------------------
// Roteador

function routeFromHash() {
  return (location.hash || '').replace(/^#/, '').trim().toLowerCase();
}

function onHashChange() {
  const raw = routeFromHash();

  // #<setor> → override da sessão + visão geral
  if (SECTOR_IDS.includes(raw)) {
    writeSectorOverride(raw);
    setState({ sectorId: raw, sectorOverride: raw });
    renderShell();
    loadSectorThen(() => {
      setRoute('visao-geral');
      // normaliza o hash para a rota de módulo, sem empilhar histórico
      if (routeFromHash() !== 'visao-geral') location.replace('#visao-geral');
      else renderRoute();
    });
    return;
  }

  if (raw === 'admin') {
    setRoute('admin');
    renderRoute();
    return;
  }

  const feature = FEATURE_BY_ID[raw];
  const s = getState();
  if (!raw || raw === 'visao-geral') {
    setRoute('visao-geral');
    renderRoute();
    return;
  }
  if (!feature) {
    toast('Essa tela não existe nesta demo.', { tone: 'neutral' });
    navigate('#visao-geral');
    return;
  }
  if (!isFeatureOn(enabledConfigModulos(s.config), raw)) {
    toast(`O módulo “${feature.nome}” está desligado nesta demo.`, { tone: 'neutral' });
    navigate('#visao-geral');
    return;
  }
  setRoute(raw);
  renderRoute();
}

function setRoute(route) {
  setState({ route });
  // atualiza "ativo" no menu sem rebuildar tudo
  for (const link of el.nav.querySelectorAll('.nav-link')) {
    const on = link.dataset.route === route;
    link.classList.toggle('is-active', on);
    if (on) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  }
  const adminLink = el.sidebarFoot.querySelector('.nav-link--admin');
  if (adminLink) adminLink.classList.toggle('is-active', route === 'admin');
}

function navigate(route) {
  const hash = route.startsWith('#') ? route : `#${route}`;
  if (location.hash === hash) onHashChange();
  else location.hash = hash;
}

// ---------------------------------------------------------------------------
// Render da rota

function runCleanup() {
  if (typeof currentCleanup === 'function') {
    try {
      currentCleanup();
    } catch (err) {
      console.error('[app] cleanup falhou', err);
    }
  }
  currentCleanup = null;
  mountedContext = null;
}

async function renderRoute() {
  const token = ++renderToken; // este render passa a ser o atual; os anteriores viram obsoletos
  runCleanup();
  const s = getState();
  el.topTitle.textContent = s.route === 'admin' ? 'Administração da demo' : (FEATURE_BY_ID[s.route]?.nome || 'Visão geral');
  closeDrawer();

  if (s.route === 'admin') {
    el.content.replaceChildren();
    try {
      const mod = await import('./admin.js');
      if (token !== renderToken) return; // outro render começou enquanto o admin.js carregava
      const ctx = {
        ...buildCtx(), store: configStore, config: normalizeConfig(getState().config),
        applyConfig, reloadSector: () => loadSectorThen(renderRoute),
      };
      mountedContext = ctx;
      const out = mod.render(el.content, ctx);
      if (typeof out === 'function') currentCleanup = out;
    } catch (err) {
      if (token !== renderToken) return;
      console.error('[admin] falha', err);
      renderModuleError('admin', err);
    }
    focusContent();
    return;
  }

  if (!s.data) {
    el.content.replaceChildren();
    if (s.dataError === 'faltando') {
      el.content.appendChild(dataMissingCard());
    } else if (s.dataError === 'erro') {
      el.content.appendChild(dataErrorCard());
    } else {
      renderLoading();
    }
    focusContent();
    return;
  }

  el.content.replaceChildren();
  const ctx = buildCtx();
  mountedContext = ctx;
  try {
    const mod = await loadModule(s.route);
    if (token !== renderToken) return; // import demorou: um render mais novo assumiu
    if (mod.erro) {
      renderModuleError(s.route, mod.erro);
    } else if (typeof mod.render === 'function') {
      const host = h('div', { class: `module module--${s.route}` });
      el.content.appendChild(host);
      const out = mod.render(host, ctx);
      if (typeof out === 'function') currentCleanup = out;
    } else {
      renderModuleError(s.route, new Error('o módulo não exporta render(el, ctx)'));
    }
  } catch (err) {
    if (token !== renderToken) return;
    console.error(`[módulo ${s.route}] erro ao renderizar`, err);
    renderModuleError(s.route, err);
  }
  focusContent();
}

async function loadModule(id) {
  if (moduleCache.has(id)) return moduleCache.get(id);
  let result;
  try {
    result = await import(`./modules/${id}.js`);
  } catch (err) {
    result = { erro: err };
  }
  moduleCache.set(id, result);
  return result;
}

function focusContent() {
  // sem roubar o foco de quem já está digitando
  if (document.activeElement && document.activeElement !== document.body) return;
  el.content.scrollTop = 0;
}

// ---------------------------------------------------------------------------
// Estados desenhados

function renderLoading() {
  if (!el.content) return;
  el.content.replaceChildren(h('div', { class: 'loading', 'aria-busy': 'true', 'aria-live': 'polite' },
    h('div', { class: 'loading__spinner', 'aria-hidden': 'true' }),
    h('p', null, 'Carregando os dados da demonstração…')));
}

function renderFatal(msg, err) {
  const root = document.getElementById('app') || document.body;
  root.replaceChildren(h('div', { class: 'fatal' },
    h('div', { class: 'fatal__card' },
      icon('alert', { size: 28 }),
      h('h1', null, 'Não foi possível abrir a demo'),
      h('p', null, msg),
      err ? h('p', { class: 'fatal__detail' }, String(err.message || err)) : null)));
}

function renderModuleError(id, err) {
  el.content.replaceChildren(ui.card({
    titulo: 'Módulo indisponível',
    corpo: h('div', { class: 'module-error' },
      icon('alert', { size: 22 }),
      h('p', null, `A tela “${FEATURE_BY_ID[id]?.nome || id}” ainda não está disponível nesta visualização.`),
      h('p', { class: 'module-error__hint' }, 'Esta parte da demo é montada por outro pacote. O erro técnico ficou registrado no console.')),
    class: 'card--notice',
  }));
  console.error(`[módulo ${id}]`, err);
}

function dataMissingCard() {
  return ui.card({
    titulo: 'Pacote de dados ainda não disponível',
    corpo: h('div', { class: 'module-error' },
      icon('database', { size: 22 }),
      h('p', null, `O conjunto de dados do setor “${sectorNome(getState().sectorId)}” ainda não foi publicado nesta demo.`),
      h('p', { class: 'module-error__hint' }, 'Escolha outro setor no seletor do topo ou volte em instantes.')),
    class: 'card--notice',
  });
}

function dataErrorCard() {
  return ui.card({
    titulo: 'Não foi possível carregar os dados',
    acoes: ui.button('Tentar de novo', { icone: 'refresh', onClick: () => loadSectorThen(renderRoute) }),
    corpo: h('div', { class: 'module-error' },
      icon('alert', { size: 22 }),
      h('p', null, 'Houve uma falha ao buscar o pacote de dados deste setor.')),
    class: 'card--notice',
  });
}

// ---------------------------------------------------------------------------
// Gaveta de detalhe (openRef)

let drawerEl = null;

function ensureDrawer() {
  if (drawerEl) return drawerEl;
  const panel = h('aside', { class: 'detail', role: 'dialog', 'aria-modal': 'false', 'aria-label': 'Detalhe do registro', tabindex: '-1' });
  const scrim = h('div', { class: 'detail-scrim', onClick: () => closeDrawer() });
  drawerEl = { panel, scrim, body: panel };
  document.body.append(scrim, panel);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('detail-open')) closeDrawer();
  });
  return drawerEl;
}

function openRef(ref) {
  const ctx = mountedContext || buildCtx();
  const resolved = ctx.resolveRef(ref);
  if (!resolved) {
    toast('Essa fonte não está disponível (módulo desligado ou registro inexistente).', { tone: 'neutral' });
    return;
  }
  const d = ensureDrawer();
  d.panel.replaceChildren();
  d.panel.appendChild(h('header', { class: 'detail__head' },
    h('div', { class: 'detail__eyebrow' }, icon('file', { size: 14 }), resolved.tipoNome),
    h('button', { type: 'button', class: 'icon-btn', 'aria-label': 'Fechar', onClick: () => closeDrawer() }, icon('x', { size: 18 }))));
  const content = h('div', { class: 'detail__body' });
  try {
    renderDrawer(content, resolved, ctx);
  } catch (err) {
    console.error('[gaveta] falha ao desenhar', err);
    content.appendChild(ui.emptyState('Não foi possível mostrar este registro.', { icone: 'alert' }));
  }
  d.panel.appendChild(content);
  document.body.classList.add('detail-open');
  d.scrim.classList.add('is-visible');
  d.panel.classList.add('is-open');
  d.panel.focus();
}

function closeDrawer() {
  if (!drawerEl) return;
  document.body.classList.remove('detail-open');
  drawerEl.scrim.classList.remove('is-visible');
  drawerEl.panel.classList.remove('is-open');
}

// Conteúdo da gaveta por tipo de registro: legível, nunca JSON cru.
function renderDrawer(root, resolved, ctx) {
  const { fmt: f } = ctx;
  const data = ctx.data;
  const byId = (k, id, key = 'id') => (data[k] || []).find((x) => x && x[key] === id);
  const d = resolved.detalhe;
  const facts = (pairs) => ui.facts(pairs);
  const title = (t, sub) => h('div', { class: 'detail__title' }, h('h2', null, t), sub ? h('p', { class: 'detail__sub' }, sub) : null);
  const chips = (refs) => {
    const items = (refs || []).map((r) => ui.refChip(r, ctx)).filter(Boolean);
    return items.length ? h('div', { class: 'ref-chips' }, items) : null;
  };
  const section = (label, body) => (body ? h('div', { class: 'detail__section' }, h('h3', { class: 'detail__section-title' }, label), body) : null);

  switch (resolved.tipo) {
    case 'op': {
      const prod = byId('produtos', d.sku, 'sku');
      root.append(
        title(d.id, prod ? prod.nome : d.sku),
        ui.statusBadge(d.status),
        facts([
          [ctx.term('produto') || 'Produto', chips([`sku:${d.sku}`]) || (prod?.nome ?? d.sku)],
          ['Quantidade', `${f.num(d.quantidade)} ${ctx.term('unidade') || ''}`.trim()],
          ['Linha', ctx.data.linhas?.find((l) => l.id === d.linha)?.nome || d.linha],
          ['Início', f.date(d.inicio)],
          ['Prazo', `${f.date(d.prazo)} (${f.rel(d.prazo)})`],
          ['Progresso', `${d.progresso}%`],
          [ctx.term('cliente') ? 'Pedido' : 'Pedido', chips([`pedido:${d.pedido}`]) || d.pedido],
          ['Motivo do atraso', d.motivo_atraso],
        ]),
        ui.progress(d.progresso, { tone: d.status === 'atrasada' ? 'danger' : null }),
        section('Histórico', d.historico?.length
          ? h('ul', { class: 'timeline' }, d.historico.map((ev) => h('li', null,
            h('span', { class: 'timeline__date' }, f.date(ev.data)), h('span', null, ev.evento)))) : null));
      break;
    }
    case 'pedido': {
      const cli = byId('clientes', d.cliente);
      root.append(
        title(d.id, cli?.nome),
        ui.statusBadge(d.status),
        facts([
          [ctx.term('cliente') || 'Cliente', chips([`cliente:${d.cliente}`]) || d.cliente],
          [ctx.term('representante') || 'Representante', chips([`rep:${d.representante}`]) || d.representante],
          ['Data', f.date(d.data)],
          ['Previsão de entrega', `${f.date(d.previsao_entrega)} (${f.rel(d.previsao_entrega)})`],
          [ctx.term('ordem') || 'Ordem', d.ordem ? (chips([`op:${d.ordem}`]) || d.ordem) : null],
          ['Observação', d.observacao || null],
        ]),
        section('Itens', ui.table({
          columns: [
            { key: 'sku', label: ctx.term('produto') || 'Produto', render: (r) => chips([`sku:${r.sku}`]) || r.sku },
            { key: 'quantidade', label: 'Qtde', align: 'right', render: (r) => f.num(r.quantidade) },
            { key: 'preco_unit', label: 'Preço', align: 'right', render: (r) => f.money(r.preco_unit) },
            { key: 'total', label: 'Total', align: 'right', render: (r) => f.money(r.quantidade * r.preco_unit) },
          ],
          rows: d.itens || [],
          sticky: false,
        })));
      break;
    }
    case 'sku': {
      root.append(
        title(d.nome, `${d.sku} · ${d.familia || ''}`.trim()),
        d.descricao_comercial ? h('p', { class: 'detail__lead' }, d.descricao_comercial) : null,
        facts([
          ['Preço', f.money(d.preco)],
          ['Prazo', `${d.prazo_dias} dias`],
          ['Estoque', `${f.num(d.estoque)} ${d.unidade || ''}`.trim()],
          ['Estoque mínimo', f.num(d.estoque_minimo)],
        ]),
        d.estoque < d.estoque_minimo ? ui.badge('Estoque abaixo do mínimo', 'danger') : null,
        section('Ficha técnica', d.ficha ? h('div', null,
          d.ficha.atributos ? facts(Object.entries(d.ficha.atributos)) : null,
          d.ficha.roteiro ? h('p', { class: 'detail__roteiro' }, d.ficha.roteiro.join(' › ')) : null,
          d.ficha.especificacoes?.length ? ui.table({
            columns: [
              { key: 'caracteristica', label: 'Característica' },
              { key: 'nominal', label: 'Nominal', align: 'right' },
              { key: 'tolerancia', label: 'Tolerância', align: 'right' },
              { key: 'unidade', label: 'Un.' },
            ],
            rows: d.ficha.especificacoes, sticky: false,
          }) : null) : null));
      break;
    }
    case 'nc': {
      root.append(
        title(d.id, d.descricao),
        h('div', { class: 'detail__badges' }, ui.statusBadge(d.status), ui.statusBadge(d.severidade), ui.statusBadge(d.origem)),
        facts([
          ['Data', f.date(d.data)],
          [ctx.term('produto') || 'Produto', d.sku ? (chips([`sku:${d.sku}`]) || d.sku) : null],
          ['Linha', ctx.data.linhas?.find((l) => l.id === d.linha)?.nome || d.linha],
          ['Causa', d.causa],
          ['Ação', d.acao],
          ['Responsável', d.responsavel],
        ]),
        section('8D', d.oito_d ? h('ol', { class: 'eightd' }, Object.entries(d.oito_d).map(([k, v]) =>
          h('li', null, h('b', null, k), ' ', v))) : null));
      break;
    }
    case 'os': {
      const maq = byId('maquinas', d.maquina);
      root.append(
        title(d.id, maq?.nome),
        h('div', { class: 'detail__badges' }, ui.statusBadge(d.status), ui.statusBadge(d.tipo)),
        facts([
          [ctx.term('maquina') || 'Máquina', chips([`maq:${d.maquina}`]) || d.maquina],
          ['Data', f.date(d.data)],
          ['Técnico', d.tecnico],
          ['Duração', typeof d.duracao_h === 'number' ? `${f.num(d.duracao_h)} h` : null],
          ['Descrição', d.descricao],
          ['Peças', (d.pecas || []).join(', ') || null],
          ['Procedimento', d.procedimento ? (chips([`doc:${d.procedimento}`]) || d.procedimento) : null],
        ]));
      break;
    }
    case 'maq': {
      const osList = (data.manutencao || []).filter((o) => o.maquina === d.id);
      root.append(
        title(`${d.id} · ${d.nome}`, d.tipo),
        ui.statusBadge(d.status),
        facts([
          ['Linha', ctx.data.linhas?.find((l) => l.id === d.linha)?.nome || d.linha],
          ['Fabricante', d.fabricante],
          ['Ano', d.ano],
          ['Horímetro', typeof d.horimetro === 'number' ? `${f.num(d.horimetro)} h` : null],
          ['MTBF', typeof d.mtbf_h === 'number' ? `${f.num(d.mtbf_h)} h` : null],
          ['Próxima preventiva', d.proxima_preventiva ? `${f.date(d.proxima_preventiva)} (${f.rel(d.proxima_preventiva)})` : null],
          ['Manual', d.manual ? (chips([`doc:${d.manual}`]) || d.manual) : null],
        ]),
        section('Ordens de serviço', osList.length ? h('div', { class: 'ref-chips' }, osList.map((o) => ui.refChip(`os:${o.id}`, ctx)).filter(Boolean)) : null));
      break;
    }
    case 'kpi': {
      root.append(
        title(d.nome, ctx.areaName(d.area)),
        ui.kpiTile({ kpi: d }),
        d.explicacao ? h('p', { class: 'detail__lead' }, d.explicacao) : null,
        section('Caminho até o dado', d.caminho?.length
          ? h('ol', { class: 'path' }, d.caminho.map((p) => h('li', null, p))) : null),
        section('Fontes', chips(d.fontes)));
      break;
    }
    case 'doc': {
      const trechos = resolved.detalhe.doc.trechos || [];
      const doc = resolved.detalhe.doc;
      const highlight = resolved.detalhe.trecho?.id;
      root.append(
        title(doc.titulo, `${doc.tipo} · ${doc.origem}`),
        facts([
          ['Área', ctx.areaName(doc.area)],
          ['Atualizado', f.date(doc.atualizado)],
          ['Acesso', (doc.acesso || []).map((a) => ctx.areaName(a)).join(', ')],
        ]),
        section('Trechos', trechos.length ? h('div', { class: 'doc-trechos' }, trechos.map((t) =>
          h('blockquote', { class: ['doc-trecho', t.id === highlight && 'is-highlight'] },
            h('cite', null, t.secao), h('p', null, t.texto)))) : null));
      break;
    }
    case 'cliente': {
      const pedidos = (data.pedidos || []).filter((p) => p.cliente === d.id);
      root.append(
        title(d.nome, `${d.cidade} · ${d.uf}`),
        facts([
          ['Segmento', d.segmento],
          [ctx.term('representante') || 'Representante', chips([`rep:${d.representante}`]) || d.representante],
          ['Condição de pagamento', d.condicao_pagamento],
          ['Limite de crédito', f.money(d.limite_credito)],
          ['Tabela de preço', d.tabela_preco],
          ['Último pedido', f.date(d.ultimo_pedido)],
        ]),
        section('Pedidos', pedidos.length ? h('div', { class: 'ref-chips' }, pedidos.map((p) => ui.refChip(`pedido:${p.id}`, ctx)).filter(Boolean)) : null));
      break;
    }
    case 'rep': {
      const pct = d.meta_mes ? (d.realizado_mes / d.meta_mes) * 100 : 0;
      root.append(
        title(d.nome, d.regiao),
        facts([
          ['Telefone', d.telefone],
          ['Meta do mês', f.money(d.meta_mes)],
          ['Realizado', f.money(d.realizado_mes)],
          ['Atingimento', `${f.num(pct, 0)}%`],
        ]),
        ui.progress(pct, { tone: pct >= 100 ? 'ok' : pct >= 70 ? null : 'warn' }));
      break;
    }
    case 'regra': {
      root.append(title(d.titulo, d.id), h('p', { class: 'detail__lead' }, d.texto));
      break;
    }
    case 'turno': {
      root.append(
        title(`Turno ${d.turno}`, `${ctx.data.linhas?.find((l) => l.id === d.linha)?.nome || d.linha} · ${f.dateLong(d.data)}`),
        facts([
          ['Produzido', `${f.num(d.produzido)} ${ctx.term('unidade') || ''}`.trim()],
          ['Refugo', f.num(d.refugo)],
          ['Paradas', `${f.num(d.paradas_min)} min`],
        ]),
        d.resumo ? h('p', { class: 'detail__lead' }, d.resumo) : null,
        section('Ocorrências', d.ocorrencias?.length ? h('ul', { class: 'bullets' }, d.ocorrencias.map((o) => h('li', null, o))) : null));
      break;
    }
    case 'saber': {
      root.append(
        title(d.titulo, `${d.autor} · ${d.funcao}`),
        facts([
          ['Anos de casa', d.tempo_casa_anos],
          ['Área', ctx.areaName(d.area)],
          [ctx.term('maquina') || 'Máquina', d.maquina ? (chips([`maq:${d.maquina}`]) || d.maquina) : null],
          ['Validado por', d.validado_por],
          ['Data', f.date(d.data)],
        ]),
        h('p', { class: 'detail__lead' }, d.dica),
        (d.tags || []).length ? h('div', { class: 'tag-row' }, d.tags.map((t) => ui.badge(t, 'neutral'))) : null);
      break;
    }
    case 'integ': {
      root.append(
        title(d.nome, d.tipo),
        ui.statusBadge(d.status),
        facts([
          ['Última sincronização', d.ultima_sync ? f.datetime(d.ultima_sync) : null],
          ['Registros', typeof d.registros === 'number' ? f.num(d.registros) : null],
          ['Observação', d.observacao],
        ]));
      break;
    }
    default:
      root.append(title(resolved.rotulo), ui.emptyState('Sem visualização para este tipo de registro.'));
  }
}

// aplica uma config vinda do admin (já salva): atualiza setor, menu e tela
function applyConfig(config) {
  setState({ config: normalizeConfig(config) });
  resolveSector();
  renderShell();
  loadSectorThen(() => {
    // se a rota atual ficou desligada, o roteador cuida ao navegar
    renderRoute();
  });
}

// expõe para depuração manual
window.__tornoDemo = { getState, buildCtx, navigate, openRef, REF_TYPES };

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}
