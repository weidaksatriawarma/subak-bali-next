"use client"

import {
  createContext,
  useContext,
  useSyncExternalStore,
  useCallback,
  type ReactNode,
} from "react"
import { dictionaries, type Dictionary, type Locale } from "./dictionaries"
import { isFunctionalCookiesAllowed } from "@/lib/cookie-consent"

interface LanguageContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: Dictionary
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

const STORAGE_KEY = "subakhijau-locale"

let transientLocale: Locale | null = null

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback)
  return () => window.removeEventListener("storage", callback)
}

function getSnapshot(): Locale {
  if (!isFunctionalCookiesAllowed()) {
    return transientLocale ?? "en"
  }
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored === "en" || stored === "id" ? stored : "en"
}

function getServerSnapshot(): Locale {
  return "en"
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const setLocale = useCallback((next: Locale) => {
    if (isFunctionalCookiesAllowed()) {
      localStorage.setItem(STORAGE_KEY, next)
    } else {
      transientLocale = next
    }
    window.dispatchEvent(new StorageEvent("storage"))
  }, [])

  return (
    <LanguageContext value={{ locale, setLocale, t: dictionaries[locale] }}>
      {children}
    </LanguageContext>
  )
}

/** Forces English locale for all children — used in dashboard layout */
export function DashboardLanguageProvider({
  children,
}: {
  children: ReactNode
}) {
  const setLocale = useCallback(() => {}, [])

  return (
    <LanguageContext value={{ locale: "en", setLocale, t: dictionaries["en"] }}>
      {children}
    </LanguageContext>
  )
}

export function useTranslation() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error("useTranslation must be used within LanguageProvider")
  }
  return ctx
}
