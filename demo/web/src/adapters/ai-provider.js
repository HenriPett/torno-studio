// AIProvider: de onde vem a IA do assistente. As telas não falam com ele: falam com
// ctx.assistant (ai/assistant.js), que usa um provedor e cai no motor local quando ele falha.
//
// Interface
//   disponivel() → Promise<boolean>              // sem gastar uso nem pedir consentimento
//   responder({ instrucoes, historico, pergunta, tools, onText, signal }) → Promise<{ texto, truncado? }>
//     instrucoes: string (regras do assistente + contexto da empresa)
//     historico:  [{ role: "user" | "assistant", content }] (curto, mais antigo primeiro)
//     tools:      [{ name, description, inputSchema, execute(input) }] (ai/tools.js)
//     onText(textoAteAgora): streaming opcional
//     Erros rejeitam { code, message, text? } com os códigos da capacidade `sample`
//     (not_granted, rate_limited, cancelled, tools_unavailable, upstream_error…).
//
// Trocar por uma API própria (cliente real), sem mudar as telas:
//   escreva uma classe com a mesma interface, por exemplo
//     class ApiProvider {
//       constructor(url) { this.url = url }                       // endpoint do cliente, na nuvem aprovada pela TI
//       async disponivel() { return true }
//       async responder({ instrucoes, historico, pergunta, tools, onText, signal }) {
//         // o backend chama Claude pela API da Anthropic (Messages API com tool use),
//         // executando as mesmas ferramentas no servidor, perto do ERP/MES/documentos;
//         // devolva { texto } e, se houver streaming (SSE), chame onText(textoAteAgora).
//         // Em falha, rejeite { code: "upstream_error", message } para o assistente cair no motor local.
//       }
//     }
//   e passe-a em createAssistant(getCtx, { provider: new ApiProvider("https://…") }).
//   As chaves de API ficam no backend do cliente, nunca na página.

export class SampleProvider {
  constructor({ modelTier = "default" } = {}) {
    this.tipo = "sample";
    this.modelTier = modelTier;
    this._sample = undefined; // undefined = ainda não verificado; null = indisponível
    this._verificando = null;
  }

  /** Detecta a capacidade `sample` uma vez (não chama a IA, não pede consentimento). */
  disponivel() {
    if (this._sample !== undefined) return Promise.resolve(!!this._sample);
    if (!this._verificando) {
      this._verificando = (async () => {
        try {
          const use = globalThis.window?.claude?.use;
          const sample = typeof use === "function" ? await window.claude.use("sample") : null;
          if (sample && typeof sample.limits === "function") {
            // As respostas dependem de ferramentas da página: sem elas, fica no roteiro local.
            const lim = await sample.limits().catch(() => null);
            if (lim && !lim.tools) { this._sample = null; return false; }
          }
          this._sample = typeof sample === "function" ? sample : null;
        } catch {
          this._sample = null;
        }
        return !!this._sample;
      })();
    }
    return this._verificando;
  }

  async responder({ instrucoes, historico = [], pergunta, tools = [], onText, signal } = {}) {
    if (!(await this.disponivel())) throw { code: "not_declared", message: "sample indisponível" };
    const turnos = [{ role: "user", content: instrucoes }];
    for (const t of historico) if (t?.content && (t.role === "user" || t.role === "assistant")) turnos.push({ role: t.role, content: String(t.content) });
    turnos.push({ role: "user", content: pergunta });
    const opts = {
      modelTier: this.modelTier,
      cache: false,
      signal,
      onText: onText ? ({ text }) => onText(text) : undefined,
    };
    if (tools.length) opts.tools = tools.map(({ name, description, inputSchema, execute }) => ({ name, description, inputSchema, execute }));
    if (!opts.onText) delete opts.onText;
    if (!opts.signal) delete opts.signal;
    const r = await this._sample(turnos, opts);
    return { texto: r.text, truncado: !!r.truncated };
  }
}

/** Marca de que o assistente deve usar o motor local (ai/local-engine.js). */
export class LocalProvider {
  constructor() { this.tipo = "local"; }
  async disponivel() { return false; }
  async responder() { throw { code: "local", message: "LocalProvider: use o motor local" }; }
}
