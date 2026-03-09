import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardOverview } from "@/components/dashboard/dashboard-overview"
import {
  calculateCarbonFootprint,
  calculatePotentialSavings,
  calculateRegulatoryCompliance,
} from "@/lib/carbon"
import type { Assessment, Profile } from "@/types/database"

export const metadata: Metadata = {
  title: "Dashboard",
}

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const [
    { data: profile },
    { data: latestScore },
    { data: roadmapItems },
    { data: assessment },
    { data: fullAssessment },
  ] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).single<Profile>(),
    supabase
      .from("scores")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .single(),
    supabase
      .from("roadmap_items")
      .select(
        "id, is_completed, completed_at, title, description, category, priority, estimated_cost, estimated_impact"
      )
      .eq("user_id", user.id),
    supabase
      .from("assessments")
      .select("id")
      .eq("user_id", user.id)
      .eq("status", "completed")
      .limit(1)
      .single(),
    supabase
      .from("assessments")
      .select("*")
      .eq("user_id", user.id)
      .eq("status", "completed")
      .order("created_at", { ascending: false })
      .limit(1)
      .single<Assessment>(),
  ])

  const allItems = roadmapItems ?? []
  const completedRoadmap = allItems.filter((i) => i.is_completed).length
  const totalRoadmap = allItems.length

  const quickWins = allItems
    .filter(
      (i) =>
        !i.is_completed &&
        (i.estimated_cost === "free" || i.estimated_cost === "low")
    )
    .sort((a, b) => {
      const order: Record<string, number> = { high: 0, medium: 1, low: 2 }
      return (order[a.priority] ?? 3) - (order[b.priority] ?? 3)
    })
    .slice(0, 3)

  // Calculate impact data if assessment exists
  const impact =
    fullAssessment && profile
      ? {
          carbon: calculateCarbonFootprint(fullAssessment),
          savings: calculatePotentialSavings(profile.business_size),
          compliance: calculateRegulatoryCompliance(fullAssessment),
        }
      : null

  return (
    <DashboardOverview
      data={{
        businessName: profile?.business_name ?? "",
        totalScore: latestScore?.total_score ?? null,
        completedRoadmap,
        totalRoadmap,
        quickWins: quickWins.map((i) => ({
          id: i.id,
          title: i.title,
          category: i.category,
          estimated_cost: i.estimated_cost,
          estimated_impact: i.estimated_impact,
        })),
        industry: profile?.industry ?? "other",
        roadmapItems: allItems.map((i) => ({
          is_completed: i.is_completed,
          category: i.category,
          completed_at: i.completed_at ?? null,
        })),
        hasAssessment: !!assessment,
        hasScore: latestScore !== null,
        hasRoadmap: totalRoadmap > 0,
        hasCertificate: !!latestScore?.certificate_token,
        impact,
      }}
    />
  )
}
