import type { Lesson, Phrase, Unit } from './types'
import { unit01 } from './units/01-begruessung'
import { unit02 } from './units/02-vorstellen'
import { unit03 } from './units/03-familie'
import { unit04 } from './units/04-zahlen'
import { unit05 } from './units/05-essen'
import { unit06 } from './units/06-zu-gast'
import { unit07 } from './units/07-gefuehle'
import { unit08 } from './units/08-alltag'
import { unit09 } from './units/09-fragen'
import { unit10 } from './units/10-vergangenheit'
import { unit11 } from './units/11-zukunft'
import { unit12 } from './units/12-feste'
import { unit13 } from './units/13-telefon'
import { unit14 } from './units/14-smalltalk'

export const units: Unit[] = [
  unit01,
  unit02,
  unit03,
  unit04,
  unit05,
  unit06,
  unit07,
  unit08,
  unit09,
  unit10,
  unit11,
  unit12,
  unit13,
  unit14,
]

export const lessons: Lesson[] = units.flatMap((u) => u.lessons)

/** Lesson id -> unit, for breadcrumbs. */
export const unitOfLesson = new Map<string, Unit>(units.flatMap((u) => u.lessons.map((l) => [l.id, u] as const)))

/** All phrases by card id. The first occurrence wins if a phrase appears in several lessons. */
export const phraseById = new Map<string, Phrase>()
for (const l of lessons) for (const ph of l.phrases) if (!phraseById.has(ph.id)) phraseById.set(ph.id, ph)

export const allPhrases = [...phraseById.values()]

export function lessonById(id: string): Lesson | undefined {
  return lessons.find((l) => l.id === id)
}
