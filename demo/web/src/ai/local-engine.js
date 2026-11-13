// Motor determinístico do assistente: responde sem IA real, só com o pacote de dados do setor e com o
// que foi registrado nesta demo (ctx.aprendizado). É o fallback do servidor sem ANTHROPIC_API_KEY
// (demo/server/motor.mjs importa ESTE arquivo) e a base da busca local do front.
//
// Regras: sem nenhum import, sem DOM/window (roda no navegador e na Netlify Function).
// Respeita os módulos ligados (ctx.isEnabled) e, quando há perfil, o acesso por área. Nunca devolve
// fonte de módulo desligado. Respostas em Markdown simples (negrito nos ids, listas), com marcadores
// [[tipo:id]] logo depois do id citado; `fontes` traz as mesmas refs na ordem.
//
// Contrato (usado pelo servidor e pelo front):
//   responder(ctx, pergunta, {modulo, perfil, cliente}) → {texto, fontes, modo: "local"}
//   buscar(ctx, termo, {perfil, limite}) → [{ref, titulo, trecho, area, score, aprendizado?}]
//   perguntaDerivada(item, ctx?) → pergunta pronta que sempre casa com o item (UX §4.6.4)
//   visaoDoCliente(ctx, clienteId) → ctx só com o que esse cliente pode ver (Portal do cliente), ou null
//   precoNaTabela(ctx, produto, cliente) → {preco, tabela, base, pct, referencia, conhecida}
//   clientePadraoDoPortal(data) → id do cliente que o Portal mostra primeiro
//   motivoParaCliente(texto) → motivo de atraso genérico, sem códigos internos
//   ctx = {data, empresa?, today?, isEnabled?, term?, resolveRef?, aprendizado?: [{id, tipo, titulo,
//          texto, area, maquina, autor, origem, criado_em}]}

/* ------------------------------------------------------------------ */
/* Texto                                                               */
/* ------------------------------------------------------------------ */

export function norm(s) {
  return String(s ?? "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

const STOP = new Set(
  ("a o as os um uma uns umas de da do das dos e em no na nos nas ao aos para pra pro por pelo pela " +
    "pelos pelas com sem que qual quais quanto quantos quanta quantas como onde quando se e eh esta " +
    "estao esta sao ser foi tem tem ha me meu minha meus minhas nosso nossa nossos nossas sobre isso " +
    "isto este esta esse essa eu voce voces ele ela eles elas mais menos ja hoje ainda ou la " +
    "mostre mostrar mostra diga dizer existe existem algum alguma alguns algumas tudo todo toda todos " +
    "todas ver vejo preciso quero saber me de do qual favor poderia pode posso hoje agora entao the")
    .split(/\s+/)
);

export function tokens(s) {
  return norm(s)
    .split(/[^a-z0-9\-]+/)
    .map((t) => t.replace(/^-+|-+$/g, ""))
    .filter((t) => t && !STOP.has(t) && (t.length > 1 || /\d/.test(t)));
}

function stem(t) {
  let s = t;
  if (s.length > 4 && s.endsWith("oes")) s = s.slice(0, -3) + "ao";
  else if (s.length > 4 && s.endsWith("es") && !s.endsWith("ores")) s = s.slice(0, -1);
  if (s.length > 3 && s.endsWith("s")) s = s.slice(0, -1);
  return s.length > 6 ? s.slice(0, 6) : s;
}

function casa(termo, palavra) {
  if (termo === palavra) return true;
  if (/\d/.test(termo) || /\d/.test(palavra)) return false;
  if (termo.length >= 4 && palavra.startsWith(termo)) return true;
  if (palavra.length >= 4 && termo.startsWith(palavra)) return true;
  return termo.length >= 4 && palavra.length >= 4 && stem(termo) === stem(palavra);
}

function contem(termo, lista) {
  return lista.some((p) => casa(termo, p));
}

/** Corta em até n caracteres numa fronteira de palavra; sem pontuação solta antes do "…" ("MAR-07,…", "com 6.…"). */
export function corta(s, n = 240) {
  const t = String(s ?? "").replace(/\s+/g, " ").trim();
  if (t.length <= n) return t;
  let c = t.slice(0, n - 1);
  if (/\S/.test(t[n - 1] ?? "")) c = c.replace(/\s+\S*$/, ""); // não deixa meia palavra (nem meio número)
  return c.replace(/[\s.,;:!?—–-]+$/, "") + "…";
}

/** Fecha a frase com um ponto só (nada de ".." nem ":." ). */
function frase(s) {
  const t = String(s ?? "").trim().replace(/[\s,;:—-]+$/, "");
  if (!t) return "";
  return /[.!?…)"”]$/.test(t) ? (/\)$/.test(t) && !/[.!?]\)$/.test(t) ? t + "." : t) : t + ".";
}

/** Tira o ponto final (para encaixar no meio de outra frase). */
const semPonto = (s) => String(s ?? "").trim().replace(/[.;:\s]+$/, "");

/* ------------------------------------------------------------------ */
/* Formatação pt-BR (local, sem depender de format.js)                 */
/* ------------------------------------------------------------------ */

const nf0 = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 });
const nf1 = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 1 });
const nfMoney = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

export const f = {
  num: (n) => (n == null || isNaN(n) ? "—" : (Number.isInteger(+n) ? nf0 : nf1).format(+n)),
  money: (n) => (n == null || isNaN(n) ? "—" : nfMoney.format(+n)),
  pct: (n) => (n == null || isNaN(n) ? "—" : nf1.format(+n) + "%"),
  data: (iso) => {
    const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(iso ?? ""));
    return m ? `${m[3]}/${m[2]}` : String(iso ?? "—");
  },
  valor: (v, unidade) => {
    if (unidade === "%") return f.pct(v);
    if (unidade === "R$") return f.money(v);
    return `${f.num(v)}${unidade ? " " + unidade : ""}`;
  },
};

function dias(de, ate) {
  const a = Date.parse(de), b = Date.parse(ate);
  if (isNaN(a) || isNaN(b)) return null;
  return Math.round((b - a) / 86400000);
}

const STATUS = {
  planejada: "planejada", em_producao: "em produção", atrasada: "atrasada", concluida: "concluída",
  em_analise: "em análise", aprovado: "aprovado", faturado: "faturado", entregue: "entregue",
  atrasado: "atrasado", aberta: "aberta", encerrada: "encerrada", em_execucao: "em execução",
  operando: "operando", alerta: "em alerta", parada: "parada", manutencao: "em manutenção",
  conectado: "conectado", sincronizando: "sincronizando", erro: "com erro", planejado: "planejado",
  rascunho: "rascunho", em_revisao: "em revisão",
};
export const statusLabel = (s) => STATUS[s] ?? String(s ?? "").replace(/_/g, " ");

const SEVERIDADE = { alta: "alta", media: "média", baixa: "baixa", critica: "crítica" };
/** Severidade para o leitor: "media" → "média". */
export const severidadeLabel = (s) => SEVERIDADE[norm(s)] ?? String(s ?? "").replace(/_/g, " ");

/* ------------------------------------------------------------------ */
/* Vocabulário do setor e gênero                                       */
/* ------------------------------------------------------------------ */

const term = (ctx, k) => (typeof ctx?.term === "function" ? ctx.term(k) : ctx?.data?.vocabulario?.[k] ?? k);
const hoje = (ctx) => ctx?.today ?? ctx?.data?.data_referencia ?? "2026-11-13";

/** Gênero gramatical de um termo do vocabulário ("setor produtivo" → m, "célula" → f, "OP" → f). */
export function feminino(palavra) {
  const w = norm(palavra).trim().split(/\s+/)[0] ?? "";
  if (["op", "ops", "os", "nc", "ncs", "ordem", "ordens", "maquina", "maquinas", "peca", "pecas"].includes(w)) return true;
  if (/(cao|coes|sao|soes|dade|dades|gem|gens)$/.test(w)) return true;
  return /as?$/.test(w) && !/(ema|emas|eta|etas)$/.test(w) && !/^dias?$/.test(w);
}
/** "na célula", "no setor produtivo". */
const em = (ctx, k) => `${feminino(term(ctx, k)) ? "na" : "no"} ${term(ctx, k)}`;
/** "a TIN-03"/"o TEA-12": artigo para máquina conforme o termo do setor. */
const artMaq = (ctx) => (feminino(term(ctx, "maquina")) ? "a" : "o");
/** concorda o adjetivo: ("atrasad", ctx, "ordem", plural) → "atrasadas"/"atrasados". */
const conc = (raiz, ctx, k, plural) => `${raiz}${feminino(term(ctx, k)) ? "a" : "o"}${plural ? "s" : ""}`;
const plural = (n, ctx, k1, kN) => (n === 1 ? term(ctx, k1) : term(ctx, kN));

/* ------------------------------------------------------------------ */
/* Módulos, referências e perfil                                       */
/* ------------------------------------------------------------------ */

export const DONO_REF = {
  op: "producao", turno: "producao", nc: "qualidade", os: "manutencao", maq: "manutencao",
  pedido: "comercial", cliente: "comercial", rep: "comercial", regra: "comercial", sku: "comercial",
  saber: "operadores", kpi: "visao-geral", integ: "integracoes",
};
const AREA_MODULO = { gestao: "visao-geral" };
/** Módulo da tela → área do aprendizado. */
const MODULO_AREA = {
  producao: "producao", qualidade: "qualidade", manutencao: "manutencao", comercial: "comercial",
  marketing: "marketing", operadores: "operadores", portal: "comercial", "visao-geral": "gestao",
};

export function ligado(ctx, modulo) {
  if (!modulo || modulo === "visao-geral") return true;
  return typeof ctx?.isEnabled === "function" ? !!ctx.isEnabled(modulo) : true;
}

function docLigado(ctx, doc) {
  return ligado(ctx, "cerebro") || ligado(ctx, AREA_MODULO[doc?.area] ?? doc?.area);
}

const listaAprendizado = (ctx) => {
  const a = ctx?.aprendizado;
  if (Array.isArray(a)) return a.filter((x) => x && x.id);
  if (a && typeof a.list === "function") { try { return a.list() ?? []; } catch { return []; } }
  return [];
};

/** Uma referência pode ser citada? Usa ctx.resolveRef (fonte da verdade) quando existe. */
export function refOk(ctx, ref) {
  if (!ref || typeof ref !== "string") return false;
  if (typeof ctx?.resolveRef === "function") {
    try { return !!ctx.resolveRef(ref); } catch { return false; }
  }
  const tipo = ref.split(":")[0];
  if (tipo === "aprendizado") return listaAprendizado(ctx).some((a) => `aprendizado:${a.id}` === ref);
  if (tipo === "doc") {
    const id = ref.slice(4).split("#")[0];
    const doc = (ctx?.data?.documentos ?? []).find((d) => d.id === id);
    return !!doc && docLigado(ctx, doc);
  }
  return tipo in DONO_REF && ligado(ctx, DONO_REF[tipo]);
}

export function filtraRefs(ctx, refs, max = 6) {
  const out = [];
  for (const r of refs ?? []) if (!out.includes(r) && refOk(ctx, r)) out.push(r);
  return out.slice(0, max);
}

/** Áreas do perfil (id em data.perfis_acesso, ou objeto {areas}); null = sem filtro. */
export function perfilAreas(ctx, perfil) {
  if (!perfil) return null;
  if (typeof perfil === "object" && Array.isArray(perfil.areas)) return perfil.areas;
  const id = typeof perfil === "object" ? perfil.id : perfil;
  const p = (ctx?.data?.perfis_acesso ?? []).find((x) => x.id === id);
  return p ? p.areas ?? [] : null;
}

export function docVisivel(ctx, doc, areas) {
  if (!docLigado(ctx, doc)) return false;
  if (!areas) return true;
  return (doc.acesso ?? [doc.area]).some((a) => areas.includes(a));
}

const aprendizadoVisivel = (a, areas) => !areas || !a.area || a.area === "gestao" || areas.includes(a.area);

/* ------------------------------------------------------------------ */
/* Portal do cliente                                                   */
/* ------------------------------------------------------------------ */

const COLECAO_REF = {
  op: ["ordens", "id"], pedido: ["pedidos", "id"], nc: ["nao_conformidades", "id"], os: ["manutencao", "id"],
  maq: ["maquinas", "id"], sku: ["produtos", "sku"], cliente: ["clientes", "id"], rep: ["representantes", "id"],
  regra: ["regras_comerciais", "id"], saber: ["saberes", "id"], kpi: ["kpis", "id"], integ: ["integracoes", "id"],
};

/** A ref existe nestes dados? (sem olhar módulos) */
function refNosDados(data, ref) {
  const i = String(ref).indexOf(":");
  if (i <= 0) return false;
  const tipo = ref.slice(0, i), id = ref.slice(i + 1);
  if (tipo === "doc") {
    const [docId, trecho] = id.split("#");
    const doc = by(data?.documentos, "id", docId);
    return !!doc && (!trecho || (doc.trechos ?? []).some((t) => t.id === trecho));
  }
  if (tipo === "turno") return (data?.turnos ?? []).some((t) => `${t.data}|${t.turno}|${t.linha}` === id);
  const c = COLECAO_REF[tipo];
  return !!c && (data?.[c[0]] ?? []).some((r) => r?.[c[1]] === id);
}

/** Nome do cliente sem a cidade ("Moda Ponto Certo — Curitiba" → "Moda Ponto Certo"). */
const nomeCurto = (nome) => String(nome ?? "").split(/\s+[—–-]\s+/)[0]
  .replace(/\s*\([^)]*\)\s*$/, "").replace(/,?\s+(ltda|s\.?\s?a|me|eireli)\.?$/i, "").trim();

// documentos que um cliente pode ler: manuais e catálogos liberados ao comercial (e-mails, contratos,
// chamados e planilhas costumam ser de outro cliente ou internos)
const DOC_DO_CLIENTE = new Set(["manual", "catalogo"]);

// módulos que o Portal do cliente enxerga (se estiverem ligados na demo). "cerebro" entra só para a busca
// nos documentos, que na visão do cliente já são só manuais e catálogos liberados a ele.
const MODULOS_DO_CLIENTE = new Set(["portal", "comercial", "visao-geral", "producao", "cerebro"]);

/**
 * Motivo de atraso em linguagem de cliente: genérico, sem código interno (máquina, OS, NC, lote,
 * facção, fornecedor). → "ajuste de qualidade em andamento", "atraso de fornecedor"… ou null.
 */
export function motivoParaCliente(texto) {
  const n = norm(texto);
  if (!n.trim()) return null;
  const motivos = [];
  if (/fornecedor|fundicao|chegou .{0,40}atrasad|\bfalta d[eo]\b|retid[oa] no recebimento|aguarda(ndo)? (o |a )?(lote|material|masterbatch|chapa|insumo|componente|reposicao)/.test(n)) motivos.push("atraso de fornecedor");
  if (/\bncs?\b|nc-\d|nao[ -]conformidade|reprocess|reprovad|retrabalho|defeito|refeit|refaz|repint|retemper|reusinad|porosidade|descolamento|fora d[ae] especificac|segregad|rapport|chupagem|\bgeis\b|lixad/.test(n)) motivos.push("ajuste de qualidade em andamento");
  if (/parad[ao]|quebr|manutenc|\bos-\d|preventiva|falha n[ao]|vibrac|vazamento|instavel|oscilando|cadencia|rotacao limitada|velocidade reduzida|embreagem|nao segura/.test(n)) motivos.push("manutenção de equipamento");
  if (/programacao edi|subiu de/.test(n)) motivos.push("aumento de volume na programação");
  if (!motivos.length) motivos.push("replanejamento da produção");
  const t = lista3(motivos);
  return t.charAt(0).toUpperCase() + t.slice(1);
}

/**
 * Portal do cliente: ctx com os dados filtrados para o cliente `clienteId` (só os pedidos dele, as
 * ordens desses pedidos, ele mesmo e o representante dele, catálogo, regras comerciais e manuais/
 * catálogos que não citam outro cliente). Sem chão de fábrica, qualidade, manutenção, indicadores nem
 * o aprendizado da equipe. Ordens e pedidos vêm na versão para o cliente: status, %, previsão e um
 * motivo genérico de atraso (sem códigos de máquina, OS ou NC); o representante vem sem meta nem
 * realizado; as perguntas sugeridas vêm sem a resposta pronta (que usa a tabela de referência), para o
 * motor responder com a tabela do cliente. isEnabled só deixa passar MODULOS_DO_CLIENTE.
 * → ctx (com ctx.cliente) ou null se o cliente não existe no pacote.
 */
export function visaoDoCliente(ctx, clienteId) {
  const d = ctx?.data ?? {};
  const cli = by(d.clientes, "id", clienteId);
  if (!cli) return null;
  const outros = (d.clientes ?? []).filter((c) => c.id !== cli.id).map((c) => norm(nomeCurto(c.nome))).filter((n) => n.length >= 5);
  const citaOutro = (txt) => { const n = norm(txt); return outros.some((o) => n.includes(o)); };
  const pedidosBrutos = (d.pedidos ?? []).filter((p) => p.cliente === cli.id);
  const idsPv = new Set(pedidosBrutos.map((p) => p.id));
  const idsOp = new Set(pedidosBrutos.map((p) => p.ordem).filter(Boolean));
  const ordensBrutas = (d.ordens ?? []).filter((o) => idsOp.has(o.id) || (o.pedido && idsPv.has(o.pedido)));
  const pedidoDaOrdem = (o) => pedidosBrutos.find((p) => p.ordem === o.id || p.id === o.pedido);
  const ordens = ordensBrutas.map((o) => ({
    id: o.id, sku: o.sku, linha: o.linha, status: o.status, progresso: o.progresso, prazo: o.prazo, pedido: o.pedido,
    previsao_entrega: pedidoDaOrdem(o)?.previsao_entrega,
    motivo_atraso: o.motivo_atraso || o.status === "atrasada" ? motivoParaCliente(o.motivo_atraso || "") : undefined,
    historico: [],
  }));
  const pedidos = pedidosBrutos.map((p) => {
    const { observacao, ...resto } = p;
    if (p.status !== "atrasado") return resto; // a observação é interna (alçada, crédito, regra, histórico)
    const o = p.ordem ? ordensBrutas.find((x) => x.id === p.ordem) : null;
    const motivo = motivoParaCliente(o?.motivo_atraso || observacao || "");
    return { ...resto, observacao: `Entrega reprogramada para ${f.data(p.previsao_entrega)}. Motivo: ${motivo.charAt(0).toLowerCase()}${motivo.slice(1)}.` };
  });
  const data = {
    ...d,
    clientes: [cli],
    representantes: (d.representantes ?? []).filter((r) => r.id === cli.representante)
      .map(({ meta_mes, realizado_mes, ...r }) => r),
    pedidos,
    ordens,
    documentos: (d.documentos ?? []).filter((doc) => DOC_DO_CLIENTE.has(doc.tipo)
      && (doc.acesso ?? [doc.area]).includes("comercial")
      && !citaOutro(`${doc.titulo} ${(doc.trechos ?? []).map((t) => t.texto).join(" ")}`)),
    regras_comerciais: (d.regras_comerciais ?? []).filter((r) => !citaOutro(`${r.titulo} ${r.texto}`)),
    maquinas: [], manutencao: [], nao_conformidades: [], turnos: [], kpis: [], saberes: [], integracoes: [],
    perfis_acesso: [], registro_uso: [], marketing: [], conversa_whatsapp: [],
    perguntas_sugeridas: (d.perguntas_sugeridas ?? []).filter((p) => p.modulo === "portal")
      .map(({ resposta, ...p }) => p),
  };
  const base = ctx;
  return {
    ...ctx, data, cliente: cli.id, aprendizado: [],
    isEnabled: (m) => MODULOS_DO_CLIENTE.has(m) && ligado(base, m),
    // a ref precisa existir na fatia do cliente E passar na checagem original (módulos ligados)
    resolveRef: (ref) => typeof ref === "string" && refNosDados(data, ref) && refOk(base, ref),
  };
}

/**
 * Preço de um produto na tabela do cliente. Lê nas regras comerciais a diferença da tabela dele para a
 * de referência ("Tabela A (redes) tem 6% a menos"). → {preco, tabela, base, pct, referencia, conhecida}
 * referencia: o preço é o de referência (a tabela dele é a de referência ou nenhuma regra diz a
 * diferença); conhecida: alguma regra fala dessa tabela.
 */
export function precoNaTabela(ctx, produto, cliente) {
  const base = Number(produto?.preco);
  const tabela = cliente?.tabela_preco ?? null;
  const out = { preco: base, tabela, base, pct: 0, referencia: true, conhecida: false };
  if (!tabela || isNaN(base)) return out;
  const alvo = norm(tabela);
  for (const r of ctx?.data?.regras_comerciais ?? []) {
    const txt = norm(r.texto);
    let i = txt.indexOf(alvo);
    while (i >= 0) {
      const resto = txt.slice(i + alvo.length);
      if (/^[a-z0-9]/.test(resto)) { i = txt.indexOf(alvo, i + 1); continue; } // "tabela a" dentro de "tabela atacado"
      const trecho = resto.split(/[;.](?!\d)/)[0];
      const m = /(\d+(?:,\d+)?)\s*% a (menos|mais)/.exec(trecho);
      if (m) {
        const pct = Number(m[1].replace(",", ".")) * (m[2] === "menos" ? -1 : 1);
        return { ...out, preco: Math.round(base * (1 + pct / 100) * 100) / 100, pct, referencia: false, conhecida: true };
      }
      if (/referencia/.test(trecho.slice(0, 40))) return { ...out, conhecida: true };
      i = txt.indexOf(alvo, i + 1);
    }
  }
  return out;
}

/** Cliente que o Portal mostra primeiro: o 1º com pedido ainda não entregue (ou o 1º da lista). */
export function clientePadraoDoPortal(data) {
  const cs = data?.clientes ?? [];
  const ped = data?.pedidos ?? [];
  return (cs.find((c) => ped.some((p) => p.cliente === c.id && p.status !== "entregue")) ?? cs[0])?.id ?? null;
}

/* ------------------------------------------------------------------ */
/* Busca                                                               */
/* ------------------------------------------------------------------ */

function corpus(ctx, areas) {
  const d = ctx?.data ?? {};
  const itens = [];
  // o que a equipe registrou nesta demo vem primeiro (vence empates)
  for (const a of listaAprendizado(ctx)) {
    if (!aprendizadoVisivel(a, areas)) continue;
    itens.push({
      ref: `aprendizado:${a.id}`, titulo: `${a.titulo} (registrado nesta demo por ${a.autor || "Você"})`,
      tituloBusca: `${a.titulo} ${a.maquina ?? ""}`, texto: a.texto, area: a.area, aprendizado: true,
    });
  }
  for (const doc of d.documentos ?? []) {
    if (!docVisivel(ctx, doc, areas)) continue;
    for (const t of doc.trechos ?? []) {
      itens.push({
        ref: `doc:${doc.id}#${t.id}`, titulo: `${doc.titulo} · ${t.secao ?? ""}`.replace(/ · $/, ""),
        tituloBusca: `${doc.titulo} ${t.secao ?? ""} ${doc.id}`, texto: t.texto, area: doc.area,
      });
    }
  }
  if (ligado(ctx, "operadores") && (!areas || areas.includes("operadores"))) {
    for (const s of d.saberes ?? []) {
      itens.push({
        ref: `saber:${s.id}`, titulo: `${s.titulo} (${s.autor}, ${s.funcao})`,
        tituloBusca: `${s.titulo} ${(s.tags ?? []).join(" ")} ${s.maquina ?? ""}`, texto: s.dica,
        area: s.area ?? "operadores",
      });
    }
  }
  if (ligado(ctx, "qualidade") && (!areas || areas.includes("qualidade"))) {
    for (const n of d.nao_conformidades ?? []) {
      itens.push({
        ref: `nc:${n.id}`, titulo: `${n.id} · ${corta(n.descricao, 70)}`,
        tituloBusca: `${n.id} ${n.sku ?? ""} ${n.descricao}`, texto: `${frase(n.descricao)} Causa: ${frase(n.causa)} Ação: ${frase(n.acao)}`,
        area: "qualidade",
      });
    }
  }
  if (ligado(ctx, "comercial") && (!areas || areas.includes("comercial"))) {
    for (const r of d.regras_comerciais ?? []) {
      itens.push({ ref: `regra:${r.id}`, titulo: r.titulo, tituloBusca: r.titulo, texto: r.texto, area: "comercial" });
    }
  }
  return itens;
}

/** Busca por palavras (sem acento), título vale mais. → [{ref, titulo, trecho, area, score, aprendizado?}] */
export function buscar(ctx, termo, { perfil, limite = 8 } = {}) {
  const q = [...new Set(tokens(termo))];
  if (!q.length) return [];
  const areas = perfilAreas(ctx, perfil);
  const res = [];
  for (const it of corpus(ctx, areas)) {
    const tt = tokens(it.tituloBusca), tx = tokens(it.texto);
    let score = 0, achados = 0;
    for (const t of q) {
      const noTitulo = contem(t, tt), noTexto = contem(t, tx);
      if (noTitulo || noTexto) achados++;
      score += (noTitulo ? 3 : 0) + (noTexto ? 1 : 0);
    }
    if (!achados) continue;
    score = score * (0.5 + achados / q.length / 2);
    if (!refOk(ctx, it.ref)) continue;
    const r = { ref: it.ref, titulo: it.titulo, trecho: corta(it.texto, 220), area: it.area, score: Math.round(score * 100) / 100 };
    if (it.aprendizado) r.aprendizado = true;
    res.push(r);
  }
  // ordenação estável: em empate, o aprendizado (que entrou primeiro no corpus) fica na frente
  return res.sort((a, b) => b.score - a.score).slice(0, limite);
}

/* ------------------------------------------------------------------ */
/* Markdown                                                            */
/* ------------------------------------------------------------------ */

/** "**ID**[[ref]]": id em negrito seguido do marcador da fonte. */
const cita = (id, ref) => `**${id}**${ref ? `[[${ref}]]` : ""}`;

const escRe = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Id de registro de uma ref (o que aparece escrito no texto), ou null. */
function idDaRef(ref) {
  const [tipo, ...resto] = String(ref).split(":");
  const id = resto.join(":");
  if (["op", "pedido", "nc", "os", "maq", "sku", "regra", "saber", "cliente"].includes(tipo)) return id;
  return null;
}

/**
 * Texto pronto (perguntas sugeridas, em prosa) → Markdown: ids das fontes em negrito com o marcador
 * logo depois da 1ª menção; 3+ frases viram resumo + lista.
 */
function formataRoteiro(texto, fontes) {
  let t = String(texto ?? "").trim();
  for (const ref of fontes ?? []) {
    const id = idDaRef(ref);
    if (!id) continue;
    const re = new RegExp(`(?<![\\w*-])${escRe(id)}(?![\\w*-]|\\*\\*)`);
    if (re.test(t)) t = t.replace(re, cita(id, ref));
  }
  if (/\n/.test(t)) return t; // já tem estrutura
  const frases = t.split(/(?<=[.!?])\s+(?=\*\*|[A-ZÁÉÍÓÚÂÊÔÃÕÇ"“])/);
  if (frases.length < 3) return t;
  return `${frases[0]}\n\n${frases.slice(1).map((x) => `- ${x}`).join("\n")}`;
}

/* ------------------------------------------------------------------ */
/* Descrição de registros                                              */
/* ------------------------------------------------------------------ */

const by = (lista, campo, v) => (lista ?? []).find((x) => x?.[campo] === v);

function prazoTexto(ctx, iso) {
  const falta = dias(hoje(ctx), iso);
  if (falta == null) return f.data(iso);
  if (falta < 0) return `${f.data(iso)} (vencido há ${-falta} dia${falta === -1 ? "" : "s"})`;
  if (falta === 0) return `${f.data(iso)} (vence hoje)`;
  return `${f.data(iso)} (faltam ${falta} dia${falta === 1 ? "" : "s"})`;
}

function descreveOrdem(ctx, o) {
  const d = ctx.data;
  const p = by(d.produtos, "sku", o.sku);
  if (ctx.cliente) { // Portal: status, %, previsão e motivo genérico (os dados já vêm assim de visaoDoCliente)
    const linhas = [`${cita(o.id, `op:${o.id}`)}${p ? ` · ${p.nome}` : ""}: ${statusLabel(o.status)}, ${f.pct(o.progresso)} concluída.`];
    if (o.previsao_entrega) linhas.push(`- Previsão de entrega do seu pedido: ${f.data(o.previsao_entrega)}.`);
    if (o.motivo_atraso) linhas.push(`- **Motivo do atraso:** ${frase(o.motivo_atraso)}`);
    const fontes = [`op:${o.id}`];
    if (o.pedido) { linhas.push(`- Pedido ${cita(o.pedido, `pedido:${o.pedido}`)}.`); fontes.push(`pedido:${o.pedido}`); }
    return { texto: linhas.join("\n"), fontes };
  }
  const linha = by(d.linhas, "id", o.linha);
  const linhas = [
    `${cita(o.id, `op:${o.id}`)}${p ? ` · ${p.nome} (${o.sku})` : ""}: ${statusLabel(o.status)}, ${f.pct(o.progresso)} concluída.`,
    `- ${f.num(o.quantidade)} ${p?.unidade ?? term(ctx, "unidade")}${linha ? ` ${em(ctx, "linha")} ${linha.nome}` : ""}; prazo ${prazoTexto(ctx, o.prazo)}.`,
  ];
  if (o.motivo_atraso) linhas.push(`- **Motivo do atraso:** ${frase(o.motivo_atraso)}`);
  const ult = (o.historico ?? []).at(-1);
  if (ult) linhas.push(`- Último registro (${f.data(ult.data)}): ${frase(ult.evento)}`);
  const fontes = [`op:${o.id}`];
  if (o.pedido && ligado(ctx, "comercial")) {
    const pv = by(d.pedidos, "id", o.pedido);
    const cli = pv && by(d.clientes, "id", pv.cliente);
    linhas.push(`- Atende o pedido ${cita(o.pedido, `pedido:${o.pedido}`)}${cli ? ` (${cli.nome})` : ""}.`);
    fontes.push(`pedido:${o.pedido}`);
  }
  return { texto: linhas.join("\n"), fontes };
}

function descrevePedido(ctx, pv) {
  const d = ctx.data;
  const cli = by(d.clientes, "id", pv.cliente);
  const total = (pv.itens ?? []).reduce((s, i) => s + (i.quantidade ?? 0) * (i.preco_unit ?? 0), 0);
  const linhas = [
    `${cita(pv.id, `pedido:${pv.id}`)}${cli ? ` · ${cli.nome}` : ""}: ${statusLabel(pv.status)}, previsão de entrega ${f.data(pv.previsao_entrega)}, total de **${f.money(total)}**.`,
  ];
  for (const i of (pv.itens ?? []).slice(0, 4)) linhas.push(`- ${f.num(i.quantidade)} × ${by(d.produtos, "sku", i.sku)?.nome ?? i.sku}`);
  const fontes = [`pedido:${pv.id}`];
  if (pv.ordem && ligado(ctx, "producao")) {
    const o = by(d.ordens, "id", pv.ordem);
    if (o) {
      const quando = ctx.cliente ? "" : `, prazo ${f.data(o.prazo)}`; // no Portal a data que vale é a previsão do pedido
      const motivo = o.motivo_atraso && !(ctx.cliente && pv.observacao) ? `. ${frase(o.motivo_atraso)}` : "."; // no Portal o motivo já vai na observação
      linhas.push(`- ${term(ctx, "ordem")} ${cita(o.id, `op:${o.id}`)}: ${statusLabel(o.status)}, ${f.pct(o.progresso)}${quando}${motivo}`);
      fontes.push(`op:${o.id}`);
    }
  }
  if (pv.observacao) linhas.push(`- Obs.: ${frase(pv.observacao)}`);
  if (cli) fontes.push(`cliente:${cli.id}`);
  return { texto: linhas.join("\n"), fontes };
}

function descreveNC(ctx, n) {
  const linhas = [
    `${cita(n.id, `nc:${n.id}`)} (${f.data(n.data)}, origem ${n.origem}, severidade ${severidadeLabel(n.severidade)}): ${statusLabel(n.status)}. ${frase(corta(n.descricao, 180))}`,
    `- **Causa:** ${frase(corta(n.causa, 160))}`,
    `- **Ação:** ${frase(corta(n.acao, 160))}`,
    `- **Responsável:** ${n.responsavel}`,
  ];
  return { texto: linhas.join("\n"), fontes: [`nc:${n.id}`] };
}

function descreveOS(ctx, os) {
  const m = by(ctx.data.maquinas, "id", os.maquina);
  const linhas = [
    `${cita(os.id, `os:${os.id}`)} · ${os.tipo} ${m ? `${em(ctx, "maquina").split(" ")[0]} ${m.id} (${m.nome})` : `em ${os.maquina}`}, ${f.data(os.data)}: ${statusLabel(os.status)}.`,
    `- ${frase(corta(os.descricao, 200))}`,
    `- Técnico: ${os.tecnico}${os.duracao_h ? ` · ${f.num(os.duracao_h)} h` : ""}`,
  ];
  if (os.pecas?.length) linhas.push(`- Peças: ${os.pecas.join(", ")}`);
  const fontes = [`os:${os.id}`];
  if (os.procedimento) {
    const doc = by(ctx.data.documentos, "id", os.procedimento);
    if (doc && docLigado(ctx, doc)) { linhas.push(`- Procedimento: ${doc.titulo}[[doc:${doc.id}]]`); fontes.push(`doc:${doc.id}`); }
  }
  return { texto: linhas.join("\n"), fontes };
}

function descreveMaquina(ctx, m) {
  const d = ctx.data;
  const linhas = [
    `${cita(m.id, `maq:${m.id}`)} · ${m.nome}: ${statusLabel(m.status)}. Horímetro ${f.num(m.horimetro)} h, MTBF ${f.num(m.mtbf_h)} h, próxima preventiva ${f.data(m.proxima_preventiva)}.`,
  ];
  const fontes = [`maq:${m.id}`];
  const abertas = (d.manutencao ?? []).filter((o) => o.maquina === m.id && o.status !== "concluida");
  for (const o of abertas) {
    linhas.push(`- OS em aberto ${cita(o.id, `os:${o.id}`)}: ${frase(corta(o.descricao, 120))}`);
    fontes.push(`os:${o.id}`);
  }
  const ult = (d.manutencao ?? []).filter((o) => o.maquina === m.id).sort((a, b) => (b.data > a.data ? 1 : -1))[0];
  if (ult && !abertas.includes(ult)) {
    linhas.push(`- Última OS: ${cita(ult.id, `os:${ult.id}`)} em ${f.data(ult.data)}: ${frase(corta(ult.descricao, 100))}`);
    fontes.push(`os:${ult.id}`);
  }
  if (ligado(ctx, "operadores")) {
    for (const s of (d.saberes ?? []).filter((x) => x.maquina === m.id).slice(0, 2)) {
      linhas.push(`- **Saber de operador:** ${frase(corta(s.dica, 160))} (${s.autor}, ${s.funcao.toLowerCase()}, ${s.tempo_casa_anos} anos de casa)[[saber:${s.id}]]`);
      fontes.push(`saber:${s.id}`);
    }
  }
  if (m.manual) fontes.push(`doc:${m.manual}`);
  return { texto: linhas.join("\n"), fontes };
}

function descreveProduto(ctx, p) {
  const d = ctx.data;
  const baixo = p.estoque < p.estoque_minimo;
  const un = p.unidade === "peças" ? "peça" : p.unidade;
  let preco = `**${f.money(p.preco)}** por ${un}`;
  const cli = ctx.cliente ? by(d.clientes, "id", ctx.cliente) : null;
  if (cli?.tabela_preco) { // Portal: o preço da tabela do cliente, não o de referência
    const t = precoNaTabela(ctx, p, cli);
    preco = t.conhecida
      ? `pela ${t.tabela}, **${f.money(t.preco)}** por ${un}`
      : `**${f.money(p.preco)}** por ${un} no preço de referência (o da ${t.tabela} sai na proposta do ${term(ctx, "representante")})`;
  }
  const linhas = [
    `${cita(p.sku, `sku:${p.sku}`)} · ${p.nome}: ${preco}, prazo padrão de ${p.prazo_dias} dias.`,
    `- Estoque: ${f.num(p.estoque)} ${p.unidade}${baixo ? `, **abaixo do mínimo** de ${f.num(p.estoque_minimo)}` : ` (mínimo ${f.num(p.estoque_minimo)})`}`,
  ];
  const fontes = [`sku:${p.sku}`];
  if (ligado(ctx, "producao")) {
    const ops = (d.ordens ?? []).filter((o) => o.sku === p.sku && o.status !== "concluida").slice(0, 3);
    for (const o of ops) linhas.push(`- ${term(ctx, "ordem")} ${cita(o.id, `op:${o.id}`)}: ${statusLabel(o.status)}, ${f.pct(o.progresso)}, prazo ${f.data(o.prazo)}`);
    fontes.push(...ops.map((o) => `op:${o.id}`));
  }
  return { texto: linhas.join("\n"), fontes };
}

function descreveCliente(ctx, c) {
  const d = ctx.data;
  const rep = by(d.representantes, "id", c.representante);
  const linhas = [
    `**${c.nome}**[[cliente:${c.id}]] (${c.cidade}/${c.uf}, ${c.segmento}): condição ${c.condicao_pagamento}, ${c.tabela_preco}, limite de ${f.money(c.limite_credito)}.`,
    `- Último pedido em ${f.data(c.ultimo_pedido)}${rep ? `; ${term(ctx, "representante")}: ${rep.nome}` : ""}`,
  ];
  const pvs = (d.pedidos ?? []).filter((p) => p.cliente === c.id && !["entregue", "faturado"].includes(p.status)).slice(0, 3);
  for (const p of pvs) linhas.push(`- Pedido ${cita(p.id, `pedido:${p.id}`)}: ${statusLabel(p.status)}, entrega ${f.data(p.previsao_entrega)}`);
  return { texto: linhas.join("\n"), fontes: [`cliente:${c.id}`, ...pvs.map((p) => `pedido:${p.id}`)] };
}

function descreveRep(ctx, r) {
  if (ctx.cliente || r.meta_mes == null) { // Portal: só quem é e como falar com ele (sem meta nem realizado)
    const quem = ctx.cliente ? `seu ${term(ctx, "representante")} (${r.regiao})` : `${term(ctx, "representante")} de ${r.regiao}`;
    return { texto: `**${r.nome}**[[rep:${r.id}]], ${quem}. Contato ${r.telefone}.`, fontes: [`rep:${r.id}`] };
  }
  const pct = r.meta_mes ? (r.realizado_mes / r.meta_mes) * 100 : null;
  return {
    texto: `**${r.nome}**[[rep:${r.id}]], ${term(ctx, "representante")} de ${r.regiao}: realizou **${f.money(r.realizado_mes)}** de ${f.money(r.meta_mes)} no mês (${f.pct(pct)} da meta). Contato ${r.telefone}.`,
    fontes: [`rep:${r.id}`],
  };
}

function descreveKpi(ctx, k) {
  const ok = k.direcao === "menor_melhor" ? k.valor <= k.meta : k.valor >= k.meta;
  const ant = (k.tendencia ?? []).at(-2);
  const linhas = [
    `**${k.nome}**[[kpi:${k.id}]]: **${f.valor(k.valor, k.unidade)}**, meta ${f.valor(k.meta, k.unidade)} (${ok ? "dentro da meta" : "fora da meta"}${ant != null ? `; mês anterior ${f.valor(ant, k.unidade)}` : ""}).`,
  ];
  if (k.explicacao) linhas.push("", frase(k.explicacao));
  if (k.caminho?.length) linhas.push("", "**Caminho do dado:**", ...k.caminho.map((c, i) => `${i + 1}. ${c}`));
  const fontes = [`kpi:${k.id}`, ...(k.fontes ?? [])];
  return { texto: linhas.join("\n"), fontes };
}

function descreveDoc(ctx, doc) {
  const tr = (doc.trechos ?? []).slice(0, 2);
  const linhas = [`**${doc.titulo}**[[doc:${doc.id}]] (${doc.origem}, atualizado em ${f.data(doc.atualizado)}):`];
  for (const t of tr) linhas.push(`- **${t.secao}:** ${frase(corta(t.texto, 180))}`);
  return { texto: linhas.join("\n"), fontes: tr.length ? tr.map((t) => `doc:${doc.id}#${t.id}`) : [`doc:${doc.id}`] };
}

const descreveSaber = (ctx, s) => ({
  texto: `**${s.titulo}**[[saber:${s.id}]]\n\n${frase(corta(s.dica, 320))}\n\n${s.autor} (${s.funcao.toLowerCase()}, ${s.tempo_casa_anos} anos de casa) · validado por ${s.validado_por}.`,
  fontes: [`saber:${s.id}`],
});
const descreveRegra = (ctx, r) => ({ texto: `**${r.titulo}**[[regra:${r.id}]]: ${frase(r.texto)}`, fontes: [`regra:${r.id}`] });

/* Índice de IDs → registro (só módulos ligados; documentos respeitam perfil). */
function indiceIds(ctx, areas) {
  const d = ctx.data ?? {};
  const idx = new Map();
  const add = (lista, campo, modulo, fn, filtro) => {
    if (!ligado(ctx, modulo)) return;
    for (const r of lista ?? []) if (r?.[campo] && (!filtro || filtro(r))) idx.set(norm(r[campo]), () => fn(ctx, r));
  };
  add(d.ordens, "id", "producao", descreveOrdem);
  add(d.pedidos, "id", "comercial", descrevePedido);
  add(d.nao_conformidades, "id", "qualidade", descreveNC);
  add(d.manutencao, "id", "manutencao", descreveOS);
  add(d.maquinas, "id", "manutencao", descreveMaquina);
  add(d.produtos, "sku", ligado(ctx, "portal") ? "portal" : "comercial", descreveProduto);
  add(d.clientes, "id", "comercial", descreveCliente);
  add(d.representantes, "id", "comercial", descreveRep);
  add(d.regras_comerciais, "id", "comercial", descreveRegra);
  add(d.saberes, "id", "operadores", descreveSaber);
  add(d.documentos, "id", "visao-geral", descreveDoc, (doc) => docVisivel(ctx, doc, areas));
  return idx;
}

function idsNaPergunta(ctx, pergunta, areas) {
  const idx = indiceIds(ctx, areas);
  const achados = [];
  const toks = norm(pergunta).split(/[^a-z0-9\-]+/).map((t) => t.replace(/^-+|-+$/g, "")).filter(Boolean);
  for (const t of toks) if (idx.has(t) && !achados.includes(t)) achados.push(t);
  if (!achados.length) {
    // número solto ("a 24518") casa com o ID que termina nele, se único
    for (const t of toks.filter((x) => /^\d{3,}$/.test(x))) {
      const c = [...idx.keys()].filter((k) => k.endsWith("-" + t) || (k.endsWith(t) && k.length > t.length && /[^0-9]/.test(k[k.length - t.length - 1])));
      if (c.length === 1 && !achados.includes(c[0])) achados.push(c[0]);
    }
  }
  return achados.slice(0, 3).map((k) => idx.get(k)());
}

/* ------------------------------------------------------------------ */
/* Perguntas sugeridas                                                 */
/* ------------------------------------------------------------------ */

function similaridade(a, b) {
  const A = [...new Set(a)], B = [...new Set(b)];
  if (!A.length || !B.length) return 0;
  const inter = A.filter((t) => contem(t, B)).length;
  return (2 * inter) / (A.length + B.length);
}

export function sugeridasLigadas(ctx) {
  // A resposta pronta cita no texto os registros das fontes: se alguma fonte for de módulo
  // desligado, a pergunta sai da lista (senão o texto vazaria dados do módulo desligado).
  return (ctx?.data?.perguntas_sugeridas ?? []).filter(
    (p) => ligado(ctx, p.modulo) && (p.fontes ?? []).every((r) => refOk(ctx, r))
  );
}

export function sugestoes(ctx, modulo, n = 3) {
  const todas = sugeridasLigadas(ctx);
  const doModulo = todas.filter((p) => p.modulo === modulo);
  const extra = todas.filter((p) => p.modulo !== modulo && ["visao-geral", "cerebro"].includes(p.modulo));
  const resto = todas.filter((p) => !doModulo.includes(p) && !extra.includes(p));
  return [...doModulo, ...extra, ...resto].slice(0, n).map((p) => p.pergunta);
}

function casaSugerida(ctx, pergunta, modulo) {
  const q = tokens(pergunta), qn = norm(pergunta).replace(/[^a-z0-9]+/g, " ").trim();
  const idsQ = (norm(pergunta).match(/\b[a-z]{1,5}-\d[\w-]*/g) ?? []);
  let melhor = null, melhorScore = 0;
  for (const s of sugeridasLigadas(ctx)) {
    const sn = norm(s.pergunta).replace(/[^a-z0-9]+/g, " ").trim();
    let sc = sn === qn ? 1.5 : similaridade(q, tokens(s.pergunta));
    if (idsQ.some((id) => !norm(`${s.pergunta} ${s.resposta ?? ""}`).includes(id))) continue;
    if (s.modulo === modulo) sc += 0.05;
    if (sc > melhorScore) { melhor = s; melhorScore = sc; }
  }
  return melhorScore >= 0.6 ? melhor : null;
}

/* ------------------------------------------------------------------ */
/* Intenções simples                                                   */
/* ------------------------------------------------------------------ */

const SEV = { alta: 0, media: 1, baixa: 2 };

function atrasados(ctx, qn) {
  const d = ctx.data, partes = [], fontes = [];
  const querPedido = /pedido/.test(qn) && !/\bops?\b|ordem|ordens/.test(qn);
  const ops = ligado(ctx, "producao") ? (d.ordens ?? []).filter((o) => o.status === "atrasada") : [];
  const pvs = ligado(ctx, "comercial") ? (d.pedidos ?? []).filter((p) => p.status === "atrasado") : [];
  const blocoOps = () => {
    if (!ops.length) return;
    const n = ops.length;
    partes.push(`Há **${n} ${plural(n, ctx, "ordem", "ordens")} ${conc("atrasad", ctx, "ordem", n !== 1)}**:\n` +
      ops.slice(0, 6).map((o) => {
        const p = by(d.produtos, "sku", o.sku);
        return `- ${cita(o.id, `op:${o.id}`)} · ${p?.nome ?? o.sku}: ${f.pct(o.progresso)}, prazo ${f.data(o.prazo)}${o.motivo_atraso ? `. ${frase(corta(o.motivo_atraso, 140))}` : "."}`;
      }).join("\n"));
    fontes.push(...ops.slice(0, 6).map((o) => `op:${o.id}`));
  };
  const blocoPvs = () => {
    if (!pvs.length) return;
    partes.push(`**${pvs.length} pedido${pvs.length === 1 ? " atrasado" : "s atrasados"}**:\n` +
      pvs.slice(0, 6).map((p) => `- ${cita(p.id, `pedido:${p.id}`)} · ${by(d.clientes, "id", p.cliente)?.nome ?? p.cliente}: previsão ${f.data(p.previsao_entrega)}${p.ordem ? `, ${p.ordem}` : ""}`).join("\n"));
    fontes.push(...pvs.slice(0, 6).map((p) => `pedido:${p.id}`));
  };
  if (querPedido) { blocoPvs(); if (!pvs.length) blocoOps(); }
  else { blocoOps(); if (!ops.length || /pedido|entrega|cliente/.test(qn)) blocoPvs(); }
  if (!partes.length && (ligado(ctx, "producao") || ligado(ctx, "comercial"))) {
    const oq = querPedido ? "Nenhum pedido" : `${feminino(term(ctx, "ordem")) ? "Nenhuma" : "Nenhum"} ${term(ctx, "ordem")}`;
    return { texto: `${oq} com status de atraso nos dados de hoje (${f.data(hoje(ctx))}).`, fontes: [] };
  }
  return partes.length ? { texto: partes.join("\n\n"), fontes } : null;
}

function ncsAbertas(ctx) {
  if (!ligado(ctx, "qualidade")) return null;
  const ncs = (ctx.data.nao_conformidades ?? []).filter((n) => n.status !== "encerrada")
    .sort((a, b) => (SEV[a.severidade] ?? 3) - (SEV[b.severidade] ?? 3));
  if (!ncs.length) return { texto: "Não há não conformidades abertas nos dados de hoje.", fontes: [] };
  return {
    texto: `Há **${ncs.length} não conformidade${ncs.length === 1 ? "" : "s"} em aberto**:\n` +
      ncs.slice(0, 6).map((n) => `- ${cita(n.id, `nc:${n.id}`)} (${severidadeLabel(n.severidade)}, ${statusLabel(n.status)}): ${frase(corta(n.descricao, 100))} Responsável: ${n.responsavel}.`).join("\n"),
    fontes: ncs.slice(0, 6).map((n) => `nc:${n.id}`),
  };
}

/** Linha/setor produtivo citado na pergunta ("na tinturaria") → registro de data.linhas, ou null. */
function linhaDaPergunta(ctx, q) {
  const genericas = new Set(["linha", "linhas", "setor", "planta", "final", "geral", "pecas", "producao"]);
  return (ctx.data?.linhas ?? []).find((l) => tokens(l.nome).some((t) => t.length >= 5 && !genericas.has(t) && contem(t, q))) ?? null;
}

function maquinasAlerta(ctx, linha = null) {
  if (!ligado(ctx, "manutencao")) return null;
  const ordem = { parada: 0, alerta: 1, manutencao: 2 };
  const onde = linha ? ` ${em(ctx, "linha")} ${linha.nome}` : "";
  const ms = (ctx.data.maquinas ?? []).filter((m) => m.status !== "operando" && (!linha || m.linha === linha.id))
    .sort((a, b) => (ordem[a.status] ?? 3) - (ordem[b.status] ?? 3));
  if (!ms.length) return { texto: `Todas as ${term(ctx, "maquinas")}${onde} estão operando agora.`, fontes: [] };
  const os = ctx.data.manutencao ?? [];
  const n = ms.length;
  return {
    texto: `**${n} ${plural(n, ctx, "maquina", "maquinas")}** fora da operação normal${onde}:\n` +
      ms.slice(0, 6).map((m) => {
        const o = os.find((x) => x.maquina === m.id && x.status !== "concluida");
        return `- ${cita(m.id, `maq:${m.id}`)} · ${m.nome}: ${statusLabel(m.status)}${o ? `. ${cita(o.id, `os:${o.id}`)}: ${frase(corta(o.descricao, 100))}` : "."}`;
      }).join("\n"),
    fontes: ms.slice(0, 6).flatMap((m) => {
      const o = os.find((x) => x.maquina === m.id && x.status !== "concluida");
      return o ? [`maq:${m.id}`, `os:${o.id}`] : [`maq:${m.id}`];
    }),
  };
}

/* "O que eu preciso ver hoje?" e variações: conclusão + 3 a 4 itens priorizados */

// Só a pergunta inteira, sem área nem registro: "o que eu preciso ver hoje (na fábrica)?", "o que mais
// preocupa na operação hoje?", "quais são os alertas do dia?"… Comparada com a pergunta normalizada
// (sem acento, pontuação vira espaço). "O que mais preocupa na qualidade?" não casa: vai para a área.
const R_ONDE = "(?: (?:na|da|para a|pra) (?:operacao|fabrica|empresa|planta|industria))?";
const R_QUANDO = "(?: (?:hoje|agora|primeiro|do dia|de hoje))?";
const RESUMO_DO_DIA = new RegExp("^(?:" + [
  `o que (?:eu )?(?:preciso|devo|tenho que|vale) (?:ver|olhar|saber|acompanhar|priorizar)${R_QUANDO}${R_ONDE}${R_QUANDO}`,
  `o que (?:mais )?(?:me )?preocupa(?:m)?${R_ONDE}${R_QUANDO}`,
  `(?:quais (?:sao )?(?:os )?)?alertas? (?:do dia|de hoje)${R_ONDE}`,
  `(?:quais (?:sao )?(?:as )?)?prioridades? (?:de|do|para|pra) (?:hoje|dia)${R_ONDE}`,
  `(?:me (?:de|da|faz|faca|mostra) )?(?:um |o )?resumo do dia${R_ONDE}`,
  `o que (?:esta|ta) pegando${R_ONDE}${R_QUANDO}`,
  `o que (?:mais )?(?:pede|precisa de|merece) (?:a |minha |a minha )?atencao${R_ONDE}${R_QUANDO}`,
  `onde (?:eu )?(?:devo |preciso )?(?:focar|me concentrar)${R_ONDE}${R_QUANDO}`,
].join("|") + ")$");
const textoLimpo = (p) => norm(p).replace(/[^a-z0-9]+/g, " ").trim();

// Palavras que põem a pergunta numa área (fora do resumo geral). A ordem decide o empate.
const AREA_PALAVRAS = [
  ["qualidade", /\b(qualidade|nao conformidades?|ncs?|reclamac\w*|laboratorio|inspec\w*)\b/],
  ["manutencao", /\b(manutenc\w*|maquinas?|equipamentos?|quebr\w*|preventivas?)\b/],
  ["producao", /\b(producao|pcp|ops?|ordens?|programacao|turnos?|refugo)\b/],
  ["comercial", /\b(comercial|vendas?|pedidos?|clientes?|entregas?|representantes?)\b/],
  ["operadores", /\b(operadores?|chao de fabrica)\b/],
  ["marketing", /\b(marketing|catalogo)\b/],
];
const AREA_RESUMO = { qualidade: "qualidade", manutencao: "manutencao", producao: "producao", comercial: "comercial" };

/** Área citada na pergunta (pelo nome, pelo apelido ou pela palavra da máquina do setor), ou null. */
function areaDaPergunta(ctx, qlimpo) {
  for (const [area, re] of AREA_PALAVRAS) if (re.test(qlimpo)) return area;
  const maq = textoLimpo(term(ctx, "maquina"));
  if (maq && new RegExp(`\\b${escRe(maq)}s?\\b`).test(qlimpo)) return "manutencao";
  return null;
}

/** A pergunta cita um registro (OP, PV, máquina, NC, OS…) ou uma área/setor produtivo? Então não é resumo geral. */
function citaRegistroOuArea(ctx, p, areas) {
  const qlimpo = textoLimpo(p);
  if (/\b[a-z]{1,5}-\d/.test(norm(p)) || idsNaPergunta(ctx, p, areas).length) return true;
  return !!areaDaPergunta(ctx, qlimpo) || !!linhaDaPergunta(ctx, tokens(p));
}

// "O que mais preocupa/pede atenção/está pegando…" dentro de uma área: vai para a lista daquela área.
const PREOCUPACAO = /\b(preocupa\w*|atencao|alertas?|prioridades?|pegando|focar|resumo do dia|(preciso|devo) (ver|olhar)|(preciso|devo) saber hoje)\b/;

/** Resposta de "o que preocupa" numa área: NCs abertas, máquinas fora do normal, atrasos. */
function resumoDaArea(ctx, area, q) {
  if (area === "qualidade") return ncsAbertas(ctx);
  if (area === "manutencao") return maquinasAlerta(ctx, linhaDaPergunta(ctx, q));
  if (area === "producao") return atrasados(ctx, "ordens atrasadas");
  if (area === "comercial") return atrasados(ctx, "pedidos atrasados");
  return null;
}

// Portal do cliente: perguntas sobre a fábrica por dentro (máquinas, qualidade, indicadores…)
const INTERNO_DA_FABRICA = /\b(maquinas?|equipamentos?|manutenc\w*|quebr\w*|nao conformidades?|ncs?|refugo|oee|indicador\w*|kpis?|turnos?|operador\w*|custos?|margem|margens|metas?|qualidade|chao de fabrica)\b/;
const perguntaInterna = (ctx, qlimpo) => INTERNO_DA_FABRICA.test(qlimpo) || areaDaPergunta(ctx, qlimpo) === "manutencao";

/** Pergunta interna feita no Portal: frase educada, sem dados (nada de "todas as máquinas estão operando"). */
function foraDoPortal(ctx) {
  const d = ctx.data ?? {};
  const cli = by(d.clientes, "id", ctx.cliente);
  const rep = cli && by(d.representantes, "id", cli.representante);
  const empresa = ctx.empresa || d.empresa?.nome || "empresa";
  return {
    texto: frase(`No portal você vê só os seus pedidos, o catálogo e as condições comerciais; isso fica com a equipe da ${empresa}`) +
      (rep ? ` ${contatoRep(ctx, rep)}` : ""),
    fontes: rep ? [`rep:${rep.id}`] : [],
  };
}

const contatoRep = (ctx, rep) => `Se precisar, fale com ${rep.nome}, seu ${term(ctx, "representante")}: ${rep.telefone}.`;

/** Portal: o código citado não é de um pedido/ordem/produto deste cliente. */
function naoEDoCliente(ctx, codigo) {
  const d = ctx.data ?? {};
  const cli = by(d.clientes, "id", ctx.cliente);
  const rep = cli && by(d.representantes, "id", cli.representante);
  return {
    texto: `Não encontrei ${codigo.toUpperCase()} entre os seus pedidos. Confira o número${rep ? ` ou fale com ${rep.nome}, seu ${term(ctx, "representante")}: ${rep.telefone}` : ""}.`,
    fontes: rep ? [`rep:${rep.id}`] : [],
  };
}

const somaPedido = (pv) => (pv.itens ?? []).reduce((s, i) => s + (i.quantidade ?? 0) * (i.preco_unit ?? 0), 0);
const lista3 = (xs) => (xs.length <= 1 ? xs.join("") : `${xs.slice(0, -1).join(", ")} e ${xs.at(-1)}`);

/**
 * Resumo do dia para quem decide: uma frase de conclusão e até 4 itens (o que é, impacto e próximo
 * passo), só com o que está no pacote. Prioridade: pedidos de cliente atrasados (os que vencem
 * primeiro e valem mais), máquina parada, não conformidade grave, depois o que sobrar.
 */
function resumoDoDia(ctx, areas) {
  const d = ctx.data ?? {};
  const pode = (modulo, area) => ligado(ctx, modulo) && (!areas || areas.includes(area));
  const comPv = pode("comercial", "comercial"), comOp = pode("producao", "producao");
  const comMaq = pode("manutencao", "manutencao"), comNc = pode("qualidade", "qualidade");
  const opsAtr = comOp ? (d.ordens ?? []).filter((o) => o.status === "atrasada") : [];
  const pvsAtr = comPv
    ? (d.pedidos ?? []).filter((p) => p.status === "atrasado")
      .sort((a, b) => String(a.previsao_entrega).localeCompare(String(b.previsao_entrega)) || somaPedido(b) - somaPedido(a))
    : [];
  const ORD_MAQ = { parada: 0, alerta: 1, manutencao: 2 };
  const maqs = comMaq ? (d.maquinas ?? []).filter((m) => m.status in ORD_MAQ).sort((a, b) => ORD_MAQ[a.status] - ORD_MAQ[b.status]) : [];
  const ncs = comNc ? (d.nao_conformidades ?? []).filter((n) => n.status !== "encerrada" && n.severidade === "alta") : [];
  const osAberta = (m) => (d.manutencao ?? []).filter((o) => o.maquina === m.id && o.status !== "concluida")
    .sort((a, b) => String(b.data).localeCompare(String(a.data)))[0];
  const ordem = term(ctx, "ordem");

  const itemPedido = (pv) => {
    const cli = by(d.clientes, "id", pv.cliente);
    const nome = nomeCurto(cli?.nome) || pv.cliente;
    const o = comOp && pv.ordem ? by(d.ordens, "id", pv.ordem) : null;
    const refs = [`pedido:${pv.id}`];
    let causa = "";
    if (o) {
      refs.push(`op:${o.id}`);
      causa = ` Depende ${feminino(ordem) ? "da" : "do"} ${cita(o.id, `op:${o.id}`)}, em ${f.pct(o.progresso)}` +
        `${o.motivo_atraso ? `: ${frase(corta(o.motivo_atraso, 140))}` : "."}`;
    } else if (pv.observacao) causa = ` ${frase(corta(pv.observacao, 140))}`;
    return {
      ids: [pv.id, o?.id].filter(Boolean), refs,
      comece: `pelo pedido ${pv.id} (${nome})`,
      texto: `**Pedido ${pv.id}**[[pedido:${pv.id}]], de ${nome} (${f.money(somaPedido(pv))}): atrasado, entrega prevista para ${f.data(pv.previsao_entrega)}.` +
        `${causa} **Próximo passo:** avisar ${nome} da nova data antes que a cobrança chegue.`,
    };
  };
  const itemOrdem = (o) => {
    const p = by(d.produtos, "sku", o.sku);
    return {
      ids: [o.id], refs: [`op:${o.id}`], comece: `pel${feminino(ordem) ? "a" : "o"} ${o.id}`,
      texto: `**${o.id}**[[op:${o.id}]] (${p?.nome ?? o.sku}, ${f.num(o.quantidade)} ${p?.unidade ?? term(ctx, "unidade")}): ` +
        `${conc("atrasad", ctx, "ordem", false)}, em ${f.pct(o.progresso)}, prazo era ${f.data(o.prazo)}.` +
        `${o.motivo_atraso ? ` ${frase(corta(o.motivo_atraso, 140))}` : ""} **Próximo passo:** fechar com o PCP a nova data.`,
    };
  };
  const itemMaquina = (m) => {
    const os = osAberta(m);
    const presas = opsAtr.filter((o) => o.linha === m.linha);
    const refs = [`maq:${m.id}`];
    if (os) refs.push(`os:${os.id}`);
    const art = artMaq(ctx);
    const impacto = presas.length
      ? ` Segura ${presas.length === 1 ? `${feminino(ordem) ? "a" : "o"} ${presas[0].id}, que está ${conc("atrasad", ctx, "ordem", false)}` : `${presas.length} ${term(ctx, "ordens")} ${conc("atrasad", ctx, "ordem", true)}`}.`
      : "";
    const osTxt = os ? ` ${cita(os.id, `os:${os.id}`)} (${os.tipo}) ${statusLabel(os.status)} desde ${f.data(os.data)}.` : "";
    return {
      ids: [m.id, os?.id].filter(Boolean), refs, comece: `pel${art} ${m.id}`,
      texto: `**${m.nome}**[[maq:${m.id}]] (${m.id}): ${statusLabel(m.status)}.${osTxt}${impacto} ` +
        `**Próximo passo:** ${os ? `pedir à manutenção a data de liberação da ${os.id}` : "abrir uma OS e avaliar o impacto na programação"}.`,
    };
  };
  const itemNc = (n) => ({
    ids: [n.id], refs: [`nc:${n.id}`], comece: `pela ${n.id}`,
    texto: `**Não conformidade ${n.id}**[[nc:${n.id}]] (severidade alta, ${statusLabel(n.status)}): ${frase(corta(n.descricao, 120))} ` +
      `**Próximo passo:** acompanhar com ${n.responsavel} a ação em curso: ${frase(corta(n.acao, 100)).replace(/^./, (c) => c.toLowerCase())}`,
  });

  // cotas por tipo para variar (2 pedidos, 1 máquina, 1 NC); o que faltar completa com o resto
  const opsSemPedido = opsAtr.filter((o) => !pvsAtr.some((p) => p.ordem === o.id));
  const filas = [
    [pvsAtr.length ? pvsAtr : opsAtr, pvsAtr.length ? itemPedido : itemOrdem, 2],
    [maqs, itemMaquina, 1],
    [ncs, itemNc, 1],
    [pvsAtr.length ? opsSemPedido : [], itemOrdem, 1],
  ];
  const itens = [], usados = new Set();
  const textoJa = () => itens.map((i) => i.texto).join(" ");
  const tenta = (reg, fn) => {
    if (itens.length >= 4) return;
    const it = fn(reg);
    if (it.ids.some((id) => usados.has(id) || textoJa().includes(id))) return; // já coberto por outro item
    it.ids.forEach((id) => usados.add(id));
    itens.push(it);
  };
  for (const [regs, fn, cota] of filas) for (const r of regs.slice(0, cota)) tenta(r, fn);
  for (const [regs, fn, cota] of filas) for (const r of regs.slice(cota)) tenta(r, fn);
  if (!itens.length) {
    if (!comPv && !comOp && !comMaq && !comNc) return null;
    return { texto: `Nada fora do normal nos dados de hoje (${f.data(hoje(ctx))}): nenhum pedido ou ${ordem} com atraso, nenhuma ${term(ctx, "maquina")} parada e nenhuma não conformidade grave em aberto.`, fontes: [] };
  }

  // conclusão: o tamanho do problema e por onde começar
  const partes = [];
  if (pvsAtr.length) {
    const total = pvsAtr.reduce((s, p) => s + somaPedido(p), 0);
    partes.push(`${pvsAtr.length} ${pvsAtr.length === 1 ? "pedido atrasado" : "pedidos atrasados"} de ${term(ctx, pvsAtr.length === 1 ? "cliente" : "clientes")} (${f.money(total)})`);
  } else if (opsAtr.length) {
    partes.push(`${opsAtr.length} ${plural(opsAtr.length, ctx, "ordem", "ordens")} ${conc("atrasad", ctx, "ordem", opsAtr.length !== 1)}`);
  }
  const paradas = maqs.filter((m) => m.status === "parada");
  if (paradas.length === 1) partes.push(`${artMaq(ctx)} ${paradas[0].id} ${conc("parad", ctx, "maquina", false)}`);
  else if (paradas.length > 1) partes.push(`${paradas.length} ${term(ctx, "maquinas")} ${conc("parad", ctx, "maquina", true)}`);
  if (ncs.length) partes.push(`${ncs.length} não conformidade${ncs.length === 1 ? "" : "s"} grave${ncs.length === 1 ? "" : "s"} em aberto`);
  const conclusao = partes.length
    ? `**Hoje pedem atenção ${lista3(partes)}; comece ${itens[0].comece}.**`
    : `**Hoje o ponto de atenção é ${itens[0].comece.replace(/^pel[oa] /, "")}.**`;

  return {
    texto: `${conclusao}\n\n${itens.map((it, i) => `${i + 1}. ${it.texto}`).join("\n")}`,
    fontes: itens.flatMap((it) => it.refs),
  };
}

function kpiPorNome(ctx, q) {
  let melhor = null, ms = 0;
  for (const k of ctx.data.kpis ?? []) {
    const kt = tokens(`${k.nome} ${k.id}`);
    const inter = kt.filter((t) => contem(t, q)).length;
    const sc = inter / kt.length;
    if (inter && sc > ms) { melhor = k; ms = sc; }
  }
  return ms >= 0.5 ? melhor : null;
}

function produtoPorNome(ctx, q) {
  const genericas = new Set(["produto", "produtos", "preco", "estoque", "prazo", "entrega", "custa", "valor", term(ctx, "produto"), term(ctx, "produtos")].map(norm));
  const qq = q.filter((t) => !genericas.has(t));
  if (!qq.length) return null;
  let melhor = null, ms = 0;
  for (const p of ctx.data.produtos ?? []) {
    const pt = tokens(`${p.nome} ${p.familia ?? ""}`);
    const inter = qq.filter((t) => contem(t, pt)).length;
    const sc = inter / qq.length + inter * 0.01;
    if (inter && sc > ms) { melhor = p; ms = sc; }
  }
  return ms >= 0.34 ? melhor : null;
}

function entidadePorNome(ctx, qn) {
  if (!ligado(ctx, "comercial")) return null;
  const d = ctx.data;
  for (const c of d.clientes ?? []) {
    const n = norm(c.nome);
    const fortes = tokens(c.nome).filter((t) => t.length >= 4 && !["loja", "lojas", "comercio", "distribuidora", "ltda"].includes(t));
    if (qn.includes(n) || (fortes.length >= 2 && fortes.filter((t) => qn.includes(t)).length >= 2)) return descreveCliente(ctx, c);
  }
  for (const r of d.representantes ?? []) {
    const n = norm(r.nome);
    if (qn.includes(n) || tokens(r.nome).filter((t) => t.length >= 3 && qn.includes(t)).length >= 2) return descreveRep(ctx, r);
  }
  return null;
}

function intencoes(ctx, pergunta) {
  const qn = norm(pergunta), q = tokens(pergunta);
  const d = ctx.data;
  if (/atras/.test(qn)) { const r = atrasados(ctx, qn); if (r) return r; }
  if (/\bncs?\b|nao[ -]conformidade|reclamac/.test(qn)) { const r = ncsAbertas(ctx); if (r) return r; }
  const k = kpiPorNome(ctx, q);
  if (k && (/oee|indicador|kpi|meta|taxa|indice|%|caiu|subiu|piorou|melhorou/.test(qn) || q.length <= 4)) return descreveKpi(ctx, k);
  if (/estoque|preco|prazo|custa|valor|disponiv|entrega/.test(qn) && (ligado(ctx, "comercial") || ligado(ctx, "portal"))) {
    const p = produtoPorNome(ctx, q);
    if (p) return descreveProduto(ctx, p);
    if (/estoque/.test(qn)) {
      const baixos = (d.produtos ?? []).filter((x) => x.estoque < x.estoque_minimo);
      if (baixos.length) return {
        texto: `**${baixos.length} ${plural(baixos.length, ctx, "produto", "produtos")}** abaixo do estoque mínimo:\n` +
          baixos.slice(0, 6).map((x) => `- ${cita(x.sku, `sku:${x.sku}`)} · ${x.nome}: ${f.num(x.estoque)} de mínimo ${f.num(x.estoque_minimo)} ${x.unidade}`).join("\n"),
        fontes: baixos.slice(0, 6).map((x) => `sku:${x.sku}`),
      };
    }
  }
  if (/turno/.test(qn) && ligado(ctx, "producao")) {
    const ts = [...(d.turnos ?? [])].sort((a, b) => (b.data + b.turno > a.data + a.turno ? 1 : -1));
    const linha = (d.linhas ?? []).find((l) => tokens(l.nome).some((t) => contem(t, q)));
    const t = (linha ? ts.filter((x) => x.linha === linha.id) : ts)[0];
    if (t) {
      const ln = by(d.linhas, "id", t.linha);
      const ref = `turno:${t.data}|${t.turno}|${t.linha}`;
      const linhas = [
        `**${t.turno} turno de ${f.data(t.data)}** · ${ln?.nome ?? t.linha}[[${ref}]]: ${f.num(t.produzido)} produzidas, refugo de ${f.num(t.refugo)}, ${f.num(t.paradas_min)} min de parada.`,
        "", frase(t.resumo),
      ];
      if (t.ocorrencias?.length) linhas.push("", "**Ocorrências:**", ...t.ocorrencias.map((o) => `- ${frase(o)}`));
      return { texto: linhas.join("\n"), fontes: [ref] };
    }
  }
  const palavraMaq = norm(term(ctx, "maquina"));
  if (/parad|maquina|equipamento|quebr|alerta|manutenc/.test(qn) || qn.includes(palavraMaq)) {
    const r = maquinasAlerta(ctx, linhaDaPergunta(ctx, q)); if (r) return r;
  }
  if (/oee|indicador|kpi|metas?\b/.test(qn)) {
    const ks = d.kpis ?? [];
    if (ks.length) return {
      texto: "Indicadores de hoje:\n" + ks.slice(0, 8).map((x) => `- **${x.nome}**[[kpi:${x.id}]]: ${f.valor(x.valor, x.unidade)} (meta ${f.valor(x.meta, x.unidade)})`).join("\n"),
      fontes: ks.slice(0, 8).map((x) => `kpi:${x.id}`),
    };
  }
  return null;
}

/* ------------------------------------------------------------------ */
/* Aprendizado da demo                                                 */
/* ------------------------------------------------------------------ */

const AREA_LOCAL = {
  producao: "na produção", qualidade: "na qualidade", manutencao: "na manutenção", comercial: "no comercial",
  marketing: "no marketing", operadores: "no chão de fábrica", gestao: "na gestão",
};

/**
 * Trecho do título para a pergunta: até 10 palavras (sem terminar em preposição/artigo solto), sem
 * pontuação final. Só a 1ª letra vira minúscula, e só se a palavra não for sigla ou código ("TIN-03",
 * "OEE", "ΔE" ficam como estão). Cortado → reticências.
 */
function trechoTitulo(titulo) {
  const ws = String(titulo ?? "").replace(/[.!?;:…]+$/, "").split(/\s+/).filter(Boolean);
  let n = Math.min(10, ws.length);
  while (n > 3 && STOP.has(norm(ws[n - 1]))) n--;
  const parte = ws.slice(0, n);
  if (parte[0] && !/\d/.test(parte[0]) && !/^\p{Lu}{2,}/u.test(parte[0])) parte[0] = parte[0].charAt(0).toLowerCase() + parte[0].slice(1);
  return parte.join(" ").replace(/[,;:—-]+$/, "") + (n < ws.length ? "…" : "");
}

// nome de empresa costuma ir no feminino ("a Moda Ponto Certo", "a Magazine Horizonte Sul": a empresa);
// estas primeiras palavras pedem "o"
const EMPRESA_MASCULINA = new Set(["atacado", "emporio", "armazem", "supermercado", "mercado", "grupo", "frigorifico",
  "laticinio", "posto", "centro", "atelie", "bazar", "deposito", "hospital", "hotel", "restaurante", "condominio"]);
const artigoEmpresa = (nome) => (EMPRESA_MASCULINA.has(norm(nome).split(/\s+/)[0]) ? "o" : "a");
/** Nome de máquina sem o detalhe entre parênteses ("Jet HT de tingimento 3 (400 kg)" → "jet ht de tingimento 3"). */
const nomeMaquina = (m) => norm(String(m?.nome ?? "").replace(/\s*\([^)]*\)/g, "")).trim();

/**
 * Registros do pacote citados no título ou no texto de um item do aprendizado, na ordem em que aparecem:
 * códigos (OP, pedido, máquina, NC, OS, produto), nome de cliente e nome de máquina.
 * → [{pos, tipo, id, rotulo, descreve()}] (rotulo: "a OP-24518", "o pedido PV-88213", "a Magazine Horizonte Sul").
 */
function entidadesCitadas(item, ctx) {
  const d = ctx?.data;
  if (!d) return [];
  const alvo = norm(`${item.titulo ?? ""} ${item.texto ?? ""}`);
  const ordem = term(ctx, "ordem"), produto = term(ctx, "produto");
  const achados = [];
  const add = (pos, tipo, id, rotulo, descreve) => {
    const ja = achados.find((x) => x.tipo === tipo && x.id === id);
    if (ja) { ja.pos = Math.min(ja.pos, pos); return; }
    achados.push({ pos, tipo, id, rotulo, descreve });
  };
  const codigos = [
    [d.ordens, "id", "op", ligado(ctx, "producao"), (id) => `${feminino(ordem) ? "a" : "o"} ${id}`, descreveOrdem],
    [d.pedidos, "id", "pedido", ligado(ctx, "comercial"), (id) => `o pedido ${id}`, descrevePedido],
    [d.maquinas, "id", "maq", ligado(ctx, "manutencao"), (id) => `${artMaq(ctx)} ${id}`, descreveMaquina],
    [d.nao_conformidades, "id", "nc", ligado(ctx, "qualidade"), (id) => `a ${id}`, descreveNC],
    [d.manutencao, "id", "os", ligado(ctx, "manutencao"), (id) => `a ${id}`, descreveOS],
    [d.produtos, "sku", "sku", ligado(ctx, "comercial") || ligado(ctx, "portal"), (id) => `${feminino(produto) ? "a" : "o"} ${produto} ${id}`, descreveProduto],
  ];
  for (const [lista, campo, tipo, ok, rotulo, fn] of codigos) {
    if (!ok) continue;
    for (const r of lista ?? []) {
      const id = r?.[campo];
      if (!id || String(id).length < 4) continue;
      const m = new RegExp(`(?<![a-z0-9-])${escRe(norm(id))}(?![a-z0-9])`).exec(alvo);
      if (m) add(m.index, tipo, id, rotulo(id), () => fn(ctx, r));
    }
  }
  if (ligado(ctx, "comercial")) {
    for (const c of d.clientes ?? []) {
      const curto = nomeCurto(c.nome), n = norm(curto);
      let pos = n.length >= 5 ? new RegExp(`(?<![a-z0-9])${escRe(n)}(?![a-z0-9])`).exec(alvo)?.index ?? -1 : -1;
      if (pos < 0) { // ao menos duas palavras fortes do nome ("Horizonte Sul" não basta; "Magazine Horizonte" sim)
        const fortes = tokens(curto).filter((t) => t.length >= 4 && !["loja", "lojas", "comercio", "distribuidora", "ltda", "moda", "modas"].includes(t));
        const pos2 = fortes.map((t) => new RegExp(`(?<![a-z0-9])${escRe(t)}(?![a-z0-9])`).exec(alvo)?.index ?? -1).filter((x) => x >= 0);
        if (fortes.length >= 2 && pos2.length >= 2) pos = Math.min(...pos2);
      }
      if (pos >= 0) add(pos, "cliente", c.id, `${artigoEmpresa(curto)} ${curto}`, () => descreveCliente(ctx, c));
    }
  }
  if (ligado(ctx, "manutencao")) {
    for (const m of d.maquinas ?? []) {
      const n = nomeMaquina(m);
      const hit = n.length >= 8 ? new RegExp(`(?<![a-z0-9])${escRe(n)}(?![a-z0-9])`).exec(alvo) : null;
      if (hit) add(hit.index, "maq", m.id, `${artMaq(ctx)} ${m.id}`, () => descreveMaquina(ctx, m));
    }
  }
  return achados.sort((a, b) => a.pos - b.pos);
}

/**
 * "Nos dados da empresa" de um item do aprendizado: os registros que ele cita (a máquina do campo
 * `maquina`, depois os citados no texto: pedidos do cliente, a máquina, a OP…), até 2. null se não cita nada.
 */
function dadosDoItem(ctx, item) {
  const ents = entidadesCitadas(item, ctx);
  if (item.maquina && ligado(ctx, "manutencao")) {
    const m = (ctx.data?.maquinas ?? []).find((x) => norm(x.id) === norm(item.maquina));
    if (m && !ents.some((e) => e.tipo === "maq" && e.id === m.id)) ents.unshift({ tipo: "maq", id: m.id, descreve: () => descreveMaquina(ctx, m) });
  }
  if (!ents.length) return null;
  const partes = ents.slice(0, 2).map((e) => e.descreve());
  return { texto: partes.map((r) => r.texto).join("\n\n"), fontes: partes.flatMap((r) => r.fontes) };
}

/**
 * Pergunta derivada de um registro (UX §4.6.4). Sempre casa com o próprio item em responder():
 * aprendizadoDaPergunta() compara a pergunta com perguntaDerivada(item) (normalizada) e dá a maior nota
 * a esse item. O teste "pergunta derivada casa com o próprio item" em demo/server/test.mjs confere isso.
 */
export function perguntaDerivada(item, ctx) {
  if (!item) return "";
  if (item.maquina) {
    const art = ctx ? artMaq(ctx) : "a";
    return `O que preciso saber antes de programar ${art} ${item.maquina}?`;
  }
  // cita um registro do pacote (OP, pedido, máquina, NC, OS, produto) ou um cliente/máquina pelo nome:
  // pergunta pela entidade ("…sobre a OP-24518?", "…sobre a Magazine Horizonte Sul?")
  const ent = entidadesCitadas(item, ctx)[0];
  if (ent) return `O que a equipe registrou sobre ${ent.rotulo}?`;
  if (item.tipo === "ocorrencia") return `O que aconteceu ${AREA_LOCAL[item.area] ?? "na operação"} hoje?`;
  // entre aspas: o título costuma ser uma frase ("o forno 2 só aquece direito"), não um substantivo
  if (item.tipo === "documento") return `Qual é a regra para “${trechoTitulo(item.titulo)}”?`;
  return `O que a equipe sabe sobre “${trechoTitulo(item.titulo)}”?`;
}

const palavras4 = (s) => [...new Set(tokens(s).filter((t) => t.length >= 4 && !/\d/.test(t)))];
const idsDeMaquina = (ctx) => (ctx?.data?.maquinas ?? []).map((m) => m.id);

/** Itens do aprendizado que a pergunta pede (mais recentes primeiro). */
export function aprendizadoDaPergunta(ctx, pergunta, { modulo, perfil } = {}) {
  const itens = listaAprendizado(ctx);
  if (!itens.length) return [];
  const areas = perfilAreas(ctx, perfil);
  const qn = norm(pergunta);
  const qcmp = qn.replace(/[^a-z0-9]+/g, " ").trim();
  const qp = palavras4(pergunta);
  const maqs = idsDeMaquina(ctx).filter((id) => new RegExp(`(?<![a-z0-9-])${escRe(norm(id))}(?![a-z0-9])`).test(qn));
  const areaTela = MODULO_AREA[modulo] ?? null;
  const geral = !modulo || ["visao-geral", "cerebro", "conversa", "inicio"].includes(modulo);
  const out = [];
  for (const a of itens) {
    if (!aprendizadoVisivel(a, areas)) continue;
    if (!refOk(ctx, `aprendizado:${a.id}`)) continue;
    let score = 0;
    const derivada = norm(perguntaDerivada(a, ctx)).replace(/[^a-z0-9]+/g, " ").trim();
    if (derivada === qcmp) score += 10;
    if (a.maquina && maqs.includes(a.maquina)) score += 6;
    else if (maqs.some((id) => norm(a.texto).includes(norm(id)))) score += 4;
    const ap = palavras4(`${a.titulo} ${a.texto}`);
    const comuns = qp.filter((t) => contem(t, ap)).length;
    if (comuns >= 3 || (comuns >= 2 && (geral || a.area === areaTela))) score += comuns;
    if (score > 0) out.push({ a, score });
  }
  return out
    .sort((x, y) => y.score - x.score || String(y.a.criado_em ?? y.a.id).localeCompare(String(x.a.criado_em ?? x.a.id)))
    .map((x) => x.a);
}

/* ------------------------------------------------------------------ */
/* Resposta                                                            */
/* ------------------------------------------------------------------ */

function responderBase(ctx, p, { modulo, perfil, areas, perfilOk }) {
  const qlimpo = textoLimpo(p);
  // (0) "o que eu preciso ver hoje?" e variações: resumo para quem decide (no lugar da lista de códigos).
  // Só na visão geral (ou sem tela), sem registro nem área na pergunta; no Portal do cliente não (o
  // resumo é da operação interna). Pergunta de área vai para a área em (b2).
  if (!ctx.cliente && (!modulo || modulo === "visao-geral") && RESUMO_DO_DIA.test(qlimpo) && !citaRegistroOuArea(ctx, p, areas)) {
    const r = resumoDoDia(ctx, areas); if (r) return r;
  }

  // (a) pergunta sugerida (igual ou parecida); a resposta pronta só vale se o perfil vê todas as fontes.
  // No Portal as sugeridas vêm sem resposta pronta (visaoDoCliente): o motor calcula com os dados dele.
  // "O que preocupa/pede atenção…" numa área (citada, ou a da tela) vai para a lista da área (b2), a
  // menos que a sugerida seja da própria tela: a resposta pronta da visão geral não serve à qualidade.
  const regs = idsNaPergunta(ctx, p, areas);
  const areaPreocupa = !regs.length && PREOCUPACAO.test(qlimpo)
    ? areaDaPergunta(ctx, qlimpo) ?? (linhaDaPergunta(ctx, tokens(p)) ? "manutencao" : null) ?? AREA_RESUMO[modulo] ?? null
    : null;
  const s = casaSugerida(ctx, p, modulo);
  let negadaPorPerfil = false;
  if (s?.resposta && !(areaPreocupa && s.modulo !== modulo)) {
    if ((s.fontes ?? []).every(perfilOk)) return { texto: formataRoteiro(s.resposta, s.fontes), fontes: s.fontes ?? [] };
    negadaPorPerfil = true;
  }

  // (b) ID de registro
  if (regs.length) return { texto: regs.map((r) => r.texto).join("\n\n"), fontes: regs.flatMap((r) => r.fontes) };

  // (b1) Portal do cliente: código que não é dele, pergunta sobre a fábrica por dentro (fora do acesso
  // dele, com educação) e "quem é o meu representante?"
  if (ctx.cliente) {
    const codigo = norm(p).match(/\b[a-z]{1,5}-\d[\w-]*/)?.[0];
    if (codigo) return naoEDoCliente(ctx, codigo);
    if (perguntaInterna(ctx, qlimpo)) return foraDoPortal(ctx);
    if (/\b(meus? pedidos?|minhas? (compras?|entregas?|encomendas?))\b/.test(qlimpo) && !/atras/.test(qlimpo)) {
      const abertos = (ctx.data.pedidos ?? []).filter((x) => !["entregue", "faturado"].includes(x.status))
        .sort((a, b) => String(b.data).localeCompare(String(a.data))).slice(0, 2);
      if (abertos.length) {
        const rs = abertos.map((x) => descrevePedido(ctx, x));
        return { texto: rs.map((r) => r.texto).join("\n\n"), fontes: rs.flatMap((r) => r.fontes) };
      }
    }
    if (/\b(representantes?|vendedor(a|es)?|com quem (eu )?falo)\b/.test(qlimpo) || qlimpo.includes(textoLimpo(term(ctx, "representante")))) {
      const cli = by(ctx.data.clientes, "id", ctx.cliente);
      const rep = cli && by(ctx.data.representantes, "id", cli.representante);
      if (rep) return descreveRep(ctx, rep);
    }
  }

  // (b2) a lista daquela área: NCs abertas, máquinas fora do normal, atrasos
  if (areaPreocupa && (!areas || areas.includes(areaPreocupa))) {
    const r = resumoDaArea(ctx, areaPreocupa, tokens(p)); if (r) return r;
  }

  // (c) intenções simples e nomes de clientes/representantes
  const it = intencoes(ctx, p) ?? entidadePorNome(ctx, norm(p));
  if (it) return it;

  // (d) busca em documentos, saberes, NCs e regras (o aprendizado entra antes, em responder)
  const achados = buscar(ctx, p, { perfil, limite: 4 })
    .filter((r) => !r.aprendizado)
    .filter((r, i, arr) => r.score >= Math.max(2, arr[0].score * 0.4))
    .slice(0, 3);
  if (achados.length) {
    const linhas = achados.map((r) => `- **${semPonto(r.titulo)}**[[${r.ref}]]: “${semPonto(corta(r.trecho, 200))}”`);
    return {
      texto: `Encontrei isto ${achados.length === 1 ? "num documento da operação" : "nos documentos da operação"}:\n${linhas.join("\n")}`,
      fontes: achados.map((r) => r.ref), fraco: true,
    };
  }

  // (e) nada
  if (negadaPorPerfil) {
    const nome = (ctx.data.perfis_acesso ?? []).find((x) => x.id === (typeof perfil === "object" ? perfil?.id : perfil))?.nome;
    return { texto: `Essa resposta usa documentos ou registros que o perfil ${nome ? `“${nome}” ` : ""}não pode consultar.`, fontes: [], vazio: true };
  }
  const sug = sugestoes(ctx, modulo, 3);
  return {
    texto: "Não encontrei isso nos dados desta demo." + (sug.length ? " Experimente perguntar:\n" + sug.map((x) => `- ${x}`).join("\n") : ""),
    fontes: [], vazio: true,
  };
}

/** Tira do texto os marcadores de fontes que não passaram no filtro (módulo desligado, perfil). */
function limpaMarcadores(texto, fontes) {
  return String(texto).replace(/\[\[\s*([a-z]+:[^\]]+?)\s*\]\]/gi, (m, ref) => (fontes.includes(ref.trim()) ? m : ""));
}

/** → {texto, fontes, modo: "local"}. Com `cliente` (Portal do cliente), só enxerga os dados dele. */
export function responder(ctx, pergunta, { modulo, perfil, cliente } = {}) {
  if (cliente) {
    const visao = visaoDoCliente(ctx, cliente);
    if (!visao) return { texto: "Não encontrei esse cliente nesta demo.", fontes: [], modo: "local" };
    ctx = visao;
  }
  const areas = perfilAreas(ctx, perfil);
  // "Ver como": documentos pelo acesso; saberes/NCs/regras pela área.
  const AREA_REF = { saber: "operadores", nc: "qualidade", regra: "comercial" };
  const perfilOk = (ref) => {
    if (!areas) return true;
    const tipo = String(ref).split(":")[0];
    if (tipo === "doc") {
      const doc = by(ctx.data?.documentos, "id", String(ref).slice(4).split("#")[0]);
      return !!doc && docVisivel(ctx, doc, areas);
    }
    return !AREA_REF[tipo] || areas.includes(AREA_REF[tipo]);
  };
  const pronto = (texto, fontes, max = 8) => {
    const fs = filtraRefs(ctx, (fontes ?? []).filter(perfilOk), max);
    return { texto: limpaMarcadores(texto, fs), fontes: fs, modo: "local" };
  };
  const p = String(pergunta ?? "").trim();
  if (!p || !ctx?.data) return pronto("Escreva uma pergunta sobre a operação desta demo.", []);

  let base = responderBase(ctx, p, { modulo, perfil, areas, perfilOk });
  const apr = aprendizadoDaPergunta(ctx, p, { modulo, perfil }).slice(0, 2);
  if (!apr.length) return pronto(base.texto, base.fontes);

  // "Nos dados da empresa": os registros que o item cita (pedidos do cliente, a máquina, a OP) quando a
  // pergunta é sobre o item (a derivada dele, ou cita a mesma entidade) ou a base não achou nada firme.
  // Sem entidade no item, fica a resposta da pergunta (busca/intenção).
  const doItem = dadosDoItem(ctx, apr[0]);
  if (doItem) {
    const qcmp = textoLimpo(p);
    const sobreOItem = textoLimpo(perguntaDerivada(apr[0], ctx)) === qcmp;
    const daPergunta = new Set(entidadesCitadas({ titulo: p }, ctx).map((e) => `${e.tipo}:${e.id}`));
    const mesmaEntidade = entidadesCitadas(apr[0], ctx).some((e) => daPergunta.has(`${e.tipo}:${e.id}`));
    if (sobreOItem || mesmaEntidade || base.vazio || base.fraco) base = doItem;
  }

  // O que a equipe registrou vem primeiro, citado (UX §4.5.4: o laço do "uau" sem chave de API).
  // mesmo formato do servidor (demo/server/local.mjs): título em negrito, autor e data, texto citado
  // (quando o título é só o começo do texto, não repete: vai o texto inteiro com o autor em negrito)
  const blocos = apr.map((a) => {
    const quem = `Registrado nesta demo por ${!a.autor || a.autor === "Você" ? "você" : a.autor}${a.criado_em ? ` em ${f.data(String(a.criado_em).slice(0, 10))}` : ""}`;
    const texto = frase(corta(a.texto, 600));
    const titulo = semPonto(a.titulo);
    if (!titulo || norm(a.texto).startsWith(norm(titulo).replace(/…$/, ""))) return `**${quem}:** ${texto} [[aprendizado:${a.id}]]`;
    return `**${titulo}** — ${quem}:\n${texto} [[aprendizado:${a.id}]]`;
  });
  const refsApr = apr.map((a) => `aprendizado:${a.id}`);
  if (base.vazio || base.fraco) return pronto(blocos.join("\n\n"), refsApr, 10);
  return pronto(`${blocos.join("\n\n")}\n\n**Nos dados da empresa:**\n\n${base.texto}`, [...refsApr, ...base.fontes], 10);
}
