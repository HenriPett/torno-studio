# Esquema do pacote de setor (`data/<setor>.json`)

Fonte da verdade: `demo/PLANO.md` §3. Validação: `node demo/scripts/validate.mjs [setor…]`.
Tudo fictício (empresa, pessoas, clientes, fornecedores genéricos, telefones `(47) 9••••-1234`).
Datas `AAAA-MM-DD`, data de referência ("hoje") **2026-11-13**. Moeda em reais (número, sem símbolo).

## Topo
| campo | tipo | nota |
|---|---|---|
| `id` | texto | = nome do arquivo (`textil`, `moveis`…) |
| `setor` | texto | nome legível |
| `data_referencia` | data | `2026-11-13` |
| `empresa` | `{nome, cidade, uf, funcionarios, descricao}` | nome inventado |
| `vocabulario` | objeto | chaves FIXAS: `ordem ordens produto produtos cliente clientes representante representantes maquina maquinas linha linhas unidade lote`; valores no jargão do setor |
| `areas` | `[{id, nome}]` | ids FIXOS: `producao qualidade manutencao comercial marketing operadores gestao` |

## Coleções (quantidade mínima–alvo)
| coleção | qtd | campos (`?` = pode ser `null`) |
|---|---|---|
| `plantas` | 2-3 | `id nome cidade` |
| `linhas` | 4-6 | `id nome planta→plantas tipo` |
| `maquinas` | 10-14 | `id nome linha→linhas tipo fabricante ano status(operando/alerta/parada/manutencao) horimetro mtbf_h proxima_preventiva manual→documentos` |
| `produtos` | 10-14 | `sku nome familia unidade preco prazo_dias estoque estoque_minimo descricao_comercial ficha{atributos{}, roteiro[], especificacoes[{caracteristica nominal tolerancia unidade}]}` |
| `ordens` | 15-20 (3-5 atrasadas) | `id sku→produtos quantidade linha→linhas inicio prazo status(planejada/em_producao/atrasada/concluida) progresso(0-100) pedido?→pedidos motivo_atraso? historico[{data evento}]` |
| `turnos` | 6-8 | `data turno linha→linhas produzido refugo paradas_min resumo ocorrencias[]` (chave = `data\|turno\|linha`) |
| `nao_conformidades` | 8-10 (1-2 com 8D) | `id data sku linha origem(interna/cliente/fornecedor) severidade(baixa/media/alta) descricao causa acao status(aberta/em_analise/encerrada) responsavel oito_d?{D1…D8}` |
| `manutencao` | 8-12 | `id maquina→maquinas tipo(corretiva/preventiva/preditiva) data status(aberta/em_execucao/concluida) tecnico duracao_h descricao pecas[] procedimento?→documentos` |
| `representantes` | 5-6 | `id nome regiao telefone(mascarado) meta_mes realizado_mes` |
| `clientes` | 10-12 | `id nome cidade uf segmento representante→representantes condicao_pagamento limite_credito tabela_preco ultimo_pedido` |
| `pedidos` | 12-15 | `id cliente→clientes representante→representantes data status(em_analise/aprovado/em_producao/faturado/entregue/atrasado) previsao_entrega ordem?→ordens itens[{sku preco_unit quantidade}] observacao` |
| `regras_comerciais` | 5-6 | `id titulo texto` |
| `kpis` | 6-8 | `id nome valor unidade meta direcao(maior_melhor/menor_melhor) area tendencia[12 números, último = valor] explicacao caminho[] fontes[]` |
| `documentos` | 12-16 | `id titulo tipo(procedimento/norma/manual/ficha_tecnica/contrato/catalogo/email/chamado/planilha/instrucao) area origem(SharePoint/ERP/MES/E-mail/Pasta da qualidade/PLM/Planilha) atualizado acesso[áreas] trechos[{id secao texto}](2-4)` |
| `saberes` | 8-10 | `id autor funcao tempo_casa_anos area maquina?→maquinas titulo dica validado_por data tags[]` |
| `integracoes` | 6-8 | `id nome("ERP (ex.: …)") tipo status(conectado/sincronizando/erro/planejado) ultima_sync(AAAA-MM-DDTHH:MM) registros observacao` |
| `perfis_acesso` | 5-7 | `id nome areas[] usuarios` — um perfil Diretoria com todas as áreas |
| `registro_uso` | 8-12 | `data(AAAA-MM-DDTHH:MM) perfil→perfis_acesso area pergunta fontes[]` |
| `perguntas_sugeridas` | ≥2 por módulo | `modulo pergunta resposta fontes[]` — módulos: `visao-geral cerebro producao qualidade manutencao comercial marketing operadores portal`; a resposta repete os números dos registros citados |
| `conversa_whatsapp` | 6-8 | `de(representante/assistente) hora(HH:MM) texto fontes[]` |
| `marketing` | 4-6 | `id tipo(ficha_produto/conteudo_tecnico/resposta_cliente/post) titulo texto status(rascunho/em_revisao/aprovado) sku?→produtos fontes[]` |
| `portal` | objeto | `titulo boas_vindas destaques[sku] avisos[{titulo texto}]` |

## Referências (`fontes`)
Strings `tipo:id`: `doc:DOC-ID` ou `doc:DOC-ID#trechoId`, `op:`, `pedido:`, `sku:`, `nc:`, `os:`, `maq:`, `kpi:`,
`saber:`, `cliente:`, `rep:`, `regra:`, `integ:`, `turno:data|turno|linha`. Todas precisam existir.

## Coerência (checada pelo validador)
- Pedido `atrasado` → `ordem` com status `atrasada` ou motivo em `observacao`.
- OP `atrasada` → `prazo` ≤ 2026-11-13 ou `motivo_atraso` preenchido. OP `concluida` → `progresso` 100.
- Avisos: máquina em `alerta` sem OS aberta; nenhum estoque abaixo do mínimo; nenhum pedido atrasado.
