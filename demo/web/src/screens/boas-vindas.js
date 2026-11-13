// Boas-vindas (UX §4.2): uma tela, uma vez por demo (localStorage["td_bv_<id>"], gravado pelo app.js).
// renderBoasVindas(alvo, {ctx, onComecar(nome)}) — nome opcional vira o autor dos registros.

import { h, icon } from '../ui.js';

function artigoSetor(setor) {
  const s = String(setor || '').trim();
  if (!s) return 'da indústria';
  return `de ${s.charAt(0).toLowerCase()}${s.slice(1)}`;
}

export function renderBoasVindas(alvo, { ctx, onComecar } = {}) {
  const d = ctx.data || {};
  const funcionarios = d.empresa?.funcionarios;
  const nomeId = 'bv-nome';
  const nome = h('input', {
    id: nomeId, class: 'input', type: 'text', autocomplete: 'given-name', maxlength: '60',
    placeholder: 'Seu nome', value: ctx.autorSalvo ? ctx.autorSalvo() : '',
  });

  let feito = false;
  const comecar = () => {
    if (feito) return;
    feito = true;
    document.removeEventListener('keydown', onKey);
    onComecar?.(nome.value);
  };
  const onKey = (e) => {
    if (e.key === 'Escape') comecar();
  };

  const botao = h('button', { type: 'submit', class: 'btn btn--primary btn--lg btn--block' }, h('span', { class: 'btn__label' }, 'Começar'));
  const passos = [
    ['search', 'Pergunte', 'como falaria com um colega.'],
    ['check-circle', 'Confira', 'de onde veio cada resposta.'],
    ['lightbulb', 'Ensine', 'algo que só a sua equipe sabe.'],
  ];

  const tela = h('main', { class: 'welcome' },
    h('form', {
      class: 'welcome__inner', 'aria-labelledby': 'bv-titulo',
      onSubmit: (e) => { e.preventDefault(); comecar(); },
    },
    ctx.demo?.nome ? h('p', { class: 'welcome__for' }, `Demonstração preparada para ${ctx.demo.nome}`) : null,
    h('h1', { class: 'welcome__title', id: 'bv-titulo' }, `Esta é a operação da ${String(ctx.empresa).replace(/\.$/, '')}.`),
    h('p', { class: 'welcome__lead' },
      `Uma indústria fictícia ${artigoSetor(d.setor)}${funcionarios ? ` com ${ctx.fmt.num(funcionarios)} pessoas` : ''}. `,
      'ERP, MES, fichas e procedimentos já estão no cérebro.'),
    h('ul', { class: 'welcome__steps' }, passos.map(([ic, forte, resto]) => h('li', null,
      icon(ic, { size: 20 }), h('span', null, h('strong', null, forte), ` ${resto}`)))),
    h('div', { class: 'field' },
      h('label', { class: 'field__label', for: nomeId }, 'Como devemos chamar você? (opcional)'),
      nome,
      h('span', { class: 'field__hint' }, 'Aparece como autor do que você ensinar.')),
    botao,
    h('p', { class: 'welcome__fine' }, 'Empresa, pessoas e números são fictícios.')));

  alvo.replaceChildren(tela);
  document.addEventListener('keydown', onKey);
  requestAnimationFrame(() => botao.focus());
  return () => document.removeEventListener('keydown', onKey);
}
