import { tool } from "ai"
import { z } from "zod"
import {
  calculateCarbonFootprint,
  calculateRegulatoryCompliance,
} from "@/lib/carbon"
import { lookupRegulations } from "@/lib/ai/regulations"
import type { Assessment } from "@/types/database"

const INDUSTRY_BENCHMARKS: Record<
  string,
  {
    avgScore: number
    topScore: number
    energyAvg: number
    wasteAvg: number
    supplyChainAvg: number
    operationsAvg: number
    policyAvg: number
  }
> = {
  fnb: {
    avgScore: 45,
    topScore: 82,
    energyAvg: 42,
    wasteAvg: 48,
    supplyChainAvg: 40,
    operationsAvg: 50,
    policyAvg: 45,
  },
  retail: {
    avgScore: 42,
    topScore: 78,
    energyAvg: 45,
    wasteAvg: 38,
    supplyChainAvg: 44,
    operationsAvg: 48,
    policyAvg: 35,
  },
  manufacturing: {
    avgScore: 38,
    topScore: 75,
    energyAvg: 35,
    wasteAvg: 40,
    supplyChainAvg: 42,
    operationsAvg: 38,
    policyAvg: 35,
  },
  services: {
    avgScore: 50,
    topScore: 85,
    energyAvg: 55,
    wasteAvg: 52,
    supplyChainAvg: 45,
    operationsAvg: 55,
    policyAvg: 43,
  },
  agriculture: {
    avgScore: 40,
    topScore: 80,
    energyAvg: 38,
    wasteAvg: 45,
    supplyChainAvg: 50,
    operationsAvg: 35,
    policyAvg: 32,
  },
  other: {
    avgScore: 43,
    topScore: 76,
    energyAvg: 42,
    wasteAvg: 42,
    supplyChainAvg: 42,
    operationsAvg: 44,
    policyAvg: 38,
  },
}

export function createChatTools(assessment: Assessment | null) {
  return {
    calculateCO2: tool({
      description:
        "Menghitung estimasi jejak karbon (carbon footprint) bisnis berdasarkan data assessment. Gunakan tool ini ketika user bertanya tentang emisi CO2, jejak karbon, atau dampak lingkungan bisnis mereka.",
      inputSchema: z.object({
        energySource: z
          .enum(["pln_only", "pln_solar", "solar_only", "diesel_generator"])
          .optional()
          .describe("Sumber energi utama bisnis"),
        monthlyKwh: z
          .number()
          .optional()
          .describe("Konsumsi listrik bulanan dalam kWh"),
        wasteKgMonthly: z
          .number()
          .optional()
          .describe("Volume limbah bulanan dalam kg"),
        wasteManagement: z
          .enum(["none", "segregation", "recycling", "composting", "circular"])
          .optional()
          .describe("Metode pengelolaan limbah"),
        transportType: z
          .enum(["gasoline", "electric", "hybrid", "bicycle", "none"])
          .optional()
          .describe("Jenis transportasi utama"),
      }),
      execute: async (params) => {
        const data: Partial<Assessment> = {
          energy_source:
            params.energySource ?? assessment?.energy_source ?? "pln_only",
          monthly_electricity_kwh:
            params.monthlyKwh ?? assessment?.monthly_electricity_kwh ?? 500,
          waste_volume_kg_monthly:
            params.wasteKgMonthly ?? assessment?.waste_volume_kg_monthly ?? 100,
          waste_management:
            params.wasteManagement ?? assessment?.waste_management ?? "none",
          transportation_type:
            params.transportType ??
            assessment?.transportation_type ??
            "gasoline",
        }

        const result = calculateCarbonFootprint(data)

        return {
          type: "carbon_calculation" as const,
          ...result,
          breakdown: [
            {
              category: "Energi",
              co2Kg: result.energyCO2,
              percentage: Math.round(
                (result.energyCO2 / result.totalCO2) * 100
              ),
            },
            {
              category: "Limbah",
              co2Kg: result.wasteCO2,
              percentage: Math.round((result.wasteCO2 / result.totalCO2) * 100),
            },
            {
              category: "Transportasi",
              co2Kg: result.transportCO2,
              percentage: Math.round(
                (result.transportCO2 / result.totalCO2) * 100
              ),
            },
          ],
          context: `Total emisi tahunan: ${result.totalCO2.toLocaleString("id-ID")} kg CO₂, setara dengan ${result.treeEquivalent} pohon per tahun untuk menyerap emisi ini.`,
        }
      },
    }),

    lookupRegulation: tool({
      description:
        "Mencari regulasi Indonesia terkait keberlanjutan untuk UMKM. Gunakan tool ini ketika user bertanya tentang aturan, regulasi, kebijakan pemerintah, POJK, atau compliance.",
      inputSchema: z.object({
        topic: z
          .enum(["carbon", "waste", "energy", "reporting", "green_finance"])
          .describe("Topik regulasi yang dicari"),
      }),
      execute: async ({ topic }) => {
        const regulations = lookupRegulations(topic)

        if (regulations.length === 0) {
          return {
            type: "regulation_lookup" as const,
            topic,
            found: false as const,
            message:
              "Tidak ditemukan regulasi spesifik untuk topik ini. Coba topik lain: carbon, waste, energy, reporting, atau green_finance.",
          }
        }

        // Also calculate compliance if assessment available
        let compliance = null
        if (assessment) {
          const compResult = calculateRegulatoryCompliance(assessment)
          compliance = {
            overallPercent: compResult.overallPercent,
            framework: compResult.framework,
            metCount: compResult.met.length,
            unmetCount: compResult.unmet.length,
          }
        }

        return {
          type: "regulation_lookup" as const,
          topic,
          found: true as const,
          regulations,
          compliance,
        }
      },
    }),

    getIndustryBenchmark: tool({
      description:
        "Membandingkan skor keberlanjutan bisnis dengan rata-rata industri di Indonesia. Gunakan tool ini ketika user bertanya perbandingan, benchmark, atau posisi mereka dibanding bisnis sejenis.",
      inputSchema: z.object({
        industry: z
          .enum([
            "fnb",
            "retail",
            "manufacturing",
            "services",
            "agriculture",
            "other",
          ])
          .describe("Jenis industri untuk perbandingan"),
      }),
      execute: async ({ industry }) => {
        const benchmark = INDUSTRY_BENCHMARKS[industry]

        return {
          type: "industry_benchmark" as const,
          industry,
          benchmark: {
            averageScore: benchmark.avgScore,
            topPerformerScore: benchmark.topScore,
            categoryAverages: {
              energy: benchmark.energyAvg,
              waste: benchmark.wasteAvg,
              supplyChain: benchmark.supplyChainAvg,
              operations: benchmark.operationsAvg,
              policy: benchmark.policyAvg,
            },
          },
          context: `Rata-rata skor sustainability untuk industri ${industry} di Indonesia adalah ${benchmark.avgScore}/100. Top performer mencapai ${benchmark.topScore}/100.`,
        }
      },
    }),
  }
}
