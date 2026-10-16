import { expect, test } from '@playwright/test';

const base = process.env.CASES_BASE_URL ?? 'http://127.0.0.1:4332';
const origin = 'https://tornostudio.com';
for (const slug of ['loopt', 'bom-capital', 'ascende']) {
  for (const locale of ['pt-BR', 'en']) {
    const path = `${locale === 'en' ? '/en' : ''}/cases/${slug}/`;
    test(`${path}: SEO, fonte, imagem e saída para contratação`, async ({ request }) => {
      const response = await request.get(base + path);
      expect(response.status()).toBe(200);
      const html = await response.text();
      expect(html).toContain(`rel="canonical" href="${origin}${path}"`);
      expect(html).toContain(`hreflang="pt-BR" href="${origin}/cases/${slug}/"`);
      expect(html).toContain(`hreflang="en" href="${origin}/en/cases/${slug}/"`);
      expect(html).not.toMatch(/<meta name="robots" content="noindex/);
      expect(html.match(/<h1\b/g)).toHaveLength(1);
      expect(html).toContain('https://calendly.com/henriquepett/45min');
      const og = html.match(/property="og:image" content="([^"]+)"/)![1]!;
      expect(og).toBe(`${origin}/og/cases/${slug}-${locale}.png`);
      const image = await request.get(base + new URL(og).pathname);
      expect(image.status()).toBe(200);
      const png = await image.body();
      expect([png.readUInt32BE(16),png.readUInt32BE(20)]).toEqual([1200,630]);
      const sitemap = await (await request.get(base + '/sitemap-0.xml')).text();
      expect(sitemap).toContain(origin + path);
      if(slug === 'bom-capital') {
        expect(html).toContain('48 h');
        expect(html).toContain('&lt; 2 h');
        expect(html).toContain('chart-bar--bound');
        expect(html).toContain(locale === 'en' ? 'upper bound' : 'limite superior');
        expect(html).toContain(locale === 'en' ? 'no external publication' : 'sem publicação externa');
      } else if(slug === 'loopt') {
        expect(html).toContain('https://mundologistica.com.br/noticias/loopt-ia-terminais-de-conteineres');
        expect(html).toContain('−27%');
        expect(html).toContain('+21%');
        expect(html).not.toMatch(/−41%|−31%/);
      } else {
        expect(html).toContain('https://ascende.site/');
        expect(html).toContain(locale === 'en' ? 'fictional data' : 'dados fictícios');
      }
    });
  }
}

test('home PT/EN liga cada card ao case e fontes continuam separadas', async ({ request }) => {
  for(const prefix of ['', '/en']) {
    const html = await (await request.get(base + prefix + '/')).text();
    for(const slug of ['loopt','bom-capital','ascende']) expect(html).toContain(`href="${prefix}/cases/${slug}/"`);
  }
  const campaign = await (await request.get(base + '/diagnostico/')).text();
  expect(campaign).not.toContain('href="/cases/');
  expect(campaign).toContain('noindex, follow');
});
