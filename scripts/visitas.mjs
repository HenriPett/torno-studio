#!/usr/bin/env node
/**
 * Lê o contador sem cookie (docs/infra/CONTADOR-DIAGNOSTICO.md) pela Netlify CLI logada
 * (`npx netlify login` + `npx netlify link`). Sem endpoint público.
 * Imprime a tabela por dia da /diagnostico/ e a tabela por dia e setor das landings /para/<slug>/.
 * CLI: https://cli.netlify.com/commands/blobs/ (blobs:list --json, blobs:get <store> <key>).
 */
import { execFileSync } from 'node:child_process';

const DIAGNOSTICO = 'visitas-diagnostico';
const SETORES = 'visitas-setores';

const netlify = (...args) =>
  execFileSync('npx', ['--yes', 'netlify-cli@27.8.1', ...args], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'] });

function list(store, pattern) {
  try {
    const listed = JSON.parse(netlify('blobs:list', store, '--json'));
    return (listed.blobs ?? []).map((blob) => blob.key).filter((key) => pattern.test(key)).sort();
  } catch {
    console.error(`Não consegui listar o store ${store}. Rode \`npx netlify login\` e \`npx netlify link\` antes.`);
    process.exit(1);
  }
}

const read = (store, key) => Number(JSON.parse(netlify('blobs:get', store, key).trim()).n ?? 0);

// /diagnostico/: uma chave por dia (AAAA-MM-DD).
console.log('\n/diagnostico/ (visitas por dia)');
const days = list(DIAGNOSTICO, /^\d{4}-\d{2}-\d{2}$/);
if (!days.length) console.log('Nenhuma visita contada ainda.');
else {
  let total = 0;
  const rows = days.map((dia) => {
    const visitas = read(DIAGNOSTICO, dia);
    total += visitas;
    return { dia, visitas };
  });
  console.table(rows);
  console.log(`Total: ${total} visita(s) em ${rows.length} dia(s).`);
}

// Landings de setor: uma chave por dia e setor (AAAA-MM-DD/<slug>). Linhas = dias, colunas = setores.
console.log('\nLandings de setor (visitas por dia e setor)');
const keys = list(SETORES, /^\d{4}-\d{2}-\d{2}\/[a-z-]+$/);
if (!keys.length) console.log('Nenhuma visita contada ainda.');
else {
  const byDay = new Map();
  const totals = new Map();
  for (const key of keys) {
    const [dia, setor] = key.split('/');
    const n = read(SETORES, key);
    if (!byDay.has(dia)) byDay.set(dia, {});
    byDay.get(dia)[setor] = n;
    totals.set(setor, (totals.get(setor) ?? 0) + n);
  }
  const setores = [...totals.keys()].sort();
  const table = {};
  for (const [dia, counts] of [...byDay].sort(([a], [b]) => a.localeCompare(b))) {
    table[dia] = Object.fromEntries(setores.map((setor) => [setor, counts[setor] ?? 0]));
  }
  table.Total = Object.fromEntries(setores.map((setor) => [setor, totals.get(setor)]));
  console.table(table);
  const all = [...totals.values()].reduce((a, b) => a + b, 0);
  console.log(`Total: ${all} visita(s) em ${setores.length} setor(es) e ${byDay.size} dia(s).`);
}
