"use client"

import { useTranslation } from "@/lib/i18n/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

// ─── Props ──────────────────────────────────────────────────────

interface BenchmarkCardProps {
  userScore: number
  industryBenchmark: number
  industryLabel: string
}

// ─── Helpers ────────────────────────────────────────────────────

function getPercentileEstimate(userScore: number, benchmark: number): number {
  // Simple percentile estimate based on score vs benchmark
  // Assumes roughly normal distribution around benchmark
  const diff = userScore - benchmark
  const base = 50
  const percentile = Math.min(99, Math.max(1, base + diff * 1.2))
  return Math.round(percentile)
}

function getBarColor(above: boolean): string {
  return above ? "#22C55E" : "#F59E0B"
}

// ─── Component ──────────────────────────────────────────────────

export function BenchmarkCard({
  userScore,
  industryBenchmark,
  industryLabel,
}: BenchmarkCardProps) {
  const { locale } = useTranslation()
  const delta = userScore - industryBenchmark
  const above = delta >= 0
  const percentile = getPercentileEstimate(userScore, industryBenchmark)
  const barColor = getBarColor(above)

  const userPosition = Math.min(100, Math.max(0, userScore))
  const benchmarkPosition = Math.min(100, Math.max(0, industryBenchmark))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          {above ? (
            <TrendingUp className="size-5 text-emerald-500" />
          ) : delta < 0 ? (
            <TrendingDown className="size-5 text-amber-500" />
          ) : (
            <Minus className="size-5 text-muted-foreground" />
          )}
          {locale === "en" ? "Industry Benchmark" : "Benchmark Industri"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Percentile text */}
        <p className="text-sm">
          {locale === "en" ? (
            <>
              Your score is{" "}
              <span className="font-bold" style={{ color: barColor }}>
                {above ? "above" : "below"} {percentile}%
              </span>{" "}
              of {industryLabel} businesses
            </>
          ) : (
            <>
              Skor Anda{" "}
              <span className="font-bold" style={{ color: barColor }}>
                di {above ? "atas" : "bawah"} {percentile}%
              </span>{" "}
              perusahaan {industryLabel}
            </>
          )}
        </p>

        {/* Benchmark bar visualization */}
        <div className="space-y-2">
          <svg
            viewBox="0 0 320 60"
            className="w-full"
            role="img"
            aria-label={
              locale === "en"
                ? `Benchmark comparison: Your score ${userScore}, Industry average ${industryBenchmark}`
                : `Perbandingan benchmark: Skor Anda ${userScore}, Rata-rata industri ${industryBenchmark}`
            }
          >
            {/* Gradient bar background */}
            <defs>
              <linearGradient
                id="benchmarkGradient"
                x1="0"
                x2="1"
                y1="0"
                y2="0"
              >
                <stop offset="0%" stopColor="#EF4444" stopOpacity="0.3" />
                <stop offset="30%" stopColor="#F59E0B" stopOpacity="0.3" />
                <stop offset="60%" stopColor="#22C55E" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#16A34A" stopOpacity="0.3" />
              </linearGradient>
            </defs>

            {/* Bar track */}
            <rect
              x="10"
              y="22"
              width="300"
              height="16"
              rx="8"
              fill="url(#benchmarkGradient)"
            />

            {/* Industry average marker line */}
            <line
              x1={10 + benchmarkPosition * 3}
              y1="16"
              x2={10 + benchmarkPosition * 3}
              y2="44"
              stroke="#9CA3AF"
              strokeWidth="2"
              strokeDasharray="3,2"
            />
            <text
              x={10 + benchmarkPosition * 3}
              y="12"
              textAnchor="middle"
              fill="#9CA3AF"
              fontSize="9"
              fontWeight="500"
            >
              {locale === "en" ? "Avg" : "Rata²"}
            </text>

            {/* User score marker (pin shape) */}
            <circle cx={10 + userPosition * 3} cy="30" r="8" fill={barColor} />
            <text
              x={10 + userPosition * 3}
              y="31"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#FFFFFF"
              fontSize="8"
              fontWeight="bold"
            >
              {userScore}
            </text>

            {/* Scale labels */}
            <text x="10" y="56" fill="#9CA3AF" fontSize="9">
              0
            </text>
            <text
              x="160"
              y="56"
              textAnchor="middle"
              fill="#9CA3AF"
              fontSize="9"
            >
              50
            </text>
            <text x="310" y="56" textAnchor="end" fill="#9CA3AF" fontSize="9">
              100
            </text>
          </svg>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-lg bg-muted/50 p-3 text-center">
            <p className="text-xs text-muted-foreground">
              {locale === "en" ? "Industry Avg" : "Rata-rata industri"}
            </p>
            <p className="mt-1 text-lg font-bold">
              {industryBenchmark}
              <span className="text-xs font-normal text-muted-foreground">
                /100
              </span>
            </p>
          </div>
          <div className="rounded-lg bg-muted/50 p-3 text-center">
            <p className="text-xs text-muted-foreground">
              {locale === "en" ? "Your Score" : "Skor Anda"}
            </p>
            <p className="mt-1 text-lg font-bold">
              {userScore}
              <span className="text-xs font-normal text-muted-foreground">
                /100
              </span>
            </p>
          </div>
          <div className="rounded-lg bg-muted/50 p-3 text-center">
            <p className="text-xs text-muted-foreground">
              {locale === "en" ? "Difference" : "Selisih"}
            </p>
            <p className="mt-1 text-lg font-bold" style={{ color: barColor }}>
              {delta > 0 ? "+" : ""}
              {delta}
              <span className="text-xs font-normal text-muted-foreground">
                {" "}
                {locale === "en" ? "pts" : "poin"}
              </span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
