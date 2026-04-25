import React from 'react';
import { ArrowRight, CheckCircle2, Clock, Phone, MessageCircle } from 'lucide-react';

export const WHATSAPP_HREF = 'https://wa.me/393716230690?text=Ciao%2C%20vorrei%20assistenza%20per%20la%20domanda%20NASpI.';
export const WHATSAPP_NUMBER = '+39 371 623 0690';
export const PHONE_HREF = 'tel:+390697845429';
export const PHONE_LABEL = '06 9784 5429';

interface ConversionCTAProps {
    headline?: string;
    subline?: string;
    variant?: 'result' | 'inline' | 'compact';
    className?: string;
}

const ConversionCTA: React.FC<ConversionCTAProps> = ({
    headline = 'Vuoi che ci pensiamo noi?',
    subline = 'Invia la tua domanda NASpI con assistenza professionale: verifichiamo i dati, firmiamo il mandato e inoltriamo all\'INPS in 24 ore.',
    variant = 'result',
    className = '',
}) => {
    if (variant === 'compact') {
        return (
            <div className={`flex flex-wrap items-center gap-3 ${className}`}>
                <a href="/richiedi" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-lg shadow transition-all">
                    Richiedi ora <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
                <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-green-700 hover:text-green-800 font-semibold text-sm">
                    <MessageCircle className="w-4 h-4" aria-hidden="true" /> WhatsApp {WHATSAPP_NUMBER}
                </a>
            </div>
        );
    }

    const panelClasses = variant === 'result'
        ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-blue-900 text-white'
        : 'bg-white border border-slate-200';

    const textClasses = variant === 'result' ? 'text-slate-200' : 'text-slate-600';

    return (
        <aside
            aria-label="Richiedi assistenza per la domanda NASpI"
            className={`rounded-3xl shadow-xl p-6 md:p-8 ${panelClasses} ${className}`}
        >
            <div className="grid md:grid-cols-5 gap-6 items-center">
                <div className="md:col-span-3 space-y-4">
                    <h3 className={`text-2xl md:text-3xl font-extrabold ${variant === 'result' ? 'text-white' : 'text-slate-900'}`}>{headline}</h3>
                    <p className={`text-base md:text-lg leading-relaxed ${textClasses}`}>{subline}</p>
                    <ul className={`grid sm:grid-cols-3 gap-3 text-sm ${variant === 'result' ? 'text-slate-300' : 'text-slate-700'}`}>
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" aria-hidden="true" /> 1.843+ pratiche</li>
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" aria-hidden="true" /> 99,8% accolte</li>
                        <li className="flex items-center gap-2"><Clock className="w-4 h-4 text-emerald-400" aria-hidden="true" /> Invio in 24 h</li>
                    </ul>
                </div>

                <div className="md:col-span-2 flex flex-col gap-3">
                    <a
                        href="/richiedi"
                        className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold px-6 py-4 rounded-2xl text-center shadow-lg hover:shadow-xl transition-all inline-flex items-center justify-center gap-2"
                    >
                        Invia la domanda online
                        <ArrowRight className="w-5 h-5" aria-hidden="true" />
                    </a>
                    <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 justify-center text-sm ${variant === 'result' ? 'text-slate-300' : 'text-slate-600'}`}>
                        <a
                            href={WHATSAPP_HREF}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Scrivici su WhatsApp al ${WHATSAPP_NUMBER}`}
                            className={`inline-flex items-center gap-1.5 font-semibold transition-colors ${variant === 'result' ? 'text-emerald-300 hover:text-emerald-200' : 'text-emerald-700 hover:text-emerald-800'}`}
                        >
                            <MessageCircle className="w-4 h-4" aria-hidden="true" />
                            Scrivi su WhatsApp
                        </a>
                        <span aria-hidden="true" className={variant === 'result' ? 'text-slate-500' : 'text-slate-400'}>·</span>
                        <a
                            href={PHONE_HREF}
                            aria-label={`Chiama il numero ${PHONE_LABEL}`}
                            className={`inline-flex items-center gap-1.5 font-semibold transition-colors ${variant === 'result' ? 'text-slate-200 hover:text-white' : 'text-slate-700 hover:text-slate-900'}`}
                        >
                            <Phone className="w-4 h-4" aria-hidden="true" />
                            Chiama {PHONE_LABEL}
                        </a>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default ConversionCTA;
