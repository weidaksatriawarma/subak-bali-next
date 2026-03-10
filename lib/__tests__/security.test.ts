import { describe, it, expect, vi } from "vitest"
import {
  rateLimit,
  sanitizeRedirectPath,
  sanitizeForPrompt,
  timingSafeEqual,
} from "@/lib/security"

describe("rateLimit", () => {
  it("allows the first request", () => {
    const id = `test-${Date.now()}-${Math.random()}`
    const result = rateLimit(id, { maxRequests: 5, windowMs: 60000 })
    expect(result.success).toBe(true)
    expect(result.remaining).toBe(4)
  })

  it("tracks count correctly across requests", () => {
    const id = `test-count-${Date.now()}-${Math.random()}`
    const opts = { maxRequests: 3, windowMs: 60000 }

    const r1 = rateLimit(id, opts)
    expect(r1.success).toBe(true)
    expect(r1.remaining).toBe(2)

    const r2 = rateLimit(id, opts)
    expect(r2.success).toBe(true)
    expect(r2.remaining).toBe(1)

    const r3 = rateLimit(id, opts)
    expect(r3.success).toBe(true)
    expect(r3.remaining).toBe(0)
  })

  it("returns false when limit is exceeded", () => {
    const id = `test-exceed-${Date.now()}-${Math.random()}`
    const opts = { maxRequests: 2, windowMs: 60000 }

    rateLimit(id, opts) // 1
    rateLimit(id, opts) // 2
    const r3 = rateLimit(id, opts) // 3 — exceeds
    expect(r3.success).toBe(false)
    expect(r3.remaining).toBe(0)
  })

  it("resets after window expires", () => {
    vi.useFakeTimers()
    const id = `test-reset-${Date.now()}-${Math.random()}`
    const opts = { maxRequests: 1, windowMs: 50 }

    const r1 = rateLimit(id, opts)
    expect(r1.success).toBe(true)

    const r2 = rateLimit(id, opts)
    expect(r2.success).toBe(false)

    // Advance time past the window
    vi.advanceTimersByTime(100)

    const r3 = rateLimit(id, opts)
    expect(r3.success).toBe(true)

    vi.useRealTimers()
  })
})

describe("sanitizeRedirectPath", () => {
  it("allows /dashboard", () => {
    expect(sanitizeRedirectPath("/dashboard")).toBe("/dashboard")
  })

  it("allows /dashboard/score", () => {
    expect(sanitizeRedirectPath("/dashboard/score")).toBe("/dashboard/score")
  })

  it("allows /onboarding", () => {
    expect(sanitizeRedirectPath("/onboarding")).toBe("/onboarding")
  })

  it("allows /login", () => {
    expect(sanitizeRedirectPath("/login")).toBe("/login")
  })

  it("allows /register", () => {
    expect(sanitizeRedirectPath("/register")).toBe("/register")
  })

  it("returns /dashboard for invalid path without leading slash", () => {
    expect(sanitizeRedirectPath("dashboard")).toBe("/dashboard")
  })

  it("returns /dashboard for protocol-relative URL //", () => {
    expect(sanitizeRedirectPath("//evil.com")).toBe("/dashboard")
  })

  it("returns /dashboard for non-whitelisted paths", () => {
    expect(sanitizeRedirectPath("/admin")).toBe("/dashboard")
  })

  it("returns /dashboard for external URLs", () => {
    expect(sanitizeRedirectPath("https://evil.com")).toBe("/dashboard")
  })

  it("returns /dashboard for root path", () => {
    expect(sanitizeRedirectPath("/")).toBe("/dashboard")
  })

  it("returns /dashboard for empty string", () => {
    expect(sanitizeRedirectPath("")).toBe("/dashboard")
  })
})

describe("sanitizeForPrompt", () => {
  it("removes newlines and replaces with spaces", () => {
    expect(sanitizeForPrompt("hello\nworld")).toBe("hello world")
    expect(sanitizeForPrompt("hello\r\nworld")).toBe("hello world")
  })

  it("removes non-unicode characters", () => {
    // Control characters should be removed
    const input = "hello\x00world"
    const result = sanitizeForPrompt(input)
    expect(result).not.toContain("\x00")
  })

  it("trims whitespace", () => {
    expect(sanitizeForPrompt("  hello  ")).toBe("hello")
  })

  it("respects maxLength", () => {
    const long = "a".repeat(300)
    expect(sanitizeForPrompt(long, 100).length).toBe(100)
  })

  it("uses default maxLength of 200", () => {
    const long = "a".repeat(300)
    expect(sanitizeForPrompt(long).length).toBe(200)
  })

  it("preserves valid unicode (Indonesian text)", () => {
    const input = "Bisnis saya menjual kopi Bali"
    expect(sanitizeForPrompt(input)).toBe(input)
  })
})

describe("timingSafeEqual", () => {
  it("returns true for equal strings", () => {
    expect(timingSafeEqual("hello", "hello")).toBe(true)
  })

  it("returns false for different strings of same length", () => {
    expect(timingSafeEqual("hello", "world")).toBe(false)
  })

  it("returns false for different length strings", () => {
    expect(timingSafeEqual("short", "longer string")).toBe(false)
  })

  it("returns true for empty strings", () => {
    expect(timingSafeEqual("", "")).toBe(true)
  })

  it("returns false for empty vs non-empty", () => {
    expect(timingSafeEqual("", "a")).toBe(false)
  })
})
