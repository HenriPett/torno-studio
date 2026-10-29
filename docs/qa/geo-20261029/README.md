# GEO e autoria — 29/10/2026

Implementação sobre a main remota `a7959097f962babf2697018f9fcba25adc9190ff`, com o novo artigo de `e87100d410aeb72b53e9bacdf223d4de3e781d43` incorporado durante a sincronização final, atualizada com `git pull --ff-only origin main` em clone isolado. A cópia original tinha alterações locais anteriores e o seu `.git` está somente leitura nesta sessão; esse trabalho foi preservado.

## Conteúdo e identidade

- 33 artigos com resposta direta específica e três pontos de decisão por artigo, sumário com âncoras e links para outras leituras. As sínteses mantêm o conteúdo e os limites dos artigos. Fontes e figuras originais, hashes e aprovações históricas foram preservados.
- Autoria visível “Escrito por Henrique Pett”, bio, link rel=author, meta author e article:author, BlogPosting com Person/URL de perfil e publisher. Atestação atual do usuário em `src/config/blog-authorship.json`, separada dos registros históricos de revisão e publicação. Datas históricas desconhecidas continuam omitidas.
- Perfis PT/EN em `/autores/henrique-pett/` e `/en/authors/henrique-pett/`, trajetória, perfis profissionais e arquivo de artigos. Navegação pelo footer, índices e artigos; ProfilePage conectado à identidade única de Person.
- 20 respostas específicas nas dez rotas institucionais, comerciais, de cases e guia em PT/EN. CTAs preservados antes dos resumos na home e páginas comerciais. Índices do blog com identidade do autor e ItemList apenas para os artigos realmente disponíveis naquele idioma.
- WebPage/Website/Organization/Person conectados por IDs em todas as 57 páginas indexáveis. Serviços identificam a organização responsável. BreadcrumbList corresponde à navegação visível dos posts.
- 33 capas PNG de compartilhamento com título real e autoria, geradas pelo renderer Satori existente (1200×630), consistentes entre Open Graph e BlogPosting.
- `llms.txt` inclui perfis e todos os artigos públicos. Markdown continua derivado apenas do main renderizado, incluindo os novos resumos e autoria; nenhum frontmatter ou evidência privada é publicado.
- Checklist Markdown legado ganhou nomes acessíveis derivados de seus itens visíveis. Diagnóstico de campanha e 404 mantêm a política noindex; não foram promovidos ao sitemap.

## Evidências

- [Inventário editorial e fontes por artigo](editorial.md).
- [Páginas e QA de layout da revisão editorial](pages.md).
- [Revisão independente de Crivo](review.md): sem achado aberto; P3 documental corrigido.
- [Verificação integrada local](local-verification.json).
- [Navegador: overflow, H1 e axe WCAG A/AA](browser.json). A automação cobre as 57 páginas indexáveis em 360 e 1280 pixels; verificações automatizadas não certificam conformidade integral.
- Capturas: [perfil do autor em desktop](author-desktop.png) e [resposta direta no celular](article-mobile.png).
- [HTTP em produção](production-http.json), gerado após publicação para conferir HTML/Markdown negociado, arquivos diretos, paridade com o build, status, Vary, HEAD, redirects, assets e arquivos de descoberta.

Reprodução usando configuração pública de produção em `.env` (não versionada):

```sh
CONTEXT=production npm run build
npm run test:geo
node scripts/test-blog-release.mjs
npx playwright test tests/agent-content.spec.ts tests/agent-pages.spec.ts tests/edge-counter.spec.ts --grep-invert 'accessible trust'
npm run links
AGENT_REPORT_PATH=docs/qa/geo-20261029/production-http.json node scripts/verify-agent-public.mjs
```

## Resultado da validação local

- Build com configuração pública real de produção: Astro check sem erros, warnings ou hints.
- 118 verificações de GEO/autoria e 37 verificações editoriais: PASS.
- 40 testes técnicos de negociação, conteúdo público, descoberta e contador: PASS.
- Linkinator: 215 links internos, PASS.
- 114 combinações de página/largura no navegador: sem overflow e sem violações graves/críticas nas regras axe WCAG A/AA avaliadas.
- Checagens do navegador e evidência HTTP ficam nos arquivos vinculados acima; foram executadas depois do build final.

242 verificações HTTP em produção: PASS, cobrindo 59 documentos HTML nas variantes HTML, Markdown negociado e arquivo direto, além de 33 imagens de artigos, descoberta, aliases, assets e HEAD.

## Publicação

Fonte publicada na main: `729509b0e28a546a1b2df20e246aa648167eab38`. Deploy Netlify `6ae3b8d2d2b2c3ab9e80afd7`, pronto em 29/10/2026 às 21:21:50 UTC. Metadados em [deployment.json](deployment.json).

No portal, o link de autoria do artigo novo abriu o perfil PT em produção, e o seletor de idioma abriu o perfil EN correto, com `html lang=en`, H1 único e sem overflow em 1280px. O perfil PT publicado inclui o artigo recém-integrado.

## Critérios e limites

A implementação usa as orientações de [Google para recursos de IA](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide), [Article](https://developers.google.com/search/docs/appearance/structured-data/article) e [ProfilePage](https://developers.google.com/search/docs/appearance/structured-data/profile-page), consultadas em 29/10/2026. Conteúdo útil, rastreável e com autoria explícita é o foco; não há promessa de posicionamento, indexação ou citações por assistentes. A revisão factual cotejou os resumos com os artigos locais e preservou datas/limites de suas fontes; não revalidou externamente todas as referências históricas.

Medição de indexação e citações requer acompanhamento em Search Console/Bing Webmaster Tools. O endereço postal empresarial segue sem informação confirmada; nenhuma sede ou endereço presencial foi inventado.
