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
})
