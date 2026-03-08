"use client"

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from "recharts"
import { useTranslation } from "@/lib/i18n/language-context"

interface ScoreRadarChartProps {
  scores: {
    energy: number
    waste: number
    supplyChain: number
    operations: number
    policy: number
  }
}

export function ScoreRadarChart({ scores }: ScoreRadarChartProps) {
  const { t } = useTranslation()
  const cats = t.dashboard.common.categories

  const data = [
    { category: cats.energy, value: scores.energy, fullMark: 100 },
    { category: cats.waste, value: scores.waste, fullMark: 100 },
    { category: cats.supply_chain, value: scores.supplyChain, fullMark: 100 },
    { category: cats.operations, value: scores.operations, fullMark: 100 },
    { category: cats.policy, value: scores.policy, fullMark: 100 },
  ]

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
        <PolarGrid stroke="#d1d5db" />
        <PolarAngleAxis
          dataKey="category"
          tick={{ fill: "#6b7280", fontSize: 13 }}
        />
        <Radar
          name="Score"
          dataKey="value"
          stroke="#3b82f6"
          fill="#3b82f6"
          fillOpacity={0.3}
        />
      </RadarChart>
    </ResponsiveContainer>
  )
}
