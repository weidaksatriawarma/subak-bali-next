"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/lib/i18n/language-context"
import { landingExtras } from "@/lib/i18n/content/landing-extras"
import { useCookieConsent } from "@/hooks/use-cookie-consent"

export function CookieConsent() {
  const { status, accept, decline } = useCookieConsent()
  const { locale } = useTranslation()
  const d = landingExtras[locale].cookieConsent

  if (status !== null) return null

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
        <div className="flex shrink-0 gap-2">
          <Button size="sm" variant="outline" onClick={decline}>
            {d.decline}
          </Button>
          <Button size="sm" onClick={accept}>
            {d.accept}
          </Button>
        </div>
      </div>
    </div>
  )
}
