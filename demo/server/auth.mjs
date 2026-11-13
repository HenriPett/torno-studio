// Senhas (scrypt), tokens assinados (HMAC-SHA256), cookies e checagens de origem (CSRF básico).

import { scrypt as scryptCb, randomBytes, timingSafeEqual, createHmac } from 'node:crypto';
import { promisify } from 'node:util';

const scrypt = promisify(scryptCb);
const SCRYPT = { N: 16384, r: 8, p: 1, maxmem: 64 * 1024 * 1024 };

export async function hashSenha(senha) {
  const salt = randomBytes(16);
  const hash = await scrypt(String(senha).normalize('NFC'), salt, 32, SCRYPT);
  return { salt: salt.toString('base64'), hash: hash.toString('base64') };
}

export async function confereSenha(senha, reg) {
  if (!reg?.salt || !reg?.hash) {
    await scrypt('x', randomBytes(16), 32, SCRYPT); // mesmo custo quando não há registro
    return false;
  }
  const esperado = Buffer.from(reg.hash, 'base64');
  const obtido = await scrypt(String(senha ?? '').normalize('NFC'), Buffer.from(reg.salt, 'base64'), esperado.length, SCRYPT);
  return obtido.length === esperado.length && timingSafeEqual(obtido, esperado);
}

/** Compara dois textos em tempo constante (independe do tamanho, via HMAC). */
export function igualConstante(a, b) {
  const k = randomBytes(32);
  const ha = createHmac('sha256', k).update(String(a ?? '')).digest();
  const hb = createHmac('sha256', k).update(String(b ?? '')).digest();
  return timingSafeEqual(ha, hb);
}

const b64u = (buf) => Buffer.from(buf).toString('base64url');
const hmac = (segredo, txt) => createHmac('sha256', segredo).update(txt).digest();

/** Token `base64url(payload).base64url(assinatura)`; payload ganha `exp` (ms). */
export function assina(payload, segredo, ttlMs) {
  const corpo = b64u(JSON.stringify({ ...payload, exp: Date.now() + ttlMs }));
  return `${corpo}.${b64u(hmac(segredo, corpo))}`;
}

/** → payload ou null (assinatura errada, malformado ou expirado). */
export function confere(token, segredo) {
  if (typeof token !== 'string' || token.length > 400_000) return null;
  const i = token.indexOf('.');
  if (i <= 0 || token.indexOf('.', i + 1) !== -1) return null;
  const corpo = token.slice(0, i);
  let sig;
  try { sig = Buffer.from(token.slice(i + 1), 'base64url'); } catch { return null; }
  const esperado = hmac(segredo, corpo);
  if (sig.length !== esperado.length || !timingSafeEqual(sig, esperado)) return null;
  try {
    const p = JSON.parse(Buffer.from(corpo, 'base64url').toString('utf8'));
    if (!p || typeof p.exp !== 'number' || p.exp < Date.now()) return null;
    return p;
  } catch { return null; }
}

/** Impressão curta de um segredo (para invalidar sessões quando ele muda), sem revelá-lo. */
export function impressao(segredo, valor) {
  return hmac(segredo, `fp:${valor}`).toString('base64url').slice(0, 16);
}

export function leCookies(request) {
  const out = {};
  for (const parte of (request.headers.get('cookie') ?? '').split(';')) {
    const i = parte.indexOf('=');
    if (i < 0) continue;
    const k = parte.slice(0, i).trim();
    if (k && !(k in out)) out[k] = decodeURIComponent(parte.slice(i + 1).trim());
  }
  return out;
}

function ehLocal(request) {
  const u = new URL(request.url);
  return u.protocol === 'http:' && ['localhost', '127.0.0.1', '[::1]'].includes(u.hostname);
}

export function cookie(request, nome, valor, maxAgeSeg) {
  const partes = [`${nome}=${encodeURIComponent(valor)}`, 'Path=/', 'HttpOnly', 'SameSite=Lax', `Max-Age=${maxAgeSeg}`];
  if (!ehLocal(request)) partes.push('Secure');
  return partes.join('; ');
}

export const apagaCookie = (request, nome) => cookie(request, nome, '', 0);

/**
 * CSRF básico para POST/PATCH/DELETE: Origin igual à origem da requisição (ou, sem Origin,
 * Sec-Fetch-Site same-origin) e, com corpo (POST/PATCH), Content-Type application/json.
 * DELETE sem corpo dispensa o Content-Type (um DELETE de outra origem já exige preflight CORS,
 * que esta API nunca autoriza). → mensagem de erro ou null.
 */
export function checaOrigem(request) {
  const m = request.method;
  if (!['POST', 'PATCH', 'DELETE', 'PUT'].includes(m)) return null;
  const origem = request.headers.get('origin');
  const sfs = request.headers.get('sec-fetch-site');
  const propria = new URL(request.url).origin;
  if (origem) {
    if (origem !== propria) return 'Origem não permitida';
  } else if (sfs !== 'same-origin') {
    return 'Origem não informada';
  }
  if (sfs && !['same-origin', 'none'].includes(sfs)) return 'Origem não permitida';
  const ct = (request.headers.get('content-type') ?? '').toLowerCase();
  const temCorpo = m !== 'DELETE' || (request.headers.get('content-length') ?? '0') !== '0';
  if (temCorpo && !ct.startsWith('application/json')) return 'Envie Content-Type: application/json';
  return null;
}

export const espera = (ms) => new Promise((r) => setTimeout(r, ms));
