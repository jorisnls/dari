/** One learnable item. Every phrase becomes one spaced-repetition card. */
export interface Phrase {
  /** Stable card id. Derived from `latin` unless set explicitly. */
  id: string
  /** Kabuli-Dari in Latin transliteration (what the learner sees). */
  latin: string
  /** Persian script, only used for text-to-speech. */
  fa: string
  /** German meaning. */
  de: string
  /** Optional hint: usage, literal meaning, register. */
  note?: string
}

export interface GrammarNote {
  title: string
  /** Paragraphs. `**bold**` is rendered bold. */
  body: string[]
  /** Optional table, first row is the header. */
  table?: string[][]
  /** Example sentences as [latin, german]. */
  examples?: [string, string][]
}

export interface DialogLine {
  speaker: string
  latin: string
  fa: string
  de: string
  /** Lines spoken by the learner become a choice exercise. */
  you?: boolean
}

export interface Dialog {
  title: string
  /** Short scene description shown before the dialog starts. */
  setting: string
  lines: DialogLine[]
}

export interface CultureTip {
  title: string
  body: string[]
}

export interface Lesson {
  id: string
  title: string
  phrases: Phrase[]
  grammar?: GrammarNote
  dialog?: Dialog
  culture?: CultureTip
}

export interface Unit {
  id: string
  num: number
  title: string
  emoji: string
  description: string
  lessons: Lesson[]
}
