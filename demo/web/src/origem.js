// De onde vem cada dado, a partir de `integracoes` do pacote do setor (nada inventado: se não der para
// mapear um registro a uma integração do pacote, a função devolve null e a tela omite a linha).
//   sistemasDoPacote(data)       → [{art, nome}] para frases ("o ERP, o MES, os documentos e o WhatsApp")
//   listaSistemas(itens, prep)   → "o ERP, o MES e os documentos" | "do ERP, do MES e dos documentos"
//   origemDoRef(data, ref)       → {integ, sistema, nome, quando, quandoLongo, sync, atualizado, nota, erro…} | null
//                                  (ref "tipo:id" ou resolvido). Regra única: cartão de fonte, minicartões
//                                  das gavetas, rodapé "Origem: …" da gaveta e Início.
//   sistemaDoRef(data, ref)      → rótulo curto da origem, com o rótulo do tipo quando não há sistema
//   origemKpi(data, kpi)         → {integ, sistema, quando, quandoLongo}, pelo 1º passo de kpi.caminho ("MES › …")
//   rotuloSistema(integ)         → "ERP", "MES", "Chamados", "WhatsApp"…
import { normalize } from './format.js';

const ACRONIMO = /^[A-Z]{2,5}$/;

/** Integração que de fato alimenta a demo (planejada ou sem sincronização não conta). */
const ativa = (i) => i && i.status !== 'planejado' && !!i.ultima_sync;
const integracoes = (data) => (Array.isArray(data?.integracoes) ? data.integracoes.filter(ativa) : []);

/** Nome sem o "(ex.: …)" nem parênteses finais. */
function nomeSemParenteses(nome) {
  return String(nome || '').replace(/\s*\([^)]*\)\s*/g, ' ').replace(/\s+/g, ' ').trim();
}

/** Rótulo curto do sistema para microlinhas: "ERP", "MES", "WhatsApp", "SharePoint", "Chamados"… */
export function rotuloSistema(integ) {
  if (!integ) return '';
  const tipo = String(integ.tipo || '').trim();
  if (ACRONIMO.test(tipo)) return tipo;
  if (/whatsapp/i.test(integ.nome || '')) return 'WhatsApp';
  if (normalize(tipo) === 'documentos' && /sharepoint/i.test(integ.nome || '')) return 'SharePoint';
  const nome = nomeSemParenteses(integ.nome);
  return nome && nome.length <= 24 ? nome : tipo || nome;
}

/** "07:40" se for no dia de referência; senão "12/11, 18:00". */
function quandoCurto(iso, hoje) {
  const m = /^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}))?/.exec(String(iso || ''));
  if (!m) return '';
  const dia = `${m[1]}-${m[2]}-${m[3]}`;
  const hora = m[4] ? `${m[4]}:${m[5]}` : '';
  if (hoje && dia === hoje && hora) return hora;
  return hora ? `${m[3]}/${m[2]}, ${hora}` : `${m[3]}/${m[2]}`;
}
/** "13/11, 07:40" (sempre com a data, para o rodapé da gaveta). */
function quandoLongo(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}))?/.exec(String(iso || ''));
  if (!m) return '';
  return m[4] ? `${m[3]}/${m[2]}, ${m[4]}:${m[5]}` : `${m[3]}/${m[2]}`;
}

function resultado(data, integ) {
  if (!integ) return null;
  return {
    integ,
    sistema: rotuloSistema(integ),
    quando: quandoCurto(integ.ultima_sync, data?.data_referencia),
    quandoLongo: quandoLongo(integ.ultima_sync),
  };
}

// ---------------------------------------------------------------------------
// Registro → integração, pelo que a própria integração diz que traz (campo `observacao`).

const REGRA_TIPO = {
  op: (o) => /\bOPs?\b/.test(o),
  pedido: (o, n) => /\bpedidos?\b|\bcarteira\b/.test(n),
  // cadastro de cliente: só o ERP (e-mail e PLM citam "clientes" em outro sentido)
  cliente: (o, n, i) => i.tipo === 'ERP' && /\bclientes?\b|\bcarteira\b|\bpedidos?\b/.test(n),
  sku: (o, n) => /\bestoques?\b/.test(n),
  turno: (o, n) => /\bturnos?\b/.test(n),
  maq: (o, n) => /\bparadas?\b/.test(n),
  os: (o, n) => /\bOS\b/.test(o) || /manutenc/.test(n),
  nc: (o, n) => /\b8D\b|\bNCs?\b/.test(o) || /nao conformidad/.test(n),
};

function porObservacao(data, tipo) {
  const regra = REGRA_TIPO[tipo];
  if (!regra) return null;
  return integracoes(data).find((i) => {
    const o = String(i.observacao || '');
    return regra(o, normalize(o), i);
  }) || null;
}

/** Documento: `doc.origem` ("SharePoint", "ERP", "Pasta da qualidade") casado com nome/tipo da integração. */
function porOrigemDoc(data, origem) {
  const alvo = normalize(origem);
  if (!alvo) return null;
  const lista = integracoes(data);
  return lista.find((i) => normalize(i.tipo) === alvo)
    || lista.find((i) => normalize(i.nome).includes(alvo))
    || null;
}

const PALAVRA_GENERICA = new Set(['sistema', 'software', 'pasta', 'dados', 'planilha', 'planilhas']);
const escapa = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Primeiro passo de kpi.caminho ("MES › apontamentos…", "Sistema de chamados › …") → integração. */
function porCaminho(data, passo) {
  const prefixo = String(passo || '').split('›')[0].trim();
  if (!prefixo) return null;
  const pn = normalize(prefixo);
  const lista = integracoes(data);
  // 1. sigla do tipo citada no passo ("ERP", "MES", "LIMS", "EDI")
  let achou = lista.find((i) => ACRONIMO.test(i.tipo || '') && new RegExp(`\\b${escapa(i.tipo)}\\b`).test(prefixo));
  // 2. tipo por extenso ("Sistema de chamados" → Chamados; "Planilha de troca de cor" → Planilhas)
  achou ||= lista.find((i) => {
    const t = normalize(i.tipo).replace(/s$/, '');
    return t.length >= 4 && !ACRONIMO.test(i.tipo || '') && new RegExp(`(^|[^\\p{L}])${escapa(t)}s?(?![\\p{L}])`, 'u').test(pn);
  });
  // 3. primeira palavra do nome ("WhatsApp Business", "Otimizador de corte", "Portal …")
  const primeira = pn.split(/\s+/)[0];
  if (!achou && primeira && !PALAVRA_GENERICA.has(primeira)) {
    achou = lista.find((i) => normalize(nomeSemParenteses(i.nome)).split(/\s+/)[0] === primeira);
  }
  // 4. o passo inteiro aparece no nome ("Pasta da qualidade" em "SharePoint / pasta da qualidade")
  achou ||= lista.find((i) => pn.length >= 8 && normalize(i.nome).includes(pn));
  return achou || null;
}

/*
 * Quando nenhuma integração ativa diz que traz o registro: a integração do tipo certo, mesmo planejada
 * (ex.: planilha de manutenção para OS). Se ela ainda não está conectada, vale o que ela própria diz
 * sobre onde o dado está hoje ("estão no ERP e em planilha"). Sem nada disso, um rótulo de área.
 */
const REGRAS_TIPO_INTEG = {
  op: [{ tipo: /^MES$/ }, { tipo: /^ERP$/ }],
  turno: [{ tipo: /^MES$/ }, { tipo: /^Planilhas?$/, obs: /turno|parada/i }],
  pedido: [{ tipo: /^ERP$/ }],
  sku: [{ tipo: /^ERP$/ }],
  cliente: [{ tipo: /^ERP$/ }],
  rep: [{ tipo: /^ERP$/ }],
  regra: [{ tipo: /^ERP$/ }],
  nc: [{ tipo: /^Qualidade$/ }],
  os: [{ tipo: /^Manuten/ }, { tipo: /^Planilhas?$/, obs: /manuten|preventiva/i }],
  maq: [{ tipo: /^Manuten/ }, { tipo: /^Planilhas?$/, obs: /manuten|preventiva/i }],
};
const SEM_INTEGRACAO = { nc: 'registros da qualidade', os: 'registros da manutenção', maq: 'registros da manutenção' };
const SISTEMAS_CITADOS = [[/\bERP\b/, 'ERP'], [/\bMES\b/, 'MES'], [/planilhas?\b/i, 'planilha'], [/e-?mail/i, 'e-mail'], [/sharepoint/i, 'SharePoint'], [/\bpapel\b/i, 'papel']];
const STATUS_INTEG = { planejado: 'prevista', conectado: 'conectada', sincronizando: 'sincronizando', erro: 'com erro' };

/** Rótulo do tipo, para quando não há sistema a citar (cartão e minicartão). */
const ROTULO_TIPO = {
  doc: 'Documento', nc: 'Qualidade', os: 'Manutenção', maq: 'Manutenção', saber: 'Saber de operador',
  kpi: 'Indicador', integ: 'Integrações', aprendizado: 'Registro da equipe',
};

/** Registro de uma integração ativa → origem completa. */
function deIntegracao(data, integ) {
  const r = resultado(data, integ);
  return r && { ...r, nome: nomeSemParenteses(integ.nome) || r.sistema, sync: integ.ultima_sync ?? null, erro: integ.status === 'erro' };
}

const tipoDe = (ref) => (typeof ref === 'string' ? ref.split(':')[0] : ref?.tipo);
const idDe = (ref) => (typeof ref === 'string' ? ref.slice(ref.indexOf(':') + 1).split('#')[0] : ref?.id);
function detalheDe(data, ref, chave, campo = 'id') {
  if (typeof ref === 'object' && ref?.detalhe) return ref.detalhe;
  const id = idDe(ref);
  return (data?.[chave] || []).find((x) => x && x[campo] === id) || null;
}

/**
 * Origem de um registro: a ÚNICA regra da demo, usada pelo cartão de fonte, pelos minicartões das
 * gavetas, pelo rodapé "Origem: …" da gaveta e pelo Início. `ref`: "tipo:id" ou o objeto de resolveRef.
 * → {integ, sistema, nome, quando, quandoLongo, sync, atualizado, nota, erro, autor, criado_em} | null
 *   sistema: rótulo curto ("ERP", "Pasta da qualidade"; '' quando não há sistema, ex. saber de operador)
 *   nome: texto para o rodapé quando não há sistema ("relato de Ana, operadora", "registros da qualidade")
 *   sync: última sincronização da integração · atualizado: data do próprio registro (documento)
 *   nota: integração ainda não conectada · autor/criado_em: registro ensinado nesta demonstração
 */
export function origemDoRef(data, ref) {
  try {
    const tipo = tipoDe(ref);
    switch (tipo) {
      case 'aprendizado': {
        const item = detalheDe(data, ref, 'aprendizado');
        return { integ: null, sistema: '', nome: 'registro da equipe', autor: item?.autor || 'Você', criado_em: item?.criado_em ?? null };
      }
      case 'saber': {
        const s = detalheDe(data, ref, 'saberes');
        const nome = [s?.autor ? `relato de ${s.autor}` : 'relato de operador', s?.funcao].filter(Boolean).join(', ');
        return { integ: null, sistema: '', nome };
      }
      case 'integ': {
        const i = detalheDe(data, ref, 'integracoes');
        return { integ: null, sistema: '', nome: 'painel de integrações', sync: i?.ultima_sync ?? null };
      }
      case 'kpi': {
        const kpi = detalheDe(data, ref, 'kpis');
        const o = origemKpi(data, kpi);
        if (o) return { ...o, nome: nomeSemParenteses(o.integ.nome) || o.sistema, sync: o.integ.ultima_sync ?? null, erro: o.integ.status === 'erro' };
        const passos = [...new Set((kpi?.caminho ?? []).map((c) => String(c).split('›')[0].trim()).filter((c) => c && !/^c[aá]lculo/i.test(c)))];
        return passos.length ? { integ: null, sistema: passos[0], nome: passos.join(', ') } : null;
      }
      case 'doc': {
        const det = typeof ref === 'object' ? ref?.detalhe : null;
        const doc = det?.doc || (data?.documentos || []).find((d) => d.id === idDe(ref));
        if (!doc?.origem) return null;
        // o documento diz de onde vem ("Pasta da qualidade"); a integração só completa o horário
        const integ = porOrigemDoc(data, doc.origem);
        const base = resultado(data, integ) || { integ: null, quando: '', quandoLongo: '' };
        return { ...base, sistema: doc.origem, nome: doc.origem, atualizado: doc.atualizado ?? null };
      }
      default: break;
    }
    const ativa1 = porObservacao(data, tipo);
    if (ativa1) return deIntegracao(data, ativa1);
    const todas = Array.isArray(data?.integracoes) ? data.integracoes : [];
    for (const regra of REGRAS_TIPO_INTEG[tipo] ?? []) {
      const i = todas.find((x) => regra.tipo.test(x.tipo ?? '') && (!regra.obs || regra.obs.test(x.observacao ?? '')));
      if (!i) continue;
      if (ativa(i)) return deIntegracao(data, i);
      // integração ainda não conectada: o dado vem de onde ela própria diz que ele está hoje
      const citados = SISTEMAS_CITADOS.filter(([re]) => re.test(i.observacao ?? '')).map(([, n]) => n);
      if (citados.length) {
        const st = STATUS_INTEG[i.status] ?? String(i.status ?? '').replace(/_/g, ' ');
        return { integ: null, sistema: citados.join(' / '), nome: citados.join(' / '), quando: '', quandoLongo: '', nota: `${nomeSemParenteses(i.nome)}: integração ${st}` };
      }
    }
    const area = SEM_INTEGRACAO[tipo];
    return area ? { integ: null, sistema: '', nome: area } : null;
  } catch {
    return null;
  }
}

/** Rótulo curto da origem para cartões ("ERP", "Pasta da qualidade"; sem sistema, o rótulo do tipo). */
export function sistemaDoRef(data, ref) {
  const o = origemDoRef(data, ref);
  return o?.sistema || ROTULO_TIPO[tipoDe(ref)] || '';
}

/** Origem de um indicador pelo primeiro passo do caminho até o dado. */
export function origemKpi(data, kpi) {
  if (!kpi || !Array.isArray(kpi.caminho) || !kpi.caminho.length) return null;
  return resultado(data, porCaminho(data, kpi.caminho[0]));
}

// ---------------------------------------------------------------------------
// Sistemas citados em frases (boas-vindas e Início)

/**
 * Sistemas conectados do pacote, na ordem ERP, MES, documentos, WhatsApp, para frases.
 * `{canais: false}` deixa o WhatsApp de fora (ele é canal de pergunta, não fonte de número).
 * → [{art: 'o'|'os'|'as', nome}]
 */
export function sistemasDoPacote(data, { canais = true } = {}) {
  const lista = integracoes(data);
  const tem = (fn) => lista.some(fn);
  const out = [];
  if (tem((i) => i.tipo === 'ERP')) out.push({ art: 'o', nome: 'ERP' });
  if (tem((i) => i.tipo === 'MES')) out.push({ art: 'o', nome: 'MES' });
  const temDocs = (data?.documentos || []).length > 0
    || tem((i) => ['documentos', 'plm'].includes(normalize(i.tipo)));
  if (temDocs) out.push({ art: 'os', nome: 'documentos' });
  if (canais && tem((i) => /whatsapp/i.test(i.nome || ''))) out.push({ art: 'o', nome: 'WhatsApp' });
  return out;
}

/** "o ERP, o MES e os documentos" (prep '') ou "do ERP, do MES e dos documentos" (prep 'de'). */
export function listaSistemas(itens, prep = '') {
  const parte = ({ art, nome }) => `${prep === 'de' ? `d${art}` : art} ${nome}`;
  const p = (itens || []).map(parte);
  if (p.length <= 1) return p.join('');
  return `${p.slice(0, -1).join(', ')} e ${p.at(-1)}`;
}
