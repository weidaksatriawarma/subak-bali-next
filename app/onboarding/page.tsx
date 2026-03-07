import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"
import { OnboardingForm } from "@/components/forms/onboarding-form"

export default async function OnboardingPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", user.id)
    .single()

  if (profile) {
    redirect("/dashboard")
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <OnboardingForm />
    </main>
  )
}
