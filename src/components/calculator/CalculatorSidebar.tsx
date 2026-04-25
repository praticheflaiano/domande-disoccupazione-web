import React from 'react';
import { HelpCircle } from 'lucide-react';
import InfoCard from './InfoCard';

const CalculatorSidebar: React.FC = () => (
    <div className="lg:col-span-1 space-y-6">
        <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white p-6 rounded-2xl shadow-lg">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><HelpCircle className="w-5 h-5" /> Come funziona?</h3>
            <div className="space-y-4 text-sm text-indigo-100">
                <p><strong>1. Retribuzione Media:</strong> Calcoliamo la media dei tuoi stipendi degli ultimi 4 anni.</p>
                <p><strong>2. Coefficiente 75%:</strong> Se la media è sotto €1.425, prendi il 75%. Se sopra, si aggiunge il 25% dell'eccedenza.</p>
                <p><strong>3. Durata:</strong> Spetta per la metà delle settimane lavorate (max 2 anni).</p>
            </div>
        </div>

        <InfoCard title="Settimane Utili" desc="Sono le settimane in cui hai versato contributi negli ultimi 4 anni. Un anno pieno sono 52 settimane. Il minimo per accedere è 13." />
        <InfoCard title="Imponibile Previdenziale" desc="È la cifra lorda su cui si calcolano i contributi. La trovi nella busta paga sotto 'Imponibile INPS' o nell'estratto conto contributivo." />
    </div>
);

export default CalculatorSidebar;
