// createAssistant(getCtx): o assistente que as telas usam (ctx.assistant, PLANO §5.4).
// Tenta a IA real (capacidade `sample` via SampleProvider) e cai no motor determinístico
// (local-engine.js) em qualquer falha, com um aviso curto. getCtx() devolve o ctx atual
// (o setor pode mudar entre chamadas), então nada aqui guarda o pacote de dados.

import { SampleProvider } from "../adapters/ai-provider.js";
import { buildTools, refsDoResultado } from "./tools.js";
import * as local from "./local-engine.js";

const HOJE = "2026-11-13";
const AVISO_LOCAL = "Respondido pelo roteiro local: a IA não está disponível para esta visita.";

/** Monta as instruções (primeiro turno user; não há system prompt na capacidade sample). */
function instrucoes(ctx, { modulo, perfil } = {}) {
  const empresa = ctx.empresa ?? ctx.data?.empresa?.nome ?? "a empresa";
  const setor = ctx.sector?.nome ?? ctx.data?.setor ?? "";
  const ativos = (ctx.features ?? []).map((f) => f.nome ?? f.id).filter(Boolean);
  const areas = local.perfilAreas(ctx, perfil);
  const perfilNome = perfil && typeof perfil === "object" ? perfil.nome : (ctx.data?.perfis_acesso ?? []).find((p) => p.id === perfil)?.nome;
  return [
    `Você é o assistente de IA da ${empresa}${setor ? `, uma indústria do setor ${setor}` : ""}. Dados fictícios de demonstração.`,
    "Responda em português do Brasil, de forma curta e direta (até ~120 palavras), com o vocabulário do setor.",
    "Use SOMENTE as ferramentas disponíveis para obter fatos; não invente números, nomes, prazos nem documentos.",
    "Cite cada fato com a referência da fonte entre colchetes duplos, exatamente como a ferramenta devolveu no campo ref — ex.: [[op:OP-24518]], [[doc:DOC-PRO-012#t1]].",
    "Se a resposta não estiver nos dados/ferramentas, diga que não encontrou nos dados desta demonstração e sugira o que perguntar. Não responda de conhecimento geral.",
    "Números em formato pt-BR (1.234,5 · R$ 18,90 · 71,4%).",
    ativos.length ? `Módulos ativos: ${ativos.join(", ")}.` : "",
    modulo ? `Tela atual: ${modulo}.` : "",
    perfilNome ? `Perfil de acesso do visitante: ${perfilNome} (áreas: ${(areas ?? []).join(", ") || "todas"}). Não revele dados fora dessas áreas.` : "",
    `Hoje é ${ctx.today ?? HOJE}.`,
  ].filter(Boolean).join("\n");
}

const REF_RE = /\[\[\s*([a-z]+:[^\]]+?)\s*\]\]/gi;

/** Extrai as refs citadas no texto, na ordem. */
function refsCitadas(texto) {
  const out = [];
  let m;
  REF_RE.lastIndex = 0;
  while ((m = REF_RE.exec(texto))) { const r = m[1].trim(); if (!out.includes(r)) out.push(r); }
  return out;
}

/** Tira as marcações [[ref]] do texto mostrado (a fonte vira chip embaixo). */
function limpaMarcacoes(texto) {
  return String(texto ?? "").replace(REF_RE, "").replace(/\(\s*\)/g, "").replace(/[ \t]{2,}/g, " ").replace(/ +([,.;:!?])/g, "$1").trim();
}

export function createAssistant(getCtx, { provider } = {}) {
  const prov = provider ?? new SampleProvider({ modelTier: "default" });
  let preferencia = "ia";
  let negado = false; // not_granted / sampling_disabled: sem IA pelo resto da visita
  let disp = false; // capacidade sample detectada
  const ouvintes = new Set();

  // Detecta a disponibilidade uma vez, sem chamar a IA.
  Promise.resolve(prov.disponivel?.())
    .then((v) => { disp = !!v; notifica(); })
    .catch(() => { disp = false; notifica(); });

  function notifica() { for (const cb of ouvintes) { try { cb(modo()); } catch {} } }
  function modo() { return disp && !negado && preferencia === "ia" ? "ia" : "local"; }

  function responderLocal(pergunta, opts, aviso) {
    const ctx = getCtx();
    const r = local.responder(ctx, pergunta, opts);
    if (aviso) r.aviso = aviso;
    if (typeof opts?.onText === "function" && !opts?.signal?.aborted) opts.onText(r.texto);
    return r;
  }

  async function ask(pergunta, opts = {}) {
    const { modulo, perfil, historico = [], onText, signal } = opts;
    const ctx = getCtx();
    pergunta = String(pergunta ?? "").trim();
    if (!pergunta) return { texto: "Escreva uma pergunta.", fontes: [], modo: "local" };

    if (modo() !== "ia") return responderLocal(pergunta, { modulo, perfil, onText }, disp ? undefined : undefined);

    const tools = buildTools(ctx, { perfil });
    const usadas = new Set();
    const toolsHook = tools.map((t) => ({
      ...t,
      execute: async (input) => {
        const out = await t.execute(input);
        for (const ref of refsDoResultado(out)) usadas.add(ref);
        return out;
      },
    }));

    let ultimoLimpo = "";
    const onTextLimpo = onText ? (texto) => { ultimoLimpo = limpaMarcacoes(texto); onText(ultimoLimpo); } : undefined;

    try {
      const { texto } = await prov.responder({
        instrucoes: instrucoes(ctx, { modulo, perfil }),
        historico: historico.slice(-6),
        pergunta,
        tools: toolsHook,
        onText: onTextLimpo,
        signal,
      });
      const citadas = local.filtraRefs(ctx, refsCitadas(texto), 8);
      const fontes = citadas.length ? citadas : local.filtraRefs(ctx, [...usadas], 6);
      const limpo = limpaMarcacoes(texto);
      if (onText && limpo !== ultimoLimpo && !signal?.aborted) onText(limpo);
      return { texto: limpo, fontes, modo: "ia" };
    } catch (e) {
      const code = e?.code;
      if (code === "cancelled") throw e;
      if (code === "not_granted" || code === "sampling_disabled" || code === "not_declared" || code === "capability_disabled" || code === "tools_unavailable") {
        negado = true; notifica();
      }
      const aviso = code === "rate_limited"
        ? "Limite de uso da IA atingido nesta visita; respondendo pelo roteiro local."
        : AVISO_LOCAL;
      return responderLocal(pergunta, { modulo, perfil, onText }, aviso);
    }
  }

  return {
    ask,
    sugestoes: (modulo) => local.sugestoes(getCtx(), modulo, 4),
    buscar: (termo, o = {}) => local.buscar(getCtx(), termo, o),
    modo,
    setPreferencia: (p) => { if (p === "ia" || p === "local") { preferencia = p; notifica(); } },
    onModeChange: (cb) => { if (typeof cb === "function") { ouvintes.add(cb); cb(modo()); return () => ouvintes.delete(cb); } return () => {}; },
  };
}
