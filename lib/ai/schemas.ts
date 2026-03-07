import { z } from "zod"

export const ScoreSchema = z.object({
  total_score: z.number().min(0).max(100),
  energy_score: z.number().min(0).max(100),
  waste_score: z.number().min(0).max(100),
  supply_chain_score: z.number().min(0).max(100),
  operations_score: z.number().min(0).max(100),
  policy_score: z.number().min(0).max(100),
  ai_summary: z.string(),
  industry_benchmark: z.number().min(0).max(100),
})

export type ScoreResult = z.infer<typeof ScoreSchema>

export const RoadmapItemSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.enum([
    "energy",
    "waste",
    "supply_chain",
    "operations",
    "policy",
  ]),
  priority: z.enum(["high", "medium", "low"]),
  estimated_impact: z.enum(["high", "medium", "low"]),
  estimated_cost: z.enum(["free", "low", "medium", "high"]),
  timeline: z.enum(["1_week", "1_month", "3_months", "6_months", "1_year"]),
})

export const RoadmapSchema = z.object({
  title: z.string(),
  items: z.array(RoadmapItemSchema),
})

export type RoadmapResult = z.infer<typeof RoadmapSchema>
