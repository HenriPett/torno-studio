// Segurança e governança (PLANO §4).
// Perfis de acesso, matriz perfil × área, "quem vê o quê", registro de uso e os
// compromissos de projeto sobre onde ficam os dados (sem certificações que a Torno não tem).

import { h, icon, pageHeader, card, badge, refChip, emptyState, select } from '../ui.js';
import { fmt, normalize } from '../format.js';

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

function valorDe(v) {
  return v && typeof v === 'object' && 'target' in v ? v.target.value : v;
}

function nomeArea(ctx, id) {
  try {
    return ctx.areaName(id) || id;
  } catch {
    return id;
  }
}

export function render(el, ctx) {
  ensureCss();
  const d = ctx.data;
  const perfis = d.perfis_acesso || [];
  const areas = d.areas || [];
  const documentos = d.documentos || [];
  const registro = d.registro_uso || [];
  const perfilPorId = new Map(perfis.map((p) => [p.id, p]));

  el.replaceChildren();
  el.classList.add('seg-root');

  el.append(pageHeader({
    titulo: 'Segurança e governança',
    subtitulo: `Cada pessoa só vê o que o seu perfil permite. Todo uso fica registrado e os dados da ${ctx.empresa} ficam sob o controle dela.`,
  }));

  if (!perfis.length) {
    el.append(emptyState('Nenhum perfil de acesso descrito para este setor.'));
    return;
  }

  const temArea = (perfil, areaId) => (perfil.areas || []).includes(areaId);

  // ---------- Perfis de acesso ----------
  const cartoesPerfil = h('div', { class: 'seg-perfis' },
    ...perfis.map((p) => h('article', { class: 'seg-perfil' },
      h('div', { class: 'seg-perfil-topo' },
        h('h3', {}, p.nome),
        h('span', { class: 'seg-usuarios' }, icon('user'),
          h('span', { class: 'seg-num' }, fmt.num(p.usuarios)),
          ` usuário${p.usuarios === 1 ? '' : 's'}`)),
      h('div', { class: 'seg-perfil-areas' },
        (p.areas || []).length >= areas.length
          ? badge('Todas as áreas', 'accent')
          : (p.areas || []).map((a) => badge(nomeArea(ctx, a), 'neutral'))),
    )),
  );

  // ---------- Matriz perfil × área ----------
  function matriz() {
    const wrap = h('div', { class: 'seg-matriz-wrap', tabindex: '0', role: 'region', 'aria-label': 'Matriz de acesso por perfil e área' });
    const thead = h('thead', {},
      h('tr', {},
        h('th', { scope: 'col', class: 'seg-matriz-canto' }, 'Perfil'),
        ...areas.map((a) => h('th', { scope: 'col' }, nomeArea(ctx, a.id)))));
    const tbody = h('tbody', {},
      ...perfis.map((p) => h('tr', {},
        h('th', { scope: 'row' }, p.nome),
        ...areas.map((a) => {
          const ok = temArea(p, a.id);
          return h('td', { class: ok ? 'seg-ok' : 'seg-nao' },
            h('span', { class: 'seg-marca', 'aria-hidden': 'true' }, ok ? icon('check') : icon('x')),
            h('span', { class: ok ? 'seg-acesso-txt' : 'seg-sr' }, ok ? 'Acesso' : 'Sem acesso'));
        }))));
    wrap.append(h('table', { class: 'seg-matriz' }, thead, tbody));
    return wrap;
  }

  // ---------- Quem vê o quê ----------
  function quemVe() {
    const comAcesso = documentos.length
      ? perfis
      : perfis; // sempre deixa escolher; se não houver docs, mostramos aviso
    let atual = (comAcesso[0] || perfis[0]).id;
    const painel = h('div', { class: 'seg-quemve-painel', 'aria-live': 'polite' });

    const docVisivel = (perfil, doc) => {
      const acesso = doc.acesso || [];
      if (!acesso.length) return true; // sem restrição explícita = visível
      return acesso.some((a) => (perfil.areas || []).includes(a));
    };

    function desenhar() {
      const perfil = perfilPorId.get(atual);
      const vistos = documentos.filter((doc) => docVisivel(perfil, doc));
      const ocultos = documentos.filter((doc) => !docVisivel(perfil, doc));
      const total = documentos.length;
      const itemDoc = (doc, visivel) => {
        const nome = on(h('button', { type: 'button', class: 'seg-doc-link' }, doc.titulo), 'click', () => ctx.openRef(`doc:${doc.id}`));
        return h('li', { class: `seg-doc${visivel ? '' : ' seg-doc-oculto'}` },
          h('span', { class: 'seg-doc-icone', 'aria-hidden': 'true' }, icon(visivel ? 'file' : 'lock')),
          h('div', { class: 'seg-doc-corpo' },
            nome,
            h('span', { class: 'seg-muted seg-pequeno' },
              `${doc.tipo || 'documento'} · ${nomeArea(ctx, doc.area)}`,
              (doc.acesso || []).length ? ` · acesso: ${doc.acesso.map((a) => nomeArea(ctx, a)).join(', ')}` : '')),
          h('span', { class: 'seg-sr' }, visivel ? ': visível' : ': bloqueado'));
      };
      painel.replaceChildren(
        h('div', { class: 'seg-quemve-resumo' },
          h('p', {},
            h('strong', {}, perfil.nome),
            ` vê `,
            h('strong', { class: 'seg-num' }, `${fmt.num(vistos.length)} de ${fmt.num(total)}`),
            ` documentos.`),
          ocultos.length
            ? h('p', { class: 'seg-muted' }, `${fmt.num(ocultos.length)} ficam fora do alcance deste perfil.`)
            : h('p', { class: 'seg-muted' }, 'Este perfil alcança todos os documentos.')),
        total
          ? h('div', { class: 'seg-quemve-colunas' },
              h('div', {},
                h('h4', { class: 'seg-col-titulo seg-col-ok' }, icon('check'), `Vê (${fmt.num(vistos.length)})`),
                vistos.length ? h('ul', { class: 'seg-doc-lista' }, ...vistos.map((doc) => itemDoc(doc, true))) : emptyState('Nenhum documento visível.')),
              h('div', {},
                h('h4', { class: 'seg-col-titulo seg-col-nao' }, icon('lock'), `Não vê (${fmt.num(ocultos.length)})`),
                ocultos.length ? h('ul', { class: 'seg-doc-lista' }, ...ocultos.map((doc) => itemDoc(doc, false))) : emptyState('Nada bloqueado para este perfil.')))
          : emptyState('Nenhum documento cadastrado neste setor.'),
      );
    }

    const seletor = select({
      id: 'seg-quemve-perfil',
      label: 'Ver como o perfil',
      options: perfis.map((p) => ({ value: p.id, label: p.nome })),
      value: atual,
      onChange: (v) => { atual = valorDe(v) || atual; desenhar(); },
    });
    desenhar();
    return h('div', { class: 'seg-quemve' }, h('div', { class: 'seg-quemve-topo' }, seletor), painel);
  }

  // ---------- Registro de uso ----------
  function registroUso() {
    const areasUsadas = [...new Set(registro.map((r) => r.area).filter(Boolean))];
    let filtro = '';
    const lista = h('ul', { class: 'seg-registro', 'aria-live': 'polite' });

    function desenhar() {
      const linhas = registro
        .filter((r) => !filtro || r.area === filtro)
        .slice()
        .sort((a, b) => String(b.data).localeCompare(String(a.data)));
      if (!linhas.length) {
        lista.replaceChildren(h('li', {}, emptyState('Nenhum registro para esse filtro.')));
        return;
      }
      lista.replaceChildren(...linhas.map((r) => {
        const perfil = perfilPorId.get(r.perfil);
        const chips = (r.fontes || []).map((ref) => { try { return refChip(ref, ctx); } catch { return null; } }).filter(Boolean);
        return h('li', { class: 'seg-reg' },
          h('div', { class: 'seg-reg-topo' },
            h('time', { class: 'seg-reg-hora seg-num', datetime: r.data }, fmt.datetime(r.data)),
            h('span', { class: 'seg-reg-meta' },
              badge(perfil ? perfil.nome : r.perfil, 'neutral'),
              h('span', { class: 'seg-muted' }, nomeArea(ctx, r.area)))),
          h('p', { class: 'seg-reg-pergunta' }, '“', r.pergunta, '”'),
          chips.length ? h('div', { class: 'seg-reg-fontes' }, h('span', { class: 'seg-muted seg-pequeno' }, 'Fontes: '), ...chips) : null,
        );
      }));
    }

    const filtroSel = select({
      id: 'seg-reg-area',
      label: 'Filtrar por área',
      options: [{ value: '', label: 'Todas as áreas' }, ...areasUsadas.map((a) => ({ value: a, label: nomeArea(ctx, a) }))],
      value: filtro,
      onChange: (v) => { filtro = valorDe(v) || ''; desenhar(); },
    });
    desenhar();
    return h('div', { class: 'seg-registro-wrap' },
      h('div', { class: 'seg-registro-topo' },
        filtroSel,
        h('span', { class: 'seg-muted seg-pequeno' }, `${fmt.num(registro.length)} registros no período`)),
      lista);
  }

  // ---------- Onde ficam os dados ----------
  const compromissos = [
    { icone: 'lock', titulo: 'Os dados ficam com o cliente', texto: `Rodam na infraestrutura da ${ctx.empresa} ou em nuvem aprovada pela TI dela. A Torno não leva os dados embora.` },
    { icone: 'user', titulo: 'Acesso por perfil', texto: 'Cada pessoa só enxerga as áreas e os documentos do seu perfil. O acesso é definido com a empresa.' },
    { icone: 'file', titulo: 'Registro de uso', texto: 'Toda pergunta e cada fonte consultada ficam registradas, para auditoria e ajuste de permissões.' },
    { icone: 'shield-check', titulo: 'Sem treinar modelos de terceiros', texto: 'Os dados do cliente não são usados para treinar modelos de fornecedores externos.' },
    { icone: 'check', titulo: 'Confidencialidade quando pedir', texto: 'Acordo de confidencialidade assinado sempre que o cliente solicitar, antes de qualquer acesso.' },
    { icone: 'box', titulo: 'Tudo em nome do cliente', texto: 'Código, documentação e contas de serviço em nome do cliente desde o primeiro dia. Sem dependência da Torno para continuar.' },
  ];
  function ondeFicam() {
    return h('div', { class: 'seg-compromissos' },
      ...compromissos.map((c) => h('article', { class: 'seg-compromisso' },
        h('span', { class: 'seg-comp-icone', 'aria-hidden': 'true' }, icon(c.icone)),
        h('div', {}, h('h4', {}, c.titulo), h('p', {}, c.texto)))),
    );
  }

  el.append(
    card({ titulo: 'Perfis de acesso', corpo: cartoesPerfil, class: 'seg-card' }),
    card({ titulo: 'Matriz de acesso: perfil × área', corpo: matriz(), class: 'seg-card' }),
    card({ titulo: 'Quem vê o quê', corpo: quemVe(), class: 'seg-card' }),
    card({ titulo: 'Registro de uso', corpo: registroUso(), class: 'seg-card' }),
    card({
      titulo: 'Onde ficam os dados',
      acoes: h('span', { class: 'seg-muted seg-pequeno' }, 'Compromissos do projeto'),
      corpo: ondeFicam(),
      class: 'seg-card',
    }),
  );
}
