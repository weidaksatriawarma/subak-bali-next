"use client"

import Link from "next/link"
import { ArrowUp, ArrowDown, Minus, ClipboardList } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { FadeInUp } from "@/components/landing/motion-wrapper"
import { useTranslation } from "@/lib/i18n/language-context"
import type { Score, Category } from "@/types/database"

interface ComparisonContentProps {
  firstScore: Score | null
  latestScore: Score | null
}

type CategoryKey = keyof Pick<
  Score,
  | "energy_score"
  | "waste_score"
  | "supply_chain_score"
  | "operations_score"
  | "policy_score"
>

const CATEGORIES: { key: CategoryKey; categoryId: Category }[] = [
  { key: "energy_score", categoryId: "energy" },
  { key: "waste_score", categoryId: "waste" },
  { key: "supply_chain_score", categoryId: "supply_chain" },
  { key: "operations_score", categoryId: "operations" },
  { key: "policy_score", categoryId: "policy" },
]

function DiffBadge({ diff }: { diff: number }) {
  if (diff > 0) {
    return (
      <span className="inline-flex items-center gap-0.5 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
        <ArrowUp className="h-3 w-3" />+{diff}
      </span>
    )
  }
  if (diff < 0) {
    return (
      <span className="inline-flex items-center gap-0.5 rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700 dark:bg-red-900/30 dark:text-red-400">
        <ArrowDown className="h-3 w-3" />
        {diff}
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-0.5 rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
      <Minus className="h-3 w-3" />0
    </span>
  )
}

export function ComparisonContent({
  firstScore,
  latestScore,
}: ComparisonContentProps) {
  const { t } = useTranslation()
  const comp = t.dashboard.comparison
  const categories = t.dashboard.common.categories

  if (!firstScore || !latestScore) {
    return (
      <div className="mx-auto max-w-2xl p-4 pb-24 md:pb-4">
        <FadeInUp>
          <Card>
            <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
              <ClipboardList className="h-12 w-12 text-muted-foreground" />
              <div className="space-y-1">
                <h2 className="text-lg font-semibold">{comp.emptyTitle}</h2>
                <p className="text-sm text-muted-foreground">
                  {comp.emptyDescription}
                </p>
              </div>
              <Button asChild>
                <Link href="/dashboard/assessment">
                  {comp.startAssessment}
                </Link>
              </Button>
            </CardContent>
          </Card>
        </FadeInUp>
      </div>
    )
  }

  const totalDiff = latestScore.total_score - firstScore.total_score

  const categoryDiffs = CATEGORIES.map((cat) => ({
    ...cat,
    label: categories[cat.categoryId],
    first: firstScore[cat.key],
    latest: latestScore[cat.key],
    diff: latestScore[cat.key] - firstScore[cat.key],
  }))

  const biggestImprovement = categoryDiffs.reduce((best, current) =>
    current.diff > best.diff ? current : best
  )

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-4 pb-24 md:pb-4">
      <FadeInUp>
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">{comp.title}</h1>
          <p className="text-sm text-muted-foreground">{comp.subtitle}</p>
        </div>
      </FadeInUp>

      {/* Total Score Comparison */}
      <FadeInUp delay={0.1}>
        <Card>
          <CardHeader>
            <CardTitle>{comp.totalScore}</CardTitle>
            <CardDescription>{comp.overallChange}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center gap-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">{comp.first}</p>
                <p className="text-3xl font-bold">{firstScore.total_score}</p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <DiffBadge diff={totalDiff} />
                <span className="text-xs text-muted-foreground">
                  {comp.points}
                </span>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">{comp.latest}</p>
                <p className="text-3xl font-bold text-primary">
                  {latestScore.total_score}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </FadeInUp>

      {/* Biggest Improvement */}
      {biggestImprovement.diff > 0 && (
        <FadeInUp delay={0.15}>
          <Card className="border-green-200 bg-green-50 dark:border-green-900/50 dark:bg-green-950/20">
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                <ArrowUp className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-green-800 dark:text-green-300">
                  {comp.biggestImprovement}
                </p>
                <p className="text-lg font-bold text-green-900 dark:text-green-200">
                  {biggestImprovement.label} +{biggestImprovement.diff}{" "}
                  {comp.points}
                </p>
              </div>
            </CardContent>
          </Card>
        </FadeInUp>
      )}

      {/* Per-Category Comparison */}
      <FadeInUp delay={0.2}>
        <Card>
          <CardHeader>
            <CardTitle>{comp.categoryComparison}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {categoryDiffs.map((cat) => (
              <div key={cat.key} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{cat.label}</span>
                  <DiffBadge diff={cat.diff} />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-16 text-xs text-muted-foreground">
                      {comp.first}
                    </span>
                    <Progress value={cat.first} className="h-2 flex-1" />
                    <span className="w-8 text-right text-xs font-medium">
                      {cat.first}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-16 text-xs text-muted-foreground">
                      {comp.latest}
                    </span>
                    <Progress value={cat.latest} className="h-2 flex-1" />
                    <span className="w-8 text-right text-xs font-medium">
                      {cat.latest}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </FadeInUp>
    </div>
  )
}
