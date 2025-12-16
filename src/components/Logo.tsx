import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = '' }) => {
    return (
        <div className={`relative inline-flex flex-col items-center p-4 border-2 border-slate-600 ${className}`}>
            {/* Main Text */}
            <div className="flex flex-col items-center leading-none">
                <span className="text-3xl md:text-4xl font-extrabold text-slate-700 tracking-tight uppercase text-center">
                    Centro
                </span>
                <span className="text-3xl md:text-4xl font-extrabold text-slate-700 tracking-tight uppercase text-center">
                    Pratiche
                </span>
                <span className="text-3xl md:text-4xl font-light text-slate-400 tracking-wider uppercase opacity-80 mt-1 text-center">
                    Flaiano
                </span>
            </div>

            {/* Bottom Tagline */}
            <div className="absolute -bottom-3 bg-white px-2">
                <span className="text-[10px] md:text-xs font-bold text-slate-600 tracking-[0.2em] uppercase whitespace-nowrap">
                    CAF - Patronato - Servizi
                </span>
            </div>
        </div>
    );
};

export const LogoSmall: React.FC<{ className?: string }> = ({ className = '' }) => {
    return (
        <div className={`flex flex-col leading-tight ${className}`}>
            <div className="text-lg font-extrabold text-slate-700 tracking-tight uppercase">
                Centro Pratiche
            </div>
            <div className="text-sm font-light text-slate-500 tracking-wider uppercase">
                Flaiano
            </div>
        </div>
    )
}
