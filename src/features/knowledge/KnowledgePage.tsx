import { useState } from 'react'
import { CultureView, GrammarView } from '../../components/Notes'
import { Card, PageHeader, Rich } from '../../components/ui'
import { units } from '../../content'
import { legend, legendIntro } from '../../content/transliteration'

type Tab = 'aussprache' | 'grammatik' | 'kultur'

export function KnowledgePage() {
  const [tab, setTab] = useState<Tab>('aussprache')
  const grammar = units.flatMap((u) => u.lessons.filter((l) => l.grammar).map((l) => ({ unit: u, note: l.grammar! })))
  const culture = units.flatMap((u) => u.lessons.filter((l) => l.culture).map((l) => ({ unit: u, tip: l.culture! })))

  return (
    <div>
      <PageHeader title="Wissen" subtitle="Aussprache, Grammatik und Kultur zum Nachlesen." />
      <div className="mb-5 grid grid-cols-3 gap-1 rounded-2xl bg-stone-200/70 p-1 dark:bg-stone-900">
        {(
          [
            ['aussprache', 'Aussprache'],
            ['grammatik', 'Grammatik'],
            ['kultur', 'Kultur'],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`rounded-xl py-2 text-sm font-semibold transition ${
              tab === id ? 'bg-white shadow-sm dark:bg-stone-700' : 'text-stone-500'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 'aussprache' && (
        <div className="flex flex-col gap-4">
          <Card className="flex flex-col gap-3">
            {legendIntro.map((t, i) => (
              <p key={i} className="leading-relaxed text-stone-700 dark:text-stone-300">
                <Rich text={t} />
              </p>
            ))}
          </Card>
          <Card className="px-3!">
            <div className="divide-y divide-stone-100 dark:divide-stone-800">
              {legend.map((l) => (
                <div key={l.sign} className="flex items-baseline gap-3 px-2 py-2.5">
                  <span className="w-8 shrink-0 text-xl font-bold text-emerald-800 dark:text-emerald-300">{l.sign}</span>
                  <div>
                    <p className="text-sm">{l.sound}</p>
                    <p className="text-xs text-stone-500">{l.example}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {tab === 'grammatik' && (
        <div className="flex flex-col gap-4">
          {grammar.map(({ unit, note }) => (
            <Card key={note.title}>
              <p className="mb-1 text-xs text-stone-400">
                {unit.emoji} Unit {unit.num}
              </p>
              <GrammarView note={note} />
            </Card>
          ))}
        </div>
      )}

      {tab === 'kultur' && (
        <div className="flex flex-col gap-4">
          {culture.map(({ unit, tip }) => (
            <Card key={tip.title}>
              <p className="mb-1 text-xs text-stone-400">
                {unit.emoji} Unit {unit.num}
              </p>
              <CultureView tip={tip} />
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
