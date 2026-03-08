"use client"

import {
  Shield,
  Lock,
  ShieldCheck,
  Zap,
  Globe,
  Recycle,
  FileCheck,
  Server,
  ShieldAlert,
} from "lucide-react"
import { useTranslation } from "@/lib/i18n/language-context"
import { landingExtras } from "@/lib/i18n/content/landing-extras"
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/landing/motion-wrapper"

const CATEGORY_ICONS = [
  [FileCheck, ShieldAlert, Server],
  [Lock, Shield, ShieldCheck],
  [Zap, Recycle, Globe],
]

const CATEGORY_COLORS = [
  "text-blue-600 dark:text-blue-400",
  "text-green-600 dark:text-green-400",
  "text-amber-600 dark:text-amber-400",
]

export function TrustBadges() {
  const { locale } = useTranslation()
  const d = landingExtras[locale].trustBadges

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
        <StaggerContainer className="grid gap-8 sm:grid-cols-3">
          {d.categories.map((category, ci) => (
            <StaggerItem key={ci}>
              <div className="text-center">
                <h3 className="mb-4 text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                  {category.title}
                </h3>
                <div className="flex flex-col gap-3">
                  {category.badges.map((badge, bi) => {
                    const Icon = CATEGORY_ICONS[ci][bi]
                    return (
                      <div
                        key={bi}
                        className="flex items-center gap-3 rounded-lg border bg-card p-3 text-left transition-colors hover:bg-muted/50"
                      >
                        <div
                          className={`flex size-9 shrink-0 items-center justify-center rounded-md bg-muted ${CATEGORY_COLORS[ci]}`}
                        >
                          <Icon className="size-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium">{badge.label}</p>
                          <p className="text-xs text-muted-foreground">
                            {badge.description}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
