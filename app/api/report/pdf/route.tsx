import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { rateLimit, rateLimitResponse } from "@/lib/security"
import { auditLog } from "@/lib/audit"
import { renderToBuffer } from "@react-pdf/renderer"
import { ScoreReportPDF } from "@/lib/pdf/score-report-pdf"
import {
  calculateCarbonFootprint,
  calculatePotentialSavings,
  calculateRegulatoryCompliance,
} from "@/lib/carbon"
import { INDUSTRY_LABELS } from "@/lib/constants"
import type { Industry, BusinessSize } from "@/types/database"
import QRCode from "qrcode"

export async function GET() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Rate limit: 5 requests per minute per user
  const { success } = rateLimit(`pdf:${user.id}`, {
    maxRequests: 5,
    windowMs: 60_000,
  })
  if (!success) return rateLimitResponse()

  // Fetch all required data in parallel
  const [
    { data: profile },
    { data: score },
    { data: assessment },
    { data: roadmapItems },
  ] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).single(),
    supabase
      .from("scores")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .single(),
    supabase
      .from("assessments")
      .select("*")
      .eq("user_id", user.id)
      .eq("status", "completed")
      .order("created_at", { ascending: false })
      .limit(1)
      .single(),
    supabase
      .from("roadmap_items")
      .select("*")
      .eq("user_id", user.id)
      .order("sort_order", { ascending: true })
      .limit(5),
  ])

  if (!score) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  auditLog({
    action: "pdf_generate",
    userId: user.id,
    resourceType: "score",
    resourceId: score.id,
  })

  // Compute carbon data from assessment
  const carbon = assessment ? calculateCarbonFootprint(assessment) : null
  const savings = calculatePotentialSavings(
    (profile?.business_size as BusinessSize) ?? "small"
  )
  const compliance = assessment
    ? calculateRegulatoryCompliance(assessment)
    : null

  // Generate QR code data URL if certificate token exists
  let qrDataUrl: string | null = null
  if (score.certificate_token) {
    try {
      qrDataUrl = await QRCode.toDataURL(
        `https://subakhijau.app/verify/${score.certificate_token}`,
        { width: 100, margin: 1, color: { dark: "#16a34a", light: "#FFFFFF" } }
      )
    } catch {
      // QR generation failed silently — continue without it
    }
  }

  // Format date in English locale
  const date = new Date(score.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Map industry code to label
  const industryLabel =
    INDUSTRY_LABELS[(profile?.industry as Industry) ?? "other"] ??
    INDUSTRY_LABELS.other

  // Render the PDF document to a buffer
  const buffer = await renderToBuffer(
    <ScoreReportPDF
      businessName={profile?.business_name ?? "My Business"}
      industryLabel={industryLabel}
      date={date}
      totalScore={score.total_score}
      energyScore={score.energy_score}
      wasteScore={score.waste_score}
      supplyChainScore={score.supply_chain_score}
      operationsScore={score.operations_score}
      policyScore={score.policy_score}
      aiSummary={score.ai_summary}
      industryBenchmark={score.industry_benchmark}
      carbon={carbon}
      savings={savings}
      compliance={compliance}
      roadmapItems={roadmapItems ?? []}
      qrDataUrl={qrDataUrl}
    />
  )

  return new NextResponse(new Uint8Array(buffer), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition":
        'attachment; filename="sustainability-report-subakhijau.pdf"',
    },
  })
}
