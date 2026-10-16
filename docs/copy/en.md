# Copy EN: landing `/en/`, `/en/privacy`, `/404`

> Autor: Verso (copywriter). Público: founder pre-seed/seed sem CTO, nos EUA ou na Europa; secundário: quem tem protótipo em Lovable/Bolt e precisa de produção.
> Escrito para esse público, não traduzido do PT. Mesmas regras do BRIEFING §3 e do checklist PLANO-DEV §2.3.
> Rascunho para revisão. Depois que o tipo `SiteCopy` existir em `src/content/types.ts`, este texto vai para `src/content/en.ts`.

## Conventions

- `{SITE_BRAND}`: brand, always read from config. Never hard-coded. Only in header, footer, `<title>` and OG.
- `{BOOKING_URL}`, `{CONTACT_EMAIL}`, `{LINKEDIN_URL}`, `{GITHUB_URL}`: from `src/config/site.ts`.
- `{price.*}`: values from `src/config/pricing.ts` (USD). Expected value in parentheses, for review only (PLANO-DEV §5.3).
- `MUNDOLOGISTICA_URL` = https://mundologistica.com.br/noticias/loopt-ia-terminais-de-conteineres

---

## 0. Header

- Wordmark: `{SITE_BRAND}`
- Nav (anchors, 4 items ≤ 12):
  - Pricing → `#precos`
  - Guarantees → `#garantias`
  - About → `#quem`
  - FAQ → `#faq`
- Language switch: `PT` / `EN` · accessible label: "Switch language to Portuguese"
- Theme: accessible label "Toggle light/dark theme"
- CTA desktop (≤ 22): **Book a free call** → `{BOOKING_URL}`
- CTA mobile (≤ 10): **Book call** → `{BOOKING_URL}`
- Skip link: "Skip to content"

---

## 1. Hero (`#inicio`)

- Eyebrow: **Fractional Founding Engineer**
- Headline (fixed, plan §3): **Ship your product without hiring a team. One senior product engineer, accountable end to end.**
- Subtitle: For founders without a CTO. I take your product from scope to production at a fixed price, and you talk directly to the person building it.
- Primary CTA: **Book a 45-min scoping call (free)** → `{BOOKING_URL}`
- Secondary CTA: **See pricing** → `#precos`
- Proof line: Public pricing · Code in your repo from day one · 60-day bug warranty on MVPs

---

## 2. The problem (`#problema`)

- Title: **You have a product to ship and no one to own the build.**
- Intro: Hiring a founding engineer takes months and a real slice of equity. Agencies quote by the hour and staff your project with whoever is free. You need one person who owns it.
- Cards:
  1. **You need a v1 before the next raise.** — Investors want usage, not a deck. I take your idea from scope to a product real users log into.
  2. **You don't have a CTO yet.** — I own the build until you're ready to hire, and help you hire your first engineer when it's time.
  3. **Your prototype won't survive real users.** — AI prototyping tools (Lovable, Bolt and the like) got you to a demo. Production needs security, monitoring and an owner.
  4. **Agencies put layers between you and the code.** — No account manager, no handoffs. You talk to the person writing the code, every week.
  5. **You want AI where it moves a metric.** — LLMs, RAG or agents, scoped to a measurable outcome, not bolted on for the pitch deck.

---

## 3. How it works: the ladder (`#precos`)

- Title: **Public pricing. Fixed scope. One step at a time.**
- Intro: You know the price before you sign. Every step ends with something you own, and you decide whether to take the next one. The first call is free and may end with "don't build software yet."
- "From" label: "from"
- Timeline label: "Timeline"
- List label: "What's included"
- Payment label: "Payment"
- Alternative step marker (Production-Ready, MVP Plus): "or"
- Evolution table caption: "Product Evolution plans"
- Evolution table headers: "Plan" / "Hours/mo" / "Price/mo"

### Step 0. Scoping call
- Price: **Free**
- Timeline: 45 minutes
- Summary: A call to understand the problem and whether it's worth building now.
- What's included:
  - Your goal, users and constraints
  - Which step fits, with a price range
  - What I'd build first, and what I'd skip
  - A straight answer if you shouldn't build yet
- Payment: No cost, no commitment.
- CTA: **Book a free call** → `{BOOKING_URL}`

### Step 1. Product Sprint
- Price: **{price.sprint} (US$ 3,000)**
- Timeline: 2 weeks
- Summary: A build-ready plan for your v1, with a fixed price attached.
- What's included:
  - Problem and success metric, agreed in writing
  - MVP scope with acceptance criteria and exclusions
  - Technical architecture
  - Clickable prototype of the core flow
  - Milestone plan with a fixed MVP price
- Payment: 100% upfront.
- Badge: **Fully credited to your MVP**
- Note (highlight): **Fully credited toward your MVP** if you sign within 30 days. The deliverables are yours either way.

### Step 1b. Production-Ready
- Price: **{price.productionReady} (US$ 7,000)**
- Timeline: 2–3 weeks
- Summary: For when you already have a prototype and need it in production.
- What's included:
  - Security audit: auth, row-level access, secrets
  - Critical fixes and tests for the core flow
  - CI/CD, staging and production in your cloud
  - Monitoring, alerts and backups
  - Handoff documentation
- Payment: 50% at kickoff, 50% on delivery.
- Note: No rewrite and no new features; those go into an MVP or Evolution.

### Step 2. MVP Core
- Price: **from {price.mvpCore} (US$ 15,000)**
- Timeline: 6–7 weeks
- Summary: Your product in production, built to the scope from the Sprint.
- What's included:
  - 1 core user journey, end to end
  - Up to 2 user roles and 2 integrations
  - Responsive web app with auth and admin
  - Deployment, monitoring and alerts
  - 60-day bug warranty
- Payment: 40% at signing, 30% at staging beta, 30% at go-live.

### Step 2b. MVP Plus
- Price: **Custom quote**
- Timeline: 8–10 weeks
- Summary: Everything in Core, plus more roles, more integrations and one big feature.
- What's included:
  - Everything in MVP Core
  - Up to 3 user roles and 4 integrations
  - Plus one: AI (LLM, RAG or agent), payments or analytics
  - 60-day bug warranty
- Payment: 40% at signing, 30% at staging beta, 30% at go-live.

### Step 3. Product Evolution
- Price: **from {price.evolution.essencial}/mo (US$ 1,500)**
- Timeline: monthly
- Summary: After launch, the same engineer keeps owning your product.
- What's included:
  - Monitoring, fixes and security updates
  - New features from a prioritized backlog
  - Capped monthly hours, no surprise invoices
- Payment: Monthly, 100% upfront.
- Plans:
  - **Essential** · ~10 h/mo · {price.evolution.essencial} (US$ 1,500/mo) — Monitoring, fixes, security updates and one monthly call.
  - **Evolution** · ~25 h/mo · {price.evolution.evolucao} (US$ 4,000/mo) — Essential plus a shipped feature every two weeks.
  - **Technical partner** · ~45 h/mo · {price.evolution.parceiro} (US$ 7,000/mo) — Evolution plus roadmap, fundraising support and your first hire.
- Rules note: Billed monthly in advance, 3-month minimum. Unused hours don't roll over. Extra hours: {price.evolution.overage} (US$ 160/h).

- CTA after the ladder: **Book a 45-min scoping call (free)** → `{BOOKING_URL}`
- Note below the CTA: Not sure which step fits? That's what the call is for.

---

## 4. Guarantees and rules (`#garantias`)

- Title: **The rules, written into the contract.**
- Intro: Software projects fail on scope that grows without a price, on dependence on whoever built it, and on payments that don't track delivery. These rules exist for that.
- Items:
  1. **60-day bug warranty.** — After go-live, I fix anything that doesn't meet the acceptance criteria at no cost. New features aren't bugs: they go to Evolution or a change order.
  2. **Fixed scope, exclusions in writing.** — The Sprint defines what's in and what's out. Changes mid-project become a priced change order, or a one-for-one swap at no cost.
  3. **Your code and cloud from day one.** — The repo, database and infrastructure live in your accounts from the start. IP transfers to you on final payment.
  4. **Paid by milestone.** — You pay per delivered stage. The next stage starts once the previous one is paid. No surprises on either side.
  5. **One MVP at a time.** — I never run two MVPs at once. When I take your project, it has my full attention.
  6. **A demo every week.** — Every week you see working software, not slides. Course corrections happen early.
- List subtitle: **Out of scope on every project, unless agreed separately**
- List:
  - Native iOS/Android apps (I build web or PWA; native is extra)
  - Regulated compliance (PCI, HIPAA) and formal security audits
  - Migrating more than one legacy data source
  - Content, marketing and SEO
  - 24/7 support
  - Cloud, API and license costs (billed to your own accounts)
  - Training custom ML models (MVP Plus uses APIs and RAG)

---

## 5. About (`#quem`)

- Title: **Who builds it: Henrique Pett**
- Photo: alt "Henrique Pett" (real photo; monogram until then)
- Bio, paragraph 1: Since 2021 I've worked across almost every role in a data and AI product: ML research, full stack, data science, ML engineering and product management. On an AI product for container terminal operations, I built the model as the ML engineer, then took on the PM role while still writing production code.
- Bio, paragraph 2: I'm a generalist by design. I go deep enough in each layer to ship it and keep it running, and I know when a problem needs a specialist. I've worked remotely, in English, at a consultancy serving European companies. I'm in São Paulo (UTC−3), which overlaps US and European hours.
- Cases title: **What I've built**
- Cases:
  1. **AI for container terminal operations** — An AI product that replaces manual yard planning. According to the company: −27% unproductive moves and +21% productivity.
     - With `PUBLIC_LOOPT_AUTHORIZED=true` (F4): **Loopt: AI for container terminal operations** — Loopt's AI product replaces manual yard planning. According to Loopt, the result was −27% unproductive moves and +21% productivity. (The terminal client stays unnamed.)
     - Source label: **Public data · MundoLogística, Jan 2026** → `MUNDOLOGISTICA_URL` (visible text never names the company, even though the URL does)
  2. **Credit at Bom.Capital** — In my own account, as the fintech's first data hire, I built the credit analysis model: a process that took 48 hours on average dropped to under 2 hours.
     - Source label: **My own account**
  3. **My own product: Ascende** — An app with an AI advisor that logs money, workouts and sleep from one sentence. Built by me, end to end.
     - Source label: **ascende.site** → https://ascende.site
- Article line (plain text, no link): I wrote "How to Build ML Model Training Pipeline" for the neptune.ai blog (2023).
- Links: **LinkedIn** → `{LINKEDIN_URL}` · **GitHub** → `{GITHUB_URL}`
- Small print under the cases: "My own account" marks a result I measured or followed myself, with no external publication.

---

## 6. How I work (`#metodo`)

- Title: **How one engineer covers the whole product**
- Intro: I work AI-native: coding agents write and review alongside me, and tests and infrastructure are automated from week one. That frees my time for the decisions that need judgment.
- Items:
  1. **Coding agents, human review.** — I use AI agents to write, test and refactor. Every line that reaches production goes through my review and the test suite.
  2. **Automated tests and deploys.** — From the start: tests on the core flow, automated deploys, staging separate from production, monitoring with alerts.
  3. **Decisions in writing.** — Architecture decisions, runbooks and handoff docs live in the repo. Any engineer can pick up where I left off.
  4. **Specialists when the project needs one.** — Pentesting, brand design, native mobile or legal: I bring in a specialist, quoted separately and agreed with you first.
- Closing: You always talk to me. No account manager, no handoffs.

---

## 7. Who this isn't for (`#nao-e-para`)

- Title: **When I'm not the right fit**
- Intro: Better to say it now than halfway through the project.
- Items:
  - You need native iOS and Android apps as the core product.
  - You're in regulated compliance (PCI, HIPAA) without a domain specialist on board.
  - You want staff augmentation or developers billed by the hour.
  - You're choosing on the lowest hourly rate. Others will win that, and I don't compete on it.
  - You expect any product done in 2 weeks. Reliable software takes the time its scope needs.

---

## 8. FAQ (`#faq`)

- Title: **Frequently asked questions**
- Questions:
  1. **How long does it take?**
     The Sprint takes 2 weeks and Production-Ready 2 to 3. An MVP Core goes live in 6 to 7 weeks, an MVP Plus in 8 to 10. The milestone schedule comes out of the Sprint, along with the fixed price.
  2. **Who owns the code?**
     You do. The repo, database and cloud live in your accounts from day one, and IP transfers to you on final payment. Sprint deliverables are yours even if you don't continue to the MVP.
  3. **You're one person. What if you become unavailable?**
     Your code, repo and cloud live in your accounts from day one, and documentation is written throughout the project, not at the end, so any senior developer can take over. Schedules carry a 15–20% buffer. And if the project can't continue, you get a pro-rata refund for anything paid and not delivered.
  4. **Why not hire an agency, or a full-time engineer?**
     An agency makes sense if you need a large team for the long haul. A full-time hire makes sense once the product has traction. Before that, you get one senior engineer who owns the build, at a fixed price set after the Sprint.
  5. **AI prototyping tools (Lovable, Bolt and the like) already do this. Why pay you?**
     They get you a prototype, and that's often a great start. I deliver production: protected data, auth, integrations, deployment, monitoring, and someone accountable when it breaks. If you already have the prototype, that's Production-Ready.
  6. **Will you sign an NDA and a DPA?**
     Yes to both. I can sign the NDA before the first call. In your project, you are the controller of your product's data and appoint your own DPO where required; I act as your processor, under your instructions, and the DPA puts that in writing. Personal data stays in infrastructure under your accounts.
  7. **How does billing work outside Brazil?**
     I invoice in USD from my Brazilian company, and you pay by international bank transfer. I work B2B only: EU companies need a VAT ID (reverse charge applies), and US companies receive a W-8BEN-E from me.
  8. **What happens after launch?**
     For 60 days I fix bugs at no cost. After that, you can carry on with the docs in your repo, or keep me on through Product Evolution, with capped monthly hours.

---

## 9. Final CTA + contact (`#contato`)

- Title: **Start with a 45-minute call.**
- Text: Tell me what you're building. I'll tell you honestly whether to build it now, which step fits and what it costs. If the answer is "not yet", you'll hear that too.
- CTA: **Book a 45-min scoping call (free)** → `{BOOKING_URL}`
- Secondary (if `{CONTACT_EMAIL}` is set): Prefer email? Write to `{CONTACT_EMAIL}`.
- LinkedIn: Or message me on **LinkedIn** → `{LINKEDIN_URL}`

---

## 10. Footer

- Line: `{SITE_BRAND}` · Fractional Founding Engineer · Software products from scope to production.
- Links: Privacy → `/en/privacy` · Português → `/` · LinkedIn · GitHub
- Copyright: © {year} `{SITE_BRAND}`

---

## 11. Privacy page (`/en/privacy`)

- Meta title: Privacy | `{SITE_BRAND}`
- Meta description: How this site handles personal data: cookies only with your consent, no forms, and your rights under the GDPR and Brazil's LGPD.
- Title: **Privacy**
- Last updated: 2026-10-09 (fixed; changes only when the text changes)
- Body:
  - **Summary.** This site presents my work. It has no sign-up and no forms. I use measurement and advertising cookies only if you accept them in the cookie notice; declining changes nothing on the site. This policy follows the EU General Data Protection Regulation (GDPR) and Brazil's data protection law (LGPD).
  - **Who handles your data.** The controller is the company named at the end of this page, through which I provide the services described here. As a small processing agent under Brazilian rules, it has not appointed a data protection officer. Privacy requests and complaints go to the contact email below, which reaches me directly.
  - **What data is processed.** Technical logs: Netlify, which hosts the site and acts as a processor on my behalf, records data about each request, such as IP address, date and time, page requested, referring page, browser and approximate country. I don't keep my own copy of these logs. I count visits to the diagnostic page in aggregate (one number per day), without cookies and without storing IP address or browser (legitimate interests, LGPD Art. 7, IX; GDPR Art. 6(1)(f)). Booking and email: only what you choose to share, such as your name, email, what you'd like to discuss and your answer to "How did you find me?" on the Calendly form. With your Measurement consent: the Calendly scheduler opens inside the site, and where your visit came from is passed to it, meaning the 5 UTM parameters of the campaign that brought you (source, medium, campaign, content and term); I never pass on individual identifiers, such as an ad click ID. With your Advertising consent: Google Ads sets cookies and identifiers in your browser to measure how my ads perform. If you accepted both categories and book a call inside the site, Google Ads receives a conversion notice, without your name, email or booking details.
  - **Why, and on what legal basis.** Technical logs keep the site running and secure: legitimate interests (GDPR Art. 6(1)(f); LGPD Art. 7, IX). Booking and email data, including your answer to the Calendly question, let me schedule and hold the call and prepare a proposal at your request: steps prior to entering a contract (GDPR Art. 6(1)(b); LGPD Art. 7, V). The embedded Calendly scheduler, passing on where your visit came from, advertising cookies and the conversion notice to Google Ads rely on your consent (GDPR Art. 6(1)(a); LGPD Art. 7, I), which you can withdraw at any time. Where Brazilian law requires me to keep something, such as tax records, the basis is legal obligation under the LGPD (Art. 7, II) and, under the GDPR, my legitimate interest in complying with it (Art. 6(1)(f)).
  - **Cookies and browser storage.** Nothing from third parties loads before you choose. Necessary: I store your cookie choice and, if you change it, your theme preference in your browser; neither leaves your device. Measurement: the scheduler opens inside the site in a Calendly frame, which applies Calendly's own policy and cookies and may load third-party tools Calendly uses, including advertising ones, such as Google Analytics, Facebook, Segment, Braze, OneTrust, Stripe and reCAPTCHA. As soon as the frame opens, before your choice in Calendly's own notice, these tools may receive your IP address and the page address; where your visit came from is kept only for this browser session. Without Measurement, the button opens Calendly's own page. Advertising: loads the Google Ads tag, which sets cookies to measure how my ads perform. The full list is in the table below.
  - **Who your data is shared with.** Only with the providers that make the site, contact and ad measurement work, and only for that: Netlify (hosting); Calendly (scheduling), which opens inside the site only with your Measurement consent and otherwise on Calendly's own page; either way, Calendly's privacy and cookie policy applies; and Google, which hosts my email and, with your Advertising consent, runs Google Ads. Each follows its own privacy policy. I don't sell data. Authorities receive data only under a lawful request.
  - **International transfers.** I'm based in Brazil. Netlify and Google process data in the United States, and Calendly may also process it outside your country. These transfers rely on the providers' data protection commitments, such as the EU-U.S. Data Privacy Framework or Standard Contractual Clauses.
  - **How long data is kept.** Technical access logs are kept by Netlify under its own retention period; I don't store them separately. Google Ads data is kept under Google's policy, and each cookie lasts as long as the table below shows. Your cookie choice is stored in your browser for 6 months; after that, the notice appears again. Messages and booking data are kept while needed for the conversation. If it becomes a contract, I keep what the law requires for the legal period; if not, I delete it once it's no longer needed or when you ask.
  - **Your rights.** You can ask to access, correct or delete your data, to restrict or object to its processing (including processing based on legitimate interests), and to receive it in a portable format. You can withdraw or change your consent at any time under "Cookie preferences", in the footer of every page. I reply within 15 days through the contact below. You can also complain to your local data protection authority, or to Brazil's ANPD.
  - **Security.** The site is static, served over HTTPS only, and keeps no personal data in a database of its own. Access to the provider accounts is restricted to me.
  - **Changes to this policy.** When this policy changes, I update the date at the top of the page.
- Contact: `{CONTACT_EMAIL}` · Controller: `{PUBLIC_LEGAL_NAME}`, `{PUBLIC_LEGAL_ID}` (from env).
- No email set: "For any request about your data, message me on LinkedIn."
- Back link: ← Back to the home page

---

## 12. 404 page (bilingual, same page)

See `docs/copy/pt-BR.md` §12. EN lines:
- **This page doesn't exist.** The address may have changed or been mistyped. → **Go to the English site** (`/en/`)

---

## 13. Metadata and OG

- `<title>` (≤ 60): Fractional Founding Engineer | `{SITE_BRAND}`
- Meta description (≤ 155): One senior product engineer, accountable end to end. Public pricing, fixed scope, and your code in your repo from day one.
- OG title: Ship your product without hiring a team.
- OG description: One senior product engineer, accountable end to end. Free 45-minute scoping call.
- OG image text (1200×630):
  - Line 1 (small): `{SITE_BRAND}` · Fractional Founding Engineer
  - Line 2 (large): Ship your product without hiring a team.
  - Line 3: One senior product engineer, accountable end to end.
- OG image alt: Ship your product without hiring a team. One senior product engineer, accountable end to end.

---

## 14. Consent banner (docs/consent/SPEC.md §4, §8, §9; limits DESIGN.md §13.5)

- 1st level (region, aria-label "Cookie notice"): I use measurement and ad cookies only if you accept. → link **Privacy policy** (`/en/privacy#cookies`)
- Buttons (same weight): **Accept** · **Decline** · **Customize**
- 2nd level (dialog): **Cookie preferences**. Choose what may load on this site. Measurement and Advertising stay off until you turn them on, and declining changes nothing on the site. You can change your mind anytime from the footer.
  - **Necessary** (necessary): Store your cookie choice and, if you change it, your theme preference. They stay in your browser, never leave your device and cannot be turned off.
  - **Measurement** (measurement): Opens a Calendly scheduling frame and passes on where your visit came from. Calendly's cookies and policy apply. On opening, before your choice in Calendly's notice, its third-party tools, including ads (Google Analytics, Facebook, Segment, Braze, Stripe, reCAPTCHA), may receive your IP and the page address. · [Calendly privacy notice](https://calendly.com/legal/privacy-notice)
  - **Advertising** (advertising): Loads the Google Ads tag, which sets cookies to measure how my ads perform and notes when a call is booked. Your name, email and booking details are never sent to Google. · [Google Ads cookies](https://policies.google.com/technologies/ads)
- "Always on" (necessary) · **Save choices** · **Accept all** · **Decline all** · close: "Close"
- saved (aria-live): "Cookie preferences saved"
- Footer: **Cookie preferences**

### Cookies and storage used

What this site may store in your browser, by category. Measurement and Advertising store nothing until you consent. Calendly's cookies exist only if you accept Measurement and open the scheduler: they are set by Calendly inside the scheduling frame, and Calendly may use others under its own policy.

Caption: "Cookies and local storage on this site"

| Name | Provider | Purpose | Category | Duration |
|---|---|---|---|---|
| Name | Provider | Purpose | Category | Duration |
| _gcl_au | Google (Google Ads) | Measures how well ads perform. First-party cookie on this site's domain. | Advertising | 90 days |
| _gcl_ls | Google (Google Ads) | Measures how well ads perform. Browser local storage. | Advertising | No period published by Google; deleted when you withdraw consent |
| ts-consent | This site | Records your cookie choice. Browser local storage. | Necessary | 6 months |
| ts-utm | This site | Keeps where your visit came from (campaign UTMs) to pass on to Calendly. Browser session storage. | Measurement | Until you close the tab |
| theme | This site | Remembers your light or dark theme, only if you change it. Browser local storage. | Necessary | Until you clear your browser data |
| __cf_bm | Calendly (Cloudflare), on .calendly.com | Security and bot protection for scheduling. | Measurement | 30 minutes |
| _cfuvid | Calendly (Cloudflare), on .calendly.com | Scheduling security. | Measurement | Until you close your browser |
| OptanonConsent | Calendly (OneTrust), on .calendly.com | Stores your cookie choice within Calendly. | Measurement | 1 year |
| m | Calendly (Stripe), on m.stripe.com | Fraud prevention. | Measurement | About 1 year |

Fonte do _gcl_au / source: https://business.safety.google/adscookies/

---

## Character limits (with spaces; agreed with Timbre, same for PT and EN; source: `docs/design/DESIGN.md` §8)

| Block | Limit |
|---|---|
| Nav item (4 items) | ≤ 12 |
| Header CTA | desktop ≤ 22 · mobile ≤ 10 |
| Hero eyebrow | ≤ 40 |
| Hero headline | fixed (plan §3) |
| Hero subtitle | ≤ 160 |
| Primary / secondary CTA | ≤ 40 / ≤ 20 |
| Proof line | ≤ 90 |
| Problem: title / intro | ≤ 70 / ≤ 200 |
| Problem card: title / text | ≤ 45 / ≤ 120 |
| Ladder: title / intro | ≤ 60 / ≤ 220 |
| Step: name / summary / timeline | ≤ 24 / ≤ 80 / ≤ 20 |
| Step "included" | 3–5 items, ≤ 60 each |
| Step payment / note | ≤ 90 / ≤ 120 |
| Evolution plan line / rules note | ≤ 70 / ≤ 160 |
| Guarantee: title / text | ≤ 40 / ≤ 160 |
| Exclusions list item | ≤ 70 |
| About: title / bio paragraph | ≤ 50 / ≤ 320 each |
| Case: title / text / source label | ≤ 50 / ≤ 160 / ≤ 40 |
| Method: title / intro / item title / item text | ≤ 50 / ≤ 200 / ≤ 40 / ≤ 160 |
| Not-for: title / item | ≤ 50 / ≤ 100 |
| FAQ: question / answer | ≤ 80 / ≤ 400 |
| Final CTA: title / text / CTA | ≤ 70 / ≤ 200 / ≤ 40 |
| Footer line | ≤ 120 |
