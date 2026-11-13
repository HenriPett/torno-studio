// Registro de módulos da demo (PLANO §4) e navegação da v2 (UX §3).
// Os módulos ligados vêm do servidor (GET /api/demo/<id>/estado → demo.modulos).

export const OFERTAS = [
  { id: 'cerebro', nome: 'Cérebro da operação' },
  { id: 'agentes', nome: 'Agentes por área' },
  { id: 'software', nome: 'Software sob medida' },
];

export const FEATURES = [
  {
    id: 'visao-geral', nome: 'Visão geral', icone: 'gauge', rota: '#visao-geral', depende: [],
    descricao: 'Indicadores explicados em português, com o caminho até o dado, e os alertas do dia.',
    oferta: 'agentes', sempreLigado: true,
  },
  {
    id: 'cerebro', nome: 'Cérebro da operação', icone: 'brain', rota: '#cerebro', depende: [],
    descricao: 'Perguntas respondidas com a fonte, busca nos documentos e permissões por área.',
    oferta: 'cerebro',
  },
  {
    id: 'producao', nome: 'Produção e PCP', icone: 'factory', rota: '#producao', depende: [],
    descricao: 'Ordens, roteiro e ficha técnica, resumo de turno e alerta de atraso.',
    oferta: 'agentes',
  },
  {
    id: 'qualidade', nome: 'Qualidade', icone: 'shield-check', rota: '#qualidade', depende: [],
    descricao: 'Não conformidades e ações, rascunho de 8D e conferência de especificação.',
    oferta: 'agentes',
  },
  {
    id: 'manutencao', nome: 'Manutenção', icone: 'wrench', rota: '#manutencao', depende: [],
    descricao: 'Máquinas, ordens de serviço, histórico do equipamento e o celular do técnico.',
    oferta: 'agentes',
  },
  {
    id: 'comercial', nome: 'Comercial e representantes', icone: 'handshake', rota: '#comercial', depende: [],
    descricao: 'Pedidos, estoque, carteira por representante, visita, proposta e WhatsApp.',
    oferta: 'agentes',
  },
  {
    id: 'marketing', nome: 'Marketing e catálogo', icone: 'megaphone', rota: '#marketing', depende: [],
    descricao: 'Catálogo com ficha, conteúdos para aprovação e respostas a clientes com dados aprovados.',
    oferta: 'agentes',
  },
  {
    id: 'operadores', nome: 'Conhecimento de operadores', icone: 'users', rota: '#operadores', depende: [],
    descricao: 'O saber de quem tem anos de casa, registrado, validado e consultável.',
    oferta: 'agentes',
  },
  {
    id: 'portal', nome: 'Portal do cliente', icone: 'store', rota: '#portal', depende: ['comercial'],
    descricao: 'O que o cliente vê: catálogo com preço e prazo, pedidos dele e recompra.',
    oferta: 'software',
  },
  {
    id: 'integracoes', nome: 'Integrações', icone: 'plug', rota: '#integracoes', depende: [],
    descricao: 'Status das conexões com ERP, MES, planilhas, e-mail, pastas e chamados.',
    oferta: 'cerebro',
  },
  {
    id: 'seguranca', nome: 'Segurança e governança', icone: 'lock', rota: '#seguranca', depende: [],
    descricao: 'Perfis de acesso por área, registro de uso, onde ficam os dados e LGPD.',
    oferta: 'cerebro',
  },
];

export const FEATURE_BY_ID = Object.fromEntries(FEATURES.map((f) => [f.id, f]));
export const FEATURE_IDS = FEATURES.map((f) => f.id);

/** Ligado? Ausente na config = ligado; sempreLigado ignora a config. */
export function isFeatureOn(modulos, id) {
  const f = FEATURE_BY_ID[id];
  if (!f) return false;
  if (f.sempreLigado) return true;
  return (modulos || {})[id] !== false;
}

/** Quem depende diretamente de `id`. */
export function dependents(id) {
  return FEATURES.filter((f) => f.depende.includes(id)).map((f) => f.id);
}

/**
 * Desliga (no próprio objeto `modulos`) todo módulo cuja dependência esteja desligada,
 * em cascata. Retorna a lista de ids desligados por causa disso.
 */
export function applyDependencies(modulos) {
  const desligados = [];
  let changed = true;
  while (changed) {
    changed = false;
    for (const f of FEATURES) {
      if (f.sempreLigado || !isFeatureOn(modulos, f.id)) continue;
      if (f.depende.some((d) => !isFeatureOn(modulos, d))) {
        modulos[f.id] = false;
        desligados.push(f.id);
        changed = true;
      }
    }
  }
  return desligados;
}

/** Features ligadas, na ordem do menu, considerando dependências. */
export function enabledFeatures(config) {
  const modulos = { ...((config && config.modulos) || {}) };
  applyDependencies(modulos);
  return FEATURES.filter((f) => isFeatureOn(modulos, f.id));
}

// ---------------------------------------------------------------------------
// Navegação v2 (UX §3.1 e §3.4)

/** Áreas na ordem do menu "Áreas" e das pílulas de área. */
export const AREA_IDS = ['producao', 'qualidade', 'manutencao', 'comercial', 'marketing'];

/** Rotas finais do hash. */
export const ROUTES = ['inicio', 'conversa', 'cerebro', 'areas', ...AREA_IDS, 'portal', 'como-funciona'];

/** Aliases: rota antiga → { rota, secao? } (secao = âncora/seção a rolar). */
export const ALIASES = {
  'visao-geral': { rota: 'inicio' },
  operadores: { rota: 'cerebro', secao: 'saber' },
  integracoes: { rota: 'como-funciona', secao: 'respostas' },
  seguranca: { rota: 'como-funciona', secao: 'quem-ve' },
};

/** Módulo que controla cada rota (null = sempre visível). */
export const ROUTE_MODULE = {
  inicio: 'visao-geral', conversa: null, cerebro: 'cerebro', areas: null,
  producao: 'producao', qualidade: 'qualidade', manutencao: 'manutencao', comercial: 'comercial',
  marketing: 'marketing', portal: 'portal', 'como-funciona': null,
};

/** Itens do menu principal: 'inicio'|'cerebro'|'areas'|'portal'|'como-funciona'. */
export const NAV = [
  { id: 'inicio', nome: 'Início', icone: 'home', rota: '#inicio' },
  { id: 'cerebro', nome: 'Cérebro', icone: 'brain', rota: '#cerebro', modulo: 'cerebro' },
  { id: 'areas', nome: 'Áreas', icone: 'grid', rota: '#areas' },
  { id: 'portal', nome: 'Portal do cliente', nomeCurto: 'Portal', icone: 'store', rota: '#portal', modulo: 'portal' },
  { id: 'como-funciona', nome: 'Como funciona', nomeCurto: 'Como funciona', icone: 'info', rota: '#como-funciona' },
];

/** Página de contato do site (CTA "Falar com a Torno"). Não usar /diagnostico/: é landing de anúncio. */
export const CONTATO_URL = 'https://tornostudio.com/contact/';

/** Normaliza {id:bool} com dependências aplicadas. */
export function normalizeModulos(raw) {
  const modulos = {};
  for (const f of FEATURES) modulos[f.id] = f.sempreLigado ? true : !(raw && raw[f.id] === false);
  applyDependencies(modulos);
  return modulos;
}

/** Áreas ligadas, na ordem do menu. */
export function enabledAreas(modulos) {
  return AREA_IDS.filter((id) => isFeatureOn(modulos, id));
}

/** Itens do menu visíveis para estes módulos (UX §3.1/§3.3). Cada item ganha `rotaEfetiva` e `nomeEfetivo`. */
export function navItems(modulos, areaName = (id) => FEATURE_BY_ID[id]?.nome || id) {
  const areas = enabledAreas(modulos);
  const out = [];
  for (const item of NAV) {
    if (item.modulo && !isFeatureOn(modulos, item.modulo)) continue;
    if (item.id === 'areas') {
      if (!areas.length) continue;
      if (areas.length === 1) {
        out.push({ ...item, rotaEfetiva: `#${areas[0]}`, nomeEfetivo: areaName(areas[0]), unica: areas[0] });
        continue;
      }
    }
    out.push({ ...item, rotaEfetiva: item.rota, nomeEfetivo: item.nome });
  }
  return out;
}

/** A qual item do menu pertence uma rota. */
export function navOf(route) {
  if (AREA_IDS.includes(route) || route === 'areas') return 'areas';
  if (route === 'conversa') return 'inicio';
  return route;
}

/** Resolve o hash cru: → { rota, secao?, bloqueada?:bool, desconhecida?:bool }. */
export function resolveRoute(raw, modulos) {
  let rota = String(raw || '').replace(/^#/, '').trim().toLowerCase();
  let secao = null;
  const [base, sub] = rota.split('/');
  rota = base;
  if (sub) secao = sub;
  if (!rota) rota = 'inicio';
  if (ALIASES[rota]) {
    const a = ALIASES[rota];
    const modAlias = rota;
    secao = a.secao || secao;
    rota = a.rota;
    // alias de módulo desligado (ex.: #operadores com operadores off) → só a rota destino
    if (FEATURE_BY_ID[modAlias] && !isFeatureOn(modulos, modAlias)) secao = null;
  }
  if (!ROUTES.includes(rota)) return { rota: 'inicio', desconhecida: true };
  const mod = ROUTE_MODULE[rota];
  if (mod && !isFeatureOn(modulos, mod)) return { rota: 'inicio', bloqueada: true };
  if (rota === 'areas' && !enabledAreas(modulos).length) return { rota: 'inicio', bloqueada: true };
  return { rota, secao };
}
