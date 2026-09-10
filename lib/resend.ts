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

export async function sendContactNotification(submission: ContactSubmission): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
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
    throw new Error(error.message);
  }
}
