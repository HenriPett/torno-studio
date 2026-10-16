import { expect, test } from '@playwright/test';

import { dayKey, shouldCount } from '../netlify/edge-functions/count-diagnostico';

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
