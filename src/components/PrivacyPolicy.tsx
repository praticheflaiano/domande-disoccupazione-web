import React from 'react';

const PrivacyPolicy: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto p-8 animate-in fade-in duration-500">
            <h1 className="text-3xl font-bold text-slate-900 mb-8">Privacy Policy</h1>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-6 text-slate-700 leading-relaxed">
                <section>
                    <h2 className="text-xl font-bold text-slate-900 mb-2">1. Trattamento dei Dati</h2>
                    <p>
                        Il "Centro Pratiche Flaiano" rispetta la tua privacy. Questa applicazione **non salva** i tuoi dati personali (nome, documenti, buste paga) sui nostri server in modo permanente.
                        L'elaborazione dei documenti per il calcolo della NASpI avviene in tempo reale tramite servizi di Intelligenza Artificiale sicuri e i file vengono eliminati immediatamente dopo l'analisi.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-900 mb-2">2. Cookie e Local Storage</h2>
                    <p>
                        Utilizziamo esclusivamente cookie tecnici essenziali per il funzionamento del sito.
                        Alcuni dati (come le preferenze di calcolo) potrebbero essere salvati localmente sul tuo dispositivo (Local Storage) per migliorare l'esperienza utente, ma non sono accessibili a terzi.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-900 mb-2">3. Servizi Terzi</h2>
                    <p>
                        Il sito integra servizi di terze parti per:
                        <ul className="list-disc ml-5 mt-2 space-y-1">
                            <li><strong>Analisi AI:</strong> Google Gemini API (elaborazione dati anonimizzata).</li>
                            <li><strong>Modulistica:</strong> JotForm / Google Forms (per l'invio delle richieste).</li>
                        </ul>
                        Ogni servizio terzo agisce in conformità al GDPR.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-900 mb-2">4. Contatti</h2>
                    <p>Per qualsiasi informazione riguardante i tuoi dati, puoi contattarci presso la nostra sede o via email.</p>
                </section>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
