import { generateText, Output, gateway } from "ai"
import { z } from "zod"
import { createClient } from "@/lib/supabase/server"
import { ScoreSchema } from "@/lib/ai/schemas"
import { buildScorePrompt } from "@/lib/ai/prompts"
import { rateLimit, rateLimitResponse } from "@/lib/security"

const ScoreRequestSchema = z.object({
  assessment_id: z.string().uuid(),
})

export const maxDuration = 60

export async function POST(req: Request) {
  const body = await req.json()
  const parsed = ScoreRequestSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json({ error: "Invalid request body" }, { status: 400 })
  }
  const { assessment_id } = parsed.data

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Rate limit: 5 requests per minute per user
  const { success } = rateLimit(`score:${user.id}`, {
    maxRequests: 5,
    windowMs: 60_000,
  })
  if (!success) return rateLimitResponse()

  const [{ data: profile }, { data: assessment }] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).single(),
    supabase
      .from("assessments")
      .select("*")
      .eq("id", assessment_id)
      .eq("user_id", user.id)
      .single(),
  ])

  if (!profile || !assessment) {
    return Response.json({ error: "Not found" }, { status: 404 })
  }

  let scoreData
  try {
    const result = await generateText({
      model: gateway("anthropic/claude-sonnet-4-20250514"),
      output: Output.object({ schema: ScoreSchema }),
      prompt: buildScorePrompt(profile, assessment),
    })
    scoreData = result.output
  } catch {
    return Response.json(
      {
        error:
          "Layanan AI sedang tidak tersedia. Silakan coba lagi dalam beberapa saat.",
      },
      { status: 503 }
    )
  }

  if (!scoreData) {
    return Response.json({ error: "Failed to generate score" }, { status: 500 })
  }

  const { data: score, error } = await supabase
    .from("scores")
    .insert({
      user_id: user.id,
      assessment_id: assessment_id,
      total_score: scoreData.total_score,
      energy_score: scoreData.energy_score,
      waste_score: scoreData.waste_score,
      supply_chain_score: scoreData.supply_chain_score,
      operations_score: scoreData.operations_score,
      policy_score: scoreData.policy_score,
      ai_summary: scoreData.ai_summary,
      industry_benchmark: scoreData.industry_benchmark,
    })
    .select()
    .single()

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json(score)
}
