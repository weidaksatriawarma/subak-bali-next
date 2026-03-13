# Calculation Methodology

This document describes all estimation formulas, scoring algorithms, emission factors, and data sources used by Subak Hijau. All calculations are deterministic and reproducible from the assessment inputs unless noted otherwise.

> **Source code references**: `lib/carbon.ts`, `lib/scoring.ts`, `lib/quick-score.ts`, `lib/gamification/industry-data.ts`, `lib/sdg.ts`, `lib/sdg-targets.ts`, `lib/certificate-utils.ts`, `lib/achievements.ts`, `lib/gamification/streaks.ts`, `lib/gamification/celebrations.ts`

---

## Table of Contents

1. [Carbon Footprint Estimation](#1-carbon-footprint-estimation)
2. [Cost Savings Estimation](#2-cost-savings-estimation)
3. [Regulatory Compliance Score](#3-regulatory-compliance-score)
4. [Sustainability Scoring](#4-sustainability-scoring)
5. [Quick Assessment](#5-quick-assessment)
6. [Industry-Weighted Scoring](#6-industry-weighted-scoring)
7. [Industry Benchmarks & Percentiles](#7-industry-benchmarks--percentiles)
8. [SDG Mapping & Impact Metrics](#8-sdg-mapping--impact-metrics)
9. [Certificate Tiers](#9-certificate-tiers)
10. [Achievements & Gamification](#10-achievements--gamification)

---

## 1. Carbon Footprint Estimation

**Source**: `lib/carbon.ts` — `calculateCarbonFootprint()`

The carbon footprint is the sum of three components calculated annually:

```
Total CO2 (kg/year) = Energy CO2 + Waste CO2 + Transport CO2
```

### 1.1 Energy Emissions

```
Energy CO2 = monthly_kWh × emission_factor × 12
```

| Energy Source | Emission Factor (kg CO2/kWh) | Description |
|---|---|---|
| `pln_only` | **0.78** | PLN national grid average |
| `pln_solar` | 0.39 | Hybrid grid + solar panel |
| `solar_only` | 0.05 | Fully solar-powered |
| `diesel_generator` | 0.84 | Diesel generator (highest) |

- Monthly kWh is clamped to `[0, 100,000]`.
- Default: 500 kWh/month if not provided.

### 1.2 Waste Emissions

```
Waste CO2 = monthly_waste_kg × emission_factor × 12
```

| Waste Management | Emission Factor (kg CO2/kg waste) | Description |
|---|---|---|
| `none` | **0.50** | Landfill (no management) |
| `segregation` | 0.35 | Basic waste sorting |
| `recycling` | 0.10 | Active recycling |
| `composting` | 0.10 | Composting organic waste |
| `circular` | 0.05 | Full circular economy |

- Monthly waste is clamped to `[0, 50,000]` kg.
- Default: 100 kg/month if not provided.

### 1.3 Transport Emissions

```
Transport CO2 = annual_co2_constant
```

| Transport Type | Annual CO2 (kg/year) |
|---|---|
| `gasoline` | **2,400** |
| `hybrid` | 1,200 |
| `electric` | 400 |
| `bicycle` | 0 |
| `none` | 0 |

Transport emissions are flat annual estimates, not distance-based.

### 1.4 Tree Equivalent

```
Tree Equivalent = round(Total CO2 / 22)
```

One mature tree absorbs approximately 22 kg CO2 per year (commonly cited global average).

### 1.5 Example Calculation

A small warung using PLN grid (500 kWh/month), no waste management (100 kg/month), gasoline transport:

```
Energy  = 500 × 0.78 × 12 = 4,680 kg CO2
Waste   = 100 × 0.50 × 12 =   600 kg CO2
Transport                  = 2,400 kg CO2
─────────────────────────────────────────
Total                      = 7,680 kg CO2/year
Tree equivalent            = 7,680 / 22 ≈ 349 trees
```

---

## 2. Cost Savings Estimation

**Source**: `lib/carbon.ts` — `calculatePotentialSavings()`

Potential monthly savings are estimated per sustainability category based on business size. Savings represent the opportunity cost of not implementing sustainable practices.

### 2.1 Savings Ranges (Rp/month)

| Category | Micro | Small | Medium | Large |
|---|---|---|---|---|
| **Energy** | 200,000–400,000 | 400,000–600,000 | 600,000–800,000 | 800,000–1,200,000 |
| **Waste** | 100,000–150,000 | 150,000–200,000 | 200,000–300,000 | 300,000–500,000 |
| **Supply Chain** | 50,000–100,000 | 100,000–150,000 | 150,000–200,000 | 200,000–350,000 |
| **Operations** | 50,000–80,000 | 80,000–120,000 | 120,000–150,000 | 150,000–250,000 |
| **Policy** | 0 | 0 | 0 | 0 |

### 2.2 Formula

```
Category Savings = ((min + max) / 2) × min(incomplete_count, 2)
Monthly Total    = sum of all category savings
Annual Total     = Monthly Total × 12
```

- `incomplete_count` defaults to 1 if not specified.
- Policy category always yields Rp 0 (no direct cost savings).
- Savings are midpoint estimates, not guarantees.

---

## 3. Regulatory Compliance Score

**Source**: `lib/carbon.ts` — `calculateRegulatoryCompliance()`

Compliance is measured against 8 items mapped to **POJK 51/2017** and **TKBI** (Indonesian Sustainable Finance Taxonomy) requirements.

### 3.1 Compliance Items & Weights

| # | Item | Assessment Field | Weight |
|---|---|---|---|
| 1 | Sustainability policy | `has_sustainability_policy` | **20** |
| 2 | Waste management (recycling+) | `waste_management ∈ {recycling, composting, circular}` | **15** |
| 3 | Energy efficient equipment | `uses_energy_efficient_equipment` | **15** |
| 4 | Supplier sustainability check | `supplier_sustainability_check` | **10** |
| 5 | Employee training | `employee_sustainability_training` | **10** |
| 6 | Community engagement | `community_engagement` | **10** |
| 7 | Digital operations | `digital_operations` | **10** |
| 8 | Water conservation | `water_conservation` | **10** |

**Total possible: 100**

### 3.2 Formula

```
Compliance % = sum of weights for all met items
```

Each item is binary (met or unmet). The overall compliance percentage is simply the sum of weights for met items.

---

## 4. Sustainability Scoring

**Source**: `lib/scoring.ts` — `calculateScores()`

The sustainability score is computed across 5 categories, each scored 0–100. The total score is the arithmetic average.

```
Total Score = round((energy + waste + supply_chain + operations + policy) / 5)
```

### 4.1 Energy Score (0–100)

| Factor | Condition | Points |
|---|---|---|
| Energy source | solar_only | +40 |
| | pln_solar | +30 |
| | pln_only | +15 |
| | diesel_generator | +5 |
| Efficient equipment | yes | +30 |
| Monthly kWh | < 200 | +30 |
| | 200–399 | +20 |
| | 400–599 | +10 |
| | ≥ 600 | +0 |

Capped at 100.

### 4.2 Waste Score (0–100)

| Factor | Condition | Points |
|---|---|---|
| Waste management | circular | +40 |
| | composting | +35 |
| | recycling | +30 |
| | segregation | +15 |
| | none | +5 |
| Plastic reduction | yes | +25 |
| Monthly waste (kg) | < 50 | +35 |
| | 50–99 | +25 |
| | 100–199 | +15 |
| | ≥ 200 | +5 |

Capped at 100.

### 4.3 Supply Chain Score (0–100)

| Factor | Condition | Points |
|---|---|---|
| Local sourcing % | ≥ 80% | +35 |
| | 50–79% | +25 |
| | 20–49% | +15 |
| | < 20% | +5 |
| Supplier sustainability check | yes | +30 |
| Packaging type | reusable | +35 |
| | biodegradable | +30 |
| | recyclable | +20 |
| | single_use_plastic | +5 |

Capped at 100.

### 4.4 Operations Score (0–100)

| Factor | Condition | Points |
|---|---|---|
| Water conservation | yes | +30 |
| Digital operations | yes | +30 |
| Transport type | none / bicycle | +40 |
| | electric | +35 |
| | hybrid | +25 |
| | gasoline | +10 |

Capped at 100.

### 4.5 Policy Score (0–100)

| Factor | Condition | Points |
|---|---|---|
| Sustainability policy | yes | +35 |
| Employee training | yes | +35 |
| Community engagement | yes | +30 |

Capped at 100.

---

## 5. Quick Assessment

**Source**: `lib/quick-score.ts` — `calculateQuickScore()`

A lightweight 5-question pre-assessment that gives an estimated sustainability score range.

### 5.1 Score Mapping

| Question | Answer | Score |
|---|---|---|
| **Energy source** | pln_only: 30, diesel: 10, pln_solar: 70, solar: 100 |
| **Waste management** | none: 10, segregation: 40, recycling: 60, composting: 80, circular: 100 |
| **Packaging type** | single_use_plastic: 10, recyclable: 50, biodegradable: 75, reusable: 100 |
| **Transportation** | gasoline: 20, hybrid: 50, electric: 80, bicycle: 100 |
| **Sustainability policy** | false: 20, true: 80 |

### 5.2 Formula

```
Average = round(sum of 5 category scores / 5)
Range   = [max(0, average - 10), min(100, average + 10)]
```

The ±10 range reflects the inherent uncertainty of a simplified assessment versus the full assessment.

---

## 6. Industry-Weighted Scoring

**Source**: `lib/gamification/industry-data.ts` — `INDUSTRY_SCORING_WEIGHTS`

Different industries have different sustainability priorities. The weighted score emphasizes categories most relevant to each industry type.

### 6.1 Weight Matrix

| Industry | Energy | Waste | Supply Chain | Operations | Policy |
|---|---|---|---|---|---|
| **F&B** | 0.15 | **0.30** | 0.20 | 0.20 | 0.15 |
| **Retail** | 0.25 | 0.20 | **0.25** | 0.15 | 0.15 |
| **Manufacturing** | **0.30** | 0.25 | 0.15 | 0.20 | 0.10 |
| **Services** | 0.20 | 0.10 | 0.15 | **0.35** | 0.20 |
| **Agriculture** | 0.20 | 0.20 | 0.25 | **0.25** | 0.10 |
| **Other** | 0.20 | 0.20 | 0.20 | 0.20 | 0.20 |

All weights sum to 1.0 per industry. Bold values indicate the heaviest weight.

### 6.2 Weighted Score Formula

```
Weighted Score = sum(category_score × category_weight) for all 5 categories
```

### 6.3 Rationale

- **F&B**: Waste is heaviest (0.30) because food waste management is the primary sustainability challenge.
- **Manufacturing**: Energy is heaviest (0.30) due to energy-intensive production processes.
- **Services**: Operations is heaviest (0.35) since services are primarily office/digital-based.
- **Agriculture**: Operations and supply chain are heaviest due to land use and distribution.

---

## 7. Industry Benchmarks & Percentiles

**Source**: `lib/gamification/industry-data.ts` — `INDUSTRY_BENCHMARKS`, `getIndustryPercentile()`

### 7.1 Benchmark Data (Simulated)

| Industry | P25 | Median (P50) | P75 | P90 |
|---|---|---|---|---|
| F&B | 25 | 38 | 55 | 72 |
| Retail | 28 | 42 | 58 | 75 |
| Manufacturing | 22 | 35 | 52 | 68 |
| Services | 30 | 45 | 60 | 78 |
| Agriculture | 20 | 32 | 48 | 65 |
| Other | 26 | 40 | 56 | 70 |

> **Note**: These are simulated benchmark distributions, not real survey data. They are calibrated to reflect typical UMKM sustainability maturity levels in Indonesia.

### 7.2 Percentile Interpolation

The percentile is calculated by linear interpolation between known percentile points:

| Score Range | Percentile Formula |
|---|---|
| `score ≤ P25` | `round((score / P25) × 25)` |
| `P25 < score ≤ P50` | `25 + round(((score - P25) / (P50 - P25)) × 25)` |
| `P50 < score ≤ P75` | `50 + round(((score - P50) / (P75 - P50)) × 25)` |
| `P75 < score ≤ P90` | `75 + round(((score - P75) / (P90 - P75)) × 15)` |
| `score > P90` | `min(99, 90 + round(((score - P90) / (100 - P90)) × 9))` |

Maximum percentile is capped at 99.

### 7.3 Industry Ranks

5-tier ranking system based on score ranges:

| Score Range | Tier | F&B | Retail | Manufacturing | Services | Agriculture | Other |
|---|---|---|---|---|---|---|---|
| 0–19 | 1 | Beginner Kitchen | Beginner Store | Conventional Factory | Standard Office | Traditional Farmer | Small Seed |
| 20–39 | 2 | Green-Aware Cafe | Eco-Conscious Seller | Emission-Aware Factory | Energy-Saving Office | Eco-Conscious Farmer | Young Sprout |
| 40–59 | 3 | Sustainable Restaurant | Earth-Friendly Retail | Clean Manufacturing | Green Digital Services | Semi-Organic Farming | Growing Tree |
| 60–79 | 4 | Eco-Friendly Kitchen | Green Model Store | Green Industry | Sustainable Office | Organic Farming | Shady Tree |
| 80–100 | 5 | Sustainability Chef | Zero Waste Retail | Zero Waste Factory | Green Service Pioneer | Regenerative Farming | Sustainable Forest |

---

## 8. SDG Mapping & Impact Metrics

**Source**: `lib/sdg.ts`, `lib/sdg-targets.ts`

### 8.1 Category-to-SDG Mapping

Each sustainability category maps to one or more UN Sustainable Development Goals:

| SDG | Name | Mapped Categories |
|---|---|---|
| **SDG 6** | Clean Water and Sanitation | Operations |
| **SDG 7** | Affordable and Clean Energy | Energy |
| **SDG 8** | Decent Work and Economic Growth | Policy, Operations |
| **SDG 11** | Sustainable Cities and Communities | Operations, Supply Chain |
| **SDG 12** | Responsible Consumption and Production | Waste, Supply Chain |
| **SDG 13** | Climate Action | Energy, Waste, Operations |

### 8.2 SDG Score Calculation

```
SDG Score = round(average of mapped category scores)
Active    = SDG Score ≥ 50
```

### 8.3 SDG Targets

Each SDG maps to specific UN targets:

- **SDG 6**: Targets 6.3 (water quality), 6.4 (water-use efficiency)
- **SDG 7**: Targets 7.2 (renewable energy share), 7.3 (energy efficiency), 7.a (clean energy cooperation)
- **SDG 8**: Targets 8.2 (economic productivity), 8.4 (resource efficiency)
- **SDG 11**: Targets 11.6 (urban environmental impact), 11.a (urban-rural links)
- **SDG 12**: Targets 12.2 (sustainable resource management), 12.5 (waste reduction), 12.6 (corporate sustainability)
- **SDG 13**: Targets 13.1 (climate resilience), 13.2 (climate policy integration), 13.3 (climate education)

### 8.4 Impact Metrics

Quantitative impact metrics are derived from assessment data:

| Metric | Formula | Unit |
|---|---|---|
| kWh saved/month | `energy_savings_rp / 1,500` (PLN tariff ~Rp 1,500/kWh) | kWh |
| Waste reduced/month | `waste_kg × waste_reduction_pct` | kg |
| CO2 reduced/year | `worst_case_CO2 - actual_CO2` | kg |

Waste reduction percentages by management type:

| Management | Reduction % |
|---|---|
| none | 0% |
| segregation | 15% |
| recycling | 40% |
| composting | 50% |
| circular | 70% |

---

## 9. Certificate Tiers

**Source**: `lib/certificate-utils.ts`

Sustainability certificates are issued based on total score:

| Tier | Score Range | Gradient Colors |
|---|---|---|
| **BRONZE** | 0–29 | Orange (#92400e → #78350f) |
| **SILVER** | 30–59 | Gray (#6b7280 → #4b5563) |
| **GOLD** | 60–79 | Amber (#d97706 → #b45309) |
| **EMERALD** | 80–100 | Green (#059669 → #047857) |

Certificates include a unique verification token accessible at `/verify/[token]` for public verification via QR code.

---

## 10. Achievements & Gamification

### 10.1 Achievement Badges

**Source**: `lib/achievements.ts`

Badges are unlocked based on roadmap item completion:

| Badge | Condition |
|---|---|
| First Step | Complete ≥ 1 roadmap item |
| Five Steps | Complete ≥ 5 roadmap items |
| Halfway | Complete ≥ 50% of roadmap items |
| Almost There | Complete ≥ 80% of roadmap items |
| All Complete | Complete 100% of roadmap items |
| Category Master (×5) | Complete all items in a single category (energy, waste, supply chain, operations, policy) |

### 10.2 Industry Badges

**Source**: `lib/gamification/industry-data.ts` — `INDUSTRY_BADGES`

Industry-specific badges based on category scores:

| Industry | Badge | Condition |
|---|---|---|
| **F&B** | Green Kitchen | Energy ≥ 60 |
| | Sustainable Menu | Supply Chain ≥ 60 |
| | Zero Food Waste | Waste ≥ 80 |
| **Retail** | Plastic-Free Store | Waste ≥ 60 |
| | Energy-Saving Retail | Energy ≥ 60 |
| | Green Supply Chain | Supply Chain ≥ 80 |
| **Manufacturing** | Clean Factory | Waste ≥ 60 |
| | Industrial Energy Efficiency | Energy ≥ 60 |
| | Circular Production | Waste ≥ 80 AND Supply Chain ≥ 60 |
| **Services** | Green Digital Office | Operations ≥ 60 |
| | Paperless Office | Operations ≥ 80 |
| | Green Policy | Policy ≥ 60 |
| **Agriculture** | Organic Farming | Supply Chain ≥ 60 |
| | Smart Irrigation | Operations ≥ 60 |
| | Healthy Soil | Waste ≥ 60 AND Operations ≥ 60 |

### 10.3 Weekly Streaks

**Source**: `lib/gamification/streaks.ts`

Streaks track consecutive weeks with at least one roadmap item completion:

- Week boundaries use **ISO 8601** week numbering.
- A streak is considered **active** only if the current ISO week has a completion.
- If the current week has no completion, `currentStreak = 0` (streak broken).
- `longestStreak` tracks the all-time longest consecutive week count.

### 10.4 Celebration Triggers

**Source**: `lib/gamification/celebrations.ts`

Celebrations (confetti animations) are triggered when crossing specific milestones:

| Trigger | Condition | Priority |
|---|---|---|
| 100% Complete | Completion crosses 100% | Highest |
| Rank Change | Industry rank tier increases | High |
| 75% Complete | Completion crosses 75% | Medium |
| 50% Complete | Completion crosses 50% | Medium |
| 25% Complete | Completion crosses 25% | Medium |
| Category Master | New category fully completed | Low |
| Streak Milestone | Streak reaches 4, 8, or 12 weeks | Low |
| First Item | First ever roadmap item completed | Lowest |

Only one celebration fires per state change, in priority order.

---

## Data Sources & Limitations

### Sources

| Data | Source | Notes |
|---|---|---|
| PLN grid emission factor (0.78 kg CO2/kWh) | Indonesia Ministry of Energy (ESDM) / PLN statistics | National grid average; actual varies by region |
| Transport emission estimates | General industry averages for Indonesian conditions | Simplified flat annual estimates |
| Waste emission factors | IPCC Guidelines adapted for Indonesian waste composition | Approximate; actual depends on waste composition |
| Tree absorption (22 kg CO2/year) | Commonly cited global average for mature trees | Varies significantly by species and climate |
| PLN electricity tariff (~Rp 1,500/kWh) | PLN tariff schedule for business customers | Used for kWh savings estimation only |

### Limitations

1. **Estimation nature**: All calculations are estimates based on simplified models. Actual emissions depend on many factors not captured (equipment efficiency, regional grid mix, specific waste composition, etc.).

2. **Simulated benchmarks**: Industry benchmark percentiles are simulated distributions calibrated to reflect typical Indonesian UMKM sustainability maturity. They are not derived from actual survey data.

3. **Flat transport emissions**: Transport CO2 uses fixed annual constants rather than distance-based calculations. This is a simplification suitable for initial assessment but not for precise carbon accounting.

4. **Savings estimates**: Cost savings ranges are approximate and vary significantly based on local conditions, existing infrastructure, and implementation approach.

5. **Scope**: The carbon calculator primarily covers Scope 1 (direct fuel) and Scope 2 (purchased electricity) emissions. Scope 3 (supply chain) emissions are not quantified.

6. **Regional variation**: The PLN emission factor of 0.78 kg CO2/kWh is a national average. Java-Bali grid is lower (~0.70), while eastern Indonesia grids can be higher (~0.90+).

---

*Last updated: March 2026*
*Subak Hijau v1.0 — PROXOCORIS 2026*
