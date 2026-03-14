export const CONSENT_KEY = "subakhijau-cookie-consent"

export interface ConsentDetails {
  functional: boolean
  analytics: boolean
}

// Parse stored value, handling backward compat with old "accepted"/"declined" strings
export function getConsentDetails(): ConsentDetails | null {
  if (typeof window === "undefined") return null
  const raw = localStorage.getItem(CONSENT_KEY)
  if (!raw) return null
  // Backward compat: old binary format
  if (raw === "accepted") return { functional: true, analytics: false }
  if (raw === "declined") return { functional: false, analytics: false }
  try {
    const parsed = JSON.parse(raw)
    if (
      typeof parsed.functional === "boolean" &&
      typeof parsed.analytics === "boolean"
    ) {
      return parsed as ConsentDetails
    }
  } catch {
    /* invalid JSON, treat as no consent */
  }
  return null
}

export function setConsentDetails(details: ConsentDetails): void {
  localStorage.setItem(CONSENT_KEY, JSON.stringify(details))
  if (!details.functional) clearFunctionalStorage()
  if (!details.analytics) clearAnalyticsStorage()
  window.dispatchEvent(new StorageEvent("storage"))
}

export function hasRespondedToConsent(): boolean {
  if (typeof window === "undefined") return false
  return localStorage.getItem(CONSENT_KEY) !== null
}

export function isFunctionalCookiesAllowed(): boolean {
  return getConsentDetails()?.functional ?? false
}

export function isAnalyticsCookiesAllowed(): boolean {
  return getConsentDetails()?.analytics ?? false
}

export function clearFunctionalStorage(): void {
  localStorage.removeItem("subakhijau-locale")
  localStorage.removeItem("theme")
  localStorage.removeItem("assessment-draft")
  document.cookie = "sidebar_state=; path=/; max-age=0"
}

export function clearUserStorage(): void {
  // User-specific localStorage
  localStorage.removeItem("subakhijau-locale")
  localStorage.removeItem("subakhijau-tour-completed")
  localStorage.removeItem("subakhijau-onboarding-carousel-done")
  localStorage.removeItem("subakhijau-journey-dismissed")
  localStorage.removeItem("subakhijau-notifications")
  localStorage.removeItem("assessment-draft")
  localStorage.removeItem("theme")

  // Clear all nudge dismissal keys (pattern: subakhijau-nudge-dismissed-*)
  const keysToRemove: string[] = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key?.startsWith("subakhijau-nudge-dismissed-")) {
      keysToRemove.push(key)
    }
  }
  keysToRemove.forEach((key) => localStorage.removeItem(key))

  // Clear sessionStorage (chat widget seen state)
  sessionStorage.clear()

  // Clear sidebar cookie
  document.cookie = "sidebar_state=; path=/; max-age=0"

  // Clear service worker cache
  if ("caches" in window) {
    caches.keys().then((keys) => keys.forEach((key) => caches.delete(key)))
  }
}

export function clearAnalyticsStorage(): void {
  // Clear GA4 cookies
  const gaCookies = document.cookie.split(";").map((c) => c.trim())
  for (const cookie of gaCookies) {
    const name = cookie.split("=")[0]
    if (name === "_ga" || name.startsWith("_ga_") || name === "_gid") {
      document.cookie = `${name}=; path=/; max-age=0; domain=${window.location.hostname}`
      document.cookie = `${name}=; path=/; max-age=0`
    }
  }
}
