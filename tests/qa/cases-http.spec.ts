import { expect, test } from '@playwright/test';

/**
 * Cases (estratégia 2026-11 §5/§6): SEO por página, OG 1200×630, honestidade das métricas e saída para o diagnóstico.
 * Roda contra o build servido pelo config em uso (baseURL). A origem canônica vem do próprio HTML, então o
 * teste vale para build local (localhost) e de produção (PUBLIC_SITE_URL=https://tornostudio.com).
 * Com QA_INDEXING=true (build com PUBLIC_ALLOW_INDEXING=true) também confere que não há noindex.
 */
const LOOPT_CLIENTS = /Deicmar|Ecoporto|TBSA|Santos Brasil|Bandeirantes/i;
const footnote = {
  'pt-BR': 'Experiência profissional de quem conduz a Torno, anterior à empresa; não é uma contratação da Torno.',
  en: 'Professional experience of the person who leads Torno, predating the company; not a Torno engagement.',
};

for (const slug of ['loopt', 'bom-capital', 'ascende']) {
  for (const locale of ['pt-BR', 'en'] as const) {
    const path = `${locale === 'en' ? '/en' : ''}/cases/${slug}/`;
    test(`${path}: SEO, fonte, imagem e saída para o diagnóstico`, async ({ request }) => {
      const response = await request.get(path);
      expect(response.status()).toBe(200);
      const html = await response.text();
      const canonical = html.match(/rel="canonical" href="([^"]+)"/)?.[1];
      expect(canonical).toBeTruthy();
      const origin = new URL(canonical!).origin;
      expect(canonical).toBe(origin + path);
      expect(html).toContain(`hreflang="pt-BR" href="${origin}/cases/${slug}/"`);
      expect(html).toContain(`hreflang="en" href="${origin}/en/cases/${slug}/"`);
      if (process.env.QA_INDEXING === 'true') expect(html).not.toMatch(/<meta name="robots" content="noindex/);
      expect(html.match(/<h1\b/g)).toHaveLength(1);
      expect(html).toContain('data-booking-cta');
      if (process.env.PUBLIC_BOOKING_URL) expect(html).toContain(process.env.PUBLIC_BOOKING_URL);
      expect(html).toContain(`href="${locale === 'en' ? '/en' : ''}/cases/"`);
      expect(html).not.toContain('href="/para/');
      // Marca "Torno" sem "Studio" no conteúdo (o domínio tornostudio.com e a URL do LinkedIn ficam).
      expect(html.match(/<main[\s\S]*<\/main>/)?.[0]).not.toMatch(/\bstudio\b/i);
      expect(html).not.toMatch(/−41%|−31%|-41%|-31%/);
      expect(html).not.toMatch(LOOPT_CLIENTS);

      const og = html.match(/property="og:image" content="([^"]+)"/)![1]!;
      expect(og).toBe(`${origin}/og/cases/${slug}-${locale}.png`);
      const image = await request.get(new URL(og).pathname);
      expect(image.status()).toBe(200);
      const png = await image.body();
      expect([png.readUInt32BE(16), png.readUInt32BE(20)]).toEqual([1200, 630]);
      const sitemap = await (await request.get('/sitemap-0.xml')).text();
      expect(sitemap).toContain(origin + path);

      if (slug === 'bom-capital') {
        expect(html).toContain('48 h');
        expect(html).toContain('&lt; 2 h');
        expect(html).toContain('chart-bar--bound');
        expect(html).toContain(locale === 'en' ? 'upper bound' : 'limite superior');
        expect(html).toContain(locale === 'en' ? 'no external publication' : 'sem publicação externa');
        expect(html).toContain(locale === 'en' ? 'account of the person who led the work' : 'relato de quem conduziu o projeto');
        expect(html).toContain(footnote[locale]);
      } else if (slug === 'loopt') {
        expect(html).toContain('https://mundologistica.com.br/noticias/loopt-ia-terminais-de-conteineres');
        expect(html).toContain('−27%');
        expect(html).toContain('+21%');
        expect(html).toContain(locale === 'en' ? 'According to Loopt' : 'Segundo a Loopt');
        expect(html).toContain(footnote[locale]);
      } else {
        expect(html).toContain('https://ascende.site/');
        expect(html).toContain(locale === 'en' ? 'fictional data' : 'dados fictícios');
        expect(html).toContain(locale === 'en' ? 'Own project' : 'Projeto próprio');
        expect(html).not.toMatch(locale === 'en' ? /Ascende (is|was) a client/i : /cliente da Torno/i);
      }
    });
  }
}

test('home PT/EN liga cada card ao case e a campanha não sai para os cases', async ({ request }) => {
  for (const prefix of ['', '/en']) {
    const html = await (await request.get(prefix + '/')).text();
    for (const slug of ['loopt', 'bom-capital', 'ascende']) expect(html).toContain(`href="${prefix}/cases/${slug}/"`);
  }
  const campaign = await (await request.get('/diagnostico/')).text();
  expect(campaign).not.toContain('href="/cases/');
  expect(campaign).toContain('noindex, follow');
});
