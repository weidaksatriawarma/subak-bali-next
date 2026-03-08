"use client"

import {
  CATEGORY_LABELS,
  CATEGORY_EMOJI,
  getScoreFeedback,
} from "@/lib/constants"
import type { Category } from "@/types/database"

interface CategoryBarsProps {
  scores: Record<Category, number>
}

function getBarColor(score: number): string {
  if (score < 30) return "from-red-500 to-red-400"
  if (score < 60) return "from-orange-500 to-amber-400"
  return "from-green-500 to-emerald-400"
}

export function CategoryBars({ scores }: CategoryBarsProps) {
  const categories = Object.keys(CATEGORY_LABELS) as Category[]

  return (
    <div className="space-y-4">
      {categories.map((cat) => {
        const score = scores[cat]
        return (
          <div key={cat} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">
                {CATEGORY_EMOJI[cat]} {CATEGORY_LABELS[cat]}
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
              {getScoreFeedback(score)}
            </p>
          </div>
        )
      })}
    </div>
  )
}
