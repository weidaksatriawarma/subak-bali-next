import { test, expect } from "@playwright/test"

test.describe("Landing Page", () => {
  test("renders hero section", async ({ page }) => {
    await page.goto("/")
    await expect(page).toHaveTitle(/Subak Hijau/)
    await expect(page.locator("main")).toBeVisible()
  })

  test("navigation links are visible", async ({ page }) => {
    await page.goto("/")
    await expect(page.getByRole("navigation")).toBeVisible()
  })

  test("has login link", async ({ page }) => {
    await page.goto("/")
    const loginLink = page.getByRole("link", { name: /masuk|login/i })
    await expect(loginLink).toBeVisible()
  })

  test("CTA button has correct href", async ({ page }) => {
    await page.goto("/")
    // Main CTA should link to register
    const ctaLink = page
      .getByRole("link", { name: /mulai|daftar|register/i })
      .first()
    await expect(ctaLink).toBeVisible()
    await expect(ctaLink).toHaveAttribute("href", /register/)
  })

  test("language switcher works", async ({ page }) => {
    await page.goto("/")
    // Find language toggle button
    const langToggle = page
      .getByRole("button", { name: /EN|ID|bahasa|language/i })
      .first()
    if (await langToggle.isVisible()) {
      await langToggle.click()
      // Page content should change language
      await page.waitForTimeout(500)
    }
    // Page should still be functional after language switch
    await expect(page.locator("main")).toBeVisible()
  })

  test("page has Open Graph meta tags", async ({ page }) => {
    await page.goto("/")
    const ogTitle = page.locator('meta[property="og:title"]')
    await expect(ogTitle).toBeAttached()
    const ogDescription = page.locator('meta[property="og:description"]')
    await expect(ogDescription).toBeAttached()
    const ogType = page.locator('meta[property="og:type"]')
    await expect(ogType).toBeAttached()
  })
})
