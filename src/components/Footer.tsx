import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { LogoSmall } from './Logo';
import { WHATSAPP_HREF, WHATSAPP_NUMBER, PHONE_HREF, PHONE_LABEL } from './ConversionCTA';

const Footer: React.FC = () => {
    return (
        <footer className="bg-slate-900 text-slate-400 py-12 px-4 text-center border-t border-slate-800 mt-auto">
            <div className="max-w-4xl mx-auto mb-8 text-sm">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="flex flex-col items-center md:items-start">
                        <div className="mb-4 bg-white p-2 rounded-sm inline-block opacity-90">
                            <LogoSmall className="text-slate-900" />
                        </div>
                        <p className="text-slate-400 text-sm">
                            Il tuo punto di riferimento per le pratiche di disoccupazione NASpI.
                            Assistenza professionale e aggiornata.
                        </p>
                    </div>

                    <nav aria-label="Navigazione sito">
                        <h3 className="font-bold text-lg mb-4 text-teal-400">Navigazione</h3>
                        <ul className="space-y-2">
                            <li><a href="/" className="text-slate-400 hover:text-teal-400 transition-colors">Home</a></li>
                            <li><a href="/calcolatore" className="text-slate-400 hover:text-teal-400 transition-colors">Calcolatore</a></li>
                            <li><a href="/anticipo" className="text-slate-400 hover:text-teal-400 transition-colors">Anticipo NASpI</a></li>
                            <li><a href="/obblighi" className="text-slate-400 hover:text-teal-400 transition-colors">Obblighi e SIISL</a></li>
                            <li><a href="/richiedi" className="text-slate-400 hover:text-teal-400 transition-colors">Richiedi Online</a></li>
                            <li><a href="/chi-siamo" className="text-slate-400 hover:text-teal-400 transition-colors">Chi siamo</a></li>
                        </ul>
                    </nav>

                    <address className="not-italic">
                        <h3 className="font-bold text-lg mb-4 text-teal-400">Contatti</h3>
                        <ul className="space-y-2 text-slate-400 text-sm">
                            <li>Via Filoteo Alberini, 25 — 00139 Roma (RM)</li>
                            <li><a href="tel:+390697845429" className="hover:text-teal-400">06 9784 5429</a></li>
                            <li><a href="mailto:info@praticheflaiano.it" className="hover:text-teal-400">info@praticheflaiano.it</a></li>
                            <li>Lun-Gio: 9:30-13:00 / 15:30-18:00</li>
                            <li>Ven: 9:30-14:00</li>
                        </ul>
                    </address>

                    <div>
                        <h3 className="font-bold text-lg mb-4 text-teal-400">Parlaci ora</h3>
                        <p className="text-slate-400 text-sm mb-4">Hai 68 giorni per presentare la NASpI. Non rimandare.</p>
                        <div className="space-y-2">
                            <a
                                href={WHATSAPP_HREF}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
                            >
                                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                                WhatsApp {WHATSAPP_NUMBER}
                            </a>
                            <a
                                href={PHONE_HREF}
                                className="w-full border border-slate-700 hover:border-teal-500 hover:text-teal-400 text-slate-300 font-semibold py-2.5 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
                            >
                                <Phone className="w-4 h-4" aria-hidden="true" />
                                {PHONE_LABEL}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <p>© 2026 Centro Pratiche Flaiano. Tutti i diritti riservati.</p>
            <p className="text-xs mt-4 max-w-xl mx-auto opacity-50">
                Le informazioni fornite hanno scopo puramente informativo e non sostituiscono la consulenza professionale.
                Gli importi sono stime basate sulla normativa vigente.
            </p>
            <p className="text-xs mt-2 opacity-50">
                <a href="/privacy" className="hover:text-teal-400">Privacy Policy</a>
            </p>
        </footer>
    );
};

export default Footer;
