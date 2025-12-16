import React from 'react';
import { ClipboardList, UserCheck, Briefcase, SearchCheck } from 'lucide-react';

const Obligations: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mt-8">
      <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
        <ClipboardList className="w-6 h-6 text-blue-600" />
        Obblighi e Passi Successivi
      </h3>
      
      <div className="space-y-6">
        <div className="flex gap-4">
          <div className="flex-shrink-0 mt-1">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">1</div>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900">Presentazione Domanda</h4>
            <p className="text-slate-600 text-sm mt-1">
              La domanda deve essere presentata all'INPS <strong>entro 68 giorni</strong> dalla cessazione del rapporto di lavoro, esclusivamente in via telematica.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-shrink-0 mt-1">
             <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">2</div>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 flex items-center gap-2">
              DID (Dichiarazione di Immediata Disponibilità)
            </h4>
            <p className="text-slate-600 text-sm mt-1">
              La presentazione della domanda di NASpI equivale a resa della DID. Da quel momento sei formalmente a disposizione per nuove offerte di lavoro.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-shrink-0 mt-1">
             <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">3</div>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 flex items-center gap-2">
              SIISL e Patto di Servizio
            </h4>
            <p className="text-slate-600 text-sm mt-1">
              Entro 15 giorni dalla domanda, devi registrarti al portale <strong>SIISL</strong> (Sistema Informativo per l'Inclusione Sociale e Lavorativa) e sottoscrivere il Patto di Servizio Personalizzato.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-shrink-0 mt-1">
             <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">4</div>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 flex items-center gap-2">
              Iscrizione al SIPRO <span className="text-xs font-normal text-slate-500 ml-1">(Sistema Informativo per la Ricerca di Occupazione)</span>
            </h4>
            <div className="mt-2 text-sm text-slate-600">
              <p className="mb-2">
                È fondamentale completare l'iscrizione al <strong>SIPRO</strong>. Questo strumento digitale è progettato per ottimizzare l'incontro tra domanda e offerta di lavoro.
              </p>
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 space-y-2 mb-3">
                <div className="flex items-start gap-2">
                   <SearchCheck className="w-4 h-4 text-blue-600 mt-0.5" />
                   <p><strong className="text-blue-800">Profilazione Avanzata:</strong> Il sistema analizza le tue competenze per proporti offerte in linea con il tuo profilo professionale.</p>
                </div>
                <div className="flex items-start gap-2">
                   <Briefcase className="w-4 h-4 text-blue-600 mt-0.5" />
                   <p><strong className="text-blue-800">Obbligo di Attivazione:</strong> L'utilizzo attivo del SIPRO per la ricerca lavoro è condizione necessaria per mantenere il diritto alla NASpI (principio di condizionalità).</p>
                </div>
                <div className="flex items-start gap-2">
                   <UserCheck className="w-4 h-4 text-blue-600 mt-0.5" />
                   <p><strong className="text-blue-800">Monitoraggio:</strong> Le attività svolte sulla piattaforma vengono tracciate e verificate dai Centri per l'Impiego durante gli appuntamenti periodici.</p>
                </div>
              </div>
              
              <div className="bg-amber-50 border-l-4 border-amber-400 p-3 text-amber-800">
                <strong>Attenzione:</strong> La mancata partecipazione alle iniziative di politica attiva o l'assenza di ricerca attiva tramite SIPRO può comportare la decurtazione o la decadenza della NASpI.
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-shrink-0 mt-1">
             <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">5</div>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900">Comunicazione Reddito Presunto</h4>
            <p className="text-slate-600 text-sm mt-1">
              Se prevedi di svolgere attività lavorativa autonoma o subordinata durante la NASpI, devi comunicare il reddito annuo presunto (Modello NASpI-Com) entro 30 giorni dall'inizio dell'attività.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Obligations;