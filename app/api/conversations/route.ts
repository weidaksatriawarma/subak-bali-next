import { NextResponse } from "next/server"
import { z } from "zod"
import { createClient } from "@/lib/supabase/server"
import { rateLimit, rateLimitResponse } from "@/lib/security"

const CreateConversationSchema = z.object({
  title: z.string().max(200).optional(),
})

export async function GET() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return new Response("Unauthorized", { status: 401 })
  }

  const { success } = rateLimit(`conversations:${user.id}`, {
    maxRequests: 30,
    windowMs: 60_000,
  })
  if (!success) return rateLimitResponse()

  const { data, error } = await supabase
    .from("chat_conversations")
    .select("*")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false })

  if (error) {
    return NextResponse.json(
      { error: "Gagal memuat percakapan" },
      { status: 500 }
    )
  }

  return NextResponse.json(data)
}

export async function POST(req: Request) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return new Response("Unauthorized", { status: 401 })
  }

  const { success } = rateLimit(`conversations:${user.id}`, {
    maxRequests: 30,
    windowMs: 60_000,
  })
  if (!success) return rateLimitResponse()

  let body
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }
  const parsed = CreateConversationSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }

  const { data, error } = await supabase
    .from("chat_conversations")
    .insert({
      user_id: user.id,
      title: parsed.data.title || "Percakapan Baru",
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json(
      { error: "Gagal membuat percakapan" },
      { status: 500 }
    )
  }

  return NextResponse.json(data)
}
