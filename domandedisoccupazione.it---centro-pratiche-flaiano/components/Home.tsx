import React, { useState, useEffect } from 'react';
import { Calculator, ShieldCheck, ArrowRight, FileText, Banknote, CheckCircle2, Star, Sparkles, Send, Rocket, MessageCircle } from 'lucide-react';
import { Page } from '../types';

interface HomeProps {
  onNavigate: (page: Page) => void;
}

const PracticeCounter = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    // Simple count up animation
    const target = 1843 + Math.floor((new Date().getTime() - new Date('2023-01-01').getTime()) / (1000 * 60 * 60 * 24) * 2.4);
    let start = 0;
    const duration = 2000;
    const startTime = performance.now();

    const animate = (time: number) => {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 4); 
        setCount(Math.floor(start + (target - start) * ease));
        if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, []);
  return <>{count.toLocaleString('it-IT')}</>;
};

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="animate-in fade-in duration-500">
      {/* React 19 Metadata */}
      <title>Home | domandedisoccupazione.it - Centro Flaiano</title>
      <meta name="description" content="Il portale ufficiale per la tua disoccupazione NASpI. Calcoli precisi, anticipo per Partita IVA e invio pratiche online con il supporto del Centro Pratiche Flaiano." />
      
      {/* HERO SECTION */}
      <div className="relative bg-slate-900 pt-16 pb-32 overflow-hidden rounded-b-[40px] shadow-2xl">
        {/* CSS Pattern Background */}
        <div className="absolute inset-0 opacity-10" 
             style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}>
        </div>
        
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/50 border border-slate-700 text-blue-300 text-xs font-bold uppercase tracking-wider mb-8 backdrop-blur-md">
                <Sparkles className="w-3 h-3" /> Centro Pratiche Flaiano
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight">
                La tua disoccupazione,<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-200 to-purple-400">semplice e sicura.</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                Il portale ufficiale per la gestione della NASpI. Calcola la tua indennità in tempo reale e invia la domanda con il supporto dei nostri esperti.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button 
                    onClick={() => onNavigate('calculator')}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-blue-900/50 hover:-translate-y-1"
                >
                    <Calculator className="w-5 h-5" />
                    Calcola NASpI
                </button>
                <button 
                    onClick={() => onNavigate('apply')}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-slate-900 hover:bg-slate-100 px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:-translate-y-1"
                >
                    <Send className="w-5 h-5 text-green-600" />
                    Richiedi Online
                </button>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 border-t border-slate-800 pt-8 text-left md:text-center">
                <div className="p-4">
                    <div className="text-3xl font-bold text-white mb-1"><PracticeCounter /></div>
                    <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">Pratiche Gestite</div>
                </div>
                <div className="p-4">
                    <div className="text-3xl font-bold text-white mb-1">99.8%</div>
                    <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">Tasso Accoglimento</div>
                </div>
                <div className="p-4">
                    <div className="text-3xl font-bold text-white mb-1">24h</div>
                    <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">Tempo Risposta</div>
                </div>
                <div className="p-4">
                    <div className="text-3xl font-bold text-white mb-1 flex items-center md:justify-center gap-1">
                        4.9 <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    </div>
                    <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">Recensioni Google</div>
                </div>
            </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="py-20 max-w-6xl mx-auto px-4">
         <div className="text-center mb-16">
             <h2 className="text-3xl font-bold text-slate-900">Come funziona?</h2>
             <p className="text-slate-600 mt-2">Tre passaggi per ottenere la tua liquidazione.</p>
         </div>

         <div className="grid md:grid-cols-3 gap-8">
             {/* Step 1 */}
             <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-9xl text-slate-300 select-none group-hover:scale-110 transition-transform">1</div>
                 <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
                     <Calculator className="w-8 h-8" />
                 </div>
                 <h3 className="text-xl font-bold text-slate-900 mb-3 relative">Calcola Importo</h3>
                 <p className="text-slate-600 text-sm relative">Utilizza il nostro simulatore gratuito. Puoi caricare il tuo Estratto Contributivo per una stima precisa grazie all'IA.</p>
             </div>

             {/* Step 2 */}
             <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-9xl text-slate-300 select-none group-hover:scale-110 transition-transform">2</div>
                 <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mb-6 text-green-600">
                     <FileText className="w-8 h-8" />
                 </div>
                 <h3 className="text-xl font-bold text-slate-900 mb-3 relative">Invia Documenti</h3>
                 <p className="text-slate-600 text-sm relative">Compila il modulo online. Un nostro consulente verificherà la correttezza della pratica prima dell'invio all'INPS.</p>
             </div>

             {/* Step 3 */}
             <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-9xl text-slate-300 select-none group-hover:scale-110 transition-transform">3</div>
                 <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mb-6 text-purple-600">
                     <Banknote className="w-8 h-8" />
                 </div>
                 <h3 className="text-xl font-bold text-slate-900 mb-3 relative">Ricevi Accredito</h3>
                 <p className="text-slate-600 text-sm relative">Ti assistiamo fino alla liquidazione, incluso il supporto per il Patto di Servizio e le comunicazioni obbligatorie.</p>
             </div>
         </div>
      </div>

      {/* FEATURE GRID */}
      <div className="bg-slate-50 py-20 border-y border-slate-200">
          <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
              <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                      Perché scegliere il<br/>
                      <span className="text-blue-600">Centro Pratiche Flaiano?</span>
                  </h2>
                  <p className="text-slate-600 mb-8 text-lg leading-relaxed">
                      Non siamo un semplice algoritmo. Siamo un ufficio reale a Roma con professionisti che mettono la faccia nel proprio lavoro.
                  </p>
                  
                  <div className="space-y-6">
                      <div className="flex gap-4">
                          <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                          <div>
                              <h4 className="font-bold text-slate-900">Controllo Umano</h4>
                              <p className="text-sm text-slate-600">Ogni pratica viene revisionata manualmente per evitare errori bloccanti.</p>
                          </div>
                      </div>
                      <div className="flex gap-4">
                          <ShieldCheck className="w-6 h-6 text-blue-500 flex-shrink-0" />
                          <div>
                              <h4 className="font-bold text-slate-900">Sicurezza Dati</h4>
                              <p className="text-sm text-slate-600">I tuoi documenti sono trattati con la massima riservatezza e conformità GDPR.</p>
                          </div>
                      </div>
                      <div className="flex gap-4">
                          <MessageCircle className="w-6 h-6 text-purple-500 flex-shrink-0" />
                          <div>
                              <h4 className="font-bold text-slate-900">Assistenza WhatsApp</h4>
                              <p className="text-sm text-slate-600">Dubbi? Scrivici direttamente. Rispondiamo in orario d'ufficio.</p>
                          </div>
                      </div>
                  </div>

                  <button onClick={() => onNavigate('office')} className="mt-8 text-blue-600 font-bold border-b-2 border-blue-600 pb-0.5 hover:text-blue-800 transition-colors flex items-center gap-2">
                      Vieni a trovarci in sede <ArrowRight className="w-4 h-4" />
                  </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                  <div onClick={() => onNavigate('calculator')} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
                      <Calculator className="w-8 h-8 text-blue-600 mb-4" />
                      <h4 className="font-bold text-slate-900">Simulatore</h4>
                      <p className="text-xs text-slate-500 mt-1">Calcola importo e durata</p>
                  </div>
                  <div onClick={() => onNavigate('anticipo')} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-purple-300 hover:shadow-md transition-all cursor-pointer transform translate-y-8">
                      <Rocket className="w-8 h-8 text-purple-600 mb-4" />
                      <h4 className="font-bold text-slate-900">Anticipo</h4>
                      <p className="text-xs text-slate-500 mt-1">Liquidazione unica soluzione</p>
                  </div>
                  <div onClick={() => onNavigate('apply')} className="bg-blue-600 p-6 rounded-2xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all cursor-pointer text-white">
                      <Send className="w-8 h-8 text-white mb-4" />
                      <h4 className="font-bold">Richiedi Ora</h4>
                      <p className="text-xs text-blue-100 mt-1">Procedura 100% Online</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 transform translate-y-8 flex flex-col justify-center items-center text-center">
                      <div className="text-3xl font-bold text-slate-900">4.9/5</div>
                      <div className="flex text-yellow-400 my-1">
                          <Star className="w-3 h-3 fill-current" />
                          <Star className="w-3 h-3 fill-current" />
                          <Star className="w-3 h-3 fill-current" />
                          <Star className="w-3 h-3 fill-current" />
                          <Star className="w-3 h-3 fill-current" />
                      </div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">Recensioni Clienti</p>
                  </div>
              </div>
          </div>
      </div>

      {/* CTA FOOTER */}
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Non perdere tempo prezioso.</h2>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto">La domanda di disoccupazione ha scadenze rigide. Verifica oggi stesso i tuoi diritti.</p>
          <button 
            onClick={() => onNavigate('apply')}
            className="bg-slate-900 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-xl hover:bg-slate-800 transition-all hover:-translate-y-1"
          >
              Inizia la Pratica
          </button>
      </div>
    </div>
  );
};

export default Home;