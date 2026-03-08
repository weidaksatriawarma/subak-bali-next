import type { Assessment, BusinessSize } from "@/types/database"
import {
  calculateCarbonFootprint,
  calculatePotentialSavings,
} from "@/lib/carbon"

// ─── SDG Targets (Real UN Targets) ──────────────────────────────

export interface SDGTarget {
  code: string
  description: { id: string; en: string }
}

export const SDG_TARGETS: Record<number, { targets: SDGTarget[] }> = {
  6: {
    targets: [
      {
        code: "6.3",
        description: {
          id: "Meningkatkan kualitas air dengan mengurangi polusi dan meminimalkan pelepasan bahan kimia berbahaya",
          en: "Improve water quality by reducing pollution and minimizing release of hazardous chemicals",
        },
      },
      {
        code: "6.4",
        description: {
          id: "Meningkatkan efisiensi penggunaan air di semua sektor dan memastikan penarikan air berkelanjutan",
          en: "Increase water-use efficiency across all sectors and ensure sustainable freshwater withdrawals",
        },
      },
    ],
  },
  7: {
    targets: [
      {
        code: "7.2",
        description: {
          id: "Meningkatkan secara substansial pangsa energi terbarukan dalam bauran energi global",
          en: "Increase substantially the share of renewable energy in the global energy mix",
        },
      },
      {
        code: "7.3",
        description: {
          id: "Menggandakan laju perbaikan efisiensi energi secara global",
          en: "Double the global rate of improvement in energy efficiency",
        },
      },
      {
        code: "7.a",
        description: {
          id: "Meningkatkan kerjasama internasional untuk memfasilitasi akses riset dan teknologi energi bersih",
          en: "Enhance international cooperation to facilitate access to clean energy research and technology",
        },
      },
    ],
  },
  8: {
    targets: [
      {
        code: "8.2",
        description: {
          id: "Mencapai tingkat produktivitas ekonomi yang lebih tinggi melalui diversifikasi, peningkatan teknologi, dan inovasi",
          en: "Achieve higher levels of economic productivity through diversification, technological upgrading, and innovation",
        },
      },
      {
        code: "8.4",
        description: {
          id: "Meningkatkan efisiensi sumber daya global dalam konsumsi dan produksi secara progresif",
          en: "Improve progressively global resource efficiency in consumption and production",
        },
      },
    ],
  },
  11: {
    targets: [
      {
        code: "11.6",
        description: {
          id: "Mengurangi dampak lingkungan perkotaan per kapita yang merugikan, termasuk pengelolaan limbah",
          en: "Reduce the adverse per capita environmental impact of cities, including waste management",
        },
      },
      {
        code: "11.a",
        description: {
          id: "Mendukung hubungan ekonomi, sosial, dan lingkungan yang positif antara wilayah perkotaan, pinggiran kota, dan pedesaan",
          en: "Support positive economic, social, and environmental links between urban, peri-urban, and rural areas",
        },
      },
    ],
  },
  12: {
    targets: [
      {
        code: "12.2",
        description: {
          id: "Mencapai pengelolaan berkelanjutan dan penggunaan sumber daya alam secara efisien",
          en: "Achieve the sustainable management and efficient use of natural resources",
        },
      },
      {
        code: "12.5",
        description: {
          id: "Mengurangi secara substansial produksi limbah melalui pencegahan, pengurangan, daur ulang, dan penggunaan kembali",
          en: "Substantially reduce waste generation through prevention, reduction, recycling, and reuse",
        },
      },
      {
        code: "12.6",
        description: {
          id: "Mendorong perusahaan untuk mengadopsi praktik berkelanjutan dan mengintegrasikan informasi keberlanjutan ke dalam siklus pelaporan",
          en: "Encourage companies to adopt sustainable practices and integrate sustainability information into their reporting cycle",
        },
      },
    ],
  },
  13: {
    targets: [
      {
        code: "13.1",
        description: {
          id: "Memperkuat ketahanan dan kapasitas adaptif terhadap bahaya terkait iklim dan bencana alam",
          en: "Strengthen resilience and adaptive capacity to climate-related hazards and natural disasters",
        },
      },
      {
        code: "13.2",
        description: {
          id: "Mengintegrasikan langkah-langkah perubahan iklim ke dalam kebijakan, strategi, dan perencanaan nasional",
          en: "Integrate climate change measures into national policies, strategies, and planning",
        },
      },
      {
        code: "13.3",
        description: {
          id: "Meningkatkan pendidikan, penyadaran, dan kapasitas manusia dan kelembagaan tentang mitigasi dan adaptasi perubahan iklim",
          en: "Improve education, awareness-raising, and human and institutional capacity on climate change mitigation and adaptation",
        },
      },
    ],
  },
}

// ─── SDG Descriptions ───────────────────────────────────────────

export const SDG_DESCRIPTIONS: Record<number, { id: string; en: string }> = {
  6: {
    id: "Menjamin ketersediaan serta pengelolaan air bersih dan sanitasi yang berkelanjutan untuk semua. Bisnis Anda berkontribusi melalui konservasi air dan pengurangan polusi.",
    en: "Ensure availability and sustainable management of water and sanitation for all. Your business contributes through water conservation and pollution reduction.",
  },
  7: {
    id: "Menjamin akses energi yang terjangkau, andal, berkelanjutan, dan modern untuk semua. Bisnis Anda berkontribusi melalui efisiensi energi dan penggunaan energi terbarukan.",
    en: "Ensure access to affordable, reliable, sustainable, and modern energy for all. Your business contributes through energy efficiency and renewable energy adoption.",
  },
  8: {
    id: "Meningkatkan pertumbuhan ekonomi yang inklusif dan berkelanjutan, kesempatan kerja yang produktif dan penuh, serta pekerjaan yang layak untuk semua.",
    en: "Promote sustained, inclusive, and sustainable economic growth, full and productive employment, and decent work for all.",
  },
  11: {
    id: "Menjadikan kota dan permukiman inklusif, aman, tangguh, dan berkelanjutan. Bisnis Anda berkontribusi melalui operasi berkelanjutan dan keterlibatan komunitas.",
    en: "Make cities and human settlements inclusive, safe, resilient, and sustainable. Your business contributes through sustainable operations and community engagement.",
  },
  12: {
    id: "Menjamin pola konsumsi dan produksi yang berkelanjutan. Bisnis Anda berkontribusi melalui pengelolaan limbah dan rantai pasok yang bertanggung jawab.",
    en: "Ensure sustainable consumption and production patterns. Your business contributes through waste management and responsible supply chain practices.",
  },
  13: {
    id: "Mengambil tindakan cepat untuk mengatasi perubahan iklim dan dampaknya. Bisnis Anda berkontribusi melalui pengurangan emisi karbon dan efisiensi energi.",
    en: "Take urgent action to combat climate change and its impacts. Your business contributes through carbon emission reduction and energy efficiency.",
  },
}

// ─── SDG Impact Metrics ─────────────────────────────────────────

export interface SDGImpactMetric {
  sdg: number
  metric: string
  metricEn: string
  value: number
  unit: string
  type: "quantitative" | "qualitative"
}

export function computeSDGImpactMetrics(
  assessment: Partial<Assessment>,
  businessSize: BusinessSize
): SDGImpactMetric[] {
  const carbon = calculateCarbonFootprint(assessment)
  const savings = calculatePotentialSavings(businessSize)

  const energySavings =
    savings.byCategory.find((c) => c.category === "energy")?.savingsRp ?? 0
  // Estimate kWh savings from Rp savings (approx Rp 1,500/kWh PLN tariff)
  const kwhSaved = Math.round(energySavings / 1500)

  const wasteKg = assessment.waste_volume_kg_monthly ?? 100
  const wasteManagement = assessment.waste_management ?? "none"
  // Reduction estimate based on waste management level
  const wasteReductionPct: Record<string, number> = {
    none: 0,
    segregation: 15,
    recycling: 40,
    composting: 50,
    circular: 70,
  }
  const wasteReduced = Math.round(
    wasteKg * ((wasteReductionPct[wasteManagement] ?? 0) / 100)
  )

  // CO2 reduction = difference between worst case and current
  const worstCaseCO2 =
    (assessment.monthly_electricity_kwh ?? 500) * 0.84 * 12 +
    (assessment.waste_volume_kg_monthly ?? 100) * 0.5 * 12 +
    2400
  const co2Reduced = Math.max(0, Math.round(worstCaseCO2 - carbon.totalCO2))

  const metrics: SDGImpactMetric[] = [
    {
      sdg: 7,
      metric: "kWh/bulan hemat",
      metricEn: "kWh/month saved",
      value: kwhSaved,
      unit: "kWh",
      type: "quantitative",
    },
    {
      sdg: 12,
      metric: "kg limbah berkurang/bulan",
      metricEn: "kg waste reduced/month",
      value: wasteReduced,
      unit: "kg",
      type: "quantitative",
    },
    {
      sdg: 13,
      metric: "kg CO₂ dikurangi/tahun",
      metricEn: "kg CO₂ reduced/year",
      value: co2Reduced,
      unit: "kg",
      type: "quantitative",
    },
    {
      sdg: 6,
      metric: assessment.water_conservation
        ? "Konservasi air aktif"
        : "Belum ada konservasi air",
      metricEn: assessment.water_conservation
        ? "Water conservation active"
        : "No water conservation yet",
      value: assessment.water_conservation ? 1 : 0,
      unit: "",
      type: "qualitative",
    },
    {
      sdg: 8,
      metric:
        assessment.has_sustainability_policy &&
        assessment.employee_sustainability_training
          ? "Kebijakan & pelatihan aktif"
          : "Perlu kebijakan & pelatihan",
      metricEn:
        assessment.has_sustainability_policy &&
        assessment.employee_sustainability_training
          ? "Policy & training active"
          : "Policy & training needed",
      value:
        (assessment.has_sustainability_policy ? 1 : 0) +
        (assessment.employee_sustainability_training ? 1 : 0),
      unit: "",
      type: "qualitative",
    },
    {
      sdg: 11,
      metric: assessment.community_engagement
        ? "Keterlibatan komunitas aktif"
        : "Belum terlibat komunitas",
      metricEn: assessment.community_engagement
        ? "Community engagement active"
        : "No community engagement yet",
      value: assessment.community_engagement ? 1 : 0,
      unit: "",
      type: "qualitative",
    },
  ]

  return metrics
}
