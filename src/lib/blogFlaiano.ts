// Collegamento con il blog del sito principale praticheflaiano.it.
// Dal feed RSS del blog si tengono solo gli articoli su NASpI, disoccupazione
// e lavoro: vengono mostrati in home e in /news come link al sito principale.
// Il parsing è volutamente senza dipendenze (il feed è generato da noi).

export const BLOG_FEED_URL = 'https://praticheflaiano.it/rss.xml';
export const BLOG_CATEGORY_URL = 'https://praticheflaiano.it/blog/categoria/naspi-disoccupazione';
const BLOG_ORIGIN = 'https://praticheflaiano.it';

export interface BlogPost {
    title: string;
    url: string;
    date: string; // ISO yyyy-mm-dd
    summary: string;
    category: string;
}

// Categorie e tag del blog che rendono un articolo pertinente per il portale.
const RELEVANT_TAGS = new Set([
    'naspi e disoccupazione',
    'naspi',
    'disoccupazione',
    'disoccupati',
    'dis-coll',
    'lavoro',
    'licenziamento',
    'dimissioni',
    'cassa integrazione',
]);

const ENTITIES: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" };

export function decodeEntities(text: string): string {
    return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, code: string) => {
        if (code[0] === '#') {
            const n = code[1].toLowerCase() === 'x' ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
            return Number.isFinite(n) ? String.fromCodePoint(n) : match;
        }
        return ENTITIES[code.toLowerCase()] ?? match;
    });
}

function tagText(xml: string, tag: string): string {
    const m = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`));
    if (!m) return '';
    return decodeEntities(m[1].replace(/^<!\[CDATA\[([\s\S]*)\]\]>$/, '$1')).trim();
}

function allTagTexts(xml: string, tag: string): string[] {
    const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'g');
    return [...xml.matchAll(re)].map((m) => decodeEntities(m[1]).trim());
}

export function isRelevant(categories: string[]): boolean {
    return categories.some((c) => RELEVANT_TAGS.has(c.toLowerCase()));
}

/** Estrae dal feed RSS gli articoli pertinenti, dal più recente. */
export function parseBlogFeed(xml: string): BlogPost[] {
    const posts: BlogPost[] = [];
    for (const m of xml.matchAll(/<item>([\s\S]*?)<\/item>/g)) {
        const item = m[1];
        const categories = allTagTexts(item, 'category');
        if (!isRelevant(categories)) continue;

        const url = tagText(item, 'link');
        const date = new Date(tagText(item, 'pubDate'));
        // Solo link al nostro blog e solo voci complete: niente sorprese in pagina.
        if (!url.startsWith(`${BLOG_ORIGIN}/blog/`) || Number.isNaN(date.getTime())) continue;

        const title = tagText(item, 'title').split(' | ')[0].trim();
        if (!title) continue;

        posts.push({
            title,
            url,
            date: date.toISOString().slice(0, 10),
            summary: tagText(item, 'description'),
            category: categories[0] ?? '',
        });
    }
    return posts.sort((a, b) => b.date.localeCompare(a.date));
}
