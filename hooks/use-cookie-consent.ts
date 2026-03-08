"use client"

import { useCallback, useSyncExternalStore } from "react"
import {
  type ConsentStatus,
  getConsentStatus,
  setConsentStatus,
  clearFunctionalStorage,
  CONSENT_KEY,
} from "@/lib/cookie-consent"

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback)
  return () => window.removeEventListener("storage", callback)
}

function getSnapshot(): ConsentStatus | null {
  return getConsentStatus()
}

function getServerSnapshot(): ConsentStatus | null {
  return null
}

export function useCookieConsent() {
  const status = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const accept = useCallback(() => {
    setConsentStatus("accepted")
  }, [])

  const decline = useCallback(() => {
    setConsentStatus("declined")
    clearFunctionalStorage()
  }, [])

  const reset = useCallback(() => {
    localStorage.removeItem(CONSENT_KEY)
    clearFunctionalStorage()
    window.dispatchEvent(new StorageEvent("storage"))
  }, [])

  return { status, accept, decline, reset }
}
