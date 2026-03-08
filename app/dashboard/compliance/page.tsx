import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { ClipboardList } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { EmptyState } from "@/components/shared/empty-state"
import { ComplianceContent } from "@/components/dashboard/compliance-content"
import type { Assessment } from "@/types/database"

export const metadata: Metadata = {
  title: "Kepatuhan Regulasi",
}

export default async function CompliancePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const { data: assessment } = await supabase
    .from("assessments")
    .select("*")
    .eq("user_id", user.id)
    .eq("status", "completed")
    .order("created_at", { ascending: false })
    .limit(1)
    .single<Assessment>()

  if (!assessment) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <EmptyState
          icon={ClipboardList}
          title="Belum ada data"
          description="Lengkapi assessment untuk melihat status kepatuhan regulasi bisnis Anda."
          actionLabel="Mulai Assessment"
          actionHref="/dashboard/assessment"
        />
      </div>
    )
  }

  return <ComplianceContent assessment={assessment} />
}
