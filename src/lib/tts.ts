import { useEffect, useState } from 'react'

const synth: SpeechSynthesis | undefined = typeof window !== 'undefined' ? window.speechSynthesis : undefined

function findPersianVoice(): SpeechSynthesisVoice | null {
  const voices = synth?.getVoices() ?? []
  // Prefer a proper fa-AF voice if a device ever ships one, then any Persian voice.
  return (
    voices.find((v) => v.lang.toLowerCase().replace('_', '-') === 'fa-af') ??
    voices.find((v) => v.lang.toLowerCase().startsWith('fa')) ??
    null
  )
}

/** Tracks whether a Persian voice is installed (voices load asynchronously in most browsers). */
export function usePersianVoice() {
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(() => findPersianVoice())
  useEffect(() => {
    if (!synth) return
    const update = () => setVoice(findPersianVoice())
    update()
    synth.addEventListener('voiceschanged', update)
    return () => synth.removeEventListener('voiceschanged', update)
  }, [])
  return voice
}

export function speak(fa: string, rate = 0.8): boolean {
  if (!synth) return false
  const voice = findPersianVoice()
  if (!voice) return false
  synth.cancel()
  const u = new SpeechSynthesisUtterance(fa)
  u.voice = voice
  u.lang = voice.lang
  u.rate = rate
  synth.speak(u)
  return true
}
