import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface CardProps {
    icon: LucideIcon;
    title: string;
    text: React.ReactNode;
    highlight?: boolean;
}

const Card: React.FC<CardProps> = ({ icon: Icon, title, text, highlight = false }) => (
    <div className={`p-6 rounded-2xl border transition-all hover:-translate-y-1 duration-300 ${highlight ? 'bg-blue-600 text-white shadow-xl border-blue-500' : 'bg-white text-slate-700 shadow-sm border-slate-200 hover:shadow-md'}`}>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${highlight ? 'bg-white/20' : 'bg-blue-50 text-blue-600'}`}>
            <Icon className="w-6 h-6" />
        </div>
        <h3 className={`text-xl font-bold mb-3 ${highlight ? 'text-white' : 'text-slate-900'}`}>{title}</h3>
        <div className="text-sm leading-relaxed opacity-90">{text}</div>
    </div>
);

export default Card;
