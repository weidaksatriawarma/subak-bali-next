import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { getIndustryRank } from "@/lib/gamification/industry-data"
import { AchievementPageContent } from "@/components/dashboard/achievement-page-content"
import type { Score, Profile, RoadmapItem } from "@/types/database"

export const metadata: Metadata = {
  title: "Achievement Card",
}

export default async function AchievementPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/login")

  const [{ data: scores }, { data: profile }, { data: roadmapItems }] =
    await Promise.all([
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
        .returns<RoadmapItem[]>(),
    ])

  const score = scores?.[0] ?? null
  const rank =
    score && profile
      ? getIndustryRank(profile.industry, score.total_score).rank
      : ""
  const items = roadmapItems ?? []

  return (
    <AchievementPageContent
      score={score}
      profile={profile}
      roadmapItems={items.map((i) => ({
        is_completed: i.is_completed,
        category: i.category,
      }))}
      rank={rank}
    />
  )
}
