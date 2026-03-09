import { generateText, Output, gateway } from "ai"
import { z } from "zod"
import { createClient } from "@/lib/supabase/server"
import { RoadmapSchema } from "@/lib/ai/schemas"
import { buildRoadmapPrompt } from "@/lib/ai/prompts"
import { rateLimit, rateLimitResponse } from "@/lib/security"

const RoadmapRequestSchema = z.object({
  assessment_id: z.string().uuid(),
})

export const maxDuration = 60

export async function POST(req: Request) {
  const body = await req.json()
  const parsed = RoadmapRequestSchema.safeParse(body)
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
  const { success } = rateLimit(`roadmap:${user.id}`, {
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

  const { data: score } = await supabase
    .from("scores")
    .select("*")
    .eq("assessment_id", assessment_id)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .single()

  if (!score) {
    return Response.json(
      { error: "Score not found. Run assessment scoring first." },
      { status: 404 }
    )
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 55_000)

  let roadmapData
  try {
    const result = await generateText({
      model: gateway("anthropic/claude-sonnet-4-20250514"),
      output: Output.object({ schema: RoadmapSchema }),
      prompt: buildRoadmapPrompt(profile, score, assessment),
      abortSignal: controller.signal,
    })
    clearTimeout(timeout)
    roadmapData = result.output
  } catch (err) {
    clearTimeout(timeout)
    console.error("[roadmap] generation error:", err)
    return Response.json(
      {
        error:
          "Layanan AI sedang tidak tersedia. Silakan coba lagi dalam beberapa saat.",
      },
      { status: 503 }
    )
  }

  if (!roadmapData) {
    return Response.json(
      { error: "Failed to generate roadmap" },
      { status: 500 }
    )
  }

  const { data: roadmap, error: roadmapError } = await supabase
    .from("roadmaps")
    .insert({
      user_id: user.id,
      score_id: score.id,
      title: roadmapData.title,
      ai_generated_content: roadmapData,
    })
    .select()
    .single()

  if (roadmapError || !roadmap) {
    return Response.json(
      { error: roadmapError?.message ?? "Failed to save roadmap" },
      { status: 500 }
    )
  }

  const items = roadmapData.items.map((item, index) => ({
    roadmap_id: roadmap.id,
    user_id: user.id,
    title: item.title,
    description: item.description,
    category: item.category,
    priority: item.priority,
    estimated_impact: item.estimated_impact,
    estimated_cost: item.estimated_cost,
    timeline: item.timeline,
    sort_order: index,
    source: "ai_generated" as const,
    is_mandatory: true,
  }))

  const { error: itemsError } = await supabase
    .from("roadmap_items")
    .insert(items)

  if (itemsError) {
    return Response.json({ error: itemsError.message }, { status: 500 })
  }

  return Response.json({ roadmap, items: roadmapData.items })
}
