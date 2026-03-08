"use client"

import { Printer } from "lucide-react"
import { useTranslation } from "@/lib/i18n/language-context"
import { Button } from "@/components/ui/button"
import { SDGBadges } from "@/components/dashboard/sdg-badges"
import {
  calculateCarbonFootprint,
  calculatePotentialSavings,
  calculateRegulatoryCompliance,
} from "@/lib/carbon"
import type { RoadmapItem, Assessment, BusinessSize } from "@/types/database"

interface ReportScore {
  totalScore: number
  energyScore: number
  wasteScore: number
  supplyChainScore: number
  operationsScore: number
  policyScore: number
  aiSummary: string | null
  industryBenchmark: number | null
}

interface ScoreReportProps {
  score: ReportScore
  businessName: string
  industryLabel: string
  roadmapItems: RoadmapItem[]
  assessment?: Assessment
  businessSize?: BusinessSize
}

function ScoreBar({ label, value }: { label: string; value: number }) {
  const color =
    value >= 80
      ? "#16a34a"
      : value >= 60
        ? "#65a30d"
        : value >= 40
          ? "#ca8a04"
          : "#dc2626"
  return (
    <div className="flex items-center gap-3">
      <span className="w-28 text-sm font-medium" style={{ color: "#1f2937" }}>
        {label}
      </span>
      <div
        className="h-5 flex-1 overflow-hidden rounded-full"
        style={{ backgroundColor: "#e5e7eb" }}
      >
        <div
          className="flex h-full items-center rounded-full px-2 text-xs font-bold text-white"
          style={{ width: `${value}%`, backgroundColor: color }}
        >
          {value}
        </div>
      </div>
    </div>
  )
}

export function ScoreReport({
  score,
  businessName,
  industryLabel,
  roadmapItems,
  assessment,
  businessSize = "small",
}: ScoreReportProps) {
  const { t } = useTranslation()
  const d = t.dashboard.score.report
  const cats = t.dashboard.common.categories
  const priorities = t.dashboard.common.priorities
  const impacts = t.dashboard.common.impacts

  const summaryLines = score.aiSummary
    ? score.aiSummary.split("\n").filter((l) => l.trim())
    : []

  const today = new Date().toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div
      className="mx-auto max-w-3xl space-y-8"
      style={{ color: "#1f2937", background: "white" }}
    >
      <div className="flex items-center justify-between">
        <div />
        <Button
          onClick={() => window.print()}
          className="print:hidden"
          variant="outline"
        >
          <Printer className="mr-2 h-4 w-4" />
          Print / PDF
        </Button>
      </div>

      {/* Header */}
      <div className="text-center">
        <p className="text-sm font-semibold tracking-widest text-green-600">
          GREENADVISOR
        </p>
        <h1 className="mt-1 text-3xl font-bold" style={{ color: "#111827" }}>
          {d.title}
        </h1>
        <p className="mt-1 text-lg font-medium" style={{ color: "#374151" }}>
          {businessName}
        </p>
        <p className="text-sm" style={{ color: "#6b7280" }}>
          {d.generatedAt}: {today}
        </p>
      </div>

      {/* Total Score */}
      <div className="rounded-xl border p-6 text-center">
        <p
          className="mb-1 text-sm font-medium tracking-wider uppercase"
          style={{ color: "#6b7280" }}
        >
          {t.dashboard.score.totalScore}
        </p>
        <p className="text-6xl font-bold text-green-600">
          {score.totalScore}
          <span className="text-2xl font-normal" style={{ color: "#9ca3af" }}>
            /100
          </span>
        </p>
      </div>

      {/* Category Breakdown */}
      <div>
        <h2 className="mb-4 text-lg font-bold" style={{ color: "#111827" }}>
          {d.categoryBreakdown}
        </h2>
        <div className="space-y-3">
          <ScoreBar label={cats.energy} value={score.energyScore} />
          <ScoreBar label={cats.waste} value={score.wasteScore} />
          <ScoreBar label={cats.supply_chain} value={score.supplyChainScore} />
          <ScoreBar label={cats.operations} value={score.operationsScore} />
          <ScoreBar label={cats.policy} value={score.policyScore} />
        </div>
      </div>

      {/* SDG Alignment */}
      <div>
        <h2 className="mb-4 text-lg font-bold" style={{ color: "#111827" }}>
          {d.sdgAlignment}
        </h2>
        <SDGBadges
          categoryScores={{
            energy: score.energyScore,
            waste: score.wasteScore,
            supply_chain: score.supplyChainScore,
            operations: score.operationsScore,
            policy: score.policyScore,
          }}
        />
      </div>

      {/* Carbon Footprint */}
      {assessment &&
        (() => {
          const carbon = calculateCarbonFootprint(assessment)
          const savings = calculatePotentialSavings(businessSize)
          const compliance = calculateRegulatoryCompliance(assessment)
          return (
            <>
              <div>
                <h2
                  className="mb-4 text-lg font-bold"
                  style={{ color: "#111827" }}
                >
                  Jejak Karbon & Dampak Lingkungan
                </h2>
                <div
                  className="grid grid-cols-3 gap-4 rounded-lg border p-4"
                  style={{ borderColor: "#d1d5db" }}
                >
                  <div className="text-center">
                    <p
                      className="text-2xl font-bold"
                      style={{ color: "#16a34a" }}
                    >
                      {carbon.totalCO2.toLocaleString("id-ID")} kg
                    </p>
                    <p className="text-xs" style={{ color: "#6b7280" }}>
                      CO₂/tahun
                    </p>
                  </div>
                  <div className="text-center">
                    <p
                      className="text-2xl font-bold"
                      style={{ color: "#2563eb" }}
                    >
                      Rp {(savings.monthlySavingsRp / 1_000_000).toFixed(1)} jt
                    </p>
                    <p className="text-xs" style={{ color: "#6b7280" }}>
                      potensi hemat/bulan
                    </p>
                  </div>
                  <div className="text-center">
                    <p
                      className="text-2xl font-bold"
                      style={{ color: "#d97706" }}
                    >
                      {compliance.overallPercent}%
                    </p>
                    <p className="text-xs" style={{ color: "#6b7280" }}>
                      {compliance.framework}
                    </p>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <p className="text-sm" style={{ color: "#374151" }}>
                    Energi: {carbon.energyCO2.toLocaleString("id-ID")} kg
                    {" \u2022 "}
                    Limbah: {carbon.wasteCO2.toLocaleString("id-ID")} kg
                    {" \u2022 "}
                    Transportasi: {carbon.transportCO2.toLocaleString(
                      "id-ID"
                    )}{" "}
                    kg
                  </p>
                  <p className="text-xs" style={{ color: "#6b7280" }}>
                    Setara {carbon.treeEquivalent} pohon per tahun untuk
                    menyerap emisi
                  </p>
                </div>
              </div>

              {/* Regulatory Compliance */}
              <div>
                <h2
                  className="mb-3 text-lg font-bold"
                  style={{ color: "#111827" }}
                >
                  Kepatuhan Regulasi ({compliance.framework})
                </h2>
                <div className="grid gap-2 sm:grid-cols-2">
                  {compliance.met.length > 0 && (
                    <div>
                      <p
                        className="mb-1 text-sm font-medium"
                        style={{ color: "#16a34a" }}
                      >
                        Terpenuhi ({compliance.met.length})
                      </p>
                      <ul className="space-y-0.5">
                        {compliance.met.map((item) => (
                          <li
                            key={item.id}
                            className="text-xs"
                            style={{ color: "#374151" }}
                          >
                            {"\u2705"} {item.label}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {compliance.unmet.length > 0 && (
                    <div>
                      <p
                        className="mb-1 text-sm font-medium"
                        style={{ color: "#dc2626" }}
                      >
                        Belum Terpenuhi ({compliance.unmet.length})
                      </p>
                      <ul className="space-y-0.5">
                        {compliance.unmet.map((item) => (
                          <li
                            key={item.id}
                            className="text-xs"
                            style={{ color: "#374151" }}
                          >
                            {"\u274C"} {item.label}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </>
          )
        })()}

      {/* AI Summary */}
      {summaryLines.length > 0 && (
        <div>
          <h2 className="mb-4 text-lg font-bold" style={{ color: "#111827" }}>
            {d.aiAnalysis}
          </h2>
          <div className="space-y-2">
            {summaryLines.map((line, i) => (
              <p
                key={i}
                className="text-sm leading-relaxed"
                style={{ color: "#374151" }}
              >
                {line.trim()}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Industry Benchmark */}
      {score.industryBenchmark !== null && (
        <div>
          <h2 className="mb-2 text-lg font-bold" style={{ color: "#111827" }}>
            {d.industryBenchmark}
          </h2>
          <p className="text-sm" style={{ color: "#374151" }}>
            {t.dashboard.score.industryAverage} {industryLabel}:{" "}
            <span className="font-bold">{score.industryBenchmark}/100</span>
          </p>
          <p
            className="mt-1 text-sm font-medium"
            style={{
              color:
                score.totalScore >= score.industryBenchmark
                  ? "#16a34a"
                  : "#ea580c",
            }}
          >
            {score.totalScore >= score.industryBenchmark
              ? `+${score.totalScore - score.industryBenchmark} di atas rata-rata`
              : `${score.totalScore - score.industryBenchmark} di bawah rata-rata`}
          </p>
        </div>
      )}

      {/* Recommended Actions */}
      {roadmapItems.length > 0 && (
        <div>
          <h2 className="mb-4 text-lg font-bold" style={{ color: "#111827" }}>
            {d.recommendedActions}
          </h2>
          <div className="space-y-3">
            {roadmapItems.map((item, i) => (
              <div key={item.id} className="rounded-lg border p-4">
                <div className="flex items-start gap-3">
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{ backgroundColor: "#16a34a" }}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-medium" style={{ color: "#111827" }}>
                      {item.title}
                    </p>
                    <p className="mt-1 text-sm" style={{ color: "#6b7280" }}>
                      {item.description}
                    </p>
                    <div className="mt-2 flex gap-2">
                      <span
                        className="inline-block rounded-full px-2 py-0.5 text-xs font-medium"
                        style={{
                          backgroundColor: "#dcfce7",
                          color: "#166534",
                        }}
                      >
                        {d.priority}:{" "}
                        {priorities[item.priority as keyof typeof priorities]}
                      </span>
                      {item.estimated_impact && (
                        <span
                          className="inline-block rounded-full px-2 py-0.5 text-xs font-medium"
                          style={{
                            backgroundColor: "#dbeafe",
                            color: "#1e40af",
                          }}
                        >
                          {d.impact}:{" "}
                          {
                            impacts[
                              item.estimated_impact as keyof typeof impacts
                            ]
                          }
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div
        className="border-t pt-4 text-center text-xs"
        style={{ color: "#9ca3af" }}
      >
        {d.footer}
      </div>
    </div>
  )
}
