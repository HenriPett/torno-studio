# Referência editorial espelhada

Este diretório traz um espelho de consulta do repositório `projeto-50k/marketing/blog`, capturado em 16/10/2026 para que quem clonar `torno-studio` tenha o contrato e a proveniência necessária para trabalhar no blog.

Os arquivos `CONTRATO-EDITORIAL.md`, `HISTORICO-INTENCAO-URL.md` e `MICROCOPY-ESTRUTURA.md` foram copiados sem alterações. Seus SHA-256 na origem e neste espelho são, respectivamente:

- Contrato: `f05cee61d30ce61843fca5bf96b336b1655ed4ac495a5c50bb521ec70045afcf`
- Histórico: `159e73d4f96a6c7a1763bf80ca4f28adc15f97731b93052b7c4c293f57ad4d8b`
- Microcopy: `548765cad06dc68c2595537b754df3b10550911b7c38da2da5d48b737d51971b`

Os subdiretórios `receipts/` e `reviews/` guardam recibos de inclusão, decisões editoriais, folhas e evidências de fontes usadas no build atual. O arquivo `receipts/HISTORICO-INTENCAO-URL-pre-publicacao-manutencao-20261016.md` é o prefixo exato do histórico no momento do recibo de aprovação da manutenção; o histórico completo na raiz inclui também a publicação observada depois. `src/config/blog-release-approval.json` é o manifesto técnico de aprovação consumido pelo build; ele também fica hash-validado no código.

Para decisões novas, reconcilie este espelho com `projeto-50k/marketing/blog/` antes de editar. O histórico deve ser append-only: mantenha HOLD e GO anteriores e registre `published` apenas após observar a URL pública e concluir QA pós-deploy. Os recibos deste diretório descrevem aprovações passadas; não autorizam mudanças nos artigos atuais.
