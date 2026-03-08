"use client"

import {
  INDUSTRY_QUESTIONS,
  hasIndustryQuestions,
  type IndustryQuestion,
} from "@/lib/gamification/industry-questions"
import { useTranslation } from "@/lib/i18n/language-context"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import type { Industry } from "@/types/database"

interface IndustryQuestionsStepProps {
  industry: Industry
  values: Record<string, unknown>
  onChange: (id: string, value: unknown) => void
}

export function IndustryQuestionsStep({
  industry,
  values,
  onChange,
}: IndustryQuestionsStepProps) {
  const { t } = useTranslation()
  const g = t.dashboard.gamification.industryQuestions

  if (!hasIndustryQuestions(industry)) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        <p>{g.skipInfo}</p>
      </div>
    )
  }

  const questions = INDUSTRY_QUESTIONS[industry]

  return (
    <div className="space-y-6">
      {questions.map((q) => (
        <QuestionField
          key={q.id}
          question={q}
          value={values[q.id]}
          onChange={(v) => onChange(q.id, v)}
        />
      ))}
    </div>
  )
}

function QuestionField({
  question,
  value,
  onChange,
}: {
  question: IndustryQuestion
  value: unknown
  onChange: (v: unknown) => void
}) {
  switch (question.type) {
    case "boolean":
      return (
        <div className="flex items-center justify-between">
          <Label htmlFor={question.id}>{question.label}</Label>
          <Switch
            id={question.id}
            checked={!!value}
            onCheckedChange={onChange}
          />
        </div>
      )
    case "enum":
      return (
        <div className="space-y-3">
          <Label>{question.label}</Label>
          <RadioGroup value={(value as string) ?? ""} onValueChange={onChange}>
            {question.options?.map((opt) => (
              <div key={opt.value} className="flex items-center gap-2">
                <RadioGroupItem
                  value={opt.value}
                  id={`${question.id}-${opt.value}`}
                />
                <Label
                  htmlFor={`${question.id}-${opt.value}`}
                  className="font-normal"
                >
                  {opt.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      )
    case "slider":
      return (
        <div className="space-y-3">
          <Label>
            {question.label}: {(value as number) ?? question.min ?? 0}%
          </Label>
          <Slider
            min={question.min ?? 0}
            max={question.max ?? 100}
            step={question.step ?? 5}
            value={[(value as number) ?? question.min ?? 0]}
            onValueChange={([v]) => onChange(v)}
          />
        </div>
      )
  }
}
