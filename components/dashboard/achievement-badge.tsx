import { cn } from "@/lib/utils"

export interface Achievement {
  id: string
  emoji: string
  title: string
  unlocked: boolean
}

interface AchievementBadgeProps {
  achievement: Achievement
}

export function AchievementBadge({ achievement }: AchievementBadgeProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-1 rounded-lg border p-3 text-center transition-all",
        achievement.unlocked
          ? "border-primary/30 bg-primary/5 shadow-sm shadow-primary/20"
          : "border-muted bg-muted/30 opacity-50 grayscale"
      )}
    >
      <span className="text-2xl">{achievement.emoji}</span>
      <span className="text-xs leading-tight font-medium">
        {achievement.title}
      </span>
    </div>
  )
}
