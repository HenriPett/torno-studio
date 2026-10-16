import { test as base } from '@playwright/test';

export { expect } from '@playwright/test';
export type { APIRequestContext, Page } from '@playwright/test';

/**
 * O banner de consentimento só existe com PUBLIC_GADS_ID (decisão do Compasso). No ar (QA_BASE_URL) ele sempre existe;
 * localmente, o build e o teste leem a mesma env.
 */
export const BANNER_ON = Boolean(process.env.PUBLIC_GADS_ID) || Boolean(process.env.QA_BASE_URL) || process.env.QA_ONLINE === '1';

/** Registro de consentimento (docs/consent/SPEC.md §3.2). */
export const CONSENT_KEY = 'ts-consent';
export const CONSENT_VERSION = Number(process.env.QA_CONSENT_VERSION ?? 1);

/**
 * `test` dos specs que NÃO testam o banner: começa com um consentimento "recusado" gravado,
 * para a faixa não alterar foco, layout nem axe da página. O banner tem cobertura própria em consent.spec.ts.
 * Não sobrescreve um registro que o próprio teste tenha gravado.
 */
export const test = base.extend({
  page: async ({ page }, use) => {
    await page.addInitScript(
      ([key, v]) => {
        try {
          if (!localStorage.getItem(key as string)) {
            localStorage.setItem(key as string, JSON.stringify({ v, ts: Date.now(), medicao: false, publicidade: false }));
          }
        } catch {
          /* storage bloqueado: o site não pode quebrar (T5) */
        }
      },
      [CONSENT_KEY, CONSENT_VERSION] as const,
    );
    await use(page);
  },
});
