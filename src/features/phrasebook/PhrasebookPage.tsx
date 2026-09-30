import { useMemo, useState } from 'react'
import { SearchIcon } from '../../components/icons'
import { PhraseRow } from '../../components/PhraseCard'
import { PageHeader } from '../../components/ui'
import { slug } from '../../content/helpers'
import { units } from '../../content'
import { useKnownCardIds } from '../../lib/progress'

/** Loose matching: ignores case and diacritics, so „salam“ finds „salām“. */
function norm(s: string) {
  return slug(s).replace(/-/g, ' ')
}

export function PhrasebookPage() {
  const [q, setQ] = useState('')
  const [onlyKnown, setOnlyKnown] = useState(false)
  const known = useKnownCardIds()

  const groups = useMemo(() => {
    const needle = norm(q)
    return units
      .map((u) => ({
        unit: u,
        phrases: u.lessons
          .flatMap((l) => l.phrases)
          .filter((p, i, a) => a.findIndex((x) => x.id === p.id) === i)
          .filter((p) => !onlyKnown || known?.has(p.id))
          .filter((p) => !needle || norm(p.latin).includes(needle) || norm(p.de).includes(needle)),
      }))
      .filter((g) => g.phrases.length > 0)
  }, [q, onlyKnown, known])

  return (
    <div>
      <PageHeader title="Phrasen" subtitle="Alles zum Nachschlagen – auf Deutsch oder Dari suchen." />
      <div className="sticky top-0 z-10 -mx-4 bg-stone-50/90 px-4 pt-1 pb-3 backdrop-blur dark:bg-stone-950/90">
        <label className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3 ring-1 ring-stone-300 focus-within:ring-2 focus-within:ring-emerald-600 dark:bg-stone-900 dark:ring-stone-700">
          <SearchIcon className="h-5 w-5 text-stone-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="z.B. danke, Tee, chetor …"
            className="w-full bg-transparent text-base outline-none"
            type="search"
          />
        </label>
        <label className="mt-2 flex items-center gap-2 text-sm text-stone-500">
          <input type="checkbox" checked={onlyKnown} onChange={(e) => setOnlyKnown(e.target.checked)} className="accent-emerald-700" />
          Nur schon gelernte
        </label>
      </div>
      {groups.length === 0 && <p className="py-10 text-center text-stone-500">Nichts gefunden.</p>}
      {groups.map(({ unit, phrases }) => (
        <section key={unit.id} className="mt-4">
          <h2 className="mb-1 text-sm font-semibold tracking-wide text-stone-500 uppercase">
            {unit.emoji} {unit.title}
          </h2>
          <div className="divide-y divide-stone-100 rounded-3xl bg-white px-4 ring-1 ring-stone-200 dark:divide-stone-800 dark:bg-stone-900 dark:ring-stone-800">
            {phrases.map((p) => (
              <PhraseRow key={p.id} phrase={p} known={known?.has(p.id)} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
