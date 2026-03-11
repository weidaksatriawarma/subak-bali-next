"use client"

import { useCallback, useMemo, useSyncExternalStore } from "react"
import {
  type ConsentDetails,
  getConsentDetails,
  setConsentDetails,
  clearFunctionalStorage,
  clearAnalyticsStorage,
  CONSENT_KEY,
} from "@/lib/cookie-consent"

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback)
  return () => window.removeEventListener("storage", callback)
}

// Return the raw string so useSyncExternalStore can compare with Object.is()
function getRawSnapshot(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem(CONSENT_KEY)
}

function getServerSnapshot(): string | null {
  return null
}

export function useCookieConsent() {
  const raw = useSyncExternalStore(subscribe, getRawSnapshot, getServerSnapshot)

  const hasResponded = raw !== null

  const details = useMemo<ConsentDetails | null>(() => {
    if (raw === null) return null
    return getConsentDetails()
  }, [raw])

  const acceptAll = useCallback(() => {
    setConsentDetails({ functional: true, analytics: true })
  }, [])

  const acceptSelected = useCallback((d: ConsentDetails) => {
    setConsentDetails(d)
  }, [])

  const declineAll = useCallback(() => {
    setConsentDetails({ functional: false, analytics: false })
    clearFunctionalStorage()
    clearAnalyticsStorage()
  }, [])

  const reset = useCallback(() => {
    localStorage.removeItem(CONSENT_KEY)
    clearFunctionalStorage()
    clearAnalyticsStorage()
    window.dispatchEvent(new StorageEvent("storage"))
  }, [])

  return { details, hasResponded, acceptAll, acceptSelected, declineAll, reset }
}
