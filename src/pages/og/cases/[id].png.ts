import type { APIRoute, GetStaticPaths } from 'astro';
import { caseSlugs, caseStudies, casesIndex, type CaseSlug } from '../../../content/cases';
import { locales, type Locale } from '../../../lib/i18n';
import { renderOgImage } from '../../../lib/og-image';

// Um PNG por case e idioma (`loopt-pt-BR`) e um para o índice (`index-pt-BR`).
export const getStaticPaths = (() =>
  locales.flatMap((locale) => [
    { params: { id: `index-${locale}` }, props: { locale, slug: null } },
    ...caseSlugs.map((slug) => ({ params: { id: `${slug}-${locale}` }, props: { locale, slug } })),
  ])) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const locale = props.locale as Locale;
  const slug = props.slug as CaseSlug | null;
  const lines: [string, string, string] = slug
    ? [`{brand} · ${caseStudies[locale][slug].name}`, caseStudies[locale][slug].title, caseStudies[locale][slug].facts.evidence]
    : casesIndex[locale].ogLines;
  const png = await renderOgImage(locale, lines);
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
