/**
 * Shared EN copy (contract in ./types.ts): meta, OG, common labels, consent, privacy and 404.
 * Home and company pages: ./home.ts and ./institucional.ts. /diagnostico/ is PT-only (null here).
 */

import type { SiteCopy } from './types';

export const en: SiteCopy = {
  locale: 'en',

  meta: {
    home: {
      title: '{brand} | Custom AI and software for manufacturers',
      description:
        'We bring your operations data and know-how into one company brain and put AI agents to work in each area of the plant, rolled out in stages with your IT.',
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
    title: 'Applied AI for industrial operations.',
    description: 'An operations brain and AI agents for each area of the plant, rolled out in stages and within your IT rules.',
    imageAlt: 'Applied AI for industrial operations, designed for your plant and rolled out in stages.',
    imageLines: [
      '{brand} · AI and software for manufacturers',
      'Applied AI for industrial operations.',
      'Designed for your plant and rolled out in stages.',
    ],
  },

  common: {
    skipToContent: 'Skip to content',
    languageSwitchShort: 'PT',
    languageSwitchLabel: 'Switch language to Portuguese',
    themeToggleLabel: 'Toggle light/dark theme',
    // No mobile menu in the design (Timbre); kept because the contract requires them.
    bookingCtaHeader: 'Book a call',
    bookingCtaHeaderMobile: 'Book',
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
