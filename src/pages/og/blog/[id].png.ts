import type { APIRoute, GetStaticPaths } from 'astro';
import { publicBlogEntries } from '../../../lib/blog';
import { locales, type Locale } from '../../../lib/i18n';
import { renderOgImage } from '../../../lib/og-image';

export const getStaticPaths = (async () => {
  const groups = await Promise.all(locales.map(locale => publicBlogEntries(locale)));
  return groups.flat().map(({meta}) => ({
    params: { id: `${meta.locale}-${meta.slug}` },
    props: { locale: meta.locale, headline: meta.data.h1, author: meta.data.author_name },
  }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({props}) => {
  const png = await renderOgImage(props.locale as Locale, [
    '{brand} · Blog', props.headline,
    props.author || (props.locale === 'en' ? 'Custom software and integrations' : 'Software sob medida e integrações'),
  ]);
  return new Response(new Uint8Array(png), {headers: {'Content-Type':'image/png'}});
};
