import type { Page } from '../types';

const ROUTE_MAP: Record<Page, string> = {
    home: '/',
    calculator: '/calcolatore',
    anticipo: '/anticipo',
    obligations: '/obblighi',
    guide: '/faq',
    'guide-book': '/manuale',
    office: '/contatti',
    apply: '/richiedi',
    privacy: '/privacy',
};

export const pageToUrl = (page: Page): string => ROUTE_MAP[page] ?? '/';

export const SITE_URL = 'https://domandedisoccupazione.it';

export const GOOGLE_BUSINESS_URL =
    'https://www.google.com/search?q=Centro+Pratiche+Flaiano+Via+Filoteo+Alberini+Roma';

export const NAV_LINKS: Array<{ label: string; href: string }> = [
    { label: 'Home', href: '/' },
    { label: 'Calcolatore', href: '/calcolatore' },
    { label: 'Guida', href: '/guida' },
    { label: 'Obblighi', href: '/obblighi' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Richiedi', href: '/richiedi' },
];
