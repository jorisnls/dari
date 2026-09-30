import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { XIcon } from '../../components/icons'
import { CultureView, GrammarView } from '../../components/Notes'
import { PhraseCard } from '../../components/PhraseCard'
import { Button, ProgressBar } from '../../components/ui'
import { allPhrases, lessonById, unitOfLesson } from '../../content'
import { completeLesson } from '../../lib/progress'
import { introduce, Rating } from '../../lib/srs'
import { syncNow } from '../../lib/sync'
import { useTts } from '../../lib/tts'
import { DialogView } from '../dialog/DialogView'
import { ExerciseView } from '../exercises/ExerciseView'
import { lessonPractice, type Exercise } from '../exercises/generate'
import { useAutoSpeak } from '../../components/audio'

type Step =
  | { kind: 'phrase'; index: number }
  | { kind: 'grammar' }
  | { kind: 'practice'; index: number }
  | { kind: 'dialog' }
  | { kind: 'culture' }
  | { kind: 'done' }

export function LessonPage() {
  const { lessonId = '' } = useParams()
  const lesson = lessonById(lessonId)
  if (!lesson) return <p>Lektion nicht gefunden.</p>
  return <LessonFlow key={lesson.id} lessonId={lesson.id} />
}

function LessonFlow({ lessonId }: { lessonId: string }) {
  const lesson = lessonById(lessonId)!
  const unit = unitOfLesson.get(lessonId)!
  const navigate = useNavigate()
  const tts = useTts()

  // Build the practice round once, when the lesson starts.
  const [practice] = useState<Exercise[]>(() => lessonPractice(lesson.phrases, allPhrases, tts.state === 'ok'))
  const [retry, setRetry] = useState<Exercise[]>([])

  const steps = useMemo<Step[]>(() => {
    const s: Step[] = lesson.phrases.map((_, index) => ({ kind: 'phrase', index }))
    if (lesson.grammar) s.push({ kind: 'grammar' })
    for (let index = 0; index < practice.length + retry.length; index++) s.push({ kind: 'practice', index })
    if (lesson.dialog) s.push({ kind: 'dialog' })
    if (lesson.culture) s.push({ kind: 'culture' })
    s.push({ kind: 'done' })
    return s
  }, [lesson, practice, retry.length])

  const [pos, setPos] = useState(0)
  const [finishing, setFinishing] = useState(false)
  const step = steps[pos]
  const exercises = [...practice, ...retry]
  const next = () => setPos((p) => p + 1)

  const currentPhrase = step.kind === 'phrase' ? lesson.phrases[step.index] : undefined
  useAutoSpeak(currentPhrase?.fa)

  async function finish() {
    setFinishing(true)
    await introduce(lesson.phrases.map((p) => p.id))
    await completeLesson(lesson.id)
    syncNow()
    navigate('/')
  }

  return (
    <div className="flex min-h-[calc(100dvh-2rem)] flex-col">
      <div className="sticky top-0 z-10 -mx-4 mb-6 flex items-center gap-3 bg-stone-50/90 px-4 py-3 backdrop-blur dark:bg-stone-950/90">
        <Link to="/learn" aria-label="Lektion schließen" className="rounded-full p-1 text-stone-500 hover:bg-stone-200 dark:hover:bg-stone-800">
          <XIcon />
        </Link>
        <ProgressBar value={pos / (steps.length - 1)} />
      </div>

      <p className="mb-4 text-sm text-stone-500">
        {unit.emoji} Unit {unit.num} · {lesson.title}
      </p>

      <div className="flex flex-1 flex-col">
        {step.kind === 'phrase' && (
          <div className="flex flex-1 flex-col justify-between gap-8">
            <div>
              <p className="mb-6 text-center text-sm font-semibold tracking-wide text-stone-500 uppercase">
                Neu · {step.index + 1} von {lesson.phrases.length}
              </p>
              <PhraseCard phrase={lesson.phrases[step.index]} />
            </div>
            <div className="flex gap-3">
              {step.index > 0 && (
                <Button variant="secondary" onClick={() => setPos(pos - 1)}>
                  Zurück
                </Button>
              )}
              <Button className="flex-1" onClick={next}>
                Weiter
              </Button>
            </div>
          </div>
        )}

        {step.kind === 'grammar' && lesson.grammar && (
          <div className="flex flex-col gap-8">
            <GrammarView note={lesson.grammar} />
            <Button onClick={next}>Verstanden – jetzt üben</Button>
          </div>
        )}

        {step.kind === 'practice' && (
          <ExerciseView
            key={step.index}
            exercise={exercises[step.index]}
            onDone={(g) => {
              // Wrong answers come back once at the end of the practice round.
              if (g === Rating.Again && step.index < practice.length) setRetry((r) => [...r, { ...exercises[step.index] }])
              next()
            }}
          />
        )}

        {step.kind === 'dialog' && lesson.dialog && (
          <div className="flex flex-col gap-4">
            <p className="text-sm font-semibold tracking-wide text-emerald-700 uppercase dark:text-emerald-400">Dialog</p>
            <h2 className="text-xl font-bold">{lesson.dialog.title}</h2>
            <DialogView dialog={lesson.dialog} pool={lesson.phrases} onDone={next} />
          </div>
        )}

        {step.kind === 'culture' && lesson.culture && (
          <div className="flex flex-col gap-8">
            <CultureView tip={lesson.culture} />
            <Button onClick={next}>Weiter</Button>
          </div>
        )}

        {step.kind === 'done' && (
          <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
            <p className="text-6xl">🎉</p>
            <h2 className="text-2xl font-bold">Lektion geschafft!</h2>
            <p className="text-stone-600 dark:text-stone-300">
              {lesson.phrases.length} neue Phrasen sind jetzt in deinen Wiederholungen. Die App fragt sie genau dann ab, wenn du sie sonst vergessen würdest.
            </p>
            <Button className="w-full" disabled={finishing} onClick={finish}>
              Fertig
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
