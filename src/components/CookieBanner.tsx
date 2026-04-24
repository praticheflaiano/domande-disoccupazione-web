import React, { useState, useEffect } from 'react';
import { Cookie } from 'lucide-react';

interface ConsentState {
    analytics: boolean;
    marketing: boolean;
    savedAt: string;
}

declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
    }
}

const STORAGE_KEY = 'cookie-consent';

const applyConsent = (state: ConsentState) => {
    if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
    window.gtag('consent', 'update', {
        analytics_storage: state.analytics ? 'granted' : 'denied',
        ad_storage: state.marketing ? 'granted' : 'denied',
        ad_user_data: state.marketing ? 'granted' : 'denied',
        ad_personalization: state.marketing ? 'granted' : 'denied',
    });
};

const CookieBanner: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) {
                const timer = setTimeout(() => setIsVisible(true), 1000);
                return () => clearTimeout(timer);
            } else {
                // Already consented: reapply on every load (pre-GA hydration fallback)
                const state = JSON.parse(raw) as ConsentState;
                applyConsent(state);
            }
        } catch {
            setIsVisible(true);
        }
    }, []);

    const save = (analytics: boolean, marketing: boolean) => {
        const state: ConsentState = { analytics, marketing, savedAt: new Date().toISOString() };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        applyConsent(state);
        setIsVisible(false);
    };

    const acceptAll = () => save(true, true);
    const acceptOnlyAnalytics = () => save(true, false);
    const rejectAll = () => save(false, false);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-4 z-[70] animate-in slide-in-from-bottom duration-500">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600 hidden md:block">
                        <Cookie className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 text-sm">Rispettiamo la tua privacy</h4>
                        <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
                            Utilizziamo cookie tecnici essenziali (sempre attivi) e, previo consenso, cookie statistici e di marketing per migliorare il servizio.
                            Le preferenze sono salvate nel browser e conformi a GDPR + Google Consent Mode v2. Dettagli nella <a href="/privacy" className="underline hover:text-slate-700">Privacy Policy</a>.
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 w-full md:w-auto">
                    <button
                        type="button"
                        onClick={rejectAll}
                        className="flex-1 md:flex-none px-4 py-2 border border-slate-300 text-slate-600 rounded-lg text-xs font-semibold hover:bg-slate-50 transition-colors"
                    >
                        Solo necessari
                    </button>
                    <button
                        type="button"
                        onClick={acceptOnlyAnalytics}
                        className="flex-1 md:flex-none px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-50 transition-colors"
                    >
                        Statistici
                    </button>
                    <button
                        type="button"
                        onClick={acceptAll}
                        className="flex-1 md:flex-none px-6 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-colors shadow-sm uppercase tracking-wide"
                    >
                        Accetta tutto
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookieBanner;
