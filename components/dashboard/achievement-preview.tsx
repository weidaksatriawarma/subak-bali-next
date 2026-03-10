"use client"

import { useEffect, useState } from "react"
import QRCode from "qrcode"
import { useTranslation } from "@/lib/i18n/language-context"
import type { Achievement } from "@/components/dashboard/achievement-badge"

interface AchievementPreviewProps {
  businessName: string
  totalScore: number
  rankName: string
  achievements: Achievement[]
  streakWeeks: number
  certificateToken?: string
}

const CIRCUMFERENCE = 2 * Math.PI * 96

export function AchievementPreview({
  businessName,
  totalScore,
  rankName,
  achievements,
  streakWeeks,
  certificateToken,
}: AchievementPreviewProps) {
  const { t } = useTranslation()
  const ap = t.dashboard.achievementPage
  const g = t.dashboard.gamification
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null)
  const progress = (totalScore / 100) * CIRCUMFERENCE
  const unlockedBadges = achievements.filter((a) => a.unlocked).slice(0, 6)

  useEffect(() => {
    if (!certificateToken) return
    const url = `https://subakhijau.app/verify/${certificateToken}/achievement`
    QRCode.toDataURL(url, {
      width: 100,
      margin: 1,
      color: { dark: "#FFFFFF", light: "#00000000" },
    })
      .then(setQrDataUrl)
      .catch(() => {})
  }, [certificateToken])

  return (
    <div className="relative mx-auto aspect-[9/16] w-full max-w-sm overflow-hidden rounded-2xl bg-gradient-to-b from-emerald-600 via-emerald-700 to-emerald-900 p-6 text-white shadow-xl">
      {/* Header */}
      <div className="text-center">
        <p className="text-[10px] font-semibold tracking-[0.3em] text-white/50 uppercase">
          SUBAK HIJAU
        </p>
        <h2 className="mt-2 text-xl font-bold">{g.achievementCard.title}</h2>
        <div className="mx-auto mt-2 h-px w-32 bg-white/20" />
      </div>

      {/* Business name & rank */}
      <div className="mt-6 text-center">
        <p className="text-2xl font-bold">
          {businessName.length > 20
            ? businessName.slice(0, 20) + "..."
            : businessName}
        </p>
        <p className="mt-1 text-sm text-white/60">{rankName}</p>
      </div>

      {/* Score circle */}
      <div className="mt-6 flex justify-center">
        <svg viewBox="0 0 240 240" className="h-40 w-40">
          <circle
            cx="120"
            cy="120"
            r="100"
            fill="rgba(255,255,255,0.08)"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="3"
          />
          <circle
            cx="120"
            cy="120"
            r="96"
            fill="none"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={`${progress} ${CIRCUMFERENCE}`}
            style={{ transformOrigin: "center", transform: "rotate(-90deg)" }}
          />
          <text
            x="120"
            y="115"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
            style={{ fontSize: "56px", fontWeight: "bold" }}
          >
            {totalScore}
          </text>
          <text
            x="120"
            y="150"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="rgba(255,255,255,0.6)"
            style={{ fontSize: "18px" }}
          >
            / 100
          </text>
        </svg>
      </div>

      {/* Badge grid */}
      {unlockedBadges.length > 0 && (
        <div className="mt-4">
          <p className="text-center text-sm text-white/50">
            {ap.achievementsLabel}
          </p>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {unlockedBadges.map((badge) => (
              <div
                key={badge.id}
                className="flex flex-col items-center gap-1 rounded-lg bg-white/10 p-2"
              >
                <span className="text-2xl">{badge.emoji}</span>
                <span className="text-[9px] leading-tight text-white/60">
                  {badge.title.length > 10
                    ? badge.title.slice(0, 10) + "..."
                    : badge.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Streak */}
      {streakWeeks > 0 && (
        <div className="mt-4 text-center">
          <p className="text-3xl">
            {"\uD83D\uDD25"} {streakWeeks}
          </p>
          <p className="text-xs text-white/50">{g.streak.weeksInRow}</p>
        </div>
      )}

      {/* Footer with QR */}
      <div className="absolute inset-x-0 bottom-4 flex flex-col items-center gap-2 px-6">
        {qrDataUrl && <img src={qrDataUrl} alt="QR" className="h-12 w-12" />}
        <p className="text-[10px] text-white/30">subakhijau.app</p>
      </div>
    </div>
  )
}
