import { test, expect } from "@playwright/test"

test.describe("Assessment Flow", () => {
  test("score page renders gauge with score", async ({ page }) => {
    await page.goto("/dashboard/score")
    // Score gauge SVG should be present with the seeded score
    const gauge = page.locator("[role='img']").first()
    await expect(gauge).toBeVisible({ timeout: 10_000 })
    await expect(page.getByText("72")).toBeVisible()
  })

  test("score page shows AI summary text", async ({ page }) => {
    await page.goto("/dashboard/score")
    // AI summary from seeded data
    await expect(
      page.getByText(/transformasi luar biasa/i)
    ).toBeVisible({ timeout: 10_000 })
  })

  test("score page shows industry benchmark comparison", async ({ page }) => {
    await page.goto("/dashboard/score")
    // Benchmark section should exist with industry data
    await expect(
      page.getByText(/rata-rata|benchmark|industri/i).first()
    ).toBeVisible({ timeout: 10_000 })
  })

  test("roadmap page shows items with correct titles", async ({ page }) => {
    await page.goto("/dashboard/roadmap")
    // Seeded roadmap items should be visible
    await expect(
      page.getByText("Optimalkan penggunaan panel surya")
    ).toBeVisible({ timeout: 10_000 })
    await expect(
      page.getByText("Bangun area kompos terstruktur")
    ).toBeVisible()
  })

  test("roadmap progress shows completed items", async ({ page }) => {
    await page.goto("/dashboard/roadmap")
    // 4 out of 10 items are completed in seed data (40%)
    // Look for progress indicator or completion count
    await expect(page.getByText(/4/).first()).toBeVisible({ timeout: 10_000 })
  })

  test("carbon page loads and shows metrics", async ({ page }) => {
    await page.goto("/dashboard/carbon")
    // Carbon calculator page should load with CO₂ data
    await expect(
      page.getByText(/CO₂|karbon|carbon/i).first()
    ).toBeVisible({ timeout: 10_000 })
  })
})
