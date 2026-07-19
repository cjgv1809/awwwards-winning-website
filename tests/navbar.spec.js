import { test, expect } from "@playwright/test";

test.describe("Navbar", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders all nav links pointing to the right sections", async ({
    page,
  }) => {
    const items = ["Nexus", "Vault", "Prologue", "About", "Contact"];

    for (const item of items) {
      const link = page.getByRole("link", { name: item });
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute("href", `#${item.toLowerCase()}`);
    }
  });

  test("toggling audio plays the loop and activates the indicator bars", async ({
    page,
  }) => {
    const audioToggle = page.getByTestId("audio-toggle");
    const audio = page.locator("audio");

    await expect(audio).toHaveJSProperty("paused", true);

    await audioToggle.click();
    await expect(audio).toHaveJSProperty("paused", false);
    await expect(audioToggle.locator(".indicator-line").first()).toHaveClass(
      /active/
    );

    // Once active, the bars run a perpetual CSS animation (indicator-line
    // 0.5s infinite), so they never pass Playwright's stability check —
    // force the click instead of waiting for a stillness that never comes.
    await audioToggle.click({ force: true });
    await expect(audio).toHaveJSProperty("paused", true);
    await expect(audioToggle.locator(".indicator-line").first()).not.toHaveClass(
      /active/
    );
  });

  test("hides on scroll down, reappears floating on scroll up", async ({
    page,
  }) => {
    const nav = page.getByTestId("navbar");

    // At the very top: visible, no floating background.
    await expect(nav).not.toHaveClass(/floating-nav/);

    // Scroll down past the hero: nav slides away and gains the floating style.
    await page.evaluate(() => window.scrollTo(0, 900));
    await expect(nav).toHaveClass(/floating-nav/);
    await expect(nav).toHaveCSS("opacity", "0");

    // Scroll back up a bit: nav reappears, keeps the floating pill background.
    await page.evaluate(() => window.scrollTo(0, 400));
    await expect(nav).toHaveClass(/floating-nav/);
    await expect(nav).toHaveCSS("opacity", "1");

    // Back to the very top: floating style is dropped again.
    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(nav).not.toHaveClass(/floating-nav/);
  });
});
