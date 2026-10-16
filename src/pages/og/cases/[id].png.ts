import type { APIRoute, GetStaticPaths } from 'astro';
import { caseStudies, type CaseSlug } from '../../../content/cases';
import { locales, type Locale } from '../../../lib/i18n';
import { renderOgImage } from '../../../lib/og-image';
export const getStaticPaths = (() => locales.flatMap(locale => Object.keys(caseStudies[locale]).map(slug => ({params:{id:`${slug}-${locale}`},props:{locale,slug}})))) satisfies GetStaticPaths;
export const GET: APIRoute = async ({ props }) => {
 const locale = props.locale as Locale;
 const c = caseStudies[locale][props.slug as CaseSlug];
 const png = await renderOgImage(locale,[`{brand} · ${c.name}`,c.title,c.evidence]);
 return new Response(new Uint8Array(png),{headers:{'Content-Type':'image/png'}});
};
