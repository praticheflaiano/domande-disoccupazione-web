// Helper minimale per chiamate OpenRouter con structured output.
// Zero dipendenze aggiuntive: usa fetch nativo di Node 20+.
// Docs: https://openrouter.ai/docs/features/structured-outputs

export interface OpenRouterMessage {
    role: 'system' | 'user' | 'assistant';
    content: string | Array<
        | { type: 'text'; text: string }
        | { type: 'image_url'; image_url: { url: string } }
        | { type: 'file'; file: { filename: string; file_data: string } }
    >;
}

export interface OpenRouterRequest {
    model: string;
    messages: OpenRouterMessage[];
    response_format?: {
        type: 'json_schema';
        json_schema: { name: string; strict: boolean; schema: Record<string, unknown> };
    };
    temperature?: number;
    max_tokens?: number;
}

export interface OpenRouterResponse {
    id: string;
    model: string;
    choices: Array<{
        message: { role: string; content: string };
        finish_reason: string;
    }>;
    usage?: { prompt_tokens: number; completion_tokens: number; total_tokens: number; cost?: number };
    error?: { code: string; message: string };
}

const ENDPOINT = 'https://openrouter.ai/api/v1/chat/completions';

export async function callOpenRouter(request: OpenRouterRequest): Promise<OpenRouterResponse> {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) throw new Error('OPENROUTER_API_KEY not set in environment');

    const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://domandedisoccupazione.it',
            'X-Title': 'Centro Pratiche Flaiano - OCR INPS',
        },
        body: JSON.stringify(request),
    });

    if (!res.ok) {
        const body = await res.text();
        throw new Error(`OpenRouter HTTP ${res.status}: ${body.slice(0, 500)}`);
    }

    const data = (await res.json()) as OpenRouterResponse;
    if (data.error) throw new Error(`OpenRouter error ${data.error.code}: ${data.error.message}`);
    return data;
}
