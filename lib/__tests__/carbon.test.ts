import { describe, it, expect } from "vitest"
import {
  calculateCarbonFootprint,
  calculatePotentialSavings,
  calculateRegulatoryCompliance,
} from "@/lib/carbon"

describe("calculateCarbonFootprint", () => {
  it("returns expected values with defaults (empty assessment)", () => {
    const result = calculateCarbonFootprint({})
    // defaults: 500 kWh, pln_only (0.78), 100 kg waste, none (0.5), gasoline (2400)
    // energyCO2 = 500 * 0.78 * 12 = 4680
    // wasteCO2 = 100 * 0.5 * 12 = 600
    // transportCO2 = 2400
    // totalCO2 = 7680
    expect(result.energyCO2).toBe(4680)
    expect(result.wasteCO2).toBe(600)
    expect(result.transportCO2).toBe(2400)
    expect(result.totalCO2).toBe(7680)
    expect(result.treeEquivalent).toBe(Math.round(7680 / 22))
  })

  it("returns zero values when all inputs are zero", () => {
    const result = calculateCarbonFootprint({
      monthly_electricity_kwh: 0,
      waste_volume_kg_monthly: 0,
      transportation_type: "none",
    })
    expect(result.energyCO2).toBe(0)
    expect(result.wasteCO2).toBe(0)
    expect(result.transportCO2).toBe(0)
    expect(result.totalCO2).toBe(0)
    expect(result.treeEquivalent).toBe(0)
  })

  describe("energy sources", () => {
    it("calculates pln_only correctly", () => {
      const result = calculateCarbonFootprint({
        monthly_electricity_kwh: 100,
        energy_source: "pln_only",
        waste_volume_kg_monthly: 0,
        transportation_type: "none",
      })
      expect(result.energyCO2).toBe(Math.round(100 * 0.78 * 12))
    })

    it("calculates pln_solar correctly", () => {
      const result = calculateCarbonFootprint({
        monthly_electricity_kwh: 100,
        energy_source: "pln_solar",
        waste_volume_kg_monthly: 0,
        transportation_type: "none",
      })
      expect(result.energyCO2).toBe(Math.round(100 * 0.39 * 12))
    })

    it("calculates solar_only correctly", () => {
      const result = calculateCarbonFootprint({
        monthly_electricity_kwh: 100,
        energy_source: "solar_only",
        waste_volume_kg_monthly: 0,
        transportation_type: "none",
      })
      expect(result.energyCO2).toBe(Math.round(100 * 0.05 * 12))
    })

    it("calculates diesel_generator correctly", () => {
      const result = calculateCarbonFootprint({
        monthly_electricity_kwh: 100,
        energy_source: "diesel_generator",
        waste_volume_kg_monthly: 0,
        transportation_type: "none",
      })
      expect(result.energyCO2).toBe(Math.round(100 * 0.84 * 12))
    })
  })

  describe("waste management types", () => {
    it("calculates none correctly", () => {
      const result = calculateCarbonFootprint({
        monthly_electricity_kwh: 0,
        waste_volume_kg_monthly: 100,
        waste_management: "none",
        transportation_type: "none",
      })
      expect(result.wasteCO2).toBe(Math.round(100 * 0.5 * 12))
    })

    it("calculates segregation correctly", () => {
      const result = calculateCarbonFootprint({
        monthly_electricity_kwh: 0,
        waste_volume_kg_monthly: 100,
        waste_management: "segregation",
        transportation_type: "none",
      })
      expect(result.wasteCO2).toBe(Math.round(100 * 0.35 * 12))
    })

    it("calculates recycling correctly", () => {
      const result = calculateCarbonFootprint({
        monthly_electricity_kwh: 0,
        waste_volume_kg_monthly: 100,
        waste_management: "recycling",
        transportation_type: "none",
      })
      expect(result.wasteCO2).toBe(Math.round(100 * 0.1 * 12))
    })

    it("calculates composting correctly", () => {
      const result = calculateCarbonFootprint({
        monthly_electricity_kwh: 0,
        waste_volume_kg_monthly: 100,
        waste_management: "composting",
        transportation_type: "none",
      })
      expect(result.wasteCO2).toBe(Math.round(100 * 0.1 * 12))
    })

    it("calculates circular correctly", () => {
      const result = calculateCarbonFootprint({
        monthly_electricity_kwh: 0,
        waste_volume_kg_monthly: 100,
        waste_management: "circular",
        transportation_type: "none",
      })
      expect(result.wasteCO2).toBe(Math.round(100 * 0.05 * 12))
    })
  })

  describe("transport types", () => {
    it("calculates gasoline correctly", () => {
      const result = calculateCarbonFootprint({
        monthly_electricity_kwh: 0,
        waste_volume_kg_monthly: 0,
        transportation_type: "gasoline",
      })
      expect(result.transportCO2).toBe(2400)
    })

    it("calculates electric correctly", () => {
      const result = calculateCarbonFootprint({
        monthly_electricity_kwh: 0,
        waste_volume_kg_monthly: 0,
        transportation_type: "electric",
      })
      expect(result.transportCO2).toBe(400)
    })

    it("calculates hybrid correctly", () => {
      const result = calculateCarbonFootprint({
        monthly_electricity_kwh: 0,
        waste_volume_kg_monthly: 0,
        transportation_type: "hybrid",
      })
      expect(result.transportCO2).toBe(1200)
    })

    it("calculates bicycle correctly", () => {
      const result = calculateCarbonFootprint({
        monthly_electricity_kwh: 0,
        waste_volume_kg_monthly: 0,
        transportation_type: "bicycle",
      })
      expect(result.transportCO2).toBe(0)
    })

    it("calculates none correctly", () => {
      const result = calculateCarbonFootprint({
        monthly_electricity_kwh: 0,
        waste_volume_kg_monthly: 0,
        transportation_type: "none",
      })
      expect(result.transportCO2).toBe(0)
    })
  })

  it("handles very high values", () => {
    const result = calculateCarbonFootprint({
      monthly_electricity_kwh: 100000,
      energy_source: "diesel_generator",
      waste_volume_kg_monthly: 50000,
      waste_management: "none",
      transportation_type: "gasoline",
    })
    // energyCO2 = 100000 * 0.84 * 12 = 1008000
    // wasteCO2 = 50000 * 0.5 * 12 = 300000
    // transportCO2 = 2400
    expect(result.energyCO2).toBe(1008000)
    expect(result.wasteCO2).toBe(300000)
    expect(result.transportCO2).toBe(2400)
    expect(result.totalCO2).toBe(1310400)
  })
})

describe("calculatePotentialSavings", () => {
  it("calculates micro business savings correctly", () => {
    const result = calculatePotentialSavings("micro")
    expect(result.byCategory).toHaveLength(4)
    expect(result.monthlySavingsRp).toBeGreaterThan(0)
    expect(result.annualSavingsRp).toBe(result.monthlySavingsRp * 12)

    // Without incompleteCategoryCount, count defaults to 1
    // energy: (200000+400000)/2 * min(1,2) = 300000
    // waste: (100000+150000)/2 * 1 = 125000
    // supply_chain: (50000+100000)/2 * 1 = 75000
    // operations: (50000+80000)/2 * 1 = 65000
    const expected = 300000 + 125000 + 75000 + 65000
    expect(result.monthlySavingsRp).toBe(expected)
  })

  it("calculates small business savings correctly", () => {
    const result = calculatePotentialSavings("small")
    // energy: (400000+600000)/2 = 500000
    // waste: (150000+200000)/2 = 175000
    // supply_chain: (100000+150000)/2 = 125000
    // operations: (80000+120000)/2 = 100000
    const expected = 500000 + 175000 + 125000 + 100000
    expect(result.monthlySavingsRp).toBe(expected)
  })

  it("calculates medium business savings correctly", () => {
    const result = calculatePotentialSavings("medium")
    // energy: (600000+800000)/2 = 700000
    // waste: (200000+300000)/2 = 250000
    // supply_chain: (150000+200000)/2 = 175000
    // operations: (120000+150000)/2 = 135000
    const expected = 700000 + 250000 + 175000 + 135000
    expect(result.monthlySavingsRp).toBe(expected)
  })

  it("scales savings with incompleteCategoryCount", () => {
    const result = calculatePotentialSavings("micro", {
      energy: 2,
      waste: 2,
      supply_chain: 1,
      operations: 1,
    })
    // energy: (200000+400000)/2 * min(2,2) = 600000
    // waste: (100000+150000)/2 * min(2,2) = 250000
    // supply_chain: (50000+100000)/2 * min(1,2) = 75000
    // operations: (50000+80000)/2 * min(1,2) = 65000
    const expected = 600000 + 250000 + 75000 + 65000
    expect(result.monthlySavingsRp).toBe(expected)
  })

  it("caps count at 2 for high incompleteCategoryCount", () => {
    const result = calculatePotentialSavings("micro", {
      energy: 10,
    })
    // energy: (200000+400000)/2 * min(10,2) = 600000
    // rest default to count=1
    const energySavings = result.byCategory.find((c) => c.category === "energy")
    expect(energySavings?.savingsRp).toBe(600000)
  })

  it("returns annual as 12x monthly", () => {
    const result = calculatePotentialSavings("small")
    expect(result.annualSavingsRp).toBe(result.monthlySavingsRp * 12)
  })
})

describe("calculateRegulatoryCompliance", () => {
  it("returns 100% when all checks are true", () => {
    const result = calculateRegulatoryCompliance({
      has_sustainability_policy: true,
      waste_management: "recycling",
      uses_energy_efficient_equipment: true,
      supplier_sustainability_check: true,
      employee_sustainability_training: true,
      community_engagement: true,
      digital_operations: true,
      water_conservation: true,
    })
    expect(result.overallPercent).toBe(100)
    expect(result.met).toHaveLength(8)
    expect(result.unmet).toHaveLength(0)
  })

  it("returns 0% when all checks are false", () => {
    const result = calculateRegulatoryCompliance({
      has_sustainability_policy: false,
      waste_management: "none",
      uses_energy_efficient_equipment: false,
      supplier_sustainability_check: false,
      employee_sustainability_training: false,
      community_engagement: false,
      digital_operations: false,
      water_conservation: false,
    })
    expect(result.overallPercent).toBe(0)
    expect(result.met).toHaveLength(0)
    expect(result.unmet).toHaveLength(8)
  })

  it("returns 0% for empty assessment", () => {
    const result = calculateRegulatoryCompliance({})
    expect(result.overallPercent).toBe(0)
    expect(result.unmet).toHaveLength(8)
  })

  it("calculates partial compliance correctly", () => {
    const result = calculateRegulatoryCompliance({
      has_sustainability_policy: true, // weight 20
      waste_management: "composting", // weight 15
      uses_energy_efficient_equipment: true, // weight 15
    })
    expect(result.overallPercent).toBe(50)
    expect(result.met).toHaveLength(3)
    expect(result.unmet).toHaveLength(5)
  })

  it("includes correct framework string", () => {
    const result = calculateRegulatoryCompliance({})
    expect(result.framework).toBe("POJK 51/2017 & TKBI")
  })

  it("recognizes composting as valid waste management", () => {
    const result = calculateRegulatoryCompliance({
      waste_management: "composting",
    })
    const wasteItem = result.met.find((m) => m.id === "waste_management")
    expect(wasteItem).toBeDefined()
  })

  it("recognizes circular as valid waste management", () => {
    const result = calculateRegulatoryCompliance({
      waste_management: "circular",
    })
    const wasteItem = result.met.find((m) => m.id === "waste_management")
    expect(wasteItem).toBeDefined()
  })

  it("does not recognize segregation as valid waste management", () => {
    const result = calculateRegulatoryCompliance({
      waste_management: "segregation",
    })
    const wasteItem = result.unmet.find((m) => m.id === "waste_management")
    expect(wasteItem).toBeDefined()
  })
})
