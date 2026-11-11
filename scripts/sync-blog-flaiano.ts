// Aggiorna src/data/blog-flaiano.json con gli articoli su NASpI, disoccupazione
// e lavoro pubblicati sul blog di praticheflaiano.it (feed RSS).
// Uso: `npm run sync:blog`. Lo esegue ogni giorno il workflow
// .github/workflows/sync-blog.yml, che fa commit solo se qualcosa è cambiato.

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { BLOG_FEED_URL, parseBlogFeed } from '../src/lib/blogFlaiano';

const MAX_POSTS = 12;
const target = fileURLToPath(new URL('../src/data/blog-flaiano.json', import.meta.url));

const res = await fetch(BLOG_FEED_URL, { headers: { accept: 'application/rss+xml, application/xml' } });
if (!res.ok) throw new Error(`Feed non raggiungibile: HTTP ${res.status}`);

const xml = await res.text();
if (!xml.includes('<item>')) throw new Error('Feed senza articoli: lascio invariato lo snapshot.');

const posts = parseBlogFeed(xml).slice(0, MAX_POSTS);
const next = `${JSON.stringify(posts, null, 4)}\n`;
const prev = await readFile(target, 'utf8').catch(() => '');

if (next === prev) {
    console.log(`Nessuna novità (${posts.length} articoli).`);
} else {
    await writeFile(target, next);
    console.log(`Snapshot aggiornato: ${posts.length} articoli.`);
}
