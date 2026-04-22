// Rate-limiter in-memory (per-instance). Best-effort: le istanze serverless
// vengono riciclate e replicate, quindi il limite NON e' globale.
// Per hard-limit cross-instance migrare a Upstash Redis / Vercel KV.

type Bucket = { count: number; windowStart: number };

const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;

const hourly = new Map<string, Bucket>();
const daily = new Map<string, Bucket>();

const HOURLY_LIMIT = 30;
const DAILY_LIMIT = 150;

const take = (store: Map<string, Bucket>, key: string, limit: number, windowMs: number): boolean => {
    const now = Date.now();
    const bucket = store.get(key);
    if (!bucket || now - bucket.windowStart > windowMs) {
        store.set(key, { count: 1, windowStart: now });
        return true;
    }
    if (bucket.count >= limit) return false;
    bucket.count += 1;
    return true;
};

export const checkRateLimit = (ip: string): { ok: true } | { ok: false; reason: 'hourly' | 'daily' } => {
    if (!take(hourly, ip, HOURLY_LIMIT, HOUR_MS)) return { ok: false, reason: 'hourly' };
    if (!take(daily, ip, DAILY_LIMIT, DAY_MS)) return { ok: false, reason: 'daily' };
    return { ok: true };
};

export const resolveClientIp = (req: { headers: Record<string, string | string[] | undefined> }): string => {
    const xff = req.headers['x-forwarded-for'];
    const raw = Array.isArray(xff) ? xff[0] : xff;
    if (raw) return raw.split(',')[0].trim();
    const real = req.headers['x-real-ip'];
    return (Array.isArray(real) ? real[0] : real) || 'unknown';
};
