import React, { useState, useEffect } from 'react';
import { Eye, Plus, Minus, Sun, Moon } from 'lucide-react';

const AccessibilityToolbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [fontSize, setFontSize] = useState(100);
    const [highContrast, setHighContrast] = useState(false);

    useEffect(() => {
        document.documentElement.style.fontSize = `${fontSize}%`;
        if (highContrast) {
            document.documentElement.classList.add('high-contrast');
            document.body.classList.add('bg-black', 'text-yellow-400');
        } else {
            document.documentElement.classList.remove('high-contrast');
            document.body.classList.remove('bg-black', 'text-yellow-400');
        }
    }, [fontSize, highContrast]);

    const toggleContrast = () => setHighContrast(!highContrast);

    return (
        <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-2">
            {isOpen && (
                <div className="bg-white p-4 rounded-2xl shadow-2xl border border-slate-200 animate-in slide-in-from-right mb-2 w-48 space-y-3">
                    <h4 className="font-bold text-slate-800 text-sm mb-2">Accessibilità</h4>

                    <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-600">Testo</span>
                        <div className="flex gap-1">
                            <button onClick={() => setFontSize(Math.max(100, fontSize - 10))} className="p-1 bg-slate-100 hover:bg-slate-200 rounded"><Minus className="w-4 h-4 text-slate-700" /></button>
                            <span className="text-xs font-mono py-1 w-8 text-center">{fontSize}%</span>
                            <button onClick={() => setFontSize(Math.min(150, fontSize + 10))} className="p-1 bg-slate-100 hover:bg-slate-200 rounded"><Plus className="w-4 h-4 text-slate-700" /></button>
                        </div>
                    </div>

                    <div className="h-px bg-slate-100"></div>

                    <button
                        onClick={toggleContrast}
                        className={`w-full py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors ${highContrast ? 'bg-yellow-400 text-black' : 'bg-slate-900 text-white'}`}
                    >
                        {highContrast ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                        {highContrast ? 'Contrasto Normale' : 'Alto Contrasto'}
                    </button>

                </div>
            )}

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center"
                title="Strumenti Accessibilità"
            >
                <Eye className="w-6 h-6" />
            </button>
        </div>
    );
};

export default AccessibilityToolbar;
