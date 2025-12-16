import React, { useState } from 'react';
import { BookOpen, HelpCircle, Briefcase, AlertTriangle, Baby, FileText, ChevronDown, ChevronUp } from 'lucide-react';

const FAQItem = ({ question, answer, icon }: { question: string, answer: React.ReactNode, icon?: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-slate-200 rounded-lg bg-white overflow-hidden mb-3">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-3">
            {icon && <span className="text-blue-600">{icon}</span>}
            <span className="font-semibold text-slate-800">{question}</span>
        </div>
        {isOpen ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 text-slate-600 text-sm leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
};

const KnowledgeBase: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 animate-in fade-in">
      {/* React 19 Metadata */}
      <title>Guida e Domande Frequenti NASpI | Knowledge Base</title>
      <meta name="description" content="Tutto quello che devi sapere sulla NASpI: requisiti, dimissioni per giusta causa, maternità e compatibilità con lavoro autonomo o dipendente." />

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Guida Completa alla NASpI</h2>
        <p className="text-slate-600">
            Tutte le informazioni normative aggiornate verificate dal Centro Pratiche Flaiano di Roma.
        </p>
      </div>

      <div className="grid gap-8">
        {/* Sezione Requisiti */}
        <section>
          <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-600" />
            Requisiti Fondamentali
          </h3>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <ul className="space-y-4">
                <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm mt-0.5">1</div>
                    <div>
                        <strong className="block text-slate-900">Stato di Disoccupazione Involontaria</strong>
                        <span className="text-slate-600 text-sm">Devi aver perso il lavoro non per tua volontà (licenziamento, scadenza contratto). Le dimissioni volontarie sono escluse, salvo eccezioni specifiche.</span>
                    </div>
                </li>
                <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm mt-0.5">2</div>
                    <div>
                        <strong className="block text-slate-900">Requisito Contributivo</strong>
                        <span className="text-slate-600 text-sm">Almeno <strong>13 settimane</strong> di contributi versati nei 4 anni precedenti l'inizio del periodo di disoccupazione.</span>
                    </div>
                </li>
            </ul>
          </div>
        </section>

        {/* Sezione Casistiche Speciali */}
        <section>
          <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-amber-500" />
            Casistiche Speciali e Dimissioni
          </h3>
          <FAQItem 
            question="Ho dato le dimissioni, ho diritto alla NASpI?"
            answer={
                <div>
                    <p className="mb-2">Di norma NO. Tuttavia, hai diritto alla NASpI in caso di:</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Dimissioni per Giusta Causa:</strong> (es. mancato pagamento stipendi, mobbing, molestie, trasferimento sede oltre 50km). In questo caso va allegata la diffida o la documentazione probatoria.</li>
                        <li><strong>Periodo Tutelato (Maternità):</strong> Dimissioni presentate durante il periodo di gravidanza (da 300 giorni prima della data presunta parto) fino al compimento di 1 anno di età del bambino.</li>
                        <li><strong>Risoluzione Consensuale:</strong> Solo se avvenuta nell'ambito della procedura di conciliazione presso l'Ispettorato del Lavoro (obbligatoria per aziende >15 dipendenti per licenziamenti GMO).</li>
                    </ul>
                </div>
            }
          />
           <FAQItem 
            question="Licenziamento Disciplinare"
            answer="Sì, il licenziamento disciplinare (anche per giusta causa o giustificato motivo soggettivo) dà diritto alla NASpI, in quanto la perdita del lavoro è comunque considerata indipendente dalla volontà di disoccuparsi, sebbene legata a un comportamento del lavoratore."
          />
        </section>

        {/* Compatibilità Lavoro */}
        <section>
          <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-green-600" />
            Lavorare durante la NASpI
          </h3>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
             <p className="mb-4 text-sm text-slate-700">È possibile lavorare mantenendo la NASpI, ma con precisi limiti di reddito e obblighi di comunicazione (Modello NASpI-Com).</p>
             
             <div className="grid md:grid-cols-2 gap-4">
                 <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100">
                     <h4 className="font-bold text-slate-900 mb-2">Lavoro Subordinato</h4>
                     <p className="text-sm text-slate-600 mb-2">Limite reddito annuo: <strong>€ 8.500</strong></p>
                     <p className="text-xs text-slate-500">Se il contratto è inferiore a 6 mesi, la NASpI si sospende d'ufficio. Se il reddito è sotto soglia, si riduce l'importo dell'80% del reddito previsto.</p>
                 </div>
                 <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100">
                     <h4 className="font-bold text-slate-900 mb-2">Lavoro Autonomo / P.IVA</h4>
                     <p className="text-sm text-slate-600 mb-2">Limite reddito annuo: <strong>€ 5.500</strong></p>
                     <p className="text-xs text-slate-500">Obbligo di comunicazione del reddito presunto entro 30 giorni dall'inizio attività. L'importo NASpI sarà ridotto dell'80% del reddito dichiarato.</p>
                 </div>
             </div>
          </div>
        </section>

         {/* Anticipo NASpI */}
         <section>
          <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <FileText className="w-6 h-6 text-purple-600" />
            Anticipo NASpI (Incentivo all'Autoimprenditorialità)
          </h3>
          <FAQItem 
            question="Posso ottenere tutta la NASpI in un'unica soluzione?"
            answer={
                <div>
                    <p className="mb-2">Sì, se intendi avviare un'attività di lavoro autonomo, un'impresa individuale o sottoscrivere quote di capitale sociale di una cooperativa.</p>
                    <p className="mb-2"><strong>Condizioni:</strong></p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>La domanda va presentata entro 30 giorni dall'inizio dell'attività autonoma.</li>
                        <li>Se ti rioccupi come dipendente prima della scadenza del periodo coperto dall'anticipo, dovrai restituire l'intero importo.</li>
                    </ul>
                </div>
            }
          />
        </section>
      </div>
    </div>
  );
};

export default KnowledgeBase;