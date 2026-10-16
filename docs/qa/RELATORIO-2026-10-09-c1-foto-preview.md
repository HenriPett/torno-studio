# QA C1 — foto no preview (09/10/2026)

**Veredito: ok para produção, escopo foto da seção `#quem` em PT/EN.** Preview: https://6ac92fe726fa2e6b0c6c4e00--tornostudio.netlify.app . Nenhum bug encontrado nesse escopo.

| Página | Viewport do portal | Resultado | Evidência visual |
| --- | --- | --- | --- |
| PT `/` | 390 × 844 | Foto carregada, círculo de 96 × 96 px, `alt="Henrique Pett"`, sem corte ou overflow visível | [PT mobile](evidencias/c1-foto-preview-pt-mobile.png) |
| PT `/` | 1280 × 800 | Foto carregada, círculo de 160 × 160 px, sem corte ou overflow visível | [PT desktop](evidencias/c1-foto-preview-pt-desktop.png) |
| EN `/en/` | 390 × 844 | Foto carregada, círculo de 96 × 96 px, `alt="Henrique Pett"`, sem corte ou overflow visível | [EN mobile](evidencias/c1-foto-preview-en-mobile.png) |
| EN `/en/` | 1280 × 800 | Foto carregada, círculo de 160 × 160 px, sem corte ou overflow visível | [EN desktop](evidencias/c1-foto-preview-en-desktop.png) |

**Saída real da inspeção:** o snapshot do portal em PT mobile trouxe `viewport: 390x844` e `@e5 img "Henrique Pett" [17,374 96x96]`; em EN mobile trouxe os mesmos valores. O HTML servido em ambas as línguas contém `picture` com `source type="image/avif"`, `source type="image/webp"` e `img` JPEG com `alt="Henrique Pett"`, `loading="lazy"`, `width="160"`, `height="160"` e `sizes="(min-width: 64em) 160px, 96px"`. Cada formato anuncia variantes 96, 160, 192, 320 e 480 px. As 15 URLs únicas de variantes responderam `200` com os tipos `image/avif`, `image/webp` ou `image/jpeg`. A fonte local foi identificada por `file`/`sips` como WebP 960 × 960.

**Limites:** a CSP do preview recusou `maestri portal evaluate` (`unsafe-eval`); portanto o overflow foi avaliado visualmente nas quatro capturas, sem leitura numérica de `scrollWidth`. Chromium local não foi repetido após o erro `MachPortRendezvousServer Permission denied` já informado. `astro check` e build isolado/Netlify foram informados como aprovados pelo time; não os executei nesta rodada. Não executei Lighthouse. Agendamento A4 foi declarado funcional; conversão Ads continua não verificada e fora deste veredito.
