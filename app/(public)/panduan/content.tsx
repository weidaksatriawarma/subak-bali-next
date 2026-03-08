"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import {
  Award,
  BarChart3,
  Building2,
  ClipboardList,
  Flame,
  Footprints,
  Gauge,
  Map,
  MessageSquare,
  Shield,
  SlidersHorizontal,
  Trophy,
  UserPlus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/lib/i18n/language-context"
import { tutorialContent } from "@/lib/i18n/content/tutorial"
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/landing/motion-wrapper"

const stepIcons = [UserPlus, Building2, ClipboardList, Gauge]
const coreFeatureIcons = [ClipboardList, BarChart3, Map, MessageSquare]
const aiToolIcons = [Footprints, Shield, SlidersHorizontal]
const gamificationIcons = [Trophy, Award, Flame]

export function TutorialContent() {
  const { locale } = useTranslation()
  const d = tutorialContent[locale].public

  return (
    <div className="mx-auto max-w-6xl px-4">
      {/* Section 1: Hero with Image Overlay */}
      <FadeInUp>
        <div className="relative mb-16 overflow-hidden rounded-3xl">
          <Image
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80"
            alt={d.imageAlts.hero}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 px-8 py-20 text-center sm:py-28">
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {d.heroHeading}
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-white/80">
              {d.heroDescription}
            </p>
          </div>
        </div>
      </FadeInUp>

      {/* Section 2: Getting Started Steps */}
      <FadeInUp>
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {d.gettingStarted.title}
          </h2>
          <p className="mt-3 text-muted-foreground">
            {d.gettingStarted.subtitle}
          </p>
        </div>
      </FadeInUp>

      <StaggerContainer
        className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        staggerDelay={0.08}
      >
        {d.gettingStarted.steps.map((step, i) => {
          const Icon = stepIcons[i]
          return (
            <StaggerItem key={i}>
              <div className="relative flex h-full flex-col items-start rounded-2xl border bg-card p-6 ring-1 ring-border">
                <div className="absolute -top-2 -right-2 flex size-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {i + 1}
                </div>
                <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="size-5 text-primary" />
                </div>
                <h3 className="mb-1 font-semibold">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </StaggerItem>
          )
        })}
      </StaggerContainer>

      {/* Section 3: Core Features Bento */}
      <FadeInUp>
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {d.coreFeatures.title}
          </h2>
          <p className="mt-3 text-muted-foreground">
            {d.coreFeatures.subtitle}
          </p>
        </div>
      </FadeInUp>

      <StaggerContainer
        className="mb-16 grid gap-4 sm:grid-cols-2 lg:auto-rows-[200px] lg:grid-cols-3"
        staggerDelay={0.08}
      >
        {/* Left tall image — row-span-2 */}
        <StaggerItem className="relative aspect-[3/4] overflow-hidden rounded-2xl sm:row-span-2 sm:aspect-auto">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80"
            alt={d.imageAlts.collaboration}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </StaggerItem>

        {/* Assessment — col-span-2 */}
        <StaggerItem className="lg:col-span-2">
          <FeatureCard
            icon={coreFeatureIcons[0]}
            title={d.coreFeatures.features[0].title}
            description={d.coreFeatures.features[0].description}
          />
        </StaggerItem>

        {/* Score — col-span-2 */}
        <StaggerItem className="lg:col-span-2">
          <FeatureCard
            icon={coreFeatureIcons[1]}
            title={d.coreFeatures.features[1].title}
            description={d.coreFeatures.features[1].description}
          />
        </StaggerItem>

        {/* Roadmap — col-span-2 */}
        <StaggerItem className="lg:col-span-2">
          <FeatureCard
            icon={coreFeatureIcons[2]}
            title={d.coreFeatures.features[2].title}
            description={d.coreFeatures.features[2].description}
          />
        </StaggerItem>

        {/* Chat */}
        <StaggerItem>
          <FeatureCard
            icon={coreFeatureIcons[3]}
            title={d.coreFeatures.features[3].title}
            description={d.coreFeatures.features[3].description}
          />
        </StaggerItem>
      </StaggerContainer>

      {/* Section 4: AI Tools & Analytics Bento */}
      <FadeInUp>
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {d.aiTools.title}
          </h2>
          <p className="mt-3 text-muted-foreground">{d.aiTools.subtitle}</p>
        </div>
      </FadeInUp>

      <StaggerContainer
        className="mb-16 grid gap-4 sm:grid-cols-2 lg:auto-rows-[200px] lg:grid-cols-3"
        staggerDelay={0.08}
      >
        {/* Carbon — col-span-2 */}
        <StaggerItem className="lg:col-span-2">
          <FeatureCard
            icon={aiToolIcons[0]}
            title={d.aiTools.features[0].title}
            description={d.aiTools.features[0].description}
          />
        </StaggerItem>

        {/* Right tall image — row-span-2 */}
        <StaggerItem className="relative aspect-[3/4] overflow-hidden rounded-2xl sm:row-span-2 sm:aspect-auto">
          <Image
            src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80"
            alt={d.imageAlts.greenTech}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </StaggerItem>

        {/* Compliance — col-span-2 */}
        <StaggerItem className="lg:col-span-2">
          <FeatureCard
            icon={aiToolIcons[1]}
            title={d.aiTools.features[1].title}
            description={d.aiTools.features[1].description}
          />
        </StaggerItem>

        {/* Bottom wide image — col-span-2 */}
        <StaggerItem className="relative aspect-video overflow-hidden rounded-2xl sm:col-span-2 lg:col-span-2 lg:aspect-auto">
          <Image
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
            alt={d.imageAlts.analytics}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 66vw"
          />
        </StaggerItem>

        {/* Simulator */}
        <StaggerItem>
          <FeatureCard
            icon={aiToolIcons[2]}
            title={d.aiTools.features[2].title}
            description={d.aiTools.features[2].description}
          />
        </StaggerItem>
      </StaggerContainer>

      {/* Section 5: Gamification Bento */}
      <FadeInUp>
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {d.gamification.title}
          </h2>
          <p className="mt-3 text-muted-foreground">
            {d.gamification.subtitle}
          </p>
        </div>
      </FadeInUp>

      <StaggerContainer
        className="mb-16 grid gap-4 sm:grid-cols-2 lg:auto-rows-[200px] lg:grid-cols-3"
        staggerDelay={0.08}
      >
        {/* Ranks */}
        <StaggerItem>
          <FeatureCard
            icon={gamificationIcons[0]}
            title={d.gamification.features[0].title}
            description={d.gamification.features[0].description}
          />
        </StaggerItem>

        {/* Badges */}
        <StaggerItem>
          <FeatureCard
            icon={gamificationIcons[1]}
            title={d.gamification.features[1].title}
            description={d.gamification.features[1].description}
          />
        </StaggerItem>

        {/* Right tall image — row-span-2 */}
        <StaggerItem className="relative aspect-[3/4] overflow-hidden rounded-2xl sm:row-span-2 sm:aspect-auto">
          <Image
            src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=80"
            alt={d.imageAlts.nature}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </StaggerItem>

        {/* Streaks — col-span-2 */}
        <StaggerItem className="sm:col-span-1 lg:col-span-2">
          <FeatureCard
            icon={gamificationIcons[2]}
            title={d.gamification.features[2].title}
            description={d.gamification.features[2].description}
          />
        </StaggerItem>
      </StaggerContainer>

      {/* Section 6: CTA */}
      <FadeInUp>
        <div className="relative mb-16 overflow-hidden rounded-3xl">
          <Image
            src="https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80"
            alt={d.imageAlts.ctaBg}
            fill
            className="object-cover"
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 px-8 py-16 text-center sm:px-12 sm:py-20">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {d.cta.heading}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/80">
              {d.cta.description}
            </p>
            <Button size="lg" asChild className="mt-8 h-12 px-8 text-base">
              <Link href="/register">
                {d.cta.button}
                <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </FadeInUp>
    </div>
  )
}

function FeatureCard({
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
      <h3 className="mb-1 text-lg font-semibold">{title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  )
}
