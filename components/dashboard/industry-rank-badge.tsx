"use client"

import { useTranslation } from "@/lib/i18n/language-context"
import { getIndustryRank } from "@/lib/gamification/industry-data"
import type { Industry } from "@/types/database"

interface IndustryRankBadgeProps {
  industry: Industry
  score: number
  compact?: boolean
}

const TIER_BG = [
  "bg-red-100 dark:bg-red-900/30",
  "bg-orange-100 dark:bg-orange-900/30",
  "bg-yellow-100 dark:bg-yellow-900/30",
  "bg-green-100 dark:bg-green-900/30",
  "bg-emerald-100 dark:bg-emerald-900/30",
]

const TIER_TEXT = [
  "text-red-700 dark:text-red-400",
  "text-orange-700 dark:text-orange-400",
  "text-yellow-700 dark:text-yellow-400",
  "text-green-700 dark:text-green-400",
  "text-emerald-700 dark:text-emerald-400",
]

const TIER_EMOJIS = [
  "\u{1F331}",
  "\u{1F33F}",
  "\u{1F333}",
  "\u{1F332}",
  "\u{1F3C6}",
]

export function IndustryRankBadge({
  industry,
  score,
  compact = false,
}: IndustryRankBadgeProps) {
  const { t } = useTranslation()
  const g = t.dashboard.gamification.industryRank
  const { rank, tier } = getIndustryRank(industry, score)

  if (compact) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${TIER_BG[tier]} ${TIER_TEXT[tier]}`}
      >
        {TIER_EMOJIS[tier]} {rank}
      </span>
    )
  }

  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex size-10 items-center justify-center rounded-full text-xl ${TIER_BG[tier]} ${TIER_TEXT[tier]}`}
      >
        {TIER_EMOJIS[tier]}
      </div>
      <div>
        <p className="text-xs text-muted-foreground">{g.yourRank}</p>
        <p className={`font-semibold ${TIER_TEXT[tier]}`}>{rank}</p>
      </div>
    </div>
  )
}
