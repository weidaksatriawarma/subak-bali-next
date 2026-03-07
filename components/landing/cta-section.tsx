import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CtaSection() {
  return (
    <section className="px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <div className="rounded-2xl bg-gradient-to-br from-primary/10 via-chart-2/5 to-chart-3/10 p-8 sm:p-12">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Mulai Assessment Gratis Sekarang
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Bergabung dengan ribuan UMKM yang sudah memulai perjalanan
            sustainability mereka bersama GreenAdvisor.
          </p>
          <Button size="lg" asChild className="mt-8 h-12 px-8 text-base">
            <Link href="/register">
              Daftar Sekarang
              <ArrowRight className="ml-1 size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
