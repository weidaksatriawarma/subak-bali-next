import type { Industry } from "@/types/database"

export type QuestionType = "boolean" | "enum" | "slider"

export interface IndustryQuestion {
  id: string
  label: string
  type: QuestionType
  options?: { value: string; label: string }[] // for enum type
  min?: number // for slider
  max?: number // for slider
  step?: number // for slider
}

export const INDUSTRY_QUESTIONS: Record<
  Exclude<Industry, "other">,
  IndustryQuestion[]
> = {
  fnb: [
    {
      id: "local_ingredients",
      label: "Apakah menggunakan bahan baku lokal untuk menu utama?",
      type: "boolean",
    },
    {
      id: "food_waste_management",
      label: "Bagaimana mengelola sisa makanan?",
      type: "enum",
      options: [
        { value: "dibuang", label: "Dibuang" },
        { value: "donasi", label: "Donasi" },
        { value: "kompos", label: "Kompos" },
        { value: "olahan_ulang", label: "Olahan Ulang" },
      ],
    },
    {
      id: "eco_packaging",
      label: "Apakah menyediakan kemasan ramah lingkungan untuk takeaway?",
      type: "boolean",
    },
    {
      id: "organic_percentage",
      label: "Berapa persen menu menggunakan bahan organik?",
      type: "slider",
      min: 0,
      max: 100,
      step: 5,
    },
    {
      id: "used_oil_program",
      label: "Apakah ada program pengurangan minyak goreng bekas?",
      type: "boolean",
    },
  ],
  retail: [
    {
      id: "led_lighting",
      label: "Apakah toko menggunakan pencahayaan LED?",
      type: "boolean",
    },
    {
      id: "reusable_bags",
      label: "Apakah menawarkan tas belanja reusable?",
      type: "boolean",
    },
    {
      id: "unsold_products",
      label: "Bagaimana mengelola produk yang tidak terjual?",
      type: "enum",
      options: [
        { value: "dibuang", label: "Dibuang" },
        { value: "diskon", label: "Diskon" },
        { value: "donasi", label: "Donasi" },
        { value: "retur", label: "Retur" },
      ],
    },
    {
      id: "eco_label_products",
      label: "Apakah memprioritaskan produk berlabel ramah lingkungan?",
      type: "boolean",
    },
    {
      id: "local_supplier_percentage",
      label: "Berapa persen produk dari supplier lokal (<100km)?",
      type: "slider",
      min: 0,
      max: 100,
      step: 5,
    },
  ],
  manufacturing: [
    {
      id: "wastewater_treatment",
      label: "Apakah pabrik memiliki sistem pengolahan air limbah?",
      type: "boolean",
    },
    {
      id: "recycled_materials",
      label: "Apakah menggunakan bahan baku daur ulang?",
      type: "boolean",
    },
    {
      id: "emission_management",
      label: "Bagaimana mengelola emisi gas produksi?",
      type: "enum",
      options: [
        { value: "tidak_dikelola", label: "Tidak Dikelola" },
        { value: "filter_dasar", label: "Filter Dasar" },
        { value: "scrubber", label: "Scrubber" },
        { value: "zero_emission", label: "Zero Emission" },
      ],
    },
    {
      id: "renewable_energy_percentage",
      label: "Berapa persen energi dari sumber terbarukan?",
      type: "slider",
      min: 0,
      max: 100,
      step: 5,
    },
    {
      id: "lean_manufacturing",
      label: "Apakah menerapkan lean manufacturing?",
      type: "boolean",
    },
  ],
  services: [
    {
      id: "paperless_policy",
      label: "Apakah kantor menerapkan kebijakan paperless?",
      type: "boolean",
    },
    {
      id: "wfh_policy",
      label: "Apakah karyawan boleh WFH untuk kurangi emisi transportasi?",
      type: "boolean",
    },
    {
      id: "cooling_system",
      label: "Bagaimana sistem pendingin ruangan?",
      type: "enum",
      options: [
        { value: "ac_lama", label: "AC Lama" },
        { value: "ac_inverter", label: "AC Inverter" },
        { value: "ventilasi_alami", label: "Ventilasi Alami" },
        { value: "hybrid", label: "Hybrid" },
      ],
    },
    {
      id: "cloud_computing",
      label: "Apakah menggunakan cloud computing?",
      type: "boolean",
    },
    {
      id: "green_commuting",
      label: "Apakah ada program green commuting untuk karyawan?",
      type: "boolean",
    },
  ],
  agriculture: [
    {
      id: "organic_fertilizer",
      label: "Apakah menggunakan pupuk organik?",
      type: "boolean",
    },
    {
      id: "irrigation_system",
      label: "Bagaimana sistem irigasi?",
      type: "enum",
      options: [
        { value: "tadah_hujan", label: "Tadah Hujan" },
        { value: "irigasi_banjir", label: "Irigasi Banjir" },
        { value: "irigasi_tetes", label: "Irigasi Tetes" },
        { value: "irigasi_sprinkler", label: "Irigasi Sprinkler" },
      ],
    },
    {
      id: "crop_rotation",
      label: "Apakah menerapkan rotasi tanaman?",
      type: "boolean",
    },
    {
      id: "conservation_percentage",
      label: "Berapa persen lahan menggunakan teknik pertanian konservasi?",
      type: "slider",
      min: 0,
      max: 100,
      step: 5,
    },
    {
      id: "pesticide_usage",
      label: "Apakah menggunakan pestisida kimia?",
      type: "enum",
      options: [
        { value: "banyak", label: "Banyak" },
        { value: "sedikit", label: "Sedikit" },
        { value: "organik_saja", label: "Organik Saja" },
        { value: "tidak_ada", label: "Tidak Ada" },
      ],
    },
  ],
}

export function hasIndustryQuestions(
  industry: Industry
): industry is Exclude<Industry, "other"> {
  return industry !== "other"
}
