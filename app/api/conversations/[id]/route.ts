import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { rateLimit, rateLimitResponse, validateOrigin } from "@/lib/security"
import { auditLog } from "@/lib/audit"

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return new Response("Unauthorized", { status: 401 })
  }

  const { success } = rateLimit(`conversation:${user.id}`, {
    maxRequests: 30,
    windowMs: 60_000,
  })
  if (!success) return rateLimitResponse()

  const { data: conversation, error: convError } = await supabase
    .from("chat_conversations")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single()

  if (convError || !conversation) {
    return new Response("Not found", { status: 404 })
  }

  const { data: messages, error: msgError } = await supabase
    .from("chat_messages")
    .select("*")
    .eq("conversation_id", id)
    .order("created_at", { ascending: true })

  if (msgError) {
    return NextResponse.json({ error: "Gagal memuat pesan" }, { status: 500 })
  }

  return NextResponse.json({ conversation, messages })
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!validateOrigin(req)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const { id } = await params
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return new Response("Unauthorized", { status: 401 })
  }

  const { success } = rateLimit(`conversation:${user.id}`, {
    maxRequests: 30,
    windowMs: 60_000,
  })
  if (!success) return rateLimitResponse()

  // Verify ownership BEFORE deleting anything
  const { data: conversation } = await supabase
    .from("chat_conversations")
    .select("id")
    .eq("id", id)
    .eq("user_id", user.id)
    .single()

  if (!conversation) {
    return new Response("Not found", { status: 404 })
  }

  auditLog({
    action: "conversation_delete",
    userId: user.id,
    resourceType: "conversation",
    resourceId: id,
  })

  // Delete messages first, then conversation
  await supabase.from("chat_messages").delete().eq("conversation_id", id)

  const { error } = await supabase
    .from("chat_conversations")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id)

  if (error) {
    return NextResponse.json(
      { error: "Gagal menghapus percakapan" },
      { status: 500 }
    )
  }

  return new Response(null, { status: 204 })
}
