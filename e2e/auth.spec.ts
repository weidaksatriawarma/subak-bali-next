import { test, expect } from "@playwright/test"

test.describe("Auth Pages", () => {
  test("login page is accessible", async ({ page }) => {
    await page.goto("/login")
    await expect(page.locator("form")).toBeVisible()
  })

  test("register page is accessible", async ({ page }) => {
    await page.goto("/register")
    await expect(page.locator("form")).toBeVisible()
  })

  test("login form shows validation", async ({ page }) => {
    await page.goto("/login")
    const submitButton = page.getByRole("button", {
      name: /masuk|login|submit/i,
    })
    if (await submitButton.isVisible()) {
      await submitButton.click()
      // Form should show validation errors or not navigate away
      await expect(page).toHaveURL(/login/)
    }
  })

  test("dashboard redirects to login when unauthenticated", async ({
    page,
  }) => {
    await page.goto("/dashboard")
    await page.waitForURL(/login/)
    await expect(page).toHaveURL(/login/)
  })
})
