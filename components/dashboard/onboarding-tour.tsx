"use client"

import Joyride, {
  type CallBackProps,
  type TooltipRenderProps,
  STATUS,
} from "react-joyride"
import { useTour } from "@/hooks/use-tour"
import { tourContent } from "@/lib/i18n/content/tour"
import { useTranslation } from "@/lib/i18n/language-context"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

function CustomTooltip({
  backProps,
  index,
  isLastStep,
  primaryProps,
  skipProps,
  step,
  size,
  tooltipProps,
}: TooltipRenderProps) {
  const { locale } = useTranslation()
  const content = tourContent[locale]
  const progress = content.stepOf
    .replace("{0}", String(index + 1))
    .replace("{1}", String(size))

  return (
    <Card
      {...tooltipProps}
      className="z-[10001] w-[340px] max-w-[90vw] shadow-lg"
    >
      <CardHeader>
        {step.title && <CardTitle>{step.title}</CardTitle>}
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">{step.content}</p>
        <p className="text-xs text-muted-foreground/70">{progress}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between gap-2">
        <Button variant="ghost" size="sm" {...skipProps}>
          {content.skipButton}
        </Button>
        <div className="flex items-center gap-2">
          {index > 0 && (
            <Button variant="outline" size="sm" {...backProps}>
              {content.backButton}
            </Button>
          )}
          <Button size="sm" {...primaryProps}>
            {isLastStep ? content.lastButton : content.nextButton}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export function OnboardingTour() {
  const { shouldShowTour, isRunning, completeTour } = useTour()
  const { locale } = useTranslation()
  const content = tourContent[locale]

  const handleCallback = (data: CallBackProps) => {
    const { status } = data
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      completeTour()
    }
  }

  if (!shouldShowTour) {
    return null
  }

  const steps = [
    {
      target: "body",
      placement: "center" as const,
      disableBeacon: true,
      title: content.steps[0].title,
      content: content.steps[0].content,
    },
    {
      target: "[data-tour='score-card']",
      placement: "bottom" as const,
      disableBeacon: true,
      title: content.steps[1].title,
      content: content.steps[1].content,
    },
    {
      target: "[data-tour='quick-actions']",
      placement: "top" as const,
      disableBeacon: true,
      title: content.steps[2].title,
      content: content.steps[2].content,
    },
    {
      target: "[data-slot='sidebar-content']",
      placement: "right" as const,
      disableBeacon: true,
      title: content.steps[3].title,
      content: content.steps[3].content,
    },
    {
      target: "[data-tour='assessment-link']",
      placement: "right" as const,
      disableBeacon: true,
      title: content.steps[4].title,
      content: content.steps[4].content,
    },
    {
      target: "[data-tour='chat-link']",
      placement: "right" as const,
      disableBeacon: true,
      title: content.steps[5].title,
      content: content.steps[5].content,
    },
    {
      target: "body",
      placement: "center" as const,
      disableBeacon: true,
      title: content.steps[6].title,
      content: content.steps[6].content,
    },
  ]

  return (
    <Joyride
      steps={steps}
      run={isRunning}
      continuous
      scrollToFirstStep
      showSkipButton
      callback={handleCallback}
      tooltipComponent={CustomTooltip}
      styles={{
        options: {
          primaryColor: "#16a34a",
          zIndex: 10000,
          overlayColor: "rgba(0, 0, 0, 0.5)",
        },
      }}
    />
  )
}
