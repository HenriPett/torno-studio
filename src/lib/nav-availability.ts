/**
 * TRANSITÓRIO (refatoração 2026-11): o header/footer novos apontam para páginas e âncoras que outros
 * fluxos ainda estão criando (/como-trabalhamos/, /cases/, /#solucoes…). O guard de links do blog
 * (astro.config.mjs → validateBlogOutput) quebra o build se um link do chrome não existir.
 *
 * Este módulo esconde, NO BUILD, um item de navegação cujo destino ainda não existe:
 *  - página: existe arquivo em src/pages para o caminho (x.astro ou x/index.astro);
 *  - âncora: o id aparece como literal ("id" ou 'id') em algum .astro/.ts de src/components,
 *    src/pages ou src/content (exceto o próprio chrome.ts).
 * Quando todas as páginas e âncoras existirem, o filtro vira no-op. Depois da refatoração, remova
 * este módulo e o uso dele em Header.astro/Footer.astro.
 */

const pageFiles = new Set(Object.keys(import.meta.glob('/src/pages/**/*.{astro,md,mdx,ts}')));

const sources = import.meta.glob<string>(
  ['/src/components/**/*.astro', '/src/pages/**/*.astro', '/src/content/*.ts', '/src/content/**/*.ts', '!/src/content/chrome.ts', '!/src/content/blog/**'],
  { query: '?raw', import: 'default', eager: true },
);
const sourceText = Object.values(sources).join('\n');

/** true se há uma página em src/pages que gera este caminho estático (ex.: "/en/how-we-work/"). */
export function pageExists(path: string): boolean {
  const clean = path.replace(/^\/|\/$/g, '');
  if (!clean) return pageFiles.has('/src/pages/index.astro');
  return ['.astro', '/index.astro', '.md', '/index.md'].some((ext) => pageFiles.has(`/src/pages/${clean}${ext}`));
}

/** true se o id da âncora aparece como literal em algum fonte (heurística de transição). */
export function anchorExists(id: string): boolean {
  return sourceText.includes(`"${id}"`) || sourceText.includes(`'${id}'`) || sourceText.includes(`\`${id}\``);
}

/** Href navegável hoje? */
export function hrefAvailable(href: string): boolean {
  const [path = '/', hash] = href.split('#');
  return pageExists(path) && (!hash || anchorExists(hash));
}
