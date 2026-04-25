#!/usr/bin/env node
// IndexNow ping per domandedisoccupazione.it
// Notifica Bing/Yandex/Seznam (e quindi DuckDuckGo/Copilot) degli URL nuovi o
// modificati. Va invocato dopo ogni deploy: `npm run indexnow` oppure
// `npm run indexnow -- --from-git` per limitarsi agli URL toccati dall'ultimo
// commit.
//
// Pure Node 20 stdlib, zero dipendenze. Vedi docs/seo-submission.md sezione 3.

import { readFile, access } from 'node:fs/promises';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const HOST = 'domandedisoccupazione.it';
const BASE_URL = `https://${HOST}`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';
const MAX_BATCH = 10000; // limite ufficiale IndexNow

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const sitemapPath = join(root, 'dist', 'sitemap-0.xml');
const pagesDir = join(root, 'src', 'pages');
const newsContentDir = join(root, 'src', 'content', 'news');

function printHelp() {
    process.stdout.write(
        [
            'Usage: node scripts/indexnow-ping.mjs [--from-git] [--help]',
            '',
            'Notifica IndexNow degli URL del sito.',
            '',
            'Options:',
            '  --from-git   Pinga solo gli URL toccati dall\'ultimo commit',
            '               (mappando src/pages/** e src/content/news/*.md).',
            '  --help, -h   Mostra questo messaggio.',
            '',
            'Env:',
            `  INDEXNOW_KEY  Chiave IndexNow (32 hex chars). File pubblico atteso:`,
            `                ${BASE_URL}/<INDEXNOW_KEY>.txt`,
            '',
        ].join('\n'),
    );
}

function fail(msg, code = 1) {
    process.stderr.write(`[indexnow] ERROR: ${msg}\n`);
    process.exit(code);
}

function info(msg) {
    process.stdout.write(`[indexnow] ${msg}\n`);
}

async function exists(path) {
    try {
        await access(path);
        return true;
    } catch {
        return false;
    }
}

// Estrae <loc>...</loc> dal sitemap. Parsing volutamente naïve: il file è
// generato da @astrojs/sitemap, quindi è ben formato e self-closed entity-free.
async function urlsFromSitemap() {
    if (!(await exists(sitemapPath))) {
        fail(
            `sitemap non trovato in ${relative(root, sitemapPath)}. Esegui prima \`npm run build\`.`,
        );
    }
    const xml = await readFile(sitemapPath, 'utf8');
    const matches = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)];
    const urls = matches.map((m) => m[1].trim()).filter(Boolean);
    if (urls.length === 0) {
        fail('sitemap presente ma senza <loc>: build incompleta?');
    }
    return urls;
}

// Mappa un file di src/pages/** o src/content/news/** all'URL pubblico.
// Ritorna null se il file non rappresenta una pagina indicizzabile (route
// dinamica, file partial _underscore, ecc.).
function fileToUrl(relPath) {
    const norm = relPath.replace(/\\/g, '/');

    // News markdown nel content collection.
    if (norm.startsWith('src/content/news/') && /\.(md|mdx)$/.test(norm)) {
        const slug = norm
            .replace(/^src\/content\/news\//, '')
            .replace(/\.(md|mdx)$/, '');
        if (!slug || slug.startsWith('_')) return null;
        return `${BASE_URL}/news/${slug}/`;
    }

    if (!norm.startsWith('src/pages/')) return null;
    if (!/\.(astro|md|mdx)$/.test(norm)) return null;

    const rel = norm.replace(/^src\/pages\//, '');
    // Skip route dinamiche e file di sistema (404, _qualcosa).
    if (rel.includes('[') || rel.includes(']')) return null;
    if (rel.split('/').some((seg) => seg.startsWith('_'))) return null;

    const noExt = rel.replace(/\.(astro|md|mdx)$/, '');
    if (noExt === '404') return null;

    // index → directory root del segmento.
    const path = noExt.endsWith('/index') || noExt === 'index'
        ? noExt.replace(/index$/, '')
        : `${noExt}/`;

    return `${BASE_URL}/${path}`.replace(/\/+$/, '/');
}

function urlsFromGit() {
    let raw;
    try {
        raw = execFileSync('git', ['diff-tree', '--no-commit-id', '--name-only', '-r', 'HEAD'], {
            cwd: root,
            encoding: 'utf8',
        });
    } catch (err) {
        fail(`git diff-tree fallito: ${err.message}`);
    }
    const files = raw.split('\n').map((l) => l.trim()).filter(Boolean);
    const urls = new Set();
    for (const f of files) {
        const u = fileToUrl(f);
        if (u) urls.add(u);
    }
    return [...urls];
}

async function postBatch(key, urlList) {
    const body = JSON.stringify({
        host: HOST,
        key,
        keyLocation: `${BASE_URL}/${key}.txt`,
        urlList,
    });
    const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body,
    });
    const text = await res.text().catch(() => '');
    return { status: res.status, body: text };
}

function chunk(arr, size) {
    const out = [];
    for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
    return out;
}

async function main() {
    const args = process.argv.slice(2);
    if (args.includes('--help') || args.includes('-h')) {
        printHelp();
        process.exit(0);
    }

    const key = process.env.INDEXNOW_KEY;
    if (!key || key.trim().length === 0) {
        printHelp();
        fail('variabile d\'ambiente INDEXNOW_KEY mancante o vuota.');
    }

    const fromGit = args.includes('--from-git');
    const urls = fromGit ? urlsFromGit() : await urlsFromSitemap();

    if (urls.length === 0) {
        info(
            fromGit
                ? 'Nessun URL indicizzabile toccato dall\'ultimo commit. Niente da pingare.'
                : 'Sitemap vuoto: nessun URL da pingare.',
        );
        process.exit(0);
    }

    info(
        `Sorgente: ${fromGit ? 'git diff-tree HEAD' : 'dist/sitemap-0.xml'} — ${urls.length} URL totali.`,
    );

    const batches = chunk(urls, MAX_BATCH);
    let okCount = 0;
    let failCount = 0;

    for (let i = 0; i < batches.length; i++) {
        const batch = batches[i];
        const label = batches.length > 1 ? ` (batch ${i + 1}/${batches.length})` : '';
        try {
            const { status, body } = await postBatch(key, batch);
            if (status === 200 || status === 202) {
                info(`OK${label}: ${batch.length} URL — HTTP ${status}.`);
                okCount += batch.length;
            } else {
                failCount += batch.length;
                process.stderr.write(
                    `[indexnow] FAIL${label}: HTTP ${status} — body: ${body || '(empty)'}\n`,
                );
            }
        } catch (err) {
            failCount += batch.length;
            process.stderr.write(`[indexnow] FAIL${label}: ${err.message}\n`);
        }
    }

    info(`Riepilogo: ${okCount} OK, ${failCount} falliti su ${urls.length} URL.`);
    process.exit(failCount === 0 ? 0 : 2);
}

main().catch((err) => {
    fail(`crash inatteso: ${err && err.stack ? err.stack : err}`);
});
