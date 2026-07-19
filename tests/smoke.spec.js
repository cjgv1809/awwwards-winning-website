import { test, expect } from "@playwright/test";

test.describe("Smoke", () => {
  test("loads the homepage without runtime errors and renders all sections", async ({
    page,
  }) => {
    const pageErrors = [];
    page.on("pageerror", (err) => pageErrors.push(err.message));

    await page.goto("/");

    await expect(page).toHaveTitle(/Zentry/i);

    // One representative element per section, in page order.
    await expect(page.locator("#video-frame")).toBeVisible();
    await expect(page.locator("#about")).toBeVisible();
    await expect(page.locator("text=Into the Metagame Layer")).toBeVisible();
    await expect(page.locator("#story")).toBeVisible();
    await expect(page.locator("#contact")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();

    expect(pageErrors, `Unexpected JS errors: ${pageErrors.join(", ")}`).toEqual(
      []
    );
  });
});
