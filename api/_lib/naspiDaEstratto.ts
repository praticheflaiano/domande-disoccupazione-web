// Calcolo DETERMINISTICO di settimane e retribuzioni degli ultimi 4 anni a partire dalle righe
// dell'estratto conto trascritte dal modello. Il modello copia le righe, qui si fanno i conti.
//
// Regole (D.Lgs. 22/2015 artt. 3-4; circolare INPS n. 94/2015):
// - periodo di riferimento: i 4 anni che precedono la fine del rapporto di lavoro;
// - contano i contributi da lavoro dipendente e, tra i figurativi, solo maternità e congedo parentale;
// - la retribuzione è quella imponibile ai fini previdenziali degli stessi 4 anni.
// Le righe che finiscono a cavallo dell'inizio del periodo sono contate in proporzione ai giorni.
// Nessun altro figurativo (malattia, cassa integrazione, NASpI precedente, militare) entra nel conteggio:
// lo si segnala, perché alcuni di questi periodi possono allungare il periodo di riferimento.

export interface RigaTrascritta {
    dal: string;
    al: string;
    tipo: string;
    unita: string; // settimane | mesi | giorni | sconosciuta
    contributi: string; // contributi utili al diritto, come scritti
    importo: string; // retribuzione o reddito, come scritto
}

export interface RisultatoEstratto {
    weeks: number;
    wages: number;
    righeContate: number;
    righeEscluse: number;
    periodo: { dal: string; al: string };
    avvisi: string[];
}

const ISO = /^\d{4}-\d{2}-\d{2}$/;
const GIORNO = 86_400_000;

export function numeroItaliano(s: string): number | null {
    const t = String(s ?? '').replace(/[€\s]/g, '').replace(/-$/, '');
    if (!t) return null;
    // "25.431,00" -> 25431.00 ; "52" -> 52 ; "46,000" -> 46
    const n = t.includes(',') ? parseFloat(t.replace(/\./g, '').replace(',', '.')) : parseFloat(t.replace(/\.(?=\d{3}(\D|$))/g, ''));
    return Number.isFinite(n) ? n : null;
}

const FIGURATIVA = /figurat|fig\.|cassa integr|\bcig\b|malattia|naspi|aspi|disoccup|mobilit|militare|riscatt|volontar|donazione sangue|infortun/i;
const MATERNITA = /maternit|paternit|congedo parentale|astensione (obbligatoria|facoltativa)|congedo di paternit/i;
const NON_DIPENDENTE = /artigian|commerciant|titolare|coadiuv|separata|parasubordin|collaboraz|co\.co|professionist|autonom|coltivator/i;

const it = (iso: string) => `${iso.slice(8, 10)}/${iso.slice(5, 7)}/${iso.slice(0, 4)}`;

function giorni(dal: string, al: string): number {
    return Math.round((Date.parse(al) - Date.parse(dal)) / GIORNO) + 1;
}

export function quattroAnniPrima(fine: string): string {
    const d = new Date(fine + 'T00:00:00Z');
    d.setUTCFullYear(d.getUTCFullYear() - 4);
    d.setUTCDate(d.getUTCDate() + 1);
    return d.toISOString().slice(0, 10);
}

export function calcolaDaRighe(righe: RigaTrascritta[], fineRapporto: string): RisultatoEstratto {
    const fine = ISO.test(fineRapporto) ? fineRapporto : new Date().toISOString().slice(0, 10);
    const inizio = quattroAnniPrima(fine);
    const avvisi: string[] = [];
    let settimane = 0;
    let retribuzioni = 0;
    let contate = 0;
    let escluse = 0;
    let figurativeEscluse = 0;
    let autonomeEscluse = 0;
    let senzaUnita = 0;
    let dateIllegibili = 0;

    for (const r of righe) {
        if (!ISO.test(r.dal) || !ISO.test(r.al) || r.al < r.dal) { dateIllegibili++; continue; }
        if (r.al < inizio || r.dal > fine) continue; // fuori dal periodo
        const tipo = r.tipo || '';
        const maternita = MATERNITA.test(tipo);
        if (!maternita && FIGURATIVA.test(tipo)) { figurativeEscluse++; escluse++; continue; }
        if (NON_DIPENDENTE.test(tipo)) { autonomeEscluse++; escluse++; continue; }

        const n = numeroItaliano(r.contributi);
        let sett: number | null = null;
        if (r.unita === 'settimane') sett = n;
        else if (r.unita === 'sconosciuta' && n !== null && n <= Math.ceil(giorni(r.dal, r.al) / 7) + 1) sett = n;
        if (sett === null || sett < 0) { senzaUnita++; escluse++; continue; }

        const dal = r.dal < inizio ? inizio : r.dal;
        const al = r.al > fine ? fine : r.al;
        const quota = giorni(dal, al) / giorni(r.dal, r.al);
        settimane += sett * quota;
        const euro = maternita ? 0 : numeroItaliano(r.importo) ?? 0;
        retribuzioni += Math.max(0, euro) * quota;
        contate++;
        if (quota < 1) avvisi.push(`La riga dal ${it(r.dal)} al ${it(r.al)} è a cavallo dell'inizio del periodo: contata per la parte dal ${it(dal)}, in proporzione ai giorni.`);
    }

    if (figurativeEscluse) avvisi.push(`${figurativeEscluse} ${figurativeEscluse === 1 ? 'riga di contributi figurativi (es. malattia, cassa integrazione, NASpI precedente) non è stata contata' : 'righe di contributi figurativi (es. malattia, cassa integrazione, NASpI precedente) non sono state contate'}: per la NASpI valgono solo maternità e congedo parentale. Alcuni di questi periodi possono allungare il periodo di riferimento: lo verifichiamo noi.`);
    if (autonomeEscluse) avvisi.push(`${autonomeEscluse} ${autonomeEscluse === 1 ? 'riga non è' : 'righe non sono'} di lavoro dipendente (es. artigiani, commercianti, gestione separata) e non ${autonomeEscluse === 1 ? 'è stata contata' : 'sono state contate'}.`);
    if (senzaUnita) avvisi.push(`${senzaUnita} ${senzaUnita === 1 ? 'riga ha' : 'righe hanno'} contributi in mesi o giorni o non leggibili: non ${senzaUnita === 1 ? 'è stata contata' : 'sono state contate'}, controlla i numeri.`);
    if (dateIllegibili) avvisi.push(`${dateIllegibili} ${dateIllegibili === 1 ? 'riga ha' : 'righe hanno'} date non leggibili e non ${dateIllegibili === 1 ? 'è stata contata' : 'sono state contate'}.`);
    if (!contate) avvisi.push('Nel documento non abbiamo trovato contributi da lavoro dipendente negli ultimi 4 anni: inserisci i dati a mano o contattaci.');
    avvisi.push('Se hai già preso la NASpI negli ultimi 4 anni, le settimane già usate vanno tolte: il conteggio esatto lo fa l\'INPS.');

    return {
        weeks: Math.round(settimane),
        wages: Math.round(retribuzioni * 100) / 100,
        righeContate: contate,
        righeEscluse: escluse,
        periodo: { dal: inizio, al: fine },
        avvisi,
    };
}
