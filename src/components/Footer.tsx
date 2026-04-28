import React from 'react';
import { MessageCircle, Phone, ArrowUpRight } from 'lucide-react';
import { LogoSmall } from './Logo';
import { WHATSAPP_HREF, WHATSAPP_NUMBER, PHONE_HREF, PHONE_LABEL } from './ConversionCTA';
import { MAIN_SITE_URL } from '../constants';

const Footer: React.FC = () => {
    return (
        <footer className="bg-brand-950 text-brand-200 py-12 px-4 text-center border-t border-brand-900 mt-auto">
            <div className="max-w-4xl mx-auto mb-8 text-sm">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="flex flex-col items-center md:items-start">
                        <div className="mb-4 bg-white p-2 rounded-sm inline-block opacity-90">
                            <LogoSmall className="text-slate-900" />
                        </div>
                        <p className="text-brand-300 text-sm">
                            Il tuo punto di riferimento per le pratiche di disoccupazione NASpI.
                            Assistenza professionale e aggiornata.
                        </p>
                    </div>

                    <nav aria-label="Navigazione sito">
                        <h3 className="font-bold text-lg mb-4 text-accent-300">Navigazione</h3>
                        <ul className="space-y-2">
                            <li><a href="/" className="text-brand-300 hover:text-accent-200 transition-colors">Home</a></li>
                            <li><a href="/calcolatore" className="text-brand-300 hover:text-accent-200 transition-colors">Calcolatore</a></li>
                            <li><a href="/anticipo" className="text-brand-300 hover:text-accent-200 transition-colors">Anticipo NASpI</a></li>
                            <li><a href="/obblighi" className="text-brand-300 hover:text-accent-200 transition-colors">Obblighi e SIISL</a></li>
                            <li><a href="/richiedi" className="text-brand-300 hover:text-accent-200 transition-colors">Richiedi Online</a></li>
                            <li><a href="/chi-siamo" className="text-brand-300 hover:text-accent-200 transition-colors">Chi siamo</a></li>
                        </ul>
                    </nav>

                    <address className="not-italic">
                        <h3 className="font-bold text-lg mb-4 text-accent-300">Contatti</h3>
                        <ul className="space-y-2 text-brand-300 text-sm">
                            <li>Via Filoteo Alberini, 25 — 00139 Roma (RM)</li>
                            <li><a href="tel:+390697845429" className="hover:text-accent-200">06 9784 5429</a></li>
                            <li><a href="mailto:info@praticheflaiano.it" className="hover:text-accent-200">info@praticheflaiano.it</a></li>
                            <li>Lun-Gio: 9:30-13:00 / 15:30-18:00</li>
                            <li>Ven: 9:30-14:00</li>
                        </ul>
                    </address>

                    <div>
                        <h3 className="font-bold text-lg mb-4 text-accent-300">Parlaci ora</h3>
                        <p className="text-brand-300 text-sm mb-4">Hai 68 giorni per presentare la NASpI. Non rimandare.</p>
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
                                className="w-full border border-brand-800 hover:border-accent-400 hover:text-accent-200 text-brand-200 font-semibold py-2.5 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
                            >
                                <Phone className="w-4 h-4" aria-hidden="true" />
                                {PHONE_LABEL}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            {/* Cross-link al sito principale Pratiche Flaiano */}
            <div className="max-w-4xl mx-auto mb-8 px-4 py-5 border-y border-brand-900 text-sm">
                <p className="text-brand-200 mb-3">
                    Cerchi <strong className="text-white">730, ISEE, IMU, successioni, pensioni, assegno unico, bonus fiscali</strong>?
                    Vai al sito principale del Centro Pratiche Flaiano:
                </p>
                <a
                    href={MAIN_SITE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-accent-400 hover:bg-accent-300 text-brand-950 font-bold py-2.5 px-5 rounded-lg text-sm transition-colors"
                >
                    Vai al sito Centro Pratiche Flaiano
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>
            </div>
            <p>© 2026 Centro Pratiche Flaiano. Tutti i diritti riservati.</p>
            <p className="text-xs mt-4 max-w-xl mx-auto opacity-50">
                Le informazioni fornite hanno scopo puramente informativo e non sostituiscono la consulenza professionale.
                Gli importi sono stime basate sulla normativa vigente.
            </p>
            <p className="text-xs mt-2 opacity-50">
                <a href="/privacy" className="hover:text-accent-200">Privacy Policy</a>
            </p>
        </footer>
    );
};

export default Footer;
