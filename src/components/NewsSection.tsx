import React, { useState } from 'react';
import { newsData } from '../data/news';
import { Calendar, Megaphone, AlertCircle, ArrowRight, ArrowUp, Tag } from 'lucide-react';

const NewsSection: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('Tutte');
    const categories = ['Tutte', 'Normativa', 'Pagamenti', 'Bonus', 'Agricola'];

    const filteredNews = selectedCategory === 'Tutte'
        ? newsData
        : newsData.filter(item => item.category === selectedCategory);

    const [expandedId, setExpandedId] = useState<string | null>(null);

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <div className="max-w-6xl mx-auto p-4 py-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
                        <Megaphone className="w-8 h-8 text-teal-600" /> Ultime Notizie
                    </h2>
                    <p className="text-slate-500 mt-1">Aggiornamenti ufficiali INPS e Ministero del Lavoro.</p>
                </div>

                <div className="flex gap-2 bg-white p-1 rounded-xl shadow-sm border border-slate-200 overflow-x-auto max-w-full">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${selectedCategory === cat ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
                {filteredNews.map((news) => (
                    <article key={news.id} className={`bg-white rounded-2xl p-6 border transition-all hover:shadow-lg ${news.isImportant ? 'border-red-200 shadow-red-50/50' : 'border-slate-100 shadow-sm'}`}>
                        <div className="flex justify-between items-start mb-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 ${news.category === 'Normativa' ? 'bg-blue-100 text-blue-700' :
                                news.category === 'Pagamenti' ? 'bg-emerald-100 text-emerald-700' :
                                    news.category === 'Bonus' ? 'bg-amber-100 text-amber-700' :
                                        'bg-slate-100 text-slate-700'
                                }`}>
                                <Tag className="w-3 h-3" /> {news.category}
                            </span>
                            <span className="text-slate-400 text-sm flex items-center gap-1">
                                <Calendar className="w-3 h-3" /> {new Date(news.date).toLocaleDateString('it-IT')}
                            </span>
                        </div>

                        <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight">{news.title}</h3>

                        {news.isImportant && (
                            <div className="bg-red-50 text-red-800 text-xs font-bold px-3 py-2 rounded-lg mb-3 flex items-center gap-2">
                                <AlertCircle className="w-4 h-4" />
                                IMPORTANTE
                            </div>
                        )}

                        <p className="text-slate-600 mb-4 text-sm leading-relaxed">{news.summary}</p>

                        {expandedId === news.id && (
                            <div className="bg-slate-50 p-4 rounded-xl text-sm text-slate-700 mb-4 border border-slate-100 italic animate-in slide-in-from-top-2 duration-300">
                                {news.content}
                            </div>
                        )}

                        <div className="flex justify-between items-center text-xs text-slate-400 border-t border-slate-100 pt-4 mt-auto">
                            <span>Fonte: {news.source}</span>
                            <button
                                onClick={() => toggleExpand(news.id)}
                                className="text-teal-600 font-bold hover:underline flex items-center gap-1 bg-teal-50 px-3 py-1.5 rounded-lg transition-colors hover:bg-teal-100"
                            >
                                {expandedId === news.id ? (
                                    <>Chiudi <ArrowUp className="w-4 h-4" /></>
                                ) : (
                                    <>Leggi <ArrowRight className="w-4 h-4" /></>
                                )}
                            </button>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
};

export default NewsSection;
