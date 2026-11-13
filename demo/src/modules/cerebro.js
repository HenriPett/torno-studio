// Cérebro da operação: perguntar com fonte, buscar nos documentos e ver as fontes conectadas,
// sempre do ponto de vista de um perfil de acesso ("Ver como").
import {
  h, icon, pageHeader, card, table, badge, refChip, tabs, emptyState, toolbar, select, searchInput,
} from '../ui.js';
import { fmt, normalize } from '../format.js';
import { chatPanel } from '../ui/chat.js';

const TIPOS = {
  procedimento: 'Procedimento', norma: 'Norma', manual: 'Manual', ficha_tecnica: 'Ficha técnica',
  contrato: 'Contrato', catalogo: 'Catálogo', email: 'E-mail', chamado: 'Chamado',
  planilha: 'Planilha', instrucao: 'Instrução de trabalho',
};

// Valor vindo de onChange/onInput: aceita string ou evento.
const val = (x) => (x && typeof x === 'object' && 'target' in x ? x.target.value : x ?? '');

/** Destaca as palavras do termo dentro do texto (sem diferenciar acento/maiúscula). */
export function highlight(texto, termo, cls = 'cb-mark') {
  const src = String(texto ?? '');
  const palavras = normalize(termo).split(/\s+/).filter((w) => w.length >= 2);
  if (!palavras.length) return [src];
  // Texto "dobrado" caractere a caractere, para manter as posições do original.
  const chars = [...src];
  const fold = chars.map((c) => normalize(c).charAt(0) || ' ');
  const folded = fold.join('');
  const marca = new Array(chars.length).fill(false);
  for (const w of palavras) {
    let i = folded.indexOf(w);
    while (i !== -1) {
      for (let k = i; k < i + w.length; k++) marca[k] = true;
      i = folded.indexOf(w, i + w.length);
    }
  }
  const out = [];
  let buf = '';
  let on = false;
  chars.forEach((c, i) => {
    if (marca[i] !== on) {
      if (buf) out.push(on ? h('mark', { class: cls }, buf) : buf);
      buf = '';
      on = marca[i];
    }
    buf += c;
  });
  if (buf) out.push(on ? h('mark', { class: cls }, buf) : buf);
  return out;
}

export function render(el, ctx) {
  const d = ctx.data || {};
  const perfis = d.perfis_acesso || [];
  const docs = d.documentos || [];
  const areas = d.areas || [];
  const areaName = (id) => (ctx.areaName ? ctx.areaName(id) : id) || id;

  let perfilId = perfis[0]?.id ?? null;
  let termo = '';
  let areaFiltro = '';
  let buscaToken = 0;

  const perfil = () => perfis.find((p) => p.id === perfilId) || null;
  const podeVer = (doc, p = perfil()) => {
    if (!p) return true;
    const pa = p.areas || [];
    return (doc.acesso || []).some((a) => pa.includes(a));
  };

  // ---------- Topo ----------
  const verComo = select({
    id: 'cb-perfil',
    label: 'Ver como',
    options: perfis.map((p) => ({ value: p.id, label: p.nome })),
    value: perfilId,
    onChange: (v) => {
      perfilId = val(v);
      atualizarPerfil();
    },
  });

  const perfilInfo = h('div', { class: 'cb-perfil-info', 'aria-live': 'polite' });

  const origens = [...new Set(docs.map((x) => x.origem).filter(Boolean))];

  const intro = h('section', { class: 'cb-intro', 'aria-label': 'O que é o cérebro' },
    h('div', { class: 'cb-intro-icon', 'aria-hidden': 'true' }, icon('brain')),
    h('div', { class: 'cb-intro-text' },
      h('p', { class: 'cb-intro-lead' },
        `Um só lugar para perguntar sobre a ${ctx.empresa || d.empresa?.nome || 'empresa'}. `,
        'O cérebro reúne ERP, MES, planilhas, fichas técnicas, procedimentos, normas, NCs, contratos, ',
        'catálogos, e-mails e chamados. Cada pessoa só consulta o que a área dela pode ver, e toda resposta vem com a fonte.'),
      h('ul', { class: 'cb-intro-nums' },
        h('li', null, h('strong', null, fmt.num(docs.length)), ' documentos indexados'),
        h('li', null, h('strong', null, fmt.num(origens.length)), ' origens conectadas'),
        h('li', null, h('strong', null, fmt.num(perfis.length)), ' perfis de acesso'),
      ),
    ),
  );

  const verComoBar = h('section', { class: 'cb-vercomo', 'aria-label': 'Perfil de acesso' },
    h('div', { class: 'cb-vercomo-field' }, verComo),
    h('div', { class: 'cb-vercomo-text' },
      h('p', { class: 'cb-vercomo-hint' }, icon('lock'),
        ' Respostas só usam documentos que este perfil pode ver.'),
      perfilInfo,
    ),
  );

  // ---------- Aba Perguntar ----------
  const askBox = h('div', { class: 'cb-ask' });

  function montarChat() {
    askBox.replaceChildren();
    const p = perfil();
    askBox.append(
      chatPanel({
        ctx,
        modulo: 'cerebro',
        titulo: p ? `Pergunte como ${p.nome}` : 'Pergunte ao cérebro',
        placeholder: 'Pergunte sobre pedidos, procedimentos, normas, NCs…',
        variante: 'default',
        perfil: perfilId,
      }),
    );
  }

  // ---------- Aba Buscar ----------
  const resultadosBox = h('div', { class: 'cb-results', 'aria-live': 'polite' });
  const searchBox = h('div', { class: 'cb-search' },
    toolbar(
      searchInput({
        id: 'cb-busca',
        placeholder: 'Buscar nos documentos (ex.: troca, tolerância, prazo)',
        onInput: (v) => {
          termo = String(val(v));
          buscar();
        },
      }),
      select({
        id: 'cb-area',
        label: 'Área',
        options: [{ value: '', label: 'Todas as áreas' }, ...areas.map((a) => ({ value: a.id, label: a.nome }))],
        value: '',
        onChange: (v) => {
          areaFiltro = val(v);
          buscar();
        },
      }),
    ),
    resultadosBox,
  );

  function buscaLocal(t) {
    const n = normalize(t);
    const out = [];
    for (const doc of docs) {
      if (!podeVer(doc)) continue;
      for (const tr of doc.trechos || []) {
        const alvo = normalize(`${doc.titulo} ${tr.secao} ${tr.texto}`);
        if (alvo.includes(n)) {
          out.push({ ref: `doc:${doc.id}#${tr.id}`, titulo: doc.titulo, trecho: tr.texto, area: doc.area, score: 1 });
        }
      }
    }
    return out;
  }

  function ocultosPorPermissao(t) {
    const n = normalize(t);
    if (!n) return 0;
    return docs.filter((doc) => !podeVer(doc)
      && normalize(`${doc.titulo} ${(doc.trechos || []).map((x) => `${x.secao} ${x.texto}`).join(' ')}`).includes(n)).length;
  }

  function sugestoesBusca() {
    const vistos = new Set();
    const out = [];
    for (const doc of docs.filter((x) => podeVer(x))) {
      const w = (doc.titulo || '').split(/\s+/).filter((x) => x.length >= 6).sort((a, b) => b.length - a.length)[0];
      if (w && !vistos.has(normalize(w))) {
        vistos.add(normalize(w));
        out.push(w.replace(/[.,:;()]/g, '').toLowerCase());
      }
      if (out.length >= 4) break;
    }
    return out;
  }

  async function buscar() {
    const t = termo.trim();
    const token = ++buscaToken;
    if (t.length < 2) {
      const sug = sugestoesBusca();
      resultadosBox.replaceChildren(
        h('div', { class: 'cb-empty-search' },
          emptyState('Digite um termo para buscar nos documentos que este perfil pode ver.'),
          sug.length ? h('div', { class: 'cb-sugs' },
            h('span', { class: 'cb-sugs-label' }, 'Experimente:'),
            sug.map((s) => h('button', {
              type: 'button',
              class: 'cb-sug',
              onclick: () => {
                const inp = searchBox.querySelector('input');
                if (inp) inp.value = s;
                termo = s;
                buscar();
              },
            }, s))) : null),
      );
      return;
    }
    let res;
    try {
      res = ctx.assistant?.buscar ? await Promise.resolve(ctx.assistant.buscar(t, { perfil: perfilId })) : buscaLocal(t);
    } catch {
      res = buscaLocal(t);
    }
    if (token !== buscaToken) return;
    res = (res || []).filter((r) => !areaFiltro || r.area === areaFiltro);
    const ocultos = ocultosPorPermissao(t);
    const aviso = ocultos
      ? h('p', { class: 'cb-hidden-note' }, icon('lock'),
        ` ${ocultos} documento${ocultos > 1 ? 's' : ''} com esse termo não aparece${ocultos > 1 ? 'm' : ''} para ${perfil()?.nome || 'este perfil'}.`)
      : null;
    if (!res.length) {
      resultadosBox.replaceChildren(emptyState(`Nada encontrado para "${t}"${areaFiltro ? ` em ${areaName(areaFiltro)}` : ''}.`), aviso || '');
      return;
    }
    resultadosBox.replaceChildren(
      h('p', { class: 'cb-count' }, `${res.length} resultado${res.length > 1 ? 's' : ''} para "${t}"`),
      h('ol', { class: 'cb-result-list' },
        res.map((r) => h('li', { class: 'cb-result' },
          h('div', { class: 'cb-result-head' },
            h('button', { type: 'button', class: 'cb-result-title', onclick: () => ctx.openRef(r.ref) },
              highlight(r.titulo, t)),
            r.area ? badge(areaName(r.area), 'neutral') : null),
          h('p', { class: 'cb-result-snippet' }, highlight(r.trecho, t)),
          h('div', { class: 'cb-result-foot' }, refChip(r.ref, ctx)),
        ))),
      aviso || '',
    );
  }

  // ---------- Aba Fontes conectadas ----------
  const fontesBox = h('div', { class: 'cb-sources' });

  function barras(titulo, contagem, rotulo) {
    const max = Math.max(1, ...Object.values(contagem));
    const entradas = Object.entries(contagem).sort((a, b) => b[1] - a[1]);
    return card({
      titulo,
      corpo: h('ul', { class: 'cb-bars' },
        entradas.map(([k, n]) => h('li', { class: 'cb-bar' },
          h('span', { class: 'cb-bar-label' }, rotulo(k)),
          h('span', { class: 'cb-bar-track', 'aria-hidden': 'true' },
            h('span', { class: 'cb-bar-fill', style: `width:${Math.round((n / max) * 100)}%` })),
          h('span', { class: 'cb-bar-num' }, fmt.num(n)),
        ))),
    });
  }

  function montarFontes() {
    const porTipo = {};
    const porOrigem = {};
    for (const doc of docs) {
      porTipo[doc.tipo] = (porTipo[doc.tipo] || 0) + 1;
      porOrigem[doc.origem] = (porOrigem[doc.origem] || 0) + 1;
    }
    const p = perfil();
    const visiveis = docs.filter((x) => podeVer(x)).length;
    const lista = [...docs].sort((a, b) => String(b.atualizado).localeCompare(String(a.atualizado)));

    const integ = (d.integracoes || []);
    const integCard = integ.length ? card({
      titulo: 'Sistemas ligados ao cérebro',
      acoes: ctx.isEnabled('integracoes')
        ? h('button', { type: 'button', class: 'cb-link', onclick: () => ctx.navigate('#integracoes') },
          'Ver integrações', icon('chevron-right'))
        : null,
      corpo: h('ul', { class: 'cb-integ' },
        integ.map((i) => h('li', { class: 'cb-integ-item' },
          h('span', { class: 'cb-integ-name' }, i.nome),
          h('span', { class: 'cb-integ-meta' },
            i.registros != null ? `${fmt.num(i.registros)} registros` : '',
            i.ultima_sync ? ` · ${fmt.rel(i.ultima_sync, ctx.today)}` : ''),
          statusBadgeSafe(i.status),
        ))),
    }) : null;

    fontesBox.replaceChildren(
      h('div', { class: 'cb-sources-grid' },
        barras('Documentos por tipo', porTipo, (k) => TIPOS[k] || k),
        barras('Documentos por origem', porOrigem, (k) => k),
        integCard,
      ),
      card({
        titulo: 'Documentos indexados',
        acoes: p ? h('span', { class: 'cb-visible-count' },
          `${visiveis} de ${docs.length} visíveis para ${p.nome}`) : null,
        corpo: table({
          columns: [
            { key: 'titulo', label: 'Documento', render: (r) => h('span', { class: 'cb-doc-title' }, r.titulo, h('small', null, r.id)) },
            { key: 'tipo', label: 'Tipo', render: (r) => TIPOS[r.tipo] || r.tipo },
            { key: 'area', label: 'Área', render: (r) => areaName(r.area) },
            { key: 'origem', label: 'Origem' },
            { key: 'atualizado', label: 'Atualizado', render: (r) => fmt.date(r.atualizado) },
            { key: 'acesso', label: 'Quem pode ver', render: (r) => (r.acesso || []).map(areaName).join(', ') },
            {
              key: 'vis',
              label: p ? `Para ${p.nome}` : 'Visível',
              render: (r) => (podeVer(r)
                ? h('span', { class: 'cb-vis cb-vis-ok' }, icon('check'), 'Visível')
                : h('span', { class: 'cb-vis cb-vis-no' }, icon('lock'), 'Bloqueado')),
            },
          ],
          rows: lista,
          onRowClick: (r) => ctx.openRef(`doc:${r.id}`),
          empty: 'Nenhum documento conectado.',
        }),
      }),
    );
  }

  function statusBadgeSafe(status) {
    const map = {
      conectado: ['Conectado', 'ok'], sincronizando: ['Sincronizando', 'accent'],
      erro: ['Erro', 'danger'], planejado: ['Planejado', 'neutral'],
    };
    const [txt, tone] = map[status] || [status, 'neutral'];
    return badge(txt, tone);
  }

  function atualizarPerfilInfo() {
    const p = perfil();
    if (!p) {
      perfilInfo.replaceChildren();
      return;
    }
    const visiveis = docs.filter((x) => podeVer(x)).length;
    perfilInfo.replaceChildren(
      h('span', { class: 'cb-perfil-areas' }, 'Pode consultar: ',
        (p.areas || []).map((a) => h('span', { class: 'cb-area-pill' }, areaName(a)))),
      h('span', { class: 'cb-perfil-docs' },
        h('strong', null, `${visiveis} de ${docs.length}`), ' documentos',
        p.usuarios != null ? ` · ${fmt.num(p.usuarios)} usuários neste perfil` : ''),
    );
  }

  function atualizarPerfil() {
    atualizarPerfilInfo();
    montarChat();
    buscar();
    montarFontes();
  }

  const abas = tabs([
    { id: 'perguntar', label: 'Perguntar', render: () => askBox },
    { id: 'buscar', label: 'Buscar nos documentos', render: () => searchBox },
    { id: 'fontes', label: 'Fontes conectadas', render: () => fontesBox },
  ], { initial: 'perguntar' });

  el.replaceChildren(
    pageHeader({
      titulo: 'Cérebro da operação',
      subtitulo: 'Pergunte em português e receba a resposta com a fonte, respeitando a permissão de cada área.',
    }),
    h('div', { class: 'cb-page' }, intro, perfis.length ? verComoBar : null, abas),
  );

  atualizarPerfil();
}
