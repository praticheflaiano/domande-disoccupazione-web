import { describe, it, expect } from 'vitest';
import { parseBlogFeed, isRelevant, decodeEntities } from '../blogFlaiano';
import snapshot from '../../data/blog-flaiano.json';

const item = (o: { title: string; link: string; date: string; cats: string[]; desc?: string }) =>
    `<item><title>${o.title}</title><link>${o.link}</link><description>${o.desc ?? 'Testo'}</description>` +
    `<pubDate>${o.date}</pubDate>${o.cats.map((c) => `<category>${c}</category>`).join('')}</item>`;

const feed = (items: string[]) => `<?xml version="1.0"?><rss><channel><title>Blog</title>${items.join('')}</channel></rss>`;

describe('blogFlaiano', () => {
    it('tiene solo gli articoli su NASpI, disoccupazione e lavoro', () => {
        const posts = parseBlogFeed(
            feed([
                item({ title: 'IMU saldo', link: 'https://praticheflaiano.it/blog/imu/', date: 'Tue, 10 Nov 2026 00:00:00 GMT', cats: ['IMU e Tributi Locali', 'imu'] }),
                item({ title: 'NASpI 2026 | Roma', link: 'https://praticheflaiano.it/blog/naspi/', date: 'Wed, 29 Apr 2026 00:00:00 GMT', cats: ['NASpI e Disoccupazione', 'naspi'] }),
                item({ title: 'Colf', link: 'https://praticheflaiano.it/blog/colf/', date: 'Tue, 10 Nov 2026 00:00:00 GMT', cats: ['Lavoro domestico', 'lavoro-domestico'] }),
                item({ title: 'ISEE corrente', link: 'https://praticheflaiano.it/blog/isee/', date: 'Tue, 10 Nov 2026 00:00:00 GMT', cats: ['ISEE e DSU', 'lavoro'] }),
            ]),
        );
        expect(posts.map((p) => p.title)).toEqual(['ISEE corrente', 'NASpI 2026']);
        expect(posts[0].date).toBe('2026-11-10');
        expect(posts[1].category).toBe('NASpI e Disoccupazione');
    });

    it('scarta link esterni al blog e date non valide', () => {
        const posts = parseBlogFeed(
            feed([
                item({ title: 'Altro sito', link: 'https://example.com/blog/x/', date: 'Tue, 10 Nov 2026 00:00:00 GMT', cats: ['naspi'] }),
                item({ title: 'Senza data', link: 'https://praticheflaiano.it/blog/y/', date: 'boh', cats: ['naspi'] }),
            ]),
        );
        expect(posts).toEqual([]);
    });

    it('decodifica le entità XML', () => {
        expect(decodeEntities('l&apos;ISEE &amp; la NASpI &#232; &#xE8;')).toBe("l'ISEE & la NASpI è è");
        const [post] = parseBlogFeed(
            feed([item({ title: 'Dall&apos;INPS', link: 'https://praticheflaiano.it/blog/z/', date: 'Tue, 10 Nov 2026 00:00:00 GMT', cats: ['naspi'], desc: 'A &amp; B' })]),
        );
        expect(post.title).toBe("Dall'INPS");
        expect(post.summary).toBe('A & B');
    });

    it('riconosce i tag pertinenti senza distinguere maiuscole', () => {
        expect(isRelevant(['Pensioni', 'Disoccupati'])).toBe(true);
        expect(isRelevant(['Pensioni', 'lavoro-domestico'])).toBe(false);
    });

    it('lo snapshot versionato è valido', () => {
        expect(Array.isArray(snapshot)).toBe(true);
        for (const p of snapshot) {
            expect(p.url.startsWith('https://praticheflaiano.it/blog/')).toBe(true);
            expect(p.title.length).toBeGreaterThan(0);
            expect(p.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        }
    });
});
