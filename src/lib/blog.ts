import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { getCollection } from 'astro:content';
import { sha256, type BlogManifest, type BlogLocale } from '../config/blog.mjs';
export async function publicBlogEntries(locale: BlogLocale) {
  const manifest: BlogManifest = JSON.parse(await readFile(path.join(process.cwd(), '.astro/blog-manifest.json'), 'utf8'));
  const collection = await getCollection('blog');
  for (const [file, hash] of Object.entries(manifest.sourceHashes)) {
    if (sha256(await readFile(path.join(process.cwd(),file))) !== hash) throw new Error('[blog] source changed after manifest');
  }
  return manifest.entries.filter(e=>e.locale===locale).map(meta=>{
    const entry=collection.find(e=>e.data.content_id===meta.id || (meta.id==='torno-artigo-pt-20261016-custo-manutencao-software-apos-lancamento' && e.id===meta.collectionId));
    if(!entry)throw new Error(`[blog] missing collection entry ${meta.id}`);
    return {meta,entry};
  });
}
