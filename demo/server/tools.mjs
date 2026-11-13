// Ferramentas da IA no servidor: porte de demo/web/src/ai/tools.js (v1) + aprendizado.
// Cada uma lê só o pacote do setor da demo (ctx.data) e o aprendizado dela (ctx.aprendizado),
// devolve dados pequenos, sempre com `ref` para a IA citar. Só entram ferramentas de módulos
// ligados; com perfil, só o que as áreas dele podem ver. Toda busca inclui o aprendizado.

import { buscarTudo, buscaAprendizado, corta, ligado, perfilAreas, statusLabel, filtraRefs, norm, tokens, refOk } from "./motor.mjs";

const MAX = 8;
const str = (v) => (v == null ? "" : String(v).trim());
const igual = (a, b) => norm(a) === norm(b);
const contemTexto = (alvo, termo) => {
  const ts = tokens(termo);
  const n = norm(alvo);
  return ts.length > 0 && ts.every((t) => n.includes(t));
};

function lista(itens, extra = {}) {
  const out = { total: itens.length, itens: itens.slice(0, MAX), ...extra };
  if (itens.length > MAX) out.observacao = `Mostrando ${MAX} de ${itens.length}; refine o filtro.`;
  return out;
}

/** Remove campos de ligação para registros de módulos desligados. */
function limpa(ctx, obj, ligacoes) {
  for (const [campo, tipo] of Object.entries(ligacoes)) {
    if (obj[campo] && !refOk(ctx, `${tipo}:${obj[campo]}`)) delete obj[campo];
  }
  return obj;
}

const schema = (props, required) => ({ type: "object", properties: props, ...(required ? { required } : {}) });
const s = (description) => ({ type: "string", description });

/**
 * @param ctx  contexto da tela (PLANO §5.2)
 * @param opts {perfil, registrar}: perfil = id de data.perfis_acesso (ou {areas}); registrar(item) → item salvo
 * @returns [{name, description, inputSchema, execute, modulo}]
 */
export function buildTools(ctx, { perfil, registrar } = {}) {
  const d = ctx?.data ?? {};
  const areas = perfilAreas(ctx, perfil);
  const produto = (sku) => (d.produtos ?? []).find((p) => p.sku === sku);
  const cliente = (id) => (d.clientes ?? []).find((c) => c.id === id);
  const tools = [];
  const add = (modulos, t) => { if ([].concat(modulos).some((m) => ligado(ctx, m))) tools.push({ ...t, modulo: [].concat(modulos)[0] }); };
  const apr = (ctx?.aprendizado ?? []).filter((a) => !areas || !a.area || areas.includes(a.area));
  const fApr = (a) => ({
    ref: `aprendizado:${a.id}`, tipo: "registrado_nesta_demo", categoria: a.tipo, titulo: a.titulo, texto: corta(a.texto, 600),
    area: a.area, maquina: a.maquina ?? undefined, autor: a.autor, registrado_em: String(a.criado_em ?? "").slice(0, 10),
  });
  const fAprRef = (ref) => { const a = apr.find((x) => `aprendizado:${x.id}` === ref); return a ? fApr(a) : { ref }; };
  /** Itens do aprendizado que casam com o termo (mesma pontuação da busca) e/ou com a máquina. */
  const aprendizadoPara = (termo, maquina) => {
    let r = apr;
    if (maquina) r = r.filter((a) => a.maquina && (igual(a.maquina, maquina) || contemTexto(a.maquina, maquina) || contemTexto(`${a.titulo} ${a.texto}`, maquina)));
    if (termo) {
      const ids = new Set(buscaAprendizado(ctx, str(termo), { perfil, limite: 50 }).map((x) => x.ref));
      r = r.filter((a) => ids.has(`aprendizado:${a.id}`));
    }
    return (termo || maquina) ? r.slice(-MAX).reverse().map(fApr) : [];
  };

  tools.push({
    name: "buscar_aprendizado",
    modulo: "cerebro",
    description: "Busca no que as pessoas registraram NESTA demo (saberes, ocorrências, documentos e notas ensinados pelo visitante). Esse conteúdo vale como conhecimento da empresa e tem prioridade quando conflita com o resto. Sem termo, lista os registros mais recentes. Retorna {ref: 'aprendizado:<id>', titulo, texto, autor, area, maquina, registrado_em}.",
    inputSchema: schema({ termo: s("palavras-chave (opcional)") }),
    execute(input) {
      const termo = str(input?.termo);
      if (!termo) return lista(apr.slice(-MAX).reverse().map(fApr));
      const r = buscaAprendizado(ctx, termo, { perfil, limite: 50 });
      return lista(r.map((x) => fAprRef(x.ref)));
    },
  });

  if (typeof registrar === "function") tools.push({
    name: "registrar_aprendizado",
    modulo: "cerebro",
    description: "Registra um conhecimento novo no cérebro da empresa desta demo. Use SOMENTE quando o usuário pedir explicitamente para registrar, anotar, guardar, lembrar ou ensinar algo (ex.: 'anota que…', 'registra isso', 'lembra que…'). Nunca registre por iniciativa própria nem com dados que o usuário não disse. tipo: saber (dica prática), ocorrencia (fato/problema ocorrido), documento (procedimento/regra) ou nota. Retorna o item salvo com ref.",
    inputSchema: schema({
      tipo: { type: "string", enum: ["saber", "ocorrencia", "documento", "nota"], description: "categoria do registro" },
      titulo: s("título curto (até 120 caracteres)"),
      texto: s("o conteúdo, com as palavras do usuário (até 2000 caracteres)"),
      area: { type: "string", enum: ["producao", "qualidade", "manutencao", "comercial", "marketing", "operadores", "gestao"], description: "área da empresa" },
      maquina: s("opcional: id ou nome da máquina relacionada"),
    }, ["tipo", "titulo", "texto", "area"]),
    async execute(input) {
      const item = await registrar(input ?? {});
      apr.push(item);
      return { ok: true, item: fApr(item) };
    },
  });


  add("cerebro", {
    name: "buscar_documentos",
    description: "Busca por palavras nos documentos da empresa (procedimentos, normas, manuais, fichas, e-mails), saberes de operadores, não conformidades e regras comerciais. Retorna até 8 trechos {ref, titulo, trecho, area}. Use para perguntas de 'como fazer', norma ou procedimento.",
    inputSchema: schema({ consulta: s("palavras-chave em português"), area: s("opcional: producao, qualidade, manutencao, comercial, marketing, operadores ou gestao") }, ["consulta"]),
    execute(input) {
      let r = buscarTudo(ctx, str(input?.consulta), { perfil, limite: 16 });
      if (input?.area) r = r.filter((x) => x.area === str(input.area));
      return lista(r.map((x) => (x.aprendizado ? fAprRef(x.ref) : { ref: x.ref, titulo: x.titulo, trecho: x.trecho, area: x.area })));
    },
  });

  add("producao", {
    name: "consultar_ordens",
    description: `Consulta ${ctx?.term?.("ordens") ?? "ordens"} de produção. Filtre por id, status (planejada, em_producao, atrasada, concluida) ou sku. Retorna {ref, id, sku, produto, quantidade, linha, inicio, prazo, status, progresso, motivo_atraso, pedido, ultimo_evento}.`,
    inputSchema: schema({ id: s("ex.: OP-24518"), status: s("planejada | em_producao | atrasada | concluida"), sku: s("código do produto") }),
    execute(input) {
      let r = d.ordens ?? [];
      if (input?.id) r = r.filter((o) => igual(o.id, input.id));
      if (input?.status) r = r.filter((o) => igual(o.status, input.status));
      if (input?.sku) r = r.filter((o) => igual(o.sku, input.sku));
      return lista(r.map((o) => limpa(ctx, {
        ref: `op:${o.id}`, id: o.id, sku: o.sku, produto: produto(o.sku)?.nome, quantidade: o.quantidade,
        linha: (d.linhas ?? []).find((l) => l.id === o.linha)?.nome ?? o.linha, inicio: o.inicio, prazo: o.prazo,
        status: statusLabel(o.status), progresso: o.progresso, motivo_atraso: o.motivo_atraso ?? undefined,
        pedido: o.pedido, ultimo_evento: (o.historico ?? []).at(-1)?.evento,
      }, { pedido: "pedido" })));
    },
  });

  add("producao", {
    name: "resumo_turnos",
    description: "Resumo dos turnos de produção (produzido, refugo, minutos de parada, ocorrências). Filtre por data (AAAA-MM-DD) e/ou linha (id ou nome). Retorna {ref, data, turno, linha, produzido, refugo, paradas_min, resumo, ocorrencias}.",
    inputSchema: schema({ data: s("AAAA-MM-DD"), linha: s("id ou nome da linha") }),
    execute(input) {
      let r = [...(d.turnos ?? [])].sort((a, b) => (b.data + b.turno > a.data + a.turno ? 1 : -1));
      if (input?.data) r = r.filter((t) => t.data === str(input.data));
      if (input?.linha) {
        const l = (d.linhas ?? []).find((x) => igual(x.id, input.linha) || contemTexto(x.nome, input.linha));
        r = r.filter((t) => t.linha === (l?.id ?? str(input.linha)));
      }
      return lista(r.map((t) => ({
        ref: `turno:${t.data}|${t.turno}|${t.linha}`, data: t.data, turno: t.turno,
        linha: (d.linhas ?? []).find((l) => l.id === t.linha)?.nome ?? t.linha, produzido: t.produzido, refugo: t.refugo,
        paradas_min: t.paradas_min, resumo: corta(t.resumo, 300), ocorrencias: (t.ocorrencias ?? []).slice(0, 4),
      })));
    },
  });

  add("qualidade", {
    name: "consultar_ncs",
    description: "Consulta não conformidades (NCs). Filtre por id, sku, status (aberta, em_analise, encerrada) ou termo na descrição. Retorna {ref, id, data, sku, origem, severidade, status, descricao, causa, acao, responsavel, tem_8d}.",
    inputSchema: schema({ id: s("ex.: NC-2026-118"), sku: s("código do produto"), status: s("aberta | em_analise | encerrada"), termo: s("palavra na descrição") }),
    execute(input) {
      let r = d.nao_conformidades ?? [];
      if (input?.id) r = r.filter((n) => igual(n.id, input.id));
      if (input?.sku) r = r.filter((n) => igual(n.sku, input.sku));
      if (input?.status) r = r.filter((n) => igual(n.status, input.status));
      if (input?.termo) r = r.filter((n) => contemTexto(`${n.descricao} ${n.causa} ${n.acao}`, input.termo));
      return lista(r.map((n) => ({
        ref: `nc:${n.id}`, id: n.id, data: n.data, sku: n.sku, origem: n.origem, severidade: n.severidade,
        status: statusLabel(n.status), descricao: corta(n.descricao, 220), causa: corta(n.causa, 160),
        acao: corta(n.acao, 160), responsavel: n.responsavel, tem_8d: !!n.oito_d,
      })));
    },
  });

  add("manutencao", {
    name: "consultar_manutencao",
    description: "Consulta máquinas e ordens de serviço (OS) de manutenção. Com maquina (id ou nome) retorna o status da máquina e suas OS; com id retorna a OS; sem filtro retorna máquinas fora de operação normal e OS abertas. Itens {ref, ...}.",
    inputSchema: schema({ maquina: s("id (ex.: TIN-03) ou nome da máquina"), id: s("id da OS, ex.: OS-7731") }),
    execute(input) {
      const os = d.manutencao ?? [], maqs = d.maquinas ?? [];
      const fOS = (o) => limpa(ctx, {
        ref: `os:${o.id}`, id: o.id, maquina: o.maquina, tipo: o.tipo, data: o.data, status: statusLabel(o.status),
        tecnico: o.tecnico, duracao_h: o.duracao_h, descricao: corta(o.descricao, 200), pecas: o.pecas, procedimento: o.procedimento,
      }, { procedimento: "doc" });
      const fM = (m) => limpa(ctx, {
        ref: `maq:${m.id}`, id: m.id, nome: m.nome, status: statusLabel(m.status), horimetro: m.horimetro, mtbf_h: m.mtbf_h,
        proxima_preventiva: m.proxima_preventiva, fabricante: m.fabricante, ano: m.ano, manual: m.manual,
      }, { manual: "doc" });
      if (input?.id) return lista(os.filter((o) => igual(o.id, input.id)).map(fOS));
      if (input?.maquina) {
        const m = maqs.find((x) => igual(x.id, input.maquina)) ?? maqs.find((x) => contemTexto(x.nome, input.maquina));
        if (!m) return lista([]);
        return lista([...aprendizadoPara(null, m.id), fM(m), ...os.filter((o) => o.maquina === m.id).sort((a, b) => (b.data > a.data ? 1 : -1)).map(fOS)]);
      }
      return lista([...maqs.filter((m) => m.status !== "operando").map(fM), ...os.filter((o) => o.status !== "concluida").map(fOS)]);
    },
  });

  add("comercial", {
    name: "consultar_pedidos",
    description: "Consulta pedidos de venda. Filtre por id, cliente (id ou nome) ou status (em_analise, aprovado, em_producao, faturado, entregue, atrasado). Retorna {ref, id, cliente, data, status, previsao_entrega, ordem, itens, total, observacao}.",
    inputSchema: schema({ id: s("ex.: PV-88213"), cliente: s("id (CLI-…) ou nome"), status: s("status do pedido") }),
    execute(input) {
      let r = d.pedidos ?? [];
      if (input?.id) r = r.filter((p) => igual(p.id, input.id));
      if (input?.cliente) r = r.filter((p) => igual(p.cliente, input.cliente) || contemTexto(cliente(p.cliente)?.nome ?? "", input.cliente));
      if (input?.status) r = r.filter((p) => igual(p.status, input.status));
      return lista(r.map((p) => limpa(ctx, {
        ref: `pedido:${p.id}`, id: p.id, cliente: cliente(p.cliente)?.nome ?? p.cliente, data: p.data, status: statusLabel(p.status),
        previsao_entrega: p.previsao_entrega, ordem: p.ordem,
        itens: (p.itens ?? []).slice(0, 5).map((i) => ({ sku: i.sku, produto: produto(i.sku)?.nome, quantidade: i.quantidade, preco_unit: i.preco_unit })),
        total: Math.round((p.itens ?? []).reduce((s2, i) => s2 + i.quantidade * i.preco_unit, 0) * 100) / 100,
        observacao: corta(p.observacao, 160) || undefined,
      }, { ordem: "op" })));
    },
  });

  add(["comercial", "portal"], {
    name: "consultar_estoque_preco",
    description: "Consulta produtos: preço (R$), estoque atual e mínimo, prazo padrão de entrega em dias. Filtre por sku ou termo no nome. Retorna {ref, sku, nome, familia, unidade, preco, estoque, estoque_minimo, abaixo_do_minimo, prazo_dias}.",
    inputSchema: schema({ sku: s("código do produto"), termo: s("parte do nome ou família") }),
    execute(input) {
      let r = d.produtos ?? [];
      if (input?.sku) r = r.filter((p) => igual(p.sku, input.sku));
      if (input?.termo) r = r.filter((p) => contemTexto(`${p.nome} ${p.familia} ${p.sku}`, input.termo));
      return lista(r.map((p) => ({
        ref: `sku:${p.sku}`, sku: p.sku, nome: p.nome, familia: p.familia, unidade: p.unidade, preco: p.preco,
        estoque: p.estoque, estoque_minimo: p.estoque_minimo, abaixo_do_minimo: p.estoque < p.estoque_minimo, prazo_dias: p.prazo_dias,
      })));
    },
  });

  add("comercial", {
    name: "consultar_clientes_representantes",
    description: "Consulta clientes (condição de pagamento, limite de crédito, tabela de preço, último pedido) e representantes (região, meta e realizado do mês). Filtre por id (CLI-… ou REP-…) ou termo no nome/cidade/região. Itens {ref, tipo, ...}.",
    inputSchema: schema({ id: s("CLI-… ou REP-…"), termo: s("nome, cidade ou região") }),
    execute(input) {
      const cs = (d.clientes ?? []).map((c) => ({
        ref: `cliente:${c.id}`, tipo: "cliente", id: c.id, nome: c.nome, cidade: `${c.cidade}/${c.uf}`, segmento: c.segmento,
        representante: c.representante, condicao_pagamento: c.condicao_pagamento, limite_credito: c.limite_credito,
        tabela_preco: c.tabela_preco, ultimo_pedido: c.ultimo_pedido,
      }));
      const rs = (d.representantes ?? []).map((r) => ({
        ref: `rep:${r.id}`, tipo: "representante", id: r.id, nome: r.nome, regiao: r.regiao, telefone: r.telefone,
        meta_mes: r.meta_mes, realizado_mes: r.realizado_mes,
      }));
      let r = [...cs, ...rs];
      if (input?.id) r = r.filter((x) => igual(x.id, input.id));
      if (input?.termo) r = r.filter((x) => contemTexto(`${x.nome} ${x.cidade ?? ""} ${x.regiao ?? ""} ${x.segmento ?? ""}`, input.termo));
      return lista(r);
    },
  });

  add("comercial", {
    name: "regras_comerciais",
    description: "Lista as regras comerciais aprovadas (descontos, alçadas, prazos, condições). Retorna {ref, id, titulo, texto}.",
    inputSchema: schema({}),
    execute() {
      return lista((d.regras_comerciais ?? []).map((r) => ({ ref: `regra:${r.id}`, id: r.id, titulo: r.titulo, texto: corta(r.texto, 300) })));
    },
  });

  add("visao-geral", {
    name: "consultar_kpis",
    description: "Indicadores (KPIs) da operação: valor atual, meta, direção, últimos meses, explicação do que mudou e caminho até o dado. Filtre por id; sem filtro lista todos. Retorna {ref, id, nome, valor, unidade, meta, direcao, ultimos_meses, explicacao, caminho, fontes}.",
    inputSchema: schema({ id: s("id do KPI, ex.: oee") }),
    execute(input) {
      let r = d.kpis ?? [];
      if (input?.id) r = r.filter((k) => igual(k.id, input.id) || contemTexto(k.nome, input.id));
      return lista(r.map((k) => ({
        ref: `kpi:${k.id}`, id: k.id, nome: k.nome, valor: k.valor, unidade: k.unidade, meta: k.meta, direcao: k.direcao,
        ultimos_meses: (k.tendencia ?? []).slice(-4), explicacao: corta(k.explicacao, 300), caminho: k.caminho,
        fontes: filtraRefs(ctx, k.fontes),
      })));
    },
  });

  add("operadores", {
    name: "buscar_saberes",
    description: "Saberes registrados por operadores experientes (dicas práticas validadas pelo supervisor). Filtre por termo e/ou máquina. Retorna {ref, id, titulo, autor, funcao, anos_de_casa, maquina, dica, validado_por}.",
    inputSchema: schema({ termo: s("palavra-chave"), maquina: s("id da máquina") }),
    execute(input) {
      let r = d.saberes ?? [];
      if (areas && !areas.includes("operadores")) r = [];
      if (input?.maquina) r = r.filter((x) => igual(x.maquina, input.maquina));
      if (input?.termo) {
        const ts = tokens(input.termo);
        r = r.filter((x) => { const n = norm(`${x.titulo} ${x.dica} ${(x.tags ?? []).join(" ")}`); return ts.some((t) => n.includes(t)); });
      }
      const saberes = r.map((x) => ({
        ref: `saber:${x.id}`, id: x.id, titulo: x.titulo, autor: x.autor, funcao: x.funcao, anos_de_casa: x.tempo_casa_anos,
        maquina: x.maquina, dica: corta(x.dica, 320), validado_por: x.validado_por,
      }));
      return lista([...aprendizadoPara(input?.termo, input?.maquina), ...saberes]);
    },
  });

  add("integracoes", {
    name: "status_integracoes",
    description: "Status das integrações com sistemas da empresa (ERP, MES, planilhas, e-mail, pastas, chamados). Retorna {ref, id, nome, tipo, status, ultima_sync, registros, observacao}.",
    inputSchema: schema({}),
    execute() {
      return lista((d.integracoes ?? []).map((i) => ({
        ref: `integ:${i.id}`, id: i.id, nome: i.nome, tipo: i.tipo, status: statusLabel(i.status), ultima_sync: i.ultima_sync,
        registros: i.registros, observacao: corta(i.observacao, 160),
      })));
    },
  });

  add("seguranca", {
    name: "perfis_e_registro_uso",
    description: "Perfis de acesso (quais áreas cada perfil vê, nº de usuários) e as últimas perguntas do registro de uso do assistente. Retorna {perfis, registro_uso}.",
    inputSchema: schema({}),
    execute() {
      return {
        perfis: (d.perfis_acesso ?? []).slice(0, MAX).map((p) => ({ id: p.id, nome: p.nome, areas: p.areas, usuarios: p.usuarios })),
        registro_uso: (d.registro_uso ?? []).slice(-MAX).map((u) => ({
          data: u.data, perfil: u.perfil, area: u.area, pergunta: corta(u.pergunta, 160), fontes: filtraRefs(ctx, u.fontes),
        })),
      };
    },
  });

  add("marketing", {
    name: "fichas_marketing",
    description: "Conteúdos de marketing (fichas de produto, conteúdos técnicos, respostas a clientes, posts) com status de aprovação e, com sku, a ficha técnica do produto (atributos e especificações). Retorna {ref, ...}.",
    inputSchema: schema({ sku: s("código do produto (opcional)") }),
    execute(input) {
      let mk = d.marketing ?? [];
      const sku = str(input?.sku);
      if (sku) mk = mk.filter((m) => igual(m.sku, sku));
      const itens = [];
      const p = sku ? produto(sku) ?? (d.produtos ?? []).find((x) => igual(x.sku, sku)) : null;
      if (p) itens.push({
        ref: `sku:${p.sku}`, tipo: "ficha_tecnica", sku: p.sku, nome: p.nome, descricao_comercial: corta(p.descricao_comercial, 300),
        atributos: p.ficha?.atributos, especificacoes: (p.ficha?.especificacoes ?? []).slice(0, 6),
      });
      for (const m of mk) {
        const fontes = filtraRefs(ctx, m.fontes);
        itens.push({ ref: fontes[0] ?? (m.sku ? `sku:${m.sku}` : null), id: m.id, tipo: m.tipo, titulo: m.titulo, status: statusLabel(m.status), sku: m.sku, texto: corta(m.texto, 320), fontes });
      }
      return lista(itens);
    },
  });

  return tools;
}

/** Junta os campos `ref` de um resultado de ferramenta (para citar quando a IA não cita). */
export function refsDoResultado(r, out = []) {
  if (!r || typeof r !== "object") return out;
  if (Array.isArray(r)) { for (const x of r) refsDoResultado(x, out); return out; }
  if (typeof r.ref === "string" && !out.includes(r.ref)) out.push(r.ref);
  for (const k of ["itens", "item"]) if (r[k]) refsDoResultado(r[k], out);
  return out;
}

/** Rótulo humano (evento `ferramenta`). */
export function rotulo(nome, ctx) {
  const t = (k, pad) => ctx?.term?.(k) ?? pad;
  return ({
    buscar_documentos: "Buscando nos documentos da empresa",
    consultar_ordens: `Consultando ${t("ordens", "ordens")} de produção`,
    resumo_turnos: "Lendo o resumo dos turnos",
    consultar_ncs: "Consultando não conformidades",
    consultar_manutencao: `Consultando ${t("maquinas", "máquinas")} e manutenção`,
    consultar_pedidos: "Consultando pedidos",
    consultar_estoque_preco: "Consultando estoque e preços",
    consultar_clientes_representantes: `Consultando ${t("clientes", "clientes")} e ${t("representantes", "representantes")}`,
    regras_comerciais: "Lendo as regras comerciais",
    consultar_kpis: "Consultando indicadores",
    buscar_saberes: "Buscando o saber dos operadores",
    status_integracoes: "Verificando as integrações",
    perfis_e_registro_uso: "Consultando perfis de acesso",
    fichas_marketing: "Consultando conteúdos de marketing",
    buscar_aprendizado: "Buscando no que foi registrado nesta demo",
    registrar_aprendizado: "Registrando no cérebro da empresa",
  })[nome] ?? "Consultando os dados";
}

/** Definições no formato da API da Anthropic (ordem estável, para o cache de prompt). */
export function paraApi(tools) {
  return tools.map((t) => ({ name: t.name, description: t.description, input_schema: t.inputSchema, eager_input_streaming: true }));
}

/** Valida/coage a entrada contra o schema (só propriedades declaradas; strings curtas). → {ok, input|erro} */
export function validaEntrada(tool, input) {
  if (input == null) input = {};
  if (typeof input !== "object" || Array.isArray(input)) return { ok: false, erro: "entrada deve ser um objeto" };
  const props = tool.inputSchema?.properties ?? {};
  const out = {};
  for (const [k, def] of Object.entries(props)) {
    let v = input[k];
    if (v == null || v === "") continue;
    if (typeof v === "number" || typeof v === "boolean") v = String(v);
    if (typeof v !== "string") return { ok: false, erro: `${k} deve ser texto` };
    if (v.length > 4000) return { ok: false, erro: `${k} muito longo` };
    if (def.enum && !def.enum.includes(v)) return { ok: false, erro: `${k} deve ser um de: ${def.enum.join(", ")}` };
    out[k] = v;
  }
  for (const k of tool.inputSchema?.required ?? []) if (!(k in out)) return { ok: false, erro: `falta ${k}` };
  return { ok: true, input: out };
}
