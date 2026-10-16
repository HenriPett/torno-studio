import { defineConfig, devices } from '@playwright/test';

/**
 * QA no ar: deploy preview ou produção da Netlify (CHECKLIST.md §0). Sem webServer: testa a URL publicada.
 * QA_BASE_URL = URL do deploy. Se o preview tiver senha (Netlify password protection / basic auth):
 * QA_HTTP_USER e QA_HTTP_PASS, só por env, nunca em arquivo do repo. Uso:
 *   QA_BASE_URL=https://deploy-preview-N--<site>.netlify.app PUBLIC_…=… npx playwright test -c tests/qa/playwright.preview.config.ts
 */
const baseURL = process.env.QA_BASE_URL;
if (!baseURL) throw new Error('QA_BASE_URL não definido');

export default defineConfig({
  testDir: '..',
  testMatch: ['qa/**/*.spec.ts', 'smoke.spec.ts'],
  fullyParallel: true,
  workers: 4,
  retries: 1,
  reporter: 'list',
  use: {
    baseURL,
    ...(process.env.QA_HTTP_USER && process.env.QA_HTTP_PASS
      ? { httpCredentials: { username: process.env.QA_HTTP_USER, password: process.env.QA_HTTP_PASS } }
      : {}),
  },
  // O UA do 'Desktop Chrome' do Playwright é de Chrome normal: no ar ele CONTA no contador da /diagnostico/ (B3).
  // Marcamos o QA como robô para não inflar o número; os testes que precisam contar (B3-b) definem o próprio UA.
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], userAgent: `${devices['Desktop Chrome'].userAgent} QA-Afinador-bot` },
    },
  ],
});
