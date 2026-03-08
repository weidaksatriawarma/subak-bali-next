"use client"

import { useEffect, useState, useMemo } from "react"
import { createClient } from "@/lib/supabase/client"
import { useTranslation } from "@/lib/i18n/language-context"
import { toast } from "sonner"
import { MapIcon, Leaf, TreePine, Plus } from "lucide-react"
import { useCelebration } from "@/components/dashboard/celebration-modal"
import {
  detectCelebration,
  type CelebrationState,
} from "@/lib/gamification/celebrations"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { RoadmapItemCard } from "@/components/dashboard/roadmap-item-card"
import {
  RoadmapItemDialog,
  type RoadmapItemFormValues,
} from "@/components/dashboard/roadmap-item-dialog"
import { AchievementBadge } from "@/components/dashboard/achievement-badge"
import { computeAchievements } from "@/lib/achievements"
import { EmptyState } from "@/components/shared/empty-state"
import { CATEGORY_EMOJI } from "@/lib/constants"
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

const CO2_FALLBACK: Record<string, number> = {
  high: 500,
  medium: 200,
  low: 50,
}

export default function RoadmapPage() {
  const [items, setItems] = useState<RoadmapItem[]>([])
  const [loading, setLoading] = useState(true)
  const [categoryFilter, setCategoryFilter] = useState<"all" | Category>("all")
  const [sortBy, setSortBy] = useState<SortOption>("priority")

  // CRUD state
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<RoadmapItem | null>(null)
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [roadmapId, setRoadmapId] = useState<string | null>(null)

  const { t } = useTranslation()
  const d = t.dashboard.roadmap
  const common = t.dashboard.common
  const { triggerCelebration } = useCelebration()

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      const [{ data: roadmapItems }, { data: roadmaps }] = await Promise.all([
        supabase
          .from("roadmap_items")
          .select("*")
          .eq("user_id", user.id)
          .order("sort_order", { ascending: true }),
        supabase
          .from("roadmaps")
          .select("id, ai_generated_content")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(1),
      ])

      setItems(roadmapItems || [])

      if (roadmaps?.[0]) {
        setRoadmapId(roadmaps[0].id)
      }

      setLoading(false)
    }
    fetchData()
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
      toast.success(d.stepComplete)

      const categories = [
        "energy",
        "waste",
        "supply_chain",
        "operations",
        "policy",
      ] as const
      const getCategoriesCompleted = (itemList: typeof items) =>
        categories.filter((cat) => {
          const catItems = itemList.filter((i) => i.category === cat)
          return catItems.length > 0 && catItems.every((i) => i.is_completed)
        })

      const prevCompleted = items.filter((i) => i.is_completed).length
      const nextCompleted = prevCompleted + 1
      const total = items.length

      const nextItems = items.map((item) =>
        item.id === id
          ? {
              ...item,
              is_completed: true,
              completed_at: new Date().toISOString(),
            }
          : item
      )

      const prevState: CelebrationState = {
        completionPercent: total > 0 ? (prevCompleted / total) * 100 : 0,
        completedCount: prevCompleted,
        rankTier: 0,
        unlockedBadgeCount: 0,
        streakWeeks: 0,
        categoriesCompleted: getCategoriesCompleted(items),
      }

      const nextState: CelebrationState = {
        completionPercent: total > 0 ? (nextCompleted / total) * 100 : 0,
        completedCount: nextCompleted,
        rankTier: 0,
        unlockedBadgeCount: 0,
        streakWeeks: 0,
        categoriesCompleted: getCategoriesCompleted(nextItems),
      }

      const trigger = detectCelebration(prevState, nextState)
      if (trigger) {
        triggerCelebration(trigger)
      }
    }
  }

  function handleOpenCreate() {
    setEditingItem(null)
    setDialogOpen(true)
  }

  function handleOpenEdit(item: RoadmapItem) {
    setEditingItem(item)
    setDialogOpen(true)
  }

  function handleRequestDelete(id: string) {
    const target = items.find((i) => i.id === id)
    if (target?.is_mandatory) {
      toast.error(d.cannotDeleteMandatory)
      return
    }
    setDeleteTargetId(id)
  }

  async function handleSave(values: RoadmapItemFormValues) {
    setSaving(true)
    const supabase = createClient()

    if (editingItem) {
      // Edit mode
      const updateData = editingItem.is_mandatory
        ? { title: values.title, description: values.description }
        : {
            title: values.title,
            description: values.description,
            category: values.category,
            priority: values.priority,
            estimated_impact: values.estimated_impact,
            estimated_cost: values.estimated_cost,
            timeline: values.timeline,
          }

      const { error } = await supabase
        .from("roadmap_items")
        .update(updateData)
        .eq("id", editingItem.id)

      if (error) {
        toast.error(d.updateError)
        setSaving(false)
        return
      }

      setItems((prev) =>
        prev.map((item) =>
          item.id === editingItem.id ? { ...item, ...updateData } : item
        )
      )
      toast.success(d.itemUpdated)
    } else {
      // Create mode
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user || !roadmapId) {
        toast.error(d.addError)
        setSaving(false)
        return
      }

      const newItem = {
        roadmap_id: roadmapId,
        user_id: user.id,
        title: values.title,
        description: values.description,
        category: values.category,
        priority: values.priority,
        estimated_impact: values.estimated_impact,
        estimated_cost: values.estimated_cost,
        timeline: values.timeline,
        sort_order: items.length,
        source: "manual" as const,
        is_mandatory: false,
      }

      const { data, error } = await supabase
        .from("roadmap_items")
        .insert(newItem)
        .select()
        .single()

      if (error || !data) {
        toast.error(d.addError)
        setSaving(false)
        return
      }

      setItems((prev) => [...prev, data as RoadmapItem])
      toast.success(d.itemAdded)
    }

    setSaving(false)
    setDialogOpen(false)
    setEditingItem(null)
  }

  async function handleConfirmDelete() {
    if (!deleteTargetId) return

    const supabase = createClient()
    const { error } = await supabase
      .from("roadmap_items")
      .delete()
      .eq("id", deleteTargetId)

    if (error) {
      toast.error(d.deleteError)
    } else {
      setItems((prev) => prev.filter((item) => item.id !== deleteTargetId))
      toast.success(d.itemDeleted)
    }

    setDeleteTargetId(null)
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

  const achievements = useMemo(
    () => computeAchievements(items, common.achievementNames),
    [items, common.achievementNames]
  )
  const unlockedCount = achievements.filter((a) => a.unlocked).length

  const impactData = useMemo(() => {
    if (items.length === 0) return null
    const totalCo2 = items.reduce((sum, item) => {
      return sum + (CO2_FALLBACK[item.estimated_impact ?? "low"] ?? 50)
    }, 0)
    const completedCo2 = items
      .filter((i) => i.is_completed)
      .reduce((sum, item) => {
        return sum + (CO2_FALLBACK[item.estimated_impact ?? "low"] ?? 50)
      }, 0)
    return {
      totalCo2,
      completedCo2,
      totalTrees: Math.round(totalCo2 / 22),
      completedTrees: Math.round(completedCo2 / 22),
      impactPercent: totalCo2 > 0 ? (completedCo2 / totalCo2) * 100 : 0,
    }
  }, [items])

  if (loading) {
    return (
      <div className="space-y-6">
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
      <div>
        <EmptyState
          icon={MapIcon}
          title={d.noRoadmap}
          description={d.noRoadmapDesc}
          actionLabel={d.startAssessment}
          actionHref="/dashboard/assessment"
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{d.title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {completedCount}/{items.length} {d.stepsCompleted} {"\u2022"}{" "}
          {"\u2B50"} {totalPoints} {d.points}
        </p>
        <Progress value={progressPercent} className="mt-3 h-3" />
        <div className="mt-1 flex justify-between text-xs text-muted-foreground">
          <span>{Math.round(progressPercent)}%</span>
          <span>
            {"\u{1F3C6}"} {unlockedCount}/{achievements.length}{" "}
            {d.achievementsCount}
          </span>
        </div>
      </div>

      {impactData && (
        <Card className="border-green-200 bg-green-50/50 dark:border-green-900 dark:bg-green-950/20">
          <CardHeader>
            <CardTitle className="text-base">
              {d.impactEstimator.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/40">
                  <Leaf className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-700 dark:text-green-400">
                    {impactData.completedCo2.toLocaleString("id-ID")}
                    <span className="text-base font-normal text-muted-foreground">
                      {" "}
                      / {impactData.totalCo2.toLocaleString("id-ID")} kg
                    </span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {d.impactEstimator.co2Reduction}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/40">
                  <TreePine className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-700 dark:text-green-400">
                    {impactData.completedTrees}
                    <span className="text-base font-normal text-muted-foreground">
                      {" "}
                      / {impactData.totalTrees}
                    </span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {d.impactEstimator.trees}
                  </p>
                </div>
              </div>
            </div>
            <Progress value={impactData.impactPercent} className="mt-3 h-2" />
            <p className="mt-2 text-xs text-muted-foreground">
              {Math.round(impactData.impactPercent)}%{" "}
              {d.impactEstimator.progressLabel} —{" "}
              {d.impactEstimator.annualEstimate}
            </p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{d.achievements}</CardTitle>
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
        {/* Mobile: dropdown, Desktop: tabs */}
        <div className="sm:hidden">
          <Select
            value={categoryFilter}
            onValueChange={(v) => setCategoryFilter(v as "all" | Category)}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{d.all}</SelectItem>
              {(Object.keys(common.categories) as Category[]).map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {CATEGORY_EMOJI[cat]} {common.categories[cat]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Tabs
          value={categoryFilter}
          onValueChange={(v) => setCategoryFilter(v as "all" | Category)}
          className="hidden sm:block"
        >
          <TabsList>
            <TabsTrigger value="all">{d.all}</TabsTrigger>
            {(Object.keys(common.categories) as Category[]).map((cat) => (
              <TabsTrigger key={cat} value={cat}>
                {CATEGORY_EMOJI[cat]} {common.categories[cat]}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="flex gap-2">
          <Select
            value={sortBy}
            onValueChange={(v) => setSortBy(v as SortOption)}
          >
            <SelectTrigger className="w-44">
              <SelectValue placeholder={d.sortPlaceholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="priority">{d.sort.priority}</SelectItem>
              <SelectItem value="impact">{d.sort.impact}</SelectItem>
              <SelectItem value="timeline">{d.sort.timeline}</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={handleOpenCreate} size="default">
            <Plus className="mr-1 h-4 w-4" />
            {d.addItem}
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {sorted.map((item) => (
          <RoadmapItemCard
            key={item.id}
            item={item}
            onToggle={handleToggle}
            onEdit={handleOpenEdit}
            onDelete={handleRequestDelete}
          />
        ))}
      </div>

      <RoadmapItemDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open)
          if (!open) setEditingItem(null)
        }}
        item={editingItem}
        saving={saving}
        onSave={handleSave}
      />

      <AlertDialog
        open={deleteTargetId !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteTargetId(null)
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{d.deleteConfirmTitle}</AlertDialogTitle>
            <AlertDialogDescription>
              {d.deleteConfirmDesc}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{d.cancelBtn}</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="text-destructive-foreground bg-destructive hover:bg-destructive/90"
            >
              {d.deleteBtn}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
