import { describe, it, expect } from 'vitest';
import { assertAllowedOrigin } from '../origin';

const buildReq = (headers: Record<string, string | string[] | undefined>) => ({ headers });

describe('origin — assertAllowedOrigin', () => {
    it('accetta domandedisoccupazione.it', () => {
        expect(assertAllowedOrigin(buildReq({ origin: 'https://domandedisoccupazione.it' }))).toBe(true);
    });

    it('accetta www.domandedisoccupazione.it', () => {
        expect(assertAllowedOrigin(buildReq({ origin: 'https://www.domandedisoccupazione.it' }))).toBe(true);
    });

    it('accetta localhost', () => {
        expect(assertAllowedOrigin(buildReq({ origin: 'http://localhost:4321' }))).toBe(true);
    });

    it('accetta 127.0.0.1', () => {
        expect(assertAllowedOrigin(buildReq({ origin: 'http://127.0.0.1:3000' }))).toBe(true);
    });

    it('accetta sotto-dominio *.vercel.app', () => {
        expect(assertAllowedOrigin(buildReq({ origin: 'https://branch-preview.vercel.app' }))).toBe(true);
    });

    it('rifiuta domini estranei', () => {
        expect(assertAllowedOrigin(buildReq({ origin: 'https://evil.example.com' }))).toBe(false);
    });

    it("rifiuta se origin è una stringa non valida (URL malformato)", () => {
        expect(assertAllowedOrigin(buildReq({ origin: 'not-a-url' }))).toBe(false);
    });

    it('rifiuta se origin assente e referer assente', () => {
        expect(assertAllowedOrigin(buildReq({}))).toBe(false);
    });

    it('fallback al referer se origin mancante', () => {
        expect(
            assertAllowedOrigin(
                buildReq({ referer: 'https://www.domandedisoccupazione.it/calcolatore' }),
            ),
        ).toBe(true);
    });

    it("rifiuta vercel.app non come sotto-dominio (es. 'vercel.app.attacker.com')", () => {
        expect(assertAllowedOrigin(buildReq({ origin: 'https://vercel.app.attacker.com' }))).toBe(false);
    });

    it("gestisce header come array prendendo il primo", () => {
        expect(
            assertAllowedOrigin(
                buildReq({ origin: ['https://domandedisoccupazione.it', 'https://other.com'] }),
            ),
        ).toBe(true);
    });

    it("rifiuta dominio simile (suffix non delimitato)", () => {
        // 'mydomandedisoccupazione.it' non e' nella allowlist
        expect(
            assertAllowedOrigin(buildReq({ origin: 'https://mydomandedisoccupazione.it' })),
        ).toBe(false);
    });
});
