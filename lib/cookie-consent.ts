export const CONSENT_KEY = "subakhijau-cookie-consent"

export type ConsentStatus = "accepted" | "declined"

export function getConsentStatus(): ConsentStatus | null {
  if (typeof window === "undefined") return null
  const value = localStorage.getItem(CONSENT_KEY)
  if (value === "accepted" || value === "declined") return value
  return null
}

export function setConsentStatus(status: ConsentStatus): void {
  localStorage.setItem(CONSENT_KEY, status)
  window.dispatchEvent(new StorageEvent("storage"))
}

export function isFunctionalCookiesAllowed(): boolean {
  return getConsentStatus() === "accepted"
}

export function clearFunctionalStorage(): void {
  localStorage.removeItem("subakhijau-locale")
  localStorage.removeItem("theme")
  localStorage.removeItem("assessment-draft")
  document.cookie = "sidebar_state=; path=/; max-age=0"
}
