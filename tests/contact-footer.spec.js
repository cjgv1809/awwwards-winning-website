import { test, expect } from "@playwright/test";

test.describe("Contact", () => {
  test("shows the CTA title and contact button", async ({ page }) => {
    await page.goto("/");
    const contact = page.locator("#contact");

    await contact.scrollIntoViewIfNeeded();

    await expect(contact.getByText(/join zentry/i)).toBeVisible();
    await expect(contact.getByRole("button", { name: /contact us/i })).toBeVisible();
  });
});

test.describe("Footer", () => {
  test("shows copyright, social links, and privacy policy", async ({
    page,
  }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    await footer.scrollIntoViewIfNeeded();

    await expect(footer.getByText(/all rights reserved/i)).toBeVisible();
    await expect(footer.getByRole("link", { name: /privacy policy/i })).toBeVisible();

    const socialLinks = footer.locator("a[target=_blank]");
    await expect(socialLinks).toHaveCount(4);

    for (const link of await socialLinks.all()) {
      await expect(link).toHaveAttribute("rel", "noopener noreferrer");
      await expect(link).toHaveAttribute("href", /^https:\/\//);
    }
  });
});
