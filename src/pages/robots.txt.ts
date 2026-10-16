import type { APIRoute } from 'astro';

// Sempre "Allow": a não indexação de preview é feita por <meta name="robots" content="noindex">,
// que o crawler só lê se puder rastrear a página.
export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL('/sitemap-index.xml', site).href;
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
