import { describe, it, expect } from 'vitest';
import { RELATED_MAP, relatedFor } from '../related';
import type { RelatedLink } from '../related';

// Pagine effettivamente presenti in src/pages/. Questo set rispecchia il
// filesystem al momento della scrittura del test: serve come hard-check
// contro link interni rotti dalla mappa di internal linking.
const KNOWN_PAGE_PATHS = new Set<string>([
    '/',
    '/calcolatore',
    '/anticipo',
    '/manuale',
    '/chi-siamo',
    '/richiedi',
    '/contatti',
    '/faq',
    '/privacy',
    '/dis-coll',
    '/guida',
    '/guida/presentare-domanda',
    '/guida/did',
    '/guida/fiscalita',
    '/guida/anf',
    '/guida/maternita-malattia',
    '/guida/estero-u2',
    '/guida/ricorso',
    '/guida/dimissioni-giusta-causa',
    '/guida/dimissioni-trasferimento',
    '/guida/dimissioni-maternita',
    '/guida/dimissioni-stipendio-non-pagato',
    '/guida/dimissioni-mobbing',
    '/guida/dimissioni-cessione-azienda',
    '/guida/pagamenti-accredito',
    '/guida/sospensione-naspi',
    '/guida/nuovo-lavoro-durante-naspi',
    '/obblighi',
    '/obblighi/siisl',
    '/obblighi/cpi',
    '/obblighi/gol',
    '/obblighi/formazione',
    '/obblighi/naspi-com',
    '/obblighi/redditi',
    '/obblighi/sanzioni',
    '/news',
]);

const allLinks = (): RelatedLink[] => Object.values(RELATED_MAP).flat();

describe('related — formato href', () => {
    it('ogni href inizia con "/"', () => {
        for (const link of allLinks()) {
            expect(link.href.startsWith('/'), `href "${link.href}" non inizia con "/"`).toBe(true);
        }
    });

    it('ogni href è in lowercase (case-sensitive routing)', () => {
        for (const link of allLinks()) {
            expect(link.href, `href "${link.href}" deve essere lowercase`).toBe(
                link.href.toLowerCase(),
            );
        }
    });

    it('nessun href contiene spazi o caratteri sospetti', () => {
        const re = /^\/[a-z0-9\-/]*$/;
        for (const link of allLinks()) {
            expect(re.test(link.href), `href "${link.href}" non rispetta il regex slug`).toBe(true);
        }
    });

    it('nessun href termina con "/" (eccetto la root)', () => {
        for (const link of allLinks()) {
            if (link.href === '/') continue;
            expect(link.href.endsWith('/'), `href "${link.href}" non deve terminare con "/"`).toBe(
                false,
            );
        }
    });

    it('label e description non sono stringhe vuote', () => {
        for (const link of allLinks()) {
            expect(link.label.trim().length).toBeGreaterThan(0);
            expect(link.description.trim().length).toBeGreaterThan(0);
        }
    });
});

describe('related — coerenza chiavi mappa', () => {
    it('le chiavi della mappa sono lowercase, no leading slash, no trailing slash', () => {
        for (const key of Object.keys(RELATED_MAP)) {
            expect(key).toBe(key.toLowerCase());
            expect(key.startsWith('/')).toBe(false);
            expect(key.endsWith('/')).toBe(false);
        }
    });

    it('ogni voce contiene esattamente 3 link (specifica internal linking)', () => {
        for (const [key, links] of Object.entries(RELATED_MAP)) {
            expect(links.length, `slug "${key}" non ha 3 link`).toBe(3);
        }
    });

    it('una pagina non si linka a se stessa', () => {
        for (const [key, links] of Object.entries(RELATED_MAP)) {
            const selfHref = '/' + key;
            const selfHrefRoot = key === 'home' ? '/' : selfHref;
            for (const link of links) {
                expect(
                    link.href,
                    `slug "${key}" contiene un self-link verso "${link.href}"`,
                ).not.toBe(selfHrefRoot);
            }
        }
    });

    it('non ci sono link duplicati nello stesso gruppo', () => {
        for (const [key, links] of Object.entries(RELATED_MAP)) {
            const hrefs = links.map((l) => l.href);
            const unique = new Set(hrefs);
            expect(unique.size, `duplicati in "${key}": ${hrefs.join(', ')}`).toBe(hrefs.length);
        }
    });
});

describe('related — link risolvibili a pagine esistenti', () => {
    it('ogni href di RELATED_MAP punta a una pagina nota', () => {
        const broken: string[] = [];
        for (const [key, links] of Object.entries(RELATED_MAP)) {
            for (const link of links) {
                if (!KNOWN_PAGE_PATHS.has(link.href)) {
                    broken.push(`${key} -> ${link.href}`);
                }
            }
        }
        expect(broken, `Link interni rotti: ${broken.join('; ')}`).toEqual([]);
    });

    it('ogni chiave di RELATED_MAP corrisponde a una pagina nota (eccetto "home")', () => {
        const missing: string[] = [];
        for (const key of Object.keys(RELATED_MAP)) {
            if (key === 'home') continue;
            const expectedPath = '/' + key;
            if (!KNOWN_PAGE_PATHS.has(expectedPath)) {
                missing.push(expectedPath);
            }
        }
        expect(missing, `Chiavi senza pagina corrispondente: ${missing.join(', ')}`).toEqual([]);
    });
});

describe('related — relatedFor()', () => {
    it('ritorna i link configurati per uno slug noto', () => {
        const links = relatedFor('calcolatore');
        expect(links).toHaveLength(3);
        expect(links[0].href).toBe('/guida/presentare-domanda');
    });

    it('ritorna array vuoto per slug sconosciuto', () => {
        expect(relatedFor('slug-non-esistente')).toEqual([]);
    });

    it('ritorna riferimento al gruppo "home"', () => {
        const links = relatedFor('home');
        expect(links.length).toBe(3);
        expect(links.map((l) => l.href)).toContain('/calcolatore');
    });
});
