import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import { callOpenRouter, type OpenRouterMessage } from './_lib/openrouter';
import { checkRateLimit, resolveClientIp } from './_lib/rateLimit';
import { assertAllowedOrigin } from './_lib/origin';

const MAX_BASE64_BYTES = 4 * 1024 * 1024;
const MODEL = 'google/gemini-2.5-flash';

const AnalyzeBody = z.object({
    base64Data: z.string().min(1).max(MAX_BASE64_BYTES),
    mimeType: z.string().min(1).max(128),
    mode: z.enum(['forecast', 'decree']),
});

const forecastSchema = {
    type: 'object',
    properties: {
        weeks: { type: 'number', description: 'Settimane contributive utili negli ultimi 4 anni (0 se non presenti).' },
        wages: { type: 'number', description: 'Totale imponibile previdenziale in euro (0 se non presente).' },
    },
    required: ['weeks', 'wages'],
    additionalProperties: false,
} as const;

const decreeSchema = {
    type: 'object',
    properties: {
        startDate: { type: 'string', description: 'Data inizio NASpI in formato ISO YYYY-MM-DD, stringa vuota se non presente.' },
        days: { type: 'number', description: 'Giorni totali di prestazione (0 se non presenti).' },
        monthlyAmount: { type: 'number', description: 'Importo mensile lordo in euro (0 se non presente).' },
    },
    required: ['startDate', 'days', 'monthlyAmount'],
    additionalProperties: false,
} as const;

export const config = {
    maxDuration: 30,
    api: { bodyParser: { sizeLimit: '4.5mb' } },
};

function buildPrompt(mode: 'forecast' | 'decree'): string {
    const today = new Date().toISOString().split('T')[0];
    const fourYearsAgo = new Date();
    fourYearsAgo.setFullYear(fourYearsAgo.getFullYear() - 4);
    const dateLimit = fourYearsAgo.toISOString().split('T')[0];

    const common =
        "Sei un esperto di documenti previdenziali italiani (INPS). " +
        'Analizza con precisione il documento allegato (estratto conto contributivo ECOCERT, decreto NASpI, cassetta postale INPS, PDF/immagine/XML). ' +
        'Cerca i campi tipici: "Settimane effettive", "Contribuzione utile", "Retribuzione imponibile", "Decorrenza", "Durata", "Importo mensile lordo", "Giorni spettanti". ' +
        'Se un dato non e\' chiaramente leggibile o non e\' presente, restituisci 0 (o stringa vuota per le date). ' +
        'NON inventare valori. NON approssimare. Usa i numeri esatti come scritti nel documento.';

    if (mode === 'forecast') {
        return (
            `${common}\n\n` +
            `DATA ODIERNA: ${today}. PERIODO DI RIFERIMENTO: dal ${dateLimit} a oggi (4 anni).\n` +
            'OBIETTIVO: estrai due numeri da questo periodo:\n' +
            '- weeks = SOMMA delle settimane utili ai fini NASpI\n' +
            '- wages = SOMMA dell\'imponibile previdenziale totale in euro (usa punto come separatore decimale).'
        );
    }

    return (
        `${common}\n\n` +
        'OBIETTIVO: estrai dal provvedimento NASpI APPROVATO:\n' +
        '- startDate = data di inizio prestazione (YYYY-MM-DD)\n' +
        '- days = numero giorni totali\n' +
        '- monthlyAmount = importo mensile lordo in euro (usa punto come decimale).'
    );
}

function buildContent(
    prompt: string,
    base64Data: string,
    mimeType: string,
): OpenRouterMessage['content'] {
    const normalizedMime = mimeType.toLowerCase();

    if (normalizedMime.includes('xml') || normalizedMime.includes('json') || normalizedMime.includes('text/')) {
        let decoded: string;
        try {
            decoded = Buffer.from(base64Data, 'base64').toString('utf-8');
        } catch {
            decoded = base64Data;
        }
        return `${prompt}\n\n--- DOCUMENTO ---\n${decoded.slice(0, 100_000)}`;
    }

    if (normalizedMime === 'application/pdf') {
        return [
            { type: 'text', text: prompt },
            {
                type: 'file',
                file: {
                    filename: 'documento-inps.pdf',
                    file_data: `data:application/pdf;base64,${base64Data}`,
                },
            },
        ];
    }

    // image/jpeg, image/png, image/webp, image/gif, image/heic, etc.
    return [
        { type: 'text', text: prompt },
        { type: 'image_url', image_url: { url: `data:${mimeType};base64,${base64Data}` } },
    ];
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
    if (!assertAllowedOrigin(req)) return res.status(403).json({ error: 'Origin not allowed' });

    const ip = resolveClientIp(req);
    const limit = checkRateLimit(ip);
    if (!limit.ok) return res.status(429).json({ error: `Troppe richieste (${limit.reason}). Riprova piu' tardi.` });

    const parsed = AnalyzeBody.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ error: 'Payload non valido', details: parsed.error.flatten() });
    }

    const { base64Data, mimeType, mode } = parsed.data;
    const prompt = buildPrompt(mode);
    const messageContent = buildContent(prompt, base64Data, mimeType);

    try {
        const data = await callOpenRouter({
            model: MODEL,
            messages: [{ role: 'user', content: messageContent }],
            response_format: {
                type: 'json_schema',
                json_schema: {
                    name: mode === 'forecast' ? 'forecast_data' : 'decree_data',
                    strict: true,
                    schema: (mode === 'forecast' ? forecastSchema : decreeSchema) as unknown as Record<string, unknown>,
                },
            },
            temperature: 0.1,
            max_tokens: 500,
        });

        const rawAnswer = data.choices?.[0]?.message?.content ?? '{}';
        const cleaned = rawAnswer.replace(/```json/g, '').replace(/```/g, '').trim();
        const payload = JSON.parse(cleaned);

        const { total_tokens, cost } = data.usage ?? {};
        console.log(`OCR OK mode=${mode} mime=${mimeType} tokens=${total_tokens} cost=$${cost?.toFixed(4) ?? '?'}`);

        return res.status(200).json(payload);
    } catch (error) {
        console.error('OCR analyze error:', error instanceof Error ? error.message : error);
        return res.status(502).json({ error: 'Impossibile analizzare il documento. Riprova o inserisci i dati manualmente.' });
    }
}
