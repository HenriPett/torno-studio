// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import agentMarkdown from './scripts/agent-markdown.mjs';
import sectorIsolation from './scripts/check-sector-isolation.mjs';
import { readdirSync } from 'node:fs';
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEnv } from 'vite';

import { blogCriteriaFigure, blogScrollableBlocks, BLOG_ORIGIN, prepareBlogManifest, validateBlogOutput } from './src/config/blog.mjs';

import { campaignRoutes, routes, locales, defaultLocale } from './src/config/routes.mjs';

const env = { ...loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), ''), ...process.env };

/** Contexto do build na Netlify: production | deploy-preview | branch-deploy | dev; vazio fora dela. */
const isProduction = env.CONTEXT === 'production';

/**
 * URL pública: PUBLIC_SITE_URL > (produção: URL principal da Netlify; preview/branch: DEPLOY_PRIME_URL) > localhost.
 * URL e DEPLOY_PRIME_URL já vêm com https:// da Netlify.
 */
function resolveSiteUrl() {
  const url = env.PUBLIC_SITE_URL || (isProduction ? env.URL : env.DEPLOY_PRIME_URL) || 'http://localhost:4321';
  return url.replace(/\/+$/, '');
}

/**
 * Gates de configuração: nunca publicar produção com CTA de agenda quebrado nem sem controlador e e-mail de contato (LGPD).
 * @returns {import('astro').AstroIntegration}
 */
function envGuard() {
  return {
    name: 'env-guard',
    hooks: {
      'astro:config:setup': ({ command, logger }) => {
        if (command !== 'build') return;
        /** @type {[string, string][]} variáveis obrigatórias em produção e o efeito de deixá-las vazias. */
        const required = [
          ['PUBLIC_BOOKING_URL', 'CTA de agenda usa o placeholder "#agendar"'],
          ['PUBLIC_LEGAL_NAME', 'linha do controlador some da página de privacidade'],
          ['PUBLIC_LEGAL_ID', 'linha do controlador some da página de privacidade'],
          ['PUBLIC_CONTACT_EMAIL', 'privacidade usa o LinkedIn como canal de contato'],
        ];
        const missing = required.filter(([key]) => !(env[key] ?? '').trim());
        if (missing.length && isProduction) {
          throw new Error(
            `[env-guard] Variáveis obrigatórias vazias em CONTEXT=production (Netlify): ${missing.map(([key]) => key).join(', ')}.`,
          );
        }
        for (const [key, effect] of missing) logger.warn(`${key} vazio: ${effect}.`);
        if (!(env.PUBLIC_SITE_BRAND ?? '').trim()) {
          logger.warn('PUBLIC_SITE_BRAND vazio: marca usa o placeholder "[Marca]".');
        }
      },
      // Texto provisório "[Mote: …]" (DIAGNOSTICO-SPEC): visível em dev/preview, proibido em produção.
      'astro:build:done': async ({ dir, logger }) => {
        const root = fileURLToPath(dir);
        const files = (await readdir(root, { recursive: true })).filter((file) => file.endsWith('.html'));
        const found = [];
        for (const file of files) {
          const html = await readFile(join(root, file), 'utf8');
          const hits = html.match(/\[Mote:[^\]]*\]/g);
          if (hits) found.push(`${file} (${hits.length}): ${hits[0].slice(0, 60)}`);
        }
        if (!found.length) return;
        const list = found.join('; ');
        if (isProduction) throw new Error(`[env-guard] Placeholder de copy em CONTEXT=production: ${list}`);
        logger.warn(`Placeholders de copy (proibidos em produção): ${list}`);
      },
    },
  };
}

/**
 * Mapa URL -> alternates, porque as rotas PT/EN têm slugs diferentes (/privacidade/ x /en/privacy/).
 * @param {string} site
 */
function sitemapLinks(site) {
  /** @type {Map<string, { lang: string; url: string }[]>} */
  const byUrl = new Map();
  for (const [id, route] of Object.entries(routes)) {
    // Fora do sitemap: landings de campanha e páginas que não existem nos dois idiomas.
    if (campaignRoutes.includes(/** @type {any} */ (id)) || locales.some((lang) => !route[lang])) continue;
    /** @type {{ lang: string; url: string }[]} */
    const links = locales.map((lang) => ({ lang, url: new URL(/** @type {string} */ (route[lang]), site).href }));
    links.push({ lang: 'x-default', url: new URL(/** @type {string} */ (route.en), site).href });
    for (const lang of locales) byUrl.set(new URL(/** @type {string} */ (route[lang]), site).href, links);
  }
  return byUrl;
}

/**
 * Isolamento das landings de setor (estratégia §7.2): o Rollup batiza CSS compartilhado com o nome da
 * primeira página que o importa (ex.: _astro/alimentos.<hash>.css linkado por todas as landings), o que
 * revelaria um setor na página de outro. CSS sai só com hash; outro asset com nome de setor também.
 */
const sectorSlugs = new Set((() => {
  try { return readdirSync('src/pages/para').filter((f) => f.endsWith('.astro')).map((f) => f.slice(0, -6)); } catch { return []; }
})());
/** @param {{ names?: string[] | undefined; name?: string | undefined }} asset @returns {string} */
function assetFileNames(asset) {
  const name = (asset.names?.[0] ?? asset.name ?? '').split('/').pop() ?? '';
  const base = name.replace(/\.[^.]*$/, '');
  if (name.endsWith('.css') || sectorSlugs.has(base)) return '_astro/[hash][extname]';
  return '_astro/[name].[hash][extname]';
}

const site = resolveSiteUrl(); // Preserve existing pages' environment policy.
const links = sitemapLinks(site);
/** @param {string} url */
const blogUrl = (url) => /^\/(?:en\/)?blog\//.test(new URL(url).pathname) ? new URL(new URL(url).pathname, BLOG_ORIGIN).href : url;
for (const [url, alternates] of [...links]) {
  if (blogUrl(url) !== url) { links.delete(url); links.set(blogUrl(url), alternates.map(a => ({ ...a, url: blogUrl(a.url) }))); }
}
// Persisted before collection loading: no getCollection or process-local publication state here.
const blogManifest = await prepareBlogManifest(process.cwd(), env.BLOG_BUILD_AT || new Date().toISOString());
for (const entry of blogManifest.entries) links.set(entry.data.canonical_url, entry.alternates.map(a => ({ lang: a.hreflang, url: a.href })));
const blogDates = new Map(blogManifest.entries.map(e => [e.data.canonical_url, e.data.last_substantive_update_at || e.data.first_published_at]));

export default defineConfig({
  site,
  output: 'static',
  markdown: { remarkPlugins: [blogCriteriaFigure], rehypePlugins: [[blogScrollableBlocks, { labelTaskLists: true }]] },
  trailingSlash: 'always',
  vite: { build: { rollupOptions: { output: { assetFileNames } } } },
  build: { format: 'directory' },
  i18n: {
    locales: [...locales],
    defaultLocale,
    routing: { prefixDefaultLocale: false, redirectToDefaultLocale: false },
  },
  integrations: [
    envGuard(),
    agentMarkdown(),
    sitemap({
      // Landings de setor (/para/<slug>/) nunca entram no sitemap (estratégia §7.2), mesmo que ganhem routeId.
      filter: (page) => !/^\/para(?:\/|$)/.test(new URL(page).pathname) && links.has(blogUrl(page)),
      serialize: (item) => ({ ...item, url: blogUrl(item.url), links: links.get(blogUrl(item.url)) ?? [], ...(blogDates.get(blogUrl(item.url)) ? { lastmod: blogDates.get(blogUrl(item.url)) } : {}) }),
    }),
    { name: 'blog-link-guard', hooks: { 'astro:build:done': async ({ dir }) => { await validateBlogOutput(fileURLToPath(dir), blogManifest); } } },
    // Por último: confere o dist/ já com sitemap e Markdown gerados. Falha o build se algo citar /para/.
    sectorIsolation(),
  ],
});
