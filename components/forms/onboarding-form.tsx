"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { createClient } from "@/lib/supabase/client"
import { INDUSTRY_LABELS, BUSINESS_SIZE_LABELS } from "@/lib/constants"
import type { Industry, BusinessSize } from "@/types/database"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const onboardingSchema = z.object({
  business_name: z.string().min(2, "Nama bisnis minimal 2 karakter"),
  industry: z.enum([
    "fnb",
    "retail",
    "manufacturing",
    "services",
    "agriculture",
    "other",
  ]),
  business_size: z.enum(["micro", "small", "medium"]),
  employee_count: z.coerce.number().min(1).optional(),
  location: z.string().optional(),
  description: z.string().optional(),
})

type OnboardingFormValues = z.infer<typeof onboardingSchema>

const STEP_FIELDS: (keyof OnboardingFormValues)[][] = [
  ["business_name", "industry", "business_size"],
  ["employee_count", "location", "description"],
]

export function OnboardingForm() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [submitting, setSubmitting] = useState(false)

  const form = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      business_name: "",
      industry: undefined,
      business_size: undefined,
      employee_count: undefined,
      location: "",
      description: "",
    },
    mode: "onTouched",
  })

  async function handleNext() {
    const fields = STEP_FIELDS[step]
    if (fields) {
      const valid = await form.trigger(fields)
      if (!valid) return
    }
    setStep((s) => s + 1)
  }

  function handleBack() {
    setStep((s) => s - 1)
  }

  async function onSubmit(data: OnboardingFormValues) {
    setSubmitting(true)

    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      router.push("/login")
      return
    }

    const { error } = await supabase.from("profiles").insert({
      id: user.id,
      business_name: data.business_name,
      industry: data.industry,
      business_size: data.business_size,
      employee_count: data.employee_count || null,
      location: data.location || null,
      description: data.description || null,
    })

    if (error) {
      form.setError("root", { message: error.message })
      setSubmitting(false)
      return
    }

    router.push("/dashboard/assessment")
  }

  const progressValue = ((step + 1) / 3) * 100
  const values = form.watch()

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader className="space-y-4">
        <h1 className="text-center text-2xl font-bold">GreenAdvisor</h1>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Langkah {step + 1} dari 3</span>
            <span>{Math.round(progressValue)}%</span>
          </div>
          <Progress value={progressValue} />
          <div className="flex justify-between">
            {["Informasi Bisnis", "Detail Bisnis", "Konfirmasi"].map(
              (label, i) => (
                <div
                  key={label}
                  className="flex items-center gap-1.5 text-sm"
                >
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium ${
                      i <= step
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span
                    className={`hidden sm:inline ${
                      i <= step
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {label}
                  </span>
                </div>
              ),
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {form.formState.errors.root && (
              <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                {form.formState.errors.root.message}
              </div>
            )}

            {step === 0 && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="business_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Bisnis</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Contoh: Warung Makan Sederhana"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jenis Industri</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih jenis industri" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {(
                            Object.entries(INDUSTRY_LABELS) as [
                              Industry,
                              string,
                            ][]
                          ).map(([value, label]) => (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="business_size"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ukuran Bisnis</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih ukuran bisnis" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {(
                            Object.entries(BUSINESS_SIZE_LABELS) as [
                              BusinessSize,
                              string,
                            ][]
                          ).map(([value, label]) => (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="employee_count"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jumlah Karyawan</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          placeholder="Contoh: 10"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lokasi (Kota/Provinsi)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Contoh: Denpasar, Bali"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deskripsi Singkat Bisnis</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Ceritakan sedikit tentang bisnis Anda..."
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Konfirmasi Data</h2>
                <div className="rounded-lg border p-4 space-y-3">
                  <SummaryRow
                    label="Nama Bisnis"
                    value={values.business_name}
                  />
                  <SummaryRow
                    label="Jenis Industri"
                    value={
                      values.industry
                        ? INDUSTRY_LABELS[values.industry]
                        : "-"
                    }
                  />
                  <SummaryRow
                    label="Ukuran Bisnis"
                    value={
                      values.business_size
                        ? BUSINESS_SIZE_LABELS[values.business_size]
                        : "-"
                    }
                  />
                  <SummaryRow
                    label="Jumlah Karyawan"
                    value={
                      values.employee_count
                        ? String(values.employee_count)
                        : "-"
                    }
                  />
                  <SummaryRow
                    label="Lokasi"
                    value={values.location || "-"}
                  />
                  <SummaryRow
                    label="Deskripsi"
                    value={values.description || "-"}
                  />
                </div>
              </div>
            )}

            <div className="flex justify-between gap-3">
              {step > 0 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                >
                  Sebelumnya
                </Button>
              ) : (
                <div />
              )}

              {step < 2 ? (
                <Button type="button" onClick={handleNext}>
                  Selanjutnya
                </Button>
              ) : (
                <Button type="submit" disabled={submitting}>
                  {submitting ? "Menyimpan..." : "Mulai Assessment"}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-right">{value}</span>
    </div>
  )
}
