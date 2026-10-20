import { site } from '../config/site';
import type { Locale } from './i18n';

export function organizationSchema(origin: URL, description: string, locale: Locale) {
  const url = new URL('/', origin).href;
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${url}#organization`,
    name: site.organizationName,
    url,
    description,
    sameAs: [site.organizationLinkedinUrl],
    founder: { '@type': 'Person', name: 'Henrique Pett', sameAs: [site.linkedinUrl, site.githubUrl] },
    ...(site.contactEmail ? { email: site.contactEmail, contactPoint: {
      '@type': 'ContactPoint', email: site.contactEmail, contactType: 'sales',
      url: new URL(locale === 'en' ? '/en/contact/' : '/contact/', origin).href,
      availableLanguage: ['Portuguese', 'English'],
    } } : {}),
    location: {
      '@type': 'Place', name: 'Operação remota do fundador',
      address: { '@type': 'PostalAddress', addressLocality: site.operatingLocation.city,
        addressRegion: site.operatingLocation.region, addressCountry: site.operatingLocation.country },
    },
  };
}
