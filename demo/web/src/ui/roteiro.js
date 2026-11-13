// Roteiro "Experimente em 3 passos" do Início: pergunte, confira a fonte, ensine.
//
// Contrato de eventos (quem dispara é a conversa/fontes/ensinar; aqui só se escuta):
//   window.dispatchEvent(new CustomEvent('torno:marco', { detail: { tipo } }))
//   tipo = 'pergunta' (uma resposta terminou) | 'fonte' (painel de uma fonte aberto) | 'ensino' (registro salvo)
//
// O ouvinte é instalado quando este módulo carrega (o app.js o importa no boot da demo), então o
// progresso conta mesmo com o Início fora da tela. O progresso fica por demo em
// localStorage["td_roteiro_<id>"] (try/catch; sem storage, vale só nesta aba).
//
// API: instalarRoteiro(demoId) · marcarPasso(tipo) · progresso() · mostrarRoteiro() ·
//      onRoteiro(fn) → off · cartaoRoteiro(ctx) → {el, destroy}

import { h, icon, button, iconButton } from '../ui.js';

export const PASSOS = ['pergunta', 'fonte', 'ensino'];
const EVENTO = 'torno:marco';

let chave = null; // "td_roteiro_<id>"
let estado = vazio();
const pendentes = new Set(); // marcos que chegaram antes de saber qual é a demo
const ouvintes = new Set();

function vazio() {
  return { feitos: {}, oculto: false };
}

function ler() {
  if (!chave) return vazio();
  try {
    const raw = localStorage.getItem(chave);
    const j = raw ? JSON.parse(raw) : null;
    if (!j || typeof j !== 'object') return vazio();
    const feitos = {};
    for (const p of PASSOS) if (j.feitos && j.feitos[p]) feitos[p] = 1;
    return { feitos, oculto: !!j.oculto };
  } catch {
    return vazio();
  }
}

function gravar() {
  if (!chave) return;
  try { localStorage.setItem(chave, JSON.stringify(estado)); } catch { /* sem storage: vale só nesta aba */ }
}

function avisa(novo) {
  for (const fn of [...ouvintes]) {
    try { fn(progresso(), novo); } catch (err) { console.error('[roteiro]', err); }
  }
}

/** {feitos: {pergunta, fonte, ensino}, n, total, concluido, oculto} */
export function progresso() {
  const n = PASSOS.filter((p) => estado.feitos[p]).length;
  return { feitos: { ...estado.feitos }, n, total: PASSOS.length, concluido: n === PASSOS.length, oculto: estado.oculto };
}

/** Marca um passo como feito (idempotente). Tipos fora do contrato são ignorados. */
export function marcarPasso(tipo) {
  if (!PASSOS.includes(tipo)) return;
  if (!chave) { pendentes.add(tipo); return; }
  if (estado.feitos[tipo]) return;
  estado.feitos[tipo] = 1;
  gravar();
  avisa(tipo);
}

/** Liga o roteiro à demo atual. Pode ser chamada de novo (troca de demo) sem duplicar ouvintes. */
export function instalarRoteiro(demoId) {
  if (!demoId) return;
  chave = `td_roteiro_${demoId}`;
  estado = ler();
  for (const t of pendentes) if (PASSOS.includes(t)) estado.feitos[t] = 1;
  if (pendentes.size) { pendentes.clear(); gravar(); }
  avisa(null);
}

/** Volta a mostrar o cartão (ex.: "Rever a apresentação"), sem apagar o progresso. */
export function mostrarRoteiro() {
  if (!estado.oculto) return;
  estado.oculto = false;
  gravar();
  avisa(null);
}

function ocultar() {
  estado.oculto = true;
  gravar();
  avisa(null);
}

export function onRoteiro(fn) {
  ouvintes.add(fn);
  return () => ouvintes.delete(fn);
}

// Ouvintes globais: instalados uma vez, quando o módulo carrega.
if (typeof window !== 'undefined' && typeof window.addEventListener === 'function' && !window.__tornoRoteiro) {
  window.__tornoRoteiro = true;
  window.addEventListener(EVENTO, (e) => {
    try { marcarPasso(e?.detail?.tipo); } catch (err) { console.error('[roteiro] marco', err); }
  });
  // outra aba da mesma demo avançou o roteiro
  window.addEventListener('storage', (e) => {
    if (!chave || e.key !== chave) return;
    estado = ler();
    avisa(null);
  });
}

// ---------------------------------------------------------------------------
// Cartão do Início

/** Pergunta do passo 1: a sugerida do setor que fala de "hoje"; senão a primeira da visão geral. */
export function perguntaDoRoteiro(ctx) {
  const lista = Array.isArray(ctx?.data?.perguntas_sugeridas) ? ctx.data.perguntas_sugeridas : [];
  const vg = lista.filter((p) => p && p.modulo === 'visao-geral' && p.pergunta);
  const p = vg.find((x) => /\bhoje\b/i.test(x.pergunta)) || vg[0];
  return p?.pergunta || 'O que eu preciso ver hoje?';
}

function textoProgresso(p) {
  if (p.concluido) return 'Roteiro concluído ✓';
  return `${p.n} de ${p.total} passos feitos`;
}

/**
 * Cartão "Experimente em 3 passos". Recolhe para "Roteiro concluído ✓" quando os 3 passos estão
 * feitos e some se o visitante ocultar. → {el, destroy}
 */
export function cartaoRoteiro(ctx) {
  const pergunta = perguntaDoRoteiro(ctx);
  const status = h('p', { class: 'rt__progresso', role: 'status', 'aria-live': 'polite', 'aria-atomic': 'true' });
  const barra = h('div', { class: 'rt__barra', 'aria-hidden': 'true' }, PASSOS.map(() => h('span', { class: 'rt__seg' })));
  const lista = h('ol', { class: 'rt__passos' });
  const fechar = iconButton('x', { label: 'Ocultar o roteiro', class: 'rt__fechar', size: 18, onClick: () => ocultar() });
  const titulo = h('h2', { class: 'rt__titulo', id: 'rt-titulo' }, 'Experimente em 3 passos');
  const el = h('section', { class: 'rt', 'aria-labelledby': 'rt-titulo' },
    h('div', { class: 'rt__cab' }, h('div', { class: 'rt__cab-textos' }, titulo, status), fechar),
    barra, lista);

  const passos = {
    pergunta: {
      titulo: 'Pergunte',
      texto: 'Comece por uma pergunta que um diretor faria. A resposta sai na hora.',
      acao: () => button(`“${pergunta}”`, {
        size: 'sm', icone: 'search', class: 'rt__btn',
        onClick: () => ctx.perguntar?.(pergunta, { modulo: 'visao-geral' }),
      }),
    },
    fonte: {
      titulo: 'Confira a fonte',
      texto: 'Na resposta, toque numa fonte para ver de onde saiu cada número.',
      acao: (p) => (p.feitos.pergunta ? button('Ver a resposta', {
        size: 'sm', icone: 'arrow-right', class: 'rt__btn', onClick: () => ctx.navigate?.('#conversa'),
      }) : null),
    },
    ensino: {
      titulo: 'Ensine',
      texto: 'Conte algo que só a equipe sabe. Depois pergunte de novo: a IA usa o que você disse.',
      acao: () => button('Ensinar algo', {
        size: 'sm', icone: 'lightbulb', class: 'rt__btn', onClick: () => ctx.ensinar?.({ origem: 'roteiro' }),
      }),
    },
  };

  function pinta() {
    const p = progresso();
    el.hidden = p.oculto;
    el.classList.toggle('is-concluido', p.concluido);
    status.textContent = textoProgresso(p);
    [...barra.children].forEach((seg, i) => seg.classList.toggle('is-feito', i < p.n));
    if (p.concluido) {
      // recolhido: só "Roteiro concluído ✓" (o status) e uma linha
      lista.replaceChildren(h('li', { class: 'rt__fim' },
        'Agora pergunte o que quiser. Em Como funciona você vê de onde vêm os dados e quem vê o quê.'));
      return;
    }
    const atual = PASSOS.find((k) => !p.feitos[k]);
    lista.replaceChildren(...PASSOS.map((k, i) => {
      const def = passos[k];
      const feito = !!p.feitos[k];
      const acao = feito ? null : def.acao(p);
      return h('li', { class: ['rt-passo', feito && 'is-feito', k === atual && 'is-atual'] },
        h('span', { class: 'rt-passo__marca', 'aria-hidden': 'true' }, feito ? icon('check', { size: 14 }) : String(i + 1)),
        h('div', { class: 'rt-passo__corpo' },
          h('p', { class: 'rt-passo__titulo' }, def.titulo, feito ? h('span', { class: 'sr-only' }, ' (feito)') : null),
          h('p', { class: 'rt-passo__texto' }, def.texto),
          acao));
    }));
  }

  pinta();
  const off = onRoteiro(() => { if (el.isConnected) pinta(); });
  return { el, destroy: () => off() };
}
