import {
  Trophy,
  TrendingUp,
  Flame,
  Map,
  Info,
  type LucideIcon,
} from "lucide-react"

export interface AppNotification {
  id: string
  type: "achievement" | "score" | "streak" | "roadmap" | "system"
  title: string
  description: string
  timestamp: string
  read: boolean
}

export const NOTIFICATION_ICONS: Record<AppNotification["type"], LucideIcon> = {
  achievement: Trophy,
  score: TrendingUp,
  streak: Flame,
  roadmap: Map,
  system: Info,
}

export function createAchievementNotification(
  title: string,
  description: string
): AppNotification {
  return {
    id: crypto.randomUUID(),
    type: "achievement",
    title,
    description,
    timestamp: new Date().toISOString(),
    read: false,
  }
}

export function createScoreNotification(score: number): AppNotification {
  return {
    id: crypto.randomUUID(),
    type: "score",
    title: "Score Updated",
    description: `Your sustainability score is now ${score}/100`,
    timestamp: new Date().toISOString(),
    read: false,
  }
}

export function createStreakNotification(weeks: number): AppNotification {
  return {
    id: crypto.randomUUID(),
    type: "streak",
    title: `${weeks}-Week Streak!`,
    description: `You completed roadmap items ${weeks} weeks in a row`,
    timestamp: new Date().toISOString(),
    read: false,
  }
}

export function createRoadmapNotification(itemTitle: string): AppNotification {
  return {
    id: crypto.randomUUID(),
    type: "roadmap",
    title: "Step Complete!",
    description: `You completed: ${itemTitle}`,
    timestamp: new Date().toISOString(),
    read: false,
  }
}
