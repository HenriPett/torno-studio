// Ensinar o cérebro (UX §4.6): gaveta com o formulário e a confirmação "O cérebro aprendeu".
//
//   abrirEnsinar(ctx, {area, maquina, tipo, origem, texto}) → {el, close}
//   areaDoTexto(ctx, texto) → 'comercial' | 'manutencao' | 'qualidade' | 'producao' | null (área sugerida
//     pelo que a pessoa escreve; o select segue a sugestão até ela mexer nele)
//   perguntaDerivada(item, ctx)  (reexportada do motor local: a mesma pergunta que o motor sempre casa)
//
// Grava via ctx.learning.add (otimista, learning.js). Depois de gravar, a gaveta troca de conteúdo
// (não fecha) e oferece "Perguntar sobre isso", que fecha e envia a pergunta derivada na conversa.

import { h, icon, button, segmented, spinner, sheet as uiSheet } from '../ui.js';
import { perguntaDerivada } from '../ai/local-engine.js';
import { TIPOS_APRENDIZADO, tituloDoTexto } from '../learning.js';
import { cartaoAprendido, marco } from './fontes.js';
import { normalize } from '../format.js';

export { perguntaDerivada };

const AREAS_DE_MODULO = ['producao', 'qualidade', 'manutencao', 'comercial', 'marketing', 'operadores'];
const AREA_COM_MAQUINA = new Set(['producao', 'manutencao', 'operadores']);
const MIN = 12;
const MAX = 2000;

const ligado = (ctx, m) => (typeof ctx?.isEnabled === 'function' ? !!ctx.isEnabled(m) : true);
const term = (ctx, k) => (typeof ctx?.term === 'function' ? ctx.term(k) : k);

/** Áreas do pacote com módulo ligado (gestão sempre), nomes de setor.areas. */
export function areasEnsinaveis(ctx) {
  const areas = ctx?.data?.areas ?? [];
  return areas.filter((a) => a.id === 'gestao' || (AREAS_DE_MODULO.includes(a.id) && ligado(ctx, a.id)))
    .map((a) => ({ value: a.id, label: a.nome }));
}

const AREA_MINUSC = {
  producao: 'produção', qualidade: 'qualidade', manutencao: 'manutenção', comercial: 'o comercial',
  marketing: 'marketing', operadores: 'o chão de fábrica', gestao: 'a gestão',
};

function placeholderDe(ctx, tipo) {
  const ms = ctx?.data?.maquinas ?? [];
  const M = ms.find((m) => m.status === 'alerta' || m.status === 'parada') ?? ms[0];
  const C = (ctx?.data?.clientes ?? [])[0];
  const mid = M?.id ?? 'máquina 3';
  switch (tipo) {
    case 'ocorrencia': return `Ex.: ${cap(artigoMaq(ctx))} ${mid} parou 40 min no 1º turno de hoje; trocamos o sensor e voltou ao normal.`;
    case 'documento': return `Ex.: Pedido acima de R$ 50 mil de ${term(ctx, 'cliente')} novo passa pela diretoria antes de confirmar prazo.`;
    case 'nota': return `Ex.: ${C ? `A ${C.nome}` : `O ${term(ctx, 'cliente')} principal`} prefere receber a nota fiscal antes da carga.`;
    default: return `Ex.: ${artigoMaq(ctx) === 'o' ? 'No' : 'Na'} ${mid}, depois de parada longa, rodar o primeiro ciclo em vazio antes de liberar produção.`;
  }
}
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const artigoMaq = (ctx) => (/^(equipamento|robo|robô|forno|torno|ativo)/i.test(term(ctx, 'maquina')) ? 'o' : 'a');

function lerAutor(ctx) {
  try { if (typeof ctx?.autorSalvo === 'function') return ctx.autorSalvo() || ''; } catch { /* segue */ }
  const a = typeof ctx?.autor === 'function' ? ctx.autor() : '';
  return a && a !== 'Você' ? a : '';
}
function gravarAutor(ctx, nome) {
  if (typeof ctx?.setAutor === 'function') { try { ctx.setAutor(nome); return; } catch { /* segue */ } }
  try { localStorage.setItem(`td_autor_${ctx?.demo?.id}`, nome); } catch { /* sem storage */ }
}

/** Frase da confirmação: "A partir de agora, as respostas sobre a TIN-03 levam isso em conta." */
export function fraseAprendeu(ctx, item) {
  if (item?.maquina) return `A partir de agora, as respostas sobre ${artigoMaq(ctx)} ${item.maquina} levam isso em conta.`;
  const nome = AREA_MINUSC[item?.area] ?? 'a operação';
  return `A partir de agora, as respostas sobre ${nome} levam isso em conta.`;
}

// ---------------------------------------------------------------------------
// Área sugerida pelo texto: cliente ou pedido → comercial; máquina ou OS → manutenção; NC → qualidade;
// OP → produção. Vale a citação que aparece primeiro no texto (empate: nessa ordem).

const ORDEM_AREAS = ['comercial', 'manutencao', 'qualidade', 'producao'];
const escapaRe = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
/** Id como palavra inteira ("OP-24518", "TIN-03"), sem casar dentro de outro id. */
const reId = (id) => new RegExp(`(^|[^\\p{L}\\p{N}-])${escapaRe(id)}(?![\\p{L}\\p{N}])`, 'iu');
/** Nome normalizado como expressão inteira ("magazine horizonte sul"). */
const reNome = (nome) => new RegExp(`(^|[^\\p{L}\\p{N}])${escapaRe(nome)}(?![\\p{L}\\p{N}])`, 'u');
/** "Moda Ponto Certo — Curitiba" → "moda ponto certo"; "Tear circular 7 (malha 30.1)" → "tear circular 7". */
function nomeBase(nome) {
  const n = normalize(String(nome ?? '').split(/\s+[—–]\s+/)[0].replace(/\([^)]*\)/g, ' '))
    .replace(/[\s,]+(ltda\.?|s\.?\s?a\.?|s\/a|eireli|me|epp)$/i, '')
    .replace(/\s+/g, ' ').trim();
  return n.length >= 5 ? n : '';
}

const indices = new WeakMap();
function indiceDe(data) {
  if (!data || typeof data !== 'object') return [];
  if (indices.has(data)) return indices.get(data);
  const lista = (k) => (Array.isArray(data[k]) ? data[k] : []);
  const ids = (k) => lista(k).map((x) => x?.id).filter(Boolean);
  const nomes = (k) => lista(k).map((x) => nomeBase(x?.nome)).filter(Boolean);
  const os = Array.isArray(data.manutencao) ? data.manutencao : lista('ordens_servico');
  const idx = [
    { area: 'comercial', ids: [...ids('clientes'), ...ids('pedidos')], nomes: nomes('clientes') },
    { area: 'manutencao', ids: [...ids('maquinas'), ...os.map((x) => x?.id).filter(Boolean)], nomes: nomes('maquinas'), sigla: /(^|[^\p{L}])OS(?![\p{L}])/u },
    { area: 'qualidade', ids: ids('nao_conformidades'), nomes: [], sigla: /(^|[^\p{L}])NCs?(?![\p{L}])/u },
    { area: 'producao', ids: ids('ordens'), nomes: [], sigla: /(^|[^\p{L}])OPs?(?![\p{L}])/u },
  ].map((g) => ({ ...g, reIds: g.ids.map(reId), reNomes: g.nomes.map(reNome) }));
  indices.set(data, idx);
  return idx;
}

/** Área sugerida pelo texto, entre as `permitidas` (todas, se omitido). → id da área ou null. */
export function areaDoTexto(ctx, texto, permitidas = null) {
  const bruto = String(texto ?? '');
  if (bruto.trim().length < 2) return null;
  const norm = normalize(bruto);
  let melhor = null;
  for (const g of indiceDe(ctx?.data)) {
    if (permitidas && !permitidas.includes(g.area)) continue;
    let pos = Infinity;
    const mede = (re, alvo) => {
      const m = re.exec(alvo);
      if (m) pos = Math.min(pos, m.index + (m[1] ? m[1].length : 0));
    };
    for (const re of g.reIds) mede(re, bruto);
    for (const re of g.reNomes) mede(re, norm);
    if (g.sigla) mede(g.sigla, bruto); // sigla em maiúsculas ("os" minúsculo é artigo)
    if (pos === Infinity) continue;
    const ordem = ORDEM_AREAS.indexOf(g.area);
    if (!melhor || pos < melhor.pos || (pos === melhor.pos && ordem < melhor.ordem)) melhor = { area: g.area, pos, ordem };
  }
  return melhor?.area ?? null;
}

function svgCheck() {
  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', '0 0 56 56');
  svg.setAttribute('width', '56');
  svg.setAttribute('height', '56');
  const c = document.createElementNS(NS, 'circle');
  for (const [k, v] of [['cx', '28'], ['cy', '28'], ['r', '28'], ['class', 'ens-ok__circ']]) c.setAttribute(k, v);
  const p = document.createElementNS(NS, 'path');
  for (const [k, v] of [['d', 'M17 29l7.5 7.5L39.5 21'], ['class', 'ens-ok__tick'], ['pathLength', '1']]) p.setAttribute(k, v);
  svg.append(c, p);
  return svg;
}

/* Rascunho na sessionStorage: se a sessão cair (401) no meio da digitação, o texto volta ao reabrir. */
const chaveRascunho = (ctx) => `td_ens_rascunho_${ctx?.demo?.id ?? ctx?.api?.demoId ?? 'demo'}`;
function leRascunho(ctx) {
  try { return sessionStorage.getItem(chaveRascunho(ctx)) || ''; } catch { return ''; }
}
function gravaRascunho(ctx, texto) {
  try {
    if (String(texto ?? '').trim()) sessionStorage.setItem(chaveRascunho(ctx), texto);
    else sessionStorage.removeItem(chaveRascunho(ctx));
  } catch { /* sem storage */ }
}

function abrirFolha(ctx, opts) {
  const fn = typeof ctx?.sheet === 'function' ? ctx.sheet : uiSheet;
  return fn({ lado: 'direita', classe: 'sheet--ensinar', ...opts });
}

/**
 * abrirEnsinar(ctx, {area, maquina, tipo, origem, texto})
 */
export function abrirEnsinar(ctx, { area, maquina, tipo = 'saber', origem, texto = '' } = {}) {
  const areas = areasEnsinaveis(ctx);
  const areaValida = (a) => (a && areas.some((x) => x.value === a) ? a : null);
  let daTela = null;
  try { daTela = typeof ctx?.areaAtual === 'function' ? ctx.areaAtual() : null; } catch { /* sem área */ }
  // área de quem abriu (gaveta, página de área) → área da tela atual → produção → a primeira
  const areaIni = areaValida(area) ?? areaValida(daTela) ?? areaValida('producao') ?? areas[0]?.value ?? 'gestao';
  const idsAreas = areas.map((a) => a.value);
  const maquinas = ctx?.data?.maquinas ?? [];
  const folha = abrirFolha(ctx, {
    titulo: 'Ensinar o cérebro',
    subtitulo: 'O que você registrar aqui vale para as próximas respostas.',
    rotulo: 'Ensinar o cérebro',
  });

  function formulario(prev = {}) {
    let tipoAtual = prev.tipo ?? tipo;
    let enviando = false;
    const idTexto = `ens-texto-${Math.random().toString(36).slice(2, 7)}`;

    const seg = segmented({
      opcoes: TIPOS_APRENDIZADO.map((t) => ({ value: t.id, label: t.rotulo })),
      value: tipoAtual, label: 'O que é?', name: 'tipo', class: 'ens__tipos',
      onChange: (v) => { tipoAtual = v; campo.placeholder = placeholderDe(ctx, v); mostraMaquina(); },
    });

    const campo = h('textarea', {
      id: idTexto, class: 'ens__texto', rows: '5', maxlength: String(MAX), autofocus: true,
      placeholder: placeholderDe(ctx, tipoAtual), 'aria-describedby': `${idTexto}-c`,
    });
    // ordem: o que veio de "Ensinar outra coisa" → texto pedido por quem abriu → rascunho salvo
    const rascunho = prev.texto == null && !texto ? leRascunho(ctx) : '';
    campo.value = prev.texto ?? (texto || rascunho);
    const avisoRascunho = h('p', { class: 'ens__dica ens__rascunho', hidden: !rascunho }, 'Recuperamos o texto que você estava escrevendo.');
    const contador = h('span', { class: 'ens__contador num', id: `${idTexto}-c`, 'aria-live': 'polite' });

    // a área segue o texto (areaDoTexto) até a pessoa mexer no select
    let areaTocada = !!prev.areaTocada;
    const areaBase = areaTocada ? (prev.area ?? areaIni) : areaIni;
    const selArea = h('select', { class: 'ens__select', id: `${idTexto}-a`, 'aria-describedby': `${idTexto}-as` },
      areas.map((a) => h('option', { value: a.value, selected: a.value === areaBase }, a.label)));
    const dicaArea = h('p', { class: 'ens__dica', id: `${idTexto}-as`, 'aria-live': 'polite', hidden: true }, 'Sugerida pelo que você escreveu.');
    function sugereArea() {
      if (areaTocada) return;
      const inferida = areaDoTexto(ctx, campo.value, idsAreas);
      const alvo = inferida ?? areaBase;
      if (selArea.value !== alvo) {
        selArea.value = alvo;
        mostraMaquina();
      }
      dicaArea.hidden = !(inferida && inferida !== areaBase);
    }
    const selMaq = h('select', { class: 'ens__select', id: `${idTexto}-m` },
      h('option', { value: '' }, 'Nenhuma'),
      maquinas.map((m) => h('option', { value: m.id, selected: m.id === (prev.maquina ?? maquina) }, `${m.id} · ${m.nome}`)));
    const campoMaq = h('div', { class: 'ens__campo' }, h('label', { for: selMaq.id }, `${cap(term(ctx, 'maquina'))} (opcional)`), selMaq);

    const autor = h('input', { type: 'text', class: 'ens__input', id: `${idTexto}-p`, maxlength: '60', autocomplete: 'name', placeholder: 'Você' });
    autor.value = prev.autor ?? lerAutor(ctx);

    const erro = h('p', { class: 'ens__erro', role: 'alert', hidden: true });
    const dica = h('p', { class: 'ens__dica', hidden: true }, 'Escreva um pouco mais para o cérebro entender.');
    const btnEnviar = button('Ensinar ao cérebro', { variant: 'primary', class: 'ens__enviar', type: 'submit' });
    const btnCancelar = button('Cancelar', { variant: 'ghost', onClick: () => folha.close() });

    function mostraMaquina() {
      campoMaq.hidden = !(AREA_COM_MAQUINA.has(selArea.value) || tipoAtual === 'ocorrencia') || !maquinas.length;
    }
    function valida() {
      const n = campo.value.trim().length;
      contador.textContent = `${campo.value.length} / ${MAX}`;
      contador.classList.toggle('is-warn', campo.value.length > 1800);
      btnEnviar.disabled = enviando || n < MIN || campo.value.length > MAX;
      dica.hidden = !(n > 0 && n < MIN);
    }
    campo.addEventListener('input', () => { valida(); sugereArea(); gravaRascunho(ctx, campo.value); avisoRascunho.hidden = true; });
    selArea.addEventListener('change', () => { areaTocada = true; dicaArea.hidden = true; mostraMaquina(); });
    mostraMaquina();
    sugereArea();
    valida();

    const form = h('form', {
      class: 'ens', noValidate: true,
      onSubmit: async (e) => {
        e.preventDefault();
        if (btnEnviar.disabled || enviando) return;
        const dados = {
          tipo: tipoAtual,
          texto: campo.value.trim(),
          titulo: tituloDoTexto(campo.value),
          area: selArea.value,
          maquina: campoMaq.hidden ? null : (selMaq.value || null),
          autor: autor.value.trim() || 'Você',
        };
        gravarAutor(ctx, autor.value.trim());
        enviando = true;
        erro.hidden = true;
        for (const c of [campo, selArea, selMaq, autor]) c.disabled = true;
        seg.querySelectorAll('button').forEach((b) => { b.disabled = true; });
        btnEnviar.disabled = true;
        btnEnviar.replaceChildren(spinner({ size: 16 }), h('span', { class: 'btn__label' }, 'Ensinando…'));
        try {
          const item = await ctx.learning.add(dados);
          gravaRascunho(ctx, '');
          marco('ensino');
          confirmacao(item, { ...dados, areaTocada });
        } catch (err) {
          enviando = false;
          for (const c of [campo, selArea, selMaq, autor]) c.disabled = false;
          seg.querySelectorAll('button').forEach((b) => { b.disabled = false; });
          btnEnviar.replaceChildren(h('span', { class: 'btn__label' }, 'Ensinar ao cérebro'));
          const msg = String(err?.mensagem || err?.message || '');
          if (err?.status === 401) return; // a casca leva para a senha
          erro.textContent = /200 registros/.test(msg)
            ? 'Esta demonstração já tem 200 registros. Apague algum no Cérebro para continuar.'
            : 'Não conseguimos registrar agora. Tente de novo.';
          erro.hidden = false;
          valida();
        }
      },
    },
    h('fieldset', { class: 'ens__campo ens__campo--tipo' }, h('legend', null, 'O que é?'), seg),
    h('div', { class: 'ens__campo' },
      h('label', { for: idTexto }, 'O que o cérebro precisa saber?'), avisoRascunho, campo,
      h('div', { class: 'ens__linha-contador' }, dica, contador)),
    h('div', { class: 'ens__duas' },
      h('div', { class: 'ens__campo' }, h('label', { for: selArea.id }, 'Área'), selArea, dicaArea),
      campoMaq),
    h('div', { class: 'ens__campo' }, h('label', { for: autor.id }, 'Registrado por'), autor),
    erro,
    h('div', { class: 'ens__acoes' }, btnEnviar, btnCancelar));
    folha.setTitulo('Ensinar o cérebro', 'O que você registrar aqui vale para as próximas respostas.');
    folha.setCorpo(form);
    folha.setAcoes?.(null);
    requestAnimationFrame(() => { try { campo.focus({ preventScroll: true }); } catch { /* ok */ } });
  }

  function confirmacao(item, dados) {
    const pergunta = perguntaDerivada(item, ctx);
    const check = h('div', { class: 'ens-ok__check', 'aria-hidden': 'true' }, svgCheck());
    const corpo = h('div', { class: 'ens-ok', role: 'status' },
      check,
      h('h3', { class: 'ens-ok__titulo' }, 'O cérebro aprendeu.'),
      h('p', { class: 'ens-ok__frase' }, fraseAprendeu(ctx, item)),
      cartaoAprendido(item, { ctx, estatico: true }),
      h('div', { class: 'ens-ok__acoes' },
        button('Perguntar sobre isso', {
          variant: 'primary', icone: 'search', class: 'ens-ok__perguntar',
          onClick: () => { folha.close(); ctx?.perguntar?.(pergunta, { modulo: AREAS_DE_MODULO.includes(item.area) ? item.area : undefined }); },
        }),
        h('div', { class: 'ens-ok__sec' },
          button('Ensinar outra coisa', { variant: 'secondary', icone: 'lightbulb', onClick: () => formulario({ tipo: dados.tipo, area: dados.area, areaTocada: dados.areaTocada, autor: dados.autor === 'Você' ? '' : dados.autor }) }),
          button('Fechar', { variant: 'ghost', onClick: () => folha.close() }))));
    folha.setTitulo('', null);
    folha.setCorpo(corpo);
    requestAnimationFrame(() => corpo.querySelector('.ens-ok__perguntar')?.focus({ preventScroll: true }));
  }

  formulario();
  return folha;
}

export const ensinar = abrirEnsinar;
export default abrirEnsinar;
