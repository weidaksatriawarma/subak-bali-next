"use client"

import { useMemo } from "react"
import Link from "next/link"
import {
  ClipboardList,
  Map,
  MessageSquare,
  CheckCircle2,
  Circle,
  ArrowRight,
  Leaf,
  Banknote,
  Shield,
  Sprout,
  TreePine,
  Trees,
  type LucideIcon,
} from "lucide-react"
import { useTranslation } from "@/lib/i18n/language-context"
import { AchievementBadge } from "@/components/dashboard/achievement-badge"
import { StreakCounter } from "@/components/dashboard/streak-counter"
import { IndustryRankBadge } from "@/components/dashboard/industry-rank-badge"
import { computeAchievements } from "@/lib/achievements"
import { computeWeeklyStreak } from "@/lib/gamification/streaks"
import { CATEGORY_EMOJI } from "@/lib/constants"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { DashboardDictionary } from "@/lib/i18n/dictionaries"
import type {
  Category,
  EstimatedCost,
  EstimatedImpact,
  Industry,
} from "@/types/database"
import type {
  CarbonFootprint,
  PotentialSavings,
  RegulatoryCompliance,
} from "@/lib/carbon"

interface ScoreLabelInfo {
  icon: LucideIcon
  color: string
  iconColor: string
  label: string
  description: string
}

function getScoreLabelInfoT(
  score: number,
  labels: DashboardDictionary["common"]["scoreLabels"]
): ScoreLabelInfo {
  if (score < 20)
    return {
      icon: Sprout,
      color: "bg-red-100 dark:bg-red-900/50",
      iconColor: "text-red-500",
      ...labels.seed,
    }
  if (score < 40)
    return {
      icon: Sprout,
      color: "bg-orange-100 dark:bg-orange-900/50",
      iconColor: "text-orange-500",
      ...labels.sprout,
    }
  if (score < 60)
    return {
      icon: Leaf,
      color: "bg-yellow-100 dark:bg-yellow-900/50",
      iconColor: "text-yellow-500",
      ...labels.growing,
    }
  if (score < 80)
    return {
      icon: TreePine,
      color: "bg-green-100 dark:bg-green-900/50",
      iconColor: "text-green-500",
      ...labels.tree,
    }
  return {
    icon: Trees,
    color: "bg-emerald-100 dark:bg-emerald-900/50",
    iconColor: "text-emerald-500",
    ...labels.forest,
  }
}

function getScoreColor(score: number): string {
  if (score < 30) return "text-red-500"
  if (score < 60) return "text-orange-500"
  return "text-green-500"
}

interface QuickWin {
  id: string
  title: string
  category: Category
  estimated_cost: EstimatedCost | null
  estimated_impact: EstimatedImpact | null
}

interface ImpactData {
  carbon: CarbonFootprint
  savings: PotentialSavings
  compliance: RegulatoryCompliance
}

interface OverviewData {
  businessName: string
  totalScore: number | null
  completedRoadmap: number
  totalRoadmap: number
  quickWins: QuickWin[]
  industry: Industry
  roadmapItems: {
    is_completed: boolean
    category: Category
    completed_at: string | null
  }[]
  hasAssessment: boolean
  hasScore: boolean
  hasRoadmap: boolean
  impact?: ImpactData | null
}

export function DashboardOverview({ data }: { data: OverviewData }) {
  const { t } = useTranslation()
  const d = t.dashboard.overview
  const labels = t.dashboard.common.scoreLabels
  const labelInfo =
    data.totalScore !== null
      ? getScoreLabelInfoT(data.totalScore, labels)
      : null

  const allStepsComplete =
    data.hasAssessment && data.hasScore && data.hasRoadmap
  const showGettingStarted = !allStepsComplete

  const streak = useMemo(
    () => computeWeeklyStreak(data.roadmapItems),
    [data.roadmapItems]
  )

  const achievements = useMemo(
    () =>
      computeAchievements(
        data.roadmapItems,
        t.dashboard.common.achievementNames,
        data.industry
      ),
    [data.roadmapItems, t.dashboard.common.achievementNames, data.industry]
  )
  const unlockedAchievements = achievements.filter((a) => a.unlocked)

  const quickActions: {
    title: string
    description: string
    href: string
    icon: LucideIcon
  }[] = [
    {
      title: d.actions.assessment.title,
      description: d.actions.assessment.description,
      href: "/dashboard/assessment",
      icon: ClipboardList,
    },
    {
      title: d.actions.chat.title,
      description: d.actions.chat.description,
      href: "/dashboard/chat",
      icon: MessageSquare,
    },
    {
      title: d.actions.roadmap.title,
      description: d.actions.roadmap.description,
      href: "/dashboard/roadmap",
      icon: Map,
    },
  ]

  const gettingStartedSteps = [
    { label: d.gettingStarted.step1, done: true, href: "#" },
    {
      label: d.gettingStarted.step2,
      done: data.hasAssessment,
      href: "/dashboard/assessment",
    },
    {
      label: d.gettingStarted.step3,
      done: data.hasScore,
      href: "/dashboard/score",
    },
    {
      label: d.gettingStarted.step4,
      done: data.hasRoadmap,
      href: "/dashboard/roadmap",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          {d.welcome} {data.businessName}!
        </h1>
        <p className="text-muted-foreground">{d.subtitle}</p>
      </div>

      {showGettingStarted && (
        <Card className="border-primary/30 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-lg">{d.gettingStarted.title}</CardTitle>
            <CardDescription>{d.gettingStarted.subtitle}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {gettingStartedSteps.map((step, i) => (
                <div key={i} className="flex items-center gap-3">
                  {step.done ? (
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-green-500" />
                  ) : (
                    <Circle className="h-5 w-5 shrink-0 text-muted-foreground" />
                  )}
                  {step.done || step.href === "#" ? (
                    <span
                      className={
                        step.done
                          ? "text-sm text-muted-foreground line-through"
                          : "text-sm"
                      }
                    >
                      {i + 1}. {step.label}
                    </span>
                  ) : (
                    <Link
                      href={step.href}
                      className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                    >
                      {i + 1}. {step.label}
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>{d.scoreTitle}</CardTitle>
          <CardDescription>{d.scoreDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          {data.totalScore !== null && labelInfo ? (
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className={`rounded-full p-2 ${labelInfo.color}`}>
                  <labelInfo.icon
                    className={`h-8 w-8 ${labelInfo.iconColor}`}
                  />
                </div>
                <p
                  className={`text-4xl font-bold ${getScoreColor(data.totalScore)}`}
                >
                  {data.totalScore}
                </p>
                <p className="text-sm text-muted-foreground">{d.outOf100}</p>
              </div>
              <div className="flex-1">
                <p className="font-medium">{labelInfo.label}</p>
                <p className="text-xs text-muted-foreground">
                  {labelInfo.description}
                </p>
                {data.totalRoadmap > 0 && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {"\u{1F3C6}"} {data.completedRoadmap}/{data.totalRoadmap}{" "}
                    {d.roadmapAchievements}
                  </p>
                )}
                <Button asChild className="mt-3" size="sm">
                  <Link href="/dashboard/score">{d.viewDetails}</Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="py-4 text-center">
              <p className="text-muted-foreground">{d.noAssessment}</p>
              <Button asChild className="mt-4">
                <Link href="/dashboard/assessment">{d.startAssessment}</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {data.totalScore !== null && (
        <IndustryRankBadge industry={data.industry} score={data.totalScore} />
      )}

      {(streak.currentStreak > 0 || streak.longestStreak > 0) && (
        <StreakCounter streak={streak} />
      )}

      {data.impact && (
        <Card className="border-green-200 bg-green-50/50 dark:border-green-900 dark:bg-green-950/20">
          <CardHeader>
            <CardTitle className="text-base">
              {"\u{1F33F}"} Dampak Lingkungan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Leaf className="h-4 w-4 text-green-600" />
                <div>
                  <p className="text-lg font-bold text-green-700 dark:text-green-400">
                    {data.impact.carbon.totalCO2.toLocaleString("id-ID")} kg
                  </p>
                  <p className="text-[10px] text-muted-foreground">CO₂/tahun</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Banknote className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="text-lg font-bold text-blue-700 dark:text-blue-400">
                    Rp{" "}
                    {(data.impact.savings.monthlySavingsRp / 1_000_000).toFixed(
                      1
                    )}{" "}
                    jt
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    hemat/bulan
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-amber-600" />
                <div>
                  <p className="text-lg font-bold text-amber-700 dark:text-amber-400">
                    {data.impact.compliance.overallPercent}%
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    POJK compliance
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {data.hasScore && data.quickWins.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">{d.quickWins.title}</CardTitle>
              <Button asChild variant="ghost" size="sm">
                <Link href="/dashboard/roadmap">
                  {d.quickWins.viewRoadmap}
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.quickWins.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 rounded-lg border px-4 py-3"
                >
                  <span className="text-lg">
                    {CATEGORY_EMOJI[item.category]}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.title}</p>
                  </div>
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    {item.estimated_cost === "free"
                      ? d.quickWins.costFree
                      : d.quickWins.costLow}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {data.hasScore && data.quickWins.length === 0 && !data.hasRoadmap && (
        <Card>
          <CardContent className="py-6 text-center">
            <p className="text-sm text-muted-foreground">
              {d.quickWins.noQuickWins}
            </p>
            <Button asChild className="mt-3" size="sm">
              <Link href="/dashboard/roadmap">
                {d.quickWins.generateRoadmap}
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {unlockedAchievements.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">
                {d.achievements.title}
              </CardTitle>
              <Button asChild variant="ghost" size="sm">
                <Link href="/dashboard/roadmap">
                  {d.achievements.viewAll}
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
              {unlockedAchievements.map((a) => (
                <AchievementBadge key={a.id} achievement={a} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div>
        <h2 className="mb-4 text-lg font-semibold">{d.quickActions}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((action) => (
            <Link key={action.href} href={action.href}>
              <Card className="h-full transition-colors hover:bg-muted/50">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <action.icon className="size-5" />
                    </div>
                    <div>
                      <CardTitle className="text-base">
                        {action.title}
                      </CardTitle>
                      <CardDescription>{action.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
