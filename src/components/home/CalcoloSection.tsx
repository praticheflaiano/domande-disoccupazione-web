import React from 'react';
import { Calendar, Euro, GraduationCap, ArrowRight } from 'lucide-react';
import Section from './Section';

const CalcoloSection: React.FC = () => (
    <Section title="Durata e Importo" className="bg-slate-50">
        <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
                <div className="flex gap-4">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0"><Calendar className="w-6 h-6" /></div>
                    <div>
                        <h3 className="font-bold text-xl mb-1">Durata: 50% del Lavoro</h3>
                        <p className="text-slate-600">La NASpI spetta per un numero di settimane pari alla metà delle settimane contributive degli ultimi 4 anni. Durata massima: <strong>24 mesi</strong>.</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0"><Euro className="w-6 h-6" /></div>
                    <div>
                        <h3 className="font-bold text-xl mb-1">Calcolo Importo</h3>
                        <p className="text-slate-600">75% della retribuzione media mensile (se inferiore a €1.425,21). Se superiore, si aggiunge il 25% dell'eccedenza. Tetto massimo 2024: <strong>€1.550,42</strong>.</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center shrink-0"><GraduationCap className="w-6 h-6" /></div>
                    <div>
                        <h3 className="font-bold text-xl mb-1">Décalage (Riduzione)</h3>
                        <p className="text-slate-600">L'importo si riduce del 3% ogni mese a partire dal 6° mese (o dall'8° mese se hai più di 55 anni).</p>
                    </div>
                </div>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-bl-full"></div>
                <h3 className="text-2xl font-bold mb-6">Simula la tua NASpI</h3>
                <p className="mb-8 text-slate-600">
                    Il nostro calcolatore avanzato utilizza le ultime aliquote INPS e l'Intelligenza Artificiale per analizzare la tua situazione contributiva.
                </p>
                <a href="/calcolatore" className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-slate-800 transition-colors">
                    Vai al Calcolatore <ArrowRight className="w-5 h-5" />
                </a>
            </div>
        </div>
    </Section>
);

export default CalcoloSection;
