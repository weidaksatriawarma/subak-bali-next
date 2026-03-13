"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import {
  BarChart3,
  BookOpen,
  Briefcase,
  Calculator,
  ExternalLink,
  Factory,
  Globe,
  Lightbulb,
  Rocket,
  ScrollText,
  Search,
  Settings,
  ShoppingBag,
  Sparkles,
  Sprout,
  Trophy,
  UtensilsCrossed,
  Zap,
} from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTranslation } from "@/lib/i18n/language-context"
import { AskAiCard } from "@/components/shared/ask-ai-card"
import { tutorialContent } from "@/lib/i18n/content/tutorial"
import { knowledgeBase } from "@/lib/i18n/content/knowledge-base"
import { FadeInUp } from "@/components/landing/motion-wrapper"

const sectionIcons = [Rocket, BarChart3, Calculator, Trophy, Settings]

const navItems = [
  { id: "faq", icon: BookOpen },
  { id: "regulations", icon: ScrollText },
  { id: "tips", icon: Lightbulb },
  { id: "glossary", icon: BookOpen },
  { id: "methodology", icon: Calculator },
]

const industryIcons: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  general: Globe,
  fnb: UtensilsCrossed,
  retail: ShoppingBag,
  manufacturing: Factory,
  services: Briefcase,
  agriculture: Sprout,
}

const industryLabels: Record<string, Record<string, string>> = {
  id: {
    general: "Umum",
    fnb: "F&B",
    retail: "Retail",
    manufacturing: "Manufaktur",
    services: "Jasa",
    agriculture: "Pertanian",
  },
  en: {
    general: "General",
    fnb: "F&B",
    retail: "Retail",
    manufacturing: "Manufacturing",
    services: "Services",
    agriculture: "Agriculture",
  },
}

export function HelpContent() {
  const { locale } = useTranslation()
  const d = tutorialContent[locale].dashboard
  const kb = knowledgeBase[locale]
  const [faqSearch, setFaqSearch] = useState("")
  const [glossarySearch, setGlossarySearch] = useState("")

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }, [])

  const navLabels = {
    faq: "FAQ",
    regulations: kb.sectionTitles.regulations,
    tips: kb.sectionTitles.tips,
    glossary: kb.sectionTitles.glossary,
    methodology: kb.sectionTitles.methodology,
  }

  // Filter FAQ sections based on search
  const filteredSections = d.sections
    .map((section, sectionIndex) => {
      if (!faqSearch.trim()) return { section, sectionIndex }
      const query = faqSearch.toLowerCase()
      const filtered = section.items.filter(
        (item) =>
          item.question.toLowerCase().includes(query) ||
          item.answer.toLowerCase().includes(query)
      )
      if (filtered.length === 0) return null
      return {
        section: { ...section, items: filtered },
        sectionIndex,
      }
    })
    .filter(Boolean) as {
    section: (typeof d.sections)[number]
    sectionIndex: number
  }[]

  // Filter glossary based on search
  const filteredGlossary = glossarySearch.trim()
    ? kb.glossary.filter(
        (item) =>
          item.term.toLowerCase().includes(glossarySearch.toLowerCase()) ||
          item.definition.toLowerCase().includes(glossarySearch.toLowerCase())
      )
    : kb.glossary

  return (
    <div className="mx-auto max-w-4xl px-4">
      {/* ── Hero Card ─────────────────────────────────────────── */}
      <FadeInUp>
        <Card className="mb-8 bg-gradient-to-br from-primary/5 via-background to-primary/10">
          <CardHeader>
            <Badge variant="secondary" className="w-fit">
              {locale === "id" ? "Pusat Bantuan" : "Help Center"}
            </Badge>
            <CardTitle className="text-2xl sm:text-3xl">{d.title}</CardTitle>
            <CardDescription className="text-base">
              {d.subtitle}{" "}
              <Link
                href="/panduan"
                target="_blank"
                className="inline-flex items-center gap-1 text-primary hover:underline"
              >
                {d.fullGuideLink}
                <ExternalLink className="size-3" />
              </Link>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative max-w-md">
              <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={
                  locale === "id"
                    ? "Cari pertanyaan FAQ..."
                    : "Search FAQ questions..."
                }
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                className="pl-9"
              />
            </div>
          </CardContent>
        </Card>
      </FadeInUp>

      {/* ── Sticky Section Navigation ─────────────────────────── */}
      <FadeInUp>
        <div className="sticky top-16 z-10 -mx-4 mb-8 border-b bg-background/80 px-4 py-3 backdrop-blur-sm">
          <div className="flex flex-wrap gap-2">
            {navItems.map(({ id, icon: Icon }) => (
              <Button
                key={id}
                variant="outline"
                size="sm"
                onClick={() => scrollTo(id)}
                className="basis-[calc(33.33%-0.33rem)] gap-1.5 text-xs sm:basis-auto sm:text-sm"
              >
                <Icon className="size-3.5" />
                {navLabels[id as keyof typeof navLabels]}
              </Button>
            ))}
          </div>
        </div>
      </FadeInUp>

      {/* ── AI Chat CTA Banner ────────────────────────────────── */}
      <FadeInUp>
        <AskAiCard
          title={
            locale === "id"
              ? "Butuh jawaban cepat? Tanya AI Consultant kami!"
              : "Need a quick answer? Ask our AI Consultant!"
          }
          description={
            locale === "id"
              ? "AI kami dilengkapi kalkulator CO\u2082, lookup regulasi, dan benchmark industri."
              : "Our AI comes with a CO\u2082 calculator, regulation lookup, and industry benchmarks."
          }
          prompt=""
          buttonLabel={locale === "id" ? "Mulai Chat" : "Start Chat"}
          className="mb-8"
        />
      </FadeInUp>

      {/* ── FAQ Accordion Sections ────────────────────────────── */}
      <div id="faq" className="scroll-mt-32">
        {filteredSections.length === 0 && faqSearch.trim() && (
          <FadeInUp>
            <Card className="mb-6">
              <CardContent className="py-8 text-center text-muted-foreground">
                {locale === "id"
                  ? `Tidak ada hasil untuk "${faqSearch}"`
                  : `No results for "${faqSearch}"`}
              </CardContent>
            </Card>
          </FadeInUp>
        )}
        {filteredSections.map(({ section, sectionIndex }) => {
          const Icon = sectionIcons[sectionIndex]
          return (
            <FadeInUp key={sectionIndex} delay={sectionIndex * 0.05}>
              <Card className="mb-6">
                <CardHeader className="border-b">
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="size-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle>{section.title}</CardTitle>
                      <CardDescription>
                        {section.items.length}{" "}
                        {locale === "id" ? "pertanyaan" : "questions"}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
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
                </CardContent>
              </Card>
            </FadeInUp>
          )
        })}
      </div>

      {/* ── Quick Tips ────────────────────────────────────────── */}
      <FadeInUp delay={0.3}>
        <Card className="mt-4 mb-8 border-l-4 border-l-amber-500 bg-amber-500/5">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Zap className="size-5 text-amber-500" />
              <CardTitle>{d.tips.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2">
              {d.tips.items.map((tip, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Sparkles className="mt-0.5 size-4 shrink-0 text-amber-500" />
                  <p className="text-sm text-muted-foreground">{tip}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </FadeInUp>

      <Separator className="my-8" />

      {/* ── Regulation Guides ─────────────────────────────────── */}
      <FadeInUp delay={0.1}>
        <div id="regulations" className="scroll-mt-32">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
              <ScrollText className="size-5 text-primary" />
            </div>
            <h2 className="text-lg font-semibold">
              {kb.sectionTitles.regulations}
            </h2>
          </div>
          <Accordion type="single" collapsible className="w-full space-y-3">
            {kb.regulations.map((reg) => (
              <AccordionItem
                key={reg.number}
                value={reg.number}
                className="rounded-xl border bg-card px-2"
              >
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3 text-left">
                    <Badge variant="secondary">{reg.number}</Badge>
                    <span className="text-sm font-medium">{reg.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="mb-3 text-sm text-muted-foreground">
                    {reg.summary}
                  </p>
                  <Separator className="my-3" />
                  <p className="mb-2 text-xs font-medium">
                    {locale === "id"
                      ? "Persyaratan Utama:"
                      : "Key Requirements:"}
                  </p>
                  <ul className="space-y-1.5">
                    {reg.keyRequirements.map((req, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-xs text-muted-foreground"
                      >
                        <span className="mt-1.5 block size-1.5 shrink-0 rounded-full bg-primary" />
                        {req}
                      </li>
                    ))}
                  </ul>
                  {reg.deadline && (
                    <p className="mt-3 text-xs text-muted-foreground">
                      Deadline: {reg.deadline}
                    </p>
                  )}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {reg.relevantIndustries.map((ind) => (
                      <Badge key={ind} variant="outline" className="text-xs">
                        {ind}
                      </Badge>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </FadeInUp>

      <Separator className="my-8" />

      {/* ── Sustainability Tips ────────────────────────────────── */}
      <FadeInUp delay={0.15}>
        <div id="tips" className="scroll-mt-32">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
              <Lightbulb className="size-5 text-primary" />
            </div>
            <h2 className="text-lg font-semibold">{kb.sectionTitles.tips}</h2>
          </div>
          <Tabs defaultValue="general">
            <div className="relative -mx-4 mb-4 px-4">
              <TabsList
                variant="line"
                className="no-scrollbar flex w-full gap-1.5 overflow-x-auto"
              >
                {kb.tips.map((group) => {
                  const Icon = industryIcons[group.industry] ?? Globe
                  return (
                    <TabsTrigger
                      key={group.industry}
                      value={group.industry}
                      className="shrink-0 rounded-full px-3 py-1.5 text-xs sm:text-sm data-active:border-primary data-active:bg-primary/10 data-active:text-primary"
                    >
                      <Icon className="size-3.5" />
                      {industryLabels[locale]?.[group.industry] ??
                        group.industry}
                    </TabsTrigger>
                  )
                })}
              </TabsList>
            </div>
            {kb.tips.map((group) => (
              <TabsContent key={group.industry} value={group.industry}>
                <div className="grid gap-3 sm:grid-cols-2">
                  {group.tips.map((tip, i) => (
                    <Card key={i} size="sm">
                      <CardHeader>
                        <CardTitle>{tip.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-muted-foreground">
                          {tip.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </FadeInUp>

      <Separator className="my-8" />

      {/* ── Glossary ──────────────────────────────────────────── */}
      <FadeInUp delay={0.2}>
        <div id="glossary" className="mb-8 scroll-mt-32">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
              <BookOpen className="size-5 text-primary" />
            </div>
            <h2 className="text-lg font-semibold">
              {kb.sectionTitles.glossary}
            </h2>
          </div>
          <div className="relative mb-4 max-w-md">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={
                locale === "id" ? "Cari istilah..." : "Search terms..."
              }
              value={glossarySearch}
              onChange={(e) => setGlossarySearch(e.target.value)}
              className="pl-9"
            />
          </div>
          {filteredGlossary.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                {locale === "id"
                  ? `Tidak ada hasil untuk "${glossarySearch}"`
                  : `No results for "${glossarySearch}"`}
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {filteredGlossary.map((item) => (
                <Card key={item.term} size="sm">
                  <CardContent>
                    <p className="font-semibold text-primary">{item.term}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {item.definition}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </FadeInUp>

      <Separator className="my-8" />

      {/* ── Methodology ─────────────────────────────────────── */}
      <FadeInUp delay={0.25}>
        <section id="methodology" className="mb-8 scroll-mt-32">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
              <Calculator className="size-5 text-primary" />
            </div>
            <h2 className="text-lg font-semibold">
              {kb.sectionTitles.methodology}
            </h2>
          </div>
          <Accordion type="single" collapsible className="w-full space-y-3">
            {kb.methodology.map((group, gi) => (
              <AccordionItem
                key={gi}
                value={`methodology-${gi}`}
                className="rounded-xl border bg-card px-2"
              >
                <AccordionTrigger className="hover:no-underline">
                  <div className="text-left">
                    <span className="text-sm font-medium">{group.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="mb-4 text-sm text-muted-foreground">
                    {group.description}
                  </p>
                  <div className="space-y-3">
                    {group.items.map((item, ii) => (
                      <div key={ii}>
                        <p className="text-sm font-medium">{item.question}</p>
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                          {item.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </FadeInUp>
    </div>
  )
}
