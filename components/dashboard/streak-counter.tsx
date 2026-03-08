"use client"

import { useRef, useCallback } from "react"
import { Flame } from "lucide-react"
import { useTranslation } from "@/lib/i18n/language-context"
import type { StreakResult } from "@/lib/gamification/streaks"

interface StreakCounterProps {
  streak: StreakResult
}

export function StreakCounter({ streak }: StreakCounterProps) {
  const { t } = useTranslation()
  const g = t.dashboard.gamification.streak
  const containerRef = useRef<HTMLDivElement>(null)

  const handleAnimationEnd = useCallback(() => {
    containerRef.current?.classList.remove("animate-streak-pulse")
  }, [])

  const triggerPulse = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    el.classList.remove("animate-streak-pulse")
    void el.offsetWidth
    el.classList.add("animate-streak-pulse")
  }, [])

  // Trigger pulse when streak is active (on mount)
  const setRef = useCallback(
    (node: HTMLDivElement | null) => {
      containerRef.current = node
      if (node && streak.currentStreak > 0) {
        node.classList.add("animate-streak-pulse")
      }
    },
    [streak.currentStreak]
  )

  if (streak.currentStreak === 0 && streak.longestStreak === 0) {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-dashed px-3 py-2 text-sm text-muted-foreground">
        <Flame className="h-4 w-4" />
        <span>{g.noStreak}</span>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3">
      <div
        ref={setRef}
        onAnimationEnd={handleAnimationEnd}
        onClick={triggerPulse}
        className="flex items-center gap-2 rounded-lg bg-orange-100 px-3 py-2 dark:bg-orange-900/30"
      >
        <Flame className="h-5 w-5 text-orange-500" />
        <span className="text-lg font-bold text-orange-600 dark:text-orange-400">
          {streak.currentStreak}
        </span>
        <span className="text-sm text-orange-600/70 dark:text-orange-400/70">
          {g.weeksInRow}
        </span>
      </div>
      {streak.longestStreak > streak.currentStreak && (
        <span className="text-xs text-muted-foreground">
          {g.bestStreak}: {streak.longestStreak}
        </span>
      )}
    </div>
  )
}
