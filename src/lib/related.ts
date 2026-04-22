// Mappa di internal linking topico: per ogni pagina, 3 link contestuali
// a pagine semanticamente correlate. Anchor text descrittivo (no "clicca qui").
// Scopo: aumentare topical authority + ridurre pogo-sticking.

export interface RelatedLink {
    href: string;
    label: string;
    description: string;
}

const CALC = {
    href: '/calcolatore',
    label: 'Calcolatore NASpI 2026',
    description: 'Stima importo lordo, netto e durata con i parametri INPS 2026.',
};
const ANTICIPO = {
    href: '/anticipo',
    label: 'Anticipo NASpI in unica soluzione',
    description: 'Liquidazione anticipata per avvio P.IVA o cooperativa.',
};
const MANUALE = {
    href: '/manuale',
    label: 'Manuale NASpI completo',
    description: 'Compatibilità, sospensione, decadenza: la guida lunga.',
};
const CHISIAMO = {
    href: '/chi-siamo',
    label: 'Centro Pratiche Flaiano',
    description: 'Chi siamo, competenze, sede e fonti normative.',
};
const RICHIEDI = {
    href: '/richiedi',
    label: 'Invia la domanda online',
    description: 'Servizio di invio telematico con assistenza in 24 ore.',
};

// Guida operativa
const G_DOMANDA = {
    href: '/guida/presentare-domanda',
    label: 'Come presentare la domanda',
    description: 'Portale INPS passo-passo, SPID, modulo SR163, scadenza 68 giorni.',
};
const G_DID = {
    href: '/guida/did',
    label: 'DID online',
    description: 'Dichiarazione di Immediata Disponibilità al lavoro.',
};
const G_FISCALITA = {
    href: '/guida/fiscalita',
    label: 'Fiscalità della NASpI',
    description: '730, CU, conguaglio IRPEF e detrazioni.',
};
const G_ANF = {
    href: '/guida/anf',
    label: 'Assegno Nucleo Familiare',
    description: 'ANF durante la NASpI: importi 2026 e compatibilità.',
};
const G_MATERNITA = {
    href: '/guida/maternita-malattia',
    label: 'Maternità e malattia',
    description: 'Sospensione NASpI e indennità sostitutiva.',
};
const G_ESTERO = {
    href: '/guida/estero-u2',
    label: 'NASpI all\'estero (modulo U2)',
    description: 'Portabilità UE per 3 mesi, come richiedere.',
};
const G_RICORSO = {
    href: '/guida/ricorso',
    label: 'Domanda rigettata: fare ricorso',
    description: 'Ricorso amministrativo 90 giorni e giudiziale.',
};

// Obblighi
const O_SIISL = {
    href: '/obblighi/siisl',
    label: 'SIISL e firma PAD',
    description: 'Primo obbligo: 15 giorni per firmare il Patto di Attivazione Digitale.',
};
const O_CPI = {
    href: '/obblighi/cpi',
    label: 'Centro per l\'Impiego',
    description: 'Convocazione, PSP, offerta di lavoro congrua.',
};
const O_GOL = {
    href: '/obblighi/gol',
    label: 'Programma GOL',
    description: 'I 4 percorsi di attivazione e come vieni assegnato.',
};
const O_FORMAZIONE = {
    href: '/obblighi/formazione',
    label: 'Corsi di formazione',
    description: 'Dove cercare i corsi finanziati: SIISL, enti accreditati.',
};
const O_NASPICOM = {
    href: '/obblighi/naspi-com',
    label: 'NASpI-Com: comunicare nuovi redditi',
    description: 'Modulo obbligatorio entro 30 giorni per ogni nuova attività.',
};
const O_REDDITI = {
    href: '/obblighi/redditi',
    label: 'Redditi compatibili',
    description: 'Soglie 2026: subordinato 8.500 €, autonomo 5.500 €.',
};
const O_SANZIONI = {
    href: '/obblighi/sanzioni',
    label: 'Sanzioni e decadenza',
    description: 'Decurtazioni, sospensione, perdita NASpI: come evitarle.',
};

// News e FAQ
const FAQ_PAGE = {
    href: '/faq',
    label: 'FAQ NASpI 2026',
    description: 'Domande frequenti: requisiti, dimissioni, giusta causa.',
};
const DIS_COLL = {
    href: '/dis-coll',
    label: 'DIS-COLL per co.co.co.',
    description: 'Disoccupazione per collaboratori coordinati: requisiti 2026.',
};
const GUIDA_HUB = {
    href: '/guida',
    label: 'Guida operativa NASpI',
    description: 'Hub delle 7 guide pratiche: domanda, DID, fiscalità, ricorso.',
};
const OBBLIGHI_HUB = {
    href: '/obblighi',
    label: 'Obblighi del percettore NASpI',
    description: 'Cronologia completa: SIISL, CPI, GOL, NASpI-Com, sanzioni.',
};

export const RELATED_MAP: Record<string, RelatedLink[]> = {
    // Hub
    'home': [CALC, GUIDA_HUB, OBBLIGHI_HUB],
    'calcolatore': [G_DOMANDA, ANTICIPO, G_FISCALITA],
    'anticipo': [CALC, G_DOMANDA, DIS_COLL],
    'richiedi': [G_DOMANDA, O_SIISL, CHISIAMO],
    'faq': [GUIDA_HUB, OBBLIGHI_HUB, MANUALE],
    'manuale': [GUIDA_HUB, O_SIISL, O_SANZIONI],
    'contatti': [CHISIAMO, RICHIEDI, CALC],
    'chi-siamo': [MANUALE, CALC, RICHIEDI],
    'dis-coll': [CALC, G_DOMANDA, CHISIAMO],
    'guida': [CALC, OBBLIGHI_HUB, FAQ_PAGE],
    'obblighi': [GUIDA_HUB, G_DOMANDA, FAQ_PAGE],

    // Guide
    'guida/presentare-domanda': [G_DID, O_SIISL, CALC],
    'guida/did': [O_SIISL, G_DOMANDA, G_MATERNITA],
    'guida/fiscalita': [G_ANF, O_REDDITI, G_ESTERO],
    'guida/anf': [G_FISCALITA, O_REDDITI, CALC],
    'guida/maternita-malattia': [O_NASPICOM, G_RICORSO, G_FISCALITA],
    'guida/estero-u2': [O_NASPICOM, G_DOMANDA, G_DID],
    'guida/ricorso': [O_SANZIONI, G_DOMANDA, CHISIAMO],

    // Obblighi
    'obblighi/siisl': [O_CPI, O_GOL, G_DID],
    'obblighi/cpi': [O_GOL, O_FORMAZIONE, O_SANZIONI],
    'obblighi/gol': [O_FORMAZIONE, O_CPI, O_SIISL],
    'obblighi/formazione': [O_GOL, O_CPI, CHISIAMO],
    'obblighi/naspi-com': [O_REDDITI, G_FISCALITA, O_SANZIONI],
    'obblighi/redditi': [O_NASPICOM, G_FISCALITA, G_ANF],
    'obblighi/sanzioni': [G_RICORSO, O_NASPICOM, O_CPI],
};

export function relatedFor(slug: string): RelatedLink[] {
    return RELATED_MAP[slug] ?? [];
}
