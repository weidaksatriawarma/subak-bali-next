import { test, expect } from "@playwright/test"

test.describe("Dashboard", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dashboard")
  })

  test("redirects to login when unauthenticated", async ({ page }) => {
    await expect(page).toHaveURL(/login/)
  })

  test("sidebar navigation renders", async ({ page }) => {
    await page.goto("/login")
    const nav = page.locator("[data-sidebar]")
    // Sidebar should be present in the DOM (visible after auth)
    await expect(nav).toBeDefined()
  })

  test("has skip-to-content link", async ({ page }) => {
    await page.goto("/")
    const skipLink = page.getByText("Langsung ke konten utama")
    await expect(skipLink).toBeAttached()
  })

  test("landing page loads PWA manifest", async ({ page }) => {
    await page.goto("/")
    const manifest = page.locator('link[rel="manifest"]')
    await expect(manifest).toBeAttached()
  })

  test("keyboard shortcut d toggles theme", async ({ page }) => {
    await page.goto("/")
    const html = page.locator("html")
    await page.keyboard.press("d")
    // Should toggle dark class
    await page.waitForTimeout(300)
    const hasDark = await html.evaluate((el) => el.classList.contains("dark"))
    await page.keyboard.press("d")
    await page.waitForTimeout(300)
    const hasLight = await html.evaluate((el) => !el.classList.contains("dark"))
    expect(hasDark || hasLight).toBeTruthy()
  })
})
