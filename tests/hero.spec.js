import { test, expect } from "@playwright/test";

test.describe("Hero", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("shows the redefine heading, trailer button, and first background video", async ({
    page,
  }) => {
    await expect(page.locator("#video-frame")).toBeVisible();
    await expect(page.locator("#video-frame h1", { hasText: "redefi" })).toBeVisible();

    const watchTrailer = page.locator("#watch-trailer");
    await expect(watchTrailer).toBeVisible();
    await expect(watchTrailer).toContainText(/watch trailer/i);

    const bgVideo = page.locator("#video-frame video").last();
    await expect(bgVideo).toHaveAttribute("src", /hero-1\.mp4/);
  });

  test("clicking the mini preview advances to the next hero video", async ({
    page,
  }) => {
    const trigger = page.getByTestId("mini-video-trigger");
    const bgVideo = page.locator("#video-frame video").last();
    const nextVideo = page.locator("#next-video");

    await expect(bgVideo).toHaveAttribute("src", /hero-1\.mp4/);

    await trigger.click();

    // The overlay video becomes visible and scales in over the old background video.
    await expect(nextVideo).toHaveCSS("visibility", "visible");
    // Once the click registers, currentIndex advances and the background video swaps underneath it.
    await expect(bgVideo).toHaveAttribute("src", /hero-2\.mp4/);
  });
});
