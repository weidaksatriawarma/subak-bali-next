"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

interface ProgressChartProps {
  scores: Array<{ total_score: number; created_at: string }>
}

export function ProgressChart({ scores }: ProgressChartProps) {
  const data = scores.map((s) => ({
    date: new Date(s.created_at).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
    }),
    score: s.total_score,
  }))

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 12 }}
          padding={{ left: 20, right: 20 }}
        />
        <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
        <Tooltip
          formatter={(value) => [`${value}`, "Skor"]}
          labelFormatter={(label) => `Tanggal: ${label}`}
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
  )
}
