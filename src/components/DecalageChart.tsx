import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface Props {
    baseMonthlyAmount: number;
    totalMonths: number;
    age: number;
}

/**
 * Mostra l'andamento decalage NASpI mese per mese.
 * Riduzione 3% dal 6° mese (o 8° se over 55).
 */
const DecalageChart: React.FC<Props> = ({ baseMonthlyAmount, totalMonths, age }) => {
    const startReduction = age >= 55 ? 8 : 6;

    const data = Array.from({ length: totalMonths }).map((_, i) => {
        const month = i + 1;
        let factor = 1;
        if (month >= startReduction) {
            const monthsOver = month - startReduction + 1;
            factor = Math.pow(1 - 0.03, monthsOver);
        }
        const amount = Math.round(baseMonthlyAmount * factor);
        return {
            month: `${month}°`,
            monthNum: month,
            importo: amount,
            reduzione: factor < 1 ? Math.round((1 - factor) * 100) : 0,
        };
    });

    const finalAmount = data[data.length - 1]?.importo ?? baseMonthlyAmount;
    const totalLoss = baseMonthlyAmount * totalMonths - data.reduce((sum, d) => sum + d.importo, 0);

    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 my-6">
            <header className="mb-4">
                <h3 className="text-xl font-bold text-slate-900 mb-1">Come cala il tuo importo nel tempo</h3>
                <p className="text-sm text-slate-600">
                    Dal <strong>{startReduction}° mese</strong> l'importo lordo diminuisce del <strong>3% ogni mese</strong>{age >= 55 ? ' (riduzione posticipata per over 55)' : ''}.
                    A fine prestazione riceverai <strong>€ {finalAmount.toLocaleString('it-IT')}</strong> lordi — perdita cumulata ~ € {Math.round(totalLoss).toLocaleString('it-IT')}.
                </p>
            </header>

            <div className="h-64 w-full" aria-label="Grafico decalage mensile">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                        <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" />
                        <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} interval={Math.ceil(totalMonths / 12)} />
                        <YAxis
                            tick={{ fontSize: 11, fill: '#64748b' }}
                            tickFormatter={(v) => `€${v}`}
                            domain={[0, Math.ceil(baseMonthlyAmount / 100) * 100]}
                        />
                        <Tooltip
                            formatter={(v) => [`€ ${Number(v).toLocaleString('it-IT')}`, 'Importo lordo']}
                            labelFormatter={(l) => `Mese ${l}`}
                            contentStyle={{ borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 12 }}
                        />
                        <ReferenceLine
                            x={`${startReduction}°`}
                            stroke="#f59e0b"
                            strokeDasharray="4 4"
                            label={{ value: 'Inizio decalage', fill: '#b45309', fontSize: 11, position: 'top' }}
                        />
                        <Line type="monotone" dataKey="importo" stroke="#0d9488" strokeWidth={2.5} dot={{ r: 3, fill: '#0d9488' }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-4 text-xs text-center">
                <div className="bg-slate-50 rounded-lg p-2">
                    <div className="text-slate-500">1° mese</div>
                    <div className="font-bold text-slate-900">€ {baseMonthlyAmount.toLocaleString('it-IT')}</div>
                </div>
                <div className="bg-amber-50 rounded-lg p-2">
                    <div className="text-amber-700">{startReduction}° mese</div>
                    <div className="font-bold text-amber-900">€ {data[startReduction - 1]?.importo.toLocaleString('it-IT') ?? '-'}</div>
                </div>
                <div className="bg-slate-50 rounded-lg p-2">
                    <div className="text-slate-500">Ultimo mese</div>
                    <div className="font-bold text-slate-900">€ {finalAmount.toLocaleString('it-IT')}</div>
                </div>
            </div>
        </div>
    );
};

export default DecalageChart;
