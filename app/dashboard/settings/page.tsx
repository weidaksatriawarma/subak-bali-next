"use client"

import { useEffect, useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import {
  Settings,
  LogOut,
  Trash2,
  ClipboardList,
  Cookie,
  HelpCircle,
} from "lucide-react"
import { useTour } from "@/hooks/use-tour"
import { useTranslation } from "@/lib/i18n/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { INDUSTRY_LABELS, BUSINESS_SIZE_LABELS } from "@/lib/constants"
import { useCookieConsent } from "@/hooks/use-cookie-consent"
import type { Industry, BusinessSize } from "@/types/database"
import type { Resolver } from "react-hook-form"

function getProfileSchema(validationMsg: string) {
  return z.object({
    business_name: z.string().min(2, validationMsg),
    industry: z.enum([
      "fnb",
      "retail",
      "manufacturing",
      "services",
      "agriculture",
      "other",
    ]),
    business_size: z.enum(["micro", "small", "medium"]),
    employee_count: z.number().min(1).optional(),
    location: z.string().optional(),
    description: z.string().optional(),
  })
}

type ProfileFormValues = z.infer<ReturnType<typeof getProfileSchema>>

export default function SettingsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [email, setEmail] = useState("")
  const { details, acceptSelected } = useCookieConsent()
  const { resetTour } = useTour()
  const { t } = useTranslation()
  const s = t.dashboard.settings

  const profileSchema = useMemo(
    () => getProfileSchema(s.validationBusinessName),
    [s.validationBusinessName]
  )

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema) as Resolver<ProfileFormValues>,
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

  useEffect(() => {
    document.title = "Pengaturan | Subak Hijau"
  }, [])

  useEffect(() => {
    async function fetchProfile() {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      setEmail(user.email || "")

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single()

      if (data) {
        form.reset({
          business_name: data.business_name,
          industry: data.industry,
          business_size: data.business_size,
          employee_count: data.employee_count ?? undefined,
          location: data.location ?? "",
          description: data.description ?? "",
        })
      }

      setLoading(false)
    }
    fetchProfile()
  }, [form])

  async function onSubmit(values: ProfileFormValues) {
    setSaving(true)
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    const { error } = await supabase
      .from("profiles")
      .update({
        business_name: values.business_name,
        industry: values.industry,
        business_size: values.business_size,
        employee_count: values.employee_count || null,
        location: values.location || null,
        description: values.description || null,
      })
      .eq("id", user.id)

    setSaving(false)

    if (error) {
      toast.error(s.saveError)
      return
    }

    toast.success(s.saveSuccess)
  }

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/login")
  }

  async function handleDeleteAccount() {
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    // Delete profile (cascades to related data via RLS)
    await supabase.from("profiles").delete().eq("id", user.id)

    // Delete auth user record via Edge Function or admin API
    // Note: Client-side cannot delete auth.users directly.
    // For now, sign out and notify. A Supabase Edge Function should handle full deletion.
    await supabase.auth.signOut()
    router.push("/login")
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-[400px] w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{s.title}</h1>
        <p className="text-sm text-muted-foreground">{s.subtitle}</p>
      </div>

      {/* Profil Bisnis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            {s.businessProfile}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {form.formState.errors.root && (
                <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                  {form.formState.errors.root.message}
                </div>
              )}

              <FormField
                control={form.control}
                name="business_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{s.businessName}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={s.businessNamePlaceholder}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{s.industryType}</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder={s.industryPlaceholder} />
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
                      <FormLabel>{s.businessSize}</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue
                              placeholder={s.businessSizePlaceholder}
                            />
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

              <FormField
                control={form.control}
                name="employee_count"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{s.employeeCount}</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        placeholder={s.employeePlaceholder}
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
                    <FormLabel>{s.location}</FormLabel>
                    <FormControl>
                      <Input placeholder={s.locationPlaceholder} {...field} />
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
                    <FormLabel>{s.description}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={s.descriptionPlaceholder}
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button type="submit" disabled={saving}>
                  {saving ? s.saving : s.saveChanges}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5" />
            {s.assessment}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-muted-foreground">
            {s.assessmentDesc}
          </p>
          <Button
            variant="outline"
            onClick={() => router.push("/dashboard/assessment")}
          >
            {s.retakeAssessment}
          </Button>
        </CardContent>
      </Card>

      {/* Preferensi Cookie */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cookie className="h-5 w-5" />
            {s.cookiePreferences}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">{s.cookieDesc}</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">{s.cookieEssentialLabel}</p>
              <p className="text-xs text-muted-foreground">
                {s.cookieEssentialDesc}
              </p>
            </div>
            <Switch checked disabled />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">{s.cookieFunctionalLabel}</p>
              <p className="text-xs text-muted-foreground">
                {s.cookieFunctionalDesc}
              </p>
            </div>
            <Switch
              checked={details?.functional ?? false}
              onCheckedChange={(v) =>
                acceptSelected({
                  functional: v,
                  analytics: details?.analytics ?? false,
                })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">{s.cookieAnalyticsLabel}</p>
              <p className="text-xs text-muted-foreground">
                {s.cookieAnalyticsDesc}
              </p>
            </div>
            <Switch
              checked={details?.analytics ?? false}
              onCheckedChange={(v) =>
                acceptSelected({
                  functional: details?.functional ?? false,
                  analytics: v,
                })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Bantuan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            {s.helpTitle}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-muted-foreground">{s.helpDesc}</p>
          <Button
            variant="outline"
            onClick={() => {
              resetTour()
              router.push("/dashboard")
            }}
          >
            {s.startTour}
          </Button>
        </CardContent>
      </Card>

      {/* Akun */}
      <Card>
        <CardHeader>
          <CardTitle>{s.account}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">{s.email}</p>
            <p className="text-sm font-medium">{email}</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              {s.signOut}
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  {s.deleteAccount}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{s.deleteAccountTitle}</AlertDialogTitle>
                  <AlertDialogDescription>
                    {s.deleteAccountDesc}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>{s.cancelBtn}</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteAccount}>
                    {s.confirmDelete}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
