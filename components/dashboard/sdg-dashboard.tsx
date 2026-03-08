"use client"

import { useState } from "react"
import { computeSDGScores, SDG_LIST, type CategoryScoresMap } from "@/lib/sdg"
import {
  SDG_DESCRIPTIONS,
  SDG_TARGETS,
  computeSDGImpactMetrics,
} from "@/lib/sdg-targets"
import type {
  Assessment,
  RoadmapItem,
  BusinessSize,
  Category,
} from "@/types/database"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTranslation } from "@/lib/i18n/language-context"
import {
  Zap,
  Trash2,
  Leaf,
  Droplets,
  Briefcase,
  Building2,
  CheckCircle2,
  Circle,
  Target,
} from "lucide-react"

// ─── SDG Titles (matching sdg-badges.tsx pattern) ───────────────

const SDG_TITLES: Record<number, { id: string; en: string }> = {
  6: { id: "Air Bersih dan Sanitasi", en: "Clean Water and Sanitation" },
  7: { id: "Energi Bersih dan Terjangkau", en: "Affordable and Clean Energy" },
  8: {
    id: "Pekerjaan Layak dan Pertumbuhan Ekonomi",
    en: "Decent Work and Economic Growth",
  },
  11: {
    id: "Kota dan Komunitas Berkelanjutan",
    en: "Sustainable Cities and Communities",
  },
  12: {
    id: "Konsumsi dan Produksi Bertanggung Jawab",
    en: "Responsible Consumption and Production",
  },
  13: { id: "Penanganan Perubahan Iklim", en: "Climate Action" },
}

// ─── Metric Icons ───────────────────────────────────────────────

const METRIC_ICONS: Record<number, typeof Zap> = {
  6: Droplets,
  7: Zap,
  8: Briefcase,
  11: Building2,
  12: Trash2,
  13: Leaf,
}

// ─── Progress Ring Component ────────────────────────────────────

const RING_RADIUS = 36
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS

function ProgressRing({ score, color }: { score: number; color: string }) {
  const offset = RING_CIRCUMFERENCE * (1 - score / 100)

  return (
    <svg viewBox="0 0 88 88" className="h-20 w-20">
      {/* Background track */}
      <circle
        cx="44"
        cy="44"
        r={RING_RADIUS}
        fill="none"
        stroke="#E5E7EB"
        strokeWidth="7"
      />
      {/* Progress arc */}
      <circle
        cx="44"
        cy="44"
        r={RING_RADIUS}
        fill="none"
        stroke={color}
        strokeWidth="7"
        strokeLinecap="round"
        strokeDasharray={RING_CIRCUMFERENCE}
        strokeDashoffset={offset}
        transform="rotate(-90 44 44)"
      />
      {/* Score text */}
      <text
        x="44"
        y="42"
        textAnchor="middle"
        dominantBaseline="middle"
        fill={color}
        fontSize="18"
        fontWeight="bold"
      >
        {score}
      </text>
      <text
        x="44"
        y="57"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#9CA3AF"
        fontSize="10"
      >
        /100
      </text>
    </svg>
  )
}

// ─── Props ──────────────────────────────────────────────────────

interface SDGDashboardProps {
  score: CategoryScoresMap
  assessment?: Assessment
  roadmapItems: RoadmapItem[]
  businessSize: BusinessSize
}

// ─── Category → SDG mapping helper ─────────────────────────────

function getSDGsForCategory(category: Category): number[] {
  return SDG_LIST.filter((sdg) => sdg.categories.includes(category)).map(
    (sdg) => sdg.number
  )
}

// ─── Main Component ─────────────────────────────────────────────

export function SDGDashboard({
  score,
  assessment,
  roadmapItems,
  businessSize,
}: SDGDashboardProps) {
  const { locale } = useTranslation()
  const [activeSDGFilter, setActiveSDGFilter] = useState<string>("all")

  const sdgResults = computeSDGScores(score)
  const impactMetrics = assessment
    ? computeSDGImpactMetrics(assessment, businessSize)
    : []

  // Filter roadmap items by SDG
  const filteredItems =
    activeSDGFilter === "all"
      ? roadmapItems
      : roadmapItems.filter((item) => {
          const sdgs = getSDGsForCategory(item.category)
          return sdgs.includes(Number(activeSDGFilter))
        })

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">
          {locale === "en"
            ? "SDG Contribution Dashboard"
            : "Dashboard Kontribusi SDG"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {locale === "en"
            ? "See how your sustainability actions align with the UN Sustainable Development Goals"
            : "Lihat bagaimana aksi keberlanjutan Anda selaras dengan Tujuan Pembangunan Berkelanjutan PBB"}
        </p>
      </div>

      {/* Section 1: SDG Overview Grid */}
      <section>
        <h2 className="mb-4 text-lg font-semibold">
          {locale === "en" ? "SDG Overview" : "Ikhtisar SDG"}
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sdgResults.map((sdg) => {
            const title = SDG_TITLES[sdg.number]
            const desc = SDG_DESCRIPTIONS[sdg.number]
            const label = locale === "en" ? title.en : title.id

            return (
              <Card key={sdg.number} className="relative overflow-hidden">
                {/* Colored top border */}
                <div
                  className="absolute inset-x-0 top-0 h-1"
                  style={{ backgroundColor: sdg.color }}
                />
                <CardHeader className="flex-row items-start gap-4">
                  <ProgressRing score={sdg.avgScore} color={sdg.color} />
                  <div className="min-w-0 flex-1">
                    <CardTitle className="flex items-center gap-2">
                      <span
                        className="inline-flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                        style={{ backgroundColor: sdg.color }}
                      >
                        {sdg.number}
                      </span>
                      <span className="truncate text-sm">{label}</span>
                    </CardTitle>
                    <div className="mt-1">
                      <Badge
                        variant={sdg.active ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {sdg.active
                          ? locale === "en"
                            ? "Active"
                            : "Aktif"
                          : locale === "en"
                            ? "Inactive"
                            : "Belum Aktif"}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    {locale === "en" ? desc.en : desc.id}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Section 2: Impact Metrics */}
      {impactMetrics.length > 0 && (
        <section>
          <h2 className="mb-4 text-lg font-semibold">
            {locale === "en" ? "Impact Metrics" : "Metrik Dampak"}
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {impactMetrics.map((m) => {
              const Icon = METRIC_ICONS[m.sdg] ?? Target
              const sdgInfo = SDG_LIST.find((s) => s.number === m.sdg)
              const color = sdgInfo?.color ?? "#6B7280"

              return (
                <Card key={m.sdg} size="sm">
                  <CardContent className="flex items-center gap-4">
                    <div
                      className="flex size-12 shrink-0 items-center justify-center rounded-xl"
                      style={{ backgroundColor: `${color}20` }}
                    >
                      <Icon className="size-6" style={{ color }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-muted-foreground">
                        SDG {m.sdg}
                      </p>
                      {m.type === "quantitative" ? (
                        <>
                          <p className="text-xl font-bold">
                            {m.value.toLocaleString("id-ID")}
                            <span className="ml-1 text-sm font-normal text-muted-foreground">
                              {m.unit}
                            </span>
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {locale === "en" ? m.metricEn : m.metric}
                          </p>
                        </>
                      ) : (
                        <p className="text-sm font-medium">
                          {locale === "en" ? m.metricEn : m.metric}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>
      )}

      {/* Section 3: Action-to-SDG Mapping */}
      <section>
        <h2 className="mb-4 text-lg font-semibold">
          {locale === "en" ? "Actions & SDG Mapping" : "Aksi & Pemetaan SDG"}
        </h2>

        <Tabs value={activeSDGFilter} onValueChange={setActiveSDGFilter}>
          <TabsList className="mb-4 flex-wrap">
            <TabsTrigger value="all">
              {locale === "en" ? "All" : "Semua"}
            </TabsTrigger>
            {SDG_LIST.map((sdg) => (
              <TabsTrigger key={sdg.number} value={String(sdg.number)}>
                <span
                  className="inline-flex size-5 items-center justify-center rounded-full text-[10px] font-bold text-white"
                  style={{ backgroundColor: sdg.color }}
                >
                  {sdg.number}
                </span>
                <span className="hidden sm:inline">SDG {sdg.number}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeSDGFilter}>
            {filteredItems.length === 0 ? (
              <Card size="sm">
                <CardContent className="py-8 text-center text-sm text-muted-foreground">
                  {locale === "en"
                    ? "No roadmap actions found for this SDG."
                    : "Belum ada aksi roadmap untuk SDG ini."}
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {filteredItems.map((item) => {
                  const relatedSDGs = getSDGsForCategory(item.category)

                  return (
                    <Card key={item.id} size="sm">
                      <CardContent className="flex items-start gap-3">
                        {/* Completion icon */}
                        {item.is_completed ? (
                          <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-500" />
                        ) : (
                          <Circle className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
                        )}

                        <div className="min-w-0 flex-1">
                          <p
                            className={`text-sm font-medium ${
                              item.is_completed
                                ? "text-muted-foreground line-through"
                                : ""
                            }`}
                          >
                            {item.title}
                          </p>
                          <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                            {item.description}
                          </p>

                          {/* SDG badges */}
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {relatedSDGs.map((sdgNum) => {
                              const sdgInfo = SDG_LIST.find(
                                (s) => s.number === sdgNum
                              )
                              return (
                                <span
                                  key={sdgNum}
                                  className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold text-white"
                                  style={{
                                    backgroundColor:
                                      sdgInfo?.color ?? "#6B7280",
                                  }}
                                >
                                  SDG {sdgNum}
                                </span>
                              )
                            })}

                            {/* Status badge */}
                            <Badge
                              variant={
                                item.is_completed ? "default" : "outline"
                              }
                              className="text-[10px]"
                            >
                              {item.is_completed
                                ? locale === "en"
                                  ? "Completed"
                                  : "Selesai"
                                : locale === "en"
                                  ? "Pending"
                                  : "Belum"}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </section>

      {/* SDG Targets Reference */}
      <section>
        <h2 className="mb-4 text-lg font-semibold">
          {locale === "en" ? "Related UN Targets" : "Target PBB Terkait"}
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {SDG_LIST.map((sdg) => {
            const targets = SDG_TARGETS[sdg.number]?.targets ?? []
            const title = SDG_TITLES[sdg.number]
            const label = locale === "en" ? title.en : title.id

            return (
              <Card key={sdg.number} size="sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <span
                      className="inline-flex size-6 items-center justify-center rounded-full text-xs font-bold text-white"
                      style={{ backgroundColor: sdg.color }}
                    >
                      {sdg.number}
                    </span>
                    {label}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {targets.map((target) => (
                      <li key={target.code} className="flex gap-2 text-xs">
                        <span
                          className="shrink-0 font-mono font-bold"
                          style={{ color: sdg.color }}
                        >
                          {target.code}
                        </span>
                        <span className="text-muted-foreground">
                          {locale === "en"
                            ? target.description.en
                            : target.description.id}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>
    </div>
  )
}
