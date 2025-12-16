import React, { useState } from 'react';
import Home from './components/Home';
import NaspiCalculator from './components/NaspiCalculator';
import KnowledgeBase from './components/KnowledgeBase';
import OfficeInfo from './components/OfficeInfo';
import Obligations from './components/Obligations';
import ApplyOnline from './components/ApplyOnline';
import AnticipoNaspi from './components/AnticipoNaspi';
import ChatBot from './components/ChatBot';
import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';
import SEO from './components/SEO';
import NaspiGuide from './components/NaspiGuide';
import Breadcrumbs from './components/Breadcrumbs';
import NewsSection from './components/NewsSection';
import AccessibilityToolbar from './components/AccessibilityToolbar';
import CookieBanner from './components/CookieBanner';
import { Page } from './types';
import { Logo } from './components/Logo';
const App: React.FC = () => {
    const [page, setPage] = useState<Page>('home');

    const nav = (p: Page) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setPage(p);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
            <header className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 h-24 flex items-center justify-between">
                    <div className="flex items-center gap-2 cursor-pointer transform hover:scale-[1.02] transition-transform duration-300" onClick={() => nav('home')}>
                        <Logo className="scale-75 origin-left" />
                    </div>

                    <nav className="hidden md:flex gap-8">
                        <button onClick={() => nav('home')} className={`text-sm font-bold uppercase tracking-wider transition-colors ${page === 'home' ? 'text-teal-700' : 'text-slate-500 hover:text-slate-800'}`}>Home</button>
                        <button onClick={() => nav('calculator')} className={`text-sm font-bold uppercase tracking-wider transition-colors ${page === 'calculator' ? 'text-teal-700' : 'text-slate-500 hover:text-slate-800'}`}>Calcolatore</button>
                        <button onClick={() => nav('anticipo')} className={`text-sm font-bold uppercase tracking-wider transition-colors ${page === 'anticipo' ? 'text-teal-700' : 'text-slate-500 hover:text-slate-800'}`}>Anticipo</button>
                        <button onClick={() => nav('obligations')} className={`text-sm font-bold uppercase tracking-wider transition-colors ${page === 'obligations' ? 'text-teal-700' : 'text-slate-500 hover:text-slate-800'}`}>Obblighi</button>
                        <button onClick={() => nav('guide')} className={`text-sm font-bold uppercase tracking-wider transition-colors ${page === 'guide' ? 'text-teal-700' : 'text-slate-500 hover:text-slate-800'}`}>FAQ</button>
                    </nav>

                    <button onClick={() => nav('apply')} className="bg-teal-700 hover:bg-teal-800 text-white px-6 py-3 rounded-md text-sm font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 uppercase tracking-wide">
                        Richiedi Online
                    </button>
                </div>
            </header>


            <Breadcrumbs currentPage={page} onNavigate={nav} />

            <main className="flex-1">
                {page === 'home' && (
                    <>
                        <SEO title="Home" description="Portale NASpI e Disoccupazione." />
                        <Home onNavigate={nav} />
                        <div className="bg-slate-50 border-t border-slate-200 mt-8">
                            <NewsSection />
                        </div>
                    </>
                )}
                {page === 'calculator' && <><SEO title="Calcolatore NASpI" description="Simula importo e durata." /><NaspiCalculator /></>}
                {page === 'anticipo' && <><SEO title="Anticipo NASpI" description="Richiedi la liquidazione anticipata." /><AnticipoNaspi onNavigate={nav} /></>}
                {page === 'obligations' && <><SEO title="Obblighi e GOL" description="Guida SIISL e programma GOL 2025." /><div className="max-w-4xl mx-auto py-8 px-4"><Obligations /></div></>}
                {page === 'guide' && <><SEO title="Guide e FAQ" description="Risposte alle tue domande." /><KnowledgeBase onNavigate={nav} /></>}
                {page === 'guide-book' && <><SEO title="Manuale NASpI 2025" description="Guida completa, compatibilità e sospensione." /><NaspiGuide /></>}
                {page === 'office' && <><SEO title="Contatti Sede" description="Vieni a trovarci a Pescara." /><OfficeInfo /></>}
                {page === 'apply' && <><SEO title="Invia Pratica" description="Richiesta online sicura." /><ApplyOnline /></>}
                {page === 'privacy' && <><SEO title="Privacy Policy" description="Trattamento dei dati." /><PrivacyPolicy /></>}
            </main>

            <Footer onNavigate={nav} />
            <ChatBot />
            <AccessibilityToolbar />
            <CookieBanner />
        </div>
    );
};
export default App;
