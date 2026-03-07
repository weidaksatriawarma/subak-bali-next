"use client"

import { useEffect, useState } from "react"
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
} from "lucide-react"
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
import type { Industry, BusinessSize, Profile } from "@/types/database"

const profileSchema = z.object({
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
  employee_count: z.number().min(1).optional(),
  location: z.string().optional(),
  description: z.string().optional(),
})

type ProfileFormValues = z.infer<typeof profileSchema>

export default function SettingsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [email, setEmail] = useState("")
  const [profile, setProfile] = useState<Profile | null>(null)

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
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
        .single<Profile>()

      if (data) {
        setProfile(data)
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
      toast.error("Gagal menyimpan perubahan")
      return
    }

    toast.success("Profil berhasil diperbarui")
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
    await supabase.auth.signOut()
    router.push("/login")
  }

  if (loading) {
    return (
      <div className="space-y-6 p-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-[400px] w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Pengaturan</h1>
        <p className="text-sm text-muted-foreground">
          Kelola profil bisnis dan akun Anda
        </p>
      </div>

      {/* Profil Bisnis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Profil Bisnis
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

              <div className="grid gap-4 sm:grid-cols-2">
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
                  {saving ? "Menyimpan..." : "Simpan Perubahan"}
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
            Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-muted-foreground">
            Ambil assessment ulang untuk memperbarui skor keberlanjutan Anda
            berdasarkan kondisi terkini.
          </p>
          <Button
            variant="outline"
            onClick={() => router.push("/dashboard/assessment")}
          >
            Ambil Assessment Ulang
          </Button>
        </CardContent>
      </Card>

      {/* Akun */}
      <Card>
        <CardHeader>
          <CardTitle>Akun</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="text-sm font-medium">{email}</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Keluar
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Hapus Akun
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Hapus Akun?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Tindakan ini tidak dapat dibatalkan. Semua data Anda akan
                    dihapus.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Batal</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteAccount}>
                    Ya, Hapus Akun
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
