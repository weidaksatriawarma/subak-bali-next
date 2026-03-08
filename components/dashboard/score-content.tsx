"use client"

import Link from "next/link"
import {
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Minus,
  FileDown,
  Leaf,
  Banknote,
  Shield,
  Sprout,
  TreePine,
  Trees,
  type LucideIcon,
} from "lucide-react"
import { useTranslation } from "@/lib/i18n/language-context"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScoreGauge } from "@/components/dashboard/score-gauge"

import { ScoreRadarChart } from "@/components/dashboard/score-radar-chart"
import { SDGBadges } from "@/components/dashboard/sdg-badges"
import { WhatsAppShare } from "@/components/dashboard/whatsapp-share"
import { SustainabilityCertificate } from "@/components/dashboard/sustainability-certificate"
import { IndustryRankBadge } from "@/components/dashboard/industry-rank-badge"
import { AchievementCard } from "@/components/dashboard/achievement-card"
import {
  getIndustryRank,
  getIndustryPercentile,
  computeIndustryBadges,
  INDUSTRY_BADGES,
} from "@/lib/gamification/industry-data"
import {
  calculateCarbonFootprint,
  calculatePotentialSavings,
  calculateRegulatoryCompliance,
} from "@/lib/carbon"
import type { DashboardDictionary } from "@/lib/i18n/dictionaries"
import { CATEGORY_EMOJI, getScoreBgColor } from "@/lib/constants"
import type {
  Assessment,
  BusinessSize,
  Category,
  Industry,
} from "@/types/database"

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

interface CategoryScores {
  energyScore: number
  wasteScore: number
  supplyChainScore: number
  operationsScore: number
  policyScore: number
}

interface ScoreData extends CategoryScores {
  totalScore: number
  aiSummary: string | null
  industryBenchmark: number | null
  industryLabel: string
  businessName?: string
}

function DeltaIndicator({
  current,
  previous,
  labels,
}: {
  current: number
  previous: number
  labels: DashboardDictionary["score"]["comparison"]
}) {
  const delta = current - previous
  if (delta > 0) {
    return (
      <span className="inline-flex items-center gap-1 text-sm font-medium text-green-600">
        <TrendingUp className="h-4 w-4" />+{delta} {labels.improved}
      </span>
    )
  }
  if (delta < 0) {
    return (
      <span className="inline-flex items-center gap-1 text-sm font-medium text-red-500">
        <TrendingDown className="h-4 w-4" />
        {delta} {labels.declined}
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground">
      <Minus className="h-4 w-4" />
      {labels.noChange}
    </span>
  )
}

export function ScoreContent({
  data,
  previousScore,
  assessment,
  businessSize = "small",
  industry = "other",
  certificateToken,
}: {
  data: ScoreData
  previousScore?: CategoryScores
  assessment?: Assessment
  businessSize?: BusinessSize
  industry?: Industry
  certificateToken?: string
}) {
  const { t } = useTranslation()
  const d = t.dashboard.score
  const labels = t.dashboard.common.scoreLabels
  const cats = t.dashboard.common.categories
  const labelInfo = getScoreLabelInfoT(data.totalScore, labels)

  const miniCategories: { key: Category; label: string; score: number }[] = [
    { key: "energy", label: cats.energy, score: data.energyScore },
    { key: "waste", label: cats.waste, score: data.wasteScore },
    {
      key: "supply_chain",
      label: cats.supply_chain,
      score: data.supplyChainScore,
    },
    { key: "operations", label: cats.operations, score: data.operationsScore },
    { key: "policy", label: cats.policy, score: data.policyScore },
  ]

  const summaryLines = data.aiSummary
    ? data.aiSummary.split("\n").filter((line: string) => line.trim())
    : []

  const comparisonCategories = previousScore
    ? [
        {
          label: cats.energy,
          current: data.energyScore,
          previous: previousScore.energyScore,
        },
        {
          label: cats.waste,
          current: data.wasteScore,
          previous: previousScore.wasteScore,
        },
        {
          label: cats.supply_chain,
          current: data.supplyChainScore,
          previous: previousScore.supplyChainScore,
        },
        {
          label: cats.operations,
          current: data.operationsScore,
          previous: previousScore.operationsScore,
        },
        {
          label: cats.policy,
          current: data.policyScore,
          previous: previousScore.policyScore,
        },
      ]
    : []

  const categoryScoresRecord: Record<Category, number> = {
    energy: data.energyScore,
    waste: data.wasteScore,
    supply_chain: data.supplyChainScore,
    operations: data.operationsScore,
    policy: data.policyScore,
  }
  const percentile = getIndustryPercentile(industry, data.totalScore)
  const unlockedBadges = computeIndustryBadges(industry, categoryScoresRecord)
  const allIndustryBadges = INDUSTRY_BADGES[industry]

  const carbonData = assessment ? calculateCarbonFootprint(assessment) : null
  const savingsData = calculatePotentialSavings(businessSize)
  const complianceData = assessment
    ? calculateRegulatoryCompliance(assessment)
    : null

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{d.title}</h1>
        <p className="text-muted-foreground">{d.subtitle}</p>
      </div>

      {/* Dampak Lingkungan — Hero Metrics */}
      {carbonData && (
        <Card className="border-green-200 bg-green-50/50 dark:border-green-900 dark:bg-green-950/20">
          <CardHeader>
            <CardTitle className="text-base">
              {t.dashboard.score.impactTitle ??
                "\u{1F33F} Dampak Lingkungan Bisnis Anda"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/40">
                  <Leaf className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xl font-bold text-green-700 dark:text-green-400">
                    {carbonData.totalCO2.toLocaleString("id-ID")} kg
                  </p>
                  <p className="text-xs text-muted-foreground">
                    CO₂/tahun ({carbonData.treeEquivalent} pohon)
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/40">
                  <Banknote className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xl font-bold text-blue-700 dark:text-blue-400">
                    Rp {(savingsData.monthlySavingsRp / 1_000_000).toFixed(1)}{" "}
                    jt
                  </p>
                  <p className="text-xs text-muted-foreground">
                    potensi hemat/bulan
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/40">
                  <Shield className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-xl font-bold text-amber-700 dark:text-amber-400">
                    {complianceData?.overallPercent ?? 0}%
                  </p>
                  <p className="text-xs text-muted-foreground">
                    POJK 51/2017 compliance
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid items-start gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{d.totalScore}</CardTitle>
            <CardDescription>{labelInfo.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-5">
            {/* Hero — Gauge + Tier Badge */}
            <div className="flex flex-col items-center gap-2">
              <ScoreGauge score={data.totalScore} />
              <div
                className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 ${labelInfo.color}`}
              >
                <labelInfo.icon className={`h-4 w-4 ${labelInfo.iconColor}`} />
                <span className="text-sm font-semibold">{labelInfo.label}</span>
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="w-full space-y-3">
              <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                {d.categoryBreakdown}
              </p>
              <div className="space-y-2.5">
                {miniCategories.map((cat) => (
                  <div key={cat.key} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-xs font-medium">
                        <span>{CATEGORY_EMOJI[cat.key]}</span>
                        <span>{cat.label}</span>
                      </span>
                      <span className="text-xs font-semibold tabular-nums">
                        {cat.score}
                        <span className="font-normal text-muted-foreground">
                          /100
                        </span>
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className={`h-full rounded-full ${getScoreBgColor(cat.score)} animate-bar-grow`}
                        style={
                          {
                            "--bar-width": `${cat.score}%`,
                          } as React.CSSProperties
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>

          {/* Benchmark Footer */}
          {data.industryBenchmark !== null && (
            <CardFooter>
              <div
                className={`flex w-full items-center gap-2 rounded-lg px-4 py-3 text-sm ${
                  data.totalScore >= data.industryBenchmark
                    ? "bg-green-50 dark:bg-green-950/30"
                    : "bg-orange-50 dark:bg-orange-950/30"
                }`}
              >
                {data.totalScore >= data.industryBenchmark ? (
                  <>
                    <TrendingUp className="h-4 w-4 shrink-0 text-green-600" />
                    <span className="font-medium text-green-700 dark:text-green-400">
                      {d.aboveAverage}
                    </span>
                  </>
                ) : (
                  <>
                    <TrendingDown className="h-4 w-4 shrink-0 text-orange-600" />
                    <span className="font-medium text-orange-700 dark:text-orange-400">
                      {d.belowAverage}
                    </span>
                  </>
                )}
              </div>
            </CardFooter>
          )}
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{d.radarChart}</CardTitle>
          </CardHeader>
          <CardContent>
            <ScoreRadarChart
              scores={{
                energy: data.energyScore,
                waste: data.wasteScore,
                supplyChain: data.supplyChainScore,
                operations: data.operationsScore,
                policy: data.policyScore,
              }}
            />
          </CardContent>
        </Card>
      </div>

      <IndustryRankBadge industry={industry} score={data.totalScore} />

      {industry !== "other" && (
        <Card>
          <CardHeader>
            <CardTitle>Performa Industri</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Di atas{" "}
              <span className="font-semibold text-foreground">
                {percentile}%
              </span>{" "}
              perusahaan {data.industryLabel}
            </p>
            {allIndustryBadges.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Badge Industri</p>
                <div className="flex flex-wrap gap-2">
                  {allIndustryBadges.map((badge) => {
                    const isUnlocked = unlockedBadges.some(
                      (b) => b.id === badge.id
                    )
                    return (
                      <div
                        key={badge.id}
                        className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm ${
                          isUnlocked
                            ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950"
                            : "border-muted bg-muted/30 opacity-50"
                        }`}
                      >
                        <span>{badge.emoji}</span>
                        <span className={isUnlocked ? "font-medium" : ""}>
                          {badge.name}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>{t.dashboard.score.sdg.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <SDGBadges
            categoryScores={{
              energy: data.energyScore,
              waste: data.wasteScore,
              supply_chain: data.supplyChainScore,
              operations: data.operationsScore,
              policy: data.policyScore,
            }}
          />
        </CardContent>
      </Card>

      {previousScore && (
        <Card>
          <CardHeader>
            <CardTitle>{d.comparison.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-center justify-between rounded-lg border bg-muted/30 px-4 py-3">
              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  {d.comparison.previousScore}
                </p>
                <p className="text-2xl font-bold">
                  {previousScore.energyScore +
                    previousScore.wasteScore +
                    previousScore.supplyChainScore +
                    previousScore.operationsScore +
                    previousScore.policyScore >
                  0
                    ? Math.round(
                        (previousScore.energyScore +
                          previousScore.wasteScore +
                          previousScore.supplyChainScore +
                          previousScore.operationsScore +
                          previousScore.policyScore) /
                          5
                      )
                    : 0}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  {d.comparison.change}
                </p>
                <DeltaIndicator
                  current={data.totalScore}
                  previous={Math.round(
                    (previousScore.energyScore +
                      previousScore.wasteScore +
                      previousScore.supplyChainScore +
                      previousScore.operationsScore +
                      previousScore.policyScore) /
                      5
                  )}
                  labels={d.comparison}
                />
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  {d.comparison.currentScore}
                </p>
                <p className="text-2xl font-bold text-primary">
                  {data.totalScore}
                </p>
              </div>
            </div>
            <div className="space-y-3">
              {comparisonCategories.map((cat) => (
                <div
                  key={cat.label}
                  className="flex items-center justify-between rounded-lg border px-4 py-2"
                >
                  <span className="text-sm font-medium">{cat.label}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">
                      {cat.previous}
                    </span>
                    <span className="text-muted-foreground">{"\u2192"}</span>
                    <span className="text-sm font-medium">{cat.current}</span>
                    <DeltaIndicator
                      current={cat.current}
                      previous={cat.previous}
                      labels={d.comparison}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {summaryLines.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>{d.aiSummary}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {summaryLines.map((line: string, i: number) => (
                <div
                  key={i}
                  className="rounded-lg border bg-muted/30 px-4 py-3 text-sm leading-relaxed"
                >
                  {line.trim()}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {data.industryBenchmark !== null && (
        <Card>
          <CardHeader>
            <CardTitle>{d.industryComparison}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              {d.industryAverage} {data.industryLabel}:{" "}
              <span className="font-semibold text-foreground">
                {data.industryBenchmark}/100
              </span>
            </p>
            <div className="mt-2">
              {data.totalScore >= data.industryBenchmark ? (
                <span className="text-sm font-medium text-green-600">
                  {d.aboveAverage}
                </span>
              ) : (
                <span className="text-sm font-medium text-orange-500">
                  {d.belowAverage}
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <div
        id="certificate"
        className="flex flex-wrap items-center justify-center gap-3"
      >
        {data.businessName && (
          <WhatsAppShare
            score={data.totalScore}
            businessName={data.businessName}
            scoreLabel={labelInfo.label}
          />
        )}
        {assessment && (
          <SustainabilityCertificate
            businessName={data.businessName ?? ""}
            totalScore={data.totalScore}
            categoryScores={categoryScoresRecord}
            assessmentDate={assessment.created_at}
            scoreLabel={labelInfo.label}
            industry={industry}
            certificateToken={certificateToken}
          />
        )}
        <div id="achievement-card">
          <AchievementCard
            businessName={data.businessName ?? ""}
            totalScore={data.totalScore}
            rankName={getIndustryRank(industry, data.totalScore).rank}
            achievements={unlockedBadges.map((b) => ({
              id: b.id,
              emoji: b.emoji,
              title: b.name,
              unlocked: true,
            }))}
            streakWeeks={0}
          />
        </div>
        <Button asChild variant="outline">
          <Link href="/dashboard/score/report" target="_blank">
            <FileDown className="mr-2 h-4 w-4" />
            {d.downloadReport}
          </Link>
        </Button>
        <Button asChild size="lg">
          <Link href="/dashboard/roadmap">
            {d.viewRoadmap}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
