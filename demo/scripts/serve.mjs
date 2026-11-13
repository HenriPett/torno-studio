// Servidor estático sem dependências para testar a demo fora do claude.ai.
// node demo/scripts/serve.mjs [porta]   (padrão 4400)
//
// Para index.html injeta o esqueleto que o Artifact normalmente embrulha (doctype, head, body),
// já que o index.html da demo começa direto em <title>. Os demais arquivos saem como estão.

import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PORT = Number(process.argv[2]) || 4400;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.map': 'application/json; charset=utf-8',
};

function wrapIndex(body) {
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
</head>
<body>
${body}
</body>
</html>`;
}

function safePath(urlPath) {
  const clean = decodeURIComponent(urlPath.split('?')[0].split('#')[0]);
  let rel = clean === '/' ? 'index.html' : clean.replace(/^\/+/, '');
  const resolved = path.resolve(ROOT, rel);
  if (!resolved.startsWith(ROOT)) return null; // impede path traversal
  return { resolved, rel };
}

const server = http.createServer(async (req, res) => {
  const info = safePath(req.url || '/');
  if (!info) {
    res.writeHead(403).end('403');
    return;
  }
  let { resolved, rel } = info;
  try {
    const s = await stat(resolved);
    if (s.isDirectory()) {
      resolved = path.join(resolved, 'index.html');
      rel = path.join(rel, 'index.html');
    }
  } catch {
    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' }).end(`404: ${rel}`);
    return;
  }

  const ext = path.extname(resolved).toLowerCase();
  try {
    if (ext === '.html') {
      const body = await readFile(resolved, 'utf8');
      const out = path.basename(resolved) === 'index.html' ? wrapIndex(body) : body;
      res.writeHead(200, { 'content-type': MIME['.html'], 'cache-control': 'no-cache' }).end(out);
    } else {
      const buf = await readFile(resolved);
      res.writeHead(200, { 'content-type': MIME[ext] || 'application/octet-stream', 'cache-control': 'no-cache' }).end(buf);
    }
  } catch (err) {
    res.writeHead(500, { 'content-type': 'text/plain; charset=utf-8' }).end(`500: ${err.message}`);
  }
});

server.listen(PORT, () => {
  console.log(`Demo da Torno em http://localhost:${PORT}/  (raiz: ${ROOT})`);
});
