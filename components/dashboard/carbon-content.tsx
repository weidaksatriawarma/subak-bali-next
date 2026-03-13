"use client"

import { useMemo } from "react"
import {
  Leaf,
  TreePine,
  Banknote,
  Lightbulb,
  Trash2,
  Truck,
  type LucideIcon,
} from "lucide-react"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts"
import { useTranslation } from "@/lib/i18n/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  calculateCarbonFootprint,
  calculatePotentialSavings,
} from "@/lib/carbon"
import { AskAiCard } from "@/components/shared/ask-ai-card"
import type { Assessment, BusinessSize } from "@/types/database"

// ─── Constants ──────────────────────────────────────────────────

const CHART_COLORS = {
  energy: "#22C55E",
  waste: "#F59E0B",
  transport: "#3B82F6",
}

const INDUSTRY_AVG_CO2: Record<string, number> = {
  fnb: 8500,
  retail: 6200,
  manufacturing: 15000,
  services: 4800,
  agriculture: 12000,
  other: 7500,
}

interface Recommendation {
  title: string
  description: string
  icon: LucideIcon
}

function getRecommendations(
  energyCO2: number,
  wasteCO2: number,
  transportCO2: number
): Recommendation[] {
  const categories = [
    {
      key: "energy",
      co2: energyCO2,
      recommendations: [
        {
          title: "Switch to LED & Energy-Efficient Equipment",
          description:
            "Using LED lights and energy-certified equipment can reduce electricity consumption by up to 30%.",
          icon: Lightbulb,
        },
        {
          title: "Consider Solar Panels",
          description:
            "Investing in solar panels can reduce grid dependency and significantly lower carbon emissions.",
          icon: Lightbulb,
        },
      ],
    },
    {
      key: "waste",
      co2: wasteCO2,
      recommendations: [
        {
          title: "Implement Waste Sorting & Recycling",
          description:
            "Separate organic and inorganic waste, then recycle reusable materials.",
          icon: Trash2,
        },
        {
          title: "Reduce Single-Use Packaging",
          description:
            "Switch to biodegradable or reusable packaging to reduce waste volume.",
          icon: Trash2,
        },
      ],
    },
    {
      key: "transport",
      co2: transportCO2,
      recommendations: [
        {
          title: "Optimize Routes & Use Efficient Vehicles",
          description:
            "Consolidate shipments and consider hybrid or electric vehicles for operations.",
          icon: Truck,
        },
        {
          title: "Prioritize Local Suppliers",
          description:
            "Sourcing from local suppliers reduces travel distance and transportation emissions.",
          icon: Truck,
        },
      ],
    },
  ]

  // Sort categories by CO2 descending, pick top recommendations
  const sorted = [...categories].sort((a, b) => b.co2 - a.co2)
  const result: Recommendation[] = []

  for (const cat of sorted) {
    for (const rec of cat.recommendations) {
      if (result.length >= 3) break
      result.push(rec)
    }
    if (result.length >= 3) break
  }

  return result
}

// ─── Custom Tooltip for Recharts ────────────────────────────────

function CustomBarTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: { value: number; fill: string; name: string }[]
  label?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border bg-background px-3 py-2 shadow-md">
      <p className="mb-1 text-xs font-medium">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-xs" style={{ color: entry.fill }}>
          {entry.name}: {entry.value.toLocaleString("id-ID")} kg
        </p>
      ))}
    </div>
  )
}

// ─── Component ──────────────────────────────────────────────────

interface CarbonContentProps {
  assessment: Assessment
  businessSize: BusinessSize
}

export function CarbonContent({
  assessment,
  businessSize,
}: CarbonContentProps) {
  const { t } = useTranslation()
  const d = t.dashboard.carbon

  const carbonData = useMemo(
    () => calculateCarbonFootprint(assessment),
    [assessment]
  )
  const savingsData = useMemo(
    () => calculatePotentialSavings(businessSize),
    [businessSize]
  )

  const recommendations = useMemo(
    () =>
      getRecommendations(
        carbonData.energyCO2,
        carbonData.wasteCO2,
        carbonData.transportCO2
      ),
    [carbonData]
  )

  // Derive industry from assessment (use a fallback)
  const industry =
    (assessment as Assessment & { industry?: string }).industry ?? "other"
  const industryAvg = INDUSTRY_AVG_CO2[industry] ?? INDUSTRY_AVG_CO2.other

  // ── Chart data ──

  const donutData = [
    { name: d.energyLabel, value: carbonData.energyCO2 },
    { name: d.wasteLabel, value: carbonData.wasteCO2 },
    { name: d.transportLabel, value: carbonData.transportCO2 },
  ]
  const donutColors = [
    CHART_COLORS.energy,
    CHART_COLORS.waste,
    CHART_COLORS.transport,
  ]

  const breakdownBars = [
    {
      category: d.energyLabel,
      value: carbonData.energyCO2,
      color: CHART_COLORS.energy,
    },
    {
      category: d.wasteLabel,
      value: carbonData.wasteCO2,
      color: CHART_COLORS.waste,
    },
    {
      category: d.transportLabel,
      value: carbonData.transportCO2,
      color: CHART_COLORS.transport,
    },
  ]

  const maxBreakdown = Math.max(...breakdownBars.map((b) => b.value), 1)

  const comparisonData = [
    {
      name: d.yourBusiness,
      value: carbonData.totalCO2,
    },
    {
      name: d.industryAvg,
      value: industryAvg,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{d.title}</h1>
        <p className="text-muted-foreground">{d.subtitle}</p>
      </div>

      {/* Stat Cards */}
      <Card className="border-green-200 bg-green-50/50 dark:border-green-900 dark:bg-green-950/20">
        <CardHeader>
          <CardTitle className="text-base">{d.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            {/* Total CO2 */}
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/40">
                <Leaf className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-xl font-bold text-green-700 dark:text-green-400">
                  {carbonData.totalCO2.toLocaleString("id-ID")} kg
                </p>
                <p className="text-xs text-muted-foreground">est. {d.kgYear}</p>
              </div>
            </div>

            {/* Tree Equivalent */}
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/40">
                <TreePine className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-xl font-bold text-emerald-700 dark:text-emerald-400">
                  {carbonData.treeEquivalent}
                </p>
                <p className="text-xs text-muted-foreground">
                  {d.treeEquivalent} (est. {d.trees})
                </p>
              </div>
            </div>

            {/* Potential Savings */}
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/40">
                <Banknote className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xl font-bold text-blue-700 dark:text-blue-400">
                  Rp {(savingsData.monthlySavingsRp / 1_000_000).toFixed(1)} jt
                </p>
                <p className="text-xs text-muted-foreground">
                  {d.potentialSavings} (est. {d.rpMonth})
                </p>
              </div>
            </div>
          </div>
          <p className="mt-2 text-[10px] text-muted-foreground/70">
            {d.estimateDisclaimer}
          </p>
        </CardContent>
      </Card>

      {/* Donut Chart + Horizontal Bars */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Donut Chart */}
        <Card>
          <CardHeader>
            <CardTitle>{d.breakdown}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={donutData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={95}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                  >
                    {donutData.map((_, index) => (
                      <Cell key={index} fill={donutColors[index]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) =>
                      `${Number(value).toLocaleString("id-ID")} kg`
                    }
                    contentStyle={{
                      borderRadius: "8px",
                      fontSize: "12px",
                      border: "1px solid hsl(var(--border))",
                      backgroundColor: "hsl(var(--background))",
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    iconType="circle"
                    iconSize={10}
                    wrapperStyle={{ fontSize: "12px" }}
                  />
                </PieChart>
              </ResponsiveContainer>
              {/* Center text */}
              <div
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
                style={{ marginBottom: "28px" }}
              >
                <div className="text-center">
                  <p className="text-2xl font-bold">
                    {carbonData.totalCO2.toLocaleString("id-ID")}
                  </p>
                  <p className="text-xs text-muted-foreground">kg CO₂</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Horizontal Category Bars */}
        <Card>
          <CardHeader>
            <CardTitle>{d.breakdown}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {breakdownBars.map((bar) => {
                const pct = Math.round((bar.value / maxBreakdown) * 100)
                return (
                  <div key={bar.category} className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{bar.category}</span>
                      <span className="font-bold">
                        {bar.value.toLocaleString("id-ID")} kg
                      </span>
                    </div>
                    <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full transition-all duration-700 ease-out"
                        style={{
                          width: `${pct}%`,
                          backgroundColor: bar.color,
                        }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {Math.round((bar.value / carbonData.totalCO2) * 100)}%{" "}
                      dari total emisi
                    </p>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Industry Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>{d.vsIndustry}</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={comparisonData}
              layout="vertical"
              margin={{ top: 0, right: 20, bottom: 0, left: 0 }}
            >
              <XAxis
                type="number"
                tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}t`}
                fontSize={12}
              />
              <YAxis
                type="category"
                dataKey="name"
                width={120}
                fontSize={12}
                tick={{ fill: "hsl(var(--foreground))" }}
              />
              <Tooltip content={<CustomBarTooltip />} />
              <Bar
                dataKey="value"
                name="CO₂ (kg/tahun)"
                radius={[0, 6, 6, 0]}
                barSize={32}
              >
                <Cell fill="#22C55E" />
                <Cell fill="#94A3B8" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-3 text-center">
            {carbonData.totalCO2 <= industryAvg ? (
              <p className="text-sm font-medium text-green-600 dark:text-green-400">
                {d.emissionComparisonLower.replace(
                  "{percent}",
                  String(
                    Math.round(
                      ((industryAvg - carbonData.totalCO2) / industryAvg) * 100
                    )
                  )
                )}
              </p>
            ) : (
              <p className="text-sm font-medium text-orange-500 dark:text-orange-400">
                {d.emissionComparisonHigher.replace(
                  "{percent}",
                  String(
                    Math.round(
                      ((carbonData.totalCO2 - industryAvg) / industryAvg) * 100
                    )
                  )
                )}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Top 3 Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>{d.topRecommendations}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            {recommendations.map((rec, i) => {
              const Icon = rec.icon
              return (
                <div
                  key={i}
                  className="rounded-xl border bg-muted/30 p-4 transition-colors hover:bg-muted/50"
                >
                  <div className="mb-3 flex size-10 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mb-1 text-sm font-semibold">{rec.title}</h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {rec.description}
                  </p>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <AskAiCard
        title={t.dashboard.askAiCard.carbon.title}
        description={t.dashboard.askAiCard.carbon.description}
        buttonLabel={t.dashboard.askAiCard.button}
        prompt={`Jejak karbon bisnis saya ${carbonData.totalCO2.toLocaleString("id-ID")} kg CO₂/tahun. Energi ${carbonData.energyCO2.toLocaleString("id-ID")} kg, Limbah ${carbonData.wasteCO2.toLocaleString("id-ID")} kg, Transportasi ${carbonData.transportCO2.toLocaleString("id-ID")} kg. Berikan strategi konkret untuk mengurangi emisi terbesar.`}
      />
    </div>
  )
}
