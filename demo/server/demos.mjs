// CRUD das demos (PLANO-V2 §4 e §5). Registro: demo/<id>.

import { randomBytes, randomInt } from 'node:crypto';
import { hashSenha } from './auth.mjs';
import { SETOR_IDS, pacote, normalizaModulos } from './catalogo.mjs';

const ALFABETO = 'abcdefghijklmnopqrstuvwxyz234567';
export const ID_RE = /^[a-z2-7]{12}$/;

export function novoId() {
  return [...randomBytes(12)].map((b) => ALFABETO[b % 32]).join(''); // 256 % 32 = 0: sem viés
}

const PALAVRAS_A = ['torno', 'fresa', 'prensa', 'forja', 'solda', 'tear', 'molde', 'lixa', 'broca', 'rosca', 'polia', 'eixo', 'mola', 'trilho', 'fio', 'lote'];
const PALAVRAS_B = ['mare', 'serra', 'vento', 'rio', 'sol', 'lua', 'ipe', 'cedro', 'pinho', 'ponte', 'vale', 'praia', 'campo', 'trigo', 'milho', 'neve'];

/** Senha legível, sem acento: palavra-NNNN-palavra (ex.: torno-4821-mare). */
export function novaSenha() {
  const a = PALAVRAS_A[randomInt(PALAVRAS_A.length)];
  const b = PALAVRAS_B[randomInt(PALAVRAS_B.length)];
  return `${a}-${String(randomInt(10000)).padStart(4, '0')}-${b}`;
}

export class ErroValidacao extends Error {}
const falha = (msg) => { throw new ErroValidacao(msg); };

const limpa = (v) => String(v ?? '').replace(/[\u0000-\u0008\u000b-\u001f\u007f​-‏‪-‮⁦-⁩]/g, '').trim();

function texto(v, campo, max, { obrigatorio = false } = {}) {
  if (v == null || v === '') { if (obrigatorio) falha(`Informe ${campo}`); return ''; }
  if (typeof v !== 'string') falha(`${campo} deve ser texto`);
  const t = limpa(v);
  if (obrigatorio && !t) falha(`Informe ${campo}`);
  if (t.length > max) falha(`${campo}: no máximo ${max} caracteres`);
  return t;
}

function data(v) {
  if (v == null || v === '') return null;
  if (typeof v !== 'string') falha('expira_em deve ser uma data (AAAA-MM-DD) ou null');
  const m = /^(\d{4}-\d{2}-\d{2})(T.*)?$/.exec(v);
  const t = Date.parse(m && !m[2] ? `${m[1]}T23:59:59-03:00` : v); // data pura = fim do dia em Brasília
  if (!m || isNaN(t)) falha('expira_em deve ser uma data (AAAA-MM-DD) ou null');
  return new Date(t).toISOString();
}

function senhaValida(s) {
  if (typeof s !== 'string') falha('senha deve ser texto');
  if (s.length < 6 || s.length > 128) falha('A senha deve ter de 6 a 128 caracteres');
  return s;
}

export const publica = (d) => {
  if (!d) return null;
  const { senha, senha_v, ...resto } = d; // nunca devolve o hash
  return resto;
};

export function disponivel(d, agora = Date.now()) {
  return !!d && d.ativo !== false && !(d.expira_em && Date.parse(d.expira_em) < agora);
}

export const getDemo = (store, id) => (ID_RE.test(String(id)) ? store.get(`demo/${id}`) : null);

export async function criaDemo(store, body) {
  const nome = texto(body.nome, 'nome', 120, { obrigatorio: true });
  const setor = String(body.setor ?? '');
  if (!SETOR_IDS.includes(setor)) falha('Setor desconhecido');
  let modulos;
  try { modulos = normalizaModulos(body.modulos); } catch (e) { falha(e.message); }
  const senha = body.senha ? senhaValida(body.senha) : novaSenha();
  let id;
  do { id = novoId(); } while (await store.get(`demo/${id}`));
  const d = {
    id, nome, setor,
    empresa_nome: texto(body.empresa_nome, 'empresa_nome', 120) || pacote(setor).empresa?.nome || '',
    modulos,
    senha: await hashSenha(senha), senha_v: 1,
    ativo: true,
    criado_em: new Date().toISOString(),
    expira_em: data(body.expira_em),
    nota: texto(body.nota, 'nota', 2000),
    acessos: 0, ultimo_acesso: null,
  };
  await store.set(`demo/${id}`, d);
  return { demo: publica(d), senha };
}

export async function editaDemo(store, id, body) {
  const d = await getDemo(store, id);
  if (!d) return null;
  if ('nome' in body) d.nome = texto(body.nome, 'nome', 120, { obrigatorio: true });
  if ('setor' in body) {
    if (!SETOR_IDS.includes(String(body.setor))) falha('Setor desconhecido');
    if (body.setor !== d.setor && !('empresa_nome' in body) && d.empresa_nome === pacote(d.setor)?.empresa?.nome) {
      d.empresa_nome = pacote(body.setor).empresa?.nome ?? '';
    }
    d.setor = body.setor;
  }
  if ('empresa_nome' in body) d.empresa_nome = texto(body.empresa_nome, 'empresa_nome', 120) || pacote(d.setor).empresa?.nome || '';
  if ('modulos' in body) {
    try { d.modulos = normalizaModulos({ ...d.modulos, ...(body.modulos ?? {}) }); } catch (e) { falha(e.message); }
  }
  if ('ativo' in body) { if (typeof body.ativo !== 'boolean') falha('ativo deve ser true ou false'); d.ativo = body.ativo; }
  if ('expira_em' in body) d.expira_em = data(body.expira_em);
  if ('nota' in body) d.nota = texto(body.nota, 'nota', 2000);
  let senha;
  if (body.nova_senha === true) senha = novaSenha();
  else if (body.nova_senha != null && body.nova_senha !== false) senha = senhaValida(body.nova_senha);
  if (senha) { d.senha = await hashSenha(senha); d.senha_v = (d.senha_v ?? 1) + 1; } // senha_v invalida sessões antigas
  d.atualizado_em = new Date().toISOString();
  await store.set(`demo/${id}`, d);
  return senha ? { demo: publica(d), senha } : { demo: publica(d) };
}

export async function apagaDemo(store, id) {
  const d = await getDemo(store, id);
  if (!d) return false;
  const chaves = [...await store.list(`aprendizado/${id}/`), ...await store.list(`uso/${id}/`)];
  await Promise.all(chaves.map((k) => store.delete(k)));
  await store.delete(`demo/${id}`);
  return true;
}

export async function listaDemos(store) {
  const [chaves, apr] = await Promise.all([store.list('demo/'), store.list('aprendizado/')]);
  const qtd = {};
  for (const k of apr) { const id = k.split('/')[1]; qtd[id] = (qtd[id] ?? 0) + 1; }
  const demos = (await Promise.all(chaves.map((k) => store.get(k)))).filter(Boolean);
  return demos
    .sort((a, b) => (b.criado_em ?? '').localeCompare(a.criado_em ?? ''))
    .map((d) => ({ ...publica(d), aprendizado_qtd: qtd[d.id] ?? 0, url: `/demo/${d.id}`, disponivel: disponivel(d) }));
}

/** Conta um acesso (cada GET /estado de visitante). */
export async function registraAcesso(store, id) {
  const d = await getDemo(store, id); // relê para não sobrescrever uma edição do admin
  if (!d) return;
  d.acessos = (d.acessos ?? 0) + 1;
  d.ultimo_acesso = new Date().toISOString();
  await store.set(`demo/${id}`, d);
}
