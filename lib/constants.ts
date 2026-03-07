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

export function getScoreLabel(score: number): string {
  if (score < 20) return "Sangat Rendah"
  if (score < 40) return "Rendah"
  if (score < 60) return "Sedang"
  if (score < 80) return "Baik"
  return "Sangat Baik"
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
