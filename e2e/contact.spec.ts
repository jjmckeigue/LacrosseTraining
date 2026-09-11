import { expect, test } from "@playwright/test";
import { siteConfig } from "../lib/site-config";

test("contact page offers a direct mailto fallback", async ({ page }) => {
  await page.goto("/contact");

  // The footer also has a mailto link with the same address, so scope to
  // the page's own main content.
  const link = page
    .getByRole("main")
    .getByRole("link", { name: siteConfig.contact.email });
  await expect(link).toBeVisible();
  await expect(link).toHaveAttribute("href", `mailto:${siteConfig.contact.email}`);
});

test("contact page loads with expected heading and form fields", async ({
  page,
}) => {
  const response = await page.goto("/contact");
  expect(response?.ok()).toBeTruthy();

  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Questions before you book?"
  );

  await expect(page.getByLabel("Name")).toBeVisible();
  await expect(page.getByLabel("Email")).toBeVisible();
  await expect(page.getByLabel(/Phone/)).toBeVisible();
  await expect(page.getByLabel(/Reaching out about/)).toBeVisible();
  await expect(page.getByLabel("Message")).toBeVisible();

  await expect(
    page.getByRole("button", { name: "Send Message" })
  ).toBeVisible();
});

test("honeypot field exists but is unreachable and hidden from assistive tech", async ({
  page,
}) => {
  await page.goto("/contact");

  const honeypot = page.locator("#website");
  await expect(honeypot).toBeAttached();
  await expect(honeypot).toHaveAttribute("tabindex", "-1");

  // The wrapping `aria-hidden="true"` removes it from the accessibility
  // tree entirely, so it can't be found by its accessible name even though
  // it's technically present in the DOM.
  await expect(
    page.getByRole("textbox", { name: "Leave this field blank" })
  ).toHaveCount(0);
});

test("a submission with the honeypot filled returns the same generic success and sends nothing", async ({
  page,
}) => {
  await page.goto("/contact");
  const form = page.locator("form");

  await page.getByLabel("Name").fill("Bot Name");
  await page.getByLabel("Email").fill("bot@example.com");
  await page.getByLabel("Message").fill("This is an automated submission.");
  // Not reachable by a real visitor (hidden + unfocusable), but a script
  // filling every field on the form would hit it.
  await page.locator("#website").fill("http://spam.example");

  await page.getByRole("button", { name: "Send Message" }).click();

  // Same generic success message a real send would produce — an automated
  // client learns nothing about which layer (honeypot or BotID) caught it,
  // and this must not be the delivery-error path, which would mean the
  // honeypot check didn't short-circuit before Resend was ever attempted.
  const status = form.getByRole("status");
  await expect(status).toBeVisible();
  await expect(status).toContainText("Thanks for reaching out");
});

test("submitting with required fields empty does not send the form", async ({
  page,
}) => {
  await page.goto("/contact");
  const form = page.locator("form");

  await page.getByRole("button", { name: "Send Message" }).click();

  // Native `required` validation should block submission client-side, so
  // the Server Action never runs and no status message appears. (Next.js
  // itself renders an unrelated, always-present `role="alert"` route
  // announcer outside the form, so status queries are scoped to the form.)
  await expect(form.getByRole("alert")).toHaveCount(0);
  await expect(form.getByRole("status")).toHaveCount(0);
  await expect(page).toHaveURL(/\/contact$/);
});

test("a fully valid submission surfaces an accessible error when Resend isn't configured", async ({
  page,
}) => {
  await page.goto("/contact");
  const form = page.locator("form");

  await page.getByLabel("Name").fill("Test Parent");
  await page.getByLabel("Email").fill("test.parent@example.com");
  await page.getByLabel("Message").fill("Asking about small group scheduling.");

  await page.getByRole("button", { name: "Send Message" }).click();

  // CI and this test environment intentionally run without RESEND_API_KEY,
  // so a fully valid submission takes the deterministic delivery-error
  // path rather than actually sending mail.
  const alert = form.getByRole("alert");
  await expect(alert).toBeVisible();
  await expect(alert).toContainText("Something went wrong sending your message");
  await expect(alert).toBeFocused();

  // Controlled inputs must preserve what the visitor typed through an
  // error, not clear it.
  await expect(page.getByLabel("Name")).toHaveValue("Test Parent");
  await expect(page.getByLabel("Email")).toHaveValue("test.parent@example.com");
});

test("navigation marks Contact as the current page", async ({ page }) => {
  await page.goto("/contact");

  await expect(
    page
      .getByRole("navigation", { name: "Primary navigation" })
      .getByRole("link", { name: "Contact" })
  ).toHaveAttribute("aria-current", "page");
});

test("mobile: contact form is usable with no horizontal overflow", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/contact");

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth
  );
  expect(overflow).toBe(false);
});
