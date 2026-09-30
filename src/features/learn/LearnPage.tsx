import { Link } from 'react-router-dom'
import { CheckIcon, ChevronIcon } from '../../components/icons'
import { PageHeader } from '../../components/ui'
import { units } from '../../content'
import { nextLesson, useCompletedLessons } from '../../lib/progress'

export function LearnPage() {
  const done = useCompletedLessons()
  if (!done) return null
  const next = nextLesson(done)

  return (
    <div>
      <PageHeader title="Lernpfad" subtitle="Von der Begrüßung bis zum Smalltalk mit der Familie." />
      <div className="flex flex-col gap-6">
        {units.map((u) => (
          <section key={u.id}>
            <div className="mb-2 flex items-center gap-3">
              <span className="text-3xl">{u.emoji}</span>
              <div>
                <h2 className="font-bold">
                  Unit {u.num}: {u.title}
                </h2>
                <p className="text-sm text-stone-500">{u.description}</p>
              </div>
            </div>
            <div className="overflow-hidden rounded-3xl bg-white ring-1 ring-stone-200 dark:bg-stone-900 dark:ring-stone-800">
              {u.lessons.map((l, i) => {
                const isDone = done.has(l.id)
                const isNext = next?.id === l.id
                return (
                  <Link
                    key={l.id}
                    to={`/lesson/${l.id}`}
                    className={`flex items-center gap-3 px-4 py-4 transition hover:bg-stone-50 dark:hover:bg-stone-800 ${
                      i > 0 ? 'border-t border-stone-100 dark:border-stone-800' : ''
                    } ${isNext ? 'bg-emerald-50 dark:bg-emerald-950/40' : ''}`}
                  >
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                        isDone
                          ? 'bg-emerald-600 text-white'
                          : isNext
                            ? 'bg-emerald-700 text-white ring-4 ring-emerald-200 dark:ring-emerald-900'
                            : 'bg-stone-100 text-stone-500 dark:bg-stone-800'
                      }`}
                    >
                      {isDone ? <CheckIcon className="h-4 w-4" /> : i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold">{l.title}</p>
                      <p className="text-xs text-stone-500">
                        {l.phrases.length} Phrasen
                        {l.grammar ? ' · Grammatik' : ''}
                        {l.dialog ? ' · Dialog' : ''}
                        {l.culture ? ' · Kultur' : ''}
                      </p>
                    </div>
                    <ChevronIcon className="h-5 w-5 text-stone-400" />
                  </Link>
                )
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
