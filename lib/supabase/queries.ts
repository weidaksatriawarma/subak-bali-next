import { cache } from "react"
import { createClient } from "./server"
import type { Assessment, Profile, Score, RoadmapItem } from "@/types/database"

export const getUser = cache(async () => {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
})

export const getProfile = cache(async (userId: string) => {
  const supabase = await createClient()
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single<Profile>()
  return data
})

export const getLatestScore = cache(async (userId: string) => {
  const supabase = await createClient()
  const { data } = await supabase
    .from("scores")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .single<Score>()
  return data
})

export const getLatestTwoScores = cache(async (userId: string) => {
  const supabase = await createClient()
  const { data } = await supabase
    .from("scores")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(2)
    .returns<Score[]>()
  return data ?? []
})

export const getAllScoresAsc = cache(async (userId: string) => {
  const supabase = await createClient()
  const { data } = await supabase
    .from("scores")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: true })
    .returns<Score[]>()
  return data ?? []
})

export const getLatestAssessment = cache(async (userId: string) => {
  const supabase = await createClient()
  const { data } = await supabase
    .from("assessments")
    .select("*")
    .eq("user_id", userId)
    .eq("status", "completed")
    .order("created_at", { ascending: false })
    .limit(1)
    .single<Assessment>()
  return data
})

export const getRoadmapItems = cache(async (userId: string) => {
  const supabase = await createClient()
  const { data } = await supabase
    .from("roadmap_items")
    .select("*")
    .eq("user_id", userId)
    .order("sort_order", { ascending: true })
    .returns<RoadmapItem[]>()
  return data ?? []
})
