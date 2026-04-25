import React from 'react';

interface SectionProps {
    title: string;
    children: React.ReactNode;
    className?: string;
}

const Section: React.FC<SectionProps> = ({ title, children, className = "" }) => (
    <section className={`py-16 px-4 ${className}`}>
        <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">{title}</h2>
            {children}
        </div>
    </section>
);

export default Section;
