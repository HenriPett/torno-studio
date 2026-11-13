// Servidor de dev da demo, Node puro (sem dependências).
//   node demo/scripts/serve.mjs [porta]   (padrão 4400)
//
// - /demo-app/*            → arquivos de demo/web/ (o que o build copia para dist/demo-app/)
// - /demo-app/inter.woff2  → fonte Inter de node_modules/@fontsource-variable/inter
// - /demo/<id> e /admin    → demo/web/index.html (como os redirects 200 da Netlify)
// - /api/*                 → demo/server/router.mjs com FileStore em demo/.dev-store/
//
// Variáveis: ANTHROPIC_API_KEY (opcional: sem ela, motor local), DEMO_ADMIN_PASSWORD, DEMO_SESSION_SECRET,
// DEMO_MODEL, DEMO_DAILY_MESSAGES. Sem senha de admin/segredo, usa valores de dev e avisa.

import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { handle } from '../server/router.mjs';
import { FileStore } from '../server/store.mjs';

const DEMO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const WEB = path.join(DEMO, 'web');
const RAIZ = path.resolve(DEMO, '..');
const FONTE = path.join(RAIZ, 'node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2');
const PORTA = Number(process.argv[2]) || 4400;

const env = { ...process.env };
if (!env.DEMO_ADMIN_PASSWORD) { env.DEMO_ADMIN_PASSWORD = 'admin-dev'; console.warn('[dev] DEMO_ADMIN_PASSWORD ausente: usando "admin-dev".'); }
if (!env.DEMO_SESSION_SECRET) { env.DEMO_SESSION_SECRET = 'segredo-de-dev-nao-use-em-producao-0123456789'; console.warn('[dev] DEMO_SESSION_SECRET ausente: usando um segredo fixo de dev.'); }
if (!env.ANTHROPIC_API_KEY) console.warn('[dev] ANTHROPIC_API_KEY ausente: a conversa usa o motor local.');

const store = new FileStore(path.join(DEMO, '.dev-store'));

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2', '.map': 'application/json; charset=utf-8',
  '.md': 'text/plain; charset=utf-8', '.txt': 'text/plain; charset=utf-8', '.ico': 'image/x-icon',
};
const NOINDEX = { 'x-robots-tag': 'noindex, nofollow, noarchive', 'referrer-policy': 'no-referrer', 'cache-control': 'no-cache' };

function embrulha(html) {
  if (/^\s*<!doctype/i.test(html)) return html;
  return `<!doctype html>\n<html lang="pt-BR">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n<meta name="robots" content="noindex, nofollow">\n</head>\n<body>\n${html}\n</body>\n</html>`;
}

async function enviaArquivo(res, arq, status = 200) {
  const ext = path.extname(arq).toLowerCase();
  if (ext === '.html') {
    const html = embrulha(await readFile(arq, 'utf8'));
    res.writeHead(status, { 'content-type': MIME['.html'], ...NOINDEX }).end(html);
  } else {
    res.writeHead(status, { 'content-type': MIME[ext] || 'application/octet-stream', ...NOINDEX }).end(await readFile(arq));
  }
}

async function api(req, res) {
  const pedacos = [];
  let total = 0;
  if (!['GET', 'HEAD'].includes(req.method)) {
    for await (const c of req) {
      total += c.length;
      if (total > 256 * 1024) { res.writeHead(413, { 'content-type': 'application/json' }).end('{"erro":"Requisição grande demais"}'); return; }
      pedacos.push(c);
    }
  }
  const ac = new AbortController();
  res.on('close', () => { if (!res.writableFinished) ac.abort(); });
  const headers = new Headers();
  for (const [k, v] of Object.entries(req.headers)) if (v != null) headers.set(k, Array.isArray(v) ? v.join(', ') : v);
  const request = new Request(`http://${req.headers.host || `localhost:${PORTA}`}${req.url}`, {
    method: req.method, headers, body: pedacos.length ? Buffer.concat(pedacos) : undefined, signal: ac.signal,
  });
  const resposta = await handle(request, { env, store });
  const h = {};
  resposta.headers.forEach((v, k) => { if (k !== 'set-cookie') h[k] = v; });
  const cookies = resposta.headers.getSetCookie?.() ?? [];
  if (cookies.length) h['set-cookie'] = cookies;
  res.writeHead(resposta.status, h);
  if (!resposta.body) { res.end(); return; }
  const leitor = resposta.body.getReader();
  try {
    for (;;) {
      const { value, done } = await leitor.read();
      if (done) break;
      res.write(value);
    }
  } catch { /* cliente desconectou */ }
  res.end();
}

const servidor = http.createServer(async (req, res) => {
  try {
    const u = new URL(req.url || '/', 'http://x');
    const p = decodeURIComponent(u.pathname);
    if (p.startsWith('/api/')) return await api(req, res);
    if (p === '/') { res.writeHead(302, { location: '/admin' }).end(); return; }
    if (p === '/admin' || p === '/admin/' || p.startsWith('/demo/')) return await enviaArquivo(res, path.join(WEB, 'index.html'));
    if (p === '/demo-app/inter.woff2') return await enviaArquivo(res, FONTE);
    if (p === '/demo-app' || p.startsWith('/demo-app/')) {
      let rel = p.slice('/demo-app/'.length) || 'index.html';
      let arq = path.resolve(WEB, rel);
      if (arq !== WEB && !arq.startsWith(WEB + path.sep)) { res.writeHead(403).end('403'); return; }
      try { if ((await stat(arq)).isDirectory()) arq = path.join(arq, 'index.html'); }
      catch { res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' }).end(`404: ${rel}`); return; }
      return await enviaArquivo(res, arq);
    }
    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' }).end('404 (use /admin ou /demo/<id>)');
  } catch (e) {
    console.error(e);
    if (!res.headersSent) res.writeHead(500, { 'content-type': 'text/plain; charset=utf-8' });
    res.end('500');
  }
});

servidor.listen(PORTA, () => {
  console.log(`Demo da Torno (dev) em http://localhost:${PORTA}/admin  ·  dados em ${path.relative(RAIZ, store.dir)}/`);
});
