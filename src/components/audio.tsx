import { useEffect, useRef, useState, type ReactNode } from 'react'
import type { Phrase } from '../content/types'
import { getFeedback, useFeedbackAvailable, type PronunciationFeedback } from '../lib/feedback'
import { canRecord, loadRecording, saveRecording, startRecording, type ActiveRecording } from '../lib/recorder'
import { useSettings } from '../lib/settings'
import { speak, useTts } from '../lib/tts'
import { MicIcon, PlayIcon, SparkleIcon, SpeakerIcon, StopIcon } from './icons'

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

// One shared player: starting a take always stops the previous one, so takes never overlap.
let player: HTMLAudioElement | null = null
function playTake(url: string) {
  if (!player) player = new Audio()
  player.pause()
  player.src = url
  player.currentTime = 0
  player.play().catch(() => {})
}

/** Record yourself, listen back and optionally get AI feedback. The latest take per phrase is kept on this device.
 *  `children` are extra buttons shown in the same row, before the mic. */
export function RecordButton({ phrase, compact = false, children }: { phrase: Phrase; compact?: boolean; children?: ReactNode }) {
  const phraseId = phrase.id
  const [rec, setRec] = useState<ActiveRecording | null>(null)
  const [url, setUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<PronunciationFeedback | 'loading' | null>(null)
  const busy = useRef(false)
  const canFeedback = useFeedbackAvailable()

  useEffect(() => {
    let alive = true
    let created: string | null = null
    loadRecording(phraseId).then((b) => {
      if (alive && b) setUrl((created = URL.createObjectURL(b)))
    })
    return () => {
      alive = false
      setUrl(null)
      setFeedback(null)
      if (created) URL.revokeObjectURL(created)
    }
  }, [phraseId])

  if (!canRecord()) return children ? <div className="flex items-center gap-3">{children}</div> : null

  async function toggle() {
    if (busy.current) return
    busy.current = true
    setError(null)
    try {
      if (rec) {
        const blob = await rec.stop()
        setRec(null)
        await saveRecording(phraseId, blob)
        const u = URL.createObjectURL(blob)
        setUrl(u)
        playTake(u)
        return
      }
      player?.pause()
      setFeedback(null)
      setRec(await startRecording())
    } catch {
      setError('Kein Mikrofonzugriff')
    } finally {
      busy.current = false
    }
  }

  async function askFeedback() {
    const blob = await loadRecording(phraseId)
    if (!blob) return
    setError(null)
    setFeedback('loading')
    try {
      setFeedback(await getFeedback(blob, phrase))
    } catch (e) {
      setFeedback(null)
      setError(e instanceof Error ? e.message : 'Feedback gerade nicht verfügbar')
    }
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-3">
        {children}
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
            onClick={() => playTake(url)}
            className={`${round} bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-950 dark:text-amber-300`}
          >
            <PlayIcon className="h-5 w-5" />
          </button>
        )}
        {url && !rec && canFeedback && (
          <button
            type="button"
            aria-label="Feedback zur Aussprache"
            disabled={feedback === 'loading'}
            onClick={askFeedback}
            className={`${round} bg-sky-100 text-sky-800 hover:bg-sky-200 dark:bg-sky-950 dark:text-sky-300`}
          >
            <SparkleIcon className={feedback === 'loading' ? 'h-5 w-5 animate-spin' : 'h-5 w-5'} />
          </button>
        )}
      </div>
      {!compact && rec && <span className="text-sm text-red-600">Aufnahme läuft … tippen zum Stoppen</span>}
      {error && <span className="text-sm text-red-600">{error}</span>}
      {feedback === 'loading' && <span className="text-sm text-stone-500">Hört zu …</span>}
      {feedback && feedback !== 'loading' && <FeedbackCard fb={feedback} />}
    </div>
  )
}

function FeedbackCard({ fb }: { fb: PronunciationFeedback }) {
  return (
    <div className="animate-pop w-full max-w-md rounded-2xl bg-sky-50 p-4 text-left text-sm text-sky-950 dark:bg-sky-950/60 dark:text-sky-100">
      <p className="text-lg tracking-wide text-amber-500" aria-label={`${fb.stars} von 5 Sternen`}>
        {'★'.repeat(fb.stars)}
        <span className="text-stone-300 dark:text-stone-600">{'★'.repeat(5 - fb.stars)}</span>
      </p>
      <p className="mt-1">{fb.summary}</p>
      {fb.heardLatin && (
        <p className="mt-2 text-xs text-stone-500 dark:text-stone-400">
          Verstanden: <span className="font-semibold">{fb.heardLatin}</span>
        </p>
      )}
      {fb.tips.length > 0 && (
        <ul className="mt-2 list-disc space-y-1 pl-5">
          {fb.tips.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      )}
      <p className="mt-2 text-[11px] text-stone-400">KI-Einschätzung, kann danebenliegen.</p>
    </div>
  )
}
