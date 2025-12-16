export interface NewsItem {
    id: string;
    title: string;
    date: string;
    category: 'Normativa' | 'Pagamenti' | 'Bonus' | 'Agricola';
    summary: string;
    content: string;
    source: string;
    isImportant?: boolean;
}

export const newsData: NewsItem[] = [
    {
        id: '1',
        title: 'Nuova Stretta Anti-Abusi: Requisito 13 Settimane',
        date: '2025-06-05',
        category: 'Normativa',
        summary: 'La Circolare INPS n. 98/2025 introduce un nuovo requisito per chi richiede la NASpI dopo dimissioni volontarie seguite da breve rioccupazione.',
        content: `Dal 1° Gennaio 2025, per contrastare l'uso distorto della NASpI, è stato introdotto un nuovo vincolo. 
        Se il rapporto di lavoro cessa involontariamente (es. licenziamento o scadenza termine) ma è stato preceduto nei 12 mesi precedenti da dimissioni volontarie o risoluzione consensuale presso altro datore:
        Per accedere alla NASpI è necessario aver maturato almeno 13 settimane di contribuzione effettiva nel periodo intercorrente tra le dimissioni e l'ultima cessazione.
        Questo impedisce la pratica di dimettersi da un posto fisso per farsi assumere brevemente altrove al solo scopo di accedere al sussidio.`,
        source: 'Circolare INPS n. 98 del 05/06/2025',
        isImportant: true
    },
    {
        id: '2',
        title: 'Bonus SAR 2025 per Ex-Somministrati',
        date: '2025-12-01',
        category: 'Bonus',
        summary: 'Sostegno al reddito fino a 1.000€ per disoccupati che hanno lavorato con agenzie interinali.',
        content: `Confermato anche per il 2025 il Bonus SAR (Sostegno al Reddito). 
        Requisiti:
        1. Essere disoccupati da almeno 45 giorni.
        2. Aver lavorato in somministrazione per almeno 110 giorni (o 440 ore) negli ultimi 12 mesi per il bonus da 1.000€.
        3. Oppure 90 giorni (o 360 ore) per il bonus ridotto da 780€.
        La domanda va presentata su piattaforma Forma.Temp tra il 106° e il 173° giorno dalla cessazione.`,
        source: 'Forma.Temp / Ministero Lavoro'
    },
    {
        id: '3',
        title: 'Pagamenti NASpI Dicembre 2025 Anticipati',
        date: '2025-12-02',
        category: 'Pagamenti',
        summary: 'L\'INPS anticipa le valute per le festività natalizie. Accrediti in arrivo.',
        content: `Per agevolare le famiglie nel periodo festivo, i flussi di pagamento NASpI relativi a Novembre 2025 sono stati anticipati. 
        Le valute di accredito sui conti correnti sono previste a partire da venerdì 5 Dicembre 2025.
        Si consiglia di verificare il Fascicolo Previdenziale del Cittadino per la data esatta.`,
        source: 'Comunicato INPS'
    },
    {
        id: '4',
        title: 'Disoccupazione Agricola: Novità CISOA',
        date: '2025-12-03',
        category: 'Agricola',
        summary: 'Equiparazione dei periodi CISOA per emergenze climatiche ai fini del calcolo contributivo.',
        content: `La Circolare INPS n. 149/2025 conferma che i periodi di Cassa Integrazione Agricola (CISOA) fruiti nel secondo semestre 2025 per eventi climatici avversi 
        saranno conteggiati come giornate di lavoro effettivo. Questo è fondamentale per raggiungere il requisito delle 102 giornate necessario per la disoccupazione agricola 2026.`,
        source: 'Circolare INPS n. 149 del 03/12/2025'
    }
];
