# Especificação fechada de assets — artigo Torno (2026-10-15)

Status: revisão independente dos arquivos de arte **PASS**, reportada por Timbre. Esta especificação registra os critérios para a futura integração; não representa QA da página integrada nem autorização para integrar/publicar.

## Arte revisada

- Diagrama fornecido para o artigo, sem clipping ou sobreposição na inspeção em 360 px.
- Contraste estimado do texto: 12:1–14,8:1.
- Texto do corpo no SVG em 24 px resulta em aproximadamente 13,5 px a 360 px e 12,3 px na coluna de 328 px.
- Não reduzir a arte além do export de 360 px. A revisão abrangeu os arquivos de arte, não a página integrada.

## Critérios de integração

- Posicionar a figura depois dos três cenários do artigo.
- Em telas maiores, limitar a figura a `max-inline-size: 40rem` (640 px) e centralizá-la.
- Em larguras de até 360 px, usar `100vw` com margem negativa equivalente ao gutter de 16 px; a imagem deve usar largura de 100% e altura automática, renderizando com 360 px.
- Manter a legenda separada da imagem, com fonte de 14 px.
- Não reduzir a arte abaixo do export de 360 px.

## Texto alternativo

Usar alt que resuma o conteúdo sem repetir a legenda. O resumo deve mencionar contexto, ação, resultado, evidência e o portal hipotético. A redação final deve ser conferida contra a arte e o texto integrado.

## Gate futuro

Na revisão do candidato, verificar a posição da figura, o tamanho/renderização em 360 px, a escala e proporção em larguras maiores, a legenda separada de 14 px e a presença do alt descritivo. Esses checks só começam após GO editorial de Farol/Trilha e recebimento do hash final de Verso. Até lá, não criar candidato, build ou alterar os arquivos do artigo.
