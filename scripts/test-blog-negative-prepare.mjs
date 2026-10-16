// Derives one invalid private fixture per case from the positive fixtures.
// Run after test-blog-fixture-prepare.mjs. Never writes inside the site tree.
import { createHash } from 'node:crypto';
import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { parse, stringify } from 'yaml';

const root = '/private/tmp/torno-blog-fixtures-20261014';
const cases = {
  'invalid-timezone': ['qa-published-pt.md', (d) => { d.created_at = '2026-10-13T08:00:00'; }],
  'invalid-calendar': ['qa-published-pt.md', (d) => { d.created_at = '2026-02-30T08:00:00Z'; }],
  'duplicate-canonical': ['qa-pair-pt.md', (d) => {
    d.proposed_path = '/blog/qa-registro-de-handover/';
    d.canonical_url = 'https://tornostudio.com/blog/qa-registro-de-handover/';
  }],
  'reserved-intent': ['qa-published-pt.md', (d) => { d.intent_id = 'recovery-commercial'; }],
  'mismatched-translation-intent': ['qa-pair-en.md', (d) => { d.intent_id = 'qa-other-intent'; }],
  'markdown-link-to-draft': ['qa-published-pt.md', (_d, body) => `${body}\n[Link invisível](/blog/qa-draft/)\n`],
  'historic-no-go-slug': ['qa-published-pt.md', (d) => {
    d.proposed_path = '/blog/quanto-custa-sistema-sob-medida/';
    d.canonical_url = 'https://tornostudio.com/blog/quanto-custa-sistema-sob-medida/';
  }],
  'missing-author': ['qa-published-pt.md', (d) => { d.author_name = null; }],
  'missing-release-approval': ['qa-pair-pt.md', (d) => {
    d.release_approved_by = null; d.release_approved_at = null; d.release_approval_evidence = null;
  }],
};
for (const [name, [filename, mutate]] of Object.entries(cases)) {
  const dir = join(root, 'negative', name);
  await mkdir(dir, { recursive: true });
  await cp(join(root, 'content'), join(dir, 'content'), { recursive: true, force: true });
  await cp(join(root, 'release-manifest.json'), join(dir, 'release-manifest.json'), { force: true });
  const file = join(dir, 'content', filename);
  const raw = await readFile(file, 'utf8');
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error(`invalid source fixture: ${file}`);
  const data = parse(match[1]);
  const changedBody = mutate(data, match[2]);
  const changed = `---\n${stringify(data)}---\n${typeof changedBody === 'string' ? changedBody : match[2]}`;
  await writeFile(file, changed);
  const manifestFile = join(dir, 'release-manifest.json');
  const manifest = JSON.parse(await readFile(manifestFile, 'utf8'));
  const entry = manifest.entries.find((candidate) => candidate.contentId === data.content_id);
  if (entry) {
    entry.contentRevision = createHash('sha256').update(changed).digest('hex');
    entry.path = data.proposed_path;
    await writeFile(manifestFile, JSON.stringify(manifest, null, 2) + '\n');
  }
}
console.log(`Prepared ${Object.keys(cases).length} negative private scenarios`);
