// Comercial e representantes: pedidos, estoque e preço, carteira por representante,
// preparação de visita, proposta validada pelas regras comerciais e simulação de WhatsApp.
import {
  h, icon, pageHeader, card, table, badge, statusBadge, refChip, tabs, emptyState, toolbar, select,
  searchInput, progress, phoneFrame, toast,
} from '../ui.js';
import { fmt, normalize } from '../format.js';
import { chatPanel } from '../ui/chat.js';

const val = (x) => (x && typeof x === 'object' && 'target' in x ? x.target.value : x ?? '');
const FECHADOS = new Set(['faturado', 'entregue']);
const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

/**
 * Lê a regra de desconto: "Até 5% sem aprovação; 5-8% com gerente regional; acima disso, diretoria."
 * → { livre: 5, teto: 8, aprovMeio: 'gerente regional', aprovAcima: 'diretoria' }.
 * Sem percentuais legíveis, assume 5% livre e 8% com gerente.
 */
export function lerRegraDesconto(regra) {
  const padrao = { livre: 5, teto: 8, aprovMeio: 'gerente comercial', aprovAcima: 'diretoria', lida: false };
  if (!regra?.texto) return padrao;
  const txt = regra.texto;
  const pcts = (c) => [...c.matchAll(/(\d+(?:[.,]\d+)?)\s*%/g)].map((m) => parseFloat(m[1].replace(',', '.')));
  const quem = (c) => {
    const m = c.match(/\bcom\s+(?:o|a|os|as)?\s*([^,;.]+)$/i) || c.match(/aprova[çc][ãa]o\s+d[aoe]s?\s+([^,;.]+)$/i);
    if (m) return m[1].trim();
    const resto = c.split(',').slice(1).join(',').trim();
    return resto.replace(/^(s[óo]\s+)?(com\s+)?(o|a)?\s*/i, '').trim() || null;
  };
  const clausulas = txt.split(/;|\.\s+|\.$/).map((c) => c.trim()).filter(Boolean);
  const livreC = clausulas.find((c) => /sem aprova|livre/i.test(c) && pcts(c).length) || clausulas.find((c) => pcts(c).length);
  if (!livreC) return padrao;
  const livre = pcts(livreC)[0];
  const acimaC = clausulas.find((c) => c !== livreC && /acima/i.test(c));
  const meioC = clausulas.find((c) => c !== livreC && c !== acimaC && /\bcom\b|aprova/i.test(c) && pcts(c).length);
  let teto = acimaC && pcts(acimaC).length ? pcts(acimaC)[0] : meioC ? Math.max(...pcts(meioC)) : NaN;
  if (!(teto > livre)) teto = Math.max(livre + 3, padrao.teto);
  return {
    livre,
    teto,
    aprovMeio: (meioC && quem(meioC)) || padrao.aprovMeio,
    aprovAcima: (acimaC && quem(acimaC)) || padrao.aprovAcima,
    lida: true,
  };
}

export function render(el, ctx) {
  const d = ctx.data || {};
  const pedidos = d.pedidos || [];
  const produtos = d.produtos || [];
  const clientes = d.clientes || [];
  const reps = d.representantes || [];
  const regras = d.regras_comerciais || [];
  const ordens = d.ordens || [];
  const today = ctx.today || fmt.TODAY;

  const T = (k) => (ctx.term ? ctx.term(k) : k);
  const cliente = (id) => clientes.find((c) => c.id === id);
  const rep = (id) => reps.find((r) => r.id === id);
  const produto = (sku) => produtos.find((p) => p.sku === sku);
  const ordem = (id) => ordens.find((o) => o.id === id);
  const totalPedido = (p) => (p.itens || []).reduce((s, i) => s + (i.quantidade || 0) * (i.preco_unit || 0), 0);
  const aberto = (p) => !FECHADOS.has(p.status);
  const atrasado = (p) => p.status === 'atrasado'
    || (aberto(p) && p.previsao_entrega && fmt.daysFromToday(p.previsao_entrega, today) < 0);
  const chip = (ref) => (ctx.resolveRef?.(ref) ? refChip(ref, ctx) : null);
  const chips = (refs) => h('div', { class: 'com-chips' }, refs.map(chip).filter(Boolean));

  // ---------- Resumo ----------
  const emAberto = pedidos.filter(aberto);
  const atrasados = pedidos.filter(atrasado);
  const valorAberto = emAberto.reduce((s, p) => s + totalPedido(p), 0);
  const meta = reps.reduce((s, r) => s + (r.meta_mes || 0), 0);
  const realizado = reps.reduce((s, r) => s + (r.realizado_mes || 0), 0);
  const pctMeta = meta ? (realizado / meta) * 100 : 0;
  const [ty, tm, td] = today.split('-').map(Number);
  const diasMes = new Date(Date.UTC(ty, tm, 0)).getUTCDate();
  const ritmo = (td / diasMes) * 100;
  const abaixoMin = produtos.filter((p) => p.estoque < p.estoque_minimo);

  const tile = (rotulo, valor, extra, tone) => h('div', { class: `com-tile${tone ? ` com-tile-${tone}` : ''}` },
    h('span', { class: 'com-tile-label' }, rotulo),
    h('span', { class: 'com-tile-value' }, valor),
    extra ? h('span', { class: 'com-tile-extra' }, extra) : null);

  const resumo = h('section', { class: 'com-summary', 'aria-label': 'Resumo comercial' },
    tile('Pedidos em aberto', fmt.num(emAberto.length), fmt.money(valorAberto, { compact: true })),
    tile('Atrasados', fmt.num(atrasados.length),
      atrasados.length ? h('span', { class: 'com-flag' }, icon('alert'), 'Precisa de retorno ao cliente') : 'Nenhum atraso',
      atrasados.length ? 'danger' : 'ok'),
    h('div', { class: 'com-tile com-tile-wide' },
      h('span', { class: 'com-tile-label' }, `Carteira do mês × meta dos ${T('representantes')}`),
      h('span', { class: 'com-tile-value' }, fmt.money(realizado, { compact: true }),
        h('small', null, ` de ${fmt.money(meta, { compact: true })}`)),
      progress(Math.min(100, pctMeta)),
      h('span', { class: 'com-tile-extra' },
        `${fmt.pct(pctMeta)} da meta · ${fmt.pct(ritmo, 0)} do mês decorrido`)),
    tile(`${cap(T('produtos'))} abaixo do mínimo`, fmt.num(abaixoMin.length),
      abaixoMin.length ? 'Confira antes de prometer prazo' : 'Estoque em dia', abaixoMin.length ? 'warn' : null),
  );

  // ---------- Pedidos ----------
  let pedStatus = '';
  let pedBusca = '';
  let pedSel = null;
  const pedTabela = h('div', { class: 'com-table-wrap' });
  const pedDetalhe = h('div', { class: 'com-detail', 'aria-live': 'polite' });
  const STATUS_PED = ['em_analise', 'aprovado', 'em_producao', 'atrasado', 'faturado', 'entregue'];
  const ROT_STATUS = {
    em_analise: 'Em análise', aprovado: 'Aprovado', em_producao: 'Em produção', atrasado: 'Atrasado',
    faturado: 'Faturado', entregue: 'Entregue',
  };

  function desenharPedidos() {
    const n = normalize(pedBusca);
    const rows = pedidos
      .filter((p) => !pedStatus || (pedStatus === 'aberto' ? aberto(p) : p.status === pedStatus))
      .filter((p) => !n || normalize(`${p.id} ${cliente(p.cliente)?.nome} ${rep(p.representante)?.nome}`).includes(n))
      .sort((a, b) => Number(atrasado(b)) - Number(atrasado(a)) || String(a.previsao_entrega).localeCompare(String(b.previsao_entrega)));
    pedTabela.replaceChildren(table({
      columns: [
        { key: 'id', label: 'Pedido', render: (p) => h('span', { class: 'com-strong' }, p.id) },
        { key: 'status', label: 'Status', render: (p) => statusBadge(p.status) },
        { key: 'cliente', label: cap(T('cliente')), render: (p) => cliente(p.cliente)?.nome || p.cliente },
        { key: 'representante', label: cap(T('representante')), render: (p) => rep(p.representante)?.nome || p.representante },
        {
          key: 'previsao_entrega',
          label: 'Previsão',
          render: (p) => h('span', { class: atrasado(p) ? 'com-late' : '' },
            atrasado(p) ? icon('clock') : null, fmt.date(p.previsao_entrega)),
        },
        { key: 'total', label: 'Total', align: 'right', render: (p) => h('span', { class: 'com-num' }, fmt.money(totalPedido(p))) },
      ],
      rows,
      onRowClick: (p) => {
        pedSel = p.id;
        desenharDetalhe();
        if (window.matchMedia?.('(max-width: 900px)').matches) pedDetalhe.scrollIntoView({ behavior: 'smooth', block: 'start' });
      },
      empty: 'Nenhum pedido com esse filtro.',
    }));
  }

  function desenharDetalhe() {
    const p = pedidos.find((x) => x.id === pedSel);
    if (!p) {
      pedDetalhe.replaceChildren(card({ titulo: 'Detalhe do pedido', corpo: emptyState('Escolha um pedido na lista para ver itens, OP ligada e observações.') }));
      return;
    }
    const op = p.ordem ? ordem(p.ordem) : null;
    const c = cliente(p.cliente);
    pedDetalhe.replaceChildren(card({
      titulo: `Pedido ${p.id}`,
      acoes: h('button', { type: 'button', class: 'btn btn--secondary btn--sm', onclick: () => ctx.openRef(`pedido:${p.id}`) },
        'Abrir registro', icon('external')),
      corpo: h('div', { class: 'com-detail-body' },
        h('div', { class: 'com-detail-head' }, statusBadge(p.status),
          atrasado(p) && p.status !== 'atrasado' ? badge('Previsão vencida', 'danger') : null),
        h('dl', { class: 'com-dl' },
          h('dt', null, cap(T('cliente'))), h('dd', null, c?.nome || p.cliente, c ? ` · ${c.cidade}/${c.uf}` : ''),
          h('dt', null, cap(T('representante'))), h('dd', null, rep(p.representante)?.nome || p.representante),
          h('dt', null, 'Emissão'), h('dd', null, fmt.date(p.data)),
          h('dt', null, 'Previsão de entrega'), h('dd', null, fmt.date(p.previsao_entrega), ` (${fmt.rel(p.previsao_entrega, today)})`),
        ),
        h('div', { class: 'com-table-wrap' },
          h('table', { class: 'com-mini-table' },
            h('thead', null, h('tr', null, h('th', null, cap(T('produto'))), h('th', { class: 'com-r' }, 'Qtd.'),
              h('th', { class: 'com-r' }, 'Preço un.'), h('th', { class: 'com-r' }, 'Subtotal'))),
            h('tbody', null, (p.itens || []).map((i) => h('tr', null,
              h('td', null, produto(i.sku)?.nome || i.sku, h('small', null, i.sku)),
              h('td', { class: 'com-r com-num' }, fmt.num(i.quantidade)),
              h('td', { class: 'com-r com-num' }, fmt.money(i.preco_unit)),
              h('td', { class: 'com-r com-num' }, fmt.money(i.quantidade * i.preco_unit))))),
            h('tfoot', null, h('tr', null, h('th', { colspan: '3' }, 'Total'),
              h('td', { class: 'com-r com-num com-strong' }, fmt.money(totalPedido(p))))))),
        op ? h('div', { class: 'com-op' },
          h('span', { class: 'com-op-label' }, `${T('ordem')} ligada`),
          chip(`op:${op.id}`) || h('span', null, op.id),
          statusBadge(op.status),
          op.progresso != null ? h('span', { class: 'com-op-prog' }, progress(op.progresso), h('small', { class: 'com-num' }, fmt.pct(op.progresso, 0))) : null,
          op.motivo_atraso ? h('p', { class: 'com-op-motivo' }, icon('alert'), ` ${op.motivo_atraso}`) : null)
          : p.ordem ? h('p', { class: 'com-muted' }, `${T('ordem')} ligada: ${p.ordem}`) : null,
        p.observacao ? h('p', { class: 'com-obs' }, h('strong', null, 'Observação: '), p.observacao) : null,
        chips([`cliente:${p.cliente}`, `rep:${p.representante}`]),
      ),
    }));
  }

  const abaPedidos = h('div', { class: 'com-split' },
    h('div', { class: 'com-split-main' },
      toolbar(
        searchInput({ id: 'com-ped-busca', placeholder: `Buscar pedido, ${T('cliente')} ou ${T('representante')}`, onInput: (v) => { pedBusca = String(val(v)); desenharPedidos(); } }),
        select({
          id: 'com-ped-status',
          label: 'Status',
          options: [{ value: '', label: 'Todos' }, { value: 'aberto', label: 'Em aberto' },
            ...STATUS_PED.filter((s) => pedidos.some((p) => p.status === s)).map((s) => ({ value: s, label: ROT_STATUS[s] }))],
          value: '',
          onChange: (v) => { pedStatus = val(v); desenharPedidos(); },
        }),
      ),
      pedTabela),
    pedDetalhe);

  // ---------- Estoque e preço ----------
  let estBusca = '';
  let estSoBaixo = false;
  const estTabela = h('div', { class: 'com-table-wrap' });
  function desenharEstoque() {
    const n = normalize(estBusca);
    const rows = produtos
      .filter((p) => !n || normalize(`${p.sku} ${p.nome} ${p.familia}`).includes(n))
      .filter((p) => !estSoBaixo || p.estoque < p.estoque_minimo)
      .sort((a, b) => (a.estoque / (a.estoque_minimo || 1)) - (b.estoque / (b.estoque_minimo || 1)));
    estTabela.replaceChildren(table({
      columns: [
        { key: 'nome', label: cap(T('produto')), render: (p) => h('span', { class: 'com-prod' }, p.nome, h('small', null, `${p.sku} · ${p.familia}`)) },
        {
          key: 'estoque',
          label: 'Estoque',
          align: 'right',
          render: (p) => h('span', { class: 'com-num' }, fmt.num(p.estoque), h('small', null, ` ${p.unidade || ''}`)),
        },
        { key: 'estoque_minimo', label: 'Mínimo', align: 'right', render: (p) => h('span', { class: 'com-num' }, fmt.num(p.estoque_minimo)) },
        {
          key: 'sit',
          label: 'Situação',
          render: (p) => (p.estoque < p.estoque_minimo
            ? h('span', { class: 'com-stock com-stock-low' }, icon('alert'), 'Abaixo do mínimo')
            : p.estoque < p.estoque_minimo * 1.2
              ? h('span', { class: 'com-stock com-stock-near' }, icon('clock'), 'Perto do mínimo')
              : h('span', { class: 'com-stock com-stock-ok' }, icon('check'), 'Disponível')),
        },
        { key: 'preco', label: 'Preço', align: 'right', render: (p) => h('span', { class: 'com-num' }, fmt.money(p.preco)) },
        { key: 'prazo_dias', label: 'Prazo', align: 'right', render: (p) => h('span', { class: 'com-num' }, `${p.prazo_dias} dias`) },
      ],
      rows,
      onRowClick: (p) => ctx.openRef(`sku:${p.sku}`),
      empty: `Nenhum ${T('produto')} encontrado.`,
    }));
  }
  const soBaixoId = 'com-est-baixo';
  const abaEstoque = h('div', { class: 'com-stack' },
    toolbar(
      searchInput({ id: 'com-est-busca', placeholder: `Buscar ${T('produto')} por nome, código ou família`, onInput: (v) => { estBusca = String(val(v)); desenharEstoque(); } }),
      h('label', { class: 'com-check', for: soBaixoId },
        h('input', { type: 'checkbox', id: soBaixoId, onchange: (e) => { estSoBaixo = e.target.checked; desenharEstoque(); } }),
        ' Só abaixo do mínimo'),
    ),
    estTabela);

  // ---------- Representantes ----------
  function abaReps() {
    return h('div', { class: 'com-rep-grid' }, reps.map((r) => {
      const pct = r.meta_mes ? (r.realizado_mes / r.meta_mes) * 100 : 0;
      const carteira = clientes.filter((c) => c.representante === r.id);
      const abertos = pedidos.filter((p) => p.representante === r.id && aberto(p));
      const atr = abertos.filter(atrasado).length;
      const situ = pct >= 100 ? ['Meta batida', 'ok', 'check']
        : pct >= ritmo ? ['No ritmo', 'ok', 'check']
          : pct >= ritmo * 0.8 ? ['Atenção', 'warn', 'clock'] : ['Abaixo do ritmo', 'danger', 'alert'];
      return h('article', { class: 'com-rep' },
        h('header', { class: 'com-rep-head' },
          h('div', null,
            h('button', { type: 'button', class: 'com-rep-name', onclick: () => ctx.openRef(`rep:${r.id}`) }, r.nome),
            h('p', { class: 'com-muted' }, r.regiao, r.telefone ? ` · ${r.telefone}` : '')),
          h('span', { class: `com-situ com-situ-${situ[1]}` }, icon(situ[2]), situ[0])),
        h('div', { class: 'com-rep-meta' },
          h('span', { class: 'com-num com-strong' }, fmt.money(r.realizado_mes, { compact: true })),
          h('span', { class: 'com-muted com-num' }, ` de ${fmt.money(r.meta_mes, { compact: true })} · ${fmt.pct(pct, 0)}`)),
        progress(Math.min(100, pct)),
        h('p', { class: 'com-rep-line' },
          `${abertos.length} pedido${abertos.length === 1 ? '' : 's'} em aberto`,
          atr ? h('span', { class: 'com-late' }, ` · ${atr} atrasado${atr > 1 ? 's' : ''}`) : null),
        h('div', { class: 'com-rep-clients' },
          h('span', { class: 'com-label' }, `${cap(T('clientes'))} da carteira (${carteira.length})`),
          carteira.length ? chips(carteira.map((c) => `cliente:${c.id}`)) : h('span', { class: 'com-muted' }, 'Sem clientes cadastrados')),
      );
    }));
  }

  // ---------- Preparar visita ----------
  let visitaCli = clientes[0]?.id || '';
  const briefingBox = h('div', { class: 'com-brief-wrap', 'aria-live': 'polite' });

  function briefing() {
    const c = cliente(visitaCli);
    if (!c) {
      briefingBox.replaceChildren(emptyState(`Escolha um ${T('cliente')} para montar o briefing.`));
      return;
    }
    const peds = pedidos.filter((p) => p.cliente === c.id).sort((a, b) => String(b.data).localeCompare(String(a.data)));
    const ultimo = peds[0];
    const abertosC = peds.filter(aberto);
    const valorAbertoC = abertosC.reduce((s, p) => s + totalPedido(p), 0);
    const usoLimite = c.limite_credito ? (valorAbertoC / c.limite_credito) * 100 : 0;
    const comprados = {};
    peds.forEach((p) => (p.itens || []).forEach((i) => { comprados[i.sku] = (comprados[i.sku] || 0) + i.quantidade; }));
    const skusComprados = Object.entries(comprados).sort((a, b) => b[1] - a[1]);
    const destaques = d.portal?.destaques || [];
    const oferecer = produtos
      .filter((p) => !comprados[p.sku] && p.estoque >= p.estoque_minimo)
      .sort((a, b) => Number(destaques.includes(b.sku)) - Number(destaques.includes(a.sku)) || b.estoque - a.estoque)
      .slice(0, 3);
    const r = rep(c.representante);

    const atencao = [];
    abertosC.filter(atrasado).forEach((p) => {
      const op = p.ordem ? ordem(p.ordem) : null;
      atencao.push(h('li', null, icon('alert'), ` Pedido ${p.id} atrasado (previsão ${fmt.date(p.previsao_entrega)})`,
        op?.motivo_atraso ? `: ${op.motivo_atraso.replace(/[.\s]+$/, '')}` : '', '. Leve a nova data.'));
    });
    if (usoLimite >= 80) {
      atencao.push(h('li', null, icon('alert'),
        ` Pedidos em aberto usam ${fmt.pct(usoLimite, 0)} do limite de crédito. Novo pedido pode precisar de liberação.`));
    }
    skusComprados.forEach(([sku]) => {
      const p = produto(sku);
      if (p && p.estoque < p.estoque_minimo) {
        atencao.push(h('li', null, icon('clock'),
          ` ${p.nome} está abaixo do mínimo (${fmt.num(p.estoque)} ${p.unidade || ''}). Prazo de reposição: ${p.prazo_dias} dias.`));
      }
    });
    const diasUltimo = c.ultimo_pedido ? -fmt.daysFromToday(c.ultimo_pedido, today) : null;

    const fontes = [`cliente:${c.id}`, ...(ultimo ? [`pedido:${ultimo.id}`] : []),
      ...abertosC.filter((p) => p !== ultimo).map((p) => `pedido:${p.id}`),
      ...regras.map((x) => `regra:${x.id}`)];

    const sec = (titulo, ...corpo) => h('section', { class: 'com-brief-sec' }, h('h4', null, titulo), ...corpo);
    const secLarga = (titulo, ...corpo) => h('section', { class: 'com-brief-sec com-brief-sec-wide' }, h('h4', null, titulo), ...corpo);

    briefingBox.replaceChildren(h('article', { class: 'com-brief' },
      h('header', { class: 'com-brief-head' },
        h('div', null,
          h('h3', null, c.nome),
          h('p', { class: 'com-muted' }, `${c.cidade}/${c.uf} · ${c.segmento}`, r ? ` · ${T('representante')}: ${r.nome}` : '')),
        badge('Gerado a partir do ERP', 'accent')),
      atencao.length ? h('div', { class: 'com-brief-alert', role: 'note' },
        h('strong', null, 'Pontos de atenção'), h('ul', null, atencao)) : null,
      h('div', { class: 'com-brief-grid' },
        sec('Último pedido', ultimo
          ? h('p', null, h('strong', null, ultimo.id), ` em ${fmt.date(ultimo.data)} · ${fmt.money(totalPedido(ultimo))} · `, statusBadge(ultimo.status))
          : h('p', { class: 'com-muted' }, 'Nenhum pedido registrado.'),
        diasUltimo != null ? h('p', { class: 'com-muted' }, `Última compra no ERP: ${fmt.date(c.ultimo_pedido)} (${fmt.rel(c.ultimo_pedido, today)}).`) : null),
        sec(`Pedidos em aberto (${abertosC.length})`, abertosC.length
          ? h('ul', { class: 'com-list' }, abertosC.map((p) => h('li', null,
            h('span', { class: 'com-strong' }, p.id), ' ', statusBadge(p.status),
            h('span', { class: atrasado(p) ? 'com-late' : 'com-muted' }, ` previsão ${fmt.date(p.previsao_entrega)}`))))
          : h('p', { class: 'com-muted' }, 'Nada em aberto.')),
        sec(`O que costuma comprar`, skusComprados.length
          ? h('ul', { class: 'com-list' }, skusComprados.slice(0, 5).map(([sku, q]) => h('li', null,
            produto(sku)?.nome || sku, h('span', { class: 'com-muted com-num' }, ` · ${fmt.num(q)} ${produto(sku)?.unidade || ''}`))))
          : h('p', { class: 'com-muted' }, 'Sem histórico de itens.')),
        sec('Condição comercial',
          h('dl', { class: 'com-dl' },
            h('dt', null, 'Pagamento'), h('dd', null, c.condicao_pagamento || '—'),
            h('dt', null, 'Tabela'), h('dd', null, c.tabela_preco || '—'),
            h('dt', null, 'Limite de crédito'), h('dd', { class: 'com-num' }, fmt.money(c.limite_credito)),
            h('dt', null, 'Em aberto'), h('dd', { class: 'com-num' }, `${fmt.money(valorAbertoC)} (${fmt.pct(usoLimite, 0)} do limite)`)),
          progress(Math.min(100, usoLimite))),
        sec(`Para oferecer (com estoque)`, oferecer.length
          ? h('ul', { class: 'com-list' }, oferecer.map((p) => h('li', null,
            p.nome, destaques.includes(p.sku) ? h('span', null, ' ', badge('Destaque', 'accent')) : null,
            h('span', { class: 'com-muted com-num' }, ` · ${fmt.money(p.preco)} · ${fmt.num(p.estoque)} ${p.unidade || ''} em estoque`))))
          : h('p', { class: 'com-muted' }, 'Nenhuma sugestão com estoque agora.')),
        secLarga('Regras comerciais aplicáveis', regras.length
          ? h('ul', { class: 'com-list com-rules' }, regras.map((x) => h('li', null,
            h('strong', null, x.titulo), h('span', null, ` ${x.texto}`))))
          : h('p', { class: 'com-muted' }, 'Sem regras cadastradas.')),
      ),
      h('footer', { class: 'com-brief-foot' }, h('span', { class: 'com-label' }, 'Fontes'), chips(fontes)),
    ));
  }

  const abaVisita = h('div', { class: 'com-stack' },
    toolbar(select({
      id: 'com-visita-cli',
      label: cap(T('cliente')),
      options: clientes.map((c) => ({ value: c.id, label: `${c.nome} (${c.cidade}/${c.uf})` })),
      value: visitaCli,
      onChange: (v) => { visitaCli = val(v); briefing(); },
    })),
    h('p', { class: 'com-hint' }, icon('sparkles'),
      ' Briefing montado com pedidos, cadastro e regras do ERP. Leve para a visita ou envie ao celular do representante.'),
    briefingBox);

  // ---------- Proposta ----------
  const regraDesc = regras.find((r) => /desconto/i.test(`${r.titulo} ${r.texto}`) && /%/.test(r.texto))
    || regras.find((r) => /desconto/i.test(`${r.titulo} ${r.texto}`));
  const lim = lerRegraDesconto(regraDesc);
  // Quantidade típica do produto = mediana das quantidades já pedidas (ou 1).
  const qtdTipica = (sku) => {
    const qs = pedidos.flatMap((p) => (p.itens || []).filter((i) => i.sku === sku).map((i) => i.quantidade)).sort((a, b) => a - b);
    return qs.length ? qs[Math.floor(qs.length / 2)] : 1;
  };
  const prop = { cli: clientes[0]?.id || '', sku: produtos[0]?.sku || '', qtd: 1, desc: 0 };
  prop.qtd = qtdTipica(prop.sku);
  const propOut = h('div', { class: 'com-prop-out', 'aria-live': 'polite' });

  function calcular() {
    const c = cliente(prop.cli);
    const p = produto(prop.sku);
    if (!c || !p) {
      propOut.replaceChildren(emptyState(`Escolha ${T('cliente')} e ${T('produto')}.`));
      return;
    }
    const qtd = Math.max(0, Number(prop.qtd) || 0);
    const desc = Math.min(100, Math.max(0, Number(prop.desc) || 0));
    const bruto = qtd * (p.preco || 0);
    const vDesc = bruto * (desc / 100);
    const total = bruto - vDesc;
    let status;
    if (desc <= lim.livre) status = { tone: 'ok', ic: 'check', txt: 'Dentro da regra', det: `Desconto até ${fmt.pct(lim.livre)} não precisa de aprovação.` };
    else if (desc <= lim.teto) status = { tone: 'warn', ic: 'clock', txt: `Precisa de aprovação de ${lim.aprovMeio}`, det: `Desconto entre ${fmt.pct(lim.livre)} e ${fmt.pct(lim.teto)}.` };
    else status = { tone: 'danger', ic: 'alert', txt: `Precisa de aprovação de ${lim.aprovAcima}`, det: `Desconto acima de ${fmt.pct(lim.teto)}.` };

    const abertoC = pedidos.filter((x) => x.cliente === c.id && aberto(x)).reduce((s, x) => s + totalPedido(x), 0);
    const estouraLimite = c.limite_credito && abertoC + total > c.limite_credito;
    const semEstoque = qtd > (p.estoque || 0);
    const outras = regras.filter((r) => r !== regraDesc);

    propOut.replaceChildren(...[
      h('div', { class: 'com-prop-totals' },
        h('dl', { class: 'com-dl com-dl-totals' },
          h('dt', null, 'Preço unitário'), h('dd', { class: 'com-num' }, fmt.money(p.preco), h('small', null, ` / ${p.unidade || T('unidade')}`)),
          h('dt', null, 'Valor bruto'), h('dd', { class: 'com-num' }, fmt.money(bruto)),
          h('dt', null, `Desconto (${fmt.pct(desc)})`), h('dd', { class: 'com-num' }, `− ${fmt.money(vDesc)}`),
          h('dt', { class: 'com-total-label' }, 'Total da proposta'), h('dd', { class: 'com-num com-total' }, fmt.money(total)),
          h('dt', null, 'Condição'), h('dd', null, c.condicao_pagamento || '—'),
          h('dt', null, 'Prazo'), h('dd', null, semEstoque
            ? `${p.prazo_dias} dias (produção; estoque atual ${fmt.num(p.estoque)})`
            : `Pronta entrega (${fmt.num(p.estoque)} em estoque)`)),
      ),
      h('div', { class: `com-verdict com-verdict-${status.tone}`, role: 'status' },
        h('span', { class: 'com-verdict-icon', 'aria-hidden': 'true' }, icon(status.ic)),
        h('div', null, h('strong', null, status.txt), h('p', null, status.det))),
      regraDesc ? h('blockquote', { class: 'com-rule-quote' },
        h('p', null, `“${regraDesc.texto}”`),
        h('footer', null, regraDesc.titulo, ' ', chip(`regra:${regraDesc.id}`)))
        : h('p', { class: 'com-muted' }, `Sem regra de desconto no pacote: assumido até ${lim.livre}% sem aprovação e até ${lim.teto}% com gerente.`),
      !lim.lida && regraDesc ? h('p', { class: 'com-muted' }, `Percentuais não encontrados no texto; assumido ${lim.livre}% livre e ${lim.teto}% com gerente.`) : null,
      estouraLimite ? h('p', { class: 'com-warn-line' }, icon('alert'),
        ` Com os pedidos em aberto (${fmt.money(abertoC)}), passa do limite de crédito de ${fmt.money(c.limite_credito)}.`) : null,
      outras.length ? h('details', { class: 'com-other-rules' },
        h('summary', null, `Outras regras para conferir (${outras.length})`),
        h('ul', { class: 'com-list' }, outras.map((r) => h('li', null, h('strong', null, r.titulo), ` ${r.texto} `, chip(`regra:${r.id}`))))) : null,
      h('div', { class: 'com-prop-actions' },
        h('button', {
          type: 'button',
          class: 'btn btn--primary',
          onclick: () => toast(status.tone === 'ok'
            ? 'Proposta pronta para enviar (demonstração).'
            : `Pedido de aprovação enviado para ${status.tone === 'warn' ? lim.aprovMeio : lim.aprovAcima} (demonstração).`),
        }, status.tone === 'ok' ? 'Gerar proposta' : 'Pedir aprovação')),
    ].filter(Boolean));
  }

  const numField = (id, label, value, attrs, onInput) => h('div', { class: 'com-field' },
    h('label', { for: id }, label),
    h('input', { id, type: 'number', inputmode: 'decimal', value: String(value), ...attrs, oninput: (e) => onInput(e.target.value) }));

  const abaProposta = h('div', { class: 'com-prop' },
    h('form', { class: 'com-prop-form', onsubmit: (e) => e.preventDefault(), 'aria-label': 'Montar proposta' },
      select({
        id: 'com-prop-cli', label: cap(T('cliente')),
        options: clientes.map((c) => ({ value: c.id, label: c.nome })), value: prop.cli,
        onChange: (v) => { prop.cli = val(v); calcular(); },
      }),
      select({
        id: 'com-prop-sku', label: cap(T('produto')),
        options: produtos.map((p) => ({ value: p.sku, label: `${p.nome} (${fmt.money(p.preco)})` })), value: prop.sku,
        onChange: (v) => {
          prop.sku = val(v);
          prop.qtd = qtdTipica(prop.sku);
          const q = abaProposta.querySelector('#com-prop-qtd');
          if (q) q.value = String(prop.qtd);
          calcular();
        },
      }),
      h('div', { class: 'com-prop-row' },
        numField('com-prop-qtd', `Quantidade (${T('unidade')})`, prop.qtd, { min: '1', step: '1' }, (v) => { prop.qtd = v; calcular(); }),
        numField('com-prop-desc', 'Desconto (%)', prop.desc, { min: '0', max: '100', step: '0.5' }, (v) => { prop.desc = v; calcular(); })),
      h('p', { class: 'com-hint' }, icon('sparkles'), ` Regra lida: até ${fmt.pct(lim.livre)} livre, até ${fmt.pct(lim.teto)} com ${lim.aprovMeio}, acima com ${lim.aprovAcima}.`)),
    propOut);

  // ---------- WhatsApp ----------
  function abaWhats() {
    let sugs = [];
    try { sugs = (ctx.assistant?.sugestoes?.('comercial') || []).slice(0, 4); } catch { sugs = []; }
    let painel;
    try {
      painel = chatPanel({
        ctx,
        modulo: 'comercial',
        variante: 'whatsapp',
        titulo: 'Assistente comercial',
        placeholder: 'Mensagem',
        inicial: d.conversa_whatsapp || [],
      });
    } catch (e) {
      painel = emptyState('Não foi possível abrir a conversa.');
      console.error(e);
    }
    return h('div', { class: 'com-wa' },
      h('figure', { class: 'com-wa-phone' },
        phoneFrame(painel),
        h('figcaption', { class: 'com-wa-caption' },
          'Simulação: o representante pergunta pelo WhatsApp e o assistente responde com dados do ERP.')),
      h('div', { class: 'com-wa-side' },
        card({
          titulo: 'Como funciona',
          corpo: h('ol', { class: 'com-steps' },
            h('li', null, `O ${T('representante')} manda a dúvida no WhatsApp, do jeito que falaria com o escritório.`),
            h('li', null, 'O assistente consulta estoque, preço, prazo e pedidos no ERP, só da carteira dele.'),
            h('li', null, 'A resposta sai em segundos e cita de onde veio cada número.'),
            h('li', null, 'Desconto fora da regra vira pedido de aprovação, não promessa.')),
        }),
        sugs.length ? card({
          titulo: 'Perguntas que chegam todo dia',
          corpo: h('ul', { class: 'com-list' }, sugs.map((s) => h('li', null, s))),
        }) : null));
  }

  // ---------- Montagem ----------
  desenharPedidos();
  desenharDetalhe();
  desenharEstoque();
  briefing();
  calcular();

  el.replaceChildren(
    pageHeader({
      titulo: ctx.areaName ? ctx.areaName('comercial') : 'Comercial e representantes',
      subtitulo: `Pedidos, estoque, carteira dos ${T('representantes')} e propostas dentro das regras, com dados do ERP.`,
    }),
    h('div', { class: 'com-page' },
      resumo,
      tabs([
        { id: 'pedidos', label: 'Pedidos', render: () => abaPedidos },
        { id: 'estoque', label: 'Estoque e preço', render: () => abaEstoque },
        { id: 'reps', label: cap(T('representantes')), render: abaReps },
        { id: 'visita', label: 'Preparar visita', render: () => abaVisita },
        { id: 'proposta', label: 'Proposta', render: () => abaProposta },
        { id: 'whatsapp', label: `WhatsApp do ${T('representante')}`, render: abaWhats },
      ], { initial: 'pedidos' }),
    ),
  );
}
