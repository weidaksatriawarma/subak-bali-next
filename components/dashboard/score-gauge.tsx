"use client"

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { getScoreLabel } from "@/lib/constants"

interface ScoreGaugeProps {
  score: number
}

function getGaugeColor(score: number): string {
  if (score < 30) return "#EF4444"
  if (score < 60) return "#F59E0B"
  return "#22C55E"
}

export function ScoreGauge({ score }: ScoreGaugeProps) {
  const color = getGaugeColor(score)
  const data = [
    { name: "score", value: score },
    { name: "remaining", value: 100 - score },
  ]

  return (
    <div className="flex flex-col items-center">
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={110}
            startAngle={90}
            endAngle={-270}
            dataKey="value"
            stroke="none"
          >
            <Cell fill={color} />
            <Cell fill="#e5e7eb" />
          </Pie>
          <text
            x="50%"
            y="46%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-foreground text-4xl font-bold"
          >
            {score}
          </text>
          <text
            x="50%"
            y="58%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-muted-foreground text-sm"
          >
            {getScoreLabel(score)}
          </text>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
