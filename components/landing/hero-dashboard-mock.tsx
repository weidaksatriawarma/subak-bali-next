"use client"

import { motion, useReducedMotion, type Variants } from "framer-motion"
import { Bot, Leaf, Star, TrendingUp, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const categories = [
  { label: "Operasional", value: 85, icon: Zap },
  { label: "Energi", value: 82, icon: TrendingUp },
  { label: "Limbah", value: 75, icon: Leaf },
  { label: "Rantai Pasok", value: 70, icon: TrendingUp },
  { label: "Kebijakan", value: 68, icon: Leaf },
]

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
}

const containerReduced: Variants = {
  hidden: {},
  visible: {},
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

const itemReduced: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
}

const gaugeVariants: Variants = {
  hidden: { strokeDashoffset: 251 },
  visible: {
    strokeDashoffset: 251 - (251 * 78) / 100,
    transition: { duration: 1.2, ease: "easeOut", delay: 0.5 },
  },
}

const gaugeReduced: Variants = {
  hidden: { strokeDashoffset: 251 - (251 * 78) / 100 },
  visible: { strokeDashoffset: 251 - (251 * 78) / 100 },
}

const pulseVariants: Variants = {
  visible: {
    scale: [1, 1.02, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
}

function makeBarVariants(value: number, reduced: boolean): Variants {
  if (reduced) {
    return {
      hidden: { width: `${value}%` },
      visible: { width: `${value}%` },
    }
  }
  return {
    hidden: { width: 0 },
    visible: {
      width: `${value}%`,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }
}

export function HeroDashboardMock() {
  const prefersReduced = useReducedMotion()

  const container = prefersReduced ? containerReduced : containerVariants
  const item = prefersReduced ? itemReduced : itemVariants
  const gauge = prefersReduced ? gaugeReduced : gaugeVariants

  return (
    <div className="relative aspect-[4/3] w-full lg:aspect-square">
      {/* Decorative glow behind the dashboard */}
      <div className="absolute inset-0 rounded-2xl bg-primary/5 blur-3xl" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative grid h-full w-full grid-cols-2 grid-rows-[auto_1fr_auto] gap-3 p-2 sm:gap-4 sm:p-4"
      >
        {/* ── Score Gauge Card ─────────────────────────── */}
        <motion.div variants={item} className="col-span-1 row-span-1">
          <Card className="h-full border border-border/50 bg-card/80 shadow-xl backdrop-blur-sm">
            <CardContent className="flex flex-col items-center justify-center gap-1 py-4">
              <p className="text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
                Skor Keberlanjutan
              </p>

              {/* SVG Gauge */}
              <div className="relative flex items-center justify-center">
                <svg
                  width="100"
                  height="100"
                  viewBox="0 0 100 100"
                  className="-rotate-90"
                >
                  {/* Background track */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    className="stroke-muted"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                  {/* Animated fill */}
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    className="stroke-primary"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray="251"
                    variants={gauge}
                  />
                </svg>
                {/* Center score text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-foreground">78</span>
                  <span className="text-[10px] text-muted-foreground">
                    / 100
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-chart-2" />
                <span className="text-[10px] font-medium text-chart-2">
                  +5 dari bulan lalu
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ── Industry Rank Badge Card ─────────────────── */}
        <motion.div variants={item} className="col-span-1 row-span-1">
          <Card className="h-full border border-border/50 bg-card/80 shadow-xl backdrop-blur-sm">
            <CardContent className="flex flex-col items-center justify-center gap-3 py-4">
              <p className="text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
                Peringkat Industri
              </p>

              {/* Rank emblem */}
              <motion.div
                variants={prefersReduced ? undefined : pulseVariants}
                animate="visible"
                className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 ring-2 ring-primary/20"
              >
                <Leaf className="h-8 w-8 text-primary" />
              </motion.div>

              <div className="flex flex-col items-center gap-1">
                <Badge variant="secondary" className="px-2 py-0.5 text-[10px]">
                  Chef Sustainability
                </Badge>
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3].map((i) => (
                    <Star
                      key={i}
                      className="h-3 w-3 fill-chart-2 text-chart-2"
                    />
                  ))}
                  {[4, 5].map((i) => (
                    <Star
                      key={i}
                      className="h-3 w-3 text-muted-foreground/30"
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ── Category Bars Card ───────────────────────── */}
        <motion.div variants={item} className="col-span-2 row-span-1">
          <Card className="h-full border border-border/50 bg-card/80 shadow-xl backdrop-blur-sm">
            <CardContent className="flex flex-col gap-2.5 py-4">
              <p className="text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
                Skor per Kategori
              </p>

              {categories.map((cat, index) => (
                <div key={cat.label} className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <cat.icon className="h-3 w-3 text-muted-foreground" />
                      <span className="text-[11px] font-medium text-foreground">
                        {cat.label}
                      </span>
                    </div>
                    <span className="text-[10px] font-semibold text-foreground tabular-nums">
                      {cat.value}%
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background:
                          index < 2
                            ? "var(--color-primary)"
                            : index < 4
                              ? "var(--color-chart-2)"
                              : "var(--color-chart-3)",
                      }}
                      variants={makeBarVariants(
                        cat.value,
                        prefersReduced ?? false
                      )}
                      initial="hidden"
                      animate="visible"
                      transition={{
                        duration: 0.8,
                        ease: "easeOut",
                        delay: 0.6 + index * 0.1,
                      }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* ── AI Chat Bubble Card ──────────────────────── */}
        <motion.div variants={item} className="col-span-2 row-span-1">
          <Card className="border border-border/50 bg-card/80 shadow-xl backdrop-blur-sm">
            <CardContent className="flex items-start gap-3 py-3">
              {/* AI avatar */}
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Bot className="h-4 w-4" />
              </div>

              <div className="flex min-w-0 flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-foreground">
                    Subak AI
                  </span>
                  <Badge
                    variant="outline"
                    className="h-4 px-1.5 py-0 text-[9px]"
                  >
                    Asisten
                  </Badge>
                </div>
                <p className="text-[11px] leading-relaxed text-muted-foreground">
                  Berdasarkan data Anda, estimasi emisi karbon bisnis Anda
                  adalah{" "}
                  <span className="font-semibold text-foreground">
                    2.4 ton CO₂/tahun
                  </span>
                  . Saya merekomendasikan untuk mulai dari pengelolaan limbah
                  organik...
                </p>

                {/* Typing indicator */}
                <motion.div
                  className="flex items-center gap-1 pt-0.5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="h-1 w-1 rounded-full bg-muted-foreground/50"
                      animate={
                        prefersReduced
                          ? {}
                          : {
                              y: [0, -3, 0],
                              opacity: [0.4, 1, 0.4],
                            }
                      }
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        delay: i * 0.15,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
