# Agent readiness — 20/10/2026

Implementação sobre a main remota `7e47d17`, já publicada antes desta tarefa. O checkout original está no commit inicial, com alterações locais anteriores e `.git` somente leitura. Um clone em `/private/tmp/torno-agent-release-20261020` preserva esse trabalho e evita republicar uma versão antiga do site.

## Mudanças

- Netlify Edge middleware negocia HTML/Markdown nas URLs públicas existentes. Respeita q=0, preferências, parâmetros de representação e quoted-string; mescla Vary: Accept. Preserva status/redirects/assets, segurança, noindex e HEAD; falha interna retorna 503 explícito.
- Build converte apenas HTML público renderizado, a partir de main, com identidade do title. Preserva links, tabelas e preços sem publicar frontmatter, rascunhos ou arquivos internos. Produz index.md por página e 404.md para a página de erro explícita.
- Resposta 404 em Markdown, com explicação, links de descoberta e noindex.
- llms.txt conforme proposta v2: orientação de uso/contato, listas de arquivos e Optional. Links de descoberta no head.
- Organization em home/about/contact nos dois idiomas, com contato e perfil empresarial confirmado. Person do fundador separada; schemas de artigos, cases e serviços preservados.
- /about/, /contact/, /en/about/ e /en/contact/ com conteúdo real; /privacy e /privacy/ redirecionam 301 para a política única /privacidade/.
- Títulos das homes identificam Torno Studio e software/IA. O diálogo fechado de consentimento fica após o conteúdo; o banner continua antes do header, mantendo ordem de teclado e aparência.

## Verificação local

- Build de produção: zero erros, warnings ou hints no Astro check.
- 40 testes de negociação, falhas, HEAD, conteúdo cru, schema, llms.txt e contador: PASS.
- Suíte editorial de release: 15/15 PASS. Sitemap: 33 URLs, incluindo as quatro páginas novas; onze artigos previamente aprovados preservados.
- Linkinator: 122 links, PASS.
- Portal Maestri: 8 páginas × 2 larguras (360 e 1280), sem overflow horizontal e sem violações graves/críticas no axe WCAG A/AA. Dados em portal.json, capturas adjacentes.
- Cookies: abrir Personalizar, verificar modal e foco, Recusar tudo, fechar e conferir ts-consent v2 com medicao/publicidade false: PASS.
- A execução ampla de Playwright/Chromium pelo terminal foi impedida pelo sandbox do macOS (MachPortRendezvous bootstrap_check_in: Permission denied). Não é declarada como aprovada. As quatro novas verificações automáticas de acessibilidade/idioma seguem no repositório para execução em ambiente com navegador; o portal verificou acessibilidade e o modal no navegador disponível.

Reprodução, com configuração pública de produção em .env (não versionada):

```sh
CONTEXT=production npm run build
node --env-file=.env node_modules/.bin/playwright test tests/agent-content.spec.ts tests/agent-pages.spec.ts tests/edge-counter.spec.ts --grep-invert 'accessible trust'
node scripts/test-blog-release.mjs
npm run links
AGENT_BASE_URL=https://tornostudio.com AGENT_REPORT_PATH=docs/qa/agent-readiness-20261020/production-http.json node scripts/verify-agent-public.mjs
```

A última checagem precisa de um deploy Netlify real: Astro preview não executa Edge Functions. Ela verifica variantes em ambas as ordens, todas as páginas/arquivos Markdown, 404, aliases, arquivos de máquina, assets e HEAD via conexão TLS HTTP/1.1 com contagem dos bytes após os headers.

## Pendências reais

1. **Organization.address:** não há endereço postal empresarial comprovado na base. Publicado somente location (Place com PostalAddress da cidade de operação remota), com texto explícito distinguindo operação de sede/visitas. O critério estrito Organization.address permanece pendente até o fundador fornecer/aprovar um endereço empresarial. Não se inferem rua, telefone ou CEP.
2. **Busca pela marca:** ajustes técnicos ajudam a identificação, mas posição no top 10 exige recrawl, indexação e sinais externos. Não há promessa de posição ou nova nota no Is Agentic. Validar Search Console e solicitar nova auditoria após o deploy; menções externas são trabalho de distribuição.

## Referências técnicas

- [HTTP RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html): Accept, q, quoted-string, Vary e HEAD.
- [Netlify Edge API](https://docs.netlify.com/build/edge-functions/api/) e [cache do middleware](https://docs.netlify.com/build/edge-functions/optional-configuration/).
- [llms.txt v2](https://llmstxt.org/#format).
- [Organization](https://schema.org/Organization), [location](https://schema.org/location), [PostalAddress](https://schema.org/PostalAddress).

Dados empresariais: base/03-respostas-fundador.md itens 9/20/29 e handoff/Batuta.md no projeto-50k, conferidos em revisão somente leitura por Crivo; contato e controlador também conferidos na política pública. Crivo revisou o código e encerrou os achados de parser, identidade MD e fallback; não executou build/CDN/browser.
