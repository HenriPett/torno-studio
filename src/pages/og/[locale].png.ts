import type { APIRoute, GetStaticPaths } from 'astro';

import { locales, type Locale } from '../../lib/i18n';
import { renderOgImage } from '../../lib/og-image';

// Gera dist/og/pt-BR.png e dist/og/en.png no build (rota referenciada pelo Base.astro).
export const getStaticPaths = (() => locales.map((locale) => ({ params: { locale } }))) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ params }) => {
  const png = await renderOgImage(params.locale as Locale);
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
