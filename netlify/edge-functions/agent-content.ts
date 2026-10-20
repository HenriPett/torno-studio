interface Context { next: () => Promise<Response> }

/** Split only delimiters outside quoted-string (RFC 9110 §5.6.4). */
function splitHeader(value: string, delimiter: string): string[] {
  const parts: string[] = []; let start = 0; let quoted = false; let escaped = false;
  for (let i = 0; i < value.length; i++) {
    const char = value[i];
    if (escaped) { escaped = false; continue; }
    if (quoted && char === '\\') { escaped = true; continue; }
    if (char === '"') quoted = !quoted;
    if (!quoted && char === delimiter) { parts.push(value.slice(start, i)); start = i + 1; }
  }
  parts.push(value.slice(start)); return parts;
}

/** RFC 9110: specificity and representation parameters precede quality. */
export function prefersMarkdown(accept: string | null): boolean {
  if (!accept) return false;
  const ranges = splitHeader(accept, ',').map((part) => {
    const [rawType = '', ...params] = splitHeader(part, ';');
    let q = 1;
    const mediaParams: Record<string, string> = {};
    for (const param of params) {
      const equal = param.indexOf('=');
      const key = param.slice(0, equal).trim().toLowerCase();
      const value = param.slice(equal + 1).trim();
      if (equal < 0) { q = 0; continue; }
      if (key === 'q') {
        q = /^(?:0(?:\.\d{0,3})?|1(?:\.0{0,3})?)$/.test(value) ? Number(value) : 0;
      } else {
        mediaParams[key] = value.replace(/^"(.*)"$/, '$1').replace(/\\(.)/g, '$1').toLowerCase();
      }
    }
    return { type: rawType.trim().toLowerCase(), q, params: mediaParams };
  });
  // Both offered representations have only charset=utf-8; unsupported profiles do not match.
  const compatible = (params: Record<string, string>) => Object.entries(params).every(([k,v]) => k === 'charset' && v === 'utf-8');
  if (!ranges.some(r => r.type === 'text/markdown' && compatible(r.params))) return false;
  function quality(type: string) {
    for (const range of [type, 'text/*', '*/*']) {
      const matches = ranges.filter(r => r.type === range && compatible(r.params));
      if (matches.length) {
        const specificity = Math.max(...matches.map(r => Object.keys(r.params).length));
        return Math.max(...matches.filter(r => Object.keys(r.params).length === specificity).map(r => r.q));
      }
    }
    return 0;
  }
  const markdown = quality('text/markdown');
  return markdown > 0 && markdown >= quality('text/html');
}

export function varyAccept(headers: Headers) {
  const vary = (headers.get('vary') || '').split(',').map(s => s.trim()).filter(Boolean);
  if (!vary.some(s => s === '*' || s.toLowerCase() === 'accept')) vary.push('Accept');
  headers.set('Vary', vary.join(', '));
}

export default async function agentContent(request: Request, context: Context): Promise<Response> {
  if (!['GET', 'HEAD'].includes(request.method)) return context.next();
  const response = await context.next();
  // Redirects, files and the diagnostic counter continue through their usual chain.
  if (!response.headers.get('content-type')?.toLowerCase().includes('text/html')) return response;
  const headers = new Headers(response.headers);
  varyAccept(headers);
  if (!prefersMarkdown(request.headers.get('accept')) || ![200, 404].includes(response.status)) {
    return new Response(request.method === 'HEAD' ? null : response.body, { status: response.status, headers });
  }
  const url = new URL(request.url);
  // No HTML byte validators survive a representation change, including failures.
  for (const header of ['Content-Length', 'Content-Encoding', 'ETag', 'Last-Modified', 'Accept-Ranges', 'Content-Range']) headers.delete(header);
  headers.set('Cache-Control', 'no-store');
  headers.set('Link', '</llms.txt>; rel="describedby"');
  const unavailable = () => {
    headers.set('Content-Type', 'text/plain; charset=utf-8');
    return new Response(request.method === 'HEAD' ? null : 'Markdown representation temporarily unavailable. See /llms.txt.\n', { status: 503, headers });
  };
  let body: string;
  if (response.status === 404) {
    body = '# 404 — Página não encontrada / Page not found\n\nO endereço solicitado não existe. The requested page could not be found.\n\nConsulte [as instruções para agentes](/llms.txt) ou o [mapa do site](/sitemap-index.xml).\n';
    headers.set('X-Robots-Tag', 'noindex');
  } else {
    const path = url.pathname.endsWith('.html') ? url.pathname.replace(/\.html$/, '.md') : url.pathname.endsWith('/') ? `${url.pathname}index.md` : `${url.pathname}/index.md`;
    // No client credentials/conditional headers: this fetch is a public static representation.
    try {
      const html = await response.text();
      const robots = html.match(/<meta\b(?=[^>]*\bname=["']robots["'])[^>]*\bcontent=["']([^"']+)["']/i)?.[1];
      if (robots) headers.set('X-Robots-Tag', robots);
      const markdown = await fetch(new URL(path, url.origin), { headers: { Accept: 'text/plain' }, redirect: 'follow' });
      if (!markdown.ok || !/^text\/markdown(?:;|$)/i.test(markdown.headers.get('content-type') || '')) return unavailable();
      body = await markdown.text();
      if (body.trim().length < 20) return unavailable();
    } catch {
      return unavailable();
    }
  }
  headers.set('Content-Type', 'text/markdown; charset=utf-8');
  headers.set('Cache-Control', 'no-store');
  headers.set('Link', '</llms.txt>; rel="describedby"');
  return new Response(request.method === 'HEAD' ? null : body, { status: response.status, headers });
}

// Middleware stays uncached; Vary also protects downstream HTML caches.
export const config = { path: '/*' };
