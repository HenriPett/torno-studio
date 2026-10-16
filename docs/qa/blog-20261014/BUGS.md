# Achados durante o build privado

## B5 — Artigo sem byline é bloqueado e receberia `author` no JSON-LD

- **Severidade:** alta, bloqueia o primeiro artigo real sem autoria atribuída.
- **Passos:** ler a fixture elegível `qa-pair-pt.md`, definir `author_name: null` e `author_basis: null`, chamar `validateRecord(data, body, '2026-10-14T20:00:00Z', approval)`; inspecionar `src/components/blog/BlogArticle.astro:16` para o schema do mesmo registro.
- **Esperado:** o contrato editorial permite artigo aprovado sem byline; JSON-LD omite inteiramente `author` e datas sem evidência.
- **Obtido:** execução real retornou `Error: [blog] qa-pair-pt: author_name required for release` (exit 1). `src/config/blog.mjs:34` exige os dois campos para todo candidato. `BlogArticle.astro:16` monta `author: {'@type':'Person', name:d.author_name}` incondicionalmente; se o validador fosse ajustado isoladamente, o schema ainda atribuiria `Person` com nome nulo.
- **Estado:** reportado a Compasso e Batuta; QA não editou `src`. Retestar no snapshot do artigo quando chegar, antes de liberar o gate.

Nenhum arquivo de implementação foi alterado por QA. Os achados abaixo foram enviados ao Compasso; reteste após correção.

## B1 — Guard rejeita sitemap gerado na mesma build

- **Severidade:** alta, bloqueia build com artigo elegível.
- **Passos:** gerar fixture com `node scripts/test-blog-fixture-prepare.mjs`; executar `python3 /private/tmp/torno-blog-build.py --fixture-dir /private/tmp/torno-blog-fixtures-20261014 --build-at 2026-10-14T20:00:00Z --output /private/tmp/torno-blog-qa-20261014`.
- **Esperado:** build isolado conclui após validar os links internos.
- **Obtido:** `astro check` 0 erros; depois `[blog-link-guard] broken or invisible link: /en/blog/qa-equivalent-pair/ -> /sitemap-index.xml` no `astro:build:done`.
- **Estado:** Compasso informou correção da ordem dos hooks; reteste r3 passou desse ponto.

## B2 — TypeScript impede build privado

- **Severidade:** alta, bloqueia build.
- **Passos:** mesma fixture; saída fresca `/private/tmp/torno-blog-qa-20261014-r2`.
- **Esperado:** `astro check` sem erros.
- **Obtido:** `ts(7006)` em `astro.config.mjs:94:18`, parâmetro `url` implicitamente `any`. Saída real: [fixture-build-r2.log](fixture-build-r2.log).
- **Estado:** Compasso informou correção JSDoc; r3 avançou pelo check.

## B3 — Guard interpreta links da home como escape do output

- **Severidade:** alta, bloqueia build com artigo elegível.
- **Passos:** mesma fixture; saída fresca `/private/tmp/torno-blog-qa-20261014-r3`.
- **Esperado:** links legítimos `/` e `/#precos` apontam para `dist/index.html`, com fragmentos existentes.
- **Obtido:** após `sitemap-index.xml` ser criado, `[blog-link-guard] [blog] link escapes output`. O código converte `pathname /` em `rel=""`; `path.resolve(root, "")` devolve a própria raiz e falha na checagem `startsWith(root + path.sep)`. O HTML da fixture contém links `/`, `/#precos`, `/#garantias`, `/#quem`, `/#faq`. Saída real: [fixture-build-r3.log](fixture-build-r3.log).
- **Estado:** corrigido por Compasso; build privado v5-final e suíte fixture 7/7 passaram.

## B4 — Tabela longa quebra palavras por caractere em 390 px

- **Severidade:** média; afeta artigo futuro, não os índices vazios deste release.
- **Passos:** abrir a fixture privada `http://127.0.0.1:4337/blog/qa-registro-de-handover/` no Maestri Portal a 390×844, clicar “Recusar” no aviso de cookies e rolar cerca de 550 px até a tabela.
- **Esperado:** colunas legíveis, com rolagem horizontal dentro do bloco quando a largura exceder o viewport.
- **Obtido:** a primeira coluna exibe “Etapa” e “QA” verticalmente, uma letra por linha; a segunda ocupa várias linhas. Captura: [fixture-code-table-mobile-390.png](fixture-code-table-mobile-390.png).
- **Estado:** corrigido no snapshot v5-final; tabela PT/EN legível em 360/390 px, rolagem restrita ao bloco confirmada no Portal. Foco e `tabindex=0` confirmados; movimento por seta/Tab no Portal ainda não comprovado, conforme [gate](GATE.md).
