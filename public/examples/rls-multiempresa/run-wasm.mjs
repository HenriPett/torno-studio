// Optional PostgreSQL WASM runner. Install PGlite in a disposable directory,
// copy this runner there, and pass the example directory as its sole argument.
import { PGlite } from '@electric-sql/pglite';
import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const folder = resolve(process.argv[2] ?? dirname(fileURLToPath(import.meta.url)));
let passes = 0;
const onNotice = notice => {
  console.log(notice.message);
  if (notice.message.startsWith('PASS ')) passes++;
};
const db = new PGlite();
// Split statements while preserving strings, dollar-quoted bodies and comments.
// These fixed fixtures contain no COPY data or escaped-string SQL literals.
function statements(sql) {
  const tokens = sql.match(/--[^\n]*(?:\n|$)|\$([a-zA-Z_][a-zA-Z_0-9]*|)\$[\s\S]*?\$\1\$|'(?:''|[^'])*'|;|[^;'$-]+|[\s\S]/g) ?? [];
  const result = []; let statement = '';
  for (const token of tokens) {
    statement += token;
    if (token === ';') { result.push(statement); statement = ''; }
  }
  if (statement.trim()) result.push(statement);
  return result;
}
try {
  console.log('ENGINE: PostgreSQL WASM / PGlite; simulated Supabase auth; no HTTP or JWT verification.');
  console.log((await db.query('select version()')).rows[0].version);
  for (const name of ['bootstrap-local.sql', 'schema.sql', 'tests.sql']) {
    console.log(`FILE: ${name}`);
    const sql = (await readFile(resolve(folder, name), 'utf8')).replace(/^\\.*$/gm, '');
    for (const statement of statements(sql)) await db.exec(statement, { onNotice });
  }
  if (passes !== 94) throw new Error(`Incomplete test run: only ${passes} assertions`);
  console.log(`RLS_DEMO_ALL_ASSERTIONS_PASSED (${passes} assertions)`);
} finally { await db.close(); }
