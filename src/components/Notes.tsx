import type { CultureTip, GrammarNote } from '../content/types'
import { Rich, Table } from './ui'

export function GrammarView({ note }: { note: GrammarNote }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm font-semibold tracking-wide text-emerald-700 uppercase dark:text-emerald-400">Grammatik</p>
      <h2 className="text-xl font-bold">{note.title}</h2>
      {note.body.map((b, i) => (
        <p key={i} className="leading-relaxed text-stone-700 dark:text-stone-300">
          <Rich text={b} />
        </p>
      ))}
      {note.table && <Table rows={note.table} />}
      {note.examples && (
        <ul className="flex flex-col gap-2">
          {note.examples.map(([l, d]) => (
            <li key={l} className="rounded-2xl bg-stone-100 px-4 py-2 dark:bg-stone-900">
              <p className="font-semibold text-emerald-900 dark:text-emerald-200">{l}</p>
              <p className="text-sm text-stone-500">{d}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export function CultureView({ tip }: { tip: CultureTip }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm font-semibold tracking-wide text-amber-700 uppercase dark:text-amber-400">Kultur-Tipp</p>
      <h2 className="text-xl font-bold">{tip.title}</h2>
      {tip.body.map((b, i) => (
        <p key={i} className="leading-relaxed text-stone-700 dark:text-stone-300">
          <Rich text={b} />
        </p>
      ))}
    </div>
  )
}
