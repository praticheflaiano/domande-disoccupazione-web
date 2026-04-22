import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/static';

export default defineConfig({
    site: 'https://domandedisoccupazione.it',
    output: 'static',
    adapter: vercel({ webAnalytics: { enabled: false } }),
    integrations: [
        react(),
        tailwind({ applyBaseStyles: false }),
        sitemap({
            filter: (page) => !page.includes('/api/'),
        }),
    ],
    vite: {
        resolve: {
            alias: { '@': '/src' },
        },
    },
});
