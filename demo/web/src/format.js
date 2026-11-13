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

export const fmt = { num, money, pct, date, dateLong, time, datetime, rel, daysFromToday, normalize, TODAY };
export default fmt;
