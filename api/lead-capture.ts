import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import { checkRateLimit, resolveClientIp } from './_lib/rateLimit';
import { assertAllowedOrigin } from './_lib/origin';

export const config = { maxDuration: 10 };

const LeadBody = z.object({
    email: z.string().email().max(200),
    name: z.string().min(1).max(80).optional(),
    source: z.string().max(80).optional(), // 'lead-magnet-pdf' | 'exit-intent' | 'calculator-result' | ...
    consent: z.boolean().refine((v) => v === true, 'Consenso richiesto'),
    tags: z.array(z.string().max(40)).max(10).optional(),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
    if (!assertAllowedOrigin(req)) return res.status(403).json({ error: 'Origin not allowed' });

    const ip = resolveClientIp(req);
    const limit = checkRateLimit(ip);
    if (!limit.ok) return res.status(429).json({ error: `Troppe richieste (${limit.reason}).` });

    const parsed = LeadBody.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ error: 'Payload non valido', details: parsed.error.flatten() });
    }

    const webhookUrl = process.env.GHL_WEBHOOK_URL;
    const lead = {
        ...parsed.data,
        capturedAt: new Date().toISOString(),
        userAgent: req.headers['user-agent'] ?? '',
        referer: req.headers['referer'] ?? '',
    };

    if (!webhookUrl) {
        // Graceful: no CRM configured yet, accept payload and log only
        console.log('[lead-capture] GHL_WEBHOOK_URL not set, saving locally:', {
            email: lead.email,
            source: lead.source,
            capturedAt: lead.capturedAt,
        });
        return res.status(200).json({ ok: true, pdfUrl: '/assets/guida-naspi-2026.pdf', storage: 'local-log' });
    }

    try {
        const ghlRes = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(process.env.GHL_API_KEY ? { Authorization: `Bearer ${process.env.GHL_API_KEY}` } : {}),
            },
            body: JSON.stringify(lead),
        });
        if (!ghlRes.ok) throw new Error(`GHL webhook HTTP ${ghlRes.status}`);

        return res.status(200).json({ ok: true, pdfUrl: '/assets/guida-naspi-2026.pdf', storage: 'ghl' });
    } catch (err) {
        console.error('[lead-capture] GHL webhook error:', err);
        // Non fail-hard: user still gets PDF, we just lost the lead in CRM. Better retry offline.
        return res.status(200).json({ ok: true, pdfUrl: '/assets/guida-naspi-2026.pdf', storage: 'fallback', warning: 'crm_offline' });
    }
}
