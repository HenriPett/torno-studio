// Marketing (UX §4.8): em revisão · aprovados · fichas publicadas; lista de conteúdos; a gaveta
// mostra o texto renderizado, as fontes, [Copiar] e [Perguntar sobre isto]. O catálogo fica no Portal.
import { h } from '../ui.js';
import * as ui from '../ui.js';
import {
  areaPage, listSection, statusBadge, seloRegistros, notesFor, learnItems, origemDados, cap, T, fmtOf,
  abrirFolha, refCards, renderMd, semMarcas, teamNotes, secao,
} from '../ui/area-page.js';

const TIPO = { ficha_produto: 'Ficha de produto', conteudo_tecnico: 'Conteúdo técnico', resposta_cliente: 'Resposta a cliente', post: 'Post' };
const RANK = { em_revisao: 0, rascunho: 1, aprovado: 2 };

function copiar(texto) {
  if (typeof ui.copyText === 'function') return ui.copyText(texto);
  return navigator.clipboard?.writeText(texto).then(() => true, () => false) ?? Promise.resolve(false);
}

function abrirConteudo(ctx, c) {
  const prod = c.sku ? (ctx.data?.produtos || []).find((p) => p.sku === c.sku) : null;
  const corpo = h('div', { class: 'ar-drawer' },
    h('div', { class: 'ar-dtop' }, statusBadge(c.status), h('span', { class: 'ar-dtop__meta' }, [TIPO[c.tipo] || cap(c.tipo || ''), prod?.nome].filter(Boolean).join(' · '))),
    h('div', { class: 'ar-md-box' }, renderMd(ctx, c.texto || '')),
    teamNotes(ctx, { ids: [c.id, c.sku].filter(Boolean) }),
    secao('Fontes', refCards(ctx, c.fontes || [])));
  let folha = null;
  const copiarBtn = ui.button('Copiar', {
    variant: 'secondary', icone: 'copy',
    onClick: async () => {
      const ok = await copiar(semMarcas(c.texto || ''));
      const lbl = copiarBtn.querySelector('.btn__label') || copiarBtn;
      lbl.textContent = ok ? 'Copiado' : 'Não foi possível copiar';
      setTimeout(() => { lbl.textContent = 'Copiar'; }, 1500);
    },
  });
  const acoes = [copiarBtn];
  if (typeof ctx.perguntar === 'function') {
    acoes.unshift(ui.button('Perguntar sobre isto', {
      variant: 'primary', icone: 'message',
      onClick: () => { folha?.close?.(); ctx.perguntar(`Sobre o conteúdo “${c.titulo}”: o que falta para aprovar e de onde vêm as informações?`, { modulo: 'marketing' }); },
    }));
  }
  if (typeof ctx.ensinar === 'function') {
    acoes.push(ui.button('Ensinar algo sobre isto', {
      variant: 'ghost', icone: 'lightbulb',
      onClick: () => { folha?.close?.(); ctx.ensinar({ area: 'marketing', origem: `marketing:${c.id}` }); },
    }));
  }
  folha = abrirFolha(ctx, {
    titulo: c.titulo, eyebrow: TIPO[c.tipo] || 'Conteúdo', corpo,
    acoes: h('div', { class: 'ar-drawer__acoes' }, acoes),
  });
}

export function render(el, ctx) {
  const f = fmtOf(ctx);
  const d = ctx.data || {};
  const itens = d.marketing || [];
  const prodBy = Object.fromEntries((d.produtos || []).map((p) => [p.sku, p]));
  const revisao = itens.filter((c) => c.status === 'em_revisao').length;
  const aprovados = itens.filter((c) => c.status === 'aprovado').length;
  const fichas = itens.filter((c) => c.status === 'aprovado' && c.tipo === 'ficha_produto').length;

  let notas = learnItems(ctx);
  const nNotas = (c) => notesFor(ctx, { ids: [c.id] }, notas).length;

  const lista = listSection({
    rotulo: 'Conteúdos',
    filtros: [
      { id: 'revisao', label: 'Em revisão', vazio: 'em revisão', fn: (c) => c.status !== 'aprovado' },
      { id: 'aprovados', label: 'Aprovados', fn: (c) => c.status === 'aprovado' },
      { id: 'todos', label: 'Todos', fn: () => true },
    ],
    inicial: 'todos',
    linhas: () => itens,
    ordenar: (a, b) => (RANK[a.status] ?? 9) - (RANK[b.status] ?? 9),
    chave: (c) => c.id,
    onClick: (c) => abrirConteudo(ctx, c),
    vazio: (filtro) => `Nenhum conteúdo ${filtro}.`,
    colunas: [
      { m: 'id', largura: 'minmax(120px,150px)', render: (c) => h('span', { class: 'ar-muted' }, TIPO[c.tipo] || cap(c.tipo || '')) },
      { m: 'main', largura: 'minmax(0,2.4fr)', render: (c) => h('span', { class: 'ar-trunc ar-strong' }, c.titulo) },
      { m: 'sub', largura: 'minmax(0,1fr)', render: (c) => h('span', { class: 'ar-muted ar-trunc' }, prodBy[c.sku]?.nome || '') },
      { m: 'status', largura: 'minmax(140px,auto)', render: (c) => h('span', { class: 'ar-status' }, statusBadge(c.status), seloRegistros(nNotas(c))) },
    ],
  });

  const page = areaPage({
    ctx,
    modulo: 'marketing',
    titulo: ctx.areaName?.('marketing') || 'Marketing',
    subtitulo: [`Fichas, conteúdos técnicos e respostas a ${T(ctx, 'clientes')}`, origemDados(ctx, 'marketing')].filter(Boolean).join(' · '),
    numeros: [
      { valor: f.num(revisao), rotulo: 'em revisão', tom: revisao ? 'warn' : null },
      { valor: f.num(aprovados), rotulo: aprovados === 1 ? 'aprovado' : 'aprovados' },
      { valor: f.num(fichas), rotulo: fichas === 1 ? 'ficha publicada' : 'fichas publicadas' },
    ],
    corpo: lista.el,
  });
  page.onLearning(() => { notas = learnItems(ctx); lista.refresh(); });
  el.replaceChildren(page.el);
  return () => page.cleanup();
}
