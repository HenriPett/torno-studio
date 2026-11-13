// Portal do cliente (PLANO §4, oferta "software sob medida").
// Simula a visão de UM cliente da indústria: pedidos dele, catálogo com preço e prazo,
// recompra num carrinho local (só nesta tela) e o assistente do cliente.

import { h, icon, badge, refChip, emptyState, select, searchInput, toast } from '../ui.js';
import { fmt, normalize } from '../format.js';
import { chatPanel } from '../ui/chat.js';

const ETAPAS = [
  { id: 'recebido', label: 'Recebido' },
  { id: 'aprovado', label: 'Aprovado' },
  { id: 'em_producao', label: 'Em produção' },
  { id: 'faturado', label: 'Faturado' },
  { id: 'entregue', label: 'Entregue' },
];
const ETAPA_DO_STATUS = { em_analise: 0, aprovado: 1, em_producao: 2, atrasado: 2, faturado: 3, entregue: 4 };

// Cliente escolhido em "Entrar como", por setor, só nesta sessão da página.
const escolhido = {};

function ensureCss() {
  if (document.querySelector('link[href*="mod-c.css"]')) return;
  const l = document.createElement('link');
  l.rel = 'stylesheet';
  l.href = new URL('../../css/mod-c.css', import.meta.url).href;
  document.head.appendChild(l);
}

function on(node, ev, fn) {
  node.addEventListener(ev, fn);
  return node;
}

function chip(ref, ctx) {
  try {
    return refChip(ref, ctx) || null;
  } catch {
    return null;
  }
}

function valorDe(v) {
  return v && typeof v === 'object' && 'target' in v ? v.target.value : v;
}

export function render(el, ctx) {
  ensureCss();
  const d = ctx.data;
  const clientes = d.clientes || [];
  const pedidos = d.pedidos || [];
  const produtos = d.produtos || [];
  const portal = d.portal || {};
  const porSku = new Map(produtos.map((p) => [p.sku, p]));
  const tCliente = ctx.term('cliente');
  const tProdutos = ctx.term('produtos');

  const pedidosDe = (cliId) =>
    pedidos.filter((p) => p.cliente === cliId).sort((a, b) => String(b.data).localeCompare(String(a.data)));

  if (!escolhido[ctx.sector.id] || !clientes.some((c) => c.id === escolhido[ctx.sector.id])) {
    const comAberto = clientes.find((c) => pedidosDe(c.id).some((p) => p.status !== 'entregue'));
    escolhido[ctx.sector.id] = (comAberto || clientes[0] || {}).id;
  }

  el.replaceChildren();
  el.classList.add('pt-root');

  if (!clientes.length) {
    el.append(emptyState(`Nenhum ${tCliente} nos dados deste setor.`));
    return;
  }

  // Faixa fixa: deixa claro que é a visão de fora da empresa.
  const faixa = h('div', { class: 'pt-faixa', role: 'note' },
    h('span', { class: 'pt-faixa-icone', 'aria-hidden': 'true' }, icon('store')),
    h('p', { class: 'pt-faixa-texto' },
      h('strong', {}, 'Visão do cliente: '),
      `é isto que cada ${tCliente} vê no portal, com a conexão feita pela ${ctx.empresa}.`),
  );

  const seletor = select({
    id: 'pt-entrar-como',
    label: 'Entrar como',
    options: clientes.map((c) => ({ value: c.id, label: `${c.nome} (${c.cidade}/${c.uf})` })),
    value: escolhido[ctx.sector.id],
    onChange: (v) => {
      const val = valorDe(v);
      if (!val || val === escolhido[ctx.sector.id]) return;
      escolhido[ctx.sector.id] = val;
      carrinho.clear();
      confirmacao = null;
      desenharLoja();
    },
  });
  const barra = h('div', { class: 'pt-barra' }, faixa, h('div', { class: 'pt-entrar' }, seletor));

  const loja = h('div', { class: 'pt-loja' });
  el.append(barra, loja);

  // Estado local da tela
  const carrinho = new Map(); // sku → quantidade
  let confirmacao = null;
  let busca = '';
  let familia = '';

  const cartBox = h('section', { class: 'pt-card pt-carrinho', 'aria-labelledby': 'pt-carrinho-titulo' });
  const catalogoLista = h('div', { class: 'pt-catalogo-grid' });

  function clienteAtual() {
    return clientes.find((c) => c.id === escolhido[ctx.sector.id]) || clientes[0];
  }

  function precoDe(sku, fallback) {
    const p = porSku.get(sku);
    return p && typeof p.preco === 'number' ? p.preco : fallback ?? 0;
  }

  function disponibilidade(p) {
    const ok = (p.estoque ?? 0) >= (p.estoque_minimo ?? 0) && (p.estoque ?? 0) > 0;
    return ok
      ? { ok: true, texto: 'Disponível', detalhe: `${fmt.num(p.estoque)} ${p.unidade || ctx.term('unidade')} em estoque` }
      : { ok: false, texto: `Sob encomenda em ${p.prazo_dias} dias`, detalhe: 'Produzido a partir do pedido' };
  }

  function adicionar(sku, qtd) {
    carrinho.set(sku, (carrinho.get(sku) || 0) + qtd);
    confirmacao = null;
    desenharCarrinho();
  }

  function repetirUltimo() {
    const ultimo = pedidosDe(clienteAtual().id)[0];
    if (!ultimo) return;
    carrinho.clear();
    for (const it of ultimo.itens || []) {
      if (porSku.has(it.sku)) carrinho.set(it.sku, (carrinho.get(it.sku) || 0) + it.quantidade);
    }
    confirmacao = null;
    desenharCarrinho();
    toast(`Carrinho montado com os itens do pedido ${ultimo.id}.`);
    cartBox.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'nearest' });
  }

  // ---------- Topo da loja ----------
  function hero(cli) {
    const rep = (d.representantes || []).find((r) => r.id === cli.representante);
    const ultimo = pedidosDe(cli.id)[0];
    const btnRepetir = on(
      h('button', { type: 'button', class: 'pt-btn pt-btn-primario' }, icon('box'), 'Repetir último pedido'),
      'click', repetirUltimo,
    );
    if (!ultimo) btnRepetir.disabled = true;

    return h('section', { class: 'pt-hero', 'aria-labelledby': 'pt-hero-titulo' },
      h('div', { class: 'pt-hero-marca' },
        h('span', { class: 'pt-hero-loja' }, ctx.empresa),
        h('span', { class: 'pt-hero-sep', 'aria-hidden': 'true' }, '·'),
        h('span', {}, portal.titulo || 'Portal do cliente'),
      ),
      h('h2', { id: 'pt-hero-titulo', class: 'pt-hero-titulo' }, `Olá, ${cli.nome}`),
      portal.boas_vindas ? h('p', { class: 'pt-hero-texto' }, portal.boas_vindas) : null,
      h('dl', { class: 'pt-conta' },
        h('div', {}, h('dt', {}, 'Sua tabela'), h('dd', {}, cli.tabela_preco || '—')),
        h('div', {}, h('dt', {}, 'Pagamento'), h('dd', {}, cli.condicao_pagamento || '—')),
        h('div', {}, h('dt', {}, 'Limite de crédito'), h('dd', { class: 'pt-num' }, fmt.money(cli.limite_credito))),
        h('div', {}, h('dt', {}, `Seu ${ctx.term('representante')}`),
          h('dd', {}, rep ? `${rep.nome} · ${rep.telefone}` : '—')),
      ),
      h('div', { class: 'pt-hero-acoes' },
        btnRepetir,
        ultimo ? h('span', { class: 'pt-muted' }, `Último pedido: ${ultimo.id}, ${fmt.date(ultimo.data)}`) : null,
      ),
    );
  }

  function avisos() {
    const lista = portal.avisos || [];
    if (!lista.length) return null;
    return h('section', { class: 'pt-avisos', 'aria-label': 'Avisos' },
      ...lista.map((a) => h('div', { class: 'pt-aviso' },
        h('span', { class: 'pt-aviso-icone', 'aria-hidden': 'true' }, icon('alert')),
        h('div', {}, h('strong', {}, a.titulo), h('p', {}, a.texto)),
      )),
    );
  }

  // ---------- Meus pedidos ----------
  function linhaDoTempo(ped) {
    const atual = ETAPA_DO_STATUS[ped.status] ?? 0;
    const atrasado = ped.status === 'atrasado';
    return h('ol', { class: 'pt-tempo', 'aria-label': `Andamento do pedido ${ped.id}` },
      ...ETAPAS.map((e, i) => {
        const estado = i < atual || (i === atual && ped.status === 'entregue')
          ? 'feito'
          : i === atual ? (atrasado ? 'atrasado' : 'atual') : 'futuro';
        const sr = { feito: 'concluído', atual: 'etapa atual', atrasado: 'etapa atual, atrasado', futuro: 'pendente' }[estado];
        return h('li', { class: `pt-etapa pt-etapa-${estado}`, 'aria-current': i === atual ? 'step' : null },
          h('span', { class: 'pt-etapa-marca', 'aria-hidden': 'true' },
            estado === 'feito' ? icon('check') : estado === 'atrasado' ? icon('alert') : null),
          h('span', { class: 'pt-etapa-nome' }, e.label),
          h('span', { class: 'pt-sr' }, `: ${sr}`),
        );
      }),
    );
  }

  function cartaoPedido(ped) {
    const total = (ped.itens || []).reduce((s, it) => s + it.quantidade * it.preco_unit, 0);
    const ordem = (d.ordens || []).find((o) => o.id === ped.ordem);
    const atrasado = ped.status === 'atrasado';
    const itens = (ped.itens || []).map((it) => {
      const p = porSku.get(it.sku);
      return h('li', {}, h('span', {}, p ? p.nome : it.sku),
        h('span', { class: 'pt-num pt-muted' }, `${fmt.num(it.quantidade)} ${p?.unidade || ''}`.trim()));
    });
    const abrir = on(h('button', { type: 'button', class: 'pt-link' }, ped.id), 'click', () => ctx.openRef(`pedido:${ped.id}`));
    return h('article', { class: `pt-pedido${atrasado ? ' pt-pedido-atrasado' : ''}` },
      h('header', { class: 'pt-pedido-topo' },
        h('div', {}, h('h4', { class: 'pt-pedido-id' }, abrir),
          h('span', { class: 'pt-muted' }, `Feito em ${fmt.date(ped.data)}`)),
        h('div', { class: 'pt-pedido-total' }, h('span', { class: 'pt-muted' }, 'Total'),
          h('strong', { class: 'pt-num' }, fmt.money(total))),
      ),
      linhaDoTempo(ped),
      atrasado
        ? h('p', { class: 'pt-atraso', role: 'status' },
            h('strong', {}, 'Atrasado. '),
            `Nova previsão de entrega: ${fmt.date(ped.previsao_entrega)}.`,
            ordem?.motivo_atraso ? ` Motivo: ${ordem.motivo_atraso}` : '')
        : ped.status !== 'entregue' && ped.previsao_entrega
          ? h('p', { class: 'pt-muted' }, `Previsão de entrega: ${fmt.date(ped.previsao_entrega)} (${fmt.rel(ped.previsao_entrega, ctx.today)})`)
          : null,
      h('ul', { class: 'pt-pedido-itens' }, ...itens),
      ped.observacao ? h('p', { class: 'pt-muted' }, ped.observacao) : null,
    );
  }

  function meusPedidos(cli) {
    const lista = pedidosDe(cli.id);
    const abertos = lista.filter((p) => p.status !== 'entregue');
    const entregues = lista.filter((p) => p.status === 'entregue');
    return h('section', { class: 'pt-card', 'aria-labelledby': 'pt-pedidos-titulo' },
      h('div', { class: 'pt-card-topo' },
        h('h3', { id: 'pt-pedidos-titulo' }, 'Meus pedidos'),
        h('span', { class: 'pt-muted' }, `${abertos.length} em aberto · ${entregues.length} entregue(s)`),
      ),
      lista.length
        ? h('div', { class: 'pt-pedidos' }, ...abertos.concat(entregues).map(cartaoPedido))
        : emptyState('Nenhum pedido registrado para esta conta.'),
    );
  }

  // ---------- Catálogo ----------
  function cartaoProduto(p, destaque) {
    const disp = disponibilidade(p);
    const qtdId = `pt-qtd-${p.sku}`;
    const qtd = h('input', { id: qtdId, class: 'pt-qtd', type: 'number', min: '1', step: '1', inputmode: 'numeric' });
    qtd.value = String(Math.max(1, Math.round((p.estoque_minimo || 100) / 10 / 10) * 10 || 10));
    const add = on(h('button', { type: 'button', class: 'pt-btn' }, icon('box'), 'Adicionar'), 'click', () => {
      const n = Math.max(1, Math.round(Number(qtd.value) || 0));
      adicionar(p.sku, n);
      toast(`${fmt.num(n)} × ${p.nome} no carrinho.`);
    });
    const nome = on(h('button', { type: 'button', class: 'pt-link pt-produto-nome' }, p.nome), 'click', () => ctx.openRef(`sku:${p.sku}`));
    return h('article', { class: `pt-produto${destaque ? ' pt-produto-destaque' : ''}` },
      destaque ? h('span', { class: 'pt-selo' }, icon('sparkles'), 'Destaque') : null,
      h('span', { class: 'pt-muted pt-sku' }, `${p.sku} · ${p.familia || ''}`),
      h('h4', {}, nome),
      p.descricao_comercial && destaque ? h('p', { class: 'pt-produto-desc' }, p.descricao_comercial) : null,
      h('div', { class: 'pt-preco' },
        h('strong', { class: 'pt-num' }, fmt.money(p.preco)),
        h('span', { class: 'pt-muted' }, ` por ${singular(p.unidade)}`)),
      h('div', { class: 'pt-disp' },
        badge(disp.texto, disp.ok ? 'ok' : 'warn'),
        h('span', { class: 'pt-muted' }, disp.ok ? disp.detalhe : `Prazo de produção: ${p.prazo_dias} dias`)),
      h('div', { class: 'pt-add' },
        h('label', { for: qtdId, class: 'pt-sr' }, `Quantidade de ${p.nome}`),
        qtd, add),
    );
  }

  function desenharCatalogo() {
    const q = normalize(busca);
    const destaques = new Set(portal.destaques || []);
    const lista = produtos
      .filter((p) => !familia || p.familia === familia)
      .filter((p) => !q || normalize(`${p.nome} ${p.sku} ${p.familia}`).includes(q))
      .sort((a, b) => Number(destaques.has(b.sku)) - Number(destaques.has(a.sku)));
    catalogoLista.replaceChildren(
      ...(lista.length ? lista.map((p) => cartaoProduto(p, destaques.has(p.sku))) : [emptyState('Nada encontrado com esse filtro.')]),
    );
  }

  function catalogo(cli) {
    const familias = [...new Set(produtos.map((p) => p.familia).filter(Boolean))];
    const filtros = h('div', { class: 'pt-filtros' },
      searchInput({ id: 'pt-busca', placeholder: `Buscar ${tProdutos} por nome ou código`, onInput: (v) => { busca = valorDe(v) || ''; desenharCatalogo(); } }),
      familias.length > 1
        ? select({
            id: 'pt-familia', label: 'Família',
            options: [{ value: '', label: 'Todas' }, ...familias.map((f) => ({ value: f, label: f }))],
            value: familia,
            onChange: (v) => { familia = valorDe(v) || ''; desenharCatalogo(); },
          })
        : null,
    );
    desenharCatalogo();
    return h('section', { class: 'pt-card', 'aria-labelledby': 'pt-cat-titulo' },
      h('div', { class: 'pt-card-topo' },
        h('h3', { id: 'pt-cat-titulo' }, `Catálogo de ${tProdutos}`),
        h('span', { class: 'pt-muted' }, `Preços da ${cli.tabela_preco || 'sua tabela'}, sem impostos`),
      ),
      filtros,
      catalogoLista,
    );
  }

  // ---------- Carrinho ----------
  function desenharCarrinho() {
    const cli = clienteAtual();
    const linhas = [...carrinho.entries()].map(([sku, qtd]) => ({ p: porSku.get(sku), sku, qtd, preco: precoDe(sku) }));
    const total = linhas.reduce((s, l) => s + l.qtd * l.preco, 0);
    const titulo = h('h3', { id: 'pt-carrinho-titulo' }, 'Carrinho');
    const nota = h('p', { class: 'pt-muted pt-pequeno' }, 'Só nesta tela: some ao trocar de conta ou sair.');

    if (confirmacao) {
      const limpar = on(h('button', { type: 'button', class: 'pt-btn' }, 'Montar outro pedido'), 'click', () => {
        carrinho.clear(); confirmacao = null; desenharCarrinho();
      });
      cartBox.replaceChildren(titulo,
        h('div', { class: 'pt-confirmacao', role: 'status' },
          h('span', { class: 'pt-confirmacao-icone', 'aria-hidden': 'true' }, icon('check')),
          h('div', {},
            h('strong', {}, 'Pedido de demonstração montado'),
            h('p', {}, `${confirmacao.itens} item(ns), total ${fmt.money(confirmacao.total)}. Nada foi enviado: esta é uma demonstração.`),
            h('p', { class: 'pt-muted' }, `Num portal real, o pedido entraria no ERP da ${ctx.empresa} para análise do comercial, e o ${ctx.term('representante')} seria avisado.`),
          ),
        ),
        limpar,
      );
      return;
    }

    if (!linhas.length) {
      const btn = on(h('button', { type: 'button', class: 'pt-btn' }, 'Repetir último pedido'), 'click', repetirUltimo);
      if (!pedidosDe(cli.id).length) btn.disabled = true;
      cartBox.replaceChildren(titulo, emptyState(`Carrinho vazio. Adicione ${tProdutos} do catálogo ou repita o último pedido.`), btn, nota);
      return;
    }

    const itens = h('ul', { class: 'pt-carrinho-itens' }, ...linhas.map((l) => {
      const id = `pt-cq-${l.sku}`;
      const inp = h('input', { id, class: 'pt-qtd', type: 'number', min: '1', step: '1', inputmode: 'numeric' });
      inp.value = String(l.qtd);
      on(inp, 'change', () => {
        const n = Math.max(1, Math.round(Number(inp.value) || 1));
        carrinho.set(l.sku, n);
        desenharCarrinho();
      });
      const rem = on(h('button', { type: 'button', class: 'pt-icone-btn', 'aria-label': `Remover ${l.p?.nome || l.sku}` }, icon('x')), 'click', () => {
        carrinho.delete(l.sku); desenharCarrinho();
      });
      return h('li', { class: 'pt-carrinho-item' },
        h('div', { class: 'pt-carrinho-nome' },
          h('span', {}, l.p?.nome || l.sku),
          h('span', { class: 'pt-muted pt-num' }, `${fmt.money(l.preco)} × ${fmt.num(l.qtd)} = ${fmt.money(l.preco * l.qtd)}`)),
        h('div', { class: 'pt-carrinho-ctrl' },
          h('label', { for: id, class: 'pt-sr' }, `Quantidade de ${l.p?.nome || l.sku}`), inp, rem),
      );
    }));

    const sobEncomenda = linhas.filter((l) => l.p && !disponibilidade(l.p).ok);
    const prazoMax = sobEncomenda.reduce((m, l) => Math.max(m, l.p.prazo_dias || 0), 0);
    const limite = cli.limite_credito;
    const acimaLimite = typeof limite === 'number' && total > limite;

    const enviar = on(h('button', { type: 'button', class: 'pt-btn pt-btn-primario pt-btn-largo' }, icon('send'), 'Enviar pedido'), 'click', () => {
      confirmacao = { itens: linhas.length, total };
      desenharCarrinho();
      toast('Demonstração: nenhum pedido foi enviado.');
    });

    cartBox.replaceChildren(titulo, itens,
      h('div', { class: 'pt-total' }, h('span', {}, 'Total'), h('strong', { class: 'pt-num' }, fmt.money(total))),
      h('p', { class: 'pt-muted pt-pequeno' }, `Pagamento ${cli.condicao_pagamento || 'a combinar'} · ${cli.tabela_preco || ''}`),
      sobEncomenda.length
        ? h('p', { class: 'pt-alerta-warn' }, `${sobEncomenda.length} item(ns) sob encomenda: entrega em até ${prazoMax} dias.`)
        : null,
      acimaLimite
        ? h('p', { class: 'pt-alerta-danger' }, `Total acima do seu limite de crédito (${fmt.money(limite)}): o pedido iria para aprovação.`)
        : null,
      enviar,
      nota,
    );
  }

  // ---------- Montagem ----------
  function desenharLoja() {
    const cli = clienteAtual();
    busca = '';
    familia = '';
    desenharCarrinho();
    let chat = null;
    try {
      chat = chatPanel({
        ctx,
        modulo: 'portal',
        titulo: `Assistente do ${tCliente}`,
        placeholder: 'Pergunte sobre prazo, estoque ou seus pedidos',
      });
    } catch (err) {
      console.error('portal: chatPanel indisponível', err);
    }
    loja.replaceChildren(
      hero(cli),
      avisos(),
      h('div', { class: 'pt-layout' },
        h('div', { class: 'pt-principal' }, meusPedidos(cli), catalogo(cli)),
        h('aside', { class: 'pt-lateral', 'aria-label': 'Carrinho e assistente' },
          cartBox,
          chat ? h('div', { class: 'pt-chat' }, chat) : null,
        ),
      ),
    );
  }

  desenharLoja();
}

function singular(unidade) {
  const u = String(unidade || 'unidade');
  const mapa = { 'peças': 'peça', 'unidades': 'unidade', 'caixas': 'caixa', 'metros': 'metro', 'rolos': 'rolo', 'fardos': 'fardo', 'conjuntos': 'conjunto', 'jogos': 'jogo' };
  return mapa[u] || u;
}
