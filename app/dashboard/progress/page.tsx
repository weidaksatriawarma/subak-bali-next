"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import {
  TrendingUp,
  CheckCircle2,
  Clock,
  ListChecks,
  Percent,
  Award,
  Lock,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { EmptyState } from "@/components/shared/empty-state"
import { ProgressChart } from "@/components/dashboard/progress-chart"
import { CATEGORY_LABELS } from "@/lib/constants"
import type { RoadmapItem, Category } from "@/types/database"

interface ScoreData {
  total_score: number
  created_at: string
}

interface Milestone {
  id: string
  label: string
  description: string
  unlocked: boolean
}

export default function ProgressPage() {
  const [scores, setScores] = useState<ScoreData[]>([])
  const [items, setItems] = useState<RoadmapItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      const [{ data: scoresData }, { data: itemsData }] = await Promise.all([
        supabase
          .from("scores")
          .select("total_score, created_at")
          .eq("user_id", user.id)
          .order("created_at", { ascending: true }),
        supabase.from("roadmap_items").select("*").eq("user_id", user.id),
      ])

      setScores(scoresData || [])
      setItems(itemsData || [])
      setLoading(false)
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="space-y-6 p-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-[300px] w-full" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      </div>
    )
  }

  if (scores.length === 0) {
    return (
      <div className="p-6">
        <EmptyState
          icon={TrendingUp}
          title="Belum ada data progres"
          description="Selesaikan assessment untuk mulai melacak progres keberlanjutan usaha Anda."
          actionLabel="Mulai Assessment"
          actionHref="/dashboard/assessment"
        />
      </div>
    )
  }

  const completedItems = items.filter((i) => i.is_completed)
  const incompleteItems = items.filter((i) => !i.is_completed)
  const completionPercent =
    items.length > 0
      ? Math.round((completedItems.length / items.length) * 100)
      : 0

  const categories: Category[] = [
    "energy",
    "waste",
    "supply_chain",
    "operations",
    "policy",
  ]

  const categoryProgress = categories.map((cat) => {
    const catItems = items.filter((i) => i.category === cat)
    const catCompleted = catItems.filter((i) => i.is_completed).length
    const percent =
      catItems.length > 0
        ? Math.round((catCompleted / catItems.length) * 100)
        : 0
    return {
      category: cat,
      label: CATEGORY_LABELS[cat],
      completed: catCompleted,
      total: catItems.length,
      percent,
    }
  })

  const recentCompletions = [...completedItems]
    .sort(
      (a, b) =>
        new Date(b.completed_at!).getTime() -
        new Date(a.completed_at!).getTime()
    )
    .slice(0, 5)

  const latestScore = scores[scores.length - 1]?.total_score ?? 0

  const milestones: Milestone[] = [
    {
      id: "first-assessment",
      label: "Assessment Pertama",
      description: "Menyelesaikan assessment pertama",
      unlocked: scores.length >= 1,
    },
    {
      id: "score-50",
      label: "Skor 50+",
      description: "Mencapai skor total 50 atau lebih",
      unlocked: latestScore >= 50,
    },
    {
      id: "five-steps",
      label: "5 Langkah Selesai",
      description: "Menyelesaikan 5 langkah roadmap",
      unlocked: completedItems.length >= 5,
    },
    {
      id: "score-80",
      label: "Skor 80+",
      description: "Mencapai skor total 80 atau lebih",
      unlocked: latestScore >= 80,
    },
  ]

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Progres Keberlanjutan
        </h1>
        <p className="text-sm text-muted-foreground">
          Lacak perkembangan skor dan langkah-langkah yang telah diselesaikan
        </p>
      </div>

      {/* Score History Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Riwayat Skor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ProgressChart scores={scores} />
        </CardContent>
      </Card>

      {/* Completion Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-3 pt-6">
            <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900">
              <ListChecks className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Langkah</p>
              <p className="text-2xl font-bold">{items.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 pt-6">
            <div className="rounded-full bg-green-100 p-2 dark:bg-green-900">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Selesai</p>
              <p className="text-2xl font-bold">{completedItems.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 pt-6">
            <div className="rounded-full bg-orange-100 p-2 dark:bg-orange-900">
              <Clock className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Dalam Proses</p>
              <p className="text-2xl font-bold">{incompleteItems.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 pt-6">
            <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-900">
              <Percent className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Persentase Selesai
              </p>
              <p className="text-2xl font-bold">{completionPercent}%</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Progress */}
      {items.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Progres per Kategori</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {categoryProgress.map((cp) => (
              <div key={cp.category} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span>{cp.label}</span>
                  <span className="text-muted-foreground">
                    {cp.completed}/{cp.total} ({cp.percent}%)
                  </span>
                </div>
                <Progress value={cp.percent} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Recent Completions */}
      {recentCompletions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Langkah Terakhir Diselesaikan</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {recentCompletions.map((item) => (
                <li key={item.id} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(item.completed_at!).toLocaleDateString(
                        "id-ID",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </p>
                  </div>
                  <Badge variant="secondary" className="ml-auto shrink-0">
                    {CATEGORY_LABELS[item.category]}
                  </Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Milestones */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Pencapaian
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            {milestones.map((m) => (
              <div
                key={m.id}
                className={`flex items-center gap-3 rounded-lg border p-4 ${
                  m.unlocked
                    ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950"
                    : "border-muted bg-muted/30 opacity-60"
                }`}
              >
                {m.unlocked ? (
                  <Award className="h-6 w-6 shrink-0 text-green-600 dark:text-green-400" />
                ) : (
                  <Lock className="h-6 w-6 shrink-0 text-muted-foreground" />
                )}
                <div>
                  <p className="text-sm font-semibold">{m.label}</p>
                  <p className="text-xs text-muted-foreground">
                    {m.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
