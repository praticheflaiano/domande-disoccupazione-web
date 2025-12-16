# SPECIFICA COMPLETA: Portale NASpI & Patronato "Centro Pratiche Flaiano"

Questo file contiene l'intero codice sorgente, la struttura e le logiche necessarie per ricostruire l'applicazione React 19.

## 1. Stack Tecnologico
*   **Framework**: React 19 RC.
*   **Stile**: Tailwind CSS.
*   **Icone**: Lucide React.
*   **AI**: Google GenAI SDK (`@google/genai`).
*   **Routing**: Gestione stato interna (`App.tsx` con History API).
*   **Integrazioni**: Iframe esterni per moduli e prenotazioni (`arcanis.it`).

---

## 2. Codice Sorgente Completo

Copia e incolla i seguenti blocchi di codice nei rispettivi file.

### FILE: `index.html`
Configurazione React 19, Import Map, Tailwind e gestione errori globale.

```html
<!DOCTYPE html>
<html lang="it">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
    
    <title>Caricamento... | Centro Pratiche Flaiano</title>
    <meta name="description" content="Portale ufficiale NASpI. Calcolo indennità con IA, invio domanda online e assistenza CAF.">
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;1,600&display=swap" rel="stylesheet">
    
    <style>
      body { font-family: 'Inter', sans-serif; -webkit-tap-highlight-color: transparent; }
      h1, h2, h3 { letter-spacing: -0.025em; }
      .hide-scrollbar::-webkit-scrollbar { display: none; }
      .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      input, select, textarea { background-color: #ffffff !important; color: #0f172a !important; border-color: #cbd5e1; }
      
      @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
      .animate-float { animation: float 6s ease-in-out infinite; }
      
      #error-overlay { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #fff; z-index: 9999; padding: 20px; color: #ef4444; font-family: monospace; overflow: auto; }
    </style>

    <!-- Polyfills -->
    <script>
      window.process = window.process || { env: {} };
    </script>

    <!-- Error Trapping -->
    <script>
      window.onerror = function(msg, url, line, col, error) {
        console.error("Global Error:", msg, error);
        const overlay = document.getElementById('error-overlay');
        if (overlay) {
          overlay.style.display = 'block';
          overlay.innerHTML = `<h1 style="font-size:20px; font-weight:bold; margin-bottom:10px;">Errore Applicazione</h1><pre style="background:#f3f4f6; padding:10px; border-radius:8px;">${msg}</pre><p>Ricarica la pagina.</p>`;
        }
      };
    </script>

    <!-- React 19 Import Map -->
    <script type="importmap">
    {
      "imports": {
        "react": "https://esm.sh/react@19.0.0-rc-69d4b800-20241021",
        "react-dom/client": "https://esm.sh/react-dom@19.0.0-rc-69d4b800-20241021/client",
        "react-dom": "https://esm.sh/react-dom@19.0.0-rc-69d4b800-20241021",
        "lucide-react": "https://esm.sh/lucide-react@0.454.0?deps=react@19.0.0-rc-69d4b800-20241021",
        "@google/genai": "https://esm.sh/@google/genai@0.1.1"
      }
    }
    </script>
  </head>
  <body class="bg-slate-50 text-slate-900 antialiased selection:bg-blue-100 selection:text-blue-900">
    <div id="root"></div>
    <div id="error-overlay"></div>
    <script type="module" src="./index.tsx"></script>
  </body>
</html>
```

### FILE: `types.ts`
Definizione interfacce TypeScript.

```typescript
export enum TerminationReason {
  INVOLUNTARY = 'Licenziamento Involontario / Scadenza Contratto',
  VOLUNTARY = 'Dimissioni Volontarie',
  CONSENSUAL = 'Risoluzione Consensuale',
}

export enum VoluntaryException {
  NONE = 'Nessuna eccezione',
  JUST_CAUSE = 'Giusta Causa',
  PROTECTED_PERIOD = 'Periodo Tutelato (es. Maternità)',
}

export type CalculatorMode = 'forecast' | 'analysis';
export type Page = 'home' | 'calculator' | 'guide' | 'office' | 'apply' | 'anticipo';

export interface UserInputData {
  age: number;
  weeksWorkedLast4Years: number;
  totalGrossWagesLast4Years: number;
  terminationReason: TerminationReason;
  voluntaryException: VoluntaryException;
  hasWorked30DaysLastYear: boolean;
  terminationDate: string;
  approvedStartDate?: string;
  approvedDaysDuration?: number;
  approvedMonthlyAmount?: number;
}

export interface MonthlyPayment {
  monthYear: string;
  grossAmount: number;
  netAmount: number;
  reductionApplied: boolean;
  reductionPercentage: number;
  daysPaid: number;
  estimatedPaymentDate: string;
  isFuture?: boolean;
  dateObj?: Date;
}

export interface NaspiResult {
  isEligible: boolean;
  ineligibilityReason?: string;
  durationWeeks: number;
  totalDaysDuration: number;
  grossMonthlyAmount: number;
  startDate: string;
  endDate: string;
  schedule: MonthlyPayment[];
  calculationDetails: {
    averageMonthlyWage: number;
    referenceWage: number;
  };
}

export interface ExtractedData {
  weeks?: number;
  wages?: number;
  startDate?: string;
  days?: number;
  monthlyAmount?: number;
}

export interface AnticipoInput {
  naspiStartDate: string;
  totalDays: number;
  monthlyGrossAmount: number;
  anticipoRequestDate: string;
}

export interface AnticipoResult {
  totalGrossAmount: number;
  estimatedTax: number;
  estimatedNetAmount: number;
  daysRemaining: number;
  lastDayCovered: string;
}
```

### FILE: `constants.ts`
Costanti finanziarie (Soglie 2024/2025).

```typescript
export const NASPI_CONSTANTS = {
  THRESHOLD_AMOUNT: 1425.21,
  MAX_MONTHLY_CAP: 1550.42,
  COEFF_WEEKS_TO_MONTHS: 4.33,
  PERCENTAGE_BASE: 0.75,
  PERCENTAGE_EXCESS: 0.25,
  REDUCTION_START_MONTH: 6,
  REDUCTION_START_MONTH_OVER_55: 8,
  REDUCTION_PERCENTAGE: 0.03,
  SEPARATE_TAXATION_RATE_ESTIMATE: 0.23,
};
```

### FILE: `utils/calculations.ts`
Logica matematica core.

```typescript
import { NASPI_CONSTANTS } from "../constants";
import { NaspiResult, TerminationReason, UserInputData, VoluntaryException, MonthlyPayment, AnticipoInput, AnticipoResult } from "../types";

const formatDate = (date: Date): string => {
  if (!date || isNaN(date.getTime())) return "Data non valida";
  return new Intl.DateTimeFormat('it-IT', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
};

const formatMonthYear = (date: Date): string => {
  if (!date || isNaN(date.getTime())) return "N/A";
  return new Intl.DateTimeFormat('it-IT', { month: 'long', year: 'numeric' }).format(date);
};

const calculateEstimatedNet = (grossAmount: number, daysPaid: number): number => {
  if (!grossAmount || grossAmount <= 0 || !daysPaid || daysPaid <= 0) return 0;
  const projectedAnnualIncome = (grossAmount / daysPaid) * 365;
  let annualTax = 0;
  
  if (projectedAnnualIncome <= 28000) {
    annualTax = projectedAnnualIncome * 0.23;
  } else if (projectedAnnualIncome <= 50000) {
    annualTax = 6440 + ((projectedAnnualIncome - 28000) * 0.35);
  } else {
    annualTax = 14140 + ((projectedAnnualIncome - 50000) * 0.43);
  }

  let annualDetraction = 0;
  if (projectedAnnualIncome <= 15000) annualDetraction = 1955;
  else if (projectedAnnualIncome <= 28000) annualDetraction = 1910 + (1190 * ((28000 - projectedAnnualIncome) / 13000));
  else if (projectedAnnualIncome <= 50000) annualDetraction = 1910 * ((50000 - projectedAnnualIncome) / 22000);

  let netAnnualTax = Math.max(0, annualTax - annualDetraction);
  const effectiveTaxRate = netAnnualTax / projectedAnnualIncome;
  return parseFloat((grossAmount * (1 - effectiveTaxRate)).toFixed(2));
};

const generateSchedule = (startDateObj: Date, totalDaysDuration: number, baseMonthlyAmount: number, age: number): MonthlyPayment[] => {
    const schedule: MonthlyPayment[] = [];
    if (isNaN(startDateObj.getTime()) || totalDaysDuration <= 0) return schedule;

    const dailyRate = baseMonthlyAmount / 30;
    let remainingDays = totalDaysDuration;
    let currentDate = new Date(startDateObj);
    const reductionStartMonth = age >= 55 ? NASPI_CONSTANTS.REDUCTION_START_MONTH_OVER_55 : NASPI_CONSTANTS.REDUCTION_START_MONTH;
    
    while (remainingDays > 0) {
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();
        const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const currentDayOfMonth = currentDate.getDate();
        
        let daysInThisMonth = (lastDayOfMonth - currentDayOfMonth) + 1;
        if (daysInThisMonth > remainingDays) daysInThisMonth = remainingDays;

        const msSinceStart = currentDate.getTime() - startDateObj.getTime();
        const monthsSinceStart = Math.floor(msSinceStart / (1000 * 60 * 60 * 24 * 30.4375));
        const naspiMonthIndex = monthsSinceStart + 1;

        let reductionApplied = false;
        let reductionPercentageDisplay = 0;
        let currentReductionFactor = 1;

        if (naspiMonthIndex >= reductionStartMonth) {
            const monthsOver = naspiMonthIndex - reductionStartMonth + 1;
            currentReductionFactor = Math.pow(1 - NASPI_CONSTANTS.REDUCTION_PERCENTAGE, monthsOver);
            reductionApplied = true;
            reductionPercentageDisplay = Math.round((1 - currentReductionFactor) * 100);
        }

        const grossAmount = (dailyRate * currentReductionFactor) * daysInThisMonth;
        const netAmount = calculateEstimatedNet(grossAmount, daysInThisMonth);
        const paymentDate = new Date(currentYear, currentMonth + 1, 15);

        schedule.push({
          monthYear: formatMonthYear(currentDate),
          grossAmount: parseFloat(grossAmount.toFixed(2)),
          netAmount: netAmount,
          reductionApplied,
          reductionPercentage: reductionPercentageDisplay,
          daysPaid: daysInThisMonth,
          estimatedPaymentDate: formatDate(paymentDate),
          dateObj: new Date(currentDate)
        });

        remainingDays -= daysInThisMonth;
        currentDate = new Date(currentYear, currentMonth + 1, 1);
    }
    return schedule;
};

export const calculateNaspiEligibility = (data: UserInputData): NaspiResult => {
  const { weeksWorkedLast4Years, totalGrossWagesLast4Years, terminationReason, voluntaryException, age, terminationDate } = data;
  let isEligible = true;
  let ineligibilityReason = "";

  if (terminationReason === TerminationReason.VOLUNTARY && voluntaryException === VoluntaryException.NONE) {
    isEligible = false;
    ineligibilityReason = "Le dimissioni volontarie non danno diritto alla NASpI (salvo giusta causa/maternità).";
  }
  if (isEligible && weeksWorkedLast4Years < 13) {
    isEligible = false;
    ineligibilityReason = `Requisito non soddisfatto: servono 13 settimane contributive (tu ne hai ${weeksWorkedLast4Years}).`;
  }
  if (!isEligible) {
    return { isEligible: false, ineligibilityReason, durationWeeks: 0, totalDaysDuration: 0, grossMonthlyAmount: 0, startDate: "", endDate: "", schedule: [], calculationDetails: { averageMonthlyWage: 0, referenceWage: 0 } };
  }

  const durationWeeks = Math.min(weeksWorkedLast4Years / 2, 104);
  const totalDaysDuration = Math.floor(durationWeeks * 7);
  const averageMonthlyWage = (totalGrossWagesLast4Years / Math.max(weeksWorkedLast4Years, 1)) * NASPI_CONSTANTS.COEFF_WEEKS_TO_MONTHS;

  let baseGrossMonthly = 0;
  if (averageMonthlyWage <= NASPI_CONSTANTS.THRESHOLD_AMOUNT) {
    baseGrossMonthly = averageMonthlyWage * NASPI_CONSTANTS.PERCENTAGE_BASE;
  } else {
    const excess = averageMonthlyWage - NASPI_CONSTANTS.THRESHOLD_AMOUNT;
    baseGrossMonthly = (NASPI_CONSTANTS.THRESHOLD_AMOUNT * NASPI_CONSTANTS.PERCENTAGE_BASE) + (excess * NASPI_CONSTANTS.PERCENTAGE_EXCESS);
  }
  if (baseGrossMonthly > NASPI_CONSTANTS.MAX_MONTHLY_CAP) baseGrossMonthly = NASPI_CONSTANTS.MAX_MONTHLY_CAP;

  const termDateObj = new Date(terminationDate);
  const startDateObj = new Date(termDateObj);
  startDateObj.setDate(termDateObj.getDate() + 8);
  const endDateObj = new Date(startDateObj);
  endDateObj.setDate(startDateObj.getDate() + totalDaysDuration);
  
  return {
    isEligible: true,
    durationWeeks,
    totalDaysDuration,
    grossMonthlyAmount: parseFloat(baseGrossMonthly.toFixed(2)),
    startDate: formatDate(startDateObj),
    endDate: formatDate(endDateObj),
    schedule: generateSchedule(startDateObj, totalDaysDuration, baseGrossMonthly, age),
    calculationDetails: { averageMonthlyWage, referenceWage: averageMonthlyWage },
  };
};

export const calculateNaspiFromDecree = (data: UserInputData): NaspiResult => {
    const { approvedStartDate, approvedDaysDuration, approvedMonthlyAmount, age } = data;
    if (!approvedStartDate || !approvedDaysDuration || !approvedMonthlyAmount) return calculateNaspiEligibility({ ...data, weeksWorkedLast4Years: 0 }); // Fallback

    const startDateObj = new Date(approvedStartDate);
    const endDateObj = new Date(startDateObj);
    endDateObj.setDate(startDateObj.getDate() + approvedDaysDuration);

    return {
        isEligible: true,
        durationWeeks: Math.round(approvedDaysDuration / 7),
        totalDaysDuration: approvedDaysDuration,
        grossMonthlyAmount: approvedMonthlyAmount,
        startDate: formatDate(startDateObj),
        endDate: formatDate(endDateObj),
        schedule: generateSchedule(startDateObj, approvedDaysDuration, approvedMonthlyAmount, age),
        calculationDetails: { averageMonthlyWage: 0, referenceWage: 0 }
    };
}

export const calculateAnticipo = (input: AnticipoInput): AnticipoResult => {
  const startDate = new Date(input.naspiStartDate);
  const requestDate = new Date(input.anticipoRequestDate);
  const fullSchedule = generateSchedule(startDate, input.totalDays, input.monthlyGrossAmount, 40);
  
  let totalGross = 0;
  let remainingDays = 0;
  for (const payment of fullSchedule) {
      if (!payment.dateObj) continue;
      const paymentEndOfMonth = new Date(payment.dateObj.getFullYear(), payment.dateObj.getMonth() + 1, 0);
      if (payment.dateObj >= requestDate) {
          totalGross += payment.grossAmount;
          remainingDays += payment.daysPaid;
      } else if (paymentEndOfMonth > requestDate) {
          const timeDiff = paymentEndOfMonth.getTime() - requestDate.getTime();
          const daysLeftInMonth = Math.ceil(timeDiff / (1000 * 3600 * 24));
          const dailyRate = payment.grossAmount / payment.daysPaid;
          totalGross += (dailyRate * daysLeftInMonth);
          remainingDays += daysLeftInMonth;
      }
  }
  const estimatedTax = totalGross * NASPI_CONSTANTS.SEPARATE_TAXATION_RATE_ESTIMATE;
  return {
      totalGrossAmount: parseFloat(totalGross.toFixed(2)),
      estimatedTax: parseFloat(estimatedTax.toFixed(2)),
      estimatedNetAmount: parseFloat((totalGross - estimatedTax).toFixed(2)),
      daysRemaining: remainingDays,
      lastDayCovered: "Fine NASpI"
  };
};
```

### FILE: `services/geminiService.ts`
Analisi documenti OCR con IA.

```typescript
import { GoogleGenAI, Type } from "@google/genai";
import { ExtractedData, CalculatorMode } from "../types";

export const analyzeContributionDocument = async (base64Data: string, mimeType: string, mode: CalculatorMode): Promise<ExtractedData> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const today = new Date().toISOString().split('T')[0];
    const fourYearsAgo = new Date(); fourYearsAgo.setFullYear(fourYearsAgo.getFullYear() - 4);
    const dateLimit = fourYearsAgo.toISOString().split('T')[0];
    
    const isTextBased = mimeType.includes('xml') || mimeType.includes('text') || mimeType.includes('json');
    let parts: any[] = [];
    
    if (isTextBased) {
        try {
            parts.push({ text: `DOCUMENTO DA ANALIZZARE (XML/TESTO):\n\n${atob(base64Data)}` });
        } catch (e) {
            parts.push({ text: `DOCUMENTO DA ANALIZZARE (RAW):\n\n${base64Data}` });
        }
    } else {
        parts.push({ inlineData: { mimeType: mimeType, data: base64Data } });
    }

    let prompt = mode === 'forecast' 
      ? `Sei un analista esperto INPS. Analizza il documento. DATA ODIERNA: ${today}. PERIODO: Dal ${dateLimit} ad oggi. Calcola SOMMA SETTIMANE UTILI e SOMMA IMPONIBILE PREVIDENZIALE in questo periodo. Restituisci 0 se non trovi dati.`
      : `Sei un analista INPS. Estrai i dati del provvedimento APPROVATO: Data inizio, Giorni totali, Importo mensile.`;

    let schemaProperties = mode === 'forecast'
      ? { weeks: { type: Type.NUMBER }, wages: { type: Type.NUMBER } }
      : { startDate: { type: Type.STRING }, days: { type: Type.NUMBER }, monthlyAmount: { type: Type.NUMBER } };

    parts.unshift({ text: prompt });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: { parts },
      config: {
        responseMimeType: "application/json",
        responseSchema: { type: Type.OBJECT, properties: schemaProperties },
      },
    });

    const cleanText = (response.text || "{}").replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanText) as ExtractedData;
  } catch (error) {
    console.error("Gemini Error:", error);
    return { weeks: 0, wages: 0, days: 0, monthlyAmount: 0 };
  }
};
```

### FILE: `services/chatService.ts`
Logica Chatbot.

```typescript
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
Sei l'Assistente Virtuale del "Centro Pratiche Flaiano" (domandedisoccupazione.it).
INFO UFFICIO: Via Filoteo Alberini, 25/int 10, 00139 Roma (RM). Lun-Gio 9:30-13/15:30-18, Ven 9:30-14. Tel 06 9784 5429.
SERVIZI: Calcolo NASpI, Anticipo P.IVA, Domanda Online.
REGOLE: Usa il grassetto per parole chiave. Se non sai rispondere, fornisci il link: https://wa.me/393716230690.
`;

export interface ChatMessage { role: 'user' | 'model'; text: string; }

export const sendChatMessage = async (history: ChatMessage[], newMessage: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const formattedHistory = history.map(msg => ({ role: msg.role, parts: [{ text: msg.text }] }));
    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      config: { systemInstruction: SYSTEM_INSTRUCTION },
      history: formattedHistory
    });
    const result = await chat.sendMessage({ message: newMessage });
    return result.text || "Errore. Riprova.";
  } catch (error) {
    return "Errore momentaneo. [Scrivici su WhatsApp](https://wa.me/393716230690)";
  }
};
```

### FILE: `components/Obligations.tsx`
Contenuto statico obblighi.

```tsx
import React from 'react';
import { ClipboardList, UserCheck, Briefcase, SearchCheck } from 'lucide-react';

const Obligations: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mt-8">
      <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
        <ClipboardList className="w-6 h-6 text-blue-600" /> Obblighi e Passi Successivi
      </h3>
      <div className="space-y-6">
          <p className="text-sm text-slate-600">Ricorda: <strong>DID</strong> (Dichiarazione Immediata Disponibilità), <strong>Patto di Servizio</strong> e <strong>Comunicazione NASpI-Com</strong> per redditi presunti.</p>
      </div>
    </div>
  );
};
export default Obligations;
```

### FILE: `components/Home.tsx`
Landing page.

```tsx
import React, { useState, useEffect } from 'react';
import { Calculator, ShieldCheck, ArrowRight, FileText, Banknote, CheckCircle2, Star, Sparkles, Send, Rocket, MessageCircle } from 'lucide-react';
import { Page } from '../types';

interface HomeProps { onNavigate: (page: Page) => void; }

const PracticeCounter = () => {
  const [count, setCount] = useState(1843);
  return <>{count.toLocaleString('it-IT')}</>;
};

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="animate-in fade-in duration-500">
      <title>Home | Centro Pratiche Flaiano</title>
      <meta name="description" content="Il portale ufficiale per la tua disoccupazione NASpI." />
      <div className="relative bg-slate-900 pt-16 pb-32 overflow-hidden rounded-b-[40px] shadow-2xl">
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">La tua disoccupazione,<br/><span className="text-blue-400">semplice e sicura.</span></h1>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button onClick={() => onNavigate('calculator')} className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold flex gap-2"><Calculator /> Calcola NASpI</button>
                <button onClick={() => onNavigate('apply')} className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold flex gap-2"><Send /> Richiedi Online</button>
            </div>
            <div className="mt-16 text-white grid grid-cols-2 md:grid-cols-4 gap-4">
                <div><div className="text-3xl font-bold"><PracticeCounter /></div><div className="text-xs text-slate-400">Pratiche</div></div>
                <div><div className="text-3xl font-bold">99.8%</div><div className="text-xs text-slate-400">Accoglimento</div></div>
            </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
```

### FILE: `components/NaspiCalculator.tsx`
Calcolatore principale.

```tsx
import React, { useState, useRef, useEffect } from 'react';
import { Upload, CheckCircle, AlertCircle, Calculator, BrainCircuit, FileText } from 'lucide-react';
import { analyzeContributionDocument } from '../services/geminiService';
import { calculateNaspiEligibility, calculateNaspiFromDecree } from '../utils/calculations';
import { ExtractedData, NaspiResult, TerminationReason, UserInputData, VoluntaryException, CalculatorMode } from '../types';
import Obligations from './Obligations';

const NaspiCalculator: React.FC = () => {
  const [mode, setMode] = useState<CalculatorMode | null>(null);
  const [step, setStep] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [inputData, setInputData] = useState<UserInputData>({ age: 30, weeksWorkedLast4Years: 0, totalGrossWagesLast4Years: 0, terminationReason: TerminationReason.INVOLUNTARY, voluntaryException: VoluntaryException.NONE, hasWorked30DaysLastYear: true, terminationDate: new Date().toISOString().split('T')[0], approvedStartDate: '', approvedDaysDuration: 0, approvedMonthlyAmount: 0 });
  const [result, setResult] = useState<NaspiResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !mode) return;
    setLoading(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
        const base64Content = (reader.result as string).split(',')[1];
        const data = await analyzeContributionDocument(base64Content, file.type, mode);
        if (mode === 'forecast') setInputData(prev => ({ ...prev, weeksWorkedLast4Years: data.weeks || 0, totalGrossWagesLast4Years: data.wages || 0 }));
        else setInputData(prev => ({ ...prev, approvedStartDate: data.startDate || '', approvedDaysDuration: data.days || 0, approvedMonthlyAmount: data.monthlyAmount || 0 }));
        setLoading(false);
        setStep(2);
    };
    reader.readAsDataURL(file);
  };

  const handleCalculate = () => {
    setResult(mode === 'forecast' ? calculateNaspiEligibility(inputData) : calculateNaspiFromDecree(inputData));
    setStep(3);
  };

  if (loading) return <div className="p-12 text-center">Analisi IA in corso...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <title>Calcolatore NASpI</title>
      {step === 0 && (
          <div className="grid md:grid-cols-2 gap-8">
              <div onClick={() => {setMode('forecast'); setStep(1)}} className="bg-white p-8 rounded-xl border shadow cursor-pointer"><Calculator className="w-12 h-12 text-blue-600 mb-4"/><h3>Previsione</h3></div>
              <div onClick={() => {setMode('analysis'); setStep(1)}} className="bg-white p-8 rounded-xl border shadow cursor-pointer"><FileText className="w-12 h-12 text-purple-600 mb-4"/><h3>Analisi Lettera</h3></div>
          </div>
      )}
      {step === 1 && (
          <div className="bg-white p-8 rounded-xl border text-center">
              <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
              <button onClick={() => fileInputRef.current?.click()} className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold">Carica Documento (PDF/Foto)</button>
              <button onClick={() => setStep(2)} className="block mx-auto mt-4 text-slate-500 underline">Salta (Manuale)</button>
          </div>
      )}
      {step === 2 && (
          <div className="bg-white p-8 rounded-xl border">
              <div className="grid gap-4 mb-6">
                  <label>Età: <input type="number" value={inputData.age} onChange={e => setInputData({...inputData, age: +e.target.value})} className="border p-2 rounded w-full"/></label>
                  {mode === 'forecast' ? (
                      <>
                        <label>Settimane: <input type="number" value={inputData.weeksWorkedLast4Years} onChange={e => setInputData({...inputData, weeksWorkedLast4Years: +e.target.value})} className="border p-2 rounded w-full"/></label>
                        <label>Imponibile: <input type="number" value={inputData.totalGrossWagesLast4Years} onChange={e => setInputData({...inputData, totalGrossWagesLast4Years: +e.target.value})} className="border p-2 rounded w-full"/></label>
                      </>
                  ) : (
                      <>
                        <label>Giorni: <input type="number" value={inputData.approvedDaysDuration} onChange={e => setInputData({...inputData, approvedDaysDuration: +e.target.value})} className="border p-2 rounded w-full"/></label>
                        <label>Mensile: <input type="number" value={inputData.approvedMonthlyAmount} onChange={e => setInputData({...inputData, approvedMonthlyAmount: +e.target.value})} className="border p-2 rounded w-full"/></label>
                      </>
                  )}
              </div>
              <button onClick={handleCalculate} className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold">Calcola</button>
          </div>
      )}
      {step === 3 && result && (
          <div className="bg-white p-8 rounded-xl border">
              <h2 className="text-2xl font-bold mb-4">{result.isEligible ? 'Idoneo' : 'Non Idoneo'}</h2>
              {result.isEligible && (
                  <div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="p-4 bg-slate-50 rounded">Durata: <strong>{result.totalDaysDuration} gg</strong></div>
                          <div className="p-4 bg-slate-50 rounded">Lordo: <strong>€ {result.grossMonthlyAmount}</strong></div>
                      </div>
                      <Obligations />
                  </div>
              )}
              <button onClick={() => setStep(0)} className="mt-6 text-blue-600 underline">Ricomincia</button>
          </div>
      )}
    </div>
  );
};
export default NaspiCalculator;
```

### FILE: `components/ApplyOnline.tsx`
Modulo richiesta (Iframe).

```tsx
import React, { useEffect } from 'react';
import { Zap, ShieldCheck } from 'lucide-react';

const ApplyOnline: React.FC = () => {
  useEffect(() => {
    const scriptUrl = "https://link.arcanis.it/js/form_embed.js";
    if (!document.querySelector(`script[src="${scriptUrl}"]`)) {
        const script = document.createElement('script');
        script.src = scriptUrl;
        document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="animate-in fade-in duration-500">
      <title>Richiedi NASpI Online</title>
      <div className="bg-gradient-to-br from-blue-900 to-slate-900 text-white py-12 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Richiesta NASpI Online</h1>
        <p className="max-w-2xl mx-auto text-blue-100">Compila il modulo, carica i documenti e noi pensiamo a tutto il resto.</p>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-8 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
              <div className="bg-white p-6 rounded-xl shadow border-t-4 border-green-500">
                  <h3 className="font-bold mb-4">Vantaggi</h3>
                  <ul className="space-y-2 text-sm">
                      <li className="flex gap-2"><Zap className="w-4 h-4 text-green-600"/> Velocità</li>
                      <li className="flex gap-2"><ShieldCheck className="w-4 h-4 text-blue-600"/> Revisione Esperta</li>
                  </ul>
              </div>
          </div>
          <div className="lg:col-span-2 bg-white rounded-xl shadow border overflow-hidden min-h-[600px]">
              <iframe src="https://link.arcanis.it/widget/survey/sImJrbagruVY43JLeqA9" style={{border: 'none', width: '100%', minHeight: '800px'}} scrolling="yes" id="sImJrbagruVY43JLeqA9" title="Modulo Richiesta NASpI"></iframe>
          </div>
      </div>
    </div>
  );
};
export default ApplyOnline;
```

### FILE: `components/AnticipoNaspi.tsx`
Modulo anticipo (Iframe) + Calcolatore.

```tsx
import React, { useEffect, useState } from 'react';
import { Calculator, Rocket } from 'lucide-react';
import { calculateAnticipo } from '../utils/calculations';

const AnticipoNaspi: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'info' | 'calculator'>('info');
  const [formData, setFormData] = useState({ startDate: '', totalDays: 0, monthlyAmount: 0, requestDate: new Date().toISOString().split('T')[0] });
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const scriptUrl = "https://link.arcanis.it/js/form_embed.js";
    if (!document.querySelector(`script[src="${scriptUrl}"]`)) {
        const script = document.createElement('script');
        script.src = scriptUrl;
        document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="animate-in fade-in duration-500">
      <title>Anticipo NASpI</title>
      <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white py-12 px-4 text-center">
        <h1 className="text-3xl font-bold">Anticipo NASpI</h1>
        <div className="flex justify-center gap-4 mt-8">
            <button onClick={() => setActiveTab('info')} className="px-6 py-2 rounded-full bg-white text-purple-900 font-bold">Informazioni</button>
            <button onClick={() => setActiveTab('calculator')} className="px-6 py-2 rounded-full bg-purple-800 text-white">Calcolatore</button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {activeTab === 'calculator' ? (
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-6">
                <h2 className="text-2xl font-bold mb-4">Simulazione Anticipo</h2>
                <div className="grid gap-4 mb-4">
                    <input type="date" value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} className="border p-2 rounded"/>
                    <input type="number" placeholder="Giorni Spettanti" value={formData.totalDays} onChange={e => setFormData({...formData, totalDays: +e.target.value})} className="border p-2 rounded"/>
                    <input type="number" placeholder="Importo Mensile" value={formData.monthlyAmount} onChange={e => setFormData({...formData, monthlyAmount: +e.target.value})} className="border p-2 rounded"/>
                </div>
                <button onClick={() => setResult(calculateAnticipo({ naspiStartDate: formData.startDate, totalDays: formData.totalDays, monthlyGrossAmount: formData.monthlyAmount, anticipoRequestDate: formData.requestDate }))} className="bg-purple-600 text-white w-full py-3 rounded font-bold">Calcola</button>
                {result && <div className="mt-4 p-4 bg-purple-50 rounded">Netto Stimato: <strong>€ {result.estimatedNetAmount}</strong></div>}
            </div>
        ) : (
            <div className="grid lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2"><h2 className="text-2xl font-bold">Info</h2><p>L'anticipo serve per aprire P.IVA.</p></div>
                <div className="lg:col-span-1 bg-white rounded-2xl shadow border overflow-hidden sticky top-24">
                    <iframe src="https://link.arcanis.it/widget/survey/EYbHdr9ktQI562e3nWrV" style={{border: 'none', width: '100%', minHeight: '600px'}} scrolling="no" id="EYbHdr9ktQI562e3nWrV" title="survey"></iframe>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};
export default AnticipoNaspi;
```

### FILE: `components/OfficeInfo.tsx`
Contatti e Prenotazioni (Iframe).

```tsx
import React, { useEffect } from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';

const OfficeInfo: React.FC = () => {
  useEffect(() => {
    const scriptUrl = "https://link.arcanis.it/js/form_embed.js";
    if (!document.querySelector(`script[src="${scriptUrl}"]`)) {
        const script = document.createElement('script');
        script.src = scriptUrl;
        document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="animate-in fade-in duration-500 pb-12">
      <title>Chi Siamo | Centro Flaiano</title>
      <div className="bg-slate-900 text-white py-16 px-4 text-center">
        <h1 className="text-3xl font-bold mb-6">Centro Pratiche Flaiano</h1>
      </div>
      <div className="max-w-6xl mx-auto px-4 -mt-10 relative z-10 grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 rounded shadow border-t-4 border-blue-600"><MapPin /> Via Filoteo Alberini, 25 Roma</div>
          <div className="bg-white p-6 rounded shadow border-t-4 border-green-600"><Phone /> 06 9784 5429</div>
          <div className="bg-white p-6 rounded shadow border-t-4 border-purple-600"><Clock /> Lun-Ven 9:30-18:00</div>
      </div>
      <div className="max-w-6xl mx-auto px-4 flex flex-col lg:flex-row gap-12">
          <div className="flex-1 bg-white rounded-2xl overflow-hidden shadow border min-h-[600px]">
              <iframe src="https://link.arcanis.it/widget/group/bklXY9sZUszt8V2GpkU1" style={{width: '100%', border: 'none', overflow: 'hidden', minHeight: '600px'}} scrolling="no" id="bklXY9sZUszt8V2GpkU1_1764775911716" title="Prenotazioni"></iframe>
          </div>
      </div>
    </div>
  );
};
export default OfficeInfo;
```

### FILE: `components/KnowledgeBase.tsx`
FAQ.

```tsx
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQItem = ({ q, a }: { q: string, a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border rounded mb-2 bg-white">
      <button onClick={() => setOpen(!open)} className="w-full p-4 flex justify-between font-bold">{q} {open ? <ChevronUp/> : <ChevronDown/>}</button>
      {open && <div className="p-4 border-t bg-slate-50">{a}</div>}
    </div>
  );
}

const KnowledgeBase: React.FC = () => (
  <div className="max-w-4xl mx-auto py-8 px-4">
    <title>Guide NASpI</title>
    <h2 className="text-3xl font-bold mb-6">Domande Frequenti</h2>
    <FAQItem q="Requisiti NASpI" a="Disoccupazione involontaria e 13 settimane contributi negli ultimi 4 anni." />
    <FAQItem q="Posso lavorare?" a="Sì, entro 8.500€ (dipendente) o 5.500€ (autonomo) annui." />
  </div>
);
export default KnowledgeBase;
```

### FILE: `components/ChatBot.tsx`
Widget Chat.

```tsx
import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { sendChatMessage } from '../services/chatService';

const ChatBot: React.FC<any> = ({ onNavigate }) => {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([{role: 'model', text: 'Ciao! Come posso aiutarti?'}]);
  const [input, setInput] = useState('');

  const send = async () => {
    if (!input) return;
    const newMsgs = [...msgs, {role: 'user', text: input}];
    setMsgs(newMsgs as any);
    setInput('');
    const res = await sendChatMessage(newMsgs as any, input);
    setMsgs([...newMsgs, {role: 'model', text: res}] as any);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {open && (
        <div className="bg-white w-80 h-96 rounded-xl shadow-2xl border mb-4 flex flex-col">
          <div className="bg-slate-900 text-white p-3 flex justify-between rounded-t-xl"><span>Assistente</span><button onClick={()=>setOpen(false)}><X/></button></div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {msgs.map((m, i) => <div key={i} className={`p-2 rounded ${m.role==='user'?'bg-blue-100 ml-auto':'bg-slate-100'}`}>{m.text}</div>)}
          </div>
          <div className="p-2 border-t flex gap-2"><input value={input} onChange={e=>setInput(e.target.value)} className="flex-1 border rounded p-1" /><button onClick={send}><Send/></button></div>
        </div>
      )}
      <button onClick={()=>setOpen(!open)} className="bg-blue-600 text-white p-4 rounded-full shadow-lg"><MessageCircle/></button>
    </div>
  );
};
export default ChatBot;
```

### FILE: `App.tsx`
Routing e Layout principale.

```tsx
import React, { useState, useEffect } from 'react';
import { Home as HomeIcon, Menu, X } from 'lucide-react';
import Home from './components/Home';
import NaspiCalculator from './components/NaspiCalculator';
import KnowledgeBase from './components/KnowledgeBase';
import OfficeInfo from './components/OfficeInfo';
import ApplyOnline from './components/ApplyOnline';
import AnticipoNaspi from './components/AnticipoNaspi';
import ChatBot from './components/ChatBot';
import { Page } from './types';

const App: React.FC = () => {
  const [page, setPage] = useState<Page>('home');
  const [menuOpen, setMenuOpen] = useState(false);

  const nav = (p: Page) => { setPage(p); setMenuOpen(false); window.scrollTo(0,0); };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      <header className="bg-white sticky top-0 z-40 border-b p-4 flex justify-between items-center">
        <div className="font-bold text-xl cursor-pointer" onClick={()=>nav('home')}>Centro Flaiano</div>
        <div className="hidden lg:flex gap-4">
            <button onClick={()=>nav('home')}>Home</button>
            <button onClick={()=>nav('calculator')}>Calcola</button>
            <button onClick={()=>nav('anticipo')}>Anticipo</button>
            <button onClick={()=>nav('office')}>Contatti</button>
            <button onClick={()=>nav('apply')} className="bg-slate-900 text-white px-4 py-1 rounded-full">Richiedi</button>
        </div>
        <button className="lg:hidden" onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?<X/>:<Menu/>}</button>
      </header>
      {menuOpen && <div className="lg:hidden bg-white p-4 flex flex-col gap-4 border-b">
        <button onClick={()=>nav('home')}>Home</button><button onClick={()=>nav('calculator')}>Calcola</button><button onClick={()=>nav('office')}>Contatti</button>
      </div>}
      <main className="flex-1">
        {page === 'home' && <Home onNavigate={nav} />}
        {page === 'calculator' && <NaspiCalculator />}
        {page === 'anticipo' && <AnticipoNaspi />}
        {page === 'guide' && <KnowledgeBase />}
        {page === 'office' && <OfficeInfo />}
        {page === 'apply' && <ApplyOnline />}
      </main>
      <ChatBot onNavigate={nav} />
    </div>
  );
};
export default App;
```

### FILE: `index.tsx`
Entry point.

```tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
if (container) {
  createRoot(container).render(<React.StrictMode><App /></React.StrictMode>);
}
```