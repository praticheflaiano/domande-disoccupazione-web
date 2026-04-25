import React from 'react';
import Section from './Section';
import ConversionCTA from '../ConversionCTA';

const STEPS = [
    { step: 1, title: "Verifica", desc: "Controlla i requisiti e prepara le ultime buste paga." },
    { step: 2, title: "Calcolo", desc: "Usa il nostro simulatore per stimare l'importo." },
    { step: 3, title: "Invio", desc: "Invia la domanda tramite il nostro servizio online o Patronato." },
    { step: 4, title: "DID", desc: "Registrati al Centro per l'Impiego (DID online)." }
];

const HowToApplySection: React.FC = () => (
    <Section title="Come Richiederla">
        <div className="mb-10">
            <ConversionCTA
                headline="Fai fare tutto a noi in 24 ore"
                subline="Il nostro team inoltra la tua pratica all'INPS in giornata. Ti basta inviare i documenti via WhatsApp, al resto pensiamo noi — dalla verifica dei requisiti alla firma del mandato."
            />
        </div>
        <div className="grid md:grid-cols-4 gap-4">
            {STEPS.map((s) => (
                <div key={s.step} className="bg-white p-6 rounded-2xl border text-center hover:border-blue-300 transition-colors">
                    <div className="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">{s.step}</div>
                    <h4 className="font-bold text-lg mb-2">{s.title}</h4>
                    <p className="text-sm text-slate-500">{s.desc}</p>
                </div>
            ))}
        </div>
        <div className="mt-12 text-center">
            <p className="mb-6 text-slate-600 max-w-2xl mx-auto">
                La domanda va presentata entro <strong>68 giorni</strong> dalla cessazione del rapporto di lavoro, pena la decadenza del diritto.
            </p>
            <a href="/richiedi" className="inline-block bg-blue-600 text-white px-10 py-4 rounded-full font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                Inizia la Richiesta Online
            </a>
        </div>
    </Section>
);

export default HowToApplySection;
