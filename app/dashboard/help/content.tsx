"use client"

import { useState } from "react"
import Link from "next/link"
import {
  BarChart3,
  BookOpen,
  Calculator,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Lightbulb,
  Rocket,
  ScrollText,
  Settings,
  Trophy,
} from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "@/lib/i18n/language-context"
import { tutorialContent } from "@/lib/i18n/content/tutorial"
import { knowledgeBase } from "@/lib/i18n/content/knowledge-base"
import { FadeInUp } from "@/components/landing/motion-wrapper"

const sectionIcons = [Rocket, BarChart3, Calculator, Trophy, Settings]

export function HelpContent() {
  const { locale } = useTranslation()
  const d = tutorialContent[locale].dashboard
  const kb = knowledgeBase[locale]
  const [expandedReg, setExpandedReg] = useState<string | null>(null)

  return (
    <div className="mx-auto max-w-4xl px-4">
      {/* Section Nav */}
      <FadeInUp>
        <div className="mb-6 flex flex-wrap gap-2">
          <a
            href="#faq"
            className="rounded-full border px-3 py-1 text-xs font-medium hover:bg-muted"
          >
            FAQ
          </a>
          <a
            href="#regulations"
            className="rounded-full border px-3 py-1 text-xs font-medium hover:bg-muted"
          >
            {kb.sectionTitles.regulations}
          </a>
          <a
            href="#tips"
            className="rounded-full border px-3 py-1 text-xs font-medium hover:bg-muted"
          >
            {kb.sectionTitles.tips}
          </a>
          <a
            href="#glossary"
            className="rounded-full border px-3 py-1 text-xs font-medium hover:bg-muted"
          >
            {kb.sectionTitles.glossary}
          </a>
        </div>
      </FadeInUp>

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

      {/* FAQ Accordion Sections */}
      <div id="faq">
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
      </div>

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

      {/* ── Regulation Guides ────────────────────────────────────── */}
      <FadeInUp delay={0.1}>
        <div id="regulations" className="mt-12 scroll-mt-20">
          <div className="mb-6 flex items-center gap-2">
            <ScrollText className="size-5 text-primary" />
            <h2 className="text-lg font-semibold">
              {kb.sectionTitles.regulations}
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {kb.regulations.map((reg) => (
              <Card key={reg.number} className="overflow-hidden">
                <CardHeader
                  className="cursor-pointer"
                  onClick={() =>
                    setExpandedReg(
                      expandedReg === reg.number ? null : reg.number
                    )
                  }
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <Badge variant="secondary" className="mb-2">
                        {reg.number}
                      </Badge>
                      <CardTitle className="text-sm">{reg.title}</CardTitle>
                    </div>
                    {expandedReg === reg.number ? (
                      <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
                    )}
                  </div>
                </CardHeader>
                {expandedReg === reg.number && (
                  <CardContent className="pt-0">
                    <p className="mb-3 text-sm text-muted-foreground">
                      {reg.summary}
                    </p>
                    <p className="mb-1 text-xs font-medium">
                      {locale === "id"
                        ? "Persyaratan Utama:"
                        : "Key Requirements:"}
                    </p>
                    <ul className="space-y-1">
                      {reg.keyRequirements.map((req, i) => (
                        <li
                          key={i}
                          className="text-xs text-muted-foreground before:mr-1 before:content-['•']"
                        >
                          {req}
                        </li>
                      ))}
                    </ul>
                    {reg.deadline && (
                      <p className="mt-2 text-xs text-muted-foreground">
                        Deadline: {reg.deadline}
                      </p>
                    )}
                    <div className="mt-2 flex flex-wrap gap-1">
                      {reg.relevantIndustries.map((ind) => (
                        <Badge key={ind} variant="outline" className="text-xs">
                          {ind}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </FadeInUp>

      {/* ── Sustainability Tips ──────────────────────────────────── */}
      <FadeInUp delay={0.15}>
        <div id="tips" className="mt-12 scroll-mt-20">
          <div className="mb-6 flex items-center gap-2">
            <Lightbulb className="size-5 text-primary" />
            <h2 className="text-lg font-semibold">{kb.sectionTitles.tips}</h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {kb.tips.map((group) => (
              <AccordionItem key={group.industry} value={group.industry}>
                <AccordionTrigger className="text-left capitalize">
                  {group.industry === "general"
                    ? locale === "id"
                      ? "Umum"
                      : "General"
                    : group.industry.toUpperCase()}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {group.tips.map((tip, i) => (
                      <div key={i} className="rounded-lg border p-3">
                        <p className="text-sm font-medium">{tip.title}</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {tip.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </FadeInUp>

      {/* ── Glossary ─────────────────────────────────────────────── */}
      <FadeInUp delay={0.2}>
        <div id="glossary" className="mt-12 mb-8 scroll-mt-20">
          <div className="mb-6 flex items-center gap-2">
            <BookOpen className="size-5 text-primary" />
            <h2 className="text-lg font-semibold">
              {kb.sectionTitles.glossary}
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {kb.glossary.map((item) => (
              <div key={item.term} className="rounded-lg border p-3">
                <p className="text-sm font-semibold">{item.term}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {item.definition}
                </p>
              </div>
            ))}
          </div>
        </div>
      </FadeInUp>
    </div>
  )
}
