import type { Metadata } from "next"
import { QuickAssessmentForm } from "@/components/forms/quick-assessment-form"
import { AssessmentRetakeGate } from "@/components/dashboard/assessment-retake-gate"
import { createClient } from "@/lib/supabase/server"

export const metadata: Metadata = {
  title: "Quick Assessment - Subak Hijau",
  description: "Estimate your sustainability score in 3 minutes",
}

export default async function QuickAssessmentPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  let previousScore: number | null = null
  let assessmentDate: string | null = null
  let hasAssessment = false

  if (user) {
    const { data: assessment } = await supabase
      .from("assessments")
      .select("id, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .single()

    if (assessment) {
      hasAssessment = true
      assessmentDate = assessment.created_at

      const { data: score } = await supabase
        .from("scores")
        .select("total_score")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .single()

      previousScore = score?.total_score ?? null
    }
  }

  if (hasAssessment) {
    return (
      <AssessmentRetakeGate
        previousScore={previousScore}
        assessmentDate={assessmentDate}
      >
        <QuickAssessmentForm />
      </AssessmentRetakeGate>
    )
  }

  return <QuickAssessmentForm />
}
