import React, { useState, useId } from 'react';
import { Calendar, Download } from 'lucide-react';

interface Payment {
    month: number;
    label: string;
    expectedDate: string;
    grossAmount: number;
    reductionPct: number;
}

const PaymentCalendar: React.FC = () => {
    const [startDate, setStartDate] = useState<string>(() => {
        const d = new Date();
        d.setDate(d.getDate() + 8);
        return d.toISOString().split('T')[0];
    });
    const [monthlyAmount, setMonthlyAmount] = useState<number>(1200);
    const [durationDays, setDurationDays] = useState<number>(365);
    const [age, setAge] = useState<number>(40);
    const [payments, setPayments] = useState<Payment[]>([]);

    const startId = useId();
    const amountId = useId();
    const durationId = useId();
    const ageId = useId();

    const compute = () => {
        const start = new Date(startDate);
        if (isNaN(start.getTime())) return;

        const totalMonths = Math.ceil(durationDays / 30);
        const startReduction = age >= 55 ? 8 : 6;

        const items: Payment[] = [];
        let currentDate = new Date(start);

        for (let m = 1; m <= totalMonths; m++) {
            let factor = 1;
            if (m >= startReduction) {
                const over = m - startReduction + 1;
                factor = Math.pow(1 - 0.03, over);
            }
            const gross = Math.round(monthlyAmount * factor);

            // L'accredito avviene il 15 del mese successivo al mese di competenza
            const payDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 15);

            items.push({
                month: m,
                label: new Intl.DateTimeFormat('it-IT', { month: 'long', year: 'numeric' }).format(currentDate),
                expectedDate: new Intl.DateTimeFormat('it-IT', { day: 'numeric', month: 'short', year: 'numeric' }).format(payDate),
                grossAmount: gross,
                reductionPct: factor < 1 ? Math.round((1 - factor) * 100) : 0,
            });

            currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());
        }

        setPayments(items);
    };

    const exportICS = () => {
        if (payments.length === 0) return;
        const lines = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//Centro Pratiche Flaiano//NASpI Calendar//IT',
            'CALSCALE:GREGORIAN',
        ];
        payments.forEach((p) => {
            // Parse "15 mag 2026" style date back to Date
            const [day, monthStr, yearStr] = p.expectedDate.split(' ');
            const months: Record<string, string> = {
                gen: '01', feb: '02', mar: '03', apr: '04', mag: '05', giu: '06',
                lug: '07', ago: '08', set: '09', ott: '10', nov: '11', dic: '12',
            };
            const mm = months[monthStr.replace('.', '').substring(0, 3)] ?? '01';
            const dd = day.padStart(2, '0');
            const date = `${yearStr}${mm}${dd}`;
            lines.push(
                'BEGIN:VEVENT',
                `UID:naspi-${p.month}@domandedisoccupazione.it`,
                `DTSTART;VALUE=DATE:${date}`,
                `DTEND;VALUE=DATE:${date}`,
                `SUMMARY:NASpI mese ${p.month} — € ${p.grossAmount}`,
                `DESCRIPTION:Accredito NASpI previsto per ${p.label}${p.reductionPct > 0 ? ` (decalage -${p.reductionPct}%)` : ''}`,
                'END:VEVENT',
            );
        });
        lines.push('END:VCALENDAR');
        const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'naspi-calendario.ics';
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <section className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
            <header className="mb-6">
                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2">Calendario pagamenti personalizzato</h2>
                <p className="text-sm text-slate-600">Inserisci i dati della tua NASpI e ottieni tutte le date di accredito stimate, con decalage applicato.</p>
            </header>

            <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div>
                    <label htmlFor={startId} className="block text-xs font-bold text-slate-700 mb-1">Data inizio NASpI</label>
                    <input id={startId} type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
                </div>
                <div>
                    <label htmlFor={amountId} className="block text-xs font-bold text-slate-700 mb-1">Importo mensile (€)</label>
                    <input id={amountId} type="number" min={0} value={monthlyAmount} onChange={(e) => setMonthlyAmount(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
                </div>
                <div>
                    <label htmlFor={durationId} className="block text-xs font-bold text-slate-700 mb-1">Durata (giorni)</label>
                    <input id={durationId} type="number" min={1} max={730} value={durationDays} onChange={(e) => setDurationDays(parseInt(e.target.value) || 0)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
                </div>
                <div>
                    <label htmlFor={ageId} className="block text-xs font-bold text-slate-700 mb-1">Età</label>
                    <input id={ageId} type="number" min={14} max={99} value={age} onChange={(e) => setAge(parseInt(e.target.value) || 0)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
                </div>
            </div>

            <div className="flex gap-2 mb-6">
                <button
                    type="button"
                    onClick={compute}
                    className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-bold px-4 py-3 rounded-xl inline-flex items-center justify-center gap-2 transition-colors"
                >
                    <Calendar className="w-4 h-4" aria-hidden="true" />
                    Genera calendario
                </button>
                {payments.length > 0 && (
                    <button
                        type="button"
                        onClick={exportICS}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-4 py-3 rounded-xl inline-flex items-center gap-2 transition-colors"
                    >
                        <Download className="w-4 h-4" aria-hidden="true" />
                        .ics
                    </button>
                )}
            </div>

            {payments.length > 0 && (
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                            <tr>
                                <th className="px-4 py-2 text-left font-semibold">Mese NASpI</th>
                                <th className="px-4 py-2 text-left font-semibold">Periodo</th>
                                <th className="px-4 py-2 text-left font-semibold">Accredito atteso</th>
                                <th className="px-4 py-2 text-right font-semibold">Importo lordo</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {payments.map((p) => (
                                <tr key={p.month} className={p.reductionPct > 0 ? 'bg-amber-50/40' : ''}>
                                    <td className="px-4 py-2 font-semibold text-slate-700">{p.month}°</td>
                                    <td className="px-4 py-2 capitalize text-slate-600">{p.label}</td>
                                    <td className="px-4 py-2 text-slate-600">{p.expectedDate}</td>
                                    <td className="px-4 py-2 text-right font-bold">
                                        € {p.grossAmount.toLocaleString('it-IT')}
                                        {p.reductionPct > 0 && (
                                            <span className="text-xs text-amber-700 ml-1">−{p.reductionPct}%</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
};

export default PaymentCalendar;
