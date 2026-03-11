import { cache } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import { getIndustryRank } from "@/lib/gamification/industry-data"
import { computeAchievements } from "@/lib/achievements"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Shield, Award } from "lucide-react"
import { AchievementPreview } from "@/components/dashboard/achievement-preview"
import { AchievementCard } from "@/components/dashboard/achievement-card"
import type { Industry, Category, RoadmapItem } from "@/types/database"

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

const getAchievementData = cache(async (token: string) => {
  const supabase = await createClient()

  const { data: score } = await supabase
    .from("scores")
    .select(
      "total_score, energy_score, waste_score, supply_chain_score, operations_score, policy_score, created_at, user_id, certificate_token"
    )
    .eq("certificate_token", token)
    .single()

  if (!score) return null

  const [{ data: profile }, { data: roadmapItems }] = await Promise.all([
    supabase
      .from("profiles")
      .select("business_name, industry")
      .eq("id", score.user_id)
      .single(),
    supabase
      .from("roadmap_items")
      .select("*")
      .eq("user_id", score.user_id)
      .returns<RoadmapItem[]>(),
  ])

  const industry = (profile?.industry ?? "other") as Industry
  const categoryScores: Record<Category, number> = {
    energy: score.energy_score,
    waste: score.waste_score,
    supply_chain: score.supply_chain_score,
    operations: score.operations_score,
    policy: score.policy_score,
  }

  const { rank } = getIndustryRank(industry, score.total_score)
  const items = roadmapItems ?? []
  const achievements = computeAchievements(
    items.map((i) => ({ is_completed: i.is_completed, category: i.category })),
    achievementNames,
    industry,
    categoryScores
  )

  return {
    totalScore: score.total_score,
    businessName: profile?.business_name ?? "Bisnis",
    industry,
    rank,
    achievements,
    certificateToken: score.certificate_token,
  }
})

export async function generateMetadata({
  params,
}: {
  params: Promise<{ token: string }>
}): Promise<Metadata> {
  const { token } = await params
  const data = await getAchievementData(token)

  if (!data) {
    return { title: "Pencapaian Tidak Ditemukan" }
  }

  const title = `Pencapaian ${data.businessName} \u2014 ${data.rank}`
  const description = `${data.businessName} mendapat skor sustainability ${data.totalScore}/100 dengan rank ${data.rank} di Subak Hijau.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://subakhijau.app/verify/${token}/achievement`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}

export default async function VerifyAchievementPage({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = await params
  const data = await getAchievementData(token)

  if (!data) {
    notFound()
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50 p-4 dark:from-green-950/20 dark:to-emerald-950/20">
      <div className="w-full max-w-md space-y-4">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-3 flex size-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/40">
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-xl">Pencapaian Terverifikasi</CardTitle>
            <p className="text-sm text-muted-foreground">
              Verified by Subak Hijau
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <AchievementPreview
              businessName={data.businessName}
              totalScore={data.totalScore}
              rankName={data.rank}
              achievements={data.achievements}
              streakWeeks={0}
              certificateToken={data.certificateToken}
            />

            <div className="flex items-center justify-center gap-2 rounded-lg border border-green-200 bg-green-50 p-3 dark:border-green-800 dark:bg-green-950">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-green-700 dark:text-green-400">
                Pencapaian ini valid dan terverifikasi
              </span>
            </div>

            <div className="flex justify-center">
              <AchievementCard
                businessName={data.businessName}
                totalScore={data.totalScore}
                rankName={data.rank}
                achievements={data.achievements}
                streakWeeks={0}
                certificateToken={data.certificateToken}
              />
            </div>

            <div className="flex justify-center">
              <Button asChild variant="outline" size="sm">
                <Link href={`/verify/${token}`}>
                  <Award className="mr-2 h-4 w-4" />
                  Lihat Sertifikat
                </Link>
              </Button>
            </div>

            <p className="text-center text-xs text-muted-foreground">
              Subak Hijau — AI Sustainability Consultant untuk UMKM Indonesia
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
