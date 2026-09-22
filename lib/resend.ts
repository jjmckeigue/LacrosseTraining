import "server-only";
import { Resend } from "resend";
import { contactTopicLabel, type ContactSubmission } from "@/lib/contact";
import { siteConfig } from "@/lib/site-config";

/**
 * Fixed sender/recipient. Visitor input never controls `from` or `to`; a
 * validated visitor email is used only as `replyTo`. Override the defaults
 * with real values once a verified Resend domain and business inbox exist.
 */
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "Legacy Lacrosse Training <onboarding@resend.dev>";
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || siteConfig.contact.email;

/**
 * Thrown with Resend's own error *category* (e.g. `invalid_api_key`,
 * `invalid_from_address`) as the message, never the free-text
 * `error.message`, which could echo request details. The category is a
 * fixed, finite code — safe to log — and is the difference between a
 * silent "something failed" and knowing which env var to check.
 */
export class ContactSendError extends Error {}

export async function sendContactNotification(submission: ContactSubmission): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new ContactSendError("missing_api_key");
  }

  const resend = new Resend(apiKey);
  const topicLabel = contactTopicLabel(submission.topic);

  const text = [
    `Name: ${submission.name}`,
    `Email: ${submission.email}`,
    `Phone: ${submission.phone || "Not provided"}`,
    `Reaching out about: ${topicLabel || "Not specified"}`,
    "",
    "Message:",
    submission.message,
  ].join("\n");

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: TO_EMAIL,
    replyTo: submission.email,
    subject: "New Legacy Lacrosse Training contact inquiry",
    text,
  });

  if (error) {
    throw new ContactSendError(error.name);
  }
}
