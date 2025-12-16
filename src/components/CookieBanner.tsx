import React, { useState, useEffect } from 'react';
import { Cookie } from 'lucide-react';

const CookieBanner: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie_consent');
        if (!consent) {
            // Small delay for better UX
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const acceptAll = () => {
        localStorage.setItem('cookie_consent', 'all');
        setIsVisible(false);
    };

    const acceptNecessary = () => {
        localStorage.setItem('cookie_consent', 'necessary');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-4 z-50 animate-in slide-in-from-bottom duration-500">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600 hidden md:block">
                        <Cookie className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 text-sm">Rispettiamo la tua Privacy</h4>
                        <p className="text-xs text-slate-500 mt-1 max-w-xl">
                            Utilizziamo cookie tecnici essenziali per il funzionamento e, previo consenso, cookie statistici per migliorare il servizio.
                            Le preferenze verranno salvate nel browser.
                        </p>
                    </div>
                </div>

                <div className="flex gap-2 w-full md:w-auto">
                    <button
                        onClick={acceptNecessary}
                        className="flex-1 md:flex-none px-4 py-2 border border-slate-300 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors"
                    >
                        Solo necessari
                    </button>
                    <button
                        onClick={acceptAll}
                        className="flex-1 md:flex-none px-6 py-2 bg-slate-900 text-white rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors shadow-sm"
                    >
                        Accetta tutto
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookieBanner;
