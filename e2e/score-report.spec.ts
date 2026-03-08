import { test, expect } from "@playwright/test"

test.describe("Score Report", () => {
  test("score report page redirects unauthenticated", async ({ page }) => {
    await page.goto("/dashboard/score/report")
    await expect(page).toHaveURL(/login/)
  })

  test("SDG dashboard page redirects unauthenticated", async ({ page }) => {
    await page.goto("/dashboard/sdg")
    await expect(page).toHaveURL(/login/)
  })

  test("settings page redirects unauthenticated", async ({ page }) => {
    await page.goto("/dashboard/settings")
    await expect(page).toHaveURL(/login/)
  })

  test("help page redirects unauthenticated", async ({ page }) => {
    await page.goto("/dashboard/help")
    await expect(page).toHaveURL(/login/)
  })

  test("simulator page redirects unauthenticated", async ({ page }) => {
    await page.goto("/dashboard/simulator")
    await expect(page).toHaveURL(/login/)
  })

  test("compliance page redirects unauthenticated", async ({ page }) => {
    await page.goto("/dashboard/compliance")
    await expect(page).toHaveURL(/login/)
  })

  test("verify page loads for valid path", async ({ page }) => {
    await page.goto("/verify/test-token")
    // Should show verification page (may show "not found" for invalid token)
    await expect(page.locator("body")).toBeVisible()
  })
})
