import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { getScoreLabel } from "@/lib/constants"
import { getIndustryRank } from "@/lib/gamification/industry-data"
import { CheckCircle2, Shield } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Industry } from "@/types/database"

function getTierColor(score: number): string {
  if (score >= 80) return "text-emerald-600 dark:text-emerald-400"
  if (score >= 60) return "text-amber-600 dark:text-amber-400"
  if (score >= 30) return "text-gray-600 dark:text-gray-400"
  return "text-orange-700 dark:text-orange-400"
}

export default async function VerifyPage({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = await params
  const supabase = await createClient()

  const { data: score } = await supabase
    .from("scores")
    .select("total_score, created_at, user_id")
    .eq("certificate_token", token)
    .single()

  if (!score) {
    notFound()
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("business_name, industry")
    .eq("id", score.user_id)
    .single()

  const businessName = profile?.business_name ?? "Bisnis"
  const industry = (profile?.industry ?? "other") as Industry
  const scoreLabel = getScoreLabel(score.total_score)
  const { rank } = getIndustryRank(industry, score.total_score)
  const dateStr = new Date(score.created_at).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50 p-4 dark:from-green-950/20 dark:to-emerald-950/20">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-3 flex size-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/40">
            <Shield className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-xl">Sertifikat Terverifikasi</CardTitle>
          <p className="text-sm text-muted-foreground">
            Verified by GreenAdvisor
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4 text-center">
            <p className="text-sm text-muted-foreground">Bisnis</p>
            <p className="text-lg font-bold">{businessName}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border bg-muted/30 p-3 text-center">
              <p className="text-sm text-muted-foreground">Skor Total</p>
              <p
                className={`text-3xl font-bold ${getTierColor(score.total_score)}`}
              >
                {score.total_score}
              </p>
              <p className="text-xs text-muted-foreground">/100</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-3 text-center">
              <p className="text-sm text-muted-foreground">Tier</p>
              <p
                className={`text-lg font-bold ${getTierColor(score.total_score)}`}
              >
                {scoreLabel}
              </p>
              <p className="text-xs text-muted-foreground">{rank}</p>
            </div>
          </div>

          <div className="rounded-lg border bg-muted/30 p-3 text-center">
            <p className="text-sm text-muted-foreground">Tanggal Assessment</p>
            <p className="font-medium">{dateStr}</p>
          </div>

          <div className="flex items-center justify-center gap-2 rounded-lg border border-green-200 bg-green-50 p-3 dark:border-green-800 dark:bg-green-950">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium text-green-700 dark:text-green-400">
              Sertifikat ini valid dan terverifikasi
            </span>
          </div>

          <p className="text-center text-xs text-muted-foreground">
            GreenAdvisor — AI Sustainability Consultant untuk UMKM Indonesia
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
