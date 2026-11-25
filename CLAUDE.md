# Portale domandedisoccupazione.it

Dal 25/11/2026 le guide e gli strumenti si stanno spostando su praticheflaiano.it (repo praticheflaiano/Varie): qui restano le pagine non ancora trasferite, i rimandi 308 in `vercel.json` e la funzione `api/analyze-document` (usata anche dal calcolo NASpI di praticheflaiano.it).

## Prima di unire una modifica
La CI (`.github/workflows/ci.yml`) esegue quattro controlli. Vanno eseguiti tutti in locale prima del push, e la PR si unisce solo con la CI verde:

```
npm run typecheck
npm run lint
npm run test -- --run
npm run build
```

- Ogni pagina nuova va aggiunta alla lista delle pagine note in `src/lib/__tests__/related.test.ts`.
- Una pagina trasferita su praticheflaiano.it: rimando 308 in `vercel.json` e fuori dalla sitemap (`astro.config.mjs`).
