import type { Phrase } from '../content/types'
import { RecordButton, SpeakButton } from './audio'

/** Big card used when a phrase is introduced. */
export function PhraseCard({ phrase }: { phrase: Phrase }) {
  return (
    <div className="animate-pop flex flex-col items-center gap-4 text-center">
      <p className="text-3xl leading-tight font-bold text-emerald-900 sm:text-4xl dark:text-emerald-200">{phrase.latin}</p>
      <p className="text-lg text-stone-600 dark:text-stone-300">{phrase.de}</p>
      {phrase.note && (
        <p className="max-w-md rounded-2xl bg-amber-50 px-4 py-2 text-sm text-amber-900 dark:bg-amber-950/60 dark:text-amber-200">{phrase.note}</p>
      )}
      <div className="mt-2 flex items-center gap-3">
        <SpeakButton fa={phrase.fa} size="lg" />
        <SpeakButton fa={phrase.fa} slow />
        <RecordButton phraseId={phrase.id} compact />
      </div>
      <p className="text-xs text-stone-400">Anhören · langsam · selbst sprechen</p>
    </div>
  )
}

/** Compact row for lists. */
export function PhraseRow({ phrase, known }: { phrase: Phrase; known?: boolean }) {
  return (
    <div className="flex items-center gap-3 py-3">
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-emerald-900 dark:text-emerald-200">
          {phrase.latin}
          {known && <span className="ml-2 align-middle text-xs font-normal text-emerald-600">✓</span>}
        </p>
        <p className="text-sm text-stone-500 dark:text-stone-400">{phrase.de}</p>
        {phrase.note && <p className="mt-0.5 text-xs text-amber-700 dark:text-amber-400">{phrase.note}</p>}
      </div>
      <SpeakButton fa={phrase.fa} />
    </div>
  )
}
