"use client"

import Image from "next/image"
import { Brain, Footprints, Scale } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "@/lib/i18n/language-context"
import { publicPagesContent } from "@/lib/i18n/content/public-pages"
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/landing/motion-wrapper"

const sdgColors: Record<number, string> = {
  7: "border-l-amber-400",
  12: "border-l-yellow-500",
  13: "border-l-green-500",
}

export function AboutContent() {
  const { locale } = useTranslation()
  const d = publicPagesContent[locale].about

  return (
    <div className="mx-auto max-w-6xl px-4">
      {/* Hero with Image Overlay */}
      <FadeInUp>
        <div className="relative mb-16 overflow-hidden rounded-3xl">
          <Image
            src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=80"
            alt={d.heroImageAlt}
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

      {/* Mission & Vision Bento */}
      <StaggerContainer
        className="mb-16 grid gap-4 sm:grid-cols-2 lg:auto-rows-[220px] lg:grid-cols-3"
        staggerDelay={0.08}
      >
        {/* Left tall image */}
        <StaggerItem className="relative aspect-[3/4] overflow-hidden rounded-2xl sm:row-span-2 sm:aspect-auto">
          <Image
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80"
            alt={d.imageAlts.market}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </StaggerItem>

        {/* Mission */}
        <StaggerItem className="sm:col-span-1 lg:col-span-2">
          <div className="flex h-full flex-col justify-center rounded-2xl border bg-card p-6 ring-1 ring-border">
            <h2 className="mb-3 text-xl font-semibold">{d.mission.title}</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {d.mission.content}
            </p>
          </div>
        </StaggerItem>

        {/* Vision */}
        <StaggerItem className="sm:col-span-1 lg:col-span-2">
          <div className="flex h-full flex-col justify-center rounded-2xl border bg-card p-6 ring-1 ring-border">
            <h2 className="mb-3 text-xl font-semibold">{d.vision.title}</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {d.vision.content}
            </p>
          </div>
        </StaggerItem>
      </StaggerContainer>

      {/* Impact Bento */}
      <FadeInUp>
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {d.impact.title}
          </h2>
          <p className="mt-3 text-muted-foreground">{d.impact.subtitle}</p>
        </div>
      </FadeInUp>

      <StaggerContainer
        className="mb-16 grid gap-4 sm:grid-cols-2 lg:auto-rows-[200px] lg:grid-cols-3"
        staggerDelay={0.08}
      >
        {/* AI Analysis — col-span-2 */}
        <StaggerItem className="lg:col-span-2">
          <div className="flex h-full flex-col justify-center rounded-2xl border bg-card p-6 ring-1 ring-border">
            <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-primary/10">
              <Brain className="size-5 text-primary" />
            </div>
            <h3 className="mb-1 text-lg font-semibold">
              {d.impact.features[0].title}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {d.impact.features[0].description}
            </p>
          </div>
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

        {/* Carbon Calculation — col-span-2 */}
        <StaggerItem className="lg:col-span-2">
          <div className="flex h-full flex-col justify-center rounded-2xl border bg-card p-6 ring-1 ring-border">
            <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-primary/10">
              <Footprints className="size-5 text-primary" />
            </div>
            <h3 className="mb-1 text-lg font-semibold">
              {d.impact.features[1].title}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {d.impact.features[1].description}
            </p>
          </div>
        </StaggerItem>

        {/* Bottom wide image — col-span-2 */}
        <StaggerItem className="relative aspect-video overflow-hidden rounded-2xl sm:col-span-2 lg:col-span-2 lg:aspect-auto">
          <Image
            src="https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80"
            alt={d.imageAlts.agriculture}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 66vw"
          />
        </StaggerItem>

        {/* Regulatory Compliance — col-span-1 */}
        <StaggerItem>
          <div className="flex h-full flex-col justify-center rounded-2xl border bg-card p-6 ring-1 ring-border">
            <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-primary/10">
              <Scale className="size-5 text-primary" />
            </div>
            <h3 className="mb-1 text-lg font-semibold">
              {d.impact.features[2].title}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {d.impact.features[2].description}
            </p>
          </div>
        </StaggerItem>
      </StaggerContainer>

      {/* SDG Goals Bento */}
      <FadeInUp>
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {d.sdg.title}
          </h2>
          <p className="mt-3 text-muted-foreground">{d.sdg.subtitle}</p>
        </div>
      </FadeInUp>

      <StaggerContainer
        className="grid gap-4 sm:grid-cols-2 lg:auto-rows-[200px] lg:grid-cols-3"
        staggerDelay={0.08}
      >
        {/* SDG 7 */}
        <StaggerItem>
          <div
            className={`flex h-full flex-col justify-center rounded-2xl border border-l-4 ${sdgColors[7]} bg-card p-6 ring-1 ring-border`}
          >
            <Badge variant="secondary" className="mb-3 w-fit text-sm font-bold">
              SDG {d.sdg.goals[0].number}
            </Badge>
            <h3 className="mb-1 font-semibold">{d.sdg.goals[0].title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {d.sdg.goals[0].description}
            </p>
          </div>
        </StaggerItem>

        {/* SDG 12 */}
        <StaggerItem>
          <div
            className={`flex h-full flex-col justify-center rounded-2xl border border-l-4 ${sdgColors[12]} bg-card p-6 ring-1 ring-border`}
          >
            <Badge variant="secondary" className="mb-3 w-fit text-sm font-bold">
              SDG {d.sdg.goals[1].number}
            </Badge>
            <h3 className="mb-1 font-semibold">{d.sdg.goals[1].title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {d.sdg.goals[1].description}
            </p>
          </div>
        </StaggerItem>

        {/* Right tall image — row-span-2 */}
        <StaggerItem className="relative aspect-[3/4] overflow-hidden rounded-2xl sm:row-span-2 sm:aspect-auto">
          <Image
            src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=80"
            alt={d.imageAlts.forest}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </StaggerItem>

        {/* SDG 13 — col-span-2 */}
        <StaggerItem className="sm:col-span-1 lg:col-span-2">
          <div
            className={`flex h-full flex-col justify-center rounded-2xl border border-l-4 ${sdgColors[13]} bg-card p-6 ring-1 ring-border`}
          >
            <Badge variant="secondary" className="mb-3 w-fit text-sm font-bold">
              SDG {d.sdg.goals[2].number}
            </Badge>
            <h3 className="mb-1 font-semibold">{d.sdg.goals[2].title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {d.sdg.goals[2].description}
            </p>
          </div>
        </StaggerItem>
      </StaggerContainer>
    </div>
  )
}
