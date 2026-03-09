import type { Metadata } from "next"
import { QuickAssessmentForm } from "@/components/forms/quick-assessment-form"

export const metadata: Metadata = {
  title: "Quick Assessment - Subak Hijau",
  description: "Estimasi skor sustainability dalam 3 menit",
}

export default function QuickAssessmentPage() {
  return <QuickAssessmentForm />
}
