# Baseline real de produção — 2026-10-14

Origem: `https://tornostudio.com`. Coleta HTTP com `fetch` do Node e revisão real no Maestri Portal `QA Blog Prod Baseline`. Esta é a situação anterior ao blog, não um defeito da entrega futura.

## Saída HTTP observada

```text
/                  200  text/html  Software e IA para sua operação | Torno Studio
/en/              200  text/html  Fractional Founding Engineer | Torno Studio
/blog/            404  text/html  Página não encontrada | Torno Studio
/en/blog/         404  text/html  Página não encontrada | Torno Studio
/sitemap-index.xml 200 application/xml
/robots.txt        200 text/plain
```

O sitemap index aponta para `/sitemap-0.xml`. A resposta de `/sitemap-0.xml` tem **16 `<url>`** e **zero ocorrências** de `blog`, `artigos` ou `articles`. As URLs são `/`, três cases PT, `/en/`, três cases EN, guia EN, lovable EN, privacidade EN, recuperação EN, guia PT, lovable PT, privacidade PT e recuperação PT. `robots.txt` permite `/` e aponta `https://tornostudio.com/sitemap-index.xml`.

Requisição HTTP direta aos seis cases individuais retornou **200** em `/cases/{loopt,bom-capital,ascende}/` e `/en/cases/{loopt,bom-capital,ascende}/`. O Batuta informou como baseline do deploy o ID `6acf74b406c100fbad5c86ef`, estado ready e Edge ativo; não validei esse estado por API de deploy. HEAD informado: `0ce2f5ce42b026dc5e7bfa2d49ef9b82d2b92ab9`.

No portal, `/blog/` mostrou a página de 404 com link “Voltar para o início”; `/en/blog/` retornou HTTP 404. A home em viewport **390×844** mostrou idioma EN, CTA Agendar, dois CTAs do hero e aviso de cookies no snapshot acessível. Captura: [producao-home-mobile-390.png](producao-home-mobile-390.png). O portal usou viewport 390×844 e gerou PNG 780×1688 por escala de dispositivo 2.

`<article>` aparece sete vezes na home existente por causa dos cases; a exigência “listagem vazia sem Article” deve ser aferida **na nova listagem de blog**, não no site inteiro.

## Estado do navegador automatizado

O pacote `@playwright/test` e o Chromium estão instalados, mas o teste real de `chromium.launch({headless:true})` em 14/10 falhou:

```text
PLAYWRIGHT_LAUNCH_FAIL browserType.launch: Target page, context or browser has been closed
FATAL: bootstrap_check_in org.chromium.Chromium.MachPortRendezvousServer: Permission denied (1100)
signal=SIGTRAP
```

Portanto **nenhum teste Playwright de navegador, axe ou Lighthouse foi executado** nesta baseline. O portal funciona para inspeção manual de UI. Testes HTTP podem ser executados sem browser. Não atribuir escore Lighthouse >=95 sem relatório real.

## Risco de integração já identificado

`astro.config.mjs` monta o sitemap apenas a partir de `routes.mjs`. `tests/qa/seo.spec.ts` e `tests/qa/specialized-seo.spec.ts` ainda descrevem “10 URLs”; a produção observada contém 16. Essa divergência é preexistente e será tratada como compatibilidade de teste, sem editar arquivos alheios. O blog precisará aparecer no mapa ou usar integração equivalente demonstrável, com alternates corretos.
