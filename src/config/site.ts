/**
 * Placeholders que dependem do fundador (PLANO-DEV §1.3). Tudo vem de env PUBLIC_*.
 * Nenhum componente lê import.meta.env direto: importe daqui.
 */

import { GADS_ID } from './gads';

const env = import.meta.env;

const str = (value: string | undefined): string => (value ?? '').trim();
const flag = (value: string | undefined): boolean => str(value).toLowerCase() === 'true';

const BRAND_PLACEHOLDER = '[Marca]';

/**
 * Marca: fonte única para header, footer, <title>, meta e OG (PLANO-DEV §5.4, D1).
 * Nunca escreva a marca à mão em componente ou copy; use SITE_BRAND ou o token {brand}.
 */
export const SITE_BRAND: string = str(env.PUBLIC_SITE_BRAND) || BRAND_PLACEHOLDER;

const bookingUrl = str(env.PUBLIC_BOOKING_URL);
const contactEmail = str(env.PUBLIC_CONTACT_EMAIL);
const legalName = str(env.PUBLIC_LEGAL_NAME);
const legalId = str(env.PUBLIC_LEGAL_ID);

export const site = {
  brand: SITE_BRAND,
  organizationName: SITE_BRAND === 'Torno' ? 'Torno Studio' : SITE_BRAND,
  organizationLinkedinUrl: 'https://www.linkedin.com/company/torno-studio-software/',
  // Cidade da operação remota declarada pelo fundador; não é sede ou endereço postal.
  operatingLocation: { city: 'Jaraguá do Sul', region: 'SC', country: 'BR' },
  /** URL absoluta do site, resolvida no astro.config.mjs (PUBLIC_SITE_URL > Netlify URL/DEPLOY_PRIME_URL > localhost). */
  url: import.meta.env.SITE,

  /** Link do diagnóstico de 45 min. Componentes usam bookingHref(locale) (lib/i18n), que cai em /#agendar se vazio. O build de produção falha se vazio. */
  bookingUrl: bookingUrl || null,

  /**
   * Obrigatório em produção (astro.config.mjs). null (preview/dev) -> e-mail oculto e a privacidade
   * usa o LinkedIn como contato. Sem default de propósito: nunca publicar um e-mail não confirmado.
   */
  contactEmail: contactEmail || null,

  /** Defaults do currículo (projeto-50k/base/); confirmação pendente (F6). */
  linkedinUrl: str(env.PUBLIC_LINKEDIN_URL) || 'https://www.linkedin.com/in/henrique-pett',
  githubUrl: str(env.PUBLIC_GITHUB_URL) || 'https://github.com/HenriPett',

  /**
   * Controlador dos dados na página de privacidade (F9). null -> linha oculta.
   * O build avisa se faltar e falha em CONTEXT=production (astro.config.mjs).
   */
  legalEntity: legalName && legalId ? { name: legalName, id: legalId } : null,

  /** false -> "produto de IA para operação de terminais de contêiner", sem o nome (BRIEFING §3, regra 3). */
  looptAuthorized: flag(env.PUBLIC_LOOPT_AUTHORIZED),

  /** Google Ads: fonte em config/gads.ts (também usada no cliente pelo consent.ts). */
  gadsId: GADS_ID,

  /** false -> seção de depoimentos/logos não é renderizada (BRIEFING §3, regra 5). */
  showTestimonials: flag(env.PUBLIC_SHOW_TESTIMONIALS),

  /** Só "true" libera indexação; qualquer outro valor gera <meta name="robots" content="noindex">. */
  allowIndexing: flag(env.PUBLIC_ALLOW_INDEXING),
} as const;

export type SiteConfig = typeof site;
