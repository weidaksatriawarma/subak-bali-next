import { Document, Page, View, Text, Image } from "@react-pdf/renderer"
import { pdfStyles as s, PDF_COLORS, getScoreColor } from "./pdf-styles"
import { computeSDGScores, type CategoryScoresMap } from "@/lib/sdg"
import type {
  CarbonFootprint,
  RegulatoryCompliance,
  PotentialSavings,
} from "@/lib/carbon"
import type { RoadmapItem } from "@/types/database"

interface ScoreReportPDFProps {
  businessName: string
  industryLabel: string
  date: string
  totalScore: number
  energyScore: number
  wasteScore: number
  supplyChainScore: number
  operationsScore: number
  policyScore: number
  aiSummary: string | null
  industryBenchmark: number | null
  carbon: CarbonFootprint | null
  savings: PotentialSavings | null
  compliance: RegulatoryCompliance | null
  roadmapItems: RoadmapItem[]
  qrDataUrl: string | null
}

const CATEGORY_LABELS: Record<string, string> = {
  energy: "Energi",
  waste: "Limbah",
  supply_chain: "Rantai Pasok",
  operations: "Operasional",
  policy: "Kebijakan",
}

const PRIORITY_LABELS: Record<string, string> = {
  high: "Tinggi",
  medium: "Sedang",
  low: "Rendah",
}

function ScoreBar({ label, value }: { label: string; value: number }) {
  const color = getScoreColor(value)
  return (
    <View style={s.barContainer}>
      <Text style={s.barLabel}>
        {label} — {value}/100
      </Text>
      <View style={s.barTrack}>
        <View
          style={[s.barFill, { width: `${value}%`, backgroundColor: color }]}
        />
      </View>
    </View>
  )
}

export function ScoreReportPDF({
  businessName,
  industryLabel,
  date,
  totalScore,
  energyScore,
  wasteScore,
  supplyChainScore,
  operationsScore,
  policyScore,
  aiSummary,
  industryBenchmark,
  carbon,
  savings,
  compliance,
  roadmapItems,
  qrDataUrl,
}: ScoreReportPDFProps) {
  const categoryScores: CategoryScoresMap = {
    energy: energyScore,
    waste: wasteScore,
    supply_chain: supplyChainScore,
    operations: operationsScore,
    policy: policyScore,
  }

  const sdgResults = computeSDGScores(categoryScores)

  const summaryLines = aiSummary
    ? aiSummary.split("\n").filter((l) => l.trim())
    : []

  const topActions = roadmapItems.slice(0, 5)

  return (
    <Document>
      <Page size="A4" style={s.page}>
        {/* Header */}
        <View style={s.header}>
          <Text style={s.brandName}>SUBAK HIJAU</Text>
          <Text style={s.title}>Laporan Sustainability</Text>
          <Text style={s.subtitle}>
            {businessName} — {industryLabel}
          </Text>
          <Text style={s.dateText}>Tanggal: {date}</Text>
        </View>

        {/* Total Score */}
        <View style={s.scoreBox}>
          <Text
            style={{ fontSize: 9, color: PDF_COLORS.gray, marginBottom: 4 }}
          >
            SKOR TOTAL
          </Text>
          <Text style={s.bigScore}>
            {totalScore}
            <Text style={s.scoreUnit}>/100</Text>
          </Text>
        </View>

        {/* Category Breakdown */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Breakdown Kategori</Text>
          <ScoreBar label={CATEGORY_LABELS.energy} value={energyScore} />
          <ScoreBar label={CATEGORY_LABELS.waste} value={wasteScore} />
          <ScoreBar
            label={CATEGORY_LABELS.supply_chain}
            value={supplyChainScore}
          />
          <ScoreBar
            label={CATEGORY_LABELS.operations}
            value={operationsScore}
          />
          <ScoreBar label={CATEGORY_LABELS.policy} value={policyScore} />
        </View>

        {/* SDG Alignment */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Keselarasan SDGs</Text>
          <View style={s.sdgRow}>
            {sdgResults.map((sdg) => (
              <View
                key={sdg.number}
                style={[
                  s.sdgCircle,
                  {
                    backgroundColor: sdg.active
                      ? sdg.color
                      : PDF_COLORS.lightGray,
                  },
                ]}
              >
                <Text
                  style={[
                    s.sdgText,
                    { color: sdg.active ? "white" : PDF_COLORS.gray },
                  ]}
                >
                  {sdg.number}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Carbon Footprint Metrics */}
        {carbon && savings && compliance && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Jejak Karbon & Dampak Lingkungan</Text>
            <View style={s.metricsRow}>
              <View style={s.metricCard}>
                <Text style={[s.metricValue, { color: PDF_COLORS.green }]}>
                  {carbon.totalCO2.toLocaleString("id-ID")} kg
                </Text>
                <Text style={s.metricLabel}>CO2/tahun</Text>
              </View>
              <View style={s.metricCard}>
                <Text style={[s.metricValue, { color: PDF_COLORS.blue }]}>
                  Rp {(savings.monthlySavingsRp / 1_000_000).toFixed(1)} jt
                </Text>
                <Text style={s.metricLabel}>potensi hemat/bulan</Text>
              </View>
              <View style={s.metricCard}>
                <Text style={[s.metricValue, { color: PDF_COLORS.amber }]}>
                  {compliance.overallPercent}%
                </Text>
                <Text style={s.metricLabel}>{compliance.framework}</Text>
              </View>
            </View>
          </View>
        )}

        {/* Regulatory Compliance */}
        {compliance && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>
              Kepatuhan Regulasi ({compliance.framework})
            </Text>
            {compliance.met.length > 0 && (
              <View style={{ marginBottom: 4 }}>
                <Text
                  style={{
                    fontSize: 9,
                    fontWeight: "bold",
                    color: PDF_COLORS.green,
                    marginBottom: 2,
                  }}
                >
                  Terpenuhi ({compliance.met.length})
                </Text>
                {compliance.met.map((item) => (
                  <View key={item.id} style={s.complianceItem}>
                    <Text style={s.complianceIcon}>V</Text>
                    <Text style={s.complianceText}>{item.label}</Text>
                  </View>
                ))}
              </View>
            )}
            {compliance.unmet.length > 0 && (
              <View>
                <Text
                  style={{
                    fontSize: 9,
                    fontWeight: "bold",
                    color: PDF_COLORS.red,
                    marginBottom: 2,
                  }}
                >
                  Belum Terpenuhi ({compliance.unmet.length})
                </Text>
                {compliance.unmet.map((item) => (
                  <View key={item.id} style={s.complianceItem}>
                    <Text style={s.complianceIcon}>X</Text>
                    <Text style={s.complianceText}>{item.label}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}

        {/* AI Summary */}
        {summaryLines.length > 0 && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Analisis AI</Text>
            {summaryLines.map((line, i) => (
              <Text
                key={i}
                style={{
                  fontSize: 9,
                  color: PDF_COLORS.darkGray,
                  marginBottom: 4,
                  lineHeight: 1.5,
                }}
              >
                {line.trim()}
              </Text>
            ))}
          </View>
        )}

        {/* Industry Benchmark */}
        {industryBenchmark !== null && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Benchmark Industri</Text>
            <Text style={{ fontSize: 9, color: PDF_COLORS.darkGray }}>
              Rata-rata industri {industryLabel}: {industryBenchmark}/100
            </Text>
            <Text
              style={{
                fontSize: 9,
                fontWeight: "bold",
                color:
                  totalScore >= industryBenchmark
                    ? PDF_COLORS.green
                    : PDF_COLORS.red,
                marginTop: 2,
              }}
            >
              {totalScore >= industryBenchmark
                ? `+${totalScore - industryBenchmark} di atas rata-rata`
                : `${totalScore - industryBenchmark} di bawah rata-rata`}
            </Text>
          </View>
        )}

        {/* Top Roadmap Actions */}
        {topActions.length > 0 && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Rekomendasi Aksi</Text>
            {topActions.map((item, i) => (
              <View key={item.id} style={s.actionItem}>
                <Text style={s.actionNumber}>{i + 1}</Text>
                <View style={s.actionContent}>
                  <Text style={s.actionTitle}>{item.title}</Text>
                  <Text style={s.actionDesc}>{item.description}</Text>
                  <View style={{ flexDirection: "row", marginTop: 4 }}>
                    <Text style={s.badge}>
                      Prioritas:{" "}
                      {PRIORITY_LABELS[item.priority] ?? item.priority}
                    </Text>
                    {item.estimated_impact && (
                      <Text
                        style={[
                          s.badge,
                          {
                            backgroundColor: PDF_COLORS.blueBg,
                            color: PDF_COLORS.blueText,
                          },
                        ]}
                      >
                        Dampak:{" "}
                        {PRIORITY_LABELS[item.estimated_impact] ??
                          item.estimated_impact}
                      </Text>
                    )}
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Footer */}
        <View style={s.footer}>
          <Text style={s.footerText}>
            Subak Hijau — Laporan ini dibuat otomatis oleh AI. Data bersifat
            estimasi.
          </Text>
          {qrDataUrl && (
            <View style={{ alignItems: "center" }}>
              {/* eslint-disable-next-line jsx-a11y/alt-text -- react-pdf Image has no alt prop */}
              <Image src={qrDataUrl} style={{ width: 60, height: 60 }} />
              <Text
                style={{ fontSize: 6, color: PDF_COLORS.gray, marginTop: 2 }}
              >
                Scan untuk verifikasi
              </Text>
            </View>
          )}
        </View>
      </Page>
    </Document>
  )
}
