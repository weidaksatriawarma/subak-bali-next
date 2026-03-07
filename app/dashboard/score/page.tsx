import { redirect } from "next/navigation"
import Link from "next/link"
import { ClipboardList, ArrowRight, BarChart3 } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { EmptyState } from "@/components/shared/empty-state"
import { ScoreGauge } from "@/components/dashboard/score-gauge"
import { ScoreRadarChart } from "@/components/dashboard/score-radar-chart"
import { getScoreLabel, INDUSTRY_LABELS } from "@/lib/constants"
import type { Score, Profile } from "@/types/database"

export default async function ScorePage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/login")

  const [{ data: score }, { data: profile }] = await Promise.all([
    supabase
      .from("scores")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .single<Score>(),
    supabase.from("profiles").select("*").eq("id", user.id).single<Profile>(),
  ])

  if (!score) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <EmptyState
          icon={ClipboardList}
          title="Belum ada assessment"
          description="Lengkapi assessment terlebih dahulu untuk mendapatkan skor keberlanjutan usaha Anda."
          actionLabel="Mulai Assessment"
          actionHref="/dashboard/assessment"
        />
      </div>
    )
  }

  const industryLabel = profile ? INDUSTRY_LABELS[profile.industry] : "Anda"

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Skor Keberlanjutan
        </h1>
        <p className="text-muted-foreground">
          Hasil analisis AI terhadap praktik keberlanjutan usaha Anda
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Skor Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScoreGauge score={score.total_score} />
            <div className="mt-4 flex justify-center">
              <Badge variant="secondary" className="text-sm">
                {getScoreLabel(score.total_score)}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Skor per Kategori</CardTitle>
          </CardHeader>
          <CardContent>
            <ScoreRadarChart
              scores={{
                energy: score.energy_score,
                waste: score.waste_score,
                supplyChain: score.supply_chain_score,
                operations: score.operations_score,
                policy: score.policy_score,
              }}
            />
          </CardContent>
        </Card>
      </div>

      {score.ai_summary && (
        <Card>
          <CardHeader>
            <CardTitle>Ringkasan AI</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="leading-relaxed text-muted-foreground">
              {score.ai_summary}
            </p>
          </CardContent>
        </Card>
      )}

      {score.industry_benchmark !== null && (
        <Card>
          <CardHeader>
            <CardTitle>Perbandingan Industri</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Rata-rata industri {industryLabel}:{" "}
              <span className="font-semibold text-foreground">
                {score.industry_benchmark}
              </span>
            </p>
            <div className="mt-2">
              {score.total_score >= score.industry_benchmark ? (
                <Badge variant="default">Di atas rata-rata</Badge>
              ) : (
                <Badge variant="secondary">Di bawah rata-rata</Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-center">
        <Button asChild size="lg">
          <Link href="/dashboard/roadmap">
            Lihat Roadmap untuk Meningkatkan Skor
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
