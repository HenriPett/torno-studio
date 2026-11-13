// Cérebro (#cerebro, UX §4.7): o que o cérebro sabe. "Aprendido nesta demo", "Saber da fábrica"
// (absorve o antigo módulo de operadores; some com `operadores` desligado) e "Documentos" (busca local).
// Exporta `drawersCerebro` (doc, saber, kpi, aprendizado) para a gaveta de ctx.openRef.
import { h, icon, button, confirmInline, sparkline } from '../ui.js';
import { normalize } from '../format.js';
import { buscar as buscarLocal, perguntaDerivada } from '../ai/local-engine.js';
import { TIPO_ROTULO } from '../learning.js';
import { quando, cartaoFonte, atualizaQuandos } from '../ui/fontes.js';
import { empresaCurta } from '../ui/conversa.js';

const TIPOS_DOC = {
  procedimento: 'Procedimento', norma: 'Norma', manual: 'Manual', ficha_tecnica: 'Ficha técnica',
  contrato: 'Contrato', catalogo: 'Catálogo', email: 'E-mail', chamado: 'Chamado',
  planilha: 'Planilha', instrucao: 'Instrução de trabalho', ata: 'Ata', receita: 'Receita',
};
const AREA_CURTA = {
  producao: 'Produção', qualidade: 'Qualidade', manutencao: 'Manutenção', comercial: 'Comercial',
  marketing: 'Marketing', operadores: 'Chão de fábrica', gestao: 'Gestão',
};
const AREA_MODULO = { producao: 'producao', qualidade: 'qualidade', manutencao: 'manutencao', comercial: 'comercial', marketing: 'marketing', operadores: 'operadores', gestao: null };

const ligado = (ctx, m) => (!m ? true : typeof ctx?.isEnabled === 'function' ? !!ctx.isEnabled(m) : true);
const dataBr = (iso) => { const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(iso ?? '')); return m ? `${m[3]}/${m[2]}` : ''; };
const num = (v) => (typeof v === 'number' ? v.toLocaleString('pt-BR', { maximumFractionDigits: 1 }) : String(v ?? '—'));
const nomeCurto = (nome) => { const p = String(nome ?? '').replace(/\s*\(.*\)$/, '').split(/\s+/); return p.length > 1 ? `${p[0]} ${p.at(-1).charAt(0)}.` : p[0] ?? ''; };
const quem = (autor) => (!autor || autor === 'Você' ? 'você' : autor);

/** Destaca as palavras do termo dentro do texto (sem diferenciar acento/maiúscula). */
export function highlight(texto, termo, cls = 'cb-mark') {
  const src = String(texto ?? '');
  const palavras = normalize(termo).split(/\s+/).filter((w) => w.length >= 2);
  if (!palavras.length) return [src];
  const chars = [...src];
  const folded = chars.map((c) => normalize(c).charAt(0) || ' ').join('');
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

/** Texto do usuário em parágrafos (texto puro: nada de Markdown nem HTML). */
const paragrafos = (texto) => String(texto ?? '').split(/\n{2,}/).filter(Boolean)
  .map((p) => h('p', null, ...p.split('\n').flatMap((l, i) => (i ? [h('br'), l] : [l]))));

function perguntar(ctx, texto, modulo) {
  if (typeof ctx.perguntar === 'function') ctx.perguntar(texto, { modulo });
}
function ensinar(ctx, o) {
  if (typeof ctx.ensinar === 'function') ctx.ensinar(o);
}

/* ------------------------------------------------------------------ */
/* Aprendido nesta demo                                                */
/* ------------------------------------------------------------------ */

function cartaoRegistro(ctx, item, { onApagado } = {}) {
  const areaNome = AREA_CURTA[item.area] ?? item.area;
  const usos = ctx.learning?.usos?.(item.id) ?? 0;
  const meta = [TIPO_ROTULO[item.tipo] ?? 'Registro', areaNome, item.maquina].filter(Boolean).join(' · ');
  const corpo = h('div', { class: 'cb-reg' });
  const menuId = `cb-menu-${item.id}`;
  const menu = h('div', { class: 'cb-reg__menu', id: menuId, role: 'menu', hidden: true },
    h('button', { type: 'button', role: 'menuitem', class: 'cb-reg__op', onClick: () => { fechaMenu(); perguntar(ctx, perguntaDerivada(item, ctx), AREA_MODULO[item.area] ?? undefined); } }, icon('search', { size: 16 }), 'Perguntar sobre isso'),
    h('button', { type: 'button', role: 'menuitem', class: 'cb-reg__op cb-reg__op--danger', onClick: () => { fechaMenu(); confirma(); } }, icon('trash', { size: 16 }), 'Apagar'));
  const maisBtn = h('button', {
    type: 'button', class: 'icon-btn icon-btn--ghost cb-reg__mais', 'aria-label': 'Mais ações', 'aria-haspopup': 'menu', 'aria-expanded': 'false', 'aria-controls': menuId,
    onClick: (e) => { e.stopPropagation(); menu.hidden ? abreMenu() : fechaMenu(); },
  }, icon('more', { size: 18 }));
  const foraClique = (e) => { if (!corpo.contains(e.target)) fechaMenu(); };
  function abreMenu() { menu.hidden = false; maisBtn.setAttribute('aria-expanded', 'true'); document.addEventListener('click', foraClique); menu.querySelector('button')?.focus(); }
  function fechaMenu() { menu.hidden = true; maisBtn.setAttribute('aria-expanded', 'false'); document.removeEventListener('click', foraClique); }
  menu.addEventListener('keydown', (e) => { if (e.key === 'Escape') { e.stopPropagation(); fechaMenu(); maisBtn.focus(); } });

  const confirmacao = h('div', { class: 'cb-reg__confirma', hidden: true, role: 'group', 'aria-label': 'Confirmar exclusão' });
  function confirma() {
    confirmacao.hidden = false;
    const apagar = button('Apagar', {
      variant: 'danger', size: 'sm',
      onClick: async () => {
        apagar.disabled = true;
        try {
          await ctx.learning?.remove?.(item.id);
          onApagado?.();
        } catch {
          apagar.disabled = false;
          confirmacao.replaceChildren(h('span', { class: 'cb-erro' }, 'Não conseguimos apagar agora. Tente de novo.'), cancelar);
        }
      },
    });
    const cancelar = button('Cancelar', { variant: 'ghost', size: 'sm', onClick: () => { confirmacao.hidden = true; maisBtn.focus(); } });
    confirmacao.replaceChildren(h('span', null, 'Apagar este registro?'), apagar, cancelar);
    requestAnimationFrame(() => cancelar.focus());
  }

  corpo.append(
    h('div', { class: 'cb-reg__l1' },
      icon('lightbulb', { size: 16, class: 'cb-reg__ico' }),
      h('span', { class: 'cb-reg__meta' }, meta),
      h('span', { class: 'cb-reg__autor' }, `${item.autor || 'Você'} · `, h('span', { class: 'fonte__quando', 'data-quando': item.criado_em || '' }, quando(item.criado_em))),
      maisBtn),
    h('button', { type: 'button', class: 'cb-reg__texto', onClick: () => ctx.openRef?.(`aprendizado:${item.id}`) }, item.texto || item.titulo),
    usos ? h('p', { class: 'cb-reg__usos' }, `Usado em ${usos} ${usos === 1 ? 'resposta' : 'respostas'}`) : null,
    confirmacao, menu);
  if (item.pendente) corpo.classList.add('is-pendente');
  return corpo;
}

function secaoAprendido(ctx, { area } = {}) {
  const sec = h('section', { class: 'cb-sec', 'data-secao': 'aprendido', id: 'aprendido', 'aria-labelledby': 'cb-apr-t' });
  function pinta() {
    const todos = ctx.learning?.list?.() ?? [];
    const itens = area ? todos.filter((x) => x.area === area) : todos;
    const titulo = h('h2', { class: 'cb-sec__titulo', id: 'cb-apr-t' }, `Aprendido nesta demo${todos.length ? ` (${itens.length})` : ''}`);
    const filtro = area ? h('p', { class: 'cb-filtro' }, `Só ${AREA_CURTA[area] ?? area}. `,
      h('button', { type: 'button', class: 'link-btn', onClick: () => { area = null; pinta(); } }, 'Ver todos')) : null;
    if (!todos.length) {
      sec.replaceChildren(titulo, h('div', { class: 'cb-vazio' },
        icon('lightbulb', { size: 32, class: 'cb-vazio__ico' }),
        h('p', { class: 'cb-vazio__titulo' }, 'Nada registrado ainda.'),
        h('p', { class: 'cb-vazio__texto' }, 'Ensine algo que só a sua equipe sabe: um macete de máquina, uma ocorrência de hoje, uma regra que não está escrita.'),
        button('Ensinar o cérebro', { variant: 'secondary', icone: 'lightbulb', onClick: () => ensinar(ctx, { origem: 'cerebro' }) })));
      return;
    }
    sec.replaceChildren(...[titulo, filtro, h('div', { class: 'cb-regs' }, itens.map((it) => cartaoRegistro(ctx, it)))].filter(Boolean));
  }
  pinta();
  return { el: sec, pinta };
}

/* ------------------------------------------------------------------ */
/* Saber da fábrica                                                    */
/* ------------------------------------------------------------------ */

function cartaoSaber(ctx, s) {
  return h('button', { type: 'button', class: 'cb-saber', onClick: () => ctx.openRef?.(`saber:${s.id}`) },
    h('span', { class: 'cb-saber__titulo' }, s.titulo),
    h('span', { class: 'cb-saber__autor' }, s.autor),
    h('span', { class: 'cb-saber__funcao' }, `${s.funcao}${s.tempo_casa_anos ? ` · ${s.tempo_casa_anos} anos de casa` : ''}`),
    s.validado_por ? h('span', { class: 'cb-saber__ok' }, icon('check', { size: 14 }), `Validado por ${nomeCurto(s.validado_por)}`) : null);
}

function secaoSaber(ctx) {
  const saberes = ctx.data?.saberes ?? [];
  if (!ligado(ctx, 'operadores') || !saberes.length) return null;
  const trilho = h('div', { class: 'cb-carrossel', tabIndex: 0, role: 'region', 'aria-label': 'Saber da fábrica' }, saberes.map((s) => cartaoSaber(ctx, s)));
  let grade = false;
  const ver = h('button', {
    type: 'button', class: 'link-btn', 'aria-expanded': 'false',
    onClick: () => {
      grade = !grade;
      trilho.classList.toggle('is-grade', grade);
      ver.textContent = grade ? 'Ver menos' : `Ver todos (${saberes.length}) ›`;
      ver.setAttribute('aria-expanded', String(grade));
    },
  }, `Ver todos (${saberes.length}) ›`);
  return h('section', { class: 'cb-sec', 'data-secao': 'saber', id: 'saber', 'aria-labelledby': 'cb-saber-t' },
    h('div', { class: 'cb-sec__cab' }, h('h2', { class: 'cb-sec__titulo', id: 'cb-saber-t' }, 'Saber da fábrica'), ver),
    trilho);
}

/* ------------------------------------------------------------------ */
/* Documentos                                                          */
/* ------------------------------------------------------------------ */

function docVisivel(ctx, doc) {
  return ligado(ctx, 'cerebro') || ligado(ctx, AREA_MODULO[doc.area]);
}

function secaoDocumentos(ctx) {
  const docs = (ctx.data?.documentos ?? []).filter((d) => docVisivel(ctx, d));
  const areasDocs = [...new Set(docs.map((d) => d.area))].filter((a) => !AREA_MODULO[a] || ligado(ctx, AREA_MODULO[a]));
  let termo = '';
  let area = '';
  let timer = 0;

  const lista = h('div', { class: 'cb-docs', 'aria-live': 'polite' });
  const campo = h('input', {
    type: 'search', class: 'cb-busca__input', placeholder: 'Buscar em procedimentos, normas, fichas…',
    'aria-label': 'Buscar nos documentos', autocomplete: 'off',
  });
  campo.addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(() => { termo = campo.value.trim(); pinta(); }, 140); });
  const pills = h('div', { class: 'cb-pills', role: 'group', 'aria-label': 'Filtrar por área' });
  function pintaPills() {
    pills.replaceChildren(...[['', 'Todas'], ...areasDocs.map((a) => [a, AREA_CURTA[a] ?? a])].map(([v, l]) =>
      h('button', { type: 'button', class: 'cb-pill', 'aria-pressed': String(area === v), onClick: () => { area = v; pintaPills(); pinta(); } }, l)));
  }

  function linhaDoc(doc, trecho, termoH) {
    const ref = trecho ? `doc:${doc.id}#${trecho.id}` : `doc:${doc.id}`;
    return h('button', { type: 'button', class: 'cb-doc', onClick: () => ctx.openRef?.(ref) },
      icon('file', { size: 18, class: 'cb-doc__ico' }),
      h('span', { class: 'cb-doc__corpo' },
        h('span', { class: 'cb-doc__titulo' }, ...highlight(doc.titulo, termoH),
          h('span', { class: 'cb-doc__meta' }, ` · ${doc.origem}${doc.atualizado ? ` · atualizado ${dataBr(doc.atualizado)}` : ''}`)),
        trecho ? h('span', { class: 'cb-doc__trecho' }, `${trecho.secao} — `, ...highlight(trecho.texto.length > 200 ? `${trecho.texto.slice(0, 199)}…` : trecho.texto, termoH)) : null));
  }

  function linhaOutro(r) {
    const ico = r.ref.startsWith('aprendizado:') ? 'lightbulb' : r.ref.startsWith('saber:') ? 'users' : r.ref.startsWith('nc:') ? 'shield-check' : 'scale';
    return h('button', { type: 'button', class: ['cb-doc', r.aprendizado && 'is-aprendido'], onClick: () => ctx.openRef?.(r.ref) },
      icon(ico, { size: 18, class: 'cb-doc__ico' }),
      h('span', { class: 'cb-doc__corpo' },
        h('span', { class: 'cb-doc__titulo' }, ...highlight(r.titulo, termo)),
        h('span', { class: 'cb-doc__trecho' }, ...highlight(r.trecho, termo))));
  }

  function pinta() {
    if (!termo) {
      const recentes = docs.filter((d) => !area || d.area === area)
        .sort((a, b) => String(b.atualizado ?? '').localeCompare(String(a.atualizado ?? ''))).slice(0, 6);
      lista.replaceChildren(...recentes.map((d) => linhaDoc(d, (d.trechos ?? [])[0], '')));
      if (!recentes.length) lista.replaceChildren(h('p', { class: 'cb-muted' }, 'Nenhum documento nesta área.'));
      return;
    }
    const ctxBusca = { ...ctx, aprendizado: ctx.learning?.list?.() ?? [] };
    const res = buscarLocal(ctxBusca, termo, { limite: 12 }).filter((r) => !area || r.area === area);
    if (!res.length) {
      lista.replaceChildren(h('div', { class: 'cb-nada' },
        h('p', null, `Nada encontrado para “${termo}”. Tente perguntar ao cérebro:`),
        button(`${termo.replace(/[?.!]+$/, '')}?`, { variant: 'secondary', icone: 'search', onClick: () => perguntar(ctx, `${termo.replace(/[?.!]+$/, '')}?`, 'cerebro') })));
      return;
    }
    lista.replaceChildren(...res.map((r) => {
      if (r.ref.startsWith('doc:')) {
        const [id, tr] = r.ref.slice(4).split('#');
        const doc = docs.find((d) => d.id === id);
        if (doc) return linhaDoc(doc, (doc.trechos ?? []).find((t) => t.id === tr), termo);
      }
      return linhaOutro(r);
    }));
  }

  pintaPills();
  pinta();
  return h('section', { class: 'cb-sec', 'data-secao': 'documentos', id: 'documentos', 'aria-labelledby': 'cb-docs-t' },
    h('h2', { class: 'cb-sec__titulo', id: 'cb-docs-t' }, 'Documentos'),
    h('div', { class: 'cb-busca' }, icon('search', { size: 18, class: 'cb-busca__ico' }), campo),
    areasDocs.length > 1 ? pills : null,
    lista);
}

/* ------------------------------------------------------------------ */
/* Página                                                              */
/* ------------------------------------------------------------------ */

export function render(el, ctx) {
  const d = ctx.data ?? {};
  const empresa = empresaCurta(ctx);
  const secao = String(ctx.secao ?? '');
  const areaFiltro = /^aprendido[-:](\w+)$/.exec(secao)?.[1] ?? null;

  const numeros = h('button', { type: 'button', class: 'cb-numeros', onClick: () => ctx.navigate?.('#integracoes') });
  function pintaNumeros() {
    const partes = [];
    const nDocs = (d.documentos ?? []).filter((x) => docVisivel(ctx, x)).length;
    partes.push(`${nDocs} documentos`);
    if (ligado(ctx, 'operadores')) partes.push(`${(d.saberes ?? []).length} saberes de operador`);
    const n = ctx.learning?.list?.().length ?? 0;
    partes.push(`${n} ${n === 1 ? 'registro seu' : 'registros seus'}`);
    if (ligado(ctx, 'integracoes')) {
      const sis = (d.integracoes ?? []).filter((i) => i.status !== 'erro' && i.status !== 'planejado').length;
      if (sis) partes.push(`${sis} sistemas conectados`);
    }
    numeros.replaceChildren(h('span', null, partes.join(' · ')), ligado(ctx, 'integracoes') ? h('span', { 'aria-hidden': 'true' }, ' ›') : null);
    numeros.disabled = !ligado(ctx, 'integracoes');
  }
  pintaNumeros();

  const aprendido = secaoAprendido(ctx, { area: areaFiltro });
  const raiz = h('div', { class: 'cb' },
    h('header', { class: 'cb-cab' },
      h('div', { class: 'cb-cab__textos' },
        h('h1', { class: 'cb-titulo' }, `Cérebro da ${empresa}`),
        h('p', { class: 'cb-lead' }, 'Tudo o que a operação sabe, num lugar só. Cada resposta diz de onde veio.')),
      button('Ensinar o cérebro', { variant: 'primary', icone: 'lightbulb', onClick: () => ensinar(ctx, { origem: 'cerebro' }) })),
    numeros,
    aprendido.el,
    secaoSaber(ctx),
    secaoDocumentos(ctx));
  el.replaceChildren(raiz);

  const off = ctx.learning?.subscribe?.(() => { aprendido.pinta(); pintaNumeros(); });
  const relogio = setInterval(() => atualizaQuandos(raiz), 30000);
  return () => { if (typeof off === 'function') off(); clearInterval(relogio); };
}

/* ------------------------------------------------------------------ */
/* Gavetas (doc, saber, kpi, aprendizado)                              */
/* drawer(info, ctx) → Node | {titulo, subtitulo, corpo, acoes}        */
/* ------------------------------------------------------------------ */

const secaoGaveta = (titulo, ...filhos) => h('section', { class: 'cb-g__sec' }, h('h3', { class: 'cb-g__sec-t' }, titulo), ...filhos);
const fatos = (pares) => h('dl', { class: 'cb-g__fatos' }, pares.filter(([, v]) => v != null && v !== '').map(([k, v]) => h('div', null, h('dt', null, k), h('dd', null, v))));

function drawerDoc(info, ctx) {
  const { doc, trecho } = info.detalhe ?? {};
  if (!doc) return null;
  const areasAcesso = (doc.acesso ?? [doc.area]).map((a) => AREA_CURTA[a] ?? a).join(', ');
  const trechos = (doc.trechos ?? []).slice().sort((a, b) => (trecho && a.id === trecho.id ? -1 : trecho && b.id === trecho.id ? 1 : 0));
  return {
    titulo: doc.titulo,
    subtitulo: [TIPOS_DOC[doc.tipo] ?? doc.tipo, doc.origem, doc.atualizado ? `atualizado ${dataBr(doc.atualizado)}` : null].filter(Boolean).join(' · '),
    corpo: h('div', { class: 'cb-g' },
      ...trechos.map((t) => h('section', { class: ['cb-g__trecho', trecho && t.id === trecho.id && 'is-citado'] },
        h('h3', { class: 'cb-g__sec-t' }, t.secao, trecho && t.id === trecho.id ? h('span', { class: 'cb-g__selo' }, 'Citado') : null),
        ...paragrafos(t.texto))),
      fatos([['Área', AREA_CURTA[doc.area] ?? doc.area], ['Quem acessa', areasAcesso], ['Código', doc.id]])),
  };
}

function drawerSaber(info, ctx) {
  const s = info.detalhe;
  if (!s) return null;
  const maq = s.maquina && ligado(ctx, 'manutencao') ? cartaoFonte(ctx, `maq:${s.maquina}`, null) : null;
  const regs = s.maquina ? (ctx.learning?.list?.({ maquina: s.maquina }) ?? []) : [];
  return {
    titulo: s.titulo,
    subtitulo: `${s.autor} · ${s.funcao}${s.tempo_casa_anos ? ` · ${s.tempo_casa_anos} anos de casa` : ''}`,
    corpo: h('div', { class: 'cb-g' },
      h('blockquote', { class: 'cb-g__dica' }, ...paragrafos(s.dica)),
      fatos([['Validado por', s.validado_por], ['Registrado em', dataBr(s.data)], [ctx.term?.('maquina') ? cap(ctx.term('maquina')) : 'Máquina', s.maquina]]),
      (s.tags ?? []).length ? h('div', { class: 'cb-g__tags' }, s.tags.map((t) => h('span', { class: 'cb-g__tag' }, t))) : null,
      regs.length ? secaoGaveta('Registros da equipe', ...regs.slice(0, 3).map((r) => cartaoFonte(ctx, `aprendizado:${r.id}`, null)).filter(Boolean)) : null,
      maq ? secaoGaveta('Ligações', maq) : null),
  };
}
const cap = (s) => String(s).charAt(0).toUpperCase() + String(s).slice(1);

function valorFmt(v, u) {
  if (u === '%') return `${num(v)}%`;
  if (u === 'R$') return `R$ ${num(v)}`;
  return `${num(v)}${u ? ` ${u}` : ''}`;
}

function drawerKpi(info, ctx) {
  const k = info.detalhe;
  if (!k) return null;
  const ok = k.direcao === 'menor_melhor' ? k.valor <= k.meta : k.valor >= k.meta;
  const fontes = (k.fontes ?? []).map((r) => cartaoFonte(ctx, r, null)).filter(Boolean);
  let spark = null;
  try { spark = (k.tendencia ?? []).length > 1 ? sparkline(k.tendencia, { width: 400, height: 96, class: `cb-g__spark ${ok ? 'is-ok' : 'is-warn'}`, label: `Últimos ${k.tendencia.length} meses` }) : null; } catch { spark = null; }
  return {
    titulo: k.nome,
    subtitulo: AREA_CURTA[k.area] ?? 'Indicador',
    corpo: h('div', { class: 'cb-g' },
      h('div', { class: 'cb-g__kpi' },
        h('span', { class: 'cb-g__kpi-valor num' }, valorFmt(k.valor, k.unidade)),
        h('span', { class: ['cb-g__kpi-meta', ok ? 'is-ok' : 'is-warn'] }, `meta ${valorFmt(k.meta, k.unidade)} · ${ok ? 'dentro da meta' : 'fora da meta'}`)),
      spark ? h('div', { class: 'cb-g__spark-wrap' }, spark, h('span', { class: 'cb-g__spark-leg' }, `Últimos ${k.tendencia.length} meses`)) : null,
      k.explicacao ? secaoGaveta('O que mudou', ...paragrafos(k.explicacao)) : null,
      (k.caminho ?? []).length ? secaoGaveta('Caminho até o dado', h('ol', { class: 'cb-g__passos' }, k.caminho.map((c) => h('li', null, c)))) : null,
      fontes.length ? secaoGaveta('Fontes', h('div', { class: 'cb-g__fontes' }, fontes)) : null),
    acoes: [
      button('Perguntar por quê', {
        variant: 'primary', icone: 'search',
        onClick: () => { info.close?.(); perguntar(ctx, `Por que ${k.nome.charAt(0).toLowerCase()}${k.nome.slice(1)} está em ${valorFmt(k.valor, k.unidade)}?`, AREA_MODULO[k.area] ?? 'visao-geral'); },
      }),
    ],
  };
}

function drawerAprendizado(info, ctx) {
  const it = info.detalhe;
  if (!it) return null;
  const usos = ctx.learning?.usos?.(it.id) ?? 0;
  const maq = it.maquina && ligado(ctx, 'manutencao') ? cartaoFonte(ctx, `maq:${it.maquina}`, null) : null;
  const apagar = confirmInline({
    label: 'Apagar', icone: 'trash', pergunta: 'Apagar este registro?', confirmar: 'Apagar', variant: 'ghost',
    onConfirm: async () => { await ctx.learning?.remove?.(it.id); info.close?.(); },
  });
  return {
    titulo: it.titulo,
    subtitulo: [TIPO_ROTULO[it.tipo] ?? 'Registro', AREA_CURTA[it.area] ?? it.area, it.maquina].filter(Boolean).join(' · '),
    corpo: h('div', { class: 'cb-g' },
      h('p', { class: 'cb-g__selo-apr' }, icon('lightbulb', { size: 16 }), `Registrado por ${quem(it.autor)} · `, h('span', { class: 'fonte__quando', 'data-quando': it.criado_em || '' }, quando(it.criado_em))),
      h('div', { class: 'cb-g__texto-apr' }, ...paragrafos(it.texto)),
      usos ? h('p', { class: 'cb-muted' }, `Usado em ${usos} ${usos === 1 ? 'resposta' : 'respostas'} nesta visita.`) : null,
      it.origem === 'conversa' ? h('p', { class: 'cb-muted' }, 'Registrado pela conversa.') : null,
      maq ? secaoGaveta('Ligações', maq) : null),
    acoes: [
      button('Perguntar sobre isso', { variant: 'primary', icone: 'search', onClick: () => { info.close?.(); perguntar(ctx, perguntaDerivada(it, ctx), AREA_MODULO[it.area] ?? undefined); } }),
      apagar,
    ],
  };
}

export const drawersCerebro = {
  doc: drawerDoc,
  saber: drawerSaber,
  kpi: drawerKpi,
  aprendizado: drawerAprendizado,
};
