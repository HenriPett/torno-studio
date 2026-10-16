# QA HTTP pós-promoção — artigo planilhas (r3)

**PASS, 5/5 checks**, executado contra `https://tornostudio.com` após a promoção do deploy `6acff8bd6dccb98caf26f5cd`. A validação API confirmou `ready`, Edge presente e URL final `https://tornostudio.com`. O manifesto do sitemap contém exatamente 19 URLs: as 18 rotas baseline (16 existentes + índices PT/EN) e o artigo PT `/blog/quando-automatizar-processos-planilhas/`.

O teste vinculou o HTML servido ao candidato isolado `/private/tmp/torno-blog-release-article-candidate-r3-20261014`: `content_id=torno-artigo-pt-20261014-planilhas`, `intent_id=spreadsheet-to-system-pt`, SHA-256 Markdown `a84d4826d4b1d68efc03767aea2c09dd2ba8386a7b1ddaee87f235cc15974d66`, canonical exato, HTTP 200 e indexável. O `BlogPosting` tem `url` e `mainEntityOfPage` canônicos, sem `author`, `datePublished` ou `dateModified`; os links internos responderam HTTP 200 e links externos usam HTTPS. Os seis cases PT/EN responderam 200 com canonical self. As três rotas da fixture privada responderam 404. `/blog/` e `/en/blog/` responderam 200, indexáveis e com conteúdo por idioma; somente PT lista o artigo e EN mantém o estado vazio sem tradução fictícia.

Saída integral: [production-http-article-r3.log](production-http-article-r3.log). Evidência da API, hashes e lista exata de URLs: [production.json](production.json). Comando reproduzível (read-only):

```sh
node scripts/test-blog-production.mjs https://tornostudio.com /private/tmp/torno-blog-release-article-candidate-r3-20261014
```

O script lê o candidato para conferir os bytes do Markdown e do HTML contra os manifests; não altera produção, deploy ou configuração.
