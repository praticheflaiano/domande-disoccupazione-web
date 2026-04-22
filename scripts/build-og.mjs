// Genera le immagini Open Graph 1200x630 da template SVG in scripts/og/*.svg
// Eseguire quando si modifica il template: `node scripts/build-og.mjs`.
// Output committato in /public/og/*.png.

import { Resvg } from '@resvg/resvg-js';
import { readFile, writeFile, readdir, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, basename } from 'node:path';

const root = dirname(fileURLToPath(import.meta.url));
const templatesDir = join(root, 'og');
const outDir = join(root, '..', 'public', 'og');

await mkdir(outDir, { recursive: true });

const files = (await readdir(templatesDir)).filter((f) => f.endsWith('.svg'));
if (files.length === 0) {
    console.error('Nessun template SVG trovato in scripts/og/');
    process.exit(1);
}

for (const file of files) {
    const svg = await readFile(join(templatesDir, file), 'utf-8');
    const resvg = new Resvg(svg, {
        fitTo: { mode: 'width', value: 1200 },
        font: { loadSystemFonts: true, defaultFontFamily: 'Arial' },
    });
    const pngData = resvg.render().asPng();
    const outName = basename(file, '.svg') + '.png';
    await writeFile(join(outDir, outName), pngData);
    console.log(`✓ ${outName} (${(pngData.length / 1024).toFixed(1)} KB)`);
}

console.log(`\nGenerati ${files.length} file in /public/og/`);
