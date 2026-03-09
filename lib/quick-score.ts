export interface QuickAnswers {
  energy_source: "pln_only" | "diesel" | "pln_solar" | "solar"
  waste_management:
    | "none"
    | "segregation"
    | "recycling"
    | "composting"
    | "circular"
  packaging_type:
    | "single_use_plastic"
    | "recyclable"
    | "biodegradable"
    | "reusable"
  transportation: "gasoline" | "hybrid" | "electric" | "bicycle"
  has_sustainability_policy: "true" | "false"
}

const SCORES: Record<keyof QuickAnswers, Record<string, number>> = {
  energy_source: { pln_only: 30, diesel: 10, pln_solar: 70, solar: 100 },
  waste_management: {
    none: 10,
    segregation: 40,
    recycling: 60,
    composting: 80,
    circular: 100,
  },
  packaging_type: {
    single_use_plastic: 10,
    recyclable: 50,
    biodegradable: 75,
    reusable: 100,
  },
  transportation: { gasoline: 20, hybrid: 50, electric: 80, bicycle: 100 },
  has_sustainability_policy: { false: 20, true: 80 },
}

export interface QuickScoreResult {
  average: number
  range: { min: number; max: number }
  categoryScores: Record<keyof QuickAnswers, number>
}

export function calculateQuickScore(answers: QuickAnswers): QuickScoreResult {
  const scores = Object.entries(answers).map(
    ([key, value]) => SCORES[key as keyof QuickAnswers][value] ?? 0
  )
  const average = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
  const range = {
    min: Math.max(0, average - 10),
    max: Math.min(100, average + 10),
  }
  const categoryScores = Object.fromEntries(
    Object.entries(answers).map(([key, value]) => [
      key,
      SCORES[key as keyof QuickAnswers][value] ?? 0,
    ])
  ) as Record<keyof QuickAnswers, number>

  return { average, range, categoryScores }
}
