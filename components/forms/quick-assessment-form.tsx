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

interface Question {
  key: keyof QuickAnswers
  title: string
  description: string
  options: { value: string; label: string }[]
}

const questions: Question[] = [
  {
    key: "energy_source",
    title: "Sumber Energi",
    description: "Apa sumber energi utama bisnis Anda?",
    options: [
      { value: "pln_only", label: "PLN saja" },
      { value: "diesel", label: "Genset / Diesel" },
      { value: "pln_solar", label: "PLN + Panel Surya" },
      { value: "solar", label: "Panel Surya penuh" },
    ],
  },
  {
    key: "waste_management",
    title: "Pengelolaan Sampah",
    description: "Bagaimana bisnis Anda mengelola sampah?",
    options: [
      { value: "none", label: "Tidak ada pengelolaan khusus" },
      { value: "segregation", label: "Pemilahan sampah" },
      { value: "recycling", label: "Daur ulang" },
      { value: "composting", label: "Pengomposan" },
      { value: "circular", label: "Ekonomi sirkular" },
    ],
  },
  {
    key: "packaging_type",
    title: "Jenis Kemasan",
    description: "Jenis kemasan apa yang paling sering digunakan?",
    options: [
      { value: "single_use_plastic", label: "Plastik sekali pakai" },
      { value: "recyclable", label: "Bahan dapat didaur ulang" },
      { value: "biodegradable", label: "Bahan biodegradable" },
      { value: "reusable", label: "Kemasan dapat dipakai ulang" },
    ],
  },
  {
    key: "transportation",
    title: "Transportasi",
    description: "Moda transportasi utama untuk operasional bisnis?",
    options: [
      { value: "gasoline", label: "Kendaraan bensin/solar" },
      { value: "hybrid", label: "Kendaraan hybrid" },
      { value: "electric", label: "Kendaraan listrik" },
      { value: "bicycle", label: "Sepeda / tanpa kendaraan" },
    ],
  },
  {
    key: "has_sustainability_policy",
    title: "Kebijakan Sustainability",
    description: "Apakah bisnis Anda memiliki kebijakan sustainability?",
    options: [
      { value: "false", label: "Belum ada" },
      { value: "true", label: "Sudah ada" },
    ],
  },
]

const CATEGORY_LABELS: Record<keyof QuickAnswers, string> = {
  energy_source: "Energi",
  waste_management: "Sampah",
  packaging_type: "Kemasan",
  transportation: "Transportasi",
  has_sustainability_policy: "Kebijakan",
}

export function QuickAssessmentForm() {
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
        if (key) fieldErrors[String(key)] = "Pilih salah satu opsi"
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
              <CardTitle>Estimasi Skor Sustainability</CardTitle>
              <CardDescription>Berdasarkan jawaban cepat Anda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center gap-2">
                <span className="text-5xl font-bold text-primary">
                  {result.range.min}–{result.range.max}
                </span>
                <span className="text-sm text-muted-foreground">
                  dari 100 poin
                </span>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold">Skor per Kategori</h4>
                {Object.entries(result.categoryScores).map(([key, score]) => (
                  <div key={key} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>{CATEGORY_LABELS[key as keyof QuickAnswers]}</span>
                      <span className="font-medium">{score}</span>
                    </div>
                    <Progress value={score} className="h-2" />
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                <Button asChild className="flex-1">
                  <Link href="/dashboard/assessment">
                    Assessment Lengkap
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handleRetry}
                >
                  <RotateCcw className="mr-1 h-4 w-4" />
                  Coba Lagi
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
          <h1 className="text-2xl font-bold">Quick Assessment</h1>
          <p className="text-sm text-muted-foreground">
            Estimasi skor sustainability bisnis Anda dalam 3 menit
          </p>
        </div>
      </FadeInUp>

      {questions.map((q, i) => (
        <FadeInUp key={q.key} delay={i * 0.05}>
          <Card>
            <CardHeader>
              <CardTitle>{q.title}</CardTitle>
              <CardDescription>{q.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={answers[q.key] ?? ""}
                onValueChange={(value) => handleChange(q.key, value)}
              >
                {q.options.map((opt) => (
                  <div key={opt.value} className="flex items-center gap-2">
                    <RadioGroupItem
                      value={opt.value}
                      id={`${q.key}-${opt.value}`}
                    />
                    <Label htmlFor={`${q.key}-${opt.value}`}>{opt.label}</Label>
                  </div>
                ))}
              </RadioGroup>
              {errors[q.key] && (
                <p className="mt-2 text-sm text-destructive">{errors[q.key]}</p>
              )}
            </CardContent>
          </Card>
        </FadeInUp>
      ))}

      <FadeInUp delay={questions.length * 0.05}>
        <Button onClick={handleSubmit} className="w-full" size="lg">
          Lihat Estimasi Skor
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </FadeInUp>
    </div>
  )
}
