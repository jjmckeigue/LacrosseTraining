import { expect, test } from "@playwright/test";

test("privacy page loads with expected heading hierarchy and content", async ({
  page,
}) => {
  const response = await page.goto("/privacy");
  expect(response?.ok()).toBeTruthy();

  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Privacy Policy"
  );

  // Exactly one h1; sections below it are h2s, not skipping to h3.
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  const h2Count = await page.getByRole("heading", { level: 2 }).count();
  expect(h2Count).toBeGreaterThan(0);
  await expect(page.getByRole("heading", { level: 3 })).toHaveCount(0);

  await expect(page.getByText("Cal.com", { exact: false }).first()).toBeVisible();
  await expect(page.getByText("Resend", { exact: false }).first()).toBeVisible();
  await expect(page.getByText("Vercel", { exact: false }).first()).toBeVisible();
});

test("footer links to the privacy policy", async ({ page }) => {
  await page.goto("/");

  const link = page.getByRole("contentinfo").getByRole("link", {
    name: "Privacy Policy",
  });
  await expect(link).toHaveAttribute("href", "/privacy");

  await link.click();
  await expect(page).toHaveURL(/\/privacy$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Privacy Policy"
  );
});
