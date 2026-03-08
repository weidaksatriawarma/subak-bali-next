import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { ClipboardList } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { EmptyState } from "@/components/shared/empty-state"
import { SDGDashboard } from "@/components/dashboard/sdg-dashboard"
import type { Score, Profile, Assessment, RoadmapItem } from "@/types/database"

export const metadata: Metadata = {
  title: "SDG Dashboard",
}

export default async function SDGPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/login")

  const [
    { data: score },
    { data: profile },
    { data: assessment },
    { data: roadmapItems },
  ] = await Promise.all([
    supabase
      .from("scores")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .single<Score>(),
    supabase.from("profiles").select("*").eq("id", user.id).single<Profile>(),
    supabase
      .from("assessments")
      .select("*")
      .eq("user_id", user.id)
      .eq("status", "completed")
      .order("created_at", { ascending: false })
      .limit(1)
      .single<Assessment>(),
    supabase
      .from("roadmap_items")
      .select("*")
      .eq("user_id", user.id)
      .order("sort_order", { ascending: true })
      .returns<RoadmapItem[]>(),
  ])

  if (!score) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <EmptyState
          icon={ClipboardList}
          title="Belum ada assessment"
          description="Lengkapi assessment terlebih dahulu untuk melihat kontribusi SDG Anda."
          actionLabel="Mulai Assessment"
          actionHref="/dashboard/assessment"
        />
      </div>
    )
  }

  return (
    <SDGDashboard
      score={{
        energy: score.energy_score,
        waste: score.waste_score,
        supply_chain: score.supply_chain_score,
        operations: score.operations_score,
        policy: score.policy_score,
      }}
      assessment={assessment ?? undefined}
      roadmapItems={roadmapItems ?? []}
      businessSize={profile?.business_size ?? "small"}
    />
  )
}
