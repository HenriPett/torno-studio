// Marketing e catálogo: catálogo com ficha do produto, conteúdos gerados com status de aprovação
// e respostas a clientes montadas só com dados aprovados da ficha.
import {
  h, icon, pageHeader, card, badge, statusBadge, refChip, tabs, emptyState, toolbar, select,
  searchInput, toast,
} from '../ui.js';
import { fmt, normalize } from '../format.js';
import { chatPanel } from '../ui/chat.js';

const val = (x) => (x && typeof x === 'object' && 'target' in x ? x.target.value : x ?? '');
const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

const TIPOS = {
  ficha_produto: 'Ficha de produto', conteudo_tecnico: 'Conteúdo técnico',
  resposta_cliente: 'Resposta a cliente', post: 'Post',
};
const STATUS = [
  { id: 'rascunho', label: 'Rascunho', ic: 'file' },
  { id: 'em_revisao', label: 'Em revisão', ic: 'clock' },
  { id: 'aprovado', label: 'Aprovado', ic: 'check' },
];
const DUVIDAS = [
  { id: 'spec', label: 'Composição e especificação' },
  { id: 'prazo', label: 'Prazo e disponibilidade' },
  { id: 'uso', label: 'Cuidados e uso' },
];
const RE_USO = /cuidad|uso|aplica|lavag|armazen|validade|conserva|temperat|instala|montag|manuten|limpeza|garantia|indica|carga|press/;

const spec = (e) => [e.nominal, e.unidade].filter(Boolean).join(' ') + (e.tolerancia ? ` (tolerância ${e.tolerancia}${e.unidade ? ` ${e.unidade}` : ''})` : '');

export function render(el, ctx) {
  const d = ctx.data || {};
  const produtos = d.produtos || [];
  const conteudos = d.marketing || [];
  const docs = d.documentos || [];
  const T = (k) => (ctx.term ? ctx.term(k) : k);
  const chip = (ref) => (ctx.resolveRef?.(ref) ? refChip(ref, ctx) : null);
  const chips = (refs) => h('div', { class: 'mkt-chips' }, [...new Set(refs)].map(chip).filter(Boolean));
  const familias = [...new Set(produtos.map((p) => p.familia).filter(Boolean))];

  // Documentos aprovados que falam do produto (ficha técnica, catálogo, norma).
  const docsDo = (p) => docs.filter((doc) => ['ficha_tecnica', 'catalogo', 'norma', 'manual'].includes(doc.tipo)
    && normalize(`${doc.titulo} ${(doc.trechos || []).map((t) => t.texto).join(' ')}`).includes(normalize(p.sku))).map((doc) => `doc:${doc.id}`);

  // ---------- Resumo ----------
  const cont = Object.fromEntries(STATUS.map((s) => [s.id, conteudos.filter((c) => c.status === s.id).length]));
  const resumo = h('section', { class: 'mkt-summary', 'aria-label': 'Resumo' },
    h('div', { class: 'mkt-tile' }, h('span', { class: 'mkt-tile-label' }, `${cap(T('produtos'))} no catálogo`),
      h('span', { class: 'mkt-tile-value' }, fmt.num(produtos.length)), h('span', { class: 'mkt-muted' }, `${familias.length} famílias`)),
    h('div', { class: 'mkt-tile mkt-tile-wide' }, h('span', { class: 'mkt-tile-label' }, 'Conteúdos gerados'),
      h('ol', { class: 'mkt-pipeline' }, STATUS.map((s) => h('li', { class: `mkt-pipe mkt-pipe-${s.id}` },
        icon(s.ic), h('span', null, s.label), h('strong', { class: 'mkt-num' }, fmt.num(cont[s.id]))))),
    ),
  );

  // ---------- Catálogo ----------
  let busca = '';
  let familia = '';
  let selSku = produtos[0]?.sku || null;
  const grade = h('div', { class: 'mkt-grid', role: 'list' });
  const ficha = h('div', { class: 'mkt-ficha-wrap', 'aria-live': 'polite' });

  function desenharGrade() {
    const n = normalize(busca);
    const lista = produtos.filter((p) => (!familia || p.familia === familia)
      && (!n || normalize(`${p.nome} ${p.sku} ${p.familia} ${Object.values(p.ficha?.atributos || {}).join(' ')}`).includes(n)));
    if (!lista.length) {
      grade.replaceChildren(emptyState(`Nenhum ${T('produto')} encontrado.`));
      return;
    }
    grade.replaceChildren(...lista.map((p) => {
      const attrs = Object.entries(p.ficha?.atributos || {}).slice(0, 3);
      const sel = p.sku === selSku;
      return h('div', { role: 'listitem', class: 'mkt-grid-item' },
        h('button', {
          type: 'button',
          class: `mkt-prod${sel ? ' is-selected' : ''}`,
          'aria-pressed': sel ? 'true' : 'false',
          onclick: () => {
            selSku = p.sku;
            desenharGrade();
            desenharFicha();
            if (window.matchMedia?.('(max-width: 900px)').matches) ficha.scrollIntoView({ behavior: 'smooth', block: 'start' });
          },
        },
        h('span', { class: 'mkt-prod-top' }, h('span', { class: 'mkt-fam' }, p.familia), h('span', { class: 'mkt-sku' }, p.sku)),
        h('span', { class: 'mkt-prod-name' }, p.nome),
        h('span', { class: 'mkt-prod-price' }, fmt.money(p.preco), h('small', null, ` / ${p.unidade || T('unidade')}`)),
        attrs.length ? h('dl', { class: 'mkt-attrs' }, attrs.map(([k, v]) => [h('dt', null, k), h('dd', null, v)])) : null));
    }));
  }

  function desenharFicha() {
    const p = produtos.find((x) => x.sku === selSku);
    if (!p) {
      ficha.replaceChildren(card({ titulo: 'Ficha do produto', corpo: emptyState(`Escolha um ${T('produto')} no catálogo.`) }));
      return;
    }
    const attrs = Object.entries(p.ficha?.atributos || {});
    const specs = p.ficha?.especificacoes || [];
    const rel = conteudos.filter((c) => c.sku === p.sku);
    const baixo = p.estoque < p.estoque_minimo;
    ficha.replaceChildren(card({
      titulo: p.nome,
      class: 'mkt-ficha',
      acoes: h('button', { type: 'button', class: 'btn btn--secondary btn--sm', onclick: () => ctx.openRef(`sku:${p.sku}`) }, 'Abrir registro', icon('external')),
      corpo: h('div', { class: 'mkt-ficha-body' },
        h('p', { class: 'mkt-muted' }, `${p.sku} · ${p.familia}`),
        h('p', { class: 'mkt-desc' }, p.descricao_comercial || 'Sem descrição comercial aprovada.'),
        h('div', { class: 'mkt-facts' },
          h('span', null, h('small', null, 'Preço'), h('strong', { class: 'mkt-num' }, fmt.money(p.preco))),
          h('span', null, h('small', null, 'Prazo'), h('strong', { class: 'mkt-num' }, `${p.prazo_dias} dias`)),
          h('span', null, h('small', null, 'Estoque'), h('strong', { class: `mkt-num${baixo ? ' mkt-low' : ''}` },
            baixo ? icon('alert') : null, fmt.num(p.estoque)))),
        attrs.length ? h('section', null, h('h4', null, 'Atributos'),
          h('dl', { class: 'mkt-dl' }, attrs.map(([k, v]) => [h('dt', null, k), h('dd', null, v)]))) : null,
        specs.length ? h('section', null, h('h4', null, 'Especificações'),
          h('div', { class: 'mkt-table-wrap' }, h('table', { class: 'mkt-table' },
            h('thead', null, h('tr', null, h('th', null, 'Característica'), h('th', null, 'Nominal'), h('th', null, 'Tolerância'), h('th', null, 'Unidade'))),
            h('tbody', null, specs.map((e) => h('tr', null, h('td', null, e.caracteristica), h('td', { class: 'mkt-num' }, e.nominal),
              h('td', { class: 'mkt-num' }, e.tolerancia || '—'), h('td', null, e.unidade || '—'))))))) : null,
        h('p', { class: 'mkt-note' }, icon('lock'), ' O roteiro de fabricação fica restrito à produção e não aparece no catálogo.'),
        rel.length ? h('section', null, h('h4', null, 'Conteúdos deste produto'),
          h('ul', { class: 'mkt-rel' }, rel.map((c) => h('li', null, c.titulo, ' ', statusBadge(c.status))))) : null,
        chips([`sku:${p.sku}`, ...docsDo(p)]),
      ),
    }));
  }

  const abaCatalogo = h('div', { class: 'mkt-catalog' },
    h('div', { class: 'mkt-catalog-main' },
      toolbar(
        searchInput({ id: 'mkt-busca', placeholder: `Buscar ${T('produto')}, código ou atributo`, onInput: (v) => { busca = String(val(v)); desenharGrade(); } }),
        select({
          id: 'mkt-fam', label: 'Família',
          options: [{ value: '', label: 'Todas' }, ...familias.map((f) => ({ value: f, label: f }))], value: '',
          onChange: (v) => { familia = val(v); desenharGrade(); },
        })),
      grade),
    ficha);

  // ---------- Conteúdos gerados ----------
  let filtroStatus = '';
  const listaConteudos = h('div', { class: 'mkt-contents' });
  const filtroBtns = h('div', { class: 'mkt-seg', role: 'group', 'aria-label': 'Filtrar por status' });

  function desenharFiltro() {
    filtroBtns.replaceChildren(...[{ id: '', label: 'Todos' }, ...STATUS].map((s) => h('button', {
      type: 'button',
      class: 'mkt-seg-btn',
      'aria-pressed': filtroStatus === s.id ? 'true' : 'false',
      onclick: () => { filtroStatus = s.id; desenharFiltro(); desenharConteudos(); },
    }, s.label, s.id ? h('span', { class: 'mkt-num' }, ` ${cont[s.id]}`) : null)));
  }

  function textoExpansivel(texto) {
    const p = h('p', { class: 'mkt-content-text mkt-clamp' }, texto);
    if (String(texto || '').length < 180) {
      p.classList.remove('mkt-clamp');
      return p;
    }
    const btn = h('button', {
      type: 'button', class: 'mkt-more', 'aria-expanded': 'false',
      onclick: () => {
        const aberto = p.classList.toggle('mkt-clamp') === false;
        btn.setAttribute('aria-expanded', aberto ? 'true' : 'false');
        btn.textContent = aberto ? 'Mostrar menos' : 'Ler tudo';
      },
    }, 'Ler tudo');
    return h('div', null, p, btn);
  }

  function desenharConteudos() {
    const lista = conteudos.filter((c) => !filtroStatus || c.status === filtroStatus);
    if (!lista.length) {
      listaConteudos.replaceChildren(emptyState('Nenhum conteúdo com esse status.'));
      return;
    }
    listaConteudos.replaceChildren(...lista.map((c) => {
      const p = produtos.find((x) => x.sku === c.sku);
      const st = STATUS.find((s) => s.id === c.status);
      return h('article', { class: 'mkt-content' },
        h('header', { class: 'mkt-content-head' },
          badge(TIPOS[c.tipo] || c.tipo, 'neutral'),
          h('span', { class: `mkt-st mkt-st-${c.status}` }, st ? icon(st.ic) : null, st?.label || c.status)),
        h('h4', { class: 'mkt-content-title' }, c.titulo),
        p ? h('p', { class: 'mkt-muted' }, `${cap(T('produto'))}: ${p.nome}`) : null,
        textoExpansivel(c.texto),
        h('footer', { class: 'mkt-content-foot' }, h('span', { class: 'mkt-label' }, 'Gerado a partir de'), chips(c.fontes || [])));
    }));
  }

  const abaConteudos = h('div', { class: 'mkt-stack' },
    h('div', { class: 'mkt-banner', role: 'note' }, icon('shield-check'),
      h('p', null, h('strong', null, 'Tudo sai de dados aprovados. '),
        'Os textos usam só a descrição comercial, a ficha técnica e as especificações já liberadas. Nada é publicado sem passar por revisão.')),
    filtroBtns,
    listaConteudos);

  // ---------- Responder cliente ----------
  let respSku = produtos[0]?.sku || '';
  let respTipo = 'spec';
  const respOut = h('div', { class: 'mkt-answer-wrap', 'aria-live': 'polite' });
  const tipoBtns = h('div', { class: 'mkt-seg', role: 'group', 'aria-label': 'Tipo de dúvida' });

  function gerarResposta(p, tipo) {
    const attrs = Object.entries(p.ficha?.atributos || {});
    const specs = p.ficha?.especificacoes || [];
    const partes = [];
    if (tipo === 'spec') {
      partes.push(`Olá! Sobre o ${p.nome} (código ${p.sku}):`);
      if (attrs.length) partes.push(attrs.map(([k, v]) => `${k}: ${v}`).join('; ') + '.');
      if (specs.length) partes.push(`Controlamos na produção: ${specs.map((e) => `${e.caracteristica.toLowerCase()} ${spec(e)}`).join('; ')}.`);
      if (!attrs.length && !specs.length) partes.push('A ficha técnica ainda não tem atributos liberados; vou confirmar com a engenharia.');
      partes.push('Posso enviar a ficha técnica completa, se quiser.');
    } else if (tipo === 'prazo') {
      const baixo = p.estoque < p.estoque_minimo;
      partes.push(`Olá! O ${p.nome} (${p.sku}) tem prazo padrão de ${p.prazo_dias} dias.`);
      partes.push(baixo
        ? `No momento o estoque está baixo (${fmt.num(p.estoque)} ${p.unidade || T('unidade')}), então para volumes maiores conte com o prazo de produção.`
        : `Hoje temos ${fmt.num(p.estoque)} ${p.unidade || T('unidade')} em estoque, então quantidades menores podem sair antes.`);
      partes.push(`Preço de tabela: ${fmt.money(p.preco)} por ${p.unidade || T('unidade')}. Condições e desconto, o seu ${T('representante')} confirma.`);
    } else {
      partes.push(`Olá! Sobre cuidados e uso do ${p.nome} (${p.sku}):`);
      if (p.descricao_comercial) partes.push(p.descricao_comercial);
      const uso = [...attrs.filter(([k, v]) => RE_USO.test(normalize(`${k} ${v}`))).map(([k, v]) => `${k}: ${v}`),
        ...specs.filter((e) => RE_USO.test(normalize(e.caracteristica))).map((e) => `${e.caracteristica}: ${spec(e)}`)];
      partes.push(uso.length
        ? `Pela ficha técnica: ${uso.join('; ')}.`
        : 'A ficha técnica não traz instruções específicas de cuidado; vou confirmar com a qualidade antes de responder em detalhe.');
    }
    return partes.join(' ');
  }

  function desenharTipos() {
    tipoBtns.replaceChildren(...DUVIDAS.map((t) => h('button', {
      type: 'button', class: 'mkt-seg-btn', 'aria-pressed': respTipo === t.id ? 'true' : 'false',
      onclick: () => { respTipo = t.id; desenharTipos(); responder(); },
    }, t.label)));
  }

  function responder() {
    const p = produtos.find((x) => x.sku === respSku);
    if (!p) {
      respOut.replaceChildren(emptyState(`Escolha um ${T('produto')}.`));
      return;
    }
    const texto = gerarResposta(p, respTipo);
    const fontes = [`sku:${p.sku}`, ...docsDo(p), ...conteudos.filter((c) => c.sku === p.sku && c.status === 'aprovado').flatMap((c) => c.fontes || [])];
    respOut.replaceChildren(h('article', { class: 'mkt-answer' },
      h('header', { class: 'mkt-answer-head' }, icon('sparkles'), h('strong', null, 'Resposta sugerida'),
        badge('Só dados aprovados', 'ok')),
      h('p', { class: 'mkt-answer-text' }, texto),
      h('footer', { class: 'mkt-content-foot' },
        h('span', { class: 'mkt-label' }, 'Fontes'), chips(fontes),
        h('button', {
          type: 'button', class: 'btn btn--secondary',
          onclick: async () => {
            try { await navigator.clipboard.writeText(texto); toast('Resposta copiada.'); } catch { toast('Não foi possível copiar; selecione o texto.'); }
          },
        }, 'Copiar resposta'))));
  }

  const abaResponder = h('div', { class: 'mkt-stack' },
    h('div', { class: 'mkt-respond-form' },
      select({
        id: 'mkt-resp-sku', label: cap(T('produto')),
        options: produtos.map((p) => ({ value: p.sku, label: `${p.nome} (${p.sku})` })), value: respSku,
        onChange: (v) => { respSku = val(v); responder(); },
      }),
      h('div', { class: 'mkt-field' }, h('span', { class: 'mkt-label', id: 'mkt-tipo-l' }, 'Dúvida do cliente'), tipoBtns)),
    respOut);

  // ---------- Montagem ----------
  desenharGrade();
  desenharFicha();
  desenharFiltro();
  desenharConteudos();
  desenharTipos();
  responder();

  el.replaceChildren(
    pageHeader({
      titulo: ctx.areaName ? ctx.areaName('marketing') : 'Marketing e catálogo',
      subtitulo: 'Catálogo com ficha técnica, conteúdos para aprovação e respostas a clientes com dados que já foram aprovados.',
    }),
    h('div', { class: 'mkt-page' },
      resumo,
      tabs([
        { id: 'catalogo', label: 'Catálogo', render: () => abaCatalogo },
        { id: 'conteudos', label: 'Conteúdos gerados', render: () => abaConteudos },
        { id: 'responder', label: 'Responder cliente', render: () => abaResponder },
        {
          id: 'perguntar',
          label: 'Perguntar',
          render: () => chatPanel({ ctx, modulo: 'marketing', titulo: 'Assistente de marketing', placeholder: 'Pergunte sobre produtos, fichas e conteúdos…' }),
        },
      ], { initial: 'catalogo' })),
  );
}
