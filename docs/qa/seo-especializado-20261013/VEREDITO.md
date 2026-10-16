# Veredito QA — SEO especializado — 2026-10-13

**APROVADO COM LIMITAÇÕES para publicar o mesmo artefato validado no preview `6aceb0964d6310adcb4cf102`.** Não foi identificado defeito material nas verificações executadas. Este parecer segue o gate viável explicitamente decidido pelo Maestro, com Lighthouse indisponível aceito como limitação. A liberação técnica/factual do Crivo foi informada pelo Maestro. QA não fez deploy nem modificou implementação.

Preview: https://6aceb0964d6310adcb4cf102--tornostudio.netlify.app

## Execuções reais

`http.log` / `results.json`, usando APIRequestContext, sem Chromium:

```text
8 passed (8.0s)
```

`check-final.log`, execução `npm run check`:

```text
Result (88 files):
- 0 errors
- 0 warnings
- 0 hints
```

Build da release, executado pelo Maestro e lido em `../seo-release-20261013/build.log`:

```text
19:28:15 [build] 12 page(s) built in 1.70s
19:28:15 [build] Complete!
```

## Cobertura confirmada

- As seis rotas respondem 200 e têm um canonical exato em https://tornostudio.com, idiomas corretos e os três alternates reais pt-BR/en/x-default (EN). Pares verificados independentemente do mapa de implementação.
- Sitemap contém exatamente as dez URLs esperadas e os pares corretos. Diagnóstico continua noindex, sem canonical/hreflang e fora do sitemap. Robots permite rastreio e anuncia sitemap absoluto.
- HTML do artefato permite indexação das seis rotas. O edge da Netlify injeta `X-Robots-Tag: noindex` neste host de preview, corretamente separado do contrato de produção. Não se afirma indexação efetiva de uma produção ainda não publicada.
- Links internos e âncoras entre páginas resolvem; descoberta nas homes; nenhum link interno contém UTM/gclid/fbclid autoral. Fragmentos `#conteudo` preservam naturalmente parâmetros da chegada, sem introduzir campanha interna.
- Preços públicos saem de pricing.ts e correspondem a Production-Ready BR18k/US7k e Sprint BR6k/US3k. Conteúdo qualifica escopo, acesso, decisão, impacto e orçamento, distingue triagem gratuita de auditoria e evita recuperação universal. ICP conferido em PT/EN.
- Headings, descrição, atributos alt e JSON-LD quando presente analisados por HTML. Não há schema novo obrigatório; ausência não foi tratada como defeito nem como aprovação de rich result.
- Revisão de 36 screenshots: seis rotas × desktop 1280 e mobile 360 × três regiões. Heros, preço/FAQ ou matriz/SQL legíveis, sem corte material visível. Cards adaptam coluna/duas colunas. Guias mostram tabela e downloads, incluindo runner WASM.
- SQL expandido e rolado horizontalmente no mobile, mantendo header e largura da página. Evidências adicionais `guide-mobile-sql-open.png` e `guide-mobile-sql-scrolled.png`.
- Seletor de idioma observado em Lovable EN→PT e guia EN→PT leva ao equivalente, sem parâmetros de campanha.
- Consentimento: banner visível na chegada e escondido por Recusar; preferências abrem no footer; Medição salva marcada sem Publicidade; reabertura confirma estado; Escape fecha e devolve foco ao botão; Recusar tudo recarrega sem script externo Google/Calendly no DOM. Evidências `consent-pt-*.txt/html` e `consent-en-dialog.png`.
- CTA após revogação navegou para `https://calendly.com/henriquepett/45min`, sem UTM. Destino Calendly confirmado em `cta-destination.txt` e `cta-calendly-no-booking.png`. Nenhum horário selecionado, formulário enviado ou evento de agendamento/conversão disparado por QA.
- FAQ alterna por clique. Evidência separada `faq-click.json`; teclado descrito abaixo, sem alegar aprovação.

## Limitações explícitas

1. **Lighthouse não executado; não há comprovação de escore >=95.** Chromium bloqueado pelo sandbox macOS e PSI API com quota0, conforme evidência do Maestro. Tentativas encerradas por decisão explícita; não tratadas como bloqueio automático deste gate.
2. **Axe e os 60 casos browser preparados não executados.** A suite tem 68 casos, apenas oito HTTP executados. A inspeção visual/semântica manual não certifica conformidade WCAG completa.
3. **Tab/Enter/Espaço e foco visível no FAQ permanecem inconclusivos no portal.** Chamadas `focus`/`key` não produziram alternância nativa de summary; cliques alteraram o atributo open corretamente. Não há reprodução independente que permita classificar isso como defeito do produto. Arquivos `faq-keyboard.json`, `faq-*-keyboard.*`, `faq-debug/enter/space.html` registram tentativas, não testes aprovados. Markup usa details/summary nativo sem interceptação de teclado.
4. CSP bloqueia `portal evaluate` (unsafe-eval); não foi removida nem contornada. Não houve instrumentação runtime de rede completa, sessionStorage/atribuição ou cookies. Atribuição consentida entre páginas não foi reexecutada ponta a ponta. A decisão usa inspeção do código de consentimento, ausência de UTMs internas, fluxo manual e hashes baseline inalterados informados pelo Maestro; não equivale a teste browser de atribuição.
5. Revisão visual principal em tema escuro e viewports 1280/360. Nenhuma afirmação de matriz completa de temas/dispositivos. SQL/JWT/Supabase ponta a ponta não foi executado por QA; execução PGlite e parecer RLS pertencem ao Compasso/Crivo.

## Proveniência e complementos

Maestro informou regressão 22 testes, 44 arquivos publicados byte-idênticos, hashes baseline de consent/ui/BookingCta/pricing/netlify/edge preservados, sete fontes oficiais HTTP200 e aprovação final Crivo. Evidências em `../seo-release-20261013/`, incluindo `official-source-links.json`, `artifact-audit.json`, `source-sha256.json` e `artifact-sha256.json`. Esses resultados complementares não são apresentados como executados por Afinador.

As primeiras duas execuções HTTP falharam por expectativas da própria suite (edge noindex de preview; resolução de fragmento herdando query de chegada). Ajustadas somente na suite, sem modificar produto; logs preservados `http-first-edge-noindex.log` e `http-second-fragment-fixture.log`. A execução final passou integralmente.

## Reprodução HTTP

```sh
QA_BASE_URL=https://6aceb0964d6310adcb4cf102--tornostudio.netlify.app \
QA_CANONICAL_ORIGIN=https://tornostudio.com QA_INDEXING=true \
QA_PREVIEW_EDGE_NOINDEX=true \
node_modules/.bin/playwright test \
  -c docs/qa/seo-especializado-20261013/playwright.config.ts --grep @http
```

Em domínio de produção, remover QA_PREVIEW_EDGE_NOINDEX: a suite deve exigir ausência efetiva de noindex no header também. Qualquer alteração no artefato após este parecer exige revisão proporcional do delta.
