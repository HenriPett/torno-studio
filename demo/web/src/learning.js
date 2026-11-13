// learning.js: o aprendizado da demo no cliente (o que o visitante ensinou ao cérebro).
//
// createLearning({ demoId, api, itens }) → store
//   list({area?, maquina?, tipo?}) → itens, mais recente primeiro
//   get(id) · count()
//   add(input) → Promise<item>      grava via api.aprendizado.criar; otimista (aparece já), desfaz em erro
//   remove(id) → Promise<void>      apaga via api.aprendizado.apagar; otimista, devolve em erro
//   receber(item)                   item que já veio salvo do servidor (evento `aprendizado` da conversa)
//   replace(itens)                  troca a lista (novo GET /estado)
//   subscribe(fn) → unsubscribe     fn(lista, {tipo: 'add'|'remove'|'sync'|'uso', item})
//   marcarUso(ids) · usos(id)        "Usado em {n} respostas" (memória desta sessão)
//   primeiraVez(id) → bool           true só na 1ª vez que o item aparece numa resposta (realce)
// Também registra a store em data-source (resolveRef de `aprendizado:<id>`).
//
// Itens: {id, tipo: 'saber'|'ocorrencia'|'documento'|'nota', titulo, texto, area, maquina|null, autor,
//         origem, criado_em}. Erros da API sobem como estão (ApiError {status, mensagem}).

import { setAprendizadoSource } from './adapters/data-source.js';

export const TIPOS_APRENDIZADO = [
  { id: 'saber', rotulo: 'Saber de fábrica' },
  { id: 'ocorrencia', rotulo: 'Ocorrência' },
  { id: 'documento', rotulo: 'Regra ou procedimento' },
  { id: 'nota', rotulo: 'Nota' },
];
export const TIPO_ROTULO = Object.fromEntries(TIPOS_APRENDIZADO.map((t) => [t.id, t.rotulo]));

/** Título gerado do texto: 1ª frase, cortada em 80 caracteres na última palavra inteira (UX §4.6.2). */
export function tituloDoTexto(texto) {
  const t = String(texto ?? '').replace(/\s+/g, ' ').trim();
  const primeira = (t.split(/(?<=[.!?;])\s/)[0] || t).replace(/[.!?;:,\s]+$/, '');
  if (primeira.length <= 80) return primeira;
  const corte = primeira.slice(0, 80);
  const ultimoEspaco = corte.lastIndexOf(' ');
  return `${(ultimoEspaco > 40 ? corte.slice(0, ultimoEspaco) : corte).replace(/[,;:\s]+$/, '')}…`;
}

const ordena = (a, b) => String(b.criado_em ?? '').localeCompare(String(a.criado_em ?? '')) || String(b.id).localeCompare(String(a.id));

/** API direta (mesmo contrato de ctx.api.aprendizado), usada quando a casca não entrega ctx.api. */
export const apiAprendizadoDireta = {
  async criar(id, item) {
    const r = await fetch(`/api/demo/${encodeURIComponent(id)}/aprendizado`, {
      method: 'POST', credentials: 'same-origin', headers: { 'content-type': 'application/json' }, body: JSON.stringify(item),
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) throw Object.assign(new Error(j.erro || `Erro ${r.status}`), { status: r.status, mensagem: j.erro });
    return j;
  },
  async apagar(id, itemId) {
    const r = await fetch(`/api/demo/${encodeURIComponent(id)}/aprendizado/${encodeURIComponent(itemId)}`, { method: 'DELETE', credentials: 'same-origin' });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) throw Object.assign(new Error(j.erro || `Erro ${r.status}`), { status: r.status, mensagem: j.erro });
    return j;
  },
};

export function createLearning(a, b) {
  // aceita createLearning(itens, {api, demoId}) (como a casca chama) ou createLearning({demoId, api, itens})
  const opts = Array.isArray(a) ? { ...(b || {}), itens: a } : (a || {});
  const { demoId, api, itens = [] } = opts;
  let lista = (Array.isArray(itens) ? itens : []).filter((x) => x && x.id).slice().sort(ordena);
  const ouvintes = new Set();
  const usos = new Map();
  const vistos = new Set();
  const apiApr = () => api?.aprendizado ?? apiAprendizadoDireta;

  const avisa = (tipo, item) => {
    const snap = lista.slice();
    for (const fn of [...ouvintes]) {
      try { fn(snap, { tipo, item }); } catch (e) { console.error('[learning] ouvinte falhou', e); }
    }
  };

  const store = {
    demoId,
    list({ area, maquina, tipo } = {}) {
      return lista.filter((x) => (!area || x.area === area) && (!maquina || x.maquina === maquina || (x.texto && String(x.texto).toUpperCase().includes(String(maquina).toUpperCase()))) && (!tipo || x.tipo === tipo));
    },
    get: (id) => lista.find((x) => x.id === id) ?? null,
    count: () => lista.length,

    async add(input) {
      const corpo = {
        tipo: input.tipo || 'saber',
        titulo: (input.titulo || tituloDoTexto(input.texto)).slice(0, 120),
        texto: String(input.texto ?? '').trim(),
        area: input.area || 'producao',
        ...(input.maquina ? { maquina: input.maquina } : {}),
        ...(input.autor ? { autor: input.autor } : {}),
      };
      const temp = { ...corpo, id: `tmp-${Date.now().toString(36)}`, maquina: corpo.maquina ?? null, autor: corpo.autor ?? 'Você', criado_em: new Date().toISOString(), origem: 'formulario', pendente: true };
      lista = [temp, ...lista];
      avisa('add', temp);
      try {
        const r = await apiApr().criar(demoId, corpo);
        const item = r?.item ?? r;
        lista = lista.map((x) => (x.id === temp.id ? item : x)).sort(ordena);
        avisa('sync', item);
        return item;
      } catch (e) {
        lista = lista.filter((x) => x.id !== temp.id);
        avisa('remove', temp);
        throw e;
      }
    },

    async remove(id) {
      const item = store.get(id);
      if (!item) return;
      lista = lista.filter((x) => x.id !== id);
      avisa('remove', item);
      try {
        await apiApr().apagar(demoId, id);
      } catch (e) {
        if (e?.status === 404) return; // já não existia no servidor
        lista = [item, ...lista].sort(ordena);
        avisa('add', item);
        throw e;
      }
    },

    receber(item) {
      if (!item?.id || store.get(item.id)) return;
      lista = [item, ...lista].sort(ordena);
      avisa('add', item);
    },

    /** Troca a lista inteira (ex.: depois de um novo GET /estado). */
    replace(novos = []) {
      lista = (novos || []).filter((x) => x && x.id).slice().sort(ordena);
      avisa('sync', null);
    },

    subscribe(fn) {
      if (typeof fn !== 'function') return () => {};
      ouvintes.add(fn);
      return () => ouvintes.delete(fn);
    },

    marcarUso(ids = []) {
      let mudou = false;
      for (const id of ids) { if (store.get(id)) { usos.set(id, (usos.get(id) ?? 0) + 1); mudou = true; } }
      if (mudou) avisa('uso', null);
    },
    usos: (id) => usos.get(id) ?? 0,

    primeiraVez(id) {
      if (vistos.has(id)) return false;
      vistos.add(id);
      return true;
    },
  };

  setAprendizadoSource(() => lista);
  return store;
}

export default createLearning;
