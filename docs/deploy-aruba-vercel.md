# Collegare il dominio `domandedisoccupazione.it` (Aruba) a Vercel

Questa guida serve a far puntare il dominio registrato su Aruba al deploy Vercel di questa repository. Va eseguita **una sola volta** da chi ha le credenziali del pannello Aruba e l'accesso al progetto Vercel.

## Diagnosi attuale (aprile 2026)

Al 22 aprile 2026 il dominio **NON è collegato a Vercel**:

- `domandedisoccupazione.it` risolve a `62.149.128.40` (hosting Aruba/Technorail).
- HTTPS restituisce `503` — nessun header `x-vercel-id`.
- HTTP va su una parking page IIS/ASP.NET di Aruba.
- Il deploy Vercel esiste ed è raggiungibile solo via URL di preview (es. `domande-disoccupazione-web-git-*.vercel.app`), che è protetto da Deployment Protection SSO.

Finché non si aggiornano i record DNS e non si aggiunge il dominio nel progetto Vercel, il sito pubblico non mostra le nuove pagine.

## Passo 1 — Aggiungere il dominio in Vercel

1. Entra in Vercel Dashboard → progetto `domande-disoccupazione-web` → **Settings → Domains**.
2. Clicca **Add** e inserisci `domandedisoccupazione.it`.
3. Clicca di nuovo **Add** e inserisci `www.domandedisoccupazione.it`.
4. Scegli come primary l'apex (`domandedisoccupazione.it`). Vercel creerà automaticamente un redirect 308 da `www` all'apex.
5. Vercel mostrerà "Invalid Configuration" — è normale, serve sistemare i DNS (passo 2).

### Disattivare la protezione del preview (opzionale)

Nella sezione **Settings → Deployment Protection**: portare "Vercel Authentication" su **Only Preview Deployments** (default) o **Disabled**. In questo modo la **production** (sul dominio custom) sarà pubblica; le preview delle PR restano protette.

## Passo 2 — Aggiornare i DNS sul pannello Aruba

1. Vai su [admin.aruba.it](https://admin.aruba.it) e accedi.
2. Seleziona **Gestione Domini** → `domandedisoccupazione.it` → **Gestione DNS** (o "DNS Zone").
3. Individua i record esistenti e **modificali** come segue.

### Record da modificare

| Tipo | Host | Valore attuale (da rimuovere) | Valore nuovo | TTL |
|---|---|---|---|---|
| A | `@` (apex) | `62.149.128.40` | **`76.76.21.21`** | 3600 |
| CNAME | `www` | (Aruba) | **`cname.vercel-dns.com.`** | 3600 |

Se esistono record AAAA per l'apex o per `www`, **rimuovili** (Vercel non li richiede).

### Record da NON toccare (email Aruba)

| Tipo | Host | Valore | Motivo |
|---|---|---|---|
| MX | `@` | `mx.domandedisoccupazione.it` | Caselle e-mail Aruba restano attive |
| TXT | `@` | `v=spf1 include:_spf.aruba.it ~all` | SPF per posta in uscita |
| A | `mx`, `pop3`, `smtp`, `imap`, `webmail` | IP Aruba | Endpoint mail |

### Aggiunte raccomandate

| Tipo | Host | Valore | Motivo |
|---|---|---|---|
| CAA | `@` | `0 issue "letsencrypt.org"` | Autorizza solo Let's Encrypt (usato da Vercel) |
| TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:info@praticheflaiano.it` | Politica DMARC base contro spoofing |

### Salva e attendi la propagazione

- Clicca **Salva** nel pannello Aruba.
- Propagazione tipica: 30 minuti – 4 ore (max 24-48 ore).
- Puoi verificare con `dig +short domandedisoccupazione.it` o su [whatsmydns.net](https://www.whatsmydns.net).

## Passo 3 — Verifiche finali

Quando la propagazione è completata:

```bash
# Dev'essere l'IP Vercel
dig +short domandedisoccupazione.it
# Attesto: 76.76.21.21

# Dev'essere CNAME verso Vercel
dig +short www.domandedisoccupazione.it
# Attesto: cname.vercel-dns.com. -> 76.76.21.x

# Header HTTP: 200 + header Vercel
curl -I https://domandedisoccupazione.it/
# Attesto: HTTP/2 200, server: Vercel, x-vercel-id: ...

# Contenuto NASpI 2026 presente
curl -s https://domandedisoccupazione.it/ | grep -o "1.456,72"
# Attesto: 1.456,72 (almeno una volta)
```

In Vercel Dashboard → Domains, i dominî devono mostrare:
- `domandedisoccupazione.it` → **Valid Configuration** (verde) — Primary.
- `www.domandedisoccupazione.it` → **Valid Configuration** (verde) — Redirect to apex.
- Certificato TLS automatico emesso da Let's Encrypt.

## Passo 4 — Impostare le variabili d'ambiente

Vercel → Settings → Environment Variables:

| Nome | Valore | Ambiente |
|---|---|---|
| `GEMINI_API_KEY` | chiave Gemini **ruotata** (non la vecchia esposta nel bundle) | Production, Preview |

Dopo aver salvato, trigger di un nuovo deploy (Deployments → Redeploy) per applicare la variabile alle Serverless Functions in `api/`.

## Passo 5 — Google Search Console e analytics

1. Aggiungere la proprietà `https://domandedisoccupazione.it` a Google Search Console (verifica via file HTML o record TXT DNS).
2. Submit della sitemap: `https://domandedisoccupazione.it/sitemap-index.xml`.
3. Opzionale: aggiungere Google Tag Manager o GA4 in `src/layouts/Base.astro` (richiede un nuovo commit).

## Troubleshooting

| Sintomo | Causa probabile | Soluzione |
|---|---|---|
| Browser mostra pagina Aruba / 503 | DNS non ancora propagati | Attendere 1-4 h; svuotare cache DNS locale (`sudo killall -HUP mDNSResponder` su macOS, `ipconfig /flushdns` su Windows) |
| HTTPS non si attiva, "certificato non valido" | Vercel non ha ancora emesso il cert | Attendere 10 minuti dal momento in cui Vercel mostra "Valid Configuration"; clicca "Refresh" in dashboard |
| Email Aruba non funzionano dopo il cambio | Record MX toccati per errore | Ripristinare MX originali Aruba; i record di posta non vanno **mai** cambiati passando a Vercel |
| Errore "Domain already in use" in Vercel | Altro progetto Vercel ha già il dominio | Dashboard → cerca il progetto precedente, rimuovi il dominio da lì prima di aggiungerlo qui |
| API `/api/chat` o `/api/analyze-document` restituiscono 500 | `GEMINI_API_KEY` mancante o errata | Verificare variabili d'ambiente Vercel e fare redeploy |
