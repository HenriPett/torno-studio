# Relatório de QA: deploy 2B, landing `/diagnostico/`

> Afinador, 2026-10-08. Preview: `https://6ac829a5cf7d6599acec02b9--tornostudio.netlify.app/diagnostico/` (HEAD 3a7a772, texto do Mote completo).

## Veredito

**Ok para produção.** Um bug de teclado de gravidade baixa (B8) fica aberto com o Ritmo e não bloqueia: não afeta mouse nem toque, e no teclado a escolha se completa numa segunda tentativa.

## Suíte no ar (`QA_DEPLOY2=1`)

```
348 passed, 0 failed, 1 flaky (CS-f teclado na home = B8), 9 skipped
```

- D1–D13: 13/13 ✓.
- CS na landing: 17/17 ✓ (consentimento + conversão).
- CS na home: ✓.
- C1–C35: ✓.

Correções do próprio QA nesta rodada:
- **D1:** canonical checado com `count()`, porque a rota de campanha não tem canonical.
- **D6:** links das políticas dos fornecedores (`calendly.com/legal/…`, `policies.google.com/…`) permitidos só dentro do diálogo de consentimento.
- **D7:** o regex aceita "de, em média, 48 horas".
- **D8:** os degraus são comparados sem o link de CTA interno, que a landing tira por ter CTA único. Os preços, prazos e textos são idênticos aos da home.

## Lighthouse `/diagnostico/`, banner aberto, 3 runs, mediana

| Formato | Perf | A11y | BP | SEO | Falhas |
|---|---|---|---|---|---|
| mobile | 100 | 100 | 100 | 63 | is-crawlable |
| desktop | 100 | 100 | 100 | 63 | is-crawlable |

O SEO perde só o `is-crawlable` (noindex intencional, tanto do preview quanto da rota).

## B8. Depois de Esc no diálogo, o foco volta ao "Personalizar" com atraso. Baixa, → Ritmo

- **Passos (teclado):** abrir `/` sem escolha → focar "Personalizar" → Enter (o diálogo abre) → Esc (fecha) → focar "Recusar" → Enter.
- **Esperado:** recusa gravada, banner fecha, foco em `main#conteudo`.
- **Obtido, intermitente (9/40 execuções automáticas):** o diálogo **reabre** (`dialog.open = true`, foco no `h2#consent-title`, `ts-consent` = null). Em parte das execuções, o foco que pus no "Recusar" foi roubado logo depois (`toBeFocused` falha). A devolução de foco ao fechar com Esc parece assíncrona e cai no "Personalizar" depois que o usuário já se moveu; o Enter seguinte reabre o diálogo.
- **Impacto:** usuário de teclado rápido pode reabrir o diálogo em vez de recusar. A segunda tentativa funciona. Mouse e toque não são afetados.
- **Prova:** CS-f teclado (intermitente) e o script de repetição com 40 iterações descrito acima.

## B8: resolvido (aac0049, Ritmo)

Causa: o foco voltava no evento `close` do `<dialog>`, que é assíncrono. Correção: `cancel` com `preventDefault`; Esc e × fecham e devolvem o foco ao "Personalizar" de forma síncrona.

Revalidação (build isolado do HEAD `aac0049` com `PUBLIC_GADS_ID`, `--retries=0`):
- Passo a passo do B8, com a asserção nova de foco no "Personalizar" logo após o Esc: **40/40 passed** (4 workers).
- CS-f teclado (home, EN e landing): **60/60 passed** (`--repeat-each=20`).
