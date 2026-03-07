"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { MapIcon } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { RoadmapItemCard } from "@/components/dashboard/roadmap-item-card"
import { EmptyState } from "@/components/shared/empty-state"
import { CATEGORY_LABELS } from "@/lib/constants"
import type { RoadmapItem, Category } from "@/types/database"

type SortOption = "priority" | "impact" | "timeline"

const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 }
const IMPACT_ORDER = { high: 0, medium: 1, low: 2 }
const TIMELINE_ORDER = {
  "1_week": 0,
  "1_month": 1,
  "3_months": 2,
  "6_months": 3,
  "1_year": 4,
}

export default function RoadmapPage() {
  const [items, setItems] = useState<RoadmapItem[]>([])
  const [loading, setLoading] = useState(true)
  const [categoryFilter, setCategoryFilter] = useState<"all" | Category>("all")
  const [sortBy, setSortBy] = useState<SortOption>("priority")

  useEffect(() => {
    async function fetchItems() {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      const { data } = await supabase
        .from("roadmap_items")
        .select("*")
        .eq("user_id", user.id)
        .order("sort_order", { ascending: true })

      setItems(data || [])
      setLoading(false)
    }
    fetchItems()
  }, [])

  async function handleToggle(id: string, completed: boolean) {
    const supabase = createClient()
    await supabase
      .from("roadmap_items")
      .update({
        is_completed: completed,
        completed_at: completed ? new Date().toISOString() : null,
      })
      .eq("id", id)

    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              is_completed: completed,
              completed_at: completed ? new Date().toISOString() : null,
            }
          : item
      )
    )

    if (completed) {
      toast.success("Langkah selesai!")
    }
  }

  const filtered =
    categoryFilter === "all"
      ? items
      : items.filter((item) => item.category === categoryFilter)

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "priority") {
      return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]
    }
    if (sortBy === "impact") {
      const ai = a.estimated_impact ? IMPACT_ORDER[a.estimated_impact] : 3
      const bi = b.estimated_impact ? IMPACT_ORDER[b.estimated_impact] : 3
      return ai - bi
    }
    const at = a.timeline ? TIMELINE_ORDER[a.timeline] : 5
    const bt = b.timeline ? TIMELINE_ORDER[b.timeline] : 5
    return at - bt
  })

  const completedCount = items.filter((i) => i.is_completed).length
  const progressPercent =
    items.length > 0 ? (completedCount / items.length) * 100 : 0

  if (loading) {
    return (
      <div className="space-y-6 p-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-2 w-full" />
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28 w-full" />
          ))}
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="p-6">
        <EmptyState
          icon={MapIcon}
          title="Belum ada roadmap"
          description="Selesaikan assessment dan generate skor untuk mendapatkan roadmap sustainability yang dipersonalisasi."
          actionLabel="Mulai Assessment"
          actionHref="/dashboard/assessment"
        />
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">Roadmap Sustainability</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {completedCount} dari {items.length} langkah selesai
        </p>
        <Progress value={progressPercent} className="mt-3 h-2" />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Tabs
          value={categoryFilter}
          onValueChange={(v) => setCategoryFilter(v as "all" | Category)}
        >
          <TabsList>
            <TabsTrigger value="all">Semua</TabsTrigger>
            {(Object.keys(CATEGORY_LABELS) as Category[]).map((cat) => (
              <TabsTrigger key={cat} value={cat}>
                {CATEGORY_LABELS[cat]}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <Select
          value={sortBy}
          onValueChange={(v) => setSortBy(v as SortOption)}
        >
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Urutkan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="priority">Prioritas</SelectItem>
            <SelectItem value="impact">Dampak</SelectItem>
            <SelectItem value="timeline">Timeline</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        {sorted.map((item) => (
          <RoadmapItemCard key={item.id} item={item} onToggle={handleToggle} />
        ))}
      </div>
    </div>
  )
}
