import { expect, test } from "@playwright/test";
import { services } from "../lib/services";

test("book route loads and shows the service-selection experience by default", async ({
  page,
}) => {
  const response = await page.goto("/book");
  expect(response?.ok()).toBeTruthy();

  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Choose a training format."
  );

  for (const service of services) {
    await expect(
      page.getByRole("link", { name: new RegExp(service.name) })
    ).toBeVisible();
  }

  // No service selected yet, so no scheduler should be mounted.
  await expect(page.locator("iframe")).toHaveCount(0);
});

for (const service of services) {
  test(`/book?service=${service.slug} preselects ${service.name}`, async ({
    page,
  }) => {
    await page.goto(`/book?service=${service.slug}`);

    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      service.name
    );
    await expect(
      page.getByRole("link", { name: new RegExp(service.name) })
    ).toHaveAttribute("aria-current", "true");

    // Selected-service summary is visible.
    await expect(
      page.getByRole("heading", { level: 2, name: service.name })
    ).toBeVisible();
    await expect(
      page.getByText(`${service.athleteCount}`, { exact: false }).first()
    ).toBeVisible();

    // The scheduler mounts only for the selected format.
    await expect(page.locator("iframe")).toHaveCount(1);
  });
}

test("an invalid service query value falls back to the selection state", async ({
  page,
}) => {
  await page.goto("/book?service=does-not-exist");

  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Choose a training format."
  );
  await expect(page.locator("iframe")).toHaveCount(0);
});

test("navigation marks Book Training as the current page", async ({
  page,
}) => {
  await page.goto("/book");

  await expect(
    page
      .getByRole("navigation", { name: "Primary navigation" })
      .getByRole("link", { name: "Book Training" })
  ).toHaveAttribute("aria-current", "page");
});

test("Training page CTAs preserve the selected service", async ({ page }) => {
  await page.goto("/training");

  for (const service of services) {
    const link = page.locator(`#${service.slug}`).getByRole("link", {
      name: "Book Training",
    });
    await expect(link).toHaveAttribute("href", `/book?service=${service.slug}`);
  }
});

test("mobile: service selection is usable with no horizontal overflow", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/book");

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth
  );
  expect(overflow).toBe(false);

  await page.getByRole("link", { name: /Partner Training/ }).click();
  await expect(page).toHaveURL(/service=partner/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Partner Training"
  );

  const overflowAfterSelect = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth
  );
  expect(overflowAfterSelect).toBe(false);
});
