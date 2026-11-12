import { site } from '../config/site';
import { pathFor, type Locale } from './i18n';

export function personSchema(origin: URL, locale: Locale) {
  return {
    '@type': 'Person',
    '@id': new URL('/autores/henrique-pett/#person', origin).href,
    name: 'Henrique Pett',
    url: new URL(pathFor('author', locale), origin).href,
    jobTitle: locale === 'en' ? 'Founder and technical lead' : 'Fundador e líder técnico',
    description: locale === 'en'
      ? `Founder and technical lead of ${site.organizationName}, which builds custom AI and software for industrial companies. Background in machine learning engineering and AI product management.`
      : `Fundador e líder técnico da ${site.organizationName}, que desenvolve IA e software sob medida para a indústria. Experiência em engenharia de machine learning e gestão de produto de IA.`,
    sameAs: [site.linkedinUrl, site.githubUrl],
    worksFor: { '@id': new URL('/#organization', origin).href, '@type': 'Organization', name: site.organizationName },
  };
}
