import type { Session } from '@supabase/supabase-js'
import { useEffect, useRef, useState } from 'react'
import { Button, Card, PageHeader } from '../../components/ui'
import { exportData, importData, setSetting, useSettings } from '../../lib/settings'
import { supabase } from '../../lib/supabase'
import { syncNow, useSyncStatus } from '../../lib/sync'
import { speak, usePersianVoice } from '../../lib/tts'

export function SettingsPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageHeader title="Einstellungen" />
      <SyncCard />
      <VoiceCard />
      <LearningCard />
      <BackupCard />
      <p className="pb-4 text-center text-xs text-stone-400">Dari lernen · nur für dich gebaut · {__BUILD_DATE__}</p>
    </div>
  )
}

function SectionTitle({ children, id }: { children: string; id?: string }) {
  return (
    <h2 id={id} className="mb-3 text-lg font-bold">
      {children}
    </h2>
  )
}

function SyncCard() {
  const status = useSyncStatus()
  const [session, setSession] = useState<Session | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)

  useEffect(() => {
    if (!supabase) return
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => data.subscription.unsubscribe()
  }, [])

  if (!supabase) {
    return (
      <Card>
        <SectionTitle>Sync</SectionTitle>
        <p className="text-sm text-stone-600 dark:text-stone-300">
          Sync ist nicht eingerichtet: Die App wurde ohne Supabase-Zugangsdaten gebaut. Alles funktioniert lokal, dein Fortschritt bleibt aber auf diesem Gerät.
        </p>
      </Card>
    )
  }

  async function signIn() {
    setBusy(true)
    setMsg(null)
    const { error } = await supabase!.auth.signInWithPassword({ email: email.trim(), password })
    setBusy(false)
    if (error) {
      setMsg(
        error.message.includes('not confirmed')
          ? 'Bitte zuerst den Bestätigungslink in der Mail anklicken, dann hier anmelden.'
          : 'Anmeldung fehlgeschlagen – E-Mail oder Passwort falsch? Noch kein Konto? Dann „Konto erstellen“.',
      )
    }
  }

  async function signUp() {
    setBusy(true)
    setMsg(null)
    const { data, error } = await supabase!.auth.signUp({
      email: email.trim(),
      password,
      options: { emailRedirectTo: window.location.href.split('#')[0] },
    })
    setBusy(false)
    if (error) setMsg(error.message)
    else if (!data.session) {
      setMsg('Konto erstellt! Klick auf den Link in der Bestätigungsmail (auch im Spam schauen) und melde dich dann hier an.')
    }
  }

  const input =
    'w-full rounded-2xl bg-stone-50 px-4 py-3 text-base ring-1 ring-stone-300 outline-none focus:ring-2 focus:ring-emerald-600 dark:bg-stone-950 dark:ring-stone-700'

  return (
    <Card>
      <SectionTitle>Sync zwischen Geräten</SectionTitle>
      {session ? (
        <div className="flex flex-col gap-3">
          <p className="text-sm text-stone-600 dark:text-stone-300">
            Angemeldet als <strong>{session.user.email}</strong>
          </p>
          <p className="text-sm">
            {status.state === 'syncing' && '⏳ Synchronisiere …'}
            {status.state === 'idle' && (status.lastSync ? `✓ Zuletzt synchronisiert: ${new Date(status.lastSync).toLocaleTimeString('de-DE')}` : '✓ Bereit')}
            {status.state === 'error' && <span className="text-red-600">Fehler: {status.message}</span>}
          </p>
          <div className="flex gap-2">
            <Button className="flex-1" onClick={() => syncNow()} disabled={status.state === 'syncing'}>
              Jetzt synchronisieren
            </Button>
            <Button variant="secondary" onClick={() => supabase!.auth.signOut()}>
              Abmelden
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <p className="text-sm text-stone-600 dark:text-stone-300">
            Melde dich auf Laptop und iPhone mit demselben Konto an. Beim ersten Mal „Konto erstellen“ und die Bestätigungsmail anklicken.
          </p>
          <input className={input} type="email" autoComplete="username" placeholder="deine@email.de" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input
            className={input}
            type="password"
            autoComplete="current-password"
            placeholder="Passwort (mind. 6 Zeichen)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && signIn()}
          />
          <div className="flex gap-2">
            <Button className="flex-1" disabled={busy || !email.includes('@') || password.length < 6} onClick={signIn}>
              Anmelden
            </Button>
            <Button variant="secondary" disabled={busy || !email.includes('@') || password.length < 6} onClick={signUp}>
              Konto erstellen
            </Button>
          </div>
          {msg && <p className="text-sm text-stone-600 dark:text-stone-300">{msg}</p>}
        </div>
      )}
    </Card>
  )
}

function VoiceCard() {
  const voice = usePersianVoice()
  const { ttsRate } = useSettings()
  return (
    <Card>
      <SectionTitle id="stimme">Stimme</SectionTitle>
      {voice ? (
        <p className="mb-3 text-sm text-stone-600 dark:text-stone-300">
          ✓ Persische Stimme: <strong>{voice.name}</strong> ({voice.lang})
        </p>
      ) : (
        <div className="mb-3 flex flex-col gap-2 rounded-2xl bg-amber-50 p-4 text-sm text-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
          <p className="font-semibold">Keine persische Stimme gefunden.</p>
          <p>
            <strong>iPhone:</strong> Einstellungen → Bedienungshilfen → Gesprochene Inhalte → Stimmen → Persisch → Stimme laden. Danach die App neu öffnen.
          </p>
          <p>
            <strong>Mac:</strong> Systemeinstellungen → Bedienungshilfen → Gesprochene Inhalte → Systemstimme → Stimmen verwalten → Persisch. Am besten in Safari öffnen, Chrome nutzt teilweise eigene Stimmen.
          </p>
        </div>
      )}
      <label className="flex flex-col gap-2 text-sm">
        <span>
          Sprechtempo: <strong>{ttsRate.toFixed(2)}×</strong>
        </span>
        <input
          type="range"
          min={0.5}
          max={1.2}
          step={0.05}
          value={ttsRate}
          onChange={(e) => setSetting('ttsRate', Number(e.target.value))}
          className="accent-emerald-700"
        />
      </label>
      <Button variant="secondary" className="mt-3 w-full" disabled={!voice} onClick={() => speak('سلام علیکم، چطور استین؟', ttsRate)}>
        Testen: „salām alaykum, chetor astēn?“
      </Button>
    </Card>
  )
}

function LearningCard() {
  const s = useSettings()
  return (
    <Card>
      <SectionTitle>Lernen</SectionTitle>
      <label className="flex items-center justify-between gap-3 py-2">
        <span>Automatisch vorlesen</span>
        <input type="checkbox" checked={s.autoPlay} onChange={(e) => setSetting('autoPlay', e.target.checked)} className="h-5 w-5 accent-emerald-700" />
      </label>
      <label className="flex items-center justify-between gap-3 py-2">
        <span>Max. Karten pro Wiederholung</span>
        <select
          value={s.reviewLimit}
          onChange={(e) => setSetting('reviewLimit', Number(e.target.value))}
          className="rounded-xl bg-stone-100 px-3 py-2 dark:bg-stone-800"
        >
          {[20, 30, 40, 60, 100].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </label>
    </Card>
  )
}

function BackupCard() {
  const file = useRef<HTMLInputElement>(null)
  const [msg, setMsg] = useState<string | null>(null)

  async function download() {
    const blob = new Blob([await exportData()], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `dari-sicherung-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(a.href)
  }

  return (
    <Card>
      <SectionTitle>Sicherung</SectionTitle>
      <p className="mb-3 text-sm text-stone-600 dark:text-stone-300">Fortschritt als Datei sichern oder wiederherstellen. Eigene Aufnahmen sind nicht enthalten.</p>
      <div className="flex gap-2">
        <Button variant="secondary" className="flex-1" onClick={download}>
          Exportieren
        </Button>
        <Button variant="secondary" className="flex-1" onClick={() => file.current?.click()}>
          Importieren
        </Button>
      </div>
      <input
        ref={file}
        type="file"
        accept="application/json,.json"
        className="hidden"
        onChange={async (e) => {
          const f = e.target.files?.[0]
          if (!f) return
          try {
            const n = await importData(await f.text())
            setMsg(`${n} Einträge übernommen.`)
            syncNow()
          } catch (err) {
            setMsg(err instanceof Error ? err.message : 'Import fehlgeschlagen')
          }
          e.target.value = ''
        }}
      />
      {msg && <p className="mt-2 text-sm">{msg}</p>}
    </Card>
  )
}
