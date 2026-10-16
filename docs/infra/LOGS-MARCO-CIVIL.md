# Proposta D13: registros de acesso por 6 meses (Marco Civil, art. 15) na Netlify

> Autor: Batuta, 2026-10-08. Status: **NÃO ADOTADO (decisão do fundador, 08/10/2026).** A guarda de registros de acesso por 6 meses foi cancelada. Nada aqui foi implementado. Mantido só como histórico. A validação do Alicerce (aprovado com 7 ajustes, `research/09` §3.2) fica registrada para o caso de a decisão ser revista.
> Premissas: o site é estático na Netlify (plano Free, legado `nf_team_dev`). Log drains da Netlify só existem no Enterprise (`research/09` §3).

## 1. Solução proposta (a mais simples que cumpre o checklist do Alicerce)

```
visitante ──► Netlify Edge Function `access-log` (path "/*")
                 │  1. devolve a resposta normalmente (context.next())
                 │  2. em segundo plano (context.waitUntil): PUT de 1 linha JSON
                 ▼
          AWS S3, região sa-east-1 (São Paulo), bucket privado
             - grava só: ts (UTC, ISO 8601), ip, port (se houver), host
             - chave: access/AAAA/MM/DD/HH/<uuid>.json
             - Lifecycle: expira objetos após 183 dias (exclusão automática)
             - SSE-S3 (criptografia em repouso), Block Public Access, versionamento off
             - credencial da Edge Function: usuário IAM só com s3:PutObject no prefixo access/
             - leitura: só o fundador (IAM com MFA obrigatório)
             - CloudTrail data events (só GetObject/ListBucket) → registra quem leu
```

### Por que assim
- **Toda requisição** (HTML e assets, inclusive servidos do cache da CDN) passa pela Edge Function, sem amostragem (item 1 do checklist).
- **Mínimo de dados**: data/hora, IP, porta e host; sem path, user agent, referer ou UTMs (itens 2 e 3).
- **Retenção e expurgo automáticos** pela regra de ciclo de vida do S3 (item 4).
- **Dados no Brasil** (sa-east-1): não cria transferência internacional nova (art. 33), só a já existente da Netlify.
- **Sigilo e auditoria de acesso**: bucket privado, criptografado, MFA, CloudTrail de leitura (itens 5 e 6; Decreto 8.771 art. 13).
- **Falha não derruba o site**: a gravação roda depois da resposta (`waitUntil`) com try/catch. Falhas vão para o log da função, e um alarme do CloudWatch avisa por e-mail quando não chega nenhum objeto novo em 1 h, num horário com tráfego (item 8).
- **Sem cookie e sem identificador no navegador** (item 9).

## 2. Custo estimado

| Item | Base de cálculo [ESTIMATIVA] | Custo/mês |
|---|---|---|
| Netlify Edge Functions | 1 invocação por requisição. Tráfego esperado na fase 1: < 100 mil req/mês. O plano Free legado inclui uma franquia mensal de invocações **[HIPÓTESE: 3 milhões; conferir em Billing da Netlify antes de ligar]** | US$ 0 dentro da franquia |
| S3 PUT (sa-east-1) | ~US$ 0,007 por 1.000 PUT × 100 mil | ~US$ 0,70 |
| S3 armazenamento | ~300 bytes × 600 mil objetos (6 meses) ≈ 0,2 GB | < US$ 0,01 |
| CloudTrail data events (só leituras) | poucos eventos por mês | ~US$ 0 |
| CloudWatch (1 alarme) | — | ~US$ 0,10 |
| **Total** | | **< US$ 1/mês** (sobe linearmente com o tráfego: ~US$ 7 por milhão de requisições) |

Custo único: ~2–3 h de implementação + 1 h do fundador para criar a conta AWS com MFA (ação dele).

Alternativa mais cara, para comparação: Vercel Pro + Log Drain (~US$ 21/mês) ou Netlify Enterprise (sob consulta).

## 3. Impacto no site

- **Desempenho**: a Edge Function roda na borda antes de servir o arquivo, o que acrescenta alguns ms de TTFB [HIPÓTESE: < 10 ms; medir com Lighthouse/WebPageTest antes e depois]. A gravação no S3 não bloqueia a resposta. Meta: Lighthouse continua ≥ 95.
- **Código**: `netlify/edge-functions/access-log.ts` (~40 linhas, assinatura SigV4 com `aws4fetch`) + bloco `[[edge_functions]]` no `netlify.toml`. Segredos (`LOG_AWS_ACCESS_KEY_ID`, `LOG_AWS_SECRET_ACCESS_KEY`) só na env da Netlify, nunca no repo.
- **Privacidade** (item 10): a política PT/EN passa a dizer "registros de acesso (IP, data e hora) guardados por 6 meses, por exigência do Marco Civil da Internet (art. 15), em servidor da AWS no Brasil, e depois apagados". A AWS entra como operadora (item 11).
- **QA**: teste "10 requisições → 10 registros", inspeção de um registro com IP mascarado, prints da regra de ciclo de vida, do MFA e do CloudTrail (validação (i)–(iv) do Alicerce).

## 4. Pendências para implementar

1. OK do Maestro do projeto (custo e impacto acima).
2. Validação do desenho pelo Alicerce.
3. O fundador cria a conta AWS (ou usa uma existente), ativa MFA e me passa as credenciais do usuário IAM de escrita por um canal seguro (env da Netlify).
4. Conferir a franquia de Edge Functions no Billing da Netlify.
