"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useTranslation } from "@/lib/i18n/language-context"
import { CATEGORY_EMOJI } from "@/lib/constants"
import type { RoadmapItem } from "@/types/database"
import { cn } from "@/lib/utils"
import {
  Sparkles,
  Lock,
  MoreHorizontal,
  Pencil,
  Trash2,
  MessageSquare,
} from "lucide-react"
import Link from "next/link"

interface RoadmapItemCardProps {
  item: RoadmapItem
  onToggle: (id: string, completed: boolean) => void
  onEdit: (item: RoadmapItem) => void
  onDelete: (id: string) => void
}

export function RoadmapItemCard({
  item,
  onToggle,
  onEdit,
  onDelete,
}: RoadmapItemCardProps) {
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
      toast.success("Langkah berhasil diselesaikan!")
      if (typeof navigator !== "undefined" && navigator.vibrate)
        navigator.vibrate(50)
    }
    onToggle(item.id, checked)
  }

  return (
    <Card
      className={cn(
        "relative flex items-start gap-4 p-4 transition-all transition-colors duration-500",
        item.is_completed && "opacity-60",
        justCompleted && "animate-check-bounce bg-green-50 dark:bg-green-950/30"
      )}
    >
      <Checkbox
        checked={item.is_completed}
        onCheckedChange={(checked) => handleToggle(checked === true)}
        className="mt-1"
      />
      <div className="flex-1 space-y-2 pr-28">
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
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={priorityVariant}>
            {common.priorities[item.priority]}
          </Badge>
          {item.estimated_impact && (
            <Badge variant="outline">
              {common.impacts[item.estimated_impact]}
            </Badge>
          )}
          <Badge variant="secondary">{common.categories[item.category]}</Badge>
          {item.source === "ai_generated" && (
            <Badge
              variant="outline"
              className="border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300"
            >
              <Sparkles className="mr-1 h-3 w-3" />
              {rd.aiGenerated}
            </Badge>
          )}
          {item.is_mandatory && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge
                    variant="outline"
                    className="border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-300"
                  >
                    <Lock className="mr-1 h-3 w-3" />
                    {rd.mandatory}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{rd.mandatoryTooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>

      <div className="absolute top-3 right-3 flex items-center gap-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="shrink-0 border-green-200 bg-green-50 text-green-700 hover:bg-green-100 dark:border-green-800 dark:bg-green-950 dark:text-green-300 dark:hover:bg-green-900"
                asChild
              >
                <Link
                  href={`/dashboard/chat?prompt=${encodeURIComponent(`Jelaskan lebih detail cara mengimplementasikan langkah sustainability berikut: "${item.title}". ${item.description}`)}`}
                >
                  <MessageSquare className="mr-1.5 h-4 w-4" />
                  {rd.askAi}
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{rd.askAiTooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {!item.is_mandatory && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(item)}>
                <Pencil className="mr-2 h-4 w-4" />
                {rd.editItem}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(item.id)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                {rd.deleteItem}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </Card>
  )
}
