import React, { useState, useId } from 'react';
import { Calculator, ArrowRight, Info } from 'lucide-react';
import ConversionCTA from './ConversionCTA';
import DecalageChart from './DecalageChart';
import LegalDisclaimer from './LegalDisclaimer';

// Parametri DIS-COLL 2026 (rivalutati ISTAT +1,4%, stesso pattern NASpI)
const DISCOLL_CONSTANTS = {
    THRESHOLD: 1456.72,
    MAX_MONTHLY: 1584.70,
    PERCENT_BASE: 0.75,
    PERCENT_EXCESS: 0.25,
    MAX_MONTHS: 12,
    REDUCTION_START_MONTH: 6,
    REDUCTION_PERCENTAGE: 0.03,
};

interface Result {
    grossMonthlyAmount: number;
    durationMonths: number;
    averageMonthlyIncome: number;
}

const DisCollCalculator: React.FC = () => {
    const [monthsContribution, setMonthsContribution] = useState<number>(12);
    const [totalGrossIncome, setTotalGrossIncome] = useState<number>(20000);
    const [result, setResult] = useState<Result | null>(null);

    const monthsId = useId();
    const incomeId = useId();

    const calculate = () => {
        if (monthsContribution < 1 || totalGrossIncome <= 0) return;

        const averageMonthlyIncome = totalGrossIncome / monthsContribution;

        let baseMonthly = 0;
        if (averageMonthlyIncome <= DISCOLL_CONSTANTS.THRESHOLD) {
            baseMonthly = averageMonthlyIncome * DISCOLL_CONSTANTS.PERCENT_BASE;
        } else {
            const excess = averageMonthlyIncome - DISCOLL_CONSTANTS.THRESHOLD;
            baseMonthly =
                DISCOLL_CONSTANTS.THRESHOLD * DISCOLL_CONSTANTS.PERCENT_BASE +
                excess * DISCOLL_CONSTANTS.PERCENT_EXCESS;
        }
        baseMonthly = Math.min(baseMonthly, DISCOLL_CONSTANTS.MAX_MONTHLY);

        const durationMonths = Math.min(Math.floor(monthsContribution / 2), DISCOLL_CONSTANTS.MAX_MONTHS);

        setResult({
            grossMonthlyAmount: parseFloat(baseMonthly.toFixed(2)),
            durationMonths,
            averageMonthlyIncome: parseFloat(averageMonthlyIncome.toFixed(2)),
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8 text-center">
                <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-3">Calcolatore DIS-COLL 2026</h1>
                <p className="text-slate-500 max-w-2xl mx-auto">
                    Simula importo e durata dell'indennità di disoccupazione per collaboratori coordinati e continuativi (co.co.co.), assegnisti e dottorandi iscritti alla Gestione Separata INPS.
                </p>
            </div>

            <LegalDisclaimer variant="calculator" className="mb-6" />

            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 md:p-8">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label htmlFor={monthsId} className="block text-sm font-bold text-slate-700 mb-2">
                            Mesi di contribuzione Gestione Separata
                            <Info className="w-4 h-4 inline ml-1 text-slate-400" aria-hidden="true" />
                        </label>
                        <input
                            id={monthsId}
                            type="number"
                            min={1}
                            max={48}
                            value={monthsContribution}
                            onChange={(e) => setMonthsContribution(parseInt(e.target.value) || 0)}
                            className="w-full p-4 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none"
                        />
                        <p className="text-xs text-slate-500 mt-1">Mesi di versamenti alla Gestione Separata nell'anno civile di cessazione e nei 12 mesi precedenti.</p>
                    </div>
                    <div>
                        <label htmlFor={incomeId} className="block text-sm font-bold text-slate-700 mb-2">
                            Reddito lordo totale (€)
                        </label>
                        <input
                            id={incomeId}
                            type="number"
                            min={0}
                            value={totalGrossIncome}
                            onChange={(e) => setTotalGrossIncome(parseFloat(e.target.value) || 0)}
                            className="w-full p-4 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none"
                        />
                        <p className="text-xs text-slate-500 mt-1">Somma dei compensi percepiti nel periodo di contribuzione.</p>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={calculate}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold px-6 py-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                    <Calculator className="w-5 h-5" aria-hidden="true" />
                    Calcola la DIS-COLL
                    <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </button>

                {result && (
                    <div className="mt-8 space-y-6">
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="bg-gradient-to-br from-teal-600 to-teal-700 text-white p-5 rounded-2xl shadow-lg">
                                <div className="text-teal-100 text-xs font-medium uppercase tracking-wide mb-1">Importo mensile lordo</div>
                                <div className="text-3xl font-extrabold">€ {result.grossMonthlyAmount.toLocaleString('it-IT')}</div>
                            </div>
                            <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
                                <div className="text-slate-500 text-xs font-medium uppercase tracking-wide mb-1">Durata stimata</div>
                                <div className="text-3xl font-extrabold text-slate-900">
                                    {result.durationMonths} <span className="text-base font-normal text-slate-500">mesi</span>
                                </div>
                                <div className="text-xs text-slate-500 mt-1">max 12 mesi</div>
                            </div>
                            <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
                                <div className="text-slate-500 text-xs font-medium uppercase tracking-wide mb-1">Reddito medio mensile</div>
                                <div className="text-3xl font-extrabold text-slate-900">€ {result.averageMonthlyIncome.toLocaleString('it-IT')}</div>
                            </div>
                        </div>

                        <DecalageChart
                            baseMonthlyAmount={result.grossMonthlyAmount}
                            totalMonths={result.durationMonths}
                            age={30}
                        />

                        <ConversionCTA
                            headline="Ti aiutiamo con la domanda DIS-COLL"
                            subline="Procedura simile alla NASpI: 68 giorni per presentare la domanda, SIISL/PAD entro 15 giorni. Te la seguiamo noi dall'invio alla liquidazione."
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default DisCollCalculator;
