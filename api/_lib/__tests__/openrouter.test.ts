import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { callOpenRouter } from '../openrouter';

// Test puri: nessuna chiamata di rete reale. Mock di global.fetch.

const ORIGINAL_KEY = process.env.OPENROUTER_API_KEY;

describe('openrouter — callOpenRouter (con fetch mockato)', () => {
    beforeEach(() => {
        process.env.OPENROUTER_API_KEY = 'test-key';
    });

    afterEach(() => {
        if (ORIGINAL_KEY === undefined) delete process.env.OPENROUTER_API_KEY;
        else process.env.OPENROUTER_API_KEY = ORIGINAL_KEY;
        vi.unstubAllGlobals();
    });

    it('lancia errore se OPENROUTER_API_KEY non è impostata', async () => {
        delete process.env.OPENROUTER_API_KEY;
        await expect(
            callOpenRouter({ model: 'x', messages: [{ role: 'user', content: 'hi' }] }),
        ).rejects.toThrow(/OPENROUTER_API_KEY/);
    });

    it('chiama l\'endpoint corretto con headers attesi', async () => {
        const fetchMock = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ({
                id: 'r1',
                model: 'x',
                choices: [{ message: { role: 'assistant', content: '{}' }, finish_reason: 'stop' }],
            }),
        });
        vi.stubGlobal('fetch', fetchMock);

        await callOpenRouter({ model: 'x', messages: [{ role: 'user', content: 'hi' }] });

        expect(fetchMock).toHaveBeenCalledTimes(1);
        const [url, init] = fetchMock.mock.calls[0];
        expect(url).toBe('https://openrouter.ai/api/v1/chat/completions');
        expect(init.method).toBe('POST');
        expect(init.headers['Authorization']).toBe('Bearer test-key');
        expect(init.headers['Content-Type']).toBe('application/json');
        expect(init.headers['HTTP-Referer']).toBe('https://domandedisoccupazione.it');
        expect(typeof init.body).toBe('string');
        const body = JSON.parse(init.body);
        expect(body.model).toBe('x');
    });

    it('lancia errore se la risposta HTTP non è ok', async () => {
        vi.stubGlobal(
            'fetch',
            vi.fn().mockResolvedValue({
                ok: false,
                status: 500,
                text: async () => 'internal error',
            }),
        );
        await expect(
            callOpenRouter({ model: 'x', messages: [{ role: 'user', content: 'hi' }] }),
        ).rejects.toThrow(/HTTP 500/);
    });

    it('lancia errore se il payload contiene { error: ... }', async () => {
        vi.stubGlobal(
            'fetch',
            vi.fn().mockResolvedValue({
                ok: true,
                json: async () => ({
                    id: 'r1',
                    model: 'x',
                    choices: [],
                    error: { code: 'rate_limit', message: 'too many' },
                }),
            }),
        );
        await expect(
            callOpenRouter({ model: 'x', messages: [{ role: 'user', content: 'hi' }] }),
        ).rejects.toThrow(/rate_limit.*too many/);
    });

    it('ritorna la risposta parsata se ok', async () => {
        const payload = {
            id: 'r1',
            model: 'gemini',
            choices: [
                { message: { role: 'assistant', content: '{"weeks":52}' }, finish_reason: 'stop' },
            ],
            usage: { prompt_tokens: 10, completion_tokens: 5, total_tokens: 15 },
        };
        vi.stubGlobal(
            'fetch',
            vi.fn().mockResolvedValue({ ok: true, json: async () => payload }),
        );
        const result = await callOpenRouter({
            model: 'gemini',
            messages: [{ role: 'user', content: 'hi' }],
        });
        expect(result.id).toBe('r1');
        expect(result.choices[0].message.content).toBe('{"weeks":52}');
        expect(result.usage?.total_tokens).toBe(15);
    });

    it('serializza correttamente messaggi multimodali (image_url, file)', async () => {
        const fetchMock = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ({
                id: 'r1',
                model: 'x',
                choices: [{ message: { role: 'assistant', content: '{}' }, finish_reason: 'stop' }],
            }),
        });
        vi.stubGlobal('fetch', fetchMock);

        await callOpenRouter({
            model: 'x',
            messages: [
                {
                    role: 'user',
                    content: [
                        { type: 'text', text: 'Analizza' },
                        {
                            type: 'image_url',
                            image_url: { url: 'data:image/png;base64,AAAA' },
                        },
                    ],
                },
            ],
        });

        const body = JSON.parse(fetchMock.mock.calls[0][1].body);
        expect(Array.isArray(body.messages[0].content)).toBe(true);
        expect(body.messages[0].content[0].type).toBe('text');
        expect(body.messages[0].content[1].type).toBe('image_url');
    });
});
