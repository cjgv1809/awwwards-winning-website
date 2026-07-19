import { test, expect } from "@playwright/test";

test.describe("About - scroll-triggered animations", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("animated title words fade in and un-rotate once scrolled into view", async ({
    page,
  }) => {
    const firstWord = page.locator("#about .animated-word").first();

    // Off-screen at load: GSAP starts these at opacity 0, rotated in 3D.
    await expect(firstWord).toHaveCSS("opacity", "0");

    await firstWord.scrollIntoViewIfNeeded();
    // Give the ScrollTrigger-driven timeline time to play (short duration, no scrub).
    await expect(firstWord).toHaveCSS("opacity", "1", { timeout: 5000 });
  });

  test("the about image expands to fill the viewport while the section is pinned", async ({
    page,
  }) => {
    const mask = page.locator("#clip .mask-clip-path");
    const initialBox = await mask.boundingBox();

    const clipBox = await page.locator("#clip").boundingBox();
    const viewportHeight = page.viewportSize().height;

    // Scroll well past the pinned section's start + its 800px scrub range.
    await page.mouse.wheel(0, clipBox.y + clipBox.height + viewportHeight);
    await page.waitForTimeout(1000);

    const expandedBox = await mask.boundingBox();

    expect(expandedBox.width).toBeGreaterThan(initialBox.width);
    expect(expandedBox.width).toBeGreaterThan(
      page.viewportSize().width * 0.9
    );
  });
});
