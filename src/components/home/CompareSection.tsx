import React from 'react';
import { Check, X, Minus } from 'lucide-react';
import Section from './Section';

type Mark = 'yes' | 'no' | 'partial';
interface Cell { mark: Mark; label: string; }
interface Column { name: string; sub: string; highlight?: boolean; cells: Cell[]; }

const AXES = [
    'Tempi di invio',
    'Controllo errori prima dell\'invio',
    'Assistenza umana dedicata',
    'Supporto se INPS rifiuta',
];

const COLUMNS: Column[] = [
    {
        name: 'Noi', sub: 'Centro Pratiche Flaiano', highlight: true,
        cells: [
            { mark: 'yes', label: 'Entro 24 h' },
            { mark: 'yes', label: 'Sì, prima dell\'invio' },
            { mark: 'yes', label: 'WhatsApp + telefono + sede Roma' },
            { mark: 'yes', label: 'Guida + indirizzamento' },
        ],
    },
    {
        name: 'INPS diretto', sub: 'portale www.inps.it',
        cells: [
            { mark: 'yes', label: 'Immediato (auto-servizio)' },
            { mark: 'no', label: 'Auto-compilazione' },
            { mark: 'no', label: 'Solo URP / contact center' },
            { mark: 'no', label: 'Devi gestirlo da solo' },
        ],
    },
    {
        name: 'Patronato fisico', sub: 'es. ACLI, INCA, ITAL',
        cells: [
            { mark: 'partial', label: 'Su appuntamento (giorni/settimane)' },
            { mark: 'yes', label: 'Sì' },
            { mark: 'yes', label: 'Sportello fisico' },
            { mark: 'yes', label: 'Ricorso amministrativo gratuito' },
        ],
    },
    {
        name: 'Commercialista', sub: 'studio professionale',
        cells: [
            { mark: 'partial', label: 'Su appuntamento' },
            { mark: 'yes', label: 'Sì' },
            { mark: 'yes', label: 'Su appuntamento' },
            { mark: 'yes', label: 'A pagamento' },
        ],
    },
];

const Icon: React.FC<{ mark: Mark }> = ({ mark }) => {
    if (mark === 'yes') return <Check aria-label="Sì" className="w-5 h-5 text-emerald-600 shrink-0" />;
    if (mark === 'no') return <X aria-label="No" className="w-5 h-5 text-slate-300 shrink-0" />;
    return <Minus aria-label="Parziale" className="w-5 h-5 text-amber-500 shrink-0" />;
};

const CompareSection: React.FC = () => (
    <Section title="Cosa cambia tra noi e le alternative">
        <p className="text-center text-slate-600 -mt-6 mb-10 max-w-2xl mx-auto">
            Confronto onesto, basato sulle differenze reali. Aggiorneremo questa tabella con i costi appena pubblicati.
        </p>

        {/* Mobile: una card per alternativa */}
        <div className="grid gap-4 md:hidden">
            {COLUMNS.map((col) => (
                <div key={col.name} className={`rounded-2xl border p-5 ${col.highlight ? 'border-teal-400 bg-teal-50 ring-2 ring-teal-200' : 'border-slate-200 bg-white'}`}>
                    <div className="mb-3">
                        <h3 className="font-bold text-lg text-slate-900">{col.name}</h3>
                        <p className="text-xs text-slate-500">{col.sub}</p>
                    </div>
                    <ul className="space-y-2">
                        {col.cells.map((cell, i) => (
                            <li key={i} className="flex gap-2 items-start text-sm">
                                <Icon mark={cell.mark} />
                                <div>
                                    <div className="font-medium text-slate-700">{AXES[i]}</div>
                                    <div className="text-slate-600">{cell.label}</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>

        {/* Desktop: tabella vera */}
        <div className="hidden md:block overflow-x-auto">
            <table className="w-full border-separate border-spacing-0 text-sm">
                <thead>
                    <tr>
                        <th className="text-left p-4 font-semibold text-slate-500 align-bottom">Aspetto</th>
                        {COLUMNS.map((col) => (
                            <th key={col.name} className={`text-left p-4 align-bottom ${col.highlight ? 'bg-teal-50 ring-2 ring-teal-400 rounded-t-xl' : ''}`}>
                                <div className="font-bold text-slate-900">{col.name}</div>
                                <div className="text-xs font-normal text-slate-500 mt-1">{col.sub}</div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {AXES.map((axis, i) => (
                        <tr key={axis} className="border-t border-slate-100">
                            <td className="p-4 font-medium text-slate-700 border-t border-slate-200">{axis}</td>
                            {COLUMNS.map((col) => (
                                <td key={col.name} className={`p-4 border-t border-slate-200 ${col.highlight ? 'bg-teal-50 ring-x-2 ring-teal-400' : ''}`}>
                                    <div className="flex gap-2 items-start">
                                        <Icon mark={col.cells[i].mark} />
                                        <span className="text-slate-700">{col.cells[i].label}</span>
                                    </div>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <p className="mt-6 text-xs text-slate-500 text-center max-w-3xl mx-auto">
            Patronati: gratuiti per legge tramite contributo ANCS sui datori di lavoro. INPS: portale ufficiale gratuito ma 100% auto-compilazione.
        </p>
    </Section>
);

export default CompareSection;
