"use client"

import { useCallback, useSyncExternalStore } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/lib/i18n/language-context"
import { landingExtras } from "@/lib/i18n/content/landing-extras"

const CONSENT_KEY = "greenadvisor-cookie-consent"

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback)
  return () => window.removeEventListener("storage", callback)
}

function getSnapshot(): boolean {
  return localStorage.getItem(CONSENT_KEY) !== null
}

function getServerSnapshot(): boolean {
  return true
}

export function CookieConsent() {
  const hasConsented = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  )
  const { locale } = useTranslation()
  const d = landingExtras[locale].cookieConsent

  const accept = useCallback(() => {
    localStorage.setItem(CONSENT_KEY, "accepted")
    window.dispatchEvent(new StorageEvent("storage"))
  }, [])

  if (hasConsented) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t bg-background/95 px-4 py-3 backdrop-blur-md sm:px-6">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <p className="text-center text-sm text-muted-foreground sm:text-left">
          {d.text}{" "}
          <Link
            href="/cookies"
            className="font-medium text-foreground underline underline-offset-4"
          >
            {d.learnMore}
          </Link>
          .
        </p>
        <Button size="sm" onClick={accept} className="shrink-0">
          {d.accept}
        </Button>
      </div>
    </div>
  )
}
