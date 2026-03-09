"use client"

import { Building2, Heart, DollarSign, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useTranslation } from "@/lib/i18n/language-context"
import {
  StaggerContainer,
  StaggerItem,
  CountUp,
} from "@/components/landing/motion-wrapper"

const icons = [Building2, Heart, DollarSign, Clock]

export function Stats() {
  const { t } = useTranslation()

  return (
    <section className="px-4 py-16 sm:px-6 md:pt-24 md:pb-12 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.stats.items.map((stat, i) => {
            const Icon = icons[i]
            return (
              <StaggerItem key={i}>
                <Card className="h-full border-none bg-muted/50 text-center shadow-none">
                  <CardContent className="flex flex-col items-center gap-3 pt-2">
                    <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
                      <Icon className="size-6 text-primary" />
                    </div>
                    <CountUp
                      value={stat.value}
                      className="text-4xl font-bold tracking-tight text-foreground"
                    />
                    <p className="text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                  </CardContent>
                </Card>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </div>
    </section>
  )
}
