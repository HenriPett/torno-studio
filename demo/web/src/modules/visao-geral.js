// Início (#inicio, UX §4.4): a pergunta no centro, "Hoje na operação" (até 3 cartões) e 4 indicadores
// compactos. Tudo vem do pacote do setor e respeita os módulos ligados.
import { h, icon } from '../ui.js';
import { sugestoesInicio, empresaCurta } from '../ui/conversa.js';
import { feminino, statusLabel } from '../ai/local-engine.js';

const DIAS = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
const MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
const AREA_MODULO = { producao: 'producao', qualidade: 'qualidade', manutencao: 'manutencao', comercial: 'comercial', marketing: 'marketing', operadores: 'operadores', gestao: null };
const SEV = { alta: 0, media: 1, baixa: 2 };

const ligado = (ctx, m) => (!m ? true : typeof ctx?.isEnabled === 'function' ? !!ctx.isEnabled(m) : true);
const term = (ctx, k) => (typeof ctx?.term === 'function' ? ctx.term(k) : ctx?.data?.vocabulario?.[k] ?? k);
const dataBr = (iso) => { const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(iso ?? '')); return m ? `${m[3]}/${m[2]}` : ''; };
const encurta = (s, n = 70) => {
  const t = String(s ?? '').replace(/\s+/g, ' ').trim().replace(/[.;:]+$/, '');
  return t.length > n ? `${t.slice(0, n - 1).replace(/[\s,;:]+\S*$/, '')}…` : t;
};
const num = (v) => (typeof v === 'number' ? v.toLocaleString('pt-BR', { maximumFractionDigits: 1 }) : String(v ?? '—'));

/** "Sexta, 13 de novembro" a partir de AAAA-MM-DD (sem fuso). */
export function dataLonga(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(iso ?? ''));
  if (!m) return '';
  const d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
  return `${DIAS[d.getUTCDay()]}, ${+m[3]} de ${MESES[+m[2] - 1]}`;
}

export function saudacao(hora = new Date().getHours()) {
  if (hora >= 5 && hora < 12) return 'Bom dia';
  if (hora >= 12 && hora < 18) return 'Boa tarde';
  return 'Boa noite';
}

function nomeSalvo(ctx) {
  try { if (typeof ctx?.autorSalvo === 'function') return ctx.autorSalvo() || ''; } catch { /* ok */ }
  const a = typeof ctx?.autor === 'function' ? ctx.autor() : '';
  return a && a !== 'Você' ? a : '';
}

/** Artigo do nome da máquina ("o TEA-12" para "Tear…", "a ENV-03" para "Envasadora…"). */
const artigoDe = (ctx, m) => {
  const w = String(m?.nome ?? term(ctx, 'maquina')).split(/\s+/)[0];
  return feminino(w) ? 'a' : 'o';
};

/** Cartões de "Hoje na operação" (máx. 3), na prioridade do spec. */
export function cartoesHoje(ctx) {
  const d = ctx?.data ?? {};
  const out = [];
  const ordemTerm = term(ctx, 'ordens');
  const fem = feminino(term(ctx, 'ordem'));

  if (ligado(ctx, 'producao')) {
    const ops = (d.ordens ?? []).filter((o) => o.status === 'atrasada')
      .sort((a, b) => String(a.prazo).localeCompare(String(b.prazo)) || (a.progresso ?? 0) - (b.progresso ?? 0));
    if (ops.length) {
      const o = ops[0];
      const n = ops.length;
      out.push({
        modulo: 'producao', tom: 'danger', area: 'Produção',
        titulo: `${n} ${n === 1 ? term(ctx, 'ordem') : ordemTerm} ${fem ? 'atrasada' : 'atrasado'}${n === 1 ? '' : 's'}`,
        texto: `A mais crítica: ${o.id}${o.motivo_atraso ? `, ${encurta(o.motivo_atraso, 70)}` : ''}.`,
        ref: `op:${o.id}`,
        pergunta: `Por que ${fem ? 'as' : 'os'} ${ordemTerm} estão atrasando?`,
      });
    }
  }
  if (ligado(ctx, 'manutencao')) {
    const ms = d.maquinas ?? [];
    const m = ms.find((x) => x.status === 'parada') ?? ms.find((x) => x.status === 'alerta');
    if (m) {
      const os = (d.manutencao ?? []).filter((x) => x.maquina === m.id && x.status !== 'concluida')
        .sort((a, b) => String(b.data).localeCompare(String(a.data)))[0];
      const art = artigoDe(ctx, m);
      out.push({
        modulo: 'manutencao', tom: m.status === 'parada' ? 'danger' : 'warn', area: 'Manutenção',
        titulo: m.status === 'parada' ? `${m.id} ${art === 'a' ? 'parada' : 'parado'}` : `${m.id} em alerta`,
        texto: os ? `${encurta(os.descricao, 80)}${os.id ? ` (${os.id})` : ''}.` : `${m.nome}: ${statusLabel(m.status)}.`,
        ref: `maq:${m.id}`,
        pergunta: `O que está acontecendo com ${art} ${m.id}?`,
      });
    }
  }
  if (ligado(ctx, 'qualidade')) {
    const ncs = (d.nao_conformidades ?? []).filter((n) => n.status !== 'encerrada' && n.severidade === 'alta')
      .sort((a, b) => String(b.data).localeCompare(String(a.data)));
    if (ncs.length) {
      out.push({
        modulo: 'qualidade', tom: 'danger', area: 'Qualidade',
        titulo: ncs.length === 1 ? '1 NC grave' : `${ncs.length} NCs graves`,
        texto: `${encurta(ncs[0].descricao, 90)}.`,
        ref: `nc:${ncs[0].id}`,
        pergunta: 'Quais NCs graves estão abertas e o que já foi feito?',
      });
    }
  }
  if (out.length < 3 && ligado(ctx, 'comercial')) {
    const pvs = (d.pedidos ?? []).filter((p) => p.status === 'atrasado')
      .sort((a, b) => String(a.previsao_entrega).localeCompare(String(b.previsao_entrega)));
    if (pvs.length) {
      const p = pvs[0];
      const cli = (d.clientes ?? []).find((c) => c.id === p.cliente);
      out.push({
        modulo: 'comercial', tom: 'danger', area: 'Comercial',
        titulo: pvs.length === 1 ? '1 pedido atrasado' : `${pvs.length} pedidos atrasados`,
        texto: `O mais antigo: ${p.id}${cli ? ` · ${cli.nome}` : ''}, previsão ${dataBr(p.previsao_entrega)}.`,
        ref: `pedido:${p.id}`,
        pergunta: 'Quais pedidos estão atrasados e por quê?',
      });
    }
  }
  return out.slice(0, 3);
}

/** Indicadores cuja área está ligada (ou gestão). */
export function kpisLigados(ctx) {
  return (ctx?.data?.kpis ?? []).filter((k) => !k.area || k.area === 'gestao' || ligado(ctx, AREA_MODULO[k.area] ?? k.area));
}

function valorKpi(k) {
  if (k.unidade === '%') return `${num(k.valor)}%`;
  if (k.unidade === 'R$') return `R$ ${num(k.valor)}`;
  return `${num(k.valor)}${k.unidade ? ` ${k.unidade}` : ''}`;
}
function metaKpi(k) {
  if (k.unidade === '%') return `${num(k.meta)}%`;
  if (k.unidade === 'R$') return `R$ ${num(k.meta)}`;
  return `${num(k.meta)}${k.unidade ? ` ${k.unidade}` : ''}`;
}
export function kpiNaMeta(k) {
  return k.direcao === 'menor_melhor' ? k.valor <= k.meta : k.valor >= k.meta;
}

function tileKpi(ctx, k) {
  const ant = (k.tendencia ?? []).at(-2);
  const subiu = ant != null ? k.valor > ant : null;
  const ok = kpiNaMeta(k);
  const seta = subiu == null ? null : icon(subiu ? 'arrow-up' : 'arrow-down', { size: 14 });
  return h('button', {
    type: 'button', class: 'ini-kpi', onClick: () => ctx.openRef?.(`kpi:${k.id}`),
    'aria-label': `${k.nome}: ${valorKpi(k)}, meta ${metaKpi(k)}${ok ? ', dentro da meta' : ', fora da meta'}`,
  },
  h('span', { class: 'ini-kpi__nome' }, k.nome),
  h('span', { class: 'ini-kpi__linha' },
    h('span', { class: 'ini-kpi__valor num' }, valorKpi(k)),
    h('span', { class: ['ini-kpi__meta', ok ? 'is-ok' : 'is-warn'] }, seta, `meta ${metaKpi(k)}`)));
}

function cartaoHoje(ctx, c) {
  const abrir = () => ctx.openRef?.(c.ref);
  return h('article', {
    // o cartão inteiro abre ao clicar (atalho de mouse); no teclado e no leitor de tela, os botões
    // "Ver" e "Perguntar" dentro dele (um role=button com botões dentro é interativo aninhado).
    class: 'ini-hoje',
    onClick: (e) => { if (!e.target.closest('button')) abrir(); },
  },
  h('span', { class: 'ini-hoje__area' }, h('span', { class: ['ini-ponto', `is-${c.tom}`], 'aria-hidden': 'true' }), c.area),
  h('h3', { class: 'ini-hoje__titulo' }, c.titulo),
  h('p', { class: 'ini-hoje__texto' }, c.texto),
  h('span', { class: 'ini-hoje__acoes' },
    h('button', { type: 'button', class: 'link-btn', onClick: abrir, 'aria-label': `Ver: ${c.titulo}` }, 'Ver ›'),
    h('button', { type: 'button', class: 'link-btn link-btn--muted', onClick: () => ctx.perguntar?.(c.pergunta, { modulo: c.modulo }) }, 'Perguntar')));
}

function placeholderInicio(ctx) {
  if (ligado(ctx, 'producao')) {
    const o = (ctx.data?.ordens ?? []).filter((x) => x.status === 'atrasada').sort((a, b) => String(a.prazo).localeCompare(String(b.prazo)))[0];
    if (o) return `Ex.: por que ${feminino(term(ctx, 'ordem')) ? 'a' : 'o'} ${o.id} atrasou?`;
  }
  return 'Ex.: o que eu preciso ver hoje?';
}

export function render(el, ctx) {
  const d = ctx.data ?? {};
  const empresa = empresaCurta(ctx);
  const areasLigadas = ['producao', 'qualidade', 'manutencao', 'comercial', 'marketing'].some((m) => ligado(ctx, m));

  // pergunta -------------------------------------------------------------
  const campo = h('input', {
    type: 'text', class: 'ini-campo__input', placeholder: placeholderInicio(ctx), autocomplete: 'off',
    enterkeyhint: 'send', 'aria-label': `Pergunte à operação da ${empresa}`,
  });
  const enviarBtn = h('button', { type: 'submit', class: 'ini-campo__enviar', 'aria-label': 'Enviar pergunta', disabled: true }, icon('arrow-up', { size: 20 }));
  campo.addEventListener('input', () => { enviarBtn.disabled = !campo.value.trim(); });
  const form = h('form', {
    class: 'ini-campo', role: 'search',
    onSubmit: (e) => {
      e.preventDefault();
      const t = campo.value.trim();
      if (!t) return;
      el.querySelector('.ini')?.classList.add('is-saindo');
      ctx.perguntar?.(t, { modulo: 'visao-geral' });
    },
  }, campo, enviarBtn);

  const sugBox = h('div', { class: 'ini-sugestoes', role: 'group', 'aria-label': 'Perguntas sugeridas' });
  function pintaSugestoes() {
    sugBox.replaceChildren(...sugestoesInicio(ctx).map((s) => h('button', {
      type: 'button', class: ['pill-sug', s.derivada && 'is-derivada'], title: s.derivada ? 'Usa o que você registrou' : s.texto,
      onClick: () => ctx.perguntar?.(s.texto, { modulo: 'visao-geral' }),
    }, s.derivada ? h('span', { class: 'pill-sug__ponto', 'aria-hidden': 'true' }) : null, h('span', null, s.texto))));
  }
  pintaSugestoes();

  const nome = nomeSalvo(ctx);
  const hero = h('div', { class: 'ini-hero' },
    h('p', { class: 'ini-data' }, `${dataLonga(ctx.today || d.data_referencia)} · ${saudacao()}${nome ? `, ${nome}` : ''}`),
    h('h1', { class: 'ini-titulo' }, `Pergunte à operação da ${empresa}`),
    form,
    sugBox,
    h('button', { type: 'button', class: 'link-btn ini-ensinar', onClick: () => ctx.ensinar?.({ origem: 'inicio' }) }, 'ou ensine algo ao cérebro ›'));

  // hoje na operação -----------------------------------------------------
  let hojeSec = null;
  let kpiSec = null;
  if (areasLigadas) {
    let cartoes = [];
    let falhou = false;
    try { cartoes = cartoesHoje(ctx); } catch (e) { console.error('[início] destaques', e); falhou = true; }
    if (falhou || cartoes.length) {
      hojeSec = h('section', { class: 'ini-sec', 'aria-labelledby': 'ini-hoje-t' },
        h('h2', { class: 'ini-sec__titulo', id: 'ini-hoje-t' }, 'Hoje na operação'),
        falhou ? h('p', { class: 'ini-muted' }, 'Não foi possível carregar os destaques.')
          : h('div', { class: 'ini-hoje-grade' }, cartoes.map((c) => cartaoHoje(ctx, c))));
    }
    const ks = kpisLigados(ctx);
    if (ks.length) {
      const grade = h('div', { class: 'ini-kpis' }, ks.slice(0, 4).map((k) => tileKpi(ctx, k)));
      let aberto = false;
      const verTodos = ks.length > 4 ? h('button', {
        type: 'button', class: 'link-btn', 'aria-expanded': 'false',
        onClick: () => {
          aberto = !aberto;
          grade.replaceChildren(...(aberto ? ks : ks.slice(0, 4)).map((k) => tileKpi(ctx, k)));
          grade.classList.toggle('is-todos', aberto);
          verTodos.textContent = aberto ? 'Ver menos' : `Ver todos (${ks.length}) ›`;
          verTodos.setAttribute('aria-expanded', String(aberto));
        },
      }, `Ver todos (${ks.length}) ›`) : null;
      kpiSec = h('section', { class: 'ini-sec', 'aria-labelledby': 'ini-kpi-t' },
        h('div', { class: 'ini-sec__cab' }, h('h2', { class: 'ini-sec__titulo', id: 'ini-kpi-t' }, 'Indicadores'), verTodos),
        grade);
    }
  }

  const raiz = h('div', { class: ['ini', !hojeSec && !kpiSec && 'ini--so-pergunta'] }, hero, hojeSec, kpiSec);
  el.replaceChildren(raiz);

  // a 4ª sugestão acompanha o aprendizado
  const off = ctx.learning?.subscribe?.((_, ev) => { if (ev?.tipo !== 'uso') pintaSugestoes(); });

  if (typeof matchMedia === 'function' && matchMedia('(min-width: 1024px)').matches) {
    requestAnimationFrame(() => { try { campo.focus({ preventScroll: true }); } catch { /* ok */ } });
  }
  return () => { if (typeof off === 'function') off(); };
}
