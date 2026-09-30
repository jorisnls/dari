import { Link } from 'react-router-dom'
import { FlameIcon, MicIcon } from '../../components/icons'
import { Button, Card, ProgressBar } from '../../components/ui'
import { lessons, unitOfLesson, units } from '../../content'
import { nextLesson, useCardStats, useCompletedLessons, useStreak } from '../../lib/progress'
import { useSyncStatus } from '../../lib/sync'
import { useTts } from '../../lib/tts'

function greeting() {
  const h = new Date().getHours()
  if (h < 11) return 'sob bakhayr!'
  if (h < 18) return 'salām!'
  return 'shām bakhayr!'
}

export function TodayPage() {
  const done = useCompletedLessons()
  const stats = useCardStats()
  const streak = useStreak()
  const tts = useTts()
  const sync = useSyncStatus()

  if (!done || !stats || !streak) return null

  const next = nextLesson(done)
  const nextUnit = next && unitOfLesson.get(next.id)
  const doneCount = lessons.filter((l) => done.has(l.id)).length

  return (
    <div className="flex flex-col gap-5">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-sm text-stone-500">Heute</p>
          <h1 className="text-3xl font-bold tracking-tight text-emerald-900 dark:text-emerald-200">{greeting()}</h1>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1.5 font-bold text-amber-800 dark:bg-amber-950 dark:text-amber-300">
          <FlameIcon className="h-5 w-5" />
          <span className="tabular-nums">{streak.streak}</span>
          <span className="text-xs font-medium">{streak.streak === 1 ? 'Tag' : 'Tage'}</span>
        </div>
      </header>

      {tts.state === 'failed' && (
        <Link to="/settings#stimme" className="rounded-2xl bg-amber-50 p-4 text-sm text-amber-900 ring-1 ring-amber-200 dark:bg-amber-950/40 dark:text-amber-200 dark:ring-amber-900">
          🔈 Vorlesen funktioniert gerade nicht. <u>So aktivierst du sie</u>
        </Link>
      )}
      {sync.state === 'error' && (
        <Link to="/settings" className="rounded-2xl bg-red-50 p-3 text-sm text-red-800 dark:bg-red-950/40 dark:text-red-300">
          Sync fehlgeschlagen – deine Daten sind lokal sicher. Details in den Einstellungen.
        </Link>
      )}

      <Card>
        <p className="text-sm font-semibold tracking-wide text-stone-500 uppercase">Wiederholen</p>
        {stats.due > 0 ? (
          <>
            <p className="mt-1 text-2xl font-bold">
              {stats.due} {stats.due === 1 ? 'Karte ist' : 'Karten sind'} fällig
            </p>
            <p className="mt-1 text-sm text-stone-500">Zuerst wiederholen, dann Neues lernen – so bleibt alles hängen.</p>
            <div className="mt-4 flex gap-2">
              <Link to="/review" className="flex-1">
                <Button className="w-full">Wiederholen</Button>
              </Link>
              <Link to="/review?mode=speak" aria-label="Sprechtraining">
                <Button variant="secondary" title="Sprechtraining: jede Karte laut sagen">
                  <MicIcon className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <>
            <p className="mt-1 text-2xl font-bold">{stats.total === 0 ? 'Noch keine Karten' : 'Alles erledigt ✓'}</p>
            <p className="mt-1 text-sm text-stone-500">
              {stats.total === 0 ? 'Nach deiner ersten Lektion landen die Phrasen hier.' : 'Gerade ist nichts fällig.'}
            </p>
            {stats.total > 0 && (
              <Link to="/review?mode=free" className="mt-4 block">
                <Button variant="secondary" className="w-full">
                  Freies Üben
                </Button>
              </Link>
            )}
          </>
        )}
      </Card>

      {next && nextUnit ? (
        <Card className="bg-emerald-800! text-white ring-0!">
          <p className="text-sm font-semibold tracking-wide text-emerald-200 uppercase">
            {doneCount === 0 ? 'Los geht’s' : 'Nächste Lektion'}
          </p>
          <p className="mt-1 text-2xl font-bold">{next.title}</p>
          <p className="mt-1 text-sm text-emerald-100">
            {nextUnit.emoji} Unit {nextUnit.num}: {nextUnit.title} · {next.phrases.length} Phrasen
            {next.dialog ? ' · Dialog' : ''}
          </p>
          <Link to={`/lesson/${next.id}`} className="mt-4 block">
            <Button className="w-full bg-white! text-emerald-900! hover:bg-emerald-50!">Lektion starten</Button>
          </Link>
        </Card>
      ) : (
        <Card>
          <p className="text-xl font-bold">Alle Lektionen abgeschlossen! 🎓</p>
          <p className="mt-1 text-stone-500">Bleib mit den Wiederholungen dran – und rede so viel wie möglich mit der Familie.</p>
        </Card>
      )}

      <Card>
        <div className="grid grid-cols-3 gap-2 text-center">
          <Stat value={stats.total} label="Phrasen gelernt" />
          <Stat value={stats.mature} label="sitzen fest" />
          <Stat value={`${doneCount}/${lessons.length}`} label="Lektionen" />
        </div>
        <div className="mt-4 flex flex-col gap-2">
          {units.map((u) => {
            const d = u.lessons.filter((l) => done.has(l.id)).length
            return (
              <div key={u.id} className="flex items-center gap-3 text-sm">
                <span className="w-6 text-center">{u.emoji}</span>
                <span className="w-40 truncate text-stone-600 dark:text-stone-300">{u.title}</span>
                <ProgressBar value={d / u.lessons.length} />
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}

function Stat({ value, label }: { value: number | string; label: string }) {
  return (
    <div>
      <p className="text-2xl font-bold tabular-nums">{value}</p>
      <p className="text-xs text-stone-500">{label}</p>
    </div>
  )
}
