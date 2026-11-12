# EN copy (2026-11, Torno for manufacturers)

> Replaces the "Fractional Founding Engineer" copy (history in git up to commit `62961a0`).
> Rules: `docs/estrategia-2026-11-torno-industria.md` (§5 honesty, §9 voice). The EN site is a lean mirror of PT.

## Where the text lives

| Page | File |
|---|---|
| Home `/en/` | `src/content/home.ts` (`home.en`) + stages and delivery structure from `src/content/institucional.ts` |
| How we work `/en/how-we-work/` | `src/content/institucional.ts` (`howWeWork.en`) |
| About `/en/about/` | `src/content/institucional.ts` (`about.en`) |
| Contact `/en/contact/` | `src/content/institucional.ts` (`contact.en`) |
| Home meta, OG, common labels, consent, privacy, 404 | `src/content/en.ts` |
| Header, footer, "Illustration" badge | `src/content/chrome.ts` |

`/diagnostico/` is PT-only (`diagnostico: null` in `en.ts`).

## Summary
- **Home:** "Applied AI for industrial operations, designed for your plant." Operations brain (mock), solutions by area (`#solutions`), custom software (mock), five stages, delivery structure, proof (−27% / +21% according to Loopt, MundoLogística, Jan 13, 2026, and three cases), who it is for, FAQ, final CTA "Book a call".
- **How we work:** stages with what we do and what you get, delivery structure, governance, security and privacy, continuity, what we need from you, FAQ.
- **About:** why Torno exists, manufacturing focus from Jaraguá do Sul, stages, technical lead (Henrique Pett), cases.
- **Contact:** calendar, email (when configured), company LinkedIn, what to bring, next steps.

## Rules
- "We"/"Torno". No first-person singular on company pages.
- No public prices. No industry named on the home page, no links to `/para/`.
