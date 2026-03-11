import type { Metadata } from "next"
import { AssessmentForm } from "@/components/forms/assessment-form"
import { AssessmentHeader } from "@/components/dashboard/assessment-header"
import { AssessmentRetakeGate } from "@/components/dashboard/assessment-retake-gate"
import { createClient } from "@/lib/supabase/server"

export const metadata: Metadata = {
  title: "Assessment Sustainability",
}

export default async function AssessmentPage() {
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

  return (
    <div className="space-y-6">
      <AssessmentHeader />
      {hasAssessment ? (
        <AssessmentRetakeGate
          previousScore={previousScore}
          assessmentDate={assessmentDate}
        >
          <AssessmentForm />
        </AssessmentRetakeGate>
      ) : (
        <AssessmentForm />
      )}
    </div>
  )
}
