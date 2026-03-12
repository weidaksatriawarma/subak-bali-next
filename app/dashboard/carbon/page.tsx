import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { ClipboardList } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { EmptyState } from "@/components/shared/empty-state"
import dynamic from "next/dynamic"

const CarbonContent = dynamic(
  () =>
    import("@/components/dashboard/carbon-content").then(
      (mod) => mod.CarbonContent
    ),
  {
    loading: () => (
      <div className="space-y-6">
        <div className="h-28 w-full animate-pulse rounded-xl bg-muted" />
        <div className="h-[250px] w-full animate-pulse rounded-xl bg-muted" />
      </div>
    ),
  }
)
import type { Assessment, Profile } from "@/types/database"

export const metadata: Metadata = {
  title: "Carbon Footprint",
}

export default async function CarbonPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const [{ data: profile }, { data: assessment }] = await Promise.all([
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

  if (!assessment) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <EmptyState
          icon={ClipboardList}
          title="No data yet"
          description="Complete an assessment to view your business carbon footprint."
          actionLabel="Start Assessment"
          actionHref="/dashboard/assessment"
        />
      </div>
    )
  }

  return (
    <CarbonContent
      assessment={assessment}
      businessSize={profile?.business_size ?? "small"}
    />
  )
}
