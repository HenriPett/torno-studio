// createAssistant(getCtx): cliente fino da conversa (PLANO-V2 §5–§6). A IA e as ferramentas rodam no
// servidor; aqui só há o envio (ctx.api.conversa, SSE) com o laço `continuar`, as sugestões e a busca
// local (motor determinístico, incluindo o que a equipe registrou nesta demo).
//
//   perguntar({mensagens, modulo, perfil, autor, onTexto, onFerramenta, onAprendizado, signal})
//     → Promise<{texto, fontes, modo, aviso}>     (texto com marcadores [[tipo:id]])
//     onTexto(delta, acumulado, {reinicio?}) · onFerramenta({nome, rotulo}) · onAprendizado(item)
//     Erros: {status, mensagem, abortado?, texto?} (ApiError de api.js).
//   sugestoes(modulo, n) · buscar(termo, {perfil, limite})

import * as local from './local-engine.js';

const MAX_RODADAS = 5;

/** SSE direto (mesmo contrato de api.conversa), para quando a casca não entrega ctx.api. */
async function conversaDireta(id, payload, { onTexto, onFerramenta, onAprendizado, signal } = {}) {
  const res = await fetch(`/api/demo/${encodeURIComponent(id)}/conversa`, {
    method: 'POST', credentials: 'same-origin', signal,
    headers: { 'content-type': 'application/json', accept: 'text/event-stream' },
    body: JSON.stringify(payload),
  }).catch((e) => { throw Object.assign(new Error('Sem conexão'), { status: 0, abortado: e?.name === 'AbortError' }); });
  if (!res.ok) {
    const j = await res.json().catch(() => ({}));
    throw Object.assign(new Error(j.erro || `Erro ${res.status}`), { status: res.status, mensagem: j.erro });
  }
  const leitor = res.body.getReader();
  const dec = new TextDecoder();
  let buf = '';
  let acumulado = '';
  let fim = null;
  let erro = null;
  const evento = (bloco) => {
    let nome = 'message';
    const dados = [];
    for (const l of bloco.split('\n')) {
      if (l.startsWith('event:')) nome = l.slice(6).trim();
      else if (l.startsWith('data:')) dados.push(l.slice(5).replace(/^ /, ''));
    }
    if (!dados.length) return;
    let d;
    try { d = JSON.parse(dados.join('\n')); } catch { return; }
    if (nome === 'texto' && typeof d.delta === 'string') { acumulado += d.delta; onTexto?.(d.delta, acumulado); }
    else if (nome === 'ferramenta') onFerramenta?.(d);
    else if (nome === 'aprendizado' && d.item) onAprendizado?.(d.item);
    else if (nome === 'fim') fim = d;
    else if (nome === 'erro') erro = d;
  };
  for (;;) {
    const { value, done } = await leitor.read();
    if (done) break;
    buf += dec.decode(value, { stream: true }).replace(/\r\n?/g, '\n');
    let i;
    while ((i = buf.indexOf('\n\n')) >= 0) { evento(buf.slice(0, i)); buf = buf.slice(i + 2); }
  }
  if (buf.trim()) evento(buf);
  if (erro) throw Object.assign(new Error(erro.erro || 'Erro'), { status: Number(erro.status) || 500, mensagem: erro.erro, recuperavel: !!erro.recuperavel, texto: acumulado });
  if (!fim) throw Object.assign(new Error('Resposta incompleta'), { status: 0, texto: acumulado });
  return { ...fim, texto: fim.texto ?? acumulado };
}

export function createAssistant(getCtx) {
  const ctxAtual = () => (typeof getCtx === 'function' ? getCtx() : getCtx) || {};

  /** ctx para o motor local, com o aprendizado da demo. */
  const ctxMotor = () => {
    const ctx = ctxAtual();
    const aprendizado = ctx.learning?.list?.() ?? ctx.aprendizado ?? [];
    return { ...ctx, aprendizado };
  };

  async function perguntar({ mensagens, modulo, perfil, autor, onTexto, onFerramenta, onAprendizado, signal } = {}) {
    const ctx = ctxAtual();
    const id = ctx.demo?.id ?? ctx.api?.demoId;
    const conversa = typeof ctx.api?.conversa === 'function' ? ctx.api.conversa : conversaDireta;
    const base = {};
    if (modulo) base.modulo = modulo;
    if (perfil) base.perfil = typeof perfil === 'object' ? perfil.id : perfil;
    const nome = autor ?? (typeof ctx.autor === 'function' ? ctx.autor() : null);
    if (nome && nome !== 'Você') base.autor = nome;

    let acumuladoAntes = ''; // texto das rodadas anteriores (só se a API devolver continuar ao cliente)
    const handlers = {
      signal,
      onFerramenta,
      onAprendizado,
      onTexto: (delta, acumulado, extra) => {
        const d = typeof delta === 'object' && delta ? delta.delta : delta;
        const total = typeof acumulado === 'string' ? acumuladoAntes + acumulado : null;
        onTexto?.(d ?? '', total, extra);
      },
    };

    let r = await conversa(id, { ...base, mensagens }, handlers);
    // api.js da casca já faz o laço `continuar`; este é só o cinto de segurança
    for (let rodada = 1; r?.continuar && r.estado && rodada < MAX_RODADAS; rodada++) {
      acumuladoAntes = r.texto ?? acumuladoAntes;
      r = await conversa(id, { ...base, estado: r.estado }, handlers);
    }
    return {
      texto: String(r?.texto ?? ''),
      fontes: Array.isArray(r?.fontes) ? r.fontes : [],
      modo: r?.modo ?? 'ia',
      aviso: r?.aviso ?? null,
    };
  }

  /** Compatibilidade com a v1 (ask devolve a resposta inteira; onText recebe o texto acumulado). */
  async function ask(pergunta, { modulo, perfil, historico = [], onText, signal } = {}) {
    let total = '';
    const r = await perguntar({
      mensagens: [...historico.slice(-10), { role: 'user', content: String(pergunta ?? '') }],
      modulo, perfil, signal,
      onTexto: (d, acum) => { total = acum ?? total + (d || ''); onText?.(total); },
    });
    return r;
  }

  return {
    perguntar,
    ask,
    sugestoes: (modulo, n = 4) => local.sugestoes(ctxMotor(), modulo, n),
    buscar: (termo, o = {}) => local.buscar(ctxMotor(), termo, o),
    responderLocal: (pergunta, o = {}) => local.responder(ctxMotor(), pergunta, o),
    modo: () => (ctxAtual().ia?.disponivel ? 'ia' : 'local'),
    setPreferencia: () => {},
    onModeChange: (cb) => { try { cb?.(ctxAtual().ia?.disponivel ? 'ia' : 'local'); } catch { /* ok */ } return () => {}; },
  };
}

export default createAssistant;
