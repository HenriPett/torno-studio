#!/usr/bin/env node
// Valida os pacotes de dados fictícios da demo (demo/data/<setor>.json) contra o esquema do PLANO §3.
// Uso: node demo/scripts/validate.mjs [setor…]   (sem argumentos: os 8 setores)
// Erros fazem o processo sair com código 1; avisos só são impressos.
import { readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DATA_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'data');
const SETORES = ['textil', 'alimentos', 'plasticos', 'maquinas', 'metalmecanica', 'moveis', 'eletroeletronicos', 'autopecas'];
const HOJE = '2026-11-13';

const VOCAB = ['ordem', 'ordens', 'produto', 'produtos', 'cliente', 'clientes', 'representante', 'representantes',
  'maquina', 'maquinas', 'linha', 'linhas', 'unidade', 'lote'];
const AREAS = ['producao', 'qualidade', 'manutencao', 'comercial', 'marketing', 'operadores', 'gestao'];
const MODULOS_PERGUNTAS = ['visao-geral', 'cerebro', 'producao', 'qualidade', 'manutencao', 'comercial', 'marketing', 'operadores', 'portal'];
const MODULOS = [...MODULOS_PERGUNTAS, 'integracoes', 'seguranca'];
const ENUM = {
  maquina_status: ['operando', 'alerta', 'parada', 'manutencao'],
  ordem_status: ['planejada', 'em_producao', 'atrasada', 'concluida'],
  nc_origem: ['interna', 'cliente', 'fornecedor'],
  severidade: ['baixa', 'media', 'alta'],
  nc_status: ['aberta', 'em_analise', 'encerrada'],
  os_tipo: ['corretiva', 'preventiva', 'preditiva'],
  os_status: ['aberta', 'em_execucao', 'concluida'],
  pedido_status: ['em_analise', 'aprovado', 'em_producao', 'faturado', 'entregue', 'atrasado'],
  direcao: ['maior_melhor', 'menor_melhor'],
  doc_tipo: ['procedimento', 'norma', 'manual', 'ficha_tecnica', 'contrato', 'catalogo', 'email', 'chamado', 'planilha', 'instrucao'],
  doc_origem: ['SharePoint', 'ERP', 'MES', 'E-mail', 'Pasta da qualidade', 'PLM', 'Planilha'],
  integ_status: ['conectado', 'sincronizando', 'erro', 'planejado'],
  wpp_de: ['representante', 'assistente'],
  mk_tipo: ['ficha_produto', 'conteudo_tecnico', 'resposta_cliente', 'post'],
  mk_status: ['rascunho', 'em_revisao', 'aprovado'],
};
// [coleção, mínimo, máximo (aviso)]
const QTD = {
  plantas: [2, 3], linhas: [4, 6], maquinas: [10, 14], produtos: [10, 14], ordens: [15, 20], turnos: [6, 8],
  nao_conformidades: [8, 10], manutencao: [8, 12], representantes: [5, 6], clientes: [10, 12], pedidos: [12, 15],
  regras_comerciais: [5, 6], kpis: [6, 8], documentos: [12, 16], saberes: [8, 10], integracoes: [6, 8],
  perfis_acesso: [5, 7], registro_uso: [8, 12], perguntas_sugeridas: [18, 30], conversa_whatsapp: [6, 8], marketing: [4, 6],
};

// ---------- utilitários ----------
const isStr = (v) => typeof v === 'string' && v.trim() !== '';
const isNum = (v) => typeof v === 'number' && Number.isFinite(v);
const isArr = Array.isArray;
const isObj = (v) => v !== null && typeof v === 'object' && !isArr(v);
function isDate(v) {
  if (typeof v !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(v)) return false;
  const d = new Date(v + 'T00:00:00Z');
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === v;
}
function isDateTime(v) {
  if (typeof v !== 'string') return false;
  const m = /^(\d{4}-\d{2}-\d{2})T(\d{2}):(\d{2})(:\d{2})?(Z|[+-]\d{2}:\d{2})?$/.exec(v);
  return !!m && isDate(m[1]) && +m[2] < 24 && +m[3] < 60;
}
const isHora = (v) => typeof v === 'string' && /^([01]\d|2[0-3]):[0-5]\d$/.test(v);

function validar(setor, d) {
  const erros = [];
  const avisos = [];
  const err = (m) => erros.push(m);
  const warn = (m) => avisos.push(m);

  // checa campos de um registro: spec = {campo: tipo} onde tipo ∈ str|num|date|datetime|arr|obj|bool|str?|num?|enum:<nome>|strarr|hora
  function campos(rotulo, obj, spec) {
    if (!isObj(obj)) { err(`${rotulo}: não é um objeto`); return; }
    for (const [k, t] of Object.entries(spec)) {
      const v = obj[k];
      const opt = t.endsWith('?');
      const tipo = opt ? t.slice(0, -1) : t;
      if (v === undefined || v === null) {
        if (!opt) err(`${rotulo}: campo obrigatório "${k}" ausente`);
        continue;
      }
      let ok = true;
      if (tipo === 'str') ok = isStr(v);
      else if (tipo === 'strvazia') ok = typeof v === 'string';
      else if (tipo === 'num') ok = isNum(v);
      else if (tipo === 'date') ok = isDate(v);
      else if (tipo === 'datetime') ok = isDateTime(v);
      else if (tipo === 'hora') ok = isHora(v);
      else if (tipo === 'arr') ok = isArr(v);
      else if (tipo === 'strarr') ok = isArr(v) && v.every(isStr);
      else if (tipo === 'obj') ok = isObj(v);
      else if (tipo.startsWith('enum:')) {
        const nome = tipo.slice(5);
        ok = ENUM[nome].includes(v);
        if (!ok) { err(`${rotulo}: "${k}" = ${JSON.stringify(v)} fora do enum (${ENUM[nome].join('|')})`); continue; }
      }
      if (!ok) err(`${rotulo}: campo "${k}" com tipo inválido (esperado ${tipo}, veio ${JSON.stringify(v)?.slice(0, 60)})`);
    }
  }
  function lista(nome) {
    const v = d[nome];
    if (!isArr(v)) { err(`coleção "${nome}" ausente ou não é lista`); return []; }
    const q = QTD[nome];
    if (q) {
      if (v.length < q[0]) err(`coleção "${nome}" tem ${v.length} itens (mínimo ${q[0]})`);
      else if (v.length > q[1]) warn(`coleção "${nome}" tem ${v.length} itens (alvo até ${q[1]})`);
    }
    return v;
  }
  function indice(nome, arr, chave = 'id') {
    const m = new Map();
    arr.forEach((x, i) => {
      const id = x?.[chave];
      if (!isStr(id)) return;
      if (m.has(id)) err(`${nome}: id duplicado "${id}"`);
      m.set(id, x);
    });
    return m;
  }
  const ref = (rotulo, campo, valor, mapa, alvo, opcional = false) => {
    if (valor === null || valor === undefined || valor === '') {
      if (!opcional) err(`${rotulo}: "${campo}" vazio`);
      return;
    }
    if (!mapa.has(valor)) err(`${rotulo}: "${campo}" = "${valor}" não existe em ${alvo}`);
  };

  // ---------- topo ----------
  if (d.id !== setor) err(`"id" = ${JSON.stringify(d.id)} deveria ser "${setor}"`);
  if (!isStr(d.setor)) err(`"setor" ausente`);
  if (!isDate(d.data_referencia)) err(`"data_referencia" inválida`);
  else if (d.data_referencia !== HOJE) warn(`"data_referencia" = ${d.data_referencia} (esperado ${HOJE})`);
  campos('empresa', d.empresa, { nome: 'str', cidade: 'str', uf: 'str', funcionarios: 'num', descricao: 'str' });

  if (!isObj(d.vocabulario)) err('"vocabulario" ausente');
  else {
    for (const k of VOCAB) if (!isStr(d.vocabulario[k])) err(`vocabulario: chave "${k}" ausente ou vazia`);
    for (const k of Object.keys(d.vocabulario)) if (!VOCAB.includes(k)) warn(`vocabulario: chave extra "${k}"`);
  }
  const areas = isArr(d.areas) ? d.areas : (err('"areas" ausente'), []);
  const areaIds = new Set(areas.map((a) => a?.id));
  for (const a of AREAS) if (!areaIds.has(a)) err(`areas: falta a área "${a}"`);
  areas.forEach((a, i) => {
    campos(`areas[${i}]`, a, { id: 'str', nome: 'str' });
    if (a?.id && !AREAS.includes(a.id)) err(`areas[${i}]: id "${a.id}" não é uma área fixa`);
  });
  if (areas.length !== new Set(areas.map((a) => a?.id)).size) err('areas: ids repetidos');

  // ---------- coleções ----------
  const plantas = lista('plantas');
  plantas.forEach((x, i) => campos(`plantas[${i}]`, x, { id: 'str', nome: 'str', cidade: 'str' }));
  const linhas = lista('linhas');
  linhas.forEach((x, i) => campos(`linhas[${i}] ${x?.id ?? ''}`, x, { id: 'str', nome: 'str', planta: 'str', tipo: 'str' }));
  const maquinas = lista('maquinas');
  maquinas.forEach((x, i) => campos(`maquinas[${i}] ${x?.id ?? ''}`, x, {
    id: 'str', nome: 'str', linha: 'str', tipo: 'str', fabricante: 'str', ano: 'num', status: 'enum:maquina_status',
    horimetro: 'num', mtbf_h: 'num', proxima_preventiva: 'date', manual: 'str',
  }));
  const produtos = lista('produtos');
  produtos.forEach((x, i) => {
    const r = `produtos[${i}] ${x?.sku ?? ''}`;
    campos(r, x, { sku: 'str', nome: 'str', familia: 'str', unidade: 'str', preco: 'num', prazo_dias: 'num',
      estoque: 'num', estoque_minimo: 'num', descricao_comercial: 'str', ficha: 'obj' });
    if (isObj(x?.ficha)) {
      campos(`${r}.ficha`, x.ficha, { atributos: 'obj', roteiro: 'strarr', especificacoes: 'arr' });
      (x.ficha.especificacoes || []).forEach((e, j) => campos(`${r}.ficha.especificacoes[${j}]`, e,
        { caracteristica: 'str', nominal: 'str', tolerancia: 'str', unidade: 'strvazia' }));
      if (isObj(x.ficha.atributos)) for (const [k, v] of Object.entries(x.ficha.atributos))
        if (typeof v !== 'string' && !isNum(v)) err(`${r}.ficha.atributos["${k}"] deve ser texto`);
    }
  });
  const ordens = lista('ordens');
  ordens.forEach((x, i) => {
    const r = `ordens[${i}] ${x?.id ?? ''}`;
    campos(r, x, { id: 'str', sku: 'str', quantidade: 'num', linha: 'str', inicio: 'date', prazo: 'date',
      status: 'enum:ordem_status', progresso: 'num', pedido: 'str?', motivo_atraso: 'str?', historico: 'arr' });
    if (isNum(x?.progresso) && (x.progresso < 0 || x.progresso > 100)) err(`${r}: progresso fora de 0-100`);
    (x?.historico || []).forEach((h, j) => campos(`${r}.historico[${j}]`, h, { data: 'date', evento: 'str' }));
    if (!('pedido' in (x || {}))) warn(`${r}: campo "pedido" ausente (use null)`);
    if (!('motivo_atraso' in (x || {}))) warn(`${r}: campo "motivo_atraso" ausente (use null)`);
  });
  const nAtrasadas = ordens.filter((o) => o?.status === 'atrasada').length;
  if (ordens.length && (nAtrasadas < 3 || nAtrasadas > 5)) (nAtrasadas < 1 ? err : warn)(`ordens: ${nAtrasadas} atrasadas (alvo 3-5)`);
  const turnos = lista('turnos');
  turnos.forEach((x, i) => campos(`turnos[${i}]`, x, { data: 'date', turno: 'str', linha: 'str', produzido: 'num',
    refugo: 'num', paradas_min: 'num', resumo: 'str', ocorrencias: 'strarr' }));
  const ncs = lista('nao_conformidades');
  ncs.forEach((x, i) => {
    const r = `nao_conformidades[${i}] ${x?.id ?? ''}`;
    campos(r, x, { id: 'str', data: 'date', sku: 'str', linha: 'str', origem: 'enum:nc_origem', severidade: 'enum:severidade',
      descricao: 'str', causa: 'str', acao: 'str', status: 'enum:nc_status', responsavel: 'str', oito_d: 'obj?' });
    if (isObj(x?.oito_d)) for (let k = 1; k <= 8; k++) if (!isStr(x.oito_d['D' + k])) err(`${r}.oito_d: falta "D${k}"`);
  });
  const n8d = ncs.filter((x) => isObj(x?.oito_d)).length;
  if (ncs.length && (n8d < 1 || n8d > 2)) (n8d < 1 ? err : warn)(`nao_conformidades: ${n8d} com 8D (alvo 1-2)`);
  const oss = lista('manutencao');
  oss.forEach((x, i) => campos(`manutencao[${i}] ${x?.id ?? ''}`, x, { id: 'str', maquina: 'str', tipo: 'enum:os_tipo', data: 'date',
    status: 'enum:os_status', tecnico: 'str', duracao_h: 'num', descricao: 'str', pecas: 'arr', procedimento: 'str?' }));
  const reps = lista('representantes');
  reps.forEach((x, i) => campos(`representantes[${i}] ${x?.id ?? ''}`, x, { id: 'str', nome: 'str', regiao: 'str', telefone: 'str',
    meta_mes: 'num', realizado_mes: 'num' }));
  reps.forEach((x, i) => { if (isStr(x?.telefone) && !x.telefone.includes('•')) warn(`representantes[${i}]: telefone não mascarado`); });
  const clientes = lista('clientes');
  clientes.forEach((x, i) => campos(`clientes[${i}] ${x?.id ?? ''}`, x, { id: 'str', nome: 'str', cidade: 'str', uf: 'str', segmento: 'str',
    representante: 'str', condicao_pagamento: 'str', limite_credito: 'num', tabela_preco: 'str', ultimo_pedido: 'date' }));
  const pedidos = lista('pedidos');
  pedidos.forEach((x, i) => {
    const r = `pedidos[${i}] ${x?.id ?? ''}`;
    campos(r, x, { id: 'str', cliente: 'str', representante: 'str', data: 'date', status: 'enum:pedido_status',
      previsao_entrega: 'date', ordem: 'str?', itens: 'arr', observacao: 'strvazia?' });
    if (isArr(x?.itens) && !x.itens.length) err(`${r}: sem itens`);
    (x?.itens || []).forEach((it, j) => campos(`${r}.itens[${j}]`, it, { sku: 'str', quantidade: 'num', preco_unit: 'num' }));
  });
  const regras = lista('regras_comerciais');
  regras.forEach((x, i) => campos(`regras_comerciais[${i}]`, x, { id: 'str', titulo: 'str', texto: 'str' }));
  const kpis = lista('kpis');
  kpis.forEach((x, i) => {
    const r = `kpis[${i}] ${x?.id ?? ''}`;
    campos(r, x, { id: 'str', nome: 'str', valor: 'num', unidade: 'strvazia', meta: 'num', direcao: 'enum:direcao', area: 'str',
      tendencia: 'arr', explicacao: 'str', caminho: 'strarr', fontes: 'arr' });
    if (isArr(x?.tendencia)) {
      if (x.tendencia.length !== 12) err(`${r}: tendencia com ${x.tendencia.length} valores (esperado 12)`);
      if (!x.tendencia.every(isNum)) err(`${r}: tendencia com valor não numérico`);
      else if (x.tendencia.at(-1) !== x.valor) err(`${r}: último valor da tendencia (${x.tendencia.at(-1)}) ≠ valor (${x.valor})`);
    }
    if (x?.area && !AREAS.includes(x.area)) err(`${r}: area "${x.area}" inválida`);
  });
  const docs = lista('documentos');
  docs.forEach((x, i) => {
    const r = `documentos[${i}] ${x?.id ?? ''}`;
    campos(r, x, { id: 'str', titulo: 'str', tipo: 'enum:doc_tipo', area: 'str', origem: 'enum:doc_origem', atualizado: 'date',
      acesso: 'strarr', trechos: 'arr' });
    if (x?.area && !AREAS.includes(x.area)) err(`${r}: area "${x.area}" inválida`);
    (x?.acesso || []).forEach((a) => { if (!AREAS.includes(a)) err(`${r}: acesso "${a}" não é área válida`); });
    if (isArr(x?.trechos)) {
      if (x.trechos.length < 2 || x.trechos.length > 4) warn(`${r}: ${x.trechos.length} trechos (alvo 2-4)`);
      if (!x.trechos.length) err(`${r}: sem trechos`);
      const ids = new Set();
      x.trechos.forEach((t, j) => {
        campos(`${r}.trechos[${j}]`, t, { id: 'str', secao: 'str', texto: 'str' });
        if (ids.has(t?.id)) err(`${r}: trecho "${t?.id}" duplicado`);
        ids.add(t?.id);
      });
    }
  });
  const saberes = lista('saberes');
  saberes.forEach((x, i) => {
    const r = `saberes[${i}] ${x?.id ?? ''}`;
    campos(r, x, { id: 'str', autor: 'str', funcao: 'str', tempo_casa_anos: 'num', area: 'str', maquina: 'str?', titulo: 'str',
      dica: 'str', validado_por: 'str', data: 'date', tags: 'strarr' });
    if (x?.area && !AREAS.includes(x.area)) err(`${r}: area "${x.area}" inválida`);
  });
  const integs = lista('integracoes');
  integs.forEach((x, i) => campos(`integracoes[${i}] ${x?.id ?? ''}`, x, { id: 'str', nome: 'str', tipo: 'str', status: 'enum:integ_status',
    ultima_sync: 'datetime?', registros: 'num', observacao: 'str' }));
  const perfis = lista('perfis_acesso');
  perfis.forEach((x, i) => {
    const r = `perfis_acesso[${i}] ${x?.id ?? ''}`;
    campos(r, x, { id: 'str', nome: 'str', areas: 'strarr', usuarios: 'num' });
    (x?.areas || []).forEach((a) => { if (!AREAS.includes(a)) err(`${r}: área "${a}" inválida`); });
  });
  if (perfis.length && !perfis.some((p) => AREAS.every((a) => p?.areas?.includes(a))))
    err('perfis_acesso: falta um perfil (Diretoria) com todas as áreas');
  const usos = lista('registro_uso');
  const perguntas = lista('perguntas_sugeridas');
  const wpp = lista('conversa_whatsapp');
  const mks = lista('marketing');

  // ---------- índices e ids únicos ----------
  const I = {
    planta: indice('plantas', plantas), linha: indice('linhas', linhas), maq: indice('maquinas', maquinas),
    sku: indice('produtos', produtos, 'sku'), op: indice('ordens', ordens), nc: indice('nao_conformidades', ncs),
    os: indice('manutencao', oss), rep: indice('representantes', reps), cliente: indice('clientes', clientes),
    pedido: indice('pedidos', pedidos), regra: indice('regras_comerciais', regras), kpi: indice('kpis', kpis),
    doc: indice('documentos', docs), saber: indice('saberes', saberes), integ: indice('integracoes', integs),
    perfil: indice('perfis_acesso', perfis), mk: indice('marketing', mks),
  };
  const turnoKeys = new Set();
  turnos.forEach((t) => {
    const k = `${t?.data}|${t?.turno}|${t?.linha}`;
    if (turnoKeys.has(k)) err(`turnos: chave duplicada "${k}"`);
    turnoKeys.add(k);
  });

  // ---------- referências cruzadas ----------
  linhas.forEach((x) => ref(`linha ${x?.id}`, 'planta', x?.planta, I.planta, 'plantas'));
  maquinas.forEach((x) => {
    ref(`maquina ${x?.id}`, 'linha', x?.linha, I.linha, 'linhas');
    ref(`maquina ${x?.id}`, 'manual', x?.manual, I.doc, 'documentos');
  });
  ordens.forEach((x) => {
    ref(`ordem ${x?.id}`, 'sku', x?.sku, I.sku, 'produtos');
    ref(`ordem ${x?.id}`, 'linha', x?.linha, I.linha, 'linhas');
    ref(`ordem ${x?.id}`, 'pedido', x?.pedido, I.pedido, 'pedidos', true);
  });
  turnos.forEach((x) => ref(`turno ${x?.data}|${x?.turno}`, 'linha', x?.linha, I.linha, 'linhas'));
  ncs.forEach((x) => {
    ref(`nc ${x?.id}`, 'sku', x?.sku, I.sku, 'produtos');
    ref(`nc ${x?.id}`, 'linha', x?.linha, I.linha, 'linhas');
  });
  oss.forEach((x) => {
    ref(`os ${x?.id}`, 'maquina', x?.maquina, I.maq, 'maquinas');
    ref(`os ${x?.id}`, 'procedimento', x?.procedimento, I.doc, 'documentos', true);
  });
  clientes.forEach((x) => ref(`cliente ${x?.id}`, 'representante', x?.representante, I.rep, 'representantes'));
  pedidos.forEach((x) => {
    ref(`pedido ${x?.id}`, 'cliente', x?.cliente, I.cliente, 'clientes');
    ref(`pedido ${x?.id}`, 'representante', x?.representante, I.rep, 'representantes');
    ref(`pedido ${x?.id}`, 'ordem', x?.ordem, I.op, 'ordens', true);
    (x?.itens || []).forEach((it) => ref(`pedido ${x?.id}`, 'itens.sku', it?.sku, I.sku, 'produtos'));
    const cli = I.cliente.get(x?.cliente);
    if (cli && cli.representante !== x.representante) warn(`pedido ${x.id}: representante ${x.representante} ≠ representante do cliente (${cli.representante})`);
  });
  saberes.forEach((x) => ref(`saber ${x?.id}`, 'maquina', x?.maquina, I.maq, 'maquinas', true));
  usos.forEach((x, i) => {
    campos(`registro_uso[${i}]`, x, { data: 'datetime', perfil: 'str', area: 'str', pergunta: 'str', fontes: 'arr' });
    ref(`registro_uso[${i}]`, 'perfil', x?.perfil, I.perfil, 'perfis_acesso');
    if (x?.area && !AREAS.includes(x.area)) err(`registro_uso[${i}]: area "${x.area}" inválida`);
  });
  mks.forEach((x) => {
    campos(`marketing ${x?.id}`, x, { id: 'str', tipo: 'enum:mk_tipo', titulo: 'str', texto: 'str', status: 'enum:mk_status', sku: 'str?', fontes: 'arr' });
    ref(`marketing ${x?.id}`, 'sku', x?.sku, I.sku, 'produtos', true);
  });
  if (!isObj(d.portal)) err('"portal" ausente');
  else {
    campos('portal', d.portal, { titulo: 'str', boas_vindas: 'str', destaques: 'strarr', avisos: 'arr' });
    (d.portal.destaques || []).forEach((s) => ref('portal', 'destaques', s, I.sku, 'produtos'));
    (d.portal.avisos || []).forEach((a, i) => campos(`portal.avisos[${i}]`, a, { titulo: 'str', texto: 'str' }));
  }

  // ---------- fontes (tipo:id) ----------
  const TIPOS = { op: I.op, pedido: I.pedido, sku: I.sku, nc: I.nc, os: I.os, maq: I.maq, kpi: I.kpi, saber: I.saber,
    cliente: I.cliente, rep: I.rep, regra: I.regra, integ: I.integ };
  function checaFonte(rotulo, f) {
    if (!isStr(f)) { err(`${rotulo}: fonte inválida ${JSON.stringify(f)}`); return; }
    const p = f.indexOf(':');
    if (p < 1) { err(`${rotulo}: fonte "${f}" sem "tipo:"`); return; }
    const tipo = f.slice(0, p);
    const id = f.slice(p + 1);
    if (tipo === 'doc') {
      const [docId, trecho] = id.split('#');
      const doc = I.doc.get(docId);
      if (!doc) { err(`${rotulo}: fonte "${f}" → documento "${docId}" não existe`); return; }
      if (trecho !== undefined && !(doc.trechos || []).some((t) => t?.id === trecho)) err(`${rotulo}: fonte "${f}" → trecho "${trecho}" não existe em ${docId}`);
    } else if (tipo === 'turno') {
      if (!turnoKeys.has(id)) err(`${rotulo}: fonte "${f}" → turno não existe (use data|turno|linha)`);
    } else if (TIPOS[tipo]) {
      if (!TIPOS[tipo].has(id)) err(`${rotulo}: fonte "${f}" não existe`);
    } else err(`${rotulo}: fonte "${f}" com tipo desconhecido "${tipo}"`);
  }
  const fontesDe = (rotulo, x) => {
    if (x?.fontes === undefined) return;
    if (!isArr(x.fontes)) { err(`${rotulo}: "fontes" deve ser lista`); return; }
    x.fontes.forEach((f) => checaFonte(rotulo, f));
  };
  kpis.forEach((x) => fontesDe(`kpi ${x?.id}`, x));
  usos.forEach((x, i) => fontesDe(`registro_uso[${i}]`, x));
  mks.forEach((x) => fontesDe(`marketing ${x?.id}`, x));
  wpp.forEach((x, i) => {
    campos(`conversa_whatsapp[${i}]`, x, { de: 'enum:wpp_de', hora: 'hora', texto: 'str', fontes: 'arr' });
    fontesDe(`conversa_whatsapp[${i}]`, x);
  });
  if (wpp.length && !wpp.some((m) => m?.de === 'assistente' && m.fontes?.length)) err('conversa_whatsapp: o assistente nunca cita fonte');
  perguntas.forEach((x, i) => {
    const r = `perguntas_sugeridas[${i}]`;
    campos(r, x, { modulo: 'str', pergunta: 'str', resposta: 'str', fontes: 'arr' });
    if (x?.modulo && !MODULOS.includes(x.modulo)) err(`${r}: modulo "${x.modulo}" inválido`);
    if (isArr(x?.fontes) && !x.fontes.length) warn(`${r}: sem fontes`);
    fontesDe(r, x);
  });
  for (const m of MODULOS_PERGUNTAS) {
    const n = perguntas.filter((p) => p?.modulo === m).length;
    if (n < 2) err(`perguntas_sugeridas: módulo "${m}" tem ${n} pergunta(s) (mínimo 2)`);
  }

  // ---------- coerência ----------
  ordens.forEach((o) => {
    if (o?.status === 'atrasada' && !(o.prazo <= HOJE) && !isStr(o.motivo_atraso))
      err(`ordem ${o.id}: "atrasada" com prazo ${o.prazo} futuro e sem motivo_atraso`);
    if (o?.status === 'concluida' && o.progresso !== 100) err(`ordem ${o.id}: concluida com progresso ${o.progresso}`);
    if (o?.status !== 'concluida' && o?.progresso === 100) warn(`ordem ${o.id}: progresso 100 mas status ${o.status}`);
    if (isDate(o?.inicio) && isDate(o?.prazo) && o.inicio > o.prazo) err(`ordem ${o.id}: inicio depois do prazo`);
  });
  pedidos.forEach((p) => {
    if (p?.status !== 'atrasado') return;
    const op = I.op.get(p.ordem);
    if (!(op && op.status === 'atrasada') && !isStr(p.observacao))
      err(`pedido ${p.id}: "atrasado" sem ordem atrasada nem motivo em "observacao"`);
  });
  const nPedAtras = pedidos.filter((p) => p?.status === 'atrasado').length;
  if (pedidos.length && !nPedAtras) warn('pedidos: nenhum pedido atrasado (a demo usa ao menos um)');
  if (produtos.length && !produtos.some((p) => p?.estoque < p?.estoque_minimo)) warn('produtos: nenhum estoque abaixo do mínimo');
  if (maquinas.length && !maquinas.some((m) => m?.status === 'alerta')) warn('maquinas: nenhuma em alerta');
  maquinas.filter((m) => m?.status === 'alerta').forEach((m) => {
    if (!oss.some((o) => o?.maquina === m.id && o.status !== 'concluida')) warn(`maquina ${m.id} em alerta sem OS aberta`);
  });
  docs.forEach((x) => { if (x?.acesso && !x.acesso.includes(x.area)) warn(`documento ${x.id}: acesso não inclui a própria área "${x.area}"`); });

  return { erros, avisos };
}

// ---------- execução ----------
const pedidosArg = process.argv.slice(2);
const alvo = pedidosArg.length ? pedidosArg : SETORES;
let totalErros = 0;
for (const setor of alvo) {
  if (!SETORES.includes(setor)) console.log(`! "${setor}" não está na lista de setores (${SETORES.join(', ')})`);
  const arq = join(DATA_DIR, `${setor}.json`);
  if (!existsSync(arq)) { console.log(`⚠ ${setor}: arquivo data/${setor}.json não existe (pulado)`); continue; }
  let d;
  try { d = JSON.parse(readFileSync(arq, 'utf8')); } catch (e) {
    console.log(`✗ ${setor}: JSON inválido — ${e.message}`); totalErros++; continue;
  }
  const { erros, avisos } = validar(setor, d);
  totalErros += erros.length;
  console.log(`${erros.length ? '✗' : '✓'} ${setor}: ${erros.length} erro(s), ${avisos.length} aviso(s)`);
  for (const e of erros) console.log(`   erro: ${e}`);
  for (const a of avisos) console.log(`   aviso: ${a}`);
}
process.exitCode = totalErros ? 1 : 0;
