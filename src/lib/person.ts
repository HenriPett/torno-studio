import { site } from '../config/site';
import { pathFor, type Locale } from './i18n';

export function personSchema(origin: URL, locale: Locale) {
  return {
    '@type': 'Person',
    '@id': new URL('/autores/henrique-pett/#person', origin).href,
    name: 'Henrique Pett',
    url: new URL(pathFor('author', locale), origin).href,
    jobTitle: 'Product Engineer',
    description: locale === 'en'
      ? 'Product Engineer leading Torno Studio, building custom web software, integrations and AI applications from discovery to production.'
      : 'Product Engineer à frente da Torno Studio, com atuação em software web sob medida, integrações e aplicações com IA, da descoberta à produção.',
    sameAs: [site.linkedinUrl, site.githubUrl],
    worksFor: { '@id': new URL('/#organization', origin).href, '@type': 'Organization', name: site.organizationName },
  };
}
