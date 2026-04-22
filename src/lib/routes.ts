import type { Page } from '../types';

const ROUTE_MAP: Record<Page, string> = {
    home: '/',
    calculator: '/calcolatore',
    anticipo: '/anticipo',
    obligations: '/obblighi',
    guide: '/guida',
    'guide-book': '/manuale',
    office: '/contatti',
    apply: '/richiedi',
    privacy: '/privacy',
};

export const pageToUrl = (page: Page): string => ROUTE_MAP[page] ?? '/';

export const SITE_URL = 'https://domandedisoccupazione.it';

export const NAV_LINKS: Array<{ label: string; href: string }> = [
    { label: 'Home', href: '/' },
    { label: 'Calcolatore', href: '/calcolatore' },
    { label: 'Anticipo', href: '/anticipo' },
    { label: 'Obblighi', href: '/obblighi' },
    { label: 'FAQ', href: '/guida' },
    { label: 'Chi siamo', href: '/chi-siamo' },
];
