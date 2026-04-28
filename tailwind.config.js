/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{astro,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            // Design system "Adriatic Blue" - allineato al sito principale
            // praticheflaiano-sito.vercel.app per continuita brand.
            colors: {
                brand: {
                    50: '#EEF3F8',
                    100: '#DEE7F0',
                    200: '#C9D6E4',
                    300: '#97AEC8',
                    400: '#6FA0DA',
                    500: '#2E78D6',
                    600: '#1E6CC9',
                    700: '#0A4DA2',
                    800: '#083D82',
                    900: '#062F66',
                    950: '#0C1B2E',
                },
                accent: {
                    50: '#EAF7FB',
                    100: '#CCEBF5',
                    200: '#95D6EB',
                    300: '#6FC6E8',
                    400: '#18A0D8',
                    500: '#1391C5',
                    600: '#0E7AAB',
                    700: '#0B6086',
                    800: '#094862',
                    900: '#062F66',
                },
                gold: {
                    DEFAULT: '#E8B547',
                    soft: '#F2D080',
                },
                ink: {
                    DEFAULT: '#0C1B2E',
                    soft: '#2A3D54',
                    muted: '#5C7089',
                },
                paper: '#FFFFFF',
                line: {
                    DEFAULT: '#C9D6E4',
                    strong: '#97AEC8',
                },
            },
            fontFamily: {
                sans: ['"Public Sans"', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
                display: ['Newsreader', 'Source Serif 4', 'Georgia', 'serif'],
                mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
            },
            boxShadow: {
                'soft': '0 1px 2px rgba(10, 77, 162, 0.05), 0 4px 12px rgba(10, 77, 162, 0.06)',
                'card': '0 1px 2px rgba(10, 77, 162, 0.07), 0 12px 32px rgba(10, 77, 162, 0.08)',
                'lift': '0 4px 8px rgba(10, 77, 162, 0.10), 0 24px 48px rgba(10, 77, 162, 0.12)',
                'cta': '0 1px 2px rgba(0, 0, 0, 0.08), 0 6px 18px rgba(10, 77, 162, 0.28)',
            },
        },
    },
    plugins: [],
}
