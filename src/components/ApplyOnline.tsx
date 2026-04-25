import React, { useEffect } from 'react';
import { Zap, ShieldCheck, FileText, Download, User, FileCheck2, PenLine, Send, Clock } from 'lucide-react';

const APPLY_STEPS = [
    { num: 1, label: 'Dati personali', time: '~2 min', Icon: User },
    { num: 2, label: 'Documenti', time: '~3 min', Icon: FileCheck2 },
    { num: 3, label: 'Mandato', time: '~1 min', Icon: PenLine },
    { num: 4, label: 'Invio', time: '~30 sec', Icon: Send },
] as const;

const ApplyOnline: React.FC = () => {
    useEffect(() => {
        const scriptUrl = "https://link.arcanis.it/js/form_embed.js";
        if (!document.querySelector(`script[src="${scriptUrl}"]`)) {
            const script = document.createElement('script');
            script.src = scriptUrl;
            document.body.appendChild(script);
        }
    }, []);

    return (
        <div className="animate-in fade-in duration-500">
            <title>Richiedi NASpI Online</title>
            <div className="bg-slate-900 text-slate-100 py-12 px-4 text-center border-b border-slate-800">
                <h1 className="text-3xl font-bold mb-4 text-white">Richiesta NASpI Online</h1>
                <p className="max-w-2xl mx-auto text-slate-400">Compila il modulo, carica i documenti e noi pensiamo a tutto il resto.</p>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-3 gap-8">
                {/* Sidebar Info */}
                <div className="lg:col-span-1 space-y-6">

                    {/* Document Checklist */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center font-bold">1</span>
                            Documenti Necessari
                        </h3>
                        <p className="text-sm text-slate-500 mb-4">Tieni a portata di mano questi file (foto o PDF) prima di iniziare:</p>
                        <ul className="space-y-3 text-sm text-slate-700">
                            <li className="flex items-start gap-2">
                                <div className="min-w-4 h-4 mt-0.5 rounded-full border border-slate-300 flex items-center justify-center"></div>
                                Carta d'Identità (Fronte e Retro)
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="min-w-4 h-4 mt-0.5 rounded-full border border-slate-300 flex items-center justify-center"></div>
                                Codice Fiscale (Tessera Sanitaria)
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="min-w-4 h-4 mt-0.5 rounded-full border border-slate-300 flex items-center justify-center"></div>
                                Ultima Busta Paga
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="min-w-4 h-4 mt-0.5 rounded-full border border-slate-300 flex items-center justify-center"></div>
                                Contratto di Lavoro (se a tempo determinato)
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="min-w-4 h-4 mt-0.5 rounded-full border border-slate-300 flex items-center justify-center"></div>
                                Ricevuta Dimissioni Telematiche (solo se dimissioni volontarie)
                            </li>
                        </ul>
                    </div>

                    {/* IBAN Info */}
                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                        <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-lg bg-blue-200 text-blue-800 flex items-center justify-center font-bold">€</span>
                            Perché serve l'IBAN?
                        </h3>
                        <p className="text-sm text-blue-800 mb-3 leading-relaxed">
                            L'IBAN è indispensabile affinché l'INPS possa accreditare l'indennità direttamente sul tuo conto.
                        </p>
                        <div className="bg-white/60 p-3 rounded-lg text-xs text-blue-900 font-medium">
                            ⚠️ ATTENZIONE: Il conto corrente deve essere intestato o co-intestato al richiedente. Non sono validi libretti postali senza codice IBAN.
                        </div>
                    </div>

                    {/* Process Notes */}
                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                        <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                            <ShieldCheck className="w-5 h-5 text-slate-500" />
                            Come Funziona
                        </h3>
                        <ul className="space-y-3 text-xs text-slate-600">
                            <li className="flex gap-2">
                                <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                                <strong>Invio Rapido:</strong> La tua pratica viene lavorata entro 24h dall'invio.
                            </li>
                            <li className="flex gap-2">
                                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                                <strong>Controllo Requisiti:</strong> Verifichiamo la completezza dei dati prima dell'inoltro all'INPS.
                            </li>
                        </ul>
                    </div>

                    {/* Downloads Section */}
                    <div className="bg-teal-50 p-6 rounded-xl border border-teal-200">
                        <h3 className="font-bold text-teal-900 mb-4 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-teal-600" /> Modulistica Utile
                        </h3>
                        <div className="space-y-2">
                            <button className="w-full bg-white hover:bg-teal-50 text-slate-700 text-xs font-bold py-2 px-3 rounded-lg border border-teal-200 flex items-center justify-between transition-colors group">
                                <span>Mandato Assistenza.pdf</span>
                                <Download className="w-3 h-3 text-teal-400 group-hover:text-teal-600" />
                            </button>
                            <button className="w-full bg-white hover:bg-teal-50 text-slate-700 text-xs font-bold py-2 px-3 rounded-lg border border-teal-200 flex items-center justify-between transition-colors group">
                                <span>Modello SR163.pdf</span>
                                <Download className="w-3 h-3 text-teal-400 group-hover:text-teal-600" />
                            </button>
                            <button className="w-full bg-white hover:bg-teal-50 text-slate-700 text-xs font-bold py-2 px-3 rounded-lg border border-teal-200 flex items-center justify-between transition-colors group">
                                <span>Autocertif. Famiglia.pdf</span>
                                <Download className="w-3 h-3 text-teal-400 group-hover:text-teal-600" />
                            </button>
                        </div>
                    </div>

                </div>

                {/* Form Column */}
                <div className="lg:col-span-2 space-y-4">
                    {/* Stepper visivo statico: panoramica fasi del form */}
                    <section
                        aria-label="Panoramica delle fasi della richiesta"
                        className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 md:p-6"
                    >
                        {/* Mobile: lista verticale compatta */}
                        <ol className="md:hidden space-y-3">
                            {APPLY_STEPS.map(({ num, label, time, Icon }) => (
                                <li key={num} className="flex items-center gap-3">
                                    <div className="shrink-0 w-9 h-9 rounded-full bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center font-bold text-sm">
                                        {num}
                                    </div>
                                    <div className="flex-1 flex items-center justify-between gap-2 min-w-0">
                                        <div className="flex items-center gap-2 min-w-0">
                                            <Icon className="w-4 h-4 text-slate-500 shrink-0" aria-hidden="true" />
                                            <span className="text-sm font-semibold text-slate-800 truncate">{label}</span>
                                        </div>
                                        <span className="text-xs text-slate-500 whitespace-nowrap">{time}</span>
                                    </div>
                                </li>
                            ))}
                        </ol>

                        {/* Desktop: orizzontale con linea connettrice */}
                        <ol className="hidden md:flex items-start justify-between gap-2 relative">
                            {APPLY_STEPS.map(({ num, label, time, Icon }, idx) => (
                                <li
                                    key={num}
                                    className="relative flex-1 flex flex-col items-center text-center"
                                >
                                    {idx < APPLY_STEPS.length - 1 && (
                                        <span
                                            aria-hidden="true"
                                            className="absolute top-5 left-1/2 w-full h-0.5 bg-slate-200"
                                        />
                                    )}
                                    <div className="relative z-10 w-10 h-10 rounded-full bg-white border-2 border-blue-200 text-blue-700 flex items-center justify-center font-bold">
                                        {num}
                                    </div>
                                    <div className="mt-2 flex items-center gap-1.5">
                                        <Icon className="w-4 h-4 text-slate-500" aria-hidden="true" />
                                        <span className="text-sm font-semibold text-slate-800">{label}</span>
                                    </div>
                                    <span className="mt-1 text-xs text-slate-500">{time}</span>
                                </li>
                            ))}
                        </ol>

                        <p className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-600">
                            <Clock className="w-4 h-4 text-slate-400 shrink-0" aria-hidden="true" />
                            <span><strong className="text-slate-800">Tempo medio totale: 6-8 minuti</strong> — puoi riprendere in qualsiasi momento.</span>
                        </p>
                    </section>

                    {/* Iframe Arcanis */}
                    <div className="bg-white rounded-xl shadow border border-slate-200 overflow-hidden min-h-[800px]">
                        <iframe src="https://link.arcanis.it/widget/survey/sImJrbagruVY43JLeqA9" style={{ border: 'none', width: '100%', minHeight: '800px' }} id="sImJrbagruVY43JLeqA9" title="Modulo Richiesta NASpI"></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ApplyOnline;
