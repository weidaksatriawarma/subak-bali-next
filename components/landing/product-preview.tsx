"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import {
  BarChart3,
  Bot,
  CheckCircle2,
  TrendingUp,
  Zap,
} from "lucide-react"
import { useTranslation } from "@/lib/i18n/language-context"
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/landing/motion-wrapper"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

// ─── Circular Score Gauge ────────────────────────────────────────

function ScoreGauge({ score, total }: { score: number; total: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  const prefersReduced = useReducedMotion()

  const radius = 70
  const stroke = 10
  const circumference = 2 * Math.PI * radius
  const percentage = score / total
  const dashOffset = circumference * (1 - percentage)

  return (
    <div ref={ref} className="relative flex items-center justify-center">
      <svg
        width="180"
        height="180"
        viewBox="0 0 180 180"
        className="-rotate-90"
      >
        {/* Background circle */}
        <circle
          cx="90"
          cy="90"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          className="text-muted/40"
        />
        {/* Animated fill circle */}
        <motion.circle
          cx="90"
          cy="90"
          r={radius}
          fill="none"
          stroke="url(#scoreGradient)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={
            isInView
              ? { strokeDashoffset: dashOffset }
              : { strokeDashoffset: circumference }
          }
          transition={
            prefersReduced
              ? { duration: 0 }
              : { duration: 1.5, ease: "easeOut", delay: 0.3 }
          }
        />
        <defs>
          <linearGradient
            id="scoreGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#16a34a" />
          </linearGradient>
        </defs>
      </svg>
      {/* Center text */}
      <div className="absolute flex flex-col items-center">
        <span className="text-4xl font-bold text-foreground">{score}</span>
        <span className="text-sm text-muted-foreground">/ {total}</span>
      </div>
    </div>
  )
}

// ─── Category Bar ────────────────────────────────────────────────

function CategoryBar({ name, value }: { name: string; value: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-40px" })
  const prefersReduced = useReducedMotion()

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="text-foreground">{name}</span>
        <span className="font-medium text-foreground">{value}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-500"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${value}%` } : { width: 0 }}
          transition={
            prefersReduced
              ? { duration: 0 }
              : { duration: 1, ease: "easeOut", delay: 0.2 }
          }
        />
      </div>
    </div>
  )
}

// ─── Chat Bubble ─────────────────────────────────────────────────

function ChatBubble({
  role,
  content,
}: {
  role: "user" | "assistant"
  content: string
}) {
  const isUser = role === "user"

  return (
    <div
      className={`flex items-start gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {!isUser && (
        <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10">
          <Bot className="size-4 text-primary" />
        </div>
      )}
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? "rounded-br-md bg-primary text-primary-foreground"
            : "rounded-bl-md bg-muted text-foreground"
        }`}
      >
        {content}
      </div>
    </div>
  )
}

// ─── Main Component ──────────────────────────────────────────────

export function ProductPreview() {
  const { t } = useTranslation()
  const pp = t.productPreview

  // Parse score from totalScore string (e.g. "78/100")
  const [scoreStr, totalStr] = pp.scoreTab.totalScore.split("/")
  const score = parseInt(scoreStr, 10)
  const total = parseInt(totalStr, 10)

  return (
    <section
      id="product-preview"
      className="px-4 py-16 sm:px-6 md:py-24 lg:px-8"
    >
      <div className="mx-auto max-w-4xl">
        {/* Section header */}
        <FadeInUp>
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {pp.heading}
            </h2>
            <p className="mt-3 text-muted-foreground">{pp.subheading}</p>
          </div>
        </FadeInUp>

        {/* Tabs */}
        <FadeInUp delay={0.15}>
          <Tabs defaultValue="score">
            <TabsList className="mx-auto mb-6 grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="score" className="gap-1.5">
                <BarChart3 className="size-4" />
                <span className="hidden sm:inline">{pp.tabs.score}</span>
              </TabsTrigger>
              <TabsTrigger value="roadmap" className="gap-1.5">
                <Zap className="size-4" />
                <span className="hidden sm:inline">{pp.tabs.roadmap}</span>
              </TabsTrigger>
              <TabsTrigger value="chat" className="gap-1.5">
                <Bot className="size-4" />
                <span className="hidden sm:inline">{pp.tabs.chat}</span>
              </TabsTrigger>
            </TabsList>

            {/* ── Score Tab ──────────────────────────────── */}
            <TabsContent value="score">
              <Card>
                <CardContent className="py-2">
                  <div className="grid items-center gap-8 md:grid-cols-2">
                    {/* Left — Gauge */}
                    <div className="flex justify-center">
                      <ScoreGauge score={score} total={total} />
                    </div>

                    {/* Right — Category bars */}
                    <StaggerContainer className="space-y-4">
                      {pp.scoreTab.categories.map((cat) => (
                        <StaggerItem key={cat.name}>
                          <CategoryBar name={cat.name} value={cat.value} />
                        </StaggerItem>
                      ))}
                    </StaggerContainer>
                  </div>

                  {/* Benchmark card */}
                  <div className="mt-6 flex items-center gap-2 rounded-lg border bg-green-50 px-4 py-3 dark:bg-green-950/30">
                    <TrendingUp className="size-4 shrink-0 text-green-600 dark:text-green-400" />
                    <span className="text-sm font-medium text-green-700 dark:text-green-300">
                      {pp.scoreTab.benchmarkText}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* ── Roadmap Tab ────────────────────────────── */}
            <TabsContent value="roadmap">
              <Card>
                <CardContent className="py-2">
                  <StaggerContainer className="space-y-3">
                    {pp.roadmapTab.items.map((item, i) => (
                      <StaggerItem key={i}>
                        <div
                          className={`flex items-start gap-3 rounded-lg border p-4 transition-colors ${
                            item.completed
                              ? "border-green-200 bg-green-50/50 dark:border-green-900/40 dark:bg-green-950/20"
                              : "bg-card"
                          }`}
                        >
                          <Checkbox
                            checked={item.completed}
                            className="mt-0.5"
                            aria-label={item.title}
                          />
                          <div className="min-w-0 flex-1">
                            <p
                              className={`text-sm font-medium ${
                                item.completed
                                  ? "text-muted-foreground line-through"
                                  : "text-foreground"
                              }`}
                            >
                              {item.title}
                            </p>
                            <div className="mt-2 flex flex-wrap gap-1.5">
                              <Badge
                                variant="default"
                                className="text-[10px]"
                              >
                                {item.category}
                              </Badge>
                              <Badge
                                variant="outline"
                                className="text-[10px]"
                              >
                                {item.priority}
                              </Badge>
                              <Badge
                                variant="secondary"
                                className="text-[10px]"
                              >
                                {item.cost}
                              </Badge>
                            </div>
                          </div>
                          {item.completed && (
                            <CheckCircle2 className="size-5 shrink-0 text-green-500" />
                          )}
                        </div>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </CardContent>
              </Card>
            </TabsContent>

            {/* ── Chat Tab ────────────────────────────────── */}
            <TabsContent value="chat">
              <Card>
                <CardContent className="py-2">
                  <StaggerContainer className="space-y-4">
                    {pp.chatTab.messages.map((msg, i) => (
                      <StaggerItem key={i}>
                        <ChatBubble role={msg.role} content={msg.content} />
                      </StaggerItem>
                    ))}
                    {/* Typing indicator for the last user message */}
                    <StaggerItem>
                      <div className="flex items-start gap-2.5">
                        <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10">
                          <Bot className="size-4 text-primary" />
                        </div>
                        <div className="rounded-2xl rounded-bl-md bg-muted px-4 py-3">
                          <div className="flex gap-1">
                            <span className="size-2 animate-bounce rounded-full bg-muted-foreground/40 [animation-delay:0ms]" />
                            <span className="size-2 animate-bounce rounded-full bg-muted-foreground/40 [animation-delay:150ms]" />
                            <span className="size-2 animate-bounce rounded-full bg-muted-foreground/40 [animation-delay:300ms]" />
                          </div>
                        </div>
                      </div>
                    </StaggerItem>
                  </StaggerContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </FadeInUp>
      </div>
    </section>
  )
}
