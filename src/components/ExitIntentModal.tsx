import React, { useState, useEffect, useRef } from 'react';
import { X, Download, MessageCircle } from 'lucide-react';
import { WHATSAPP_HREF } from './ConversionCTA';

const STORAGE_KEY = 'exit-intent-shown';

const ExitIntentModal: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [consent, setConsent] = useState(false);
    const [sending, setSending] = useState(false);
    const [msg, setMsg] = useState<string | null>(null);
    const shownRef = useRef(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        // Already shown in this session?
        if (sessionStorage.getItem(STORAGE_KEY)) return;

        const onLeave = (e: MouseEvent) => {
            if (shownRef.current) return;
            // Only top-edge exit trigger
            if (e.clientY <= 0 && e.relatedTarget === null) {
                shownRef.current = true;
                sessionStorage.setItem(STORAGE_KEY, '1');
                setOpen(true);
            }
        };
        // Skip on mobile (no meaningful mouseleave)
        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        if (isMobile) return;

        document.addEventListener('mouseleave', onLeave);
        return () => document.removeEventListener('mouseleave', onLeave);
    }, []);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!consent || !email) return;
        setSending(true);
        setMsg(null);
        try {
            const res = await fetch('/api/lead-capture', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    name: name || undefined,
                    consent: true,
                    source: 'exit-intent',
                    tags: ['naspi-pdf-2026', 'exit-intent'],
                }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Errore');
            window.gtag?.('event', 'lead_capture', { source: 'exit-intent' });
            setMsg('Grazie! Scaricamento in corso...');
            window.location.href = data.pdfUrl;
        } catch (err) {
            setMsg('Errore invio. Contattaci su WhatsApp.');
            console.error(err);
        } finally {
            setSending(false);
        }
    };

    if (!open) return null;

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label="Scarica la guida NASpI"
            className="fixed inset-0 z-[80] flex items-center justify-center px-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200"
        >
            <button
                type="button"
                aria-label="Chiudi finestra"
                className="absolute inset-0 w-full h-full cursor-default"
                onClick={() => setOpen(false)}
            />
            <div
                className="relative max-w-lg w-full bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
            >
                <div className="bg-gradient-to-br from-slate-900 to-blue-900 text-white p-6 relative">
                    <button
                        type="button"
                        onClick={() => setOpen(false)}
                        aria-label="Chiudi"
                        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
                    >
                        <X className="w-4 h-4" aria-hidden="true" />
                    </button>
                    <div className="flex items-center gap-2 mb-2">
                        <Download className="w-5 h-5 text-teal-300" aria-hidden="true" />
                        <span className="text-xs font-bold uppercase tracking-wider text-teal-300">Prima di andare</span>
                    </div>
                    <h3 className="text-2xl font-extrabold leading-tight">Scarica la guida NASpI 2026</h3>
                    <p className="text-slate-200 text-sm mt-2">Checklist 7 passi + parametri INPS 2026 + modelli diffida. PDF gratuito, 10 pagine.</p>
                </div>

                <form onSubmit={submit} className="p-6 space-y-3" noValidate>
                    <input
                        type="text"
                        placeholder="Nome (facoltativo)"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-900 text-sm"
                        autoComplete="given-name"
                    />
                    <input
                        type="email"
                        placeholder="La tua email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-900 text-sm"
                        autoComplete="email"
                    />
                    <label className="flex items-start gap-2 text-xs text-slate-600">
                        <input
                            type="checkbox"
                            checked={consent}
                            onChange={(e) => setConsent(e.target.checked)}
                            className="mt-0.5"
                            required
                        />
                        <span>Acconsento al trattamento per ricevere PDF e comunicazioni. <a href="/privacy" className="underline">Privacy</a>.</span>
                    </label>
                    <button
                        type="submit"
                        disabled={sending || !email || !consent}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {sending ? 'Invio...' : 'Scarica il PDF ora'}
                    </button>
                    {msg && <p className="text-xs text-center text-slate-600">{msg}</p>}
                    <div className="flex items-center gap-2 justify-center text-xs text-slate-400 pt-2">
                        <span>oppure</span>
                        <a
                            href={WHATSAPP_HREF}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-600 hover:text-emerald-700 font-semibold inline-flex items-center gap-1"
                        >
                            <MessageCircle className="w-3 h-3" aria-hidden="true" />
                            scrivici su WhatsApp
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ExitIntentModal;
