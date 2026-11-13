// DataSource: de onde vêm os dados da operação.
//
// Na demo, FictitiousDataSource lê pacotes JSON fictícios (data/<setor>.json) com fetch relativo.
// Para um cliente real, escreva outra classe com a mesma interface, por exemplo:
//
//   class ConnectorDataSource {
//     async listSectors() { return [{ id: 'cliente', nome: 'Unidade X', arquivo: null }]; }
//     async loadSector(id) {
//       // monte o mesmo formato do pacote (PLANO §3) a partir de conectores:
//       //   ordens/pedidos/estoque  ← ERP (API ou réplica de leitura)
//       //   turnos/paradas          ← MES ou apontamentos
//       //   documentos/trechos      ← SharePoint, pasta da qualidade, PLM (indexados com permissão por área)
//       //   kpis                    ← camada de indicadores, guardando o "caminho" até a origem
//       return pacote;
//     }
//   }
//
// e troque a instância criada no app.js. Telas, assistente e resolveRef continuam iguais,
// porque só conhecem o formato do pacote e as referências "tipo:id".

import { fmt } from '../format.js';

/** @interface DataSource { listSectors(): Promise<Sector[]>; loadSector(id): Promise<Pacote> } */

export class FictitiousDataSource {
  constructor({ base = '' } = {}) {
    this.base = base;
    this.cache = new Map();
    this.sectors = null;
  }

  async listSectors() {
    if (!this.sectors) {
      this.sectors = fetchJson(`${this.base}data/sectors.json`).catch((err) => {
        this.sectors = null;
        throw err;
      });
    }
    return this.sectors;
  }

  async loadSector(id) {
    if (!this.cache.has(id)) {
      const p = (async () => {
        const list = await this.listSectors().catch(() => []);
        const entry = list.find((s) => s.id === id);
        const path = entry?.arquivo || `data/${id}.json`;
        return fetchJson(`${this.base}${path}`);
      })();
      this.cache.set(id, p);
      p.catch(() => this.cache.delete(id)); // permite tentar de novo depois
    }
    return this.cache.get(id);
  }
}

async function fetchJson(url) {
  let res;
  try {
    res = await fetch(url, { cache: 'no-cache' });
  } catch (err) {
    throw new Error(`Não foi possível buscar ${url}: ${err.message}`);
  }
  if (!res.ok) {
    const e = new Error(res.status === 404 ? `Arquivo ${url} não encontrado` : `Erro ${res.status} ao buscar ${url}`);
    e.status = res.status;
    throw e;
  }
  try {
    return await res.json();
  } catch {
    throw new Error(`${url} não é um JSON válido`);
  }
}

// ---------------------------------------------------------------------------
// Referências (PLANO §3.1)

export const REF_TYPES = {
  doc: { nome: 'Documento', modulo: 'cerebro' },
  op: { nome: 'Ordem de produção', modulo: 'producao' },
  turno: { nome: 'Turno', modulo: 'producao' },
  pedido: { nome: 'Pedido', modulo: 'comercial' },
  sku: { nome: 'Produto', modulo: 'comercial' },
  cliente: { nome: 'Cliente', modulo: 'comercial' },
  rep: { nome: 'Representante', modulo: 'comercial' },
  regra: { nome: 'Regra comercial', modulo: 'comercial' },
  nc: { nome: 'Não conformidade', modulo: 'qualidade' },
  os: { nome: 'Ordem de serviço', modulo: 'manutencao' },
  maq: { nome: 'Máquina', modulo: 'manutencao' },
  kpi: { nome: 'Indicador', modulo: 'visao-geral' },
  saber: { nome: 'Saber de operador', modulo: 'operadores' },
  integ: { nome: 'Integração', modulo: 'integracoes' },
};

// Área do documento → módulo que também pode exibi-lo quando o Cérebro está desligado.
const AREA_TO_MODULE = {
  producao: 'producao', qualidade: 'qualidade', manutencao: 'manutencao', comercial: 'comercial',
  marketing: 'marketing', operadores: 'operadores', gestao: 'visao-geral',
};

export function parseRef(ref) {
  if (typeof ref !== 'string') return null;
  const i = ref.indexOf(':');
  if (i < 1) return null;
  const tipo = ref.slice(0, i);
  const resto = ref.slice(i + 1);
  if (!REF_TYPES[tipo] || !resto) return null;
  if (tipo === 'doc') {
    const [id, trecho] = resto.split('#');
    return { tipo, id, trecho: trecho || null };
  }
  if (tipo === 'turno') {
    const [data, turno, linha] = resto.split('|');
    return { tipo, id: resto, data, turno, linha };
  }
  return { tipo, id: resto };
}

const short = (t, n = 56) => {
  const s = String(t ?? '');
  return s.length > n ? `${s.slice(0, n - 1).trimEnd()}…` : s;
};

/**
 * Resolve "tipo:id" → { ref, tipo, tipoNome, id, rotulo, detalhe, modulo } ou null
 * (ref inválida, registro inexistente ou módulo dono desligado).
 * `isEnabled(moduloId)` é opcional; sem ela tudo conta como ligado.
 */
export function resolveRef(data, ref, isEnabled = () => true) {
  if (!data) return null;
  const p = parseRef(ref);
  if (!p) return null;
  const on = (m) => {
    try {
      return !!isEnabled(m);
    } catch {
      return true;
    }
  };
  const list = (k) => (Array.isArray(data[k]) ? data[k] : []);
  const byId = (k, id, key = 'id') => list(k).find((x) => x && x[key] === id) || null;
  const produto = (sku) => byId('produtos', sku, 'sku');
  const linhaNome = (id) => byId('linhas', id)?.nome || id;

  let rotulo;
  let detalhe;
  let modulo = REF_TYPES[p.tipo].modulo;

  switch (p.tipo) {
    case 'doc': {
      const doc = byId('documentos', p.id);
      if (!doc) return null;
      const trecho = p.trecho ? (doc.trechos || []).find((t) => t.id === p.trecho) || null : null;
      rotulo = trecho ? `${short(doc.titulo, 44)} › ${trecho.secao}` : short(doc.titulo);
      detalhe = { doc, trecho };
      if (!on('cerebro')) {
        const alt = AREA_TO_MODULE[doc.area];
        if (!alt || !on(alt)) return null;
        modulo = alt;
      }
      break;
    }
    case 'op': {
      const op = byId('ordens', p.id);
      if (!op) return null;
      rotulo = `${op.id} · ${short(produto(op.sku)?.nome || op.sku, 40)}`;
      detalhe = op;
      break;
    }
    case 'turno': {
      const t = list('turnos').find((x) => x.data === p.data && x.turno === p.turno && x.linha === p.linha);
      if (!t) return null;
      rotulo = `Turno ${t.turno} · ${linhaNome(t.linha)} · ${fmt.date(t.data)}`;
      detalhe = t;
      break;
    }
    case 'pedido': {
      const pv = byId('pedidos', p.id);
      if (!pv) return null;
      rotulo = `${pv.id} · ${short(byId('clientes', pv.cliente)?.nome || pv.cliente, 40)}`;
      detalhe = pv;
      break;
    }
    case 'sku': {
      const pr = produto(p.id);
      if (!pr) return null;
      rotulo = `${pr.sku} · ${short(pr.nome, 40)}`;
      detalhe = pr;
      // produto aparece no Comercial e também no catálogo do Marketing
      if (!on('comercial')) {
        if (!on('marketing')) return null;
        modulo = 'marketing';
      }
      break;
    }
    case 'cliente': {
      const c = byId('clientes', p.id);
      if (!c) return null;
      rotulo = short(c.nome);
      detalhe = c;
      break;
    }
    case 'rep': {
      const r = byId('representantes', p.id);
      if (!r) return null;
      rotulo = `${r.nome} · ${short(r.regiao, 30)}`;
      detalhe = r;
      break;
    }
    case 'regra': {
      const r = byId('regras_comerciais', p.id);
      if (!r) return null;
      rotulo = `${r.id} · ${short(r.titulo, 44)}`;
      detalhe = r;
      break;
    }
    case 'nc': {
      const nc = byId('nao_conformidades', p.id);
      if (!nc) return null;
      rotulo = `${nc.id} · ${short(nc.descricao, 40)}`;
      detalhe = nc;
      break;
    }
    case 'os': {
      const os = byId('manutencao', p.id);
      if (!os) return null;
      rotulo = `${os.id} · ${short(byId('maquinas', os.maquina)?.nome || os.maquina, 40)}`;
      detalhe = os;
      break;
    }
    case 'maq': {
      const m = byId('maquinas', p.id);
      if (!m) return null;
      rotulo = `${m.id} · ${short(m.nome, 40)}`;
      detalhe = m;
      break;
    }
    case 'kpi': {
      const k = byId('kpis', p.id);
      if (!k) return null;
      rotulo = short(k.nome);
      detalhe = k;
      break;
    }
    case 'saber': {
      const s = byId('saberes', p.id);
      if (!s) return null;
      rotulo = `${s.id} · ${short(s.titulo, 44)}`;
      detalhe = s;
      break;
    }
    case 'integ': {
      const it = byId('integracoes', p.id);
      if (!it) return null;
      rotulo = short(it.nome);
      detalhe = it;
      break;
    }
    default:
      return null;
  }

  if (p.tipo !== 'doc' && p.tipo !== 'sku' && !on(modulo)) return null;
  return { ref, tipo: p.tipo, tipoNome: REF_TYPES[p.tipo].nome, id: p.id, rotulo, detalhe, modulo };
}
