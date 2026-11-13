// API da demo da Torno (Netlify Functions v2). Toda a lógica está em demo/server/ (ver demo/server/README.md).
// Os pacotes de setor (demo/data/*.json) entram por import estático em demo/server/catalogo.mjs,
// então o bundler (esbuild) os embute na função; não é preciso included_files.

import { handle } from '../../demo/server/router.mjs';
import { BlobsStore } from '../../demo/server/store.mjs';

export default async (req) => {
  let store;
  try {
    store = await BlobsStore.criar('torno-demos'); // por requisição: o contexto dos Blobs vem de cada invocação
  } catch (e) {
    console.error(`[demo-api] Netlify Blobs indisponível: ${e?.message}`);
    return new Response(JSON.stringify({ erro: 'Armazenamento indisponível' }), {
      status: 503,
      headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', 'x-robots-tag': 'noindex' },
    });
  }
  return handle(req, { env: process.env, store });
};

export const config = { path: ['/api/demo/*', '/api/admin/*'] };
