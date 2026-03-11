"use client"

import { useState, useCallback, useMemo } from "react"
import Link from "next/link"
import {
  ClipboardList,
  Map,
  MessageSquare,
  CheckCircle2,
  Circle,
  ArrowRight,
  FileDown,
  Leaf,
  Banknote,
  Shield,
  Sprout,
  TreePine,
  Trees,
  type LucideIcon,
} from "lucide-react"
import { toast } from "sonner"
import { useTranslation } from "@/lib/i18n/language-context"
import { AchievementBadge } from "@/components/dashboard/achievement-badge"
import { StreakCounter } from "@/components/dashboard/streak-counter"
import { IndustryRankBadge } from "@/components/dashboard/industry-rank-badge"
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/landing/motion-wrapper"
import { ProgressRing } from "@/components/dashboard/progress-ring"
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
  hasCertificate: boolean
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

  // Journey progress: 5 steps
  const journeySteps = [
    true,
    data.hasAssessment,
    data.hasScore,
    data.hasRoadmap,
    data.hasCertificate,
  ]
  const completedSteps = journeySteps.filter(Boolean).length
  const journeyProgress = (completedSteps / journeySteps.length) * 100

  const journeyCta = !data.hasAssessment
    ? { label: "Mulai Assessment", href: "/dashboard/assessment" }
    : !data.hasScore
      ? { label: "Lihat Skor", href: "/dashboard/score" }
      : !data.hasRoadmap
        ? { label: "Buat Roadmap", href: "/dashboard/roadmap" }
        : !data.hasCertificate
          ? { label: "Lihat Sertifikat", href: "/dashboard/certificate" }
          : null

  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownloadPDF = useCallback(async () => {
    setIsDownloading(true)
    try {
      const res = await fetch("/api/report/pdf")
      if (!res.ok) throw new Error("Download failed")
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "laporan-sustainability-subakhijau.pdf"
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
      toast.success("Laporan PDF berhasil diunduh!")
    } catch {
      toast.error("Gagal mengunduh laporan PDF")
    } finally {
      setIsDownloading(false)
    }
  }, [])

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
      <FadeInUp>
        <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
          <CardContent className="flex items-center gap-6 pt-6">
            <ProgressRing progress={journeyProgress} size={80} />
            <div className="flex-1">
              <h1 className="text-2xl font-bold tracking-tight">
                {d.welcome} {data.businessName}!
              </h1>
              <p className="text-sm text-muted-foreground">{d.subtitle}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {journeyCta && (
                  <Button asChild size="sm">
                    <Link href={journeyCta.href}>
                      {journeyCta.label}
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                )}
                {data.hasScore && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDownloadPDF}
                    disabled={isDownloading}
                  >
                    <FileDown className="mr-1 h-3 w-3" />
                    {isDownloading ? "Mengunduh..." : "Download Laporan PDF"}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </FadeInUp>

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

      <Card data-tour="score-card">
        <CardHeader>
          <CardTitle>{d.scoreTitle}</CardTitle>
          <CardDescription>{d.scoreDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          {data.totalScore !== null && labelInfo ? (
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div
                  className={`mx-auto flex size-12 items-center justify-center rounded-full ${labelInfo.color}`}
                >
                  <labelInfo.icon
                    className={`h-7 w-7 ${labelInfo.iconColor}`}
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
              {"\u{1F33F}"} {d.impactTitle}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Leaf className="h-6 w-6 text-green-600" />
                <div>
                  <p className="text-lg font-bold text-green-700 dark:text-green-400">
                    {data.impact.carbon.totalCO2.toLocaleString("id-ID")} kg
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {d.estCo2Year}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Banknote className="h-6 w-6 text-blue-600" />
                <div>
                  <p className="text-lg font-bold text-blue-700 dark:text-blue-400">
                    Rp{" "}
                    {(data.impact.savings.monthlySavingsRp / 1_000_000).toFixed(
                      1
                    )}{" "}
                    jt
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {d.estSavingsMonth}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-amber-600" />
                <div>
                  <p className="text-lg font-bold text-amber-700 dark:text-amber-400">
                    {data.impact.compliance.overallPercent}%
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {d.estCompliance}
                  </p>
                </div>
              </div>
            </div>
            <p className="mt-2 text-[10px] text-muted-foreground/70">
              {d.impactDisclaimer}
            </p>
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

      <div data-tour="quick-actions">
        <h2 className="mb-4 text-lg font-semibold">{d.quickActions}</h2>
        <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((action) => (
            <StaggerItem key={action.href}>
              <Link href={action.href}>
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
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </div>
  )
}
