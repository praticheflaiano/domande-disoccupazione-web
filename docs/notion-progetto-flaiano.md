# 📋 Progetto domandedisoccupazione.it — Centro Pratiche Flaiano

> **Stato**: in corso · **Ultimo update**: 25 aprile 2026 · **Owner tecnico**: Claude Code · **Repo**: [praticheflaiano/domande-disoccupazione-web](https://github.com/praticheflaiano/domande-disoccupazione-web)

---

## 🎯 Cosa è questo documento

Tutto il contesto del progetto **domandedisoccupazione.it** in un'unica pagina: cosa è stato fatto, cosa è in corso, cosa serve da te (titolare) per sbloccare le prossime release.

**Come importarlo in Notion**: trascina questo file `.md` dentro Notion (Import → Markdown), oppure copia/incolla il contenuto in una nuova pagina vuota — Notion convertirà automaticamente headings, tabelle, liste, link.

---

## 🌐 Stato del progetto

| Voce | Stato |
|---|---|
| Repository | [github.com/praticheflaiano/domande-disoccupazione-web](https://github.com/praticheflaiano/domande-disoccupazione-web) |
| Branch attivo | `claude/debug-optimize-project-wvdtu` |
| Production URL Vercel | (da configurare DNS Aruba — vedi sotto) |
| Dominio finale | `domandedisoccupazione.it` (NON ancora puntato a Vercel) |
| Stack | Astro 5 + React 18 + Tailwind + Vercel + OpenRouter Gemini OCR |
| Ultima release | 2.8 (PR #9 mergiata) |

### Release storiche

| Release | Cosa | PR |
|---|---|---|
| 2.0 | Audit 5 esperti, NASpI 2026, base Astro | [#1](https://github.com/praticheflaiano/domande-disoccupazione-web/pull/1) |
| 2.1 | Header, guida 31 pagine, recensioni oneste | [#2](https://github.com/praticheflaiano/domande-disoccupazione-web/pull/2) |
| 2.2 | SEO + GEO sprint | [#3](https://github.com/praticheflaiano/domande-disoccupazione-web/pull/3) |
| 2.4 | OCR INPS via OpenRouter (Gemini 2.5 Flash) | [#4](https://github.com/praticheflaiano/domande-disoccupazione-web/pull/4) |
| 2.5 | Guide dimissioni + SiteFinder Cmd+K | [#5](https://github.com/praticheflaiano/domande-disoccupazione-web/pull/5) |
| 2.6 | 3 guide dimissioni (stipendio/mobbing/cessione) | [#6](https://github.com/praticheflaiano/domande-disoccupazione-web/pull/6) |
| 2.7 | +3 guide pagamenti/sospensione/nuovo lavoro | [#7](https://github.com/praticheflaiano/domande-disoccupazione-web/pull/7) |
| 2.8 | Pulizia tecnica + IndexNow + test 38→65 | [#9](https://github.com/praticheflaiano/domande-disoccupazione-web/pull/9) |
| in corso | 30gg eligibility, IndexNow auto-ping, refactor, GA4/GTM | [#10](https://github.com/praticheflaiano/domande-disoccupazione-web/pull/10) |

---

## ✅ Quick wins già implementati (sblocco conversioni — SEO, UX, gerarchia)

Questi 5 fix sono **già live nel branch** e in PR #10:

1. **FAQPage JSON-LD su /faq** — Google ora vede le FAQ come rich snippet, eligible per AI Overviews. Estratto array FAQ in `src/data/faqs.ts` per riusabilità.
2. **Gerarchia CTA** — `ConversionCTA` aveva 3 bottoni concorrenti (Invia / WhatsApp / Chiama). Ora 1 primario "Invia la domanda online" + 2 link testuali piccoli sotto.
3. **StickyContactBar nascosta su /richiedi** — la barra mobile non copre più l'iframe Arcanis (era un blocker UX su iPhone short-screen).
4. **Tabella comparativa "Noi vs alternative"** — sezione confronto con INPS / Patronato fisico / Commercialista, su 4 assi (tempi, controllo errori, assistenza umana, supporto se rifiutato). Senza prezzo (lo aggiungiamo quando me lo confermi).
5. **Stepper visivo Arcanis** — wizard 4 step "Dati personali → Documenti → Mandato → Invio" sopra l'iframe per ridurre ansia da blackbox. Statico, no JS.

**Verifiche**: 101 file typecheck 0/0/0, lint clean, 69/69 test, 40 pagine build OK.

---

## 🔍 Info raccolte da praticheflaiano.it (verificate da fonti pubbliche)

### Affiliazioni & credenziali ufficiali
- **CAF UNSIC** — sportello/sede periferica autorizzata (rete nazionale 2.100 sportelli)
- **Patronato ENASC** — rete nazionale assistenza sociale (600 uffici in Italia)
- **INPS** — patronato autorizzato per servizi previdenziali e pensionistici
- **Ministero del Lavoro e Politiche Sociali** — conformità normativa
- Convenzioni: Comune di Roma · Regione Lazio · Agenzia delle Entrate · INAIL

### Sede & contatti
- **Indirizzo**: Via Filoteo Alberini 25 — 00139 Roma (Centro Acquisti Flaiano)
  - ⚠️ Conflitto: il sito attuale dichiara sia "**int. 10**" (footer) sia "**int. 12**" (pagina servizi) — da chiarire
- **Tel**: 06 9784 5429 · **WhatsApp**: 371 623 0690 · **Email**: info@praticheflaiano.it
- **Orari**: Lun-Gio 9:30-13:00 / 15:30-18:00, Ven 9:30-14:00
- **Zona**: Tufello / Vigne Nuove / Roma Nord (Talenti, Montesacro, Nuovo Salario)

### Servizi reali (più ampi del solo NASpI)
- **CAF**: 730, ISEE, IMU/TASI, Bonus
- **Patronato**: Pensioni, Legge 104, Invalidità, Disoccupazione/NASpI, Maternità, ANF, RdC
- **Centro Servizi**: Successioni, locazioni, Luce/Gas, TARI, assicurazioni Auto/Moto, residenza, certificati, PEC

### Prezzi parziali noti
- **Tesseramento annuale**: 30 € / nucleo familiare → consulenze gratuite, appuntamenti prioritari, sconti
- **Tesseramento semestrale**: 20 € / nucleo familiare
- **Dimissioni online**: 19 € (offerta — listino 30 €)
- **Modalità**: sia in sede che **online** ("comodamente da casa") → quindi copertura nazionale

### Fonti consultate
- [praticheflaiano.it](https://praticheflaiano.it/) — homepage
- [/collaborazioni](https://praticheflaiano.it/collaborazioni) — partner & affiliazioni
- [/caf_patronato_servizi](https://praticheflaiano.it/caf_patronato_servizi) — servizi
- [/pricing](https://praticheflaiano.it/pricing) — tesseramento
- [/dimissioni_online-3700](https://praticheflaiano.it/dimissioni_online-3700) — servizio dimissioni a 19 €
- [cafunsic.it](https://www.cafunsic.it/) — rete CAF UNSIC
- [enasc.it](https://enasc.it/) — patronato ENASC

### ❌ Cosa NON è stato pubblicato online (da chiedere al titolare)
- Partita IVA, REA, ragione sociale formale
- Numeri esatti di iscrizione CAF UNSIC e ENASC
- Foto/bio operatori
- Recensioni Google (rating + count + testi)
- Prezzo specifico NASpI / anticipo NASpI / ricorso
- Garanzia rimborso se INPS rigetta
- DPA con Arcanis + retention policy
- Anno di fondazione

---

## 📩 Domande da inviare al titolare (12 sezioni)

> Basta rispondere "non disponibile" dove non sai. Priorità minima per sbloccare la pagina `/costi`: punti **4 + 5 + 6 + 11**.

### 1. Dati legali della società
- [ ] Ragione sociale completa (es. "Centro Pratiche Flaiano S.r.l." / "S.a.s." / ditta individuale di X):
- [ ] P.IVA:
- [ ] Codice fiscale (se diverso):
- [ ] Numero REA + Camera di Commercio (es. RM-1234567):
- [ ] Indirizzo legale (se diverso da operativo):

### 2. Affiliazioni & numeri di iscrizione
- [ ] Numero iscrizione/codice sportello **CAF UNSIC**:
- [ ] Numero iscrizione/codice **Patronato ENASC**:
- [ ] Eventuale numero **ANCS** (se applicabile):
- [ ] Altre affiliazioni (ACLI, CGIL, CISL, UIL):

### 3. Conferma indirizzo operativo
- [ ] **int. 10** (come da footer) o **int. 12** (come da pagina servizi)? Quale è quello corretto?

### 4. Prezzi NASpI e servizi correlati
- [ ] **Domanda NASpI**: gratuita per tesserati? Tariffa fissa? % sull'indennità? Range:
- [ ] **Anticipo NASpI** (prezzo):
- [ ] **Ricorso amministrativo INPS**: gratuito (come da legge sui patronati) o servizio a parte?
- [ ] **DIS-COLL**:
- [ ] **Calcolo NASpI con AI/OCR**: solo informativo gratuito o porta al tesseramento?
- [ ] C'è un **listino unico** che possiamo pubblicare integralmente o vuoi solo alcune voci?

### 5. Garanzia in caso di rifiuto INPS
- [ ] Se la domanda viene rigettata, cosa succede? (rimborso parziale / totale / nessun rimborso ma assistenza ricorso inclusa / altro):
- [ ] L'assistenza al ricorso è **inclusa** nel servizio iniziale o costa a parte?

### 6. Copertura territoriale
- [ ] I servizi sono disponibili **per tutta Italia in modalità online** o solo per residenti area Roma?
- [ ] Esiste qualche servizio che richiede **obbligatoriamente** la presenza fisica in sede?

### 7. Anno di fondazione e storia
- [ ] **Anno di fondazione** del Centro Pratiche Flaiano:
- [ ] Numero di **pratiche NASpI gestite all'anno** (oggi sul sito Astro c'è "1.843+" — è ancora aggiornato?):

### 8. Team — sezione "Chi siamo" credibile
- [ ] Nome titolare/i + qualifica (consulente del lavoro, commercialista, ragioniere, operatore CAF/patronato):
- [ ] Nomi e ruoli di **2-4 operatori** che vuoi mostrare:
- [ ] **Foto** disponibili? (anche solo 1-2, qualità professionale o anche scatti d'ufficio):
- [ ] Numeri di **iscrizione albo professionale** (es. consulente del lavoro n. 1234):

### 9. Recensioni Google
> Da [business.google.com](https://business.google.com), 5 minuti.
- [ ] **Media voti** attuale (es. 4.8):
- [ ] **Numero recensioni totali** (es. 187):
- [ ] URL del profilo Google Business:
- [ ] OK a copiare verbatim **6-10 recensioni 5★** (con primo nome + iniziale cognome + data)? Sì/No
- [ ] Se sì: copia-incolla qui le 6-10 recensioni:

### 10. Privacy & dati personali — DPA con Arcanis
> Il modulo `/richiedi` usa la piattaforma **Arcanis** (link.arcanis.it). Per essere GDPR-compliant servono:
- [ ] Avete firmato un **DPA** (Data Processing Agreement) con Arcanis? Sì/No
- [ ] **Retention policy**: dopo quanto tempo Arcanis cancella i dati? (30 / 60 / 90 / 365 giorni)
- [ ] I dati vengono **mai trasferiti fuori UE**? Sì/No
- [ ] **Titolare del trattamento** è "Centro Pratiche Flaiano" o un'altra entità?

### 11. Posizionamento commerciale
- [ ] Risposta in 2 righe a "perché pagarvi se posso andare gratis al patronato di quartiere?":
- [ ] **Prezzo nell'hero** della home: visibile o solo nella pagina /costi?
- [ ] Spingere il **tesseramento 30 €/anno** come prodotto principale (con NASpI incluso/scontato) o trattarli separati?

### 12. Bonus — automazione SEO
- [ ] Posso generare una chiave **IndexNow** e tu la metti in `public/<chiave>.txt` su Vercel? (serve per ping automatico dopo ogni deploy)

---

## 🗺️ Roadmap dopo le risposte

### Wave 1 — Sblocco conversioni (1-2 settimane, alto impatto)
| # | Iniziativa | Sblocca dopo risposta |
|---|---|---|
| 1.1 | Pagina `/costi` con tariffario chiaro | §4 + §5 + §6 |
| 1.2 | Trust footer (P.IVA + n. iscrizione + link albo) | §1 + §2 |
| 1.3 | FAQ critiche (prezzo, garanzie, ricorso, dati Arcanis, copertura) | §4 + §5 + §6 + §10 |
| 1.4 | Tabella comparativa **completa** (con prezzo) | §4 |

### Wave 2 — Fondamenta di trust (2-4 settimane)
| # | Iniziativa | Sblocca dopo risposta |
|---|---|---|
| 2.1 | Recensioni reali on-site + AggregateRating JSON-LD | §9 |
| 2.2 | Sezione team in chi-siamo + Person schema | §8 |
| 2.3 | Privacy & dati: sezione Arcanis processor | §10 |
| 2.4 | Audit gerarchia CTA in tutte le pagine (max 2 per pagina) | nessuna — solo codice |
| 2.5 | Conferma post-submit Arcanis + sticky bar non-invasiva | nessuna — solo codice |

### Wave 3 — Ottimizzazione (4-8 settimane)
- 3.1 Stepper interattivo collegato ad Arcanis postMessage (oggi è statico)
- 3.2 Microcopy reassurance attorno al form (lock, TLS, retention)
- 3.3 A/B test prezzo nell'hero (richiede GA4 attivo — `PUBLIC_GA4_ID`)

---

## 🚧 Blocchi infrastrutturali (azioni che non posso fare io)

### A. DNS Aruba → Vercel (per attivare il dominio)
> Vedi guida completa in [`docs/deploy-aruba-vercel.md`](https://github.com/praticheflaiano/domande-disoccupazione-web/blob/main/docs/deploy-aruba-vercel.md).

| Tipo | Host | Valore | TTL |
|---|---|---|---|
| A | `@` (apex) | **`76.76.21.21`** (rimuovere `62.149.128.40`) | 3600 |
| CNAME | `www` | **`cname.vercel-dns.com.`** | 3600 |
| CAA | `@` | `0 issue "letsencrypt.org"` | — |
| TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:info@praticheflaiano.it` | — |

⚠️ **NON toccare** i record MX, TXT (SPF), e gli A di `mx`, `pop3`, `smtp`, `imap`, `webmail` — sono per la posta Aruba e devono restare invariati.

### B. Vercel Dashboard
1. Settings → Domains → Add `domandedisoccupazione.it` + `www.domandedisoccupazione.it`
2. Settings → Environment Variables → `OPENROUTER_API_KEY` (Production + Preview)
3. (Opzionale) `PUBLIC_GA4_ID` se vuoi attivare analytics
4. Settings → Deployment Protection → "Vercel Authentication" su Only Preview Deployments

### C. SEO submission post-deploy
> Vedi guida in [`docs/seo-submission.md`](https://github.com/praticheflaiano/domande-disoccupazione-web/blob/main/docs/seo-submission.md).
- Google Search Console + sitemap (5 min)
- Bing Webmaster Tools (1 click — import da GSC)
- IndexNow chiave (5 min, va hostata in `public/<chiave>.txt`)
- Brave Search submission (per visibilità su Claude Search)

---

## 📊 Posizionamento & differenziatori

### Le 3 obiezioni che bloccano la conversione (oggi)
1. **Costo invisibile** — Zero menzione di prezzo/commissione/gratuità. Vs INPS / patronato / CAF (gratuiti), il silenzio = sospetto.
2. **Credenziali non verificabili** — Footer dichiara solo indirizzo+telefono, nessun numero iscrizione albo CAF/patronato.
3. **Social proof inesistente sul sito** — Reviews array vuoto, niente AggregateRating, ReviewsBlock rimanda a Google off-site.

### Differenziatori reali (verificati da praticheflaiano.it)
- ✅ **Sportello CAF UNSIC + Patronato ENASC**: rete nazionale ufficiale (non sportello generico)
- ✅ **Sede fisica Roma + servizi online**: ibrido, copre Roma Nord + tutta Italia online
- ✅ **Servizi integrati**: NASpI è uno dei 30+ servizi (cross-sell naturale: 730, ISEE, pensioni, successioni, RC auto, ecc.)
- ✅ **Tesseramento famiglia 30 €/anno**: lock-in con consulenze gratuite incluse
- ✅ **Calcolatore con AI/OCR Gemini**: unico in Italia tra i CAF/patronati a livello tecnologico
- ⚠️ Da pubblicare: P.IVA + numero iscrizione → trust verificabile su CCIAA

---

## 🛠️ Stack tecnico (per memoria)

- **Frontend**: Astro 5.18 + React 18 + Tailwind 3
- **Hosting**: Vercel (adapter `@astrojs/vercel`, output static)
- **OCR domanda**: OpenRouter API → Google Gemini 2.5 Flash (env `OPENROUTER_API_KEY`)
- **Form richiesta**: iframe esterno Arcanis (`link.arcanis.it`)
- **Test**: Vitest + jsdom (65/69 test, coverage su calcoli + API rate-limit + lib/related)
- **CI**: GitHub Actions (typecheck + lint + test + build su PR/main) + workflow IndexNow auto-ping
- **Analytics**: GA4 / GTM opt-in via env var (oggi non configurato)

---

## 📞 Come restare aggiornati

- Nuove PR/release: vedi [Pull requests](https://github.com/praticheflaiano/domande-disoccupazione-web/pulls)
- Sito vivo (preview Vercel): in attesa di DNS — preview disponibili dai link delle PR
- Documentazione interna: cartella [`docs/`](https://github.com/praticheflaiano/domande-disoccupazione-web/tree/main/docs) del repo

---

*Documento auto-generato da Claude Code · ultima sync 25 aprile 2026.*
