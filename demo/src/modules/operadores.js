// Conhecimento de operadores: o saber de quem tem anos de casa, registrado, validado e consultável,
// com trilha de leitura para quem chega e um formulário de demonstração para registrar um saber.
import {
  h, icon, pageHeader, card, badge, refChip, tabs, emptyState, toolbar, select, searchInput, progress, toast,
} from '../ui.js';
import { fmt, normalize } from '../format.js';
import { chatPanel } from '../ui/chat.js';

const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);
let seq = 0;

export function render(el, ctx) {
  const d = ctx.data || {};
  const saberes = d.saberes || [];
  const maquinas = d.maquinas || [];
  const linhas = d.linhas || [];
  const T = (k) => (ctx.term ? ctx.term(k) : k);
  const maq = (id) => maquinas.find((m) => m.id === id);
  const linhaDe = (maqId) => maq(maqId)?.linha || null;
  const chip = (ref) => (ctx.resolveRef?.(ref) ? refChip(ref, ctx) : null);
  const maqNome = (id) => (id ? maq(id)?.nome || id : 'Geral');

  // Registros desta sessão (demonstração: somem ao sair da tela).
  const novos = [];
  const todos = () => [...novos, ...saberes];

  // ---------- Números ----------
  const autores = new Map();
  saberes.forEach((s) => { if (!autores.has(s.autor)) autores.set(s.autor, s.tempo_casa_anos || 0); });
  const mediaAnos = autores.size ? [...autores.values()].reduce((a, b) => a + b, 0) / autores.size : 0;
  const validados = saberes.filter((s) => s.validado_por).length;
  const somaAnos = [...autores.values()].reduce((a, b) => a + b, 0);

  const stat = (rotulo, valor, extra) => h('div', { class: 'op-stat' },
    h('span', { class: 'op-stat-label' }, rotulo), h('span', { class: 'op-stat-value' }, valor),
    extra ? h('span', { class: 'op-stat-extra' }, extra) : null);

  const numeros = h('section', { class: 'op-stats', 'aria-label': 'Números do conhecimento registrado' },
    stat('Saberes registrados', fmt.num(saberes.length)),
    stat('Autores', fmt.num(autores.size), somaAnos ? `${fmt.num(somaAnos)} anos de casa somados` : null),
    stat('Média de anos de casa', fmt.num(mediaAnos, 1), 'por autor'),
    stat('Validados', `${fmt.num(validados)} de ${fmt.num(saberes.length)}`,
      progress(saberes.length ? (validados / saberes.length) * 100 : 0, { label: 'Saberes validados' })),
  );

  // ---------- Cartão de saber ----------
  function cartao(s, { numero, lido, onLido } = {}) {
    const pendente = !s.validado_por;
    const maqRef = s.maquina ? chip(`maq:${s.maquina}`) : null;
    return h('article', { class: `op-card${pendente ? ' is-pending' : ''}${lido ? ' is-read' : ''}` },
      h('header', { class: 'op-card-head' },
        numero != null ? h('span', { class: 'op-step', 'aria-hidden': 'true' }, String(numero)) : null,
        h('div', { class: 'op-card-title' },
          s._demo
            ? h('h4', null, s.titulo || 'Saber sem título')
            : h('h4', null, h('button', { type: 'button', class: 'op-title-btn', onclick: () => ctx.openRef(`saber:${s.id}`) }, s.titulo)),
          h('p', { class: 'op-author' }, icon('user', { size: 14 }),
            ` ${s.autor}`, s.funcao ? ` · ${s.funcao}` : '',
            s.tempo_casa_anos != null ? h('strong', { class: 'op-years' }, ` · ${fmt.num(s.tempo_casa_anos)} anos de casa`) : null))),
      h('p', { class: 'op-dica' }, s.dica),
      h('div', { class: 'op-meta' },
        maqRef || h('span', { class: 'op-maq' }, icon('cpu', { size: 14 }), ` ${maqNome(s.maquina)}`),
        (s.tags || []).map((t) => h('span', { class: 'op-tag' }, `#${t}`))),
      h('footer', { class: 'op-card-foot' },
        pendente
          ? h('span', { class: 'op-valid op-valid-pending' }, icon('clock', { size: 14 }), ' Aguardando validação do supervisor')
          : h('span', { class: 'op-valid op-valid-ok' }, icon('check', { size: 14 }), ` Validado por ${s.validado_por}`,
            s.data ? ` em ${fmt.date(s.data)}` : ''),
        s._demo ? badge('Demonstração', 'accent') : null,
        onLido ? h('label', { class: 'op-lido' },
          h('input', { type: 'checkbox', checked: !!lido, onchange: (e) => onLido(e.target.checked) }), ' Lido') : null),
    );
  }

  // ---------- Aba Saberes ----------
  let busca = '';
  let fMaq = '';
  let fTag = '';
  const lista = h('div', { class: 'op-grid', 'aria-live': 'polite' });
  const maqComSaber = [...new Set(saberes.map((s) => s.maquina).filter(Boolean))];
  const tags = [...new Set(saberes.flatMap((s) => s.tags || []))].sort((a, b) => a.localeCompare(b, 'pt-BR'));

  function desenharLista() {
    const n = normalize(busca);
    const rows = todos().filter((s) => (!fMaq || s.maquina === fMaq)
      && (!fTag || (s.tags || []).includes(fTag))
      && (!n || normalize(`${s.titulo} ${s.dica} ${s.autor} ${s.funcao} ${(s.tags || []).join(' ')} ${maqNome(s.maquina)}`).includes(n)));
    lista.replaceChildren(...(rows.length ? rows.map((s) => cartao(s)) : [emptyState('Nenhum saber com esse filtro.')]));
  }

  const abaSaberes = h('div', { class: 'op-stack' },
    toolbar(
      searchInput({ id: 'op-busca', placeholder: 'Buscar por assunto, autor ou tag', onInput: (v) => { busca = String(v); desenharLista(); } }),
      select({
        id: 'op-maq', label: cap(T('maquina')),
        options: [{ value: '', label: 'Todas' }, ...maqComSaber.map((m) => ({ value: m, label: maqNome(m) }))], value: '',
        onChange: (v) => { fMaq = v; desenharLista(); },
      }),
      select({
        id: 'op-tag', label: 'Tag',
        options: [{ value: '', label: 'Todas' }, ...tags.map((t) => ({ value: t, label: t }))], value: '',
        onChange: (v) => { fTag = v; desenharLista(); },
      })),
    lista);

  // ---------- Trilha ----------
  const linhasComSaber = linhas.filter((l) => saberes.some((s) => linhaDe(s.maquina) === l.id));
  let trilhaLinha = linhasComSaber[0]?.id || '';
  const lidos = new Set();
  const trilhaBox = h('div', { class: 'op-trail-wrap' });

  function ordemTrilha(linhaId) {
    const ordemMaq = new Map(maquinas.map((m, i) => [m.id, i]));
    return saberes
      .filter((s) => (linhaId ? linhaDe(s.maquina) === linhaId : true))
      .sort((a, b) => Number(!a.validado_por) - Number(!b.validado_por)
        || (ordemMaq.get(a.maquina) ?? -1) - (ordemMaq.get(b.maquina) ?? -1)
        || String(a.data).localeCompare(String(b.data)));
  }

  function desenharTrilha() {
    const itens = ordemTrilha(trilhaLinha);
    const feitos = itens.filter((s) => lidos.has(s.id)).length;
    const linha = linhas.find((l) => l.id === trilhaLinha);
    const pct = itens.length ? (feitos / itens.length) * 100 : 0;
    trilhaBox.replaceChildren(
      h('div', { class: 'op-trail-head' },
        h('div', null,
          h('h3', { class: 'op-trail-title' }, linha ? `Trilha: ${linha.nome}` : 'Trilha completa'),
          h('p', { class: 'op-muted' }, `${itens.length} saberes em ordem sugerida: primeiro os validados, ${T('maquina')} por ${T('maquina')}.`)),
        h('div', { class: 'op-trail-prog' },
          h('span', { class: 'op-num' }, `${feitos} de ${itens.length} lidos`),
          progress(pct, { label: 'Progresso da trilha', tone: pct === 100 ? 'ok' : undefined }))),
      itens.length
        ? h('ol', { class: 'op-trail' }, itens.map((s, i) => h('li', { class: 'op-trail-item' },
          cartao(s, {
            numero: i + 1,
            lido: lidos.has(s.id),
            onLido: (on) => {
              if (on) lidos.add(s.id); else lidos.delete(s.id);
              desenharTrilha();
              if (on && lidos.size && itens.every((x) => lidos.has(x.id))) toast('Trilha concluída. O supervisor recebe o aviso para o acompanhamento prático.');
            },
          }))))
        : emptyState(`Ainda não há saberes registrados para esta ${T('linha')}.`),
      h('p', { class: 'op-muted op-small' }, 'As marcações de "lido" valem só nesta tela (demonstração).'),
    );
  }

  const abaTrilha = h('div', { class: 'op-stack' },
    toolbar(select({
      id: 'op-trilha-linha', label: cap(T('linha')),
      options: [...linhasComSaber.map((l) => ({ value: l.id, label: l.nome })), { value: '', label: `Todas as ${T('linhas')}` }],
      value: trilhaLinha,
      onChange: (v) => { trilhaLinha = v; desenharTrilha(); },
    })),
    trilhaBox);

  // ---------- Registrar ----------
  const resultadoReg = h('div', { class: 'op-reg-result', 'aria-live': 'polite' });
  const erroReg = h('p', { class: 'op-error', role: 'alert' });
  const campo = (id, label, input, dica) => h('div', { class: 'op-field' },
    h('label', { for: id }, label), input, dica ? h('small', { class: 'op-muted' }, dica) : null);

  const form = h('form', {
    class: 'op-form',
    'aria-label': 'Registrar um saber',
    novalidate: true,
    onsubmit: (e) => {
      e.preventDefault();
      const f = new FormData(form);
      const v = (k) => String(f.get(k) || '').trim();
      const faltando = [];
      if (!v('autor')) faltando.push('autor');
      if (!v('maquina')) faltando.push(T('maquina'));
      if (!v('dica')) faltando.push('dica');
      if (faltando.length) {
        erroReg.textContent = `Preencha: ${faltando.join(', ')}.`;
        const primeiro = form.querySelector(`[name="${!v('autor') ? 'autor' : !v('maquina') ? 'maquina' : 'dica'}"]`);
        primeiro?.focus();
        return;
      }
      erroReg.textContent = '';
      seq += 1;
      const novo = {
        id: `SB-NOVO-${seq}`,
        _demo: true,
        autor: v('autor'),
        funcao: v('funcao'),
        tempo_casa_anos: v('anos') ? Number(v('anos')) : null,
        area: 'operadores',
        maquina: v('maquina') === '__geral' ? null : v('maquina'),
        titulo: v('titulo') || v('dica').split(/[.!?]/)[0].slice(0, 70),
        dica: v('dica'),
        validado_por: null,
        data: ctx.today,
        tags: v('tags').split(',').map((t) => t.trim()).filter(Boolean),
      };
      novos.unshift(novo);
      resultadoReg.replaceChildren(
        h('p', { class: 'op-reg-ok' }, icon('check'), ' Registrado. O supervisor recebe o pedido de validação.'),
        cartao(novo),
        h('p', { class: 'op-muted op-small' }, 'Demonstração: o registro aparece na lista de saberes só nesta sessão e some ao sair da tela.'));
      form.reset();
      desenharLista();
      toast('Saber enviado para validação (demonstração).');
    },
  },
  h('div', { class: 'op-form-row' },
    campo('op-f-autor', 'Autor *', h('input', { id: 'op-f-autor', name: 'autor', type: 'text', autocomplete: 'off', placeholder: 'Nome de quem sabe', required: true })),
    campo('op-f-funcao', 'Função', h('input', { id: 'op-f-funcao', name: 'funcao', type: 'text', autocomplete: 'off', placeholder: 'Ex.: operador líder' })),
    campo('op-f-anos', 'Anos de casa', h('input', { id: 'op-f-anos', name: 'anos', type: 'number', min: '0', max: '60', inputmode: 'numeric' }))),
  campo('op-f-maq', `${cap(T('maquina'))} *`, h('select', { id: 'op-f-maq', name: 'maquina', class: 'select', required: true },
    h('option', { value: '' }, 'Escolha…'),
    h('option', { value: '__geral' }, 'Geral (vale para todas)'),
    maquinas.map((m) => h('option', { value: m.id }, `${m.nome} (${m.id})`)))),
  campo('op-f-titulo', 'Título', h('input', { id: 'op-f-titulo', name: 'titulo', type: 'text', autocomplete: 'off', placeholder: 'Em poucas palavras' })),
  campo('op-f-dica', 'Dica *', h('textarea', { id: 'op-f-dica', name: 'dica', rows: '4', placeholder: 'O que você faz que não está no manual? Quando, como e por quê.', required: true }),
    'Pode ditar no celular: o assistente transcreve e organiza.'),
  campo('op-f-tags', 'Tags', h('input', { id: 'op-f-tags', name: 'tags', type: 'text', autocomplete: 'off', placeholder: 'Separe por vírgula' })),
  erroReg,
  h('div', { class: 'op-form-actions' },
    h('button', { type: 'submit', class: 'btn btn--primary' }, icon('send', { size: 16 }), ' Enviar para validação')));

  const abaRegistrar = h('div', { class: 'op-reg' },
    card({
      titulo: 'Registrar um saber',
      corpo: h('div', null,
        h('p', { class: 'op-banner', role: 'note' }, icon('info'),
          ' Exemplo de demonstração: nada é salvo. No dia a dia, o operador registra pelo celular e o supervisor valida antes de entrar na consulta.'),
        form),
    }),
    resultadoReg);

  // ---------- Montagem ----------
  desenharLista();
  desenharTrilha();

  el.replaceChildren(
    pageHeader({
      titulo: 'Conhecimento de operadores',
      subtitulo: 'O saber de quem tem 20 anos de casa, registrado e consultável para treinar quem chega.',
    }),
    h('div', { class: 'op-page' },
      numeros,
      tabs([
        { id: 'saberes', label: 'Saberes', render: () => abaSaberes },
        { id: 'trilha', label: 'Trilha para quem chega', render: () => abaTrilha },
        { id: 'registrar', label: 'Registrar um saber', render: () => abaRegistrar },
        {
          id: 'perguntar',
          label: 'Perguntar',
          render: () => chatPanel({ ctx, modulo: 'operadores', titulo: 'Pergunte a quem já resolveu', placeholder: `Ex.: como ajustar a ${T('maquina')} quando…` }),
        },
      ], { initial: 'saberes' })),
  );
}
