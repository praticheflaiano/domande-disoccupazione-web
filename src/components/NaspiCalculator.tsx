import React, { useState, useRef } from 'react';
import { analyzeContributionDocument } from '../services/geminiService';
import { calculateNaspiEligibility, calculateNaspiFromDecree } from '../utils/calculations';
import { TerminationReason, VoluntaryException } from '../types';
import type { NaspiResult, UserInputData, CalculatorMode } from '../types';
import LegalDisclaimer from './LegalDisclaimer';
import StepIndicator from './calculator/StepIndicator';
import ModeSelector from './calculator/ModeSelector';
import DocumentUploader from './calculator/DocumentUploader';
import CalculatorForm from './calculator/CalculatorForm';
import ResultsView from './calculator/ResultsView';
import CalculatorSidebar from './calculator/CalculatorSidebar';

const NaspiCalculator: React.FC = () => {
    const [mode, setMode] = useState<CalculatorMode | null>(null);
    const [step, setStep] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [inputData, setInputData] = useState<UserInputData>({ age: 30, weeksWorkedLast4Years: 0, totalGrossWagesLast4Years: 0, terminationReason: TerminationReason.INVOLUNTARY, voluntaryException: VoluntaryException.NONE, hasWorked30DaysLastYear: true, terminationDate: new Date().toISOString().split('T')[0], approvedStartDate: '', approvedDaysDuration: 0, approvedMonthlyAmount: 0 });
    const [result, setResult] = useState<NaspiResult | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !mode) return;
        setLoading(true);
        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64Content = (reader.result as string).split(',')[1];
            const data = await analyzeContributionDocument(base64Content, file.type, mode);
            if (mode === 'forecast') setInputData(prev => ({ ...prev, weeksWorkedLast4Years: data.weeks || 0, totalGrossWagesLast4Years: data.wages || 0 }));
            else setInputData(prev => ({ ...prev, approvedStartDate: data.startDate || '', approvedDaysDuration: data.days || 0, approvedMonthlyAmount: data.monthlyAmount || 0 }));
            setLoading(false);
            setStep(2);
        };
        reader.readAsDataURL(file);
    };

    const handleCalculate = () => {
        setResult(mode === 'forecast' ? calculateNaspiEligibility(inputData) : calculateNaspiFromDecree(inputData));
        setStep(3);
    };

    const reset = () => { setStep(0); setResult(null); setMode(null); };

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* HEADER & PROGRESS */}
            <div className="mb-12 text-center">
                <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">Calcolatore NASpI 2026</h1>
                <p className="text-slate-500 max-w-2xl mx-auto mb-6">Stima dell'importo e della durata della tua indennità di disoccupazione in base ai parametri INPS 2026.</p>
                <LegalDisclaimer variant="calculator" className="max-w-3xl mx-auto mb-8 text-left" />
                <div className="flex justify-center gap-4 md:gap-12">
                    {[0, 1, 2, 3].map(i => <StepIndicator key={i} step={i} current={step} />)}
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 items-start">

                {/* MAIN INTERFACE */}
                <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden relative min-h-[500px]">
                    {loading && (
                        <div className="absolute inset-0 bg-white/90 z-50 flex flex-col items-center justify-center p-8 text-center">
                            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                            <h3 className="text-xl font-bold mb-2">Analisi documento in corso...</h3>
                            <p className="text-slate-500">L'Intelligenza Artificiale sta estraendo i dati previdenziali.</p>
                        </div>
                    )}

                    {step === 0 && (
                        <ModeSelector onSelect={(m) => { setMode(m); setStep(1); }} />
                    )}

                    {step === 1 && (
                        <DocumentUploader
                            fileInputRef={fileInputRef}
                            onFileChange={handleFileChange}
                            onSkip={() => setStep(2)}
                        />
                    )}

                    {step === 2 && mode && (
                        <CalculatorForm
                            mode={mode}
                            inputData={inputData}
                            setInputData={setInputData}
                            onCalculate={handleCalculate}
                        />
                    )}

                    {step === 3 && result && (
                        <ResultsView result={result} inputData={inputData} onReset={reset} />
                    )}
                </div>

                {/* SIDEBAR */}
                <CalculatorSidebar />

            </div>
        </div>
    );
};
export default NaspiCalculator;
