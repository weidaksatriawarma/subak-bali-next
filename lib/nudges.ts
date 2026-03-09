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
      text: "Selesaikan 3 langkah minggu ini untuk menjaga momentum!",
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
      text: "Fokus pada kategori terendah untuk peningkatan tercepat.",
      ctaLabel: "Lihat Roadmap",
      ctaHref: "/dashboard/roadmap",
    }
  }

  if (page === "overview" && !hasAssessment) {
    return {
      id: "overview-start-assessment",
      emoji: "\u{1F680}",
      text: "Mulai assessment untuk mengetahui skor sustainability bisnis Anda.",
      ctaLabel: "Mulai Assessment",
      ctaHref: "/dashboard/assessment",
    }
  }

  if (streakWeeks && streakWeeks > 0) {
    return {
      id: `streak-${streakWeeks}`,
      emoji: "\u{1F525}",
      text: `Streak ${streakWeeks} minggu! Terus konsisten untuk hasil maksimal.`,
    }
  }

  if ((daysSinceActivity ?? 0) >= 7) {
    return {
      id: "inactive-7-days",
      emoji: "\u{23F0}",
      text: "Sudah seminggu tanpa progres. Pilih 1 langkah mudah untuk memulai kembali!",
      ctaLabel: "Lihat Roadmap",
      ctaHref: "/dashboard/roadmap",
    }
  }

  return null
}
