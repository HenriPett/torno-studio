// Integrações (PLANO §4, parte "software sob medida").
// Mostra que o cérebro lê os sistemas que a empresa já tem, sem trocar nenhum.
// Todo status aqui é simulado: "Sincronizar agora" só anima a tela.

import { h, icon, pageHeader, card, badge, emptyState } from '../ui.js';
import { fmt, normalize } from '../format.js';

const STATUS = {
  conectado: { label: 'Conectado', tone: 'ok' },
  sincronizando: { label: 'Sincronizando', tone: 'accent' },
  erro: { label: 'Erro', tone: 'danger' },
  planejado: { label: 'Planejado', tone: 'neutral' },
};
const FORA_DO_DIAGRAMA = new Set(['visao-geral', 'cerebro', 'integracoes', 'seguranca']);

function ensureCss() {
  if (document.querySelector('link[href*="mod-c.css"]')) return;
  const l = document.createElement('link');
  l.rel = 'stylesheet';
  l.href = new URL('../../css/mod-c.css', import.meta.url).href;
  document.head.appendChild(l);
}

function on(node, ev, fn) {
  node.addEventListener(ev, fn);
  return node;
}

// Minutos desde 2000-01-01 para "AAAA-MM-DDTHH:MM" (sem fuso).
function minutos(iso) {
  const m = String(iso || '').match(/^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}))?/);
  if (!m) return null;
  return Math.round(Date.UTC(+m[1], +m[2] - 1, +m[3], +(m[4] || 0), +(m[5] || 0)) / 60000);
}

function isoDe(min) {
  const dt = new Date(min * 60000);
  const p = (n) => String(n).padStart(2, '0');
  return `${dt.getUTCFullYear()}-${p(dt.getUTCMonth() + 1)}-${p(dt.getUTCDate())}T${p(dt.getUTCHours())}:${p(dt.getUTCMinutes())}`;
}

function relativo(iso, agoraMin) {
  const m = minutos(iso);
  if (m == null) return 'ainda não sincronizou';
  const diff = agoraMin - m;
  if (diff < 1) return 'agora mesmo';
  if (diff < 60) return `há ${diff} min`;
  if (diff < 24 * 60) return `há ${Math.floor(diff / 60)} h${diff % 60 ? ` ${diff % 60} min` : ''}`;
  const dias = Math.floor(diff / 1440);
  return dias === 1 ? 'ontem' : `há ${dias} dias`;
}

function iconeDoTipo(tipo) {
  const t = normalize(tipo);
  if (t.includes('erp')) return 'settings-2';
  if (t.includes('mes')) return 'factory';
  if (t.includes('whats')) return 'phone';
  if (t.includes('mail')) return 'send';
  if (t.includes('chamad')) return 'alert';
  if (t.includes('planilha')) return 'file';
  if (t.includes('plm') || t.includes('ficha')) return 'box';
  return 'file';
}

function nomeCurto(nome) {
  return String(nome || '').replace(/\s*\(ex\.?:[^)]*\)\s*/i, '').trim() || nome;
}

export function render(el, ctx) {
  ensureCss();
  const d = ctx.data;
  const reduzMovimento = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const timers = new Set();

  // Estado na tela (cópia; nada é gravado)
  const conectores = (d.integracoes || []).map((i) => ({ ...i }));
  const syncs = conectores.map((i) => minutos(i.ultima_sync)).filter((m) => m != null);
  // "Agora" da demo: 10:00 do dia de referência, ou logo após a sincronização mais recente.
  let agora = Math.max(minutos(`${ctx.today}T10:00`), (syncs.length ? Math.max(...syncs) : 0) + 5);
  const eventosExtra = []; // sincronizações disparadas nesta tela

  el.replaceChildren();
  el.classList.add('int-root');

  const selo = h('span', { class: 'int-selo' }, icon('clock'), 'Status simulado para demonstração');

  el.append(pageHeader({
    titulo: 'Integrações',
    subtitulo: `O cérebro da operação lê os sistemas que a ${ctx.empresa} já usa, sem trocar nenhum deles. Cada conector só lê o que o perfil de acesso permite.`,
    acoes: selo,
  }));

  if (!conectores.length) {
    el.append(emptyState('Nenhuma integração descrita para este setor.'));
    return () => {};
  }

  const resumo = h('div', { class: 'int-resumo' });
  const diagrama = h('div', { class: 'int-diagrama-wrap' });
  const grade = h('div', { class: 'int-grade' });
  const linhaTempo = h('ol', { class: 'int-tempo' });

  el.append(
    resumo,
    card({ titulo: 'Como os dados chegam aos agentes', corpo: diagrama, class: 'int-card' }),
    h('section', { class: 'int-secao', 'aria-labelledby': 'int-conectores-titulo' },
      h('h2', { id: 'int-conectores-titulo', class: 'int-h2' }, 'Conectores'),
      grade),
    card({
      titulo: 'Últimas sincronizações',
      acoes: h('span', { class: 'int-muted int-pequeno' }, 'Simulado a partir dos dados'),
      corpo: linhaTempo,
      class: 'int-card',
    }),
  );

  // ---------- Resumo ----------
  function desenharResumo() {
    const cont = (s) => conectores.filter((c) => c.status === s).length;
    const ativos = conectores.filter((c) => c.status !== 'planejado');
    const registros = ativos.reduce((s, c) => s + (c.registros || 0), 0);
    const item = (valor, rotulo, tone) =>
      h('div', { class: `int-resumo-item${tone ? ` int-tom-${tone}` : ''}` },
        h('strong', { class: 'int-num' }, valor), h('span', {}, rotulo));
    resumo.replaceChildren(
      item(fmt.num(cont('conectado')), 'conectados', 'ok'),
      item(fmt.num(cont('sincronizando')), 'sincronizando'),
      item(fmt.num(cont('erro')), 'com erro', cont('erro') ? 'danger' : null),
      item(fmt.num(cont('planejado')), 'planejados'),
      item(fmt.num(registros), 'registros lidos'),
    );
  }

  // ---------- Diagrama ----------
  function desenharDiagrama() {
    const agentes = (ctx.features || []).filter((f) => !FORA_DO_DIAGRAMA.has(f.id));
    const fontes = h('ul', { class: 'int-dg-lista', 'aria-label': 'Fontes' },
      ...conectores.map((c) => h('li', { class: `int-dg-fonte int-dg-${c.status}` },
        h('span', { class: 'int-dot', 'aria-hidden': 'true' }),
        h('span', {}, c.tipo || nomeCurto(c.nome)),
        h('span', { class: 'int-sr' }, `: ${STATUS[c.status]?.label || c.status}`),
      )));
    const seta = () => h('div', { class: 'int-dg-seta', 'aria-hidden': 'true' }, icon('chevron-right'));
    const centro = h('div', { class: 'int-dg-centro' },
      h('span', { class: 'int-dg-centro-icone', 'aria-hidden': 'true' }, icon('brain')),
      h('strong', {}, 'Cérebro da operação'),
      h('span', { class: 'int-muted int-pequeno' }, 'Busca com fonte, permissões por perfil e registro de uso'),
    );
    const listaAgentes = agentes.length
      ? h('ul', { class: 'int-dg-lista', 'aria-label': 'Agentes por área' },
          ...agentes.map((f) => h('li', {},
            h('a', { class: 'int-dg-agente', href: f.rota || `#${f.id}` },
              h('span', { 'aria-hidden': 'true' }, icon(f.icone)), h('span', {}, f.nome)))))
      : h('p', { class: 'int-muted' }, 'Nenhum agente de área ligado. Ligue módulos no painel admin.');
    diagrama.replaceChildren(
      h('p', { class: 'int-sr' }, `Diagrama: ${conectores.length} fontes alimentam o cérebro da operação, que atende ${agentes.length} agentes por área.`),
      h('div', { class: 'int-diagrama' },
        h('div', { class: 'int-dg-col' }, h('h3', { class: 'int-dg-titulo' }, 'Sistemas que já existem'), fontes),
        seta(),
        h('div', { class: 'int-dg-col int-dg-col-centro' }, centro),
        seta(),
        h('div', { class: 'int-dg-col' }, h('h3', { class: 'int-dg-titulo' }, 'Agentes por área (módulos ligados)'), listaAgentes),
      ),
    );
  }

  // ---------- Conectores ----------
  function cartao(c) {
    const st = STATUS[c.status] || { label: c.status, tone: 'neutral' };
    const ocupado = c._animando;
    const btn = on(h('button', { type: 'button', class: 'int-btn' },
      h('span', { class: `int-btn-icone${ocupado ? ' int-girando' : ''}`, 'aria-hidden': 'true' }, icon('clock')),
      ocupado ? 'Sincronizando…' : 'Sincronizar agora'), 'click', () => sincronizar(c));
    if (c.status === 'planejado' || ocupado) btn.disabled = true;

    const nomeId = `int-nome-${c.id}`;
    return h('article', { class: `int-conector int-st-${c.status}`, 'aria-labelledby': nomeId },
      h('div', { class: 'int-conector-topo' },
        h('span', { class: 'int-conector-icone', 'aria-hidden': 'true' }, icon(iconeDoTipo(c.tipo))),
        h('div', { class: 'int-conector-nome' },
          h('h3', { id: nomeId }, c.nome),
          h('span', { class: 'int-muted int-pequeno' }, c.tipo)),
        h('span', { class: 'int-status', role: 'status' },
          badge(st.label, st.tone),
          c.status === 'planejado' ? h('span', { class: 'int-selo-plan' }, 'Próxima fase') : null),
      ),
      h('dl', { class: 'int-dados' },
        h('div', {}, h('dt', {}, 'Última sincronização'),
          h('dd', {}, c.status === 'planejado' && !c.ultima_sync ? 'Ainda não conectado'
            : h('time', { datetime: c.ultima_sync || '' }, relativo(c.ultima_sync, agora)))),
        h('div', {}, h('dt', {}, 'Registros'), h('dd', { class: 'int-num' }, c.registros ? fmt.num(c.registros) : '—')),
      ),
      c.observacao ? h('p', { class: 'int-obs' }, c.observacao) : null,
      c._msg ? h('p', { class: 'int-muted int-pequeno' }, c._msg) : null,
      h('div', { class: 'int-conector-acoes' }, btn),
    );
  }

  function desenharGrade() {
    grade.replaceChildren(...conectores.map(cartao));
  }

  function sincronizar(c) {
    if (c._animando || c.status === 'planejado') return;
    const antes = c.status;
    c._animando = true;
    c.status = 'sincronizando';
    c._msg = null;
    desenharGrade();
    desenharResumo();
    desenharDiagrama();
    const t = setTimeout(() => {
      timers.delete(t);
      agora += 1;
      const novos = Math.max(3, Math.round((c.registros || 1000) * 0.0004));
      c.registros = (c.registros || 0) + novos;
      c.ultima_sync = isoDe(agora);
      c.status = 'conectado';
      c._animando = false;
      c._msg = antes === 'erro'
        ? `Simulação: reconectado, ${fmt.num(novos)} registros novos lidos.`
        : `Simulação: ${fmt.num(novos)} registros novos lidos.`;
      eventosExtra.push({ quando: agora, conector: c, resultado: 'ok', novos, manual: true });
      desenharGrade();
      desenharResumo();
      desenharDiagrama();
      desenharTempo();
      const alvo = grade.querySelector(`#int-nome-${CSS.escape(c.id)}`)?.closest('article')?.querySelector('button');
      alvo?.focus({ preventScroll: true });
    }, reduzMovimento ? 600 : 2000);
    timers.add(t);
  }

  // ---------- Linha do tempo (derivada dos dados) ----------
  function eventosBase() {
    const lista = [];
    conectores.forEach((c, idx) => {
      const original = (d.integracoes || []).find((i) => i.id === c.id) || c;
      const m = minutos(original.ultima_sync);
      if (m == null || original.status === 'planejado') return;
      const resultado = original.status === 'erro' ? 'erro' : original.status === 'sincronizando' ? 'andamento' : 'ok';
      const novos = Math.max(2, Math.round((original.registros || 500) * 0.0003));
      lista.push({ quando: m, conector: c, resultado, novos });
      // Duas rodadas anteriores (intervalo fixo por conector), para dar ritmo à linha do tempo.
      const intervalo = 30 + (idx % 4) * 15;
      for (let k = 1; k <= 2; k++) {
        lista.push({ quando: m - k * intervalo, conector: c, resultado: 'ok', novos: Math.max(1, Math.round(novos / (k + 1))) });
      }
    });
    return lista;
  }

  function desenharTempo() {
    const todos = eventosBase().concat(eventosExtra).sort((a, b) => b.quando - a.quando).slice(0, 10);
    if (!todos.length) {
      linhaTempo.replaceChildren(h('li', {}, emptyState('Nenhuma sincronização registrada.')));
      return;
    }
    linhaTempo.replaceChildren(...todos.map((e) => {
      const iso = isoDe(e.quando);
      const txt = e.resultado === 'erro'
        ? 'Falhou: conector aguardando credencial ou acesso de rede'
        : e.resultado === 'andamento'
          ? 'Em andamento'
          : `${fmt.num(e.novos)} registros novos${e.manual ? ' (sincronização manual simulada)' : ''}`;
      const tone = e.resultado === 'erro' ? 'danger' : e.resultado === 'andamento' ? 'accent' : 'ok';
      return h('li', { class: `int-evento int-ev-${tone}` },
        h('span', { class: 'int-ev-marca', 'aria-hidden': 'true' }),
        h('time', { class: 'int-ev-hora int-num', datetime: iso }, fmt.datetime(iso)),
        h('div', { class: 'int-ev-corpo' },
          h('strong', {}, nomeCurto(e.conector.nome)),
          h('span', { class: 'int-muted' }, ` · ${txt}`)),
      );
    }));
  }

  desenharResumo();
  desenharDiagrama();
  desenharGrade();
  desenharTempo();

  return () => {
    timers.forEach(clearTimeout);
    timers.clear();
  };
}
