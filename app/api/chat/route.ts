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
import {
  rateLimit,
  rateLimitResponse,
  validateOrigin,
  logError,
} from "@/lib/security"
import type { Assessment, ToolPartData } from "@/types/database"

const ChatRequestSchema = z.object({
  messages: z
    .array(
      z
        .object({
          role: z.enum(["user", "assistant", "system"]),
          parts: z
            .array(
              z
                .object({
                  type: z.string(),
                  text: z.string().max(10_000).optional(),
                })
                .passthrough()
            )
            .optional(),
          content: z.string().max(10_000).optional(),
          id: z.string().optional(),
        })
        .passthrough()
    )
    .min(1)
    .max(50),
  conversationId: z.string().uuid().nullish(),
  locale: z.enum(["id", "en"]).default("id"),
})

export const maxDuration = 60

export async function POST(req: Request) {
  let body
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 })
  }
  if (!validateOrigin(req)) {
    return Response.json({ error: "Forbidden" }, { status: 403 })
  }

  const parsed = ChatRequestSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json({ error: "Invalid request body" }, { status: 400 })
  }
  const { messages, conversationId, locale } = parsed.data as unknown as {
    messages: UIMessage[]
    conversationId?: string | null
    locale: "id" | "en"
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
    return Response.json({ error: "Not found" }, { status: 404 })
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
      system: buildChatSystemPrompt(profile, score, locale),
      messages: await convertToModelMessages(messages),
      tools: createChatTools(assessment, locale),
      stopWhen: stepCountIs(3),
      abortSignal: controller.signal,
      onError({ error }) {
        logError("chat-stream", error)
      },
      async onFinish({ text, steps }) {
        clearTimeout(timeout)
        if (conversationId) {
          const toolParts: ToolPartData[] = []
          for (const step of steps) {
            for (const tr of step.toolResults) {
              toolParts.push({
                toolName: tr.toolName,
                toolCallId: tr.toolCallId,
                input: tr.input as Record<string, unknown>,
                output: tr.output as Record<string, unknown>,
              })
            }
          }

          if (text || toolParts.length > 0) {
            await supabase.from("chat_messages").insert({
              conversation_id: conversationId,
              user_id: user.id,
              role: "assistant",
              content: text || "",
              tool_parts: toolParts.length > 0 ? toolParts : null,
            })
          }

          await supabase
            .from("chat_conversations")
            .update({ updated_at: new Date().toISOString() })
            .eq("id", conversationId)
        }
      },
    })

    return result.toUIMessageStreamResponse()
  } catch (err) {
    clearTimeout(timeout)
    logError("chat", err)
    return new Response(
      locale === "en"
        ? "AI service is temporarily unavailable. Please try again shortly."
        : "Layanan AI sedang tidak tersedia. Silakan coba lagi dalam beberapa saat.",
      { status: 503 }
    )
  }
}
