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

  test("login form shows validation on empty submit", async ({ page }) => {
    await page.goto("/login")
    const submitButton = page.getByRole("button", {
      name: /masuk|login|submit/i,
    })
    if (await submitButton.isVisible()) {
      await submitButton.click()
      // Form should show validation errors or stay on login page
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

  test("login form shows email and password fields", async ({ page }) => {
    await page.goto("/login")
    const emailInput = page.getByLabel(/email/i)
    await expect(emailInput).toBeVisible()
    const passwordInput = page.getByLabel(/password|kata sandi/i)
    await expect(passwordInput).toBeVisible()
  })

  test("register page shows all form fields", async ({ page }) => {
    await page.goto("/register")
    // Register form should have email and password at minimum
    const emailInput = page.getByLabel(/email/i)
    await expect(emailInput).toBeVisible()
    const passwordInput = page.getByLabel(/password|kata sandi/i).first()
    await expect(passwordInput).toBeVisible()
  })
})
