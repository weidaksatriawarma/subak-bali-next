import type { Metadata } from "next"
import { FaqSection } from "@/components/landing/faq-section"

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Pertanyaan yang sering diajukan tentang GreenAdvisor — konsultan sustainability AI untuk UMKM Indonesia.",
}

export default function FaqPage() {
  return (
    <div className="py-8">
      <FaqSection />
    </div>
  )
}
