// Manutenção (UX §4.8): paradas · em alerta · OS abertas; lista de {maquinas} (parada > alerta >
// manutenção > operando) com selo "n registros"; detalhe na gaveta `maq` com Registros da equipe.
// O "celular do técnico" foi para Como funciona › Onde a equipe pergunta (pacote A).
import { h } from '../ui.js';
import {
  areaPage, listSection, statusBadge, seloRegistros, notesFor, learnItems, origemDados,
  cap, T, gen, fmtOf, paradoDe,
} from '../ui/area-page.js';

const RANK = { parada: 0, alerta: 1, manutencao: 2, operando: 3 };

export function render(el, ctx) {
  const f = fmtOf(ctx);
  const d = ctx.data || {};
  const maqs = d.maquinas || [];
  const linhaBy = Object.fromEntries((d.linhas || []).map((l) => [l.id, l]));
  const maq = T(ctx, 'maquina');
  const M = T(ctx, 'maquinas');
  const g = gen(maq);

  const paradas = maqs.filter((m) => m.status === 'parada').length;
  const alerta = maqs.filter((m) => m.status === 'alerta').length;
  const osAbertas = (d.manutencao || []).filter((o) => o.status !== 'concluida').length;

  let notas = learnItems(ctx);
  const nNotas = (m) => notesFor(ctx, { maquina: m.id }, notas).length;

  const lista = listSection({
    rotulo: cap(M),
    filtros: [
      { id: 'atencao', label: 'Atenção', vazio: 'precisando de atenção', fn: (m) => m.status !== 'operando' },
      { id: 'todas', label: `Tod${g}s`, fn: () => true },
    ],
    busca: { placeholder: `Buscar ${maq}`, texto: (m) => `${m.id} ${m.nome} ${m.tipo || ''} ${linhaBy[m.linha]?.nome || ''}` },
    linhas: () => maqs,
    ordenar: (a, b) => ((RANK[a.status] ?? 9) - (RANK[b.status] ?? 9)) || String(a.id).localeCompare(String(b.id)),
    chave: (m) => m.id,
    onClick: (m) => ctx.openRef?.(`maq:${m.id}`),
    vazio: (filtro) => `Nenhum${g === 'a' ? 'a' : ''} ${maq} ${filtro}.`,
    colunas: [
      { m: 'id', largura: 'minmax(76px,96px)', render: (m) => h('strong', { class: 'ar-id' }, m.id) },
      { m: 'main', largura: 'minmax(0,2fr)', render: (m) => h('span', { class: 'ar-trunc' }, m.nome) },
      { m: null, largura: 'minmax(0,1fr)', render: (m) => h('span', { class: 'ar-muted ar-trunc' }, linhaBy[m.linha]?.nome || m.linha) },
      { m: 'status', largura: 'minmax(170px,auto)', render: (m) => h('span', { class: 'ar-status' }, statusBadge(m.status, ctx), seloRegistros(nNotas(m))) },
      {
        m: 'sub', largura: 'minmax(104px,140px)', num: true,
        render: (m) => {
          const dd = f.daysFromToday(m.proxima_preventiva, ctx.today);
          return h('span', { class: dd != null && dd <= 3 ? 'ar-late' : 'ar-muted', title: 'Próxima preventiva' },
            m.proxima_preventiva ? `prev. ${f.date(m.proxima_preventiva)}` : '—');
        },
      },
    ],
  });

  const page = areaPage({
    ctx,
    modulo: 'manutencao',
    titulo: ctx.areaName?.('manutencao') || 'Manutenção',
    subtitulo: [`${cap(M)}, ordens de serviço e preventivas`, origemDados(ctx, 'manutencao')].filter(Boolean).join(' · '),
    numeros: [
      { valor: f.num(paradas), rotulo: paradoDe(ctx, { plural: paradas !== 1 }), tom: paradas ? 'danger' : 'ok' },
      { valor: f.num(alerta), rotulo: 'em alerta' },
      { valor: f.num(osAbertas), rotulo: `${osAbertas === 1 ? 'OS aberta' : 'OS abertas'}` },
    ],
    corpo: lista.el,
  });
  page.onLearning(() => { notas = learnItems(ctx); lista.refresh(); });
  el.replaceChildren(page.el);
  return () => page.cleanup();
}
