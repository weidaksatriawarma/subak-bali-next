import { Hero } from "@/components/landing/hero"
import { Stats } from "@/components/landing/stats"
import { HowItWorks } from "@/components/landing/how-it-works"
import { Features } from "@/components/landing/features"
import { CtaSection } from "@/components/landing/cta-section"
import { Footer } from "@/components/landing/footer"

export default function Page() {
  return (
    <main className="min-h-svh">
      <Hero />
      <Stats />
      <HowItWorks />
      <Features />
      <CtaSection />
      <Footer />
    </main>
  )
}
