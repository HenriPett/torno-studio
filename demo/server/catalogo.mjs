// Catálogo fixo do servidor: setores conhecidos (com os pacotes de dados), módulos e áreas.
// Os pacotes entram por import estático de JSON (o bundler da Netlify os embute na função).
// Espelha demo/web/src/features.js (ids, sempreLigado e dependências): se o front mudar a lista de
// módulos, atualize MODULOS aqui também.

import textil from '../data/textil.json' with { type: 'json' };
import alimentos from '../data/alimentos.json' with { type: 'json' };
import plasticos from '../data/plasticos.json' with { type: 'json' };
import maquinas from '../data/maquinas.json' with { type: 'json' };
import metalmecanica from '../data/metalmecanica.json' with { type: 'json' };
import moveis from '../data/moveis.json' with { type: 'json' };
import eletroeletronicos from '../data/eletroeletronicos.json' with { type: 'json' };
import autopecas from '../data/autopecas.json' with { type: 'json' };
import setoresLista from '../data/sectors.json' with { type: 'json' };

const PACOTES = { textil, alimentos, plasticos, maquinas, metalmecanica, moveis, eletroeletronicos, autopecas };

export const SETORES = setoresLista
  .filter((s) => PACOTES[s.id])
  .map((s) => ({ id: s.id, nome: s.nome, empresa: PACOTES[s.id].empresa?.nome ?? '' }));

export const SETOR_IDS = SETORES.map((s) => s.id);

export function pacote(setor) {
  return Object.prototype.hasOwnProperty.call(PACOTES, setor) ? PACOTES[setor] : null;
}

export const MODULOS = [
  { id: 'visao-geral', nome: 'Visão geral', sempreLigado: true, depende: [] },
  { id: 'cerebro', nome: 'Cérebro da operação', depende: [] },
  { id: 'producao', nome: 'Produção e PCP', depende: [] },
  { id: 'qualidade', nome: 'Qualidade', depende: [] },
  { id: 'manutencao', nome: 'Manutenção', depende: [] },
  { id: 'comercial', nome: 'Comercial e representantes', depende: [] },
  { id: 'marketing', nome: 'Marketing e catálogo', depende: [] },
  { id: 'operadores', nome: 'Conhecimento de operadores', depende: [] },
  { id: 'portal', nome: 'Portal do cliente', depende: ['comercial'] },
  { id: 'integracoes', nome: 'Integrações', depende: [] },
  { id: 'seguranca', nome: 'Segurança e governança', depende: [] },
];
const MOD = Object.fromEntries(MODULOS.map((m) => [m.id, m]));
export const MODULO_IDS = MODULOS.map((m) => m.id);

export const AREAS = ['producao', 'qualidade', 'manutencao', 'comercial', 'marketing', 'operadores', 'gestao'];

/** Normaliza {id:bool}: só ids conhecidos, todos presentes, dependências aplicadas. Lança em entrada inválida. */
export function normalizaModulos(raw) {
  if (raw != null && (typeof raw !== 'object' || Array.isArray(raw))) throw new Error('modulos deve ser um objeto {id: true|false}');
  for (const [k, v] of Object.entries(raw ?? {})) {
    if (!MOD[k]) throw new Error(`Módulo desconhecido: ${String(k).slice(0, 40)}`);
    if (typeof v !== 'boolean') throw new Error(`Valor inválido para o módulo ${k}`);
  }
  const out = {};
  for (const m of MODULOS) out[m.id] = m.sempreLigado ? true : !(raw && raw[m.id] === false);
  let mudou = true;
  while (mudou) {
    mudou = false;
    for (const m of MODULOS) {
      if (out[m.id] && !m.sempreLigado && m.depende.some((d) => !out[d])) { out[m.id] = false; mudou = true; }
    }
  }
  return out;
}

export function moduloLigado(modulos, id) {
  const m = MOD[id];
  if (!m) return false;
  if (m.sempreLigado) return true;
  return (modulos ?? {})[id] !== false;
}

export const HOJE = '2026-11-13';

const REF_TIPOS = {
  op: ['ordens', 'id', 'producao'], nc: ['nao_conformidades', 'id', 'qualidade'], os: ['manutencao', 'id', 'manutencao'],
  maq: ['maquinas', 'id', 'manutencao'], pedido: ['pedidos', 'id', 'comercial'], cliente: ['clientes', 'id', 'comercial'],
  rep: ['representantes', 'id', 'comercial'], regra: ['regras_comerciais', 'id', 'comercial'], sku: ['produtos', 'sku', 'comercial'],
  saber: ['saberes', 'id', 'operadores'], kpi: ['kpis', 'id', 'visao-geral'], integ: ['integracoes', 'id', 'integracoes'],
};
const AREA_MODULO = { gestao: 'visao-geral' };

/** A ref existe no pacote e o módulo dono está ligado? (o aprendizado é tratado no engine) */
export function resolveRef(data, modulos, ref) {
  const i = ref.indexOf(':');
  if (i <= 0) return false;
  const tipo = ref.slice(0, i), id = ref.slice(i + 1);
  if (tipo === 'doc') {
    const [docId, trecho] = id.split('#');
    const doc = (data.documentos ?? []).find((d) => d.id === docId);
    if (!doc || (trecho && !(doc.trechos ?? []).some((t) => t.id === trecho))) return false;
    return moduloLigado(modulos, 'cerebro') || moduloLigado(modulos, AREA_MODULO[doc.area] ?? doc.area);
  }
  if (tipo === 'turno') {
    return moduloLigado(modulos, 'producao') && (data.turnos ?? []).some((t) => `${t.data}|${t.turno}|${t.linha}` === id);
  }
  const def = REF_TIPOS[tipo];
  if (!def) return false;
  return moduloLigado(modulos, def[2]) && (data[def[0]] ?? []).some((r) => r?.[def[1]] === id);
}

/** Contexto que o motor local e as ferramentas esperam (mesmo formato do ctx do front v1). */
export function criaCtx(demo, aprendizado = []) {
  const data = pacote(demo.setor);
  const ctx = {
    data,
    today: data?.data_referencia ?? HOJE,
    empresa: demo.empresa_nome || data?.empresa?.nome,
    sector: { id: demo.setor, nome: data?.setor },
    isEnabled: (m) => moduloLigado(demo.modulos, m),
    term: (k) => data?.vocabulario?.[k] ?? k,
    // o motor delega a checagem de refs a resolveRef quando ela existe: o aprendizado também passa por aqui
    resolveRef: (ref) => {
      if (typeof ref !== 'string') return false;
      if (ref.startsWith('aprendizado:')) return (ctx.aprendizado ?? []).some((a) => `aprendizado:${a.id}` === ref);
      return !!data && resolveRef(data, demo.modulos, ref);
    },
    features: MODULOS.filter((m) => moduloLigado(demo.modulos, m.id)),
    aprendizado,
  };
  return ctx;
}
