import type { Metadata } from "next"
import { redirect } from "next/navigation"
import Link from "next/link"
import { ClipboardList, Award, FileDown, Trophy } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { EmptyState } from "@/components/shared/empty-state"
import { getScoreLabel } from "@/lib/constants"
import { getIndustryRank } from "@/lib/gamification/industry-data"
import { CertificatePreview } from "@/components/dashboard/certificate-preview"
import { SustainabilityCertificate } from "@/components/dashboard/sustainability-certificate"
import { ShareActions } from "@/components/dashboard/share-actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Score, Profile, Assessment, Category } from "@/types/database"

export const metadata: Metadata = {
  title: "Sertifikat Keberlanjutan",
}

export default async function CertificatePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/login")

  const [{ data: scores }, { data: profile }, { data: assessment }] =
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
        .from("assessments")
        .select("*")
        .eq("user_id", user.id)
        .eq("status", "completed")
        .order("created_at", { ascending: false })
        .limit(1)
        .single<Assessment>(),
    ])

  const score = scores?.[0] ?? null

  if (!score || !profile) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <EmptyState
          icon={ClipboardList}
          title="Belum ada skor"
          description="Lengkapi assessment terlebih dahulu untuk mendapatkan sertifikat."
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
  const scoreLabel = getScoreLabel(score.total_score)
  const { rank } = getIndustryRank(profile.industry, score.total_score)
  const certificateToken = score.certificate_token
  const shareUrl = certificateToken
    ? `https://subakhijau.app/verify/${certificateToken}`
    : null

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Sertifikat Keberlanjutan
        </h1>
        <p className="text-muted-foreground">
          Preview dan download sertifikat sustainability bisnis Anda
        </p>
      </div>

      {/* Certificate Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Preview Sertifikat
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CertificatePreview
            businessName={profile.business_name}
            totalScore={score.total_score}
            categoryScores={categoryScores}
            assessmentDate={assessment?.created_at ?? score.created_at}
            scoreLabel={scoreLabel}
            industryRank={profile.industry !== "other" ? rank : undefined}
            certificateToken={certificateToken}
          />
        </CardContent>
      </Card>

      {/* Download buttons */}
      <Card>
        <CardContent className="flex flex-wrap items-center justify-center gap-3 pt-6">
          <SustainabilityCertificate
            businessName={profile.business_name}
            totalScore={score.total_score}
            categoryScores={categoryScores}
            assessmentDate={assessment?.created_at ?? score.created_at}
            scoreLabel={scoreLabel}
            industry={profile.industry}
            certificateToken={certificateToken}
          />
          <Button asChild variant="outline">
            <Link href="/dashboard/score/report" target="_blank">
              <FileDown className="mr-2 h-4 w-4" />
              Download Laporan PDF
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Share actions */}
      {shareUrl && (
        <Card>
          <CardHeader>
            <CardTitle>Bagikan Sertifikat</CardTitle>
          </CardHeader>
          <CardContent>
            <ShareActions
              shareUrl={shareUrl}
              shareTitle={`\uD83C\uDF3F ${profile.business_name} mendapat skor sustainability ${score.total_score}/100 dari Subak Hijau!`}
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

      {/* Link to achievement */}
      <div className="flex justify-center">
        <Button asChild variant="outline">
          <Link href="/dashboard/achievement">
            <Trophy className="mr-2 h-4 w-4" />
            Lihat Kartu Pencapaian
          </Link>
        </Button>
      </div>
    </div>
  )
}
