import { Navbar } from "@/components/landing/navbar"
import { Hero } from "@/components/landing/hero"
import { Stats } from "@/components/landing/stats"
import { TrustBadges } from "@/components/landing/trust-badges"
import { BentoGrid } from "@/components/landing/bento-grid"
import { CtaSection } from "@/components/landing/cta-section"
import { FaqSection } from "@/components/landing/faq-section"
import { Footer } from "@/components/landing/footer"
import { ScrollToTop } from "@/components/landing/scroll-to-top"

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
    </main>
  )
}
