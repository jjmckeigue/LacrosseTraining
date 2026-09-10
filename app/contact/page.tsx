import type { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Questions about training formats or scheduling? Send a message and Legacy Lacrosse Training will get back to you directly.",
};

export default function Contact() {
  return (
    <>
      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
            Contact
          </p>
          <h1 className="mt-6 max-w-2xl font-display text-5xl leading-[1.05] tracking-tight sm:text-6xl">
            Questions before you book?
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-paper/70">
            Send a message and {siteConfig.coach.name} will get back to you
            directly. To schedule a training session, use Book Training
            instead.
          </p>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto max-w-2xl px-6 py-16 lg:px-10 lg:py-20">
          <ContactForm />
          <p className="mt-8 text-sm text-ink-muted">
            Prefer email?{" "}
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="text-ink underline underline-offset-2 hover:text-ink-muted"
            >
              {siteConfig.contact.email}
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
