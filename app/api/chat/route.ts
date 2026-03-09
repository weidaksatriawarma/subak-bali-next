import {
  streamText,
  UIMessage,
  convertToModelMessages,
  gateway,
  stepCountIs,
} from "ai"
import { z } from "zod"
import { createClient } from "@/lib/supabase/server"
import { buildChatSystemPrompt } from "@/lib/ai/prompts"
import { createChatTools } from "@/lib/ai/tools"
import { rateLimit, rateLimitResponse } from "@/lib/security"
import type { Assessment } from "@/types/database"

const ChatRequestSchema = z.object({
  messages: z.array(z.any()).min(1),
  conversationId: z.string().uuid().optional(),
})

export const maxDuration = 60

export async function POST(req: Request) {
  const body = await req.json()
  const parsed = ChatRequestSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json({ error: "Invalid request body" }, { status: 400 })
  }
  const { messages, conversationId } = parsed.data as {
    messages: UIMessage[]
    conversationId?: string
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return new Response("Unauthorized", { status: 401 })
  }

  // Rate limit: 20 requests per minute per user
  const { success } = rateLimit(`chat:${user.id}`, {
    maxRequests: 20,
    windowMs: 60_000,
  })
  if (!success) return rateLimitResponse()

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  const [{ data: score }, { data: assessment }] = await Promise.all([
    supabase
      .from("scores")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .single(),
    supabase
      .from("assessments")
      .select("*")
      .eq("user_id", user.id)
      .eq("status", "completed")
      .order("created_at", { ascending: false })
      .limit(1)
      .single<Assessment>(),
  ])

  if (!profile) {
    return new Response("Profile not found", { status: 404 })
  }

  // Verify conversation ownership
  if (conversationId) {
    const { data: conv } = await supabase
      .from("chat_conversations")
      .select("id")
      .eq("id", conversationId)
      .eq("user_id", user.id)
      .single()

    if (!conv) {
      return Response.json({ error: "Conversation not found" }, { status: 404 })
    }
  }

  // Persist user message
  const lastUserMessage = [...messages].reverse().find((m) => m.role === "user")
  if (conversationId && lastUserMessage) {
    const textPart = lastUserMessage.parts?.find((p) => p.type === "text")
    if (textPart && textPart.type === "text") {
      await supabase.from("chat_messages").insert({
        conversation_id: conversationId,
        user_id: user.id,
        role: "user",
        content: textPart.text,
      })
    }
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 55_000)

  try {
    const result = streamText({
      model: gateway("anthropic/claude-sonnet-4-20250514"),
      system: buildChatSystemPrompt(profile, score),
      messages: await convertToModelMessages(messages),
      tools: createChatTools(assessment),
      stopWhen: stepCountIs(3),
      abortSignal: controller.signal,
      onError({ error }) {
        console.error("[chat] streaming error:", error)
      },
      async onFinish({ text }) {
        clearTimeout(timeout)
        if (conversationId && text) {
          await supabase.from("chat_messages").insert({
            conversation_id: conversationId,
            user_id: user.id,
            role: "assistant",
            content: text,
          })

          await supabase
            .from("chat_conversations")
            .update({ updated_at: new Date().toISOString() })
            .eq("id", conversationId)
        }
      },
    })

    return result.toUIMessageStreamResponse()
  } catch {
    clearTimeout(timeout)
    return new Response(
      "Layanan AI sedang tidak tersedia. Silakan coba lagi dalam beberapa saat.",
      { status: 503 }
    )
  }
}
