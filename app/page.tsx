import { Navbar } from "@/components/landing/navbar"
import { Hero } from "@/components/landing/hero"
import { Stats } from "@/components/landing/stats"
import { BentoGrid } from "@/components/landing/bento-grid"
import { CtaSection } from "@/components/landing/cta-section"
import { Footer } from "@/components/landing/footer"

export default function Page() {
  return (
    <main className="min-h-svh">
      <Navbar />
      <Hero />
      <Stats />
      <BentoGrid />
      <CtaSection />
      <Footer />
    </main>
  )
}
