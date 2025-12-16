import React, { useEffect, useState, useRef } from 'react';
import { Rocket, Clock, AlertTriangle, FileText, CheckCircle2, MessageCircle, Calculator, ChevronRight, Euro, Upload, BrainCircuit, Sparkles } from 'lucide-react';
import { calculateAnticipo } from '../utils/calculations';
import { analyzeContributionDocument } from '../services/geminiService';
import { AnticipoResult } from '../types';

const AnticipoNaspi: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'info' | 'calculator'>('info');
  
  // State per il calcolatore
  const [formData, setFormData] = useState({
      startDate: '',
      totalDays: 0,
      monthlyAmount: 0,
      requestDate: new Date().toISOString().split('T')[0]
  });
  const [result, setResult] = useState<AnticipoResult | null>(null);

  // State per AI Upload
  const [loading, setLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [isAiData, setIsAiData] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Caricamento script per il widget (Check for duplicate)
    const scriptUrl = "https://link.arcanis.it/js/form_embed.js";
    let script = document.querySelector(`script[src="${scriptUrl}"]`) as HTMLScriptElement;
    
    if (!script) {
        script = document.createElement('script');
        script.src = scriptUrl;
        script.type = "text/javascript";
        script.async = true;
        document.body.appendChild(script);
    }
    
    // No cleanup needed
  }, []);

  // Effect per animazione caricamento AI
  useEffect(() => {
    let interval: any;
    if (loading) {
      setLoadingProgress(0);
      const messages = [
        { progress: 10, text: "Caricamento lettera..." },
        { progress: 30, text: "Lettura dati INPS..." },
        { progress: 60, text: "Estrazione importi e durata..." },
        { progress: 90, text: "Compilazione modulo..." }
      ];
      let msgIndex = 0;
      interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 95) return prev;
          if (msgIndex < messages.length && prev >= messages[msgIndex].progress) {
             setLoadingMessage(messages[msgIndex].text);
             msgIndex++;
          }
          return prev + (Math.random() * 3);
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check validity
    const isValidType = 
        file.type.includes('pdf') || 
        file.type.includes('image') || 
        file.type.includes('xml') || 
        file.name.toLowerCase().endsWith('.xml');

    if (!isValidType) {
        alert("Formato non supportato. Usa PDF, JPG, PNG o XML.");
        return;
    }

    setLoading(true);
    setLoadingMessage("Inizializzazione...");
    
    try {
      // Determine correct mime type
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
      const base64Content = base64String.split(',')[1];
      
      // Riutilizziamo la modalità 'analysis' che cerca startDate, days, monthlyAmount
      const data = await analyzeContributionDocument(base64Content, mimeType, 'analysis');
      
      setLoadingProgress(100);
      setTimeout(() => {
          setFormData(prev => ({
              ...prev,
              startDate: data.startDate || prev.startDate,
              totalDays: data.days || prev.totalDays,
              monthlyAmount: data.monthlyAmount || prev.monthlyAmount,
              // requestDate rimane quella odierna/selezionata
          }));
          setIsAiData(true);
          setLoading(false);
      }, 800);

    } catch (error) {
        console.error(error);
        alert("Errore durante l'analisi del file. Inserisci i dati manualmente.");
        setLoading(false);
    }
  };

  const handleCalculate = () => {
      if (!formData.startDate || !formData.totalDays || !formData.monthlyAmount || !formData.requestDate) {
          alert("Compila tutti i campi per procedere al calcolo.");
          return;
      }
      
      const res = calculateAnticipo({
          naspiStartDate: formData.startDate,
          totalDays: formData.totalDays,
          monthlyGrossAmount: formData.monthlyAmount,
          anticipoRequestDate: formData.requestDate
      });
      setResult(res);
  };

  return (
    <div className="animate-in fade-in duration-500">
      {/* React 19 Metadata */}
      <title>Anticipo NASpI in Unica Soluzione | Incentivo Autoimprenditorialità</title>
      <meta name="description" content="Vuoi aprire Partita IVA? Richiedi l'anticipo NASpI. Calcola quanto ti spetta in un'unica soluzione e invia la domanda." />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 font-sans">Anticipo NASpI</h1>
            <p className="text-xl text-purple-200 max-w-2xl mx-auto leading-relaxed">
                Vuoi avviare una tua attività? 
                Calcola e richiedi la liquidazione dell'intera NASpI in un'unica soluzione.
            </p>
            
            {/* Tab Switcher */}
            <div className="flex justify-center gap-4 mt-8">
                <button 
                    onClick={() => setActiveTab('info')}
                    className={`px-6 py-2 rounded-full font-bold transition-all ${activeTab === 'info' ? 'bg-white text-purple-900 shadow-lg' : 'bg-purple-800/50 text-purple-200 hover:bg-purple-700'}`}
                >
                    Informazioni
                </button>
                <button 
                    onClick={() => setActiveTab('calculator')}
                    className={`px-6 py-2 rounded-full font-bold transition-all flex items-center gap-2 ${activeTab === 'calculator' ? 'bg-white text-purple-900 shadow-lg' : 'bg-purple-800/50 text-purple-200 hover:bg-purple-700'}`}
                >
                    <Calculator className="w-4 h-4" /> Calcolatore
                </button>
            </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        
        {activeTab === 'calculator' ? (
            // --- SECTION CALCOLATORE ---
            <div className="animate-in slide-in-from-bottom-4 fade-in duration-500 max-w-3xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                    <div className="bg-slate-50 p-6 border-b border-slate-200 flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                                <Calculator className="w-6 h-6 text-purple-600" />
                                Simulazione Importo Anticipo
                            </h2>
                            <p className="text-slate-600 mt-2 text-sm">
                                Calcola il residuo netto spettante per l'autoimprenditorialità.
                            </p>
                        </div>
                        {isAiData && (
                            <div className="flex items-center gap-1 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold">
                                <Sparkles className="w-3 h-3" /> Dati IA
                            </div>
                        )}
                    </div>
                    
                    {/* Upload Section or Loading */}
                    {loading ? (
                         <div className="p-12 text-center bg-slate-50 border-b border-slate-100">
                            <div className="relative w-16 h-16 mx-auto mb-4">
                                <div className="absolute inset-0 bg-purple-200 rounded-full animate-ping opacity-75"></div>
                                <div className="relative bg-white p-3 rounded-full border-2 border-purple-200 flex items-center justify-center h-full w-full z-10">
                                     <BrainCircuit className="w-8 h-8 text-purple-600 animate-pulse" />
                                </div>
                            </div>
                            <h3 className="font-bold text-slate-800 mb-2">{loadingMessage}</h3>
                            <div className="w-48 h-1.5 bg-slate-200 rounded-full mx-auto overflow-hidden">
                                <div className="h-full bg-purple-600 transition-all duration-300" style={{ width: `${loadingProgress}%` }}></div>
                            </div>
                        </div>
                    ) : (
                        <div className="p-6 bg-purple-50/50 border-b border-purple-100">
                             <div 
                                onClick={() => fileInputRef.current?.click()}
                                className="border-2 border-dashed border-purple-300 bg-white hover:bg-purple-50 hover:border-purple-400 transition-all rounded-xl p-6 text-center cursor-pointer group"
                            >
                                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                    <Upload className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-slate-800">Carica Lettera Accoglimento</h3>
                                <p className="text-xs text-slate-500 mt-1">
                                    L'IA estrarrà data, durata e importo per te (Supporto PDF, XML).
                                </p>
                            </div>
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                className="hidden" 
                                onChange={handleFileChange}
                                accept="application/pdf,image/jpeg,image/png,text/xml,application/xml,.xml"
                            />
                        </div>
                    )}

                    
                    <div className="p-8 grid md:grid-cols-2 gap-8 relative">
                        {/* Overlay visivo se stiamo caricando (opzionale, qui gestito scambiando il blocco sopra) */}
                        
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Data Inizio NASpI</label>
                                <div className="relative">
                                    <input 
                                        type="date" 
                                        className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-200 outline-none transition-all text-slate-900 ${isAiData && formData.startDate ? 'border-purple-400 bg-purple-50' : 'border-slate-300 bg-white'}`}
                                        value={formData.startDate}
                                        onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                                    />
                                    {isAiData && formData.startDate && <Sparkles className="absolute right-3 top-3.5 w-4 h-4 text-purple-500 animate-pulse" />}
                                </div>
                                <p className="text-xs text-slate-400 mt-1">La data di decorrenza indicata dall'INPS</p>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Giorni Totali Spettanti</label>
                                <div className="relative">
                                    <input 
                                        type="number" 
                                        className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-200 outline-none transition-all text-slate-900 ${isAiData && formData.totalDays ? 'border-purple-400 bg-purple-50' : 'border-slate-300 bg-white'}`}
                                        placeholder="Es. 730"
                                        value={formData.totalDays || ''}
                                        onChange={(e) => setFormData({...formData, totalDays: Number(e.target.value)})}
                                    />
                                    {isAiData && formData.totalDays > 0 && <Sparkles className="absolute right-3 top-3.5 w-4 h-4 text-purple-500 animate-pulse" />}
                                </div>
                            </div>
                        </div>
                        <div className="space-y-6">
                             <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Importo Mensile Lordo</label>
                                <div className="relative">
                                    <Euro className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                                    <input 
                                        type="number" 
                                        className={`w-full p-3 pl-10 border rounded-xl focus:ring-2 focus:ring-purple-200 outline-none transition-all text-slate-900 ${isAiData && formData.monthlyAmount ? 'border-purple-400 bg-purple-50' : 'border-slate-300 bg-white'}`}
                                        placeholder="Es. 1200.00"
                                        value={formData.monthlyAmount || ''}
                                        onChange={(e) => setFormData({...formData, monthlyAmount: Number(e.target.value)})}
                                    />
                                    {isAiData && formData.monthlyAmount > 0 && <Sparkles className="absolute right-3 top-3.5 w-4 h-4 text-purple-500 animate-pulse" />}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Data Presunta Domanda</label>
                                <input 
                                    type="date" 
                                    className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-200 outline-none bg-white text-slate-900"
                                    value={formData.requestDate}
                                    onChange={(e) => setFormData({...formData, requestDate: e.target.value})}
                                />
                                <p className="text-xs text-slate-400 mt-1">Data in cui invierai la richiesta di anticipo</p>
                            </div>
                        </div>
                    </div>

                    <div className="px-8 pb-8">
                        <button 
                            onClick={handleCalculate}
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-purple-200 transition-all active:scale-95 flex items-center justify-center gap-2"
                        >
                            Calcola Importo Unico <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>

                    {result && (
                        <div className="bg-purple-50 border-t border-purple-100 p-8 animate-in fade-in slide-in-from-top-4">
                            <h3 className="text-center text-purple-900 font-bold mb-6 uppercase tracking-wider text-sm">Risultato Simulazione</h3>
                            
                            <div className="grid md:grid-cols-2 gap-8 items-center">
                                <div className="text-center md:text-left">
                                    <div className="text-sm text-slate-500 mb-1">Importo Lordo Totale</div>
                                    <div className="text-4xl font-black text-purple-700">
                                        € {result.totalGrossAmount.toLocaleString('it-IT', {minimumFractionDigits: 2})}
                                    </div>
                                    <div className="text-xs text-purple-600 mt-2 font-medium bg-purple-100 inline-block px-3 py-1 rounded-full">
                                        Per {result.daysRemaining} giorni residui
                                    </div>
                                </div>

                                <div className="space-y-3 bg-white p-4 rounded-xl border border-purple-100 shadow-sm">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-600">Lordo:</span>
                                        <span className="font-bold">€ {result.totalGrossAmount.toLocaleString('it-IT')}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-600">Irpef (Stima 23%*):</span>
                                        <span className="text-red-500">- € {result.estimatedTax.toLocaleString('it-IT')}</span>
                                    </div>
                                    <div className="border-t border-slate-100 pt-2 flex justify-between items-center">
                                        <span className="font-bold text-slate-800">Netto Stimato:</span>
                                        <span className="font-bold text-green-600 text-lg">€ {result.estimatedNetAmount.toLocaleString('it-IT')}</span>
                                    </div>
                                    <p className="text-[10px] text-slate-400 italic mt-1 leading-tight">
                                        * L'anticipo è soggetto a <strong>tassazione separata</strong>. L'aliquota applicata dall'INPS è provvisoria (solitamente 23%), il conguaglio avverrà con l'Agenzia delle Entrate.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="mt-8 text-center">
                                <p className="text-slate-600 mb-4">L'importo ti soddisfa? Procedi con la richiesta ufficiale.</p>
                                <button onClick={() => setActiveTab('info')} className="text-purple-700 font-bold hover:underline">
                                    Vai al modulo di richiesta &rarr;
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        ) : (
            // --- SECTION INFO & FORM ---
            <div className="grid lg:grid-cols-3 gap-10">
                {/* Left Content: Info */}
                <div className="lg:col-span-2 space-y-8 animate-in slide-in-from-left-4 fade-in">
                    
                    {/* Intro Card */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-purple-100 p-3 rounded-full text-purple-600">
                                <Rocket className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900">Incentivo all'autoimprenditorialità</h2>
                        </div>
                        <p className="text-slate-600 leading-relaxed mb-4">
                            L'anticipazione della NASpI è un beneficio destinato ai lavoratori che decidono di rimettersi in gioco avviando un'attività lavorativa autonoma.
                        </p>
                        <p className="text-slate-600 leading-relaxed">
                            Invece di ricevere l'assegno mensilmente, ricevi il <strong>residuo totale</strong> in un bonifico unico per finanziare il tuo nuovo progetto.
                        </p>
                    </div>

                    {/* Requisiti */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                        <h3 className="text-xl font-bold text-slate-900 mb-6">Quando puoi richiederlo?</h3>
                        <ul className="space-y-4">
                            <li className="flex gap-4">
                                <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                                <div>
                                    <strong className="block text-slate-900">Avvio Attività Autonoma</strong>
                                    <p className="text-sm text-slate-500">Apertura di una Partita IVA come libero professionista o ditta individuale.</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                                <div>
                                    <strong className="block text-slate-900">Impresa Individuale o Società</strong>
                                    <p className="text-sm text-slate-500">Costituzione di un'impresa o sottoscrizione di quote di capitale sociale di una cooperativa.</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Scadenze e Rischi */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-amber-50 p-6 rounded-xl border border-amber-200">
                            <div className="flex items-center gap-2 mb-3 text-amber-800 font-bold">
                                <Clock className="w-5 h-5" />
                                Scadenza Tassativa
                            </div>
                            <p className="text-sm text-amber-900">
                                La domanda deve essere presentata <strong>entro 30 giorni</strong> dalla data di inizio dell'attività autonoma.
                            </p>
                        </div>
                        <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                            <div className="flex items-center gap-2 mb-3 text-red-800 font-bold">
                                <AlertTriangle className="w-5 h-5" />
                                Vincolo di Restituzione
                            </div>
                            <p className="text-sm text-red-900">
                                Se instauri un rapporto di lavoro subordinato prima della scadenza del periodo coperto, dovrai <strong>restituire tutto</strong>.
                            </p>
                        </div>
                    </div>

                    {/* CTA WhatsApp */}
                    <div className="bg-green-50 p-8 rounded-2xl border border-green-200 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h3 className="text-xl font-bold text-green-900 mb-2">Hai dubbi sui requisiti?</h3>
                            <p className="text-green-700">Contatta il Centro Pratiche Flaiano. Verifichiamo la tua situazione prima di inviare la domanda.</p>
                        </div>
                        <a 
                            href="https://wa.me/393716230690?text=INFORMAZIONI%20ANTICIPO%20NASPI" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 transition-all shadow-lg hover:scale-105 whitespace-nowrap"
                        >
                            <MessageCircle className="w-5 h-5" />
                            Scrivici su WhatsApp
                        </a>
                    </div>
                </div>

                {/* Right Content: Form Widget */}
                <div className="lg:col-span-1 animate-in slide-in-from-right-4 fade-in">
                    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden sticky top-24">
                        <div className="bg-slate-50 p-4 border-b border-slate-200">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-purple-600" />
                                Richiedi Anticipo Online
                            </h3>
                        </div>
                        
                        {/* Iframe Form */}
                        <div className="bg-white min-h-[600px]">
                            <iframe 
                                src="https://link.arcanis.it/widget/survey/EYbHdr9ktQI562e3nWrV" 
                                style={{border: 'none', width: '100%', minHeight: '600px'}} 
                                scrolling="no" 
                                id="EYbHdr9ktQI562e3nWrV" 
                                title="survey"
                            ></iframe>
                        </div>

                        <div className="p-4 bg-slate-100 border-t border-slate-200 text-center text-xs text-slate-500">
                            Servizio gestito dal Centro Pratiche Flaiano
                        </div>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default AnticipoNaspi;