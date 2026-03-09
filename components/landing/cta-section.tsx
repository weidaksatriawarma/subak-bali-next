"use client"

import Link from "next/link"
import { ArrowRight, Clock, Wallet, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/lib/i18n/language-context"
import { FadeInUp } from "@/components/landing/motion-wrapper"

export function CtaSection() {
  const { t } = useTranslation()

  return (
    <section className="px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <FadeInUp>
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-chart-2 px-8 py-16 text-center sm:px-12 sm:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]" />
          <div className="relative z-10">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {t.cta.heading}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/80">
              {t.cta.description}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                asChild
                className="h-12 bg-white px-8 text-base text-primary hover:bg-white/90"
              >
                <Link href="/register">
                  {t.cta.button}
                  <ArrowRight className="ml-1 size-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                asChild
                className="h-12 border border-white/30 bg-transparent px-8 text-base text-white hover:bg-white/10"
              >
                <a href="#product-preview">{t.cta.secondaryButton}</a>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-white/70">
              <span className="flex items-center gap-1.5">
                <Clock className="size-4" />
                {t.cta.perks.clock}
              </span>
              <span className="flex items-center gap-1.5">
                <Wallet className="size-4" />
                {t.cta.perks.wallet}
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="size-4" />
                {t.cta.perks.shield}
              </span>
            </div>
          </div>
        </div>
      </FadeInUp>
    </section>
  )
}
