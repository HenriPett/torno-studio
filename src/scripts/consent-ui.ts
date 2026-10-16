/**
 * UI do consentimento (DESIGN §13): faixa do 1º nível, <dialog> do 2º nível e o botão do footer.
 * Só DOM e acessibilidade; store, gtag e revogação ficam em ./consent.ts (Compasso).
 *
 * - A faixa aparece se não houver escolha válida. Não rouba o foco ao carregar (§13.1).
 * - Com a faixa aberta, --consent-h no <html> reserva espaço no fim da página (WCAG 2.4.11).
 * - O dialog abre com foco no título; Esc e × fecham sem salvar e devolvem o foco a quem abriu.
 * - Depois de uma escolha: faixa some, foco vai para quem abriu (se ainda visível) ou para main#conteudo,
 *   e a região aria-live anuncia o texto de "salvo".
 */

import { CONSENT_OPEN_EVENT, getConsent, init, setConsent, type Consent } from './consent';

type Action = 'accept' | 'reject' | 'customize' | 'save' | 'accept-all' | 'reject-all';

export function initConsentUi(): void {
  // Sem banner no HTML (build sem PUBLIC_GADS_ID) não há o que consentir: nem init(), nem window.tsConsent.
  // O <script> do componente é empacotado mesmo quando o JSX não renderiza, por isso a checagem é aqui.
  const banner = document.querySelector<HTMLElement>('[data-consent-banner]');
  const dialog = document.querySelector<HTMLDialogElement>('dialog[data-consent-dialog]');
  if (!banner || !dialog) return;

  init();

  const root = document.documentElement;
  const live = document.querySelector<HTMLElement>('[data-consent-live]');
  const title = dialog.querySelector<HTMLElement>('[data-consent-title]');
  const checkbox = (name: keyof Consent) => dialog.querySelector<HTMLInputElement>(`input[name="${name}"]`);
  /** Campos do registro; cada um só pode ser true se a sua checkbox estiver no diálogo (sem copy, sem categoria). */
  const FIELDS = ['medicao', 'publicidade'] as const satisfies readonly (keyof Consent)[];
  const consentFrom = (value: (input: HTMLInputElement) => boolean): Consent => {
    const result: Consent = { medicao: false, publicidade: false };
    for (const field of FIELDS) {
      const input = checkbox(field);
      result[field] = input ? value(input) : false;
    }
    return result;
  };

  let opener: HTMLElement | null = null;

  const syncHeight = () => root.style.setProperty('--consent-h', `${banner.offsetHeight}px`);
  const resize = new ResizeObserver(syncHeight);

  function showBanner(): void {
    banner!.hidden = false;
    syncHeight();
    resize.observe(banner!);
  }

  function hideBanner(): void {
    banner!.hidden = true;
    resize.disconnect();
    root.style.removeProperty('--consent-h');
  }

  function openDialog(from: HTMLElement | null): void {
    opener = from;
    const saved = getConsent();
    for (const field of FIELDS) {
      const input = checkbox(field);
      if (input) input.checked = saved?.[field] ?? false;
    }
    if (!dialog!.open) dialog!.showModal();
    title?.focus();
  }

  /** Foco depois de fechar: quem abriu, se ainda estiver visível; senão o conteúdo principal. */
  function restoreFocus(): void {
    const target = opener && opener.offsetParent !== null ? opener : document.getElementById('conteudo');
    target?.focus({ preventScroll: true });
    opener = null;
  }

  function choose(next: Consent): void {
    if (dialog!.open) dialog!.close();
    hideBanner();
    restoreFocus();
    if (live) {
      // Limpa e repõe para o leitor de tela anunciar mesmo numa 2ª escolha igual.
      live.textContent = '';
      requestAnimationFrame(() => (live.textContent = live.dataset.message ?? ''));
    }
    setConsent(next); // pode recarregar a página em caso de revogação
  }

  const all = (on: boolean): Consent => consentFrom(() => on);

  const handlers: Record<Action, (button: HTMLElement) => void> = {
    accept: () => choose(all(true)),
    reject: () => choose(all(false)),
    customize: (button) => openDialog(button),
    'accept-all': () => choose(all(true)),
    'reject-all': () => choose(all(false)),
    save: () => choose(consentFrom((input) => input.checked)),
  };

  document.addEventListener('click', (event) => {
    const target = event.target as Element | null;
    const action = target?.closest<HTMLElement>('[data-consent-action]');
    if (action) {
      handlers[action.dataset.consentAction as Action]?.(action);
      return;
    }
    if (target?.closest('[data-consent-close]')) dismiss();
  });

  /**
   * Esc e × fecham sem salvar e devolvem o foco a quem abriu, de forma SÍNCRONA. O evento 'close' do <dialog> é
   * assíncrono: devolver o foco nele roubava o foco que a pessoa já tinha movido (Recusar → Personalizar) e o
   * Enter seguinte reabria o diálogo (QA B8).
   */
  function dismiss(): void {
    if (dialog!.open) dialog!.close();
    restoreFocus();
  }

  dialog.addEventListener('cancel', (event) => {
    event.preventDefault();
    dismiss();
  });

  // Footer e window.tsConsent.open() passam pelo mesmo evento.
  let lastTrigger: HTMLElement | null = null;
  for (const button of document.querySelectorAll<HTMLElement>('[data-consent-open]')) {
    button.hidden = false;
    button.addEventListener('click', () => {
      lastTrigger = button;
      window.tsConsent?.open();
    });
  }
  document.addEventListener(CONSENT_OPEN_EVENT, () => {
    openDialog(lastTrigger ?? (document.activeElement as HTMLElement | null));
    lastTrigger = null;
  });

  if (!getConsent()) showBanner();
}
