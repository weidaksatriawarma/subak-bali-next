"use client"

import { useTranslation } from "@/lib/i18n/language-context"
import { CATEGORY_EMOJI } from "@/lib/constants"
import type { Category } from "@/types/database"

interface CategoryBarsProps {
  scores: Record<Category, number>
}

function getBarColor(score: number): string {
  if (score < 30) return "from-red-500 to-red-400"
  if (score < 60) return "from-orange-500 to-amber-400"
  return "from-green-500 to-emerald-400"
}

function getScoreFeedbackT(
  score: number,
  feedback: { low: string; medium: string; good: string; excellent: string }
): string {
  if (score < 30) return feedback.low
  if (score < 60) return feedback.medium
  if (score < 80) return feedback.good
  return feedback.excellent
}

export function CategoryBars({ scores }: CategoryBarsProps) {
  const { t } = useTranslation()
  const cats = t.dashboard.common.categories
  const feedback = t.dashboard.common.scoreFeedback
  const categories = Object.keys(cats) as Category[]

  return (
    <div className="space-y-4">
      {categories.map((cat) => {
        const score = scores[cat]
        return (
          <div key={cat} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">
                {CATEGORY_EMOJI[cat]} {cats[cat]}
              </span>
              <span className="font-bold">{score}</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${getBarColor(score)} animate-bar-grow`}
                style={
                  {
                    "--bar-width": `${score}%`,
                  } as React.CSSProperties
                }
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {getScoreFeedbackT(score, feedback)}
            </p>
          </div>
        )
      })}
    </div>
  )
}
