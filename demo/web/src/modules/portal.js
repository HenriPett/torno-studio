// Portal do cliente (UX §4.9): prova de "software sob medida", numa moldura de janela para não
// confundir com a ferramenta interna. Troca de {cliente}, saudação, condições, um aviso, pedidos
// dele, "Repetir último pedido" (rascunho, sem carrinho), catálogo com o preço da tabela e o
// assistente do {cliente} (a conversa via ctx.perguntar, módulo portal). O cliente escolhido vai no
// corpo da conversa (definirClientePortal → campo `cliente`, gravado em cada mensagem) e o servidor
// responde só com os dados dele. Preço do catálogo: o da tabela do cliente (precoNaTabela).
import { h } from '../ui.js';
import { definirClientePortal } from '../ai/assistant.js';
import { clientePadraoDoPortal, precoNaTabela } from '../ai/local-engine.js';
import * as ui from '../ui.js';
import {
  ensureAreaCss, statusBadge, areaAssistant, T, cap, fmtOf, curto, tag,
} from '../ui/area-page.js';

const escolhido = {}; // cliente escolhido por setor, nesta sessão

function slug(nome) {
  return String(nome || 'empresa').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
    .replace(/\b(s\.?a\.?|ltda\.?|eireli|me|industria|industrias|comercio)\b/g, '')
    .replace(/[^a-z0-9]+/g, '').slice(0, 24) || 'empresa';
}

const singular = (u) => ({
  'peças': 'peça', unidades: 'unidade', caixas: 'caixa', metros: 'metro', rolos: 'rolo', fardos: 'fardo',
  conjuntos: 'conjunto', jogos: 'jogo', milheiros: 'milheiro',
}[String(u || '')] || u || 'unidade');

export function render(el, ctx) {
  ensureAreaCss();
  const f = fmtOf(ctx);
  const d = ctx.data || {};
  const clientes = d.clientes || [];
  const pedidos = d.pedidos || [];
  const produtos = d.produtos || [];
  const portal = d.portal || {};
  const empresa = ctx.empresa || d.empresa?.nome || 'a empresa';
  const setorId = ctx.sector?.id || ctx.demo?.setor || d.id || 'x';
  const tCli = T(ctx, 'cliente');
  const pedidosDe = (id) => pedidos.filter((p) => p.cliente === id).sort((a, b) => String(b.data).localeCompare(String(a.data)));

  if (!clientes.length) {
    el.replaceChildren(h('div', { class: 'ar-page' }, h('p', { class: 'ar-empty' }, `Nenhum ${tCli} nos dados desta demonstração.`)));
    return undefined;
  }
  if (!clientes.some((c) => c.id === escolhido[setorId])) escolhido[setorId] = clientePadraoDoPortal(d) || clientes[0].id;

  const host = h('div', { class: 'pt-host' });
  const seletor = h('select', { class: 'pt-select', id: 'pt-cliente', 'aria-label': `Ver como ${tCli}` },
    clientes.map((c) => h('option', { value: c.id, selected: c.id === escolhido[setorId] || null }, curto(c.nome))));
  seletor.value = escolhido[setorId];
  seletor.addEventListener('change', () => { escolhido[setorId] = seletor.value; desenha(); });

  function desenha() {
    const cli = clientes.find((c) => c.id === escolhido[setorId]) || clientes[0];
    definirClientePortal(cli.id);
    const rep = (d.representantes || []).find((r) => r.id === cli.representante);
    const meus = pedidosDe(cli.id);
    const ultimo = meus[0];
    const nomeCli = curto(cli.nome);
    const aviso = (portal.avisos || [])[0];

    // Repetir último pedido: confirmação inline, sem carrinho
    const confirma = h('p', { class: 'pt-confirm', role: 'status', hidden: true });
    const repetir = ui.button('Repetir último pedido', {
      variant: 'primary', icone: 'refresh', disabled: !ultimo,
      onClick: () => {
        confirma.hidden = false;
        confirma.textContent = 'Pedido de recompra criado como rascunho. O representante confirma o prazo.';
        repetir.disabled = true;
      },
    });

    const linhaPedido = (p) => h('li', null, h('button', {
      type: 'button', class: 'pt-ped', onClick: () => ctx.openRef?.(`pedido:${p.id}`),
    },
    h('strong', { class: 'ar-id' }, p.id),
    statusBadge(p.status),
    h('span', { class: `pt-ped__prev num${p.status === 'atrasado' ? ' ar-late' : ''}` },
      ['entregue', 'faturado'].includes(p.status) ? f.date(p.data) : `previsão ${f.date(p.previsao_entrega)}`)));

    const destaques = new Set(portal.destaques || []);
    const catalogo = [...produtos].sort((a, b) => Number(destaques.has(b.sku)) - Number(destaques.has(a.sku))).slice(0, 6);
    const tabelaConhecida = !!produtos[0] && precoNaTabela(ctx, produtos[0], cli).conhecida;
    const cartao = (p) => {
      const pronta = p.estoque >= p.estoque_minimo && p.estoque > 0;
      return h('button', { type: 'button', class: 'pt-prod', onClick: () => ctx.openRef?.(`sku:${p.sku}`) },
        h('span', { class: 'pt-prod__sku' }, p.sku),
        h('span', { class: 'pt-prod__nome' }, p.nome),
        h('span', { class: 'pt-prod__preco num' }, f.money(precoNaTabela(ctx, p, cli).preco), h('span', { class: 'pt-prod__un' }, ` / ${singular(p.unidade)}`)),
        pronta ? tag('Pronta entrega', 'ok') : h('span', { class: 'pt-prod__prazo' }, `Prazo ${p.prazo_dias} dias`));
    };

    // Pergunte (desktop: coluna; celular: barra recolhida como nas áreas). Só sugestões que falam de
    // registros deste cliente (a pergunta pronta de outro cliente não teria resposta aqui).
    const meusIds = new Set([`cliente:${cli.id}`, ...meus.map((p) => `pedido:${p.id}`), ...meus.filter((p) => p.ordem).map((p) => `op:${p.ordem}`)]);
    const doCliente = (p) => (p.fontes || []).every((r) => !/^(pedido|cliente|op):/.test(r) || meusIds.has(r));
    const sugestoes = [
      ...(d.perguntas_sugeridas || []).filter((p) => p.modulo === 'portal' && doCliente(p)).map((p) => p.pergunta),
      ultimo ? `Quando chega o meu pedido ${ultimo.id}?` : null,
    ].filter(Boolean).slice(0, 3);
    const podePerguntar = typeof ctx.perguntar === 'function';
    const enviar = (t) => {
      const q = String(t || '').trim();
      if (q && podePerguntar) ctx.perguntar(q, { modulo: 'portal', painel: true });
    };
    const campo = h('input', { type: 'text', class: 'pt-ask__input', placeholder: 'Quando chega meu pedido?', 'aria-label': 'Pergunte ao portal', autocomplete: 'off' });
    const pergunte = podePerguntar ? h('section', { class: 'pt-ask', 'aria-label': 'Pergunte' },
      h('h3', { class: 'pt-h3' }, 'Pergunte'),
      h('form', { class: 'pt-ask__form', onSubmit: (e) => { e.preventDefault(); enviar(campo.value); campo.value = ''; } },
        campo, h('button', { type: 'submit', class: 'pt-ask__send', 'aria-label': 'Enviar pergunta' }, ui.icon('arrow-up', { size: 18 }))),
      h('div', { class: 'pt-ask__sug' }, sugestoes.map((s) => h('button', { type: 'button', class: 'ar-assist__chip', title: s, onClick: () => enviar(s) }, s)))) : null;

    const janela = h('div', { class: 'pt-window' },
      h('div', { class: 'pt-window__bar', 'aria-hidden': 'true' },
        h('span', { class: 'pt-window__dots' }, h('i'), h('i'), h('i')),
        h('span', { class: 'pt-window__url' }, `portal.${slug(empresa)}.com.br`)),
      h('p', { class: 'pt-window__mlabel' }, `Visão do ${tCli}`),
      h('div', { class: 'pt-app' },
        h('p', { class: 'pt-app__brand' }, `${empresa} · ${portal.titulo || 'Portal do cliente'}`),
        h('h2', { class: 'pt-app__hello' }, `Olá, ${nomeCli}`),
        h('p', { class: 'pt-app__cond' }, [cli.tabela_preco, cli.condicao_pagamento, rep ? `${cap(T(ctx, 'representante'))}: ${rep.nome}` : null].filter(Boolean).join(' · ')),
        aviso ? h('p', { class: 'pt-aviso' }, h('strong', null, `${aviso.titulo}: `), aviso.texto) : null,
        h('div', { class: 'pt-repetir' }, repetir,
          ultimo ? h('span', { class: 'pt-muted' }, `Último: ${ultimo.id}, ${f.date(ultimo.data)}`) : null),
        confirma,
        h('div', { class: 'pt-cols' },
          h('section', { class: 'pt-pedidos', 'aria-label': 'Seus pedidos' },
            h('h3', { class: 'pt-h3' }, 'Seus pedidos'),
            meus.length ? h('ul', { class: 'pt-peds' }, meus.slice(0, 5).map(linhaPedido)) : h('p', { class: 'pt-muted' }, 'Nenhum pedido ainda.')),
          pergunte),
        h('section', { class: 'pt-catalogo', 'aria-label': 'Catálogo' },
          h('h3', { class: 'pt-h3' }, `Catálogo (${catalogo.length})`),
          h('p', { class: 'pt-muted' }, tabelaConhecida || !cli.tabela_preco
            ? `Preços da ${cli.tabela_preco || 'sua tabela'}, sem impostos.`
            : `Preços de referência, sem impostos; os da ${cli.tabela_preco} vêm na proposta do ${T(ctx, 'representante')}.`),
          h('div', { class: 'pt-prods' }, catalogo.map(cartao)))));

    host.replaceChildren(janela,
      areaAssistant(ctx, { modulo: 'portal', nome: 'pedidos e catálogo', sugestoes }));
    const bar = host.querySelector('.ar-assist');
    if (bar) bar.classList.add('pt-assist-m');
  }

  desenha();
  el.replaceChildren(h('div', { class: 'ar-page pt-page' },
    h('header', { class: 'ar-head' },
      h('div', { class: 'ar-head__text' },
        h('h1', { class: 'ar-title' }, 'Portal do cliente'),
        h('p', { class: 'ar-sub' }, `Software sob medida: o que cada ${tCli} vê, ligado ao mesmo ERP.`)),
      h('label', { class: 'pt-vercomo' }, h('span', null, 'Ver como'), seletor)),
    host));
  return undefined;
}
