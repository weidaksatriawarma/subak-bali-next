import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { INDUSTRY_LABELS } from "@/lib/constants"
import { ScoreReport } from "@/components/dashboard/score-report"
import type { Score, Profile, RoadmapItem, Assessment } from "@/types/database"

export default async function ReportPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/login")

  const [
    { data: scores },
    { data: profile },
    { data: roadmapItems },
    { data: assessment },
  ] = await Promise.all([
    supabase
      .from("scores")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .returns<Score[]>(),
    supabase.from("profiles").select("*").eq("id", user.id).single<Profile>(),
    supabase
      .from("roadmap_items")
      .select("*")
      .eq("user_id", user.id)
      .order("priority", { ascending: true })
      .limit(3)
      .returns<RoadmapItem[]>(),
    supabase
      .from("assessments")
      .select("*")
      .eq("user_id", user.id)
      .eq("status", "completed")
      .order("created_at", { ascending: false })
      .limit(1)
      .single<Assessment>(),
  ])

  const score = scores?.[0] ?? null

  if (!score || !profile) redirect("/dashboard/score")

  const industryLabel = INDUSTRY_LABELS[profile.industry]

  return (
    <ScoreReport
      score={{
        totalScore: score.total_score,
        energyScore: score.energy_score,
        wasteScore: score.waste_score,
        supplyChainScore: score.supply_chain_score,
        operationsScore: score.operations_score,
        policyScore: score.policy_score,
        aiSummary: score.ai_summary,
        industryBenchmark: score.industry_benchmark,
      }}
      businessName={profile.business_name}
      industryLabel={industryLabel}
      roadmapItems={roadmapItems ?? []}
      assessment={assessment ?? undefined}
      businessSize={profile.business_size}
    />
  )
}
