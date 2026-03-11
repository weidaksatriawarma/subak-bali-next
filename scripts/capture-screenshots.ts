import { test } from "@playwright/test"
import { mkdirSync } from "fs"
import { join } from "path"

const BASE_URL = process.env.BASE_URL || "http://localhost:3000"
const SEED_EMAIL = process.env.SEED_EMAIL || ""
const SEED_PASSWORD = process.env.SEED_PASSWORD || ""
const SCREENSHOTS_DIR = join(__dirname, "..", "screenshots")

test.beforeAll(() => {
  mkdirSync(SCREENSHOTS_DIR, { recursive: true })
})

test.use({
  viewport: { width: 1280, height: 720 },
})

test.describe("Public pages", () => {
  test("capture landing page", async ({ page }) => {
    await page.goto(`${BASE_URL}/`)
    await page.waitForLoadState("networkidle")
    await page.waitForTimeout(1500)

    await page.screenshot({
      path: join(SCREENSHOTS_DIR, "landing.png"),
      fullPage: false,
    })
  })
})

test.describe("Authenticated pages", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to login page
    await page.goto(`${BASE_URL}/login`)
    await page.waitForLoadState("networkidle")

    // Fill in credentials
    await page.fill('input[type="email"]', SEED_EMAIL)
    await page.fill('input[type="password"]', SEED_PASSWORD)

    // Click login button
    await page.click('button[type="submit"]')

    // Wait for navigation to dashboard
    await page.waitForURL(`${BASE_URL}/dashboard**`, { timeout: 15000 })
    await page.waitForLoadState("networkidle")
  })

  test("capture dashboard page", async ({ page }) => {
    await page.goto(`${BASE_URL}/dashboard`)
    await page.waitForLoadState("networkidle")
    await page.waitForTimeout(2000)

    await page.screenshot({
      path: join(SCREENSHOTS_DIR, "dashboard.png"),
      fullPage: false,
    })
  })

  test("capture chat page", async ({ page }) => {
    await page.goto(`${BASE_URL}/dashboard/chat`)
    await page.waitForLoadState("networkidle")
    await page.waitForTimeout(2000)

    await page.screenshot({
      path: join(SCREENSHOTS_DIR, "chat.png"),
      fullPage: false,
    })
  })

  test("capture score page", async ({ page }) => {
    await page.goto(`${BASE_URL}/dashboard/score`)
    await page.waitForLoadState("networkidle")
    await page.waitForTimeout(2000)

    await page.screenshot({
      path: join(SCREENSHOTS_DIR, "score.png"),
      fullPage: false,
    })
  })

  test("capture carbon page", async ({ page }) => {
    await page.goto(`${BASE_URL}/dashboard/carbon`)
    await page.waitForLoadState("networkidle")
    await page.waitForTimeout(2000)

    await page.screenshot({
      path: join(SCREENSHOTS_DIR, "carbon.png"),
      fullPage: false,
    })
  })

  test("capture roadmap page", async ({ page }) => {
    await page.goto(`${BASE_URL}/dashboard/roadmap`)
    await page.waitForLoadState("networkidle")
    await page.waitForTimeout(2000)

    await page.screenshot({
      path: join(SCREENSHOTS_DIR, "roadmap.png"),
      fullPage: false,
    })
  })
})
