import { expect, test } from "@playwright/test";
import { siteConfig } from "../lib/site-config";

test("about page loads with expected heading and coach background", async ({
  page,
}) => {
  const response = await page.goto("/about");
  expect(response?.ok()).toBeTruthy();

  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    siteConfig.coach.name
  );

  await expect(
    page.getByText("NCAA Division III varsity goalie", { exact: false }).first()
  ).toBeVisible();
  await expect(page.getByText("Hanover College", { exact: false }).first()).toBeVisible();

  await expect(
    page.getByRole("link", { name: "Book Training" }).first()
  ).toBeVisible();
  await expect(
    page.getByRole("img", { name: `${siteConfig.coach.name} professional headshot` })
  ).toBeVisible();
});

test("navigation marks About as the current page", async ({ page }) => {
  await page.goto("/about");

  await expect(
    page
      .getByRole("navigation", { name: "Primary navigation" })
      .getByRole("link", { name: "About" })
  ).toHaveAttribute("aria-current", "page");
});
