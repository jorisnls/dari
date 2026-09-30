import { useLiveQuery } from 'dexie-react-hooks'
import { db, getRows, putRow } from './db'

export interface Settings {
  /** Speech rate for the Persian voice (0.5–1.2). */
  ttsRate: number
  /** Maximum cards per review session. */
  reviewLimit: number
  /** Play audio automatically when a card is shown. */
  autoPlay: boolean
}

export const defaultSettings: Settings = { ttsRate: 0.8, reviewLimit: 40, autoPlay: true }

export function useSettings(): Settings {
  return (
    useLiveQuery(async () => {
      const rows = await getRows<unknown>('setting')
      const s: Record<string, unknown> = { ...defaultSettings }
      for (const r of rows) s[r.key] = r.data
      return s as unknown as Settings
    }) ?? defaultSettings
  )
}

export async function setSetting<K extends keyof Settings>(key: K, value: Settings[K]) {
  await putRow('setting', key, value)
}

/** Everything a user would want to back up (recordings excluded: they are device-local blobs). */
export async function exportData(): Promise<string> {
  const rows = await db.rows.toArray()
  return JSON.stringify({ app: 'dari', version: 1, exportedAt: new Date().toISOString(), rows }, null, 2)
}

export async function importData(json: string): Promise<number> {
  const parsed = JSON.parse(json)
  if (parsed?.app !== 'dari' || !Array.isArray(parsed.rows)) throw new Error('Keine gültige Dari-Sicherung')
  let n = 0
  await db.transaction('rw', db.rows, async () => {
    for (const r of parsed.rows) {
      const cur = await db.rows.get(r.id)
      if (!cur || cur.updatedAt < r.updatedAt) {
        await db.rows.put({ ...r, dirty: 1 })
        n++
      }
    }
  })
  return n
}
