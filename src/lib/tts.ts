import { useSyncExternalStore } from 'react'

/**
 * Text-to-speech with the device's Persian voice.
 *
 * iOS home-screen apps often report an empty or incomplete voice list even when
 * the Persian voice is installed, so we never rely on getVoices() alone: we always
 * speak with lang fa-IR and learn from the result whether audio actually works.
 *
 *  - ok:      a Persian voice was listed, or speaking has worked before
 *  - unknown: nothing listed yet, not tried
 *  - failed:  speaking was tried and produced an error / never started
 */
export type TtsState = 'ok' | 'unknown' | 'failed'

const synth: SpeechSynthesis | undefined = typeof window !== 'undefined' ? window.speechSynthesis : undefined
const WORKED_KEY = 'dari.ttsWorked'

function findPersianVoice(): SpeechSynthesisVoice | null {
  const voices = synth?.getVoices() ?? []
  const lang = (v: SpeechSynthesisVoice) => v.lang.toLowerCase().replace('_', '-')
  return voices.find((v) => lang(v) === 'fa-af') ?? voices.find((v) => lang(v).startsWith('fa')) ?? null
}

function workedBefore(): boolean {
  try {
    return localStorage.getItem(WORKED_KEY) === '1'
  } catch {
    return false
  }
}

let voice = findPersianVoice()
let state: TtsState = !synth ? 'failed' : voice || workedBefore() ? 'ok' : 'unknown'
let snapshot = { state, voiceName: voice?.name }
const listeners = new Set<() => void>()

function update(next: Partial<{ state: TtsState }>) {
  voice = findPersianVoice() ?? voice
  if (next.state) state = next.state
  if (voice && state !== 'ok') state = 'ok'
  if (snapshot.state !== state || snapshot.voiceName !== voice?.name) {
    snapshot = { state, voiceName: voice?.name }
    listeners.forEach((l) => l())
  }
}

function markWorked() {
  try {
    localStorage.setItem(WORKED_KEY, '1')
  } catch {
    // Private mode: fine, we just re-detect next time.
  }
  update({ state: 'ok' })
}

if (synth) {
  synth.addEventListener?.('voiceschanged', () => update({}))
  // Some browsers never fire voiceschanged; poll briefly after start.
  let tries = 0
  const poll = setInterval(() => {
    update({})
    if (++tries >= 10 || voice) clearInterval(poll)
  }, 500)
}

export function useTts() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l)
      return () => listeners.delete(l)
    },
    () => snapshot,
  )
}

export function speak(fa: string, rate = 0.8) {
  if (!synth) return
  synth.cancel()
  const u = new SpeechSynthesisUtterance(fa)
  u.lang = voice?.lang ?? 'fa-IR'
  if (voice) u.voice = voice
  u.rate = rate

  let started = false
  u.onstart = () => {
    started = true
    markWorked()
  }
  u.onend = () => {
    if (!started) markWorked()
  }
  u.onerror = (e) => {
    // Cancelling our own previous utterance is not a failure.
    if (e.error !== 'interrupted' && e.error !== 'canceled' && !started) update({ state: 'failed' })
  }
  synth.speak(u)

  setTimeout(() => {
    if (!started && !synth.speaking && state !== 'ok') update({ state: 'failed' })
  }, 3000)
}
