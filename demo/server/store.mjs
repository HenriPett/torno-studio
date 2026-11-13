// Armazenamento chave → objeto JSON.
// Interface: { get(key) → obj|null, set(key, obj), delete(key), list(prefix) → [keys] (ordenadas) }.
// BlobsStore: Netlify Blobs (store `torno-demos`, consistência forte) — só funciona dentro da Netlify.
// FileStore: um arquivo JSON por chave numa pasta (dev local e testes).

import { mkdir, readFile, writeFile, rm, readdir, rename } from 'node:fs/promises';
import path from 'node:path';
import { randomBytes } from 'node:crypto';

const KEY_RE = /^[a-z0-9][a-z0-9_\-./]{0,200}$/i;
function checaChave(key) {
  if (typeof key !== 'string' || !KEY_RE.test(key) || key.includes('..') || key.includes('//') || key.endsWith('/')) {
    throw new Error(`Chave inválida: ${String(key).slice(0, 60)}`);
  }
}

export class FileStore {
  constructor(dir) { this.dir = path.resolve(dir); this.tipo = 'arquivo'; }
  #arq(key) { checaChave(key); return path.join(this.dir, `${key}.json`); }
  async get(key) {
    try { return JSON.parse(await readFile(this.#arq(key), 'utf8')); }
    catch (e) { if (e.code === 'ENOENT') return null; throw e; }
  }
  async set(key, obj) {
    const arq = this.#arq(key);
    await mkdir(path.dirname(arq), { recursive: true });
    const tmp = `${arq}.${randomBytes(4).toString('hex')}.tmp`;
    await writeFile(tmp, JSON.stringify(obj));
    await rename(tmp, arq);
  }
  async delete(key) { await rm(this.#arq(key), { force: true }); }
  async list(prefix = '') {
    const out = [];
    const anda = async (dir, rel) => {
      let ents;
      try { ents = await readdir(dir, { withFileTypes: true }); } catch (e) { if (e.code === 'ENOENT') return; throw e; }
      for (const e of ents) {
        const r = rel ? `${rel}/${e.name}` : e.name;
        if (e.isDirectory()) await anda(path.join(dir, e.name), r);
        else if (e.name.endsWith('.json')) out.push(r.slice(0, -5));
      }
    };
    await anda(this.dir, '');
    return out.filter((k) => k.startsWith(prefix)).sort();
  }
}

export class BlobsStore {
  constructor(store) { this.s = store; this.tipo = 'blobs'; }
  static async criar(nome = 'torno-demos') {
    const { getStore } = await import('@netlify/blobs');
    return new BlobsStore(getStore({ name: nome, consistency: 'strong' }));
  }
  async get(key) { checaChave(key); return (await this.s.get(key, { type: 'json' })) ?? null; }
  async set(key, obj) { checaChave(key); await this.s.setJSON(key, obj); }
  async delete(key) { checaChave(key); await this.s.delete(key); }
  async list(prefix = '') {
    const { blobs } = await this.s.list({ prefix });
    return blobs.map((b) => b.key).sort();
  }
}

/**
 * Escolhe o armazenamento: BlobsStore quando há ambiente da Netlify (env NETLIFY / contexto de Blobs)
 * e o getStore não lança; senão FileStore em `dir`.
 */
export async function criaStore({ env = process.env, dir } = {}) {
  const naNetlify = !!(env.NETLIFY || env.NETLIFY_BLOBS_CONTEXT || globalThis.netlifyBlobsContext || env.NETLIFY_LOCAL);
  if (naNetlify) {
    try { return await BlobsStore.criar(); } catch (e) { if (!dir) throw e; }
  }
  if (!dir) {
    try { return await BlobsStore.criar(); } catch { /* fora da Netlify */ }
    throw new Error('Sem Netlify Blobs e sem pasta para o FileStore');
  }
  return new FileStore(dir);
}
