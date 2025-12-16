import React, { useState } from 'react';
import { PiggyBank, Calendar, AlertTriangle, CheckCircle2, Building2, User, Coins, ArrowRight, Info } from 'lucide-react';

import { Page } from '../types';

interface AnticipoNaspiProps {
    onNavigate: (page: Page) => void;
}

const AnticipoNaspi: React.FC<AnticipoNaspiProps> = ({ onNavigate }) => {
    const [monthlyAmount, setMonthlyAmount] = useState<number>(0);
    const [daysRemaining, setDaysRemaining] = useState<number>(0);
    const [taxRate] = useState<number>(23); // Standard reference rate

    const grossTotal = (monthlyAmount / 30) * daysRemaining;
    const netTotal = grossTotal - (grossTotal * (taxRate / 100));

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <title>Anticipo NASpI: Liquidazione in Unica Soluzione | Centro Flaiano</title>

            {/* HERO HEADER */}
            <div className="mb-12 text-center">
                <div className="inline-flex items-center justify-center p-3 bg-emerald-100 text-emerald-600 rounded-2xl mb-4">
                    <PiggyBank className="w-8 h-8" />
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">Anticipo NASpI</h1>
                <p className="text-slate-500 max-w-2xl mx-auto text-lg">Trasforma la tua disoccupazione in capitale d'investimento per avviare la tua nuova attività.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">

                {/* LEFT COLUMN: GUIDA */}
                <div className="lg:col-span-2 space-y-8">

                    {/* WARNING CARD */}
                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex flex-col md:flex-row gap-4 items-start shadow-sm">
                        <div className="bg-amber-100 p-3 rounded-xl shrink-0"><AlertTriangle className="w-6 h-6 text-amber-700" /></div>
                        <div>
                            <h3 className="text-lg font-bold text-amber-900 mb-1">Attenzione alla Scadenza</h3>
                            <p className="text-amber-800">
                                La domanda va presentata tassativamente <strong>entro 30 giorni</strong> dall'inizio dell'attività (apertura Partita IVA, sottoscrizione quote, ecc.).
                                Se l'attività è preesistente, entro 30 giorni dalla domanda NASpI.
                            </p>
                        </div>
                    </div>

                    {/* BUSINESS TYPES */}
                    <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl">
                        <h2 className="text-2xl font-bold mb-6">Attività Finanziabili</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {[
                                { icon: User, title: "Ditta Individuale", desc: "Attività commerciale, artigianale o agricola." },
                                { icon: Building2, title: "Libero Professionista", desc: "Attività autonoma con Partita IVA (anche iscritti alla Gestione Separata)." },
                                { icon: Coins, title: "Socio di Cooperativa", desc: "Sottoscrizione di quote di capitale sociale di una cooperativa." },
                                { icon: CheckCircle2, title: "S.r.l. Unipersonale", desc: "Costituzione o sottoscrizione capitale (con specifici requisiti)." }
                            ].map((item, idx) => (
                                <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-emerald-200 transition-colors">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="bg-white p-2 rounded-lg shadow-sm"><item.icon className="w-5 h-5 text-emerald-600" /></div>
                                        <h3 className="font-bold text-slate-900">{item.title}</h3>
                                    </div>
                                    <p className="text-sm text-slate-500">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* FAQ / DETAILS */}
                    <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                        <h2 className="text-xl font-bold mb-4">Cosa devi sapere</h2>
                        <ul className="space-y-4">
                            <li className="flex gap-3 text-slate-600">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                <span><strong>Intero Importo:</strong> Ricevi tutte le mensilità che non hai ancora percepito in un'unica soluzione.</span>
                            </li>
                            <li className="flex gap-3 text-slate-600">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                <span><strong>Niente ANF:</strong> L'assegno al nucleo familiare non spetta sull'anticipo.</span>
                            </li>
                            <li className="flex gap-3 text-slate-600">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                <span><strong>Vincolo Temporale:</strong> Se ti rioccupi come dipendente prima della scadenza teorica della NASpI, devi restituire l'anticipo (salvo casi specifici).</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* RIGHT COLUMN: CALCULATOR */}
                <div className="lg:col-span-1">
                    <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-2xl sticky top-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-white/10 p-2 rounded-xl"><Coins className="w-6 h-6 text-emerald-400" /></div>
                            <h2 className="text-xl font-bold">Calcola Capitale</h2>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Importo Mensile Lordo NASpI</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">€</span>
                                    <input type="number" value={monthlyAmount || ''} onChange={e => setMonthlyAmount(+e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 pl-8 text-white focus:border-emerald-500 outline-none transition-colors" placeholder="0.00" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Giorni Residui Spettanti</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><Calendar className="w-4 h-4" /></span>
                                    <input type="number" value={daysRemaining || ''} onChange={e => setDaysRemaining(+e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 pl-10 text-white focus:border-emerald-500 outline-none transition-colors" placeholder="Es. 365" />
                                </div>
                            </div>

                            <div className="pt-6 border-t border-slate-700">
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-slate-400 text-sm">Totale Lordo</span>
                                    <span className="text-xl font-semibold">€ {grossTotal.toLocaleString('it-IT', { maximumFractionDigits: 2 })}</span>
                                </div>
                                <div className="flex justify-between items-end mb-4">
                                    <span className="text-slate-400 text-sm flex items-center gap-1">IRPEF (est. {taxRate}%) <Info className="w-3 h-3" /></span>
                                    <span className="text-red-400">- € {(grossTotal - netTotal).toLocaleString('it-IT', { maximumFractionDigits: 2 })}</span>
                                </div>

                                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 text-center">
                                    <span className="block text-emerald-200 text-xs uppercase tracking-wider mb-1">Capitale Netto Stimato</span>
                                    <span className="block text-3xl font-bold text-emerald-400">€ {netTotal.toLocaleString('it-IT', { maximumFractionDigits: 2 })}</span>
                                </div>
                            </div>

                            <button onClick={() => onNavigate('apply')} className="w-full bg-emerald-600 hover:bg-emerald-500 py-4 rounded-xl font-bold text-white shadow-lg shadow-emerald-900/50 transition-all flex items-center justify-center gap-2 mt-4">
                                Richiedi Ora <ArrowRight className="w-5 h-5" />
                            </button>
                            <p className="text-xs text-center text-slate-500 mt-2">Valore puramente indicativo.</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};
export default AnticipoNaspi;
