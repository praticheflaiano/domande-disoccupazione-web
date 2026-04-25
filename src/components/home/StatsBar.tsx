import React from 'react';
import { Clock } from 'lucide-react';
import PracticeCounter from './PracticeCounter';

const StatsBar: React.FC = () => (
    <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-4 md:gap-6 -mt-10 relative z-20">
        <div className="bg-white p-5 rounded-2xl shadow-lg border border-slate-100">
            <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-1"><PracticeCounter /></div>
            <div className="text-sm font-medium text-slate-600">Pratiche Gestite</div>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-lg border border-slate-100">
            <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-1">24 h</div>
            <div className="text-sm font-medium text-slate-600">Invio della domanda</div>
        </div>
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-5 rounded-2xl shadow-lg border border-amber-200">
            <div className="text-3xl md:text-4xl font-bold text-amber-900 mb-1 flex items-center gap-1">
                <Clock className="w-7 h-7" aria-hidden="true" />
                68
            </div>
            <div className="text-sm font-semibold text-amber-900">giorni per presentare la domanda</div>
        </div>
    </div>
);

export default StatsBar;
