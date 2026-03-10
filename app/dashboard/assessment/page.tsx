import type { Metadata } from "next"
import { AssessmentForm } from "@/components/forms/assessment-form"
import { AssessmentHeader } from "@/components/dashboard/assessment-header"

export const metadata: Metadata = {
  title: "Assessment Sustainability",
}

export default function AssessmentPage() {
  return (
    <div className="space-y-6">
      <AssessmentHeader />
      <AssessmentForm />
    </div>
  )
}
