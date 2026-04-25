import React from 'react';
import type { NaspiResult } from '../../types';

interface PaymentScheduleProps {
    schedule: NaspiResult['schedule'];
}

const PaymentSchedule: React.FC<PaymentScheduleProps> = ({ schedule }) => (
    <div>
        <h3 className="font-bold text-slate-900 mb-4">Piano dei Pagamenti Stimato</h3>
        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
            <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-500 font-medium border-b">
                    <tr>
                        <th className="p-4">Periodo</th>
                        <th className="p-4">Lordo</th>
                        <th className="p-4 hidden md:table-cell">Netto Stimato*</th>
                        <th className="p-4 hidden md:table-cell">Note</th>
                    </tr>
                </thead>
                <tbody className="divide-y">
                    {schedule.map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50">
                            <td className="p-4 font-bold text-slate-700">{row.monthYear}</td>
                            <td className="p-4">€ {row.grossAmount.toFixed(2)}</td>
                            <td className="p-4 hidden md:table-cell text-emerald-600 font-medium">€ {row.netAmount.toFixed(2)}</td>
                            <td className="p-4 hidden md:table-cell text-xs text-slate-400">
                                {row.reductionApplied && <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded">Ridotto {row.reductionPercentage}%</span>}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="p-4 bg-slate-50 text-xs text-slate-400 text-center">* Il netto è puramente indicativo e dipende dalle detrazioni personali.</div>
        </div>
    </div>
);

export default PaymentSchedule;
