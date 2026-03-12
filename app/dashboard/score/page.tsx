import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { ScoreEmptyState } from "@/components/dashboard/score-empty-state"
import { ScoreContent } from "@/components/dashboard/score-content"
import { INDUSTRY_LABELS } from "@/lib/constants"
import type { Score, Profile, Assessment } from "@/types/database"

export const metadata: Metadata = {
  title: "Sustainability Score",
}

export default async function ScorePage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/login")

  const [{ data: scores }, { data: profile }, { data: assessment }] =
    await Promise.all([
      supabase
        .from("scores")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(2)
        .returns<Score[]>(),
      supabase.from("profiles").select("*").eq("id", user.id).single<Profile>(),
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
  const previousScore = scores?.[1] ?? null

  if (!score) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <ScoreEmptyState />
      </div>
    )
  }

  const industryLabel = profile ? INDUSTRY_LABELS[profile.industry] : ""

  return (
    <ScoreContent
      data={{
        totalScore: score.total_score,
        energyScore: score.energy_score,
        wasteScore: score.waste_score,
        supplyChainScore: score.supply_chain_score,
        operationsScore: score.operations_score,
        policyScore: score.policy_score,
        aiSummary: score.ai_summary,
        industryBenchmark: score.industry_benchmark,
        industryLabel,
        businessName: profile?.business_name ?? "",
      }}
      previousScore={
        previousScore
          ? {
              energyScore: previousScore.energy_score,
              wasteScore: previousScore.waste_score,
              supplyChainScore: previousScore.supply_chain_score,
              operationsScore: previousScore.operations_score,
              policyScore: previousScore.policy_score,
            }
          : undefined
      }
      assessment={assessment ?? undefined}
      businessSize={profile?.business_size ?? "small"}
      industry={profile?.industry ?? "other"}
      certificateToken={score.certificate_token}
    />
  )
}
