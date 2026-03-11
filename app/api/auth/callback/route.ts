import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { sanitizeRedirectPath } from "@/lib/security"

function getRedirectOrigin(request: Request): string {
  const forwardedHost = request.headers.get("x-forwarded-host")
  const forwardedProto = request.headers.get("x-forwarded-proto") ?? "https"
  if (forwardedHost && process.env.NODE_ENV !== "development") {
    return `${forwardedProto}://${forwardedHost}`
  }
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL
  }
  return new URL(request.url).origin
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const origin = getRedirectOrigin(request)
  const code = searchParams.get("code")
  const next = sanitizeRedirectPath(searchParams.get("next") ?? "/dashboard")

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
    console.error("[auth callback]", error.message)
  }

  return NextResponse.redirect(`${origin}/login?error=auth_failed`)
}
