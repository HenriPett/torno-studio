// Produção (UX §4.8): {ordens} atrasadas · % no prazo · em produção; último turno; lista de
// {ordens} com selo de registros da equipe; detalhe na gaveta `op` (ui/area-page.js).
import { h } from '../ui.js';
import {
  areaPage, listSection, statusBadge, seloRegistros, notesFor, learnItems, barra, origemDados,
  cap, T, gen, fmtOf, riscoOP,
} from '../ui/area-page.js';

const RANK = { atrasada: 0, em_producao: 1, planejada: 2, concluida: 3 };

/** Mantida para quem usava a v1 (Início): {ordens} atrasadas ou em risco. */
export function riskList(ctx) {
  const prod = Object.fromEntries((ctx.data?.ordens ? ctx.data.produtos || [] : []).map((p) => [p.sku, p]));
  return (ctx.data?.ordens || []).map((o) => {
    const r = riscoOP(ctx, o);
    return r ? { o, late: r.atrasada, dias: r.dias, prog: r.prog, motivo: o.motivo_atraso, sugestao: r.sugestao, produto: prod[o.sku]?.nome || o.sku, nivel: r.atrasada ? 'Atrasada' : 'Risco de atraso' } : null;
  }).filter(Boolean).sort((a, b) => (b.late - a.late) || ((a.dias ?? 0) - (b.dias ?? 0)));
}

export function render(el, ctx) {
  const f = fmtOf(ctx);
  const d = ctx.data || {};
  const ordens = d.ordens || [];
  const prodBy = Object.fromEntries((d.produtos || []).map((p) => [p.sku, p]));
  const linhaBy = Object.fromEntries((d.linhas || []).map((l) => [l.id, l]));
  const ordem = T(ctx, 'ordem');
  const O = T(ctx, 'ordens');
  const g = gen(ordem);

  const atrasadas = ordens.filter((o) => o.status === 'atrasada').length;
  const ativas = ordens.filter((o) => o.status !== 'planejada');
  const noPrazo = ativas.length ? Math.round(((ativas.length - atrasadas) / ativas.length) * 100) : null;
  const emProd = ordens.filter((o) => o.status === 'em_producao').length;

  // último turno → link que abre a gaveta do turno
  const turno = [...(d.turnos || [])].sort((a, b) => String(b.data).localeCompare(String(a.data)) || String(b.turno).localeCompare(String(a.turno)))[0];
  const ultimoTurno = turno ? h('p', { class: 'ar-after' },
    h('button', {
      type: 'button', class: 'ar-link',
      onClick: () => ctx.openRef?.(`turno:${turno.data}|${turno.turno}|${turno.linha}`),
    }, `Último turno: ${turno.turno} turno de ${f.date(turno.data)} · ${linhaBy[turno.linha]?.nome || turno.linha} · ${f.num(turno.produzido)} ${T(ctx, 'unidade')} · ${f.pct(turno.produzido ? (turno.refugo / turno.produzido) * 100 : 0)} de refugo ›`)) : null;

  let notas = learnItems(ctx);
  const nNotas = (o) => notesFor(ctx, { ids: [o.id] }, notas).length;

  const lista = listSection({
    rotulo: cap(O),
    filtros: [
      { id: 'atrasadas', label: `Atrasad${g}s`, fn: (o) => o.status === 'atrasada' },
      { id: 'producao', label: 'Em produção', fn: (o) => o.status === 'em_producao' },
      { id: 'todas', label: `Tod${g}s`, fn: () => true },
    ],
    busca: {
      placeholder: `Buscar ${ordem} ou ${T(ctx, 'produto')}`,
      texto: (o) => `${o.id} ${o.sku} ${prodBy[o.sku]?.nome || ''} ${o.pedido || ''} ${linhaBy[o.linha]?.nome || ''}`,
    },
    linhas: () => ordens,
    ordenar: (a, b) => (RANK[a.status] - RANK[b.status]) || String(a.prazo).localeCompare(String(b.prazo)),
    chave: (o) => o.id,
    onClick: (o) => ctx.openRef?.(`op:${o.id}`),
    vazio: (filtro) => `Nenhum${g === 'a' ? 'a' : ''} ${ordem} ${filtro}.`,
    colunas: [
      { m: 'id', largura: 'minmax(84px,108px)', render: (o) => h('strong', { class: 'ar-id' }, o.id) },
      { m: 'main', largura: 'minmax(0,2.2fr)', render: (o) => h('span', { class: 'ar-trunc' }, prodBy[o.sku]?.nome || o.sku) },
      { m: null, largura: 'minmax(0,1fr)', render: (o) => h('span', { class: 'ar-muted ar-trunc' }, linhaBy[o.linha]?.nome || o.linha) },
      {
        m: 'sub', largura: 'minmax(56px,72px)', num: true,
        render: (o) => h('span', { class: o.status !== 'concluida' && f.daysFromToday(o.prazo, ctx.today) < 0 ? 'ar-late' : 'ar-muted' }, f.date(o.prazo)),
      },
      { m: 'status', largura: 'minmax(150px,auto)', render: (o) => h('span', { class: 'ar-status' }, statusBadge(o.status), seloRegistros(nNotas(o))) },
      {
        m: null, largura: 'minmax(96px,120px)',
        render: (o) => h('span', { class: 'ar-progcell' }, h('span', { class: 'num' }, `${o.progresso ?? 0}%`), barra(o.progresso ?? 0, { tom: o.status === 'atrasada' ? 'warn' : null })),
      },
    ],
  });

  const page = areaPage({
    ctx,
    modulo: 'producao',
    titulo: ctx.areaName?.('producao') || 'Produção',
    subtitulo: [`${cap(O)}, turnos e ${T(ctx, 'linhas')}`, origemDados(ctx, 'producao')].filter(Boolean).join(' · '),
    numeros: [
      { valor: f.num(atrasadas), rotulo: `${O} atrasad${g}s`, tom: atrasadas ? 'danger' : 'ok' },
      { valor: noPrazo == null ? '—' : `${noPrazo}%`, rotulo: 'no prazo' },
      { valor: f.num(emProd), rotulo: 'em produção' },
    ],
    depoisNumeros: ultimoTurno,
    corpo: lista.el,
  });
  page.onLearning(() => { notas = learnItems(ctx); lista.refresh(); });
  el.replaceChildren(page.el);
  return () => page.cleanup();
}
