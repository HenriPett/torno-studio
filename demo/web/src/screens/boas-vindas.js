// Boas-vindas (UX §4.2): uma tela, uma vez por demo (localStorage["td_bv_<id>"], gravado pelo app.js).
// renderBoasVindas(alvo, {ctx, onComecar(nome, {viaEsc}), bloqueado()}) — nome opcional vira o autor dos registros.
// Esc fecha só desta vez (o app não grava td_bv); "Rever a apresentação" em Como funciona reabre.
// O Esc é ignorado enquanto `bloqueado()` for verdadeiro (ex.: reautenticação aberta por cima) ou quando
// o foco está em outro diálogo fora desta tela.
// Explica o produto em uma frase, só com os sistemas que existem em `integracoes` do pacote.

import { h, icon } from '../ui.js';
import { sistemasDoPacote, listaSistemas } from '../origem.js';

function artigoSetor(setor) {
  const s = String(setor || '').trim();
  if (!s) return 'da indústria';
  return `de ${s.charAt(0).toLowerCase()}${s.slice(1)}`;
}

export function renderBoasVindas(alvo, { ctx, onComecar, bloqueado } = {}) {
  const d = ctx.data || {};
  const funcionarios = d.empresa?.funcionarios;
  const nomeId = 'bv-nome';
  const nome = h('input', {
    id: nomeId, class: 'input', type: 'text', autocomplete: 'given-name', maxlength: '60',
    placeholder: 'Seu nome', value: ctx.autorSalvo ? ctx.autorSalvo() : '',
  });

  let feito = false;
  const comecar = ({ viaEsc = false } = {}) => {
    if (feito) return;
    feito = true;
    document.removeEventListener('keydown', onKey);
    onComecar?.(nome.value, { viaEsc });
  };
  const onKey = (e) => {
    if (e.key !== 'Escape' || e.defaultPrevented) return;
    if (typeof bloqueado === 'function' && bloqueado()) return;
    // outro diálogo por cima (foco fora desta tela): o Esc é dele
    const t = e.target;
    if (t instanceof Node && t !== document.body && t !== document.documentElement && !alvo.contains(t)) return;
    comecar({ viaEsc: true });
  };

  // "A Torno ligou o ERP, o MES, os documentos e o WhatsApp dela numa IA…" (só o que o pacote tem)
  const sistemas = listaSistemas(sistemasDoPacote(d));
  const pessoas = funcionarios ? `, com ${ctx.fmt.num(funcionarios)} pessoas` : '';
  const ligou = sistemas ? `A Torno ligou ${sistemas} dela numa IA` : 'A Torno ligou os sistemas dela numa IA';

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
      `Uma indústria fictícia ${artigoSetor(d.setor)}${pessoas}. `,
      `${ligou} que responde qualquer pergunta da operação, mostra de onde tirou cada número e aprende com o que a equipe ensina.`),
    h('p', { class: 'welcome__def' },
      'Esse conjunto de dados, documentos e saber da equipe é o que chamamos de ', h('strong', null, 'cérebro da operação'), '.'),
    h('ul', { class: 'welcome__steps' }, passos.map(([ic, forte, resto]) => h('li', null,
      icon(ic, { size: 20 }), h('span', null, h('strong', null, forte), ` ${resto}`)))),
    h('p', { class: 'welcome__ia' }, icon('info', { size: 18 }),
      h('span', null, 'As respostas são geradas na hora por IA, lendo só os dados fictícios desta empresa.')),
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
