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
  await expect(
    page.getByRole("img", {
      name: "Collegiate lacrosse goalie leaping to deflect a shot near the goal",
    })
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

test("training page communicates the full girls'/boys' and women's/men's audience", async ({
  page,
}) => {
  await page.goto("/training");

  await expect(
    page.getByRole("heading", { level: 2, name: "Goalie development at every stage." })
  ).toBeVisible();

  const main = page.getByRole("main");
  await expect(
    main.getByText(
      "Training is open to girls' and women's goalies and boys' and men's goalies alike.",
      { exact: false }
    )
  ).toBeVisible();

  // Youth / High School / College are h3s nested under the "Who We Train" h2.
  for (const stage of ["Youth Goalies", "High School Goalies", "College Goalies"]) {
    await expect(main.getByRole("heading", { level: 3, name: stage })).toBeVisible();
  }
});

test("the goalie-room CTA links to Contact", async ({ page }) => {
  await page.goto("/training");

  const main = page.getByRole("main");
  await expect(
    main.getByText("Looking for position-specific work for your goalie room?", {
      exact: false,
    })
  ).toBeVisible();
  await expect(main.getByRole("link", { name: "Reach out" })).toHaveAttribute(
    "href",
    "/contact"
  );
});

test("mobile: training page is usable with no horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/training");

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth
  );
  expect(overflow).toBe(false);
});
