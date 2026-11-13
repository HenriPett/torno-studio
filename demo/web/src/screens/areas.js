// Índice #areas (UX §4.8): uma linha por área ligada, com uma frase de estado e chevron.
import { h, icon } from '../ui.js';
import { AREAS, AREA_CURTA, areaResumo, areaIcone, ensureAreaCss, on } from '../ui/area-page.js';

export function render(el, ctx) {
  ensureAreaCss();
  const ligadas = AREAS.filter((a) => on(ctx, a));
  const linha = (a) => {
    const r = areaResumo(ctx, a);
    const nomeSetor = ctx.areaName?.(a);
    return h('li', null, h('a', { href: `#${a}`, class: 'ar-idx__row' },
      h('span', { class: 'ar-idx__ico', 'aria-hidden': 'true' }, icon(areaIcone(a), { size: 20 })),
      h('span', { class: 'ar-idx__text' },
        h('span', { class: 'ar-idx__name' }, AREA_CURTA[a]),
        h('span', { class: 'ar-idx__state' },
          r.tom ? h('span', { class: `ar-dot ar-dot--${r.tom}`, 'aria-hidden': 'true' }) : null,
          r.frase || (nomeSetor && nomeSetor !== a ? nomeSetor : ''))),
      icon('chevron-right', { size: 18, class: 'ar-idx__chev' })));
  };
  el.replaceChildren(h('div', { class: 'ar-page ar-idx' },
    h('header', { class: 'ar-head' },
      h('div', { class: 'ar-head__text' },
        h('h1', { class: 'ar-title' }, 'Áreas'),
        h('p', { class: 'ar-sub' }, 'O que precisa de atenção em cada área, com os dados dos sistemas da empresa.'))),
    ligadas.length
      ? h('ul', { class: 'ar-idx__list' }, ligadas.map(linha))
      : h('p', { class: 'ar-empty' }, 'Nenhuma área faz parte desta demonstração.')));
  return undefined;
}
