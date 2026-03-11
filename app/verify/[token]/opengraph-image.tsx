import { ImageResponse } from "next/og"
import { createPublicClient } from "@/lib/supabase/public"

export const runtime = "edge"
export const alt = "Sertifikat Sustainability — Subak Hijau"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const revalidate = 3600

function getTierName(score: number): string {
  if (score >= 80) return "EMERALD"
  if (score >= 60) return "GOLD"
  if (score >= 30) return "SILVER"
  return "BRONZE"
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
  const { data } = await supabase.rpc("get_public_certificate", {
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
        Sertifikat Tidak Ditemukan
      </div>,
      { ...size }
    )
  }

  const score = data.total_score as number
  const businessName = (data.business_name as string) ?? "Bisnis"
  const tier = getTierName(score)
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
          SERTIFIKAT TERVERIFIKASI
        </span>
      </div>

      {/* Business name */}
      <p
        style={{
          fontSize: "48px",
          fontWeight: 800,
          color: "white",
          margin: "0 0 16px 0",
          textAlign: "center",
          maxWidth: "900px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {businessName}
      </p>

      {/* Score circle */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "160px",
          height: "160px",
          borderRadius: "80px",
          background: "rgba(255,255,255,0.2)",
          border: "4px solid rgba(255,255,255,0.5)",
          marginBottom: "16px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: "64px",
              fontWeight: 800,
              color: "white",
              lineHeight: 1,
            }}
          >
            {score}
          </span>
          <span
            style={{
              fontSize: "18px",
              color: "rgba(255,255,255,0.8)",
              marginTop: "4px",
            }}
          >
            /100
          </span>
        </div>
      </div>

      {/* Tier */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "8px 24px",
          borderRadius: "999px",
          background: "rgba(255,255,255,0.2)",
          marginBottom: "32px",
        }}
      >
        <span
          style={{
            fontSize: "24px",
            fontWeight: 700,
            color: "white",
            letterSpacing: "2px",
          }}
        >
          {tier}
        </span>
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
