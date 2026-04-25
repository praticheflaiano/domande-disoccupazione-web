import React from 'react';
import { CheckCircle2, AlertCircle, Briefcase } from 'lucide-react';
import Section from './Section';
import Card from './Card';

const RequisitiSection: React.FC = () => (
    <Section title="Requisiti NASpI 2026">
        <div className="grid md:grid-cols-3 gap-6">
            <Card
                icon={Briefcase}
                title="Stato di Disoccupazione"
                text="La perdita del lavoro deve essere involontaria (licenziamento, scadenza contratto). Non spetta per dimissioni volontarie (salvo giusta causa o maternità)."
            />
            <Card
                icon={CheckCircle2}
                title="13 Settimane"
                highlight={true}
                text="Devi aver maturato almeno 13 settimane di contributi negli ultimi 4 anni precedenti la disoccupazione."
            />
            <Card
                icon={AlertCircle}
                title="Novità 2026"
                text={<span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-medium">Importante: Nuova Regola</span>}
            />
        </div>
        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start">
            <div className="bg-amber-100 p-3 rounded-xl"><AlertCircle className="w-6 h-6 text-amber-600" /></div>
            <div>
                <h3 className="text-lg font-bold text-amber-900 mb-2">Requisito dimissioni (in vigore dal 2025, confermato nel 2026)</h3>
                <p className="text-amber-800 leading-relaxed">
                    Dal 1° gennaio 2025, se ti sei dimesso (o risoluzione consensuale) da un rapporto a tempo indeterminato nei <strong>12 mesi precedenti</strong> il licenziamento attuale, devi aver maturato almeno <strong>13 settimane di contributi nel nuovo rapporto di lavoro</strong> per accedere alla NASpI.
                </p>
            </div>
        </div>
    </Section>
);

export default RequisitiSection;
