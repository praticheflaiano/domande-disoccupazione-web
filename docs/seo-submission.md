# SEO submission & monitoring — domandedisoccupazione.it

Questa guida va eseguita **dopo** che il dominio `domandedisoccupazione.it` sarà puntato a Vercel (vedi `docs/deploy-aruba-vercel.md`). Serve a comunicare ai motori di ricerca e ai motori generativi (AI) che il sito è online e indicizzabile.

## 1. Google Search Console (obbligatorio)

1. Vai su [search.google.com/search-console](https://search.google.com/search-console/welcome).
2. Scegli **Proprietà di dominio** (preferito) → inserisci `domandedisoccupazione.it`.
3. Google ti darà un record **TXT DNS** da aggiungere nel pannello Aruba:
   - `@` tipo `TXT` valore `google-site-verification=…` TTL 3600.
4. Aggiungi il record, torna su Search Console e clicca **Verifica**. Propagazione 10-30 min.
5. Dalla barra laterale → **Sitemap** → inserisci `https://domandedisoccupazione.it/sitemap-index.xml` → Invia.
6. Abilita i report "**Miglioramenti**" per FAQ, Breadcrumb, HowTo, Article: compariranno automaticamente appena Google crawla le pagine strutturate.

Verifica indicizzazione dopo 48 h: `site:domandedisoccupazione.it` su Google.

## 2. Bing Webmaster Tools (abilita Copilot)

1. Vai su [bing.com/webmasters](https://www.bing.com/webmasters).
2. Clicca **Importa da Google Search Console** (richiede login Google) → seleziona la proprietà → 1 click di import.
3. Bing importa sitemap, ownership e rende il sito visibile in **Bing Search + Microsoft Copilot**.
4. Sezione **IndexNow**: abilita l'auto-submit. Bing genererà una chiave API automatica da hostare (vedi punto 3).

## 3. IndexNow (accelera l'indicizzazione Bing/Yandex/Seznam)

1. Dashboard Bing Webmaster Tools → IndexNow → genera una chiave di 32 caratteri hex.
2. Crea il file `public/<chiave>.txt` con dentro **solo** la stessa stringa chiave (es. `public/a1b2c3d4...e5.txt`).
3. Committa e pusha. Vercel deployerà il file.
4. Dopo ogni deploy, invia un ping per aggiornare l'indice:

```bash
# Singolo URL
curl "https://api.indexnow.org/indexnow?url=https://domandedisoccupazione.it/guida/presentare-domanda&key=<TUA_CHIAVE>"

# Batch (consigliato dopo ogni release)
curl -X POST https://api.indexnow.org/indexnow \
  -H "Content-Type: application/json; charset=utf-8" \
  -d '{
    "host": "domandedisoccupazione.it",
    "key": "<TUA_CHIAVE>",
    "keyLocation": "https://domandedisoccupazione.it/<TUA_CHIAVE>.txt",
    "urlList": [
      "https://domandedisoccupazione.it/",
      "https://domandedisoccupazione.it/calcolatore",
      "https://domandedisoccupazione.it/guida"
    ]
  }'
```

Opzionale: uno script `scripts/indexnow-ping.mjs` che legge gli URL modificati da `git diff` e fa il POST automatico — da eseguire a valle di ogni deploy.

## 4. Brave Search (Claude usa Brave)

1. Vai su [search.brave.com/help/webmaster-tools](https://search.brave.com/help/webmaster-tools).
2. Richiedi l'indicizzazione del dominio via form (servono ownership DNS + email).
3. Brave re-crawla entro 7-14 giorni. È il motore che alimenta le risposte di Claude → importante per la visibilità su Claude Search.

## 5. DuckDuckGo (indirettamente via Bing)

DuckDuckGo usa Bing come fonte primaria: se stai su Bing, stai automaticamente su DuckDuckGo. Nessuna azione separata.

## 6. Visibilità nei motori generativi (AI Search)

### ChatGPT + OpenAI
- Nessuna submission diretta. OpenAI ingerisce via GPTBot/OAI-SearchBot/ChatGPT-User: tutti **già in allow** su `robots.txt`.
- Verifica citazioni: interroga manualmente ChatGPT con query tipo "Calcolatore NASpI 2026", "Requisito 13 settimane NASpI" e controlla se il sito compare tra le fonti.

### Perplexity
- Indicizza via PerplexityBot (già in allow) + sfrutta Google + Bing index.
- Boost: crea un PDF scaricabile (follow-up, vedi piano SEO v3) — Perplexity dà preferenza a PDF aggiornati.

### Google AI Overview (SGE)
- Dipende dall'indice Google + E-E-A-T + structured data. Tutto già predisposto nel sito (LocalBusiness, FAQ, HowTo, Article, BreadcrumbList, Quotation).
- Booster: `Article` schema completo con `author` → già integrato nei layout `GuidaLayout` e `ObblighiLayout`.

### Microsoft Copilot
- Dipende da Bing index. Verifica su Bing dopo 48-72 h dal submit IndexNow.

### Claude Search
- Usa Brave + client browsing. Curare submission Brave (punto 4).

## 7. Monitoraggio (ogni settimana)

Crea un foglio di monitoraggio con 5 query fisse per piattaforma:

| Query | Google | Bing | ChatGPT | Perplexity | Claude | Copilot | Gemini |
|---|---|---|---|---|---|---|---|
| "calcolo NASpI 2026" | | | | | | | |
| "come presentare domanda NASpI" | | | | | | | |
| "sanzioni NASpI SIISL" | | | | | | | |
| "NASpI dimissioni giusta causa" | | | | | | | |
| "anticipo NASpI P.IVA" | | | | | | | |

Segna ✅ se il sito compare tra i primi 10 risultati (o tra le 3 fonti citate nel caso AI). Revisione mensile.

## 8. Strumenti gratuiti per audit periodico

- **Google PageSpeed Insights**: [pagespeed.web.dev](https://pagespeed.web.dev) — Core Web Vitals.
- **Google Rich Results Test**: [search.google.com/test/rich-results](https://search.google.com/test/rich-results) — validazione JSON-LD.
- **Schema.org Validator**: [validator.schema.org](https://validator.schema.org).
- **Bing URL Inspection**: nel dashboard Bing Webmaster.
- **Lighthouse** (Chrome DevTools): audit SEO + A11y + Performance.
- **Screaming Frog SEO Spider** (gratis fino a 500 URL): crawl interno + broken links.

## 9. Timeline attesa post-deploy + submission

| Timing | Cosa succede |
|---|---|
| +0 h | Dominio puntato a Vercel, HTTPS attivo |
| +6-24 h | GSC e BWT verificano ownership, sitemap letta |
| +24-72 h | Bingbot crawla l'intero sito via sitemap (31 URL) |
| +3-7 giorni | Googlebot completa il crawl; prime pagine compaiono in `site:domandedisoccupazione.it` |
| +7-14 giorni | Bing inizia a citare il sito in Copilot |
| +14-30 giorni | Brave Search indicizza → Claude può citarlo |
| +30-60 giorni | ChatGPT/Perplexity iniziano a citare il sito se Google/Bing lo posizionano bene |
| +60-90 giorni | Prime apparizioni in Google AI Overview per query con schema HowTo/FAQ coperti |
