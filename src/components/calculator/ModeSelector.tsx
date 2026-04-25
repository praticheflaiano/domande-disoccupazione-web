import React from 'react';
import { Calculator, FileText } from 'lucide-react';
import type { CalculatorMode } from '../../types';

interface ModeSelectorProps {
    onSelect: (mode: CalculatorMode) => void;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ onSelect }) => (
    <div className="p-8 md:p-12">
        <h2 className="text-2xl font-bold mb-8 text-center">Cosa vuoi fare oggi?</h2>
        <div className="grid md:grid-cols-2 gap-6">
            <button onClick={() => onSelect('forecast')} className="group p-8 rounded-2xl border-2 border-slate-100 hover:border-blue-500 hover:bg-blue-50/50 transition-all text-left">
                <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><Calculator className="w-7 h-7" /></div>
                <h3 className="font-bold text-lg mb-2 text-slate-900">Nuova Previsione</h3>
                <p className="text-sm text-slate-500">Non ho ancora la NASpI. Voglio stimare quanto mi spetta in base ai contributi.</p>
            </button>
            <button onClick={() => onSelect('analysis')} className="group p-8 rounded-2xl border-2 border-slate-100 hover:border-purple-500 hover:bg-purple-50/50 transition-all text-left">
                <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><FileText className="w-7 h-7" /></div>
                <h3 className="font-bold text-lg mb-2 text-slate-900">Analisi Lettera INPS</h3>
                <p className="text-sm text-slate-500">Ho già la lettera di accoglimento. Voglio analizzare il piano dei pagamenti.</p>
            </button>
        </div>
    </div>
);

export default ModeSelector;
