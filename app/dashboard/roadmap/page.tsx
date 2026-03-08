"use client"

import { useEffect, useState, useMemo } from "react"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { MapIcon } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import {
  AchievementBadge,
  type Achievement,
} from "@/components/dashboard/achievement-badge"
import { EmptyState } from "@/components/shared/empty-state"
import { CATEGORY_LABELS, CATEGORY_EMOJI } from "@/lib/constants"
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

function computeAchievements(items: RoadmapItem[]): Achievement[] {
  const completed = items.filter((i) => i.is_completed).length
  const total = items.length
  const pct = total > 0 ? completed / total : 0

  const achievements: Achievement[] = [
    {
      id: "first",
      emoji: "\u{1F3AF}",
      title: "Langkah Pertama",
      unlocked: completed >= 1,
    },
    {
      id: "five",
      emoji: "\u{1F4AA}",
      title: "Pejuang Hijau",
      unlocked: completed >= 5,
    },
    {
      id: "half",
      emoji: "\u{1F33F}",
      title: "Setengah Jalan",
      unlocked: pct >= 0.5,
    },
    {
      id: "eighty",
      emoji: "\u{1F333}",
      title: "Hampir Sampai",
      unlocked: pct >= 0.8,
    },
    {
      id: "all",
      emoji: "\u{1F3C6}",
      title: "Champion Keberlanjutan",
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
  const catNames: Record<Category, string> = {
    energy: "Pahlawan Energi",
    waste: "Pejuang Limbah",
    supply_chain: "Master Rantai Pasok",
    operations: "Ahli Operasional",
    policy: "Pelopor Kebijakan",
  }
  const catEmoji: Record<Category, string> = {
    energy: "\u26A1",
    waste: "\u267B\uFE0F",
    supply_chain: "\u{1F4E6}",
    operations: "\u2699\uFE0F",
    policy: "\u{1F4CB}",
  }

  for (const cat of categories) {
    const catItems = items.filter((i) => i.category === cat)
    const catCompleted = catItems.filter((i) => i.is_completed).length
    achievements.push({
      id: `cat-${cat}`,
      emoji: catEmoji[cat],
      title: catNames[cat],
      unlocked: catItems.length > 0 && catCompleted === catItems.length,
    })
  }

  return achievements
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
      toast.success("\u{1F389} +10 poin! Langkah selesai!")
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
  const totalPoints = completedCount * 10
  const progressPercent =
    items.length > 0 ? (completedCount / items.length) * 100 : 0

  const achievements = useMemo(() => computeAchievements(items), [items])
  const unlockedCount = achievements.filter((a) => a.unlocked).length

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
          {completedCount} dari {items.length} langkah selesai {"\u2022"}{" "}
          {"\u2B50"} {totalPoints} poin
        </p>
        <Progress value={progressPercent} className="mt-3 h-3" />
        <div className="mt-1 flex justify-between text-xs text-muted-foreground">
          <span>{Math.round(progressPercent)}%</span>
          <span>
            {"\u{1F3C6}"} {unlockedCount}/{achievements.length} pencapaian
          </span>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            {"\u{1F3C6}"} Pencapaian
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-5">
            {achievements.map((a) => (
              <AchievementBadge key={a.id} achievement={a} />
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Tabs
          value={categoryFilter}
          onValueChange={(v) => setCategoryFilter(v as "all" | Category)}
        >
          <TabsList>
            <TabsTrigger value="all">Semua</TabsTrigger>
            {(Object.keys(CATEGORY_LABELS) as Category[]).map((cat) => (
              <TabsTrigger key={cat} value={cat}>
                {CATEGORY_EMOJI[cat]} {CATEGORY_LABELS[cat]}
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
