# SPEC: consentimento, Google Ads e conversão "diagnóstico agendado"

> Autor: Batuta, 2026-10-08. Pedido do fundador (tag do Google Ads `AW-934581192`), alinhado com `projeto-50k/marketing/pago/pedido-batuta-tracking.md` v0.5 (R2, R4.2–R4.4, R5, R5.1) e com o Alicerce (`research/09` §4).
> **Escopo deste deploy:** banner de consentimento, Consent Mode v2, tag do Google Ads, popup do Calendly com conversão, repasse de UTM, CSP e política de privacidade reescrita. **Fora:** GA4 (não há `G-…`), Microsoft Clarity (R9), landing `/diagnostico/` (R6).
> **Regra-mãe:** nada de terceiros carrega nem grava antes do aceite (Consent Mode **básico**). Banner, política e tags vão ao ar **no mesmo deploy**.

## 1. Variáveis (Netlify; vazia = recurso desligado)

| Variável | Valor | Contextos |
|---|---|---|
| `PUBLIC_GADS_ID` | `AW-934581192` | production e deploy-preview (para o QA) |
| `PUBLIC_GADS_CONV_LABEL` | rótulo da ação de conversão "Diagnóstico agendado" → `send_to: AW-934581192/<label>` | **PENDENTE (fundador)**. Vazio = o evento de conversão não é enviado |
| `PUBLIC_CONSENT_VERSION` | `1` (constante no código também serve) | — |

Sem `PUBLIC_GADS_ID`, o banner continua existindo só se houver alguma categoria opcional ativa (Medição controla o popup do Calendly e a UTM). Portanto, **o banner sempre existe em produção**.

## 2. Categorias (2º nível do banner)

| Categoria | Padrão | Controla |
|---|---|---|
| Necessários | sempre ligada | tema (localStorage) e o próprio registro de consentimento |
| Medição | desmarcada | popup do Calendly (carrega `assets.calendly.com` sob demanda) e repasse das 5 UTMs ao Calendly; `analytics_storage` (pronto para o GA4 futuro) |
| Publicidade | desmarcada | `gtag.js` + `config AW-…`; `ad_storage`, `ad_user_data`, `ad_personalization`; evento de conversão |

## 3. Sequência técnica

1. **Em todas as páginas, inline no `<head>` antes de qualquer outra coisa do Google:**
   ```js
   window.dataLayer = window.dataLayer || [];
   function gtag(){dataLayer.push(arguments);}
   gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});
   ```
   Isso não faz nenhuma requisição nem grava cookie.
2. Ler o registro `localStorage['ts-consent']` = `{v, ts, medicao, publicidade}`. Ele vale 6 meses ou até `v` mudar. Se não houver registro válido, abrir o banner.
3. **Só se `publicidade === true`** (no carregamento ou no clique em Aceitar/Salvar):
   - `gtag('consent','update',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted'})`, e `analytics_storage` acompanha a Medição;
   - injetar `<script async src="https://www.googletagmanager.com/gtag/js?id=AW-934581192">`;
   - `gtag('js', new Date()); gtag('config','AW-934581192');`.
4. **Revogação / recusa depois de aceitar:** `gtag('consent','update',{…:'denied'})`, apagar os cookies 1ª parte `_gcl_*` (e `_ga*`, se existirem) no domínio e no `.tornostudio.com`, e recarregar a página para descarregar o `gtag.js`.
5. **CTAs de agenda:** continuam `<a href="{bookingUrl}">`, que funciona sem JS.
   - Com Medição: o clique faz `preventDefault`, carrega sob demanda `https://assets.calendly.com/assets/external/widget.js` + `widget.css` e chama `Calendly.initPopupWidget({url, utm})`.
   - Sem Medição: segue o link de saída, sem UTM.
6. **UTM (só com Medição):** ler `utm_source/medium/campaign/content/term` da URL de chegada e guardar em `sessionStorage` (`ts-utm`). Sem UTM, derivar do domínio do `document.referrer` (pedido §R4.3). Nunca repassar `gclid` nem outro identificador individual. Se o aceite vier depois da chegada, usar a UTM guardada só em memória.
7. **Conversão:** o listener `message` (origem `https://calendly.com`) só é registrado depois do popup.
   - `calendly.event_scheduled` é deduplicado pela URI do convidado, que **nunca** é enviada a ninguém.
   - Se `publicidade && PUBLIC_GADS_CONV_LABEL`: `gtag('event','conversion',{send_to:'AW-934581192/<label>'})`.
   - Nada de nome, e-mail ou URI vai ao Google.
8. Tudo isso em **um script próprio** (`src/scripts/consent.ts`, bundlado pelo Astro, `type=module`), mais o inline mínimo do item 1. Meta: < 4 KB gzip.

## 4. Banner (UI)

- **1º nível:** faixa no rodapé da viewport, com texto curto, link para a política e 3 botões **do mesmo tamanho e peso** (Aceitar, Recusar, Personalizar). Não há "X" que conte como aceite, nem cookie wall.
- **2º nível:** diálogo com as 3 categorias. Medição e Publicidade vêm desmarcadas; cada categoria lista o fornecedor e linka a política. Botões: Salvar escolhas, Aceitar tudo, Recusar tudo.
- **Acessibilidade:**
  - `role="region"` com `aria-label` no 1º nível e `<dialog>` modal no 2º;
  - foco no banner ao abrir, Esc fecha o 2º nível, alvos ≥ 44 px, contraste AA, nos dois temas;
  - não cobre o CTA principal do hero em 360×640 (o hero cede espaço ou a faixa é compacta).
- **Revogação:** link "Preferências de cookies" / "Cookie preferences" no footer de todas as páginas, PT e EN, que abre o 2º nível.
- **Sem JS:** o banner não aparece, e não há nada a consentir, porque nada carrega.
- Texto PT em `/`, EN em `/en/`.

## 5. CSP (`netlify.toml`)

Abrir só o necessário (doc oficial: https://developers.google.com/tag-platform/security/guides/csp; Calendly: testar e ler o console):
- `script-src`: + `https://www.googletagmanager.com` `https://assets.calendly.com`
- `connect-src`: + `https://www.google.com` `https://www.googletagmanager.com` `https://*.doubleclick.net` `https://googleads.g.doubleclick.net` `https://calendly.com`
- `img-src`: + `https://www.google.com` `https://www.google.com.br` `https://googleads.g.doubleclick.net` `https://*.doubleclick.net` `https://www.googletagmanager.com`
- `frame-src`: `https://calendly.com` `https://td.doubleclick.net` (o Ads pode usar iframe de conversão)
- `style-src`: + `https://assets.calendly.com`

Confirmar no console (sem erro de CSP) com o fluxo completo aceito.

## 6. Política de privacidade (PT/EN, no mesmo deploy)

Reescrever conforme o pedido R2.3 e as correções do Alicerce (09 §3.4 e §4):
- consentimento como base legal (LGPD art. 7º, I; GDPR art. 6(1)(a)), revogável;
- Google Ads: cookies, finalidade, transferência internacional e retenção;
- Calendly embutido só com Medição; UTM só com Medição;
- tabela de cookies com a **lista real extraída do navegador** (o Afinador gera);
- tirar "não uso cookies" e "não faço publicidade"; manter "não vendo dados";
- como revogar.

O texto é validado pelo Alicerce antes do deploy de produção.

## 7. QA (critérios de pronto)

- **Antes de qualquer escolha:** 0 cookies de terceiros, 0 `_gcl_*`, 0 requisições a google*, doubleclick* e calendly* (Playwright, rede + `context.cookies()`), em PT e EN.
- **Recusar:** igual ao anterior, inclusive depois de recarregar; o CTA abre o link de saída sem UTM.
- **Aceitar tudo:** carrega `gtag/js?id=AW-934581192`; `dataLayer` com `consent default` (denied) **antes** do `consent update` (granted) e do `config`; o CTA abre o popup do Calendly com as UTMs da URL.
- **Personalizar só Medição:** popup sim, Google não.
- **Revogar:** volta ao estado "recusar" e apaga `_gcl_*`.
- **Banner:** axe sem violações sérias; navegação por teclado; mesmo peso visual dos 3 botões; não cobre o CTA do hero em 360×640; PT e EN.
- Lighthouse ≥ 95 nas 4 categorias (com o banner aberto, que é o estado do 1º acesso).
- QA de conteúdo C1–C34 verde; política sem "não uso cookies" e sem "não faço publicidade".

## 8. DIVISÃO EM DOIS DEPLOYS (prioridade do fundador, 2026-10-08)

O Google Ads só deixa criar a ação de conversão depois de verificar a tag no site. Por isso:

**DEPLOY 1 (agora):**
- Banner com **2 categorias: Necessários + Publicidade**. Medição entra só no deploy 2, porque hoje não haveria nada atrás dela.
- Consent Mode **básico**: inline com default negado; `gtag.js` + `config AW-934581192` só depois do aceite de Publicidade.
- Revogação no footer, com limpeza de `_gcl_*`.
- **Sem label de conversão.**
- CSP só para o Google Ads (sem Calendly).
- Política PT/EN só com o Google Ads: sem Calendly embutido e sem UTM. Validação rápida do Alicerce.
- QA mínimo:
  - nenhum cookie e nenhuma requisição do Google antes do aceite e depois de recusar;
  - depois do aceite, `gtag/js?id=AW-934581192` carregado, com `consent default` antes do `update`/`config`;
  - axe e teclado no banner;
  - QA de conteúdo verde;
  - Lighthouse ≥ 95.

**DEPLOY 2 (depois):**
- Categoria Medição.
- Popup do Calendly sob demanda e UTM.
- Conversão com `PUBLIC_GADS_CONV_LABEL`.
- CSP do Calendly.
- Política com Calendly e UTM.
- Landing `/diagnostico/` (R6).

## 9. DEPLOY 2, parte A: conversão (2026-10-08)

- O fundador criou a ação de conversão: `send_to = 'AW-934581192/EOw5CK7RiZYdEMin0r0D'`. Env `PUBLIC_GADS_CONV_LABEL=EOw5CK7RiZYdEMin0r0D` (production e deploy-preview).
- **Não usar o snippet `gtag_report_conversion` de clique** que o Google gerou: ele contaria cliques, não agendamentos.
- Disparo: `gtag('event','conversion',{send_to:'AW-934581192/<label>', value:1.0, currency:'BRL'})` **uma única vez por convidado** (dedupe pela URI do convidado, que não é enviada), quando o popup emitir `calendly.event_scheduled`.
- Condições: o popup só existe com **Medição** aceita (Alicerce, 09 §4.2), e a conversão só é enviada com **Publicidade** aceita. Sem as duas, nada vai ao Google.
- A parte A inclui: categoria Medição no banner, popup sob demanda, UTM (§3.6), conversão, CSP do Calendly e política com Medição, Calendly embutido e UTM (validação do Alicerce).
- A parte B (`/diagnostico/`, R6) vem depois, até 14/nov.
