# QA SEO especializado — 2026-10-13

Responsável: Afinador. Status: PREPARADO, aguardando páginas e preview. Sem aprovação de produção.

## Escopo e contratos

- PT/EN reais: recuperação ↔ software-project-rescue; lovable-em-producao ↔ lovable-to-production; guias/rls-multiempresa ↔ en/guides/multi-tenant-rls.
- Canonical de produção: https://tornostudio.com. Preview: confirmar origem configurada no artefato. Canonical limpo, um por página; hreflang pt-BR/en/x-default, este último EN; reciprocidade e respostas 200.
- Sitemap com 10 URLs (6 novas + 4 existentes), sem diagnóstico. Diagnóstico permanece noindex, sem canonical/hreflang. Preview noindex; produção indexável.
- Commercial: Production-Ready R$ 18.000 / US$ 7,000 condicionado ao escopo; legado incerto entra pelo Sprint R$ 6.000 / US$ 3,000. Fonte única pricing.ts. Conferir redação e não apenas valores.
- ICP BR 50–249 com operação real. EN founder financiado ou com receita, usuários/piloto concreto. Impacto, decisor, acesso autorizado e orçamento. Sem promessa universal de recuperação.
- Links internos limpos, pares de idioma corretos, âncoras existentes, descoberta via home/footer e comerciais/guias.
- SQL: exemplo presente e legível, políticas com identidade e autorização/membership; parecer técnico e execução SQL pelo Compasso/Crivo. Regex não prova isolamento.
- Consentimento: zero terceiros e persistência de campanha antes de escolha e após recusa; Medição mantém campanha externa por navegação sem UTM interna; revogação limpa sessão. Origem manual na call A3. Sem tracking novo.
- CTA: destino correto e acessível por teclado. Nenhuma agenda real, conversão ou evento de agendamento será disparado. Automação Calendly usa stub local de script, rede Google abortada.

## Automação preparada

64 casos descobertos pelo Playwright; 8 request-only com `--grep @http`, sem lançamento de Chromium. Restantes preparados para runner browser disponível. A descoberta não é execução nem aprovação.

```
QA_BASE_URL=https://PREVIEW QA_CANONICAL_ORIGIN=https://ORIGEM QA_INDEXING=false \
  node_modules/.bin/playwright test \
  -c docs/qa/seo-especializado-20261013/playwright.config.ts \
  --grep @http
```

Para um artefato indexável independente, executar com QA_INDEXING=true e canônico https://tornostudio.com. Não executar isso contra preview noindex esperando produção. Artefatos de teste, screenshots e logs ficam neste diretório. A suite original S7 é responsabilidade do Batuta.

## Revisão equivalente no portal

Para cada rota: desktop 1280×900 e mobile 360×844, screenshot integral, overflow, conteúdo cortado, contraste visual, zoom/legibilidade, h1/headings, landmarks/nomes acessíveis via snapshot, foco visível, idioma, CTA por trial/interceptação segura ou inspeção do destino, links de idioma e voltar. Guia: SQL com scroll horizontal no bloco e sem overflow da página. Banner e diálogo: recusa, personalização, Escape, foco e preferências no footer. Conferir carregamento de imagens, console/rede e ausência de erro material. Inspeção manual não equivale a um escore Lighthouse.

## Ambiente e decisão do gate

Node v26.9.0; Lighthouse instalado 12.6.1. Chromium instalado, mas launch falha com `bootstrap_check_in org.chromium.Chromium.MachPortRendezvousServer: Permission denied (1100)` / SIGTRAP no sandbox macOS. Não repetir launch nem tentar escalada. PSI API reportada pelo Maestro com 429 quota0, evidência externa /private/tmp/torno-seo-pagespeed-probe.json.

Decisão explícita do Maestro: parar tentativas Lighthouse; indisponibilidade deve constar como limitação, não bloqueio automático se build/check, HTML/SEO/schema/links e revisão portal completa não encontrarem defeito material. Não afirmar LH >=95, nem axe executado, sem resultado. Aprovação de produção exige vereditos explícitos de Afinador e Crivo.

## Relato de bugs

Cada bug terá passos exatos, esperado, obtido, severidade, evidência e dono. UI para Ritmo; infraestrutura/SEO/SQL conforme propriedade Compasso. QA não altera implementação. Não modificar arquivos alheios/sujos, não publicar deploy.

## Checkpoint 19:25 UTC

Os três erros TS2345 reportados por Ritmo na suite QA foram corrigidos. Execução real `npm run check`, log `check.log`:

```
Result (83 files):
- 0 errors
- 0 warnings
- 0 hints
```

Houve aviso pré-diagnóstico do Astro sobre coleção `seo` automática sem Markdown. Não foi feito build compartilhado; build de release pertence ao Maestro. Ainda não é aprovação QA do preview.

## Complemento Timbre / Ritmo

Revisar FAQ em PT/EN por Tab, Enter e Espaço, incluindo foco visível e alternância open/closed. Interação ainda inconclusiva na revisão anterior. Confirmar cards em breakpoint 48em, H1 limitado a 18ch, lead a 60ch e ordem escopo → contato → FAQ. Quatro casos browser preparados adicionais; total esperado 68, dos quais 8 HTTP. Revisão portal ainda pendente.
