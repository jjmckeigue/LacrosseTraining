"use server";

import { checkBotId } from "botid/server";
import { validateContactSubmission, type ContactField } from "@/lib/contact";
import { sendContactNotification } from "@/lib/resend";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Partial<Record<ContactField, string>>;
};

const SUCCESS_MESSAGE = "Thanks for reaching out. We'll get back to you soon.";
const GENERIC_ERROR_MESSAGE =
  "Something went wrong sending your message. Please email us directly instead.";

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // Honeypot: a real visitor never fills this hidden field. Respond as if
  // successful so scripted submissions don't learn the check exists, but
  // never actually send anything. Cheapest check, so it runs first.
  const honeypot = formData.get("website");
  if (typeof honeypot === "string" && honeypot.trim().length > 0) {
    return { status: "success", message: SUCCESS_MESSAGE };
  }

  // BotID: invisible, challenge-based bot detection on this one Server
  // Action. A positive detection gets the exact same response as the
  // honeypot, so an automated client learns nothing about which layer
  // caught it, and no email is sent either way. A transient BotID/provider
  // problem must never crash this page or leak implementation details, so
  // it fails open (treated as human) rather than blocking a real visitor;
  // server-side validation and the fixed Resend recipient/sender remain as
  // defense-in-depth regardless of this check's outcome.
  try {
    const verification = await checkBotId();
    if (verification.isBot) {
      return { status: "success", message: SUCCESS_MESSAGE };
    }
  } catch {
    console.error("contact_botid_check_failed");
  }

  const result = validateContactSubmission(formData);
  if (!result.success) {
    return {
      status: "error",
      message: "Please fix the highlighted fields and try again.",
      fieldErrors: result.errors,
    };
  }

  try {
    await sendContactNotification(result.data);
  } catch {
    // Static marker only: never log the submission or a third-party error
    // message here, since a provider-generated message could unexpectedly
    // include contact content or implementation details.
    console.error("contact_send_failed");
    return { status: "error", message: GENERIC_ERROR_MESSAGE };
  }

  return { status: "success", message: SUCCESS_MESSAGE };
}
