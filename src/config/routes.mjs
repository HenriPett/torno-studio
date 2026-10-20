// Fonte única das rotas e dos idiomas. Em .mjs porque o astro.config.mjs também importa.
// Tipos em routes.d.mts.

export const locales = /** @type {const} */ (['pt-BR', 'en']);
export const defaultLocale = 'pt-BR';

/**
 * Páginas por idioma; os slugs podem diferir. Sempre com barra final.
 * `null` = a página não existe naquele idioma (o seletor leva à home do idioma; sem hreflang).
 */
export const routes = {
  blog: { 'pt-BR': '/blog/', en: '/en/blog/' },
  home: { 'pt-BR': '/', en: '/en/' },
  about: { 'pt-BR': '/about/', en: '/en/about/' },
  contact: { 'pt-BR': '/contact/', en: '/en/contact/' },
  recovery: { 'pt-BR': '/recuperacao-de-projeto/', en: '/en/software-project-rescue/' },
  lovableProduction: { 'pt-BR': '/lovable-em-producao/', en: '/en/lovable-to-production/' },
  rlsGuide: { 'pt-BR': '/guias/rls-multiempresa/', en: '/en/guides/multi-tenant-rls/' },
  caseLoopt: { 'pt-BR': '/cases/loopt/', en: '/en/cases/loopt/' },
  caseAscende: { 'pt-BR': '/cases/ascende/', en: '/en/cases/ascende/' },
  caseBomCapital: { 'pt-BR': '/cases/bom-capital/', en: '/en/cases/bom-capital/' },
  privacy: { 'pt-BR': '/privacidade/', en: '/en/privacy/' },
  // Landing da campanha do Google Ads (docs/landing/DIAGNOSTICO-SPEC.md): só PT.
  diagnostico: { 'pt-BR': '/diagnostico/', en: null },
};

/**
 * Landings de campanha: meta robots "noindex, follow" (o AdsBot rastreia; o robots.txt não bloqueia),
 * fora do sitemap, sem canonical e sem hreflang.
 */
export const campaignRoutes = /** @type {const} */ (['diagnostico']);
