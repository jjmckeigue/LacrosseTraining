import { expect, test } from "@playwright/test";
import { bookingCta, primaryNav, siteConfig } from "../lib/site-config";

test.describe("Navigation and conversion audit", () => {
  test("footer navigation links resolve to the correct routes", async ({ page }) => {
    await page.goto("/");
    const footer = page.getByRole("contentinfo");

    for (const link of primaryNav) {
      await expect(
        footer.getByRole("link", { name: link.label, exact: true })
      ).toHaveAttribute("href", link.href);
    }

    await expect(
      footer.getByRole("link", { name: bookingCta.label })
    ).toHaveAttribute("href", bookingCta.href);
    await expect(
      footer.getByRole("link", { name: "Privacy Policy" })
    ).toHaveAttribute("href", "/privacy");
    await expect(
      footer.getByRole("link", { name: siteConfig.contact.email })
    ).toHaveAttribute("href", `mailto:${siteConfig.contact.email}`);
  });

  test("no placeholder links appear in the header or footer", async ({ page }) => {
    await page.goto("/");

    const hrefs = await page
      .locator("header a[href], footer a[href]")
      .evaluateAll((els) => els.map((el) => el.getAttribute("href")));

    expect(hrefs.length).toBeGreaterThan(0);
    for (const href of hrefs) {
      expect(href).not.toBe("#");
      expect(href?.trim()).not.toBe("");
    }
  });
});
