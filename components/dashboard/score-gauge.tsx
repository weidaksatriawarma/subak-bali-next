"use client"

import { useEffect, useRef, useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

interface ScoreGaugeProps {
  score: number
}

function getGaugeColor(score: number): string {
  if (score < 30) return "#EF4444"
  if (score < 60) return "#F59E0B"
  return "#22C55E"
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

export function ScoreGauge({ score }: ScoreGaugeProps) {
  const [displayScore, setDisplayScore] = useState(0)
  const animationRef = useRef<number>(0)
  const color = getGaugeColor(score)
  const data = [
    { name: "score", value: displayScore },
    { name: "remaining", value: 100 - displayScore },
  ]

  useEffect(() => {
    const duration = 1200
    const delay = 500
    let startTime: number | null = null

    const timeout = setTimeout(() => {
      function animate(timestamp: number) {
        if (!startTime) startTime = timestamp
        const elapsed = timestamp - startTime
        const progress = Math.min(elapsed / duration, 1)
        const easedProgress = easeOutCubic(progress)

        setDisplayScore(Math.round(easedProgress * score))

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate)
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }, delay)

    return () => {
      clearTimeout(timeout)
      cancelAnimationFrame(animationRef.current)
    }
  }, [score])

  return (
    <div className="flex flex-col items-center">
      <ResponsiveContainer
        width="100%"
        height={140}
        className="sm:!h-[160px] lg:!h-[170px]"
      >
        <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius="85%"
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
