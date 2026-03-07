import { generateText, Output, gateway } from "ai"
import { createClient } from "@/lib/supabase/server"
import { RoadmapSchema } from "@/lib/ai/schemas"
import { buildRoadmapPrompt } from "@/lib/ai/prompts"

export const maxDuration = 60

export async function POST(req: Request) {
  const { assessment_id } = await req.json()

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

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
      { status: 404 },
    )
  }

  const result = await generateText({
    model: gateway("anthropic/claude-sonnet-4-20250514"),
    output: Output.object({ schema: RoadmapSchema }),
    prompt: buildRoadmapPrompt(profile, score, assessment),
  })

  const roadmapData = result.output

  if (!roadmapData) {
    return Response.json(
      { error: "Failed to generate roadmap" },
      { status: 500 },
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
      { status: 500 },
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
  }))

  const { error: itemsError } = await supabase
    .from("roadmap_items")
    .insert(items)

  if (itemsError) {
    return Response.json({ error: itemsError.message }, { status: 500 })
  }

  return Response.json({ roadmap, items: roadmapData.items })
}
