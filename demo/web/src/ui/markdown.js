// Markdown seguro para as respostas do cérebro (UX §4.5.5).
//
// - Nada de innerHTML: o DOM é montado com createElement + textContent (o texto da IA nunca vira HTML).
// - Subconjunto: parágrafos, quebra simples, **negrito**/__negrito__, *itálico*/_itálico_, `código`,
//   listas (-, *, •, 1.) com um nível de aninhamento, títulos (#..###### viram o mesmo h4), tabelas GFM
//   (rolagem interna, números à direita), > citação, [texto](url) → só o texto, [[tipo:id]] → sobrescrito
//   numerado de fonte.
// - Streaming (`parcial: true`): marcadores incompletos não aparecem crus. `[[` sem `]]` e a última
//   linha de tabela incompleta ficam retidos; tabela só aparece depois da linha `|---|`; `**`/`*` sem par
//   viram negrito/itálico "otimista" até fechar (o texto continua aparecendo, sem asterisco).
//   No texto final, delimitador sem par é descartado (nenhum `*` literal sobrando).
//
// Sem imports e sem DOM no topo do módulo: parseMarkdown/markdownToHtml rodam em node (markdown.test.mjs).

/* ------------------------------------------------------------------ */
/* Referências                                                         */
/* ------------------------------------------------------------------ */

export const CITE_RE = /\[\[\s*([a-z]+:[^\]\n]+?)\s*\]\]/gi;

/** Refs citadas no texto, na ordem da primeira aparição. */
export function refsDoTexto(texto) {
  const out = [];
  for (const m of String(texto ?? '').matchAll(CITE_RE)) {
    const r = m[1].trim();
    if (!out.includes(r)) out.push(r);
  }
  return out;
}

/**
 * Numeração das fontes de uma resposta: a mesma ref reusa o número; ref que não resolve (módulo
 * desligado, inexistente) não ganha número e o marcador some do texto.
 * `aceita(ref)` decide (padrão: ctx.resolveRef). Depois do texto, `completar(fontes)` numera as que
 * vieram só em `fontes`.
 */
export function criaCitas({ ctx, aceita } = {}) {
  const ok = aceita ?? ((ref) => {
    if (typeof ctx?.resolveRef !== 'function') return true;
    try { return !!ctx.resolveRef(ref); } catch { return false; }
  });
  const mapa = new Map();
  const ordem = [];
  const cache = new Map();
  const aceitaCache = (r) => { if (!cache.has(r)) cache.set(r, !!ok(r)); return cache.get(r); };
  return {
    numero(ref) {
      const r = String(ref).trim();
      if (mapa.has(r)) return mapa.get(r);
      if (!aceitaCache(r)) return null;
      ordem.push(r);
      mapa.set(r, ordem.length);
      return ordem.length;
    },
    /** Só consulta (não numera). */
    consulta: (ref) => mapa.get(String(ref).trim()) ?? null,
    completar(fontes) { for (const f of fontes ?? []) this.numero(f); return ordem.slice(); },
    get ordem() { return ordem.slice(); },
    reset() { mapa.clear(); ordem.length = 0; },
  };
}

/* ------------------------------------------------------------------ */
/* Parser de blocos                                                    */
/* ------------------------------------------------------------------ */

const RE_LISTA = /^( *)([-*•]|\d{1,3}[.)])\s+(.*)$/;
const RE_TITULO = /^ {0,3}#{1,6}\s+(.*?)\s*#*\s*$/;
const RE_SEP = /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/;
const RE_SEP_PARCIAL = /^\s*\|?[\s:|-]*$/;
const RE_REGUA = /^\s*([-*_])(\s*\1){2,}\s*$/;
const ehLinhaTabela = (l) => /^\s*\|/.test(l);

function celulas(linha) {
  let s = linha.trim();
  if (s.startsWith('|')) s = s.slice(1);
  if (s.endsWith('|') && !s.endsWith('\\|')) s = s.slice(0, -1);
  return s.split(/(?<!\\)\|/).map((c) => c.replace(/\\\|/g, '|').trim());
}

/** Tira do fim do buffer o que ainda não pode aparecer (streaming). */
export function cortaParcial(texto) {
  let t = String(texto ?? '');
  // marcador de fonte aberto: "[[op:OP-1" ou "[" solto no fim
  const abre = t.lastIndexOf('[[');
  if (abre !== -1 && t.indexOf(']]', abre) === -1) t = t.slice(0, abre);
  else if (/\[$/.test(t)) t = t.slice(0, -1);
  else if (/\[\[[^\]\n]*\]$/.test(t)) t = t.replace(/\[\[[^\]\n]*\]$/, '');
  // link aberto "[texto](htt" → segura a partir do "["
  const link = /\[[^\]\n]*\]\([^)\n]*$|\[[^\]\n]*\]?$/.exec(t);
  if (link && !/^\[\[/.test(link[0])) t = t.slice(0, link.index);
  // linha de tabela incompleta (a última linha ainda não terminou)
  const ult = t.lastIndexOf('\n');
  const ultima = t.slice(ult + 1);
  if (ehLinhaTabela(ultima)) t = t.slice(0, ult + 1);
  // código inline aberto: segura do ` até fechar
  const crases = (t.match(/`/g) ?? []).length;
  if (crases % 2 === 1) t = t.slice(0, t.lastIndexOf('`'));
  // asteriscos/sublinhados soltos no fim ("**", "*", "__") esperam o próximo caractere
  t = t.replace(/(\*{1,3}|_{1,3})$/, '');
  return t;
}

/**
 * → [{t:'p', inl} | {t:'h', inl} | {t:'ul'|'ol', itens:[{inl, sub?:{t, itens}}]} |
 *    {t:'table', cab:[inl], alin:[...], linhas:[[inl]]} | {t:'quote', blocos}]
 */
export function parseMarkdown(texto, { parcial = false } = {}) {
  let src = String(texto ?? '').replace(/\r\n?/g, '\n').replace(/\t/g, '  ');
  if (parcial) src = cortaParcial(src);
  const linhas = src.split('\n');
  return blocos(linhas, { parcial });
}

function blocos(linhas, opts) {
  const out = [];
  let i = 0;
  let par = null; // linhas do parágrafo corrente
  const fechaPar = () => {
    if (par && par.length) out.push({ t: 'p', inl: inline(par.join('\n'), opts) });
    par = null;
  };
  while (i < linhas.length) {
    const l = linhas[i];
    if (!l.trim()) { fechaPar(); i++; continue; }

    if (RE_REGUA.test(l)) { fechaPar(); i++; continue; }

    const tit = RE_TITULO.exec(l);
    if (tit) { fechaPar(); out.push({ t: 'h', inl: inline(tit[1], opts) }); i++; continue; }

    if (/^\s*>/.test(l)) {
      fechaPar();
      const q = [];
      while (i < linhas.length && /^\s*>/.test(linhas[i])) { q.push(linhas[i].replace(/^\s*>\s?/, '')); i++; }
      out.push({ t: 'quote', blocos: blocos(q, opts) });
      continue;
    }

    if (ehLinhaTabela(l)) {
      const prox = linhas[i + 1];
      if (prox !== undefined && RE_SEP.test(prox)) {
        fechaPar();
        const cab = celulas(l);
        const alinSep = celulas(prox).map((c) => (/^:-+:$/.test(c) ? 'center' : /-:$/.test(c) ? 'right' : null));
        const rows = [];
        i += 2;
        while (i < linhas.length && ehLinhaTabela(linhas[i])) { rows.push(celulas(linhas[i])); i++; }
        const n = cab.length;
        const corpo = rows.map((r) => Array.from({ length: n }, (_, k) => r[k] ?? ''));
        const alin = cab.map((_, k) => {
          if (alinSep[k]) return alinSep[k];
          const vals = corpo.map((r) => r[k]).filter((v) => v !== '');
          return vals.length && vals.every((v) => /\d/.test(v) && /^[\d.,%\sR$−+-]+$/.test(v)) ? 'right' : null;
        });
        out.push({ t: 'table', cab: cab.map((c) => inline(c, opts)), alin, linhas: corpo.map((r) => r.map((c) => inline(c, opts))) });
        continue;
      }
      // tabela ainda sem a linha separadora: no streaming, segura daqui em diante
      if (opts.parcial && (prox === undefined || RE_SEP_PARCIAL.test(prox))) { fechaPar(); break; }
    }

    const li = RE_LISTA.exec(l);
    if (li) {
      fechaPar();
      const ordenada = /\d/.test(li[2]);
      const lista = { t: ordenada ? 'ol' : 'ul', itens: [] };
      if (ordenada) lista.inicio = parseInt(li[2], 10) || 1;
      const base = li[1].length;
      while (i < linhas.length) {
        const cur = linhas[i];
        if (!cur.trim()) {
          // linha em branco: a lista continua só se a próxima for item do mesmo tipo
          const nx = linhas[i + 1] && RE_LISTA.exec(linhas[i + 1]);
          if (nx && /\d/.test(nx[2]) === ordenada && nx[1].length <= base + 1) { i++; continue; }
          break;
        }
        const m = RE_LISTA.exec(cur);
        if (m) {
          const ind = m[1].length;
          if (ind >= base + 2 && lista.itens.length) {
            const pai = lista.itens[lista.itens.length - 1];
            const ord2 = /\d/.test(m[2]);
            if (!pai.sub || pai.sub.t !== (ord2 ? 'ol' : 'ul')) pai.sub = { t: ord2 ? 'ol' : 'ul', itens: [] };
            pai.sub.itens.push({ inl: inline(m[3], opts) });
            i++; continue;
          }
          if (/\d/.test(m[2]) !== ordenada) break;
          lista.itens.push({ inl: inline(m[3], opts), src: m[3] });
          i++; continue;
        }
        // continuação recuada do item anterior
        if (/^ {2,}\S/.test(cur) && lista.itens.length) {
          const pai = lista.itens[lista.itens.length - 1];
          pai.src = `${pai.src}\n${cur.trim()}`;
          pai.inl = inline(pai.src, opts);
          i++; continue;
        }
        break;
      }
      for (const it of lista.itens) delete it.src;
      out.push(lista);
      continue;
    }

    (par ||= []).push(l.trim());
    i++;
  }
  fechaPar();
  return out;
}

/* ------------------------------------------------------------------ */
/* Parser inline                                                       */
/* ------------------------------------------------------------------ */

const alnum = (c) => !!c && /[\p{L}\p{N}]/u.test(c);
const espaco = (c) => !c || /\s/.test(c);

/**
 * → [{t:'text', v} | {t:'br'} | {t:'strong', c} | {t:'em', c} | {t:'code', v} | {t:'cite', ref}]
 */
export function inline(s, opts = {}) {
  const out = [];
  let buf = '';
  const flush = () => { if (buf) { out.push({ t: 'text', v: buf }); buf = ''; } };
  let i = 0;
  while (i < s.length) {
    const c = s[i];

    if (c === '\n') { flush(); out.push({ t: 'br' }); i++; continue; }

    if (c === '\\' && /[\\`*_[\]#|>-]/.test(s[i + 1] ?? '')) { buf += s[i + 1]; i += 2; continue; }

    if (c === '`') {
      const fim = s.indexOf('`', i + 1);
      if (fim !== -1) { flush(); out.push({ t: 'code', v: s.slice(i + 1, fim) }); i = fim + 1; continue; }
      i++; continue; // crase solta: some
    }

    if (c === '[' && s[i + 1] === '[') {
      const m = /^\[\[\s*([a-z]+:[^\]\n]+?)\s*\]\]/i.exec(s.slice(i));
      if (m) { flush(); out.push({ t: 'cite', ref: m[1].trim() }); i += m[0].length; continue; }
    }

    if (c === '[') {
      const m = /^\[([^\]\n]+)\]\(([^)\s]*)\)/.exec(s.slice(i));
      if (m) { flush(); out.push(...inline(m[1], opts)); i += m[0].length; continue; }
    }

    if ((c === '*' || c === '_') && s[i + 1] === c) {
      const d = c + c;
      const antes = s[i - 1];
      const depois = s[i + 2];
      const podeAbrir = !espaco(depois) && !(c === '_' && alnum(antes));
      if (podeAbrir) {
        const fim = acharFecho(s, i + 2, d);
        if (fim !== -1) { flush(); out.push({ t: 'strong', c: inline(s.slice(i + 2, fim), opts) }); i = fim + 2; continue; }
        // sem par: no streaming, negrito otimista; no final, descarta o marcador
        flush();
        if (opts.parcial) { out.push({ t: 'strong', c: inline(s.slice(i + 2), opts) }); i = s.length; continue; }
        i += 2; continue;
      }
      if (c === '*') { i += 2; continue; } // "**" solto (ex.: "** ") some
      buf += d; i += 2; continue;
    }

    if (c === '*' || c === '_') {
      const antes = s[i - 1];
      const depois = s[i + 1];
      const podeAbrir = !espaco(depois) && !(c === '_' && alnum(antes)) && depois !== c;
      if (podeAbrir) {
        const fim = acharFecho(s, i + 1, c);
        if (fim !== -1) { flush(); out.push({ t: 'em', c: inline(s.slice(i + 1, fim), opts) }); i = fim + 1; continue; }
        flush();
        if (opts.parcial && c === '*') { out.push({ t: 'em', c: inline(s.slice(i + 1), opts) }); i = s.length; continue; }
        if (c === '*') { i++; continue; } // asterisco órfão some
      } else if (c === '*' && !(espaco(antes) && espaco(depois))) {
        i++; continue; // "palavra* " órfão
      }
      buf += c; i++; continue;
    }

    buf += c; i++;
  }
  flush();
  return out;
}

/** Posição do delimitador que fecha (não precedido de espaço; "_" não seguido de letra). */
function acharFecho(s, desde, d) {
  let j = desde;
  while (j < s.length) {
    const k = s.indexOf(d, j);
    if (k === -1) return -1;
    if (k === desde) { j = k + 1; continue; }
    if (d.length === 2 && s[k + 2] === d[0]) { j = k + 1; continue; } // "***": fecha no último par
    const antes = s[k - 1];
    const depois = s[k + d.length];
    // "**a**b" ok; para um "*" simples, não confundir com "**"
    const okEsp = !espaco(antes);
    const okLetra = d[0] !== '_' || !alnum(depois);
    const okDuplo = d.length === 2 || (s[k + 1] !== '*' && s[k - 1] !== '*') || d[0] === '_';
    if (okEsp && okLetra && okDuplo) return k;
    j = k + 1;
  }
  return -1;
}

/* ------------------------------------------------------------------ */
/* Saída em string (testes, Copiar)                                    */
/* ------------------------------------------------------------------ */

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function inlineHtml(nos, citas) {
  return nos.map((n) => {
    switch (n.t) {
      case 'text': return esc(n.v);
      case 'br': return '<br>';
      case 'strong': return `<strong>${inlineHtml(n.c, citas)}</strong>`;
      case 'em': return `<em>${inlineHtml(n.c, citas)}</em>`;
      case 'code': return `<code>${esc(n.v)}</code>`;
      case 'cite': {
        const num = citas ? citas.numero(n.ref) : null;
        return num ? `<sup data-ref="${esc(n.ref)}">${num}</sup>` : '';
      }
      default: return '';
    }
  }).join('');
}

function listaHtml(b, citas) {
  const tag = b.t;
  const ini = tag === 'ol' && b.inicio && b.inicio !== 1 ? ` start="${b.inicio}"` : '';
  return `<${tag}${ini}>${b.itens.map((it) => `<li>${inlineHtml(it.inl, citas)}${it.sub ? listaHtml(it.sub, citas) : ''}</li>`).join('')}</${tag}>`;
}

function blocosHtml(bs, citas) {
  return bs.map((b) => {
    switch (b.t) {
      case 'p': return `<p>${inlineHtml(b.inl, citas)}</p>`;
      case 'h': return `<h4>${inlineHtml(b.inl, citas)}</h4>`;
      case 'ul': case 'ol': return listaHtml(b, citas);
      case 'quote': return `<blockquote>${blocosHtml(b.blocos, citas)}</blockquote>`;
      case 'table': {
        const th = b.cab.map((c, k) => `<th${b.alin[k] ? ` align="${b.alin[k]}"` : ''}>${inlineHtml(c, citas)}</th>`).join('');
        const trs = b.linhas.map((r) => `<tr>${r.map((c, k) => `<td${b.alin[k] ? ` align="${b.alin[k]}"` : ''}>${inlineHtml(c, citas)}</td>`).join('')}</tr>`).join('');
        return `<div class="md-table"><table><thead><tr>${th}</tr></thead><tbody>${trs}</tbody></table></div>`;
      }
      default: return '';
    }
  }).join('');
}

/** HTML escapado (para testes em node; a página usa renderMarkdown, que não passa por string). */
export function markdownToHtml(texto, { parcial = false, citas = criaCitas({ aceita: () => true }) } = {}) {
  return blocosHtml(parseMarkdown(texto, { parcial }), citas);
}

/** Texto puro sem marcação (leitores de tela, aria-live, resumo). */
export function markdownToText(texto) {
  const plain = (nos) => nos.map((n) => (n.t === 'text' || n.t === 'code' ? n.v : n.t === 'br' ? ' ' : n.c ? plain(n.c) : '')).join('');
  const bl = (bs) => bs.map((b) => {
    if (b.t === 'p' || b.t === 'h') return plain(b.inl);
    if (b.t === 'ul' || b.t === 'ol') return b.itens.map((it) => `• ${plain(it.inl)}`).join('\n');
    if (b.t === 'quote') return bl(b.blocos);
    if (b.t === 'table') return [b.cab, ...b.linhas].map((r) => r.map(plain).join(' · ')).join('\n');
    return '';
  }).join('\n\n');
  return bl(parseMarkdown(texto));
}

/**
 * Markdown para a área de transferência (UX §4.5.5): sem os marcadores [[…]], com "Fontes:" e os
 * rótulos no fim. `rotulos` = [{n, rotulo, tipo}] na ordem dos números.
 */
export function textoParaCopiar(texto, rotulos = []) {
  const corpo = String(texto ?? '').replace(CITE_RE, '').replace(/[ \t]+([.,;:!?])/g, '$1').replace(/[ \t]{2,}/g, ' ').trim();
  if (!rotulos.length) return corpo;
  return `${corpo}\n\nFontes:\n${rotulos.map((r, i) => `${r.n ?? i + 1}. ${r.tipo ? `${r.tipo}: ` : ''}${r.rotulo}`).join('\n')}`;
}

/* ------------------------------------------------------------------ */
/* DOM                                                                 */
/* ------------------------------------------------------------------ */

function el(tag, cls, ...filhos) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  for (const f of filhos) if (f != null) e.appendChild(typeof f === 'string' ? document.createTextNode(f) : f);
  return e;
}

function inlineDom(pai, nos, o) {
  for (const n of nos) {
    switch (n.t) {
      case 'text': pai.appendChild(document.createTextNode(n.v)); break;
      case 'br': pai.appendChild(el('br')); break;
      case 'strong': inlineDom(pai.appendChild(el('strong')), n.c, o); break;
      case 'em': inlineDom(pai.appendChild(el('em')), n.c, o); break;
      case 'code': pai.appendChild(el('code', 'md-code', n.v)); break;
      case 'cite': {
        const num = o.citas ? o.citas.numero(n.ref) : null;
        if (!num) break;
        pai.appendChild(o.citeNode ? o.citeNode(n.ref, num) : citeNodePadrao(n.ref, num, o));
        break;
      }
      default: break;
    }
  }
}

function citeNodePadrao(ref, num, o) {
  const b = el('button', 'md-cite', String(num));
  b.type = 'button';
  b.dataset.ref = ref;
  b.dataset.n = String(num);
  b.setAttribute('aria-label', `Fonte ${num}`);
  b.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); o.ctx?.openRef?.(ref); });
  return el('sup', 'md-sup', b);
}

function listaDom(b, o) {
  const l = el(b.t, `md-${b.t}`);
  if (b.t === 'ol' && b.inicio && b.inicio !== 1) l.start = b.inicio;
  for (const it of b.itens) {
    const li = l.appendChild(el('li'));
    inlineDom(li, it.inl, o);
    if (it.sub) li.appendChild(listaDom(it.sub, o));
  }
  return l;
}

function blocosDom(pai, bs, o) {
  for (const b of bs) {
    switch (b.t) {
      case 'p': inlineDom(pai.appendChild(el('p', 'md-p')), b.inl, o); break;
      case 'h': inlineDom(pai.appendChild(el('h4', 'md-h')), b.inl, o); break;
      case 'ul': case 'ol': pai.appendChild(listaDom(b, o)); break;
      case 'quote': blocosDom(pai.appendChild(el('blockquote', 'md-quote')), b.blocos, o); break;
      case 'table': {
        const wrap = el('div', 'md-table');
        wrap.tabIndex = 0;
        wrap.setAttribute('role', 'region');
        wrap.setAttribute('aria-label', 'Tabela');
        const t = wrap.appendChild(el('table'));
        const trh = t.appendChild(el('thead')).appendChild(el('tr'));
        b.cab.forEach((c, k) => { const th = trh.appendChild(el('th')); th.scope = 'col'; if (b.alin[k]) th.className = `is-${b.alin[k]}`; inlineDom(th, c, o); });
        const tb = t.appendChild(el('tbody'));
        for (const r of b.linhas) {
          const tr = tb.appendChild(el('tr'));
          r.forEach((c, k) => { const td = tr.appendChild(el('td')); if (b.alin[k]) td.className = `is-${b.alin[k]}`; inlineDom(td, c, o); });
        }
        atualizaSombra(wrap);
        wrap.addEventListener('scroll', () => atualizaSombra(wrap), { passive: true });
        pai.appendChild(wrap);
        break;
      }
      default: break;
    }
  }
}

function atualizaSombra(w) {
  requestAnimationFrame?.(() => {
    w.classList.toggle('has-more-right', w.scrollLeft + w.clientWidth < w.scrollWidth - 2);
    w.classList.toggle('has-more-left', w.scrollLeft > 2);
  });
}

/** Põe o cursor de streaming no fim do último bloco de texto. */
function poeCursor(raiz) {
  let alvo = raiz.lastElementChild;
  while (alvo && (alvo.tagName === 'UL' || alvo.tagName === 'OL' || alvo.tagName === 'BLOCKQUOTE')) alvo = alvo.lastElementChild ?? alvo;
  if (alvo && (alvo.tagName === 'LI')) {
    const sub = [...alvo.children].find((c) => c.tagName === 'UL' || c.tagName === 'OL');
    if (sub && sub.lastElementChild) alvo = sub.lastElementChild;
  }
  const cur = el('span', 'md-cursor');
  cur.setAttribute('aria-hidden', 'true');
  if (!alvo || alvo.classList.contains('md-table')) raiz.appendChild(cur);
  else alvo.appendChild(cur);
}

/**
 * renderMarkdown(texto, {ctx, parcial, cursor, citas, citeNode}) → HTMLElement (div.md)
 * `citas` (de criaCitas) é compartilhado com os cartões de fonte para os números baterem.
 * `citeNode(ref, n)` permite trocar o sobrescrito (fontes.js liga hover/foco ao cartão).
 */
export function renderMarkdown(texto, opts = {}) {
  const o = { ...opts };
  if (!o.citas) o.citas = criaCitas({ ctx: o.ctx });
  const raiz = el('div', ['md', o.class].filter(Boolean).join(' '));
  blocosDom(raiz, parseMarkdown(texto, { parcial: !!o.parcial }), o);
  if (o.cursor) poeCursor(raiz);
  return raiz;
}

export default renderMarkdown;
