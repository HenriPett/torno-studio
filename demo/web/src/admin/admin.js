// Painel /admin (UX §4.11): login, lista de demos, novo link em 1 passo com presets, link + senha
// com copiar e "mensagem pronta", detalhe com edição, nova senha, desativar, zerar aprendizado,
// apagar (confirmação inline) e o que o prospect registrou. Pacote A.
//
// render(root, {api, ui, fmt, themeToggle})

import { renderEntrar } from '../screens/entrar.js';

const PRESETS = [
  { id: 'completa', nome: 'Completa', desligados: [] },
  { id: 'comercial-pcp', nome: 'Comercial e PCP', desligados: ['qualidade', 'manutencao', 'operadores'] },
  { id: 'qualidade-manutencao', nome: 'Qualidade e manutenção', desligados: ['comercial', 'portal', 'marketing'] },
  { id: 'personalizar', nome: 'Personalizar', desligados: null },
];

const EXPIRA = [
  { value: '7', label: 'Em 7 dias' },
  { value: '30', label: 'Em 30 dias' },
  { value: '90', label: 'Em 90 dias' },
  { value: '', label: 'Sem prazo' },
];

const AREA_NOME = { producao: 'Produção', qualidade: 'Qualidade', manutencao: 'Manutenção', comercial: 'Comercial', marketing: 'Marketing', operadores: 'Chão de fábrica', gestao: 'Diretoria' };
const TIPO_NOME = { saber: 'Saber de fábrica', ocorrencia: 'Ocorrência', documento: 'Regra ou procedimento', nota: 'Nota' };

export function render(root, { api, ui, fmt, themeToggle }) {
  const { h, icon, toast } = ui;
  let opcoes = null;
  let ia = null;
  let demos = [];
  let busca = '';
  let aberto = null; // id da demo expandida
  const registrosCache = new Map();

  // ---------------------------------------------------------------- helpers
  const urlAbs = (d) => `${location.origin}${d.url || `/demo/${d.id}`}`;
  const setorNome = (id) => opcoes?.setores?.find((s) => s.id === id)?.nome || id;
  const setorEmpresa = (id) => opcoes?.setores?.find((s) => s.id === id)?.empresa || '';
  const modNome = (id) => opcoes?.modulos?.find((m) => m.id === id)?.nome || id;
  const primeiroNome = (nome) => String(nome || '').trim().split(/[\s,—–-]+/)[0] || '';
  const minusc = (s) => (s ? s.charAt(0).toLowerCase() + s.slice(1) : s);

  function mensagemPronta(d, senha) {
    const nome = primeiroNome(d.nome);
    return `Olá${nome ? `, ${nome}` : ''}! Segue a demonstração que preparei para vocês:\n${urlAbs(d)}\nSenha: ${senha}\n`
      + `É uma fábrica fictícia de ${minusc(setorNome(d.setor))}: dá para perguntar, conferir a fonte e ensinar algo ao sistema.`;
  }

  async function copiar(texto, btn) {
    const ok = await ui.copyText(texto);
    toast(ok ? 'Copiado.' : 'Não deu para copiar. Selecione o texto e copie.');
    if (ok && btn) {
      const antes = [...btn.childNodes];
      btn.replaceChildren(icon('check', { size: 16 }), h('span', { class: 'btn__label' }, 'Copiado'));
      setTimeout(() => { if (btn.isConnected) btn.replaceChildren(...antes); }, 1500);
    }
  }

  function quando(iso) {
    const t = Date.parse(iso || '');
    if (!Number.isFinite(t)) return '—';
    const min = Math.round((Date.now() - t) / 60000);
    if (min < 2) return 'agora';
    if (min < 60) return `há ${min} min`;
    const hrs = Math.round(min / 60);
    if (hrs < 24) return `há ${hrs} h`;
    const dias = Math.round(hrs / 24);
    return dias === 1 ? 'ontem' : `há ${dias} dias`;
  }
  const dataCurta = (iso) => {
    const t = Date.parse(iso || '');
    if (!Number.isFinite(t)) return '—';
    return new Date(t).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  function status(d) {
    if (d.ativo === false) return { label: 'Desativado', tone: 'neutral' };
    if (d.expira_em && Date.parse(d.expira_em) < Date.now()) return { label: 'Expirado', tone: 'warn' };
    return { label: 'Ativo', tone: 'ok' };
  }
  const statusBadge = (d) => {
    const s = status(d);
    return h('span', { class: `badge badge--${s.tone}` }, h('span', { class: 'badge__dot', 'aria-hidden': 'true' }), s.label);
  };

  function expiraParaData(dias) {
    if (!dias) return null;
    const t = new Date(Date.now() + Number(dias) * 86400000);
    return t.toISOString().slice(0, 10);
  }
  function diasRestantes(iso) {
    if (!iso) return '';
    const dias = Math.round((Date.parse(iso) - Date.now()) / 86400000);
    if (dias <= 7) return '7';
    if (dias <= 30) return '30';
    return '90';
  }

  function erroLinha() {
    const p = h('p', { class: 'adm-error', role: 'alert', hidden: true });
    p.mostra = (msg) => { p.textContent = msg; p.hidden = !msg; };
    return p;
  }

  function trataErro(err, linha) {
    if (err && err.status === 401) {
      telaLogin('Sua sessão de admin expirou. Entre de novo.');
      return;
    }
    linha?.mostra(err?.mensagem || 'Algo deu errado. Tente de novo.');
  }

  // ---------------------------------------------------------------- login
  function telaLogin(aviso = null) {
    document.title = 'Torno · Painel da demo';
    renderEntrar(root, {
      titulo: 'Painel da demo',
      apoio: null,
      rotulo: 'Senha de administrador',
      aviso,
      nota: null,
      erroInvalido: 'Senha inválida.',
      entrar: (senha) => api.admin.entrar(senha),
      onSucesso: (r) => iniciar(r),
    });
  }

  async function iniciar() {
    try {
      const s = await api.admin.sessao();
      ia = s.ia || { disponivel: false };
      opcoes = await api.admin.opcoes();
      demos = await api.admin.listar();
    } catch (err) {
      if (err && err.status === 401) { telaLogin(); return; }
      root.replaceChildren(h('main', { class: 'auth' }, h('div', { class: 'auth__card' },
        h('div', { class: 'auth__brand' }, h('span', { class: 'wordmark' }, 'Torno')),
        h('h1', { class: 'auth__title' }, 'Painel indisponível'),
        h('p', { class: 'auth__lead', role: 'alert' }, err?.mensagem || 'Não conseguimos falar com o servidor.'),
        ui.button('Tentar de novo', { variant: 'primary', icone: 'refresh', onClick: () => iniciar() }))));
      return;
    }
    montarPainel();
  }

  // ---------------------------------------------------------------- painel
  const el = {};

  function montarPainel() {
    document.title = 'Torno · Demos';
    const sair = ui.button('Sair', {
      variant: 'ghost', icone: 'log-out',
      onClick: async () => {
        try { await api.admin.sair(); } catch { /* sai mesmo assim */ }
        telaLogin();
      },
    });
    const banner = ia?.disponivel
      ? h('div', { class: 'adm-banner adm-banner--ok', role: 'status' }, icon('check-circle', { size: 18 }),
        h('span', null, `IA real ligada · ${ia.modelo || 'modelo padrão'}`))
      : h('div', { class: 'adm-banner adm-banner--warn', role: 'status' }, icon('alert', { size: 18 }),
        h('span', null, 'Sem ANTHROPIC_API_KEY: as demos respondem pelo roteiro local.'));

    el.form = h('div', { class: 'adm-new-wrap' });
    el.lista = h('div', { class: 'adm-list' });
    el.novoBtn = ui.button('Novo link', { variant: 'primary', icone: 'plus', onClick: () => abrirNovo() });
    const buscaEl = ui.searchInput({
      placeholder: 'Buscar prospect', label: 'Buscar prospect',
      onInput: (v) => { busca = v; desenharLista(); },
    });

    root.replaceChildren(h('div', { class: 'adm' },
      h('header', { class: 'adm-top' },
        h('div', { class: 'adm-top__brand' }, h('span', { class: 'wordmark' }, 'Torno'), h('span', { class: 'adm-top__sep' }, '·'), h('span', null, 'Demos')),
        h('div', { class: 'adm-top__actions' }, themeToggle ? themeToggle() : null, sair)),
      h('main', { class: 'adm-main' },
        banner,
        h('div', { class: 'adm-toolbar' }, el.novoBtn, h('div', { class: 'adm-toolbar__search' }, buscaEl)),
        el.form,
        el.lista)));
    desenharLista();
  }

  async function recarregar() {
    try {
      demos = await api.admin.listar();
    } catch (err) {
      trataErro(err);
      return;
    }
    desenharLista();
  }

  // ---------------------------------------------------------------- módulos (presets / personalizar)
  function editorModulos(inicial) {
    const mods = opcoes?.modulos || [];
    let valores = Object.fromEntries(mods.map((m) => [m.id, m.sempreLigado ? true : inicial ? inicial[m.id] !== false : true]));
    const presetDe = (v) => {
      for (const p of PRESETS) {
        if (!p.desligados) continue;
        if (mods.every((m) => m.sempreLigado || v[m.id] === !p.desligados.includes(m.id))) return p.id;
      }
      return 'personalizar';
    };
    const caixas = h('div', { class: 'adm-mods', hidden: true });
    const nota = h('p', { class: 'field__hint adm-mods__note' }, 'Portal do cliente depende de Comercial.');
    function aplicaDeps() {
      let mudou = true;
      while (mudou) {
        mudou = false;
        for (const m of mods) {
          if (valores[m.id] && !m.sempreLigado && (m.depende || []).some((d) => !valores[d])) { valores[m.id] = false; mudou = true; }
        }
      }
    }
    function desenharCaixas() {
      caixas.replaceChildren(...mods.map((m) => {
        const bloqueadoDep = (m.depende || []).some((d) => !valores[d]);
        const cb = h('input', {
          type: 'checkbox', checked: !!valores[m.id], disabled: !!m.sempreLigado || bloqueadoDep,
          onChange: (e) => { valores[m.id] = e.target.checked; aplicaDeps(); desenharCaixas(); },
        });
        return h('label', { class: 'check' }, cb, h('span', null, modNome(m.id),
          m.sempreLigado ? h('span', { class: 'field__hint' }, ' · sempre ligado') : null,
          bloqueadoDep ? h('span', { class: 'field__hint' }, ` · depende de ${(m.depende || []).map(modNome).join(', ')}`) : null));
      }), nota);
    }
    const seg = ui.segmented({
      label: 'O que mostrar',
      opcoes: PRESETS.map((p) => ({ value: p.id, label: p.nome })),
      value: presetDe(valores),
      onChange: (id) => {
        const p = PRESETS.find((x) => x.id === id);
        if (p.desligados) valores = Object.fromEntries(mods.map((m) => [m.id, m.sempreLigado || !p.desligados.includes(m.id)]));
        caixas.hidden = id !== 'personalizar';
        desenharCaixas();
      },
    });
    caixas.hidden = seg.value !== 'personalizar';
    desenharCaixas();
    const wrap = h('div', { class: 'field' }, h('span', { class: 'field__label' }, 'O que mostrar'), seg, caixas);
    wrap.valor = () => ({ ...valores });
    return wrap;
  }

  function campo(label, controle, { hint, obrigatorio } = {}) {
    // o rótulo aponta para o campo de verdade (o select fica dentro de um span .select-wrap)
    const alvo = controle.matches?.('input, select, textarea') ? controle : controle.querySelector?.('input, select, textarea') || controle;
    const id = alvo.id || `adm-${Math.random().toString(36).slice(2, 8)}`;
    alvo.id = id;
    return h('div', { class: 'field' },
      h('label', { class: 'field__label', for: id }, label, obrigatorio ? h('span', { 'aria-hidden': 'true' }, ' *') : null),
      controle,
      hint ? h('span', { class: 'field__hint' }, hint) : null);
  }

  function selectSetor(valor, onChange) {
    const sel = h('select', { class: 'select', onChange: (e) => onChange?.(e.target.value) },
      (opcoes?.setores || []).map((s) => h('option', { value: s.id, selected: s.id === valor }, `${s.nome} · ${s.empresa}`)));
    sel.value = valor;
    return sel;
  }
  const wrapSelect = (sel) => h('span', { class: 'select-wrap' }, sel, icon('chevron-down', { size: 16, class: 'select-wrap__chev' }));

  function selectExpira(valor) {
    const sel = h('select', { class: 'select' }, EXPIRA.map((o) => h('option', { value: o.value, selected: o.value === valor }, o.label)));
    sel.value = valor;
    return sel;
  }

  // ---------------------------------------------------------------- novo link
  function abrirNovo() {
    el.novoBtn.disabled = true;
    const setorInicial = opcoes?.setores?.[0]?.id || 'textil';
    const nome = h('input', { class: 'input', type: 'text', maxlength: '120', required: true, placeholder: 'João Melo — Têxtil Brusque', autocomplete: 'off' });
    const empresa = h('input', { class: 'input', type: 'text', maxlength: '120', placeholder: setorEmpresa(setorInicial), autocomplete: 'off' });
    const setor = selectSetor(setorInicial, (v) => { empresa.placeholder = setorEmpresa(v); });
    const mods = editorModulos(null);
    let modoSenha = 'gerar';
    const senha = h('input', { class: 'input', type: 'text', minlength: '6', maxlength: '128', placeholder: 'Mínimo 6 caracteres', autocomplete: 'off', hidden: true });
    const senhaSeg = ui.segmented({
      label: 'Senha', size: 'sm',
      opcoes: [{ value: 'gerar', label: 'Gerar' }, { value: 'digitar', label: 'Digitar' }],
      value: 'gerar',
      onChange: (v) => { modoSenha = v; senha.hidden = v !== 'digitar'; if (v === 'digitar') senha.focus(); },
    });
    const expira = selectExpira('30');
    const nota = h('input', { class: 'input', type: 'text', maxlength: '2000', placeholder: 'Reunião 18/11, diretor industrial', autocomplete: 'off' });
    const erro = erroLinha();
    const criar = ui.button('Criar link', { variant: 'primary', type: 'submit' });

    const fechar = () => { el.form.replaceChildren(); el.novoBtn.disabled = false; el.novoBtn.focus(); };

    const form = h('form', {
      class: 'adm-panel', 'aria-labelledby': 'adm-novo-t',
      onSubmit: async (e) => {
        e.preventDefault();
        erro.mostra('');
        if (!nome.value.trim()) { erro.mostra('Informe o prospect.'); nome.focus(); return; }
        if (modoSenha === 'digitar' && senha.value.length < 6) { erro.mostra('A senha deve ter pelo menos 6 caracteres.'); senha.focus(); return; }
        criar.disabled = true;
        criar.replaceChildren(ui.spinner({ size: 16 }), h('span', { class: 'btn__label' }, 'Criando…'));
        try {
          const corpo = {
            nome: nome.value.trim(), setor: setor.value, modulos: mods.valor(),
            expira_em: expiraParaData(expira.value),
          };
          if (empresa.value.trim()) corpo.empresa_nome = empresa.value.trim();
          if (nota.value.trim()) corpo.nota = nota.value.trim();
          if (modoSenha === 'digitar') corpo.senha = senha.value;
          const r = await api.admin.criar(corpo);
          demos = [{ ...r.demo, aprendizado_qtd: 0 }, ...demos.filter((d) => d.id !== r.demo.id)];
          desenharLista();
          mostrarResultado(r.demo, r.senha, `Link criado para ${r.demo.nome}`);
          recarregar();
        } catch (err) {
          trataErro(err, erro);
          criar.disabled = false;
          criar.replaceChildren(h('span', { class: 'btn__label' }, 'Criar link'));
        }
      },
    },
    h('h2', { class: 'adm-panel__title', id: 'adm-novo-t' }, 'Novo link'),
    erro,
    h('div', { class: 'adm-grid' },
      campo('Prospect', nome, { obrigatorio: true }),
      campo('Setor', wrapSelect(setor), { obrigatorio: true })),
    campo('Nome da empresa na demo (opcional)', empresa),
    mods,
    h('div', { class: 'adm-grid' },
      h('div', { class: 'field' }, h('span', { class: 'field__label' }, 'Senha'), senhaSeg, senha),
      campo('Expira', wrapSelect(expira))),
    campo('Nota interna (opcional)', nota),
    h('div', { class: 'adm-actions' }, criar, ui.button('Cancelar', { variant: 'ghost', onClick: fechar })));
    el.form.replaceChildren(form);
    nome.focus();
  }

  function caixaSenha(d, senha, titulo, { onFechar } = {}) {
    const url = urlAbs(d);
    const btnLink = ui.button('Copiar link', { icone: 'link', size: 'sm', onClick: () => copiar(url, btnLink) });
    const btnSenha = ui.button('Copiar senha', { icone: 'key', size: 'sm', onClick: () => copiar(senha, btnSenha) });
    const btnMsg = ui.button('Copiar mensagem pronta', { variant: 'primary', icone: 'copy', onClick: () => copiar(mensagemPronta(d, senha), btnMsg) });
    return h('div', { class: 'adm-result', role: 'status' },
      h('h2', { class: 'adm-panel__title' }, titulo),
      h('div', { class: 'adm-result__row' }, h('code', { class: 'adm-code' }, url), btnLink),
      h('div', { class: 'adm-result__row' }, h('span', null, 'Senha: ', h('code', { class: 'adm-code' }, senha)), btnSenha),
      h('div', { class: 'adm-actions' },
        btnMsg,
        h('a', { class: 'btn btn--secondary', href: d.url || `/demo/${d.id}`, target: '_blank', rel: 'noopener' }, h('span', { class: 'btn__label' }, 'Abrir a demo ›')),
        onFechar ? ui.button('Fechar', { variant: 'ghost', onClick: onFechar }) : null),
      h('p', { class: 'adm-warn' }, 'A senha só aparece agora. Se perder, gere outra.'));
  }

  function mostrarResultado(d, senha, titulo) {
    const fechar = () => { el.form.replaceChildren(); el.novoBtn.disabled = false; el.novoBtn.focus(); };
    const box = h('div', { class: 'adm-panel' }, caixaSenha(d, senha, titulo, { onFechar: fechar }));
    el.form.replaceChildren(box);
    box.querySelector('.btn--primary')?.focus();
  }

  // ---------------------------------------------------------------- lista
  function ordenadas() {
    const q = busca.trim().toLowerCase();
    return demos
      .filter((d) => !q || `${d.nome} ${d.empresa_nome} ${setorNome(d.setor)} ${d.nota || ''}`.toLowerCase().includes(q))
      .sort((a, b) => String(b.ultimo_acesso || b.criado_em || '').localeCompare(String(a.ultimo_acesso || a.criado_em || '')));
  }

  function desenharLista() {
    if (!el.lista) return;
    if (!demos.length) {
      el.lista.replaceChildren(h('div', { class: 'adm-empty' },
        icon('link', { size: 28 }),
        h('p', null, 'Nenhuma demo ainda. Crie o primeiro link para mandar a um prospect.'),
        ui.button('Novo link', { icone: 'plus', onClick: () => abrirNovo() })));
      return;
    }
    const lista = ordenadas();
    const head = h('div', { class: 'adm-row adm-row--head', 'aria-hidden': 'true' },
      h('span', null, 'Prospect'), h('span', null, 'Setor'), h('span', null, 'Status'),
      h('span', { class: 'num' }, 'Acessos'), h('span', null, 'Último acesso'), h('span', { class: 'num' }, 'Registros'), h('span'));
    el.lista.replaceChildren(head, lista.length
      ? h('ul', { class: 'adm-items' }, lista.map(linha))
      : h('p', { class: 'adm-empty muted' }, `Nada encontrado para “${busca}”.`));
  }

  function linha(d) {
    const exp = aberto === d.id;
    const detId = `adm-det-${d.id}`;
    const btn = h('button', {
      type: 'button', class: 'adm-row', 'aria-expanded': exp ? 'true' : 'false', 'aria-controls': detId,
      onClick: () => { aberto = exp ? null : d.id; desenharLista(); el.lista.querySelector(`[aria-controls="${detId}"]`)?.focus(); },
    },
    h('span', { class: 'adm-row__name' },
      h('strong', null, d.nome),
      d.empresa_nome ? h('span', { class: 'muted' }, ` · ${d.empresa_nome}`) : null),
    h('span', { class: 'adm-row__setor' }, setorNome(d.setor)),
    h('span', { class: 'adm-row__status' }, statusBadge(d)),
    h('span', { class: 'num adm-row__acessos' }, h('span', { class: 'adm-row__lbl' }, 'Acessos: '), String(d.acessos || 0)),
    h('span', { class: 'adm-row__ultimo' }, h('span', { class: 'adm-row__lbl' }, 'Último acesso: '), d.ultimo_acesso ? quando(d.ultimo_acesso) : 'nunca'),
    h('span', { class: 'num adm-row__regs' }, h('span', { class: 'adm-row__lbl' }, 'Registros: '), String(d.aprendizado_qtd || 0)),
    h('span', { class: 'adm-row__meta-m' },
      `${setorNome(d.setor)} · ${d.acessos || 0} ${d.acessos === 1 ? 'acesso' : 'acessos'} · ${d.ultimo_acesso ? quando(d.ultimo_acesso) : 'nunca acessada'}${d.aprendizado_qtd ? ` · ${d.aprendizado_qtd} reg.` : ''}`),
    h('span', { class: 'adm-row__chev', 'aria-hidden': 'true' }, icon(exp ? 'chevron-down' : 'chevron-right', { size: 18 })));
    return h('li', { class: ['adm-item', exp && 'is-open'] }, btn, exp ? detalhe(d, detId) : null);
  }

  // ---------------------------------------------------------------- detalhe
  function detalhe(d, detId) {
    const box = h('div', { class: 'adm-detail', id: detId });
    const erro = erroLinha();
    const url = urlAbs(d);
    const btnLink = ui.button('Copiar link', { icone: 'link', size: 'sm', onClick: () => copiar(url, btnLink) });
    const senhaSlot = h('div');
    const regsSlot = h('div', { class: 'adm-regs' });
    const editSlot = h('div');

    const atualiza = async (patch, okMsg) => {
      erro.mostra('');
      try {
        const r = await api.admin.atualizar(d.id, patch);
        const novo = { ...d, ...r.demo };
        demos = demos.map((x) => (x.id === d.id ? novo : x));
        if (okMsg) toast(okMsg);
        return { r, novo };
      } catch (err) {
        trataErro(err, erro);
        throw err;
      }
    };

    const fatos = h('dl', { class: 'facts' },
      h('div', { class: 'facts__row' }, h('dt', null, 'Criado em'), h('dd', null, dataCurta(d.criado_em))),
      h('div', { class: 'facts__row' }, h('dt', null, 'Expira em'), h('dd', null, d.expira_em ? dataCurta(d.expira_em) : 'Sem prazo')),
      h('div', { class: 'facts__row' }, h('dt', null, 'Setor'), h('dd', null, `${setorNome(d.setor)} · ${d.empresa_nome || setorEmpresa(d.setor)}`)),
      h('div', { class: 'facts__row' }, h('dt', null, 'Nota'), h('dd', null, d.nota || '—')));

    const pills = h('div', { class: 'tag-row' }, (opcoes?.modulos || []).filter((m) => (d.modulos || {})[m.id] !== false)
      .map((m) => h('span', { class: 'badge badge--neutral' }, modNome(m.id))));

    const editar = ui.button('Editar', {
      icone: 'pencil', size: 'sm',
      onClick: () => {
        editar.hidden = true;
        editSlot.replaceChildren(formEdicao(d, {
          onCancel: () => { editSlot.replaceChildren(); editar.hidden = false; editar.focus(); },
          onSave: async (patch) => { await atualiza(patch, 'Demo atualizada.'); desenharLista(); },
        }));
      },
    });

    const novaSenha = ui.button('Nova senha', {
      icone: 'key', size: 'sm',
      onClick: async () => {
        novaSenha.disabled = true;
        try {
          const { r, novo } = await atualiza({ nova_senha: true });
          senhaSlot.replaceChildren(h('div', { class: 'adm-panel adm-panel--inline' }, caixaSenha(novo, r.senha, 'Nova senha gerada', {
            onFechar: () => senhaSlot.replaceChildren(),
          })));
        } catch { /* erro já mostrado */ }
        novaSenha.disabled = false;
      },
    });

    const ativo = d.ativo !== false;
    const toggleAtivo = ui.button(ativo ? 'Desativar' : 'Ativar', {
      icone: 'power', size: 'sm',
      onClick: async () => {
        toggleAtivo.disabled = true;
        try {
          await atualiza({ ativo: !ativo }, ativo ? 'Demo desativada.' : 'Demo ativada.');
          desenharLista();
        } catch { toggleAtivo.disabled = false; }
      },
    });

    const n = d.aprendizado_qtd || 0;
    const zerar = ui.confirmInline({
      label: 'Zerar aprendizado', icone: 'undo',
      pergunta: `Zerar os ${n} registros?`, confirmar: 'Zerar',
      onConfirm: async () => {
        try {
          await api.admin.zerarAprendizado(d.id);
          registrosCache.delete(d.id);
          demos = demos.map((x) => (x.id === d.id ? { ...x, aprendizado_qtd: 0 } : x));
          toast('Aprendizado zerado.');
          desenharLista();
        } catch (err) { trataErro(err, erro); throw err; }
      },
    });
    const apagar = ui.confirmInline({
      label: 'Apagar', icone: 'trash', variant: 'danger',
      pergunta: 'Apagar a demo e tudo dela?', confirmar: 'Apagar de vez',
      onConfirm: async () => {
        try {
          await api.admin.apagar(d.id);
          demos = demos.filter((x) => x.id !== d.id);
          aberto = null;
          toast('Demo apagada.');
          desenharLista();
        } catch (err) { trataErro(err, erro); throw err; }
      },
    });

    box.append(
      erro,
      h('div', { class: 'adm-result__row' }, h('code', { class: 'adm-code' }, url), btnLink,
        h('a', { class: 'btn btn--ghost btn--sm', href: d.url || `/demo/${d.id}`, target: '_blank', rel: 'noopener' }, h('span', { class: 'btn__label' }, 'Abrir ›'))),
      fatos,
      h('div', { class: 'adm-sub' }, h('h3', { class: 'adm-sub__title' }, 'Módulos'), pills, h('div', null, editar)),
      editSlot,
      h('div', { class: 'adm-sub' }, h('h3', { class: 'adm-sub__title' }, 'Registros do prospect'), regsSlot),
      senhaSlot,
      h('div', { class: 'adm-actions adm-actions--wrap' }, novaSenha, toggleAtivo, n ? zerar : null, apagar));

    carregarRegistros(d, regsSlot, erro);
    return box;
  }

  async function carregarRegistros(d, slot, erro) {
    if (registrosCache.has(d.id)) { desenharRegistros(d, slot, registrosCache.get(d.id)); return; }
    slot.replaceChildren(ui.skeleton({ linhas: 2 }));
    try {
      const itens = await api.admin.aprendizado(d.id);
      registrosCache.set(d.id, itens || []);
      if (slot.isConnected) desenharRegistros(d, slot, itens || []);
    } catch (err) {
      slot.replaceChildren();
      trataErro(err, erro);
    }
  }

  function desenharRegistros(d, slot, itens) {
    if (!itens.length) { slot.replaceChildren(h('p', { class: 'muted' }, 'Nenhum registro ainda.')); return; }
    const ord = [...itens].sort((a, b) => String(b.criado_em).localeCompare(String(a.criado_em)));
    slot.replaceChildren(h('ul', { class: 'adm-regs__list' }, ord.map((it) => h('li', { class: 'adm-reg' },
      h('div', { class: 'adm-reg__meta' },
        h('span', null, TIPO_NOME[it.tipo] || it.tipo),
        it.area ? h('span', null, ` · ${AREA_NOME[it.area] || it.area}`) : null,
        it.maquina ? h('span', null, ` · ${it.maquina}`) : null,
        h('span', null, ` · ${it.autor || 'Você'} · ${quando(it.criado_em)}`),
        it.origem === 'conversa' ? h('span', null, ' · pela conversa') : null),
      it.titulo && it.titulo !== it.texto ? h('strong', null, it.titulo) : null,
      h('p', null, it.texto)))));
  }

  function formEdicao(d, { onCancel, onSave }) {
    const nome = h('input', { class: 'input', type: 'text', maxlength: '120', value: d.nome });
    const empresa = h('input', { class: 'input', type: 'text', maxlength: '120', value: d.empresa_nome || '', placeholder: setorEmpresa(d.setor) });
    const setor = selectSetor(d.setor, (v) => { empresa.placeholder = setorEmpresa(v); });
    const mods = editorModulos(d.modulos);
    const expira = selectExpira(d.expira_em ? diasRestantes(d.expira_em) : '');
    const expiraOriginal = expira.value;
    const nota = h('textarea', { class: 'textarea', rows: '2', maxlength: '2000' });
    nota.value = d.nota || '';
    const erro = erroLinha();
    const salvar = ui.button('Salvar', { variant: 'primary', type: 'submit' });
    return h('form', {
      class: 'adm-panel adm-panel--inline',
      onSubmit: async (e) => {
        e.preventDefault();
        if (!nome.value.trim()) { erro.mostra('Informe o prospect.'); return; }
        const patch = { nome: nome.value.trim(), setor: setor.value, empresa_nome: empresa.value.trim(), modulos: mods.valor(), nota: nota.value.trim() };
        if (expira.value !== expiraOriginal) patch.expira_em = expiraParaData(expira.value);
        salvar.disabled = true;
        try { await onSave(patch); } catch (err) { erro.mostra(err?.mensagem || 'Não deu para salvar.'); salvar.disabled = false; }
      },
    },
    erro,
    h('div', { class: 'adm-grid' }, campo('Prospect', nome, { obrigatorio: true }), campo('Setor', wrapSelect(setor))),
    campo('Nome da empresa na demo', empresa),
    mods,
    h('div', { class: 'adm-grid' }, campo('Expira', wrapSelect(expira), { hint: 'Mude só se quiser um novo prazo a partir de hoje.' }), campo('Nota interna', nota)),
    h('div', { class: 'adm-actions' }, salvar, ui.button('Cancelar', { variant: 'ghost', onClick: onCancel })));
  }

  // ---------------------------------------------------------------- boot
  root.replaceChildren(h('div', { class: 'boot' }, h('div', { class: 'loadbar', 'aria-hidden': 'true' }), h('span', { class: 'boot__mark' }, 'Torno')));
  (async () => {
    try {
      await api.admin.sessao();
      iniciar();
    } catch (err) {
      if (err && err.status === 401) telaLogin();
      else if (err && err.status === 503) {
        root.replaceChildren(h('main', { class: 'auth' }, h('div', { class: 'auth__card' },
          h('div', { class: 'auth__brand' }, h('span', { class: 'wordmark' }, 'Torno')),
          h('h1', { class: 'auth__title' }, 'Painel fechado'),
          h('p', { class: 'auth__lead', role: 'alert' }, err.mensagem))));
      } else telaLogin();
    }
  })();
}
