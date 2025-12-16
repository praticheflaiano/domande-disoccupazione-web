import React, { useState } from 'react';
import { CheckCircle2, Calendar, Euro, AlertCircle, Briefcase, GraduationCap, ArrowRight, BookOpen } from 'lucide-react';
import { Page } from '../types';

interface HomeProps { onNavigate: (page: Page) => void; }

const PracticeCounter = () => {
    const [count] = useState(1843);
    return <span className="font-mono">{count.toLocaleString('it-IT')}</span>;
};

const Section = ({ title, children, className = "" }: { title: string, children: React.ReactNode, className?: string }) => (
    <section className={`py-16 px-4 ${className}`}>
        <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">{title}</h2>
            {children}
        </div>
    </section>
);

const Card = ({ icon: Icon, title, text, highlight = false }: { icon: any, title: string, text: React.ReactNode, highlight?: boolean }) => (
    <div className={`p-6 rounded-2xl border transition-all hover:-translate-y-1 duration-300 ${highlight ? 'bg-blue-600 text-white shadow-xl border-blue-500' : 'bg-white text-slate-700 shadow-sm border-slate-200 hover:shadow-md'}`}>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${highlight ? 'bg-white/20' : 'bg-blue-50 text-blue-600'}`}>
            <Icon className="w-6 h-6" />
        </div>
        <h3 className={`text-xl font-bold mb-3 ${highlight ? 'text-white' : 'text-slate-900'}`}>{title}</h3>
        <div className="text-sm leading-relaxed opacity-90">{text}</div>
    </div>
);

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
    return (
        <div className="space-y-12 pb-12">

            {/* HERO SECTION */}
            <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8 animate-in slide-in-from-left duration-700">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 border border-teal-100 text-teal-700 font-medium text-sm shadow-sm backdrop-blur-sm">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                                </span>
                                Aggiornato alla Normativa 2025
                            </div>
                            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                                La Tua NASpI, <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">Semplificata.</span>
                            </h1>
                            <p className="text-xl text-slate-600 max-w-lg leading-relaxed">
                                Il portale esperto per calcolare, richiedere e gestire la tua indennità di disoccupazione.
                                Niente burocrazia, solo chiarezza.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={() => onNavigate('calculator')}
                                    className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/20 transition-all duration-300 flex items-center justify-center gap-2 group"
                                >
                                    Calcola Ora
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                                <button
                                    onClick={() => onNavigate('guide-book')}
                                    className="px-8 py-4 bg-white text-slate-700 border-2 border-slate-100 rounded-2xl font-bold text-lg hover:border-teal-100 hover:bg-teal-50/50 transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                    <BookOpen className="w-5 h-5 text-teal-600" />
                                    Guida 2025
                                </button>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-slate-500 pt-4">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-400">
                                            U
                                        </div>
                                    ))}
                                </div>
                                <p>Oltre 10.000 utenti aiutati quest'anno</p>
                            </div>
                        </div>

                        {/* Hero Image */}
                        <div className="relative animate-in slide-in-from-right duration-1000 delay-200 hidden lg:block">
                            <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-gradient-to-bl from-teal-100/50 to-blue-100/50 rounded-full blur-3xl opacity-60 animate-pulse"></div>
                            <img
                                src="/assets/hero_illustration_v2.png"
                                alt="NASpI Simplification"
                                className="w-full h-auto drop-shadow-2xl animate-float hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURES GRID */}
            <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8 -mt-10 relative z-20">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 backdrop-blur-md bg-opacity-80">
                    <div className="text-4xl font-bold text-slate-900 mb-1"><PracticeCounter /></div>
                    <div className="text-sm font-medium text-slate-600">Pratiche Gestite</div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 backdrop-blur-md bg-opacity-80">
                    <div className="text-4xl font-bold text-slate-900 mb-1">99.8%</div>
                    <div className="text-sm font-medium text-slate-600">Accoglimento</div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 backdrop-blur-md bg-opacity-80">
                    <div className="text-4xl font-bold text-slate-900 mb-1">24h</div>
                    <div className="text-sm font-medium text-slate-600">Tempo Medio</div>
                </div>
            </div>

            {/* REQUISITI SECTION */}
            <Section title="Requisiti NASpI 2025">
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
                        title="Novità 2025"
                        text={<span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-medium">Importante: Nuova Regola</span>}
                    />
                </div>
                <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start">
                    <div className="bg-amber-100 p-3 rounded-xl"><AlertCircle className="w-6 h-6 text-amber-600" /></div>
                    <div>
                        <h3 className="text-lg font-bold text-amber-900 mb-2">Attenzione al nuovo requisito 2025</h3>
                        <p className="text-amber-800 leading-relaxed">
                            Dal 1° gennaio 2025, se ti sei dimesso (o risoluzione consensuale) da un rapporto a tempo indeterminato nei <strong>12 mesi precedenti</strong> il licenziamento attuale, devi aver maturato almeno <strong>13 settimane di contributi nel nuovo rapporto di lavoro</strong> per accedere alla NASpI.
                        </p>
                    </div>
                </div>
            </Section>

            {/* CALCOLO SECTION */}
            <Section title="Durata e Importo" className="bg-slate-50">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0"><Calendar className="w-6 h-6" /></div>
                            <div>
                                <h3 className="font-bold text-xl mb-1">Durata: 50% del Lavoro</h3>
                                <p className="text-slate-600">La NASpI spetta per un numero di settimane pari alla metà delle settimane contributive degli ultimi 4 anni. Durata massima: <strong>24 mesi</strong>.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0"><Euro className="w-6 h-6" /></div>
                            <div>
                                <h3 className="font-bold text-xl mb-1">Calcolo Importo</h3>
                                <p className="text-slate-600">75% della retribuzione media mensile (se inferiore a €1.425,21). Se superiore, si aggiunge il 25% dell'eccedenza. Tetto massimo 2024: <strong>€1.550,42</strong>.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center shrink-0"><GraduationCap className="w-6 h-6" /></div>
                            <div>
                                <h3 className="font-bold text-xl mb-1">Décalage (Riduzione)</h3>
                                <p className="text-slate-600">L'importo si riduce del 3% ogni mese a partire dal 6° mese (o dall'8° mese se hai più di 55 anni).</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-bl-full"></div>
                        <h3 className="text-2xl font-bold mb-6">Simula la tua NASpI</h3>
                        <p className="mb-8 text-slate-600">
                            Il nostro calcolatore avanzato utilizza le ultime aliquote INPS e l'Intelligenza Artificiale per analizzare la tua situazione contributiva.
                        </p>
                        <button onClick={() => onNavigate('calculator')} className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-slate-800 transition-colors">
                            Vai al Calcolatore <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </Section>

            {/* HOW TO APPLY SECTION */}
            <Section title="Come Richiederla">
                <div className="grid md:grid-cols-4 gap-4">
                    {[
                        { step: 1, title: "Verifica", desc: "Controlla i requisiti e prepara le ultime buste paga." },
                        { step: 2, title: "Calcolo", desc: "Usa il nostro simulatore per stimare l'importo." },
                        { step: 3, title: "Invio", desc: "Invia la domanda tramite il nostro servizio online o Patronato." },
                        { step: 4, title: "DID", desc: "Registrati al Centro per l'Impiego (DID online)." }
                    ].map((s) => (
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
                    <button onClick={() => onNavigate('apply')} className="bg-blue-600 text-white px-10 py-4 rounded-full font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                        Inizia la Richiesta Online
                    </button>
                </div>
            </Section>

        </div>
    );
};
export default Home;
