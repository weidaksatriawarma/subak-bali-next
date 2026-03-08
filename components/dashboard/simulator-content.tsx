"use client"

import { useState, useMemo } from "react"
import { useTranslation } from "@/lib/i18n/language-context"
import { calculateScores, calculateTotalScore } from "@/lib/scoring"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { RotateCcw } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import type { Assessment } from "@/types/database"

interface SimulatorContentProps {
  assessment: Assessment
  currentTotalScore: number
}

type Category = "energy" | "waste" | "supply_chain" | "operations" | "policy"

interface Scenario {
  id: string
  label: string
  labelEn: string
  category: Category
  changes: Partial<Assessment>
}

const SCENARIOS: Scenario[] = [
  {
    id: "energy_efficient",
    label: "Beralih ke peralatan hemat energi",
    labelEn: "Switch to energy-efficient equipment",
    category: "energy",
    changes: { uses_energy_efficient_equipment: true },
  },
  {
    id: "solar_energy",
    label: "Pasang panel surya (hybrid PLN+Solar)",
    labelEn: "Install solar panels (hybrid PLN+Solar)",
    category: "energy",
    changes: { energy_source: "pln_solar" },
  },
  {
    id: "waste_recycling",
    label: "Mulai program daur ulang limbah",
    labelEn: "Start waste recycling program",
    category: "waste",
    changes: { waste_management: "recycling" },
  },
  {
    id: "plastic_reduction",
    label: "Kurangi penggunaan plastik sekali pakai",
    labelEn: "Reduce single-use plastic",
    category: "waste",
    changes: { plastic_reduction_efforts: true },
  },
  {
    id: "local_sourcing",
    label: "Tingkatkan sumber lokal ke 60%+",
    labelEn: "Increase local sourcing to 60%+",
    category: "supply_chain",
    changes: { local_sourcing_percentage: 60 },
  },
  {
    id: "supplier_check",
    label: "Evaluasi keberlanjutan supplier",
    labelEn: "Evaluate supplier sustainability",
    category: "supply_chain",
    changes: { supplier_sustainability_check: true },
  },
  {
    id: "water_conservation",
    label: "Terapkan konservasi air",
    labelEn: "Implement water conservation",
    category: "operations",
    changes: { water_conservation: true },
  },
  {
    id: "digital_ops",
    label: "Digitalkan operasi bisnis",
    labelEn: "Digitize business operations",
    category: "operations",
    changes: { digital_operations: true },
  },
  {
    id: "sustainability_policy",
    label: "Buat kebijakan sustainability tertulis",
    labelEn: "Create written sustainability policy",
    category: "policy",
    changes: { has_sustainability_policy: true },
  },
  {
    id: "employee_training",
    label: "Adakan pelatihan sustainability karyawan",
    labelEn: "Conduct employee sustainability training",
    category: "policy",
    changes: { employee_sustainability_training: true },
  },
]

const CATEGORY_COLORS: Record<Category, string> = {
  energy: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
  waste: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  supply_chain: "bg-blue-500/15 text-blue-700 dark:text-blue-400",
  operations: "bg-violet-500/15 text-violet-700 dark:text-violet-400",
  policy: "bg-rose-500/15 text-rose-700 dark:text-rose-400",
}

function getScoreColor(score: number): string {
  if (score >= 60) return "#22c55e"
  if (score >= 30) return "#f59e0b"
  return "#ef4444"
}

function getScoreTrackColor(score: number): string {
  if (score >= 60) return "#22c55e20"
  if (score >= 30) return "#f59e0b20"
  return "#ef444420"
}

function ScoreGauge({
  score,
  label,
  size = 160,
}: {
  score: number
  label: string
  size?: number
}) {
  const color = getScoreColor(score)
  const trackColor = getScoreTrackColor(score)
  const data = [
    { name: "score", value: score },
    { name: "remaining", value: 100 - score },
  ]

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={size * 0.35}
              outerRadius={size * 0.45}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              stroke="none"
            >
              <Cell fill={color} />
              <Cell fill={trackColor} />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-3xl font-bold tabular-nums transition-all duration-500"
            style={{ color }}
          >
            {score}
          </span>
          <span className="text-xs text-muted-foreground">/100</span>
        </div>
      </div>
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
    </div>
  )
}

function isAlreadyAchieved(
  scenario: Scenario,
  assessment: Assessment
): boolean {
  const changes = scenario.changes

  if (
    changes.uses_energy_efficient_equipment !== undefined &&
    assessment.uses_energy_efficient_equipment ===
      changes.uses_energy_efficient_equipment
  )
    return true

  if (changes.energy_source !== undefined) {
    const rank = ["diesel_generator", "pln_only", "pln_solar", "solar_only"]
    const currentIdx = rank.indexOf(assessment.energy_source ?? "")
    const targetIdx = rank.indexOf(changes.energy_source ?? "")
    if (currentIdx >= targetIdx) return true
  }

  if (changes.waste_management !== undefined) {
    const rank = ["none", "segregation", "recycling", "composting", "circular"]
    const currentIdx = rank.indexOf(assessment.waste_management ?? "")
    const targetIdx = rank.indexOf(changes.waste_management ?? "")
    if (currentIdx >= targetIdx) return true
  }

  if (
    changes.plastic_reduction_efforts !== undefined &&
    assessment.plastic_reduction_efforts === changes.plastic_reduction_efforts
  )
    return true

  if (
    changes.local_sourcing_percentage !== undefined &&
    changes.local_sourcing_percentage !== null &&
    (assessment.local_sourcing_percentage ?? 0) >=
      changes.local_sourcing_percentage
  )
    return true

  if (
    changes.supplier_sustainability_check !== undefined &&
    assessment.supplier_sustainability_check ===
      changes.supplier_sustainability_check
  )
    return true

  if (
    changes.water_conservation !== undefined &&
    assessment.water_conservation === changes.water_conservation
  )
    return true

  if (
    changes.digital_operations !== undefined &&
    assessment.digital_operations === changes.digital_operations
  )
    return true

  if (
    changes.has_sustainability_policy !== undefined &&
    assessment.has_sustainability_policy === changes.has_sustainability_policy
  )
    return true

  if (
    changes.employee_sustainability_training !== undefined &&
    assessment.employee_sustainability_training ===
      changes.employee_sustainability_training
  )
    return true

  return false
}

export function SimulatorContent({
  assessment,
  currentTotalScore,
}: SimulatorContentProps) {
  const { locale, t } = useTranslation()
  const sim = t.dashboard.simulator
  const categories = t.dashboard.common.categories

  const [activeToggles, setActiveToggles] = useState<Set<string>>(new Set())

  const availableScenarios = useMemo(
    () => SCENARIOS.filter((s) => !isAlreadyAchieved(s, assessment)),
    [assessment]
  )

  const baseScore = useMemo(() => {
    const scores = calculateScores(assessment)
    return calculateTotalScore(scores)
  }, [assessment])

  const projectedScore = useMemo(() => {
    if (activeToggles.size === 0) return baseScore
    let merged: Partial<Assessment> = { ...assessment }
    for (const scenario of availableScenarios) {
      if (activeToggles.has(scenario.id)) {
        merged = { ...merged, ...scenario.changes }
      }
    }
    const scores = calculateScores(merged)
    return calculateTotalScore(scores)
  }, [activeToggles, assessment, availableScenarios, baseScore])

  const allOnScore = useMemo(() => {
    let merged: Partial<Assessment> = { ...assessment }
    for (const scenario of availableScenarios) {
      merged = { ...merged, ...scenario.changes }
    }
    const scores = calculateScores(merged)
    return calculateTotalScore(scores)
  }, [assessment, availableScenarios])

  const scenarioDeltas = useMemo(() => {
    const deltas: Record<string, number> = {}
    for (const scenario of availableScenarios) {
      const merged: Partial<Assessment> = { ...assessment, ...scenario.changes }
      const scores = calculateScores(merged)
      const total = calculateTotalScore(scores)
      deltas[scenario.id] = total - baseScore
    }
    return deltas
  }, [assessment, availableScenarios, baseScore])

  const handleToggle = (id: string) => {
    setActiveToggles((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const handleReset = () => {
    setActiveToggles(new Set())
  }

  const scoreDiff = projectedScore - baseScore

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 p-4 pb-24 md:p-6 md:pb-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{sim.title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{sim.subtitle}</p>
      </div>

      {/* Score Gauges */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card>
          <CardContent className="flex items-center justify-center py-6">
            <ScoreGauge score={currentTotalScore} label={sim.currentScore} />
          </CardContent>
        </Card>
        <Card
          className={
            scoreDiff > 0
              ? "ring-2 ring-green-500/30 dark:ring-green-400/20"
              : ""
          }
        >
          <CardContent className="flex flex-col items-center justify-center gap-1 py-6">
            <ScoreGauge score={projectedScore} label={sim.projectedScore} />
            {scoreDiff > 0 && (
              <span className="mt-1 text-sm font-semibold text-green-600 transition-all duration-500 dark:text-green-400">
                +{scoreDiff} {sim.pointIncrease}
              </span>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Scenario Toggles */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">
            {locale === "id" ? "Skenario Perubahan" : "Change Scenarios"}
          </CardTitle>
          {activeToggles.size > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="gap-1.5 text-muted-foreground"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              {sim.reset}
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {availableScenarios.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              {locale === "id"
                ? "Semua skenario sudah tercapai! Luar biasa!"
                : "All scenarios already achieved! Amazing!"}
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {availableScenarios.map((scenario) => {
                const isActive = activeToggles.has(scenario.id)
                const delta = scenarioDeltas[scenario.id] ?? 0
                const categoryLabel =
                  categories[scenario.category as keyof typeof categories]

                return (
                  <div
                    key={scenario.id}
                    className={
                      "flex items-start gap-3 rounded-lg border p-3 transition-all duration-300 " +
                      (isActive
                        ? "border-green-500/40 bg-green-500/5 dark:border-green-400/30 dark:bg-green-400/5"
                        : "border-border bg-card hover:bg-muted/50")
                    }
                  >
                    <Switch
                      checked={isActive}
                      onCheckedChange={() => handleToggle(scenario.id)}
                      className="mt-0.5 shrink-0"
                    />
                    <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                      <span className="text-sm leading-tight font-medium">
                        {locale === "en" ? scenario.labelEn : scenario.label}
                      </span>
                      <div className="flex flex-wrap items-center gap-1.5">
                        <Badge
                          variant="secondary"
                          className={
                            "border-0 text-[10px] " +
                            CATEGORY_COLORS[scenario.category]
                          }
                        >
                          {categoryLabel}
                        </Badge>
                        {delta > 0 && (
                          <span className="text-xs font-semibold text-green-600 dark:text-green-400">
                            +{delta} {sim.pointIncrease}
                          </span>
                        )}
                        {delta === 0 && (
                          <span className="text-xs text-muted-foreground">
                            ~0 {sim.pointIncrease}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Summary Bar */}
      {availableScenarios.length > 0 && (
        <Card className="border-dashed">
          <CardContent className="py-4">
            <p className="text-center text-sm text-muted-foreground">
              {sim.ifAllApplied}{" "}
              <span className="font-bold text-foreground">{baseScore}</span>{" "}
              {sim.to}{" "}
              <span className="font-bold text-green-600 dark:text-green-400">
                {allOnScore}
              </span>{" "}
              <span className="text-green-600 dark:text-green-400">
                (+{allOnScore - baseScore} {sim.pointIncrease})
              </span>
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
