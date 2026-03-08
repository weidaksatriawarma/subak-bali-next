"use client"

import Image from "next/image"
import {
  ClipboardList,
  Brain,
  Map,
  MessageSquare,
  Gauge,
  Route,
  TrendingUp,
} from "lucide-react"
import { useTranslation } from "@/lib/i18n/language-context"
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/landing/motion-wrapper"

const stepIcons = [ClipboardList, Brain, Map]
const featureIcons = [MessageSquare, Gauge, Route, TrendingUp]

function FeatureCell({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}) {
  return (
    <div className="flex h-full flex-col justify-center rounded-2xl border bg-card p-6 ring-1 ring-border transition-shadow hover:shadow-md">
      <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-primary/10">
        <Icon className="size-5 text-primary" />
      </div>
      <h3 className="mb-1 text-lg font-semibold text-foreground">{title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  )
}

export function BentoGrid() {
  const { t } = useTranslation()

  const steps = t.bentoGrid.steps.map((s, i) => ({
    ...s,
    step: i + 1,
    icon: stepIcons[i],
  }))

  const features = t.bentoGrid.features.map((f, i) => ({
    ...f,
    icon: featureIcons[i],
  }))

  return (
    <section id="cara-kerja" className="px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <FadeInUp>
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t.bentoGrid.heading}
            </h2>
            <p className="mt-3 text-muted-foreground">
              {t.bentoGrid.subheading}
            </p>
          </div>
        </FadeInUp>

        {/* Steps row */}
        <StaggerContainer className="mb-8 grid gap-4 sm:grid-cols-3">
          {steps.map((item) => (
            <StaggerItem key={item.step}>
              <div className="flex items-center gap-4 rounded-2xl border bg-card p-4 ring-1 ring-border">
                <div className="relative flex-shrink-0">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
                    <item.icon className="size-6 text-primary" />
                  </div>
                  <div className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    {item.step}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Bento grid */}
        <StaggerContainer
          className="grid gap-4 sm:grid-cols-2 lg:auto-rows-[200px] lg:grid-cols-3"
          staggerDelay={0.08}
        >
          {/* Image: Solar panels — tall left */}
          <StaggerItem className="relative overflow-hidden rounded-2xl sm:row-span-2">
            <Image
              src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80"
              alt="Solar panels representing sustainable energy"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </StaggerItem>

          {/* Feature: AI Chat */}
          <StaggerItem className="lg:col-span-2">
            <FeatureCell {...features[0]} />
          </StaggerItem>

          {/* Feature: Score */}
          <StaggerItem className="lg:col-span-2">
            <FeatureCell {...features[1]} />
          </StaggerItem>

          {/* Feature: Roadmap */}
          <StaggerItem className="lg:col-span-2">
            <FeatureCell {...features[2]} />
          </StaggerItem>

          {/* Image: Workspace — tall right */}
          <StaggerItem className="relative overflow-hidden rounded-2xl sm:row-span-2">
            <Image
              src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80"
              alt="Modern workspace representing business innovation"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </StaggerItem>

          {/* Feature: Tracking */}
          <StaggerItem className="lg:col-span-2">
            <FeatureCell {...features[3]} />
          </StaggerItem>

          {/* Image: Forest — wide bottom */}
          <StaggerItem className="relative aspect-video overflow-hidden rounded-2xl sm:col-span-2 lg:col-span-3 lg:aspect-auto lg:h-[200px]">
            <Image
              src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80"
              alt="Forest canopy representing nature and environment"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  )
}
