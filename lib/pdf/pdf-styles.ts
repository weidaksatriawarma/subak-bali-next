import { StyleSheet } from "@react-pdf/renderer"

export const pdfStyles = StyleSheet.create({
  page: { padding: 40, fontFamily: "Helvetica", fontSize: 10 },
  header: { textAlign: "center", marginBottom: 20 },
  brandName: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#16a34a",
    letterSpacing: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginTop: 4,
  },
  subtitle: { fontSize: 14, color: "#374151", marginTop: 4 },
  dateText: { fontSize: 9, color: "#6b7280", marginTop: 4 },
  section: { marginTop: 20 },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
  },
  scoreBox: {
    border: "1pt solid #d1d5db",
    borderRadius: 8,
    padding: 16,
    textAlign: "center",
    marginBottom: 16,
  },
  bigScore: { fontSize: 48, fontWeight: "bold", color: "#16a34a" },
  scoreUnit: { fontSize: 18, color: "#9ca3af" },
  barContainer: { marginBottom: 6 },
  barLabel: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 2,
  },
  barTrack: { height: 12, backgroundColor: "#e5e7eb", borderRadius: 6 },
  barFill: { height: 12, borderRadius: 6 },
  metricsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  metricCard: {
    width: "30%",
    textAlign: "center",
    padding: 8,
    border: "1pt solid #d1d5db",
    borderRadius: 6,
  },
  metricValue: { fontSize: 16, fontWeight: "bold" },
  metricLabel: { fontSize: 8, color: "#6b7280", marginTop: 2 },
  actionItem: {
    flexDirection: "row",
    marginBottom: 8,
    padding: 8,
    border: "1pt solid #e5e7eb",
    borderRadius: 6,
  },
  actionNumber: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#16a34a",
    color: "white",
    textAlign: "center",
    fontSize: 10,
    fontWeight: "bold",
    lineHeight: 1,
    paddingTop: 5,
  },
  actionContent: { marginLeft: 8, flex: 1 },
  actionTitle: { fontSize: 10, fontWeight: "bold", color: "#111827" },
  actionDesc: { fontSize: 8, color: "#6b7280", marginTop: 2 },
  badge: {
    fontSize: 7,
    color: "#166534",
    backgroundColor: "#dcfce7",
    padding: "2 6",
    borderRadius: 8,
    marginRight: 4,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerText: { fontSize: 8, color: "#9ca3af" },
  sdgCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  sdgText: { fontSize: 10, fontWeight: "bold", color: "white" },
  sdgRow: { flexDirection: "row", gap: 8, flexWrap: "wrap" },
  complianceItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
  },
  complianceIcon: { fontSize: 8, marginRight: 4 },
  complianceText: { fontSize: 8, color: "#374151" },
})

export const PDF_COLORS = {
  green: "#16a34a",
  red: "#dc2626",
  blue: "#2563eb",
  amber: "#d97706",
  gray: "#6b7280",
  darkGray: "#374151",
  darkest: "#111827",
  lightGray: "#e5e7eb",
  greenBg: "#dcfce7",
  greenText: "#166534",
  blueBg: "#dbeafe",
  blueText: "#1e40af",
}

export function getScoreColor(score: number): string {
  if (score >= 80) return "#16a34a"
  if (score >= 60) return "#65a30d"
  if (score >= 40) return "#ca8a04"
  return "#dc2626"
}
