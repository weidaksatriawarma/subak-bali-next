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
  type LucideIcon,
} from "lucide-react"
import { useTranslation } from "@/lib/i18n/language-context"
import { AchievementBadge } from "@/components/dashboard/achievement-badge"
import { computeAchievements } from "@/lib/achievements"
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
import type { Category, EstimatedCost, EstimatedImpact } from "@/types/database"

interface ScoreLabelInfo {
  emoji: string
  label: string
  description: string
}

function getScoreLabelInfoT(
  score: number,
  labels: DashboardDictionary["common"]["scoreLabels"]
): ScoreLabelInfo {
  if (score < 20) return { emoji: "\u{1F331}", ...labels.seed }
  if (score < 40) return { emoji: "\u{1F331}", ...labels.sprout }
  if (score < 60) return { emoji: "\u{1F33F}", ...labels.growing }
  if (score < 80) return { emoji: "\u{1F333}", ...labels.tree }
  return { emoji: "\u{1F333}\u2728", ...labels.forest }
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

interface OverviewData {
  businessName: string
  totalScore: number | null
  completedRoadmap: number
  totalRoadmap: number
  quickWins: QuickWin[]
  roadmapItems: { is_completed: boolean; category: Category }[]
  hasAssessment: boolean
  hasScore: boolean
  hasRoadmap: boolean
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

  const achievements = useMemo(
    () =>
      computeAchievements(
        data.roadmapItems,
        t.dashboard.common.achievementNames
      ),
    [data.roadmapItems, t.dashboard.common.achievementNames]
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
                <span className="text-4xl">{labelInfo.emoji}</span>
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
