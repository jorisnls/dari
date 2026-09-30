import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { XIcon } from '../../components/icons'
import { Button, ProgressBar } from '../../components/ui'
import { allPhrases, lessons, phraseById } from '../../content'
import { getRows, type StoredCard } from '../../lib/db'
import { useSettings } from '../../lib/settings'
import { dueQueue, getCard, Rating, reviewCard, type Grade } from '../../lib/srs'
import { syncNow } from '../../lib/sync'
import { useTts } from '../../lib/tts'
import { ExerciseView } from '../exercises/ExerciseView'
import { makeExercise, pickType, shuffle, type Exercise } from '../exercises/generate'

/** Phrases from the same lesson make the best distractors. */
const lessonMates = new Map<string, typeof allPhrases>()
for (const l of lessons) for (const p of l.phrases) if (!lessonMates.has(p.id)) lessonMates.set(p.id, l.phrases)

type Mode = 'due' | 'speak' | 'free'

/**
 * Review session.
 *  - due:   everything due today (default)
 *  - speak: due cards, but every card is a speaking exercise
 *  - free:  random known cards, for extra practice when nothing is due
 */
export function ReviewPage() {
  const [params] = useSearchParams()
  const mode = (params.get('mode') as Mode | null) ?? 'due'
  return <Session key={mode} mode={mode} />
}

function Session({ mode }: { mode: Mode }) {
  const { reviewLimit } = useSettings()
  const tts = useTts()

  const [queue, setQueue] = useState<string[] | null>(null)
  const [pos, setPos] = useState(0)
  const [requeued, setRequeued] = useState<Set<string>>(new Set())
  const [reps, setReps] = useState<Record<string, number>>({})
  const [stats, setStats] = useState({ right: 0, wrong: 0 })

  useEffect(() => {
    ;(async () => {
      let ids: string[]
      if (mode === 'free') {
        ids = shuffle((await getRows<StoredCard>('card')).map((r) => r.key)).slice(0, 15)
      } else {
        ids = await dueQueue(reviewLimit)
      }
      ids = ids.filter((id) => phraseById.has(id))
      const r: Record<string, number> = {}
      for (const id of ids) r[id] = (await getCard(id))?.reps ?? 0
      setReps(r)
      setQueue(ids)
    })()
    // Load once per session; settings changes mid-session should not reshuffle.
  }, [])

  const currentId = queue?.[pos]
  const exercise = useMemo<Exercise | null>(() => {
    if (!currentId) return null
    const ph = phraseById.get(currentId)!
    const type = mode === 'speak' ? 'recall' : pickType(ph, reps[currentId] ?? 0, tts.state === 'ok')
    return makeExercise(type, ph, lessonMates.get(ph.id) ?? [], allPhrases)
    // pos is included so a requeued card gets a fresh exercise.
  }, [currentId, pos])

  async function done(g: Grade) {
    if (!currentId || !queue) return
    await reviewCard(currentId, g)
    setStats((s) => (g === Rating.Again ? { ...s, wrong: s.wrong + 1 } : { ...s, right: s.right + 1 }))
    if (g === Rating.Again && !requeued.has(currentId)) {
      setQueue([...queue, currentId])
      setRequeued(new Set(requeued).add(currentId))
    }
    setPos(pos + 1)
  }

  const finished = queue != null && queue.length > 0 && pos >= queue.length
  useEffect(() => {
    if (finished) syncNow()
  }, [finished])

  if (!queue) return null

  if (queue.length === 0) {
    return (
      <div className="flex min-h-[70dvh] flex-col items-center justify-center gap-5 text-center">
        <p className="text-6xl">🌿</p>
        <h1 className="text-2xl font-bold">Alles wiederholt!</h1>
        <p className="text-stone-600 dark:text-stone-300">Gerade ist nichts fällig. Mach eine neue Lektion oder übe frei weiter.</p>
        <div className="flex w-full flex-col gap-3">
          <Link to="/learn">
            <Button className="w-full">Zur nächsten Lektion</Button>
          </Link>
          <Link to="/review?mode=free">
            <Button variant="secondary" className="w-full">
              Freies Üben
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  if (pos >= queue.length) {
    const total = stats.right + stats.wrong
    return (
      <div className="flex min-h-[70dvh] flex-col items-center justify-center gap-5 text-center">
        <p className="text-6xl">💪</p>
        <h1 className="text-2xl font-bold">Session geschafft!</h1>
        <p className="text-stone-600 dark:text-stone-300">
          {total} Antworten, davon {stats.right} richtig ({Math.round((stats.right / Math.max(1, total)) * 100)} %).
        </p>
        <Link to="/" className="w-full">
          <Button className="w-full">Zurück zu Heute</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      <div className="sticky top-0 z-10 -mx-4 mb-6 flex items-center gap-3 bg-stone-50/90 px-4 py-3 backdrop-blur dark:bg-stone-950/90">
        <Link to="/" aria-label="Beenden" className="rounded-full p-1 text-stone-500 hover:bg-stone-200 dark:hover:bg-stone-800">
          <XIcon />
        </Link>
        <ProgressBar value={pos / queue.length} />
        <span className="text-sm text-stone-500 tabular-nums">
          {pos + 1}/{queue.length}
        </span>
      </div>
      {exercise && <ExerciseView key={pos} exercise={exercise} onDone={done} />}
    </div>
  )
}
