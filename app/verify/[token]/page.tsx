import { cache } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { createPublicClient } from "@/lib/supabase/public"
import { getScoreLabel } from "@/lib/constants"
import { getIndustryRank } from "@/lib/gamification/industry-data"
import { CheckCircle2, Shield, Trophy } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SustainabilityCertificate } from "@/components/dashboard/sustainability-certificate"
import { ShareActions } from "@/components/dashboard/share-actions"
import type { Industry, Category } from "@/types/database"

function getTierColor(score: number): string {
  if (score >= 80) return "text-emerald-600 dark:text-emerald-400"
  if (score >= 60) return "text-amber-600 dark:text-amber-400"
  if (score >= 30) return "text-gray-600 dark:text-gray-400"
  return "text-orange-700 dark:text-orange-400"
}

const getCertificateData = cache(async (token: string) => {
  const supabase = createPublicClient()

  const { data } = await supabase.rpc("get_public_certificate", {
    p_token: token,
  })

  if (!data) return null

  return {
    totalScore: data.total_score as number,
    energyScore: data.energy_score as number,
    wasteScore: data.waste_score as number,
    supplyChainScore: data.supply_chain_score as number,
    operationsScore: data.operations_score as number,
    policyScore: data.policy_score as number,
    createdAt: data.created_at as string,
    businessName: (data.business_name as string) ?? "Bisnis",
    industry: ((data.industry as string) ?? "other") as Industry,
    certificateToken: data.certificate_token as string,
  }
})

export async function generateMetadata({
  params,
}: {
  params: Promise<{ token: string }>
}): Promise<Metadata> {
  const { token } = await params
  const data = await getCertificateData(token)

  if (!data) {
    return { title: "Sertifikat Tidak Ditemukan" }
  }

  const title = `Sertifikat ${data.businessName} \u2014 Skor ${data.totalScore}/100`
  const description = `${data.businessName} telah mendapatkan skor sustainability ${data.totalScore}/100 dari Subak Hijau. Sertifikat ini terverifikasi dan valid.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://subakhijau.app/verify/${token}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}

export default async function VerifyPage({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = await params
  const data = await getCertificateData(token)

  if (!data) {
    notFound()
  }

  const scoreLabel = getScoreLabel(data.totalScore)
  const { rank } = getIndustryRank(data.industry, data.totalScore)
  const dateStr = new Date(data.createdAt).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  const categoryScores: Record<Category, number> = {
    energy: data.energyScore,
    waste: data.wasteScore,
    supply_chain: data.supplyChainScore,
    operations: data.operationsScore,
    policy: data.policyScore,
  }

  const shareUrl = `https://subakhijau.app/verify/${token}`

  const categoryLabels: { key: Category; label: string }[] = [
    { key: "energy", label: "Energi" },
    { key: "waste", label: "Limbah" },
    { key: "supply_chain", label: "Rantai Pasok" },
    { key: "operations", label: "Operasional" },
    { key: "policy", label: "Kebijakan" },
  ]

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50 p-4 dark:from-green-950/20 dark:to-emerald-950/20">
      <div className="w-full max-w-md space-y-4">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-3 flex size-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/40">
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-xl">Sertifikat Terverifikasi</CardTitle>
            <p className="text-sm text-muted-foreground">
              Verified by Subak Hijau
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border bg-muted/30 p-4 text-center">
              <p className="text-sm text-muted-foreground">Bisnis</p>
              <p className="text-lg font-bold">{data.businessName}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border bg-muted/30 p-3 text-center">
                <p className="text-sm text-muted-foreground">Skor Total</p>
                <p
                  className={`text-3xl font-bold ${getTierColor(data.totalScore)}`}
                >
                  {data.totalScore}
                </p>
                <p className="text-xs text-muted-foreground">/100</p>
              </div>
              <div className="rounded-lg border bg-muted/30 p-3 text-center">
                <p className="text-sm text-muted-foreground">Tier</p>
                <p
                  className={`text-lg font-bold ${getTierColor(data.totalScore)}`}
                >
                  {scoreLabel}
                </p>
                <p className="text-xs text-muted-foreground">{rank}</p>
              </div>
            </div>

            {/* Category scores */}
            <div className="space-y-2">
              {categoryLabels.map(({ key, label }) => (
                <div
                  key={key}
                  className="flex items-center justify-between rounded-lg border bg-muted/30 px-3 py-2"
                >
                  <span className="text-sm">{label}</span>
                  <span
                    className={`text-sm font-bold ${getTierColor(categoryScores[key])}`}
                  >
                    {categoryScores[key]}/100
                  </span>
                </div>
              ))}
            </div>

            <div className="rounded-lg border bg-muted/30 p-3 text-center">
              <p className="text-sm text-muted-foreground">
                Tanggal Assessment
              </p>
              <p className="font-medium">{dateStr}</p>
            </div>

            <div className="flex items-center justify-center gap-2 rounded-lg border border-green-200 bg-green-50 p-3 dark:border-green-800 dark:bg-green-950">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-green-700 dark:text-green-400">
                Sertifikat ini valid dan terverifikasi
              </span>
            </div>

            {/* Download certificate */}
            <div className="flex justify-center">
              <SustainabilityCertificate
                businessName={data.businessName}
                totalScore={data.totalScore}
                categoryScores={categoryScores}
                assessmentDate={data.createdAt}
                scoreLabel={scoreLabel}
                industry={data.industry}
                certificateToken={data.certificateToken}
              />
            </div>

            {/* Link to achievement */}
            <div className="flex justify-center">
              <Button asChild variant="outline" size="sm">
                <Link href={`/verify/${token}/achievement`}>
                  <Trophy className="mr-2 h-4 w-4" />
                  Lihat Kartu Pencapaian
                </Link>
              </Button>
            </div>

            {/* Share */}
            <ShareActions
              shareUrl={shareUrl}
              shareTitle={`\uD83C\uDF3F ${data.businessName} mendapat skor sustainability ${data.totalScore}/100!`}
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
