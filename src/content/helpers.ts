import type { DialogLine, Phrase } from './types'

export function slug(latin: string): string {
  return latin
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

/** Compact phrase constructor: p(latin, persian, german, note?) */
export function p(latin: string, fa: string, de: string, note?: string): Phrase {
  return { id: slug(latin), latin, fa, de, note }
}

/** A dialog line spoken by another person. */
export function say(speaker: string, latin: string, fa: string, de: string): DialogLine {
  return { speaker, latin, fa, de }
}

/** A dialog line the learner has to produce. */
export function you(latin: string, fa: string, de: string): DialogLine {
  return { speaker: 'Du', latin, fa, de, you: true }
}
