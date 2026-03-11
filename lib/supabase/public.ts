import { createClient } from "@supabase/supabase-js"

/**
 * Plain Supabase client for Edge runtime / public use.
 * No cookies or SSR — works in OG image routes where `cookies()` is unavailable.
 * Uses anon key; relies on SECURITY DEFINER RPC functions for data access.
 */
export function createPublicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
