import { readFile, readdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import { toMdast } from 'hast-util-to-mdast';
import { toMarkdown } from 'mdast-util-to-markdown';
import { gfmTableToMarkdown } from 'mdast-util-gfm-table';

const parser = unified().use(rehypeParse);
const find = (node, predicate) => predicate(node) ? node : node.children?.map(n => find(n, predicate)).find(Boolean);

// Convert only public, rendered <main>. Never read editorial sources/drafts.
export function mainMarkdown(html, pageUrl) {
  const tree = parser.parse(html);
  const main = find(tree, n => n.tagName === 'main');
  if (!main) throw new Error(`Missing public main: ${pageUrl}`);
  function clean(node) {
    if (!node.children) return;
    node.children = node.children.filter(n => !['script', 'style', 'svg', 'button'].includes(n.tagName) && !n.properties?.hidden);
    for (const child of node.children) {
      for (const attr of ['href', 'src']) {
        const value = child.properties?.[attr];
        if (typeof value === 'string') child.properties[attr] = new URL(value, pageUrl).href;
      }
      clean(child);
    }
  }
  clean(main);
  const title = find(tree, n => n.tagName === 'title');
  const text = n => n.value || n.children?.map(text).join('') || '';
  const identity = title ? `> ${text(title)}\n\n` : '';
  return identity + toMarkdown(toMdast(main), { extensions: [gfmTableToMarkdown()] });
}

export default function agentMarkdown() {
  return { name: 'agent-markdown', hooks: {
    'astro:build:done': async ({ dir, logger }) => {
      const root = fileURLToPath(dir);
      const pages = (await readdir(root, { recursive: true })).filter(f => f.endsWith('.html'));
      for (const file of pages) {
        const html = await readFile(join(root, file), 'utf8');
        const tree = parser.parse(html);
        const canonical = find(tree, n => n.tagName === 'link' && n.properties?.rel?.includes('canonical'))?.properties?.href;
        const pageUrl = canonical || `https://tornostudio.com/${file.endsWith('index.html') ? file.slice(0, -10) : file}`;
        const body = mainMarkdown(html, pageUrl);
        if (body.trim().length < 20) throw new Error(`Empty Markdown: ${file}`);
        await writeFile(join(root, file.replace(/\.html$/, '.md')), body);
      }
      logger.info(`Generated ${pages.length} public Markdown representations.`);
    },
  } };
}
