import type { Phrase } from '../../content/types'

export type Exercise =
  /** Show Dari, pick the German meaning. */
  | { type: 'choose-de'; phrase: Phrase; options: Phrase[] }
  /** Only audio, pick the German meaning. */
  | { type: 'listen'; phrase: Phrase; options: Phrase[] }
  /** Show German, pick the Dari phrase. */
  | { type: 'choose-latin'; phrase: Phrase; options: Phrase[] }
  /** Show German, put the Dari words in order. */
  | { type: 'build'; phrase: Phrase; tiles: string[] }
  /** Show German, say it out loud, reveal and self-grade. */
  | { type: 'recall'; phrase: Phrase }

export type ExerciseType = Exercise['type']

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/** Words of a phrase without punctuation, used for the tile exercise. */
export function words(latin: string): string[] {
  return latin
    .replace(/[?!.,…]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
}

export function canBuild(ph: Phrase) {
  const w = words(ph.latin)
  return w.length >= 3 && w.length <= 8
}

/**
 * Picks `n` wrong answers. Prefers phrases from the same lesson (harder, more relevant),
 * never uses one with the same German or Dari text.
 */
export function distractors(target: Phrase, near: Phrase[], pool: Phrase[], n = 3): Phrase[] {
  const ok = (p: Phrase) => p.id !== target.id && p.de !== target.de && p.latin !== target.latin
  const picked: Phrase[] = []
  for (const src of [shuffle(near), shuffle(pool)]) {
    for (const p of src) {
      if (picked.length >= n) return picked
      if (ok(p) && !picked.some((q) => q.de === p.de || q.latin === p.latin)) picked.push(p)
    }
  }
  return picked
}

export function makeExercise(type: ExerciseType, phrase: Phrase, near: Phrase[], pool: Phrase[]): Exercise {
  switch (type) {
    case 'choose-de':
    case 'listen':
    case 'choose-latin':
      return { type, phrase, options: shuffle([phrase, ...distractors(phrase, near, pool)]) }
    case 'build': {
      const extra = distractors(phrase, near, pool, 2).flatMap((p) => words(p.latin).slice(0, 1))
      const own = words(phrase.latin)
      return { type, phrase, tiles: shuffle([...own, ...extra.filter((w) => !own.includes(w))]) }
    }
    case 'recall':
      return { type, phrase }
  }
}

/**
 * Chooses an exercise type that fits how well a card is known:
 * new cards get recognition tasks, known cards get production tasks.
 */
export function pickType(phrase: Phrase, reps: number, hasVoice: boolean): ExerciseType {
  const r = Math.random()
  if (reps <= 2) {
    if (hasVoice && r < 0.25) return 'listen'
    return r < 0.65 ? 'choose-de' : 'choose-latin'
  }
  if (canBuild(phrase) && r < 0.3) return 'build'
  if (hasVoice && r < 0.4) return 'listen'
  return r < 0.55 ? 'choose-latin' : 'recall'
}

/** A short practice round for a freshly introduced lesson: every phrase once, easy to harder. */
export function lessonPractice(phrases: Phrase[], pool: Phrase[], hasVoice: boolean): Exercise[] {
  const out: Exercise[] = []
  for (const [i, ph] of shuffle(phrases).entries()) {
    const kinds: ExerciseType[] = ['choose-de', 'choose-latin']
    if (hasVoice) kinds.push('listen')
    if (canBuild(ph)) kinds.push('build')
    out.push(makeExercise(kinds[i % kinds.length], ph, phrases, pool))
  }
  return out
}
