import React from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';

const HomeHero: React.FC = () => (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8 animate-in slide-in-from-left duration-700">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 border border-teal-100 text-teal-700 font-medium text-sm shadow-sm backdrop-blur-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                        </span>
                        Aggiornato alla Normativa 2026
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
                        <a
                            href="/calcolatore"
                            className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/20 transition-all duration-300 flex items-center justify-center gap-2 group"
                        >
                            Calcola Ora
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                        <a
                            href="/manuale"
                            className="px-8 py-4 bg-white text-slate-700 border-2 border-slate-100 rounded-2xl font-bold text-lg hover:border-teal-100 hover:bg-teal-50/50 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            <BookOpen className="w-5 h-5 text-teal-600" />
                            Guida 2026
                        </a>
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
                        alt="Illustrazione: persona che consulta documenti NASpI al computer"
                        width={1024}
                        height={1024}
                        decoding="async"
                        fetchPriority="high"
                        className="w-full h-auto drop-shadow-2xl animate-float hover:scale-105 transition-transform duration-500"
                    />
                </div>
            </div>
        </div>
    </section>
);

export default HomeHero;
