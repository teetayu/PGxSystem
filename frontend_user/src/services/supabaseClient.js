import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// If env vars are missing, create a harmless stub to avoid runtime exceptions
let _supabase

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is missing. Supabase features will not work until you set them.'
  )

  // Minimal stub implementing the pieces the app uses. Methods return
  // predictable values (null session) or an error object so callers can
  // handle the absence of a real Supabase client gracefully.
  _supabase = {
    auth: {
      getSession: async () => ({ data: { session: null } }),
      signInWithPassword: async () => ({ error: new Error('Supabase not configured') }),
      signOut: async () => ({}),
      onAuthStateChange: (_callback) => ({ data: { subscription: { unsubscribe: () => {} } } })
    },
    // storage/from used by future services; provide a simple stub shape
    storage: {
      from: () => ({
        upload: async () => ({ error: new Error('Supabase not configured') }),
        download: async () => ({ error: new Error('Supabase not configured') })
      })
    },
    from: () => ({
      insert: async () => ({ error: new Error('Supabase not configured') })
    })
  }
} else {
  _supabase = createClient(supabaseUrl, supabaseAnonKey)
}

export const supabase = _supabase
