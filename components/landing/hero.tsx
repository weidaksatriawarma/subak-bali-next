"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/lib/i18n/language-context"
import { FadeInUp } from "@/components/landing/motion-wrapper"

export function Hero() {
  const { t } = useTranslation()

  return (
    <section className="relative overflow-hidden px-4 pt-20 pb-16 sm:px-6 md:pt-32 md:pb-24 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--color-primary)/0.12,transparent_70%)]" />
      <div className="absolute top-0 right-0 -z-10 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 -z-10 h-96 w-96 rounded-full bg-chart-2/5 blur-3xl" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <FadeInUp delay={0.1}>
          <div className="text-center lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
              <Leaf className="size-4" />
              <span>{t.hero.badge}</span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              {t.hero.titleStart}{" "}
              <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                {t.hero.titleHighlight}
              </span>{" "}
              {t.hero.titleEnd}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl lg:max-w-none">
              {t.hero.description}
            </p>

            <FadeInUp delay={0.3}>
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
                <Button size="lg" asChild className="h-12 px-8 text-base">
                  <Link href="/register">
                    {t.hero.cta}
                    <ArrowRight className="ml-1 size-4" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="h-12 px-8 text-base"
                >
                  <a href="#cara-kerja">{t.hero.learnMore}</a>
                </Button>
              </div>
            </FadeInUp>
          </div>
        </FadeInUp>

        <FadeInUp delay={0.3}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl lg:aspect-square">
            <Image
              src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&q=80"
              alt={t.hero.imageAlt}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </FadeInUp>
      </div>
    </section>
  )
}
