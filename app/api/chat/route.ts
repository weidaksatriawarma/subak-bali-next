import { streamText, UIMessage, convertToModelMessages, gateway } from "ai"
import { createClient } from "@/lib/supabase/server"
import { buildChatSystemPrompt } from "@/lib/ai/prompts"

export const maxDuration = 60

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

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

  const result = streamText({
    model: gateway("anthropic/claude-sonnet-4-20250514"),
    system: buildChatSystemPrompt(profile, score),
    messages: await convertToModelMessages(messages),
  })

  return result.toUIMessageStreamResponse()
}
