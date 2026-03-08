"use client"

import { useEffect, useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

interface ScoreGaugeProps {
  score: number
}

function getGaugeColor(score: number): string {
  if (score < 30) return "#EF4444"
  if (score < 60) return "#F59E0B"
  return "#22C55E"
}

export function ScoreGauge({ score }: ScoreGaugeProps) {
  const [displayScore, setDisplayScore] = useState(0)
  const color = getGaugeColor(score)
  const data = [
    { name: "score", value: displayScore },
    { name: "remaining", value: 100 - displayScore },
  ]

  useEffect(() => {
    let current = 0
    const step = Math.max(1, Math.floor(score / 40))
    const timer = setInterval(() => {
      current += step
      if (current >= score) {
        current = score
        clearInterval(timer)
      }
      setDisplayScore(current)
    }, 25)
    return () => clearInterval(timer)
  }, [score])

  return (
    <div className="flex flex-col items-center">
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={95}
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
            className="fill-foreground text-3xl font-bold"
          >
            {displayScore}
          </text>
          <text
            x="50%"
            y="60%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-muted-foreground text-sm"
          >
            / 100
          </text>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
