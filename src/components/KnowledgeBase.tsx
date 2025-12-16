import React, { useState } from 'react';
import { ChevronDown, BookOpen, AlertCircle, Gavel, ShieldCheck, Search, HelpCircle, Briefcase, ArrowRight } from 'lucide-react';

interface FAQItem {
    question: string;
    answer: React.ReactNode;
}

interface FAQCategory {
    label: string;
    icon: React.ReactNode;
    items: FAQItem[];
}

const faqs: FAQCategory[] = [
    {
        label: 'requisiti',
        icon: <Briefcase className="w-5 h-5" />,
        items: [
            {
                question: "Quali sono i requisiti aggiornati per il 2025?",
                answer: (
                    <div className="space-y-2">
                        <p>Per accedere alla NASpI nel 2025 devi soddisfare tre requisiti fondamentali:</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li><strong>Stato di Disoccupazione:</strong> Essere privi di impiego e aver dato la disponibilità al lavoro (DID).</li>
                            <li><strong>Requisito Contributivo:</strong> Almeno 13 settimane di contributi versati nei 4 anni precedenti l'inizio della disoccupazione.</li>
                            <li><strong>Requisito Lavorativo:</strong> (Abolito dal 2022) Non sono più necessarie le 30 giornate di lavoro effettivo nell'ultimo anno.</li>
                        </ul>
                        <div className="bg-blue-50 p-3 rounded-lg text-sm border-l-4 border-blue-500 mt-2">
                            <strong>Novità 2025:</strong> Regole più stringenti per chi si dimette volontariamente da un nuovo impiego e richiede la NASpI residua.
                        </div>
                    </div>
                )
            }
        ]
    },
    {
        label: 'dimissioni',
        icon: <Briefcase className="w-5 h-5" />,
        items: [
            {
                question: "Quando spettano le Dimissioni per Giusta Causa?",
                answer: (
                    <div className="space-y-3">
                        <p>Le dimissioni per giusta causa danno diritto alla NASpI perché equiparate al licenziamento. Ecco l'elenco delle casistiche ammesse dalla giurisprudenza:</p>
                        <div className="grid md:grid-cols-2 gap-3 text-sm">
                            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                                <strong className="flex items-center gap-2 text-red-600 mb-1"><AlertCircle className="w-4 h-4" /> Mancato Stipendio</strong>
                                Mancato pagamento della retribuzione per almeno 2 mensilità.
                            </div>
                            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                                <strong className="flex items-center gap-2 text-indigo-600 mb-1"><Gavel className="w-4 h-4" /> Mobbing / Molestie</strong>
                                Gravi condotte vessatorie da parte di superiori o colleghi (richiede prova).
                            </div>
                        </div>
                    </div>
                )
            },
            {
                question: "Dimissioni Genitori (Maternità/Paternità): Come funzionano?",
                answer: (
                    <div className="space-y-2">
                        <p>Le dimissioni volontarie presentate durante il periodo tutelato non richiedono "giusta causa" e danno diritto alla NASpI.</p>
                        <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 mt-3">
                            <h4 className="font-bold text-emerald-800 mb-2 flex items-center gap-2"><ShieldCheck className="w-5 h-5" /> Procedura di Convalida (Obbligatoria)</h4>
                            <p className="text-sm text-emerald-700">
                                Queste dimissioni <strong>DEVONO essere convalidate</strong> presso l'Ispettorato Territoriale del Lavoro (ITL).
                            </p>
                        </div>
                    </div>
                )
            },
            {
                question: "Cosa cambia nel 2025 per le dimissioni volontarie?",
                answer: (
                    <div>
                        <p className="mb-2">Dal 1° Gennaio 2025, se ti dimetti volontariamente da un nuovo lavoro (senza giusta causa) e avevi una NASpI sospesa o residua:</p>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600 mb-3">
                            <li>Per riaccedere alla NASpI, devi aver maturato almeno <strong>13 settimane</strong> di contributi nel nuovo rapporto.</li>
                        </ul>
                    </div>
                )
            }
        ]
    },
    {
        label: 'obblighi',
        icon: <ShieldCheck className="w-5 h-5" />,
        items: [
            {
                question: "Quali sono i nuovi obblighi SIISL?",
                answer: "Per il 2025 è attiva la piattaforma SIISL. Tutti i percettori sono iscritti d'ufficio. Devi accedere entro 15gg per firmare il PAD (Patto Attivazione Digitale), pena sanzioni."
            }
        ]
    }
];

interface KnowledgeBaseProps {
    onNavigate: (page: any) => void;
}

const KnowledgeBase: React.FC<KnowledgeBaseProps> = ({ onNavigate }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredFaqs = faqs.map(category => ({
        ...category,
        items: category.items.filter(item =>
            item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (typeof item.answer === 'string' && item.answer.toLowerCase().includes(searchTerm.toLowerCase()))
        )
    })).filter(category => category.items.length > 0);

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 animate-in slide-in-from-bottom-4 duration-700">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-slate-800 mb-4">Domande Frequenti</h2>
                <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
                    Trova risposte immediate sui requisiti, le scadenze e le modalità di calcolo della NASpI.
                </p>

                {/* Search Bar */}
                <div className="relative max-w-xl mx-auto">
                    <input
                        type="text"
                        placeholder="Cerca una domanda..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-full border border-slate-300 shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                    />
                    <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                </div>
            </div>

            <div className="space-y-6">
                {filteredFaqs.length > 0 ? (
                    filteredFaqs.map((category, index) => (
                        <div key={index} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8 hover:shadow-md transition-shadow">
                            <h3 className="text-xl font-bold text-teal-700 mb-6 flex items-center gap-2 border-b border-slate-100 pb-2 capitalize">
                                {category.icon}
                                {category.label}
                            </h3>
                            <div className="space-y-4">
                                {category.items.map((item, idx) => (
                                    <div key={idx} className="group">
                                        <details className="group [&_summary::-webkit-details-marker]:hidden">
                                            <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-slate-50 p-4 text-slate-900 font-medium transition-colors hover:bg-slate-100">
                                                <h4 className="flex items-start gap-2 text-left">
                                                    <HelpCircle className="w-5 h-5 text-slate-400 mt-0.5 shrink-0 group-open:text-teal-600" />
                                                    {item.question}
                                                </h4>
                                                <ChevronDown className="w-5 h-5 shrink-0 transition duration-300 group-open:-rotate-180" />
                                            </summary>
                                            <div className="mt-4 px-4 leading-relaxed text-slate-600 pl-11">
                                                {item.answer}
                                            </div>
                                        </details>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-12 text-slate-500">
                        <p>Nessun risultato trovato per "{searchTerm}"</p>
                    </div>
                )}
            </div>

            {/* CTA Section */}
            <div className="mt-12 bg-teal-50 rounded-2xl p-8 text-center border border-teal-100">
                <BookOpen className="w-12 h-12 text-teal-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-teal-900 mb-2">Non hai trovato la risposta?</h3>
                <p className="text-teal-700 mb-6 max-w-lg mx-auto">
                    Consulta il nostro Manuale Completo NASpI 2025 per approfondimenti su decurtazione, sospensione e compatibilità lavorativa.
                </p>
                <button
                    onClick={() => onNavigate('guide-book')}
                    className="bg-teal-600 text-white px-8 py-3 rounded-full font-bold hover:bg-teal-700 transition-colors shadow-lg hover:shadow-xl inline-flex items-center gap-2"
                >
                    Apri il Manuale Completo <ArrowRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default KnowledgeBase;
