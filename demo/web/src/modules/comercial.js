// Comercial (UX §4.8): pedidos atrasados · carteira do mês · {produtos} abaixo do mínimo; 3 abas
// (Pedidos · Estoque e preço · {Representantes}); gavetas `pedido`, `sku`, `cliente`, `rep` com as
// ações que abrem a conversa (Escrever resposta, Preparar visita, Montar proposta).
// O WhatsApp do representante foi para Como funciona › Onde a equipe pergunta (pacote A).
import { h } from '../ui.js';
import {
  areaPage, listSection, statusBadge, seloRegistros, notesFor, learnItems, origemDados,
  cap, T, fmtOf, barra, curto, tag,
} from '../ui/area-page.js';

const FECHADOS = new Set(['faturado', 'entregue']);
const RANK = { atrasado: 0, em_analise: 1, aprovado: 2, em_producao: 3, faturado: 4, entregue: 5 };

/** Lê a regra de desconto (v1): "Até 5% sem aprovação; 5-8% com gerente; acima, diretoria." */
export function lerRegraDesconto(regra) {
  const padrao = { livre: 5, teto: 8, aprovMeio: 'gerente comercial', aprovAcima: 'diretoria', lida: false };
  if (!regra?.texto) return padrao;
  const pcts = (c) => [...c.matchAll(/(\d+(?:[.,]\d+)?)\s*%/g)].map((m) => parseFloat(m[1].replace(',', '.')));
  const clausulas = regra.texto.split(/;|\.\s+|\.$/).map((c) => c.trim()).filter(Boolean);
  const livreC = clausulas.find((c) => /sem aprova|livre/i.test(c) && pcts(c).length) || clausulas.find((c) => pcts(c).length);
  if (!livreC) return padrao;
  const livre = pcts(livreC)[0];
  const acimaC = clausulas.find((c) => c !== livreC && /acima/i.test(c));
  let teto = acimaC && pcts(acimaC).length ? pcts(acimaC)[0] : NaN;
  if (!(teto > livre)) teto = Math.max(livre + 3, padrao.teto);
  return { ...padrao, livre, teto, lida: true };
}

function abas(itens, inicial) {
  let atual = inicial || itens[0].id;
  const id = `com-${Math.random().toString(36).slice(2, 7)}`;
  const lista = h('div', { class: 'ar-tabs', role: 'tablist', 'aria-label': 'Comercial' });
  const painel = h('div', { class: 'ar-tabpanel', role: 'tabpanel', id: `${id}-p`, tabindex: '-1' });
  const cache = new Map();
  const botoes = itens.map((t) => h('button', {
    type: 'button', role: 'tab', class: 'ar-tab', id: `${id}-${t.id}`, 'aria-controls': `${id}-p`,
    onClick: () => escolhe(t.id),
    onKeydown: (e) => {
      const i = itens.findIndex((x) => x.id === t.id);
      const n = e.key === 'ArrowRight' ? itens[(i + 1) % itens.length] : e.key === 'ArrowLeft' ? itens[(i - 1 + itens.length) % itens.length] : null;
      if (n) { e.preventDefault(); escolhe(n.id); botoes[itens.indexOf(n)].focus(); }
    },
  }, t.label, t.contagem != null ? h('span', { class: 'ar-tab__count num' }, String(t.contagem)) : null));
  lista.append(...botoes);
  function escolhe(tid) {
    atual = tid;
    botoes.forEach((b, i) => {
      const sim = itens[i].id === tid;
      b.setAttribute('aria-selected', String(sim));
      b.tabIndex = sim ? 0 : -1;
    });
    painel.setAttribute('aria-labelledby', `${id}-${tid}`);
    if (!cache.has(tid)) cache.set(tid, itens.find((x) => x.id === tid).render());
    painel.replaceChildren(cache.get(tid).el);
  }
  escolhe(atual);
  return { el: h('div', { class: 'ar-tabbox' }, lista, painel), refresh: () => { for (const v of cache.values()) v.refresh?.(); } };
}

export function render(el, ctx) {
  const f = fmtOf(ctx);
  const d = ctx.data || {};
  const pedidos = d.pedidos || [];
  const produtos = d.produtos || [];
  const reps = d.representantes || [];
  const cliBy = Object.fromEntries((d.clientes || []).map((c) => [c.id, c]));
  const repBy = Object.fromEntries(reps.map((r) => [r.id, r]));
  const aberto = (p) => !FECHADOS.has(p.status);
  const atrasado = (p) => p.status === 'atrasado';

  const nAtrasados = pedidos.filter(atrasado).length;
  const meta = reps.reduce((s, r) => s + (r.meta_mes || 0), 0);
  const realizado = reps.reduce((s, r) => s + (r.realizado_mes || 0), 0);
  const pctMeta = meta ? Math.round((realizado / meta) * 100) : null;
  const abaixo = produtos.filter((p) => p.estoque < p.estoque_minimo);

  let notas = learnItems(ctx);
  const nNotas = (ids) => notesFor(ctx, { ids }, notas).length;

  const vistaPedidos = () => listSection({
    rotulo: 'Pedidos',
    filtros: [
      { id: 'atrasados', label: 'Atrasados', fn: atrasado },
      { id: 'abertos', label: 'Em aberto', fn: aberto },
      { id: 'todos', label: 'Todos', fn: () => true },
    ],
    busca: { placeholder: `Buscar pedido ou ${T(ctx, 'cliente')}`, texto: (p) => `${p.id} ${cliBy[p.cliente]?.nome || ''} ${repBy[p.representante]?.nome || ''}` },
    linhas: () => pedidos,
    ordenar: (a, b) => ((RANK[a.status] ?? 9) - (RANK[b.status] ?? 9)) || String(a.previsao_entrega).localeCompare(String(b.previsao_entrega)),
    chave: (p) => p.id,
    onClick: (p) => ctx.openRef?.(`pedido:${p.id}`),
    vazio: (filtro) => `Nenhum pedido ${filtro}.`,
    colunas: [
      { m: 'id', largura: 'minmax(84px,104px)', render: (p) => h('strong', { class: 'ar-id' }, p.id) },
      { m: 'main', largura: 'minmax(0,2fr)', render: (p) => h('span', { class: 'ar-trunc' }, curto(cliBy[p.cliente]?.nome) || p.cliente) },
      { m: null, largura: 'minmax(0,1.3fr)', render: (p) => h('span', { class: 'ar-muted ar-trunc' }, repBy[p.representante]?.nome || p.representante) },
      { m: 'sub', largura: 'minmax(60px,76px)', num: true, render: (p) => h('span', { class: atrasado(p) ? 'ar-late' : 'ar-muted' }, f.date(p.previsao_entrega)) },
      { m: 'status', largura: 'minmax(140px,auto)', render: (p) => h('span', { class: 'ar-status' }, statusBadge(p.status), seloRegistros(nNotas([p.id]))) },
    ],
  });

  const vistaEstoque = () => listSection({
    rotulo: 'Estoque e preço',
    filtros: [
      { id: 'abaixo', label: 'Abaixo do mínimo', vazio: 'abaixo do mínimo', fn: (p) => p.estoque < p.estoque_minimo },
      { id: 'todos', label: 'Todos', fn: () => true },
    ],
    inicial: abaixo.length ? 'abaixo' : 'todos',
    busca: { placeholder: `Buscar ${T(ctx, 'produto')}`, texto: (p) => `${p.sku} ${p.nome} ${p.familia || ''}` },
    linhas: () => produtos,
    ordenar: (a, b) => Number(b.estoque < b.estoque_minimo) - Number(a.estoque < a.estoque_minimo) || String(a.nome).localeCompare(String(b.nome)),
    chave: (p) => p.sku,
    onClick: (p) => ctx.openRef?.(`sku:${p.sku}`),
    vazio: (filtro) => `Nenhum ${T(ctx, 'produto')} ${filtro}.`,
    colunas: [
      { m: 'id', largura: 'minmax(84px,108px)', render: (p) => h('strong', { class: 'ar-id' }, p.sku) },
      { m: 'main', largura: 'minmax(0,2.2fr)', render: (p) => h('span', { class: 'ar-trunc' }, p.nome) },
      {
        m: 'status', largura: 'minmax(120px,auto)', num: true,
        render: (p) => h('span', { class: 'ar-status' },
          p.estoque < p.estoque_minimo ? tag('Abaixo do mínimo', 'warn') : h('span', { class: 'num' }, `${f.num(p.estoque)} em estoque`),
          seloRegistros(nNotas([p.sku]))),
      },
      { m: null, largura: 'minmax(80px,96px)', num: true, render: (p) => h('span', { class: 'ar-muted', title: 'Estoque · mínimo' }, `${f.num(p.estoque)} / ${f.num(p.estoque_minimo)}`) },
      { m: 'sub', largura: 'minmax(84px,104px)', num: true, render: (p) => h('span', null, f.money(p.preco)) },
      { m: null, largura: 'minmax(60px,72px)', num: true, render: (p) => h('span', { class: 'ar-muted' }, p.prazo_dias != null ? `${p.prazo_dias} d` : '—') },
    ],
  });

  const vistaReps = () => listSection({
    rotulo: cap(T(ctx, 'representantes')),
    busca: reps.length > 6 ? { placeholder: `Buscar ${T(ctx, 'representante')}`, texto: (r) => `${r.nome} ${r.regiao}` } : null,
    linhas: () => reps,
    ordenar: (a, b) => (a.realizado_mes / (a.meta_mes || 1)) - (b.realizado_mes / (b.meta_mes || 1)),
    chave: (r) => r.id,
    onClick: (r) => ctx.openRef?.(`rep:${r.id}`),
    vazio: () => `Nenhum ${T(ctx, 'representante')}.`,
    colunas: [
      { m: 'id', largura: 'minmax(0,1.4fr)', render: (r) => h('strong', { class: 'ar-trunc' }, r.nome) },
      { m: 'main', largura: 'minmax(0,1.4fr)', render: (r) => h('span', { class: 'ar-muted ar-trunc' }, r.regiao) },
      {
        m: 'sub', largura: 'minmax(140px,1fr)',
        render: (r) => {
          const p = r.meta_mes ? (r.realizado_mes / r.meta_mes) * 100 : 0;
          return h('span', { class: 'ar-progcell' }, barra(p), h('span', { class: 'num' }, f.pct(p, 0)));
        },
      },
      { m: 'status', largura: 'minmax(96px,auto)', num: true, render: (r) => h('span', { class: 'ar-status' }, h('span', { class: 'num ar-muted' }, f.money(r.realizado_mes, { compact: true })), seloRegistros(nNotas([r.id, r.nome]))) },
    ],
  });

  const tabs = abas([
    { id: 'pedidos', label: 'Pedidos', render: vistaPedidos },
    { id: 'estoque', label: 'Estoque e preço', render: vistaEstoque },
    { id: 'reps', label: cap(T(ctx, 'representantes')), render: vistaReps },
  ]);

  const page = areaPage({
    ctx,
    modulo: 'comercial',
    titulo: ctx.areaName?.('comercial') || 'Comercial',
    subtitulo: [`Pedidos, estoque, preço e ${T(ctx, 'representantes')}`, origemDados(ctx, 'comercial')].filter(Boolean).join(' · '),
    numeros: [
      { valor: f.num(nAtrasados), rotulo: nAtrasados === 1 ? 'pedido atrasado' : 'pedidos atrasados', tom: nAtrasados ? 'danger' : 'ok' },
      { valor: pctMeta == null ? '—' : `${pctMeta}%`, rotulo: `da meta do mês · ${f.money(realizado, { compact: true })}` },
      { valor: f.num(abaixo.length), rotulo: `${T(ctx, 'produtos')} abaixo do mínimo` },
    ],
    corpo: tabs.el,
  });
  page.onLearning(() => { notas = learnItems(ctx); tabs.refresh(); });
  el.replaceChildren(page.el);
  return () => page.cleanup();
}
