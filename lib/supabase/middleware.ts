import { createServerClient } from "@supabase/ssr"
import { type NextRequest, NextResponse } from "next/server"

// Inline rate-limit store for Edge Runtime (cannot import crypto-dependent security.ts)
const verifyRateStore = new Map<string, { count: number; resetAt: number }>()

function verifyRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = verifyRateStore.get(ip)
  if (!entry || now > entry.resetAt) {
    verifyRateStore.set(ip, { count: 1, resetAt: now + 60_000 })
    return true
  }
  entry.count++
  return entry.count <= 20
}

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request })

  // Rate-limit certificate verification by IP
  if (request.nextUrl.pathname.startsWith("/verify/")) {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
    if (!verifyRateLimit(ip)) {
      return new NextResponse("Too Many Requests", { status: 429 })
    }
    return response
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    return response
  }

  try {
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    })

    const {
      data: { user },
    } = await supabase.auth.getUser()

    // Protect dashboard routes
    if (request.nextUrl.pathname.startsWith("/dashboard") && !user) {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    // Protect onboarding route
    if (request.nextUrl.pathname.startsWith("/onboarding") && !user) {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    // Redirect logged-in users away from auth pages
    if (
      (request.nextUrl.pathname === "/login" ||
        request.nextUrl.pathname === "/register") &&
      user
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown middleware error"
    console.error(`[middleware] ${message}`)
    // On auth failure for protected routes, redirect to login
    if (
      request.nextUrl.pathname.startsWith("/dashboard") ||
      request.nextUrl.pathname.startsWith("/onboarding")
    ) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  return response
}
