// Registro de módulos da demo (PLANO §4). A ordem aqui é a ordem do menu.

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
