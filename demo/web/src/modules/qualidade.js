// Qualidade: NCs com filtros, detalhe com causa/ação, rascunho de 8D gerado e conferência de
// especificação (valor medido × ficha técnica).
import {
  h, icon, pageHeader, card, table, badge, statusBadge, refChip, tabs, emptyState,
  toolbar, select, searchInput,
} from '../ui.js';
import { fmt, normalize } from '../format.js';
import { chatPanel } from '../ui/chat.js';

const SEV = { baixa: 'Baixa', media: 'Média', alta: 'Alta' };
const SEV_TONE = { baixa: 'neutral', media: 'warn', alta: 'danger' };
const ORIGEM = { interna: 'Interna', cliente: 'Cliente', fornecedor: 'Fornecedor' };
const D_LABELS = {
  D1: 'D1 · Equipe', D2: 'D2 · Problema', D3: 'D3 · Contenção', D4: 'D4 · Causa raiz',
  D5: 'D5 · Ação corretiva', D6: 'D6 · Implantação', D7: 'D7 · Prevenção', D8: 'D8 · Encerramento',
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

function cap(s) { s = String(s || ''); return s.charAt(0).toUpperCase() + s.slice(1); }

function chips(refs, ctx, cls = 'qa-chips') {
  const ok = (refs || []).filter((r) => { try { return ctx.resolveRef(r); } catch { return false; } });
  if (!ok.length) return null;
  return h('div', { class: cls }, ok.map((r) => refChip(r, ctx)));
}

function stat(label, value, tone) {
  return h('div', { class: `qa-stat${tone ? ` is-${tone}` : ''}` },
    h('strong', { class: 'qa-stat-value' }, value), h('span', { class: 'qa-stat-label' }, label));
}

// Monta um rascunho D1-D8 determinístico a partir da NC e de NCs parecidas (mesmo sku/linha).
function build8D(nc, ctx) {
  const d = ctx.data;
  const prod = (d.produtos || []).find((p) => p.sku === nc.sku);
  const linha = (d.linhas || []).find((l) => l.id === nc.linha);
  const prodNome = prod?.nome || nc.sku || ctx.term('produto');
  const linhaNome = linha?.nome || nc.linha || '';
  const similares = (d.nao_conformidades || []).filter((n) =>
    n.id !== nc.id && (n.sku === nc.sku || (nc.linha && n.linha === nc.linha)));
  const recorrente = similares.length > 0;
  const fontes = [`nc:${nc.id}`, nc.sku ? `sku:${nc.sku}` : null, ...similares.slice(0, 3).map((n) => `nc:${n.id}`)].filter(Boolean);
  return {
    gerado: true,
    draft: {
      D1: `Equipe: ${nc.responsavel || 'responsável da qualidade'} (qualidade), líder de ${linhaNome || ctx.term('linha')} e ${ctx.term('produto')} ${prodNome}. Revisar antes de oficializar.`,
      D2: `${nc.descricao || 'Não conformidade registrada'}${nc.sku ? ` no ${ctx.term('produto')} ${prodNome} (${nc.sku})` : ''}${linhaNome ? `, ${ctx.term('linha')} ${linhaNome}` : ''}. Origem: ${ORIGEM[nc.origem] || nc.origem}. Severidade ${SEV[nc.severidade] || nc.severidade}.`,
      D3: nc.acao ? `Contenção imediata: ${nc.acao}` : `Segregar o lote afetado de ${prodNome} e inspecionar 100% antes da liberação.`,
      D4: nc.causa ? `Causa provável: ${nc.causa}` : 'Causa raiz a confirmar com 5 porquês e análise do processo.',
      D5: nc.acao ? `Ação corretiva proposta: ${nc.acao}` : `Ajustar o processo de ${linhaNome || ctx.term('linha')} e atualizar a instrução de trabalho.`,
      D6: `Implantar a ação em ${linhaNome || ctx.term('linha')} e acompanhar os próximos lotes de ${prodNome}.`,
      D7: recorrente
        ? `Problema recorrente: há ${similares.length} NC(s) parecida(s) em ${nc.sku || ctx.term('linha')}. Revisar FMEA e padrão de inspeção para evitar reincidência.`
        : 'Atualizar FMEA e checklist de inspeção; treinar a equipe no padrão revisado.',
      D8: `Encerrar após confirmar eficácia por 2 lotes sem reincidência e comunicar ${nc.origem === 'cliente' ? 'o cliente' : 'as áreas envolvidas'}.`,
    },
    recorrente, similares, fontes,
  };
}

function eightDView(nc, ctx) {
  if (!nc) return emptyState('Selecione uma NC para gerar o rascunho de 8D.');
  const oficial = nc.oito_d && typeof nc.oito_d === 'object';
  const src = oficial ? nc.oito_d : build8D(nc, ctx);
  const draft = oficial ? nc.oito_d : src.draft;
  const fontes = oficial ? [`nc:${nc.id}`, nc.sku ? `sku:${nc.sku}` : null].filter(Boolean) : src.fontes;
  return h('div', { class: 'qa-8d' },
    oficial
      ? h('p', { class: 'qa-gen-label is-official' }, icon('check'), h('span', null, `8D oficial registrado para ${nc.id}`))
      : h('p', { class: 'qa-gen-label' }, icon('sparkles'),
          h('span', null, `Rascunho gerado para revisão${src.recorrente ? ` · ${src.similares.length} NC(s) parecida(s) considerada(s)` : ''}`)),
    h('dl', { class: 'qa-8d-list' },
      Object.keys(D_LABELS).map((k) => h('div', { class: 'qa-8d-item' },
        h('dt', null, D_LABELS[k]),
        h('dd', null, draft[k] || h('span', { class: 'qa-muted' }, 'A preencher.')),
      )),
    ),
    chips(fontes, ctx),
  );
}

function detailPanel(nc, ctx) {
  if (!nc) return emptyState('Selecione uma NC na tabela para ver o detalhe.');
  const prod = (ctx.data.produtos || []).find((p) => p.sku === nc.sku);
  const linha = (ctx.data.linhas || []).find((l) => l.id === nc.linha);
  return h('div', { class: 'qa-detail' },
    h('div', { class: 'qa-detail-head' },
      h('div', null,
        h('span', { class: 'qa-eyebrow' }, `${nc.id} · ${fmt.date(nc.data)}`),
        h('h3', null, prod?.nome || nc.sku || 'Não conformidade'),
        h('p', { class: 'qa-muted' }, [nc.sku, linha?.nome || nc.linha].filter(Boolean).join(' · ')),
      ),
      h('div', { class: 'qa-detail-badges' },
        badge(SEV[nc.severidade] || nc.severidade, SEV_TONE[nc.severidade] || 'neutral'),
        statusBadge(nc.status),
      ),
    ),
    h('dl', { class: 'qa-dl' },
      h('div', null, h('dt', null, 'Origem'), h('dd', null, ORIGEM[nc.origem] || nc.origem)),
      h('div', null, h('dt', null, 'Responsável'), h('dd', null, nc.responsavel || '—')),
    ),
    h('section', { class: 'qa-section' }, h('h4', null, 'Descrição'), h('p', null, nc.descricao || '—')),
    h('section', { class: 'qa-section' }, h('h4', null, 'Causa'), h('p', null, nc.causa || h('span', { class: 'qa-muted' }, 'A investigar.'))),
    h('section', { class: 'qa-section' }, h('h4', null, 'Ação'), h('p', null, nc.acao || h('span', { class: 'qa-muted' }, 'A definir.'))),
    chips([`nc:${nc.id}`, nc.sku ? `sku:${nc.sku}` : null], ctx),
    h('div', { class: 'qa-detail-actions' },
      h('button', { type: 'button', class: 'btn btn-secondary qa-btn', onclick: () => ctx.openRef(`nc:${nc.id}`) },
        icon('external'), `Abrir NC ${nc.id}`),
    ),
  );
}

// Interpreta nominal/tolerância simples e devolve avaliação de um valor medido.
function evaluate(spec, medido) {
  if (medido === '' || medido == null || Number.isNaN(Number(medido))) return { estado: 'vazio' };
  const v = Number(medido);
  const nominalRaw = String(spec.nominal ?? '').trim();
  const tolRaw = String(spec.tolerancia ?? '').trim();
  const num = (t) => { const m = String(t).replace(',', '.').match(/-?\d+(\.\d+)?/); return m ? Number(m[0]) : null; };

  // ≤ x / ≥ x (no nominal)
  let mm = nominalRaw.match(/^(≤|<=|<|máx\.?|max\.?)\s*(-?\d+[.,]?\d*)/i);
  if (mm) { const lim = num(mm[2]); return { estado: v <= lim ? 'ok' : 'fora', faixa: `≤ ${fmt.num(lim)}` }; }
  mm = nominalRaw.match(/^(≥|>=|>|mín\.?|min\.?)\s*(-?\d+[.,]?\d*)/i);
  if (mm) { const lim = num(mm[2]); return { estado: v >= lim ? 'ok' : 'fora', faixa: `≥ ${fmt.num(lim)}` }; }

  // nominal numérico ± tolerância
  const nom = num(nominalRaw);
  if (nom != null) {
    const tol = num(tolRaw);
    if (tol != null) {
      const t = Math.abs(tol);
      const lo = nom - t; const hi = nom + t;
      return { estado: v >= lo && v <= hi ? 'ok' : 'fora', faixa: `${fmt.num(lo)} a ${fmt.num(hi)}${spec.unidade ? ` ${spec.unidade}` : ''}` };
    }
    return { estado: 'sem_regra', faixa: `nominal ${fmt.num(nom)}${spec.unidade ? ` ${spec.unidade}` : ''}` };
  }
  return { estado: 'sem_regra' };
}

function specCheck(ctx) {
  const d = ctx.data;
  const produtos = (d.produtos || []).filter((p) => (p.ficha?.especificacoes || []).length);
  if (!produtos.length) return emptyState('Nenhum produto com especificações na ficha.');
  let skuSel = produtos[0].sku;
  const body = h('div', { class: 'qa-spec-body' });

  function draw() {
    const prod = produtos.find((p) => p.sku === skuSel);
    const specs = prod.ficha.especificacoes;
    const rows = specs.map((spec) => {
      const resultCell = h('span', { class: 'qa-result' }, h('span', { class: 'qa-muted' }, '—'));
      const faixaCell = h('span', { class: 'qa-muted qa-num' }, '');
      const input = h('input', {
        type: 'text', inputmode: 'decimal', class: 'qa-input qa-num',
        id: `qa-spec-${normalize(spec.caracteristica).replace(/\s+/g, '-')}`,
        'aria-label': `Valor medido de ${spec.caracteristica}`,
        oninput: (e) => {
          const r = evaluate(spec, e.target.value);
          faixaCell.textContent = r.faixa || '';
          if (r.estado === 'ok') resultCell.replaceChildren(badge('Dentro da tolerância', 'ok'));
          else if (r.estado === 'fora') resultCell.replaceChildren(badge('Fora da tolerância', 'danger'));
          else if (r.estado === 'sem_regra') resultCell.replaceChildren(h('span', { class: 'qa-muted' }, 'Ver referência na ficha'));
          else resultCell.replaceChildren(h('span', { class: 'qa-muted' }, '—'));
        },
      });
      return h('tr', null,
        h('td', null, h('label', { for: input.id }, spec.caracteristica)),
        h('td', { class: 'qa-num' }, `${spec.nominal ?? '—'}${spec.tolerancia ? ` ${spec.tolerancia}` : ''}${spec.unidade ? ` ${spec.unidade}` : ''}`),
        h('td', null, input),
        h('td', null, faixaCell),
        h('td', null, resultCell),
      );
    });
    body.replaceChildren(
      h('div', { class: 'qa-scroll' },
        h('table', { class: 'qa-spec-table' },
          h('thead', null, h('tr', null,
            h('th', { scope: 'col' }, 'Característica'),
            h('th', { scope: 'col' }, 'Especificação'),
            h('th', { scope: 'col' }, 'Valor medido'),
            h('th', { scope: 'col' }, 'Faixa aceita'),
            h('th', { scope: 'col' }, 'Resultado'),
          )),
          h('tbody', null, rows),
        ),
      ),
      chips([`sku:${skuSel}`], ctx),
    );
  }

  const bar = toolbar(select({
    id: 'qa-spec-sku', label: cap(ctx.term('produto')),
    options: produtos.map((p) => ({ value: p.sku, label: `${p.nome} (${p.sku})` })),
    value: skuSel, onChange: (v) => { skuSel = v?.target ? v.target.value : v; draw(); },
  }));
  draw();
  return h('div', { class: 'qa-spec' },
    h('p', { class: 'qa-hint' }, 'Digite o valor medido; o resultado compara com a tolerância da ficha.'),
    bar, body);
}

export function render(el, ctx) {
  ensureCss();
  const d = ctx.data || {};
  const ncs = d.nao_conformidades || [];
  const prodBy = Object.fromEntries((d.produtos || []).map((p) => [p.sku, p]));
  const lineBy = Object.fromEntries((d.linhas || []).map((l) => [l.id, l]));

  const abertas = ncs.filter((n) => n.status !== 'encerrada');
  const altas = abertas.filter((n) => n.severidade === 'alta').length;
  const deCliente = abertas.filter((n) => n.origem === 'cliente').length;

  let fOrigem = '', fSev = '', fStatus = '', busca = '';
  let selId = (ncs.find((n) => n.severidade === 'alta' && n.status !== 'encerrada') || ncs[0] || {}).id || null;

  const tableBox = h('div', { class: 'qa-table-box' });
  const detailBox = h('div', { class: 'qa-detail-box', 'aria-live': 'polite' });
  const eightBox = h('div', { class: 'qa-8d-box', 'aria-live': 'polite' });
  const countLabel = h('p', { class: 'qa-count' });

  function filtered() {
    const q = normalize(busca);
    return ncs.filter((n) => {
      if (fOrigem && n.origem !== fOrigem) return false;
      if (fSev && n.severidade !== fSev) return false;
      if (fStatus && n.status !== fStatus) return false;
      if (!q) return true;
      return normalize(`${n.id} ${n.sku || ''} ${prodBy[n.sku]?.nome || ''} ${n.descricao || ''} ${n.responsavel || ''}`).includes(q);
    }).sort((a, b) => {
      const sev = { alta: 0, media: 1, baixa: 2 };
      const st = { aberta: 0, em_analise: 1, encerrada: 2 };
      return (st[a.status] - st[b.status]) || (sev[a.severidade] - sev[b.severidade]) || String(b.data).localeCompare(String(a.data));
    });
  }

  function drawDetail() {
    const nc = ncs.find((n) => n.id === selId);
    detailBox.replaceChildren(detailPanel(nc, ctx));
    eightBox.replaceChildren(eightDView(nc, ctx));
  }

  function markRows(t, rows) {
    t.querySelectorAll('tbody tr').forEach((tr, i) => {
      if (!rows[i]) return;
      tr.classList.toggle('is-selected', rows[i].id === selId);
    });
  }

  function drawTable() {
    const rows = filtered();
    countLabel.textContent = `${rows.length} de ${ncs.length} NCs`;
    const t = table({
      columns: [
        { key: 'id', label: 'NC', render: (n) => h('span', { class: 'qa-id' }, n.id) },
        { key: 'data', label: 'Data', render: (n) => h('span', { class: 'qa-num' }, fmt.date(n.data)) },
        { key: 'sku', label: cap(ctx.term('produto')), render: (n) => prodBy[n.sku]?.nome || n.sku || '—' },
        { key: 'origem', label: 'Origem', render: (n) => ORIGEM[n.origem] || n.origem },
        { key: 'severidade', label: 'Severidade', render: (n) => badge(SEV[n.severidade] || n.severidade, SEV_TONE[n.severidade] || 'neutral') },
        { key: 'responsavel', label: 'Responsável', render: (n) => n.responsavel || '—' },
        { key: 'status', label: 'Status', render: (n) => statusBadge(n.status) },
      ],
      rows,
      onRowClick: (n) => { selId = n.id; drawDetail(); markRows(t, rows); },
      empty: 'Nenhuma NC com esses filtros.',
    });
    markRows(t, rows);
    tableBox.replaceChildren(t);
  }

  const ncView = () => h('div', { class: 'qa-ncs' },
    toolbar(
      select({ id: 'qa-origem', label: 'Origem', value: fOrigem,
        options: [{ value: '', label: 'Todas' }, ...Object.keys(ORIGEM).filter((o) => ncs.some((n) => n.origem === o)).map((o) => ({ value: o, label: ORIGEM[o] }))],
        onChange: (v) => { fOrigem = v?.target ? v.target.value : v; drawTable(); } }),
      select({ id: 'qa-sev', label: 'Severidade', value: fSev,
        options: [{ value: '', label: 'Todas' }, ...Object.keys(SEV).filter((o) => ncs.some((n) => n.severidade === o)).map((o) => ({ value: o, label: SEV[o] }))],
        onChange: (v) => { fSev = v?.target ? v.target.value : v; drawTable(); } }),
      select({ id: 'qa-status', label: 'Status', value: fStatus,
        options: [{ value: '', label: 'Todos' }, ...['aberta', 'em_analise', 'encerrada'].filter((o) => ncs.some((n) => n.status === o)).map((o) => ({ value: o, label: ({ aberta: 'Aberta', em_analise: 'Em análise', encerrada: 'Encerrada' })[o] }))],
        onChange: (v) => { fStatus = v?.target ? v.target.value : v; drawTable(); } }),
      searchInput({ id: 'qa-busca', placeholder: 'Buscar NC, produto ou responsável',
        onInput: (v) => { busca = v?.target ? v.target.value : v; drawTable(); } }),
    ),
    countLabel,
    tableBox,
  );

  void lineBy;
  drawTable();
  drawDetail();

  el.replaceChildren(h('div', { class: 'qa-page' },
    pageHeader({
      titulo: ctx.areaName('qualidade') || 'Qualidade',
      subtitulo: `Não conformidades e conferências · ${ctx.empresa} · ${fmt.date(ctx.today)}`,
    }),
    h('div', { class: 'qa-stats', role: 'group', 'aria-label': 'Resumo da qualidade' },
      stat('NCs abertas', fmt.num(abertas.length)),
      stat('Severidade alta', fmt.num(altas), altas ? 'danger' : 'ok'),
      stat('De clientes', fmt.num(deCliente), deCliente ? 'warn' : null),
    ),
    h('div', { class: 'qa-grid' },
      card({ titulo: 'Não conformidades', corpo: ncView(), class: 'qa-card' }),
      card({ titulo: 'Detalhe da NC', corpo: detailBox, class: 'qa-card' }),
    ),
    h('div', { class: 'qa-grid qa-grid-even' },
      card({ titulo: 'Rascunho de 8D', corpo: eightBox, class: 'qa-card' }),
      card({ titulo: 'Conferência de especificação', corpo: specCheck(ctx), class: 'qa-card' }),
    ),
    card({
      titulo: `Assistente de ${ctx.areaName('qualidade') || 'qualidade'}`,
      corpo: chatPanel({ ctx, modulo: 'qualidade', titulo: 'Assistente da qualidade' }),
      class: 'qa-card qa-chat',
    }),
  ));
}
