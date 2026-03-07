import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CtaSection() {
  return (
    <section className="px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl">
        <Image
          src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=1200&q=80"
          alt="Aerial view of forest landscape"
          fill
          className="object-cover"
          sizes="(max-width: 1280px) 100vw, 1280px"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 px-8 py-16 text-center sm:px-12 sm:py-20">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Mulai Assessment Gratis Sekarang
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/80">
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
