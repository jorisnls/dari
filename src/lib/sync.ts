import { useSyncExternalStore } from 'react'
import { db, rowId, setMeta, type SyncKind, type SyncRow } from './db'
import { supabase } from './supabase'

export interface RemoteRow {
  kind: SyncKind
  key: string
  data: unknown
  updated_at: number
}

/**
 * Last-write-wins merge. Returns the rows to store locally and the rows to push.
 * Equal timestamps are considered in sync.
 */
export function merge(local: SyncRow[], remote: RemoteRow[]) {
  const localById = new Map(local.map((r) => [r.id, r]))
  const remoteById = new Map(remote.map((r) => [rowId(r.kind, r.key), r]))

  const toLocal: SyncRow[] = []
  for (const [id, r] of remoteById) {
    const l = localById.get(id)
    if (!l || r.updated_at > l.updatedAt) {
      toLocal.push({ id, kind: r.kind, key: r.key, data: r.data, updatedAt: r.updated_at, dirty: 0 })
    }
  }

  const toPush: SyncRow[] = []
  for (const [id, l] of localById) {
    const r = remoteById.get(id)
    if (!r || l.updatedAt > r.updated_at) toPush.push(l)
  }

  return { toLocal, toPush }
}

// ---- status store for the UI ----

export type SyncStatus =
  | { state: 'off' }
  | { state: 'idle'; lastSync?: number }
  | { state: 'syncing' }
  | { state: 'error'; message: string }

let status: SyncStatus = { state: supabase ? 'idle' : 'off' }
const listeners = new Set<() => void>()

function setStatus(s: SyncStatus) {
  status = s
  listeners.forEach((l) => l())
}

export function useSyncStatus() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l)
      return () => listeners.delete(l)
    },
    () => status,
  )
}

// ---- the actual sync ----

const PAGE = 1000
let running: Promise<void> | null = null

async function pullAll(): Promise<RemoteRow[]> {
  const out: RemoteRow[] = []
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await supabase!
      .from('sync_items')
      .select('kind,key,data,updated_at')
      .range(from, from + PAGE - 1)
    if (error) throw error
    out.push(...(data as RemoteRow[]))
    if (data.length < PAGE) return out
  }
}

async function doSync() {
  const { data: session } = await supabase!.auth.getSession()
  if (!session.session) {
    setStatus({ state: 'idle' })
    return
  }
  const userId = session.session.user.id
  setStatus({ state: 'syncing' })
  try {
    const remote = await pullAll()
    const local = await db.rows.toArray()
    const { toLocal, toPush } = merge(local, remote)

    // Re-check inside the transaction so a review made during the pull is never overwritten.
    await db.transaction('rw', db.rows, async () => {
      for (const r of toLocal) {
        const cur = await db.rows.get(r.id)
        if (!cur || cur.updatedAt < r.updatedAt) await db.rows.put(r)
      }
    })

    for (let i = 0; i < toPush.length; i += 500) {
      const chunk = toPush.slice(i, i + 500)
      const { error } = await supabase!.from('sync_items').upsert(
        chunk.map((r) => ({ user_id: userId, kind: r.kind, key: r.key, data: r.data, updated_at: r.updatedAt })),
        { onConflict: 'user_id,kind,key' },
      )
      if (error) throw error
      // Clear the dirty flag only where nothing changed while we were pushing.
      await db.transaction('rw', db.rows, async () => {
        for (const r of chunk) {
          const cur = await db.rows.get(r.id)
          if (cur && cur.updatedAt === r.updatedAt) await db.rows.update(r.id, { dirty: 0 })
        }
      })
    }

    const now = Date.now()
    await setMeta('lastSync', now)
    setStatus({ state: 'idle', lastSync: now })
  } catch (e) {
    setStatus({ state: 'error', message: e instanceof Error ? e.message : String(e) })
  }
}

/** Runs a sync unless one is already in flight. Safe to call often. */
export function syncNow(): Promise<void> {
  if (!supabase) return Promise.resolve()
  if (!running) running = doSync().finally(() => (running = null))
  return running
}

/** Sync on start, when the app comes back to the foreground and when going online. */
export function startAutoSync() {
  if (!supabase) return
  syncNow()
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') syncNow()
  })
  window.addEventListener('online', () => syncNow())
  supabase.auth.onAuthStateChange((event) => {
    if (event === 'SIGNED_IN') syncNow()
  })
}
