import { expect, test } from "@playwright/test";
import { services } from "../lib/services";

test("training page loads with expected heading and offerings", async ({
  page,
}) => {
  const response = await page.goto("/training");
  expect(response?.ok()).toBeTruthy();

  await expect(
    page.getByRole("heading", { level: 1 })
  ).toContainText("Three ways to train. One standard of coaching.");

  for (const service of services) {
    await expect(
      page.getByRole("heading", { name: service.name }).first()
    ).toBeVisible();
  }

  await expect(
    page.getByRole("link", { name: "Book Training" }).first()
  ).toBeVisible();
});

test("navigation marks Training as the current page", async ({ page }) => {
  await page.goto("/training");

  await expect(
    page
      .getByRole("navigation", { name: "Primary navigation" })
      .getByRole("link", { name: "Training", exact: true })
  ).toHaveAttribute("aria-current", "page");
});
