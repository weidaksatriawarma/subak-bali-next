import type { Locale } from "@/lib/i18n/dictionaries"
import type { Profile, Score, Assessment } from "@/types/database"
import { INDUSTRY_LABELS, BUSINESS_SIZE_LABELS } from "@/lib/constants"
import { sanitizeForPrompt, sanitizeObjectForPrompt } from "@/lib/security"
import {
  INDUSTRY_SCORING_WEIGHTS,
  INDUSTRY_RANKS,
  getIndustryRank,
} from "@/lib/gamification/industry-data"

export function buildScorePrompt(
  profile: Profile,
  assessment: Assessment
): string {
  const name = sanitizeForPrompt(profile.business_name)
  const location = sanitizeForPrompt(profile.location || "Indonesia")

  return `Analyze this Indonesian MSME sustainability assessment and generate scores (0-100) for each category.

Business Profile:
- Name: ${name}
- Industry: ${INDUSTRY_LABELS[profile.industry]}
- Size: ${BUSINESS_SIZE_LABELS[profile.business_size]}
- Location: ${location}
- Employees: ${profile.employee_count || "N/A"}

Assessment Data:
- Energy source: ${assessment.energy_source}
- Monthly electricity: ${assessment.monthly_electricity_kwh} kWh
- Energy-efficient equipment: ${assessment.uses_energy_efficient_equipment}
- Waste management: ${assessment.waste_management}
- Plastic reduction: ${assessment.plastic_reduction_efforts}
- Monthly waste: ${assessment.waste_volume_kg_monthly} kg
- Local sourcing: ${assessment.local_sourcing_percentage}%
- Supplier sustainability check: ${assessment.supplier_sustainability_check}
- Packaging type: ${assessment.packaging_type}
- Water conservation: ${assessment.water_conservation}
- Digital operations: ${assessment.digital_operations}
- Transportation: ${assessment.transportation_type}
- Sustainability policy: ${assessment.has_sustainability_policy}
- Employee training: ${assessment.employee_sustainability_training}
- Community engagement: ${assessment.community_engagement}

Industry-specific scoring weights for ${INDUSTRY_LABELS[profile.industry]}:
- Energy: ${INDUSTRY_SCORING_WEIGHTS[profile.industry].energy * 100}%
- Waste: ${INDUSTRY_SCORING_WEIGHTS[profile.industry].waste * 100}%
- Supply Chain: ${INDUSTRY_SCORING_WEIGHTS[profile.industry].supply_chain * 100}%
- Operations: ${INDUSTRY_SCORING_WEIGHTS[profile.industry].operations * 100}%
- Policy: ${INDUSTRY_SCORING_WEIGHTS[profile.industry].policy * 100}%
Weight the scores accordingly.
${assessment.industry_answers ? `\nIndustry-specific answers: ${JSON.stringify(sanitizeObjectForPrompt(assessment.industry_answers as Record<string, unknown>))}` : ""}
Score each category 0-100 based on Indonesian MSME standards.

Context: This business produces approximately ${assessment.monthly_electricity_kwh ?? 500} kWh/month of electricity consumption and ${assessment.waste_volume_kg_monthly ?? 100} kg/month of waste. Consider the CO₂ impact of their energy source (${assessment.energy_source}) and waste management (${assessment.waste_management}) when scoring.

Generate ai_summary as exactly 3 bullet lines (no numbering, just the lines separated by newline):
- Line 1: start with "\u2705" then one positive thing they're doing well
- Line 2: start with "\u26A0\uFE0F" then one area that needs improvement
- Line 3: start with "\u{1F4A1}" then one concrete first step to improve
Use casual English (like talking to a friend, not a formal report). Keep each line max 15 words.
Estimate the industry benchmark (average score) for the ${INDUSTRY_LABELS[profile.industry]} sector in Indonesia.`
}

export function buildRoadmapPrompt(
  profile: Profile,
  scores: Score,
  assessment: Assessment
): string {
  const name = sanitizeForPrompt(profile.business_name)
  const location = sanitizeForPrompt(profile.location || "Indonesia")
  const description = profile.description
    ? sanitizeForPrompt(profile.description, 500)
    : ""
  const weights = INDUSTRY_SCORING_WEIGHTS[profile.industry]
  const { rank, tier } = getIndustryRank(profile.industry, scores.total_score)
  const ranks = INDUSTRY_RANKS[profile.industry]
  const nextTier = Math.min(tier + 1, 4)
  const nextRank = tier < 4 ? ranks[nextTier] : rank
  const nextThreshold = [20, 40, 60, 80, 100][nextTier]

  return `Generate a sustainability improvement roadmap for this Indonesian MSME.

Business Profile:
- Name: ${name}
- Industry: ${INDUSTRY_LABELS[profile.industry]}
- Size: ${BUSINESS_SIZE_LABELS[profile.business_size]}
- Location: ${location}
- Employees: ${profile.employee_count || "N/A"}${description ? `\n- Description: ${description}` : ""}

Current Scores:
- Total: ${scores.total_score}/100
- Energy: ${scores.energy_score}/100
- Waste: ${scores.waste_score}/100
- Supply Chain: ${scores.supply_chain_score}/100
- Operations: ${scores.operations_score}/100
- Policy: ${scores.policy_score}/100
${scores.ai_summary ? `\nAI Assessment Summary:\n${scores.ai_summary}` : ""}
${scores.industry_benchmark != null ? `\nIndustry Benchmark: Scored above ${scores.industry_benchmark}% of ${INDUSTRY_LABELS[profile.industry]} businesses in Indonesia` : ""}

Current Rank: ${rank} (tier ${tier + 1}/5)${tier < 4 ? `\nNext Rank: ${nextRank} (need score ${nextThreshold}+)` : ""}

Industry-specific priority weights for ${INDUSTRY_LABELS[profile.industry]}:
- Energy: ${weights.energy * 100}%
- Waste: ${weights.waste * 100}%
- Supply Chain: ${weights.supply_chain * 100}%
- Operations: ${weights.operations * 100}%
- Policy: ${weights.policy * 100}%
Prioritize roadmap items in categories with higher weights for this industry.

Assessment Data:
- Energy source: ${assessment.energy_source}
- Monthly electricity: ${assessment.monthly_electricity_kwh} kWh
- Energy-efficient equipment: ${assessment.uses_energy_efficient_equipment}
- Waste management: ${assessment.waste_management}
- Plastic reduction: ${assessment.plastic_reduction_efforts}
- Monthly waste: ${assessment.waste_volume_kg_monthly} kg
- Local sourcing: ${assessment.local_sourcing_percentage}%
- Supplier sustainability check: ${assessment.supplier_sustainability_check}
- Packaging type: ${assessment.packaging_type}
- Water conservation: ${assessment.water_conservation}
- Digital operations: ${assessment.digital_operations}
- Transportation: ${assessment.transportation_type}
- Sustainability policy: ${assessment.has_sustainability_policy}
- Employee training: ${assessment.employee_sustainability_training}
- Community engagement: ${assessment.community_engagement}
${assessment.industry_answers ? `\nIndustry-specific answers: ${JSON.stringify(sanitizeObjectForPrompt(assessment.industry_answers as Record<string, unknown>))}` : ""}

Generate 8-12 specific, actionable items.
Prioritize low-cost, high-impact actions first.
All text MUST be in English.
Consider Indonesian context: PLN grid, local waste management, Indonesian supply chains.
Focus on actions a small ${INDUSTRY_LABELS[profile.industry]} business can realistically implement.
- Use employee count to scale recommendations (larger = more impactful energy/waste actions, smaller = focus on low-cost wins)${description ? "\n- Consider the business description for more targeted, context-specific advice" : ""}
- Focus more effort on categories with higher industry weights
- Include at least 1-2 items specifically addressing industry-specific gaps from the assessment answers
- Reference the AI summary strengths/weaknesses when prioritizing items

For each item, estimate estimated_savings_rp (monthly savings in Rupiah). Use realistic ranges:
- Energy efficiency: Rp 200,000–800,000/month depending on business size
- Waste reduction: Rp 100,000–300,000/month
- Local sourcing: Rp 50,000–200,000/month
- Digital operations: Rp 50,000–150,000/month
- Policy implementation: Rp 0 (free but enables green financing access)

Also estimate the total annual CO₂ reduction in kg if all roadmap items are implemented.
Use realistic estimates for Indonesian MSMEs (e.g., switching to LED saves ~200kg/year, waste segregation ~100kg/year).
Set tree_equivalent = estimated_co2_reduction_kg / 22 (average CO₂ absorbed by one tree per year).`
}

export function buildChatSystemPrompt(
  profile: Profile,
  score?: Score | null,
  locale: Locale = "id"
): string {
  const scoreContext = score
    ? `
Current Sustainability Score: ${score.total_score}/100
Score breakdown:
- Energi: ${score.energy_score}/100
- Limbah: ${score.waste_score}/100
- Rantai Pasok: ${score.supply_chain_score}/100
- Operasional: ${score.operations_score}/100
- Kebijakan: ${score.policy_score}/100`
    : locale === "id"
      ? "Belum ada assessment sustainability."
      : "No sustainability assessment available yet."

  const name = sanitizeForPrompt(profile.business_name)
  const location = sanitizeForPrompt(profile.location || "Indonesia")
  const description = profile.description
    ? sanitizeForPrompt(profile.description, 500)
    : ""

  return `You are Subak Hijau, an AI sustainability consultant specializing in helping Indonesian MSMEs (UMKM) adopt environmentally friendly business practices.

Context about this business:
- Business name: ${name}
- Industry: ${INDUSTRY_LABELS[profile.industry]}
- Size: ${BUSINESS_SIZE_LABELS[profile.business_size]}
- Location: ${location}
- Employees: ${profile.employee_count || "N/A"}${description ? `\n- Description: ${description}` : ""}
${scoreContext}

Your role:
1. Answer questions about sustainability practices relevant to their specific industry and scale
2. Provide actionable, realistic recommendations for Indonesian UMKM context
3. Consider local regulations (POJK 51/2017, TKBI, IFRS S1/S2)
4. Suggest affordable, practical solutions — not expensive corporate approaches
5. Use Indonesian emission factors and local benchmarks when relevant
6. Be encouraging and motivating — celebrate small wins

You have tools available to provide data-backed answers:
- When users ask about emissions, carbon footprint, or CO2, USE the calculateCO2 tool
- When users ask about regulations, policies, POJK, or compliance, USE the lookupRegulation tool
- When users ask how they compare to others, benchmarks, or industry average, USE the getIndustryBenchmark tool
Always prefer using tools to provide concrete data rather than generic advice.

Communication style:
${locale === "id" ? "- ALWAYS respond in Bahasa Indonesia regardless of what language the user writes in" : "- ALWAYS respond in English regardless of what language the user writes in"}
- Be concise but thorough
- Use specific numbers and examples when possible
- Prioritize low-cost, high-impact actions

Formatting rules:
- Use ### for section headings (not just bold text)
- Use numbered lists (1. 2. 3.) for sequential steps
- Use bullet lists (- item) for non-sequential items
- Add a blank line between sections for readability
- Use **bold** for key terms/labels within text, not as headings
- Keep paragraphs short (2-3 sentences max)`
}
