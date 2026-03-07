import { streamText, UIMessage, convertToModelMessages, gateway } from "ai"
import { createClient } from "@/lib/supabase/server"
import { buildChatSystemPrompt } from "@/lib/ai/prompts"

export const maxDuration = 60

export async function POST(req: Request) {
  const {
    messages,
    conversationId,
  }: { messages: UIMessage[]; conversationId?: string } = await req.json()

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return new Response("Unauthorized", { status: 401 })
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  const { data: score } = await supabase
    .from("scores")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .single()

  if (!profile) {
    return new Response("Profile not found", { status: 404 })
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

  const result = streamText({
    model: gateway("anthropic/claude-sonnet-4-20250514"),
    system: buildChatSystemPrompt(profile, score),
    messages: await convertToModelMessages(messages),
    async onFinish({ text }) {
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
}
