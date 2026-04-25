export interface FaqEntry {
    question: string;
    answer: string;
    category?: string;
}

export const FAQS: FaqEntry[] = [
    {
        category: 'requisiti',
        question: 'Quali sono i requisiti aggiornati per il 2026?',
        answer: `<div class="space-y-2">
                        <p>Per accedere alla NASpI nel 2026 devi soddisfare tre requisiti fondamentali:</p>
                        <ul class="list-disc pl-5 space-y-1">
                            <li><strong>Stato di Disoccupazione:</strong> Essere privi di impiego e aver dato la disponibilità al lavoro (DID).</li>
                            <li><strong>Requisito Contributivo:</strong> Almeno 13 settimane di contributi versati nei 4 anni precedenti l'inizio della disoccupazione.</li>
                            <li><strong>Requisito Lavorativo:</strong> (Abolito dal 2022) Non sono più necessarie le 30 giornate di lavoro effettivo nell'ultimo anno.</li>
                        </ul>
                        <div class="bg-blue-50 p-3 rounded-lg text-sm border-l-4 border-blue-500 mt-2">
                            <strong>Novità 2025:</strong> Regole più stringenti per chi si dimette volontariamente da un nuovo impiego e richiede la NASpI residua.
                        </div>
                    </div>`,
    },
    {
        category: 'dimissioni',
        question: 'Quando spettano le Dimissioni per Giusta Causa?',
        answer: `<div class="space-y-3">
                        <p>Le dimissioni per giusta causa danno diritto alla NASpI perché equiparate al licenziamento. Ecco l'elenco delle casistiche ammesse dalla giurisprudenza:</p>
                        <div class="grid md:grid-cols-2 gap-3 text-sm">
                            <div class="bg-slate-50 p-3 rounded-lg border border-slate-200">
                                <strong class="flex items-center gap-2 text-red-600 mb-1"><span data-icon="alert-circle" class="w-4 h-4 inline-block"></span> Mancato Stipendio</strong>
                                Mancato pagamento della retribuzione per almeno 2 mensilità.
                            </div>
                            <div class="bg-slate-50 p-3 rounded-lg border border-slate-200">
                                <strong class="flex items-center gap-2 text-indigo-600 mb-1"><span data-icon="gavel" class="w-4 h-4 inline-block"></span> Mobbing / Molestie</strong>
                                Gravi condotte vessatorie da parte di superiori o colleghi (richiede prova).
                            </div>
                        </div>
                    </div>`,
    },
    {
        category: 'dimissioni',
        question: 'Dimissioni Genitori (Maternità/Paternità): Come funzionano?',
        answer: `<div class="space-y-2">
                        <p>Le dimissioni volontarie presentate durante il periodo tutelato non richiedono "giusta causa" e danno diritto alla NASpI.</p>
                        <div class="bg-emerald-50 p-4 rounded-xl border border-emerald-200 mt-3">
                            <h4 class="font-bold text-emerald-800 mb-2 flex items-center gap-2"><span data-icon="shield-check" class="w-5 h-5 inline-block"></span> Procedura di Convalida (Obbligatoria)</h4>
                            <p class="text-sm text-emerald-700">
                                Queste dimissioni <strong>DEVONO essere convalidate</strong> presso l'Ispettorato Territoriale del Lavoro (ITL).
                            </p>
                        </div>
                    </div>`,
    },
    {
        category: 'dimissioni',
        question: 'Cosa cambia nel 2025 per le dimissioni volontarie?',
        answer: `<div>
                        <p class="mb-2">Dal 1° Gennaio 2025, se ti dimetti volontariamente da un nuovo lavoro (senza giusta causa) e avevi una NASpI sospesa o residua:</p>
                        <ul class="list-disc pl-5 space-y-1 text-sm text-slate-600 mb-3">
                            <li>Per riaccedere alla NASpI, devi aver maturato almeno <strong>13 settimane</strong> di contributi nel nuovo rapporto.</li>
                        </ul>
                    </div>`,
    },
    {
        category: 'obblighi',
        question: 'Quali sono i nuovi obblighi SIISL?',
        answer: "Anche nel 2026 è attiva la piattaforma SIISL (operativa dal 24/11/2024). Tutti i percettori sono iscritti d'ufficio. Devi accedere entro 15gg per firmare il PAD (Patto Attivazione Digitale), pena sanzioni.",
    },
];

/**
 * Strip HTML tags from a string and collapse whitespace.
 * Used to produce plain-text answers for FAQPage JSON-LD.
 */
export function stripHtml(input: string): string {
    return input
        .replace(/<[^>]+>/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}
