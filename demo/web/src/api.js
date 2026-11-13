// Cliente da API da demo (PLANO-V2 §5; extras em demo/server/README.md).
// Tudo fala com a própria origem (CSP default-src 'self'); cookies HttpOnly fazem a sessão.
// Erros viram ApiError {status, mensagem}. A conversa é SSE via fetch + ReadableStream.

export class ApiError extends Error {
  constructor(status, mensagem, extra = {}) {
    super(mensagem || 'Erro de comunicação');
    this.name = 'ApiError';
    this.status = status; // 0 = rede/abortado
    this.mensagem = mensagem || 'Erro de comunicação';
    Object.assign(this, extra);
  }
}

const enc = encodeURIComponent;

// Ouvintes de 401 nas rotas da demo já autenticada (sessão expirada). O app.js registra um.
const naoAutorizado = new Set();
export function onNaoAutorizado(fn) {
  naoAutorizado.add(fn);
  return () => naoAutorizado.delete(fn);
}
function avisa401(escopo) {
  for (const fn of naoAutorizado) {
    try { fn(escopo); } catch (err) { console.error('[api] ouvinte de 401 falhou', err); }
  }
}

async function lerErro(res) {
  let msg = '';
  try {
    const j = await res.json();
    msg = j && typeof j.erro === 'string' ? j.erro : '';
  } catch { /* corpo não-JSON */ }
  if (!msg) msg = res.status >= 500 ? 'Erro no servidor. Tente de novo.' : `Erro ${res.status}`;
  return msg;
}

/**
 * req(método, caminho, corpo?, {signal, escopo, avisar401})
 * escopo: 'demo' | 'admin' (para o ouvinte de 401 decidir o que fazer).
 */
async function req(method, path, body, { signal, escopo = null, avisar401 = true } = {}) {
  const init = { method, headers: { accept: 'application/json' }, credentials: 'same-origin', signal };
  if (body !== undefined) {
    init.headers['content-type'] = 'application/json';
    init.body = JSON.stringify(body);
  }
  let res;
  try {
    res = await fetch(path, init);
  } catch (err) {
    if (err && err.name === 'AbortError') throw new ApiError(0, 'Cancelado', { abortado: true });
    throw new ApiError(0, 'Sem conexão com o servidor.', { rede: true });
  }
  if (!res.ok) {
    const msg = await lerErro(res);
    if (res.status === 401 && avisar401 && escopo) avisa401(escopo);
    throw new ApiError(res.status, msg);
  }
  if (res.status === 204) return null;
  try {
    return await res.json();
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// SSE

/** Lê um corpo text/event-stream e chama onEvento(nome, dados) por evento. */
async function lerSSE(res, onEvento) {
  const leitor = res.body.getReader();
  const dec = new TextDecoder();
  let buf = '';
  const despacha = (bloco) => {
    let nome = 'message';
    const dados = [];
    for (const linha of bloco.split('\n')) {
      if (!linha || linha.startsWith(':')) continue;
      const i = linha.indexOf(':');
      const campo = i < 0 ? linha : linha.slice(0, i);
      let valor = i < 0 ? '' : linha.slice(i + 1);
      if (valor.startsWith(' ')) valor = valor.slice(1);
      if (campo === 'event') nome = valor;
      else if (campo === 'data') dados.push(valor);
    }
    if (!dados.length) return;
    let obj;
    try { obj = JSON.parse(dados.join('\n')); } catch { obj = { bruto: dados.join('\n') }; }
    onEvento(nome, obj);
  };
  for (;;) {
    const { value, done } = await leitor.read();
    if (done) break;
    buf += dec.decode(value, { stream: true }).replace(/\r\n?/g, '\n');
    let idx;
    while ((idx = buf.indexOf('\n\n')) >= 0) {
      const bloco = buf.slice(0, idx);
      buf = buf.slice(idx + 2);
      despacha(bloco);
    }
  }
  buf += dec.decode();
  if (buf.trim()) despacha(buf.replace(/\r\n?/g, '\n'));
}

const MAX_RODADAS = 6;

// Avisos curtos para quem está na demo quando a resposta não veio da IA (r.aviso; ver ai/assistant.js).
export const AVISO_LIMITE = 'A IA atingiu o limite de hoje desta demonstração; esta resposta veio do roteiro local.';
export const AVISO_FALHA = 'A IA ficou indisponível por um instante; esta resposta veio do roteiro local.';

/**
 * conversa(id, {mensagens|estado, modulo, perfil, autor, cliente, motor}, {onTexto, onFerramenta, onAprendizado, onFim, signal})
 * → Promise<{texto, fontes, continuar:false, estado, modo, aviso, rodadas}>
 * Faz o laço `continuar` (reenvia {estado} até continuar:false). Em erro recuperável, repete a
 * rodada com motor:"local" (uma vez) e devolve `aviso` (o do servidor, ou AVISO_LIMITE/AVISO_FALHA).
 * `cliente` (id CLI-…, Portal do cliente) vai no corpo: o servidor só usa os dados desse cliente.
 * onTexto(delta, textoAcumulado). Erros: ApiError.
 */
async function conversa(id, payload = {}, handlers = {}) {
  const { onTexto, onFerramenta, onAprendizado, onFim, signal } = handlers;
  const base = {};
  for (const k of ['modulo', 'perfil', 'autor', 'cliente', 'motor']) if (payload[k] != null) base[k] = payload[k];
  let corpo = payload.estado ? { ...base, estado: payload.estado } : { ...base, mensagens: payload.mensagens || [] };
  const corpoOriginal = corpo;
  let textoTotal = '';
  const fontes = [];
  let ultimo = null;
  let tentouLocal = payload.motor === 'local';
  let avisoTroca = null; // a IA falhou e a rodada foi refeita pelo motor local

  for (let rodada = 0; rodada < MAX_RODADAS; rodada += 1) {
    let res;
    try {
      res = await fetch(`/api/demo/${enc(id)}/conversa`, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'content-type': 'application/json', accept: 'text/event-stream' },
        body: JSON.stringify(corpo),
        signal,
      });
    } catch (err) {
      if (err && err.name === 'AbortError') throw new ApiError(0, 'Cancelado', { abortado: true, texto: textoTotal });
      throw new ApiError(0, 'Sem conexão com o servidor.', { rede: true, texto: textoTotal });
    }
    if (!res.ok) {
      const msg = await lerErro(res);
      if (res.status === 401) avisa401('demo');
      throw new ApiError(res.status, msg, { texto: textoTotal });
    }

    let fim = null;
    let erroEv = null;
    try {
      await lerSSE(res, (nome, dados) => {
        if (nome === 'texto' && typeof dados.delta === 'string') {
          textoTotal += dados.delta;
          if (onTexto) onTexto(dados.delta, textoTotal);
        } else if (nome === 'ferramenta') {
          if (onFerramenta) onFerramenta(dados);
        } else if (nome === 'aprendizado') {
          if (onAprendizado && dados.item) onAprendizado(dados.item);
        } else if (nome === 'fim') {
          fim = dados;
        } else if (nome === 'erro') {
          erroEv = dados;
        }
      });
    } catch (err) {
      if (err && err.name === 'AbortError') throw new ApiError(0, 'Cancelado', { abortado: true, texto: textoTotal });
      throw new ApiError(0, 'A conexão caiu no meio da resposta.', { rede: true, texto: textoTotal });
    }

    if (erroEv) {
      const status = Number(erroEv.status) || 500;
      if (status === 401) avisa401('demo');
      if (erroEv.recuperavel && !tentouLocal) {
        // reenvia o corpo original pelo roteiro local; o texto parcial é descartado
        tentouLocal = true;
        avisoTroca = /limite/i.test(String(erroEv.erro || '')) ? AVISO_LIMITE : AVISO_FALHA;
        const tinhaTexto = !!textoTotal;
        textoTotal = '';
        fontes.length = 0;
        corpo = { ...corpoOriginal, motor: 'local' };
        if (onTexto && tinhaTexto) onTexto('', '', { reinicio: true });
        continue;
      }
      throw new ApiError(status, erroEv.erro || 'Não consegui responder agora.', { texto: textoTotal, recuperavel: !!erroEv.recuperavel });
    }
    if (!fim) throw new ApiError(0, 'A resposta terminou sem fechar.', { rede: true, texto: textoTotal });

    for (const f of fim.fontes || []) if (!fontes.includes(f)) fontes.push(f);
    ultimo = fim;
    if (onFim) onFim(fim);
    if (!fim.continuar || !fim.estado) break;
    corpo = { ...base, estado: fim.estado };
  }

  return {
    texto: textoTotal || (ultimo && ultimo.texto) || '',
    fontes,
    continuar: false,
    estado: ultimo ? ultimo.estado : undefined,
    modo: ultimo ? ultimo.modo : undefined,
    aviso: (ultimo && ultimo.aviso) || avisoTroca || undefined,
    rodadas: ultimo ? ultimo.rodada : undefined,
  };
}

// ---------------------------------------------------------------------------
// API pública

const D = (id) => `/api/demo/${enc(id)}`;
const A = '/api/admin';

export const api = {
  ApiError,
  onNaoAutorizado,

  /** POST /entrar → {ok}. 401/404 = "Link ou senha inválidos". */
  entrar: (id, senha) => req('POST', `${D(id)}/entrar`, { senha }, { escopo: null }),
  sair: (id) => req('POST', `${D(id)}/sair`, {}, { escopo: null }),
  /** GET /estado → {demo, setor, aprendizado, ia, admin?}. 401 sem cookie. */
  estado: (id, { signal } = {}) => req('GET', `${D(id)}/estado`, undefined, { signal, escopo: null }),

  aprendizado: {
    listar: (id) => req('GET', `${D(id)}/aprendizado`, undefined, { escopo: 'demo' }),
    /** → {item} */
    criar: (id, item) => req('POST', `${D(id)}/aprendizado`, item, { escopo: 'demo' }),
    /** → {ok} */
    apagar: (id, itemId) => req('DELETE', `${D(id)}/aprendizado/${enc(itemId)}`, undefined, { escopo: 'demo' }),
  },

  conversa,

  admin: {
    entrar: (senha) => req('POST', `${A}/entrar`, { senha }, { escopo: null }),
    sair: () => req('POST', `${A}/sair`, {}, { escopo: null }),
    /** → {ok, ia:{disponivel, modelo}} | 401 */
    sessao: () => req('GET', `${A}/sessao`, undefined, { escopo: null }),
    /** → {setores:[{id,nome,empresa}], modulos:[{id,nome,sempreLigado,depende}], areas, tipos} */
    opcoes: () => req('GET', `${A}/opcoes`, undefined, { escopo: 'admin' }),
    listar: () => req('GET', `${A}/demos`, undefined, { escopo: 'admin' }),
    obter: (id) => req('GET', `${A}/demos/${enc(id)}`, undefined, { escopo: 'admin' }),
    /** → {demo, senha} */
    criar: (dados) => req('POST', `${A}/demos`, dados, { escopo: 'admin' }),
    /** → {demo, senha?} */
    atualizar: (id, dados) => req('PATCH', `${A}/demos/${enc(id)}`, dados, { escopo: 'admin' }),
    apagar: (id) => req('DELETE', `${A}/demos/${enc(id)}`, undefined, { escopo: 'admin' }),
    /** → [...itens] */
    aprendizado: (id) => req('GET', `${A}/demos/${enc(id)}/aprendizado`, undefined, { escopo: 'admin' }),
    zerarAprendizado: (id) => req('DELETE', `${A}/demos/${enc(id)}/aprendizado`, undefined, { escopo: 'admin' }),
    apagarAprendizado: (id, itemId) => req('DELETE', `${A}/demos/${enc(id)}/aprendizado/${enc(itemId)}`, undefined, { escopo: 'admin' }),
  },
};

export default api;
