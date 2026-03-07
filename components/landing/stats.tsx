import { Building2, Heart, DollarSign } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const stats = [
  {
    icon: Building2,
    value: "65 Juta",
    label: "UMKM belum punya strategi sustainability",
  },
  {
    icon: Heart,
    value: "79%",
    label: "konsumen pilih brand ramah lingkungan",
  },
  {
    icon: DollarSign,
    value: "$5,000+",
    label: "biaya konsultan tradisional per sesi",
  },
]

export function Stats() {
  return (
    <section className="px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-6 sm:grid-cols-3">
          {stats.map((stat) => (
            <Card
              key={stat.value}
              className="border-none bg-muted/50 text-center shadow-none"
            >
              <CardContent className="flex flex-col items-center gap-3 pt-2">
                <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
                  <stat.icon className="size-6 text-primary" />
                </div>
                <div className="text-3xl font-bold tracking-tight text-foreground">
                  {stat.value}
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
