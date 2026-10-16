# SPEC: landing /diagnostico/ (R6, campanha 01 do Google Ads)

> Batuta, 2026-10-08. Autorizada pelo fundador. Parâmetros confirmados pelo Farol. Entra no deploy 2 (até 14/nov).

## Decisões
- **URL:** `https://tornostudio.com/diagnostico/`. **Só PT.** Sem par EN: o seletor de idioma leva a `/en/` (home EN). A rota precisa compilar sem par EN em `routes.mjs`, sem hreflang quebrado e sem link para uma página EN que não existe.
- **Indexação:** `noindex, follow`, **fora do sitemap**, sem canonical para a home. **Não** bloquear no `robots.txt`, porque o AdsBot do Google precisa rastrear a página.
- **Texto:** é do **Mote** (`marketing/landing/diagnostico-pt.md`), auditado pelo Crivo e enviado pelo Farol. **Até lá, não inventar texto:** estrutura com chaves em `SiteCopy.diagnostico` e placeholders visíveis só em dev/preview (`[Mote: …]`). O build de produção falha se algum placeholder sobrar.
- **Preços e prazos:** os mesmos do site (`pricing.ts`), reutilizando o componente da escada.

## Estrutura (ordem)
1. **Header enxuto:** marca + 1 CTA, sem menu de navegação, com seletor de idioma para `/en/` (ou sem seletor; decisão do Timbre).
2. **H1 + subtítulo** (Mote) + CTA.
3. **Escada de preços**, com o mesmo componente e os mesmos dados da home.
4. **O que sai do Product Sprint** (Mote).
5. **Provas:**
   - Bom.Capital como relato ("em média 48 horas → menos de 2 horas"), **sem link e sem logo**;
   - Ascende como projeto próprio, **com link** ascende.site;
   - **sem Loopt**, sem Lovable, sem FinPlan.
6. **Quem constrói**, em 1ª pessoa: o nome pode aparecer; **sem link, foto vinculada ou botão para o LinkedIn pessoal**. Decidir com o Farol se a foto entra sem link; o padrão é sem foto.
7. **FAQ curta** (Mote).
8. **CTA final.** O CTA é **um só**, repetido no header, no hero e no final, sempre com o mesmo comportamento: popup do Calendly sob consentimento de Medição e conversão AW sob Publicidade (deploy 2A). Sem consentimento, link de saída.
9. Footer com Privacidade e Preferências de cookies. Sem outros links de saída, exceto ascende.site e o link da política.

## Pronto quando
- Lighthouse ≥ 95 em Performance, Acessibilidade e Best Practices; SEO ≥ 95, exceto `is-crawlable` (noindex intencional).
- CTA visível sem rolar em 360×640, com o banner aberto.
- QA de conteúdo: sem Loopt, Lovable ou FinPlan; nenhum link para linkedin.com; Bom.Capital sem link; preços iguais ao `pricing.ts`; nenhum placeholder.
- Consentimento: os mesmos testes CS-a..n na rota `/diagnostico/`.
- `/diagnostico/` fora do sitemap; `meta robots noindex,follow`; o `robots.txt` não bloqueia.
