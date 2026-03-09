"use client"

import dynamic from "next/dynamic"

const OnboardingTour = dynamic(
  () =>
    import("@/components/dashboard/onboarding-tour").then(
      (m) => m.OnboardingTour
    ),
  { ssr: false }
)

const OnboardingCarousel = dynamic(
  () =>
    import("@/components/dashboard/onboarding-carousel").then(
      (m) => m.OnboardingCarousel
    ),
  { ssr: false }
)

const JourneyChecklist = dynamic(
  () =>
    import("@/components/dashboard/journey-checklist").then(
      (m) => m.JourneyChecklist
    ),
  { ssr: false }
)

interface JourneyChecklistProps {
  hasAssessment: boolean
  hasScore: boolean
  hasRoadmap: boolean
  hasCertificate: boolean
}

export function OnboardingWidgets({
  journeyData,
}: {
  journeyData: JourneyChecklistProps
}) {
  return (
    <>
      <OnboardingCarousel />
      <OnboardingTour />
      <JourneyChecklist {...journeyData} />
    </>
  )
}
