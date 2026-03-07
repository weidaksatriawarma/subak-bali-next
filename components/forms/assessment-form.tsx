"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm, type Resolver } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Loader2 } from "lucide-react"
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
import type {
  EnergySource,
  WasteManagement,
  PackagingType,
  TransportationType,
} from "@/types/database"

const assessmentSchema = z.object({
  energy_source: z.enum([
    "pln_only",
    "pln_solar",
    "solar_only",
    "diesel_generator",
  ]),
  monthly_electricity_kwh: z.coerce.number().min(0).optional(),
  uses_energy_efficient_equipment: z.boolean().default(false),
  waste_management: z.enum([
    "none",
    "segregation",
    "recycling",
    "composting",
    "circular",
  ]),
  plastic_reduction_efforts: z.boolean().default(false),
  waste_volume_kg_monthly: z.coerce.number().min(0).optional(),
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
  { title: "Kebijakan", description: "Kebijakan sustainability bisnis" },
]

export function AssessmentForm() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<AssessmentFormData>({
    resolver: zodResolver(assessmentSchema) as Resolver<AssessmentFormData>,
    defaultValues: {
      uses_energy_efficient_equipment: false,
      plastic_reduction_efforts: false,
      local_sourcing_percentage: 0,
      supplier_sustainability_check: false,
      water_conservation: false,
      digital_operations: false,
      has_sustainability_policy: false,
      employee_sustainability_training: false,
      community_engagement: false,
    },
  })

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

  async function handleNext() {
    const valid = await trigger(stepFields[step])
    if (valid) setStep((s) => Math.min(s + 1, STEPS.length - 1))
  }

  function handlePrev() {
    setStep((s) => Math.max(s - 1, 0))
  }

  async function onSubmit(formData: AssessmentFormData) {
    setIsSubmitting(true)
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
          ...formData,
        })
        .select()
        .single()

      if (error || !assessment) throw error

      const scoreRes = await fetch("/api/assessment/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assessment_id: assessment.id }),
      })

      if (!scoreRes.ok) {
        throw new Error("Gagal menghasilkan skor")
      }

      const roadmapRes = await fetch("/api/assessment/roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assessment_id: assessment.id }),
      })

      if (!roadmapRes.ok) {
        throw new Error("Gagal menghasilkan roadmap")
      }

      router.push("/dashboard/score")
    } catch (err) {
      setIsSubmitting(false)
      toast.error(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan. Silakan coba lagi."
      )
    }
  }

  const progressValue = ((step + 1) / STEPS.length) * 100

  if (isSubmitting) {
    return (
      <Card className="mx-auto max-w-2xl">
        <CardContent className="flex flex-col items-center gap-4 py-16">
          <Loader2 className="size-8 animate-spin text-primary" />
          <p className="text-lg font-medium">Menganalisis assessment Anda...</p>
          <p className="text-sm text-muted-foreground">
            AI sedang menghitung skor dan membuat roadmap sustainability
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-2xl">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>
                Langkah {step + 1}: {STEPS[step].title}
              </CardTitle>
              <CardDescription>{STEPS[step].description}</CardDescription>
            </div>
            <span className="text-sm text-muted-foreground">
              {step + 1}/{STEPS.length}
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
                  Mengecek Sustainability Supplier?
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
                <Label htmlFor="water_conservation">Konservasi Air?</Label>
                <Switch
                  id="water_conservation"
                  checked={watch("water_conservation")}
                  onCheckedChange={(v) => setValue("water_conservation", v)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="digital_operations">
                  Operasional Digital/Paperless?
                </Label>
                <Switch
                  id="digital_operations"
                  checked={watch("digital_operations")}
                  onCheckedChange={(v) => setValue("digital_operations", v)}
                />
              </div>

              <div className="space-y-3">
                <Label>Transportasi Utama</Label>
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
                  Memiliki Kebijakan Sustainability Tertulis?
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
                  Training Sustainability untuk Karyawan?
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
                  Keterlibatan dengan Komunitas/Lingkungan?
                </Label>
                <Switch
                  id="community_engagement"
                  checked={watch("community_engagement")}
                  onCheckedChange={(v) => setValue("community_engagement", v)}
                />
              </div>
            </>
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

          {step < STEPS.length - 1 ? (
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
