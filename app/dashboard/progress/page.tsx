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
  Banknote,
  ArrowDownRight,
} from "lucide-react"
import { ExportButton } from "@/components/dashboard/export-button"
import { exportToCSV, formatScoresForExport } from "@/lib/export"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { EmptyState } from "@/components/shared/empty-state"
import dynamic from "next/dynamic"

const ProgressChart = dynamic(
  () =>
    import("@/components/dashboard/progress-chart").then(
      (mod) => mod.ProgressChart
    ),
  {
    loading: () => (
      <div className="h-[250px] w-full animate-pulse rounded-lg bg-muted" />
    ),
  }
)
import { StreakCounter } from "@/components/dashboard/streak-counter"
import { computeWeeklyStreak } from "@/lib/gamification/streaks"
import { CATEGORY_LABELS } from "@/lib/constants"
import { calculatePotentialSavings } from "@/lib/carbon"
import type { RoadmapItem, Category, BusinessSize } from "@/types/database"

interface ScoreData {
  total_score: number
  energy_score: number
  waste_score: number
  supply_chain_score: number
  operations_score: number
  policy_score: number
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
  const [businessSize, setBusinessSize] = useState<BusinessSize>("small")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      const [{ data: scoresData }, { data: itemsData }, { data: profile }] =
        await Promise.all([
          supabase
            .from("scores")
            .select(
              "total_score, energy_score, waste_score, supply_chain_score, operations_score, policy_score, created_at"
            )
            .eq("user_id", user.id)
            .order("created_at", { ascending: true }),
          supabase.from("roadmap_items").select("*").eq("user_id", user.id),
          supabase
            .from("profiles")
            .select("business_size")
            .eq("id", user.id)
            .single(),
        ])

      setScores(scoresData || [])
      setItems(itemsData || [])
      if (profile?.business_size) setBusinessSize(profile.business_size)
      setLoading(false)
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
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
      <div>
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

  const streak = computeWeeklyStreak(items)

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
    {
      id: "streak-4",
      label: "4 Minggu Berturut-turut",
      description: "Menyelesaikan langkah roadmap 4 minggu berturut-turut",
      unlocked: streak.longestStreak >= 4,
    },
    {
      id: "streak-8",
      label: "8 Minggu Berturut-turut",
      description: "Menyelesaikan langkah roadmap 8 minggu berturut-turut",
      unlocked: streak.longestStreak >= 8,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Progres Keberlanjutan
          </h1>
          <p className="text-sm text-muted-foreground">
            Lacak perkembangan skor dan langkah-langkah yang telah diselesaikan
          </p>
        </div>
        {scores.length > 0 && (
          <ExportButton
            items={[
              {
                label: "Export Riwayat Skor",
                onClick: () =>
                  exportToCSV(
                    formatScoresForExport(scores),
                    "skor-subakhijau.csv"
                  ),
              },
            ]}
          />
        )}
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

      {/* Streak Counter */}
      {(streak.currentStreak > 0 || streak.longestStreak > 0) && (
        <StreakCounter streak={streak} />
      )}

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

      {/* Sustainability Analytics */}
      {completedItems.length > 0 && (
        <SustainabilityAnalytics
          completedItems={completedItems}
          scores={scores}
          businessSize={businessSize}
        />
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

function SustainabilityAnalytics({
  completedItems,
  scores,
  businessSize,
}: {
  completedItems: RoadmapItem[]
  scores: ScoreData[]
  businessSize: BusinessSize
}) {
  // Calculate completed categories for savings estimation
  const completedCategories: Record<string, number> = {}
  for (const item of completedItems) {
    completedCategories[item.category] =
      (completedCategories[item.category] || 0) + 1
  }

  const savings = calculatePotentialSavings(businessSize, completedCategories)

  // Score improvement trend
  const firstScore = scores[0]?.total_score ?? 0
  const latestScore = scores[scores.length - 1]?.total_score ?? 0
  const scoreImprovement = latestScore - firstScore

  // Estimate CO2 reduction based on score improvement (rough approximation)
  // Higher score = better practices = lower CO2
  const estimatedCO2ReductionKg = Math.round(scoreImprovement * 25)

  // ROI estimate: savings vs typical implementation cost
  const typicalMonthlyCost =
    businessSize === "micro"
      ? 200_000
      : businessSize === "small"
        ? 500_000
        : 1_000_000
  const roiMonths =
    savings.monthlySavingsRp > 0
      ? Math.ceil(
          (typicalMonthlyCost * completedItems.length) /
            savings.monthlySavingsRp
        )
      : 0

  return (
    <Card className="border-green-200 bg-green-50/50 dark:border-green-900 dark:bg-green-950/20">
      <CardHeader>
        <CardTitle className="text-base">
          Analitik Dampak Keberlanjutan
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/40">
              <Banknote className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-lg font-bold text-blue-700 dark:text-blue-400">
                Rp {(savings.monthlySavingsRp / 1_000_000).toFixed(1)} jt
              </p>
              <p className="text-xs text-muted-foreground">
                estimasi hemat/bulan
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/40">
              <ArrowDownRight className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-lg font-bold text-green-700 dark:text-green-400">
                {estimatedCO2ReductionKg > 0
                  ? `${estimatedCO2ReductionKg.toLocaleString("id-ID")} kg`
                  : "—"}
              </p>
              <p className="text-xs text-muted-foreground">
                estimasi CO₂ berkurang
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/40">
              <TrendingUp className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-lg font-bold text-amber-700 dark:text-amber-400">
                {roiMonths > 0 ? `${roiMonths} bulan` : "—"}
              </p>
              <p className="text-xs text-muted-foreground">
                estimasi ROI balik modal
              </p>
            </div>
          </div>
        </div>

        {savings.byCategory.length > 0 && (
          <div className="mt-4 space-y-2">
            <p className="text-xs font-medium text-muted-foreground">
              Estimasi penghematan per kategori
            </p>
            {savings.byCategory
              .filter((c) => c.savingsRp > 0)
              .map((c) => (
                <div
                  key={c.category}
                  className="flex items-center justify-between text-sm"
                >
                  <span>{CATEGORY_LABELS[c.category as Category]}</span>
                  <span className="font-medium">
                    Rp {c.savingsRp.toLocaleString("id-ID")}
                    /bulan
                  </span>
                </div>
              ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
