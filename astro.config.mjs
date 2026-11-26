import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/static';

export default defineConfig({
    site: 'https://domandedisoccupazione.it',
    output: 'static',
    // Un solo indirizzo per pagina: senza barra finale (come i link interni e come praticheflaiano.it).
    // L'adattatore Vercel aggiunge da solo il rimando 308 da /pagina/ a /pagina e la sitemap usa la stessa forma.
    trailingSlash: 'never',
    adapter: vercel({ webAnalytics: { enabled: false } }),
    integrations: [
        react(),
        tailwind({ applyBaseStyles: false }),
        sitemap({
            // Le pagine trasferite su praticheflaiano.it (rimando permanente in vercel.json) restano fuori dalla sitemap.
            filter: (page) =>
                !page.includes('/api/') &&
                !/\/(calcolatore|anticipo|guida\/presentare-domanda|guida\/fondo-garanzia-tfr|guida\/ricorso|guida\/pagamenti-accredito|guida\/nuovo-lavoro-durante-naspi|guida\/did|guida\/sospensione-naspi)\/?$/.test(page),
        }),
    ],
    vite: {
        resolve: {
            alias: { '@': '/src' },
        },
    },
});
