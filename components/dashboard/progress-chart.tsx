"use client"

import { useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTranslation } from "@/lib/i18n/language-context"

interface ProgressChartProps {
  scores: Array<{ total_score: number; created_at: string }>
}

type Range = "7d" | "30d" | "all"

export function ProgressChart({ scores }: ProgressChartProps) {
  const [range, setRange] = useState<Range>("all")
  const { t, locale } = useTranslation()
  const prg = t.dashboard.progress

  const now = new Date()
  const filteredScores = scores.filter((s) => {
    if (range === "all") return true
    const days = range === "7d" ? 7 : 30
    const cutoff = new Date(now.getTime() - days * 24 * 60 * 60 * 1000)
    return new Date(s.created_at) >= cutoff
  })

  const data = filteredScores.map((s) => ({
    date: new Date(s.created_at).toLocaleDateString(
      locale === "id" ? "id-ID" : "en-US",
      {
        day: "2-digit",
        month: "short",
      }
    ),
    score: s.total_score,
  }))

  return (
    <div className="space-y-4">
      <Tabs value={range} onValueChange={(v) => setRange(v as Range)}>
        <TabsList>
          <TabsTrigger value="7d">{t.dashboard.progress.last7Days}</TabsTrigger>
          <TabsTrigger value="30d">
            {t.dashboard.progress.last30Days}
          </TabsTrigger>
          <TabsTrigger value="all">{t.dashboard.progress.allTime}</TabsTrigger>
        </TabsList>
      </Tabs>

      {data.length === 0 ? (
        <div className="flex h-[300px] items-center justify-center">
          <p className="text-sm text-muted-foreground">
            {t.dashboard.progress.noDataInRange}
          </p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              padding={{ left: 20, right: 20 }}
            />
            <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
            <Tooltip
              formatter={(value) => [`${value}`, prg.chartScore]}
              labelFormatter={(label) => `${prg.chartDateLabel} ${label}`}
            />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 4, fill: "#3b82f6" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
