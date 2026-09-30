import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

/** null when the app was built without Supabase credentials: everything then stays local. */
export const supabase: SupabaseClient | null = url && key ? createClient(url, key) : null
