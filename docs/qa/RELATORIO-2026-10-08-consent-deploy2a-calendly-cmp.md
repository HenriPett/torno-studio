# Relatório de QA: deploy 2A, banner do próprio Calendly (Alicerce, research/09 §6, ajuste 2)

> Afinador, 2026-10-08. Preview: `https://6ac81f5def42caa1e1962750--tornostudio.netlify.app` (HEAD com f7967e1). O código não usa `hide_gdpr_banner` (confirmado pela Batuta).

## Veredito

**PARADO (regra do Alicerce).** Com IP do Brasil, o quadro do Calendly faz requisições a Google Analytics, Google Tag Manager e Facebook **antes** de qualquer resposta ao banner do Calendly.

## Método

1. Sessão limpa. No nosso banner: Personalizar → **só Medição** → Salvar.
2. Clique no CTA do hero → popup do Calendly.
3. Durante 20 s, **sem nenhuma interação** com o quadro, registrar as requisições feitas **pelo iframe** (`request.frame() !== mainFrame`) a `google-analytics.com`, `googletagmanager.com`, `doubleclick`, `facebook.com/net`.
4. Ler, dentro do iframe, o estado do OneTrust do Calendly (`#onetrust-banner-sdk` visível; `OnetrustActiveGroups`) e a resposta de `geolocation.onetrust.com`.

## Brasil (IP real da máquina de QA, geolocalização do OneTrust: `{"country":"BR","state":"SC","continent":"SA"}`)

- Banner do Calendly: **visível**.
- `OnetrustActiveGroups` **antes da resposta**: `,C0001,C0003,C0002,C0004,`. Todos os grupos ativos por padrão: modelo opt-out.
- Requisições do quadro antes da resposta:

```
+5.8s www.google-analytics.com/analytics.js
+5.8s connect.facebook.net/en_US/fbevents.js
+5.8s www.googletagmanager.com/gtag/js
```

- Em 20 s não houve hit de coleta (`/collect`, `facebook.com/tr`), só o download dos scripts. Esse download já transfere IP, user-agent e referer a Google e Meta antes da resposta.
- Reproduzido também no preview anterior (`6ac81ed…`): mesmos 3 scripts a +4,9 s; banner presente.
- Evidência: `docs/qa/evidencias/calendly-cmp-brasil.png`.

## UE (simulada, NÃO é IP europeu)

- **Método:** o OneTrust do Calendly escolhe o modelo pela resposta de `https://geolocation.onetrust.com/…`. O Playwright interceptou essa resposta e trocou `country` por `DE` e `continent` por `EU`. O resto é a rede real.
- Resultado: banner visível; `OnetrustActiveGroups` = `,C0001,` (só estritamente necessários). **Nenhuma** requisição a GA, GTM ou Facebook em 20 s sem resposta. Modelo opt-in.
- Evidência: `docs/qa/evidencias/calendly-cmp-ue-simulada.png`.
- **Lacuna declarada:** não houve teste a partir de um IP europeu real. A simulação cobre só a decisão por geolocalização do OneTrust. Outros sinais (IP visto pelo Calendly no servidor, idioma, regras do lado do Calendly) não foram exercitados.

## O que fica para decisão (Batuta/Alicerce)

O comportamento é do Calendly (CMP dele, modelo por região) e acontece só depois que o visitante aceitou a **Medição** no nosso banner. A política (f7967e1) já cita os trackers do quadro. A dúvida é se o aceite de Medição no nosso banner basta para o carregamento opt-out do Calendly no Brasil. Alternativas técnicas (não testadas): `hide_gdpr_banner` não resolve, porque só esconde o banner; link de saída em vez de popup para quem não quer trackers do Calendly; ou manter o popup e declarar explicitamente na Medição.

O restante do deploy 2A no preview anterior (`6ac81ed…`): suíte no ar 314 ok; as 2 falhas eram falso positivo do C33, já corrigido (62/62 na auditoria); CS-i 2/2 no deploy 2. Lighthouse do preview novo **não executado** por causa da parada.
