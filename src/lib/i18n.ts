import { campaignRoutes, defaultLocale, locales, routes, type Locale, type RouteId } from '../config/routes.mjs';
import { site, SITE_BRAND } from '../config/site';
import { en } from '../content/en';
import { ptBR } from '../content/pt-BR';
import type { SiteCopy } from '../content/types';

export { defaultLocale, locales, routes };
export type { Locale, RouteId };

const copies: Record<Locale, SiteCopy> = { 'pt-BR': ptBR, en };

export function getCopy(locale: Locale): SiteCopy {
  return copies[locale];
}

/** Valor de <html lang> e hreflang. */
export const htmlLang: Record<Locale, string> = { 'pt-BR': 'pt-BR', en: 'en' };

/** Valor de og:locale. */
export const ogLocale: Record<Locale, string> = { 'pt-BR': 'pt_BR', en: 'en_US' };

export const otherLocale = (locale: Locale): Locale => (locale === 'pt-BR' ? 'en' : 'pt-BR');

/** Troca {chave} pelos valores; {brand} é sempre SITE_BRAND. */
export function fill(template: string, vars: Record<string, string | number> = {}): string {
  const all: Record<string, string | number> = { brand: SITE_BRAND, ...vars };
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in all ? String(all[key]) : match));
}

/** Caminho da página no idioma; se ela não existir nele (ex.: /diagnostico/ em EN), a home do idioma. */
export function pathFor(routeId: RouteId, locale: Locale): string {
  return routes[routeId][locale] ?? (routes.home[locale] as string);
}

/** Landing de campanha: noindex,follow, sem canonical, sem hreflang, fora do sitemap (routes.mjs). */
export const isCampaignRoute = (routeId: RouteId): boolean => campaignRoutes.includes(routeId);

export interface Alternate {
  hreflang: string;
  href: string;
}

/**
 * hreflang de cada idioma + x-default (-> EN, público internacional). URLs absolutas.
 * Vazio se a página não existir em todos os idiomas ou for landing de campanha.
 */
export function alternatesFor(routeId: RouteId, site: URL): Alternate[] {
  if (isCampaignRoute(routeId) || locales.some((locale) => !routes[routeId][locale])) return [];
  const list = locales.map((locale) => ({
    hreflang: htmlLang[locale],
    href: new URL(pathFor(routeId, locale), site).href,
  }));
  list.push({ hreflang: 'x-default', href: new URL(pathFor(routeId, 'en'), site).href });
  return list;
}

/**
 * Destino do CTA de agenda. Sem PUBLIC_BOOKING_URL, aponta para a âncora #agendar da home do idioma,
 * para o link não quebrar em páginas internas (privacidade).
 */
export function bookingHref(locale: Locale): string {
  return site.bookingUrl ?? `${pathFor('home', locale)}#agendar`;
}
