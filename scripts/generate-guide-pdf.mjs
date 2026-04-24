// Genera public/assets/guida-naspi-2026.pdf (checklist + parametri + tabelle)
// Zero browser headless: usa pdfkit (lightweight, ~200 KB).
// Eseguire: node scripts/generate-guide-pdf.mjs (anche eseguito da prebuild).

import PDFDocument from 'pdfkit';
import { createWriteStream } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';

const outPath = 'public/assets/guida-naspi-2026.pdf';
await mkdir(dirname(outPath), { recursive: true });

const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 56, bottom: 56, left: 56, right: 56 },
    info: {
        Title: 'Guida NASpI 2026 — Centro Pratiche Flaiano',
        Author: 'Centro Pratiche Flaiano',
        Subject: 'NASpI 2026: requisiti, calcolo, procedura',
        Keywords: 'NASpI, disoccupazione, INPS, 2026, calcolo, requisiti',
    },
});

const stream = createWriteStream(outPath);
doc.pipe(stream);

// Color palette
const TEAL = '#0d9488';
const NAVY = '#0f172a';
const SLATE = '#475569';
const LIGHT = '#f1f5f9';

const h1 = (t) => doc.fillColor(NAVY).font('Helvetica-Bold').fontSize(22).text(t, { paragraphGap: 8 });
const h2 = (t) => doc.fillColor(TEAL).font('Helvetica-Bold').fontSize(14).text(t, { paragraphGap: 6 });
const h3 = (t) => doc.fillColor(NAVY).font('Helvetica-Bold').fontSize(11).text(t, { paragraphGap: 4 });
const p = (t) => doc.fillColor(SLATE).font('Helvetica').fontSize(10).text(t, { paragraphGap: 4, align: 'justify', lineGap: 2 });
const li = (t) => doc.fillColor(SLATE).font('Helvetica').fontSize(10).text('• ' + t, { indent: 10, paragraphGap: 2, lineGap: 2 });

// --- Cover ---
doc.rect(0, 0, doc.page.width, 140).fill(NAVY);
doc.fillColor('#ffffff').font('Helvetica-Bold').fontSize(11).text('CENTRO PRATICHE FLAIANO', 56, 50, { characterSpacing: 2 });
doc.fillColor('#5eead4').font('Helvetica').fontSize(10).text('CAF - Patronato - Via Filoteo Alberini 25, 00139 Roma', 56, 70);
doc.fillColor('#ffffff').font('Helvetica-Bold').fontSize(28).text('Guida NASpI 2026', 56, 95);

doc.moveDown(5);
doc.fillColor(NAVY).font('Helvetica-Bold').fontSize(18).text('La guida pratica per calcolare,\nrichiedere e gestire la NASpI', 56, 180);

doc.moveDown(2);
p('Aggiornata ai parametri INPS 2026 (rivalutazione ISTAT +1,4%) e alle ultime circolari. Da Circolare INPS n. 98/2025 sulle 13 settimane post-dimissioni, alla Cass. ord. 10559/2026 sul trasferimento illegittimo.');

doc.moveDown(1);
doc.rect(56, doc.y, 480, 80).fill(LIGHT);
doc.fillColor(TEAL).font('Helvetica-Bold').fontSize(11).text('PARAMETRI UFFICIALI 2026', 70, doc.y - 68);
doc.fillColor(NAVY).font('Helvetica').fontSize(10).text('Soglia di calcolo: € 1.456,72/mese', 70, doc.y);
doc.text('Massimale mensile lordo: € 1.584,70', 70);
doc.text('Durata max: 24 mesi (104 settimane)', 70);
doc.text('Decalage: -3% dal 6° mese (dall\'8° per over 55)', 70);
doc.text('Scadenza domanda: 68 giorni dalla cessazione', 70);

// --- Sezione 1: Requisiti ---
doc.addPage();
h1('1. Requisiti 2026');
p('Per avere diritto alla NASpI devi soddisfare tre condizioni simultanee al momento della domanda:');
li('Cessazione involontaria del rapporto di lavoro (licenziamento, scadenza contratto, dimissioni per giusta causa).');
li('Almeno 13 settimane di contribuzione negli ultimi 4 anni.');
li('Stato di disoccupazione (DID online) al momento della domanda.');

doc.moveDown(0.5);
h3('Novità dal 2025 (Circolare INPS 98/2025)');
p('Se ti sei dimesso volontariamente da un tempo indeterminato nei 12 mesi precedenti, servono almeno 13 settimane di contributi MATURATE nel nuovo rapporto di lavoro tra le dimissioni e la cessazione involontaria. Non valgono i contributi precedenti.');

doc.moveDown(0.5);
h3('Eccezioni alla stretta dei 13 contributi');
li('Dimissioni per giusta causa (art. 2119 c.c.)');
li('Dimissioni nel periodo tutelato di maternità/paternità');
li('Risoluzioni consensuali in sede ITL');

// --- Sezione 2: Calcolo ---
doc.addPage();
h1('2. Calcolo importo NASpI 2026');
p('La NASpI si calcola in 3 passi:');

h3('Passo 1 — Retribuzione media mensile (RMM)');
p('RMM = (imponibile previdenziale totale ultimi 4 anni / settimane lavorate) × 4,33');

h3('Passo 2 — Importo base lordo');
p('Se RMM ≤ 1.456,72 €: NASpI = 75% × RMM');
p('Se RMM > 1.456,72 €: NASpI = (75% × 1.456,72) + (25% × eccedenza) fino al massimale');

h3('Passo 3 — Cap massimale 2026');
p('Importo lordo mensile MAX: € 1.584,70');

h3('Passo 4 — Decalage');
p('Dal 6° mese di prestazione l\'importo cala del 3% ogni mese. Dall\'8° mese se hai compiuto 55 anni prima della cessazione.');

h3('Esempio numerico');
li('RMM = 1.200 € → NASpI lorda = 900 € (75%)');
li('RMM = 2.000 € → 1.092,54 + 135,82 = 1.228,36 €');
li('RMM = 3.000 € → clampato al cap 1.584,70 €');

// --- Sezione 3: Durata ---
doc.addPage();
h1('3. Durata della NASpI');
p('Durata = metà delle settimane di contribuzione degli ultimi 4 anni. Massimo 24 mesi (104 settimane).');

h3('Tabella settimane contributive → mesi NASpI');
li('26 settimane (6 mesi lavoro) → 13 settimane NASpI (~3 mesi)');
li('52 settimane (1 anno) → 26 settimane (~6 mesi)');
li('104 settimane (2 anni) → 52 settimane (12 mesi)');
li('208 settimane (4 anni) → 104 settimane (cap 24 mesi)');

// --- Sezione 4: Checklist domanda ---
doc.addPage();
h1('4. Checklist: presentare la domanda');
p('Entro 68 giorni dalla cessazione, a pena di decadenza. Due strade:');

h3('A) Autonomo sul portale INPS');
li('SPID livello 2 / CIE con PIN / CNS');
li('Ultima busta paga, contratto/lettera licenziamento, IBAN intestato');
li('inps.it → Prestazioni → NASpI → Domanda');
li('Tempo stimato: 30-45 minuti');

h3('B) Tramite patronato (es. Centro Pratiche Flaiano)');
li('Firmi modulo SR163 (delega)');
li('Consegni documenti (anche via WhatsApp)');
li('Patronato compila, trasmette, segue');
li('Tempo tuo: 10 minuti');

h3('Decorrenza pagamento');
p('Dall\'8° giorno successivo alla cessazione. Primo accredito: 45-60 giorni dopo l\'accoglimento, con arretrati.');

// --- Sezione 5: Obblighi ---
doc.addPage();
h1('5. Obblighi del percettore');
h3('Timeline');
li('Giorno 0: domanda accolta, iscrizione automatica a SIISL');
li('Entro 15 giorni: firma PAD su siisl.lavoro.gov.it');
li('Entro 30 giorni: convocazione del Centro per l\'Impiego (CPI)');
li('Ogni 90 giorni: colloqui periodici GOL');
li('Ogni nuovo lavoro/reddito: NASpI-Com entro 30 giorni');

h3('Sanzioni');
li('Mancata firma PAD: -25% prima volta, -1 mese seconda, decadenza terza');
li('Assenza CPI: progressive come PAD');
li('Rifiuto offerta congrua: decadenza immediata');
li('Omissione NASpI-Com: decadenza retroattiva + restituzione');

// --- Sezione 6: Contatti ---
doc.addPage();
h1('6. Ti aiutiamo noi');
p('Il Centro Pratiche Flaiano è un CAF-Patronato di Roma specializzato in pratiche NASpI. 1.843+ pratiche gestite dal 2010. Servizio di presentazione domanda NASpI + gestione SIISL + NASpI-Com + ricorsi.');

h3('Contatti');
li('Sede: Via Filoteo Alberini 25, 00139 Roma (RM)');
li('Telefono: 06 9784 5429');
li('WhatsApp: +39 371 623 0690');
li('Sito: https://domandedisoccupazione.it');
li('Orari: Lun-Gio 9:30-13:00 / 15:30-18:00 — Ven 9:30-14:00');

doc.moveDown(2);
p('Questa guida è stata redatta dalla redazione del Centro Pratiche Flaiano. I contenuti hanno scopo informativo e non sostituiscono la consulenza professionale. Fonti: D.Lgs. 22/2015, L. 199/2025, Circolari INPS 94/2015 e 98/2025, giurisprudenza Cassazione aggiornata.');

doc.moveDown(1);
doc.fillColor('#94a3b8').font('Helvetica').fontSize(8).text('Versione 2026.04 — Ultimo aggiornamento: aprile 2026', { align: 'center' });

doc.end();

await new Promise((resolve, reject) => {
    stream.on('finish', resolve);
    stream.on('error', reject);
});

console.log(`✓ PDF generato: ${outPath}`);
