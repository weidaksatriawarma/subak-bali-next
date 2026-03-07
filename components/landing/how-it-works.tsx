import { ClipboardList, Brain, Map } from "lucide-react"

const steps = [
  {
    step: 1,
    icon: ClipboardList,
    title: "Profil Bisnis",
    description:
      "Isi profil bisnis Anda — jenis usaha, skala operasi, dan praktik saat ini.",
  },
  {
    step: 2,
    icon: Brain,
    title: "AI Assessment",
    description:
      "AI menganalisis sustainability bisnis Anda dan memberikan skor komprehensif.",
  },
  {
    step: 3,
    icon: Map,
    title: "Roadmap & Tracking",
    description:
      "Dapatkan roadmap personal dan lacak progres sustainability Anda.",
  },
]

export function HowItWorks() {
  return (
    <section id="cara-kerja" className="px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Cara Kerja
          </h2>
          <p className="mt-3 text-muted-foreground">
            Tiga langkah sederhana menuju bisnis yang lebih berkelanjutan
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {steps.map((item) => (
            <div key={item.step} className="relative flex flex-col items-center text-center">
              <div className="relative mb-4">
                <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10">
                  <item.icon className="size-7 text-primary" />
                </div>
                <div className="absolute -top-2 -right-2 flex size-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {item.step}
                </div>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
