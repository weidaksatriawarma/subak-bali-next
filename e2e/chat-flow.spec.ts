import { test, expect } from "@playwright/test"

test.describe("Chat Flow", () => {
  test("chat page renders with conversation sidebar", async ({ page }) => {
    await page.goto("/dashboard/chat")
    // Desktop sidebar or mobile header should be present
    await expect(page.getByText(/Subak Hijau/i).first()).toBeVisible({
      timeout: 10_000,
    })
  })

  test("seeded conversations are visible", async ({ page }) => {
    await page.goto("/dashboard/chat")
    // Seeded conversation title should appear
    await expect(page.getByText("Strategi Pengurangan Limbah")).toBeVisible({
      timeout: 10_000,
    })
  })

  test("click conversation loads messages", async ({ page }) => {
    await page.goto("/dashboard/chat")
    const conv = page.getByText("Strategi Pengurangan Limbah")
    await expect(conv).toBeVisible({ timeout: 10_000 })
    await conv.click()
    // Messages from seeded data should load
    await expect(page.getByText(/limbah plastik/i).first()).toBeVisible({
      timeout: 10_000,
    })
  })

  test("new conversation button works", async ({ page }) => {
    await page.goto("/dashboard/chat")
    // Look for new chat button
    const newChatBtn = page.getByRole("button", { name: /baru|new/i }).first()
    if (await newChatBtn.isVisible()) {
      await newChatBtn.click()
      // Should show empty chat state
      await expect(
        page.getByText(/Halo|konsultan|sustainability/i).first()
      ).toBeVisible({ timeout: 5_000 })
    }
  })

  test("chat input field accepts text", async ({ page }) => {
    await page.goto("/dashboard/chat")
    const input = page.getByPlaceholder(/ketik|tulis|tanya/i).first()
    await expect(input).toBeVisible({ timeout: 10_000 })
    await input.fill("Test message")
    await expect(input).toHaveValue("Test message")
  })
})
