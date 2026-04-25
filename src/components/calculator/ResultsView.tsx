import React from 'react';
import { AlertTriangle, TrendingDown, Calendar, ArrowRight } from 'lucide-react';
import type { NaspiResult, UserInputData } from '../../types';
import Obligations from '../Obligations';
import ConversionCTA from '../ConversionCTA';
import PaymentSchedule from './PaymentSchedule';

interface ResultsViewProps {
    result: NaspiResult;
    inputData: UserInputData;
    onReset: () => void;
}

const ResultsView: React.FC<ResultsViewProps> = ({ result, inputData, onReset }) => (
    <div className="bg-slate-50 min-h-[500px]">
        <div className="bg-white p-8 border-b shadow-sm">
            <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-bold text-slate-900">Il tuo Risultato</h2>
                <button onClick={onReset} className="text-sm font-bold text-slate-500 hover:text-blue-600">Ricalcola</button>
            </div>

            {!result.isEligible ? (
                <div className="bg-red-50 border border-red-200 p-6 rounded-2xl text-red-800 flex gap-4">
                    <AlertTriangle className="w-8 h-8 shrink-0" />
                    <div><h3 className="font-bold text-lg mb-2">Domanda Probabilmente Respinta</h3><p>{result.ineligibilityReason}</p></div>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="text-blue-100 mb-1 text-sm font-medium uppercase tracking-wide">Importo Mensile Lordo</div>
                            <div className="text-4xl font-extrabold mb-4">€ {result.grossMonthlyAmount.toLocaleString('it-IT')}</div>
                            <div className="flex gap-2 text-sm bg-white/10 p-2 rounded-lg backdrop-blur-sm">
                                <TrendingDown className="w-4 h-4" />
                                <span>-3% dal {inputData.age >= 55 ? '8°' : '6°'} mese</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
                        <div className="text-slate-500 mb-1 text-sm font-medium uppercase tracking-wide">Durata Totale</div>
                        <div className="text-4xl font-extrabold text-slate-900 mb-4">{result.totalDaysDuration} <span className="text-xl text-slate-500 font-normal">giorni</span></div>
                        <div className="text-sm text-slate-600 flex gap-4">
                            <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Dal {result.startDate}</div>
                            <div className="flex items-center gap-1"><ArrowRight className="w-4 h-4" /> Al {result.endDate}</div>
                        </div>
                    </div>
                </div>
            )}
        </div>

        {result.isEligible && (
            <div className="p-8 space-y-8">
                <ConversionCTA
                    headline={`Puoi ottenere fino a € ${result.grossMonthlyAmount.toLocaleString('it-IT')} al mese`}
                    subline={`La tua stima NASpI copre ${result.totalDaysDuration} giorni, dal ${result.startDate} al ${result.endDate}. Presenta la domanda entro 68 giorni dal licenziamento: possiamo farlo per te oggi.`}
                />

                <PaymentSchedule schedule={result.schedule} />
                <Obligations />
                <ConversionCTA
                    variant="inline"
                    headline="Non perdere la scadenza di 68 giorni"
                    subline="Dopo quella data non puoi più presentare la domanda. Affida la pratica ai nostri operatori: in 24 ore inviamo tutto all'INPS."
                />
            </div>
        )}
    </div>
);

export default ResultsView;
