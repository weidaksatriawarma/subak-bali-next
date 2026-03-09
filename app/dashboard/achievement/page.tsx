import type { Metadata } from "next"
import { redirect } from "next/navigation"
import Link from "next/link"
import { ClipboardList, Award, Trophy } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { EmptyState } from "@/components/shared/empty-state"
import { getIndustryRank } from "@/lib/gamification/industry-data"
import { computeAchievements } from "@/lib/achievements"
import { AchievementPreview } from "@/components/dashboard/achievement-preview"
import { AchievementCard } from "@/components/dashboard/achievement-card"
import { ShareActions } from "@/components/dashboard/share-actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Score, Profile, RoadmapItem, Category } from "@/types/database"

export const metadata: Metadata = {
  title: "Kartu Pencapaian",
}

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

export default async function AchievementPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/login")

  const [{ data: scores }, { data: profile }, { data: roadmapItems }] =
    await Promise.all([
      supabase
        .from("scores")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .returns<Score[]>(),
      supabase.from("profiles").select("*").eq("id", user.id).single<Profile>(),
      supabase
        .from("roadmap_items")
        .select("*")
        .eq("user_id", user.id)
        .returns<RoadmapItem[]>(),
    ])

  const score = scores?.[0] ?? null

  if (!score || !profile) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <EmptyState
          icon={ClipboardList}
          title="Belum ada skor"
          description="Lengkapi assessment terlebih dahulu untuk melihat pencapaian."
          actionLabel="Mulai Assessment"
          actionHref="/dashboard/assessment"
        />
      </div>
    )
  }

  const categoryScores: Record<Category, number> = {
    energy: score.energy_score,
    waste: score.waste_score,
    supply_chain: score.supply_chain_score,
    operations: score.operations_score,
    policy: score.policy_score,
  }
  const { rank } = getIndustryRank(profile.industry, score.total_score)
  const items = roadmapItems ?? []
  const achievements = computeAchievements(
    items.map((i) => ({ is_completed: i.is_completed, category: i.category })),
    achievementNames,
    profile.industry,
    categoryScores
  )

  const certificateToken = score.certificate_token
  const shareUrl = certificateToken
    ? `https://subakhijau.app/verify/${certificateToken}/achievement`
    : null

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Kartu Pencapaian</h1>
        <p className="text-muted-foreground">
          Preview dan download kartu pencapaian sustainability Anda
        </p>
      </div>

      {/* Achievement Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Preview Kartu
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <AchievementPreview
            businessName={profile.business_name}
            totalScore={score.total_score}
            rankName={rank}
            achievements={achievements}
            streakWeeks={0}
            certificateToken={certificateToken}
          />
        </CardContent>
      </Card>

      {/* Download button */}
      <Card>
        <CardContent className="flex justify-center pt-6">
          <AchievementCard
            businessName={profile.business_name}
            totalScore={score.total_score}
            rankName={rank}
            achievements={achievements}
            streakWeeks={0}
            certificateToken={certificateToken}
          />
        </CardContent>
      </Card>

      {/* Share actions */}
      {shareUrl && (
        <Card>
          <CardHeader>
            <CardTitle>Bagikan Pencapaian</CardTitle>
          </CardHeader>
          <CardContent>
            <ShareActions
              shareUrl={shareUrl}
              shareTitle={`\uD83C\uDFC6 ${profile.business_name} \u2014 ${rank} di Subak Hijau!`}
              shareDescription={`Skor sustainability ${score.total_score}/100`}
              labels={{
                copyLink: "Salin Link",
                linkCopied: "Link disalin!",
                shareWhatsApp: "WhatsApp",
                scanToVerify: "Scan untuk verifikasi",
              }}
            />
          </CardContent>
        </Card>
      )}

      {/* Link to certificate */}
      <div className="flex justify-center">
        <Button asChild variant="outline">
          <Link href="/dashboard/certificate">
            <Award className="mr-2 h-4 w-4" />
            Lihat Sertifikat
          </Link>
        </Button>
      </div>
    </div>
  )
}
