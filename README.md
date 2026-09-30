# Dari lernen

Persönliche Lern-App für **Kabuler Dari (Umgangssprache)**, um mit der Familie im Alltag reden zu können.
Web-App (PWA) für Laptop und iPhone, komplett kostenlos, ohne App Store.

- 14 Units, 42 Lektionen, ~400 Phrasen in Lautschrift
- Spaced Repetition (FSRS), Dialog-Szenarien, Sprechübungen mit Aufnahme, Grammatik- und Kultur-Tipps
- Vorlesen über die persische Systemstimme, Sync zwischen Geräten über Supabase (optional)
- Offline-fähig, Daten liegen lokal (IndexedDB)

## Entwickeln

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # Unit-Tests (SRS, Sync-Merge, Inhalte)
npm run build && npx vite preview
```

Inhalte liegen in `src/content/units/*.ts`. Jede Phrase ist `p(lautschrift, persisch, deutsch, notiz?)`.
Die persische Schrift wird nur fürs Vorlesen genutzt. Die Karten-ID wird aus der Lautschrift abgeleitet:
Wenn du die Lautschrift einer Phrase änderst, fängt diese Karte wieder von vorn an.

## Einrichtung

### 1. Supabase (für den Sync)

1. Auf [supabase.com](https://supabase.com) kostenlos ein Projekt anlegen.
2. **SQL Editor** → Inhalt von `supabase/schema.sql` einfügen → Run.
3. **Authentication → Email Templates → Magic Link**: Den Text so ändern, dass der Code drinsteht, z.B.
   `<h2>Dein Dari-Code</h2><p>{{ .Token }}</p>`.
   Die App nutzt Codes statt Links, weil Links auf dem iPhone in Safari statt in der App aufgehen.
4. **Project Settings → API**: `Project URL` und den `anon`-Key kopieren.
5. Lokal: `.env.example` nach `.env.local` kopieren und die Werte eintragen.

Hinweis: Kostenlose Supabase-Projekte pausieren nach ca. 7 Tagen ohne Nutzung. Im Dashboard reaktivierst du sie mit einem Klick,
die lokalen Daten in der App bleiben dabei erhalten.

### 2. GitHub Pages (Hosting)

1. Repo auf GitHub anlegen (z.B. `dari`) und pushen.
2. **Settings → Pages → Source: GitHub Actions**.
3. **Settings → Secrets and variables → Actions**: `VITE_SUPABASE_URL` und `VITE_SUPABASE_ANON_KEY` anlegen.
4. Jeder Push auf `main` baut und veröffentlicht die App unter `https://<user>.github.io/dari/`.

### 3. iPhone

1. Die URL in **Safari** öffnen → Teilen → **Zum Home-Bildschirm**.
2. Persische Stimme laden: Einstellungen → Bedienungshilfen → Gesprochene Inhalte → Stimmen → **Persisch**.
3. In der App unter **Mehr** mit derselben E-Mail wie am Laptop anmelden.
