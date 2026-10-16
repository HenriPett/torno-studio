# Reconciliação append-only — SVG do artigo critérios MVP

**Gate final de QA pós-produção: PASS.** Deploy `6ad0ca2a4a4dafb0c6955f29`. Esta nota adiciona a reconciliação ao histórico; não altera o snapshot, os recibos nem a evidência anterior [production-criteria-v3-20261015.json](production-criteria-v3-20261015.json), que registrou 22/22 checks PASS às 13:27:28 UTC.

## URL efetiva e origem do HOLD

O HTML bruto de produção e do draft tem 29.427 bytes, SHA-256 `4d0da2ae68a0202501063472a8b98967ae286394adc1a7014e5397b3927c9fb8`, igual ao `dist/blog/criterios-aceite-mvp/index.html`. Ambos contêm literalmente `src="/_astro/torno.B0vlPKCG_Z7VeG1.svg"`; o sufixo em hexadecimal é `43475f5a37566547312e737667` (`VeG1`). O arquivo `dist/_astro/torno.B0vlPKCG_Z7VeG1.svg` tem 2.622 bytes e SHA-256 `77d857000b37aa06cf03a1d61905b8b67cb3ef2c3df7ca2dd5d53b0185750582`, igual ao manifesto.

O HOLD provisório surgiu de um 404 informado para a grafia trocada `Ve1G`. O coordenador informou GET cold dessa grafia com HTTP 404, request ID `01M4ZW1R7Q662R22YFY3MX8F0D`, e da grafia real `VeG1` com HTTP 200, request ID `01M4ZW1R4PEN9A8YZ8VSV6H9KE`. Esses dois request IDs são evidência fornecida pelo coordenador, não solicitações deste reteste.

## Reteste independente da URL real

Entre **13:30:39 e 13:30:41 UTC**, QA extraiu o `src` dos bytes HTTP de cada página e fez GET à URL resultante, sem corrigir ou digitar manualmente o nome:

| Origem | URL do SVG | HTTP/MIME | Bytes/SHA-256 | Request ID |
| --- | --- | --- | --- | --- |
| Produção | `https://tornostudio.com/_astro/torno.B0vlPKCG_Z7VeG1.svg` | `200 image/svg+xml` | 2.622 / `77d857000b37aa06cf03a1d61905b8b67cb3ef2c3df7ca2dd5d53b0185750582` | `01M4ZW3ZGRZ32JSXKQT49RWS2W` |
| Draft | `https://6ad0ca2a4a4dafb0c6955f29--tornostudio.netlify.app/_astro/torno.B0vlPKCG_Z7VeG1.svg` | `200 image/svg+xml` | 2.622 / `77d857000b37aa06cf03a1d61905b8b67cb3ef2c3df7ca2dd5d53b0185750582` | `01M4ZW4027BT3H283FG41Q8HRB` |

Ambas as respostas tiveram `Content-Length: 2622`, `Cache-Control: public,max-age=31536000,immutable` e ETag `"44345886475ff1ef69e88935150f25cf-ssl"`. O 404 não foi reproduzido na URL real. Evidência completa de status, headers, bytes, hashes e horário: [asset-delivery-retest-20261015.json](asset-delivery-retest-20261015.json). O primeiro exame independente, às 13:28:54 UTC, permanece em [asset-delivery-investigation-20261015.json](asset-delivery-investigation-20261015.json).

O gate de produção 22/22 PASS fica mantido. Nenhuma fonte externa foi reconsultada, e não houve edição de código, alteração de artefato ou deploy neste reteste.
