"use client"

import { Languages } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/lib/i18n/language-context"

export function LanguageSwitcher() {
  const { locale, setLocale } = useTranslation()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLocale(locale === "id" ? "en" : "id")}
      aria-label="Switch language"
    >
      <Languages className="size-4" />
      {locale === "id" ? "EN" : "ID"}
    </Button>
  )
}
