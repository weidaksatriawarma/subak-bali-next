import { cache } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { createPublicClient } from "@/lib/supabase/public"
import { getIndustryRank } from "@/lib/gamification/industry-data"
import { computeAchievements } from "@/lib/achievements"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Shield, Award } from "lucide-react"
import { AchievementPreview } from "@/components/dashboard/achievement-preview"
import { AchievementCard } from "@/components/dashboard/achievement-card"
import { ShareActions } from "@/components/dashboard/share-actions"
import type { Industry, Category } from "@/types/database"

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
  const supabase = createPublicClient()

  const { data } = await supabase.rpc("get_public_achievement", {
    p_token: token,
  })

  if (!data) return null

  const industry = ((data.industry as string) ?? "other") as Industry
  const categoryScores: Record<Category, number> = {
    energy: data.energy_score as number,
    waste: data.waste_score as number,
    supply_chain: data.supply_chain_score as number,
    operations: data.operations_score as number,
    policy: data.policy_score as number,
  }

  const { rank } = getIndustryRank(industry, data.total_score as number)
  const items =
    (data.roadmap_items as { is_completed: boolean; category: Category }[]) ??
    []
  const achievements = computeAchievements(
    items.map((i) => ({ is_completed: i.is_completed, category: i.category })),
    achievementNames,
    industry,
    categoryScores
  )

  return {
    totalScore: data.total_score as number,
    businessName: (data.business_name as string) ?? "Bisnis",
    industry,
    rank,
    achievements,
    certificateToken: data.certificate_token as string,
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

  const shareUrl = `https://subakhijau.app/verify/${token}/achievement`

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

            <ShareActions
              shareUrl={shareUrl}
              shareTitle={`🏆 ${data.businessName} meraih rank ${data.rank}!`}
              shareDescription={`Skor sustainability ${data.totalScore}/100 di Subak Hijau`}
              labels={{
                copyLink: "Salin Link",
                linkCopied: "Link disalin!",
                shareWhatsApp: "WhatsApp",
                scanToVerify: "Scan untuk verifikasi",
              }}
            />

            <p className="text-center text-xs text-muted-foreground">
              Subak Hijau — AI Sustainability Consultant untuk UMKM Indonesia
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
