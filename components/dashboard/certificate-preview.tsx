"use client"

import { useEffect, useState } from "react"
import QRCode from "qrcode"
import { getTierBgClass, getTierName } from "@/lib/certificate-utils"
import { useTranslation } from "@/lib/i18n/language-context"
import type { Category } from "@/types/database"

interface CertificatePreviewProps {
  businessName: string
  totalScore: number
  categoryScores: Record<Category, number>
  assessmentDate: string
  scoreLabel: string
  industryRank?: string
  certificateToken?: string
}

const categoryKeys: Category[] = [
  "energy",
  "waste",
  "supply_chain",
  "operations",
  "policy",
]

const CIRCUMFERENCE = 2 * Math.PI * 68

export function CertificatePreview({
  businessName,
  totalScore,
  categoryScores,
  assessmentDate,
  scoreLabel,
  industryRank,
  certificateToken,
}: CertificatePreviewProps) {
  const { locale, t } = useTranslation()
  const cert = t.dashboard.certificatePreview
  const categories = t.dashboard.common.categories

  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null)
  const tierName = getTierName(totalScore)
  const bgClass = getTierBgClass(totalScore)
  const progress = (totalScore / 100) * CIRCUMFERENCE

  useEffect(() => {
    if (!certificateToken) return
    const url = `https://subakhijau.app/verify/${certificateToken}`
    QRCode.toDataURL(url, {
      width: 100,
      margin: 1,
      color: { dark: "#FFFFFF", light: "#00000000" },
    })
      .then(setQrDataUrl)
      .catch(() => {})
  }, [certificateToken])

  const dateStr = new Date(assessmentDate).toLocaleDateString(
    locale === "en" ? "en-US" : "id-ID",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  )

  return (
    <div
      className={`relative aspect-[1200/850] w-full overflow-hidden rounded-none bg-gradient-to-br ${bgClass} p-6 text-white shadow-xl sm:rounded-xl sm:p-8`}
    >
      {/* Decorative borders */}
      <div className="pointer-events-none absolute inset-3 rounded-lg border border-white/20" />
      <div className="pointer-events-none absolute inset-4 rounded-lg border border-white/10" />

      <div className="relative flex h-full flex-col items-center justify-between">
        {/* Header */}
        <div className="text-center">
          <p className="text-[10px] font-semibold tracking-[0.3em] text-white/50 uppercase sm:text-xs">
            SUBAK HIJAU
          </p>
          <h2 className="mt-1 text-sm font-bold sm:text-xl">{cert.title}</h2>
          <div className="mx-auto mt-1.5 h-px w-32 bg-gradient-to-r from-transparent via-white/50 to-transparent sm:w-48" />
        </div>

        {/* Issued to */}
        <div className="text-center">
          <p className="text-[10px] text-white/60 italic sm:text-sm">
            {cert.issuedTo}
          </p>
          <p className="mt-0.5 text-base font-bold sm:mt-1 sm:text-2xl">
            {businessName}
          </p>
        </div>

        {/* Score circle */}
        <div className="flex flex-col items-center gap-1">
          <svg
            viewBox="0 0 160 160"
            className="h-[100px] w-[100px] sm:h-[140px] sm:w-[140px]"
          >
            <circle
              cx="80"
              cy="80"
              r="72"
              fill="rgba(255,255,255,0.08)"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="2"
            />
            <circle
              cx="80"
              cy="80"
              r="68"
              fill="none"
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={`${progress} ${CIRCUMFERENCE}`}
              style={{ transformOrigin: "center", transform: "rotate(-90deg)" }}
            />
            <text
              x="80"
              y="75"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              style={{ fontSize: "42px", fontWeight: "bold" }}
            >
              {totalScore}
            </text>
            <text
              x="80"
              y="105"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="rgba(255,255,255,0.6)"
              style={{ fontSize: "14px" }}
            >
              / 100
            </text>
          </svg>
          <div className="rounded-full border border-white/20 bg-white/10 px-3 py-0.5 text-[10px] font-bold sm:text-sm">
            {tierName} &bull; {scoreLabel}
          </div>
          {industryRank && (
            <p className="text-[9px] text-white/50 italic sm:text-xs">
              {industryRank}
            </p>
          )}
        </div>

        {/* Category bars */}
        <div className="flex w-full max-w-lg justify-between gap-1 sm:gap-3">
          {categoryKeys.map((cat) => (
            <div
              key={cat}
              className="flex flex-1 flex-col items-center gap-0.5"
            >
              <span className="text-[10px] font-bold text-white sm:text-sm">
                {categoryScores[cat]}
              </span>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/15 sm:h-2">
                <div
                  className="h-full rounded-full bg-white/60"
                  style={{ width: `${categoryScores[cat]}%` }}
                />
              </div>
              <span className="text-[7px] text-white/60 sm:text-[10px]">
                {categories[cat]}
              </span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex w-full items-end justify-between">
          <p className="text-[8px] text-white/40 sm:text-[10px]">
            {cert.dateLabel}: {dateStr}
          </p>
          <p className="hidden text-[8px] text-white/30 sm:block sm:text-[10px]">
            {cert.footer}
          </p>
          {qrDataUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={qrDataUrl}
              alt="QR"
              className="h-10 w-10 sm:h-14 sm:w-14"
            />
          )}
        </div>
      </div>
    </div>
  )
}
