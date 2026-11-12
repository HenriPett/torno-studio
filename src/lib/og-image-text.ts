import type { Locale } from './i18n';

/**
 * Texto da OG padrão (/og/<locale>.png) e do og:image:alt correspondente, no posicionamento de 2026-11
 * (estratégia §2). Separado de og-image.ts para o Base.astro não importar satori/resvg.
 * {brand} é trocado por SITE_BRAND (lib/i18n fill).
 */
export const defaultOgImage: Record<Locale, { lines: [string, string, string]; alt: string }> = {
  'pt-BR': {
    lines: [
      '{brand} · IA e software para a indústria',
      'IA aplicada à operação industrial, desenhada para a sua fábrica.',
      'Implantação por etapas, a partir de Jaraguá do Sul, SC.',
    ],
    alt: '{brand}: IA aplicada à operação industrial, desenhada para a sua fábrica e implantada por etapas.',
  },
  en: {
    lines: [
      '{brand} · AI and software for industry',
      'AI applied to industrial operations, designed for your plant.',
      'Deployed in stages, from Jaraguá do Sul, Brazil.',
    ],
    alt: '{brand}: AI applied to industrial operations, designed for your plant and deployed in stages.',
  },
};
