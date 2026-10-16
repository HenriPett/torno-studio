import { defineConfig, devices } from '@playwright/test';

/**
 * QA local ISOLADO: serve um build próprio (QA_OUTDIR, fora do dist/ compartilhado) numa porta própria.
 * Nunca reaproveita servidor de outra pessoa. Uso:
 *   npx astro build --outDir "$QA_OUTDIR" && QA_OUTDIR=… npx playwright test -c tests/qa/playwright.local.config.ts
 */
const outDir = process.env.QA_OUTDIR;
if (!outDir) throw new Error('QA_OUTDIR não definido');
const PORT = Number(process.env.QA_PORT ?? 4331);

export default defineConfig({
  testDir: '..',
  testMatch: ['qa/**/*.spec.ts', '*.spec.ts'],
  fullyParallel: true,
  reporter: 'list',
  use: { baseURL: `http://localhost:${PORT}` },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: `npx astro preview --port ${PORT} --outDir "${outDir}"`,
    url: `http://localhost:${PORT}/`,
    reuseExistingServer: false,
  },
});
