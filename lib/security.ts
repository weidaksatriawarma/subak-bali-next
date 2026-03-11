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

const INJECTION_PATTERNS =
  /ignore\s+previous\s+instructions|system\s+override|act\s+as\b|disregard\s+(all|above|previous)|new\s+instructions|```/gi

export function sanitizeForPrompt(input: string, maxLength = 200): string {
  return input
    .replace(/[\r\n]+/g, " ") // collapse newlines to spaces
    .replace(/[^\p{L}\p{N}\p{P}\p{Z}]/gu, "") // keep letters, numbers, punctuation, spaces
    .replace(INJECTION_PATTERNS, "") // strip prompt injection patterns
    .trim()
    .slice(0, maxLength)
}

export function sanitizeObjectForPrompt(
  obj: Record<string, unknown>
): Record<string, unknown> {
  const result: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "string") {
      result[key] = sanitizeForPrompt(value, 500)
    } else if (Array.isArray(value)) {
      result[key] = value.map((item) =>
        typeof item === "string"
          ? sanitizeForPrompt(item, 500)
          : typeof item === "object" && item !== null
            ? sanitizeObjectForPrompt(item as Record<string, unknown>)
            : item
      )
    } else if (typeof value === "object" && value !== null) {
      result[key] = sanitizeObjectForPrompt(value as Record<string, unknown>)
    } else {
      result[key] = value
    }
  }
  return result
}

// --- Timing-Safe Comparison ---

export function timingSafeEqual(a: string, b: string): boolean {
  const hmacA = crypto
    .createHmac("sha256", "timing-safe-pad")
    .update(a)
    .digest()
  const hmacB = crypto
    .createHmac("sha256", "timing-safe-pad")
    .update(b)
    .digest()
  const equal = crypto.timingSafeEqual(hmacA, hmacB)
  return equal && a.length === b.length
}

// --- CSRF Origin Validation ---

export function validateOrigin(req: Request): boolean {
  const origin = req.headers.get("origin")
  // No origin header = same-origin request (browser doesn't send it)
  if (!origin) return true
  const allowed = ["https://subakhijau.app", "https://www.subakhijau.app"]
  if (process.env.NODE_ENV === "development") {
    allowed.push("http://localhost:3000")
  }
  return allowed.includes(origin)
}

// --- Error Logging ---

export function logError(tag: string, err: unknown): void {
  const message = err instanceof Error ? err.message : "Unknown error"
  console.error(`[${tag}] ${message}`)
}
