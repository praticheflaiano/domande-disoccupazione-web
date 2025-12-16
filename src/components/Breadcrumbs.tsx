import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Page } from '../types';

interface BreadcrumbsProps {
    currentPage: Page;
    onNavigate: (page: Page) => void;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ currentPage, onNavigate }) => {
    if (currentPage === 'home') return null;

    const names: Record<string, string> = {
        'calculator': 'Calcolatore',
        'anticipo': 'Anticipo',
        'guide': 'FAQ',
        'office': 'Contatti',
        'apply': 'Richiesta',
        'privacy': 'Privacy',
        'obligations': 'Obblighi',
        'guide-book': 'Guida Completa'
    };

    return (
        <nav className="flex items-center text-xs text-slate-500 mb-4 px-4 max-w-7xl mx-auto mt-4">
            <button onClick={() => onNavigate('home')} className="hover:text-blue-600 flex items-center gap-1">
                <Home className="w-3 h-3" /> Home
            </button>
            <ChevronRight className="w-3 h-3 mx-1" />
            <span className="font-medium text-slate-800">{names[currentPage] || currentPage}</span>
        </nav>
    );
};

export default Breadcrumbs;
