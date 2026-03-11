"use client"

import { useState } from "react"
import Link from "next/link"
import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScoreGauge } from "@/components/dashboard/score-gauge"
import { useTranslation } from "@/lib/i18n/language-context"

interface AssessmentRetakeGateProps {
  previousScore: number | null
  assessmentDate: string | null
  children: React.ReactNode
}

export function AssessmentRetakeGate({
  previousScore,
  assessmentDate,
  children,
}: AssessmentRetakeGateProps) {
  const [showForm, setShowForm] = useState(false)
  const { t } = useTranslation()
  const gate = t.dashboard.assessmentPage.retakeGate

  if (showForm) {
    return <>{children}</>
  }

  const formattedDate = assessmentDate
    ? new Date(assessmentDate).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null

  return (
    <div className="flex items-center justify-center py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>{gate.title}</CardTitle>
          <CardDescription>{gate.subtitle}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {previousScore !== null && (
            <div className="flex flex-col items-center gap-2">
              <p className="text-muted-foreground text-sm font-medium">
                {gate.lastScore}
              </p>
              <ScoreGauge score={previousScore} />
            </div>
          )}

          {formattedDate && (
            <div className="text-center">
              <p className="text-muted-foreground text-sm">
                {gate.lastDate}: {formattedDate}
              </p>
            </div>
          )}

          <div className="bg-amber-50 text-amber-900 dark:bg-amber-950 dark:text-amber-200 flex items-start gap-3 rounded-lg p-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
            <p className="text-sm">{gate.warning}</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button variant="outline" className="flex-1" asChild>
              <Link href="/dashboard/score">{gate.viewResults}</Link>
            </Button>
            <Button className="flex-1" onClick={() => setShowForm(true)}>
              {gate.startNew}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
