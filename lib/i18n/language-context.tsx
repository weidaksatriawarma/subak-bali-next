"use client"

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react"
import { dictionaries, type Dictionary, type Locale } from "./dictionaries"

interface LanguageContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: Dictionary
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

const STORAGE_KEY = "greenadvisor-locale"

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("id")

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === "en" || stored === "id") {
      setLocaleState(stored)
    }
  }, [])

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    localStorage.setItem(STORAGE_KEY, next)
  }, [])

  return (
    <LanguageContext value={{ locale, setLocale, t: dictionaries[locale] }}>
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
