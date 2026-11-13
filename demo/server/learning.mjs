// O "aprendizado" de cada demo: o que o visitante registrou (formulário ou conversa).
// Chave: aprendizado/<demo>/<ts>-<rand>. Texto puro (o front renderiza com textContent/Markdown seguro).

import { randomBytes } from 'node:crypto';
import { AREAS } from './catalogo.mjs';
import { ErroValidacao } from './demos.mjs';

export const TIPOS = ['saber', 'ocorrencia', 'documento', 'nota'];
export const LIMITE_ITENS = 200;
export const ITEM_RE = /^\d{13}-[a-z0-9]{6}$/;

const falha = (msg) => { throw new ErroValidacao(msg); };

/** Texto puro: tira caracteres de controle (menos \n e \t), marcas invisíveis/bidi e normaliza quebras. */
export function sanitiza(v) {
  return String(v ?? '')
    .replace(/\r\n?/g, '\n')
    .replace(/[\u0000-\u0008\u000b-\u001f\u007f​-‏‪-‮⁦-⁩﻿]/g, '')
    .replace(/\[\[|\]\]/g, (m) => (m === '[[' ? '[ [' : '] ]')) // não deixa forjar marcadores de fonte
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .normalize('NFC');
}

function campo(v, nome, max, { obrigatorio = true } = {}) {
  if (v == null || v === '') { if (obrigatorio) falha(`Informe ${nome}`); return null; }
  if (typeof v !== 'string') falha(`${nome} deve ser texto`);
  const t = sanitiza(v);
  if (obrigatorio && !t) falha(`Informe ${nome}`);
  if (t.length > max) falha(`${nome}: no máximo ${max} caracteres`);
  return t || null;
}

export function validaItem(body) {
  const tipo = String(body?.tipo ?? 'nota');
  if (!TIPOS.includes(tipo)) falha(`tipo deve ser um de: ${TIPOS.join(', ')}`);
  const area = String(body?.area ?? 'gestao');
  if (!AREAS.includes(area)) falha(`area deve ser uma de: ${AREAS.join(', ')}`);
  return {
    tipo,
    titulo: campo(body?.titulo, 'título', 120),
    texto: campo(body?.texto, 'texto', 2000),
    area,
    maquina: campo(body?.maquina, 'máquina', 60, { obrigatorio: false }),
    autor: campo(body?.autor, 'autor', 60, { obrigatorio: false }) ?? 'Visitante',
  };
}

export async function listaAprendizado(store, demoId) {
  const chaves = await store.list(`aprendizado/${demoId}/`);
  const itens = await Promise.all(chaves.map((k) => store.get(k)));
  return itens.filter(Boolean).sort((a, b) => a.id.localeCompare(b.id)); // mais antigo primeiro
}

export async function criaAprendizado(store, demoId, body, origem = 'formulario') {
  const v = validaItem(body);
  const n = (await store.list(`aprendizado/${demoId}/`)).length;
  if (n >= LIMITE_ITENS) falha(`Esta demo já tem ${LIMITE_ITENS} registros; apague algum para registrar outro.`);
  const id = `${String(Date.now()).padStart(13, '0')}-${randomBytes(6).toString('base64url').toLowerCase().replace(/[^a-z0-9]/g, '0').slice(0, 6)}`;
  const item = { id, demo: demoId, ...v, origem: origem === 'conversa' ? 'conversa' : 'formulario', criado_em: new Date().toISOString() };
  await store.set(`aprendizado/${demoId}/${id}`, item);
  return item;
}

export async function apagaAprendizado(store, demoId, itemId) {
  if (!ITEM_RE.test(String(itemId))) return false;
  const k = `aprendizado/${demoId}/${itemId}`;
  if (!(await store.get(k))) return false;
  await store.delete(k);
  return true;
}

export async function zeraAprendizado(store, demoId) {
  const chaves = await store.list(`aprendizado/${demoId}/`);
  await Promise.all(chaves.map((k) => store.delete(k)));
  return chaves.length;
}
