import { useEffect, useRef, useState } from 'react'
import { canRecord, loadRecording, saveRecording, startRecording, type ActiveRecording } from '../lib/recorder'
import { useSettings } from '../lib/settings'
import { speak, useTts } from '../lib/tts'
import { MicIcon, PlayIcon, SpeakerIcon, StopIcon } from './icons'

const round =
  'inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition active:scale-95 disabled:opacity-40'

export function SpeakButton({ fa, size = 'md', slow = false }: { fa: string; size?: 'md' | 'lg'; slow?: boolean }) {
  const tts = useTts()
  const { ttsRate } = useSettings()
  const [hint, setHint] = useState(false)
  useEffect(() => {
    if (tts.state !== 'failed') setHint(false)
  }, [tts.state])
  const cls = size === 'lg' ? 'h-16 w-16' : ''
  return (
    <span className="relative inline-flex">
      <button
        type="button"
        aria-label="Vorlesen"
        className={`${round} ${cls} bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-950 dark:text-emerald-300`}
        onClick={() => {
          if (tts.state === 'failed') setHint(true)
          speak(fa, slow ? Math.max(0.5, ttsRate - 0.25) : ttsRate)
        }}
      >
        <SpeakerIcon className={size === 'lg' ? 'h-8 w-8' : ''} />
      </button>
      {hint && (
        <span
          onClick={() => setHint(false)}
          className="absolute top-full left-0 z-20 mt-2 w-64 rounded-xl bg-stone-900 p-3 text-xs text-white shadow-lg dark:bg-stone-100 dark:text-stone-900"
        >
          Vorlesen hat nicht geklappt. Auf dem iPhone: Einstellungen → Bedienungshilfen → Gesprochene Inhalte → Stimmen → Persisch laden. Details unter Einstellungen.
        </span>
      )}
    </span>
  )
}

/** Plays the phrase automatically once when it appears (if enabled). */
export function useAutoSpeak(fa: string | undefined, enabled = true) {
  const { autoPlay, ttsRate } = useSettings()
  const { state } = useTts()
  useEffect(() => {
    if (fa && enabled && autoPlay && state !== 'failed') speak(fa, ttsRate)
    // Only when the text changes, not on every settings tick.
  }, [fa, enabled])
}

/** Record yourself, then listen back. The latest take per phrase is kept on this device. */
export function RecordButton({ phraseId, compact = false }: { phraseId: string; compact?: boolean }) {
  const [rec, setRec] = useState<ActiveRecording | null>(null)
  const [url, setUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const audio = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    let alive = true
    let created: string | null = null
    loadRecording(phraseId).then((b) => {
      if (alive && b) setUrl((created = URL.createObjectURL(b)))
    })
    return () => {
      alive = false
      setUrl(null)
      if (created) URL.revokeObjectURL(created)
    }
  }, [phraseId])

  if (!canRecord()) return null

  async function toggle() {
    setError(null)
    if (rec) {
      const blob = await rec.stop()
      setRec(null)
      await saveRecording(phraseId, blob)
      const u = URL.createObjectURL(blob)
      setUrl(u)
      audio.current = new Audio(u)
      audio.current.play()
      return
    }
    try {
      setRec(await startRecording())
    } catch {
      setError('Kein Mikrofonzugriff')
    }
  }

  return (
    <span className="inline-flex items-center gap-2">
      <button
        type="button"
        aria-label={rec ? 'Aufnahme stoppen' : 'Selbst aufnehmen'}
        onClick={toggle}
        className={`${round} ${
          rec
            ? 'animate-pulse bg-red-600 text-white'
            : 'bg-stone-100 text-stone-700 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-200'
        }`}
      >
        {rec ? <StopIcon /> : <MicIcon />}
      </button>
      {url && !rec && (
        <button
          type="button"
          aria-label="Meine Aufnahme abspielen"
          onClick={() => {
            audio.current = new Audio(url)
            audio.current.play()
          }}
          className={`${round} bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-950 dark:text-amber-300`}
        >
          <PlayIcon className="h-5 w-5" />
        </button>
      )}
      {!compact && rec && <span className="text-sm text-red-600">Aufnahme läuft … tippen zum Stoppen</span>}
      {error && <span className="text-sm text-red-600">{error}</span>}
    </span>
  )
}
