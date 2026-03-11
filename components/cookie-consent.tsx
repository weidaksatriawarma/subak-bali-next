"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useTranslation } from "@/lib/i18n/language-context"
import { landingExtras } from "@/lib/i18n/content/landing-extras"
import { useCookieConsent } from "@/hooks/use-cookie-consent"

export function CookieConsent() {
  const { hasResponded, acceptAll, acceptSelected, declineAll } =
    useCookieConsent()
  const { locale } = useTranslation()
  const d = landingExtras[locale].cookieConsent
  const [showDetails, setShowDetails] = useState(false)
  const [functional, setFunctional] = useState(true)
  const [analytics, setAnalytics] = useState(false)

  if (hasResponded) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t bg-background/95 px-4 py-3 backdrop-blur-md sm:px-6">
      <div className="mx-auto max-w-5xl space-y-3">
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
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
            <Button size="sm" variant="outline" onClick={declineAll}>
              {d.decline}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowDetails(!showDetails)}
            >
              {d.manage}
            </Button>
            <Button size="sm" onClick={acceptAll}>
              {d.accept}
            </Button>
          </div>
        </div>

        {showDetails && (
          <div className="space-y-3 border-t pt-3">
            {/* Essential */}
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-sm font-medium">{d.essential.label}</p>
                <p className="text-xs text-muted-foreground">
                  {d.essential.description}
                </p>
              </div>
              <span className="shrink-0 text-xs font-medium text-muted-foreground">
                {d.alwaysOn}
              </span>
            </div>

            {/* Functional */}
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-sm font-medium">{d.functional.label}</p>
                <p className="text-xs text-muted-foreground">
                  {d.functional.description}
                </p>
              </div>
              <Switch checked={functional} onCheckedChange={setFunctional} />
            </div>

            {/* Analytics */}
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-sm font-medium">{d.analytics.label}</p>
                <p className="text-xs text-muted-foreground">
                  {d.analytics.description}
                </p>
              </div>
              <Switch checked={analytics} onCheckedChange={setAnalytics} />
            </div>

            <div className="flex justify-end">
              <Button
                size="sm"
                onClick={() => acceptSelected({ functional, analytics })}
              >
                {d.save}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
