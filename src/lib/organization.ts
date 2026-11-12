import { site } from '../config/site';
import type { Locale } from './i18n';

/**
 * Descrição institucional (estratégia 2026-11 §2 e §5): categoria e cidade de operação, sem número de
 * funcionários, clientes, avaliações ou certificações.
 */
export const organizationDescription: Record<Locale, string> = {
  'pt-BR': 'IA e software sob medida para a indústria. A Torno junta os dados e o conhecimento da operação e implanta agentes de IA por etapas, a partir de Jaraguá do Sul, SC.',
  en: 'Custom AI and software for industrial companies. Torno brings operational data and know-how together and deploys AI agents in stages, operating from Jaraguá do Sul, SC, Brazil.',
};

/** Descrição do site (WebSite) no JSON-LD. */
export const websiteDescription: Record<Locale, string> = {
  'pt-BR': 'Site da Torno: IA e software sob medida para indústrias, como trabalhamos, cases e artigos.',
  en: 'Torno website: custom AI and software for industrial companies, how we work, case studies and articles.',
};

export function organizationSchema(origin: URL, locale: Locale) {
  const url = new URL('/', origin).href;
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${url}#organization`,
    name: site.organizationName,
    url,
    description: organizationDescription[locale].replace(/Torno/g, site.organizationName),
    knowsAbout: locale === 'en'
      ? ['Applied AI for manufacturing', 'AI agents', 'Custom software', 'Systems integration', 'Industrial operations']
      : ['IA aplicada à indústria', 'Agentes de IA', 'Software sob medida', 'Integração de sistemas', 'Operação industrial'],
    sameAs: [site.organizationLinkedinUrl],
    founder: { '@id': new URL('/autores/henrique-pett/#person', origin).href, '@type': 'Person', name: 'Henrique Pett', sameAs: [site.linkedinUrl, site.githubUrl] },
    ...(site.contactEmail ? { email: site.contactEmail, contactPoint: {
      '@type': 'ContactPoint', email: site.contactEmail, contactType: 'sales',
      url: new URL(locale === 'en' ? '/en/contact/' : '/contact/', origin).href,
      availableLanguage: ['Portuguese', 'English'],
    } } : {}),
    // Cidade de onde a operação é conduzida; não é sede nem endereço de atendimento presencial.
    location: {
      '@type': 'Place', name: locale === 'en' ? 'Operations base' : 'Base da operação',
      address: { '@type': 'PostalAddress', addressLocality: site.operatingLocation.city,
        addressRegion: site.operatingLocation.region, addressCountry: site.operatingLocation.country },
    },
    areaServed: { '@type': 'Country', name: locale === 'en' ? 'Brazil' : 'Brasil' },
  };
}
