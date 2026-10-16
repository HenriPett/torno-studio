#!/usr/bin/env node
/**
 * Lê o contador da /diagnostico/ (docs/infra/CONTADOR-DIAGNOSTICO.md) pela Netlify CLI logada
 * (`npx netlify login` + `npx netlify link`). Sem endpoint público. Imprime a tabela por dia e o total.
 * CLI: https://cli.netlify.com/commands/blobs/ (blobs:list --json, blobs:get <store> <key>).
 */
import { execFileSync } from 'node:child_process';

const STORE = 'visitas-diagnostico';

const netlify = (...args) =>
  execFileSync('npx', ['--yes', 'netlify-cli@27.8.1', ...args], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'] });

let keys;
try {
  const listed = JSON.parse(netlify('blobs:list', STORE, '--json'));
  keys = (listed.blobs ?? []).map((blob) => blob.key).filter((key) => /^\d{4}-\d{2}-\d{2}$/.test(key)).sort();
} catch (error) {
  console.error('Não consegui listar o store. Rode `npx netlify login` e `npx netlify link` antes.');
  process.exit(1);
}

if (!keys.length) {
  console.log('Nenhuma visita contada ainda.');
  process.exit(0);
}

let total = 0;
const rows = keys.map((key) => {
  const raw = netlify('blobs:get', STORE, key).trim();
  const n = Number(JSON.parse(raw).n ?? 0);
  total += n;
  return { dia: key, visitas: n };
});

console.table(rows);
console.log(`Total: ${total} visita(s) em ${rows.length} dia(s).`);
