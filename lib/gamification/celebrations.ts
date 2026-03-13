export type CelebrationTrigger =
  | "first_item"
  | "pct_25"
  | "pct_50"
  | "pct_75"
  | "pct_100"
  | "rank_change"
  | "category_master"
  | "streak_milestone"

export interface CelebrationState {
  completionPercent: number
  completedCount: number
  rankTier: number
  unlockedBadgeCount: number
  streakWeeks: number
  categoriesCompleted: string[] // category names with 100% completion
}

export interface CelebrationContent {
  trigger: CelebrationTrigger
  emoji: string
  title: string
  subtitle: string
}

export function detectCelebration(
  prev: CelebrationState,
  next: CelebrationState
): CelebrationTrigger | null {
  // Check in order of priority (most exciting first)
  if (next.completionPercent >= 100 && prev.completionPercent < 100)
    return "pct_100"
  if (next.rankTier > prev.rankTier) return "rank_change"
  if (next.completionPercent >= 75 && prev.completionPercent < 75)
    return "pct_75"
  if (next.completionPercent >= 50 && prev.completionPercent < 50)
    return "pct_50"
  if (next.completionPercent >= 25 && prev.completionPercent < 25)
    return "pct_25"
  if (next.categoriesCompleted.length > prev.categoriesCompleted.length)
    return "category_master"
  if (
    (next.streakWeeks >= 4 && prev.streakWeeks < 4) ||
    (next.streakWeeks >= 8 && prev.streakWeeks < 8) ||
    (next.streakWeeks >= 12 && prev.streakWeeks < 12)
  )
    return "streak_milestone"
  if (next.completedCount >= 1 && prev.completedCount === 0) return "first_item"
  return null
}

export function getCelebrationContent(
  trigger: CelebrationTrigger
): CelebrationContent {
  const content: Record<CelebrationTrigger, CelebrationContent> = {
    first_item: {
      trigger: "first_item",
      emoji: "\u{1F3AF}",
      title: "First Step!",
      subtitle: "Your sustainability journey begins!",
    },
    pct_25: {
      trigger: "pct_25",
      emoji: "\u{1F331}",
      title: "25% Complete!",
      subtitle: "A quarter of the way to a green business!",
    },
    pct_50: {
      trigger: "pct_50",
      emoji: "\u{1F33F}",
      title: "Halfway There!",
      subtitle: "Amazing! Keep up the momentum!",
    },
    pct_75: {
      trigger: "pct_75",
      emoji: "\u{1F333}",
      title: "75% Achieved!",
      subtitle: "Almost there! Just a little more!",
    },
    pct_100: {
      trigger: "pct_100",
      emoji: "\u{1F3C6}",
      title: "100% Complete!",
      subtitle: "Sustainability Champion! Outstanding!",
    },
    rank_change: {
      trigger: "rank_change",
      emoji: "\u2B50",
      title: "Level Up!",
      subtitle: "Your sustainability rank has increased!",
    },
    category_master: {
      trigger: "category_master",
      emoji: "\u{1F396}\uFE0F",
      title: "Category Mastered!",
      subtitle: "All steps in a category completed!",
    },
    streak_milestone: {
      trigger: "streak_milestone",
      emoji: "\u{1F525}",
      title: "Streak Milestone!",
      subtitle: "Your consistency is outstanding!",
    },
  }
  return content[trigger]
}
