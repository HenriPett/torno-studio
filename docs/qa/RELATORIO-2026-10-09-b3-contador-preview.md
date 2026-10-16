# Relatório de QA: B3, contador sem cookie da `/diagnostico/`, preview

> Afinador, 2026-10-09. Preview: `https://6ac8cd4180b50a2aec8a6a7c--tornostudio.netlify.app` (HEAD 37e7500). `QA_COUNTER=preview`.

## Veredito

**Ok para produção.** No preview a função roda e não grava (blob vazio antes e depois). Falta conferir em produção: B3-b (incremento e formato do blob), B3-c com contagem real e B3-d de novo.

## Suíte completa no ar (`QA_DEPLOY2=1`, `QA_COUNTER=preview`)

```
351 passed, 2 failed, 1 flaky, 10 skipped
```

As 2 falhas e a intermitência foram analisadas:

| Caso | Causa | Ação |
|---|---|---|
| C35 `/privacidade/` | Falso positivo do QA: a linha nova "…de forma agregada (um número por dia), **sem cookies** e sem guardar IP…" é legítima; a regra proibia "sem cookies" genérico | Regra restrita à negação geral ("não uso cookies", "este site não usa cookies"). Revalidado: ✓ |
| B3-a | `transfer-encoding: chunked` só na `/diagnostico/`: a resposta via Edge Function sai em streaming, sem `content-length`. É header de transporte, sem dado nem identificador | Tratado como volátil, igual ao `content-length`. Sem `Set-Cookie`, 0 cookies no navegador, nenhum outro header novo. Revalidado: ✓ |
| B3-d (intermitente) | 1ª medição Δ 16,4 ms (provável cold start da função) | Ver abaixo |

## B3-d TTFB (`curl time_starttransfer`, 20 amostras intercaladas, mediana)

| Medição | Home | `/diagnostico/` | Δ |
|---|---|---|---|
| 1 | 76,3 | 92,7 | **16,4** |
| 2 | 77,8 | 85,1 | 7,3 |
| 3 | 74,5 | 82,0 | 7,5 |
| 4 | 73,7 | 84,9 | 11,2 |
| 5 | 71,8 | 78,5 | 6,7 |

Mediana dos Δ = **7,5 ms** (meta ≤ +15). A função custa ~7–11 ms com ela aquecida, e a 1ª requisição fria passou da meta. Repetir em produção.

## Demais

- **B3-p:** visita de browser real no preview não conta. ✓ (`netlify blobs:list visitas-diagnostico` → `[]` antes e depois)
- **B3-c** (no preview): ✓ trivial, porque nada conta.
- **B3-f:** linha da política PT/EN presente. ✓
- **B3-e:** Lighthouse `/diagnostico/`, mobile e desktop: 100 · 100 · 100 · 63; só falha o `is-crawlable` (noindex). ✓
- Franquia (Batuta): edge_functions 1.000.000/mês no plano Free, used 0.
