"use client"

import { useState, useCallback } from "react"
import { toast } from "sonner"
import { useTranslation } from "@/lib/i18n/language-context"
import { Button } from "@/components/ui/button"
import { Award, Loader2 } from "lucide-react"
import { getIndustryRank } from "@/lib/gamification/industry-data"
import QRCode from "qrcode"
import {
  getTierGradient,
  getTierName,
  drawRoundedRect,
  truncateText,
  drawLeafDecoration,
} from "@/lib/certificate-utils"
import type { Category, Industry } from "@/types/database"

interface SustainabilityCertificateProps {
  businessName: string
  totalScore: number
  categoryScores: Record<Category, number>
  assessmentDate: string
  scoreLabel: string
  industry?: Industry
  certificateToken?: string
}

export function SustainabilityCertificate({
  businessName,
  totalScore,
  categoryScores,
  assessmentDate,
  scoreLabel,
  industry,
  certificateToken,
}: SustainabilityCertificateProps) {
  const { t } = useTranslation()
  const d = t.dashboard.certificate
  const cats = t.dashboard.common.categories
  const [isGenerating, setIsGenerating] = useState(false)

  const generateCertificate = useCallback(async () => {
    setIsGenerating(true)
    try {
      // Use requestAnimationFrame to let the UI update before heavy canvas work
      await new Promise((resolve) => requestAnimationFrame(resolve))

      const canvas = document.createElement("canvas")
      canvas.width = 1200
      canvas.height = 850
      const ctx = canvas.getContext("2d")
      if (!ctx) {
        return
      }

      const W = 1200
      const H = 850
      const [color1, color2] = getTierGradient(totalScore)
      const tierName = getTierName(totalScore)

      // --- Background gradient ---
      const bgGrad = ctx.createLinearGradient(0, 0, W, H)
      bgGrad.addColorStop(0, color1)
      bgGrad.addColorStop(0.5, color2)
      bgGrad.addColorStop(1, color1)
      ctx.fillStyle = bgGrad
      ctx.fillRect(0, 0, W, H)

      // --- Subtle radial overlay for depth ---
      const radGrad = ctx.createRadialGradient(
        W / 2,
        H / 2,
        100,
        W / 2,
        H / 2,
        600
      )
      radGrad.addColorStop(0, "rgba(255,255,255,0.08)")
      radGrad.addColorStop(1, "rgba(0,0,0,0.15)")
      ctx.fillStyle = radGrad
      ctx.fillRect(0, 0, W, H)

      // --- Leaf decorations ---
      drawLeafDecoration(ctx, 80, 80, 40, 0.4)
      drawLeafDecoration(ctx, 1120, 80, 35, 0.3)
      drawLeafDecoration(ctx, 60, 770, 30, 0.25)
      drawLeafDecoration(ctx, 1140, 770, 38, 0.35)
      drawLeafDecoration(ctx, 150, 420, 25, 0.15)
      drawLeafDecoration(ctx, 1050, 420, 28, 0.15)
      drawLeafDecoration(ctx, 100, 600, 20, 0.12)
      drawLeafDecoration(ctx, 1100, 250, 22, 0.12)

      // --- Decorative double border ---
      ctx.strokeStyle = "rgba(255,255,255,0.3)"
      ctx.lineWidth = 3
      ctx.strokeRect(20, 20, W - 40, H - 40)

      ctx.strokeStyle = "rgba(255,255,255,0.15)"
      ctx.lineWidth = 1.5
      ctx.strokeRect(30, 30, W - 60, H - 60)

      // --- Corner accents ---
      const cornerSize = 30
      const cornerOffset = 20
      ctx.strokeStyle = "rgba(255,255,255,0.5)"
      ctx.lineWidth = 2.5

      // Top-left
      ctx.beginPath()
      ctx.moveTo(cornerOffset, cornerOffset + cornerSize)
      ctx.lineTo(cornerOffset, cornerOffset)
      ctx.lineTo(cornerOffset + cornerSize, cornerOffset)
      ctx.stroke()

      // Top-right
      ctx.beginPath()
      ctx.moveTo(W - cornerOffset - cornerSize, cornerOffset)
      ctx.lineTo(W - cornerOffset, cornerOffset)
      ctx.lineTo(W - cornerOffset, cornerOffset + cornerSize)
      ctx.stroke()

      // Bottom-left
      ctx.beginPath()
      ctx.moveTo(cornerOffset, H - cornerOffset - cornerSize)
      ctx.lineTo(cornerOffset, H - cornerOffset)
      ctx.lineTo(cornerOffset + cornerSize, H - cornerOffset)
      ctx.stroke()

      // Bottom-right
      ctx.beginPath()
      ctx.moveTo(W - cornerOffset - cornerSize, H - cornerOffset)
      ctx.lineTo(W - cornerOffset, H - cornerOffset)
      ctx.lineTo(W - cornerOffset, H - cornerOffset - cornerSize)
      ctx.stroke()

      // --- "SUBAK HIJAU" header ---
      ctx.fillStyle = "rgba(255,255,255,0.6)"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.font = "600 14px Arial, Helvetica, sans-serif"
      ctx.letterSpacing = "8px"
      ctx.fillText("SUBAK HIJAU", W / 2, 70)
      ctx.letterSpacing = "0px"

      // --- Certificate title ---
      ctx.fillStyle = "white"
      ctx.font = "bold 34px Arial, Helvetica, sans-serif"
      ctx.fillText(d.certificateTitle, W / 2, 120)

      // --- Decorative line separator ---
      const lineY = 150
      const lineW = 500
      const lineGrad = ctx.createLinearGradient(
        W / 2 - lineW / 2,
        lineY,
        W / 2 + lineW / 2,
        lineY
      )
      lineGrad.addColorStop(0, "rgba(255,255,255,0)")
      lineGrad.addColorStop(0.2, "rgba(255,255,255,0.5)")
      lineGrad.addColorStop(0.5, "rgba(255,255,255,0.7)")
      lineGrad.addColorStop(0.8, "rgba(255,255,255,0.5)")
      lineGrad.addColorStop(1, "rgba(255,255,255,0)")
      ctx.strokeStyle = lineGrad
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(W / 2 - lineW / 2, lineY)
      ctx.lineTo(W / 2 + lineW / 2, lineY)
      ctx.stroke()

      // Small diamond in the center of the line
      ctx.fillStyle = "rgba(255,255,255,0.6)"
      ctx.beginPath()
      ctx.moveTo(W / 2, lineY - 5)
      ctx.lineTo(W / 2 + 5, lineY)
      ctx.lineTo(W / 2, lineY + 5)
      ctx.lineTo(W / 2 - 5, lineY)
      ctx.closePath()
      ctx.fill()

      // --- "Issued to" ---
      ctx.fillStyle = "rgba(255,255,255,0.7)"
      ctx.font = "italic 18px Georgia, serif"
      ctx.fillText(d.issuedTo, W / 2, 200)

      // --- Business name ---
      ctx.fillStyle = "white"
      ctx.font = "bold 46px Arial, Helvetica, sans-serif"
      const displayName = truncateText(ctx, businessName, W - 160)
      ctx.fillText(displayName, W / 2, 260)

      // --- Second decorative line ---
      const line2Y = 295
      const line2W = 300
      const line2Grad = ctx.createLinearGradient(
        W / 2 - line2W / 2,
        line2Y,
        W / 2 + line2W / 2,
        line2Y
      )
      line2Grad.addColorStop(0, "rgba(255,255,255,0)")
      line2Grad.addColorStop(0.3, "rgba(255,255,255,0.3)")
      line2Grad.addColorStop(0.5, "rgba(255,255,255,0.5)")
      line2Grad.addColorStop(0.7, "rgba(255,255,255,0.3)")
      line2Grad.addColorStop(1, "rgba(255,255,255,0)")
      ctx.strokeStyle = line2Grad
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(W / 2 - line2W / 2, line2Y)
      ctx.lineTo(W / 2 + line2W / 2, line2Y)
      ctx.stroke()

      // --- Score circle with shadow ---
      const circleX = W / 2
      const circleY = 420
      const circleR = 85

      // Shadow
      ctx.save()
      ctx.shadowColor = "rgba(0,0,0,0.3)"
      ctx.shadowBlur = 20
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 4
      ctx.beginPath()
      ctx.arc(circleX, circleY, circleR, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(255,255,255,0.12)"
      ctx.fill()
      ctx.restore()

      // Circle border
      ctx.beginPath()
      ctx.arc(circleX, circleY, circleR, 0, Math.PI * 2)
      ctx.strokeStyle = "rgba(255,255,255,0.3)"
      ctx.lineWidth = 3
      ctx.stroke()

      // Inner circle
      ctx.beginPath()
      ctx.arc(circleX, circleY, circleR - 6, 0, Math.PI * 2)
      ctx.strokeStyle = "rgba(255,255,255,0.15)"
      ctx.lineWidth = 1
      ctx.stroke()

      // Score arc (progress ring)
      const progressAngle = (totalScore / 100) * Math.PI * 2
      const startAngle = -Math.PI / 2
      ctx.beginPath()
      ctx.arc(
        circleX,
        circleY,
        circleR - 3,
        startAngle,
        startAngle + progressAngle
      )
      ctx.strokeStyle = "rgba(255,255,255,0.6)"
      ctx.lineWidth = 4
      ctx.lineCap = "round"
      ctx.stroke()
      ctx.lineCap = "butt"

      // Score number
      ctx.fillStyle = "white"
      ctx.font = "bold 56px Arial, Helvetica, sans-serif"
      ctx.fillText(String(totalScore), circleX, circleY - 5)

      // "/100"
      ctx.fillStyle = "rgba(255,255,255,0.6)"
      ctx.font = "16px Arial, Helvetica, sans-serif"
      ctx.fillText("/ 100", circleX, circleY + 30)

      // --- Tier badge ---
      const badgeY = 530
      const badgeText = `${tierName}  \u2022  ${scoreLabel}`
      ctx.font = "bold 20px Arial, Helvetica, sans-serif"
      const badgeWidth = ctx.measureText(badgeText).width + 40

      // Badge background
      ctx.save()
      drawRoundedRect(
        ctx,
        W / 2 - badgeWidth / 2,
        badgeY - 16,
        badgeWidth,
        32,
        16
      )
      ctx.fillStyle = "rgba(255,255,255,0.15)"
      ctx.fill()
      ctx.strokeStyle = "rgba(255,255,255,0.3)"
      ctx.lineWidth = 1
      ctx.stroke()
      ctx.restore()

      ctx.fillStyle = "white"
      ctx.font = "bold 20px Arial, Helvetica, sans-serif"
      ctx.fillText(badgeText, W / 2, badgeY)

      // --- Industry rank name ---
      if (industry && industry !== "other") {
        const { rank } = getIndustryRank(industry, totalScore)
        ctx.fillStyle = "rgba(255,255,255,0.6)"
        ctx.font = "italic 16px Arial, Helvetica, sans-serif"
        ctx.fillText(rank, W / 2, badgeY + 30)
      }

      // --- Category mini bars ---
      const categoryKeys: Category[] = [
        "energy",
        "waste",
        "supply_chain",
        "operations",
        "policy",
      ]
      const categoryLabels = [
        cats.energy,
        cats.waste,
        cats.supply_chain,
        cats.operations,
        cats.policy,
      ]

      const barY = 600
      const barWidth = 150
      const barHeight = 10
      const barSpacing = 30
      const totalBarsWidth =
        categoryKeys.length * barWidth + (categoryKeys.length - 1) * barSpacing
      const startX = (W - totalBarsWidth) / 2

      categoryKeys.forEach((cat, i) => {
        const x = startX + i * (barWidth + barSpacing)
        const score = categoryScores[cat]
        const barCenterX = x + barWidth / 2

        // Score value above bar
        ctx.fillStyle = "white"
        ctx.font = "bold 16px Arial, Helvetica, sans-serif"
        ctx.fillText(String(score), barCenterX, barY - 14)

        // Background bar (rounded)
        ctx.save()
        drawRoundedRect(ctx, x, barY, barWidth, barHeight, 5)
        ctx.fillStyle = "rgba(255,255,255,0.15)"
        ctx.fill()
        ctx.restore()

        // Score bar (rounded, clipped)
        if (score > 0) {
          const fillWidth = Math.max((score / 100) * barWidth, barHeight)
          ctx.save()
          drawRoundedRect(ctx, x, barY, barWidth, barHeight, 5)
          ctx.clip()
          ctx.fillStyle = "rgba(255,255,255,0.7)"
          ctx.fillRect(x, barY, fillWidth, barHeight)
          ctx.restore()
        }

        // Category label below bar
        ctx.fillStyle = "rgba(255,255,255,0.7)"
        ctx.font = "13px Arial, Helvetica, sans-serif"
        ctx.fillText(categoryLabels[i], barCenterX, barY + 30)
      })

      // --- Assessment date ---
      ctx.fillStyle = "rgba(255,255,255,0.5)"
      ctx.font = "14px Arial, Helvetica, sans-serif"
      const dateStr = new Date(assessmentDate).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
      ctx.fillText(`${d.assessmentDate}: ${dateStr}`, W / 2, 700)

      // --- Third decorative line ---
      const line3Y = 730
      const line3W = 200
      const line3Grad = ctx.createLinearGradient(
        W / 2 - line3W / 2,
        line3Y,
        W / 2 + line3W / 2,
        line3Y
      )
      line3Grad.addColorStop(0, "rgba(255,255,255,0)")
      line3Grad.addColorStop(0.5, "rgba(255,255,255,0.3)")
      line3Grad.addColorStop(1, "rgba(255,255,255,0)")
      ctx.strokeStyle = line3Grad
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(W / 2 - line3W / 2, line3Y)
      ctx.lineTo(W / 2 + line3W / 2, line3Y)
      ctx.stroke()

      // --- QR Code ---
      if (certificateToken) {
        try {
          const qrUrl = `https://subakhijau.app/verify/${certificateToken}`
          const qrDataUrl = await QRCode.toDataURL(qrUrl, {
            width: 120,
            margin: 1,
            color: { dark: "#FFFFFF", light: "#00000000" },
          })
          const qrImg = new Image()
          qrImg.src = qrDataUrl
          await new Promise((resolve) => {
            qrImg.onload = resolve
          })
          ctx.drawImage(qrImg, W - 160, H - 160, 120, 120)
          ctx.fillStyle = "rgba(255,255,255,0.4)"
          ctx.font = "10px Arial, sans-serif"
          ctx.textAlign = "center"
          ctx.fillText("Scan to verify", W - 100, H - 30)
        } catch {
          // QR generation failed, skip silently
        }
      }

      // --- Footer ---
      ctx.textAlign = "center"
      ctx.fillStyle = "rgba(255,255,255,0.4)"
      ctx.font = "12px Arial, Helvetica, sans-serif"
      ctx.fillText(
        "Subak Hijau \u2014 AI Sustainability Consultant untuk UMKM Indonesia",
        W / 2,
        770
      )

      // --- Download ---
      const link = document.createElement("a")
      link.download = `SubakHijau-Certificate-${businessName.replace(/\s+/g, "-")}.png`
      link.href = canvas.toDataURL("image/png")
      link.click()

      toast.success("Sertifikat berhasil diunduh!")
    } catch {
      toast.error("Gagal mengunduh sertifikat")
    } finally {
      setIsGenerating(false)
    }
  }, [
    businessName,
    totalScore,
    categoryScores,
    assessmentDate,
    scoreLabel,
    industry,
    certificateToken,
    d,
    cats,
  ])

  return (
    <Button
      onClick={generateCertificate}
      variant="outline"
      disabled={isGenerating}
      className="w-full"
    >
      {isGenerating ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {d.generating}
        </>
      ) : (
        <>
          <Award className="mr-2 h-4 w-4" />
          {d.download}
        </>
      )}
    </Button>
  )
}
