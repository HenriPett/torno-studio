# Relatório de QA: rodada 1 (fase 4)

> Afinador, 2026-10-08. HEAD testado: `fda9704` (inclui 39405bf e as correções do Timbre 9ee0a63..fda9704).
> Comando: `bash tests/qa/run-qa.sh`. Log: `.lighthouseci/qa-20261008-100408/` (local, ignorado no git).
> **Rodada informativa.** A rodada que vale para aprovar é a 2, depois do review do Compasso (decisão da Batuta).

## Resultado por etapa (saída real)

```
▶ npm run check
  exit=0
▶ env PUBLIC_ALLOW_INDEXING=false npx astro build
  exit=0
▶ npx playwright test --reporter=list
  exit=1
▶ env PUBLIC_SITE_BRAND=Ox PUBLIC_ALLOW_INDEXING=false npx astro build
  exit=0
▶ env QA_BRAND=Ox npx playwright test tests/qa/brand.spec.ts tests/qa/responsive.spec.ts --reporter=list
  exit=0
▶ env PUBLIC_SITE_BRAND=[Marca] PUBLIC_ALLOW_INDEXING=false npx astro build
  exit=0
▶ env QA_BRAND=[Marca] npx playwright test tests/qa/brand.spec.ts tests/qa/responsive.spec.ts --reporter=list
  exit=0
▶ env PUBLIC_SITE_BRAND=Northbridge Product Engineering PUBLIC_ALLOW_INDEXING=false npx astro build
  exit=0
▶ env QA_BRAND=Northbridge Product Engineering npx playwright test tests/qa/brand.spec.ts tests/qa/responsive.spec.ts --reporter=list
  exit=0
▶ env PUBLIC_ALLOW_INDEXING=true npx astro build
  exit=0
▶ env QA_INDEXING=true npx playwright test tests/qa/seo.spec.ts --reporter=list
  exit=1
▶ npx lhci autorun
  exit=0
▶ npx lhci autorun --config=tests/qa/lighthouserc.desktop.json
  exit=0
▶ env PUBLIC_ALLOW_INDEXING=false npx astro build
  exit=0
▶ npm run links
  exit=0
```

| Etapa | Resultado |
|---|---|
| `npm run check` | 0 erros |
| Playwright completo (`tests/` + `tests/qa/`), build preview/noindex | **218 passed, 4 failed, 33 skipped**; as 4 falhas são S5 (og:image) |
| Matriz de marca `Ox` / `[Marca]` / `Northbridge Product Engineering` (brand + responsive) | **85 passed** em cada uma (2 skipped = R4 galeria) |
| `seo.spec` com `QA_INDEXING=true` | 20 passed, 4 failed (S5) |
| Lighthouse mobile (3 runs, mediana) | / 100·100·100·100 · /en/ 100·100·100·100 · /privacidade/ 100·100·100·100 · /en/privacy/ 100·100·100·100 |
| Lighthouse desktop (preset desktop, 3 runs) | idem: 100 nas 4 categorias, nas 4 URLs |
| linkinator | 9 links, 0 quebrado |

Ordem das notas: Performance · Acessibilidade · Best Practices · SEO. `formFactor` confirmado nos JSONs: `mobile` e `desktop`.

## Itens do gate

| Grupo | Status | Observação |
|---|---|---|
| L1–L3, L5 Lighthouse | ✅ | 100 em todas |
| L4 orçamento DESIGN §10 | ❌ baixa | CSS da home = 29.613 B (17.929 + 11.684) > 25 KB; 6 `@font-face` (cyrillic, cyrillic-ext, greek, latin-ext, vietnamese, latin) quando o DESIGN §4 pede só latin; JS inline 172 + 997 = 1.169 B > 1 KB. → B1, B2 |
| A1–A6, A11 | ✅ | axe 0 sério/crítico, claro/escuro, 360/1280, 5 páginas |
| A7 ícones/monograma | ✅ | `Icon.astro` aria-hidden; monograma `role="img"` + aria-label |
| A12 sem `target="_blank"` | ✅ | grep vazio em src/ |
| K1–K5, K8 | ✅ | |
| R1–R3 | ✅ | também com as 3 marcas |
| T1–T3 | ✅ | |
| S1–S4, S6–S9 | ✅ | |
| S5 og:image | ❌ alta | ausente nas 4 páginas (`Base.astro` omite a tag até existir `public/og/<locale>.png`) → Timbre, via Batuta |
| N1–N3 | ✅ | |
| M1–M3, M5 | ✅ | 3 marcas × 4 larguras × 5 páginas |
| M4 `<title>` ≤ 60 | ⚠️ aviso | marca longa: 63 (PT) / 62 (EN) |
| P1–P5 | ✅ | preços = PLANO-DEV §5.3 nos dois idiomas |
| C1–C12 | ✅ | nenhum termo proibido; C9 com rótulo mês/ano (decisão Batuta) |
| C13 Bom.Capital/30 min fora de hero/meta | ✅ | verificado no HTML de / e /en/ |
| C16 sem "garantia de prazo" | ✅ | |
| C17 texto = copy aprovado | ⚠️ info | título da garantia 2 difere do doc: PT "Escopo fechado, com o que fica fora." (doc: "…fica fora por escrito."), EN "Fixed scope, exclusions in writing." (doc: "…with exclusions in writing."). Provável ajuste ao limite de 40. → Batuta |
| E6 env-guard em produção | ✅ | `VERCEL_ENV=production npx astro build` → `[env-guard] Variáveis obrigatórias vazias em VERCEL_ENV=production: PUBLIC_BOOKING_URL, PUBLIC_LEGAL_NAME, PUBLIC_LEGAL_ID.` |
| A8, A9 (zoom manual), A10, K6, K7, K9, K10, R5–R7, T4, T5, M6–M8, C14, C15, C18, E1, E2, E4, E5, E8 | ⏳ | manuais, ficam para a rodada 2 |
| L6, S10–S12, C19, E3 | ⏳ | dependem do preview na Vercel (fase 5) |

## Bugs

| ID | Gravidade | Para | Resumo |
|---|---|---|---|
| B0 | alta | Batuta → Timbre | og:image por idioma inexistente (S5) |
| B1 | baixa | Ritmo (cc Compasso) | CSS acima do orçamento e subsets de fonte além do latin |
| B2 | baixa | Ritmo (cc Compasso) | JS inline 1.169 B > 1 KB |

### B1. CSS 29,6 KB e 6 @font-face (orçamento DESIGN §10 / §4)
- Passos: `npx astro build`; `grep -o 'href="/_astro/[^"]*\.css"' dist/index.html`; `ls -l dist/_astro/*.css`; `grep -c @font-face dist/_astro/index.P6MIVyaE.css`.
- Esperado: CSS total ≤ 25 KB; só o `@font-face` latin.
- Obtido: 17.929 + 11.684 = 29.613 B; 6 `@font-face`. Causa provável: `import '@fontsource-variable/ibm-plex-sans/wght.css'` em `Base.astro` traz todos os subsets.
- Impacto: Lighthouse segue 100; desvio de orçamento, não de usuário.

### B2. JS inline 1.169 B (orçamento ≤ 1 KB)
- Passos: `node -e` contando bytes de cada `<script>` de `dist/index.html` → 172 e 997.
- Esperado: ≤ 1 KB no total. Obtido: 1.169 B.

## Correções no próprio QA nesta rodada
- P2: linha da tabela casava duas vezes ("Evolução" cita "Essencial"); agora casa pelo início do nome (achado do Ritmo).
- M3: contagem de linhas do wordmark passou a medir só nós de texto (o padding do alvo de 44 px e o `<span>` interno contavam como linha). M1: a 404 não tem footer.
