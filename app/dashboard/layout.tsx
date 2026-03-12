import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { BottomSheetNav } from "@/components/dashboard/bottom-sheet-nav"
import { CelebrationProvider } from "@/components/dashboard/celebration-modal"
import { KeyboardShortcuts } from "@/components/dashboard/keyboard-shortcuts"
import { CommandPalette } from "@/components/dashboard/command-palette"
import { PageTransition } from "@/components/dashboard/page-transition"
import { AiChatWidget } from "@/components/shared/ai-chat-widget"
import { OnboardingWidgets } from "@/components/dashboard/onboarding-client"
import { DashboardLanguageProvider } from "@/lib/i18n/language-context"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const [
    { data: profile },
    { data: assessmentCheck },
    { data: scoreCheck },
    { data: roadmapCheck },
  ] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).single(),
    supabase
      .from("assessments")
      .select("id")
      .eq("user_id", user.id)
      .eq("status", "completed")
      .limit(1)
      .single(),
    supabase
      .from("scores")
      .select("id, certificate_token")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .single(),
    supabase
      .from("roadmap_items")
      .select("id")
      .eq("user_id", user.id)
      .limit(1)
      .single(),
  ])

  if (!profile) {
    redirect("/onboarding")
  }

  const journeyData = {
    hasAssessment: !!assessmentCheck,
    hasScore: !!scoreCheck,
    hasRoadmap: !!roadmapCheck,
    hasCertificate: !!scoreCheck?.certificate_token,
  }

  return (
    <DashboardLanguageProvider>
      <SidebarProvider>
        <AppSidebar profile={profile} />
        <SidebarInset>
          <DashboardHeader />
          <main id="main-content" className="flex-1 p-4 pb-20 md:p-6 md:pb-6">
            <CelebrationProvider>
              <OnboardingWidgets journeyData={journeyData} />
              <CommandPalette />
              <KeyboardShortcuts />
              <PageTransition>{children}</PageTransition>
            </CelebrationProvider>
          </main>
          <BottomSheetNav />
          <AiChatWidget variant="dashboard" />
        </SidebarInset>
      </SidebarProvider>
    </DashboardLanguageProvider>
  )
}
