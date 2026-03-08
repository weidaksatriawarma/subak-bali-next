import { redirect } from "next/navigation"
import Link from "next/link"
import { ClipboardList, ArrowRight } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/shared/empty-state"
import { ScoreGauge } from "@/components/dashboard/score-gauge"
import { CategoryBars } from "@/components/dashboard/category-bars"
import {
  getScoreLabelInfo,
  INDUSTRY_LABELS,
} from "@/lib/constants"
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
  const labelInfo = getScoreLabelInfo(score.total_score)

  const summaryLines = score.ai_summary
    ? score.ai_summary.split("\n").filter((line: string) => line.trim())
    : []

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
            <CardTitle>Skor Total</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-2">
            <span className="text-5xl">{labelInfo.emoji}</span>
            <ScoreGauge score={score.total_score} />
            <p className="text-lg font-bold">{labelInfo.label}</p>
            <p className="text-center text-sm text-muted-foreground">
              {labelInfo.description}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Skor per Kategori</CardTitle>
          </CardHeader>
          <CardContent>
            <CategoryBars
              scores={{
                energy: score.energy_score,
                waste: score.waste_score,
                supply_chain: score.supply_chain_score,
                operations: score.operations_score,
                policy: score.policy_score,
              }}
            />
          </CardContent>
        </Card>
      </div>

      {summaryLines.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Ringkasan AI</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {summaryLines.map((line: string, i: number) => (
                <div
                  key={i}
                  className="rounded-lg border bg-muted/30 px-4 py-3 text-sm leading-relaxed"
                >
                  {line.trim()}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {score.industry_benchmark !== null && (
        <Card>
          <CardHeader>
            <CardTitle>{"\u{1F4CA}"} Perbandingan Industri</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Rata-rata industri {industryLabel}:{" "}
              <span className="font-semibold text-foreground">
                {score.industry_benchmark}/100
              </span>
            </p>
            <div className="mt-2">
              {score.total_score >= score.industry_benchmark ? (
                <span className="text-sm font-medium text-green-600">
                  {"\u{1F389}"} Skor kamu di atas rata-rata! Keren!
                </span>
              ) : (
                <span className="text-sm font-medium text-orange-500">
                  {"\u{1F4AA}"} Masih di bawah rata-rata, tapi kamu bisa kejar!
                </span>
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
