/**
 * Motion da Torno (DESIGN-2026-11 §9). Um módulo só, vanilla, sem dependências.
 *
 * - Revelação por rolagem ([data-reveal], [data-reveal-stagger], filhos de .reveal) com IntersectionObserver.
 *   O que já está na tela na carga é marcado .is-in ANTES de html.motion-ready (que esconde o resto): sem flash.
 * - Títulos display ([data-reveal="lines"]): máscara por linha, desfeita ao terminar.
 * - Contadores ([data-count]): o valor final está no HTML; anima de 0 até ele (leitor de tela ouve o final).
 * - Demo do assistente ([data-ask]): abas ARIA (setas, Home/End), pergunta digitada, resposta e fontes em sequência.
 *   Toca sozinha uma vez: logo após o hero (demo na 1ª dobra) ou ao entrar na tela.
 * - Laços decorativos ([data-loop]): .is-on só enquanto visíveis (fluxo de dados, pulsos).
 * - Etapas com rolagem fixa ([data-scrolly], desktop): etapa ativa + barra de progresso.
 * - Header: fundo ao rolar; no celular esconde ao descer e volta ao subir.
 * - Brilho que segue o ponteiro (cards e hero), só com ponteiro fino.
 * - Carrosséis do celular (.carousel-sm): tabindex só quando rolam (teclado: setas).
 *
 * prefers-reduced-motion: reduce → nada fica escondido, contadores no valor final, abas trocam sem digitação.
 * Scroll: um listener passivo + rAF. Leituras (rect) antes de escritas no mesmo quadro.
 */
const d = document;
const root = d.documentElement;
const mq = (q: string) => matchMedia(q);
const reduce = mq('(prefers-reduced-motion: reduce)').matches;
const desk = mq('(min-width: 64em)');
const raf = requestAnimationFrame;
const $$ = <T extends Element = HTMLElement>(sel: string, el: ParentNode = d) => Array.from(el.querySelectorAll<T>(sel));
const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
/** Mesmo valor de --motion-long / --motion-reveal / --motion-stagger(-line) em tokens.css. */
const LONG = 1400;
const REVEAL = 900;
const STAGGER = 80;
const LINE = 110;

/* ---------------- Revelação ---------------- */

const SKIP = '[data-reveal],script,template,style,[hidden]';
/** Filhos de um .reveal (container do Section) entram sozinhos; se um filho já tem [data-reveal] dentro, desce nele. */
function autoTag(el: Element, depth: number) {
  for (const child of Array.from(el.children)) {
    if (child.matches(SKIP)) continue;
    if (child.querySelector('[data-reveal],[data-reveal-stagger]')) {
      if (depth < 3) autoTag(child, depth + 1);
    } else child.setAttribute('data-reveal', '');
  }
}

/** Monta as linhas de um título (lê todas as posições, depois escreve). Só texto puro. */
function splitLines(el: HTMLElement) {
  const text = el.textContent ?? '';
  if (el.children.length || !text.trim()) return 0;
  const words = text.trim().split(/\s+/);
  el.textContent = '';
  const spans = words.map((w, k) => {
    const s = d.createElement('span');
    s.textContent = w;
    el.append(s, k < words.length - 1 ? ' ' : '');
    return s;
  });
  const tops = spans.map((s) => s.offsetTop);
  el.textContent = '';
  let inner: HTMLElement | null = null;
  let prev = -1;
  let n = 0;
  spans.forEach((s, k) => {
    if (tops[k] !== prev || !inner) {
      prev = tops[k]!;
      const line = d.createElement('span');
      line.className = 'm-line';
      inner = d.createElement('span');
      inner.className = 'm-line__in';
      inner.style.setProperty('--l', String(n++));
      line.append(inner);
      el.append(line);
    } else inner.append(' ');
    inner.append(s.textContent!);
  });
  setTimeout(() => (el.textContent = text), REVEAL + n * LINE + 8 * STAGGER + 100);
  return n;
}

/** Conta de 0 até o número do texto, mantendo prefixo/sufixo e o formato do idioma (1.234,5 / 1,234.5). */
function count(el: HTMLElement, delay: number) {
  const fin = el.textContent ?? '';
  const m = fin.match(/\d[\d.,]*\d|\d/);
  if (!m || reduce) return;
  const en = root.lang.startsWith('en');
  const [th, dec] = en ? [',', '.'] : ['.', ','];
  const raw = m[0];
  const decimals = raw.includes(dec) ? raw.split(dec)[1]!.length : 0;
  const value = parseFloat(raw.split(th).join('').replace(dec, '.'));
  const pre = fin.slice(0, m.index);
  const post = fin.slice(m.index! + raw.length);
  const fmt = new Intl.NumberFormat(en ? 'en-US' : 'pt-BR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals, useGrouping: raw.includes(th) });
  const sr = d.createElement('span');
  sr.className = 'visually-hidden';
  sr.textContent = fin;
  const shown = d.createElement('span');
  shown.setAttribute('aria-hidden', 'true');
  shown.textContent = pre + fmt.format(0) + post;
  el.replaceChildren(sr, shown);
  let t0 = 0;
  const tick = (t: number) => {
    t0 ||= t + delay;
    const p = Math.min(Math.max((t - t0) / LONG, 0), 1);
    const e = p === 1 ? 1 : 1 - 2 ** (-10 * p); // ease-out expo
    shown.textContent = pre + fmt.format(value * e) + post;
    if (p < 1) raf(tick);
    else el.textContent = fin;
  };
  raf(tick);
}

function show(el: HTMLElement, i: number) {
  el.style.setProperty('--i', String(Math.min(i, 8)));
  if (el.dataset.reveal === 'lines') splitLines(el);
  el.classList.add('is-in', 'is-anim');
  const counters = el.matches('[data-count]') ? [el] : $$('[data-count]', el);
  counters.forEach((c) => count(c, i * STAGGER + 200));
}

const io = new IntersectionObserver(
  (entries) => {
    let i = 0;
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      // Num carrossel, os cards fora da faixa visível (cortados pela rolagem) entram junto com o primeiro.
      const group = e.target.parentElement?.matches('.carousel-sm') ? Array.from(e.target.parentElement.children) : [e.target];
      for (const el of group) {
        if (el.classList.contains('is-in')) continue;
        io.unobserve(el);
        show(el as HTMLElement, i++);
      }
    }
  },
  { rootMargin: '0px 0px -8% 0px' },
);

function initReveal() {
  $$('[data-reveal-stagger]').forEach((c) => {
    for (const ch of Array.from(c.children)) if (!ch.hasAttribute('data-reveal')) ch.setAttribute('data-reveal', '');
  });
  $$('.reveal').forEach((s) => autoTag(s, 0));
  if (reduce) return;
  const els = $$('[data-reveal]');
  const vh = innerHeight;
  const tops = els.map((e) => e.getBoundingClientRect().top);
  els.forEach((e, k) => (tops[k]! < vh ? e.classList.add('is-in') : io.observe(e)));
  root.classList.add('motion-ready');
}

/* ---------------- Demo do assistente (abas) ---------------- */

function initAsk(box: HTMLElement) {
  const tabs = $$('[role="tab"]', box);
  const threads = $$('[data-thread]', box);
  const panel = box.querySelector<HTMLElement>('[role="tabpanel"]');
  const img = box.querySelector<HTMLElement>('[role="img"]');
  const input = box.querySelector<HTMLElement>('.ask__typing');
  const ind = box.querySelector<HTMLElement>('.ask-demo__ind');
  const list = box.querySelector<HTMLElement>('[role="tablist"]');
  let run = 0;
  let current = 0;
  let touched = false;

  const place = () => {
    const t = tabs[current];
    if (!ind || !t) return;
    const x = t.offsetLeft;
    const w = t.offsetWidth;
    ind.style.transform = `translateX(${x}px)`;
    ind.style.width = `${w}px`;
  };

  async function play(k: number) {
    const id = ++run;
    const th = threads[k];
    if (!th || reduce) return;
    const bubble = th.querySelector<HTMLElement>('.ask__bubble')!;
    const q = bubble.textContent ?? '';
    const alive = () => id === run;
    th.dataset.state = 'typing';
    if (input) {
      input.textContent = '';
      input.classList.add('is-typing');
      for (let n = 0; n <= q.length && alive(); n += 2) {
        input.textContent = q.slice(0, n);
        input.scrollLeft = input.scrollWidth;
        await wait(22);
      }
      input.textContent = '';
      input.classList.remove('is-typing');
    }
    for (const [state, ms] of [['sent', 450], ['thinking', 750], ['answer', 600], ['sources', 1100]] as const) {
      if (!alive()) return;
      th.dataset.state = state;
      await wait(ms);
    }
    if (alive()) delete th.dataset.state;
  }

  function select(k: number, focus: boolean) {
    current = k;
    tabs.forEach((t, j) => {
      const on = j === k;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
    });
    threads.forEach((th, j) => {
      th.hidden = j !== k;
      if (j !== k) delete th.dataset.state;
    });
    if (input) {
      input.textContent = '';
      input.classList.remove('is-typing');
    }
    const t = tabs[k];
    if (t) {
      panel?.setAttribute('aria-labelledby', t.id);
      if (focus) t.focus();
      if (list && list.scrollWidth > list.clientWidth) t.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: reduce ? 'auto' : 'smooth' });
    }
    const label = threads[k]?.dataset.label;
    if (img && label) img.setAttribute('aria-label', label);
    place();
    run++;
    void play(k);
  }

  tabs.forEach((t, k) =>
    t.addEventListener('click', () => {
      touched = true;
      if (k !== current) select(k, false);
    }),
  );
  list?.addEventListener('keydown', (e) => {
    const n = tabs.length;
    const k = { ArrowRight: current + 1, ArrowLeft: current - 1 + n, Home: 0, End: n - 1 }[e.key];
    if (k === undefined) return;
    e.preventDefault();
    touched = true;
    select(k % n, true);
  });
  if (ind) {
    box.classList.add('has-ind');
    place();
    new ResizeObserver(() => place()).observe(list!);
  }
  // Toca uma vez: logo depois da entrada do hero, se a demo já está na tela, ou quando ela entra (se ninguém mexeu).
  if (reduce) return;
  // Começa "em branco": a pergunta ainda não foi feita.
  const first = threads[current];
  if (first) first.dataset.state = 'typing';
  if (box.getBoundingClientRect().top < innerHeight) {
    setTimeout(() => !touched && play(current), 700);
    return;
  }
  const seen = new IntersectionObserver(
    ([e]) => {
      if (!e?.isIntersecting) return;
      seen.disconnect();
      if (!touched) setTimeout(() => !touched && play(current), 350);
    },
    { threshold: 0.35 },
  );
  seen.observe(box);
}

/* ---------------- Laços decorativos ([data-loop]) ---------------- */

/** Animações contínuas (fluxo de dados, pulsos) só rodam com o elemento na tela: .is-on. */
const loops = new IntersectionObserver((es) => es.forEach((e) => e.target.classList.toggle('is-on', e.isIntersecting)));

/* ---------------- Etapas com rolagem fixa ---------------- */

const scrollies: { el: HTMLElement; list: HTMLElement; bar: HTMLElement | null; on: boolean }[] = [];

function initScrolly(el: HTMLElement) {
  const steps = $$('.ds-steps__item', el);
  const marks = $$('[data-step-mark]', el);
  const list = el.querySelector<HTMLElement>('.ds-steps');
  if (!list || !steps.length) return;
  const s = { el, list, bar: el.querySelector<HTMLElement>('[data-scrolly-bar]'), on: false };
  scrollies.push(s);
  const set = (k: number) => {
    steps.forEach((x, j) => x.classList.toggle('is-active', j === k));
    marks.forEach((x, j) => x.classList.toggle('is-active', j === k));
  };
  set(0);
  const watch = new IntersectionObserver(
    (es) => es.forEach((e) => e.isIntersecting && set(steps.indexOf(e.target as HTMLElement))),
    { rootMargin: '-45% 0px -50% 0px' },
  );
  steps.forEach((x) => watch.observe(x));
  new IntersectionObserver(([e]) => {
    s.on = !!e?.isIntersecting;
    onScroll();
  }).observe(el);
}

/* ---------------- Header + scroll ---------------- */

const header = d.querySelector<HTMLElement>('.site-header');
let lastY = scrollY;
let ticking = false;

function update() {
  ticking = false;
  const y = scrollY;
  const vh = innerHeight;
  // Leituras primeiro.
  const bars = scrollies.filter((s) => s.on && s.bar).map((s) => [s.bar!, s.list.getBoundingClientRect()] as const);
  let menuOpen = false;
  try {
    menuOpen = !!header?.querySelector('[popover]:popover-open');
  } catch {
    /* sem :popover-open */
  }
  // Escritas.
  if (header) {
    header.classList.toggle('is-scrolled', y > 8);
    const dy = y - lastY;
    if (desk.matches || reduce || y < 240 || dy < -4 || menuOpen) header.classList.remove('is-hidden');
    else if (dy > 4 && !header.contains(d.activeElement)) header.classList.add('is-hidden');
  }
  for (const [bar, r] of bars) bar.style.transform = `scaleY(${Math.min(Math.max((vh * 0.5 - r.top) / r.height, 0), 1)})`;
  lastY = y;
}

function onScroll() {
  if (!ticking) {
    ticking = true;
    raf(update);
  }
}

/* ---------------- Ponteiro (brilho de card, campo do hero) ---------------- */

function initPointer() {
  let ev: PointerEvent | null = null;
  let queued = false;
  const apply = () => {
    queued = false;
    const hit = (ev?.target as Element | null)?.closest?.<HTMLElement>('.ds-card, [data-pointer]');
    if (!hit || !ev) return;
    // data-pointer="<seletor>": mede e pinta num filho (ex.: o campo do hero, maior que a área sensível).
    const t = (hit.dataset.pointer && hit.querySelector<HTMLElement>(hit.dataset.pointer)) || hit;
    const r = t.getBoundingClientRect();
    t.style.setProperty('--mx', `${ev.clientX - r.left}px`);
    t.style.setProperty('--my', `${ev.clientY - r.top}px`);
  };
  d.addEventListener(
    'pointermove',
    (e) => {
      ev = e;
      if (!queued) {
        queued = true;
        raf(apply);
      }
    },
    { passive: true },
  );
}

/* ---------------- Carrossel do celular ---------------- */

function initCarousels() {
  const tracks = $$('.carousel-sm');
  if (!tracks.length) return;
  const sync = () => {
    const over = tracks.map((t) => t.scrollWidth > t.clientWidth + 1);
    tracks.forEach((t, k) => (over[k] ? (t.tabIndex = 0) : t.removeAttribute('tabindex')));
  };
  sync();
  mq('(max-width: 39.99em)').addEventListener('change', sync);
}

/* ---------------- Início ---------------- */

initReveal();
$$('[data-ask]').forEach(initAsk);
$$('[data-scrolly]').forEach(initScrolly);
if (!reduce) $$('[data-loop]').forEach((el) => loops.observe(el));
initCarousels();
if (!reduce && mq('(hover: hover) and (pointer: fine)').matches) initPointer();
addEventListener('scroll', onScroll, { passive: true });
addEventListener('resize', onScroll, { passive: true });
update();
