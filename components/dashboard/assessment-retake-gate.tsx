"use client"

import { useState } from "react"
import Link from "next/link"
import { AlertTriangle, BarChart3, RotateCcw } from "lucide-react"
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
    ? new Date(assessmentDate).toLocaleDateString("en-US", {
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
              <p className="text-sm font-medium text-muted-foreground">
                {gate.lastScore}
              </p>
              <ScoreGauge score={previousScore} />
            </div>
          )}

          {formattedDate && (
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                {gate.lastDate}: {formattedDate}
              </p>
            </div>
          )}

          <div className="flex items-start gap-3 rounded-lg bg-amber-50 p-3 text-amber-900 dark:bg-amber-950 dark:text-amber-200">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
            <p className="text-sm">{gate.warning}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" size="lg" asChild>
              <Link href="/dashboard/score">
                <BarChart3 className="mr-2 h-4 w-4" />
                {gate.viewResults}
              </Link>
            </Button>
            <Button size="lg" onClick={() => setShowForm(true)}>
              <RotateCcw className="mr-2 h-4 w-4" />
              {gate.startNew}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
