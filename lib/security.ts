import { NextResponse } from "next/server"
import crypto from "crypto"

// --- Rate Limiting (in-memory, suitable for single-server / competition) ---

interface RateLimitEntry {
  count: number
  resetAt: number
}

const rateLimitStore = new Map<string, RateLimitEntry>()

// Clean up expired entries every 5 minutes
setInterval(
  () => {
    const now = Date.now()
    for (const [key, entry] of rateLimitStore) {
      if (now > entry.resetAt) {
        rateLimitStore.delete(key)
      }
    }
  },
  5 * 60 * 1000
).unref?.()

export function rateLimit(
  identifier: string,
  { maxRequests, windowMs }: { maxRequests: number; windowMs: number }
): { success: boolean; remaining: number } {
  const now = Date.now()
  const entry = rateLimitStore.get(identifier)

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(identifier, { count: 1, resetAt: now + windowMs })
    return { success: true, remaining: maxRequests - 1 }
  }

  entry.count++
  const remaining = Math.max(0, maxRequests - entry.count)

  if (entry.count > maxRequests) {
    return { success: false, remaining: 0 }
  }

  return { success: true, remaining }
}

export function rateLimitResponse() {
  return NextResponse.json(
    { error: "Terlalu banyak permintaan. Silakan coba lagi nanti." },
    { status: 429 }
  )
}

// --- Redirect Validation ---

const ALLOWED_REDIRECT_PREFIXES = [
  "/dashboard",
  "/onboarding",
  "/login",
  "/register",
]

export function sanitizeRedirectPath(path: string): string {
  // Must start with exactly one "/" and not "//" (protocol-relative URL)
  if (!path.startsWith("/") || path.startsWith("//")) {
    return "/dashboard"
  }

  // Check against whitelist
  const matches = ALLOWED_REDIRECT_PREFIXES.some(
    (prefix) => path === prefix || path.startsWith(prefix + "/")
  )

  return matches ? path : "/dashboard"
}

// --- Prompt Input Sanitization ---

export function sanitizeForPrompt(input: string, maxLength = 200): string {
  return input
    .replace(/[\r\n]+/g, " ") // collapse newlines to spaces
    .replace(/[^\p{L}\p{N}\p{P}\p{Z}]/gu, "") // keep letters, numbers, punctuation, spaces
    .trim()
    .slice(0, maxLength)
}

// --- Timing-Safe Comparison ---

export function timingSafeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a)
  const bufB = Buffer.from(b)
  if (bufA.length !== bufB.length) {
    // Compare against self to prevent length-based timing leaks
    crypto.timingSafeEqual(bufA, bufA)
    return false
  }
  return crypto.timingSafeEqual(bufA, bufB)
}
