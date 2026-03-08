import type { Assessment } from "@/types/database"

export interface CategoryScores {
  energy: number
  waste: number
  supply_chain: number
  operations: number
  policy: number
}

export function calculateScores(
  assessment: Partial<Assessment>
): CategoryScores {
  return {
    energy: calculateEnergyScore(assessment),
    waste: calculateWasteScore(assessment),
    supply_chain: calculateSupplyChainScore(assessment),
    operations: calculateOperationsScore(assessment),
    policy: calculatePolicyScore(assessment),
  }
}

export function calculateTotalScore(scores: CategoryScores): number {
  const values = Object.values(scores)
  return Math.round(values.reduce((a, b) => a + b, 0) / values.length)
}

function calculateEnergyScore(a: Partial<Assessment>): number {
  let score = 0
  switch (a.energy_source) {
    case "solar_only":
      score += 40
      break
    case "pln_solar":
      score += 30
      break
    case "pln_only":
      score += 15
      break
    case "diesel_generator":
      score += 5
      break
  }
  if (a.uses_energy_efficient_equipment) score += 30
  const kwh = a.monthly_electricity_kwh ?? 500
  if (kwh < 200) score += 30
  else if (kwh < 400) score += 20
  else if (kwh < 600) score += 10
  return Math.min(score, 100)
}

function calculateWasteScore(a: Partial<Assessment>): number {
  let score = 0
  switch (a.waste_management) {
    case "circular":
      score += 40
      break
    case "composting":
      score += 35
      break
    case "recycling":
      score += 30
      break
    case "segregation":
      score += 15
      break
    case "none":
      score += 5
      break
  }
  if (a.plastic_reduction_efforts) score += 25
  const wasteKg = a.waste_volume_kg_monthly ?? 100
  if (wasteKg < 50) score += 35
  else if (wasteKg < 100) score += 25
  else if (wasteKg < 200) score += 15
  else score += 5
  return Math.min(score, 100)
}

function calculateSupplyChainScore(a: Partial<Assessment>): number {
  let score = 0
  const localPct = a.local_sourcing_percentage ?? 0
  if (localPct >= 80) score += 35
  else if (localPct >= 50) score += 25
  else if (localPct >= 20) score += 15
  else score += 5
  if (a.supplier_sustainability_check) score += 30
  switch (a.packaging_type) {
    case "reusable":
      score += 35
      break
    case "biodegradable":
      score += 30
      break
    case "recyclable":
      score += 20
      break
    case "single_use_plastic":
      score += 5
      break
  }
  return Math.min(score, 100)
}

function calculateOperationsScore(a: Partial<Assessment>): number {
  let score = 0
  if (a.water_conservation) score += 30
  if (a.digital_operations) score += 30
  switch (a.transportation_type) {
    case "none":
    case "bicycle":
      score += 40
      break
    case "electric":
      score += 35
      break
    case "hybrid":
      score += 25
      break
    case "gasoline":
      score += 10
      break
  }
  return Math.min(score, 100)
}

function calculatePolicyScore(a: Partial<Assessment>): number {
  let score = 0
  if (a.has_sustainability_policy) score += 35
  if (a.employee_sustainability_training) score += 35
  if (a.community_engagement) score += 30
  return Math.min(score, 100)
}

export function predictScoreImpact(
  priority: "high" | "medium" | "low",
  impact: "high" | "medium" | "low" | null
): number {
  const priorityPoints = { high: 3, medium: 2, low: 1 }
  const impactPoints = { high: 3, medium: 2, low: 1 }
  return priorityPoints[priority] + (impact ? impactPoints[impact] : 1)
}
