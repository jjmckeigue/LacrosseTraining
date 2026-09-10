import { expect, test } from "@playwright/test";
import {
  MAX_MESSAGE_LENGTH,
  MAX_NAME_LENGTH,
  validateContactSubmission,
} from "../lib/contact";

function formData(fields: Record<string, string>): FormData {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) {
    data.set(key, value);
  }
  return data;
}

test.describe("validateContactSubmission (authoritative server-side validation)", () => {
  test("accepts a fully valid submission and trims whitespace", () => {
    const result = validateContactSubmission(
      formData({
        name: "  Test Parent  ",
        email: "  parent@example.com  ",
        phone: "555-123-4567",
        topic: "scheduling",
        message: "  Asking about availability.  ",
      })
    );

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual({
        name: "Test Parent",
        email: "parent@example.com",
        phone: "555-123-4567",
        topic: "scheduling",
        message: "Asking about availability.",
      });
    }
  });

  test("accepts a submission with only the required fields", () => {
    const result = validateContactSubmission(
      formData({ name: "Test Parent", email: "parent@example.com", message: "Hi." })
    );

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.phone).toBeUndefined();
      expect(result.data.topic).toBeUndefined();
    }
  });

  test("rejects missing required fields", () => {
    const result = validateContactSubmission(formData({}));

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.name).toBeTruthy();
      expect(result.errors.email).toBeTruthy();
      expect(result.errors.message).toBeTruthy();
      expect(result.errors.phone).toBeUndefined();
      expect(result.errors.topic).toBeUndefined();
    }
  });

  test("rejects a malformed email address", () => {
    const result = validateContactSubmission(
      formData({ name: "Test Parent", email: "not-an-email", message: "Hi." })
    );

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.email).toBeTruthy();
    }
  });

  test("rejects a topic value outside the fixed allowlist", () => {
    const result = validateContactSubmission(
      formData({
        name: "Test Parent",
        email: "parent@example.com",
        message: "Hi.",
        topic: "<script>alert(1)</script>",
      })
    );

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.topic).toBeTruthy();
    }
  });

  test("rejects a name over the max length", () => {
    const result = validateContactSubmission(
      formData({
        name: "a".repeat(MAX_NAME_LENGTH + 1),
        email: "parent@example.com",
        message: "Hi.",
      })
    );

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.name).toBeTruthy();
    }
  });

  test("rejects a message over the max length", () => {
    const result = validateContactSubmission(
      formData({
        name: "Test Parent",
        email: "parent@example.com",
        message: "a".repeat(MAX_MESSAGE_LENGTH + 1),
      })
    );

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.message).toBeTruthy();
    }
  });
});
