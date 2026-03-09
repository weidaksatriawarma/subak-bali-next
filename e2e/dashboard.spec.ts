import { test, expect } from "@playwright/test"

test.describe("Dashboard", () => {
  test("shows seeded business name", async ({ page }) => {
    await page.goto("/dashboard")
    await expect(page.getByText("Warung Hijau Bali")).toBeVisible()
  })

  test("score card displays score value", async ({ page }) => {
    await page.goto("/dashboard")
    // Score gauge or score card should show the seeded score (72)
    await expect(page.getByText("72")).toBeVisible()
  })

  test("quick actions section is visible", async ({ page }) => {
    await page.goto("/dashboard")
    const quickActions = page.locator("[data-tour='quick-actions']")
    await expect(quickActions).toBeVisible()
  })

  test("sidebar navigates to score page", async ({ page }) => {
    await page.goto("/dashboard")
    // Click score link in sidebar (desktop)
    const scoreLink = page.locator("a[href='/dashboard/score']").first()
    if (await scoreLink.isVisible()) {
      await scoreLink.click()
      await expect(page).toHaveURL(/\/dashboard\/score/)
    }
  })

  test("command palette opens on Ctrl+K", async ({ page }) => {
    await page.goto("/dashboard")
    await page.keyboard.press("Control+k")
    // Command palette dialog should appear
    const dialog = page.getByRole("dialog")
    await expect(dialog).toBeVisible({ timeout: 3000 })
  })

  test("keyboard shortcuts dialog opens on ?", async ({ page }) => {
    await page.goto("/dashboard")
    await page.keyboard.press("?")
    // Shortcuts dialog or overlay should appear
    const dialog = page.getByRole("dialog")
    await expect(dialog).toBeVisible({ timeout: 3000 })
  })

  test("dark mode toggles via d key", async ({ page }) => {
    await page.goto("/dashboard")
    const html = page.locator("html")
    const initialDark = await html.evaluate((el) =>
      el.classList.contains("dark")
    )
    await page.keyboard.press("d")
    await page.waitForTimeout(300)
    const afterToggle = await html.evaluate((el) =>
      el.classList.contains("dark")
    )
    expect(afterToggle).not.toBe(initialDark)
  })

  test("skip-to-content link and main-content target exist", async ({
    page,
  }) => {
    await page.goto("/dashboard")
    const skipLink = page.getByText("Langsung ke konten utama")
    await expect(skipLink).toBeAttached()
    const mainContent = page.locator("#main-content")
    await expect(mainContent).toBeAttached()
  })
})
