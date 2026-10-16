# Relatório de QA: rodada 2 (fase 4, rodada que vale)

> Afinador, 2026-10-08. HEAD testado: `b535c98` (OG image 3a26cf0 + b535c98, B1 af2fa8d, B2 9d5ac79).
> Comando: `bash tests/qa/run-qa.sh`. Log: `.lighthouseci/qa-20261008-101531/` (local).

## Veredito

**Gate automatizado: ✅ verde.** Ficam 2 bugs abertos, nenhum crítico. B3 é de privacidade/configuração e vai para a Batuta; B4 é de UI, de gravidade baixa, e vai para o Ritmo. Os itens que dependem do preview ficam para a fase 5.

## Saída real

```
▶ npm run check
  exit=0
▶ env PUBLIC_ALLOW_INDEXING=false npx astro build
  exit=0
▶ npx playwright test --reporter=list
  exit=0
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
  exit=0
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
| Playwright completo, build preview/noindex | **222 passed, 0 failed**, 33 skipped (brand sem QA_BRAND, galeria R4) |
| Matriz `Ox` / `[Marca]` / `Northbridge Product Engineering` | **85 passed** em cada |
| `seo.spec` indexável (`QA_INDEXING=true`) | **24 passed** (S5 og:image verde) |
| Lighthouse mobile, mediana de 3 | / 100·100·100·100 · /en/ 100·100·100·100 · /privacidade/ 100·100·100·100 · /en/privacy/ 100·100·100·100 |
| Lighthouse desktop, mediana de 3 | idem, 100 nas 4 categorias nas 4 URLs |
| linkinator | 9 links, 0 quebrado |

## Casos de borda (`tests/qa/edge.spec.ts`, novo; execução avulsa no mesmo HEAD)

```
✓ A8 degrau alternativo anunciado com "ou"/"or" antes do nome: / e /en/
✓ E1 sem JS: FAQ e "O que inclui" abrem, nav e idioma funcionam: / e /en/
✘ K6 ordem de tab segue a ordem visual: / ("quem@5239 -> quem@4794") e /en/ ("quem@5126 -> quem@4709")
✓ K7 foco não fica escondido sob o header fixo: / e /en/
✓ K9 duplo clique rápido no toggle: estado coerente após reload: / e /en/
✓ K10 Back do navegador: âncora e troca de idioma, tema mantido
✓ T5 localStorage bloqueado: sem erro, página carrega
10 passed, 2 failed
```

## Verificações manuais executadas

| ID | Resultado | Evidência |
|---|---|---|
| L4 orçamento | ✅ | CSS da home 27.695 B (teto revisado 30 KB, DESIGN §10); 1 `@font-face` latin; JS inline 623 B |
| M6 OG com 3 marcas | ✅ | `Ox` e `[Marca]` em 1 linha; `Northbridge Product Engineering · …` em 2 linhas no topo, sem corte, PT e EN; texto = copy §13 |
| C14 experiência internacional | ✅ | PT "Também trabalhei remotamente, em inglês, numa consultoria que atendia empresas europeias." / EN "I've worked remotely, in English, at a consultancy serving European companies." |
| C15 "2 semanas" | ✅ | só em prazos do Sprint/Evolução, no relato e negado em "Quem espera qualquer produto pronto em 2 semanas" |
| C18 depoimentos ligados | ✅ | build com `PUBLIC_SHOW_TESTIMONIALS=true`: nenhuma `#depoimentos` com conteúdo de exemplo |
| E4 e-mail | ✅ / ⚠️ B3 | vazio: nenhum `mailto:`; `qa@example.com`: `mailto:` na home PT/EN e na privacidade |
| E5 neptune (obsoleto: menção removida em d5ecd92, F8) | ✅ | vazio: frase sem link; com URL: "Ler o artigo" / "Read the article" |
| E6 env-guard | ✅ | (rodada 1) build de produção falha sem BOOKING/LEGAL |
| A7, A12, C13, C16 | ✅ | (rodada 1) |
| C17 copy | ⚠️ info | título da garantia 2 mais curto que o doc (rodada 1, com a Batuta) |
| A9, A10, R5–R7, T4, E2, E8, M7, M8 | ⏳ | revisão visual pendente (screenshots R4) |
| L6, S10–S12, C19, E3 | ⏳ | fase 5 (preview Vercel) |

## Bugs abertos

### B3. Privacidade sem canal de contato quando `PUBLIC_CONTACT_EMAIL` está vazio. Média, → Batuta
- Passos: `npx astro build` sem `PUBLIC_CONTACT_EMAIL`; abrir `/privacidade/` e `/en/privacy/`.
- Esperado: "Seus direitos… pelo contato abaixo" seguido de um contato (LGPD art. 18 / GDPR art. 12: canal para o titular).
- Obtido: o texto diz "pelo contato abaixo" / "using the contact below" e logo depois vem "Voltar para a página inicial". Nenhum contato aparece, e o controlador também fica oculto sem `PUBLIC_LEGAL_*`.
- Risco: o env-guard exige `PUBLIC_BOOKING_URL` e `PUBLIC_LEGAL_*` em produção, mas **não** `PUBLIC_CONTACT_EMAIL`. Dá para publicar em produção sem nenhum canal.
- Decisão necessária: exigir `PUBLIC_CONTACT_EMAIL` em produção no env-guard (Compasso), ou dar um fallback de contato no copy (Verso).

### B4. Ordem de foco em "Quem constrói" (desktop ≥ 1024 px). Baixa, → Ritmo (cc Compasso)
- Passos: abrir `/` em 1280×900; dar Tab até o link "Dado público · MundoLogística, jan/2026"; dar Tab de novo.
- Esperado: a ordem de foco segue a ordem visual (WCAG 2.4.3). LinkedIn e GitHub ficam na coluna esquerda, sob o monograma, à altura do título.
- Obtido: o foco vai do link da fonte (x=486, y≈5239) para "LinkedIn" (x=80, y≈4794), 450 px **acima**, e depois para "GitHub". No DOM os links vêm depois dos cases, mas aparecem antes na tela.
- Spec: `tests/qa/edge.spec.ts` K6 (falha em / e /en/).
