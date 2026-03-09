"use client"

import { Check, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "@/lib/i18n/language-context"
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/landing/motion-wrapper"

export function ComparisonSection() {
  const { t } = useTranslation()
  const d = t.comparison

  return (
    <section className="px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <FadeInUp>
          <h2 className="mb-2 text-center text-2xl font-bold tracking-tight sm:text-3xl">
            {d.heading}
          </h2>
          <p className="mb-10 text-center text-muted-foreground">
            {d.subheading}
          </p>
        </FadeInUp>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Traditional Card */}
          <FadeInUp delay={0.1}>
            <Card className="h-full bg-muted/30">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  {d.traditional}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <StaggerContainer className="flex flex-col">
                  {d.rows.map((row, i) => (
                    <StaggerItem key={i}>
                      <div
                        className={`py-3 ${i < d.rows.length - 1 ? "border-b border-border/50" : ""}`}
                      >
                        <p className="text-sm font-bold">{row.aspect}</p>
                        <div className="mt-1 flex items-start gap-2">
                          <X className="mt-0.5 size-4 shrink-0 text-destructive" />
                          <p className="text-sm text-muted-foreground">
                            {row.traditional}
                          </p>
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </CardContent>
            </Card>
          </FadeInUp>

          {/* Subak Hijau Card */}
          <FadeInUp delay={0.2}>
            <Card className="relative h-full border-primary ring-2 ring-primary/20">
              <Badge className="absolute top-4 right-4">{d.recommended}</Badge>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  {d.subakHijau}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <StaggerContainer className="flex flex-col">
                  {d.rows.map((row, i) => (
                    <StaggerItem key={i}>
                      <div
                        className={`py-3 ${i < d.rows.length - 1 ? "border-b border-border/50" : ""}`}
                      >
                        <p className="text-sm font-bold">{row.aspect}</p>
                        <div className="mt-1 flex items-start gap-2">
                          <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                          <p className="text-sm text-muted-foreground">
                            {row.subakHijau}
                          </p>
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </CardContent>
            </Card>
          </FadeInUp>
        </div>
      </div>
    </section>
  )
}
