"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "@/lib/i18n/language-context"
import { CATEGORY_EMOJI } from "@/lib/constants"
import type { RoadmapItem } from "@/types/database"
import { cn } from "@/lib/utils"

interface RoadmapItemCardProps {
  item: RoadmapItem
  onToggle: (id: string, completed: boolean) => void
}

export function RoadmapItemCard({ item, onToggle }: RoadmapItemCardProps) {
  const [justCompleted, setJustCompleted] = useState(false)
  const { t } = useTranslation()
  const common = t.dashboard.common
  const rd = t.dashboard.roadmap

  const priorityVariant =
    item.priority === "high"
      ? "destructive"
      : item.priority === "medium"
        ? "default"
        : "secondary"

  function handleToggle(checked: boolean) {
    if (checked) {
      setJustCompleted(true)
      setTimeout(() => setJustCompleted(false), 500)
    }
    onToggle(item.id, checked)
  }

  return (
    <Card
      className={cn(
        "flex items-start gap-4 p-4 transition-all",
        item.is_completed && "opacity-60",
        justCompleted && "animate-check-bounce"
      )}
    >
      <Checkbox
        checked={item.is_completed}
        onCheckedChange={(checked) => handleToggle(checked === true)}
        className="mt-1"
      />
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <h3
            className={cn(
              "font-bold",
              item.is_completed && "text-muted-foreground line-through"
            )}
          >
            {CATEGORY_EMOJI[item.category]} {item.title}
          </h3>
          {item.is_completed && (
            <span className="text-xs font-medium text-green-600">
              {rd.pointsLabel}
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground">{item.description}</p>
        <div className="flex flex-wrap gap-2">
          <Badge variant={priorityVariant}>
            {common.priorities[item.priority]}
          </Badge>
          {item.estimated_impact && (
            <Badge variant="outline">
              {common.impacts[item.estimated_impact]}
            </Badge>
          )}
          <Badge variant="secondary">{common.categories[item.category]}</Badge>
        </div>
      </div>
    </Card>
  )
}
