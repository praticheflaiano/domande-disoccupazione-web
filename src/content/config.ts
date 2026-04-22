import { defineCollection, z } from 'astro:content';

const news = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        date: z.coerce.date(),
        category: z.enum(['Normativa', 'Pagamenti', 'Bonus', 'Agricola']),
        summary: z.string(),
        source: z.string(),
        important: z.boolean().optional().default(false),
        updated: z.coerce.date().optional(),
    }),
});

export const collections = { news };
