import { useLiveQuery } from 'dexie-react-hooks'
import { lessons } from '../content'
import { getRows, putRow, type StoredCard } from './db'
import { computeStreak, dayKey, logActivity, type Activity } from './srs'

export interface LessonDone {
  completedAt: number
}

export async function completeLesson(lessonId: string) {
  await putRow<LessonDone>('lesson', lessonId, { completedAt: Date.now() })
  await logActivity(0, 1)
}

export function useCompletedLessons(): Set<string> | undefined {
  return useLiveQuery(async () => new Set((await getRows<LessonDone>('lesson')).map((r) => r.key)))
}

/** First lesson in curriculum order that is not finished yet. */
export function nextLesson(done: Set<string>) {
  return lessons.find((l) => !done.has(l.id))
}

export interface CardStats {
  total: number
  due: number
  /** Cards with a stability of 3+ weeks count as „sitzt“. */
  mature: number
}

export function useCardStats(): CardStats | undefined {
  return useLiveQuery(async () => {
    const rows = await getRows<StoredCard>('card')
    const now = Date.now()
    return {
      total: rows.length,
      due: rows.filter((r) => r.data.due <= now).length,
      mature: rows.filter((r) => r.data.stability >= 21).length,
    }
  })
}

export function useStreak(): { streak: number; today: Activity | undefined } | undefined {
  return useLiveQuery(async () => {
    const rows = await getRows<Activity>('activity')
    const active = new Set(rows.filter((r) => r.data.reviews + r.data.lessons > 0).map((r) => r.key))
    const todayKey = dayKey()
    return { streak: computeStreak(active), today: rows.find((r) => r.key === todayKey)?.data }
  })
}

/** Card ids that exist in the review pile. */
export function useKnownCardIds(): Set<string> | undefined {
  return useLiveQuery(async () => new Set((await getRows<StoredCard>('card')).map((r) => r.key)))
}
