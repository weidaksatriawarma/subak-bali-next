import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { ClipboardList } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { EmptyState } from "@/components/shared/empty-state"
import { SimulatorContent } from "@/components/dashboard/simulator-content"
import type { Assessment, Score } from "@/types/database"

export const metadata: Metadata = {
  title: "Simulator Aksi",
}

export default async function SimulatorPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const [{ data: assessment }, { data: score }] = await Promise.all([
    supabase
      .from("assessments")
      .select("*")
      .eq("user_id", user.id)
      .eq("status", "completed")
      .order("created_at", { ascending: false })
      .limit(1)
      .single<Assessment>(),
    supabase
      .from("scores")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .single<Score>(),
  ])

  if (!assessment || !score) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <EmptyState
          icon={ClipboardList}
          title="Belum ada data"
          description="Lengkapi assessment dan generate skor terlebih dahulu."
          actionLabel="Mulai Assessment"
          actionHref="/dashboard/assessment"
        />
      </div>
    )
  }

  return (
    <SimulatorContent
      assessment={assessment}
      currentTotalScore={score.total_score}
    />
  )
}
