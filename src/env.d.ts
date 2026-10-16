/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_BRAND?: string;
  readonly PUBLIC_SITE_URL?: string;
  readonly PUBLIC_BOOKING_URL?: string;
  readonly PUBLIC_CONTACT_EMAIL?: string;
  readonly PUBLIC_LINKEDIN_URL?: string;
  readonly PUBLIC_GITHUB_URL?: string;
  readonly PUBLIC_LEGAL_NAME?: string;
  readonly PUBLIC_LEGAL_ID?: string;
  readonly PUBLIC_LOOPT_AUTHORIZED?: string;
  readonly PUBLIC_SHOW_TESTIMONIALS?: string;
  readonly PUBLIC_ALLOW_INDEXING?: string;
  readonly PUBLIC_GADS_ID?: string;
  readonly PUBLIC_GADS_CONV_LABEL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
