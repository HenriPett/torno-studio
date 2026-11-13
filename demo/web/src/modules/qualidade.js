// Qualidade (UX §4.8): NCs abertas · em análise · graves (as mesmas contas da conversa, que diz
// "3 abertas e 3 em análise"); lista de NCs; gaveta `nc`
// com 8D registrado ou [Gerar rascunho de 8D] transmitido no corpo da gaveta.
import { h } from '../ui.js';
import { severidadeLabel } from '../ai/local-engine.js';
import {
  areaPage, listSection, statusBadge, seloRegistros, notesFor, learnItems, origemDados, cap, T, fmtOf, tag,
} from '../ui/area-page.js';

const RANK_ST = { aberta: 0, em_analise: 1, encerrada: 2 };
const RANK_SEV = { alta: 0, media: 1, baixa: 2 };
const ORIGEM = { interna: 'Interna', cliente: 'Cliente', fornecedor: 'Fornecedor' };

export function render(el, ctx) {
  const f = fmtOf(ctx);
  const d = ctx.data || {};
  const ncs = d.nao_conformidades || [];
  const prodBy = Object.fromEntries((d.produtos || []).map((p) => [p.sku, p]));
  // "em aberto" = ainda não encerrada (aberta + em análise); os números separam as duas
  const emAberto = (n) => n.status !== 'encerrada';
  const grave = (n) => emAberto(n) && n.severidade === 'alta';

  const nAbertas = ncs.filter((n) => n.status === 'aberta').length;
  const nAnalise = ncs.filter((n) => n.status === 'em_analise').length;
  const nGraves = ncs.filter(grave).length;

  let notas = learnItems(ctx);
  const nNotas = (n) => notesFor(ctx, { ids: [n.id] }, notas).length;

  const lista = listSection({
    rotulo: 'Não conformidades',
    filtros: [
      { id: 'abertas', label: 'Em aberto', fn: emAberto },
      { id: 'graves', label: 'Graves (alta)', fn: grave },
      { id: 'todas', label: 'Todas', fn: () => true },
    ],
    busca: { placeholder: `Buscar NC ou ${T(ctx, 'produto')}`, texto: (n) => `${n.id} ${n.sku || ''} ${prodBy[n.sku]?.nome || ''} ${n.descricao || ''}` },
    linhas: () => ncs,
    ordenar: (a, b) => ((RANK_ST[a.status] ?? 9) - (RANK_ST[b.status] ?? 9)) || ((RANK_SEV[a.severidade] ?? 9) - (RANK_SEV[b.severidade] ?? 9)) || String(b.data).localeCompare(String(a.data)),
    chave: (n) => n.id,
    onClick: (n) => ctx.openRef?.(`nc:${n.id}`),
    vazio: (filtro) => `Nenhuma NC ${filtro}.`,
    colunas: [
      { m: 'id', largura: 'minmax(84px,104px)', render: (n) => h('strong', { class: 'ar-id' }, n.id) },
      {
        m: 'main', largura: 'minmax(0,2.4fr)',
        render: (n) => h('span', { class: 'ar-trunc', title: n.descricao || '' }, prodBy[n.sku]?.nome || n.descricao || n.sku || ''),
      },
      { m: null, largura: 'minmax(84px,110px)', render: (n) => h('span', { class: 'ar-muted' }, ORIGEM[n.origem] || cap(n.origem || '')) },
      // a mesma palavra da conversa ("severidade alta"): grave = severidade alta, em destaque
      { m: 'sub', largura: 'minmax(72px,96px)', render: (n) => (n.severidade === 'alta' ? tag('Sev. alta', 'danger') : h('span', { class: 'ar-muted' }, `Sev. ${n.severidade ? severidadeLabel(n.severidade) : '—'}`)) },
      { m: 'status', largura: 'minmax(150px,auto)', render: (n) => h('span', { class: 'ar-status' }, statusBadge(n.status), seloRegistros(nNotas(n))) },
    ],
  });

  const page = areaPage({
    ctx,
    modulo: 'qualidade',
    titulo: ctx.areaName?.('qualidade') || 'Qualidade',
    subtitulo: ['Não conformidades, causas e 8D', origemDados(ctx, 'qualidade')].filter(Boolean).join(' · '),
    numeros: [
      { valor: f.num(nAbertas), rotulo: nAbertas === 1 ? 'NC aberta' : 'NCs abertas', tom: nGraves ? 'danger' : nAbertas + nAnalise ? 'warn' : 'ok' },
      { valor: f.num(nAnalise), rotulo: 'em análise' },
      { valor: f.num(nGraves), rotulo: nGraves === 1 ? 'grave (alta) em aberto' : 'graves (alta) em aberto' },
    ],
    corpo: lista.el,
  });
  page.onLearning(() => { notas = learnItems(ctx); lista.refresh(); });
  el.replaceChildren(page.el);
  return () => page.cleanup();
}
