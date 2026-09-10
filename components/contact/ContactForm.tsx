"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitContactForm, type ContactFormState } from "@/app/contact/actions";
import {
  CONTACT_TOPICS,
  MAX_EMAIL_LENGTH,
  MAX_MESSAGE_LENGTH,
  MAX_NAME_LENGTH,
  MAX_PHONE_LENGTH,
} from "@/lib/contact";
import Button from "@/components/ui/Button";

const initialState: ContactFormState = { status: "idle", message: "" };

const emptyValues = { name: "", email: "", phone: "", topic: "", message: "" };

const fieldClasses =
  "w-full border border-line bg-paper px-4 py-3 text-base text-ink placeholder:text-ink-muted focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const labelClasses =
  "text-xs font-semibold uppercase tracking-[0.1em] text-ink-muted";

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactForm, initialState);
  const statusRef = useRef<HTMLParagraphElement>(null);

  // Controlled fields: React 19 resets uncontrolled inputs on every form
  // action submission, success or error. Controlling them keeps what a
  // visitor typed on screen after a validation or delivery error, and
  // clears them deliberately once the message actually sends.
  const [values, setValues] = useState(emptyValues);

  // Clearing on success is a state adjustment in response to a changed
  // action result, done during render (React's documented pattern for
  // this), not inside an effect.
  const [handledState, setHandledState] = useState(state);
  if (state !== handledState) {
    setHandledState(state);
    if (state.status === "success") {
      setValues(emptyValues);
    }
  }

  // Focus management is a genuine side effect (imperative DOM work), so it
  // stays in an effect, with no setState calls inside it.
  useEffect(() => {
    if (state.status === "idle") return;

    const firstErrorField = state.fieldErrors
      ? Object.keys(state.fieldErrors)[0]
      : undefined;

    if (firstErrorField) {
      document.getElementById(firstErrorField)?.focus();
    } else {
      statusRef.current?.focus();
    }
  }, [state]);

  return (
    <form action={formAction} className="flex flex-col gap-6">
      {/* Honeypot: hidden from sighted and keyboard users, real form fields
          are unaffected. A filled value means a bot, not a visitor. */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="website">Leave this field blank</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="name" className={labelClasses}>
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          maxLength={MAX_NAME_LENGTH}
          autoComplete="name"
          value={values.name}
          onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
          aria-invalid={Boolean(state.fieldErrors?.name)}
          aria-describedby={state.fieldErrors?.name ? "name-error" : undefined}
          className={fieldClasses}
        />
        {state.fieldErrors?.name && (
          <p id="name-error" className="text-sm text-accent-deep">
            {state.fieldErrors.name}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className={labelClasses}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          maxLength={MAX_EMAIL_LENGTH}
          autoComplete="email"
          value={values.email}
          onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
          aria-invalid={Boolean(state.fieldErrors?.email)}
          aria-describedby={state.fieldErrors?.email ? "email-error" : undefined}
          className={fieldClasses}
        />
        {state.fieldErrors?.email && (
          <p id="email-error" className="text-sm text-accent-deep">
            {state.fieldErrors.email}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="phone" className={labelClasses}>
          Phone <span className="normal-case text-ink-muted">(optional)</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          maxLength={MAX_PHONE_LENGTH}
          autoComplete="tel"
          value={values.phone}
          onChange={(e) => setValues((v) => ({ ...v, phone: e.target.value }))}
          aria-invalid={Boolean(state.fieldErrors?.phone)}
          aria-describedby={state.fieldErrors?.phone ? "phone-error" : undefined}
          className={fieldClasses}
        />
        {state.fieldErrors?.phone && (
          <p id="phone-error" className="text-sm text-accent-deep">
            {state.fieldErrors.phone}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="topic" className={labelClasses}>
          Reaching out about{" "}
          <span className="normal-case text-ink-muted">(optional)</span>
        </label>
        <select
          id="topic"
          name="topic"
          value={values.topic}
          onChange={(e) => setValues((v) => ({ ...v, topic: e.target.value }))}
          aria-invalid={Boolean(state.fieldErrors?.topic)}
          aria-describedby={state.fieldErrors?.topic ? "topic-error" : undefined}
          className={fieldClasses}
        >
          <option value="">Select an option</option>
          {CONTACT_TOPICS.map((topic) => (
            <option key={topic.value} value={topic.value}>
              {topic.label}
            </option>
          ))}
        </select>
        {state.fieldErrors?.topic && (
          <p id="topic-error" className="text-sm text-accent-deep">
            {state.fieldErrors.topic}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className={labelClasses}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          maxLength={MAX_MESSAGE_LENGTH}
          value={values.message}
          onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
          aria-invalid={Boolean(state.fieldErrors?.message)}
          aria-describedby={state.fieldErrors?.message ? "message-error" : undefined}
          className={fieldClasses}
        />
        {state.fieldErrors?.message && (
          <p id="message-error" className="text-sm text-accent-deep">
            {state.fieldErrors.message}
          </p>
        )}
      </div>

      <Button type="submit" variant="primary" disabled={pending} className="self-start">
        {pending ? "Sending..." : "Send Message"}
      </Button>

      {state.status !== "idle" && (
        <p
          ref={statusRef}
          role={state.status === "error" ? "alert" : "status"}
          tabIndex={-1}
          className={`border px-4 py-3 text-sm leading-relaxed focus:outline-none ${
            state.status === "error"
              ? "border-accent-deep text-accent-deep"
              : "border-line text-ink"
          }`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
