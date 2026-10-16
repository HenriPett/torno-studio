// Source integrity gate for the isolated release snapshot.
// Usage: node scripts/test-blog-integrity.mjs /path/to/release/snapshot
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { assert, runChecks } from './test-blog-common.mjs';

const root = resolve(process.argv[2] ?? '.');
const baseline = JSON.parse(await readFile('docs/qa/cases-20261014/source-sha256.json', 'utf8'));
const protectedFiles = [
  'netlify/edge-functions/count-diagnostico.ts',
  'src/components/ConsentBanner.astro',
  'src/config/pricing.ts',
];
const cases = protectedFiles.map((path) => [`preservado ${path}`, async () => {
  const body = await readFile(join(root, path));
  const sha = createHash('sha256').update(body).digest('hex');
  assert(sha === baseline[path], `hash mudou: baseline ${baseline[path]}, atual ${sha}`);
}]);
cases.push(['preservado netlify.toml', async () => {
  const body = await readFile(join(root, 'netlify.toml'));
  const sha = createHash('sha256').update(body).digest('hex');
  assert(sha === '4980e9a51a4951ae5c5fe513b41a49a05b31ff5f9debb221f2dd407d29a7bc13', `hash netlify.toml mudou: ${sha}`);
}]);
await runChecks(cases);
