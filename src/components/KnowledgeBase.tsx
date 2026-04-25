import React, { useMemo, useState } from 'react';
import { ChevronDown, BookOpen, ShieldCheck, Search, HelpCircle, Briefcase, ArrowRight } from 'lucide-react';
import { FAQS, type FaqEntry, stripHtml } from '../data/faqs';

interface FAQCategory {
    label: string;
    icon: React.ReactNode;
    items: FaqEntry[];
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
    requisiti: <Briefcase className="w-5 h-5" />,
    dimissioni: <Briefcase className="w-5 h-5" />,
    obblighi: <ShieldCheck className="w-5 h-5" />,
};

function groupByCategory(entries: FaqEntry[]): FAQCategory[] {
    const order: string[] = [];
    const map = new Map<string, FaqEntry[]>();
    for (const entry of entries) {
        const label = entry.category ?? 'altro';
        if (!map.has(label)) {
            order.push(label);
            map.set(label, []);
        }
        map.get(label)!.push(entry);
    }
    return order.map(label => ({
        label,
        icon: CATEGORY_ICONS[label] ?? <HelpCircle className="w-5 h-5" />,
        items: map.get(label)!,
    }));
}

const KnowledgeBase: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const categories = useMemo(() => groupByCategory(FAQS), []);

    const term = searchTerm.toLowerCase();
    const filteredFaqs = categories.map(category => ({
        ...category,
        items: category.items.filter(item =>
            item.question.toLowerCase().includes(term) ||
            stripHtml(item.answer).toLowerCase().includes(term)
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
                                            <div
                                                className="mt-4 px-4 leading-relaxed text-slate-600 pl-11"
                                                dangerouslySetInnerHTML={{ __html: item.answer }}
                                            />
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
                    Consulta il nostro Manuale Completo NASpI 2026 per approfondimenti su decurtazione, sospensione e compatibilità lavorativa.
                </p>
                <a
                    href="/manuale"
                    className="bg-teal-600 text-white px-8 py-3 rounded-full font-bold hover:bg-teal-700 transition-colors shadow-lg hover:shadow-xl inline-flex items-center gap-2"
                >
                    Apri il Manuale Completo <ArrowRight className="w-5 h-5" />
                </a>
            </div>
        </div>
    );
};

export default KnowledgeBase;
