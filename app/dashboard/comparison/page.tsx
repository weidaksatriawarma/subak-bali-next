import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { ComparisonContent } from "@/components/dashboard/comparison-content"

export const metadata: Metadata = {
  title: "Perbandingan - Subak Hijau",
  description: "Bandingkan assessment pertama dan terbaru",
}

export default async function ComparisonPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const { data: scores } = await supabase
    .from("scores")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true })

  if (!scores || scores.length < 2) {
    return <ComparisonContent firstScore={null} latestScore={null} />
  }

  return (
    <ComparisonContent
      firstScore={scores[0]}
      latestScore={scores[scores.length - 1]}
    />
  )
}
