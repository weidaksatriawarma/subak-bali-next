import { test, expect } from "@playwright/test"

test.describe("Assessment Flow", () => {
  test("assessment page redirects unauthenticated users", async ({ page }) => {
    await page.goto("/dashboard/assessment")
    await expect(page).toHaveURL(/login/)
  })

  test("score page redirects unauthenticated users", async ({ page }) => {
    await page.goto("/dashboard/score")
    await expect(page).toHaveURL(/login/)
  })

  test("roadmap page redirects unauthenticated users", async ({ page }) => {
    await page.goto("/dashboard/roadmap")
    await expect(page).toHaveURL(/login/)
  })

  test("chat page redirects unauthenticated users", async ({ page }) => {
    await page.goto("/dashboard/chat")
    await expect(page).toHaveURL(/login/)
  })

  test("carbon page redirects unauthenticated users", async ({ page }) => {
    await page.goto("/dashboard/carbon")
    await expect(page).toHaveURL(/login/)
  })

  test("progress page redirects unauthenticated users", async ({ page }) => {
    await page.goto("/dashboard/progress")
    await expect(page).toHaveURL(/login/)
  })
})
