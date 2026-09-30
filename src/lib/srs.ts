import { createEmptyCard, fsrs, Rating, type Card, type Grade } from 'ts-fsrs'
import { db, getRows, putRow, rowId, type StoredCard, type SyncRow } from './db'

export { Rating }
export type { Grade }

const scheduler = fsrs({ request_retention: 0.9, enable_fuzz: true })

export function toStored(card: Card): StoredCard {
  return {
    due: card.due.getTime(),
    stability: card.stability,
    difficulty: card.difficulty,
    elapsed_days: card.elapsed_days,
    scheduled_days: card.scheduled_days,
    learning_steps: card.learning_steps,
    reps: card.reps,
    lapses: card.lapses,
    state: card.state,
    last_review: card.last_review?.getTime(),
  }
}

export function fromStored(s: StoredCard): Card {
  return {
    ...s,
    due: new Date(s.due),
    last_review: s.last_review ? new Date(s.last_review) : undefined,
  }
}

/** Applies a grade to a card (or a fresh one) and returns the new stored state. */
export function grade(card: StoredCard | undefined, g: Grade, now = new Date()): StoredCard {
  const current = card ? fromStored(card) : createEmptyCard(now)
  return toStored(scheduler.next(current, now, g).card)
}

/** Cards that are due, oldest first. */
export function buildQueue(rows: SyncRow<StoredCard>[], now: number, limit: number): SyncRow<StoredCard>[] {
  return rows
    .filter((r) => r.data.due <= now)
    .sort((a, b) => a.data.due - b.data.due)
    .slice(0, limit)
}

/** Local calendar date as YYYY-MM-DD. */
export function dayKey(d = new Date()): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

/**
 * Consecutive active days ending today. If today has no activity yet the
 * streak still counts from yesterday, so it does not look broken in the morning.
 */
export function computeStreak(activeDays: Set<string>, today = new Date()): number {
  const d = new Date(today)
  if (!activeDays.has(dayKey(d))) d.setDate(d.getDate() - 1)
  let streak = 0
  while (activeDays.has(dayKey(d))) {
    streak++
    d.setDate(d.getDate() - 1)
  }
  return streak
}

// ---- persistence helpers ----

export async function getCard(phraseId: string): Promise<StoredCard | undefined> {
  return (await db.rows.get(rowId('card', phraseId)))?.data as StoredCard | undefined
}

export async function reviewCard(phraseId: string, g: Grade) {
  const next = grade(await getCard(phraseId), g)
  await putRow('card', phraseId, next)
  await logActivity(1)
}

/** Adds phrases to the review pile once a lesson is finished. Existing cards are left alone. */
export async function introduce(phraseIds: string[]) {
  for (const id of phraseIds) {
    if (!(await getCard(id))) await putRow('card', id, grade(undefined, Rating.Good))
  }
}

export interface Activity {
  reviews: number
  lessons: number
}

export async function logActivity(reviews: number, lessons = 0) {
  const key = dayKey()
  const row = await db.rows.get(rowId('activity', key))
  const prev = (row?.data as Activity | undefined) ?? { reviews: 0, lessons: 0 }
  await putRow<Activity>('activity', key, { reviews: prev.reviews + reviews, lessons: prev.lessons + lessons })
}

export async function dueQueue(limit: number): Promise<string[]> {
  const rows = await getRows<StoredCard>('card')
  return buildQueue(rows, Date.now(), limit).map((r) => r.key)
}
