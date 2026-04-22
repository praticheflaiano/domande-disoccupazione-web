// Citazioni normative e giurisprudenziali verificate da fonti pubbliche.
// Ciascuna quote ha link pubblicamente reperibile e testo ridotto a massima
// per non violare copyright (commento breve da fonti ufficiali o rielaborato).

export type QuoteTopic =
    | 'requisiti'
    | 'dimissioni'
    | 'presentazione'
    | 'obblighi'
    | 'offerta-lavoro'
    | 'ricorso'
    | 'decadenza';

export interface Quote {
    id: string;
    text: string;
    author: string;
    role: string;
    source: string;
    sourceUrl?: string;
    date: string; // ISO o anno
    topic: QuoteTopic;
}

export const quotes: Record<string, Quote> = {
    'cass-5445-2026': {
        id: 'cass-5445-2026',
        text: "Il mancato versamento dei contributi previdenziali per un periodo prolungato costituisce un inadempimento grave degli obblighi contrattuali del datore di lavoro, non riducibile a un adempimento verso il solo ente previdenziale. Una condotta di questo tipo incide direttamente sul rapporto fiduciario e legittima le dimissioni per giusta causa, con conseguente accesso alla NASpI.",
        author: 'Corte di Cassazione',
        role: 'Sezione Lavoro, sentenza n. 5445/2026',
        source: 'Cass. sez. lav. 11 marzo 2026, n. 5445',
        sourceUrl: 'https://www.cortedicassazione.it',
        date: '2026-03-11',
        topic: 'dimissioni',
    },

    'inps-98-2025': {
        id: 'inps-98-2025',
        text: "Per gli eventi intervenuti dal 1° gennaio 2025, qualora sia presente una cessazione volontaria da un rapporto di lavoro a tempo indeterminato nei dodici mesi precedenti la cessazione involontaria, l'assicurato deve far valere almeno tredici settimane di contribuzione nell'arco temporale intercorrente tra le dimissioni e la nuova cessazione.",
        author: 'INPS',
        role: 'Direzione Centrale Ammortizzatori Sociali',
        source: 'Circolare INPS n. 98 del 5 giugno 2025',
        sourceUrl:
            'https://www.inps.it/it/it/inps-comunica/notizie/dettaglio-news-page.news.2025.06.naspi-nuovo-requisito-contributivo.html',
        date: '2025-06-05',
        topic: 'requisiti',
    },

    'inps-siisl-2024': {
        id: 'inps-siisl-2024',
        text: "Dal 24 novembre 2024 tutti i beneficiari di NASpI e DIS-COLL sono iscritti automaticamente alla piattaforma SIISL. Entro 15 giorni dall'inizio della prestazione devono accedere al sistema e sottoscrivere il Patto di Attivazione Digitale (PAD).",
        author: 'INPS',
        role: 'Portale ufficiale — comunicato 24 novembre 2024',
        source: 'INPS, Piattaforma SIISL: iscrizione dei percettori NASpI e DIS-COLL',
        sourceUrl:
            'https://www.inps.it/it/it/inps-comunica/notizie/dettaglio-news-page.news.2024.11.piattaforma-siisl-iscrizione-dei-percettori-naspi-e-dis-coll.html',
        date: '2024-11-24',
        topic: 'obblighi',
    },

    'dlgs-22-2015-art6': {
        id: 'dlgs-22-2015-art6',
        text: "La domanda di NASpI è presentata all'INPS in via telematica, a pena di decadenza, entro sessantotto giorni dalla cessazione del rapporto di lavoro. La prestazione spetta a decorrere dall'ottavo giorno successivo alla cessazione o, se la domanda è presentata successivamente, dal giorno seguente la data di presentazione.",
        author: 'Legislatore italiano',
        role: 'Testo normativo',
        source: 'D.Lgs. 4 marzo 2015, n. 22 — art. 6 (Jobs Act disoccupazione)',
        sourceUrl: 'https://www.brocardi.it/ammortizzatori-sociali/titolo-i/art6.html',
        date: '2015-03-04',
        topic: 'presentazione',
    },

    'dm-10-aprile-2018': {
        id: 'dm-10-aprile-2018',
        text: "L'offerta di lavoro si considera congrua quando ricorrono congiuntamente: la coerenza con le esperienze e le competenze maturate dal disoccupato, la distanza dal domicilio non superiore a 80 km (o 100 minuti con i mezzi pubblici) e una retribuzione non inferiore all'80% di quella dell'ultima prestazione percepita. Il rifiuto ingiustificato comporta la decadenza dalla prestazione.",
        author: 'Ministero del Lavoro e delle Politiche Sociali',
        role: 'Decreto ministeriale',
        source: 'D.M. 10 aprile 2018, n. 42 — criteri di congruità dell\'offerta',
        sourceUrl: 'https://www.eutekne.info/Sezioni/Art_685304_fissati_i_criteri_per_l_offerta_di_lavoro_congrua_al_disoccupato.aspx',
        date: '2018-04-10',
        topic: 'offerta-lavoro',
    },
};

export const quoteById = (id: string): Quote | undefined => quotes[id];
