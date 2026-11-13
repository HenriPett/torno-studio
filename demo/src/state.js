// Estado único da demo + subscribe. Quem muda o estado é o app.js; telas leem via ctx.

const state = {
  config: null, // config normalizada (config.js)
  sectors: [], // data/sectors.json
  sectorId: 'textil', // setor efetivo (override da sessão ou config)
  sectorOverride: null, // setor escolhido só nesta sessão
  data: null, // pacote do setor ativo
  dataError: null, // mensagem quando o pacote não carrega
  route: 'visao-geral',
  canEdit: false,
  storeKind: 'local', // "db" | "local"
  mode: 'local', // modo do assistente: "ia" | "local"
};

const listeners = new Set();

export function getState() {
  return state;
}

export function setState(patch) {
  Object.assign(state, patch);
  for (const fn of listeners) {
    try {
      fn(state, patch);
    } catch (err) {
      console.error('[state] listener falhou', err);
    }
  }
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

// Override de setor só nesta sessão (sessionStorage pode falhar em aba privada ou prévia).
const KEY = 'torno-demo:setor';

export function readSectorOverride() {
  try {
    return sessionStorage.getItem(KEY) || null;
  } catch {
    return null;
  }
}

export function writeSectorOverride(id) {
  try {
    if (id) sessionStorage.setItem(KEY, id);
    else sessionStorage.removeItem(KEY);
  } catch {
    /* sem storage: o override vale só até recarregar */
  }
}
