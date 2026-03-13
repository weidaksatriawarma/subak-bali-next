import type { Industry, Category } from "@/types/database"

// Scoring weights per industry
export const INDUSTRY_SCORING_WEIGHTS: Record<
  Industry,
  Record<Category, number>
> = {
  fnb: {
    energy: 0.15,
    waste: 0.3,
    supply_chain: 0.2,
    operations: 0.2,
    policy: 0.15,
  },
  retail: {
    energy: 0.25,
    waste: 0.2,
    supply_chain: 0.25,
    operations: 0.15,
    policy: 0.15,
  },
  manufacturing: {
    energy: 0.3,
    waste: 0.25,
    supply_chain: 0.15,
    operations: 0.2,
    policy: 0.1,
  },
  services: {
    energy: 0.2,
    waste: 0.1,
    supply_chain: 0.15,
    operations: 0.35,
    policy: 0.2,
  },
  agriculture: {
    energy: 0.2,
    waste: 0.2,
    supply_chain: 0.25,
    operations: 0.25,
    policy: 0.1,
  },
  other: {
    energy: 0.2,
    waste: 0.2,
    supply_chain: 0.2,
    operations: 0.2,
    policy: 0.2,
  },
}

// Industry rank names (5 tiers each, mapped to score ranges 0-20, 20-40, 40-60, 60-80, 80-100)
export const INDUSTRY_RANKS: Record<Industry, string[]> = {
  fnb: [
    "Beginner Kitchen",
    "Green-Aware Cafe",
    "Sustainable Restaurant",
    "Eco-Friendly Kitchen",
    "Sustainability Chef",
  ],
  retail: [
    "Beginner Store",
    "Eco-Conscious Seller",
    "Earth-Friendly Retail",
    "Green Model Store",
    "Zero Waste Retail",
  ],
  manufacturing: [
    "Conventional Factory",
    "Emission-Aware Factory",
    "Clean Manufacturing",
    "Green Industry",
    "Zero Waste Factory",
  ],
  services: [
    "Standard Office",
    "Energy-Saving Office",
    "Green Digital Services",
    "Sustainable Office",
    "Green Service Pioneer",
  ],
  agriculture: [
    "Traditional Farmer",
    "Eco-Conscious Farmer",
    "Semi-Organic Farming",
    "Organic Farming",
    "Regenerative Farming",
  ],
  other: [
    "Small Seed",
    "Young Sprout",
    "Growing Tree",
    "Shady Tree",
    "Sustainable Forest",
  ],
}

// Industry badge definitions
export interface IndustryBadge {
  id: string
  emoji: string
  name: string
  condition: (categoryScores: Record<Category, number>) => boolean
}

export const INDUSTRY_BADGES: Record<Industry, IndustryBadge[]> = {
  fnb: [
    {
      id: "fnb-dapur-hijau",
      emoji: "\u{1F343}",
      name: "Green Kitchen",
      condition: (s) => s.energy >= 60,
    },
    {
      id: "fnb-menu-berkelanjutan",
      emoji: "\u{1F957}",
      name: "Sustainable Menu",
      condition: (s) => s.supply_chain >= 60,
    },
    {
      id: "fnb-zero-food-waste",
      emoji: "\u267B\uFE0F",
      name: "Zero Food Waste",
      condition: (s) => s.waste >= 80,
    },
  ],
  retail: [
    {
      id: "retail-tanpa-plastik",
      emoji: "\u{1F6CD}\uFE0F",
      name: "Plastic-Free Store",
      condition: (s) => s.waste >= 60,
    },
    {
      id: "retail-hemat-energi",
      emoji: "\u{1F4A1}",
      name: "Energy-Saving Retail",
      condition: (s) => s.energy >= 60,
    },
    {
      id: "retail-rantai-hijau",
      emoji: "\u{1F4E6}",
      name: "Green Supply Chain",
      condition: (s) => s.supply_chain >= 80,
    },
  ],
  manufacturing: [
    {
      id: "mfg-pabrik-bersih",
      emoji: "\u{1F3ED}",
      name: "Clean Factory",
      condition: (s) => s.waste >= 60,
    },
    {
      id: "mfg-efisiensi-energi",
      emoji: "\u26A1",
      name: "Industrial Energy Efficiency",
      condition: (s) => s.energy >= 60,
    },
    {
      id: "mfg-produksi-sirkular",
      emoji: "\u{1F504}",
      name: "Circular Production",
      condition: (s) => s.waste >= 80 && s.supply_chain >= 60,
    },
  ],
  services: [
    {
      id: "svc-digital-hijau",
      emoji: "\u{1F4BB}",
      name: "Green Digital Office",
      condition: (s) => s.operations >= 60,
    },
    {
      id: "svc-paperless",
      emoji: "\u{1F4C4}",
      name: "Paperless Office",
      condition: (s) => s.operations >= 80,
    },
    {
      id: "svc-kebijakan-hijau",
      emoji: "\u{1F331}",
      name: "Green Policy",
      condition: (s) => s.policy >= 60,
    },
  ],
  agriculture: [
    {
      id: "agri-organik",
      emoji: "\u{1F33E}",
      name: "Organic Farming",
      condition: (s) => s.supply_chain >= 60,
    },
    {
      id: "agri-irigasi",
      emoji: "\u{1F4A7}",
      name: "Smart Irrigation",
      condition: (s) => s.operations >= 60,
    },
    {
      id: "agri-tanah-sehat",
      emoji: "\u{1F33F}",
      name: "Healthy Soil",
      condition: (s) => s.waste >= 60 && s.operations >= 60,
    },
  ],
  other: [],
}

// Static percentile benchmarks per industry (simulated data)
export const INDUSTRY_BENCHMARKS: Record<
  Industry,
  { median: number; p25: number; p75: number; p90: number }
> = {
  fnb: { median: 38, p25: 25, p75: 55, p90: 72 },
  retail: { median: 42, p25: 28, p75: 58, p90: 75 },
  manufacturing: { median: 35, p25: 22, p75: 52, p90: 68 },
  services: { median: 45, p25: 30, p75: 60, p90: 78 },
  agriculture: { median: 32, p25: 20, p75: 48, p90: 65 },
  other: { median: 40, p25: 26, p75: 56, p90: 70 },
}

export function getIndustryRank(
  industry: Industry,
  score: number
): { rank: string; tier: number } {
  const ranks = INDUSTRY_RANKS[industry]
  const tier =
    score < 20 ? 0 : score < 40 ? 1 : score < 60 ? 2 : score < 80 ? 3 : 4
  return { rank: ranks[tier], tier }
}

export function getIndustryPercentile(
  industry: Industry,
  score: number
): number {
  const bench = INDUSTRY_BENCHMARKS[industry]
  if (score <= bench.p25) return Math.round((score / bench.p25) * 25)
  if (score <= bench.median)
    return (
      25 + Math.round(((score - bench.p25) / (bench.median - bench.p25)) * 25)
    )
  if (score <= bench.p75)
    return (
      50 +
      Math.round(((score - bench.median) / (bench.p75 - bench.median)) * 25)
    )
  if (score <= bench.p90)
    return 75 + Math.round(((score - bench.p75) / (bench.p90 - bench.p75)) * 15)
  return Math.min(
    99,
    90 + Math.round(((score - bench.p90) / (100 - bench.p90)) * 9)
  )
}

export function computeIndustryBadges(
  industry: Industry,
  categoryScores: Record<Category, number>
): IndustryBadge[] {
  return INDUSTRY_BADGES[industry].filter((badge) =>
    badge.condition(categoryScores)
  )
}
