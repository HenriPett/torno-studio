// Demo privada da Torno (demo/PLANO-V2.md): copia o app do navegador (demo/web/**) para dist/demo-app/
// no fim do build, junto com a fonte Inter auto-hospedada. As rotas /demo/<id> e /admin são reescritas
// para /demo-app/index.html no netlify.toml; os dados e a IA só saem da Netlify Function depois da senha.
// Fica fora do sitemap (não é página do Astro) e roda antes do sectorIsolation, que também varre esta pasta.
import { cp, copyFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));

/** @returns {import('astro').AstroIntegration} */
export default function demoApp() {
  return {
    name: 'torno-demo-app',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const out = join(fileURLToPath(dir), 'demo-app');
        await mkdir(out, { recursive: true });
        await cp(join(ROOT, 'demo', 'web'), out, { recursive: true });
        await copyFile(
          join(ROOT, 'node_modules', '@fontsource-variable', 'inter', 'files', 'inter-latin-wght-normal.woff2'),
          join(out, 'inter.woff2'),
        );
        logger.info('App da demo copiado para dist/demo-app/');
      },
    },
  };
}
