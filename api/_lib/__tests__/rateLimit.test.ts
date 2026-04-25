import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

// NOTE: rateLimit.ts uses module-level Maps. To isolate tests we use
// `vi.resetModules()` + dynamic import to get a fresh state per test.

const HOUR_MS = 60 * 60 * 1000;

const importFresh = async () => {
    vi.resetModules();
    return await import('../rateLimit');
};

describe('rateLimit — checkRateLimit', () => {
    beforeEach(() => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date('2026-04-25T08:00:00Z'));
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('consente richieste sotto la soglia oraria', async () => {
        const { checkRateLimit } = await importFresh();
        for (let i = 0; i < 30; i++) {
            const r = checkRateLimit('1.1.1.1');
            expect(r.ok).toBe(true);
        }
    });

    it('blocca al superamento della soglia oraria (31a richiesta)', async () => {
        const { checkRateLimit } = await importFresh();
        for (let i = 0; i < 30; i++) checkRateLimit('2.2.2.2');
        const r = checkRateLimit('2.2.2.2');
        expect(r.ok).toBe(false);
        if (!r.ok) expect(r.reason).toBe('hourly');
    });

    it('reset finestra oraria dopo 1h: torna a consentire', async () => {
        const { checkRateLimit } = await importFresh();
        for (let i = 0; i < 30; i++) checkRateLimit('3.3.3.3');
        // Avanza poco oltre 1h
        vi.advanceTimersByTime(HOUR_MS + 1000);
        const r = checkRateLimit('3.3.3.3');
        expect(r.ok).toBe(true);
    });

    it('blocca al superamento della soglia giornaliera mantenendo finestra oraria valida', async () => {
        const { checkRateLimit } = await importFresh();
        // 5 finestre orarie da 30 = 150 ok, 151a deve cadere su 'daily'
        for (let cycle = 0; cycle < 5; cycle++) {
            for (let i = 0; i < 30; i++) {
                const r = checkRateLimit('4.4.4.4');
                expect(r.ok).toBe(true);
            }
            // avanza la finestra oraria, ma non quella giornaliera
            vi.advanceTimersByTime(HOUR_MS + 1000);
        }
        const r = checkRateLimit('4.4.4.4');
        expect(r.ok).toBe(false);
        if (!r.ok) expect(r.reason).toBe('daily');
    });

    it('IP diversi hanno bucket indipendenti', async () => {
        const { checkRateLimit } = await importFresh();
        for (let i = 0; i < 30; i++) checkRateLimit('5.5.5.5');
        const blockedSame = checkRateLimit('5.5.5.5');
        expect(blockedSame.ok).toBe(false);
        const otherIp = checkRateLimit('6.6.6.6');
        expect(otherIp.ok).toBe(true);
    });
});

describe('rateLimit — resolveClientIp', () => {
    it('usa il primo IP di x-forwarded-for', async () => {
        const { resolveClientIp } = await importFresh();
        const ip = resolveClientIp({
            headers: { 'x-forwarded-for': '203.0.113.1, 70.41.3.18, 150.172.238.178' },
        });
        expect(ip).toBe('203.0.113.1');
    });

    it('gestisce x-forwarded-for come array', async () => {
        const { resolveClientIp } = await importFresh();
        const ip = resolveClientIp({
            headers: { 'x-forwarded-for': ['198.51.100.5, 10.0.0.1'] },
        });
        expect(ip).toBe('198.51.100.5');
    });

    it('fallback su x-real-ip se x-forwarded-for assente', async () => {
        const { resolveClientIp } = await importFresh();
        const ip = resolveClientIp({ headers: { 'x-real-ip': '192.0.2.42' } });
        expect(ip).toBe('192.0.2.42');
    });

    it("ritorna 'unknown' se nessun header presente", async () => {
        const { resolveClientIp } = await importFresh();
        const ip = resolveClientIp({ headers: {} });
        expect(ip).toBe('unknown');
    });

    it('rimuove gli spazi attorno al primo IP', async () => {
        const { resolveClientIp } = await importFresh();
        const ip = resolveClientIp({ headers: { 'x-forwarded-for': '  203.0.113.7  ,  10.0.0.1' } });
        expect(ip).toBe('203.0.113.7');
    });
});
