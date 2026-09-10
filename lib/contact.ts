/**
 * Contact form data shape and server-side validation. No framework or
 * network dependencies here on purpose: this stays plain, synchronous, and
 * directly testable, and it must never be the only validation the app
 * trusts, but it is the authoritative one.
 */

export const CONTACT_TOPICS = [
  { value: "general", label: "General question" },
  { value: "training-formats", label: "Training formats & pricing" },
  { value: "scheduling", label: "Scheduling" },
  { value: "other", label: "Other" },
] as const;

export type ContactTopic = (typeof CONTACT_TOPICS)[number]["value"];

export function contactTopicLabel(topic: ContactTopic | undefined): string | undefined {
  return CONTACT_TOPICS.find((t) => t.value === topic)?.label;
}

export type ContactSubmission = {
  name: string;
  email: string;
  phone?: string;
  topic?: ContactTopic;
  message: string;
};

export type ContactField = "name" | "email" | "phone" | "topic" | "message";

export type ContactValidationResult =
  | { success: true; data: ContactSubmission }
  | { success: false; errors: Partial<Record<ContactField, string>> };

export const MAX_NAME_LENGTH = 100;
export const MAX_EMAIL_LENGTH = 254;
export const MAX_PHONE_LENGTH = 30;
export const MAX_MESSAGE_LENGTH = 2000;

// Deliberately simple: good enough to catch obviously malformed input
// without rejecting valid real-world addresses. Cal.com/Resend confirm
// deliverability downstream; this is a shape check, not deliverability.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readField(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export function validateContactSubmission(formData: FormData): ContactValidationResult {
  const errors: Partial<Record<ContactField, string>> = {};

  const name = readField(formData, "name");
  const email = readField(formData, "email");
  const phone = readField(formData, "phone");
  const topicRaw = readField(formData, "topic");
  const message = readField(formData, "message");

  if (!name) {
    errors.name = "Enter your name.";
  } else if (name.length > MAX_NAME_LENGTH) {
    errors.name = `Name must be ${MAX_NAME_LENGTH} characters or fewer.`;
  }

  if (!email) {
    errors.email = "Enter your email address.";
  } else if (email.length > MAX_EMAIL_LENGTH || !EMAIL_PATTERN.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (phone && phone.length > MAX_PHONE_LENGTH) {
    errors.phone = `Phone must be ${MAX_PHONE_LENGTH} characters or fewer.`;
  }

  let topic: ContactTopic | undefined;
  if (topicRaw) {
    const match = CONTACT_TOPICS.find((t) => t.value === topicRaw);
    if (!match) {
      errors.topic = "Select a valid option.";
    } else {
      topic = match.value;
    }
  }

  if (!message) {
    errors.message = "Enter a message.";
  } else if (message.length > MAX_MESSAGE_LENGTH) {
    errors.message = `Message must be ${MAX_MESSAGE_LENGTH} characters or fewer.`;
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      name,
      email,
      phone: phone || undefined,
      topic,
      message,
    },
  };
}
