import type { Metadata } from "next"
import { FaqSection } from "@/components/landing/faq-section"
import { landingExtras } from "@/lib/i18n/content/landing-extras"

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Pertanyaan yang sering diajukan tentang Subak Hijau — konsultan sustainability AI untuk UMKM Indonesia.",
}

const faqItems = landingExtras.id.faq.items

export default function FaqPage() {
  return (
    <div className="py-8">
      <FaqSection />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          }),
        }}
      />
    </div>
  )
}
