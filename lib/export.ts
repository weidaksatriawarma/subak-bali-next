import type { RoadmapItem } from "@/types/database"
import {
  CATEGORY_LABELS,
  PRIORITY_LABELS,
  IMPACT_LABELS,
  COST_LABELS,
  TIMELINE_LABELS,
} from "@/lib/constants"

export function exportToCSV(
  rows: Record<string, string | number>[],
  filename: string
): void {
  if (rows.length === 0) return

  const headers = Object.keys(rows[0])

  const csvLines = [
    headers.map(escapeCSVField).join(","),
    ...rows.map((row) =>
      headers.map((h) => escapeCSVField(String(row[h] ?? ""))).join(",")
    ),
  ]

  const csvString = "\uFEFF" + csvLines.join("\n")
  const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)

  const link = document.createElement("a")
  link.href = url
  link.download = filename
  link.style.display = "none"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

function escapeCSVField(value: string): string {
  if (
    value.includes(",") ||
    value.includes('"') ||
    value.includes("\n") ||
    value.includes("\r")
  ) {
    return '"' + value.replace(/"/g, '""') + '"'
  }
  return value
}

export function formatRoadmapForExport(
  items: RoadmapItem[]
): Record<string, string | number>[] {
  return items.map((item, index) => ({
    No: index + 1,
    Judul: item.title,
    Deskripsi: item.description,
    Kategori: CATEGORY_LABELS[item.category],
    Prioritas: PRIORITY_LABELS[item.priority],
    Dampak: item.estimated_impact ? IMPACT_LABELS[item.estimated_impact] : "-",
    Biaya: item.estimated_cost ? COST_LABELS[item.estimated_cost] : "-",
    Timeline: item.timeline ? TIMELINE_LABELS[item.timeline] : "-",
    Status: item.is_completed ? "Selesai" : "Belum",
    "Tanggal Selesai": item.completed_at
      ? new Date(item.completed_at).toLocaleDateString("id-ID", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "-",
  }))
}

export function formatScoresForExport(
  scores: {
    total_score: number
    energy_score: number
    waste_score: number
    supply_chain_score: number
    operations_score: number
    policy_score: number
    created_at: string
  }[]
): Record<string, string | number>[] {
  return scores.map((score) => ({
    Tanggal: new Date(score.created_at).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    "Skor Total": score.total_score,
    Energi: score.energy_score,
    Limbah: score.waste_score,
    "Rantai Pasok": score.supply_chain_score,
    Operasional: score.operations_score,
    Kebijakan: score.policy_score,
  }))
}
