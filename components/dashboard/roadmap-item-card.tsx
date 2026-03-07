"use client"

import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
  PRIORITY_LABELS,
  IMPACT_LABELS,
  COST_LABELS,
  TIMELINE_LABELS,
  CATEGORY_LABELS,
} from "@/lib/constants"
import type { RoadmapItem } from "@/types/database"
import { cn } from "@/lib/utils"

interface RoadmapItemCardProps {
  item: RoadmapItem
  onToggle: (id: string, completed: boolean) => void
}

export function RoadmapItemCard({ item, onToggle }: RoadmapItemCardProps) {
  const priorityVariant =
    item.priority === "high"
      ? "destructive"
      : item.priority === "medium"
        ? "default"
        : "secondary"

  return (
    <Card
      className={cn(
        "flex items-start gap-4 p-4",
        item.is_completed && "opacity-60"
      )}
    >
      <Checkbox
        checked={item.is_completed}
        onCheckedChange={(checked) => onToggle(item.id, checked === true)}
        className="mt-1"
      />
      <div className="flex-1 space-y-2">
        <h3
          className={cn(
            "font-bold",
            item.is_completed && "text-muted-foreground line-through"
          )}
        >
          {item.title}
        </h3>
        <p className="text-sm text-muted-foreground">{item.description}</p>
        <div className="flex flex-wrap gap-2">
          <Badge variant={priorityVariant}>
            {PRIORITY_LABELS[item.priority]}
          </Badge>
          {item.estimated_impact && (
            <Badge variant="outline">
              {IMPACT_LABELS[item.estimated_impact]}
            </Badge>
          )}
          {item.estimated_cost && (
            <Badge variant="outline">{COST_LABELS[item.estimated_cost]}</Badge>
          )}
          {item.timeline && (
            <Badge variant="outline">{TIMELINE_LABELS[item.timeline]}</Badge>
          )}
          <Badge variant="secondary">{CATEGORY_LABELS[item.category]}</Badge>
        </div>
      </div>
    </Card>
  )
}
