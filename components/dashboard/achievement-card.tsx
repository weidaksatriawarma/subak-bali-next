"use client"

import { useState, useCallback } from "react"
import { useTranslation } from "@/lib/i18n/language-context"
import { Button } from "@/components/ui/button"
import { Download, Loader2 } from "lucide-react"
import type { Achievement } from "@/components/dashboard/achievement-badge"

interface AchievementCardProps {
  businessName: string
  totalScore: number
  rankName: string
  achievements: Achievement[]
  streakWeeks: number
}

export function AchievementCard({
  businessName,
  totalScore,
  rankName,
  achievements,
  streakWeeks,
}: AchievementCardProps) {
  const { t } = useTranslation()
  const g = t.dashboard.gamification
  const [isGenerating, setIsGenerating] = useState(false)

  const generateCard = useCallback(async () => {
    setIsGenerating(true)
    await new Promise((resolve) => requestAnimationFrame(resolve))

    const canvas = document.createElement("canvas")
    canvas.width = 1080
    canvas.height = 1920
    const ctx = canvas.getContext("2d")
    if (!ctx) {
      setIsGenerating(false)
      return
    }

    const W = 1080,
      H = 1920

    // Gradient background
    const grad = ctx.createLinearGradient(0, 0, W, H)
    grad.addColorStop(0, "#059669")
    grad.addColorStop(0.5, "#047857")
    grad.addColorStop(1, "#065f46")
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, W, H)

    // Radial overlay
    const radGrad = ctx.createRadialGradient(
      W / 2,
      H / 3,
      100,
      W / 2,
      H / 3,
      800
    )
    radGrad.addColorStop(0, "rgba(255,255,255,0.08)")
    radGrad.addColorStop(1, "rgba(0,0,0,0.1)")
    ctx.fillStyle = radGrad
    ctx.fillRect(0, 0, W, H)

    // Header
    ctx.fillStyle = "rgba(255,255,255,0.5)"
    ctx.textAlign = "center"
    ctx.font = "600 28px Arial, sans-serif"
    ctx.fillText("SUBAK HIJAU", W / 2, 120)

    ctx.fillStyle = "white"
    ctx.font = "bold 48px Arial, sans-serif"
    ctx.fillText(g.achievementCard.title, W / 2, 200)

    // Decorative line
    ctx.strokeStyle = "rgba(255,255,255,0.3)"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(W / 2 - 200, 240)
    ctx.lineTo(W / 2 + 200, 240)
    ctx.stroke()

    // Business name
    ctx.fillStyle = "white"
    ctx.font = "bold 56px Arial, sans-serif"
    const displayName =
      businessName.length > 20
        ? businessName.slice(0, 20) + "..."
        : businessName
    ctx.fillText(displayName, W / 2, 360)

    // Rank
    ctx.fillStyle = "rgba(255,255,255,0.7)"
    ctx.font = "32px Arial, sans-serif"
    ctx.fillText(rankName, W / 2, 430)

    // Score circle
    const circleY = 620
    ctx.beginPath()
    ctx.arc(W / 2, circleY, 130, 0, Math.PI * 2)
    ctx.fillStyle = "rgba(255,255,255,0.12)"
    ctx.fill()
    ctx.strokeStyle = "rgba(255,255,255,0.3)"
    ctx.lineWidth = 4
    ctx.stroke()

    // Progress arc
    const progress = (totalScore / 100) * Math.PI * 2
    ctx.beginPath()
    ctx.arc(W / 2, circleY, 126, -Math.PI / 2, -Math.PI / 2 + progress)
    ctx.strokeStyle = "rgba(255,255,255,0.7)"
    ctx.lineWidth = 6
    ctx.lineCap = "round"
    ctx.stroke()
    ctx.lineCap = "butt"

    ctx.fillStyle = "white"
    ctx.font = "bold 80px Arial, sans-serif"
    ctx.fillText(String(totalScore), W / 2, circleY + 10)
    ctx.fillStyle = "rgba(255,255,255,0.6)"
    ctx.font = "24px Arial, sans-serif"
    ctx.fillText("/ 100", W / 2, circleY + 50)

    // Badge grid (max 6)
    const unlockedBadges = achievements.filter((a) => a.unlocked).slice(0, 6)
    if (unlockedBadges.length > 0) {
      ctx.fillStyle = "rgba(255,255,255,0.6)"
      ctx.font = "28px Arial, sans-serif"
      ctx.fillText("Pencapaian", W / 2, 860)

      const cols = Math.min(unlockedBadges.length, 3)
      const badgeSize = 120
      const gap = 30
      const totalW = cols * badgeSize + (cols - 1) * gap
      const startX = (W - totalW) / 2

      unlockedBadges.forEach((badge, i) => {
        const col = i % 3
        const row = Math.floor(i / 3)
        const x = startX + col * (badgeSize + gap) + badgeSize / 2
        const y = 920 + row * (badgeSize + gap + 20) + badgeSize / 2

        ctx.beginPath()
        ctx.arc(x, y, badgeSize / 2, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(255,255,255,0.1)"
        ctx.fill()
        ctx.strokeStyle = "rgba(255,255,255,0.2)"
        ctx.lineWidth = 2
        ctx.stroke()

        ctx.font = "48px Arial, sans-serif"
        ctx.fillStyle = "white"
        ctx.fillText(badge.emoji, x, y + 8)

        ctx.font = "16px Arial, sans-serif"
        ctx.fillStyle = "rgba(255,255,255,0.7)"
        const title =
          badge.title.length > 12
            ? badge.title.slice(0, 12) + "..."
            : badge.title
        ctx.fillText(title, x, y + badgeSize / 2 + 20)
      })
    }

    // Streak
    if (streakWeeks > 0) {
      const streakY = unlockedBadges.length > 3 ? 1300 : 1200
      ctx.font = "64px Arial, sans-serif"
      ctx.fillStyle = "white"
      ctx.fillText(`\u{1F525} ${streakWeeks}`, W / 2, streakY)
      ctx.font = "24px Arial, sans-serif"
      ctx.fillStyle = "rgba(255,255,255,0.6)"
      ctx.fillText(g.streak.weeksInRow, W / 2, streakY + 40)
    }

    // Footer
    ctx.fillStyle = "rgba(255,255,255,0.3)"
    ctx.font = "22px Arial, sans-serif"
    ctx.fillText("subakhijau.app", W / 2, H - 120)
    ctx.font = "18px Arial, sans-serif"
    ctx.fillText(
      "AI Sustainability Consultant untuk UMKM Indonesia",
      W / 2,
      H - 80
    )

    // Download
    const link = document.createElement("a")
    link.download = `SubakHijau-Achievement-${businessName.replace(/\s+/g, "-")}.png`
    link.href = canvas.toDataURL("image/png")
    link.click()

    setIsGenerating(false)
  }, [businessName, totalScore, rankName, achievements, streakWeeks, g])

  return (
    <Button onClick={generateCard} variant="outline" disabled={isGenerating}>
      {isGenerating ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {g.achievementCard.download}...
        </>
      ) : (
        <>
          <Download className="mr-2 h-4 w-4" />
          {g.achievementCard.download}
        </>
      )}
    </Button>
  )
}
