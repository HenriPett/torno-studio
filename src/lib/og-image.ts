/**
 * OG image 1200×630 por idioma, gerada no build (DESIGN §6.15). A marca é variável (SITE_BRAND),
 * então a imagem não pode ser estática: o texto vem de SiteCopy.og.imageLines e da config.
 * Satori não lê fonte variável nem woff2: usa os pesos estáticos .woff do @fontsource/ibm-plex-sans.
 */
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { Resvg } from '@resvg/resvg-js';
import satori from 'satori';

import { fill, getCopy, type Locale } from './i18n';

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

// Valores do tema claro de src/styles/tokens.css (a OG é sempre light).
const COLOR_BG = '#f7f6f2';
const COLOR_TEXT = '#16181a';
const COLOR_ACCENT_TEXT = '#1c5a49';

const fontDir = join(process.cwd(), 'node_modules/@fontsource/ibm-plex-sans/files');
const loadFont = (weight: 500 | 700) => readFile(join(fontDir, `ibm-plex-sans-latin-${weight}-normal.woff`));

type Node = { type: string; props: Record<string, unknown> };
const div = (style: Record<string, unknown>, children: string | Node | Node[]): Node => ({
  type: 'div',
  props: { style, children },
});

/** Impede quebra de linha dentro de intervalos como "6–10" (word joiner U+2060 em volta do traço). */
const keepRangesTogether = (text: string) => text.replace(/(\d)\s*([–-])\s*(\d)/g, '$1\u2060$2\u2060$3');

export async function renderOgImage(locale: Locale, lines?: [string, string, string]): Promise<Uint8Array> {
  const [brandLine, headline, footer] = (lines ?? getCopy(locale).og.imageLines).map((line) => keepRangesTogether(fill(line)));
  const [medium, bold] = await Promise.all([loadFont(500), loadFont(700)]);

  const tree = div(
    {
      width: OG_WIDTH,
      height: OG_HEIGHT,
      padding: 72,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: COLOR_BG,
      color: COLOR_TEXT,
      fontFamily: 'IBM Plex Sans',
    },
    [
      div({ display: 'block', maxWidth: 1056, fontSize: 40, fontWeight: 700, lineHeight: 1.2, lineClamp: 2 }, brandLine ?? ''),
      div({ display: 'block', maxWidth: 900, fontSize: 56, fontWeight: 700, lineHeight: 1.15, lineClamp: 4 }, headline ?? ''),
      div({ display: 'block', fontSize: 28, fontWeight: 500, color: COLOR_ACCENT_TEXT }, footer ?? ''),
    ],
  );

  const svg = await satori(tree as Parameters<typeof satori>[0], {
    width: OG_WIDTH,
    height: OG_HEIGHT,
    fonts: [
      { name: 'IBM Plex Sans', data: medium, weight: 500, style: 'normal' },
      { name: 'IBM Plex Sans', data: bold, weight: 700, style: 'normal' },
    ],
  });
  return new Resvg(svg, { fitTo: { mode: 'width', value: OG_WIDTH } }).render().asPng();
}
