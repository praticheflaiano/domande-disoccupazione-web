import React, { useState } from 'react';
import { CheckCircle2, XCircle, AlertTriangle, ArrowRight, RotateCcw } from 'lucide-react';

type Answer = 'si' | 'no' | 'forse';

interface Question {
    id: string;
    text: string;
    hint?: string;
    options: { value: Answer; label: string; weight: number }[];
}

const questions: Question[] = [
    {
        id: 'cessation',
        text: 'La tua cessazione del rapporto di lavoro è stata involontaria?',
        hint: 'Involontaria = licenziamento, scadenza contratto, dimissioni per giusta causa.',
        options: [
            { value: 'si', label: 'Sì, licenziato o contratto scaduto', weight: 10 },
            { value: 'forse', label: 'Dimissioni per giusta causa', weight: 7 },
            { value: 'no', label: 'Dimissioni volontarie semplici', weight: -100 },
        ],
    },
    {
        id: 'contribution',
        text: 'Hai almeno 13 settimane di contributi negli ultimi 4 anni?',
        hint: 'Contano tutti i periodi di lavoro subordinato accreditati INPS.',
        options: [
            { value: 'si', label: 'Sì, almeno 13 settimane', weight: 10 },
            { value: 'forse', label: 'Non sono sicuro, devo verificare', weight: 3 },
            { value: 'no', label: 'No, meno di 13 settimane', weight: -100 },
        ],
    },
    {
        id: 'previous_resignation',
        text: 'Nei 12 mesi precedenti ti sei dimesso da un tempo indeterminato?',
        hint: 'Dal 2025 servono 13 settimane di contributi nel nuovo rapporto se ti sei dimesso prima (Circ. INPS 98/2025).',
        options: [
            { value: 'no', label: 'No, nessuna dimissione recente', weight: 10 },
            { value: 'forse', label: 'Sì ma con 13+ settimane nel nuovo', weight: 7 },
            { value: 'si', label: 'Sì e senza 13 settimane nuove', weight: -100 },
        ],
    },
];

const EligibilityQuiz: React.FC = () => {
    const [current, setCurrent] = useState(0);
    const [answers, setAnswers] = useState<Record<string, Answer>>({});
    const [completed, setCompleted] = useState(false);

    const q = questions[current];

    const handleAnswer = (val: Answer) => {
        const next = { ...answers, [q.id]: val };
        setAnswers(next);
        if (current + 1 < questions.length) {
            setCurrent(current + 1);
        } else {
            setCompleted(true);
            if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('event', 'eligibility_quiz_complete', { answers: JSON.stringify(next) });
            }
        }
    };

    const reset = () => {
        setAnswers({});
        setCurrent(0);
        setCompleted(false);
    };

    const calculateVerdict = (): { status: 'yes' | 'maybe' | 'no'; message: string; action: string; href: string } => {
        const totalWeight = Object.entries(answers).reduce((sum, [qid, val]) => {
            const question = questions.find((qq) => qq.id === qid);
            const opt = question?.options.find((o) => o.value === val);
            return sum + (opt?.weight ?? 0);
        }, 0);

        if (totalWeight < 0) {
            return {
                status: 'no',
                message: 'Probabilmente NON hai diritto alla NASpI.',
                action: 'Contatta il patronato per valutare alternative (ADI, SFL, riqualificazione GOL)',
                href: '/contatti',
            };
        }
        if (totalWeight >= 27) {
            return {
                status: 'yes',
                message: 'Hai probabilmente diritto alla NASpI.',
                action: 'Presenta la domanda subito (hai 68 giorni dalla cessazione)',
                href: '/richiedi',
            };
        }
        return {
            status: 'maybe',
            message: 'La tua situazione richiede una valutazione specifica.',
            action: 'Contattaci gratuitamente per una verifica dei requisiti',
            href: '/contatti',
        };
    };

    if (completed) {
        const verdict = calculateVerdict();
        const color = verdict.status === 'yes' ? 'emerald' : verdict.status === 'no' ? 'red' : 'amber';
        const Icon = verdict.status === 'yes' ? CheckCircle2 : verdict.status === 'no' ? XCircle : AlertTriangle;

        return (
            <aside className={`bg-${color}-50 border-2 border-${color}-200 rounded-3xl p-6 md:p-8`} aria-live="polite">
                <div className="flex items-start gap-4">
                    <Icon className={`w-10 h-10 text-${color}-600 flex-shrink-0`} aria-hidden="true" />
                    <div className="flex-1">
                        <h3 className={`text-xl md:text-2xl font-extrabold text-${color}-900 mb-2`}>{verdict.message}</h3>
                        <p className={`text-${color}-800 mb-4 leading-relaxed`}>{verdict.action}.</p>
                        <div className="flex flex-wrap gap-3">
                            <a
                                href={verdict.href}
                                className={`inline-flex items-center gap-2 bg-${color}-600 hover:bg-${color}-700 text-white font-bold px-5 py-2.5 rounded-lg text-sm transition-colors`}
                            >
                                {verdict.status === 'yes' ? 'Invia la domanda' : 'Parla con noi'}
                                <ArrowRight className="w-4 h-4" aria-hidden="true" />
                            </a>
                            <button
                                type="button"
                                onClick={reset}
                                className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-semibold px-4 py-2.5 text-sm"
                            >
                                <RotateCcw className="w-4 h-4" aria-hidden="true" />
                                Ripeti il quiz
                            </button>
                        </div>
                    </div>
                </div>
            </aside>
        );
    }

    return (
        <section className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm" aria-labelledby="quiz-heading">
            <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-teal-700">Verifica rapida — 30 secondi</span>
                    <span className="text-xs text-slate-500">{current + 1} / {questions.length}</span>
                </div>
                <h2 id="quiz-heading" className="text-xl md:text-2xl font-extrabold text-slate-900">Hai diritto alla NASpI?</h2>
                <div className="w-full h-1 bg-slate-100 rounded-full mt-3 overflow-hidden">
                    <div
                        className="h-full bg-teal-500 transition-all duration-300"
                        style={{ width: `${((current + 1) / questions.length) * 100}%` }}
                    ></div>
                </div>
            </div>

            <div className="space-y-4">
                <p className="text-lg font-semibold text-slate-900">{q.text}</p>
                {q.hint && <p className="text-xs text-slate-500">{q.hint}</p>}
                <div className="space-y-2">
                    {q.options.map((opt) => (
                        <button
                            key={opt.value}
                            type="button"
                            onClick={() => handleAnswer(opt.value)}
                            className="w-full text-left px-4 py-3 border-2 border-slate-200 hover:border-teal-400 hover:bg-teal-50 rounded-xl transition-colors text-sm font-medium text-slate-700 hover:text-teal-900"
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EligibilityQuiz;
