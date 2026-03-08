"use client"

import Link from "next/link"
import {
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Minus,
  FileDown,
} from "lucide-react"
import { useTranslation } from "@/lib/i18n/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScoreGauge } from "@/components/dashboard/score-gauge"
import { CategoryBars } from "@/components/dashboard/category-bars"
import { ScoreRadarChart } from "@/components/dashboard/score-radar-chart"
import { SDGBadges } from "@/components/dashboard/sdg-badges"
import { WhatsAppShare } from "@/components/dashboard/whatsapp-share"
import type { DashboardDictionary } from "@/lib/i18n/dictionaries"

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
}: {
  data: ScoreData
  previousScore?: CategoryScores
}) {
  const { t } = useTranslation()
  const d = t.dashboard.score
  const labels = t.dashboard.common.scoreLabels
  const cats = t.dashboard.common.categories
  const labelInfo = getScoreLabelInfoT(data.totalScore, labels)

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{d.title}</h1>
        <p className="text-muted-foreground">{d.subtitle}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{d.totalScore}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-2">
            <span className="text-5xl">{labelInfo.emoji}</span>
            <ScoreGauge score={data.totalScore} />
            <p className="text-lg font-bold">{labelInfo.label}</p>
            <p className="text-center text-sm text-muted-foreground">
              {labelInfo.description}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{d.categoryScores}</CardTitle>
          </CardHeader>
          <CardContent>
            <CategoryBars
              scores={{
                energy: data.energyScore,
                waste: data.wasteScore,
                supply_chain: data.supplyChainScore,
                operations: data.operationsScore,
                policy: data.policyScore,
              }}
            />
          </CardContent>
        </Card>
      </div>

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

      <div className="flex flex-wrap items-center justify-center gap-3">
        {data.businessName && (
          <WhatsAppShare
            score={data.totalScore}
            businessName={data.businessName}
            scoreLabel={labelInfo.label}
          />
        )}
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
