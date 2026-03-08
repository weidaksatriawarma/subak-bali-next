import type { Category } from "@/types/database"

export interface SDGInfo {
  number: number
  color: string
  categories: Category[]
}

export interface SDGResult extends SDGInfo {
  active: boolean
  avgScore: number
}

export const SDG_LIST: SDGInfo[] = [
  {
    number: 6,
    color: "#26BDE2",
    categories: ["operations"],
  },
  {
    number: 7,
    color: "#FCC30B",
    categories: ["energy"],
  },
  {
    number: 8,
    color: "#A21942",
    categories: ["policy", "operations"],
  },
  {
    number: 11,
    color: "#FD9D24",
    categories: ["operations", "supply_chain"],
  },
  {
    number: 12,
    color: "#BF8B2E",
    categories: ["waste", "supply_chain"],
  },
  {
    number: 13,
    color: "#3F7E44",
    categories: ["energy", "waste", "operations"],
  },
]

export type CategoryScoresMap = Record<Category, number>

export function computeSDGScores(
  categoryScores: CategoryScoresMap
): SDGResult[] {
  return SDG_LIST.map((sdg) => {
    const scores = sdg.categories.map((cat) => categoryScores[cat])
    const avgScore =
      scores.length > 0
        ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
        : 0
    return {
      ...sdg,
      active: avgScore >= 50,
      avgScore,
    }
  })
}
