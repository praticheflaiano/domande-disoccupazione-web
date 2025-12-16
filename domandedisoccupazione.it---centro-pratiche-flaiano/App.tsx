import React, { useState, useEffect } from 'react';
import { Home as HomeIcon, Calculator, Users, Send, Rocket, MapPin, Menu, X } from 'lucide-react';
import Home from './components/Home';
import NaspiCalculator from './components/NaspiCalculator';
import KnowledgeBase from './components/KnowledgeBase';
import OfficeInfo from './components/OfficeInfo';
import ApplyOnline from './components/ApplyOnline';
import AnticipoNaspi from './components/AnticipoNaspi';
import ChatBot from './components/ChatBot';
import { Page } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Gestione History API
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.page) {
        setCurrentPage(event.state.page);
      } else {
        setCurrentPage('home');
      }
    };
    window.addEventListener('popstate', handlePopState);
    
    // Check initial URL params
    const params = new URLSearchParams(window.location.search);
    const pageParam = params.get('page') as Page;
    if (pageParam) setCurrentPage(pageParam);

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const url = new URL(window.location.href);
    url.searchParams.set('page', page);
    window.history.pushState({ page }, '', url.toString());
  };

  // Logo Component
  const AppLogo = () => (
    <div className="relative w-10 h-10 flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-lg shadow-blue-900/20">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <path d="M9 15l2 2 4-4"></path>
      </svg>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
            {/* Logo */}
            <div 
                className="flex items-center gap-3 cursor-pointer group"
                onClick={() => handleNavigate('home')}
            >
                <AppLogo />
                <div className="flex flex-col">
                    <span className="text-lg md:text-xl font-bold tracking-tight text-slate-900 leading-tight">
                        domandedisoccupazione<span className="text-blue-600">.it</span>
                    </span>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest group-hover:text-blue-600 transition-colors">
                        Centro Pratiche Flaiano
                    </span>
                </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1 bg-slate-100/50 p-1 rounded-full border border-slate-200/60">
                {(['home', 'calculator', 'anticipo', 'guide', 'office'] as Page[]).map((page) => (
                    <button 
                        key={page}
                        onClick={() => handleNavigate(page)}
                        className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                            currentPage === page 
                            ? 'bg-white text-blue-700 shadow-sm ring-1 ring-slate-200' 
                            : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'
                        }`}
                    >
                        {page === 'home' ? 'Home' : 
                         page === 'calculator' ? 'Calcola' : 
                         page === 'anticipo' ? 'Anticipo' : 
                         page === 'guide' ? 'Guide' : 'Chi Siamo'}
                    </button>
                ))}
            </nav>

            {/* Actions */}
            <div className="hidden lg:flex items-center gap-3">
                 <button 
                    onClick={() => handleNavigate('apply')}
                    className="bg-slate-900 hover:bg-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                >
                    Richiedi Online <Send className="w-4 h-4" />
                </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
                className="lg:hidden p-2 text-slate-600"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
            <div className="lg:hidden bg-white border-b border-slate-200 p-4 absolute w-full shadow-xl animate-in slide-in-from-top-2">
                <nav className="flex flex-col gap-2">
                     <button onClick={() => handleNavigate('home')} className="p-3 text-left font-semibold hover:bg-slate-50 rounded-lg">Home</button>
                     <button onClick={() => handleNavigate('calculator')} className="p-3 text-left font-semibold hover:bg-slate-50 rounded-lg">Calcola NASpI</button>
                     <button onClick={() => handleNavigate('anticipo')} className="p-3 text-left font-semibold hover:bg-slate-50 rounded-lg">Anticipo (P.IVA)</button>
                     <button onClick={() => handleNavigate('apply')} className="p-3 text-left font-bold text-blue-600 bg-blue-50 rounded-lg">Richiedi Online</button>
                     <button onClick={() => handleNavigate('office')} className="p-3 text-left font-semibold hover:bg-slate-50 rounded-lg">Contatti</button>
                </nav>
            </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full pb-20 md:pb-0">
        {/* Render pages */}
        {currentPage === 'home' && <Home onNavigate={handleNavigate} />}
        
        {/* Preserve State for heavy components */}
        <div className={currentPage === 'calculator' ? 'block' : 'hidden'}>
             <NaspiCalculator />
        </div>
        <div className={currentPage === 'anticipo' ? 'block' : 'hidden'}>
             <AnticipoNaspi />
        </div>

        {currentPage === 'guide' && <KnowledgeBase />}
        {currentPage === 'office' && <OfficeInfo />}
        {currentPage === 'apply' && <ApplyOnline />}
        
        <ChatBot onNavigate={handleNavigate} />
      </main>
      
      {/* Desktop Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 mt-auto border-t border-slate-800 hidden md:block">
        <div className="max-w-6xl mx-auto px-4 text-center">
             <div className="flex items-center justify-center gap-2 mb-4 text-white font-bold text-xl">
                 <AppLogo /> domandedisoccupazione.it
             </div>
             <p className="text-sm max-w-lg mx-auto mb-8">
                 Servizio professionale di consulenza fiscale e previdenziale.<br/>
                 Centro Pratiche Flaiano - Roma.
             </p>
             <div className="text-xs text-slate-600 border-t border-slate-800 pt-8">
                 &copy; {new Date().getFullYear()} Tutti i diritti riservati.
             </div>
        </div>
      </footer>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around p-2 pb-safe z-40">
        <button onClick={() => handleNavigate('home')} className={`flex flex-col items-center p-2 rounded-lg ${currentPage === 'home' ? 'text-blue-600' : 'text-slate-400'}`}>
            <HomeIcon className="w-5 h-5" />
            <span className="text-[10px] font-medium">Home</span>
        </button>
        <button onClick={() => handleNavigate('calculator')} className={`flex flex-col items-center p-2 rounded-lg ${currentPage === 'calculator' ? 'text-blue-600' : 'text-slate-400'}`}>
            <Calculator className="w-5 h-5" />
            <span className="text-[10px] font-medium">Calcola</span>
        </button>
        <button onClick={() => handleNavigate('apply')} className={`flex flex-col items-center p-2 rounded-lg ${currentPage === 'apply' ? 'text-blue-600' : 'text-slate-400'}`}>
            <Send className="w-5 h-5" />
            <span className="text-[10px] font-medium">Richiedi</span>
        </button>
      </div>
    </div>
  );
};

export default App;