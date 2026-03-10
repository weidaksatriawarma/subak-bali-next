"use client"

import Link from "next/link"
import { ClipboardList, Award, Trophy } from "lucide-react"
import { EmptyState } from "@/components/shared/empty-state"
import { AchievementPreview } from "@/components/dashboard/achievement-preview"
import { AchievementCard } from "@/components/dashboard/achievement-card"
import { ShareActions } from "@/components/dashboard/share-actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslation } from "@/lib/i18n/language-context"
import { computeAchievements } from "@/lib/achievements"
import type { Category, Industry } from "@/types/database"

interface AchievementPageContentProps {
  score: {
    total_score: number
    energy_score: number
    waste_score: number
    supply_chain_score: number
    operations_score: number
    policy_score: number
    certificate_token?: string
  } | null
  profile: {
    business_name: string
    industry: Industry
  } | null
  roadmapItems: { is_completed: boolean; category: Category }[]
  rank: string
}

export function AchievementPageContent({
  score,
  profile,
  roadmapItems,
  rank,
}: AchievementPageContentProps) {
  const { t } = useTranslation()
  const ap = t.dashboard.achievementPage
  const achievementNames = t.dashboard.common.achievementNames

  if (!score || !profile) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <EmptyState
          icon={ClipboardList}
          title={ap.noScore}
          description={ap.noScoreDesc}
          actionLabel={t.dashboard.overview.startAssessment}
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

  const achievements = computeAchievements(
    roadmapItems.map((i) => ({
      is_completed: i.is_completed,
      category: i.category,
    })),
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
        <h1 className="text-2xl font-bold tracking-tight">{ap.title}</h1>
        <p className="text-muted-foreground">{ap.subtitle}</p>
      </div>

      {/* Achievement Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            {ap.previewCardTitle}
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
            <CardTitle>{ap.shareTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <ShareActions
              shareUrl={shareUrl}
              shareTitle={`\u{1F3C6} ${profile.business_name} \u2014 ${rank} di Subak Hijau!`}
              shareDescription={`${t.dashboard.score.totalScore} ${score.total_score}/100`}
              labels={{
                copyLink: ap.copyLink,
                linkCopied: ap.linkCopied,
                shareWhatsApp: ap.shareWhatsApp,
                scanToVerify: ap.scanToVerify,
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
            {ap.viewCertificate}
          </Link>
        </Button>
      </div>
    </div>
  )
}
