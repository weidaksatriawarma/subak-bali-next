import { describe, it, expect } from "vitest"
import { ScoreSchema, RoadmapItemSchema, RoadmapSchema } from "@/lib/ai/schemas"

describe("ScoreSchema", () => {
  it("accepts valid data", () => {
    const data = {
      total_score: 75,
      energy_score: 80,
      waste_score: 70,
      supply_chain_score: 60,
      operations_score: 85,
      policy_score: 65,
      ai_summary: "Your business shows good sustainability practices.",
      industry_benchmark: 50,
    }
    const result = ScoreSchema.safeParse(data)
    expect(result.success).toBe(true)
  })

  it("accepts boundary values (0 and 100)", () => {
    const data = {
      total_score: 0,
      energy_score: 100,
      waste_score: 0,
      supply_chain_score: 100,
      operations_score: 0,
      policy_score: 100,
      ai_summary: "Summary",
      industry_benchmark: 0,
    }
    const result = ScoreSchema.safeParse(data)
    expect(result.success).toBe(true)
  })

  it("rejects score above 100", () => {
    const data = {
      total_score: 101,
      energy_score: 80,
      waste_score: 70,
      supply_chain_score: 60,
      operations_score: 85,
      policy_score: 65,
      ai_summary: "Summary",
      industry_benchmark: 50,
    }
    const result = ScoreSchema.safeParse(data)
    expect(result.success).toBe(false)
  })

  it("rejects negative score", () => {
    const data = {
      total_score: -1,
      energy_score: 80,
      waste_score: 70,
      supply_chain_score: 60,
      operations_score: 85,
      policy_score: 65,
      ai_summary: "Summary",
      industry_benchmark: 50,
    }
    const result = ScoreSchema.safeParse(data)
    expect(result.success).toBe(false)
  })

  it("rejects missing fields", () => {
    const data = {
      total_score: 75,
      energy_score: 80,
    }
    const result = ScoreSchema.safeParse(data)
    expect(result.success).toBe(false)
  })

  it("rejects missing ai_summary", () => {
    const data = {
      total_score: 75,
      energy_score: 80,
      waste_score: 70,
      supply_chain_score: 60,
      operations_score: 85,
      policy_score: 65,
      industry_benchmark: 50,
    }
    const result = ScoreSchema.safeParse(data)
    expect(result.success).toBe(false)
  })
})

describe("RoadmapItemSchema", () => {
  const validItem = {
    title: "Switch to LED lighting",
    description: "Replace all traditional bulbs with LED alternatives",
    category: "energy",
    priority: "high",
    estimated_impact: "medium",
    estimated_cost: "low",
    timeline: "1_month",
  }

  it("accepts valid data", () => {
    const result = RoadmapItemSchema.safeParse(validItem)
    expect(result.success).toBe(true)
  })

  it("accepts optional estimated_savings_rp", () => {
    const result = RoadmapItemSchema.safeParse({
      ...validItem,
      estimated_savings_rp: 500000,
    })
    expect(result.success).toBe(true)
  })

  it("accepts valid without estimated_savings_rp", () => {
    const result = RoadmapItemSchema.safeParse(validItem)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.estimated_savings_rp).toBeUndefined()
    }
  })

  it("rejects invalid category enum", () => {
    const result = RoadmapItemSchema.safeParse({
      ...validItem,
      category: "invalid_category",
    })
    expect(result.success).toBe(false)
  })

  it("rejects invalid priority enum", () => {
    const result = RoadmapItemSchema.safeParse({
      ...validItem,
      priority: "urgent",
    })
    expect(result.success).toBe(false)
  })

  it("rejects invalid estimated_impact enum", () => {
    const result = RoadmapItemSchema.safeParse({
      ...validItem,
      estimated_impact: "very_high",
    })
    expect(result.success).toBe(false)
  })

  it("rejects invalid estimated_cost enum", () => {
    const result = RoadmapItemSchema.safeParse({
      ...validItem,
      estimated_cost: "expensive",
    })
    expect(result.success).toBe(false)
  })

  it("rejects invalid timeline enum", () => {
    const result = RoadmapItemSchema.safeParse({
      ...validItem,
      timeline: "2_years",
    })
    expect(result.success).toBe(false)
  })

  it("accepts all valid category values", () => {
    for (const cat of [
      "energy",
      "waste",
      "supply_chain",
      "operations",
      "policy",
    ]) {
      const result = RoadmapItemSchema.safeParse({
        ...validItem,
        category: cat,
      })
      expect(result.success).toBe(true)
    }
  })

  it("accepts all valid timeline values", () => {
    for (const tl of [
      "1_week",
      "1_month",
      "3_months",
      "6_months",
      "1_year",
    ]) {
      const result = RoadmapItemSchema.safeParse({
        ...validItem,
        timeline: tl,
      })
      expect(result.success).toBe(true)
    }
  })
})

describe("RoadmapSchema", () => {
  it("accepts valid data with items", () => {
    const data = {
      title: "Sustainability Roadmap for Kedai Kopi",
      items: [
        {
          title: "Switch to LED",
          description: "Replace bulbs",
          category: "energy",
          priority: "high",
          estimated_impact: "medium",
          estimated_cost: "low",
          timeline: "1_month",
        },
      ],
      estimated_co2_reduction_kg: 500,
      tree_equivalent: 23,
    }
    const result = RoadmapSchema.safeParse(data)
    expect(result.success).toBe(true)
  })

  it("accepts valid data with empty items array", () => {
    const data = {
      title: "Empty Roadmap",
      items: [],
      estimated_co2_reduction_kg: 0,
      tree_equivalent: 0,
    }
    const result = RoadmapSchema.safeParse(data)
    expect(result.success).toBe(true)
  })

  it("rejects missing title", () => {
    const data = {
      items: [],
      estimated_co2_reduction_kg: 0,
      tree_equivalent: 0,
    }
    const result = RoadmapSchema.safeParse(data)
    expect(result.success).toBe(false)
  })

  it("rejects missing items", () => {
    const data = {
      title: "Roadmap",
      estimated_co2_reduction_kg: 0,
      tree_equivalent: 0,
    }
    const result = RoadmapSchema.safeParse(data)
    expect(result.success).toBe(false)
  })

  it("rejects invalid item within items array", () => {
    const data = {
      title: "Roadmap",
      items: [
        {
          title: "Bad item",
          description: "Missing required fields",
        },
      ],
      estimated_co2_reduction_kg: 0,
      tree_equivalent: 0,
    }
    const result = RoadmapSchema.safeParse(data)
    expect(result.success).toBe(false)
  })
})
