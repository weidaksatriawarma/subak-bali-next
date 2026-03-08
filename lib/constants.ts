import { Sprout, Leaf, TreePine, Trees, type LucideIcon } from "lucide-react"
import type {
  Industry,
  BusinessSize,
  Category,
  Priority,
  EstimatedImpact,
  EstimatedCost,
  Timeline,
  EnergySource,
  WasteManagement,
  PackagingType,
  TransportationType,
} from "@/types/database"
import { getIndustryRank } from "@/lib/gamification/industry-data"

export const INDUSTRY_LABELS: Record<Industry, string> = {
  fnb: "F&B (Makanan & Minuman)",
  retail: "Retail",
  manufacturing: "Manufaktur",
  services: "Jasa",
  agriculture: "Pertanian",
  other: "Lainnya",
}

export const BUSINESS_SIZE_LABELS: Record<BusinessSize, string> = {
  micro: "Mikro (< 5 karyawan)",
  small: "Kecil (5-19 karyawan)",
  medium: "Menengah (20-99 karyawan)",
}

export const CATEGORY_LABELS: Record<Category, string> = {
  energy: "Energi",
  waste: "Limbah",
  supply_chain: "Rantai Pasok",
  operations: "Operasional",
  policy: "Kebijakan",
}

export const PRIORITY_LABELS: Record<Priority, string> = {
  high: "Tinggi",
  medium: "Sedang",
  low: "Rendah",
}

export const IMPACT_LABELS: Record<EstimatedImpact, string> = {
  high: "Dampak Tinggi",
  medium: "Dampak Sedang",
  low: "Dampak Rendah",
}

export const COST_LABELS: Record<EstimatedCost, string> = {
  free: "Gratis",
  low: "Biaya Rendah",
  medium: "Biaya Sedang",
  high: "Biaya Tinggi",
}

export const TIMELINE_LABELS: Record<Timeline, string> = {
  "1_week": "1 Minggu",
  "1_month": "1 Bulan",
  "3_months": "3 Bulan",
  "6_months": "6 Bulan",
  "1_year": "1 Tahun",
}

export const ENERGY_SOURCE_LABELS: Record<EnergySource, string> = {
  pln_only: "PLN saja",
  pln_solar: "PLN + Solar Panel",
  solar_only: "Solar Panel saja",
  diesel_generator: "Genset Diesel",
}

export const WASTE_MANAGEMENT_LABELS: Record<WasteManagement, string> = {
  none: "Tidak dikelola",
  segregation: "Pemilahan",
  recycling: "Daur Ulang",
  composting: "Pengomposan",
  circular: "Ekonomi Sirkular",
}

export const PACKAGING_TYPE_LABELS: Record<PackagingType, string> = {
  single_use_plastic: "Plastik Sekali Pakai",
  recyclable: "Dapat Didaur Ulang",
  biodegradable: "Biodegradable",
  reusable: "Dapat Digunakan Ulang",
}

export const TRANSPORTATION_TYPE_LABELS: Record<TransportationType, string> = {
  gasoline: "Bensin",
  electric: "Listrik",
  hybrid: "Hybrid",
  bicycle: "Sepeda",
  none: "Tidak Ada",
}

export interface ScoreLabelInfo {
  icon: LucideIcon
  color: string
  iconColor: string
  label: string
  description: string
}

export function getScoreLabelInfo(score: number): ScoreLabelInfo {
  if (score < 20)
    return {
      icon: Sprout,
      color: "bg-red-100 dark:bg-red-900/50",
      iconColor: "text-red-500",
      label: "Benih Kecil",
      description: "Baru mulai! Yuk tumbuh bersama",
    }
  if (score < 40)
    return {
      icon: Sprout,
      color: "bg-orange-100 dark:bg-orange-900/50",
      iconColor: "text-orange-500",
      label: "Tunas Muda",
      description: "Sudah mulai tumbuh, terus semangat!",
    }
  if (score < 60)
    return {
      icon: Leaf,
      color: "bg-yellow-100 dark:bg-yellow-900/50",
      iconColor: "text-yellow-500",
      label: "Pohon yang Tumbuh",
      description: "Bisnis kamu makin hijau!",
    }
  if (score < 80)
    return {
      icon: TreePine,
      color: "bg-green-100 dark:bg-green-900/50",
      iconColor: "text-green-500",
      label: "Pohon Rindang",
      description: "Hebat! Sudah jadi teladan",
    }
  return {
    icon: Trees,
    color: "bg-emerald-100 dark:bg-emerald-900/50",
    iconColor: "text-emerald-500",
    label: "Hutan Lestari",
    description: "Luar biasa! Champion keberlanjutan!",
  }
}

export function getScoreLabel(score: number): string {
  return getScoreLabelInfo(score).label
}

export function getIndustryScoreLabelInfo(
  industry: Industry,
  score: number
): ScoreLabelInfo {
  const { rank } = getIndustryRank(industry, score)
  const base = getScoreLabelInfo(score)
  return { ...base, label: rank }
}

export const CATEGORY_EMOJI: Record<Category, string> = {
  energy: "\u{1F4A1}",
  waste: "\u267B\uFE0F",
  supply_chain: "\u{1F4E6}",
  operations: "\u2699\uFE0F",
  policy: "\u{1F4CB}",
}

export function getScoreFeedback(score: number): string {
  if (score < 30) return "Perlu usaha lagi"
  if (score < 60) return "Lumayan!"
  if (score < 80) return "Bagus!"
  return "Keren banget!"
}

export function getScoreColor(score: number): string {
  if (score < 30) return "text-red-500"
  if (score < 60) return "text-orange-500"
  return "text-green-500"
}

export function getScoreBgColor(score: number): string {
  if (score < 30) return "bg-red-500"
  if (score < 60) return "bg-orange-500"
  return "bg-green-500"
}
