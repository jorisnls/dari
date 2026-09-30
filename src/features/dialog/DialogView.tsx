import { useEffect, useMemo, useRef, useState } from 'react'
import { SpeakButton } from '../../components/audio'
import { Button } from '../../components/ui'
import type { Dialog, DialogLine, Phrase } from '../../content/types'
import { useSettings } from '../../lib/settings'
import { speak, usePersianVoice } from '../../lib/tts'
import { shuffle } from '../exercises/generate'

/**
 * Plays through a dialog line by line. Lines of the other person are read aloud,
 * for your own lines you pick the right Dari sentence.
 */
export function DialogView({ dialog, pool, onDone }: { dialog: Dialog; pool: Phrase[]; onDone: () => void }) {
  const [shown, setShown] = useState(0)
  const [mistakes, setMistakes] = useState(0)
  const [showDe, setShowDe] = useState(true)
  const { ttsRate } = useSettings()
  const voice = usePersianVoice()
  const bottom = useRef<HTMLDivElement>(null)

  const current = dialog.lines[shown] as DialogLine | undefined
  const finished = shown >= dialog.lines.length

  const options = useMemo(() => {
    if (!current?.you) return []
    const others = [
      ...dialog.lines.filter((l) => l.you && l.latin !== current.latin).map((l) => l.latin),
      ...shuffle(pool).map((p) => p.latin),
    ].filter((l, i, a) => l !== current.latin && a.indexOf(l) === i)
    return shuffle([current.latin, ...shuffle(others.slice(0, 6)).slice(0, 2)])
  }, [current, dialog.lines, pool])

  // Auto-advance through the other person's lines, reading them aloud.
  useEffect(() => {
    if (!current || current.you) return
    if (voice) speak(current.fa, ttsRate)
  }, [current, voice, ttsRate])

  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [shown])

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl bg-stone-100 p-4 text-sm text-stone-600 italic dark:bg-stone-900 dark:text-stone-400">{dialog.setting}</div>
      <label className="flex items-center gap-2 self-end text-sm text-stone-500">
        <input type="checkbox" checked={showDe} onChange={(e) => setShowDe(e.target.checked)} className="accent-emerald-700" />
        Übersetzung zeigen
      </label>

      <div className="flex flex-col gap-3">
        {dialog.lines.slice(0, shown).map((l, i) => (
          <Bubble key={i} line={l} showDe={showDe} />
        ))}
      </div>

      {current && !current.you && (
        <div className="flex flex-col gap-3">
          <Bubble line={current} showDe={showDe} />
          <Button variant="secondary" onClick={() => setShown(shown + 1)}>
            Weiter
          </Button>
        </div>
      )}

      {current?.you && (
        <YourTurn line={current} options={options} onCorrect={() => setShown(shown + 1)} onWrong={() => setMistakes(mistakes + 1)} />
      )}

      {finished && (
        <div className="animate-pop flex flex-col gap-3 rounded-2xl bg-emerald-50 p-4 text-center dark:bg-emerald-950/50">
          <p className="font-bold text-emerald-800 dark:text-emerald-300">
            {mistakes === 0 ? 'Perfekt gemeistert! 🎉' : `Geschafft – mit ${mistakes} Fehler${mistakes > 1 ? 'n' : ''}.`}
          </p>
          <p className="text-sm text-stone-600 dark:text-stone-300">Tipp: Lies den Dialog nochmal laut und nimm dich dabei auf.</p>
          <Button onClick={onDone}>Weiter</Button>
        </div>
      )}
      <div ref={bottom} />
    </div>
  )
}

function Bubble({ line, showDe }: { line: DialogLine; showDe: boolean }) {
  const mine = !!line.you
  return (
    <div className={`animate-pop flex ${mine ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`flex max-w-[85%] items-start gap-2 rounded-3xl px-4 py-3 ${
          mine ? 'rounded-br-md bg-emerald-700 text-white' : 'rounded-bl-md bg-white ring-1 ring-stone-200 dark:bg-stone-900 dark:ring-stone-800'
        }`}
      >
        <div className="min-w-0">
          <p className={`text-xs font-semibold ${mine ? 'text-emerald-100' : 'text-stone-500'}`}>{line.speaker}</p>
          <p className="text-lg font-medium">{line.latin}</p>
          {showDe && <p className={`text-sm ${mine ? 'text-emerald-100' : 'text-stone-500 dark:text-stone-400'}`}>{line.de}</p>}
        </div>
        {!mine && <SpeakButton fa={line.fa} />}
      </div>
    </div>
  )
}

function YourTurn({ line, options, onCorrect, onWrong }: { line: DialogLine; options: string[]; onCorrect: () => void; onWrong: () => void }) {
  const [wrong, setWrong] = useState<string[]>([])
  return (
    <div className="flex flex-col gap-3 rounded-3xl bg-amber-50 p-4 dark:bg-amber-950/40">
      <p className="text-sm font-semibold text-amber-900 dark:text-amber-300">Du bist dran. Du willst sagen:</p>
      <p className="text-lg font-semibold">„{line.de}“</p>
      <div className="grid gap-2">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            disabled={wrong.includes(o)}
            onClick={() => {
              if (o === line.latin) {
                speak(line.fa)
                onCorrect()
              } else {
                setWrong([...wrong, o])
                onWrong()
              }
            }}
            className={`min-h-12 rounded-2xl px-4 py-3 text-left text-lg ring-1 transition ${
              wrong.includes(o)
                ? 'animate-shake bg-red-50 text-stone-400 line-through ring-red-300 dark:bg-red-950'
                : 'bg-white ring-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 dark:bg-stone-900 dark:ring-stone-700'
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  )
}
