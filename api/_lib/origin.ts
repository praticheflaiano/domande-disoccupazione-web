const ALLOWED_HOSTS = [
    'domandedisoccupazione.it',
    'www.domandedisoccupazione.it',
    'localhost',
    '127.0.0.1',
];

const isAllowedOrigin = (origin: string | undefined): boolean => {
    if (!origin) return false;
    try {
        const url = new URL(origin);
        if (ALLOWED_HOSTS.includes(url.hostname)) return true;
        return url.hostname.endsWith('.vercel.app');
    } catch {
        return false;
    }
};

export const assertAllowedOrigin = (req: { headers: Record<string, string | string[] | undefined> }): boolean => {
    const origin = req.headers['origin'];
    const originStr = Array.isArray(origin) ? origin[0] : origin;
    if (isAllowedOrigin(originStr)) return true;

    const referer = req.headers['referer'];
    const refererStr = Array.isArray(referer) ? referer[0] : referer;
    return isAllowedOrigin(refererStr);
};
