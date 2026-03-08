import type { Metadata } from "next"
import { AssessmentForm } from "@/components/forms/assessment-form"

export const metadata: Metadata = {
  title: "Assessment Sustainability",
}

export default function AssessmentPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Assessment Sustainability
        </h1>
        <p className="text-muted-foreground">
          Jawab pertanyaan berikut untuk menilai tingkat sustainability bisnis
          Anda.
        </p>
      </div>
      <AssessmentForm />
    </div>
  )
}
