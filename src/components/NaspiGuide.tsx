import React from 'react';
import { AlertTriangle, Briefcase, Printer, Coins, Book, ArrowRight } from 'lucide-react';

const NaspiGuide: React.FC = () => {
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-8 animate-in fade-in duration-700 print:w-full print:max-w-none">
            {/* Header */}
            {/* Header */}
            <div className="relative overflow-hidden rounded-3xl mb-12 shadow-2xl group">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/assets/guide_header.png"
                        alt="Background"
                        className="w-full h-full object-cover opacity-90 transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/80 to-transparent"></div>
                </div>

                <div className="relative z-10 p-8 md:p-12 text-white print:text-black">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="max-w-2xl animate-in slide-in-from-bottom duration-700">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold uppercase tracking-wider mb-6 border border-teal-500/30 backdrop-blur-md print:hidden">
                                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
                                Manuale Ufficiale 2025
                            </div>
                            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300">
                                Guida Completa NASpI
                            </h1>
                            <p className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-xl print:text-slate-600">
                                Tutto quello che devi sapere su compatibilità, sospensione, decadenza e regole di calcolo aggiornate.
                            </p>
                        </div>
                        <div className="flex gap-3 print:hidden animate-in fade-in duration-1000 delay-300">
                            <button
                                onClick={handlePrint}
                                className="glass hover:bg-white/20 text-white px-6 py-4 rounded-2xl transition-all backdrop-blur-md border border-white/10 flex items-center gap-3 font-bold hover:scale-105 hover:shadow-lg lg:mt-12"
                            >
                                <Printer className="w-5 h-5" /> Stampa
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">

                {/* MAIN CONTENT */}
                <div className="lg:col-span-2 space-y-12">

                    {/* SECTION 1: COMPATIBILITA */}
                    <section id="compatibilita" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                            <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center"><Briefcase className="w-6 h-6" /></span>
                            Compatibilità Lavorativa
                        </h2>
                        <div className="prose prose-slate max-w-none text-slate-600">
                            <p>
                                Una delle domande più frequenti è: <em>"Posso lavorare mentre prendo la NASpI?"</em>.
                                La risposta è <strong>SÌ</strong>, ma con precisi limiti di reddito e obblighi di comunicazione.
                            </p>

                            <div className="my-6 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-slate-50 text-slate-900 font-semibold">
                                        <tr>
                                            <th className="p-4 border-b">Tipo Attività</th>
                                            <th className="p-4 border-b">Limite Reddito (Annuo)</th>
                                            <th className="p-4 border-b">Durata Massima</th>
                                            <th className="p-4 border-b">Obbligo Comunicazione</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b">
                                            <td className="p-4"><strong>Lavoro Subordinato</strong></td>
                                            <td className="p-4">€ 8.500</td>
                                            <td className="p-4">Indeterminata</td>
                                            <td className="p-4 text-orange-600 font-medium">Entro 30gg (Mod. NASpI-Com)</td>
                                        </tr>
                                        <tr className="border-b">
                                            <td className="p-4"><strong>Lavoro Occasionale (PrestO)</strong></td>
                                            <td className="p-4">€ 5.000</td>
                                            <td className="p-4">-</td>
                                            <td className="p-4 text-emerald-600">Non necessaria (comunica committente)</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4"><strong>Lavoro Autonomo / P.IVA</strong></td>
                                            <td className="p-4">€ 5.500</td>
                                            <td className="p-4">-</td>
                                            <td className="p-4 text-orange-600 font-medium">Entro 30gg (Mod. NASpI-Com)</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-yellow-900 text-sm">
                                <strong>Attenzione:</strong> Se il reddito non supera i limiti, la NASpI non decade ma viene <strong>ridotta</strong> di un importo pari all'80% del reddito previsto. È fondamentale comunicare il reddito presunto all'INPS per evitare sanzioni e recuperi.
                            </div>
                        </div>
                    </section>

                    {/* SECTION 2: SOSPENSIONE VS DECADENZA */}
                    <section id="sospensione" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                            <span className="w-10 h-10 bg-red-100 text-red-600 rounded-lg flex items-center justify-center"><AlertTriangle className="w-6 h-6" /></span>
                            Sospensione vs Decadenza
                        </h2>
                        <div className="space-y-4">
                            <div className="bg-white p-6 rounded-xl border border-l-4 border-slate-200 border-l-orange-500 shadow-sm">
                                <h3 className="font-bold text-lg text-slate-900 mb-2">Quando viene SOSPESA?</h3>
                                <p className="text-slate-600 mb-3">La prestazione si "congela" e riprende al termine del rapporto di lavoro. Avviene se:</p>
                                <ul className="list-disc pl-5 text-slate-600 space-y-1">
                                    <li>Ti rioccupi con contratto subordinato di durata <strong>inferiore a 6 mesi</strong>.</li>
                                    <li>Il tuo reddito supera gli 8.500€ per la durata del contratto (ma contratto breve).</li>
                                    <li>Non comunichi il reddito presunto (in alcuni casi specifici scatta la sospensione cautelativa).</li>
                                </ul>
                            </div>

                            <div className="bg-white p-6 rounded-xl border border-l-4 border-slate-200 border-l-red-600 shadow-sm">
                                <h3 className="font-bold text-lg text-slate-900 mb-2">Quando DECADE (si perde)?</h3>
                                <p className="text-slate-600 mb-3">Perdi definitivamente il diritto alla prestazione se:</p>
                                <ul className="list-disc pl-5 text-slate-600 space-y-1">
                                    <li>Perdi lo stato di disoccupazione (contratto &gt; 6 mesi o a tempo indeterminato senza reddito sotto soglia).</li>
                                    <li>Inizi un'attività autonoma senza comunicarlo entro 30 giorni.</li>
                                    <li>Raggiungi i requisiti per la pensione di vecchiaia o anticipata.</li>
                                    <li>Violazione ripetuta degli obblighi di politica attiva (GOL/SIISL) - es. 3 assenze ingiustificate.</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 3: DECALAGE E DURATA */}
                    <section id="calcolo" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                            <span className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center"><Coins className="w-6 h-6" /></span>
                            Meccanismo di Decalage (Riduzione)
                        </h2>
                        <div className="prose prose-slate max-w-none text-slate-600">
                            <p>
                                La NASpI non rimane costante per tutta la durata. Subisce una riduzione progressiva (decalage) del <strong>3% al mese</strong>.
                            </p>
                            <div className="grid md:grid-cols-2 gap-4 mt-4 mb-6">
                                <div className="p-4 bg-slate-50 rounded-lg">
                                    <strong>Regola Generale (Under 55)</strong>
                                    <p className="text-sm mt-1">La riduzione parte dal <strong>6° mese</strong> (151° giorno) di fruizione.</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-lg">
                                    <strong>Over 55</strong>
                                    <p className="text-sm mt-1">La riduzione parte dall'<strong>8° mese</strong> (211° giorno) di fruizione.</p>
                                </div>
                            </div>
                            <p>
                                <strong>Nota Calcolo:</strong> I periodi di sospensione della prestazione (es. lavoro breve) sospendono anche il contatore del decalage. Al riavvio della prestazione, la riduzione riprende dal punto in cui si era interrotta.
                            </p>
                        </div>
                    </section>

                </div>

                {/* SIDEBAR NAVIGATION */}
                <div className="hidden lg:block">
                    <div className="sticky top-24 space-y-8">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                            <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><Book className="w-4 h-4" /> Indice Guida</h4>
                            <nav className="space-y-2 text-sm">
                                <a href="#compatibilita" className="block text-slate-600 hover:text-teal-600 hover:bg-teal-50 px-3 py-2 rounded-lg transition-colors">Compatibilità e Limiti</a>
                                <a href="#sospensione" className="block text-slate-600 hover:text-teal-600 hover:bg-teal-50 px-3 py-2 rounded-lg transition-colors">Sospensione vs Decadenza</a>
                                <a href="#calcolo" className="block text-slate-600 hover:text-teal-600 hover:bg-teal-50 px-3 py-2 rounded-lg transition-colors">Decalage e Durata</a>
                            </nav>
                        </div>

                        <div className="bg-teal-600 p-6 rounded-2xl text-white shadow-lg shadow-teal-900/20">
                            <h4 className="font-bold mb-2">Dubbi sulla tua situazione?</h4>
                            <p className="text-teal-100 text-sm mb-4">Usa il nostro simulatore per verificare importi e durata previsti per il tuo caso specifico.</p>
                            <a href="/?page=calculator" className="w-full bg-white text-teal-600 font-bold py-2 rounded-lg hover:bg-teal-50 transition-colors flex items-center justify-center gap-2">
                                Vai al Calcolatore <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default NaspiGuide;
