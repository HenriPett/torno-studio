// ConfigStore: onde a config da demo fica guardada (PLANO §5.1).
//
// interface ConfigStore {
//   kind: "db" | "local"
//   load(): Promise<config>        // sempre devolve uma config normalizada (nunca rejeita)
//   save(config): Promise<config>  // rejeita com Error de mensagem legível
//   subscribe(cb): unsubscribe     // cb(config) quando muda em outro aparelho/aba
//   canEdit(): boolean             // pode abrir o admin e salvar
// }
//
// Dentro do claude.ai (há window.claude.use) usamos DbConfigStore: documento "config/demo" na
// capacidade db, lido por todos e escrito só por quem edita o artifact. Fora dele (servidor local
// de testes) usamos LocalConfigStore com localStorage, e quem abre pode editar.

import { DEFAULT_CONFIG, normalizeConfig } from '../config.js';

const DOC_PATH = 'config/demo';
const LOCAL_KEY = 'torno-demo:config';
const TIMEOUT_MS = 10000;

function withTimeout(promise, ms, fallback) {
  let t;
  return Promise.race([
    Promise.resolve(promise).finally(() => clearTimeout(t)),
    new Promise((resolve) => {
      t = setTimeout(() => resolve(fallback), ms);
    }),
  ]);
}

function toPlain(config) {
  const c = normalizeConfig(config);
  c.atualizado_em = new Date().toISOString();
  return JSON.parse(JSON.stringify(c));
}

export class LocalConfigStore {
  constructor() {
    this.kind = 'local';
  }

  async load() {
    try {
      const raw = localStorage.getItem(LOCAL_KEY);
      return normalizeConfig(raw ? JSON.parse(raw) : DEFAULT_CONFIG);
    } catch {
      return normalizeConfig(DEFAULT_CONFIG);
    }
  }

  async save(config) {
    const plain = toPlain(config);
    try {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(plain));
    } catch {
      throw new Error('Este navegador não deixou guardar a configuração (armazenamento bloqueado ou aba privada).');
    }
    return normalizeConfig(plain);
  }

  subscribe(cb) {
    const onStorage = (e) => {
      if (e.key !== LOCAL_KEY) return;
      try {
        cb(normalizeConfig(e.newValue ? JSON.parse(e.newValue) : DEFAULT_CONFIG));
      } catch {
        /* valor ilegível: ignora */
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }

  canEdit() {
    return true;
  }
}

export class DbConfigStore {
  constructor({ db, user, canEdit }) {
    this.kind = 'db';
    this.db = db;
    this.user = user;
    this._canEdit = !!canEdit;
    this.ref = db ? db.doc(DOC_PATH) : null;
  }

  async load() {
    if (!this.ref) return normalizeConfig(DEFAULT_CONFIG);
    try {
      const snap = await withTimeout(this.ref.get(), TIMEOUT_MS, null);
      if (!snap) {
        console.warn('[config] o banco não respondeu em 10 s; usando a configuração padrão.');
        return normalizeConfig(DEFAULT_CONFIG);
      }
      return normalizeConfig(snap.exists ? snap.data() : DEFAULT_CONFIG);
    } catch (err) {
      console.warn('[config] falha ao ler config/demo; usando a configuração padrão.', err);
      return normalizeConfig(DEFAULT_CONFIG);
    }
  }

  async save(config) {
    if (!this.ref) {
      throw new Error('O armazenamento compartilhado não está disponível nesta visualização. Abra a demo pelo link do claude.ai e tente de novo.');
    }
    const plain = toPlain(config);
    try {
      await this.ref.set(plain);
    } catch (err) {
      const code = err && err.code;
      if (code === 'invalid_argument') {
        throw new Error('Sem permissão para salvar. Só quem edita esta demo pode mudar a configuração.');
      }
      if (code === 'quota_exceeded' || code === 'resource_exhausted') {
        throw new Error('O armazenamento da demo atingiu o limite. Exclua perfis que não usa e tente de novo.');
      }
      throw new Error('Não foi possível salvar agora (sem conexão com o armazenamento). Tente de novo em instantes.');
    }
    return normalizeConfig(plain);
  }

  subscribe(cb) {
    if (!this.ref) return () => {};
    let first = true;
    try {
      return this.ref.onSnapshot(
        (snap) => {
          // o primeiro snapshot repete o que load() já leu; o app compara antes de re-renderizar
          if (first) first = false;
          cb(normalizeConfig(snap.exists ? snap.data() : DEFAULT_CONFIG));
        },
        (err) => console.warn('[config] a escuta de mudanças parou.', err),
      );
    } catch (err) {
      console.warn('[config] não foi possível escutar mudanças.', err);
      return () => {};
    }
  }

  canEdit() {
    return this._canEdit;
  }
}

/** Escolhe o store certo para onde a página está rodando. */
export async function createConfigStore() {
  const claude = typeof window !== 'undefined' ? window.claude : undefined;
  if (!claude || typeof claude.use !== 'function') return new LocalConfigStore();

  const safeUse = (name) =>
    withTimeout(
      Promise.resolve()
        .then(() => claude.use(name))
        .catch((err) => {
          console.warn(`[config] capacidade ${name} indisponível`, err);
          return null;
        }),
      TIMEOUT_MS,
      null,
    );

  const [db, user] = await Promise.all([safeUse('db'), safeUse('user')]);
  if (!db) console.warn('[config] capacidade db indisponível; a demo usa a configuração padrão (só leitura).');
  let canEdit = false;
  try {
    canEdit = user ? !!(await withTimeout(user.canEdit(), TIMEOUT_MS, false)) : false;
  } catch {
    canEdit = false;
  }
  return new DbConfigStore({ db, user, canEdit });
}
