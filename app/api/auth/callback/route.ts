import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
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
    const cookieStore = await cookies()
    const cookiesToForward: {
      name: string
      value: string
      options: Record<string, unknown>
    }[] = []

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
            cookiesToForward.push(...cookiesToSet)
          },
        },
      }
    )

    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      const response = NextResponse.redirect(`${origin}${next}`)
      cookiesToForward.forEach(({ name, value, options }) => {
        response.cookies.set(name, value, options)
      })
      return response
    }
    console.error("[auth callback]", error.message)
  }

  return NextResponse.redirect(`${origin}/login?error=auth_failed`)
}
