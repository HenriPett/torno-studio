/**
 * Copy do "chrome" do site (header, menu, footer e rótulos dos primitivos de design), PT e EN.
 * Separado de pt-BR.ts/en.ts de propósito: o chrome é do design system (DESIGN-2026-11 §7) e não
 * muda junto com o copy das páginas.
 *
 * Regras: nenhum link para /para/... (landings de setor são isoladas); rotas sempre via routeId.
 */
import type { Locale, RouteId } from '../config/routes.mjs';

export interface ChromeNavItem {
  label: string;
  routeId: RouteId;
  /** Âncora na página da rota (sem "#"). */
  hash?: string;
}

export interface ChromeLink {
  label: string;
  routeId: RouteId;
}

export interface ChromeCopy {
  header: {
    navLabel: string;
    nav: ChromeNavItem[];
    menuOpen: string;
    menuClose: string;
    cta: string;
    ctaShort: string;
  };
  footer: {
    tagline: string;
    columns: { title: string; links: ChromeLink[] }[];
    location: string;
    linkedinLabel: string;
    emailLabel: string;
    contactTitle: string;
    copyright: string;
  };
  common: {
    themeToggleLabel: string;
    /** Selo obrigatório dos mocks de interface (regra de honestidade). */
    illustration: string;
    source: string;
    bookingCta: string;
  };
}

export const chrome: Record<Locale, ChromeCopy> = {
  'pt-BR': {
    header: {
      navLabel: 'Navegação principal',
      nav: [
        { label: 'Soluções', routeId: 'home', hash: 'solucoes' },
        { label: 'Como trabalhamos', routeId: 'howWeWork' },
        { label: 'Cases', routeId: 'cases' },
        { label: 'Blog', routeId: 'blog' },
        { label: 'Sobre', routeId: 'about' },
      ],
      menuOpen: 'Menu',
      menuClose: 'Fechar menu',
      cta: 'Agendar diagnóstico',
      ctaShort: 'Agendar',
    },
    footer: {
      tagline: 'IA e software sob medida para a indústria',
      columns: [
        {
          title: 'Empresa',
          links: [
            { label: 'Como trabalhamos', routeId: 'howWeWork' },
            { label: 'Cases', routeId: 'cases' },
            { label: 'Sobre', routeId: 'about' },
            { label: 'Contato', routeId: 'contact' },
          ],
        },
        { title: 'Conteúdo', links: [{ label: 'Blog', routeId: 'blog' }] },
        { title: 'Legal', links: [{ label: 'Privacidade', routeId: 'privacy' }] },
      ],
      location: 'Jaraguá do Sul, SC · Brasil',
      linkedinLabel: 'LinkedIn',
      emailLabel: 'E-mail',
      contactTitle: 'Fale com a gente',
      copyright: '© {year} {brand}',
    },
    common: {
      themeToggleLabel: 'Alternar tema claro/escuro',
      illustration: 'Ilustração',
      source: 'Fonte',
      bookingCta: 'Agendar diagnóstico',
    },
  },
  en: {
    header: {
      navLabel: 'Main navigation',
      nav: [
        { label: 'Solutions', routeId: 'home', hash: 'solutions' },
        { label: 'How we work', routeId: 'howWeWork' },
        { label: 'Cases', routeId: 'cases' },
        { label: 'Blog', routeId: 'blog' },
        { label: 'About', routeId: 'about' },
      ],
      menuOpen: 'Menu',
      menuClose: 'Close menu',
      cta: 'Book a call',
      ctaShort: 'Book',
    },
    footer: {
      tagline: 'Custom AI and software for industrial companies',
      columns: [
        {
          title: 'Company',
          links: [
            { label: 'How we work', routeId: 'howWeWork' },
            { label: 'Cases', routeId: 'cases' },
            { label: 'About', routeId: 'about' },
            { label: 'Contact', routeId: 'contact' },
          ],
        },
        { title: 'Content', links: [{ label: 'Blog', routeId: 'blog' }] },
        { title: 'Legal', links: [{ label: 'Privacy', routeId: 'privacy' }] },
      ],
      location: 'Jaraguá do Sul, SC · Brazil',
      linkedinLabel: 'LinkedIn',
      emailLabel: 'Email',
      contactTitle: 'Get in touch',
      copyright: '© {year} {brand}',
    },
    common: {
      themeToggleLabel: 'Toggle light/dark theme',
      illustration: 'Illustration',
      source: 'Source',
      bookingCta: 'Book a call',
    },
  },
};

export const getChrome = (locale: Locale): ChromeCopy => chrome[locale];
