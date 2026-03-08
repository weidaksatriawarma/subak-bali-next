"use client"

import { useTranslation } from "@/lib/i18n/language-context"
import { computeSDGScores, type CategoryScoresMap } from "@/lib/sdg"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const SDG_TITLES: Record<number, { id: string; en: string }> = {
  6: { id: "Air Bersih dan Sanitasi", en: "Clean Water and Sanitation" },
  7: { id: "Energi Bersih dan Terjangkau", en: "Affordable and Clean Energy" },
  8: {
    id: "Pekerjaan Layak dan Pertumbuhan Ekonomi",
    en: "Decent Work and Economic Growth",
  },
  11: {
    id: "Kota dan Komunitas Berkelanjutan",
    en: "Sustainable Cities and Communities",
  },
  12: {
    id: "Konsumsi dan Produksi Bertanggung Jawab",
    en: "Responsible Consumption and Production",
  },
  13: { id: "Penanganan Perubahan Iklim", en: "Climate Action" },
}

export function SDGBadges({
  categoryScores,
}: {
  categoryScores: CategoryScoresMap
}) {
  const { locale, t } = useTranslation()
  const sdgResults = computeSDGScores(categoryScores)
  const d = t.dashboard.score.sdg

  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-sm font-semibold">{d.title}</h3>
        <p className="text-xs text-muted-foreground">{d.subtitle}</p>
      </div>
      <div className="flex flex-wrap gap-3">
        {sdgResults.map((sdg) => {
          const title = SDG_TITLES[sdg.number]
          const label = `SDG ${sdg.number}: ${locale === "en" ? title.en : title.id}`
          return (
            <Tooltip key={sdg.number}>
              <TooltipTrigger asChild>
                <div
                  className="flex size-14 items-center justify-center rounded-full border-2 text-sm font-bold transition-transform hover:scale-110"
                  style={{
                    backgroundColor: sdg.active ? sdg.color : undefined,
                    borderColor: sdg.active ? sdg.color : "var(--border)",
                    color: sdg.active ? "white" : "var(--muted-foreground)",
                    opacity: sdg.active ? 1 : 0.4,
                  }}
                >
                  {sdg.number}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="font-medium">{label}</p>
                <p className="text-xs">
                  {sdg.active ? d.active : d.inactive} ({sdg.avgScore}/100)
                </p>
              </TooltipContent>
            </Tooltip>
          )
        })}
      </div>
    </div>
  )
}
