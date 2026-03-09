import dynamic from "next/dynamic"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { BottomNav } from "@/components/dashboard/bottom-nav"
import { CelebrationProvider } from "@/components/dashboard/celebration-modal"
import { KeyboardShortcuts } from "@/components/dashboard/keyboard-shortcuts"
import { CommandPalette } from "@/components/dashboard/command-palette"
import { PageTransition } from "@/components/dashboard/page-transition"
import { AiChatWidget } from "@/components/shared/ai-chat-widget"

const OnboardingTour = dynamic(() =>
  import("@/components/dashboard/onboarding-tour").then((m) => m.OnboardingTour)
)

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

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  if (!profile) {
    redirect("/onboarding")
  }

  return (
    <SidebarProvider>
      <AppSidebar profile={profile} />
      <SidebarInset>
        <DashboardHeader />
        <main id="main-content" className="flex-1 p-4 pb-20 md:p-6 md:pb-6">
          <CelebrationProvider>
            <OnboardingTour />
            <CommandPalette />
            <KeyboardShortcuts />
            <PageTransition>{children}</PageTransition>
          </CelebrationProvider>
        </main>
        <BottomNav />
        <AiChatWidget variant="dashboard" />
      </SidebarInset>
    </SidebarProvider>
  )
}
