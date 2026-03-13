import type { Assessment, BusinessSize } from "@/types/database"

// ─── Indonesian Emission Factors ─────────────────────────────────

const ENERGY_EMISSION_FACTORS: Record<string, number> = {
  pln_only: 0.78, // kg CO2/kWh — PLN grid average
  pln_solar: 0.39,
  solar_only: 0.05,
  diesel_generator: 0.84,
}

const TRANSPORT_ANNUAL_CO2: Record<string, number> = {
  gasoline: 2400,
  electric: 400,
  hybrid: 1200,
  bicycle: 0,
  none: 0,
}

const WASTE_EMISSION_FACTORS: Record<string, number> = {
  none: 0.5, // kg CO2/kg waste — landfill
  segregation: 0.35,
  recycling: 0.1,
  composting: 0.1,
  circular: 0.05,
}

// ─── Cost Savings by Category (Rp/month) ─────────────────────────

const SAVINGS_BY_CATEGORY: Record<
  string,
  Record<BusinessSize, { min: number; max: number }>
> = {
  energy: {
    micro: { min: 200_000, max: 400_000 },
    small: { min: 400_000, max: 600_000 },
    medium: { min: 600_000, max: 800_000 },
    large: { min: 800_000, max: 1_200_000 },
  },
  waste: {
    micro: { min: 100_000, max: 150_000 },
    small: { min: 150_000, max: 200_000 },
    medium: { min: 200_000, max: 300_000 },
    large: { min: 300_000, max: 500_000 },
  },
  supply_chain: {
    micro: { min: 50_000, max: 100_000 },
    small: { min: 100_000, max: 150_000 },
    medium: { min: 150_000, max: 200_000 },
    large: { min: 200_000, max: 350_000 },
  },
  operations: {
    micro: { min: 50_000, max: 80_000 },
    small: { min: 80_000, max: 120_000 },
    medium: { min: 120_000, max: 150_000 },
    large: { min: 150_000, max: 250_000 },
  },
  policy: {
    micro: { min: 0, max: 0 },
    small: { min: 0, max: 0 },
    medium: { min: 0, max: 0 },
    large: { min: 0, max: 0 },
  },
}

// ─── Regulatory Compliance Mapping ───────────────────────────────

export interface ComplianceItem {
  id: string
  label: string
  labelEn: string
  weight: number
}

export const COMPLIANCE_ITEMS: ComplianceItem[] = [
  {
    id: "sustainability_policy",
    label: "Kebijakan sustainability",
    labelEn: "Sustainability policy",
    weight: 20,
  },
  {
    id: "waste_management",
    label: "Pengelolaan limbah (recycling+)",
    labelEn: "Waste management (recycling+)",
    weight: 15,
  },
  {
    id: "energy_efficient",
    label: "Peralatan hemat energi",
    labelEn: "Energy efficient equipment",
    weight: 15,
  },
  {
    id: "supplier_check",
    label: "Evaluasi keberlanjutan supplier",
    labelEn: "Supplier sustainability check",
    weight: 10,
  },
  {
    id: "employee_training",
    label: "Pelatihan karyawan",
    labelEn: "Employee training",
    weight: 10,
  },
  {
    id: "community_engagement",
    label: "Keterlibatan komunitas",
    labelEn: "Community engagement",
    weight: 10,
  },
  {
    id: "digital_operations",
    label: "Operasi digital",
    labelEn: "Digital operations",
    weight: 10,
  },
  {
    id: "water_conservation",
    label: "Konservasi air",
    labelEn: "Water conservation",
    weight: 10,
  },
]

// ─── Carbon Footprint Calculator ─────────────────────────────────

export interface CarbonFootprint {
  energyCO2: number
  wasteCO2: number
  transportCO2: number
  totalCO2: number
  treeEquivalent: number
}

export function calculateCarbonFootprint(
  assessment: Partial<Assessment>
): CarbonFootprint {
  const monthlyKwh = Math.min(
    Math.max(assessment.monthly_electricity_kwh ?? 500, 0),
    100_000
  )
  const energySource = assessment.energy_source ?? "pln_only"
  const wasteKg = Math.min(
    Math.max(assessment.waste_volume_kg_monthly ?? 100, 0),
    50_000
  )
  const wasteManagement = assessment.waste_management ?? "none"
  const transportType = assessment.transportation_type ?? "gasoline"

  const energyCO2 =
    monthlyKwh * (ENERGY_EMISSION_FACTORS[energySource] ?? 0.78) * 12
  const wasteCO2 =
    wasteKg * (WASTE_EMISSION_FACTORS[wasteManagement] ?? 0.5) * 12
  const transportCO2 = TRANSPORT_ANNUAL_CO2[transportType] ?? 2400

  const totalCO2 = Math.round(energyCO2 + wasteCO2 + transportCO2)

  return {
    energyCO2: Math.round(energyCO2),
    wasteCO2: Math.round(wasteCO2),
    transportCO2: Math.round(transportCO2),
    totalCO2,
    treeEquivalent: Math.round(totalCO2 / 22),
  }
}

// ─── Potential Savings Calculator ────────────────────────────────

export interface PotentialSavings {
  monthlySavingsRp: number
  annualSavingsRp: number
  byCategory: { category: string; savingsRp: number }[]
}

export function calculatePotentialSavings(
  businessSize: BusinessSize,
  incompleteCategoryCount?: Record<string, number>
): PotentialSavings {
  const categories = ["energy", "waste", "supply_chain", "operations"]
  const byCategory: { category: string; savingsRp: number }[] = []
  let total = 0

  for (const cat of categories) {
    const range = SAVINGS_BY_CATEGORY[cat]?.[businessSize]
    if (!range) continue
    // Use the middle value unless we have specific counts
    const count = incompleteCategoryCount?.[cat] ?? 1
    const avg = Math.round(((range.min + range.max) / 2) * Math.min(count, 2))
    byCategory.push({ category: cat, savingsRp: avg })
    total += avg
  }

  return {
    monthlySavingsRp: total,
    annualSavingsRp: total * 12,
    byCategory,
  }
}

// ─── Regulatory Compliance Calculator ────────────────────────────

export interface RegulatoryCompliance {
  overallPercent: number
  framework: string
  met: { id: string; label: string; labelEn: string }[]
  unmet: { id: string; label: string; labelEn: string }[]
}

export function calculateRegulatoryCompliance(
  assessment: Partial<Assessment>
): RegulatoryCompliance {
  const met: { id: string; label: string; labelEn: string }[] = []
  const unmet: { id: string; label: string; labelEn: string }[] = []
  let totalWeight = 0

  const checks: Record<string, boolean> = {
    sustainability_policy: !!assessment.has_sustainability_policy,
    waste_management:
      assessment.waste_management === "recycling" ||
      assessment.waste_management === "composting" ||
      assessment.waste_management === "circular",
    energy_efficient: !!assessment.uses_energy_efficient_equipment,
    supplier_check: !!assessment.supplier_sustainability_check,
    employee_training: !!assessment.employee_sustainability_training,
    community_engagement: !!assessment.community_engagement,
    digital_operations: !!assessment.digital_operations,
    water_conservation: !!assessment.water_conservation,
  }

  for (const item of COMPLIANCE_ITEMS) {
    if (checks[item.id]) {
      met.push({ id: item.id, label: item.labelEn, labelEn: item.labelEn })
      totalWeight += item.weight
    } else {
      unmet.push({ id: item.id, label: item.labelEn, labelEn: item.labelEn })
    }
  }

  return {
    overallPercent: totalWeight,
    framework: "POJK 51/2017 & TKBI",
    met,
    unmet,
  }
}
