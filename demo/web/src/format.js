// Formatação em pt-BR para a demo. "Hoje" na demo é sempre 2026-11-13 (data de referência dos dados).

export const TODAY = '2026-11-13';

const MESES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
const MESES_LONGOS = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
];

// Lê "AAAA-MM-DD" ou "AAAA-MM-DDTHH:MM[:SS]" sem passar por fuso horário.
function parse(iso) {
  if (!iso) return null;
  const m = String(iso).match(/^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2}))?/);
  if (!m) return null;
  return { y: +m[1], mo: +m[2], d: +m[3], hh: m[4] ?? null, mm: m[5] ?? null };
}

function dayNumber(p) {
  return Math.round(Date.UTC(p.y, p.mo - 1, p.d) / 86400000);
}

function isNum(n) {
  return typeof n === 'number' && Number.isFinite(n);
}

/** Número em pt-BR. Sem `dec`: inteiro fica inteiro; abaixo de 10 até 2 casas, senão até 1. */
function num(n, dec) {
  if (!isNum(n)) return n == null ? '—' : String(n);
  const max = dec ?? (Number.isInteger(n) ? 0 : Math.abs(n) < 10 ? 2 : 1);
  return n.toLocaleString('pt-BR', { minimumFractionDigits: dec ?? 0, maximumFractionDigits: max });
}

/** R$. `{compact:true}` → "R$ 612 mil", "R$ 1,2 mi". */
function money(n, opts = {}) {
  if (!isNum(n)) return n == null ? '—' : String(n);
  if (opts.compact && Math.abs(n) >= 10000) {
    return n.toLocaleString('pt-BR', {
      style: 'currency', currency: 'BRL', notation: 'compact', maximumFractionDigits: 1,
    });
  }
  const dec = Number.isInteger(n) && Math.abs(n) >= 1000 ? 0 : 2;
  return n.toLocaleString('pt-BR', {
    style: 'currency', currency: 'BRL', minimumFractionDigits: dec, maximumFractionDigits: dec,
  });
}

/** Percentual a partir de um valor já em pontos percentuais (71.4 → "71,4%"). */
function pct(n, dec = 1) {
  if (!isNum(n)) return n == null ? '—' : String(n);
  return `${n.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: dec })}%`;
}

/** "13 nov" (ano só aparece quando não é 2026). */
function date(iso) {
  const p = parse(iso);
  if (!p) return iso ? String(iso) : '—';
  const base = `${p.d} ${MESES[p.mo - 1]}`;
  return p.y === 2026 ? base : `${base} ${p.y}`;
}

/** "13 de novembro de 2026". */
function dateLong(iso) {
  const p = parse(iso);
  if (!p) return iso ? String(iso) : '—';
  return `${p.d} de ${MESES_LONGOS[p.mo - 1]} de ${p.y}`;
}

/** "07:40" a partir de "2026-11-13T07:40". */
function time(iso) {
  const p = parse(iso);
  return p && p.hh ? `${p.hh}:${p.mm}` : '';
}

/** "13 nov, 07:40". */
function datetime(iso) {
  const t = time(iso);
  return t ? `${date(iso)}, ${t}` : date(iso);
}

/** Relativo a 2026-11-13: "hoje", "ontem", "há 2 dias", "amanhã", "em 5 dias", "há 3 meses". */
function rel(iso, ref = TODAY) {
  const p = parse(iso);
  const r = parse(ref);
  if (!p || !r) return iso ? String(iso) : '—';
  const diff = dayNumber(r) - dayNumber(p);
  if (diff === 0) return p.hh ? `hoje, ${p.hh}:${p.mm}` : 'hoje';
  if (diff === 1) return 'ontem';
  if (diff === -1) return 'amanhã';
  const abs = Math.abs(diff);
  let txt;
  if (abs < 30) txt = `${abs} dias`;
  else if (abs < 365) {
    const m = Math.round(abs / 30);
    txt = m === 1 ? '1 mês' : `${m} meses`;
  } else {
    const a = Math.round(abs / 365);
    txt = a === 1 ? '1 ano' : `${a} anos`;
  }
  return diff > 0 ? `há ${txt}` : `em ${txt}`;
}

/** Dias entre a data e hoje (positivo = no futuro). */
function daysFromToday(iso, ref = TODAY) {
  const p = parse(iso);
  const r = parse(ref);
  if (!p || !r) return null;
  return dayNumber(p) - dayNumber(r);
}

/** Texto sem acento e minúsculo, para busca. */
export function normalize(texto) {
  return String(texto ?? '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();
}

// ---------------------------------------------------------------------------
// Concordância com o vocabulário do pacote

/**
 * Gênero de um termo do vocabulário do pacote: 'a' para feminino ("máquina", "OP", "célula"),
 * 'o' para masculino ("equipamento", "setor produtivo"). Olha só a primeira palavra.
 */
export function generoTermo(termo) {
  const w = normalize(termo).split(/\s+/)[0] || '';
  if (/^(op|ops|os|nc|ncs|ordem|ordens)$/.test(w)) return 'a';
  if (/(cao|coes|sao|soes|dade|dades|gem|gens)$/.test(w)) return 'a';
  return /as?$/.test(w) && !/(ema|emas|eta|etas)$/.test(w) && !/^dias?$/.test(w) ? 'a' : 'o';
}

/** Termo de máquina do pacote a partir de ctx (com term()), do pacote, do vocabulário ou de texto. */
function termoMaquina(fonte) {
  if (typeof fonte === 'string') return fonte;
  if (fonte && typeof fonte.term === 'function') {
    try { return fonte.term('maquina') || 'máquina'; } catch { return 'máquina'; }
  }
  const vocab = fonte?.vocabulario || fonte?.data?.vocabulario || fonte;
  return (vocab && typeof vocab.maquina === 'string' && vocab.maquina) || 'máquina';
}

/**
 * "parada" ou "parado", concordando com o termo de máquina do pacote (vocabulario.maquina).
 * É a regra única da demo: Início, menu Áreas e selo da área devem usar este helper, para o mesmo
 * equipamento não aparecer como "TEA-12 parado" num lugar e "TEA-12 parada" em outro.
 *   fonte: ctx (com term()), o pacote do setor, o objeto vocabulario ou o termo em texto.
 *   {plural: true} → "paradas"/"parados"; {maiuscula: true} → "Parada"/"Parado" (para selos).
 * Ex.: parado(ctx) → "parada" no têxtil ("máquina"), "parado" em alimentos ("equipamento").
 * Também disponível como ctx.fmt.parado.
 */
export function parado(fonte, { plural = false, maiuscula = false } = {}) {
  const g = generoTermo(termoMaquina(fonte));
  const txt = `parad${g}${plural ? 's' : ''}`;
  return maiuscula ? `P${txt.slice(1)}` : txt;
}

// ---------------------------------------------------------------------------
// Glossário de siglas (Início, indicadores, gaveta do indicador)

/** Siglas da operação com uma explicação curta, para quem não é do chão de fábrica. */
export const GLOSSARIO = {
  OEE: 'eficiência global do equipamento: quanto do tempo disponível virou peça boa',
  OTIF: 'pedidos entregues completos e no prazo',
  PPM: 'peças com defeito a cada milhão',
  FPY: 'peças aprovadas de primeira, sem retrabalho',
  MTTR: 'tempo médio para consertar uma máquina parada',
  NC: 'não conformidade: um problema de qualidade registrado',
  OP: 'ordem de produção',
  OS: 'ordem de serviço da manutenção',
  PCP: 'planejamento e controle da produção',
  APQP: 'planejamento da qualidade de um produto novo',
  '8D': 'método de 8 passos para resolver um problema de qualidade',
};

// Sigla isolada (aceita plural "OPs", "NCs"); não pega códigos como "OP-24518" ou "OS-7731".
const SIGLA_RE = new RegExp(`(^|[^\\p{L}\\d-])(${Object.keys(GLOSSARIO).join('|')})(s?)(?![\\p{L}\\d]|-\\d)`, 'gu');

/**
 * Quebra o texto em pedaços: strings e {sigla, texto, definicao} para cada sigla do glossário.
 * Quem desenha decide como mostrar (ex.: <abbr title>).
 */
export function partesComSiglas(texto) {
  const src = String(texto ?? '');
  const out = [];
  let ultimo = 0;
  for (const m of src.matchAll(SIGLA_RE)) {
    const ini = m.index + m[1].length;
    if (ini > ultimo) out.push(src.slice(ultimo, ini));
    out.push({ sigla: m[2], texto: m[2] + m[3], definicao: GLOSSARIO[m[2]] });
    ultimo = ini + m[2].length + m[3].length;
  }
  if (ultimo < src.length) out.push(src.slice(ultimo));
  return out;
}

/** Siglas do glossário presentes no texto, sem repetir: [{sigla, definicao}]. */
export function siglasNoTexto(texto) {
  const vistas = new Map();
  for (const p of partesComSiglas(texto)) if (typeof p === 'object' && !vistas.has(p.sigla)) vistas.set(p.sigla, p.definicao);
  return [...vistas].map(([sigla, definicao]) => ({ sigla, definicao }));
}

/** "OTIF: pedidos entregues completos e no prazo. OEE: …" (para title/aria). '' se não houver sigla. */
export function explicaSiglas(texto) {
  return siglasNoTexto(texto).map((s) => `${s.sigla}: ${s.definicao}.`).join(' ');
}

export const fmt = {
  num, money, pct, date, dateLong, time, datetime, rel, daysFromToday, normalize, TODAY, parado, generoTermo, explicaSiglas,
};
export default fmt;
