"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "@/lib/i18n/language-context"
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/landing/motion-wrapper"

const EMOJIS = ["🍜", "🛍️", "🏭"]

export function SocialProof() {
  const { t } = useTranslation()
  const d = t.socialProof

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <FadeInUp>
          <h2 className="mb-2 text-center text-2xl font-bold tracking-tight sm:text-3xl">
            {d.heading}
          </h2>
          <p className="mb-10 text-center text-muted-foreground">
            {d.subheading}
          </p>
        </FadeInUp>
        <StaggerContainer className="grid gap-6 sm:grid-cols-3">
          {d.items.map((item, i) => (
            <StaggerItem key={i}>
              <Card className="border-none bg-muted/50 shadow-none transition-shadow hover:shadow-md">
                <CardContent className="flex flex-col items-center gap-3 pt-2 text-center">
                  <span className="text-4xl">{EMOJIS[i]}</span>
                  <Badge variant="secondary">{item.type}</Badge>
                  <p className="text-sm text-muted-foreground italic">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <p className="text-xl font-bold text-green-600">
                    {item.metric}
                  </p>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
