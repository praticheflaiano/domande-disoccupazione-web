/** @type {import('tailwindcss').Config} */
// Grafica "giovane" condivisa con info.praticheflaiano.it (nov 2026):
// viola #5B3DF5, lime #D4FF4F, inchiostro #14142B, rosa #FF5C8A.
// Le palette blue/indigo/teal/slate sono rimappate cosi tutti i componenti
// esistenti prendono i nuovi colori senza riscrivere le classi.
const violet = {
    50: '#F1EEFF', 100: '#E4DEFF', 200: '#CFC5FF', 300: '#B0A1FF', 400: '#8B73FF',
    500: '#6E52F8', 600: '#5B3DF5', 700: '#4B2FE0', 800: '#3A20C0', 900: '#2A1A8F', 950: '#14142B',
};
const pink = {
    50: '#FFF0F4', 100: '#FFE3EC', 200: '#FFC2D3', 300: '#FF9AB5', 400: '#FF7AA0',
    500: '#FF5C8A', 600: '#E0336B', 700: '#C21F55', 800: '#9E1844', 900: '#7A1235', 950: '#4A0A20',
};
const ink = {
    50: '#F7F7FB', 100: '#F1F1F7', 200: '#E4E4EE', 300: '#C9C9DA', 400: '#A3A3BD',
    500: '#6B6B85', 600: '#4E4E6A', 700: '#3F3F5A', 800: '#26263F', 900: '#14142B', 950: '#0B0B1A',
};
const lime = {
    50: '#F8FFE3', 100: '#EEFFC2', 200: '#E4FF94', 300: '#D4FF4F', 400: '#D4FF4F',
    500: '#C2EE3A', 600: '#8DB51A', 700: '#5E7A00', 800: '#4A6100', 900: '#344400', 950: '#1E2800',
};
export default {
    content: [
        './index.html',
        './src/**/*.{astro,html,js,ts,jsx,tsx,md,mdx}',
    ],
    theme: {
        extend: {
            colors: { blue: violet, indigo: violet, sky: violet, cyan: violet, teal: pink, slate: ink, gray: ink, lime, ink: ink[900] },
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
                display: ['"Bricolage Grotesque"', 'Inter', 'system-ui', 'sans-serif'],
                serif: ['"Bricolage Grotesque"', 'Inter', 'sans-serif'],
            },
            borderRadius: { lg: '14px', xl: '20px', '2xl': '28px', '3xl': '36px' },
            boxShadow: { cta: '0 6px 0 #14142B', 'cta-sm': '0 3px 0 #14142B' },
        },
    },
    plugins: [],
};
