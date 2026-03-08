import Link from "next/link"
import { redirect } from "next/navigation"
import { ClipboardList, Map, MessageSquare } from "lucide-react"

import { createClient } from "@/lib/supabase/server"
import { getScoreLabelInfo, getScoreColor } from "@/lib/constants"
import { SeedButton } from "@/components/dashboard/seed-button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  const [{ data: latestScore }, { data: roadmapItems }] = await Promise.all([
    supabase
      .from("scores")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .single(),
    supabase
      .from("roadmap_items")
      .select("id, is_completed")
      .eq("user_id", user.id),
  ])

  const completedRoadmap = roadmapItems?.filter((i) => i.is_completed).length ?? 0
  const totalRoadmap = roadmapItems?.length ?? 0

  const quickActions = [
    {
      title: "\u{1F4CB} Mulai Assessment",
      description: "Cek seberapa hijau bisnismu sekarang",
      href: "/dashboard/assessment",
      icon: ClipboardList,
    },
    {
      title: "\u{1F4AC} AI Consultant",
      description: "Tanya langsung ke AI advisor kamu",
      href: "/dashboard/chat",
      icon: MessageSquare,
    },
    {
      title: "\u{1F5FA}\uFE0F Lihat Roadmap",
      description: "Langkah-langkah untuk naik level",
      href: "/dashboard/roadmap",
      icon: Map,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Selamat datang, {profile?.business_name}!
        </h1>
        <p className="text-muted-foreground">
          Pantau dan tingkatkan keberlanjutan bisnis Anda
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Skor Keberlanjutan</CardTitle>
          <CardDescription>
            Hasil evaluasi terbaru dari assessment Anda
          </CardDescription>
        </CardHeader>
        <CardContent>
          {latestScore ? (
            <div className="flex items-center gap-6">
              <div className="text-center">
                <span className="text-4xl">
                  {getScoreLabelInfo(latestScore.total_score).emoji}
                </span>
                <p
                  className={`text-4xl font-bold ${getScoreColor(latestScore.total_score)}`}
                >
                  {latestScore.total_score}
                </p>
                <p className="text-sm text-muted-foreground">dari 100</p>
              </div>
              <div className="flex-1">
                <p className="font-medium">
                  {getScoreLabelInfo(latestScore.total_score).label}
                </p>
                <p className="text-xs text-muted-foreground">
                  {getScoreLabelInfo(latestScore.total_score).description}
                </p>
                {totalRoadmap > 0 && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {"\u{1F3C6}"} {completedRoadmap}/{totalRoadmap} pencapaian roadmap
                  </p>
                )}
                <Button asChild className="mt-3" size="sm">
                  <Link href="/dashboard/score">Lihat Detail</Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="py-4 text-center">
              <p className="text-muted-foreground">
                Belum ada assessment. Mulai sekarang untuk mendapatkan skor
                keberlanjutan bisnis Anda.
              </p>
              <Button asChild className="mt-4">
                <Link href="/dashboard/assessment">Mulai Assessment</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {process.env.NODE_ENV === "development" && (
        <div className="flex items-center gap-2">
          <SeedButton />
          <span className="text-xs text-muted-foreground">Dev only</span>
        </div>
      )}

      <div>
        <h2 className="mb-4 text-lg font-semibold">Aksi Cepat</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((action) => (
            <Link key={action.href} href={action.href}>
              <Card className="h-full transition-colors hover:bg-muted/50">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <action.icon className="size-5" />
                    </div>
                    <div>
                      <CardTitle className="text-base">
                        {action.title}
                      </CardTitle>
                      <CardDescription>{action.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
