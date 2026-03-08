"use client"

import { useEffect, useRef, useState } from "react"
import { calculateRegulatoryCompliance, COMPLIANCE_ITEMS } from "@/lib/carbon"
import { useTranslation } from "@/lib/i18n/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle, Shield, AlertTriangle } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import type { Assessment } from "@/types/database"

const RECOMMENDATIONS: Record<string, { id: string; en: string }> = {
  sustainability_policy: {
    id: "Buat dokumen kebijakan sustainability tertulis untuk bisnis Anda",
    en: "Create a written sustainability policy document for your business",
  },
  waste_management: {
    id: "Tingkatkan pengelolaan limbah ke level recycling atau composting",
    en: "Upgrade waste management to recycling or composting level",
  },
  energy_efficient: {
    id: "Investasi pada peralatan hemat energi (LED, inverter AC, dll)",
    en: "Invest in energy-efficient equipment (LED, inverter AC, etc.)",
  },
  supplier_check: {
    id: "Mulai evaluasi praktik keberlanjutan supplier Anda",
    en: "Start evaluating your suppliers' sustainability practices",
  },
  employee_training: {
    id: "Adakan pelatihan sustainability untuk karyawan",
    en: "Conduct sustainability training for employees",
  },
  community_engagement: {
    id: "Libatkan bisnis Anda dalam kegiatan komunitas lokal",
    en: "Engage your business in local community activities",
  },
  digital_operations: {
    id: "Digitalkan operasi bisnis untuk mengurangi penggunaan kertas",
    en: "Digitize business operations to reduce paper usage",
  },
  water_conservation: {
    id: "Terapkan praktik konservasi air di tempat usaha",
    en: "Implement water conservation practices at your business",
  },
}

function getGaugeColor(percent: number): string {
  if (percent >= 70) return "#22C55E"
  if (percent >= 40) return "#F59E0B"
  return "#EF4444"
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

function ComplianceGauge({ percent }: { percent: number }) {
  const [displayPercent, setDisplayPercent] = useState(0)
  const animationRef = useRef<number>(0)
  const color = getGaugeColor(percent)
  const data = [
    { name: "compliant", value: displayPercent },
    { name: "remaining", value: 100 - displayPercent },
  ]

  useEffect(() => {
    const duration = 1200
    const delay = 300
    let startTime: number | null = null

    const timeout = setTimeout(() => {
      function animate(timestamp: number) {
        if (!startTime) startTime = timestamp
        const elapsed = timestamp - startTime
        const progress = Math.min(elapsed / duration, 1)
        const easedProgress = easeOutCubic(progress)

        setDisplayPercent(Math.round(easedProgress * percent))

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate)
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }, delay)

    return () => {
      clearTimeout(timeout)
      cancelAnimationFrame(animationRef.current)
    }
  }, [percent])

  return (
    <div className="flex flex-col items-center">
      <ResponsiveContainer
        width="100%"
        height={200}
        className="sm:!h-[220px] lg:!h-[240px]"
      >
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="55%"
            outerRadius="78%"
            startAngle={90}
            endAngle={-270}
            dataKey="value"
            stroke="none"
          >
            <Cell fill={color} />
            <Cell fill="#e5e7eb" />
          </Pie>
          <text
            x="50%"
            y="43%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-foreground text-4xl font-bold"
          >
            {displayPercent}%
          </text>
          <text
            x="50%"
            y="58%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-muted-foreground text-sm"
          >
            compliance
          </text>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export function ComplianceContent({ assessment }: { assessment: Assessment }) {
  const { t, locale } = useTranslation()
  const d = t.dashboard.compliance
  const compliance = calculateRegulatoryCompliance(assessment)

  const metCount = compliance.met.length
  const totalCount = COMPLIANCE_ITEMS.length

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{d.title}</h1>
        <p className="text-muted-foreground">{d.subtitle}</p>
      </div>

      {/* Gauge Card */}
      <Card className="border-green-200 bg-green-50/50 dark:border-green-900 dark:bg-green-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Shield className="h-5 w-5 text-green-600" />
            {d.overallScore}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ComplianceGauge percent={compliance.overallPercent} />
        </CardContent>
      </Card>

      {/* Framework Label */}
      <Card>
        <CardContent className="flex items-center gap-3 pt-6">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/40">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">
              {d.framework}
            </p>
            <p className="text-sm font-semibold">
              POJK 51/2017 & Taksonomi Keuangan Berkelanjutan Indonesia
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Checklist */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            {metCount} {locale === "en" ? "of" : "dari"} {totalCount}{" "}
            {locale === "en" ? "criteria met" : "kriteria terpenuhi"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {/* Met items */}
            {compliance.met.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-3 rounded-lg border border-green-200 bg-green-50/50 px-4 py-3 dark:border-green-900 dark:bg-green-950/20"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    {locale === "en" ? item.labelEn : item.label}
                  </p>
                </div>
                <Badge
                  variant="secondary"
                  className="shrink-0 bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
                >
                  {d.compliant}
                </Badge>
              </div>
            ))}

            {/* Unmet items */}
            {compliance.unmet.map((item) => {
              const rec = RECOMMENDATIONS[item.id]
              return (
                <div
                  key={item.id}
                  className="flex flex-col gap-2 rounded-lg border border-red-200 bg-red-50/50 px-4 py-3 dark:border-red-900 dark:bg-red-950/20"
                >
                  <div className="flex items-start gap-3">
                    <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {locale === "en" ? item.labelEn : item.label}
                      </p>
                    </div>
                    <Badge
                      variant="secondary"
                      className="shrink-0 bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400"
                    >
                      {d.nonCompliant}
                    </Badge>
                  </div>
                  {rec && (
                    <div className="ml-8 rounded-md bg-white/60 px-3 py-2 dark:bg-black/20">
                      <p className="text-xs font-medium text-muted-foreground">
                        {d.recommendation}:
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {locale === "en" ? rec.en : rec.id}
                      </p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card className="border-blue-200 bg-blue-50/50 dark:border-blue-900 dark:bg-blue-950/20">
        <CardContent className="flex items-center gap-4 pt-6">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-700 dark:bg-blue-900/40 dark:text-blue-400">
            {metCount}
          </div>
          <div>
            <p className="text-sm font-semibold">
              {metCount} {locale === "en" ? "of" : "dari"} {totalCount}{" "}
              {locale === "en" ? "criteria met" : "kriteria terpenuhi"}
            </p>
            <p className="text-xs text-muted-foreground">
              {compliance.overallPercent}%{" "}
              {locale === "en"
                ? "overall regulatory compliance"
                : "kepatuhan regulasi secara keseluruhan"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
