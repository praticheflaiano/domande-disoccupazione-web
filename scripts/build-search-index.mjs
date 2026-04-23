// Genera public/search-index.json a partire dai file src/pages/**/*.astro
// e dai contenuti src/content/news/*.md. Eseguito come prebuild.
//
// Il finder client-side (src/components/SiteFinder.astro) legge questo JSON
// e fa match fuzzy su title + description + headings.

import { readdir, readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import { join, relative, dirname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const pagesDir = join(root, 'src', 'pages');
const newsDir = join(root, 'src', 'content', 'news');
const outFile = join(root, 'public', 'search-index.json');

// Pagine statiche Astro che NON vanno indicizzate (dynamic routes, 404, privacy).
const SKIP = new Set(['privacy', '404']);

async function* walk(dir) {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const e of entries) {
        const full = join(dir, e.name);
        if (e.isDirectory()) yield* walk(full);
        else yield full;
    }
}

function slugFromAstroPath(absPath) {
    const rel = relative(pagesDir, absPath).replace(/\\/g, '/');
    if (rel.includes('[') || rel.includes(']')) return null; // dynamic route
    if (rel === 'index.astro') return '/';
    return '/' + rel.replace(/\.astro$/, '').replace(/\/index$/, '');
}

function extract(content, re, group = 1) {
    const m = content.match(re);
    return m ? m[group].trim() : '';
}

function stripMarkdown(s) {
    return s
        .replace(/\*\*|\*/g, '')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/\s+/g, ' ')
        .trim();
}

const results = [];

for await (const file of walk(pagesDir)) {
    if (!file.endsWith('.astro')) continue;

    const slug = slugFromAstroPath(file);
    if (!slug) continue;

    const slugName = slug === '/' ? 'home' : slug.split('/').filter(Boolean).pop();
    if (SKIP.has(slugName)) continue;

    const src = await readFile(file, 'utf-8');

    // Astro frontmatter: preferisci title/description/h1 delle props passate al layout.
    let title = extract(src, /title="([^"]+)"/);
    if (!title) title = extract(src, /<title>([^<]+)<\/title>/);
    if (!title) title = extract(src, /h1="([^"]+)"/);

    let description = extract(src, /description="([^"]+)"/);
    if (!description) description = extract(src, /<meta name="description" content="([^"]+)"/);

    const kicker = extract(src, /kicker="([^"]+)"/);

    // Raccogli H2/H3 dal template
    const headings = [...src.matchAll(/<h[23][^>]*>([^<]+)<\/h[23]>/g)]
        .map((m) => stripMarkdown(m[1]))
        .filter((h) => h && !h.includes('{'));

    if (!title) continue; // pagine senza title strutturato non sono utili al finder

    results.push({
        url: slug,
        type: slug.startsWith('/obblighi/') ? 'obbligo'
            : slug.startsWith('/guida/') ? 'guida'
            : slug.startsWith('/news/') ? 'news'
            : 'pagina',
        title: title.slice(0, 140),
        description: description.slice(0, 220),
        kicker: kicker.slice(0, 80),
        headings: headings.slice(0, 8),
    });
}

// News content collection
try {
    await stat(newsDir);
    for await (const file of walk(newsDir)) {
        if (!file.endsWith('.md')) continue;
        const src = await readFile(file, 'utf-8');

        const fmMatch = src.match(/^---\n([\s\S]*?)\n---/);
        if (!fmMatch) continue;
        const fm = fmMatch[1];
        const title = extract(fm, /title:\s*["']?([^"'\n]+)["']?/);
        const summary = extract(fm, /summary:\s*["']?([^"'\n]+)["']?/);

        const slug = file.split(sep).pop().replace(/\.md$/, '');

        results.push({
            url: `/news/${slug}`,
            type: 'news',
            title,
            description: summary,
            kicker: 'News INPS',
            headings: [],
        });
    }
} catch {
    // nessuna collection news
}

await mkdir(dirname(outFile), { recursive: true });
await writeFile(outFile, JSON.stringify(results, null, 0));

console.log(`✓ search-index.json: ${results.length} pagine indicizzate`);
