import React from 'react';
import { CheckSquare, Monitor, FileSignature, UserCheck, AlertOctagon } from 'lucide-react';

const Obligations: React.FC = () => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 p-6 border-b border-slate-200 flex items-center justify-between">
                <h3 className="text-xl font-bold flex items-center gap-2"><CheckSquare className="w-6 h-6 text-emerald-600" /> I Tuoi Obblighi (2025)</h3>
                <span className="text-xs font-bold bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full uppercase">Aggiornato</span>
            </div>

            <div className="p-6 md:p-8 space-y-8">

                {/* SEZIONE SIISL */}
                <section>
                    <h4 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
                        <Monitor className="w-5 h-5 text-blue-600" /> Piattaforma SIISL & PAD
                    </h4>
                    <p className="text-slate-600 mb-6 text-sm">
                        Dal 24 Novembre 2024, tutti i percettori NASpI sono iscritti d'ufficio al <strong>Sistema Informativo per l'Inclusione Sociale e Lavorativa (SIISL)</strong>.
                        La procedura è obbligatoria per mantenere il sussidio.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 relative">
                            <div className="absolute -top-3 -left-3 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold shadow-sm">1</div>
                            <h5 className="font-bold text-blue-900 mb-2 mt-2">Iscrizione Automatica</h5>
                            <p className="text-xs text-blue-800">L'INPS ti iscrive al SIISL contestualmente alla domanda. Riceverai una notifica di avvenuta iscrizione.</p>
                        </div>
                        <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 relative">
                            <div className="absolute -top-3 -left-3 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold shadow-sm">2</div>
                            <h5 className="font-bold text-blue-900 mb-2 mt-2">Accesso entro 15gg</h5>
                            <p className="text-xs text-blue-800">Devi accedere alla piattaforma SIISL e aggiornare il tuo CV <strong>entro 15 giorni</strong> dall'accoglimento.</p>
                        </div>
                        <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 relative">
                            <div className="absolute -top-3 -left-3 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold shadow-sm">3</div>
                            <h5 className="font-bold text-blue-900 mb-2 mt-2">Firma del PAD</h5>
                            <p className="text-xs text-blue-800">Sottoscrivi online il <strong>Patto di Attivazione Digitale</strong>. Successivamente sarai convocato dal CPI per il PSP.</p>
                        </div>
                    </div>
                </section>

                <div className="border-t border-slate-100"></div>

                {/* ATTIVITA OBBLIGATORIE */}
                <section>
                    <h4 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
                        <UserCheck className="w-5 h-5 text-indigo-600" /> Attività Obbligatorie (Programma GOL)
                    </h4>
                    <p className="text-sm text-slate-600 mb-4">
                        Il programma <strong>GOL (Garanzia Occupabilità Lavoratori)</strong> ti assegnerà a uno di 4 percorsi in base al tuo profilo (Assessment):
                    </p>
                    <div className="grid sm:grid-cols-2 gap-3 mb-4">
                        <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-100">
                            <strong className="text-indigo-900 text-sm block mb-1">1. Reinserimento Lavorativo</strong>
                            <span className="text-xs text-indigo-800">Per chi è pronto subito al lavoro. Servizi di orientamento e intermediazione.</span>
                        </div>
                        <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-100">
                            <strong className="text-indigo-900 text-sm block mb-1">2. Aggiornamento (Upskilling)</strong>
                            <span className="text-xs text-indigo-800">Corsi brevi per aggiornare le competenze esistenti.</span>
                        </div>
                        <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-100">
                            <strong className="text-indigo-900 text-sm block mb-1">3. Riqualificazione (Reskilling)</strong>
                            <span className="text-xs text-indigo-800">Formazione approfondita per cambiare mansione o settore.</span>
                        </div>
                        <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-100">
                            <strong className="text-indigo-900 text-sm block mb-1">4. Lavoro e Inclusione</strong>
                            <span className="text-xs text-indigo-800">Supporto intensivo per situazioni di disagio sociale complesso.</span>
                        </div>
                    </div>

                    <ul className="space-y-3">
                        <li className="flex items-start gap-3 text-sm text-slate-700">
                            <FileSignature className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                            <span><strong>Patto di Servizio Personalizzato (PSP):</strong> È il contratto che firmi col CPI. Definisce il tuo percorso GOL.</span>
                        </li>
                    </ul>
                </section>

                <div className="border-t border-slate-100"></div>

                {/* SANZIONI */}
                <section className="bg-red-50 rounded-xl p-6 border border-red-100">
                    <h4 className="font-bold text-red-800 text-lg mb-4 flex items-center gap-2">
                        <AlertOctagon className="w-5 h-5" /> Sistema Sanzionatorio
                    </h4>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-red-900/60 font-semibold border-b border-red-200">
                                <tr>
                                    <th className="pb-2">Violazione</th>
                                    <th className="pb-2">1ª Assenza</th>
                                    <th className="pb-2">2ª Assenza</th>
                                    <th className="pb-2">3ª Assenza</th>
                                </tr>
                            </thead>
                            <tbody className="text-red-900 font-medium">
                                <tr className="border-b border-red-200 bg-red-50/50">
                                    <td className="py-3 pr-4">Mancata presentazione al CPI</td>
                                    <td className="py-3">-8 gg prestazione</td>
                                    <td className="py-3">-1 mese</td>
                                    <td className="py-3 font-bold">DECADENZA</td>
                                </tr>
                                <tr>
                                    <td className="py-3 pr-4">Assenza a Corsi Formazione</td>
                                    <td className="py-3">-1 mese</td>
                                    <td className="py-3 font-bold">DECADENZA</td>
                                    <td className="py-3">-</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p className="text-xs text-red-700 mt-3 opacity-80">
                        * La decadenza comporta la perdita totale del sussidio e dello stato di disoccupazione.
                    </p>
                </section>

            </div>
        </div>
    );
};

export default Obligations;
