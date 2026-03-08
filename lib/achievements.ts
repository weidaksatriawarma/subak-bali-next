import type { Achievement } from "@/components/dashboard/achievement-badge"
import type { Category } from "@/types/database"
import type { DashboardDictionary } from "@/lib/i18n/dictionaries"

const CATEGORY_EMOJI_MAP: Record<Category, string> = {
  energy: "\u26A1",
  waste: "\u267B\uFE0F",
  supply_chain: "\u{1F4E6}",
  operations: "\u2699\uFE0F",
  policy: "\u{1F4CB}",
}

export function computeAchievements(
  items: { is_completed: boolean; category: Category }[],
  names: DashboardDictionary["common"]["achievementNames"]
): Achievement[] {
  const completed = items.filter((i) => i.is_completed).length
  const total = items.length
  const pct = total > 0 ? completed / total : 0

  const achievements: Achievement[] = [
    {
      id: "first",
      emoji: "\u{1F3AF}",
      title: names.first,
      unlocked: completed >= 1,
    },
    {
      id: "five",
      emoji: "\u{1F4AA}",
      title: names.five,
      unlocked: completed >= 5,
    },
    {
      id: "half",
      emoji: "\u{1F33F}",
      title: names.half,
      unlocked: pct >= 0.5,
    },
    {
      id: "eighty",
      emoji: "\u{1F333}",
      title: names.eighty,
      unlocked: pct >= 0.8,
    },
    {
      id: "all",
      emoji: "\u{1F3C6}",
      title: names.all,
      unlocked: total > 0 && completed === total,
    },
  ]

  const categories: Category[] = [
    "energy",
    "waste",
    "supply_chain",
    "operations",
    "policy",
  ]

  for (const cat of categories) {
    const catItems = items.filter((i) => i.category === cat)
    const catCompleted = catItems.filter((i) => i.is_completed).length
    achievements.push({
      id: `cat-${cat}`,
      emoji: CATEGORY_EMOJI_MAP[cat],
      title: names[cat],
      unlocked: catItems.length > 0 && catCompleted === catItems.length,
    })
  }

  return achievements
}
