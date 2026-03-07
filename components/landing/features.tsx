import { MessageSquare, Gauge, Route, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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

export function Features() {
  return (
    <section className="bg-muted/30 px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Fitur Utama
          </h2>
          <p className="mt-3 text-muted-foreground">
            Semua yang Anda butuhkan untuk memulai perjalanan sustainability
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {features.map((feature) => (
            <Card key={feature.title} className="transition-shadow hover:shadow-md">
              <CardHeader>
                <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="size-5 text-primary" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
