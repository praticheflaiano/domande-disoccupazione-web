// Collegamenti dal portale al sito ufficiale praticheflaiano.it, scelti in base alla pagina.
// Regola di Antonio: praticheflaiano.it è il sito ufficiale, ogni pagina del portale lo collega.
// Indirizzi senza barra finale (sul sito la barra produce un rimando).

export const SITO = 'https://praticheflaiano.it';

export interface SitoLink {
    href: string;
    label: string;
    description: string;
}

const NASPI: SitoLink = { href: `${SITO}/naspi`, label: 'Domanda NASpI gratis con il patronato', description: 'Il servizio del Centro Pratiche Flaiano: a Roma o a distanza.' };
const PRENOTA: SitoLink = { href: `${SITO}/prenota`, label: 'Prenota un appuntamento', description: 'In ufficio a Roma Vigne Nuove o in videochiamata.' };
const BLOG: SitoLink = { href: `${SITO}/blog/categoria/naspi-disoccupazione`, label: 'Novità su NASpI e lavoro', description: 'Gli articoli aggiornati del blog di praticheflaiano.it.' };
const DIMISSIONI: SitoLink = { href: `${SITO}/dimissioni-online`, label: 'Dimissioni online con assistenza', description: 'Volontarie, per giusta causa e revoca, anche senza SPID.' };
const SIISL: SitoLink = { href: `${SITO}/siisl`, label: 'SIISL: come si fa e quanto costa farlo con noi', description: 'Curriculum e patto di attivazione digitale entro 15 giorni.' };
const FONDO: SitoLink = { href: `${SITO}/blog/fondo-garanzia-inps-tfr-stipendi-non-pagati-roma`, label: 'Fondo di garanzia: come ti aiutiamo', description: 'TFR e stipendi non pagati: cosa facciamo noi per te.' };
const MATERNITA: SitoLink = { href: `${SITO}/calcolo-maternita-congedi`, label: 'Calcolo maternità e congedi', description: 'Date e importi di maternità, paternità e congedo parentale.' };
const SETTE30: SitoLink = { href: `${SITO}/730`, label: 'Modello 730 con la NASpI', description: 'Dichiarazione dei redditi con due Certificazioni Uniche.' };

/** Tre collegamenti al sito ufficiale adatti alla pagina (chiave come in RELATED_MAP). */
export function sitoLinksFor(current: string): SitoLink[] {
    const slug = current.replace(/^\/+|\/+$/g, '');
    if (slug.startsWith('guida/dimissioni-stipendio') || slug === 'guida/fondo-garanzia-tfr') return [FONDO, DIMISSIONI, PRENOTA];
    if (slug.startsWith('guida/dimissioni-')) return [DIMISSIONI, NASPI, PRENOTA];
    if (slug.startsWith('obblighi')) return [SIISL, NASPI, PRENOTA];
    if (slug === 'guida/maternita-malattia') return [MATERNITA, NASPI, PRENOTA];
    if (slug === 'guida/fiscalita') return [SETTE30, NASPI, PRENOTA];
    return [NASPI, PRENOTA, BLOG];
}
