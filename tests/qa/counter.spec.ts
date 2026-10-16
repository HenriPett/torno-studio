import { execFileSync } from 'node:child_process';

import { expect, test, type APIRequestContext } from '@playwright/test';

/**
 * Contador sem cookie da /diagnostico/ (docs/infra/CONTADOR-DIAGNOSTICO.md; CHECKLIST.md §B3).
 * Só no ar. Leitura do Blobs pela Netlify CLI logada (site vinculado em .netlify/state.json).
 *   QA_BASE_URL=<url>                -> casos de header/cookie, TTFB e política
 *   QA_COUNTER=production            -> casos que exigem incremento (o contador só conta em production)
 *   QA_COUNTER=preview               -> o preview NÃO pode incrementar
 * Toda visita que o QA faz e que conta fica registrada nas annotations (para descontar do total do dia).
 */

const BASE = process.env.QA_BASE_URL;
const MODE = process.env.QA_COUNTER; // 'production' | 'preview' | undefined
const STORE = 'visitas-diagnostico';
const PATH = '/diagnostico/';

/** UA de navegador real (o HeadlessChrome padrão do Playwright é tratado como robô, de propósito). */
const REAL_UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36';
const HTML = 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8';

test.skip(!BASE, 'contador: só no ar (QA_BASE_URL)');

/** Chave do dia em UTC−3 (AAAA-MM-DD), como a função. */
function todayKey(): string {
  const d = new Date(Date.now() - 3 * 3600 * 1000);
  return d.toISOString().slice(0, 10);
}

function readBlob(key = todayKey()): { raw: string; value: Record<string, unknown> | null } {
  let raw = '';
  try {
    raw = execFileSync('npx', ['netlify', 'blobs:get', STORE, key], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
  } catch {
    raw = '';
  }
  let value: Record<string, unknown> | null = null;
  try {
    value = raw ? (JSON.parse(raw) as Record<string, unknown>) : null;
  } catch {
    value = null;
  }
  return { raw, value };
}

const count = (key?: string) => Number(readBlob(key).value?.n ?? 0);

/** Espera o waitUntil da função gravar (até ~10 s) e devolve o n final. */
async function settle(expectedAtLeast: number): Promise<number> {
  let n = count();
  for (let i = 0; i < 10 && n < expectedAtLeast; i++) {
    await new Promise((r) => setTimeout(r, 1000));
    n = count();
  }
  await new Promise((r) => setTimeout(r, 1500));
  return count();
}

// transfer-encoding: a resposta via Edge Function sai em streaming (chunked) em vez de content-length; é transporte, não dado.
const VOLATILE = /^(date|age|etag|x-nf-request-id|x-nf-trace-span-id|cache-status|content-length|transfer-encoding|server-timing|x-nf-edge-functions|netlify-vary|last-modified|content-encoding|vary|via|x-cache|cf-ray)$/i;

async function headerNames(request: APIRequestContext, path: string): Promise<string[]> {
  const res = await request.get(path, { headers: { 'user-agent': 'QA-header-check-bot', accept: HTML } });
  return Object.keys(res.headers()).map((h) => h.toLowerCase()).filter((h) => !VOLATILE.test(h)).sort();
}

test.describe('B3 contador /diagnostico/', () => {
  test('B3-a GET não cria cookie nem header novo (comparado à home)', async ({ request, browser }) => {
    // UA de robô: a função roda, mas não conta, então o teste não infla o número.
    const res = await request.get(PATH, { headers: { 'user-agent': 'QA-header-check-bot', accept: HTML } });
    expect(res.status()).toBe(200);
    expect(res.headers()['set-cookie']).toBeUndefined();
    const diag = await headerNames(request, PATH);
    const home = await headerNames(request, '/');
    expect(diag.filter((h) => !home.includes(h)), 'headers presentes só na /diagnostico/').toEqual([]);
    const ctx = await browser.newContext({ userAgent: 'QA-cookie-check-bot' });
    const page = await ctx.newPage();
    await page.goto(PATH);
    expect(await ctx.cookies()).toEqual([]);
    await ctx.close();
  });

  test('B3-b blob do dia guarda SÓ {n}; +1 por visita de browser real (production)', async ({ browser }, info) => {
    test.skip(MODE !== 'production', 'incremento só em production: QA_COUNTER=production');
    test.setTimeout(120000);
    const before = count();
    const visits = 3;
    for (let i = 0; i < visits; i++) {
      const ctx = await browser.newContext({ userAgent: REAL_UA });
      const page = await ctx.newPage();
      await page.goto(PATH, { waitUntil: 'load' });
      await ctx.close();
    }
    const after = await settle(before + visits);
    info.annotations.push({ type: 'qa-visits', description: `${visits} visitas de QA contadas em ${todayKey()} (antes=${before}, depois=${after})` });
    // Tráfego real pode somar durante o teste: exige pelo menos +3 e registra o excedente.
    expect(after - before).toBeGreaterThanOrEqual(visits);
    if (after - before > visits) info.annotations.push({ type: 'note', description: `+${after - before - visits} visitas externas durante o teste` });
    const blob = readBlob();
    expect(Object.keys(blob.value ?? {})).toEqual(['n']);
    expect(blob.raw, 'nenhum IP/UA/referer/query no blob').not.toMatch(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|:[0-9a-f]{1,4}:|mozilla|chrome|http|utm_|referer/i);
  });

  test('B3-c HEAD, GET sem Sec-Fetch de navegação, prefetch, robôs, Accept sem text/html e outras páginas NÃO contam (production)', async ({ request, browser }) => {
    test.skip(MODE !== 'production' && MODE !== 'preview', 'QA_COUNTER=production ou preview (no preview nada conta, então só confirma que n não muda)');
    test.setTimeout(120000);
    const before = count();
    await request.head(PATH, { headers: { 'user-agent': REAL_UA, accept: HTML } });
    await request.get(PATH, { headers: { 'user-agent': REAL_UA, accept: HTML, 'sec-purpose': 'prefetch' } });
    await request.get(PATH, { headers: { 'user-agent': REAL_UA, accept: HTML, purpose: 'prefetch' } });
    for (const ua of [
      'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
      'AdsBot-Google (+http://www.google.com/adsbot.html)',
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/129.0.0.0 Safari/537.36',
      'Mozilla/5.0 (Linux; Android 11; moto g power (2022)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36 Chrome-Lighthouse',
      'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
      'Slackbot-LinkExpanding 1.0 (+https://api.slack.com/robots)',
    ]) {
      await request.get(PATH, { headers: { 'user-agent': ua, accept: HTML } });
    }
    await request.get(PATH, { headers: { 'user-agent': REAL_UA, accept: 'application/json' } });
    // B9 (7df083b): só conta navegação de documento. GET/HEAD de UA real SEM Sec-Fetch-Dest/Mode (curl, monitores) não contam.
    await request.get(PATH, { headers: { 'user-agent': REAL_UA, accept: HTML } });
    await request.head(PATH, { headers: { 'user-agent': REAL_UA, accept: HTML } });
    await request.get(PATH, { headers: { 'user-agent': REAL_UA, accept: HTML, 'sec-fetch-dest': 'iframe', 'sec-fetch-mode': 'navigate' } });
    await request.get(PATH, { headers: { 'user-agent': REAL_UA, accept: HTML, 'sec-fetch-dest': 'document', 'sec-fetch-mode': 'no-cors' } });
    const ctx = await browser.newContext({ userAgent: REAL_UA });
    const page = await ctx.newPage();
    for (const other of ['/', '/en/', '/privacidade/', '/en/privacy/']) await page.goto(other);
    await ctx.close();
    await new Promise((r) => setTimeout(r, 6000));
    expect(count(), 'nada disso pode contar').toBe(before);
  });

  test('B3-p no preview a visita de browser real NÃO conta (contador só em production)', async ({ browser }) => {
    test.skip(MODE !== 'preview', 'só no preview: QA_COUNTER=preview');
    const before = count();
    const ctx = await browser.newContext({ userAgent: REAL_UA });
    const page = await ctx.newPage();
    await page.goto(PATH);
    await ctx.close();
    await new Promise((r) => setTimeout(r, 6000));
    expect(count()).toBe(before);
  });

  test('B3-d TTFB: mediana da /diagnostico/ ≤ home + 15 ms (20 amostras cada, intercaladas)', async ({}, info) => {
    test.setTimeout(180000);
    // UA de robô: mede a função rodando sem contar (a gravação é em segundo plano e não bloqueia, conforme o SPEC).
    // TTFB real (time_starttransfer do curl), sem o download do corpo.
    const ttfb = async (path: string) => {
      const out = execFileSync('curl', ['-s', '-o', '/dev/null', '-w', '%{http_code} %{time_starttransfer}', '-A', 'QA-ttfb-bot', '-H', `accept: ${HTML}`, '-H', 'cache-control: no-cache', `${BASE}${path}?qa-ttfb=${Math.random()}`], { encoding: 'utf8' });
      const [code, secs] = out.trim().split(' ');
      expect(code).toBe('200');
      return Number(secs) * 1000;
    };
    // 1ª requisição de cada rota = fria (cold start da função): descartada e registrada.
    const coldHome = await ttfb('/');
    const coldDiag = await ttfb(PATH);
    info.annotations.push({ type: 'ttfb-cold', description: `fria descartada: home ${coldHome.toFixed(1)} ms, /diagnostico/ ${coldDiag.toFixed(1)} ms` });
    console.log(`TTFB fria descartada: home ${coldHome.toFixed(1)} ms, /diagnostico/ ${coldDiag.toFixed(1)} ms`);
    const home: number[] = [];
    const diag: number[] = [];
    for (let i = 0; i < 20; i++) {
      home.push(await ttfb('/'));
      diag.push(await ttfb(PATH));
    }
    const med = (a: number[]) => [...a].sort((x, y) => x - y)[Math.floor(a.length / 2)]!;
    const msg = `TTFB mediana: home ${med(home).toFixed(1)} ms, /diagnostico/ ${med(diag).toFixed(1)} ms, Δ ${(med(diag) - med(home)).toFixed(1)} ms`;
    info.annotations.push({ type: 'ttfb', description: msg });
    console.log(msg);
    expect(med(diag) - med(home)).toBeLessThanOrEqual(15);
  });

  test('B3-f política PT/EN com a linha do contador agregado', async ({ page }) => {
    await page.goto('/privacidade/');
    await expect(page.locator('main')).toContainText(/visitas à página de diagnóstico de forma agregada/i);
    await expect(page.locator('main')).toContainText(/sem cookies e sem guardar IP ou navegador/i);
    await page.goto('/en/privacy/');
    await expect(page.locator('main')).toContainText(/diagnostic/i);
    await expect(page.locator('main')).toContainText(/aggregate|one number per day/i);
  });
});
