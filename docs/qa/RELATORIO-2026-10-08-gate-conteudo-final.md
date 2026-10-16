# Relatório de QA: gate de conteúdo final (preview `cmirla02h`)

> Afinador, 2026-10-08. Preview: `https://founding-engineer-site-cmirla02h-henripetts-projects.vercel.app` (HEAD 810f82a+, com F2/F4/F6/F8/F9/F11).
> A produção espera a marca (F1) e o Vercel Pro. Bypass via `x-vercel-protection-bypass`, com o secret só em memória/scratchpad; os relatórios do Lighthouse, que registram headers, ficaram fora do repo.

## Veredito

**Conteúdo aprovado.** Suíte completa verde no ar e nenhum bug aberto. Pendências: marca (F1), Vercel Pro e Lighthouse na URL de produção. Também falta a Batuta informar o nome do cliente-terminal, para incluí-lo na lista de termos proibidos (a auditoria manual não encontrou nenhum nome de terminal no texto).

## Playwright no ar

```
PUBLIC_CONTACT_EMAIL=henriquepett@gmail.com PUBLIC_LOOPT_AUTHORIZED=true \
PUBLIC_LEGAL_NAME="Henrique Nass Pett" PUBLIC_LEGAL_ID="43.609.432/0001-07" \
QA_BOOKING_URL=https://calendly.com/henriquepett/45min QA_BASE_URL=<preview> QA_BYPASS=<secret> \
npx playwright test -c tests/qa/playwright.preview.config.ts

34 skipped
214 passed (26.9s)
```

Executados (não pulados), entre outros: K5 com o Calendly (4 posições, nenhum CTA de agenda fora do Calendly), C9 e C22 (Loopt só nos cases de `#quem`), C21 (e-mail), C23 (nenhum "neptune"), C24 (controlador com nome e CNPJ em PT/EN), C25 (foto com `alt`, `width`/`height` e carregada), smoke "tem canal de contato" (estado e-mail), axe, teclado, responsivo, preços §5.3, SEO com o host do preview. Skips: matriz de marca (só local), galeria R4 e a varredura do `dist/` local.

## Auditoria de conteúdo atualizada

| Regra | Resultado |
|---|---|
| Loopt permitida (F4) | Aparece só em 2 cases: "Loopt: IA na operação de terminais de contêiner" e "Loopt: plataforma interna construída sozinho" (EN equivalentes). Nunca em title, meta, hero nem OG (C22) |
| Cliente-terminal sem nome | ✅ por leitura de `#quem` PT/EN: só "terminais de contêiner" / "container terminal operations". Pendente: nome e variações para automatizar (pedido à Batuta) |
| −27% / +21% com fonte pública | ✅ link MundoLogística, rótulo "jan/2026" |
| Bom.Capital e "2 semanas → 30 min" como relato | ✅ "Relato meu" / "My own account", sem destaque numérico |
| Ascende/FinPlan como projeto próprio | ✅ |
| Nada de neptune (F8) | ✅ C23 em todas as páginas |
| Nós/nosso, mais barato, 5x/10x, −41%/−31%, depoimentos, logos | ✅ C1–C7, C5 (única imagem: foto `alt="Henrique Pett"`) |
| Privacidade (F9/F11) | ✅ controlador "Henrique Nass Pett", CNPJ 43.609.432/0001-07; sem encarregado (Res. ANPD 2/2022), canal = e-mail; e-mail visível; sem prazo de 6 meses (C20) |
| CTAs → Calendly (F2) | ✅ `https://calendly.com/henriquepett/45min`: 5 links em cada home, 1 em cada privacidade, 0 `#agendar` |

## HTTP

- `/`, `/en/`, `/privacidade/`, `/en/privacy/` = 200; 404 = 404; `/privacidade` → 308 `/privacidade/`; `/og/pt-BR.png` e `/og/en.png` = 200.
- 7 headers de segurança presentes; `x-robots-tag: noindex` em tudo + meta robots noindex.
- robots.txt: `Allow: /` + `Sitemap: https://…cmirla02h….vercel.app/sitemap-index.xml`.
- Links: 18 URLs referenciadas, **0 quebrado** (Calendly 200, LinkedIn 200, GitHub 200, MundoLogística 200).

## Lighthouse no ar (3 runs, mediana, 4 URLs)

| Variante | Perf | A11y | BP | SEO | Audits com falha |
|---|---|---|---|---|---|
| mobile / desktop, como servido | 100 | 100 | 93 | 61 (homes) / 58 (privacidade) | errors-in-console, inspector-issues (toolbar `vercel.live` injetado só em preview e bloqueado pela CSP), is-crawlable, robots-txt |
| mobile / desktop, toolbar bloqueado | 100 | 100 | **100** | 61 / 58 | is-crawlable, robots-txt |

`is-crawlable` = noindex intencional do preview. `robots-txt` = o Lighthouse busca o robots sem bypass e recebe o login da Vercel (o robots real está correto). Nenhum outro audit de SEO falha. **Repetir o Lighthouse na URL de produção** (sem proteção, sem toolbar, indexável) quando houver deploy.
