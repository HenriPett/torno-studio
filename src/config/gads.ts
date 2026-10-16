/**
 * Google Ads (docs/consent/SPEC.md §1). Módulo separado do site.ts de propósito: o consent.ts roda no cliente,
 * e importar `site` levaria o objeto inteiro para o bundle (com nomes e flags que não devem ir ao HTML).
 * Vazio -> nenhum gtag carrega, mesmo com Publicidade aceita. O ID é público (aparece na tag).
 */
export const GADS_ID: string | null = (import.meta.env.PUBLIC_GADS_ID ?? '').trim() || null;

/**
 * Propriedades GA4 combinadas com a tag do Ads no Google que NÃO podem receber dados (sem GA4 no deploy 1;
 * regra do Alicerce). O consent.ts liga o opt-out oficial window['ga-disable-<id>'] antes de carregar o gtag.js.
 * A CSP também não libera google-analytics.com. Remover só quando o GA4 entrar com consentimento de Medição.
 */
export const GA4_BLOCKED_IDS: readonly string[] = ['G-G6941HG7H1'];

/**
 * Rótulo da conversão "Diagnóstico agendado" (SPEC §9): send_to = `${GADS_ID}/${GADS_CONV_LABEL}`.
 * Vazio -> o evento de conversão não é enviado. Só sai com Publicidade aceita.
 */
export const GADS_CONV_LABEL: string | null = (import.meta.env.PUBLIC_GADS_CONV_LABEL ?? '').trim() || null;
