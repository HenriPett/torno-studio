// Produção e PCP: resumo, tabela de ordens com filtros, detalhe (roteiro, ficha, histórico, pedido),
// resumo de turno, alerta de atraso gerado e assistente da área.
import {
  h, icon, pageHeader, card, table, badge, statusBadge, refChip, tabs, emptyState,
  toolbar, select, searchInput, progress,
} from '../ui.js';
import { fmt, normalize } from '../format.js';
import { chatPanel } from '../ui/chat.js';

const STATUS_LABEL = {
  planejada: 'Planejada', em_producao: 'Em produção', atrasada: 'Atrasada', concluida: 'Concluída',
};

function ensureCss() {
  if (typeof document === 'undefined') return;
  if (document.querySelector('link[data-mod-css="mod-a"]')) return;
  const href = new URL('../../css/mod-a.css', import.meta.url).href;
  if ([...document.querySelectorAll('link[rel="stylesheet"]')].some((l) => l.href === href)) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  link.dataset.modCss = 'mod-a';
  document.head.appendChild(link);
}

function cap(s) {
  s = String(s || '');
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function chips(refs, ctx, cls = 'pcp-chips') {
  const ok = (refs || []).filter((r) => {
    try { return ctx.resolveRef(r); } catch { return false; }
  });
  if (!ok.length) return null;
  return h('div', { class: cls }, ok.map((r) => refChip(r, ctx)));
}

function stat(label, value, hint, tone) {
  return h('div', { class: `pcp-stat${tone ? ` is-${tone}` : ''}` },
    h('span', { class: 'pcp-stat-label' }, label),
    h('strong', { class: 'pcp-stat-value' }, value),
    hint ? h('span', { class: 'pcp-stat-hint' }, hint) : null,
  );
}

function lastEventDate(o) {
  const ds = (o.historico || []).map((e) => e.data).filter(Boolean).sort();
  return ds.length ? ds[ds.length - 1] : o.prazo;
}

// Ritmo esperado: fração do tempo entre início e prazo que já passou.
function expectedPct(o, today) {
  const total = fmt.daysFromToday(o.prazo, o.inicio);
  const passed = fmt.daysFromToday(today, o.inicio);
  if (total == null || passed == null || total <= 0) return null;
  return Math.max(0, Math.min(100, Math.round((passed / total) * 100)));
}

export function riskList(ctx) {
  const d = ctx.data;
  const prodBy = Object.fromEntries((d.produtos || []).map((p) => [p.sku, p]));
  const lineBy = Object.fromEntries((d.linhas || []).map((l) => [l.id, l]));
  const out = [];
  for (const o of d.ordens || []) {
    if (o.status === 'concluida') continue;
    const dias = fmt.daysFromToday(o.prazo, ctx.today);
    const prog = o.progresso ?? 0;
    const esperado = expectedPct(o, ctx.today);
    const late = o.status === 'atrasada' || (dias != null && dias < 0);
    const risk = !late && dias != null && dias <= 5 && (prog < 60 || (esperado != null && prog < esperado - 10));
    if (!late && !risk) continue;
    const restante = Math.round((o.quantidade || 0) * (1 - prog / 100));
    const ultimo = (o.historico || []).slice(-1)[0];
    const motivo = o.motivo_atraso
      || (ultimo ? `${ultimo.evento} (${fmt.date(ultimo.data)})` : null)
      || `Faltam ${dias} dias e ${prog}% está concluído${esperado != null ? ` (o ritmo pedia ${esperado}%)` : ''}.`;
    const linha = lineBy[o.linha]?.nome || o.linha;
    const unidade = prodBy[o.sku]?.unidade || ctx.term('unidade');
    let sugestao;
    if (late) {
      sugestao = `Priorizar ${o.id} na sequência de ${linha}${o.pedido ? ` e combinar nova data do pedido ${o.pedido} com o ${ctx.term('cliente')}` : ''}. Faltam ${fmt.num(restante)} ${unidade}.`;
    } else {
      const porDia = Math.ceil(restante / Math.max(dias, 1));
      sugestao = `Para cumprir ${fmt.date(o.prazo)}, ${linha} precisa de ${fmt.num(porDia)} ${unidade}/dia. Antecipar na sequência ou abrir turno extra.`;
    }
    out.push({
      o, late, dias, prog, motivo, sugestao, produto: prodBy[o.sku]?.nome || o.sku,
      nivel: late ? 'Atrasada' : 'Risco de atraso',
    });
  }
  return out.sort((a, b) => (b.late - a.late) || ((a.dias ?? 0) - (b.dias ?? 0)));
}

function routeSteps(o, produto) {
  const etapas = produto?.ficha?.roteiro || [];
  if (!etapas.length) return emptyState('Roteiro não cadastrado na ficha.');
  const n = etapas.length;
  const prog = o.progresso ?? 0;
  const atual = o.status === 'concluida' ? n : o.status === 'planejada' && prog === 0 ? -1 : Math.min(n - 1, Math.floor((prog / 100) * n));
  return h('ol', { class: 'pcp-route' },
    etapas.map((e, i) => {
      const estado = o.status === 'concluida' || i < atual ? 'feito' : i === atual ? 'atual' : 'proximo';
      const rot = { feito: 'Concluída', atual: 'Em andamento', proximo: 'A fazer' }[estado];
      return h('li', { class: `pcp-route-step is-${estado}` },
        h('span', { class: 'pcp-route-num', 'aria-hidden': 'true' }, String(i + 1)),
        h('span', { class: 'pcp-route-name' }, e),
        h('span', { class: 'pcp-route-state' }, rot),
      );
    }),
  );
}

function fichaBlock(produto) {
  const f = produto?.ficha || {};
  const attrs = Object.entries(f.atributos || {});
  const specs = f.especificacoes || [];
  if (!attrs.length && !specs.length) return emptyState('Ficha técnica sem atributos.');
  return h('div', { class: 'pcp-ficha' },
    attrs.length ? h('dl', { class: 'pcp-dl' },
      attrs.map(([k, v]) => [h('dt', null, k), h('dd', null, String(v))]),
    ) : null,
    specs.length ? h('div', { class: 'pcp-scroll' },
      h('table', { class: 'pcp-mini-table' },
        h('thead', null, h('tr', null, h('th', { scope: 'col' }, 'Característica'), h('th', { scope: 'col' }, 'Nominal'), h('th', { scope: 'col' }, 'Tolerância'))),
        h('tbody', null, specs.map((s) => h('tr', null,
          h('td', null, s.caracteristica),
          h('td', { class: 'pcp-num' }, `${s.nominal ?? '—'}${s.unidade ? ` ${s.unidade}` : ''}`),
          h('td', { class: 'pcp-num' }, s.tolerancia || '—'),
        ))),
      ),
    ) : null,
  );
}

function detailPanel(o, ctx) {
  if (!o) return emptyState(`Selecione uma ${ctx.term('ordem')} na tabela para ver o detalhe.`);
  const d = ctx.data;
  const produto = (d.produtos || []).find((p) => p.sku === o.sku);
  const linha = (d.linhas || []).find((l) => l.id === o.linha);
  const dias = fmt.daysFromToday(o.prazo, ctx.today);
  const hist = [...(o.historico || [])].sort((a, b) => String(b.data).localeCompare(String(a.data)));
  const pedido = o.pedido ? (d.pedidos || []).find((p) => p.id === o.pedido) : null;
  const ncs = ctx.isEnabled('qualidade')
    ? (d.nao_conformidades || []).filter((n) => n.sku === o.sku && n.status !== 'encerrada') : [];

  return h('div', { class: 'pcp-detail' },
    h('div', { class: 'pcp-detail-head' },
      h('div', null,
        h('span', { class: 'pcp-eyebrow' }, `${ctx.term('ordem')} ${o.id}`),
        h('h3', null, produto?.nome || o.sku),
        h('p', { class: 'pcp-muted' }, `${o.sku} · ${fmt.num(o.quantidade)} ${produto?.unidade || ctx.term('unidade')} · ${linha?.nome || o.linha}`),
      ),
      statusBadge(o.status),
    ),
    h('div', { class: 'pcp-detail-figs' },
      h('div', null, h('span', { class: 'pcp-fig-label' }, 'Progresso'),
        h('div', { class: 'pcp-prog' }, progress(o.progresso ?? 0), h('span', { class: 'pcp-num' }, `${o.progresso ?? 0}%`))),
      h('div', null, h('span', { class: 'pcp-fig-label' }, 'Início'), h('strong', { class: 'pcp-num' }, fmt.date(o.inicio))),
      h('div', null, h('span', { class: 'pcp-fig-label' }, 'Prazo'),
        h('strong', { class: `pcp-num${dias != null && dias < 0 && o.status !== 'concluida' ? ' is-late' : ''}` }, `${fmt.date(o.prazo)} · ${fmt.rel(o.prazo, ctx.today)}`)),
    ),
    o.motivo_atraso ? h('p', { class: 'pcp-callout is-warn' }, icon('alert'), h('span', null, h('strong', null, 'Motivo do atraso: '), o.motivo_atraso)) : null,
    h('section', { class: 'pcp-section' }, h('h4', null, 'Roteiro'), routeSteps(o, produto)),
    h('section', { class: 'pcp-section' }, h('h4', null, 'Ficha técnica'), fichaBlock(produto)),
    h('section', { class: 'pcp-section' }, h('h4', null, 'Histórico'),
      hist.length ? h('ul', { class: 'pcp-timeline' }, hist.map((e) => h('li', null,
        h('span', { class: 'pcp-tl-date pcp-num' }, fmt.date(e.data)),
        h('span', { class: 'pcp-tl-text' }, e.evento),
      ))) : h('p', { class: 'pcp-muted' }, 'Sem eventos registrados.')),
    (pedido || ncs.length) ? h('section', { class: 'pcp-section' }, h('h4', null, 'Ligações'),
      pedido && ctx.isEnabled('comercial') ? h('p', { class: 'pcp-muted' },
        `Pedido ${pedido.id} · previsão ${fmt.date(pedido.previsao_entrega)}`, ' ', statusBadge(pedido.status)) : null,
      chips([
        pedido ? `pedido:${pedido.id}` : null,
        `sku:${o.sku}`,
        ...ncs.map((n) => `nc:${n.id}`),
      ].filter(Boolean), ctx),
    ) : null,
    h('div', { class: 'pcp-detail-actions' },
      h('button', { type: 'button', class: 'btn btn-secondary pcp-btn', onclick: () => ctx.openRef(`op:${o.id}`) },
        icon('external'), `Abrir ${ctx.term('ordem')} ${o.id}`),
    ),
  );
}

function shiftPanel(ctx) {
  const d = ctx.data;
  const lineBy = Object.fromEntries((d.linhas || []).map((l) => [l.id, l]));
  const turnos = [...(d.turnos || [])].sort((a, b) =>
    String(b.data).localeCompare(String(a.data)) || String(b.turno).localeCompare(String(a.turno)));
  if (!turnos.length) return emptyState('Sem apontamentos de turno.');
  let filtro = '';
  const list = h('div', { class: 'pcp-shifts' });
  const totals = h('div', { class: 'pcp-shift-totals' });

  function draw() {
    const rows = turnos.filter((t) => !filtro || t.linha === filtro);
    const prod = rows.reduce((s, t) => s + (t.produzido || 0), 0);
    const ref = rows.reduce((s, t) => s + (t.refugo || 0), 0);
    const par = rows.reduce((s, t) => s + (t.paradas_min || 0), 0);
    totals.replaceChildren(
      stat('Produzido', fmt.num(prod), `${rows.length} turnos`),
      stat('Refugo', fmt.num(ref), prod ? `${fmt.pct((ref / prod) * 100)} do produzido` : null, ref / Math.max(prod, 1) > 0.03 ? 'warn' : null),
      stat('Paradas', `${fmt.num(par)} min`, rows.length ? `média ${fmt.num(Math.round(par / rows.length))} min/turno` : null),
    );
    list.replaceChildren(...(rows.length ? rows.map((t) => {
      const refPct = t.produzido ? (t.refugo / t.produzido) * 100 : 0;
      return h('article', { class: 'pcp-shift' },
        h('header', { class: 'pcp-shift-head' },
          h('div', null,
            h('span', { class: 'pcp-eyebrow' }, 'Passagem de turno'),
            h('h4', null, `${fmt.date(t.data)} · ${t.turno} turno · ${lineBy[t.linha]?.nome || t.linha}`),
          ),
          refPct > 3 ? badge('Refugo acima de 3%', 'warn') : badge('Refugo normal', 'ok'),
        ),
        h('dl', { class: 'pcp-shift-figs' },
          h('div', null, h('dt', null, 'Produzido'), h('dd', { class: 'pcp-num' }, fmt.num(t.produzido))),
          h('div', null, h('dt', null, 'Refugo'), h('dd', { class: 'pcp-num' }, `${fmt.num(t.refugo)} (${fmt.pct(refPct)})`)),
          h('div', null, h('dt', null, 'Paradas'), h('dd', { class: 'pcp-num' }, `${fmt.num(t.paradas_min)} min`)),
        ),
        t.resumo ? h('p', { class: 'pcp-shift-text' }, t.resumo) : null,
        (t.ocorrencias || []).length ? h('div', null,
          h('span', { class: 'pcp-fig-label' }, 'Ocorrências para o próximo turno'),
          h('ul', { class: 'pcp-occ' }, t.ocorrencias.map((x) => h('li', null, x))),
        ) : null,
        chips([`turno:${t.data}|${t.turno}|${t.linha}`], ctx),
      );
    }) : [emptyState('Sem turnos para esta linha.')]));
  }

  const linhas = [...new Set(turnos.map((t) => t.linha))];
  const bar = toolbar(select({
    id: 'pcp-shift-linha', label: cap(ctx.term('linha')),
    options: [{ value: '', label: `Tudo (${ctx.term('linhas')})` }, ...linhas.map((l) => ({ value: l, label: lineBy[l]?.nome || l }))],
    value: '', onChange: (v) => { filtro = v?.target ? v.target.value : v; draw(); },
  }));
  draw();
  return h('div', { class: 'pcp-shift-wrap' }, bar, totals, list);
}

function alertPanel(ctx) {
  const riscos = riskList(ctx);
  if (!riscos.length) return emptyState(`Nenhuma ${ctx.term('ordem')} com risco de atraso nos próximos 5 dias.`);
  return h('div', { class: 'pcp-alert' },
    h('p', { class: 'pcp-gen-label' }, icon('sparkles'),
      h('span', null, `Gerado a partir das ${ctx.term('ordens')}, prazos e histórico · revisar antes de enviar`)),
    h('ul', { class: 'pcp-alert-list' }, riscos.map((r) => h('li', { class: `pcp-alert-item${r.late ? ' is-late' : ''}` },
      h('div', { class: 'pcp-alert-head' },
        h('button', { type: 'button', class: 'pcp-link', onclick: () => ctx.openRef(`op:${r.o.id}`) }, `${r.o.id} · ${r.produto}`),
        badge(r.nivel, r.late ? 'danger' : 'warn'),
      ),
      h('p', { class: 'pcp-alert-meta pcp-num' },
        `Prazo ${fmt.date(r.o.prazo)} (${fmt.rel(r.o.prazo, ctx.today)}) · ${r.prog}% concluído`),
      h('p', null, h('strong', null, 'Motivo: '), r.motivo),
      h('p', null, h('strong', null, 'Sugestão: '), r.sugestao),
    ))),
  );
}

export function render(el, ctx) {
  ensureCss();
  const d = ctx.data || {};
  const ordens = d.ordens || [];
  const prodBy = Object.fromEntries((d.produtos || []).map((p) => [p.sku, p]));
  const lineBy = Object.fromEntries((d.linhas || []).map((l) => [l.id, l]));
  const O = cap(ctx.term('ordens'));

  // Resumo
  const emProd = ordens.filter((o) => o.status === 'em_producao').length;
  const atrasadas = ordens.filter((o) => o.status === 'atrasada').length;
  const concluidasSemana = ordens.filter((o) => {
    if (o.status !== 'concluida') return false;
    const dd = fmt.daysFromToday(lastEventDate(o), ctx.today);
    return dd != null && dd <= 0 && dd >= -7;
  }).length;
  const ativas = ordens.filter((o) => o.status !== 'planejada');
  const noPrazo = ativas.length ? ((ativas.length - atrasadas) / ativas.length) * 100 : null;

  // Estado
  let filtroStatus = '';
  let busca = '';
  let selecionada = (ordens.find((o) => o.status === 'atrasada') || ordens[0] || {}).id || null;

  const tableBox = h('div', { class: 'pcp-table-box' });
  const detailBox = h('div', { class: 'pcp-detail-box', 'aria-live': 'polite' });
  const countLabel = h('p', { class: 'pcp-count', 'aria-live': 'polite' });

  function filtered() {
    const q = normalize(busca);
    return ordens.filter((o) => {
      if (filtroStatus && o.status !== filtroStatus) return false;
      if (!q) return true;
      const p = prodBy[o.sku];
      return normalize(`${o.id} ${o.sku} ${p?.nome || ''} ${o.pedido || ''} ${lineBy[o.linha]?.nome || ''}`).includes(q);
    }).sort((a, b) => {
      const rank = { atrasada: 0, em_producao: 1, planejada: 2, concluida: 3 };
      return (rank[a.status] - rank[b.status]) || String(a.prazo).localeCompare(String(b.prazo));
    });
  }

  function drawDetail() {
    detailBox.replaceChildren(detailPanel(ordens.find((o) => o.id === selecionada), ctx));
  }

  function drawTable() {
    const rows = filtered();
    countLabel.textContent = `${rows.length} de ${ordens.length} ${ctx.term('ordens')}`;
    const t = table({
      columns: [
        { key: 'id', label: ctx.term('ordem'), render: (o) => h('span', { class: 'pcp-id' }, o.id) },
        { key: 'sku', label: cap(ctx.term('produto')), render: (o) => h('span', { class: 'pcp-cell-prod' },
          h('span', null, prodBy[o.sku]?.nome || o.sku), h('span', { class: 'pcp-muted' }, o.sku)) },
        { key: 'quantidade', label: 'Qtd.', align: 'right', render: (o) => h('span', { class: 'pcp-num' }, fmt.num(o.quantidade)) },
        { key: 'linha', label: cap(ctx.term('linha')), render: (o) => lineBy[o.linha]?.nome || o.linha },
        { key: 'progresso', label: 'Progresso', render: (o) => h('span', { class: 'pcp-prog' }, progress(o.progresso ?? 0), h('span', { class: 'pcp-num' }, `${o.progresso ?? 0}%`)) },
        { key: 'prazo', label: 'Prazo', render: (o) => {
          const dd = fmt.daysFromToday(o.prazo, ctx.today);
          const late = o.status !== 'concluida' && dd != null && dd < 0;
          return h('span', { class: `pcp-cell-prazo${late || o.status === 'atrasada' ? ' is-late' : ''}` },
            h('span', { class: 'pcp-num' }, fmt.date(o.prazo)), h('span', { class: 'pcp-muted' }, fmt.rel(o.prazo, ctx.today)));
        } },
        { key: 'status', label: 'Status', render: (o) => statusBadge(o.status) },
      ],
      rows,
      onRowClick: (o) => { selecionada = o.id; drawDetail(); markRows(t, rows); },
      empty: `Nenhuma ${ctx.term('ordem')} com esses filtros.`,
    });
    markRows(t, rows);
    tableBox.replaceChildren(t);
  }

  function markRows(t, rows) {
    const trs = t.querySelectorAll('tbody tr');
    trs.forEach((tr, i) => {
      const o = rows[i];
      if (!o) return;
      tr.classList.toggle('pcp-row-late', o.status === 'atrasada');
      tr.classList.toggle('is-selected', o.id === selecionada);
      if (o.id === selecionada) tr.setAttribute('aria-selected', 'true'); else tr.removeAttribute('aria-selected');
    });
  }

  const statusOpts = ['planejada', 'em_producao', 'atrasada', 'concluida']
    .filter((s) => ordens.some((o) => o.status === s))
    .map((s) => ({ value: s, label: STATUS_LABEL[s] }));

  const ordersView = () => {
    const view = ordersViewRaw();
    const inp = view.querySelector('input[type="search"], input');
    if (inp && busca) inp.value = busca;
    return view;
  };
  const ordersViewRaw = () => h('div', { class: 'pcp-orders' },
    toolbar(
      select({
        id: 'pcp-status', label: 'Status', value: filtroStatus,
        options: [{ value: '', label: 'Todos' }, ...statusOpts],
        onChange: (v) => { filtroStatus = v?.target ? v.target.value : v; drawTable(); },
      }),
      searchInput({
        id: 'pcp-busca', placeholder: `Buscar ${ctx.term('ordem')}, ${ctx.term('produto')} ou pedido`,
        onInput: (v) => { busca = v?.target ? v.target.value : v; drawTable(); },
      }),
    ),
    countLabel,
    tableBox,
  );

  drawTable();
  drawDetail();

  el.replaceChildren(h('div', { class: 'pcp-page' },
    pageHeader({
      titulo: ctx.areaName('producao') || 'Produção e PCP',
      subtitulo: `${O}, roteiros e turnos · ${ctx.empresa} · ${fmt.date(ctx.today)}`,
    }),
    h('div', { class: 'pcp-stats', role: 'group', 'aria-label': 'Resumo da produção' },
      stat(`${O} em produção`, fmt.num(emProd), `${ordens.length} no total`),
      stat(`${O} atrasadas`, fmt.num(atrasadas), atrasadas ? 'precisam de nova data' : 'nenhuma', atrasadas ? 'danger' : 'ok'),
      stat('Concluídas na semana', fmt.num(concluidasSemana), 'últimos 7 dias'),
      stat('No prazo', noPrazo == null ? '—' : fmt.pct(noPrazo, 0), `das ${ctx.term('ordens')} iniciadas`, noPrazo != null && noPrazo < 80 ? 'warn' : null),
    ),
    h('div', { class: 'pcp-grid' },
      card({
        titulo: `${O} e turnos`, class: 'pcp-card',
        corpo: tabs([
          { id: 'ordens', label: O, render: ordersView },
          { id: 'turnos', label: 'Resumo de turno', render: () => shiftPanel(ctx) },
        ], { initial: 'ordens' }),
      }),
      card({ titulo: `Detalhe da ${ctx.term('ordem')}`, corpo: detailBox, class: 'pcp-card pcp-detail-card' }),
    ),
    h('div', { class: 'pcp-grid pcp-grid-even' },
      card({ titulo: 'Alerta de atraso', corpo: alertPanel(ctx), class: 'pcp-card' }),
      card({
        titulo: `Assistente de ${ctx.areaName('producao') || 'produção'}`,
        corpo: chatPanel({ ctx, modulo: 'producao', titulo: 'Assistente do PCP' }),
        class: 'pcp-card pcp-chat',
      }),
    ),
  ));
}
