import { test as setup, expect } from "@playwright/test"

const authFile = "playwright/.auth/user.json"

setup("authenticate and seed data", async ({ page }) => {
  // Navigate to login
  await page.goto("/login")
  await expect(page.locator("form")).toBeVisible()

  // Fill credentials from environment variables
  const email = process.env.TEST_USER_EMAIL
  const password = process.env.TEST_USER_PASSWORD

  if (!email || !password) {
    throw new Error(
      "TEST_USER_EMAIL and TEST_USER_PASSWORD env vars are required"
    )
  }

  await page.getByLabel(/email/i).fill(email)
  await page.getByLabel(/password|kata sandi/i).fill(password)
  await page.getByRole("button", { name: /masuk|login|submit/i }).click()

  // Wait for redirect to dashboard
  await page.waitForURL(/dashboard/, { timeout: 15_000 })
  await expect(page).toHaveURL(/dashboard/)

  // Seed demo data
  const seedSecret = process.env.SEED_SECRET
  const seedBody = seedSecret ? { secret: seedSecret } : {}

  const response = await page.request.post("/api/seed", {
    data: seedBody,
  })

  if (response.ok()) {
    const data = await response.json()
    console.log("[setup] Seed complete:", data.data)
  } else {
    console.warn("[setup] Seed skipped or failed:", response.status())
  }

  // Save authenticated state
  await page.context().storageState({ path: authFile })
})
