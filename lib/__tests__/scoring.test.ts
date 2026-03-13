import { describe, it, expect } from "vitest"
import {
  getScoreLabelInfo,
  getScoreColor,
  getScoreBgColor,
  getScoreFeedback,
} from "@/lib/constants"

describe("getScoreLabelInfo", () => {
  it("returns 'Benih Kecil' for score 0", () => {
    expect(getScoreLabelInfo(0).label).toBe("Benih Kecil")
  })

  it("returns 'Benih Kecil' for score 19", () => {
    expect(getScoreLabelInfo(19).label).toBe("Benih Kecil")
  })

  it("returns 'Tunas Muda' for score 20", () => {
    expect(getScoreLabelInfo(20).label).toBe("Tunas Muda")
  })

  it("returns 'Tunas Muda' for score 39", () => {
    expect(getScoreLabelInfo(39).label).toBe("Tunas Muda")
  })

  it("returns 'Pohon yang Tumbuh' for score 40", () => {
    expect(getScoreLabelInfo(40).label).toBe("Pohon yang Tumbuh")
  })

  it("returns 'Pohon yang Tumbuh' for score 59", () => {
    expect(getScoreLabelInfo(59).label).toBe("Pohon yang Tumbuh")
  })

  it("returns 'Pohon Rindang' for score 60", () => {
    expect(getScoreLabelInfo(60).label).toBe("Pohon Rindang")
  })

  it("returns 'Pohon Rindang' for score 79", () => {
    expect(getScoreLabelInfo(79).label).toBe("Pohon Rindang")
  })

  it("returns 'Hutan Lestari' for score 80", () => {
    expect(getScoreLabelInfo(80).label).toBe("Hutan Lestari")
  })

  it("returns 'Hutan Lestari' for score 100", () => {
    expect(getScoreLabelInfo(100).label).toBe("Hutan Lestari")
  })

  it("returns correct icon color for each tier", () => {
    expect(getScoreLabelInfo(0).iconColor).toBe("text-red-500")
    expect(getScoreLabelInfo(20).iconColor).toBe("text-orange-500")
    expect(getScoreLabelInfo(40).iconColor).toBe("text-yellow-500")
    expect(getScoreLabelInfo(60).iconColor).toBe("text-green-500")
    expect(getScoreLabelInfo(80).iconColor).toBe("text-emerald-500")
  })

  it("returns correct background color for each tier", () => {
    expect(getScoreLabelInfo(0).color).toContain("bg-red")
    expect(getScoreLabelInfo(20).color).toContain("bg-orange")
    expect(getScoreLabelInfo(40).color).toContain("bg-yellow")
    expect(getScoreLabelInfo(60).color).toContain("bg-green")
    expect(getScoreLabelInfo(80).color).toContain("bg-emerald")
  })

  it("returns a description for each tier", () => {
    expect(getScoreLabelInfo(0).description).toBeTruthy()
    expect(getScoreLabelInfo(30).description).toBeTruthy()
    expect(getScoreLabelInfo(50).description).toBeTruthy()
    expect(getScoreLabelInfo(70).description).toBeTruthy()
    expect(getScoreLabelInfo(90).description).toBeTruthy()
  })
})

describe("getScoreColor", () => {
  it("returns red for scores below 30", () => {
    expect(getScoreColor(0)).toBe("text-red-500")
    expect(getScoreColor(29)).toBe("text-red-500")
  })

  it("returns orange for scores 30-59", () => {
    expect(getScoreColor(30)).toBe("text-orange-500")
    expect(getScoreColor(59)).toBe("text-orange-500")
  })

  it("returns green for scores 60+", () => {
    expect(getScoreColor(60)).toBe("text-green-500")
    expect(getScoreColor(100)).toBe("text-green-500")
  })
})

describe("getScoreBgColor", () => {
  it("returns bg-red for scores below 30", () => {
    expect(getScoreBgColor(0)).toBe("bg-gradient-to-r from-red-500 to-red-400")
    expect(getScoreBgColor(29)).toBe(
      "bg-gradient-to-r from-red-500 to-red-400"
    )
  })

  it("returns bg-orange for scores 30-59", () => {
    expect(getScoreBgColor(30)).toBe(
      "bg-gradient-to-r from-orange-500 to-amber-400"
    )
    expect(getScoreBgColor(59)).toBe(
      "bg-gradient-to-r from-orange-500 to-amber-400"
    )
  })

  it("returns bg-green for scores 60+", () => {
    expect(getScoreBgColor(60)).toBe(
      "bg-gradient-to-r from-green-500 to-emerald-400"
    )
    expect(getScoreBgColor(100)).toBe(
      "bg-gradient-to-r from-green-500 to-emerald-400"
    )
  })
})

describe("getScoreFeedback", () => {
  it("returns 'Perlu usaha lagi' for scores below 30", () => {
    expect(getScoreFeedback(0)).toBe("Perlu usaha lagi")
    expect(getScoreFeedback(29)).toBe("Perlu usaha lagi")
  })

  it("returns 'Lumayan!' for scores 30-59", () => {
    expect(getScoreFeedback(30)).toBe("Lumayan!")
    expect(getScoreFeedback(59)).toBe("Lumayan!")
  })

  it("returns 'Bagus!' for scores 60-79", () => {
    expect(getScoreFeedback(60)).toBe("Bagus!")
    expect(getScoreFeedback(79)).toBe("Bagus!")
  })

  it("returns 'Keren banget!' for scores 80+", () => {
    expect(getScoreFeedback(80)).toBe("Keren banget!")
    expect(getScoreFeedback(100)).toBe("Keren banget!")
  })
})
