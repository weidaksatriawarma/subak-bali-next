export interface NudgeContext {
  completedThisWeek?: number
  totalScore?: number | null
  daysSinceActivity?: number
  streakWeeks?: number
  hasRoadmap?: boolean
  hasAssessment?: boolean
  page: "overview" | "roadmap" | "score" | "progress"
}

export interface Nudge {
  id: string
  emoji: string
  text: string
  ctaLabel?: string
  ctaHref?: string
}

export function getNudge(context: NudgeContext): Nudge | null {
  const {
    page,
    completedThisWeek,
    totalScore,
    daysSinceActivity,
    streakWeeks,
    hasRoadmap,
    hasAssessment,
  } = context

  if (page === "roadmap" && hasRoadmap && (completedThisWeek ?? 0) < 3) {
    return {
      id: "roadmap-weekly-goal",
      emoji: "\u{1F3AF}",
      text: "Complete 3 steps this week to keep your momentum going!",
    }
  }

  if (
    page === "score" &&
    totalScore !== null &&
    totalScore !== undefined &&
    totalScore < 50
  ) {
    return {
      id: "score-focus-lowest",
      emoji: "\u{1F4A1}",
      text: "Focus on your lowest category for the fastest improvement.",
      ctaLabel: "View Roadmap",
      ctaHref: "/dashboard/roadmap",
    }
  }

  if (page === "overview" && !hasAssessment) {
    return {
      id: "overview-start-assessment",
      emoji: "\u{1F680}",
      text: "Start an assessment to find out your business sustainability score.",
      ctaLabel: "Start Assessment",
      ctaHref: "/dashboard/assessment",
    }
  }

  if (streakWeeks && streakWeeks > 0) {
    return {
      id: `streak-${streakWeeks}`,
      emoji: "\u{1F525}",
      text: `${streakWeeks}-week streak! Stay consistent for maximum results.`,
    }
  }

  if ((daysSinceActivity ?? 0) >= 7) {
    return {
      id: "inactive-7-days",
      emoji: "\u{23F0}",
      text: "It's been a week without progress. Pick 1 easy step to get back on track!",
      ctaLabel: "View Roadmap",
      ctaHref: "/dashboard/roadmap",
    }
  }

  return null
}
