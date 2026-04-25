import React, { useId } from 'react';
import { ArrowRight, HelpCircle, Briefcase } from 'lucide-react';
import { TerminationReason } from '../../types';
import type { UserInputData, CalculatorMode } from '../../types';

interface CalculatorFormProps {
    mode: CalculatorMode;
    inputData: UserInputData;
    setInputData: React.Dispatch<React.SetStateAction<UserInputData>>;
    onCalculate: () => void;
}

const CalculatorForm: React.FC<CalculatorFormProps> = ({ mode, inputData, setInputData, onCalculate }) => {
    const ageId = useId();
    const termDateId = useId();
    const weeksId = useId();
    const weeksHintId = useId();
    const wagesId = useId();
    const wagesHintId = useId();
    const reasonId = useId();
    const daysApprovedId = useId();
    const monthlyApprovedId = useId();

    return (
        <div className="p-8 md:p-12">
            <h2 className="text-2xl font-bold mb-6">Dati per il calcolo</h2>
            <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor={ageId} className="block text-sm font-bold text-slate-700 mb-2">La tua Età</label>
                        <input id={ageId} type="number" min={14} max={99} value={inputData.age} onChange={e => setInputData({ ...inputData, age: +e.target.value })} className="w-full p-4 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all placeholder:text-slate-300" />
                    </div>
                    <div>
                        <label htmlFor={termDateId} className="block text-sm font-bold text-slate-700 mb-2">Data Licenziamento</label>
                        <input id={termDateId} type="date" value={inputData.terminationDate} onChange={e => setInputData({ ...inputData, terminationDate: e.target.value })} className="w-full p-4 rounded-xl border border-slate-300 focus:border-blue-500 outline-none transition-all" />
                    </div>
                </div>

                {mode === 'forecast' ? (
                    <>
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                            <h3 className="font-bold text-slate-900 mb-4 flex gap-2"><Briefcase className="w-5 h-5 text-slate-500" aria-hidden="true" /> Dati Contributivi (4 Anni)</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor={weeksId} className="flex items-center gap-1 text-sm font-medium text-slate-600 mb-1">
                                        Settimane Lavorate
                                        <HelpCircle className="w-4 h-4 inline text-slate-400" aria-hidden="true" />
                                    </label>
                                    <input id={weeksId} aria-describedby={weeksHintId} type="number" min={0} max={208} value={inputData.weeksWorkedLast4Years} onChange={e => setInputData({ ...inputData, weeksWorkedLast4Years: +e.target.value })} className="w-full p-3 rounded-lg border" />
                                    <p id={weeksHintId} className="text-xs text-slate-500 mt-1">Numero totale di settimane contributive negli ultimi 4 anni.</p>
                                </div>
                                <div>
                                    <label htmlFor={wagesId} className="flex items-center gap-1 text-sm font-medium text-slate-600 mb-1">
                                        Totale Imponibile Lordo
                                        <HelpCircle className="w-4 h-4 inline text-slate-400" aria-hidden="true" />
                                    </label>
                                    <input id={wagesId} aria-describedby={wagesHintId} type="number" min={0} value={inputData.totalGrossWagesLast4Years} onChange={e => setInputData({ ...inputData, totalGrossWagesLast4Years: +e.target.value })} className="w-full p-3 rounded-lg border" />
                                    <p id={wagesHintId} className="text-xs text-slate-500 mt-1">Somma delle retribuzioni imponibili ai fini previdenziali.</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label htmlFor={reasonId} className="block text-sm font-bold text-slate-700 mb-2">Motivo Cessazione</label>
                            <select id={reasonId} value={inputData.terminationReason} onChange={e => setInputData({ ...inputData, terminationReason: e.target.value as TerminationReason })} className="w-full p-4 rounded-xl border border-slate-300 bg-white">
                                {Object.values(TerminationReason).map(r => <option key={r} value={r}>{r}</option>)}
                            </select>
                        </div>
                    </>
                ) : (
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                        <h3 className="font-bold text-slate-900 mb-4">Dati da Lettera INPS</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor={daysApprovedId} className="block text-sm">Giorni Spettanti</label>
                                <input id={daysApprovedId} type="number" min={0} value={inputData.approvedDaysDuration} onChange={e => setInputData({ ...inputData, approvedDaysDuration: +e.target.value })} className="w-full p-3 rounded-lg border" />
                            </div>
                            <div>
                                <label htmlFor={monthlyApprovedId} className="block text-sm">Importo Mensile Lordo</label>
                                <input id={monthlyApprovedId} type="number" min={0} value={inputData.approvedMonthlyAmount} onChange={e => setInputData({ ...inputData, approvedMonthlyAmount: +e.target.value })} className="w-full p-3 rounded-lg border" />
                            </div>
                        </div>
                    </div>
                )}

                <button onClick={onCalculate} className="w-full bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
                    Calcola la mia NASpI <ArrowRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default CalculatorForm;
