"use client"

import { useTranslation } from "@/lib/i18n/language-context"
import { Users, Leaf, Footprints } from "lucide-react"
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
  CountUp,
} from "@/components/landing/motion-wrapper"

const ICONS = [Users, Leaf, Footprints]

export function CommunityImpact() {
  const { t } = useTranslation()
  const d = t.communityImpact

  const stats = [
    { value: d.stat1Value, label: d.stat1Label },
    { value: d.stat2Value, label: d.stat2Label },
    { value: d.stat3Value, label: d.stat3Label },
  ]

  return (
    <section className="border-t bg-green-50/50 py-16 md:py-24 dark:bg-green-950/10">
      <div className="mx-auto max-w-5xl px-4">
        <FadeInUp>
          <h2 className="text-center text-2xl font-bold tracking-tight md:text-3xl">
            {d.heading}
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-center text-muted-foreground">
            {d.subheading}
          </p>
        </FadeInUp>

        <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-3">
          {stats.map((stat, i) => {
            const Icon = ICONS[i]
            return (
              <StaggerItem key={i}>
                <div className="flex flex-col items-center gap-3 rounded-xl border bg-background p-6 text-center shadow-sm">
                  <div className="flex size-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/40">
                    <Icon className="h-6 w-6 text-green-600" />
                  </div>
                  <CountUp
                    value={stat.value}
                    className="text-3xl font-bold text-green-700 dark:text-green-400"
                  />
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </div>
    </section>
  )
}
