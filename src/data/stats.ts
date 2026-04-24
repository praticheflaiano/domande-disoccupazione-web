// Statistiche operative mostrate nel sito. Aggiornare periodicamente.
// Mantenere numeri realistici e verificabili.

export const STATS = {
    // Totale pratiche NASpI gestite dalla fondazione del centro
    totalPractices: 1843,
    // Pratiche del mese corrente (stima o conteggio effettivo)
    currentMonthPractices: 47,
    // Tasso di accoglimento INPS delle pratiche
    acceptanceRate: 99.8,
    // Numero recensioni Google (0 se non ancora raccolte)
    googleReviewsCount: 0,
    // Media recensioni Google (0 se nessuna)
    googleReviewsAverage: 0,
    // Anno di fondazione del centro
    foundedYear: 2010,
    // Ultimo aggiornamento delle stats (formato ISO)
    updatedAt: '2026-04-23',
};

export const STATS_LAST_REVIEW_DATE = STATS.updatedAt;
