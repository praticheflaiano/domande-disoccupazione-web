import React from 'react';
import { Page } from '../types';

import { LogoSmall } from './Logo';

interface FooterProps {
    onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
    return (
        <footer className="bg-slate-900 text-slate-400 py-12 px-4 text-center border-t border-slate-800 mt-auto">
            <div className="max-w-4xl mx-auto mb-8 text-sm">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="flex flex-col items-center md:items-start">
                        <div className="mb-4 bg-white p-2 rounded-sm inline-block opacity-90">
                            <LogoSmall className="text-slate-900" />
                        </div>
                        <p className="text-slate-400 text-sm">
                            Il tuo punto di riferimento per le pratiche di disoccupazione NASpI.
                            Assistenza professionale e aggiornata.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="font-bold text-lg mb-4 text-teal-400">Navigazione</h3>
                        <ul className="space-y-2">
                            <li><button onClick={() => onNavigate('home')} className="text-slate-400 hover:text-teal-400 transition-colors">Home</button></li>
                            <li><button onClick={() => onNavigate('calculator')} className="text-slate-400 hover:text-teal-400 transition-colors">Calcolatore</button></li>
                            <li><button onClick={() => onNavigate('anticipo')} className="text-slate-400 hover:text-teal-400 transition-colors">Anticipo NASpI</button></li>
                            <li><button onClick={() => onNavigate('obligations')} className="text-slate-400 hover:text-teal-400 transition-colors">Obblighi e SIISL</button></li>
                            <li><button onClick={() => onNavigate('apply')} className="text-slate-400 hover:text-teal-400 transition-colors">Richiedi Online</button></li>
                        </ul>
                    </div>

                    {/* Contacts */}
                    <div>
                        <h3 className="font-bold text-lg mb-4 text-teal-400">Contatti</h3>
                        <ul className="space-y-2 text-slate-400 text-sm">
                            <li>📍 Via Filoteo Alberini, 25, Roma</li>
                            <li>📞 06 9784 5429</li>
                            <li>✉️ info@praticheflaiano.it</li>
                            <li>🕒 Lun-Gio: 9:30-13:00 / 15:30-18:00</li>
                            <li>🕒 Ven: 9:30-14:00</li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="font-bold text-lg mb-4 text-teal-400">Resta Aggiornato</h3>
                        <p className="text-slate-400 text-sm mb-4">Ricevi le ultime novità su ammortizzatori sociali e bonus.</p>
                        <div className="space-y-2">
                            <input
                                type="email"
                                placeholder="La tua email"
                                className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-teal-500 transition-colors placeholder:text-slate-500 text-sm"
                            />
                            <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 rounded-lg transition-colors text-sm">
                                Iscriviti
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <p>© 2025 Centro Pratiche Flaiano. Tutti i diritti riservati.</p>
            <p className="text-xs mt-4 max-w-xl mx-auto opacity-50">
                Le informazioni fornite hanno scopo puramente informativo e non sostituiscono la consulenza professionale.
                Gli importi sono stime basate sulla normativa vigente.
            </p>
        </footer>
    );
};

export default Footer;
