#!/usr/bin/env node
/**
 * Isolamento das landings de setor (docs/estrategia-2026-11-torno-industria.md §7.2).
 *
 * Varre o build (dist/) e falha se:
 *  (a) qualquer arquivo de texto fora de dist/para/<slug>/ (HTML, .md, sitemap*.xml, llms.txt, robots.txt,
 *      _redirects, _headers, .txt/.xml/.json/.js/.css/.svg/.webmanifest) citar uma URL com /para/,
 *      em href/src/action/content/srcset, JSON-LD ou texto;
 *  (b) uma landing dist/para/<a>/ linkar ou citar /para/<b>/;
 *  (c) uma landing não tiver <meta name="robots"> com noindex, ou tiver canonical, hreflang ou
 *      representação Markdown (link alternate text/markdown ou arquivo .md gerado);
 *  (d) existir dist/para/index.html (ou qualquer arquivo solto em dist/para/): /para/ não tem índice.
 *
 * Uso: hook astro:build:done (astro.config.mjs) e standalone: `node scripts/check-sector-isolation.mjs dist`.
 * URLs absolutas de outros domínios (ex.: https://www.gov.br/para/...) não contam: só o próprio site.
 */
import { readFile, readdir, stat } from 'node:fs/promises';
import { join, relative, resolve, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const TEXT_EXT = /\.(?:html?|md|xml|txt|json|js|mjs|css|svg|webmanifest|map)$/i;
const TEXT_NAMES = new Set(['_redirects', '_headers']);
const SLUG = /^[a-z-]+$/;

/** Hosts do próprio site: absoluto com /para/ nesses hosts conta como vazamento. */
const OWN_HOST = /^(?:[a-z0-9-]+\.)*(?:tornostudio\.com|netlify\.app)$|^localhost$|^127\.0\.0\.1$/i;

/**
 * Ocorrências de /para/ em texto. Captura um prefixo de URL absoluta (se houver) para descartar
 * domínios externos, e o slug logo depois (para a regra b).
 */
const PARA_TEXT = /((?:https?:)?\/\/[^\s"'<>()\\]*?)?(?:\\\/|\/|%2F)para(?:\\\/|\/|%2F)([a-z0-9-]*)/gi;

const posix = (path) => path.split(sep).join('/');

async function walk(root) {
  const entries = await readdir(root, { recursive: true, withFileTypes: true });
  return entries.filter((e) => e.isFile()).map((e) => posix(relative(root, join(e.parentPath ?? e.path, e.name))));
}

/** Atributos de URL em tags HTML (href, src, action, content, srcset, data-*-href...). */
function htmlUrls(html) {
  const out = [];
  for (const m of html.matchAll(/\s(href|src|action|content|srcset|poster|data-[a-z-]*(?:href|url|src))\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/gi)) {
    const value = m[2] ?? m[3] ?? m[4] ?? '';
    if (m[1].toLowerCase() === 'srcset') out.push(...value.split(',').map((part) => part.trim().split(/\s+/)[0]).filter(Boolean));
    else out.push(value);
  }
  return out;
}

/** Caminho /para/... se a URL (relativa ou do próprio host) apontar para uma landing; senão null. */
function paraPath(raw, pageUrl) {
  const value = raw.trim().replace(/&amp;/g, '&');
  if (!value || /^(?:mailto|tel|data|javascript):/i.test(value)) return null;
  let url;
  try { url = new URL(value, pageUrl); } catch { return null; }
  if (!OWN_HOST.test(url.hostname)) return null;
  let path = url.pathname;
  try { path = decodeURIComponent(path); } catch { /* mantém o original */ }
  return /^\/para(?:\/|$)/i.test(path) ? path : null;
}

/** Ocorrências textuais de /para/ do próprio site (descarta URLs absolutas de outros domínios). */
function textHits(text) {
  const hits = [];
  for (const m of text.matchAll(PARA_TEXT)) {
    const prefix = m[1];
    if (prefix) {
      try {
        const host = new URL(prefix.startsWith('//') ? `https:${prefix}` : prefix).hostname;
        if (!OWN_HOST.test(host)) continue;
      } catch { /* prefixo malformado: trata como vazamento */ }
    }
    const at = m.index ?? 0;
    hits.push({ slug: (m[2] ?? '').toLowerCase(), excerpt: text.slice(Math.max(0, at - 50), at + m[0].length + 30).replace(/\s+/g, ' ') });
  }
  return hits;
}

const attrOf = (tag, name) => tag.match(new RegExp(`\\s${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i'))?.slice(1).find((v) => v !== undefined);

/**
 * @param {string} dist diretório do build
 * @returns {Promise<{ errors: string[]; landings: string[]; scanned: number }>}
 */
export async function checkSectorIsolation(dist) {
  const root = resolve(dist);
  const errors = [];
  const files = await walk(root);
  const landings = new Set();

  for (const file of files) {
    const parts = file.split('/');
    if (parts[0] !== 'para') continue;
    // (d) /para/ não tem índice nem arquivo solto.
    if (parts.length === 2) {
      errors.push(`(d) dist/${file} não pode existir: /para/ não tem índice (deve responder 404).`);
      continue;
    }
    const slug = parts[1];
    if (!SLUG.test(slug)) errors.push(`(c) dist/para/${slug}/: slug fora do padrão ^[a-z-]+$.`);
    landings.add(slug);
    if (/\.md$/i.test(file)) errors.push(`(c) dist/${file}: landing de setor não pode ter Markdown para agentes.`);
  }

  // Assets com nome de setor (ex.: _astro/alimentos.<hash>.css) revelam a landing em qualquer página que os carregue.
  const assetSlug = (value) => {
    const path = value.split(/[?#]/)[0] ?? '';
    const base = (path.split('/').pop() ?? '').split('.')[0] ?? '';
    return path.includes('/_astro/') || path.startsWith('_astro/') ? base : null;
  };
  for (const file of files) {
    const parts = file.split('/');
    if (parts[0] === '_astro' && landings.has((parts[1] ?? '').split('.')[0] ?? '')) {
      errors.push(`(a) dist/${file}: asset com nome de landing de setor; o nome do arquivo revela o setor (use só o hash).`);
    }
  }

  for (const file of files) {
    const name = file.split('/').pop() ?? '';
    if (!TEXT_EXT.test(file) && !TEXT_NAMES.has(name)) continue;
    const text = await readFile(join(root, file), 'utf8');
    const parts = file.split('/');
    const own = parts[0] === 'para' && parts.length > 2 ? parts[1] : null;
    const pagePath = `/${file.replace(/(?:^|\/)index\.html$/, '/').replace(/^\/+/, '')}`;
    const pageUrl = new URL(pagePath.startsWith('/') ? pagePath : `/${pagePath}`, 'https://tornostudio.com');

    if (/\.html?$/i.test(file)) {
      for (const u of htmlUrls(text)) {
        const slug = assetSlug(u);
        if (slug && slug !== own && landings.has(slug)) errors.push(`(${own ? 'b' : 'a'}) dist/${file} carrega ${u}, cujo nome revela a landing "${slug}".`);
      }
    }

    if (!own) {
      // (a) nada fora das landings aponta para /para/.
      const linked = /\.html?$/i.test(file) ? htmlUrls(text).map((u) => paraPath(u, pageUrl)).filter(Boolean) : [];
      for (const path of new Set(linked)) errors.push(`(a) dist/${file} aponta para ${path} (link/atributo). Nenhuma página fora da própria landing pode citar /para/.`);
      // Texto (JSON-LD, prosa, XML, .txt): ocorrências além das já contadas como link.
      const linkedSlugs = new Set(linked.map((path) => path.split('/')[2] ?? ''));
      const hits = textHits(text).filter((hit) => !linkedSlugs.has(hit.slug));
      if (hits.length) errors.push(`(a) dist/${file} cita /para/ em texto ${hits.length}x, ex.: …${hits[0].excerpt}…`);
      continue;
    }

    // (b) landing não aponta para outra landing.
    const others = new Set();
    if (/\.html?$/i.test(file)) {
      for (const u of htmlUrls(text)) {
        const path = paraPath(u, pageUrl);
        if (path && path.split('/')[2] !== own) others.add(path);
      }
    }
    for (const hit of textHits(text)) if (hit.slug !== own) others.add(`/para/${hit.slug}${hit.slug ? '/' : ''}`);
    for (const path of others) errors.push(`(b) dist/${file} (landing "${own}") aponta para ${path}. Uma landing não pode citar outra nem /para/.`);

    // (c) noindex, sem canonical, sem hreflang, sem Markdown alternativo.
    if (/\.html?$/i.test(file)) {
      const head = text.split(/<\/head>/i)[0] ?? text;
      const tags = [...head.matchAll(/<(meta|link)\b[^>]*>/gi)].map((m) => m[0]);
      const robots = tags.filter((t) => /^<meta/i.test(t) && /^robots$/i.test(attrOf(t, 'name') ?? '')).map((t) => attrOf(t, 'content') ?? '');
      if (!robots.some((c) => /\bnoindex\b/i.test(c))) errors.push(`(c) dist/${file}: falta <meta name="robots" content="noindex, nofollow">.`);
      const links = tags.filter((t) => /^<link/i.test(t));
      if (links.some((t) => /(?:^|\s)canonical(?:\s|$)/i.test(attrOf(t, 'rel') ?? ''))) errors.push(`(c) dist/${file}: landing de setor não pode ter rel="canonical".`);
      if (links.some((t) => attrOf(t, 'hreflang') !== undefined)) errors.push(`(c) dist/${file}: landing de setor não pode ter hreflang.`);
      if (links.some((t) => /markdown/i.test(attrOf(t, 'type') ?? ''))) errors.push(`(c) dist/${file}: landing de setor não pode anunciar representação Markdown.`);
      if (/<meta\b[^>]*property=["']og:url["']/i.test(head)) errors.push(`(c) dist/${file}: landing de setor não pode ter og:url.`);
    }
  }

  return { errors, landings: [...landings].sort(), scanned: files.length };
}

export function formatErrors(errors) {
  return `[isolamento-setores] ${errors.length} problema(s) de isolamento das landings /para/ (estratégia §7.2):\n${errors.map((e) => `  - ${e}`).join('\n')}`;
}

/** Integração Astro: falha o build se o isolamento for violado. */
export default function sectorIsolation() {
  return {
    name: 'sector-isolation',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const { errors, landings, scanned } = await checkSectorIsolation(fileURLToPath(dir));
        if (errors.length) throw new Error(formatErrors(errors));
        logger.info(`Isolamento ok: ${landings.length} landing(s) de setor, ${scanned} arquivo(s) verificados.`);
      },
    },
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const dist = process.argv[2] ?? 'dist';
  try {
    await stat(dist);
  } catch {
    console.error(`[isolamento-setores] diretório não encontrado: ${dist}. Rode o build antes.`);
    process.exit(2);
  }
  const { errors, landings, scanned } = await checkSectorIsolation(dist);
  if (errors.length) {
    console.error(formatErrors(errors));
    process.exit(1);
  }
  console.log(`[isolamento-setores] ok: ${landings.length} landing(s) (${landings.join(', ') || 'nenhuma'}), ${scanned} arquivo(s) verificados.`);
}
