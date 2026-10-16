import { defineConfig, devices } from '@playwright/test';
if (!process.env.QA_BASE_URL) throw new Error('QA_BASE_URL obrigatório: preview do Batuta');
export default defineConfig({
  testDir: '../../../tests/qa',
  testMatch: 'specialized-seo.spec.ts',
  outputDir: './test-results',
  reporter: [['list'], ['json', { outputFile: 'docs/qa/seo-especializado-20261013/results.json' }]],
  workers: 2,
  retries: 0,
  use: { ...devices['Desktop Chrome'], baseURL: process.env.QA_BASE_URL,
    userAgent: `${devices['Desktop Chrome'].userAgent} QA-Afinador-bot`,
    trace: 'retain-on-failure', screenshot: 'only-on-failure' },
});
