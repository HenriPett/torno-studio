// Fontes da resposta (UX §4.5.4): sobrescritos numerados ligados a cartões com o sistema de origem.
//
//   blocoFontes({ctx, refs, citas, learning, max}) → <section> "Fontes" com cartões (aprendido primeiro)
//   cartaoFonte(ctx, ref, n, {realce}) → <button> cartão de 72 px (ou null se a ref não resolve)
//   cartaoAprendido(item, {ctx, estatico}) → cartão "Registrado por {autor} · agora"
//   citeNodeLigado(raiz, ctx) → fábrica de sobrescritos: hover/foco destaca o cartão, clique abre a gaveta
//   sistemaDaRef(resolved, ctx) · origemDaRef(resolved, ctx) · quando(iso) · rotulosParaCopiar(ctx, refs, citas)
//   abrirFonte(ctx, ref) → abre a gaveta com o rodapé "Origem: …" e dispara o marco 'fonte'
//   marco(tipo) → window 'torno:marco' {tipo} (roteiro guiado do Início)
//   partesDoRegistro(item) → {titulo, corpo} sem repetir o título nem mexer na capitalização

import { h, icon } from '../ui.js';
import { fmt } from '../format.js';
import { statusLabel } from '../ai/local-engine.js';
import { tituloDoTexto } from '../learning.js';
import { origemDoRef, rotuloSistema } from '../origem.js';

const ICONE = {
  doc: 'file', op: 'factory', turno: 'clock', pedido: 'box', sku: 'box', cliente: 'building', rep: 'user', regra: 'scale',
  nc: 'shield-check', os: 'wrench', maq: 'cpu', kpi: 'chart', saber: 'users', integ: 'plug', aprendizado: 'lightbulb',
};

const dataBr = (iso) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(iso ?? ''));
  return m ? `${m[3]}/${m[2]}` : '';
};
const curto = (s, n = 90) => {
  const t = String(s ?? '').replace(/\s+/g, ' ').trim();
  return t.length > n ? `${t.slice(0, n - 1).replace(/\s+\S*$/, '')}…` : t;
};

/** "agora", "há 5 min", "há 2 h", "ontem", "12/11". Usa o relógio real (os registros são de agora). */
export function quando(iso, agora = Date.now()) {
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return 'agora';
  const s = Math.max(0, Math.round((agora - t) / 1000));
  if (s < 60) return 'agora';
  const min = Math.round(s / 60);
  if (min < 60) return `há ${min} min`;
  const hh = Math.round(min / 60);
  if (hh < 24) return `há ${hh} h`;
  if (hh < 48) return 'ontem';
  return dataBr(iso) || 'antes';
}

/** Dispara um marco do roteiro guiado do Início ('pergunta' | 'fonte' | 'ensino'). */
export function marco(tipo) {
  try { window.dispatchEvent(new CustomEvent('torno:marco', { detail: { tipo } })); } catch { /* sem window */ }
}

/*
 * Origem de cada tipo de registro, ligada às integrações do próprio pacote (ctx.data.integracoes).
 * 1º: origemDoRef de origem.js (a mesma regra do Início: casa pelo que a integração diz que traz).
 * 2º: integração do tipo certo (ex.: MES para turno, planilha de manutenção para OS); se ela ainda não
 *     está conectada, o que a própria integração diz sobre onde o dado está hoje ("ERP / planilha").
 * Sem nada disso, fica um rótulo de área, sem inventar sistema.
 */
const REGRAS_ORIGEM = {
  op: [{ tipo: /^MES$/ }, { tipo: /^ERP$/ }],
  turno: [{ tipo: /^MES$/ }, { tipo: /^Planilhas?$/, obs: /turno|parada/i }],
  pedido: [{ tipo: /^ERP$/ }],
  sku: [{ tipo: /^ERP$/ }],
  cliente: [{ tipo: /^ERP$/ }],
  rep: [{ tipo: /^ERP$/ }],
  regra: [{ tipo: /^ERP$/ }],
  nc: [{ tipo: /^Qualidade$/ }],
  os: [{ tipo: /^Manuten/ }, { tipo: /^Planilhas?$/, obs: /manuten|preventiva/i }],
  maq: [{ tipo: /^Manuten/ }, { tipo: /^Planilhas?$/, obs: /manuten|preventiva/i }],
};
const SEM_INTEGRACAO = { nc: 'registros da qualidade', os: 'registros da manutenção', maq: 'registros da manutenção' };
/** Sistemas que o texto de uma integração não conectada aponta como origem de hoje ("estão no ERP e em planilha"). */
const SISTEMAS_CITADOS = [[/\bERP\b/, 'ERP'], [/\bMES\b/, 'MES'], [/planilhas?\b/i, 'planilha'], [/e-?mail/i, 'e-mail'], [/sharepoint/i, 'SharePoint'], [/\bpapel\b/i, 'papel']];

const conectada = (i) => (i?.status === 'conectado' || i?.status === 'sincronizando' || i?.status === 'erro') && !!i?.ultima_sync;
const fmtDe = (ctx) => ctx?.fmt ?? fmt;
const hojeDe = (ctx) => ctx?.today ?? ctx?.data?.data_referencia ?? fmt.TODAY;
/** "07:40" se for hoje nos dados; senão "12 nov, 18:30". */
function horaSync(iso, ctx) {
  if (!iso) return '';
  const f = fmtDe(ctx);
  return String(iso).slice(0, 10) === hojeDe(ctx) && f.time(iso) ? f.time(iso) : f.datetime(iso);
}
const deIntegracao = (i) => ({ sistema: rotuloSistema(i), nome: i.nome, sync: i.ultima_sync ?? null, erro: i.status === 'erro' });

/**
 * De onde vem o registro, segundo o pacote:
 * → {sistema (curto, para o cartão), nome (completo, para a gaveta), sync (AAAA-MM-DDTHH:MM),
 *    atualizado (data do próprio registro, ex. documento), nota (ex.: integração planejada), erro} | null
 */
export function origemDaRef(r, ctx) {
  const d = r?.detalhe ?? {};
  const data = ctx?.data ?? {};
  const integ = data.integracoes ?? [];
  switch (r?.tipo) {
    case 'doc': {
      if (!d.doc?.origem) return null;
      const o = origemDoRef(data, r);
      return { sistema: d.doc.origem, nome: o?.integ?.nome || d.doc.origem, atualizado: d.doc.atualizado ?? null };
    }
    case 'saber': return { sistema: '', nome: [d.autor ? `relato de ${d.autor}` : 'relato de operador', d.funcao].filter(Boolean).join(', ') };
    case 'kpi': {
      const o = origemDoRef(data, r);
      if (o?.integ) return deIntegracao(o.integ);
      const passos = [...new Set((d.caminho ?? []).map((c) => String(c).split('›')[0].trim()).filter((c) => c && !/^c[aá]lculo/i.test(c)))];
      return passos.length ? { sistema: passos[0], nome: passos.join(', ') } : null;
    }
    case 'integ': return { sistema: '', nome: 'painel de integrações', sync: d.ultima_sync ?? null };
    default: break;
  }
  const o = origemDoRef(data, r);
  if (o?.integ) return deIntegracao(o.integ);
  for (const regra of REGRAS_ORIGEM[r?.tipo] ?? []) {
    const i = integ.find((x) => regra.tipo.test(x.tipo ?? '') && (!regra.obs || regra.obs.test(x.observacao ?? '')));
    if (!i) continue;
    if (conectada(i)) return deIntegracao(i);
    // integração ainda não conectada: o dado vem de onde a própria integração diz que ele está hoje
    const citados = SISTEMAS_CITADOS.filter(([re]) => re.test(i.observacao ?? '')).map(([, n]) => n);
    if (citados.length) {
      return { sistema: citados.join(' / '), nome: citados.join(' / '), nota: `${i.nome}: integração ${i.status === 'planejado' ? 'prevista' : statusLabel(i.status)}` };
    }
  }
  const area = SEM_INTEGRACAO[r?.tipo];
  return area ? { sistema: '', nome: area } : null;
}

/** Sistema de origem de uma fonte (linha 1 do cartão). */
export function sistemaDaRef(r, ctx) {
  const o = origemDaRef(r, ctx);
  if (o?.sistema) return o.sistema;
  switch (r?.tipo) {
    case 'doc': return 'Documento';
    case 'nc': return 'Qualidade';
    case 'os': case 'maq': return 'Manutenção';
    case 'saber': return 'Saber de operador';
    case 'kpi': return 'Indicador';
    case 'integ': return 'Integrações';
    default: return '';
  }
}

/** "MES · sincronizado 07:40" (linha 1 do cartão, depois do tipo). '' quando repetiria o tipo. */
function linhaOrigem(r, ctx) {
  const o = origemDaRef(r, ctx);
  const sist = o?.sistema || sistemaDaRef(r, ctx);
  if (!sist || sist === r?.tipoNome) return ''; // evita "Saber de operador · Saber de operador"
  if (!o?.sync) return sist;
  return `${sist} · ${o.erro ? 'última sincronização' : 'sincronizado'} ${horaSync(o.sync, ctx)}`;
}

/** Rodapé da gaveta: "Origem: {sistema} · atualizado {data hora} · dado fictício". */
export function rodapeOrigem(r, ctx) {
  if (!r) return null;
  const f = fmtDe(ctx);
  let texto;
  if (r.tipo === 'aprendizado') {
    const autor = r.detalhe?.autor && r.detalhe.autor !== 'Você' ? r.detalhe.autor : 'você';
    texto = `Origem: registrado nesta demonstração por ${autor} · ${quando(r.detalhe?.criado_em)}`;
  } else {
    const o = origemDaRef(r, ctx);
    const em = o?.sync ? f.datetime(o.sync) : o?.atualizado ? f.date(o.atualizado) : '';
    texto = [
      `Origem: ${o?.nome || sistemaDaRef(r, ctx) || 'pacote da demonstração'}`,
      o?.nota || null,
      em ? `${o?.erro ? 'última sincronização' : 'atualizado'} ${em}` : null,
      'dado fictício',
    ].filter(Boolean).join(' · ');
  }
  return h('p', { class: 'fonte-origem' }, icon('plug', { size: 14 }), h('span', null, texto));
}

/**
 * Abre a gaveta de uma fonte (cartão ou sobrescrito), acrescenta o rodapé de origem e avisa o
 * roteiro guiado. → a folha aberta ou null.
 */
export function abrirFonte(ctx, ref) {
  let s = null;
  try { s = ctx?.openRef?.(ref) ?? null; } catch (e) { console.error('[fontes] openRef', e); }
  if (!s) return null;
  const corpo = s.body ?? null;
  if (corpo && !corpo.querySelector(':scope > .fonte-origem')) {
    const rod = rodapeOrigem(resolve(ctx, ref), ctx);
    if (rod) corpo.append(rod);
  }
  marco('fonte');
  return s;
}

/** Linha 3 do cartão: status, data, trecho. */
function detalheDaRef(r, ctx) {
  const d = r?.detalhe ?? {};
  const t = (k) => (typeof ctx?.term === 'function' ? ctx.term(k) : k);
  switch (r?.tipo) {
    case 'op': return [statusLabel(d.status), d.progresso != null ? `${d.progresso}%` : null, d.prazo ? `prazo ${dataBr(d.prazo)}` : null].filter(Boolean).join(' · ');
    case 'pedido': return [statusLabel(d.status), d.previsao_entrega ? `${d.status === 'atrasado' ? 'nova previsão' : 'previsão'} ${dataBr(d.previsao_entrega)}` : null].filter(Boolean).join(' · ');
    case 'nc': return [statusLabel(d.status), d.severidade ? `severidade ${d.severidade}` : null].filter(Boolean).join(' · ');
    case 'os': return [statusLabel(d.status), d.tecnico].filter(Boolean).join(' · ');
    case 'maq': return [statusLabel(d.status), d.proxima_preventiva ? `preventiva ${dataBr(d.proxima_preventiva)}` : null].filter(Boolean).join(' · ');
    case 'doc': return d.trecho ? curto(d.trecho.texto, 90) : d.doc?.atualizado ? `atualizado ${dataBr(d.doc.atualizado)}` : '';
    case 'turno': return `${d.produzido ?? '—'} produzidas · ${d.paradas_min ?? 0} min de parada`;
    case 'sku': return d.estoque != null ? `estoque ${d.estoque.toLocaleString('pt-BR')} · mínimo ${Number(d.estoque_minimo ?? 0).toLocaleString('pt-BR')}` : '';
    case 'cliente': return [d.cidade && d.uf ? `${d.cidade}/${d.uf}` : null, d.tabela_preco].filter(Boolean).join(' · ');
    case 'rep': return d.meta_mes ? `${Math.round((d.realizado_mes / d.meta_mes) * 100)}% da meta do mês` : t('representante');
    case 'regra': return curto(d.texto, 90);
    case 'kpi': return d.valor != null ? `${String(d.valor).replace('.', ',')}${d.unidade === '%' ? '%' : d.unidade ? ` ${d.unidade}` : ''} · meta ${String(d.meta).replace('.', ',')}${d.unidade === '%' ? '%' : ''}` : '';
    case 'saber': return [d.autor, d.funcao, d.tempo_casa_anos ? `${d.tempo_casa_anos} anos de casa` : null].filter(Boolean).join(' · ');
    case 'integ': return statusLabel(d.status);
    default: return '';
  }
}

const resolve = (ctx, ref) => {
  if (typeof ctx?.resolveRef !== 'function') return null;
  try { return ctx.resolveRef(ref); } catch { return null; }
};

/**
 * Título e corpo de um registro, sem repetir o título no corpo e sem mexer na capitalização do texto.
 * Título cortado ("… depois que o…") → o corpo continua do ponto do corte, recuando até o começo da
 * palavra partida ("…laboratório liberar o lote 3"). Título que é a 1ª frase → o corpo é o resto.
 * Texto que cabe no título → corpo vazio. → {titulo, corpo}
 */
export function partesDoRegistro(item) {
  const texto = String(item?.texto ?? '').replace(/\s+/g, ' ').trim();
  let titulo = String(item?.titulo || tituloDoTexto(texto)).trim();
  if (!texto) return { titulo, corpo: '' };
  const cortado = /(…|\.\.\.)$/.test(titulo);
  const base = titulo.replace(/\s*(…|\.\.\.)$/, '');
  const letra = /[\p{L}\p{N}]/u;
  if (base && texto.toLocaleLowerCase('pt-BR').startsWith(base.toLocaleLowerCase('pt-BR'))) {
    let i = base.length;
    if (cortado) {
      // corte no meio da palavra ("laborat…"): título e corpo recuam para o começo dela
      if (letra.test(texto[i] ?? '') && letra.test(texto[i - 1] ?? '')) {
        const j = texto.lastIndexOf(' ', i);
        if (j > 0) {
          i = j;
          titulo = `${base.slice(0, j).replace(/[\s,;:—–-]+$/, '')}…`;
        }
      }
      const resto = texto.slice(i).replace(/^[\s,;:—–-]+/, '').trimEnd();
      return { titulo, corpo: letra.test(resto) ? `…${resto}` : '' };
    }
    const resto = texto.slice(i).replace(/^[\s.,;:!?…—–-]+/, '');
    return { titulo, corpo: letra.test(resto) ? resto : '' };
  }
  // título escrito por outra via (ex.: a IA no "anota que…"): o corpo é o texto, como foi escrito
  const igual = texto.replace(/[.!?…\s]+$/, '').toLocaleLowerCase('pt-BR') === base.replace(/[.!?…\s]+$/, '').toLocaleLowerCase('pt-BR');
  return { titulo, corpo: igual ? '' : texto };
}

/** Cartão de um registro aprendido (fonte, confirmação e listas). */
export function cartaoAprendido(item, { ctx, n, estatico = false, realce = false, onClick } = {}) {
  const autor = item?.autor || 'Você';
  const quem = autor === 'Você' ? 'você' : autor;
  const linha1 = h('span', { class: 'fonte__l1 fonte__l1--aprendido' },
    n ? h('span', { class: 'fonte__n num' }, String(n)) : null,
    icon('lightbulb', { size: 14 }),
    h('span', null, `Registrado por ${quem} · `, h('span', { class: 'fonte__quando', 'data-quando': item?.criado_em || '' }, quando(item?.criado_em))));
  // linha 2 = título; linha 3 = o que o título não mostrou do texto
  const { titulo, corpo } = partesDoRegistro(item);
  const filhos = [linha1,
    h('span', { class: 'fonte__l2' }, titulo),
    corpo ? h('span', { class: 'fonte__l3' }, curto(corpo, estatico ? 220 : 110)) : null];
  const cls = ['fonte', 'fonte--aprendido', realce && 'is-new'];
  if (estatico) return h('div', { class: cls, 'data-ref': `aprendizado:${item?.id}` }, ...filhos);
  return h('button', {
    type: 'button', class: cls, 'data-ref': `aprendizado:${item?.id}`,
    'aria-label': `${n ? `Fonte ${n}: ` : ''}registrado por ${quem}: ${titulo}`,
    onClick: onClick ?? (() => abrirFonte(ctx, `aprendizado:${item?.id}`)),
  }, ...filhos);
}

/** Cartão de fonte (botão que abre a gaveta). null quando a ref não resolve. */
export function cartaoFonte(ctx, ref, n, { realce = false } = {}) {
  const r = resolve(ctx, ref);
  if (!r) return null;
  if (r.tipo === 'aprendizado') return cartaoAprendido(r.detalhe, { ctx, n, realce });
  const origem = linhaOrigem(r, ctx);
  const l1 = origem ? `${r.tipoNome} · ${origem}` : r.tipoNome;
  const det = detalheDaRef(r, ctx);
  return h('button', {
    type: 'button', class: 'fonte', 'data-ref': ref,
    'aria-label': `Fonte ${n ?? ''}: ${r.tipoNome}${origem ? `, ${origem}` : ''}: ${r.rotulo}`,
    onClick: () => abrirFonte(ctx, ref),
  },
  h('span', { class: 'fonte__l1' },
    n ? h('span', { class: 'fonte__n num' }, String(n)) : null,
    icon(ICONE[r.tipo] || 'file', { size: 14 }),
    h('span', { title: l1 }, l1)),
  h('span', { class: 'fonte__l2' }, r.rotulo),
  det ? h('span', { class: 'fonte__l3' }, det) : null);
}

/**
 * Seção "Fontes". `refs` = fontes da resposta; `citas` (criaCitas de markdown.js) já numerou as do
 * texto; as que vieram só em `fontes` ganham os números seguintes. Aprendido primeiro; 4 visíveis.
 */
export function blocoFontes({ ctx, refs = [], citas, learning, max = 4 } = {}) {
  const ordem = citas ? citas.completar(refs) : [...new Set(refs)];
  const numero = (ref) => (citas ? citas.consulta(ref) : ordem.indexOf(ref) + 1);
  const ordenadas = [...ordem].sort((a, b) => {
    const aa = a.startsWith('aprendizado:') ? 0 : 1;
    const bb = b.startsWith('aprendizado:') ? 0 : 1;
    return aa - bb || numero(a) - numero(b);
  });
  const cartoes = [];
  for (const ref of ordenadas) {
    let realce = false;
    if (ref.startsWith('aprendizado:') && learning?.primeiraVez) realce = learning.primeiraVez(ref.slice(12));
    const c = cartaoFonte(ctx, ref, numero(ref), { realce });
    if (c) cartoes.push(c);
  }
  if (!cartoes.length) return null;
  cartoes.forEach((c, i) => c.style.setProperty('--i', String(i)));
  const grade = h('div', { class: 'fontes__grade' }, cartoes.slice(0, max));
  const resto = cartoes.slice(max);
  const mais = resto.length ? h('button', {
    type: 'button', class: 'fontes__mais',
    onClick: (e) => { grade.append(...resto); e.currentTarget.remove(); resto[0]?.focus(); },
  }, `+ ${resto.length} ${resto.length === 1 ? 'fonte' : 'fontes'}`) : null;
  return h('section', { class: 'fontes', 'aria-label': 'Fontes' }, h('h3', { class: 'fontes__titulo' }, 'Fontes'), grade, mais);
}

/**
 * Sobrescrito de citação ligado aos cartões dentro de `raiz` (hover/foco destaca o cartão com o mesmo
 * data-ref; clique abre a gaveta).
 */
export function citeNodeLigado(raiz, ctx) {
  const marca = (ref, on) => {
    for (const c of raiz.querySelectorAll('.fonte[data-ref]')) if (c.dataset.ref === ref) c.classList.toggle('is-linked', on);
  };
  return (ref, n) => {
    const b = h('button', {
      type: 'button', class: 'md-cite', 'data-ref': ref, 'aria-label': `Fonte ${n}`,
      onClick: (e) => { e.preventDefault(); e.stopPropagation(); abrirFonte(ctx, ref); },
      onMouseenter: () => marca(ref, true), onMouseleave: () => marca(ref, false),
      onFocus: () => marca(ref, true), onBlur: () => marca(ref, false),
    }, String(n));
    return h('sup', { class: 'md-sup' }, b);
  };
}

/** [{n, tipo, rotulo}] para o "Copiar". */
export function rotulosParaCopiar(ctx, refs, citas) {
  const out = [];
  for (const ref of refs) {
    const r = resolve(ctx, ref);
    if (!r) continue;
    const n = citas?.consulta?.(ref) ?? out.length + 1;
    out.push({ n, tipo: r.tipo === 'aprendizado' ? `Registrado por ${r.detalhe?.autor || 'você'}` : r.tipoNome, rotulo: r.rotulo });
  }
  return out.sort((a, b) => a.n - b.n);
}

/** Atualiza os "há 5 min" visíveis (chamado de tempos em tempos pela conversa e pelo Cérebro). */
export function atualizaQuandos(raiz = document) {
  for (const el of raiz.querySelectorAll('.fonte__quando[data-quando]')) el.textContent = quando(el.dataset.quando);
}
