"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { useForm, type Resolver } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Info, Loader2, Check, Circle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"

import { createClient } from "@/lib/supabase/client"
import {
  ENERGY_SOURCE_LABELS,
  WASTE_MANAGEMENT_LABELS,
  PACKAGING_TYPE_LABELS,
  TRANSPORTATION_TYPE_LABELS,
} from "@/lib/constants"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { IndustryQuestionsStep } from "@/components/forms/industry-questions-step"
import { hasIndustryQuestions } from "@/lib/gamification/industry-questions"
import { isFunctionalCookiesAllowed } from "@/lib/cookie-consent"
import type {
  EnergySource,
  WasteManagement,
  PackagingType,
  TransportationType,
  Industry,
} from "@/types/database"

const assessmentSchema = z.object({
  energy_source: z.enum([
    "pln_only",
    "pln_solar",
    "solar_only",
    "diesel_generator",
  ]),
  monthly_electricity_kwh: z.coerce.number().min(0).max(100_000).optional(),
  uses_energy_efficient_equipment: z.boolean().default(false),
  waste_management: z.enum([
    "none",
    "segregation",
    "recycling",
    "composting",
    "circular",
  ]),
  plastic_reduction_efforts: z.boolean().default(false),
  waste_volume_kg_monthly: z.coerce.number().min(0).max(50_000).optional(),
  local_sourcing_percentage: z.number().min(0).max(100).default(0),
  supplier_sustainability_check: z.boolean().default(false),
  packaging_type: z.enum([
    "single_use_plastic",
    "recyclable",
    "biodegradable",
    "reusable",
  ]),
  water_conservation: z.boolean().default(false),
  digital_operations: z.boolean().default(false),
  transportation_type: z.enum([
    "gasoline",
    "electric",
    "hybrid",
    "bicycle",
    "none",
  ]),
  has_sustainability_policy: z.boolean().default(false),
  employee_sustainability_training: z.boolean().default(false),
  community_engagement: z.boolean().default(false),
})

type AssessmentFormData = z.infer<typeof assessmentSchema>

const STEPS = [
  { title: "Energi", description: "Penggunaan energi bisnis Anda" },
  { title: "Pengelolaan Limbah", description: "Cara Anda mengelola limbah" },
  { title: "Rantai Pasok", description: "Sumber bahan baku dan kemasan" },
  { title: "Operasional", description: "Praktik operasional harian" },
  { title: "Kebijakan", description: "Kebijakan ramah lingkungan bisnis" },
]

const STORAGE_KEY = "assessment-draft"

const PROCESSING_STEPS = [
  { id: "save", label: "Menyimpan data assessment" },
  { id: "score", label: "Menghitung skor keberlanjutan" },
  { id: "roadmap", label: "Membuat roadmap perbaikan" },
  { id: "done", label: "Mempersiapkan hasil" },
] as const

const PROCESSING_SUBTITLES: Record<string, string> = {
  save: "Menyimpan jawaban Anda ke database...",
  score: "AI sedang menganalisis praktik bisnis Anda...",
  roadmap: "AI sedang menyusun rekomendasi untuk bisnis Anda...",
  done: "Sebentar lagi selesai...",
}

const DEFAULT_VALUES: Partial<AssessmentFormData> = {
  uses_energy_efficient_equipment: false,
  plastic_reduction_efforts: false,
  local_sourcing_percentage: 0,
  supplier_sustainability_check: false,
  water_conservation: false,
  digital_operations: false,
  has_sustainability_policy: false,
  employee_sustainability_training: false,
  community_engagement: false,
}

function loadDraft(): {
  values: Partial<AssessmentFormData>
  step: number
} | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    const validated = assessmentSchema.partial().safeParse(parsed.values)
    if (!validated.success) {
      localStorage.removeItem(STORAGE_KEY)
      return null
    }
    const maxSteps = 6
    const step = Math.min(
      Math.max(typeof parsed.step === "number" ? parsed.step : 0, 0),
      maxSteps
    )
    return { values: validated.data, step }
  } catch {
    localStorage.removeItem(STORAGE_KEY)
    return null
  }
}

function saveDraft(values: Partial<AssessmentFormData>, step: number) {
  if (!isFunctionalCookiesAllowed()) return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ values, step }))
  } catch {}
}

function clearDraft() {
  localStorage.removeItem(STORAGE_KEY)
}

export function AssessmentForm() {
  const router = useRouter()
  const draft = useRef(loadDraft())
  const [step, setStep] = useState(() => draft.current?.step ?? 0)
  const [currentProcessingStep, setCurrentProcessingStep] = useState(-1)
  const [industry, setIndustry] = useState<Industry>("other")
  const [industryAnswers, setIndustryAnswers] = useState<
    Record<string, unknown>
  >({})

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<AssessmentFormData>({
    resolver: zodResolver(assessmentSchema) as Resolver<AssessmentFormData>,
    defaultValues: { ...DEFAULT_VALUES, ...draft.current?.values },
  })

  useEffect(() => {
    if (draft.current) {
      toast.info(
        `Draft assessment ditemukan. Melanjutkan dari langkah ${draft.current.step + 1}.`
      )
    }
  }, [])

  useEffect(() => {
    async function fetchProfile() {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return
      const { data: profile } = await supabase
        .from("profiles")
        .select("industry")
        .eq("id", user.id)
        .single()
      if (profile) setIndustry(profile.industry as Industry)
    }
    fetchProfile()
  }, [])

  useEffect(() => {
    const subscription = watch((values) => {
      saveDraft(values, step)
    })
    return () => subscription.unsubscribe()
  }, [watch, step])

  const energySource = watch("energy_source")
  const wasteManagement = watch("waste_management")
  const packagingType = watch("packaging_type")
  const transportationType = watch("transportation_type")
  const localSourcingPercentage = watch("local_sourcing_percentage")

  const stepFields: (keyof AssessmentFormData)[][] = [
    [
      "energy_source",
      "monthly_electricity_kwh",
      "uses_energy_efficient_equipment",
    ],
    [
      "waste_management",
      "plastic_reduction_efforts",
      "waste_volume_kg_monthly",
    ],
    [
      "local_sourcing_percentage",
      "supplier_sustainability_check",
      "packaging_type",
    ],
    ["water_conservation", "digital_operations", "transportation_type"],
    [
      "has_sustainability_policy",
      "employee_sustainability_training",
      "community_engagement",
    ],
  ]

  const showIndustryStep = hasIndustryQuestions(industry)
  const totalSteps = showIndustryStep ? STEPS.length + 1 : STEPS.length

  async function handleNext() {
    // Industry questions step doesn't need form validation
    if (step >= STEPS.length) {
      setStep((s) => Math.min(s + 1, totalSteps - 1))
      return
    }
    const valid = await trigger(stepFields[step])
    if (valid) setStep((s) => Math.min(s + 1, totalSteps - 1))
  }

  function handlePrev() {
    setStep((s) => Math.max(s - 1, 0))
  }

  async function onSubmit(formData: AssessmentFormData) {
    setCurrentProcessingStep(0)
    try {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("Not authenticated")

      const { data: assessment, error } = await supabase
        .from("assessments")
        .insert({
          user_id: user.id,
          status: "completed" as const,
          energy_source: formData.energy_source,
          monthly_electricity_kwh: formData.monthly_electricity_kwh,
          uses_energy_efficient_equipment:
            formData.uses_energy_efficient_equipment,
          waste_management: formData.waste_management,
          plastic_reduction_efforts: formData.plastic_reduction_efforts,
          waste_volume_kg_monthly: formData.waste_volume_kg_monthly,
          local_sourcing_percentage: formData.local_sourcing_percentage,
          supplier_sustainability_check: formData.supplier_sustainability_check,
          packaging_type: formData.packaging_type,
          water_conservation: formData.water_conservation,
          digital_operations: formData.digital_operations,
          transportation_type: formData.transportation_type,
          has_sustainability_policy: formData.has_sustainability_policy,
          employee_sustainability_training:
            formData.employee_sustainability_training,
          community_engagement: formData.community_engagement,
          industry_answers: showIndustryStep ? industryAnswers : {},
        })
        .select()
        .single()

      if (error || !assessment) throw error

      setCurrentProcessingStep(1)
      const scoreRes = await fetch("/api/assessment/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assessment_id: assessment.id }),
      })

      if (!scoreRes.ok) {
        throw new Error("Gagal menghasilkan skor")
      }

      setCurrentProcessingStep(2)
      const roadmapRes = await fetch("/api/assessment/roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assessment_id: assessment.id }),
      })

      if (!roadmapRes.ok) {
        throw new Error("Gagal menghasilkan roadmap")
      }

      setCurrentProcessingStep(3)
      clearDraft()
      router.push("/dashboard/score")
    } catch (err) {
      setCurrentProcessingStep(-1)
      toast.error(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan. Silakan coba lagi."
      )
    }
  }

  const progressValue = ((step + 1) / totalSteps) * 100

  if (currentProcessingStep >= 0) {
    const progressValue =
      ((currentProcessingStep + 1) / PROCESSING_STEPS.length) * 100
    const activeStep = PROCESSING_STEPS[currentProcessingStep]

    return (
      <Card className="mx-auto max-w-2xl">
        <CardContent className="flex flex-col gap-6 py-10">
          <div className="space-y-3 text-center">
            <p className="text-lg font-medium">Menganalisis Assessment Anda</p>
            <Progress value={progressValue} className="mx-auto max-w-sm" />
          </div>

          <div className="space-y-3">
            {PROCESSING_STEPS.map((s, i) => {
              const isCompleted = i < currentProcessingStep
              const isActive = i === currentProcessingStep
              return (
                <div key={s.id} className="flex items-center gap-3">
                  <AnimatePresence mode="wait">
                    {isCompleted ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                        className="flex size-6 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50"
                      >
                        <Check className="size-4 text-green-600 dark:text-green-400" />
                      </motion.div>
                    ) : isActive ? (
                      <motion.div
                        key="loader"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <Loader2 className="size-6 animate-spin text-primary" />
                      </motion.div>
                    ) : (
                      <Circle className="size-6 text-muted-foreground/40" />
                    )}
                  </AnimatePresence>
                  <span
                    className={
                      isCompleted
                        ? "text-muted-foreground line-through"
                        : isActive
                          ? "font-medium text-foreground"
                          : "text-muted-foreground/60"
                    }
                  >
                    {s.label}
                    {isActive && "..."}
                  </span>
                </div>
              )
            })}
          </div>

          <p className="text-center text-sm text-muted-foreground">
            {activeStep
              ? PROCESSING_SUBTITLES[activeStep.id]
              : "Mohon tunggu..."}
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-2xl">
      {step === 0 && (
        <div className="mb-4 flex gap-3 rounded-lg border border-blue-200 bg-blue-50/50 px-4 py-3 dark:border-blue-900 dark:bg-blue-950/20">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-500" />
          <div className="text-sm text-muted-foreground">
            <p className="font-medium text-foreground">
              Jawab dengan jujur dan apa adanya
            </p>
            <p>
              Hasil assessment ini sepenuhnya bergantung pada keakuratan jawaban
              Anda. Jawaban yang jujur akan menghasilkan skor yang lebih akurat
              dan rekomendasi yang benar-benar sesuai dengan kondisi bisnis
              Anda. Data Anda bersifat rahasia dan hanya digunakan untuk
              analisis sustainability.
            </p>
          </div>
        </div>
      )}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>
                Langkah {step + 1}:{" "}
                {step < STEPS.length
                  ? STEPS[step].title
                  : "Pertanyaan Industri"}
              </CardTitle>
              <CardDescription>
                {step < STEPS.length
                  ? STEPS[step].description
                  : "Pertanyaan khusus untuk industri Anda"}
              </CardDescription>
            </div>
            <span className="text-sm text-muted-foreground">
              {step + 1}/{totalSteps}
            </span>
          </div>
          <Progress value={progressValue} className="mt-4" />
        </CardHeader>

        <CardContent className="space-y-6">
          {step === 0 && (
            <>
              <div className="space-y-3">
                <Label>Sumber Energi Utama</Label>
                <RadioGroup
                  value={energySource}
                  onValueChange={(v) =>
                    setValue("energy_source", v as EnergySource)
                  }
                >
                  {Object.entries(ENERGY_SOURCE_LABELS).map(
                    ([value, label]) => (
                      <div key={value} className="flex items-center gap-2">
                        <RadioGroupItem value={value} id={`energy-${value}`} />
                        <Label
                          htmlFor={`energy-${value}`}
                          className="font-normal"
                        >
                          {label}
                        </Label>
                      </div>
                    )
                  )}
                </RadioGroup>
                {errors.energy_source && (
                  <p className="text-sm text-destructive">
                    Pilih sumber energi
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthly_electricity_kwh">
                  Estimasi Penggunaan Listrik Bulanan (kWh)
                </Label>
                <Input
                  id="monthly_electricity_kwh"
                  type="number"
                  min={0}
                  max={100000}
                  placeholder="Contoh: 500"
                  {...register("monthly_electricity_kwh")}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="uses_energy_efficient_equipment">
                  Menggunakan Peralatan Hemat Energi?
                </Label>
                <Switch
                  id="uses_energy_efficient_equipment"
                  checked={watch("uses_energy_efficient_equipment")}
                  onCheckedChange={(v) =>
                    setValue("uses_energy_efficient_equipment", v)
                  }
                />
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <div className="space-y-3">
                <Label>Cara Pengelolaan Limbah</Label>
                <RadioGroup
                  value={wasteManagement}
                  onValueChange={(v) =>
                    setValue("waste_management", v as WasteManagement)
                  }
                >
                  {Object.entries(WASTE_MANAGEMENT_LABELS).map(
                    ([value, label]) => (
                      <div key={value} className="flex items-center gap-2">
                        <RadioGroupItem value={value} id={`waste-${value}`} />
                        <Label
                          htmlFor={`waste-${value}`}
                          className="font-normal"
                        >
                          {label}
                        </Label>
                      </div>
                    )
                  )}
                </RadioGroup>
                {errors.waste_management && (
                  <p className="text-sm text-destructive">
                    Pilih cara pengelolaan limbah
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="plastic_reduction_efforts">
                  Upaya Pengurangan Plastik?
                </Label>
                <Switch
                  id="plastic_reduction_efforts"
                  checked={watch("plastic_reduction_efforts")}
                  onCheckedChange={(v) =>
                    setValue("plastic_reduction_efforts", v)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="waste_volume_kg_monthly">
                  Estimasi Volume Limbah Bulanan (kg)
                </Label>
                <Input
                  id="waste_volume_kg_monthly"
                  type="number"
                  min={0}
                  max={50000}
                  placeholder="Contoh: 50"
                  {...register("waste_volume_kg_monthly")}
                />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="space-y-3">
                <Label>
                  Persentase Bahan Baku Lokal: {localSourcingPercentage}%
                </Label>
                <Slider
                  min={0}
                  max={100}
                  step={5}
                  value={[localSourcingPercentage]}
                  onValueChange={([v]) =>
                    setValue("local_sourcing_percentage", v)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="supplier_sustainability_check">
                  Memilih Pemasok Ramah Lingkungan?
                </Label>
                <Switch
                  id="supplier_sustainability_check"
                  checked={watch("supplier_sustainability_check")}
                  onCheckedChange={(v) =>
                    setValue("supplier_sustainability_check", v)
                  }
                />
              </div>

              <div className="space-y-3">
                <Label>Jenis Kemasan Utama</Label>
                <RadioGroup
                  value={packagingType}
                  onValueChange={(v) =>
                    setValue("packaging_type", v as PackagingType)
                  }
                >
                  {Object.entries(PACKAGING_TYPE_LABELS).map(
                    ([value, label]) => (
                      <div key={value} className="flex items-center gap-2">
                        <RadioGroupItem
                          value={value}
                          id={`packaging-${value}`}
                        />
                        <Label
                          htmlFor={`packaging-${value}`}
                          className="font-normal"
                        >
                          {label}
                        </Label>
                      </div>
                    )
                  )}
                </RadioGroup>
                {errors.packaging_type && (
                  <p className="text-sm text-destructive">
                    Pilih jenis kemasan
                  </p>
                )}
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="flex items-center justify-between">
                <Label htmlFor="water_conservation">
                  Menghemat Penggunaan Air?
                </Label>
                <Switch
                  id="water_conservation"
                  checked={watch("water_conservation")}
                  onCheckedChange={(v) => setValue("water_conservation", v)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="digital_operations">
                  Sudah Beralih ke Sistem Digital (Tanpa Kertas)?
                </Label>
                <Switch
                  id="digital_operations"
                  checked={watch("digital_operations")}
                  onCheckedChange={(v) => setValue("digital_operations", v)}
                />
              </div>

              <div className="space-y-3">
                <Label>
                  Transportasi Utama Bisnis (Pengiriman/Operasional)
                </Label>
                <RadioGroup
                  value={transportationType}
                  onValueChange={(v) =>
                    setValue("transportation_type", v as TransportationType)
                  }
                >
                  {Object.entries(TRANSPORTATION_TYPE_LABELS).map(
                    ([value, label]) => (
                      <div key={value} className="flex items-center gap-2">
                        <RadioGroupItem
                          value={value}
                          id={`transport-${value}`}
                        />
                        <Label
                          htmlFor={`transport-${value}`}
                          className="font-normal"
                        >
                          {label}
                        </Label>
                      </div>
                    )
                  )}
                </RadioGroup>
                {errors.transportation_type && (
                  <p className="text-sm text-destructive">
                    Pilih jenis transportasi
                  </p>
                )}
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <div className="flex items-center justify-between">
                <Label htmlFor="has_sustainability_policy">
                  Memiliki Kebijakan Ramah Lingkungan Tertulis?
                </Label>
                <Switch
                  id="has_sustainability_policy"
                  checked={watch("has_sustainability_policy")}
                  onCheckedChange={(v) =>
                    setValue("has_sustainability_policy", v)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="employee_sustainability_training">
                  Melatih Karyawan tentang Praktik Ramah Lingkungan?
                </Label>
                <Switch
                  id="employee_sustainability_training"
                  checked={watch("employee_sustainability_training")}
                  onCheckedChange={(v) =>
                    setValue("employee_sustainability_training", v)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="community_engagement">
                  Aktif Terlibat dalam Kegiatan Lingkungan Sekitar?
                </Label>
                <Switch
                  id="community_engagement"
                  checked={watch("community_engagement")}
                  onCheckedChange={(v) => setValue("community_engagement", v)}
                />
              </div>
            </>
          )}

          {step === 5 && showIndustryStep && (
            <IndustryQuestionsStep
              industry={industry}
              values={industryAnswers}
              onChange={(id, value) =>
                setIndustryAnswers((prev) => ({ ...prev, [id]: value }))
              }
            />
          )}
        </CardContent>

        <div className="flex items-center justify-between px-6 pb-6">
          <Button
            type="button"
            variant="outline"
            onClick={handlePrev}
            disabled={step === 0}
          >
            Sebelumnya
          </Button>

          {step < totalSteps - 1 ? (
            <Button type="button" onClick={handleNext}>
              Selanjutnya
            </Button>
          ) : (
            <Button type="submit">Kirim Assessment</Button>
          )}
        </div>
      </Card>
    </form>
  )
}
