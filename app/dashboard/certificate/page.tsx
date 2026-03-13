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
  title: "Sustainability Certificate",
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
          title="No score yet"
          description="Complete an assessment first to get your certificate."
          actionLabel="Start Assessment"
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
          Sustainability Certificate
        </h1>
        <p className="text-muted-foreground">
          Preview and download your business sustainability certificate
        </p>
      </div>

      {/* Certificate Preview */}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Certificate Preview
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0 sm:px-6 sm:pb-6">
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
      <div className="grid grid-cols-2 gap-3">
        <SustainabilityCertificate
          businessName={profile.business_name}
          totalScore={score.total_score}
          categoryScores={categoryScores}
          assessmentDate={assessment?.created_at ?? score.created_at}
          scoreLabel={scoreLabel}
          industry={profile.industry}
          certificateToken={certificateToken}
        />
        <Button asChild variant="outline" className="w-full">
          <Link href="/dashboard/score/report" target="_blank">
            <FileDown className="mr-2 h-4 w-4" />
            Download PDF Report
          </Link>
        </Button>
      </div>

      {/* Share actions */}
      {shareUrl && (
        <Card>
          <CardHeader>
            <CardTitle>Share Certificate</CardTitle>
          </CardHeader>
          <CardContent>
            <ShareActions
              shareUrl={shareUrl}
              shareTitle={`\uD83C\uDF3F ${profile.business_name} scored ${score.total_score}/100 on sustainability from Subak Hijau!`}
              labels={{
                copyLink: "Copy Link",
                linkCopied: "Link copied!",
                shareWhatsApp: "WhatsApp",
                scanToVerify: "Scan to verify",
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
            View Achievement Card
          </Link>
        </Button>
      </div>
    </div>
  )
}
