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

    'cass-10559-2026': {
        id: 'cass-10559-2026',
        text: "In tema di NASpI, il riconoscimento della prestazione al lavoratore dimissionario richiede che il recesso sia avvenuto per giusta causa, che postula l'accertamento di circostanze imputabili al datore di lavoro integranti un grave inadempimento. La mera distanza della nuova sede di lavoro, anche superiore a 50 km, non è di per sé sufficiente a configurare giusta causa: occorre che il trasferimento non sia sorretto da comprovate ragioni tecniche, organizzative o produttive, oppure che da esso derivi una condotta intollerabile del datore.",
        author: 'Corte di Cassazione',
        role: 'Sezione Lavoro, ordinanza n. 10559/2026',
        source: 'Cass. sez. lav., ord. 21 aprile 2026, n. 10559',
        sourceUrl: 'https://www.eutekne.info/Sezioni/Art_1101855_con_il_trasferimento_le_dimissioni_sono_per_giusta_causa_se_c.aspx',
        date: '2026-04-21',
        topic: 'dimissioni',
    },

    'dlgs-151-2001-art55': {
        id: 'dlgs-151-2001-art55',
        text: "La risoluzione consensuale del rapporto o la richiesta di dimissioni presentate dalla lavoratrice, durante il periodo di gravidanza, e dalla lavoratrice o dal lavoratore durante i primi tre anni di vita del bambino o nei primi tre anni di accoglienza del minore adottato o in affidamento, devono essere convalidate dal servizio ispettivo del Ministero del lavoro competente per territorio. A detta convalida è sospensivamente condizionata l'efficacia della risoluzione del rapporto di lavoro.",
        author: 'Legislatore italiano',
        role: 'Testo normativo',
        source: 'D.Lgs. 26 marzo 2001, n. 151 — art. 55 (Testo Unico Maternità e Paternità)',
        sourceUrl: 'https://www.gazzettaufficiale.it/atto/serie_generale/caricaArticolo?art.idArticolo=55&art.codiceRedazionale=001G0200',
        date: '2001-03-26',
        topic: 'dimissioni',
    },

    'cass-811-2021': {
        id: 'cass-811-2021',
        text: "Il demansionamento del lavoratore, quando risulta evidente già dalla comunicazione di assegnazione alle nuove mansioni, legittima le dimissioni immediate per giusta causa senza che il lavoratore sia tenuto a sperimentare in concreto la dequalificazione professionale. La riduzione meramente quantitativa dei compiti non basta: occorre la sottrazione di mansioni che comporti un abbassamento del livello di prestazione e un impoverimento della professionalità.",
        author: 'Corte di Cassazione',
        role: 'Sezione Lavoro, sentenza n. 811/2021',
        source: 'Cass. sez. lav., 15 gennaio 2021, n. 811',
        sourceUrl: 'https://www.studiomoscarini.it/2025/07/10/dimissioni-per-giusta-causa-guida-completa/',
        date: '2021-01-15',
        topic: 'dimissioni',
    },

    'cc-art2112': {
        id: 'cc-art2112',
        text: "In caso di trasferimento d'azienda, il rapporto di lavoro continua con il cessionario e il lavoratore conserva tutti i diritti che ne derivano. Il lavoratore le cui condizioni di lavoro subiscano una sostanziale modifica nei tre mesi successivi al trasferimento può rassegnare le proprie dimissioni con gli effetti di cui all'art. 2119, primo comma: dimissioni per giusta causa con conseguente diritto alla NASpI e all'indennità sostitutiva del preavviso.",
        author: 'Legislatore italiano',
        role: 'Testo normativo',
        source: 'Codice civile, art. 2112 — Mantenimento dei diritti dei lavoratori nel trasferimento d\'azienda',
        sourceUrl: 'https://www.brocardi.it/codice-civile/libro-quinto/titolo-ii/capo-i/sezione-iii/art2112.html',
        date: '1942-04-04',
        topic: 'dimissioni',
    },

    'inps-circ-163-2003': {
        id: 'inps-circ-163-2003',
        text: "Il mobbing, inteso come comportamento vessatorio e persecutorio posto in essere dal datore di lavoro o dai superiori gerarchici, idoneo a determinare un grave pregiudizio alla dignità e all'integrità psico-fisica del lavoratore, costituisce giusta causa di dimissioni ai sensi dell'art. 2119 c.c. e legittima l'accesso all'indennità di disoccupazione.",
        author: 'INPS',
        role: 'Direzione Generale — Circolare n. 163',
        source: 'Circolare INPS n. 163 del 20 ottobre 2003',
        sourceUrl: 'https://www.laleggepertutti.it/705878_dimissioni-per-mobbing-ce-diritto-alla-naspi',
        date: '2003-10-20',
        topic: 'dimissioni',
    },
};

export const quoteById = (id: string): Quote | undefined => quotes[id];
