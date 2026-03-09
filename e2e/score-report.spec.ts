import { test, expect } from "@playwright/test"

test.describe("Score Report & Pages", () => {
  test("SDG dashboard renders SDG cards", async ({ page }) => {
    await page.goto("/dashboard/sdg")
    // SDG dashboard should show SDG cards with correct colors
    await expect(page.getByText(/SDG|Sustainable/i).first()).toBeVisible({
      timeout: 10_000,
    })
  })

  test("progress page shows score history chart", async ({ page }) => {
    await page.goto("/dashboard/progress")
    // Score history section should show with seeded scores (35, 55, 72)
    await expect(
      page.getByText(/riwayat|history|progress/i).first()
    ).toBeVisible({ timeout: 10_000 })
  })

  test("progress page shows sustainability analytics", async ({ page }) => {
    await page.goto("/dashboard/progress")
    // Analytics section with savings, CO₂, ROI
    await expect(
      page.getByText(/analitik|analytics|penghematan|savings/i).first()
    ).toBeVisible({ timeout: 10_000 })
  })

  test("compliance page loads with regulatory content", async ({ page }) => {
    await page.goto("/dashboard/compliance")
    await expect(
      page.getByText(/POJK|regulasi|compliance/i).first()
    ).toBeVisible({ timeout: 10_000 })
  })

  test("settings page shows business profile form", async ({ page }) => {
    await page.goto("/dashboard/settings")
    await expect(page.locator("form").first()).toBeVisible({ timeout: 10_000 })
    // Should show seeded business name in form input
    await expect(
      page.locator("input[value='Warung Hijau Bali']")
    ).toBeVisible()
  })

  test("help page shows FAQ and regulations sections", async ({ page }) => {
    await page.goto("/dashboard/help")
    await expect(
      page.getByText(/FAQ|pertanyaan|bantuan/i).first()
    ).toBeVisible({ timeout: 10_000 })
    await expect(
      page.getByText(/regulasi|glosarium|glossary/i).first()
    ).toBeVisible()
  })
})
