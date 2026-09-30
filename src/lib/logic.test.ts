import 'fake-indexeddb/auto'
import { describe, expect, it } from 'vitest'
import { lessons, phraseById, units } from '../content'
import type { StoredCard, SyncRow } from './db'
import { buildQueue, computeStreak, dayKey, grade, Rating } from './srs'
import { merge, type RemoteRow } from './sync'

const row = (key: string, updatedAt: number, data: unknown = {}): SyncRow => ({
  id: `card:${key}`,
  kind: 'card',
  key,
  data,
  updatedAt,
  dirty: 1,
})
const remote = (key: string, updated_at: number, data: unknown = {}): RemoteRow => ({ kind: 'card', key, data, updated_at })

describe('merge (last write wins)', () => {
  it('pulls rows that are newer or missing locally', () => {
    const { toLocal, toPush } = merge([row('a', 1)], [remote('a', 2), remote('b', 5)])
    expect(toLocal.map((r) => r.key).sort()).toEqual(['a', 'b'])
    expect(toLocal.every((r) => r.dirty === 0)).toBe(true)
    expect(toPush).toEqual([])
  })

  it('pushes rows that are newer or missing remotely', () => {
    const { toLocal, toPush } = merge([row('a', 3), row('c', 1)], [remote('a', 2)])
    expect(toLocal).toEqual([])
    expect(toPush.map((r) => r.key).sort()).toEqual(['a', 'c'])
  })

  it('does nothing for equal timestamps', () => {
    expect(merge([row('a', 2)], [remote('a', 2)])).toEqual({ toLocal: [], toPush: [] })
  })
})

describe('srs', () => {
  it('a new card graded Good becomes due soon, Easy later', () => {
    const now = new Date('2026-01-01T10:00:00')
    const good = grade(undefined, Rating.Good, now)
    const easy = grade(undefined, Rating.Easy, now)
    expect(good.due).toBeGreaterThan(now.getTime())
    expect(easy.due).toBeGreaterThan(good.due)
    expect(good.reps).toBe(1)
  })

  it('repeated Good answers push the card further out', () => {
    let t = new Date('2026-01-01T10:00:00')
    let c: StoredCard | undefined
    const intervals: number[] = []
    for (let i = 0; i < 5; i++) {
      c = grade(c, Rating.Good, t)
      intervals.push(c.due - t.getTime())
      t = new Date(c.due)
    }
    expect(intervals[4]).toBeGreaterThan(intervals[1])
  })

  it('queue holds only due cards, oldest first, limited', () => {
    const mk = (key: string, due: number) => ({ ...row(key, 0), data: { due } }) as SyncRow<StoredCard>
    const q = buildQueue([mk('late', 50), mk('future', 500), mk('early', 10), mk('mid', 20)], 100, 2)
    expect(q.map((r) => r.key)).toEqual(['early', 'mid'])
  })
})

describe('streak', () => {
  const today = new Date('2026-03-10T12:00:00')
  const day = (offset: number) => {
    const d = new Date(today)
    d.setDate(d.getDate() - offset)
    return dayKey(d)
  }
  it('counts consecutive days including today', () => {
    expect(computeStreak(new Set([day(0), day(1), day(2), day(4)]), today)).toBe(3)
  })
  it('still counts from yesterday when today is empty', () => {
    expect(computeStreak(new Set([day(1), day(2)]), today)).toBe(2)
  })
  it('is zero after a gap', () => {
    expect(computeStreak(new Set([day(2)]), today)).toBe(0)
  })
})

describe('content', () => {
  it('has unique lesson ids and valid phrases', () => {
    const ids = lessons.map((l) => l.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const l of lessons) {
      for (const p of l.phrases) {
        expect(p.id, p.latin).toMatch(/^[a-z0-9-]+$/)
        expect(p.fa.trim(), p.latin).not.toBe('')
        expect(p.de.trim(), p.latin).not.toBe('')
      }
    }
  })

  it('reuses a card only for the same phrase meaning', () => {
    for (const l of lessons) {
      for (const p of l.phrases) {
        const first = phraseById.get(p.id)!
        expect(first.latin, `${p.id} in ${l.id}`).toBe(p.latin)
      }
    }
  })

  it('every dialog has at least one line for the learner', () => {
    for (const u of units) for (const l of u.lessons) if (l.dialog) expect(l.dialog.lines.some((x) => x.you), l.id).toBe(true)
  })
})
