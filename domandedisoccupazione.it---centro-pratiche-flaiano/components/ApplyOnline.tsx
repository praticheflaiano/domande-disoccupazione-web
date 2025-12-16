import React, { useEffect } from 'react';
import { CheckCircle2, ShieldCheck, Zap, MessageCircle } from 'lucide-react';

const ApplyOnline: React.FC = () => {

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

  return (
    <div className="animate-in fade-in duration-500">
      {/* React 19 Metadata */}
      <title>Richiedi NASpI Online | Procedura Veloce CAF</title>
      <meta name="description" content="Invia la tua domanda di disoccupazione NASpI online senza file. Assistenza dedicata e verifica documenti inclusa." />

      {/* Header Section */}
      <div className="bg-gradient-to-br from-blue-900 to-slate-900 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Richiesta NASpI Online</h1>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
                Affida la tua pratica agli esperti del Centro Flaiano comodamente da casa.
                Compila il modulo, carica i documenti e noi pensiamo a tutto il resto.
            </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 grid lg:grid-cols-3 gap-8 -mt-8">
          
          {/* Left Column: Benefits & Support */}
          <div className="lg:col-span-1 space-y-6">
              
              {/* Benefits */}
              <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-green-500">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Perché farlo online?</h3>
                  <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                              <Zap className="w-4 h-4" />
                          </div>
                          <div>
                              <strong className="block text-slate-900 text-sm">Velocità</strong>
                              <p className="text-xs text-slate-500">Nessuna fila allo sportello. La tua pratica viene lavorata con priorità digitale.</p>
                          </div>
                      </li>
                      <li className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                              <ShieldCheck className="w-4 h-4" />
                          </div>
                          <div>
                              <strong className="block text-slate-900 text-sm">Revisione Esperta</strong>
                              <p className="text-xs text-slate-500">Un consulente verifica i documenti prima dell'invio per evitare errori o rigetti.</p>
                          </div>
                      </li>
                      <li className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 flex-shrink-0">
                              <CheckCircle2 className="w-4 h-4" />
                          </div>
                          <div>
                              <strong className="block text-slate-900 text-sm">Ricevuta Ufficiale</strong>
                              <p className="text-xs text-slate-500">Riceverai il protocollo ufficiale INPS via email appena la domanda sarà inoltrata.</p>
                          </div>
                      </li>
                  </ul>
              </div>

              {/* Documents List */}
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 text-sm text-slate-700">
                  <h4 className="font-bold text-blue-800 mb-2">Documenti necessari</h4>
                  <p className="mb-2">Tieni a portata di mano:</p>
                  <ul className="list-disc pl-5 space-y-1 mb-4">
                      <li>Carta d'identità e Codice Fiscale</li>
                      <li>Ultima busta paga</li>
                      <li>Contratto di lavoro (o lettera licenziamento)</li>
                      <li>IBAN per l'accredito</li>
                  </ul>
                  <p className="text-xs text-slate-500">Potrai caricare le foto o i PDF direttamente nel modulo.</p>
              </div>

               {/* WhatsApp Support Button */}
               <div className="bg-green-600 p-6 rounded-xl shadow-lg text-white">
                    <h3 className="font-bold mb-2 flex items-center gap-2">
                        <MessageCircle className="w-5 h-5" />
                        Serve aiuto?
                    </h3>
                    <p className="text-sm text-green-100 mb-4">
                        Se hai difficoltà nella compilazione o dubbi sui documenti, scrivici subito.
                    </p>
                    <a 
                        href="https://wa.me/393716230690?text=INFORMAZIONI%20NASPI" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-center bg-white text-green-600 font-bold py-2 rounded-lg hover:bg-green-50 transition-colors"
                    >
                        Chatta su WhatsApp
                    </a>
               </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden min-h-[600px]">
              <iframe 
                src="https://link.arcanis.it/widget/survey/sImJrbagruVY43JLeqA9" 
                style={{border: 'none', width: '100%', minHeight: '800px'}} 
                scrolling="yes" 
                id="sImJrbagruVY43JLeqA9" 
                title="Modulo Richiesta NASpI"
              ></iframe>
          </div>

      </div>
    </div>
  );
};

export default ApplyOnline;