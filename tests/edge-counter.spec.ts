import { expect, test } from '@playwright/test';

import handler, { config, counterTarget, dayKey, SECTOR_SLUGS, SECTOR_STORE, shouldCount, STORE } from '../netlify/edge-functions/count-diagnostico';

// Regras do contador sem cookie (docs/infra/CONTADOR-DIAGNOSTICO.md). A gravação no Blobs é testada no ar.
const CHROME = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0 Safari/537.36';
const req = (headers: Record<string, string>, method = 'GET') =>
  new Request('https://tornostudio.com/diagnostico/', { method, headers: { accept: 'text/html,application/xhtml+xml', 'user-agent': CHROME, 'sec-fetch-dest': 'document', 'sec-fetch-mode': 'navigate', ...headers } });

test('conta GET de HTML de navegador em produção', () => {
  expect(shouldCount(req({}), 'production')).toBe(true);
});

test('não conta fora de produção, HEAD, não-HTML, prefetch nem robô', () => {
  expect(shouldCount(req({}), 'deploy-preview')).toBe(false);
  expect(shouldCount(req({}, 'HEAD'), 'production')).toBe(false);
  expect(shouldCount(req({ accept: 'application/json' }), 'production')).toBe(false);
  expect(shouldCount(req({ 'sec-purpose': 'prefetch' }), 'production')).toBe(false);
  expect(shouldCount(req({ purpose: 'prefetch' }), 'production')).toBe(false);
  for (const ua of ['AdsBot-Google (+http://www.google.com/adsbot.html)', 'Mozilla/5.0 (compatible; Googlebot/2.1)', 'Mozilla/5.0 HeadlessChrome/129.0', 'Chrome-Lighthouse', 'facebookexternalhit/1.1', 'curl/8.4.0', '']) {
    expect(shouldCount(req({ 'user-agent': ua }), 'production'), ua).toBe(false);
  }
});

test('B9: sem navegação de documento não conta (HEAD chega como GET na Netlify; curl -I, iframe, fetch)', () => {
  const curlHead = new Request('https://tornostudio.com/diagnostico/', { headers: { accept: 'text/html', 'user-agent': CHROME } });
  expect(shouldCount(curlHead, 'production')).toBe(false);
  expect(shouldCount(req({ 'sec-fetch-dest': 'iframe' }), 'production')).toBe(false);
  expect(shouldCount(req({ 'sec-fetch-mode': 'cors', 'sec-fetch-dest': 'empty' }), 'production')).toBe(false);
  expect(shouldCount(req({ 'sec-fetch-mode': 'no-cors' }), 'production')).toBe(false);
});

test('dia no fuso de São Paulo (UTC−3)', () => {
  expect(dayKey(new Date('2026-10-09T02:59:00Z'))).toBe('2026-10-08');
  expect(dayKey(new Date('2026-10-09T03:00:00Z'))).toBe('2026-10-09');
});

// Landings de setor (estratégia 2026-11 §7.3): mesmas regras, uma chave por setor e dia no store visitas-setores.
test('rota da função cobre /diagnostico/ e /para/*', () => {
  expect(config.path).toEqual(['/diagnostico/', '/para/*']);
});

test('alvo do contador: /diagnostico/ por dia; /para/<slug>/ por dia e setor, só slugs conhecidos', () => {
  expect(counterTarget('/diagnostico/')).toEqual({ store: STORE, suffix: '' });
  expect(SECTOR_SLUGS).toHaveLength(8);
  for (const slug of SECTOR_SLUGS) {
    expect(slug).toMatch(/^[a-z-]+$/);
    expect(counterTarget(`/para/${slug}/`)).toEqual({ store: SECTOR_STORE, suffix: `/${slug}` });
  }
  expect(SECTOR_STORE).toBe('visitas-setores');
  for (const path of ['/para/', '/para/textil', '/para/textil/index.html', '/para/textil/x/', '/para/inexistente/', '/para/Textil/', '/para/textil%2F/', '/para/../diagnostico/', '/', '/diagnostico', '/en/']) {
    expect(counterTarget(path), path).toBeNull();
  }
  // Chave do dia + setor; nada de IP, UA, referer ou query string.
  expect(`${dayKey(new Date('2026-11-12T15:00:00Z'))}${counterTarget('/para/textil/')!.suffix}`).toBe('2026-11-12/textil');
});

test('handler devolve a resposta original e não grava fora de produção nem em 404/redirect', async () => {
  const waited: unknown[] = [];
  for (const [path, status, deploy] of [
    ['/para/textil/', 200, 'deploy-preview'], ['/para/textil/', 404, 'production'], ['/para/textil/', 301, 'production'],
    ['/para/inexistente/', 200, 'production'], ['/diagnostico/', 404, 'production'],
  ] as const) {
    const original = new Response('<main>x</main>', { status, headers: { 'content-type': 'text/html' } });
    const r = await handler(new Request(`https://tornostudio.com${path}`, { headers: { accept: 'text/html', 'user-agent': CHROME, 'sec-fetch-dest': 'document', 'sec-fetch-mode': 'navigate' } }),
      { next: async () => original, waitUntil: (p) => { waited.push(p); }, deploy: { context: deploy } });
    expect(r, `${path} ${status} ${deploy}`).toBe(original);
  }
  expect(waited).toEqual([]);
});
