#!/usr/bin/env node
// Genera un'immagine con OpenRouter (modello openai/gpt-5.4-image-2 = GPT Image 2).
//
// Uso:
//   export OPENROUTER_API_KEY=sk-or-v1-...
//   node scripts/generate-image.mjs \
//     --prompt "..." \
//     --out public/og/cover-v2.png \
//     --size landscape
//
// Dimensioni supportate da gpt-image-2:
//   landscape = 1536x1024   (ratio 3:2, adatto a OG/banner)
//   portrait  = 1024x1536
//   square    = 1024x1024
//
// NON stampa mai la chiave; non la committa.

import { writeFile, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';

const args = Object.fromEntries(
    process.argv.slice(2).reduce((acc, cur, i, arr) => {
        if (cur.startsWith('--')) acc.push([cur.slice(2), arr[i + 1]]);
        return acc;
    }, []),
);

const { prompt, out, size = 'landscape', quality = 'high' } = args;

if (!prompt || !out) {
    console.error('Uso: node scripts/generate-image.mjs --prompt "..." --out <path.png> [--size landscape|square|portrait] [--quality low|medium|high]');
    process.exit(1);
}

const apiKey = process.env.OPENROUTER_API_KEY;
if (!apiKey) {
    console.error('ERRORE: OPENROUTER_API_KEY non settata in ambiente.');
    console.error('Esegui: export OPENROUTER_API_KEY=sk-or-v1-...');
    process.exit(1);
}

const sizeMap = {
    landscape: '1536x1024',
    portrait: '1024x1536',
    square: '1024x1024',
};

const t0 = Date.now();
console.log(`→ Modello: openai/gpt-5.4-image-2`);
console.log(`→ Dimensione: ${sizeMap[size] ?? size}`);
console.log(`→ Prompt (${prompt.length} char): ${prompt.slice(0, 140)}${prompt.length > 140 ? '…' : ''}`);

const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://domandedisoccupazione.it',
        'X-Title': 'Centro Pratiche Flaiano - OG image generation',
    },
    body: JSON.stringify({
        model: 'openai/gpt-5.4-image-2',
        modalities: ['image', 'text'],
        messages: [{ role: 'user', content: prompt }],
        // Parametri specifici immagine
        image: { size: sizeMap[size] ?? size, quality },
    }),
});

if (!response.ok) {
    const body = await response.text();
    console.error(`ERRORE HTTP ${response.status}: ${body.slice(0, 800)}`);
    process.exit(1);
}

const data = await response.json();

// La risposta OpenRouter per modalities:["image","text"] include un array "images"
// nel messaggio o content con parti di tipo "image_url" (data URL).
const msg = data.choices?.[0]?.message;
let base64 = null;

// Format 1: content come array di parti
if (Array.isArray(msg?.content)) {
    for (const part of msg.content) {
        if (part.type === 'image_url' && part.image_url?.url?.startsWith('data:image/')) {
            base64 = part.image_url.url.split(',')[1];
            break;
        }
        if (part.type === 'output_image' && part.image_url) {
            base64 = part.image_url.split(',').pop();
            break;
        }
    }
}

// Format 2: messaggio con campo "images"
if (!base64 && Array.isArray(msg?.images)) {
    const img = msg.images[0];
    const url = img?.image_url?.url ?? img?.url ?? '';
    if (url.startsWith('data:image/')) base64 = url.split(',')[1];
}

// Format 3: content string con data URL inline
if (!base64 && typeof msg?.content === 'string') {
    const m = msg.content.match(/data:image\/\w+;base64,([A-Za-z0-9+/=]+)/);
    if (m) base64 = m[1];
}

if (!base64) {
    console.error('ERRORE: impossibile estrarre immagine dalla risposta. Ecco la struttura ricevuta:');
    console.error(JSON.stringify(data, null, 2).slice(0, 2000));
    process.exit(1);
}

const buffer = Buffer.from(base64, 'base64');
await mkdir(dirname(out), { recursive: true });
await writeFile(out, buffer);

const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
const sizeKB = (buffer.length / 1024).toFixed(1);
console.log(`✓ Salvato ${out} — ${sizeKB} KB in ${elapsed}s`);

// Eventuale utilizzo token
const usage = data.usage;
if (usage) {
    console.log(`→ Usage: ${JSON.stringify(usage)}`);
}
