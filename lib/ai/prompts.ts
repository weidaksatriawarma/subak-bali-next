import type { Profile, Score, Assessment } from "@/types/database"
import { INDUSTRY_LABELS, BUSINESS_SIZE_LABELS } from "@/lib/constants"

export function buildScorePrompt(
  profile: Profile,
  assessment: Assessment
): string {
  return `Analyze this Indonesian MSME sustainability assessment and generate scores (0-100) for each category.

Business Profile:
- Name: ${profile.business_name}
- Industry: ${INDUSTRY_LABELS[profile.industry]}
- Size: ${BUSINESS_SIZE_LABELS[profile.business_size]}
- Location: ${profile.location || "Indonesia"}
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

Score each category 0-100 based on Indonesian MSME standards.
Generate ai_summary as exactly 3 bullet lines (no numbering, just the lines separated by newline):
- Line 1: start with "\u2705" then one positive thing they're doing well
- Line 2: start with "\u26A0\uFE0F" then one area that needs improvement
- Line 3: start with "\u{1F4A1}" then one concrete first step to improve
Use casual Bahasa Indonesia (like talking to a friend, not a formal report). Keep each line max 15 words.
Estimate the industry benchmark (average score) for the ${INDUSTRY_LABELS[profile.industry]} sector in Indonesia.`
}

export function buildRoadmapPrompt(
  profile: Profile,
  scores: Score,
  assessment: Assessment
): string {
  return `Generate a sustainability improvement roadmap for this Indonesian MSME.

Business: ${profile.business_name}
Industry: ${INDUSTRY_LABELS[profile.industry]}
Size: ${BUSINESS_SIZE_LABELS[profile.business_size]}
Location: ${profile.location || "Indonesia"}

Current Scores:
- Total: ${scores.total_score}/100
- Energi: ${scores.energy_score}/100
- Limbah: ${scores.waste_score}/100
- Rantai Pasok: ${scores.supply_chain_score}/100
- Operasional: ${scores.operations_score}/100
- Kebijakan: ${scores.policy_score}/100

Assessment: ${JSON.stringify(assessment)}

Generate 8-12 specific, actionable items.
Prioritize low-cost, high-impact actions first.
All text MUST be in Bahasa Indonesia.
Consider Indonesian context: PLN grid, local waste management, Indonesian supply chains.
Focus on actions a small ${INDUSTRY_LABELS[profile.industry]} business can realistically implement.`
}

export function buildChatSystemPrompt(
  profile: Profile,
  score?: Score | null
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
    : "Belum ada assessment sustainability."

  return `You are GreenAdvisor, an AI sustainability consultant specializing in helping Indonesian MSMEs (UMKM) adopt environmentally friendly business practices.

Context about this business:
- Business name: ${profile.business_name}
- Industry: ${INDUSTRY_LABELS[profile.industry]}
- Size: ${BUSINESS_SIZE_LABELS[profile.business_size]}
- Location: ${profile.location || "Indonesia"}
- Employees: ${profile.employee_count || "N/A"}
${scoreContext}

Your role:
1. Answer questions about sustainability practices relevant to their specific industry and scale
2. Provide actionable, realistic recommendations for Indonesian UMKM context
3. Consider local regulations (POJK 51/2017, TKBI, IFRS S1/S2)
4. Suggest affordable, practical solutions — not expensive corporate approaches
5. Use Indonesian emission factors and local benchmarks when relevant
6. Be encouraging and motivating — celebrate small wins

Communication style:
- Respond in the same language as the user (Bahasa Indonesia or English)
- Be concise but thorough
- Use specific numbers and examples when possible
- Prioritize low-cost, high-impact actions`
}
