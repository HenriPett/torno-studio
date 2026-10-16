import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
// Full editorial validation runs once in prepareBlogManifest before collection loading.
const blog = defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/blog' }), schema: z.object({ content_id: z.string() }).passthrough() });
export const collections = { blog };
