"use client"

import { useState } from "react"
import Link from "next/link"
import { z } from "zod/v4"
import { ArrowRight, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { FadeInUp } from "@/components/landing/motion-wrapper"
import {
  calculateQuickScore,
  type QuickAnswers,
  type QuickScoreResult,
} from "@/lib/quick-score"
import { useTranslation } from "@/lib/i18n/language-context"
import { assessmentContent } from "@/lib/i18n/content/assessment"

const quickSchema = z.object({
  energy_source: z.enum(["pln_only", "diesel", "pln_solar", "solar"]),
  waste_management: z.enum([
    "none",
    "segregation",
    "recycling",
    "composting",
    "circular",
  ]),
  packaging_type: z.enum([
    "single_use_plastic",
    "recyclable",
    "biodegradable",
    "reusable",
  ]),
  transportation: z.enum(["gasoline", "hybrid", "electric", "bicycle"]),
  has_sustainability_policy: z.enum(["true", "false"]),
})

export function QuickAssessmentForm() {
  const { locale } = useTranslation()
  const q = assessmentContent[locale].quick
  const [answers, setAnswers] = useState<Partial<QuickAnswers>>({})
  const [result, setResult] = useState<QuickScoreResult | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  function handleChange(key: keyof QuickAnswers, value: string) {
    setAnswers((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => {
      const next = { ...prev }
      delete next[key]
      return next
    })
  }

  function handleSubmit() {
    const parsed = quickSchema.safeParse(answers)
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {}
      for (const issue of parsed.error.issues) {
        const key = issue.path[0]
        if (key) fieldErrors[String(key)] = q.errors.selectOption
      }
      setErrors(fieldErrors)
      return
    }
    setResult(calculateQuickScore(parsed.data))
  }

  function handleRetry() {
    setAnswers({})
    setResult(null)
    setErrors({})
  }

  if (result) {
    return (
      <div className="mx-auto max-w-2xl space-y-6 p-4 pb-24 md:pb-4">
        <FadeInUp>
          <Card>
            <CardHeader>
              <CardTitle>{q.results.title}</CardTitle>
              <CardDescription>{q.results.subtitle}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center gap-2">
                <span className="text-5xl font-bold text-primary">
                  {result.range.min}–{result.range.max}
                </span>
                <span className="text-sm text-muted-foreground">
                  {q.results.outOf}
                </span>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold">
                  {q.results.categoryTitle}
                </h4>
                {Object.entries(result.categoryScores).map(([key, score]) => (
                  <div key={key} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>{q.categoryLabels[key] ?? key}</span>
                      <span className="font-medium">{score}</span>
                    </div>
                    <Progress value={score} className="h-2" />
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                <Button asChild className="flex-1">
                  <Link href="/dashboard/assessment">
                    {q.results.fullAssessment}
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handleRetry}
                >
                  <RotateCcw className="mr-1 h-4 w-4" />
                  {q.results.retry}
                </Button>
              </div>
            </CardContent>
          </Card>
        </FadeInUp>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-4 pb-24 md:pb-4">
      <FadeInUp>
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">{q.title}</h1>
          <p className="text-sm text-muted-foreground">{q.description}</p>
        </div>
      </FadeInUp>

      {q.questions.map((qItem, i) => (
        <FadeInUp key={qItem.key} delay={i * 0.05}>
          <Card>
            <CardHeader>
              <CardTitle>{qItem.title}</CardTitle>
              <CardDescription>{qItem.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={answers[qItem.key as keyof QuickAnswers] ?? ""}
                onValueChange={(value) =>
                  handleChange(qItem.key as keyof QuickAnswers, value)
                }
              >
                {qItem.options.map((opt) => (
                  <div key={opt.value} className="flex items-center gap-2">
                    <RadioGroupItem
                      value={opt.value}
                      id={`${qItem.key}-${opt.value}`}
                    />
                    <Label htmlFor={`${qItem.key}-${opt.value}`}>
                      {opt.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              {errors[qItem.key] && (
                <p className="mt-2 text-sm text-destructive">
                  {errors[qItem.key]}
                </p>
              )}
            </CardContent>
          </Card>
        </FadeInUp>
      ))}

      <FadeInUp delay={q.questions.length * 0.05}>
        <Button onClick={handleSubmit} className="w-full" size="lg">
          {q.submitButton}
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </FadeInUp>
    </div>
  )
}
