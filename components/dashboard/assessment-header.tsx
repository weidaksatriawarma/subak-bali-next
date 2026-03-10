"use client"

import { useTranslation } from "@/lib/i18n/language-context"

export function AssessmentHeader() {
  const { t } = useTranslation()
  const ap = t.dashboard.assessmentPage

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">{ap.title}</h1>
      <p className="text-muted-foreground">{ap.description}</p>
    </div>
  )
}
