import type { Metadata } from "next"
import { Navbar } from "@/components/landing/navbar"
import { Hero } from "@/components/landing/hero"
import { Stats } from "@/components/landing/stats"
import { TrustBadges } from "@/components/landing/trust-badges"
import { BentoGrid } from "@/components/landing/bento-grid"
import { CtaSection } from "@/components/landing/cta-section"
import { FaqSection } from "@/components/landing/faq-section"
import { Footer } from "@/components/landing/footer"
import { ScrollToTop } from "@/components/landing/scroll-to-top"
import { landingExtras } from "@/lib/i18n/content/landing-extras"

export const metadata: Metadata = {
  title: {
    absolute:
      "Subak Hijau — Konsultan Sustainability AI untuk UMKM Indonesia",
  },
  openGraph: {
    url: "https://subakhijau.app",
  },
  alternates: {
    canonical: "https://subakhijau.app",
  },
}

const faqItems = landingExtras.id.faq.items

export default function Page() {
  return (
    <main className="min-h-svh">
      <Navbar />
      <Hero />
      <Stats />
      <TrustBadges />
      <BentoGrid />
      <CtaSection />
      <FaqSection />
      <Footer />
      <ScrollToTop />

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
    </main>
  )
}
