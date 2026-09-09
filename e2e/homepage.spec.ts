import { expect, test } from "@playwright/test";

test("homepage renders hero, nav, and primary CTA", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Coaching built for the crease."
  );
  await expect(
    page.getByRole("navigation", { name: "Primary navigation" })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Book Training" }).first()
  ).toBeVisible();
});

test("mobile menu opens, exposes current nav state, and closes on Escape", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const toggle = page.getByRole("button", { name: "Open menu" });
  const mobileNav = page.getByRole("navigation", { name: "Mobile navigation" });

  await expect(mobileNav).toBeHidden();
  await toggle.click();
  await expect(mobileNav).toBeVisible();
  await expect(mobileNav.getByRole("link", { name: "Home" })).toHaveAttribute(
    "aria-current",
    "page"
  );

  await page.keyboard.press("Escape");
  await expect(mobileNav).toBeHidden();
});

test("skip link moves focus to main content", async ({ page }) => {
  await page.goto("/");

  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main-content$/);
});
