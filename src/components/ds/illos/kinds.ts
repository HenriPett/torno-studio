/**
 * Escolha da mini-ilustração por palavra-chave (DESIGN-2026-11 §6.13). Genérico: não conhece setores,
 * só nomes de área e de etapa ("PCP", "Qualidade", "Diagnóstico"…), em português e inglês.
 */
export type AreaKind = 'plan' | 'maint' | 'quality' | 'sales' | 'catalog' | 'supply' | 'eng' | 'knowledge' | 'mgmt' | 'brain';
export type StepKind = 'talk' | 'map' | 'data' | 'pilot' | 'expand' | 'ops';

const AREA: [AreaKind, RegExp][] = [
  ['plan', /pcp|planej|planning|produção|production|corte/i],
  ['maint', /manuten|mainten|ferramentaria|tooling|utilidades|utilities|assistência|service|reposição|spare/i],
  ['quality', /qualid|quality|auditoria|audit|bpf|gmp|ensaio|testing|norma|standard|certific/i],
  ['sales', /comerc|represent|sales|sac\b|orçament|quot|cliente|customer/i],
  ['catalog', /market|catálog|catalog|documenta/i],
  ['supply', /suprim|supply|procure|compras|purchas|logíst|logistic|facç|subcontract/i],
  ['eng', /engenharia|engineering|apqp|processo|process|setup|formula|p&d|r&d|tinturaria|dye/i],
  ['knowledge', /conhec|knowledge|operador|operator|treinamento|training/i],
  ['mgmt', /gestão|gest[aã]o|manage|diretoria|indicador|kpi/i],
];

export function areaKind(name: string): AreaKind {
  return AREA.find(([, re]) => re.test(name))?.[0] ?? 'brain';
}

const STEP: [StepKind, RegExp][] = [
  ['talk', /conversa|call|reunião|meeting/i],
  ['map', /diagn|assess|mapa/i],
  ['data', /^base|\bbase\b|conex|dados|data|connect|integra/i],
  ['pilot', /piloto|pilot|teste|test/i],
  ['expand', /expans|implanta|rollout|decis|escala|scale/i],
  ['ops', /opera|monitor|mensal|monthly|assistid|managed/i],
];
const FALLBACK: StepKind[] = ['talk', 'map', 'pilot', 'expand', 'ops'];

export function stepKind(title: string, index: number): StepKind {
  return STEP.find(([, re]) => re.test(title))?.[0] ?? FALLBACK[index % FALLBACK.length]!;
}

/** "~4 em 10" → 4; "1 em 5" → 2; "41,9%" → 4 (arredonda para "em 10"); sem número → null. */
export function outOfTen(value: string): number | null {
  const m = value.match(/(\d+(?:[.,]\d+)?)\s*(?:em|in|de|of)\s*(\d+)\b/i);
  if (m && Number(m[2]) > 0) return Math.round((parseFloat(m[1]!.replace(',', '.')) / Number(m[2])) * 10);
  const p = value.match(/(\d+(?:[.,]\d+)?)\s*%/);
  return p ? Math.round(parseFloat(p[1]!.replace(',', '.')) / 10) : null;
}
