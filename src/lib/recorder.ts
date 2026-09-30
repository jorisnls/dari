import { db } from './db'

function pickMime(): string {
  // Safari records mp4/aac, Chrome and Firefox record webm/opus.
  for (const m of ['audio/mp4', 'audio/webm;codecs=opus', 'audio/webm']) {
    if (MediaRecorder.isTypeSupported(m)) return m
  }
  return ''
}

export function canRecord(): boolean {
  return typeof MediaRecorder !== 'undefined' && !!navigator.mediaDevices?.getUserMedia
}

export interface ActiveRecording {
  stop: () => Promise<Blob>
}

export async function startRecording(): Promise<ActiveRecording> {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
  const mime = pickMime()
  const rec = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined)
  const chunks: Blob[] = []
  rec.ondataavailable = (e) => e.data.size && chunks.push(e.data)
  rec.start()
  return {
    stop: () =>
      new Promise<Blob>((resolve) => {
        rec.onstop = () => {
          stream.getTracks().forEach((t) => t.stop())
          resolve(new Blob(chunks, { type: rec.mimeType || mime }))
        }
        rec.stop()
      }),
  }
}

/** Keeps only the latest recording per phrase, on this device only. */
export async function saveRecording(phraseId: string, blob: Blob) {
  await db.recordings.put({ phraseId, blob, mime: blob.type, createdAt: Date.now() })
}

export async function loadRecording(phraseId: string): Promise<Blob | undefined> {
  return (await db.recordings.get(phraseId))?.blob
}
