import { useState } from 'react'
import { RecordButton, SpeakButton, useAutoSpeak } from '../../components/audio'
import { Button } from '../../components/ui'
import type { Phrase } from '../../content/types'
import { Rating, type Grade } from '../../lib/srs'
import { words, type Exercise } from './generate'

interface Props {
  exercise: Exercise
  /** Called when the learner moves on. */
  onDone: (grade: Grade) => void
}

const prompts: Record<Exercise['type'], string> = {
  'choose-de': 'Was bedeutet das?',
  listen: 'Hör zu – was bedeutet das?',
  'choose-latin': 'Wie sagt man das auf Dari?',
  build: 'Bilde den Satz auf Dari',
  recall: 'Sag es laut auf Dari',
}

export function ExerciseView({ exercise, onDone }: Props) {
  // Remount per exercise so local state resets.
  return <Inner key={`${exercise.type}:${exercise.phrase.id}`} exercise={exercise} onDone={onDone} />
}

function Inner({ exercise, onDone }: Props) {
  const ph = exercise.phrase
  useAutoSpeak(ph.fa, exercise.type === 'choose-de' || exercise.type === 'listen')

  return (
    <div className="flex flex-col gap-5">
      <p className="text-sm font-semibold tracking-wide text-stone-500 uppercase">{prompts[exercise.type]}</p>
      {exercise.type === 'build' ? (
        <Build exercise={exercise} onDone={onDone} />
      ) : exercise.type === 'recall' ? (
        <Recall phrase={ph} onDone={onDone} />
      ) : (
        <Choice exercise={exercise} onDone={onDone} />
      )}
    </div>
  )
}

function Choice({ exercise, onDone }: { exercise: Extract<Exercise, { options: Phrase[] }>; onDone: (g: Grade) => void }) {
  const ph = exercise.phrase
  const [picked, setPicked] = useState<string | null>(null)
  const showDe = exercise.type !== 'choose-latin'
  const correct = picked === ph.id

  return (
    <>
      <div className="flex min-h-28 items-center justify-center gap-4 text-center">
        {exercise.type === 'listen' ? (
          <SpeakButton fa={ph.fa} size="lg" />
        ) : exercise.type === 'choose-de' ? (
          <>
            <p className="text-3xl font-bold text-emerald-900 dark:text-emerald-200">{ph.latin}</p>
            <SpeakButton fa={ph.fa} />
          </>
        ) : (
          <p className="text-2xl font-semibold">{ph.de}</p>
        )}
      </div>

      <div className="grid gap-3">
        {exercise.options.map((o) => {
          const state = picked == null ? 'idle' : o.id === ph.id ? 'right' : o.id === picked ? 'wrong' : 'dim'
          return (
            <button
              key={o.id}
              type="button"
              disabled={picked != null}
              onClick={() => setPicked(o.id)}
              className={`min-h-14 rounded-2xl px-4 py-3 text-left text-lg ring-1 transition ${
                state === 'right'
                  ? 'bg-emerald-100 ring-2 ring-emerald-600 dark:bg-emerald-950'
                  : state === 'wrong'
                    ? 'animate-shake bg-red-50 ring-2 ring-red-500 dark:bg-red-950'
                    : state === 'dim'
                      ? 'opacity-50 ring-stone-200 dark:ring-stone-800'
                      : 'bg-white ring-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 active:scale-[0.99] dark:bg-stone-900 dark:ring-stone-700'
              }`}
            >
              {showDe ? o.de : o.latin}
            </button>
          )
        })}
      </div>

      {picked != null && (
        <Feedback correct={correct} phrase={ph} onNext={() => onDone(correct ? Rating.Good : Rating.Again)} />
      )}
    </>
  )
}

function Build({ exercise, onDone }: { exercise: Extract<Exercise, { type: 'build' }>; onDone: (g: Grade) => void }) {
  const ph = exercise.phrase
  const target = words(ph.latin)
  // Indexes into exercise.tiles, so repeated words work.
  const [chosen, setChosen] = useState<number[]>([])
  const [checked, setChecked] = useState(false)
  const answer = chosen.map((i) => exercise.tiles[i])
  const correct = answer.join(' ') === target.join(' ')

  return (
    <>
      <p className="text-center text-2xl font-semibold">{ph.de}</p>
      <div className="flex min-h-16 flex-wrap content-start gap-2 border-b-2 border-stone-200 pb-3 dark:border-stone-700">
        {chosen.map((i, pos) => (
          <button
            key={pos}
            type="button"
            disabled={checked}
            onClick={() => setChosen(chosen.filter((_, k) => k !== pos))}
            className="rounded-xl bg-emerald-100 px-3 py-2 text-lg font-medium text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200"
          >
            {exercise.tiles[i]}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {exercise.tiles.map((w, i) => (
          <button
            key={i}
            type="button"
            disabled={checked || chosen.includes(i)}
            onClick={() => setChosen([...chosen, i])}
            className="rounded-xl bg-white px-3 py-2 text-lg ring-1 ring-stone-300 transition disabled:opacity-25 dark:bg-stone-900 dark:ring-stone-700"
          >
            {w}
          </button>
        ))}
      </div>
      {!checked ? (
        <Button disabled={chosen.length === 0} onClick={() => setChecked(true)}>
          Prüfen
        </Button>
      ) : (
        <Feedback correct={correct} phrase={ph} onNext={() => onDone(correct ? Rating.Good : Rating.Again)} />
      )}
    </>
  )
}

function Recall({ phrase, onDone }: { phrase: Phrase; onDone: (g: Grade) => void }) {
  const [revealed, setRevealed] = useState(false)
  useAutoSpeak(phrase.fa, revealed)

  return (
    <>
      <p className="text-center text-2xl font-semibold">{phrase.de}</p>
      <div className="flex flex-col items-center gap-2">
        <RecordButton phraseId={phrase.id} />
        <p className="text-xs text-stone-400">Optional: aufnehmen und danach mit dem Original vergleichen</p>
      </div>
      {!revealed ? (
        <Button variant="secondary" onClick={() => setRevealed(true)}>
          Lösung zeigen
        </Button>
      ) : (
        <div className="animate-pop flex flex-col gap-4">
          <div className="flex items-center justify-center gap-3 rounded-2xl bg-emerald-50 p-4 dark:bg-emerald-950/50">
            <p className="text-2xl font-bold text-emerald-900 dark:text-emerald-200">{phrase.latin}</p>
            <SpeakButton fa={phrase.fa} />
          </div>
          {phrase.note && <p className="text-center text-sm text-amber-700 dark:text-amber-400">{phrase.note}</p>}
          <p className="text-center text-sm text-stone-500">Wie gut wusstest du es?</p>
          <div className="grid grid-cols-4 gap-2">
            {(
              [
                [Rating.Again, 'Nochmal', 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'],
                [Rating.Hard, 'Schwer', 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300'],
                [Rating.Good, 'Gut', 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300'],
                [Rating.Easy, 'Leicht', 'bg-sky-100 text-sky-900 dark:bg-sky-950 dark:text-sky-300'],
              ] as const
            ).map(([g, label, cls]) => (
              <button key={label} type="button" onClick={() => onDone(g)} className={`min-h-12 rounded-2xl text-sm font-semibold ${cls}`}>
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

function Feedback({ correct, phrase, onNext }: { correct: boolean; phrase: Phrase; onNext: () => void }) {
  return (
    <div
      className={`animate-pop flex flex-col gap-3 rounded-2xl p-4 ${
        correct ? 'bg-emerald-50 dark:bg-emerald-950/50' : 'bg-red-50 dark:bg-red-950/50'
      }`}
    >
      <p className={`font-bold ${correct ? 'text-emerald-800 dark:text-emerald-300' : 'text-red-800 dark:text-red-300'}`}>
        {correct ? 'āfarin! Richtig.' : 'Nicht ganz. Richtig ist:'}
      </p>
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <p className="text-lg font-semibold">{phrase.latin}</p>
          <p className="text-stone-600 dark:text-stone-300">{phrase.de}</p>
        </div>
        <SpeakButton fa={phrase.fa} />
      </div>
      <Button onClick={onNext} autoFocus>
        Weiter
      </Button>
    </div>
  )
}
