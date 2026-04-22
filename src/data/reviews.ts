// Recensioni reali di Centro Pratiche Flaiano su Google Business Profile.
// Fino a quando questo array resta vuoto, il sito mostra un invito a leggere
// le recensioni direttamente su Google (scelta etica: Google penalizza i
// rating inventati con structured data rimosso dalle SERP).
//
// COME AGGIORNARLO (titolare — 5 minuti):
//   1. Login su business.google.com col profilo Centro Pratiche Flaiano.
//   2. Tab "Recensioni": copia nome autore, data, testo delle migliori 5/5.
//   3. Compila GOOGLE_STATS con media e conteggio reali (leggibili in dashboard).
//   4. Aggiungi un oggetto a `reviews` per ciascuna recensione.
//   5. Salva, commit, push. Il sito attiverà automaticamente
//      AggregateRating JSON-LD e il carosello visibile.

export interface Review {
    author: string;
    date: string; // ISO YYYY-MM-DD
    rating: 1 | 2 | 3 | 4 | 5;
    text: string;
}

export interface GoogleStats {
    average: number; // es. 4.9
    count: number;   // es. 187
    profileUrl: string;
}

// Quando disponibili, compilare qui i dati reali dal Google Business Profile.
export const GOOGLE_STATS: GoogleStats | null = null;

export const reviews: Review[] = [
    // Esempio formato (sostituire con recensioni reali dal GBP):
    // {
    //     author: 'Maria R.',
    //     date: '2025-09-14',
    //     rating: 5,
    //     text: 'Pratica NASpI gestita in 24 ore, personale competente e cordiale. Consigliatissimo.',
    // },
];
