"use client"

import Link from "next/link"
import {
  BarChart3,
  Calculator,
  ExternalLink,
  Lightbulb,
  Rocket,
  Settings,
  Trophy,
} from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useTranslation } from "@/lib/i18n/language-context"
import { tutorialContent } from "@/lib/i18n/content/tutorial"
import { FadeInUp } from "@/components/landing/motion-wrapper"

const sectionIcons = [Rocket, BarChart3, Calculator, Trophy, Settings]

export function HelpContent() {
  const { locale } = useTranslation()
  const d = tutorialContent[locale].dashboard

  return (
    <div className="mx-auto max-w-4xl px-4">
      {/* Header */}
      <FadeInUp>
        <div className="mb-10">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {d.title}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {d.subtitle}{" "}
            <Link
              href="/panduan"
              target="_blank"
              className="inline-flex items-center gap-1 text-primary hover:underline"
            >
              {d.fullGuideLink}
              <ExternalLink className="size-3" />
            </Link>
          </p>
        </div>
      </FadeInUp>

      {/* Accordion Sections */}
      {d.sections.map((section, sectionIndex) => {
        const Icon = sectionIcons[sectionIndex]
        return (
          <FadeInUp key={sectionIndex} delay={sectionIndex * 0.05}>
            <div className="mb-6">
              <div className="mb-3 flex items-center gap-2">
                <Icon className="size-5 text-primary" />
                <h2 className="text-lg font-semibold">{section.title}</h2>
              </div>
              <Accordion type="single" collapsible className="w-full">
                {section.items.map((item, itemIndex) => (
                  <AccordionItem
                    key={itemIndex}
                    value={`section-${sectionIndex}-item-${itemIndex}`}
                  >
                    <AccordionTrigger className="text-left">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </FadeInUp>
        )
      })}

      {/* Quick Tips */}
      <FadeInUp delay={0.3}>
        <div className="mt-10 mb-8">
          <div className="mb-4 flex items-center gap-2">
            <Lightbulb className="size-5 text-primary" />
            <h2 className="text-lg font-semibold">{d.tips.title}</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {d.tips.items.map((tip, i) => (
              <div
                key={i}
                className="rounded-xl border bg-card p-4 ring-1 ring-border"
              >
                <p className="text-sm text-muted-foreground">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeInUp>
    </div>
  )
}
