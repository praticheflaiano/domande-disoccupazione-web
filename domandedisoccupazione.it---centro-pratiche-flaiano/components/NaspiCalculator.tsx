import React, { useState, useRef, useEffect } from 'react';
import { Upload, CheckCircle, AlertCircle, Calculator, Calendar, BrainCircuit, Sparkles, ChevronRight, Check, FileText } from 'lucide-react';
import { analyzeContributionDocument } from '../services/geminiService';
import { calculateNaspiEligibility, calculateNaspiFromDecree } from '../utils/calculations';
import { ExtractedData, NaspiResult, TerminationReason, UserInputData, VoluntaryException, CalculatorMode } from '../types';
import Obligations from './Obligations';

const NaspiCalculator: React.FC = () => {
  const [mode, setMode] = useState<CalculatorMode | null>(null);
  const [step, setStep] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [loadingMessage, setLoadingMessage] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'details' | 'schedule'>('details');
  const [extractedData, setExtractedData] = useState<ExtractedData>({});
  
  const today = new Date().toISOString().split('T')[0];
  const [inputData, setInputData] = useState<UserInputData>({
    age: 30,
    weeksWorkedLast4Years: 0,
    totalGrossWagesLast4Years: 0,
    terminationReason: TerminationReason.INVOLUNTARY,
    voluntaryException: VoluntaryException.NONE,
    hasWorked30DaysLastYear: true,
    terminationDate: today,
    approvedStartDate: today,
    approvedDaysDuration: 0,
    approvedMonthlyAmount: 0
  });
  
  const [result, setResult] = useState<NaspiResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let interval: any;
    if (loading) {
      setLoadingProgress(0);
      const messages = [
        { progress: 10, text: "Caricamento documento..." },
        { progress: 40, text: "Analisi IA in corso..." },
        { progress: 70, text: "Estrazione dati..." },
        { progress: 90, text: "Finalizzazione..." }
      ];
      let msgIndex = 0;
      interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 95) return prev;
          if (msgIndex < messages.length && prev >= messages[msgIndex].progress) {
             setLoadingMessage(messages[msgIndex].text);
             msgIndex++;
          }
          return prev + 1.5;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleModeSelect = (selectedMode: CalculatorMode) => {
    setMode(selectedMode);
    setStep(1);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !mode) return;

    // Support PDF, Images, and XML
    const isValidType = 
        file.type.includes('pdf') || 
        file.type.includes('image') || 
        file.type.includes('xml') || 
        file.name.toLowerCase().endsWith('.xml');

    if (!isValidType) {
        setError("Formato non supportato. Usa PDF, JPG, PNG o XML (Uniemens).");
        return;
    }

    setLoading(true);
    setError(null);

    try {
      // Determine correct mime type if browser misses it for XML
      let mimeType = file.type;
      if (file.name.toLowerCase().endsWith('.xml') && !mimeType) {
          mimeType = 'text/xml';
      }

      const reader = new FileReader();
      const readFile = new Promise<string>((resolve, reject) => {
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const base64String = await readFile;
      // Extract base64 part
      const base64Content = base64String.split(',')[1];
      
      const data = await analyzeContributionDocument(base64Content, mimeType, mode);
      
      setLoadingProgress(100);
      setTimeout(() => {
        setExtractedData(data);
        // Pre-fill
        if (mode === 'forecast') {
            setInputData(prev => ({
                ...prev,
                weeksWorkedLast4Years: data.weeks || 0,
                totalGrossWagesLast4Years: data.wages || 0
            }));
        } else {
            setInputData(prev => ({
                ...prev,
                approvedStartDate: data.startDate || today,
                approvedDaysDuration: data.days || 0,
                approvedMonthlyAmount: data.monthlyAmount || 0
            }));
        }
        setStep(2);
        setLoading(false);
      }, 500);

    } catch (err) {
      console.error(err);
      setError("Si è verificato un errore durante l'analisi. Riprova o inserisci manualmente.");
      setLoading(false);
    }
  };

  const handleCalculate = () => {
    let calcResult: NaspiResult;
    if (mode === 'forecast') {
        calcResult = calculateNaspiEligibility(inputData);
    } else {
        calcResult = calculateNaspiFromDecree(inputData);
    }
    setResult(calcResult);
    setActiveTab(mode === 'analysis' ? 'schedule' : 'details');
    setStep(3);
  };

  const handleReset = () => {
    setStep(0); setMode(null); setResult(null); setExtractedData({}); setError(null);
    setInputData({ ...inputData, weeksWorkedLast4Years: 0, totalGrossWagesLast4Years: 0, approvedDaysDuration: 0, approvedMonthlyAmount: 0 });
  };

  // UI RENDERERS
  const renderLoading = () => (
    <div className="max-w-xl mx-auto py-12 text-center bg-white rounded-2xl shadow-sm border p-12">
        <div className="relative w-16 h-16 mx-auto mb-6">
            <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-75"></div>
            <BrainCircuit className="relative z-10 w-16 h-16 text-blue-600 animate-pulse" />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">{loadingMessage}</h3>
        <div className="w-full bg-slate-100 rounded-full h-2 mb-2 overflow-hidden max-w-xs mx-auto">
            <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${loadingProgress}%` }}></div>
        </div>
    </div>
  );

  if (loading) return renderLoading();

  return (
    <div className="w-full">
        {/* React 19 Metadata */}
        <title>Calcolo NASpI con Intelligenza Artificiale | Centro Flaiano</title>
        <meta name="description" content="Carica la tua busta paga o estratto conto. L'IA calcola in secondi quanto prenderai di disoccupazione NASpI." />

        {step === 0 && (
            <div className="max-w-4xl mx-auto py-8 px-4">
                <h2 className="text-3xl font-bold text-center mb-8">Scegli il tuo caso</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <div onClick={() => handleModeSelect('forecast')} className="bg-white p-8 rounded-2xl shadow-sm border hover:border-blue-400 cursor-pointer transition-all hover:shadow-lg">
                        <Calculator className="w-12 h-12 text-blue-600 mb-4" />
                        <h3 className="text-xl font-bold mb-2">Previsione (Estratto Contributivo)</h3>
                        <p className="text-slate-600">Carica il tuo estratto conto contributivo (PDF o XML) per stimare se hai diritto alla NASpI e a quanto ammonterà.</p>
                    </div>
                    <div onClick={() => handleModeSelect('analysis')} className="bg-white p-8 rounded-2xl shadow-sm border hover:border-purple-400 cursor-pointer transition-all hover:shadow-lg">
                        <FileText className="w-12 h-12 text-purple-600 mb-4" />
                        <h3 className="text-xl font-bold mb-2">Analisi (Lettera Accoglimento)</h3>
                        <p className="text-slate-600">Hai già la lettera dell'INPS? Caricala per generare il piano esatto dei pagamenti futuri.</p>
                    </div>
                </div>
            </div>
        )}

        {step === 1 && (
            <div className="max-w-2xl mx-auto py-8 px-4">
                <button onClick={() => setStep(0)} className="text-sm text-slate-500 hover:text-blue-600 mb-4">← Indietro</button>
                <div className="bg-white p-8 rounded-2xl shadow-sm border text-center">
                    <h2 className="text-2xl font-bold mb-4">Carica Documento</h2>
                    <p className="text-slate-600 mb-8">
                        {mode === 'forecast' ? "Carica l'Estratto Contributivo o le buste paga (PDF, XML, Immagine)." : "Carica la Lettera di Accoglimento o il Prospetto di Calcolo (PDF, Immagine)."}
                    </p>
                    
                    {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">{error}</div>}

                    <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-slate-300 rounded-xl p-10 cursor-pointer hover:bg-slate-50 hover:border-blue-400 transition-all"
                    >
                        <Upload className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                        <span className="font-bold text-slate-700">Clicca per caricare</span>
                        <p className="text-xs text-slate-400 mt-1">Supportati: PDF, XML, JPG, PNG</p>
                    </div>
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".pdf,image/*,.xml,text/xml,application/xml" />
                    
                    <div className="mt-6 pt-6 border-t">
                        <button onClick={() => setStep(2)} className="text-slate-500 text-sm hover:underline">Inserimento Manuale</button>
                    </div>
                </div>
            </div>
        )}

        {step === 2 && (
            <div className="max-w-3xl mx-auto py-8 px-4 animate-in fade-in">
                <div className="bg-white p-8 rounded-2xl shadow-sm border">
                    <h2 className="text-2xl font-bold mb-6">Verifica Dati</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Età</label>
                            <input type="number" value={inputData.age} onChange={e => setInputData({...inputData, age: +e.target.value})} className="w-full border p-2 rounded-lg" />
                        </div>
                        {mode === 'forecast' ? (
                            <>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Settimane Utili (ultimi 4 anni)</label>
                                    <input type="number" value={inputData.weeksWorkedLast4Years} onChange={e => setInputData({...inputData, weeksWorkedLast4Years: +e.target.value})} className="w-full border p-2 rounded-lg" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Imponibile Totale (ultimi 4 anni)</label>
                                    <input type="number" value={inputData.totalGrossWagesLast4Years} onChange={e => setInputData({...inputData, totalGrossWagesLast4Years: +e.target.value})} className="w-full border p-2 rounded-lg" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Data Cessazione</label>
                                    <input type="date" value={inputData.terminationDate} onChange={e => setInputData({...inputData, terminationDate: e.target.value})} className="w-full border p-2 rounded-lg" />
                                </div>
                            </>
                        ) : (
                            <>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Giorni Spettanti</label>
                                    <input type="number" value={inputData.approvedDaysDuration} onChange={e => setInputData({...inputData, approvedDaysDuration: +e.target.value})} className="w-full border p-2 rounded-lg" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Importo Mensile</label>
                                    <input type="number" value={inputData.approvedMonthlyAmount} onChange={e => setInputData({...inputData, approvedMonthlyAmount: +e.target.value})} className="w-full border p-2 rounded-lg" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Data Decorrenza</label>
                                    <input type="date" value={inputData.approvedStartDate} onChange={e => setInputData({...inputData, approvedStartDate: e.target.value})} className="w-full border p-2 rounded-lg" />
                                </div>
                            </>
                        )}
                    </div>
                    <div className="mt-8 flex gap-4">
                        <button onClick={() => setStep(1)} className="px-6 py-2 border rounded-lg hover:bg-slate-50">Indietro</button>
                        <button onClick={handleCalculate} className="flex-1 bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700">Calcola Risultato</button>
                    </div>
                </div>
            </div>
        )}

        {step === 3 && result && (
             <div className="max-w-4xl mx-auto py-8 px-4 animate-in fade-in">
                <div className="text-center mb-8">
                    {result.isEligible ? (
                        <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-1 rounded-full font-bold text-sm">
                            <CheckCircle className="w-4 h-4" /> Idoneo
                        </div>
                    ) : (
                         <div className="inline-flex items-center gap-2 bg-red-100 text-red-800 px-4 py-1 rounded-full font-bold text-sm">
                            <AlertCircle className="w-4 h-4" /> Non Idoneo
                        </div>
                    )}
                    <h2 className="text-3xl font-bold mt-4">Risultato Calcolo</h2>
                </div>

                {result.isEligible ? (
                    <>
                        <div className="grid md:grid-cols-3 gap-4 mb-8">
                             <div className="bg-white p-6 rounded-xl border shadow-sm">
                                <p className="text-xs text-slate-500 uppercase font-bold">Durata</p>
                                <p className="text-2xl font-bold">{result.totalDaysDuration} gg</p>
                             </div>
                             <div className="bg-white p-6 rounded-xl border shadow-sm">
                                <p className="text-xs text-slate-500 uppercase font-bold">Importo Lordo</p>
                                <p className="text-2xl font-bold text-blue-600">€ {result.grossMonthlyAmount.toFixed(2)}</p>
                             </div>
                             <div className="bg-white p-6 rounded-xl border shadow-sm">
                                <p className="text-xs text-slate-500 uppercase font-bold">Fine Prevista</p>
                                <p className="text-2xl font-bold text-slate-700">{result.endDate}</p>
                             </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                            <div className="flex border-b">
                                <button onClick={() => setActiveTab('details')} className={`flex-1 py-3 font-bold text-sm ${activeTab === 'details' ? 'bg-slate-50 text-blue-600' : 'text-slate-500'}`}>Dettagli</button>
                                <button onClick={() => setActiveTab('schedule')} className={`flex-1 py-3 font-bold text-sm ${activeTab === 'schedule' ? 'bg-slate-50 text-blue-600' : 'text-slate-500'}`}>Piano Pagamenti</button>
                            </div>
                            <div className="p-6">
                                {activeTab === 'details' ? <Obligations /> : (
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm">
                                            <thead>
                                                <tr className="text-left text-slate-500 border-b">
                                                    <th className="pb-2">Mese</th>
                                                    <th className="pb-2 text-right">Lordo</th>
                                                    <th className="pb-2 text-right">Netto Stima</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {result.schedule.map((row, i) => (
                                                    <tr key={i} className="border-b last:border-0 hover:bg-slate-50">
                                                        <td className="py-3 font-medium">{row.monthYear}</td>
                                                        <td className="py-3 text-right">€ {row.grossAmount.toFixed(2)}</td>
                                                        <td className="py-3 text-right font-bold text-green-600">€ {row.netAmount.toFixed(2)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="bg-red-50 p-6 rounded-xl border border-red-200 text-center">
                        <h3 className="text-red-800 font-bold mb-2">Requisiti non soddisfatti</h3>
                        <p className="text-red-700">{result.ineligibilityReason}</p>
                    </div>
                )}
                
                <div className="text-center mt-8">
                    <button onClick={handleReset} className="text-slate-500 underline">Nuovo Calcolo</button>
                </div>
             </div>
        )}
    </div>
  );
};

export default NaspiCalculator;