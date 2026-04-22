import type { VercelRequest, VercelResponse } from '@vercel/node';
import { SchemaType, type ResponseSchema } from '@google/generative-ai';
import { z } from 'zod';
import { getModel } from './_lib/gemini';
import { checkRateLimit, resolveClientIp } from './_lib/rateLimit';
import { assertAllowedOrigin } from './_lib/origin';

const MAX_BASE64_BYTES = 4 * 1024 * 1024;

const AnalyzeBody = z.object({
    base64Data: z.string().min(1).max(MAX_BASE64_BYTES),
    mimeType: z.string().min(1).max(128),
    mode: z.enum(['forecast', 'decree']),
});

const forecastSchema: ResponseSchema = {
    type: SchemaType.OBJECT,
    properties: {
        weeks: { type: SchemaType.NUMBER },
        wages: { type: SchemaType.NUMBER },
    },
};

const decreeSchema: ResponseSchema = {
    type: SchemaType.OBJECT,
    properties: {
        startDate: { type: SchemaType.STRING },
        days: { type: SchemaType.NUMBER },
        monthlyAmount: { type: SchemaType.NUMBER },
    },
};

export const config = {
    api: {
        bodyParser: { sizeLimit: '4.5mb' },
    },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    if (!assertAllowedOrigin(req)) {
        return res.status(403).json({ error: 'Origin not allowed' });
    }

    const ip = resolveClientIp(req);
    const limit = checkRateLimit(ip);
    if (!limit.ok) {
        return res.status(429).json({ error: `Troppe richieste (${limit.reason}). Riprova più tardi.` });
    }

    const parsed = AnalyzeBody.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ error: 'Payload non valido', details: parsed.error.flatten() });
    }

    const { base64Data, mimeType, mode } = parsed.data;

    const today = new Date().toISOString().split('T')[0];
    const fourYearsAgo = new Date();
    fourYearsAgo.setFullYear(fourYearsAgo.getFullYear() - 4);
    const dateLimit = fourYearsAgo.toISOString().split('T')[0];

    const prompt = mode === 'forecast'
        ? `Sei un analista esperto INPS. Analizza il documento. DATA ODIERNA: ${today}. PERIODO: Dal ${dateLimit} ad oggi. Calcola SOMMA SETTIMANE UTILI e SOMMA IMPONIBILE PREVIDENZIALE in questo periodo. Restituisci 0 se non trovi dati.`
        : `Sei un analista INPS. Estrai i dati del provvedimento APPROVATO: Data inizio, Giorni totali, Importo mensile.`;

    const isTextBased = mimeType.includes('xml') || mimeType.includes('text') || mimeType.includes('json');
    const contentParts: Array<{ text: string } | { inlineData: { mimeType: string; data: string } }> = [];

    if (isTextBased) {
        try {
            const decoded = Buffer.from(base64Data, 'base64').toString('utf-8');
            contentParts.push({ text: `${prompt}\n\nDOCUMENTO DA ANALIZZARE (XML/TESTO):\n\n${decoded}` });
        } catch {
            contentParts.push({ text: `${prompt}\n\nDOCUMENTO DA ANALIZZARE (RAW):\n\n${base64Data}` });
        }
    } else {
        contentParts.push({ text: prompt });
        contentParts.push({ inlineData: { mimeType, data: base64Data } });
    }

    try {
        const model = getModel();
        const result = await model.generateContent({
            contents: [{ role: 'user', parts: contentParts }],
            generationConfig: {
                responseMimeType: 'application/json',
                responseSchema: mode === 'forecast' ? forecastSchema : decreeSchema,
            },
        });
        const responseText = result.response.text() || '{}';
        const clean = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
        const payload = JSON.parse(clean);
        return res.status(200).json(payload);
    } catch (error) {
        console.error('Gemini analyze error:', error);
        return res.status(502).json({ error: 'Impossibile analizzare il documento. Riprova o inserisci i dati manualmente.' });
    }
}
