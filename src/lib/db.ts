import Dexie, { type EntityTable } from 'dexie'

/** FSRS card state as stored (dates as epoch millis so it serialises cleanly). */
export interface StoredCard {
  due: number
  stability: number
  difficulty: number
  elapsed_days: number
  scheduled_days: number
  learning_steps: number
  reps: number
  lapses: number
  state: number
  last_review?: number
}

/**
 * Every synced row has the same shape: a kind, a key and a JSON payload,
 * plus the client timestamp used for last-write-wins merging.
 */
export type SyncKind = 'card' | 'lesson' | 'activity' | 'setting'

export interface SyncRow<T = unknown> {
  /** `${kind}:${key}` */
  id: string
  kind: SyncKind
  key: string
  data: T
  updatedAt: number
  /** true when changed locally since the last successful push */
  dirty: 0 | 1
}

export interface Recording {
  phraseId: string
  blob: Blob
  mime: string
  createdAt: number
}

export interface Meta {
  key: string
  value: unknown
}

export const db = new Dexie('dari') as Dexie & {
  rows: EntityTable<SyncRow, 'id'>
  recordings: EntityTable<Recording, 'phraseId'>
  meta: EntityTable<Meta, 'key'>
}

db.version(1).stores({
  rows: 'id, kind, dirty',
  recordings: 'phraseId',
  meta: 'key',
})

export function rowId(kind: SyncKind, key: string) {
  return `${kind}:${key}`
}

/** Writes a synced row and marks it dirty for the next push. */
export async function putRow<T>(kind: SyncKind, key: string, data: T, updatedAt = Date.now()) {
  await db.rows.put({ id: rowId(kind, key), kind, key, data, updatedAt, dirty: 1 })
}

export async function getRows<T>(kind: SyncKind): Promise<SyncRow<T>[]> {
  return (await db.rows.where('kind').equals(kind).toArray()) as SyncRow<T>[]
}

export async function getMeta<T>(key: string): Promise<T | undefined> {
  return (await db.meta.get(key))?.value as T | undefined
}

export async function setMeta(key: string, value: unknown) {
  await db.meta.put({ key, value })
}
