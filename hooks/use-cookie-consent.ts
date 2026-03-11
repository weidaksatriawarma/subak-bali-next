"use client"

import { useCallback, useSyncExternalStore } from "react"
import {
  type ConsentDetails,
  getConsentDetails,
  setConsentDetails,
  hasRespondedToConsent,
  clearFunctionalStorage,
  clearAnalyticsStorage,
  CONSENT_KEY,
} from "@/lib/cookie-consent"

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback)
  return () => window.removeEventListener("storage", callback)
}

function getDetailsSnapshot(): ConsentDetails | null {
  return getConsentDetails()
}

function getRespondedSnapshot(): boolean {
  return hasRespondedToConsent()
}

function getServerDetails(): ConsentDetails | null {
  return null
}
function getServerResponded(): boolean {
  return false
}

export function useCookieConsent() {
  const details = useSyncExternalStore(
    subscribe,
    getDetailsSnapshot,
    getServerDetails
  )
  const hasResponded = useSyncExternalStore(
    subscribe,
    getRespondedSnapshot,
    getServerResponded
  )

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
