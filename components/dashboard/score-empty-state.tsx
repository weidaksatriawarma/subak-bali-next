"use client"

import { ClipboardList } from "lucide-react"
import { useTranslation } from "@/lib/i18n/language-context"
import { EmptyState } from "@/components/shared/empty-state"

export function ScoreEmptyState() {
  const { t } = useTranslation()
  const sp = t.dashboard.scorePage

  return (
    <EmptyState
      icon={ClipboardList}
      title={sp.emptyTitle}
      description={sp.emptyDescription}
      actionLabel={sp.startAssessment}
      actionHref="/dashboard/assessment"
    />
  )
}
