"use client"

import { Building2, Heart, DollarSign } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useTranslation } from "@/lib/i18n/language-context"

const icons = [Building2, Heart, DollarSign]

export function Stats() {
  const { t } = useTranslation()

  return (
    <section className="px-4 py-16 sm:px-6 md:pt-24 md:pb-12 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-6 sm:grid-cols-3">
          {t.stats.items.map((stat, i) => {
            const Icon = icons[i]
            return (
              <Card
                key={i}
                className="border-none bg-muted/50 text-center shadow-none"
              >
                <CardContent className="flex flex-col items-center gap-3 pt-2">
                  <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="size-6 text-primary" />
                  </div>
                  <div className="text-3xl font-bold tracking-tight text-foreground">
                    {stat.value}
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
