// Tela de senha (UX §4.1). Também serve ao /admin (§4.11) com outro título e rótulo.
// renderEntrar(alvo, {titulo, apoio, rotulo, aviso, nota, entrar(senha) → Promise, onSucesso()})
// Erro 401/404 → "Link ou senha inválidos…"; rede/5xx → mensagem de "tente de novo". Sem alert().
// O erro de senha recusada (401/403) leva a classe auth__error--senha: é o único que a dica esconde.

import { h, icon, spinner } from '../ui.js';

export function renderEntrar(alvo, {
  titulo = 'Esta demonstração é privada.',
  // o padrão diz o que vem depois da senha; o /admin passa apoio: null e não é afetado
  apoio = 'Demonstração da Torno: uma IA que responde perguntas sobre a operação de uma fábrica, com a fonte de cada número. Digite a senha que veio com o link.',
  rotulo = 'Senha',
  aviso = null,
  nota = 'Não tem a senha? Peça a quem te enviou o link.',
  erroInvalido = 'Link ou senha inválidos. Confira a mensagem que você recebeu.',
  entrar,
  onSucesso,
} = {}) {
  const inputId = `senha-${Math.random().toString(36).slice(2, 8)}`;
  const erroId = `${inputId}-erro`;
  const input = h('input', {
    id: inputId, class: 'input', type: 'password', name: 'senha', autocomplete: 'current-password',
    autocapitalize: 'off', spellcheck: 'false', required: true, autofocus: true,
    'aria-describedby': erroId,
  });
  let visivel = false;
  const olho = h('button', {
    type: 'button', class: 'icon-btn', 'aria-label': 'Mostrar senha', title: 'Mostrar senha',
    onClick: () => {
      visivel = !visivel;
      input.type = visivel ? 'text' : 'password';
      olho.setAttribute('aria-label', visivel ? 'Ocultar senha' : 'Mostrar senha');
      olho.title = visivel ? 'Ocultar senha' : 'Mostrar senha';
      olho.replaceChildren(icon(visivel ? 'eye-off' : 'eye', { size: 18 }));
      input.focus();
    },
  }, icon('eye', { size: 18 }));
  const erro = h('p', { id: erroId, class: 'auth__error', role: 'alert', hidden: true });
  const rotuloBtn = h('span', { class: 'btn__label' }, 'Entrar');
  const botao = h('button', { type: 'submit', class: 'btn btn--primary btn--lg btn--block' }, rotuloBtn);

  let enviando = false;
  const form = h('form', {
    class: 'auth__form', novalidate: true,
    onSubmit: async (e) => {
      e.preventDefault();
      if (enviando) return;
      const senha = input.value;
      if (!senha) {
        input.focus();
        return;
      }
      enviando = true;
      erro.hidden = true;
      input.classList.remove('is-invalid');
      input.removeAttribute('aria-invalid');
      botao.disabled = true;
      botao.replaceChildren(spinner({ size: 16 }), h('span', { class: 'btn__label' }, 'Entrando…'));
      try {
        await entrar(senha);
        await onSucesso?.();
      } catch (err) {
        const status = err && typeof err.status === 'number' ? err.status : 0;
        erro.textContent = status === 401 || status === 404 || status === 403
          ? erroInvalido
          : 'Não conseguimos abrir a demonstração agora. Tente de novo em instantes.';
        // só a senha recusada (401/403) some quando a dica de senha aparece (styles.css); rede/5xx fica
        erro.classList.toggle('auth__error--senha', status === 401 || status === 403);
        erro.hidden = false;
        if (status === 401 || status === 404 || status === 403) {
          input.classList.add('is-invalid');
          input.setAttribute('aria-invalid', 'true');
        }
        botao.disabled = false;
        botao.replaceChildren(rotuloBtn);
        input.focus();
        input.select();
      } finally {
        enviando = false;
      }
    },
  },
  h('div', { class: 'field' },
    h('label', { class: 'field__label', for: inputId }, rotulo),
    h('div', { class: 'input-wrap' }, input, olho),
    erro),
  botao);

  const tela = h('main', { class: 'auth' },
    h('div', { class: 'auth__card' },
      h('div', { class: 'auth__brand' }, h('span', { class: 'wordmark' }, 'Torno')),
      h('h1', { class: 'auth__title' }, titulo),
      apoio ? h('p', { class: 'auth__lead' }, apoio) : null,
      aviso ? h('p', { class: 'auth__notice', role: 'status' }, aviso) : null,
      form,
      nota ? h('p', { class: 'auth__note' }, nota) : null),
    h('p', { class: 'auth__foot' }, 'IA e software sob medida para a indústria · tornostudio.com'));

  alvo.replaceChildren(tela);
  requestAnimationFrame(() => input.focus());
  return { el: tela, input };
}
