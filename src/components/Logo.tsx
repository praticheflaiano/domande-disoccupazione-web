import React from 'react';

/**
 * Logo principale (footer, versioni full).
 * Segno + wordmark affiancati, tipografia Inter, nessun border.
 */
export const Logo: React.FC<{ className?: string }> = ({ className = '' }) => {
    return (
        <span className={`inline-flex items-center gap-3 ${className}`}>
            <LogoMark />
            <span className="flex flex-col leading-tight">
                <span className="text-sm md:text-base font-extrabold text-slate-900 tracking-tight uppercase">
                    Centro Pratiche
                </span>
                <span className="text-xs md:text-sm font-semibold text-teal-700 tracking-[0.18em] uppercase">
                    Flaiano
                </span>
            </span>
        </span>
    );
};

/**
 * Segno puro: quadrato arrotondato con monogramma CF. Altezza 40px.
 */
export const LogoMark: React.FC<{ className?: string }> = ({ className = '' }) => (
    <span
        aria-hidden="true"
        className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-slate-900 to-slate-700 text-white font-extrabold text-base shadow-sm ${className}`}
    >
        CF
    </span>
);

/**
 * Variante ridotta per uso in-line (privacy policy, email, etc.).
 * Solo wordmark senza mark.
 */
export const LogoSmall: React.FC<{ className?: string }> = ({ className = '' }) => {
    return (
        <span className={`inline-flex flex-col leading-tight ${className}`}>
            <span className="text-sm font-extrabold tracking-tight uppercase">
                Centro Pratiche
            </span>
            <span className="text-xs font-semibold tracking-[0.18em] uppercase opacity-80">
                Flaiano
            </span>
        </span>
    );
};
