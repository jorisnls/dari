import { useEffect, useState } from 'react'
import type { Phrase } from '../content/types'
import { supabase } from './supabase'

export interface PronunciationFeedback {
  heardLatin: string
  heardFa: string
  stars: number
  summary: string
  tips: string[]
}

/** Feedback runs through a Supabase function, so it needs a signed-in session. */
export function useFeedbackAvailable(): boolean {
  const [signedIn, setSignedIn] = useState(false)
  useEffect(() => {
    if (!supabase) return
    supabase.auth.getSession().then(({ data }) => setSignedIn(!!data.session))
    const { data } = supabase.auth.onAuthStateChange((_e, session) => setSignedIn(!!session))
    return () => data.subscription.unsubscribe()
  }, [])
  return signedIn
}

const RATE = 16000

/** The model only takes WAV/MP3; browsers record mp4 or webm. Decode and re-encode as 16 kHz mono PCM16. */
async function toWavBase64(blob: Blob): Promise<string> {
  const ctx = new AudioContext()
  let decoded: AudioBuffer
  try {
    decoded = await ctx.decodeAudioData(await blob.arrayBuffer())
  } finally {
    ctx.close()
  }
  const offline = new OfflineAudioContext(1, Math.max(1, Math.ceil(decoded.duration * RATE)), RATE)
  const src = offline.createBufferSource()
  src.buffer = decoded
  src.connect(offline.destination)
  src.start()
  const pcm = (await offline.startRendering()).getChannelData(0)

  const buf = new ArrayBuffer(44 + pcm.length * 2)
  const v = new DataView(buf)
  const str = (o: number, s: string) => [...s].forEach((c, i) => v.setUint8(o + i, c.charCodeAt(0)))
  str(0, 'RIFF')
  v.setUint32(4, 36 + pcm.length * 2, true)
  str(8, 'WAVE')
  str(12, 'fmt ')
  v.setUint32(16, 16, true)
  v.setUint16(20, 1, true) // PCM
  v.setUint16(22, 1, true) // mono
  v.setUint32(24, RATE, true)
  v.setUint32(28, RATE * 2, true)
  v.setUint16(32, 2, true)
  v.setUint16(34, 16, true)
  str(36, 'data')
  v.setUint32(40, pcm.length * 2, true)
  for (let i = 0; i < pcm.length; i++) {
    const s = Math.max(-1, Math.min(1, pcm[i]))
    v.setInt16(44 + i * 2, s < 0 ? s * 0x8000 : s * 0x7fff, true)
  }

  const bytes = new Uint8Array(buf)
  let bin = ''
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000))
  return btoa(bin)
}

export async function getFeedback(blob: Blob, phrase: Pick<Phrase, 'latin' | 'fa' | 'de'>): Promise<PronunciationFeedback> {
  if (!supabase) throw new Error('Feedback braucht die Online-Anmeldung')
  const audio = await toWavBase64(blob)
  const { data, error } = await supabase.functions.invoke('pronunciation', {
    body: { audio, latin: phrase.latin, fa: phrase.fa, de: phrase.de },
  })
  if (error) {
    // FunctionsHttpError carries the server's JSON body in `context`.
    const msg = await (error as { context?: Response }).context?.json?.().catch(() => null)
    throw new Error(msg?.error ?? 'Feedback gerade nicht verfügbar')
  }
  return data as PronunciationFeedback
}
