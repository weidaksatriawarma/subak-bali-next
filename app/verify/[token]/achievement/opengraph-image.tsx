import { ImageResponse } from "next/og"
import { createPublicClient } from "@/lib/supabase/public"
import { computeAchievements } from "@/lib/achievements"
import { getIndustryRank } from "@/lib/gamification/industry-data"
import type { Industry, Category } from "@/types/database"

export const runtime = "edge"
export const alt = "Pencapaian Sustainability — Subak Hijau"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const revalidate = 3600

const achievementNames = {
  first: "Langkah Pertama",
  five: "Pejuang Hijau",
  half: "Setengah Jalan",
  eighty: "Hampir Sampai",
  all: "Champion Keberlanjutan",
  energy: "Pahlawan Energi",
  waste: "Pejuang Limbah",
  supply_chain: "Master Rantai Pasok",
  operations: "Ahli Operasional",
  policy: "Pelopor Kebijakan",
}

function getTierColors(score: number): { bg: string; accent: string } {
  if (score >= 80) return { bg: "#059669", accent: "#34d399" }
  if (score >= 60) return { bg: "#d97706", accent: "#fbbf24" }
  if (score >= 30) return { bg: "#6b7280", accent: "#9ca3af" }
  return { bg: "#92400e", accent: "#d97706" }
}

export default async function Image({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = await params
  const supabase = createPublicClient()
  const { data } = await supabase.rpc("get_public_achievement", {
    p_token: token,
  })

  if (!data) {
    return new ImageResponse(
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1a1a2e",
          color: "white",
          fontSize: "36px",
          fontFamily: "sans-serif",
        }}
      >
        Pencapaian Tidak Ditemukan
      </div>,
      { ...size }
    )
  }

  const score = data.total_score as number
  const businessName = (data.business_name as string) ?? "Bisnis"
  const industry = ((data.industry as string) ?? "other") as Industry
  const categoryScores: Record<Category, number> = {
    energy: data.energy_score as number,
    waste: data.waste_score as number,
    supply_chain: data.supply_chain_score as number,
    operations: data.operations_score as number,
    policy: data.policy_score as number,
  }
  const { rank } = getIndustryRank(industry, score)
  const items =
    (data.roadmap_items as { is_completed: boolean; category: Category }[]) ??
    []
  const achievements = computeAchievements(
    items.map((i) => ({ is_completed: i.is_completed, category: i.category })),
    achievementNames,
    industry,
    categoryScores
  )
  const unlockedCount = achievements.filter((a) => a.unlocked).length
  const colors = getTierColors(score)

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(135deg, #065f46 0%, ${colors.bg} 50%, ${colors.accent} 100%)`,
        fontFamily: "sans-serif",
      }}
    >
      {/* Badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "8px 20px",
          borderRadius: "999px",
          background: "rgba(255,255,255,0.15)",
          border: "1px solid rgba(255,255,255,0.3)",
          marginBottom: "24px",
        }}
      >
        <span style={{ fontSize: "16px", color: "white", fontWeight: 600 }}>
          PENCAPAIAN TERVERIFIKASI
        </span>
      </div>

      {/* Business name */}
      <p
        style={{
          fontSize: "48px",
          fontWeight: 800,
          color: "white",
          margin: "0 0 8px 0",
          textAlign: "center",
          maxWidth: "900px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {businessName}
      </p>

      {/* Rank */}
      <p
        style={{
          fontSize: "28px",
          fontWeight: 600,
          color: "rgba(255,255,255,0.9)",
          margin: "0 0 24px 0",
        }}
      >
        {rank}
      </p>

      {/* Stats row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "40px",
          marginBottom: "32px",
        }}
      >
        {/* Score */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "120px",
              height: "120px",
              borderRadius: "60px",
              background: "rgba(255,255,255,0.2)",
              border: "3px solid rgba(255,255,255,0.5)",
            }}
          >
            <span
              style={{
                fontSize: "48px",
                fontWeight: 800,
                color: "white",
                lineHeight: 1,
              }}
            >
              {score}
            </span>
          </div>
          <span
            style={{
              fontSize: "16px",
              color: "rgba(255,255,255,0.7)",
              marginTop: "8px",
            }}
          >
            Skor /100
          </span>
        </div>

        {/* Achievements */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "120px",
              height: "120px",
              borderRadius: "60px",
              background: "rgba(255,255,255,0.2)",
              border: "3px solid rgba(255,255,255,0.5)",
            }}
          >
            <span
              style={{
                fontSize: "48px",
                fontWeight: 800,
                color: "white",
                lineHeight: 1,
              }}
            >
              {unlockedCount}
            </span>
          </div>
          <span
            style={{
              fontSize: "16px",
              color: "rgba(255,255,255,0.7)",
              marginTop: "8px",
            }}
          >
            Pencapaian
          </span>
        </div>
      </div>

      {/* Branding */}
      <p
        style={{
          fontSize: "20px",
          color: "rgba(255,255,255,0.7)",
          margin: 0,
        }}
      >
        Subak Hijau — AI Sustainability Consultant
      </p>
    </div>,
    { ...size }
  )
}
