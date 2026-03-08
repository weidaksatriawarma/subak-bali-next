import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "GreenAdvisor — Konsultan Sustainability AI untuk UMKM Indonesia"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #065f46 0%, #059669 50%, #34d399 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <span style={{ fontSize: "72px" }}>🌿</span>
          <span
            style={{
              fontSize: "64px",
              fontWeight: 800,
              color: "white",
              letterSpacing: "-2px",
            }}
          >
            GreenAdvisor
          </span>
        </div>
        <p
          style={{
            fontSize: "28px",
            color: "rgba(255,255,255,0.9)",
            margin: "0 0 40px 0",
            textAlign: "center",
            maxWidth: "700px",
          }}
        >
          Konsultan Sustainability AI untuk UMKM Indonesia
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 24px",
            borderRadius: "999px",
            background: "rgba(255,255,255,0.15)",
            border: "1px solid rgba(255,255,255,0.3)",
          }}
        >
          <span style={{ fontSize: "18px", color: "white", fontWeight: 600 }}>
            PROXOCORIS 2026
          </span>
        </div>
      </div>
    ),
    { ...size }
  )
}
