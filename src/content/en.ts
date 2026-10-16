/**
 * EN copy. Source: docs/copy/en.md (approved by Batuta). Written natively, not translated.
 * Audience: pre-seed/seed founder without a CTO (US/Europe); secondary: prototype owners who need production.
 * Rules: BRIEFING §3 and PLANO-DEV §2.3 checklist. Conventions and limits: src/content/types.ts.
 */

import type { SiteCopy } from './types';

/** Placeholder até o Verso preencher o consentimento (SPEC §4/§6). */

const MUNDOLOGISTICA_URL = 'https://mundologistica.com.br/noticias/loopt-ia-terminais-de-conteineres';
const MVP_PAYMENT = '40% at signing, 30% at staging beta, 30% at go-live.';

export const en: SiteCopy = {
  locale: 'en',

  meta: {
    home: {
      title: 'Fractional Founding Engineer | {brand}',
      description:
        'One senior product engineer, accountable end to end. Public pricing, fixed scope, and your code in your repo from day one.',
    },
    privacy: {
      title: 'Privacy | {brand}',
      description:
        "How this site handles personal data: cookies only with your consent, no forms, and your rights under the GDPR and Brazil's LGPD.",
    },
    notFound: {
      title: 'Page not found | {brand}',
      description: 'The address may have changed or been mistyped.',
    },
  },

  og: {
    title: 'Ship your product without hiring a team.',
    description: 'One senior product engineer, accountable end to end. Free 45-minute scoping call.',
    imageAlt: 'Get your product into users’ hands. Work directly with the engineer building it.',
    imageLines: [
      '{brand} · Fractional Founding Engineer',
      'Ship your product without hiring a team.',
      'One senior product engineer, accountable end to end.',
    ],
  },

  common: {
    skipToContent: 'Skip to content',
    languageSwitchShort: 'PT',
    languageSwitchLabel: 'Switch language to Portuguese',
    themeToggleLabel: 'Toggle light/dark theme',
    // No mobile menu in the design (Timbre); kept because the contract requires them.
    bookingCtaHeader: 'Book a free call',
    bookingCtaHeaderMobile: 'Book call',
  },

  header: {
    navLabel: 'Main navigation',
    nav: { precos: 'Pricing', garantias: 'Guarantees', quem: 'About', faq: 'FAQ' },
  },

  hero: {
    eyebrow: 'Fractional Founding Engineer',
    headline: 'Get your product into users’ hands. Work directly with the engineer building it.',
    subheadline:
      'For founders without a CTO: build a first version, rescue a stalled project, or prepare a prototype for real users. Fixed scope, published pricing.',
    primaryCta: 'Book a 45-min scoping call (free)',
    secondaryCta: 'See pricing',
    emailLead: "Prefer to start with a message?",
    emailCta: "Tell me about your project",
    proofLine: ['Public pricing', 'Code in your repo from day one', '60-day bug warranty on MVPs'],
  },

  problem: {
    "title": "Where is your project today?",
    "intro": "Start with the product or process you need to improve. I help define a useful first delivery and how we will check that it works.",
    "items": [
        {
            "title": "Replace a manual workflow",
            "body": "Turn documents, spreadsheets and disconnected tools into a workflow with a history of changes and a review step for uncertain results.",
            "example": "Example scope: read a document, extract its data and check the resulting record.",
            "href": "#precos",
            "link": "See how to start"
        },
        {
            "title": "Rescue a stalled build",
            "body": "You hired an agency or built it yourself, but the product is stuck. I assess what can be reused and which fixes matter first.",
            "example": "The starting point: access to the code, environment and failing user journey.",
            "href": "/en/software-project-rescue/",
            "link": "Explore project rescue"
        },
        {
            "title": "Launch a Lovable prototype",
            "body": "Your prototype works in a demo. Now check permissions, integrations and the main user journey before bringing in real customers.",
            "example": "A reusable codebase and a bounded scope may fit the Production-Ready package.",
            "href": "/en/lovable-to-production/",
            "link": "See what is included"
        },
        {
            "title": "Build your first product",
            "body": "A customer portal, B2B SaaS or internal tool for a specific need. We agree on the first user journey and what makes it ready to ship.",
            "example": "The Sprint delivers scope and a clickable prototype. Implementation is a separate stage.",
            "href": "#precos",
            "link": "Compare stages and pricing"
        }
    ]
},

  ladder: {
    title: 'Public pricing. Fixed scope. One step at a time.',
    intro:
      'You know the price before you sign. Every step ends with something you own, and you decide whether to take the next one. The first call is free and may end with "don\'t build software yet."',
    priceLabels: { free: 'Free', from: 'from {price}', custom: 'Custom quote' },
    labels: { timeline: 'Timeline', included: "What's included", payment: 'Payment', altStep: 'or' },
    units: { perMonth: '/mo', perHour: '/h', hoursPerMonth: '~{n} h' },
    steps: {
      diagnostic: {
        name: 'Scoping call',
        timeline: '45 minutes',
        summary: "A call to understand the problem and whether it's worth building now.",
        included: [
          'Your goal, users and constraints',
          'Which step fits, with a price range',
          "What I'd build first, and what I'd skip",
          "A straight answer if you shouldn't build yet",
        ],
        payment: 'No cost, no commitment.',
      },
      sprint: {
        name: 'Product Sprint',
        timeline: '2 weeks',
        summary: 'A build-ready plan for your v1, with a fixed price attached.',
        included: [
          'Problem and success metric, agreed in writing',
          'MVP scope with acceptance criteria and exclusions',
          'Technical architecture',
          'Clickable prototype of the core flow',
          'Milestone plan with a fixed MVP price',
        ],
        payment: '100% upfront.',
        badge: 'Fully credited to your MVP',
        note: {
          text: 'Fully credited toward your MVP if you sign within 30 days. The deliverables are yours either way.',
          highlight: true,
        },
      },
      productionReady: {
        name: 'Production-Ready',
        timeline: '2–3 weeks',
        summary: 'For when you already have a prototype and need it in production.',
        included: [
          'Security audit: auth, row-level access, secrets',
          'Critical fixes and tests for the core flow',
          'CI/CD, staging and production in your cloud',
          'Monitoring, alerts and backups',
          'Handoff documentation',
        ],
        payment: '50% at kickoff, 50% on delivery.',
        note: { text: 'No rewrite and no new features; those go into an MVP or Evolution.' },
      },
      mvpCore: {
        name: 'MVP Core',
        timeline: '6–7 weeks',
        summary: 'Your product in production, built to the scope from the Sprint.',
        included: [
          '1 core user journey, end to end',
          'Up to 2 user roles and 2 integrations',
          'Responsive web app with auth and admin',
          'Deployment, monitoring and alerts',
          '60-day bug warranty',
        ],
        payment: MVP_PAYMENT,
      },
      mvpPlus: {
        name: 'MVP Plus',
        timeline: '8–10 weeks',
        summary: 'Everything in Core, plus more roles, more integrations and one big feature.',
        included: [
          'Everything in MVP Core',
          'Up to 3 user roles and 4 integrations',
          'Plus one: AI (LLM, RAG or agent), payments or analytics',
          '60-day bug warranty',
        ],
        payment: MVP_PAYMENT,
      },
      evolution: {
        name: 'Product Evolution',
        timeline: 'monthly',
        summary: 'After launch, the same engineer keeps owning your product.',
        included: [
          'Monitoring, fixes and security updates',
          'New features from a prioritized backlog',
          'Capped monthly hours, no surprise invoices',
        ],
        payment: 'Monthly, 100% upfront.',
      },
    },
    diagnosticCta: 'Book a free call',
    evolution: {
      table: {
        caption: 'Product Evolution plans',
        headers: { plan: 'Plan', hours: 'Hours/mo', price: 'Price/mo' },
      },
      plans: {
        essential: {
          name: 'Essential',
          description: 'Monitoring, fixes, security updates and one monthly call.',
        },
        evolution: {
          name: 'Evolution',
          description: 'Essential plus a shipped feature every two weeks.',
        },
        partner: {
          name: 'Technical partner',
          description: 'Evolution plus roadmap, fundraising support and your first hire.',
        },
      },
      rulesNote: "Billed monthly in advance, 3-month minimum. Unused hours don't roll over. Extra hours: {overage}.",
    },
    cta: 'Book a 45-min scoping call (free)',
    workingTogether: {
      title: "You’ll probably enjoy working with me if…",
      items: [
        "You want to solve a business problem with a clearly scoped MVP, integration or internal tool.",
        "You want to take part in decisions and are open to questioning priorities, assumptions and risks with me.",
        "You prefer to agree on a feasible delivery, with clear scope and acceptance criteria.",
      ],
    },
    ctaNote: "Not sure which step fits? That's what the call is for.",
  },

  guarantees: {
    title: 'The rules, written into the contract.',
    intro:
      "Software projects fail on scope that grows without a price, on dependence on whoever built it, and on payments that don't track delivery. These rules exist for that.",
    items: [
      {
        title: '60-day bug warranty.',
        body: "After go-live, I fix anything that doesn't meet the acceptance criteria at no cost. New features aren't bugs: they go to Evolution or a change order.",
      },
      {
        title: 'Fixed scope, exclusions in writing.',
        body: "The Sprint defines what's in and what's out. Changes mid-project become a priced change order, or a one-for-one swap at no cost.",
      },
      {
        title: 'Your code and cloud from day one.',
        body: 'The repo, database and infrastructure live in your accounts from the start. IP transfers to you on final payment.',
      },
      {
        title: 'Paid by milestone.',
        body: 'You pay per delivered stage. The next stage starts once the previous one is paid. No surprises on either side.',
      },
      {
        title: 'One MVP at a time.',
        body: 'I never run two MVPs at once. When I take your project, it has my full attention.',
      },
      {
        title: 'A demo every week.',
        body: 'Every week you see working software, not slides. Course corrections happen early.',
      },
    ],
    exclusionsTitle: 'Out of scope on every project, unless agreed separately',
    exclusions: [
      'Native iOS/Android apps (I build web or PWA; native is extra)',
      'Regulated compliance (PCI, HIPAA) and formal security audits',
      'Migrating more than one legacy data source',
      'Content, marketing and SEO',
      '24/7 support',
      'Cloud, API and license costs (billed to your own accounts)',
      'Training custom ML models (MVP Plus uses APIs and RAG)',
    ],
  },

  about: {
    title: 'Who builds it: Henrique Pett',
    photoAlt: 'Henrique Pett',
    bio: [
      "Since 2021 I've worked across almost every role in a data and AI product: ML research, full stack, data science, ML engineering and product management. On an AI product for container terminal operations, I built the model as the ML engineer, then took on the PM role while still writing production code.",
      "I'm a generalist by design. I go deep enough in each layer to ship it and keep it running, and I know when a problem needs a specialist. I've worked remotely, in English, at a consultancy serving European companies. I'm in São Paulo (UTC−3), which overlaps US and European hours.",
    ],
    casesTitle: 'Experience I bring to your project',
    cases: [
      {
        title: 'AI for container terminal operations',
        body: 'An AI product that replaces manual yard planning. According to the company: −27% unproductive moves and +21% productivity.',
        source: { label: 'Public data · MundoLogística, Jan 2026', url: MUNDOLOGISTICA_URL },
        kind: 'published',
        detail: { href: '/en/cases/loopt/', label: 'Read the full case study' },
        whenAuthorized: {
          requires: 'loopt',
          title: 'Loopt: AI for container terminal operations',
          body: "Loopt's AI product replaces manual yard planning. According to Loopt, the result was −27% unproductive moves and +21% productivity.",
        },
      },
      {
        title: 'Credit at Bom.Capital',
        body: "In my own account, as the fintech's first data hire, I built the credit analysis model: a process that took 48 hours on average dropped to under 2 hours.",
        source: { label: 'My own account' },
        kind: 'self-reported',
        detail: { href: '/en/cases/bom-capital/', label: 'Read the full case study' },
      },
      {
        title: 'My own product: Ascende',
        body: 'An app with an AI advisor that logs money, workouts and sleep from one sentence. Built by me, end to end.',
        source: { label: 'ascende.site', url: 'https://ascende.site' },
        kind: 'own-project',
        detail: { href: '/en/cases/ascende/', label: 'Read the full case study' },
      },
    ],
    casesFootnote: 'Prior professional experience and a personal project, not studio client engagements. Self-reported results have no external publication.',
    article: 'I wrote "How to Build ML Model Training Pipeline" for the neptune.ai blog (2023).',
    linkedinLabel: 'LinkedIn',
    githubLabel: 'GitHub',
  },

  method: {
    title: 'How one engineer covers the whole product',
    intro:
      'I work AI-native: coding agents write and review alongside me, and tests and infrastructure are automated from week one. That frees my time for the decisions that need judgment.',
    items: [
      {
        title: 'Coding agents, human review.',
        body: 'I use AI agents to write, test and refactor. Every line that reaches production goes through my review and the test suite.',
      },
      {
        title: 'Automated tests and deploys.',
        body: 'From the start: tests on the core flow, automated deploys, staging separate from production, monitoring with alerts.',
      },
      {
        title: 'Decisions in writing.',
        body: 'Architecture decisions, runbooks and handoff docs live in the repo. Any engineer can pick up where I left off.',
      },
      {
        title: 'Specialists when the project needs one.',
        body: 'Pentesting, brand design, native mobile or legal: I bring in a specialist, quoted separately and agreed with you first.',
      },
    ],
    closing: 'You always talk to me. No account manager, no handoffs.',
  },

  notFor: {
    title: "When I'm not the right fit",
    intro: 'Better to say it now than halfway through the project.',
    items: [
      'You need native iOS and Android apps as the core product.',
      "You're in regulated compliance (PCI, HIPAA) without a domain specialist on board.",
      'You want staff augmentation or developers billed by the hour.',
      "You're choosing on the lowest hourly rate. Others will win that, and I don't compete on it.",
      'You expect any product done in 2 weeks. Reliable software takes the time its scope needs.',
    ],
  },

  faq: {
    title: 'Frequently asked questions',
    items: [
      {"question": "Can we start with just one workflow?", "answer": "Yes. We start by understanding one workflow, its cost today and how to check an improvement. If the solution still needs defining, the Sprint delivers scope and a clickable prototype, not a production automation. Implementation is quoted separately."},
      {"question": "Can you take over an agency build or a Lovable prototype?", "answer": "I can assess the existing code and environment with authorized access. A reusable foundation and a bounded set of fixes may fit Production-Ready. A rebuild or new features need a separate scope and proposal before work begins."},

      {
        question: 'How long does it take?',
        answer:
          'The Sprint takes 2 weeks and Production-Ready 2 to 3. An MVP Core goes live in 6 to 7 weeks, an MVP Plus in 8 to 10. The milestone schedule comes out of the Sprint, along with the fixed price.',
      },
      {
        question: 'Who owns the code?',
        answer:
          "You do. The repo, database and cloud live in your accounts from day one, and IP transfers to you on final payment. Sprint deliverables are yours even if you don't continue to the MVP.",
      },
      {
        question: "You're one person. What if you become unavailable?",
        answer:
          "Your code, repo and cloud live in your accounts from day one, and documentation is written throughout the project, not at the end, so any senior developer can take over. Schedules carry a 15–20% buffer. And if the project can't continue, you get a pro-rata refund for anything paid and not delivered.",
      },
      {
        question: 'Why not hire an agency, or a full-time engineer?',
        answer:
          'An agency makes sense if you need a large team for the long haul. A full-time hire makes sense once the product has traction. Before that, you get one senior engineer who owns the build, at a fixed price set after the Sprint.',
      },
      {
        question: 'AI prototyping tools (Lovable, Bolt and the like) already do this. Why pay you?',
        answer:
          "They get you a prototype, and that's often a great start. I deliver production: protected data, auth, integrations, deployment, monitoring, and someone accountable when it breaks. If you already have the prototype, that's Production-Ready.",
      },
      {
        question: 'Will you sign an NDA and a DPA?',
        answer:
          'Yes to both. I can sign the NDA before the first call. In your project, you are the controller of your product\'s data and appoint your own DPO where required; I act as your processor, under your instructions, and the DPA puts that in writing. Personal data stays in infrastructure under your accounts.',
      },
      {
        question: 'How does billing work outside Brazil?',
        answer:
          'I invoice in USD from my Brazilian company, and you pay by international bank transfer. I work B2B only: EU companies need a VAT ID (reverse charge applies), and US companies receive a W-8BEN-E from me.',
      },
      {
        question: 'What happens after launch?',
        answer:
          'For 60 days I fix bugs at no cost. After that, you can carry on with the docs in your repo, or keep me on through Product Evolution, with capped monthly hours.',
      },
    ],
  },

  finalCta: {
    title: 'Start with a 45-minute call.',
    body: 'Tell me what you\'re building. I\'ll tell you honestly whether to build it now, which step fits and what it costs. If the answer is "not yet", you\'ll hear that too.',
    cta: 'Book a 45-min scoping call (free)',
    emailLead: 'Prefer email? Write to',
    linkedin: { lead: 'Or message me on', label: 'LinkedIn' },
  },

  testimonials: { title: 'Testimonials' },

  footer: {
    tagline: 'Fractional Founding Engineer · Software products from scope to production.',
    privacyLink: 'Privacy',
    otherLanguageLink: 'Português',
    linkedinLabel: 'LinkedIn',
    githubLabel: 'GitHub',
    copyright: '© {year} {brand}',
  },

  consent: {
    regionLabel: "Cookie notice",
    text: "I use measurement and ad cookies only if you accept.",
    policyLink: "Privacy policy",
    accept: "Accept",
    reject: "Decline",
    customize: "Customize",
    dialog: {
      title: "Cookie preferences",
      intro:
        "Choose what may load on this site. Measurement and Advertising stay off until you turn them on, and declining changes nothing on the site. You can change your mind anytime from the footer.",
      alwaysOn: "Always on",
      categories: {
        necessary: {
          name: "Necessary",
          description:
            "Store your cookie choice and, if you change it, your theme preference. They stay in your browser, never leave your device and cannot be turned off.",
          vendors: [],
        },
        measurement: {
          name: "Measurement",
          description:
            "Opens a Calendly scheduling frame and passes on where your visit came from. Calendly's cookies and policy apply. On opening, before your choice in Calendly's notice, its third-party tools, including ads (Google Analytics, Facebook, Segment, Braze, Stripe, reCAPTCHA), may receive your IP and the page address.",
          vendors: [{ label: "Calendly privacy notice", url: "https://calendly.com/legal/privacy-notice" }],
        },
        advertising: {
          name: "Advertising",
          description:
            "Loads the Google Ads tag, which sets cookies to measure how my ads perform and notes when a call is booked. Your name, email and booking details are never sent to Google.",
          vendors: [{ label: "Google Ads cookies", url: "https://policies.google.com/technologies/ads" }],
        },
      },
      save: "Save choices",
      acceptAll: "Accept all",
      rejectAll: "Decline all",
      close: "Close",
    },
    footerLink: "Cookie preferences",
    saved: "Cookie preferences saved",
  },

  privacy: {
    title: 'Privacy',
    updatedLabel: 'Last updated',
    updated: '2026-10-09',
    sections: [
      {
        title: "Summary",
        body: "This site presents my work. It has no sign-up and no forms. I use measurement and advertising cookies only if you accept them in the cookie notice; declining changes nothing on the site. This policy follows the EU General Data Protection Regulation (GDPR) and Brazil's data protection law (LGPD).",
      },
      {
        title: "Who handles your data",
        body: "The controller is the company named at the end of this page, through which I provide the services described here. As a small processing agent under Brazilian rules, it has not appointed a data protection officer. Privacy requests and complaints go to the contact email below, which reaches me directly.",
      },
      {
        title: "What data is processed",
        body: "Technical logs: Netlify, which hosts the site and acts as a processor on my behalf, records data about each request, such as IP address, date and time, page requested, referring page, browser and approximate country. I don't keep my own copy of these logs. I count visits to the diagnostic page in aggregate (one number per day), without cookies and without storing IP address or browser (legitimate interests, LGPD Art. 7, IX; GDPR Art. 6(1)(f)). Booking and email: only what you choose to share, such as your name, email, what you'd like to discuss and your answer to \"How did you find me?\" on the Calendly form. With your Measurement consent: the Calendly scheduler opens inside the site, and where your visit came from is passed to it, meaning the 5 UTM parameters of the campaign that brought you (source, medium, campaign, content and term); I never pass on individual identifiers, such as an ad click ID. With your Advertising consent: Google Ads sets cookies and identifiers in your browser to measure how my ads perform. If you accepted both categories and book a call inside the site, Google Ads receives a conversion notice, without your name, email or booking details.",
      },
      {
        title: "Why, and on what legal basis",
        body: "Technical logs keep the site running and secure: legitimate interests (GDPR Art. 6(1)(f); LGPD Art. 7, IX). Booking and email data, including your answer to the Calendly question, let me schedule and hold the call and prepare a proposal at your request: steps prior to entering a contract (GDPR Art. 6(1)(b); LGPD Art. 7, V). The embedded Calendly scheduler, passing on where your visit came from, advertising cookies and the conversion notice to Google Ads rely on your consent (GDPR Art. 6(1)(a); LGPD Art. 7, I), which you can withdraw at any time. Where Brazilian law requires me to keep something, such as tax records, the basis is legal obligation under the LGPD (Art. 7, II) and, under the GDPR, my legitimate interest in complying with it (Art. 6(1)(f)).",
      },
      {
        title: "Cookies and browser storage",
        body: "Nothing from third parties loads before you choose. Necessary: I store your cookie choice and, if you change it, your theme preference in your browser; neither leaves your device. Measurement: the scheduler opens inside the site in a Calendly frame, which applies Calendly's own policy and cookies and may load third-party tools Calendly uses, including advertising ones, such as Google Analytics, Facebook, Segment, Braze, OneTrust, Stripe and reCAPTCHA. As soon as the frame opens, before your choice in Calendly's own notice, these tools may receive your IP address and the page address; where your visit came from is kept only for this browser session. Without Measurement, the button opens Calendly's own page. Advertising: loads the Google Ads tag, which sets cookies to measure how my ads perform. The full list is in the table below.",
      },
      {
        title: "Who your data is shared with",
        body: "Only with the providers that make the site, contact and ad measurement work, and only for that: Netlify (hosting); Calendly (scheduling), which opens inside the site only with your Measurement consent and otherwise on Calendly's own page; either way, Calendly's privacy and cookie policy applies; and Google, which hosts my email and, with your Advertising consent, runs Google Ads. Each follows its own privacy policy. I don't sell data. Authorities receive data only under a lawful request.",
      },
      {
        title: "International transfers",
        body: "I'm based in Brazil. Netlify and Google process data in the United States, and Calendly may also process it outside your country. These transfers rely on the providers' data protection commitments, such as the EU-U.S. Data Privacy Framework or Standard Contractual Clauses.",
      },
      {
        title: "How long data is kept",
        body: "Technical access logs are kept by Netlify under its own retention period; I don't store them separately. Google Ads data is kept under Google's policy, and each cookie lasts as long as the table below shows. Your cookie choice is stored in your browser for 6 months; after that, the notice appears again. Messages and booking data are kept while needed for the conversation. If it becomes a contract, I keep what the law requires for the legal period; if not, I delete it once it's no longer needed or when you ask.",
      },
      {
        title: "Your rights",
        body: "You can ask to access, correct or delete your data, to restrict or object to its processing (including processing based on legitimate interests), and to receive it in a portable format. You can withdraw or change your consent at any time under \"Cookie preferences\", in the footer of every page. I reply within 15 days through the contact below. You can also complain to your local data protection authority, or to Brazil's ANPD.",
      },
      {
        title: "Security",
        body: "The site is static, served over HTTPS only, and keeps no personal data in a database of its own. Access to the provider accounts is restricted to me.",
      },
      {
        title: "Changes to this policy",
        body: "When this policy changes, I update the date at the top of the page.",
      },
    ],
    contact: {
      title: 'Contact',
      controllerLabel: 'Controller',
      linkedinFallback: { lead: 'For any request about your data, message me on', label: 'LinkedIn' },
    },
    backLink: 'Back to the home page',
    cookies: {
      title: "Cookies and storage used",
      intro: "What this site may store in your browser, by category. Measurement and Advertising store nothing until you consent. Calendly's cookies exist only if you accept Measurement and open the scheduler: they are set by Calendly inside the scheduling frame, and Calendly may use others under its own policy.",
      caption: "Cookies and local storage on this site",
      headers: { name: "Name", vendor: "Provider", purpose: "Purpose", category: "Category", duration: "Duration" },
      rows: [
        { name: "_gcl_au", vendor: "Google (Google Ads)", purpose: "Measures how well ads perform. First-party cookie on this site's domain.", category: "Advertising", duration: "90 days" },
        { name: "_gcl_ls", vendor: "Google (Google Ads)", purpose: "Measures how well ads perform. Browser local storage.", category: "Advertising", duration: "No period published by Google; deleted when you withdraw consent" },
        { name: "ts-consent", vendor: "This site", purpose: "Records your cookie choice. Browser local storage.", category: "Necessary", duration: "6 months" },
        { name: "ts-utm", vendor: "This site", purpose: "Keeps where your visit came from (campaign UTMs) to pass on to Calendly. Browser session storage.", category: "Measurement", duration: "Until you close the tab" },
        { name: "theme", vendor: "This site", purpose: "Remembers your light or dark theme, only if you change it. Browser local storage.", category: "Necessary", duration: "Until you clear your browser data" },
        { name: "__cf_bm", vendor: "Calendly (Cloudflare), on .calendly.com", purpose: "Security and bot protection for scheduling.", category: "Measurement", duration: "30 minutes" },
        { name: "_cfuvid", vendor: "Calendly (Cloudflare), on .calendly.com", purpose: "Scheduling security.", category: "Measurement", duration: "Until you close your browser" },
        { name: "OptanonConsent", vendor: "Calendly (OneTrust), on .calendly.com", purpose: "Stores your cookie choice within Calendly.", category: "Measurement", duration: "1 year" },
        { name: "m", vendor: "Calendly (Stripe), on m.stripe.com", purpose: "Fraud prevention.", category: "Measurement", duration: "About 1 year" },
      ],
    },
  },

  diagnostico: null,

  notFound: {
    title: "This page doesn't exist.",
    body: 'The address may have changed or been mistyped.',
    homeLink: 'Go to the English site',
  },
};
