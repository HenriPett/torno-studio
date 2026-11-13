// Motor determinístico do assistente: responde sem IA real, só com o pacote de dados do setor.
// A demo precisa funcionar 100% com ele (visitante sem a capacidade `sample`, servidor local,
// IA negada ou limitada). Também é a base das ferramentas (ai/tools.js) e da busca local.
//
// Regras gerais: respeita os módulos ligados (ctx.isEnabled) e, quando há perfil, o acesso por área
// dos documentos (data.perfis_acesso). Nunca devolve fonte de módulo desligado.

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
    "isto este esta esse essa eu voce voces ele ela eles elas mais menos ja hoje ainda ou la lá " +
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

export function corta(s, n = 240) {
  const t = String(s ?? "").replace(/\s+/g, " ").trim();
  return t.length > n ? t.slice(0, n - 1).replace(/\s+\S*$/, "") + "…" : t;
}

/* ------------------------------------------------------------------ */
/* Formatação pt-BR (local, para não depender da assinatura de fmt)    */
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

/* ------------------------------------------------------------------ */
/* Módulos, referências e perfil                                       */
/* ------------------------------------------------------------------ */

export const DONO_REF = {
  op: "producao", turno: "producao", nc: "qualidade", os: "manutencao", maq: "manutencao",
  pedido: "comercial", cliente: "comercial", rep: "comercial", regra: "comercial", sku: "comercial",
  saber: "operadores", kpi: "visao-geral", integ: "integracoes",
};
const AREA_MODULO = { gestao: "visao-geral" };

export function ligado(ctx, modulo) {
  if (!modulo || modulo === "visao-geral") return true;
  return typeof ctx?.isEnabled === "function" ? !!ctx.isEnabled(modulo) : true;
}

function docLigado(ctx, doc) {
  return ligado(ctx, "cerebro") || ligado(ctx, AREA_MODULO[doc?.area] ?? doc?.area);
}

/** Uma referência pode ser citada? Usa ctx.resolveRef (fonte da verdade do núcleo) quando existe. */
export function refOk(ctx, ref) {
  if (!ref || typeof ref !== "string") return false;
  if (typeof ctx?.resolveRef === "function") {
    try { return !!ctx.resolveRef(ref); } catch { return false; }
  }
  const tipo = ref.split(":")[0];
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

const term = (ctx, k) => (typeof ctx?.term === "function" ? ctx.term(k) : ctx?.data?.vocabulario?.[k] ?? k);
const hoje = (ctx) => ctx?.today ?? ctx?.data?.data_referencia ?? "2026-11-13";

/* ------------------------------------------------------------------ */
/* Busca                                                               */
/* ------------------------------------------------------------------ */

function corpus(ctx, areas) {
  const d = ctx?.data ?? {};
  const itens = [];
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
        tituloBusca: `${n.id} ${n.sku ?? ""} ${n.descricao}`, texto: `${n.descricao} Causa: ${n.causa} Ação: ${n.acao}`,
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

/** Busca por palavras (sem acento), título vale mais. → [{ref, titulo, trecho, area, score}] */
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
    res.push({ ref: it.ref, titulo: it.titulo, trecho: corta(it.texto, 220), area: it.area, score: Math.round(score * 100) / 100 });
  }
  return res.sort((a, b) => b.score - a.score).slice(0, limite);
}

/* ------------------------------------------------------------------ */
/* Descrição de registros                                              */
/* ------------------------------------------------------------------ */

const by = (lista, campo, v) => (lista ?? []).find((x) => x?.[campo] === v);

function descreveOrdem(ctx, o) {
  const d = ctx.data;
  const p = by(d.produtos, "sku", o.sku);
  const linha = by(d.linhas, "id", o.linha);
  const falta = dias(hoje(ctx), o.prazo);
  const prazoTxt = falta == null ? f.data(o.prazo)
    : falta < 0 ? `${f.data(o.prazo)} (vencido há ${-falta} dia${falta === -1 ? "" : "s"})`
    : `${f.data(o.prazo)} (faltam ${falta} dia${falta === 1 ? "" : "s"})`;
  let t = `${o.id}${p ? ` — ${p.nome} (${o.sku})` : ""}: ${statusLabel(o.status)}, ${f.pct(o.progresso)} concluída, ` +
    `${f.num(o.quantidade)} ${p?.unidade ?? term(ctx, "unidade")}${linha ? ` na ${term(ctx, "linha")} ${linha.nome}` : ""}, prazo ${prazoTxt}.`;
  if (o.motivo_atraso) t += ` Motivo do atraso: ${o.motivo_atraso}.`;
  const ult = (o.historico ?? []).at(-1);
  if (ult) t += ` Último registro (${f.data(ult.data)}): ${ult.evento}.`;
  const fontes = [`op:${o.id}`];
  if (o.pedido && ligado(ctx, "comercial")) {
    const pv = by(d.pedidos, "id", o.pedido);
    const cli = pv && by(d.clientes, "id", pv.cliente);
    t += ` Atende o pedido ${o.pedido}${cli ? ` (${cli.nome})` : ""}.`;
    fontes.push(`pedido:${o.pedido}`);
  }
  return { texto: t, fontes };
}

function descrevePedido(ctx, pv) {
  const d = ctx.data;
  const cli = by(d.clientes, "id", pv.cliente);
  const total = (pv.itens ?? []).reduce((s, i) => s + (i.quantidade ?? 0) * (i.preco_unit ?? 0), 0);
  const itens = (pv.itens ?? []).slice(0, 4)
    .map((i) => `${f.num(i.quantidade)} × ${by(d.produtos, "sku", i.sku)?.nome ?? i.sku}`).join("; ");
  let t = `${pv.id}${cli ? ` — ${cli.nome}` : ""}: ${statusLabel(pv.status)}, previsão de entrega ${f.data(pv.previsao_entrega)}, ` +
    `${f.money(total)} (${itens}).`;
  const fontes = [`pedido:${pv.id}`];
  if (pv.ordem && ligado(ctx, "producao")) {
    const o = by(d.ordens, "id", pv.ordem);
    if (o) {
      t += ` ${term(ctx, "ordem")} ${o.id}: ${statusLabel(o.status)}, ${f.pct(o.progresso)}, prazo ${f.data(o.prazo)}` +
        `${o.motivo_atraso ? ` — ${o.motivo_atraso}` : ""}.`;
      fontes.push(`op:${o.id}`);
    }
  }
  if (pv.observacao) t += ` Obs.: ${pv.observacao}`;
  if (cli) fontes.push(`cliente:${cli.id}`);
  return { texto: t, fontes };
}

function descreveNC(ctx, n) {
  const t = `${n.id} (${f.data(n.data)}, origem ${n.origem}, severidade ${n.severidade}): ${statusLabel(n.status)}. ` +
    `${corta(n.descricao, 180)} Causa: ${corta(n.causa, 140)} Ação: ${corta(n.acao, 140)} Responsável: ${n.responsavel}.`;
  return { texto: t, fontes: [`nc:${n.id}`] };
}

function descreveOS(ctx, os) {
  const m = by(ctx.data.maquinas, "id", os.maquina);
  let t = `${os.id} — ${os.tipo} em ${m ? `${m.nome} (${m.id})` : os.maquina}, ${f.data(os.data)}: ${statusLabel(os.status)}, ` +
    `técnico ${os.tecnico}${os.duracao_h ? `, ${f.num(os.duracao_h)} h` : ""}. ${corta(os.descricao, 180)}`;
  if (os.pecas?.length) t += ` Peças: ${os.pecas.join(", ")}.`;
  const fontes = [`os:${os.id}`];
  if (os.procedimento) {
    const doc = by(ctx.data.documentos, "id", os.procedimento);
    if (doc && docLigado(ctx, doc)) { t += ` Procedimento: ${doc.titulo}.`; fontes.push(`doc:${doc.id}`); }
  }
  return { texto: t, fontes };
}

function descreveMaquina(ctx, m) {
  const d = ctx.data;
  let t = `${m.nome} (${m.id}): ${statusLabel(m.status)}, horímetro ${f.num(m.horimetro)} h, MTBF ${f.num(m.mtbf_h)} h, ` +
    `próxima preventiva ${f.data(m.proxima_preventiva)}.`;
  const fontes = [`maq:${m.id}`];
  const abertas = (d.manutencao ?? []).filter((o) => o.maquina === m.id && o.status !== "concluida");
  if (abertas.length) {
    t += ` OS em aberto: ${abertas.map((o) => `${o.id} (${corta(o.descricao, 60)})`).join("; ")}.`;
    fontes.push(...abertas.map((o) => `os:${o.id}`));
  }
  const ult = (d.manutencao ?? []).filter((o) => o.maquina === m.id).sort((a, b) => (b.data > a.data ? 1 : -1))[0];
  if (ult && !abertas.includes(ult)) { t += ` Última OS: ${ult.id} em ${f.data(ult.data)} — ${corta(ult.descricao, 80)}`; fontes.push(`os:${ult.id}`); }
  if (m.manual) fontes.push(`doc:${m.manual}`);
  return { texto: t, fontes };
}

function descreveProduto(ctx, p) {
  const d = ctx.data;
  const baixo = p.estoque < p.estoque_minimo;
  let t = `${p.nome} (${p.sku}): ${f.money(p.preco)} por ${p.unidade === "peças" ? "peça" : p.unidade}, ` +
    `estoque ${f.num(p.estoque)} ${p.unidade}${baixo ? ` — abaixo do mínimo de ${f.num(p.estoque_minimo)}` : ` (mínimo ${f.num(p.estoque_minimo)})`}, ` +
    `prazo padrão ${p.prazo_dias} dias.`;
  const fontes = [`sku:${p.sku}`];
  if (ligado(ctx, "producao")) {
    const ops = (d.ordens ?? []).filter((o) => o.sku === p.sku && o.status !== "concluida");
    if (ops.length) {
      t += ` ${term(ctx, "ordens")} em aberto: ${ops.slice(0, 3).map((o) => `${o.id} (${statusLabel(o.status)}, ${f.pct(o.progresso)}, prazo ${f.data(o.prazo)})`).join("; ")}.`;
      fontes.push(...ops.slice(0, 3).map((o) => `op:${o.id}`));
    }
  }
  return { texto: t, fontes };
}

function descreveCliente(ctx, c) {
  const d = ctx.data;
  const rep = by(d.representantes, "id", c.representante);
  let t = `${c.nome} (${c.id}), ${c.cidade}/${c.uf}, ${c.segmento}: condição ${c.condicao_pagamento}, limite ${f.money(c.limite_credito)}, ` +
    `${c.tabela_preco}, último pedido em ${f.data(c.ultimo_pedido)}${rep ? `, ${term(ctx, "representante")} ${rep.nome}` : ""}.`;
  const pvs = (d.pedidos ?? []).filter((p) => p.cliente === c.id && !["entregue", "faturado"].includes(p.status));
  if (pvs.length) t += ` Pedidos em aberto: ${pvs.slice(0, 3).map((p) => `${p.id} (${statusLabel(p.status)}, entrega ${f.data(p.previsao_entrega)})`).join("; ")}.`;
  return { texto: t, fontes: [`cliente:${c.id}`, ...pvs.slice(0, 3).map((p) => `pedido:${p.id}`)] };
}

function descreveRep(ctx, r) {
  const pct = r.meta_mes ? (r.realizado_mes / r.meta_mes) * 100 : null;
  return {
    texto: `${r.nome} (${r.id}), ${term(ctx, "representante")} de ${r.regiao}: realizou ${f.money(r.realizado_mes)} de ${f.money(r.meta_mes)} no mês (${f.pct(pct)}). Contato ${r.telefone}.`,
    fontes: [`rep:${r.id}`],
  };
}

function descreveKpi(ctx, k) {
  const ok = k.direcao === "menor_melhor" ? k.valor <= k.meta : k.valor >= k.meta;
  const ant = (k.tendencia ?? []).at(-2);
  let t = `${k.nome}: ${f.valor(k.valor, k.unidade)} (meta ${f.valor(k.meta, k.unidade)}, ${ok ? "dentro da meta" : "fora da meta"}` +
    `${ant != null ? `; mês anterior ${f.valor(ant, k.unidade)}` : ""}). ${k.explicacao ?? ""}`;
  if (k.caminho?.length) t += ` Caminho do dado: ${k.caminho.join(" → ")}.`;
  return { texto: t.trim(), fontes: [`kpi:${k.id}`, ...(k.fontes ?? [])] };
}

function descreveDoc(ctx, doc) {
  const tr = (doc.trechos ?? []).slice(0, 2);
  return {
    texto: `${doc.titulo} (${doc.id}, ${doc.origem}, atualizado em ${f.data(doc.atualizado)}): ` + tr.map((t) => `${t.secao}: ${corta(t.texto, 160)}`).join(" "),
    fontes: tr.length ? tr.map((t) => `doc:${doc.id}#${t.id}`) : [`doc:${doc.id}`],
  };
}

const descreveSaber = (ctx, s) => ({
  texto: `${s.titulo} — ${s.autor} (${s.funcao}, ${s.tempo_casa_anos} anos de casa): ${corta(s.dica, 300)} Validado por ${s.validado_por}.`,
  fontes: [`saber:${s.id}`],
});
const descreveRegra = (ctx, r) => ({ texto: `${r.titulo}: ${r.texto}`, fontes: [`regra:${r.id}`] });

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
  // documentos: docVisivel já confere módulo (cérebro ou área) e perfil
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
      const c = [...idx.keys()].filter((k) => k.endsWith("-" + t) || k.endsWith(t) && k.length > t.length && /[^0-9]/.test(k[k.length - t.length - 1]));
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

const temId = (s) => /\b[a-z]{1,5}-\d[\w-]*/i.test(s);

export function sugeridasLigadas(ctx) {
  return (ctx?.data?.perguntas_sugeridas ?? []).filter((p) => ligado(ctx, p.modulo));
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
    if (idsQ.some((id) => !norm(s.pergunta + " " + s.resposta).includes(id))) continue;
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
    partes.push(`${ops.length} ${ops.length === 1 ? term(ctx, "ordem") + " atrasada" : term(ctx, "ordens") + " atrasadas"}:\n` +
      ops.slice(0, 6).map((o) => {
        const p = by(d.produtos, "sku", o.sku);
        return `- ${o.id} (${p?.nome ?? o.sku}): ${f.pct(o.progresso)}, prazo ${f.data(o.prazo)}${o.motivo_atraso ? ` — ${o.motivo_atraso}` : ""}`;
      }).join("\n"));
    fontes.push(...ops.slice(0, 6).map((o) => `op:${o.id}`));
  };
  const blocoPvs = () => {
    if (!pvs.length) return;
    partes.push(`${pvs.length} pedido${pvs.length === 1 ? " atrasado" : "s atrasados"}:\n` +
      pvs.slice(0, 6).map((p) => `- ${p.id} (${by(d.clientes, "id", p.cliente)?.nome ?? p.cliente}): previsão ${f.data(p.previsao_entrega)}${p.ordem ? `, ${p.ordem}` : ""}`).join("\n"));
    fontes.push(...pvs.slice(0, 6).map((p) => `pedido:${p.id}`));
  };
  if (querPedido) { blocoPvs(); if (!pvs.length) blocoOps(); }
  else { blocoOps(); if (!ops.length || /pedido|entrega|cliente/.test(qn)) blocoPvs(); }
  if (!partes.length && (ligado(ctx, "producao") || ligado(ctx, "comercial"))) {
    return { texto: `Nenhum${querPedido ? " pedido" : "a " + term(ctx, "ordem")} com status de atraso nos dados de hoje (${f.data(hoje(ctx))}).`, fontes: [] };
  }
  return partes.length ? { texto: partes.join("\n\n"), fontes } : null;
}

function ncsAbertas(ctx) {
  if (!ligado(ctx, "qualidade")) return null;
  const ncs = (ctx.data.nao_conformidades ?? []).filter((n) => n.status !== "encerrada")
    .sort((a, b) => (SEV[a.severidade] ?? 3) - (SEV[b.severidade] ?? 3));
  if (!ncs.length) return { texto: "Não há não conformidades abertas nos dados de hoje.", fontes: [] };
  return {
    texto: `${ncs.length} não conformidade${ncs.length === 1 ? "" : "s"} em aberto:\n` +
      ncs.slice(0, 6).map((n) => `- ${n.id} (${n.severidade}, ${statusLabel(n.status)}): ${corta(n.descricao, 90)} — ${n.responsavel}`).join("\n"),
    fontes: ncs.slice(0, 6).map((n) => `nc:${n.id}`),
  };
}

function maquinasAlerta(ctx) {
  if (!ligado(ctx, "manutencao")) return null;
  const ms = (ctx.data.maquinas ?? []).filter((m) => m.status !== "operando");
  if (!ms.length) return { texto: `Todas as ${term(ctx, "maquinas")} estão operando agora.`, fontes: [] };
  const os = ctx.data.manutencao ?? [];
  return {
    texto: `${ms.length} ${term(ctx, ms.length === 1 ? "maquina" : "maquinas")} fora da operação normal:\n` +
      ms.slice(0, 6).map((m) => {
        const o = os.find((x) => x.maquina === m.id && x.status !== "concluida");
        return `- ${m.nome} (${m.id}): ${statusLabel(m.status)}${o ? ` — ${o.id}: ${corta(o.descricao, 80)}` : ""}`;
      }).join("\n"),
    fontes: ms.slice(0, 6).flatMap((m) => {
      const o = os.find((x) => x.maquina === m.id && x.status !== "concluida");
      return o ? [`maq:${m.id}`, `os:${o.id}`] : [`maq:${m.id}`];
    }),
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
        texto: `${baixos.length} ${term(ctx, baixos.length === 1 ? "produto" : "produtos")} abaixo do estoque mínimo:\n` +
          baixos.slice(0, 6).map((x) => `- ${x.nome} (${x.sku}): ${f.num(x.estoque)} de mínimo ${f.num(x.estoque_minimo)} ${x.unidade}`).join("\n"),
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
      return {
        texto: `${t.turno} turno de ${f.data(t.data)} — ${ln?.nome ?? t.linha}: ${f.num(t.produzido)} produzidas, refugo ${f.num(t.refugo)}, ` +
          `${f.num(t.paradas_min)} min de parada. ${t.resumo}${t.ocorrencias?.length ? ` Ocorrências: ${t.ocorrencias.join("; ")}.` : ""}`,
        fontes: [`turno:${t.data}|${t.turno}|${t.linha}`],
      };
    }
  }
  const palavraMaq = norm(term(ctx, "maquina"));
  if (/parad|maquina|equipamento|quebr|alerta|manutenc/.test(qn) || qn.includes(palavraMaq)) {
    const r = maquinasAlerta(ctx); if (r) return r;
  }
  if (/oee|indicador|kpi|metas?\b/.test(qn)) {
    const ks = d.kpis ?? [];
    if (ks.length) return {
      texto: "Indicadores de hoje:\n" + ks.slice(0, 8).map((x) => `- ${x.nome}: ${f.valor(x.valor, x.unidade)} (meta ${f.valor(x.meta, x.unidade)})`).join("\n"),
      fontes: ks.slice(0, 8).map((x) => `kpi:${x.id}`),
    };
  }
  return null;
}

/* ------------------------------------------------------------------ */
/* Resposta                                                            */
/* ------------------------------------------------------------------ */

/** → {texto, fontes, modo: "local"} */
export function responder(ctx, pergunta, { modulo, perfil } = {}) {
  const pronto = (texto, fontes) => ({ texto, fontes: filtraRefs(ctx, fontes), modo: "local" });
  const p = String(pergunta ?? "").trim();
  if (!p || !ctx?.data) return pronto("Escreva uma pergunta sobre a operação desta demo.", []);
  const areas = perfilAreas(ctx, perfil);

  // (a) pergunta sugerida (igual ou parecida)
  const s = casaSugerida(ctx, p, modulo);
  if (s) return pronto(s.resposta, s.fontes ?? []);

  // (b) ID de registro
  const regs = idsNaPergunta(ctx, p, areas);
  if (regs.length) return pronto(regs.map((r) => r.texto).join("\n\n"), regs.flatMap((r) => r.fontes));

  // (c) intenções simples e nomes de clientes/representantes
  const it = intencoes(ctx, p) ?? entidadePorNome(ctx, norm(p));
  if (it) return pronto(it.texto, it.fontes);

  // (d) busca em documentos, saberes, NCs e regras
  const achados = buscar(ctx, p, { perfil, limite: 3 }).filter((r, i, arr) => r.score >= Math.max(2, arr[0].score * 0.4));
  if (achados.length) {
    const linhas = achados.map((r) => `- ${r.titulo}: “${corta(r.trecho, 200)}”`);
    return pronto(`Encontrei isto em ${achados.length === 1 ? achados[0].titulo : "documentos da operação"}:\n${linhas.join("\n")}`, achados.map((r) => r.ref));
  }

  // (e) nada
  const sug = sugestoes(ctx, modulo, 3);
  return pronto(
    "Não encontrei isso nos dados desta demo." + (sug.length ? " Experimente perguntar:\n" + sug.map((x) => `- ${x}`).join("\n") : ""),
    []
  );
}
