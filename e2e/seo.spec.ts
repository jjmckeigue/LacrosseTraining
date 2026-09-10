import { expect, test } from "@playwright/test";
import { siteConfig } from "../lib/site-config";

const REAL_ROUTES = ["/", "/training", "/about", "/book", "/contact", "/privacy"];

test.describe("SEO fundamentals", () => {
  test("sitemap.xml lists exactly the real public routes", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.ok()).toBeTruthy();
    expect(response.headers()["content-type"]).toContain("xml");

    const body = await response.text();
    for (const route of REAL_ROUTES) {
      const expected = new URL(route, siteConfig.url).toString();
      expect(body).toContain(`<loc>${expected}</loc>`);
    }

    const locCount = (body.match(/<loc>/g) ?? []).length;
    expect(locCount).toBe(REAL_ROUTES.length);
  });

  test("robots.txt allows crawling and points to the sitemap", async ({ request }) => {
    const response = await request.get("/robots.txt");
    expect(response.ok()).toBeTruthy();

    const body = await response.text();
    expect(body).toContain("Allow: /");
    expect(body).toContain(`Sitemap: ${siteConfig.url}/sitemap.xml`);
  });

  test("homepage exposes minimal, accurate JSON-LD with no fabricated business facts", async ({
    page,
  }) => {
    await page.goto("/");

    const raw = await page.locator('script[type="application/ld+json"]').textContent();
    const data = JSON.parse(raw ?? "{}");

    expect(data["@type"]).toBe("Organization");
    expect(data.name).toBe(siteConfig.name);
    expect(data.url).toBe(siteConfig.url);
    expect(data.email).toBe(siteConfig.contact.email);

    // These would require facts the business doesn't have (a fixed
    // address, a phone number, real reviews, fixed hours). They must never
    // be fabricated just to fill out the schema.
    expect(data).not.toHaveProperty("address");
    expect(data).not.toHaveProperty("telephone");
    expect(data).not.toHaveProperty("aggregateRating");
    expect(data).not.toHaveProperty("review");
    expect(data).not.toHaveProperty("openingHours");
    expect(data).not.toHaveProperty("priceRange");
  });

  test("unknown routes render the branded 404 page", async ({ page }) => {
    const response = await page.goto("/this-route-does-not-exist");
    expect(response?.status()).toBe(404);

    // Header and footer also render nav/CTA links with overlapping names
    // (e.g. "Book Training"), so scope to the page's own main content.
    const main = page.getByRole("main");

    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "isn't on the schedule"
    );
    await expect(main.getByRole("link", { name: "Back to Home" })).toHaveAttribute(
      "href",
      "/"
    );
    await expect(
      main.getByRole("link", { name: "View Training Options" })
    ).toHaveAttribute("href", "/training");
    await expect(
      main.getByRole("link", { name: "Book Training" })
    ).toHaveAttribute("href", "/book");
  });
});
