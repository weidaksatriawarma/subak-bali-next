import Link from "next/link"
import { ArrowRight, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pt-20 pb-16 sm:px-6 md:pt-32 md:pb-24 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--color-primary)/0.12,transparent_70%)]" />
      <div className="absolute top-0 right-0 -z-10 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 -z-10 h-96 w-96 rounded-full bg-chart-2/5 blur-3xl" />

      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
          <Leaf className="size-4" />
          <span>AI-Powered Sustainability</span>
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Konsultan Sustainability{" "}
          <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
            AI
          </span>{" "}
          untuk Bisnis Anda
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          GreenAdvisor membantu UMKM Indonesia menilai, merencanakan, dan
          melacak strategi sustainability bisnis — tanpa biaya konsultan mahal.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" asChild className="h-12 px-8 text-base">
            <Link href="/register">
              Mulai Gratis
              <ArrowRight className="ml-1 size-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild className="h-12 px-8 text-base">
            <a href="#cara-kerja">Pelajari Lebih Lanjut</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
