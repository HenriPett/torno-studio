// De onde vem cada dado, a partir de `integracoes` do pacote do setor (nada inventado: se não der para
// mapear um registro a uma integração do pacote, a função devolve null e a tela omite a linha).
//   sistemasDoPacote(data)       → [{art, nome}] para frases ("o ERP, o MES, os documentos e o WhatsApp")
//   listaSistemas(itens, prep)   → "o ERP, o MES e os documentos" | "do ERP, do MES e dos documentos"
//   origemDoRef(data, ref)       → {integ, sistema, quando, quandoLongo} | null  (ref "tipo:id" ou resolvido)
//   origemKpi(data, kpi)         → idem, pelo primeiro passo de kpi.caminho ("MES › …")
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

/**
 * Origem de um registro. `ref`: "tipo:id" ou o objeto de resolveRef ({tipo, detalhe}).
 * → {integ, sistema, quando, quandoLongo} | null
 */
export function origemDoRef(data, ref) {
  try {
    const tipo = typeof ref === 'string' ? ref.split(':')[0] : ref?.tipo;
    const det = typeof ref === 'object' ? ref?.detalhe : null;
    if (tipo === 'kpi') {
      const kpi = det || (data?.kpis || []).find((k) => k.id === String(ref).slice(4));
      return origemKpi(data, kpi);
    }
    if (tipo === 'doc') {
      const id = typeof ref === 'string' ? ref.slice(4).split('#')[0] : null;
      const doc = det?.doc || (data?.documentos || []).find((d) => d.id === id);
      return resultado(data, doc ? porOrigemDoc(data, doc.origem) : null);
    }
    return resultado(data, porObservacao(data, tipo));
  } catch {
    return null;
  }
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
