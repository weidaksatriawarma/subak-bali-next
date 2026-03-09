"use client"

import {
  ClipboardList,
  Brain,
  Map,
  MessageSquare,
  Gauge,
  Route,
  TrendingUp,
  ChevronRight,
  Zap,
  Trash2,
  Link2,
  Settings,
  FileText,
  Check,
  Bot,
  User,
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
    <div className="flex h-full flex-col justify-center rounded-2xl border bg-card p-6 ring-1 ring-border transition-all hover:scale-[1.02] hover:shadow-md">
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

function ScoreIllustration() {
  const categories = [
    { icon: Zap, value: 82, color: "bg-chart-1" },
    { icon: Trash2, value: 75, color: "bg-chart-2" },
    { icon: Link2, value: 70, color: "bg-chart-3" },
    { icon: Settings, value: 85, color: "bg-chart-4" },
    { icon: FileText, value: 68, color: "bg-chart-5" },
  ]

  return (
    <div className="flex h-full flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-chart-2/10 p-6">
      <svg className="mb-4 size-20" viewBox="0 0 80 80">
        <circle
          cx="40"
          cy="40"
          r="34"
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          className="text-muted/30"
        />
        <circle
          cx="40"
          cy="40"
          r="34"
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          strokeDasharray={`${(78 / 100) * 213.6} 213.6`}
          strokeLinecap="round"
          className="text-primary"
          transform="rotate(-90 40 40)"
        />
        <text
          x="40"
          y="44"
          textAnchor="middle"
          className="fill-foreground text-lg font-bold"
          fontSize="16"
        >
          78
        </text>
      </svg>
      <div className="flex gap-2">
        {categories.map(({ icon: Icon }, i) => (
          <div
            key={i}
            className="flex size-8 items-center justify-center rounded-md bg-card shadow-sm"
          >
            <Icon className="size-4 text-muted-foreground" />
          </div>
        ))}
      </div>
    </div>
  )
}

function RoadmapIllustration() {
  const items = [
    { checked: true, text: "Ganti lampu LED" },
    { checked: true, text: "Pisahkan limbah" },
    { checked: false, text: "Catat listrik" },
  ]

  return (
    <div className="flex h-full flex-col justify-center gap-3 rounded-2xl bg-gradient-to-br from-chart-2/10 to-primary/10 p-6">
      {items.map((item, i) => (
        <div
          key={i}
          className="flex items-center gap-3 rounded-lg bg-card/80 px-3 py-2 shadow-sm"
        >
          <div
            className={`flex size-5 items-center justify-center rounded ${
              item.checked
                ? "bg-primary text-primary-foreground"
                : "border border-muted-foreground/30"
            }`}
          >
            {item.checked && <Check className="size-3" />}
          </div>
          <span
            className={`text-sm ${
              item.checked
                ? "text-muted-foreground line-through"
                : "text-foreground"
            }`}
          >
            {item.text}
          </span>
        </div>
      ))}
    </div>
  )
}

function ChatIllustration() {
  return (
    <div className="flex h-full flex-col justify-center gap-3 rounded-2xl bg-gradient-to-br from-primary/10 to-chart-2/10 p-6">
      <div className="flex justify-end">
        <div className="flex items-start gap-2">
          <div className="max-w-[70%] rounded-2xl rounded-tr-sm bg-primary px-3 py-2 text-xs text-primary-foreground">
            Berapa emisi karbon warung saya?
          </div>
          <div className="flex size-6 items-center justify-center rounded-full bg-muted">
            <User className="size-3 text-muted-foreground" />
          </div>
        </div>
      </div>
      <div className="flex justify-start">
        <div className="flex items-start gap-2">
          <div className="flex size-6 items-center justify-center rounded-full bg-primary/10">
            <Bot className="size-3 text-primary" />
          </div>
          <div className="max-w-[75%] rounded-2xl rounded-tl-sm bg-muted px-3 py-2 text-xs text-muted-foreground">
            Estimasi emisi karbon Anda ~2.4 ton CO₂/tahun...
          </div>
        </div>
      </div>
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

        {/* Steps row with connectors */}
        <StaggerContainer className="mb-8 grid gap-4 sm:grid-cols-3">
          {steps.map((item, i) => (
            <StaggerItem key={item.step} className="relative">
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
              {i < steps.length - 1 && (
                <div className="absolute top-1/2 -right-4 z-10 hidden -translate-y-1/2 text-muted-foreground/40 sm:block">
                  <ChevronRight className="size-5" />
                </div>
              )}
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Bento grid */}
        <StaggerContainer
          className="grid gap-4 sm:grid-cols-2 lg:auto-rows-[200px] lg:grid-cols-3"
          staggerDelay={0.08}
        >
          {/* Score illustration — tall left */}
          <StaggerItem className="overflow-hidden rounded-2xl sm:row-span-2">
            <ScoreIllustration />
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

          {/* Roadmap illustration — tall right */}
          <StaggerItem className="overflow-hidden rounded-2xl sm:row-span-2">
            <RoadmapIllustration />
          </StaggerItem>

          {/* Feature: Tracking */}
          <StaggerItem className="lg:col-span-2">
            <FeatureCell {...features[3]} />
          </StaggerItem>

          {/* Chat illustration — wide bottom */}
          <StaggerItem className="overflow-hidden rounded-2xl sm:col-span-2 lg:col-span-3">
            <ChatIllustration />
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  )
}
