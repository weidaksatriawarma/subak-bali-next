export type Industry =
  | "fnb"
  | "retail"
  | "manufacturing"
  | "services"
  | "agriculture"
  | "other"

export type BusinessSize = "micro" | "small" | "medium"

export type AssessmentStatus = "draft" | "completed"

export type EnergySource =
  | "pln_only"
  | "pln_solar"
  | "solar_only"
  | "diesel_generator"

export type WasteManagement =
  | "none"
  | "segregation"
  | "recycling"
  | "composting"
  | "circular"

export type PackagingType =
  | "single_use_plastic"
  | "recyclable"
  | "biodegradable"
  | "reusable"

export type TransportationType =
  | "gasoline"
  | "electric"
  | "hybrid"
  | "bicycle"
  | "none"

export type Category =
  | "energy"
  | "waste"
  | "supply_chain"
  | "operations"
  | "policy"

export type Priority = "high" | "medium" | "low"

export type EstimatedImpact = "high" | "medium" | "low"

export type EstimatedCost = "free" | "low" | "medium" | "high"

export type Timeline = "1_week" | "1_month" | "3_months" | "6_months" | "1_year"

export type RoadmapItemSource = "ai_generated" | "manual" | "ai_chat"

export interface Profile {
  id: string
  business_name: string
  industry: Industry
  business_size: BusinessSize
  employee_count: number | null
  location: string | null
  description: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export interface Assessment {
  id: string
  user_id: string
  status: AssessmentStatus
  energy_source: EnergySource | null
  monthly_electricity_kwh: number | null
  uses_energy_efficient_equipment: boolean
  waste_management: WasteManagement | null
  plastic_reduction_efforts: boolean
  waste_volume_kg_monthly: number | null
  local_sourcing_percentage: number | null
  supplier_sustainability_check: boolean
  packaging_type: PackagingType | null
  water_conservation: boolean
  digital_operations: boolean
  transportation_type: TransportationType | null
  has_sustainability_policy: boolean
  employee_sustainability_training: boolean
  community_engagement: boolean
  industry_answers?: Record<string, unknown> | null
  created_at: string
  updated_at: string
}

export interface Score {
  id: string
  user_id: string
  assessment_id: string
  total_score: number
  energy_score: number
  waste_score: number
  supply_chain_score: number
  operations_score: number
  policy_score: number
  ai_summary: string | null
  industry_benchmark: number | null
  certificate_token?: string
  created_at: string
}

export interface Roadmap {
  id: string
  user_id: string
  score_id: string
  title: string
  ai_generated_content: unknown
  created_at: string
}

export interface RoadmapItem {
  id: string
  roadmap_id: string
  user_id: string
  title: string
  description: string
  category: Category
  priority: Priority
  estimated_impact: EstimatedImpact | null
  estimated_cost: EstimatedCost | null
  timeline: Timeline | null
  is_completed: boolean
  completed_at: string | null
  sort_order: number
  source: RoadmapItemSource
  is_mandatory: boolean
  created_at: string
}

export interface ChatConversation {
  id: string
  user_id: string
  title: string
  created_at: string
  updated_at: string
}

export interface ChatMessage {
  id: string
  conversation_id: string
  user_id: string
  role: "user" | "assistant"
  content: string
  created_at: string
}
