import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { WHATSAPP_HREF, WHATSAPP_NUMBER, PHONE_HREF } from './ConversionCTA';

/**
 * FAB WhatsApp fisso in basso a destra (desktop) + sticky bar mobile
 * con tre azioni rapide: WhatsApp, telefono, richiedi online.
 */
const StickyContactBar: React.FC = () => {
    return (
        <>
            {/* Desktop: solo FAB WhatsApp (occupa poco, alto contrasto) */}
            <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Scrivici su WhatsApp al ${WHATSAPP_NUMBER}`}
                className="hidden md:flex fixed bottom-6 right-6 z-40 bg-emerald-500 hover:bg-emerald-400 text-white w-14 h-14 rounded-full shadow-xl items-center justify-center transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
            >
                <MessageCircle className="w-7 h-7" aria-hidden="true" />
            </a>

            {/* Mobile: sticky bottom bar con 3 azioni (non blocca AccessibilityToolbar che sta in bottom-left) */}
            <nav
                aria-label="Contatti rapidi"
                className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] safe-area-pb"
            >
                <div className="grid grid-cols-3 divide-x divide-slate-200">
                    <a
                        href={WHATSAPP_HREF}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center py-3 text-emerald-700 hover:bg-emerald-50 active:bg-emerald-100 transition-colors"
                    >
                        <MessageCircle className="w-5 h-5" aria-hidden="true" />
                        <span className="text-[11px] font-bold mt-0.5">WhatsApp</span>
                    </a>
                    <a
                        href={PHONE_HREF}
                        className="flex flex-col items-center justify-center py-3 text-slate-700 hover:bg-slate-50 active:bg-slate-100 transition-colors"
                    >
                        <Phone className="w-5 h-5" aria-hidden="true" />
                        <span className="text-[11px] font-bold mt-0.5">Chiama</span>
                    </a>
                    <a
                        href="/richiedi"
                        className="flex flex-col items-center justify-center py-3 bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-700 transition-colors"
                    >
                        <span className="text-xs font-extrabold uppercase tracking-wide">Richiedi</span>
                        <span className="text-[10px] opacity-90">NASpI in 24 h</span>
                    </a>
                </div>
            </nav>
        </>
    );
};

export default StickyContactBar;
