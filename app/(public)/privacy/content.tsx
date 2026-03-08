"use client"

import { useTranslation } from "@/lib/i18n/language-context"
import { legalContent } from "@/lib/i18n/content/legal"

export function PrivacyContent() {
  const { locale } = useTranslation()
  const d = legalContent[locale].privacy

  return (
    <div className="mx-auto max-w-3xl px-4">
      <h1 className="mb-2 text-3xl font-bold tracking-tight">{d.title}</h1>
      <p className="mb-6 text-sm text-muted-foreground">{d.lastUpdated}</p>
      <p className="mb-8 text-muted-foreground">{d.intro}</p>
      {d.sections.map((section, i) => (
        <div key={i} className="mb-8">
          <h2 className="mb-3 text-xl font-semibold">{section.title}</h2>
          {section.content.map((paragraph, j) => (
            <p key={j} className="mb-2 text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </div>
      ))}
    </div>
  )
}
