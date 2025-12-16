import { GoogleGenerativeAI } from "@google/generative-ai";
import { ExtractedData, CalculatorMode } from "../types";

// Polyfill SchemaType if not exported (it varies by SDK version)
enum SchemaType {
    STRING = "STRING",
    NUMBER = "NUMBER",
    INTEGER = "INTEGER",
    BOOLEAN = "BOOLEAN",
    ARRAY = "ARRAY",
    OBJECT = "OBJECT"
}

export const analyzeContributionDocument = async (base64Data: string, mimeType: string, mode: CalculatorMode): Promise<ExtractedData> => {
    try {
        // @ts-ignore
        const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
        });

        const today = new Date().toISOString().split('T')[0];
        const fourYearsAgo = new Date(); fourYearsAgo.setFullYear(fourYearsAgo.getFullYear() - 4);
        const dateLimit = fourYearsAgo.toISOString().split('T')[0];

        const isTextBased = mimeType.includes('xml') || mimeType.includes('text') || mimeType.includes('json');
        let contentParts: any[] = [];

        let prompt = mode === 'forecast'
            ? `Sei un analista esperto INPS. Analizza il documento. DATA ODIERNA: ${today}. PERIODO: Dal ${dateLimit} ad oggi. Calcola SOMMA SETTIMANE UTILI e SOMMA IMPONIBILE PREVIDENZIALE in questo periodo. Restituisci 0 se non trovi dati.`
            : `Sei un analista INPS. Estrai i dati del provvedimento APPROVATO: Data inizio, Giorni totali, Importo mensile.`;

        if (isTextBased) {
            try {
                contentParts.push({ text: prompt + `\n\nDOCUMENTO DA ANALIZZARE (XML/TESTO):\n\n${atob(base64Data)}` });
            } catch (e) {
                contentParts.push({ text: prompt + `\n\nDOCUMENTO DA ANALIZZARE (RAW):\n\n${base64Data}` });
            }
        } else {
            contentParts.push({ text: prompt });
            contentParts.push({ inlineData: { mimeType: mimeType, data: base64Data } });
        }

        const result = await model.generateContent({
            contents: [{ role: 'user', parts: contentParts }],
            generationConfig: {
                responseMimeType: "application/json",
                // @ts-ignore
                responseSchema: mode === 'forecast' ? {
                    type: SchemaType.OBJECT,
                    properties: {
                        weeks: { type: SchemaType.NUMBER },
                        wages: { type: SchemaType.NUMBER }
                    }
                } : {
                    type: SchemaType.OBJECT,
                    properties: {
                        startDate: { type: SchemaType.STRING },
                        days: { type: SchemaType.NUMBER },
                        monthlyAmount: { type: SchemaType.NUMBER }
                    }
                }
            }
        });

        const responseText = result.response.text();
        const cleanText = (responseText || "{}").replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(cleanText) as ExtractedData;
    } catch (error) {
        console.error("Gemini Error:", error);
        return { weeks: 0, wages: 0, days: 0, monthlyAmount: 0 };
    }
};
