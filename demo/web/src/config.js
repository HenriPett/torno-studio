// Config da demo (PLANO §5.1): setor, nome exibido, módulos ligados e perfis de demo salvos.
import { FEATURES, applyDependencies } from './features.js';

export const SECTOR_IDS = [
  'textil', 'alimentos', 'plasticos', 'maquinas', 'metalmecanica', 'moveis', 'eletroeletronicos', 'autopecas',
];

function allOn() {
  return Object.fromEntries(FEATURES.map((f) => [f.id, true]));
}

function only(ids) {
  return Object.fromEntries(FEATURES.map((f) => [f.id, f.sempreLigado || ids.includes(f.id)]));
}

export const DEFAULT_CONFIG = Object.freeze({
  setor: 'textil',
  empresa_nome: '',
  modulos: Object.freeze(allOn()),
  perfis: Object.freeze([]),
  atualizado_em: null,
});

/** Sugestões mostradas no admin enquanto a lista de perfis estiver vazia. */
export const DEMO_PROFILES = [
  {
    id: 'sug-textil', nome: 'Têxtil: comercial e PCP', setor: 'textil', empresa_nome: '',
    modulos: only(['producao', 'comercial', 'cerebro']),
  },
  {
    id: 'sug-autopecas', nome: 'Autopeças: qualidade e manutenção', setor: 'autopecas', empresa_nome: '',
    modulos: only(['qualidade', 'manutencao', 'cerebro', 'operadores']),
  },
  {
    id: 'sug-alimentos', nome: 'Alimentos: demo completa', setor: 'alimentos', empresa_nome: '',
    modulos: allOn(),
  },
];

export function newProfileId() {
  return `p-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

function normalizeModulos(raw) {
  const modulos = {};
  for (const f of FEATURES) {
    modulos[f.id] = f.sempreLigado ? true : !(raw && raw[f.id] === false);
  }
  applyDependencies(modulos);
  return modulos;
}

function normalizeProfile(p) {
  if (!p || typeof p !== 'object') return null;
  return {
    id: typeof p.id === 'string' && p.id ? p.id : newProfileId(),
    nome: typeof p.nome === 'string' && p.nome.trim() ? p.nome.trim().slice(0, 80) : 'Perfil sem nome',
    setor: SECTOR_IDS.includes(p.setor) ? p.setor : 'textil',
    empresa_nome: typeof p.empresa_nome === 'string' ? p.empresa_nome.slice(0, 80) : '',
    modulos: normalizeModulos(p.modulos),
  };
}

/** Aceita qualquer coisa (doc do db, localStorage, rascunho) e devolve uma config válida e nova. */
export function normalizeConfig(raw) {
  const r = raw && typeof raw === 'object' ? raw : {};
  return {
    setor: SECTOR_IDS.includes(r.setor) ? r.setor : DEFAULT_CONFIG.setor,
    empresa_nome: typeof r.empresa_nome === 'string' ? r.empresa_nome.slice(0, 80) : '',
    modulos: normalizeModulos(r.modulos),
    perfis: Array.isArray(r.perfis) ? r.perfis.map(normalizeProfile).filter(Boolean).slice(0, 40) : [],
    atualizado_em: typeof r.atualizado_em === 'string' ? r.atualizado_em : null,
  };
}

export function cloneConfig(c) {
  return JSON.parse(JSON.stringify(c));
}

/** Compara duas configs ignorando atualizado_em. */
export function sameConfig(a, b) {
  const strip = (c) => JSON.stringify({ ...normalizeConfig(c), atualizado_em: null });
  return strip(a) === strip(b);
}
