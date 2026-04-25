import React from 'react';
import { Upload } from 'lucide-react';

interface DocumentUploaderProps {
    fileInputRef: React.RefObject<HTMLInputElement | null>;
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSkip: () => void;
}

const DocumentUploader: React.FC<DocumentUploaderProps> = ({ fileInputRef, onFileChange, onSkip }) => (
    <div className="p-8 md:p-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Carica Documento</h2>
        <p className="text-slate-500 mb-8">Carica il tuo Estratto Conto Contributivo (o la lettera INPS) per compilare i dati automaticamente.</p>

        <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full border-2 border-dashed border-slate-200 rounded-2xl p-12 cursor-pointer hover:border-blue-400 hover:bg-slate-50 transition-colors mb-6 group text-center"
        >
            <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4 group-hover:text-blue-500 transition-colors" aria-hidden="true" />
            <span className="font-bold text-slate-700 block">Clicca per caricare</span>
            <span className="text-sm text-slate-400 mt-2 block">PDF, Immagini (max 10MB)</span>
        </button>
        <input type="file" ref={fileInputRef as React.RefObject<HTMLInputElement>} onChange={onFileChange} className="hidden" accept="image/*,application/pdf" aria-label="Carica documento contributivo" />

        <div className="relative py-4">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
            <div className="relative flex justify-center"><span className="bg-white px-3 text-sm text-slate-400">oppure</span></div>
        </div>

        <button onClick={onSkip} className="text-blue-600 font-bold hover:underline mt-2">Inserisci dati manualmente</button>
    </div>
);

export default DocumentUploader;
