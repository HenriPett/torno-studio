import { expect, test, type APIRequestContext } from './fixtures';

import { NOT_FOUND, PAGES } from './helpers';

/**
 * hreflang, canonical, sitemap, robots, lang, noindex e OG (CHECKLIST.md §S).
 * QA_INDEXING=true -> espera página indexável (build de produção/lhci); senão espera noindex (preview).
 */

const indexing = process.env.QA_INDEXING === 'true';

/**
 * Host esperado em canonical/hreflang/og no ar. Padrão = host testado (QA_BASE_URL). QA_CANONICAL_ORIGIN
 * cobre o artefato do deploy via CLI da Netlify (DEPLOY_PRIME_URL = https://main--<site>.netlify.app).
 */
const expectedOrigin = process.env.QA_CANONICAL_ORIGIN ?? (process.env.QA_BASE_URL ? new URL(process.env.QA_BASE_URL).origin : null);

async function headOf(request: APIRequestContext, path: string): Promise<string> {
  const res = await request.get(path);
  expect(res.status(), path).toBe(200);
  return (await res.text()).split('</head>')[0] ?? '';
}

const attr = (html: string, re: RegExp): string[] => [...html.matchAll(re)].map((m) => m[1] ?? '');

for (const p of PAGES) {
  test.describe(p.path, () => {
    test('S1 canonical absoluto e auto-referente; lang correto', async ({ request }) => {
      const head = await headOf(request, p.path);
      const canon = attr(head, /<link rel="canonical" href="([^"]+)"/g);
      expect(canon).toHaveLength(1);
      expect(canon[0]).toMatch(/^https?:\/\//);
      expect(new URL(canon[0]!).pathname).toBe(p.path);
      // No preview, URLs absolutas apontam para o próprio deploy (não localhost nem outro host).
      if (expectedOrigin) expect(new URL(canon[0]!).origin).toBe(expectedOrigin);
      expect(head).toContain(`<html lang="${p.lang}"`);
    });

    test('S2 hreflang recíproco (pt-BR, en, x-default -> en)', async ({ request }) => {
      const head = await headOf(request, p.path);
      const alts = Object.fromEntries(
        [...head.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map((m) => [m[1], m[2]]),
      );
      expect(Object.keys(alts).sort()).toEqual(['en', 'pt-BR', 'x-default']);
      expect(alts['x-default']).toBe(alts.en);
      if (expectedOrigin) {
        for (const href of Object.values(alts)) expect(new URL(String(href)).origin).toBe(expectedOrigin);
      }
      const self = attr(head, /<link rel="canonical" href="([^"]+)"/g)[0];
      expect(alts[p.lang]).toBe(self);
      // Recíproco: a página alternativa aponta de volta para esta.
      const other = p.lang === 'en' ? alts['pt-BR'] : alts.en;
      const otherHead = await headOf(request, new URL(other ?? '').pathname);
      expect(otherHead).toContain(`hreflang="${p.lang}" href="${self}"`);
    });

    test(`S3 robots meta: ${indexing ? 'indexável' : 'noindex (preview)'}`, async ({ request }) => {
      const head = await headOf(request, p.path);
      const robots = attr(head, /<meta name="robots" content="([^"]+)"/g);
      if (indexing) expect(robots).toEqual([]);
      else expect(robots.join()).toMatch(/noindex/);
    });

    test('S4 title, description e OG por idioma', async ({ request }) => {
      const head = await headOf(request, p.path);
      const title = attr(head, /<title>([^<]*)<\/title>/g)[0] ?? '';
      expect(title.length).toBeGreaterThan(10);
      const desc = attr(head, /<meta name="description" content="([^"]+)"/g)[0] ?? '';
      expect(desc.length, 'description entre 50 e 155').toBeGreaterThanOrEqual(50);
      expect(desc.length).toBeLessThanOrEqual(155);
      expect(head).toContain(`<meta property="og:locale" content="${p.lang === 'en' ? 'en_US' : 'pt_BR'}"`);
      for (const prop of ['og:title', 'og:description', 'og:site_name', 'og:url']) {
        expect(head, prop).toMatch(new RegExp(`<meta property="${prop}" content="[^"]+"`));
      }
    });

    test('S5 og:image 1200×630 PNG existe e responde 200', async ({ request }) => {
      const head = await headOf(request, p.path);
      const img = attr(head, /<meta property="og:image" content="([^"]+)"/g)[0];
      expect(img, 'og:image ausente (DESIGN §6.15)').toBeTruthy();
      if (expectedOrigin) expect(new URL(img!).origin).toBe(expectedOrigin);
      const res = await request.get(new URL(img!).pathname);
      expect(res.status()).toBe(200);
      const buf = await res.body();
      // IHDR do PNG: largura e altura em big-endian nos bytes 16..23.
      expect(buf.subarray(1, 4).toString()).toBe('PNG');
      expect([buf.readUInt32BE(16), buf.readUInt32BE(20)]).toEqual([1200, 630]);
      expect(head).toMatch(/<meta property="og:image:alt" content="[^"]+"/);
    });
  });
}

test('S6 404: status 404, noindex, sem canonical/hreflang, links para / e /en/', async ({ page }) => {
  const res = await page.goto(NOT_FOUND.path);
  expect(res?.status()).toBe(404);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  await expect(page.locator('main a[href="/"]')).toHaveCount(1);
  await expect(page.locator('main a[href="/en/"]')).toHaveCount(1);
});

test('S7 sitemap = 10 URLs canônicas, sem a campanha, cada uma com alternates', async ({ request }) => {
  const index = await (await request.get('/sitemap-index.xml')).text();
  const maps = attr(index, /<loc>([^<]+)<\/loc>/g);
  expect(maps.length).toBeGreaterThan(0);
  const locs: string[] = [];
  for (const map of maps) {
    const xml = await (await request.get(new URL(map).pathname)).text();
    for (const block of xml.split('<url>').slice(1)) {
      const loc = attr(block, /<loc>([^<]+)<\/loc>/g)[0];
      locs.push(new URL(loc ?? '').pathname);
      const langs = attr(block, /hreflang="([^"]+)"/g).sort();
      expect(langs, loc).toEqual(['en', 'pt-BR', 'x-default']);
    }
  }
  expect(locs.sort()).toEqual([
    ...PAGES.map((p) => p.path),
    '/recuperacao-de-projeto/', '/en/software-project-rescue/',
    '/lovable-em-producao/', '/en/lovable-to-production/',
    '/guias/rls-multiempresa/', '/en/guides/multi-tenant-rls/',
  ].sort());
});

test('S8 robots.txt permite rastreio e aponta o sitemap absoluto', async ({ request }) => {
  const robots = await (await request.get('/robots.txt')).text();
  expect(robots).toMatch(/User-agent: \*/);
  expect(robots).not.toMatch(/Disallow: \/\s*$/m);
  expect(robots).toMatch(/Sitemap: https?:\/\/[^\s]+\/sitemap-index\.xml/);
});

test('S9 seletor de idioma em cada página leva à equivalente', async ({ page }) => {
  for (const p of PAGES) {
    await page.goto(p.path);
    const target = p.lang === 'en' ? 'pt-BR' : 'en';
    const link = page.locator(`header a[hreflang="${target}"]`);
    await expect(link).toHaveCount(1);
    const href = await link.getAttribute('href');
    const res = await page.request.get(href!);
    expect(res.status(), `${p.path} -> ${href}`).toBe(200);
  }
});
