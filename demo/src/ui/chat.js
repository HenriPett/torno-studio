// chatPanel(): a conversa do assistente, com fontes clicáveis (PLANO §5.4).
// Variantes: "default" (painel), "whatsapp" (balões estilo app de mensagens), "phone" (compacto).
// Fala só com ctx.assistant; a disponibilidade de IA e o fallback local são responsabilidade dele.

import { h, icon, refChip } from "../ui.js";

function agora() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

/** Texto do assistente → nós DOM: quebra em parágrafos e listas com "- ". */
function corpoTexto(texto) {
  const linhas = String(texto ?? "").split("\n");
  const nós = [];
  let itens = null;
  const fechaLista = () => { if (itens) { nós.push(h("ul", { class: "chat-msg__list" }, itens)); itens = null; } };
  for (const ln of linhas) {
    const t = ln.trim();
    if (!t) { fechaLista(); continue; }
    const m = /^[-•]\s+(.*)$/.exec(t);
    if (m) { (itens ||= []).push(h("li", null, m[1])); }
    else { fechaLista(); nós.push(h("p", null, t)); }
  }
  fechaLista();
  return nós.length ? nós : [h("p", null, "…")];
}

export function chatPanel({ ctx, modulo, titulo, placeholder, variante = "default", perfil, sugestoes, inicial } = {}) {
  const assistant = ctx?.assistant;
  const empresa = ctx?.empresa ?? ctx?.data?.empresa?.nome ?? "a empresa";
  const whatsapp = variante === "whatsapp";
  const historico = []; // [{role, content}] para o assistant.ask
  let ctl = null;
  let pensando = false;

  // --- estrutura -----------------------------------------------------------
  const log = h("div", { class: "chat-log", role: "log", "aria-live": "polite", "aria-label": "Conversa com o assistente" });
  const vivo = h("div", { class: "sr-only", role: "status", "aria-live": "polite" });

  const selo = h("span", { class: "chat-mode", hidden: whatsapp });
  const btnLocal = h("button", {
    type: "button", class: "chat-mode__toggle", hidden: true,
    onClick: () => {
      const novo = assistant?.modo?.() === "ia" ? "local" : "ia";
      assistant?.setPreferencia?.(novo);
    },
  });

  const cabTitulo = whatsapp ? `Assistente comercial · ${empresa}` : (titulo || "Assistente");
  const header = h("div", { class: "chat-header" },
    whatsapp ? h("span", { class: "chat-avatar", "aria-hidden": "true" }, icon("sparkles", { size: 16 })) : icon("sparkles", { size: 18, class: "chat-header__icon" }),
    h("div", { class: "chat-header__titles" },
      h("div", { class: "chat-header__title" }, cabTitulo),
      whatsapp ? h("div", { class: "chat-header__sub" }, "online") : null),
    whatsapp ? null : h("div", { class: "chat-header__mode" }, selo, btnLocal));

  const chips = h("div", { class: "chat-suggestions", role: "group", "aria-label": "Perguntas sugeridas" });

  const campo = h("textarea", {
    class: "chat-input__field", rows: "1", placeholder: placeholder || "Pergunte sobre a operação…",
    "aria-label": "Sua pergunta para o assistente", autocomplete: "off",
    onInput: (e) => { e.target.style.height = "auto"; e.target.style.height = Math.min(e.target.scrollHeight, 140) + "px"; },
    onKeydown: (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); enviar(); } },
  });
  const btnParar = h("button", { type: "button", class: "chat-stop", hidden: true, onClick: () => ctl?.abort() }, icon("x", { size: 15 }), "Parar");
  const btnEnviar = h("button", { type: "button", class: "chat-send", "aria-label": "Enviar pergunta", onClick: () => enviar() }, icon("send", { size: 16 }));
  const form = h("div", { class: "chat-input" }, campo, btnEnviar);

  const root = h("div", { class: ["chat", `chat--${variante}`], "data-modulo": modulo || "" },
    header, log, vivo, chips, h("div", { class: "chat-foot" }, btnParar, form));

  // --- mensagens -----------------------------------------------------------
  function msgUsuario(texto, hora) {
    const el = h("div", { class: "chat-msg chat-msg--user" },
      h("div", { class: "chat-bubble" }, ...corpoTexto(texto), whatsapp ? h("span", { class: "chat-time" }, hora || agora()) : null));
    log.appendChild(el);
    log.scrollTop = log.scrollHeight;
    return el;
  }

  function msgAssistente() {
    const corpo = h("div", { class: "chat-bubble__body" });
    const fontesEl = h("div", { class: "chat-sources", hidden: true });
    const avisoEl = h("div", { class: "chat-notice", hidden: true });
    const hora = whatsapp ? h("span", { class: "chat-time" }) : null;
    const bolha = h("div", { class: "chat-bubble" }, corpo, hora);
    const el = h("div", { class: "chat-msg chat-msg--bot" }, bolha, avisoEl, fontesEl);
    log.appendChild(el);
    log.scrollTop = log.scrollHeight;
    return {
      pensando() { corpo.replaceChildren(h("span", { class: "chat-typing", "aria-label": "Pensando" }, h("i"), h("i"), h("i"))); log.scrollTop = log.scrollHeight; },
      texto(t) { corpo.replaceChildren(...corpoTexto(t)); log.scrollTop = log.scrollHeight; },
      fim(t, fontes, aviso) {
        corpo.replaceChildren(...corpoTexto(t));
        if (hora) hora.textContent = agora();
        if (aviso) { avisoEl.replaceChildren(icon("info", { size: 14 }), h("span", null, aviso)); avisoEl.hidden = false; }
        const chipsFonte = (fontes || []).map((r) => refChip(r, ctx)).filter(Boolean);
        if (chipsFonte.length) {
          fontesEl.replaceChildren(h("span", { class: "chat-sources__label" }, "Fontes:"), ...chipsFonte);
          fontesEl.hidden = false;
        }
        log.scrollTop = log.scrollHeight;
      },
    };
  }

  // --- envio ---------------------------------------------------------------
  async function enviar(perguntaDireta) {
    const pergunta = (perguntaDireta ?? campo.value).trim();
    if (!pergunta || pensando) return;
    if (!perguntaDireta) { campo.value = ""; campo.style.height = "auto"; }
    msgUsuario(pergunta);
    pensando = true;
    btnEnviar.disabled = true;
    btnParar.hidden = false;
    chips.hidden = true;
    const bot = msgAssistente();
    bot.pensando();
    vivo.textContent = "Pensando…";
    ctl = new AbortController();
    const hist = historico.slice();
    try {
      const r = await assistant.ask(pergunta, {
        modulo, perfil, historico: hist, signal: ctl.signal,
        onText: (t) => bot.texto(t),
      });
      bot.fim(r.texto, r.fontes, r.aviso);
      vivo.textContent = r.texto;
      historico.push({ role: "user", content: pergunta }, { role: "assistant", content: r.texto });
      if (historico.length > 12) historico.splice(0, historico.length - 12);
    } catch (e) {
      if (e?.code === "cancelled") bot.texto((e.text || "").trim() || "Resposta interrompida.");
      else bot.fim("Não foi possível responder agora. Tente de novo.", [], null);
    } finally {
      pensando = false;
      btnEnviar.disabled = false;
      btnParar.hidden = true;
      ctl = null;
    }
  }

  // --- sugestões -----------------------------------------------------------
  function montaSugestoes() {
    const lista = (sugestoes && sugestoes.length ? sugestoes : assistant?.sugestoes?.(modulo)) || [];
    chips.replaceChildren(...lista.slice(0, 4).map((s) =>
      h("button", { type: "button", class: "chat-chip", onClick: () => enviar(s) }, s)));
    chips.hidden = lista.length === 0;
  }

  // --- selo de modo --------------------------------------------------------
  let ehDisponivel = false; // a IA ficou disponível em algum momento desta visita
  function pintaModo(modo) {
    if (whatsapp) return;
    const ia = modo === "ia";
    selo.replaceChildren(icon(ia ? "sparkles" : "cpu", { size: 13 }), h("span", null, ia ? "IA ativa" : "Roteiro local"));
    selo.className = `chat-mode chat-mode--${ia ? "ia" : "local"}`;
    // A alternância só aparece quando a IA está (ou esteve) disponível nesta visita.
    btnLocal.hidden = !ehDisponivel;
    btnLocal.textContent = ia ? "Usar roteiro local" : "Usar IA";
  }

  // --- boas-vindas e carga inicial -----------------------------------------
  if (Array.isArray(inicial) && inicial.length) {
    for (const m of inicial) {
      if (m.de === "assistente" || m.role === "assistant") {
        const bot = msgAssistente();
        bot.fim(m.texto, m.fontes || [], null);
      } else {
        msgUsuario(m.texto, m.hora);
      }
    }
  } else {
    const bem = msgAssistente();
    bem.fim(
      whatsapp
        ? `Oi! Sou o assistente comercial da ${empresa}. Posso consultar estoque, preço, prazo e status de pedidos.`
        : `Olá! Sou o assistente da ${empresa}. Consulto ordens, pedidos, qualidade, manutenção, documentos e indicadores desta operação — e cito a fonte de cada resposta.`,
      [], null
    );
  }

  montaSugestoes();

  // modo + reatividade (o assistente avisa quando detecta/perde a IA)
  if (assistant?.onModeChange) {
    assistant.onModeChange((modo) => {
      if (modo === "ia") ehDisponivel = true; // já ficou "ia": a IA existe para esta visita
      pintaModo(modo);
    });
  } else {
    pintaModo(assistant?.modo?.() ?? "local");
  }

  root.enviar = (p) => enviar(p);
  root.destroy = () => ctl?.abort();
  return root;
}
