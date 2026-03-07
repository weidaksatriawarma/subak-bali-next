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

const steps = [
  {
    step: 1,
    icon: ClipboardList,
    title: "Profil Bisnis",
    description: "Isi profil bisnis Anda — jenis usaha, skala, dan praktik.",
  },
  {
    step: 2,
    icon: Brain,
    title: "AI Assessment",
    description: "AI menganalisis sustainability dan memberikan skor.",
  },
  {
    step: 3,
    icon: Map,
    title: "Roadmap & Tracking",
    description: "Dapatkan roadmap personal dan lacak progres Anda.",
  },
]

const features = [
  {
    icon: MessageSquare,
    title: "AI Chat Consultant",
    description:
      "Konsultasi langsung dengan AI tentang strategi sustainability, regulasi, dan praktik terbaik untuk bisnis Anda.",
  },
  {
    icon: Gauge,
    title: "Sustainability Score",
    description:
      "Dapatkan skor sustainability komprehensif berdasarkan analisis AI terhadap profil dan operasi bisnis Anda.",
  },
  {
    icon: Route,
    title: "Roadmap Generator",
    description:
      "AI membuat roadmap sustainability personal dengan langkah-langkah konkret dan timeline yang realistis.",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description:
      "Lacak progres sustainability bisnis Anda dengan visualisasi data dan insight dari AI.",
  },
]

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
  return (
    <section id="cara-kerja" className="px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Cara Kerja & Fitur Utama
          </h2>
          <p className="mt-3 text-muted-foreground">
            Tiga langkah sederhana dan fitur lengkap untuk sustainability bisnis
            Anda
          </p>
        </div>

        {/* Steps row */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {steps.map((item) => (
            <div
              key={item.step}
              className="flex items-center gap-4 rounded-2xl border bg-card p-4 ring-1 ring-border"
            >
              <div className="relative flex-shrink-0">
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
                  <item.icon className="size-6 text-primary" />
                </div>
                <div className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {item.step}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{item.title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bento grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[200px]">
          {/* Image: Solar panels — tall left */}
          <div className="relative overflow-hidden rounded-2xl sm:row-span-2">
            <Image
              src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80"
              alt="Solar panels representing sustainable energy"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>

          {/* Feature: AI Chat */}
          <div className="lg:col-span-2">
            <FeatureCell {...features[0]} />
          </div>

          {/* Feature: Score */}
          <div className="lg:col-span-2">
            <FeatureCell {...features[1]} />
          </div>

          {/* Feature: Roadmap */}
          <div className="lg:col-span-2">
            <FeatureCell {...features[2]} />
          </div>

          {/* Image: Workspace — tall right */}
          <div className="relative overflow-hidden rounded-2xl sm:row-span-2">
            <Image
              src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80"
              alt="Modern workspace representing business innovation"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>

          {/* Feature: Tracking */}
          <div className="lg:col-span-2">
            <FeatureCell {...features[3]} />
          </div>

          {/* Image: Forest — wide bottom */}
          <div className="relative aspect-video overflow-hidden rounded-2xl sm:col-span-2 lg:col-span-3 lg:aspect-auto lg:h-[200px]">
            <Image
              src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80"
              alt="Forest canopy representing nature and environment"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
