import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { ScrollToTop } from "@/components/landing/scroll-to-top"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-svh">
      <Navbar />
      <div className="pt-20 pb-16">{children}</div>
      <Footer />
      <ScrollToTop />
    </main>
  )
}
