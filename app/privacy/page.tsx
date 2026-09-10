import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What information Legacy Lacrosse Training collects through this website, why, and which outside services help run it.",
};

export default function Privacy() {
  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-3xl px-6 py-20 lg:px-10 lg:py-28">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">
          Legal
        </p>
        <h1 className="mt-4 font-display text-4xl tracking-tight text-ink sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-6 text-base leading-relaxed text-ink/65">
          This page explains, in plain terms, what information{" "}
          {siteConfig.name} collects through this website, why, and which
          outside services help run it. It applies to this website only, not
          to in-person training sessions.
        </p>

        <h2 className="mt-12 font-display text-2xl tracking-tight text-ink">
          Information collected through the contact form
        </h2>
        <p className="mt-4 text-base leading-relaxed text-ink/65">
          The contact form asks for your name, email, an optional phone
          number, an optional topic, and your message. Submitting it sends
          that information directly to {siteConfig.name} by email through
          Resend, a transactional email service. This website itself does
          not store contact form submissions in a database. Resend
          processes the message to deliver it and may temporarily retain
          message content and delivery logs according to its own privacy
          policy, and the resulting email is retained in {siteConfig.name}
          &apos;s business inbox like any other message it receives.
        </p>

        <h2 className="mt-12 font-display text-2xl tracking-tight text-ink">
          Information collected through booking
        </h2>
        <p className="mt-4 text-base leading-relaxed text-ink/65">
          Scheduling a training session happens entirely through Cal.com,
          embedded on the Book Training page. Whatever you enter there
          (parent/guardian name and email, athlete details, and any answers
          to the booking questions) is collected and stored by Cal.com, not
          by this website. Cal.com&apos;s own privacy policy governs that
          data.
        </p>

        <h2 className="mt-12 font-display text-2xl tracking-tight text-ink">
          Information collected automatically
        </h2>
        <p className="mt-4 text-base leading-relaxed text-ink/65">
          This site is hosted on Vercel, which, like most hosting providers,
          automatically logs standard technical information (such as IP
          address and browser type) for security and operational purposes.
          It also uses Vercel Web Analytics to see aggregate traffic
          patterns, such as which pages are visited and roughly how many
          visitors the site gets. This is cookieless and does not track you
          individually across sites. This website does not use advertising
          trackers.
        </p>

        <h2 className="mt-12 font-display text-2xl tracking-tight text-ink">
          How this information is used
        </h2>
        <ul className="mt-4 flex flex-col gap-3 text-base leading-relaxed text-ink/65">
          <li>To respond to messages sent through the contact form.</li>
          <li>To schedule, coordinate, and conduct training sessions.</li>
          <li>
            To maintain the security of the site, including basic spam
            prevention on the contact form.
          </li>
        </ul>
        <p className="mt-4 text-base leading-relaxed text-ink/65">
          Contact form information is never sold, and it is not used for
          advertising or shared with anyone beyond what&apos;s described on
          this page.
        </p>

        <h2 className="mt-12 font-display text-2xl tracking-tight text-ink">
          Service providers
        </h2>
        <p className="mt-4 text-base leading-relaxed text-ink/65">
          A few outside services help run this site. Each processes the
          information described above according to its own privacy policy:
        </p>
        <ul className="mt-4 flex flex-col gap-3 text-base leading-relaxed text-ink/65">
          <li>
            <span className="font-semibold text-ink">Cal.com</span>, for
            scheduling and booking training sessions.
          </li>
          <li>
            <span className="font-semibold text-ink">Resend</span>, for
            delivering contact form messages by email.
          </li>
          <li>
            <span className="font-semibold text-ink">Vercel</span>, for
            hosting this website and providing cookieless traffic analytics.
          </li>
        </ul>

        <h2 className="mt-12 font-display text-2xl tracking-tight text-ink">
          Questions
        </h2>
        <p className="mt-4 text-base leading-relaxed text-ink/65">
          For questions about this policy or your information, contact{" "}
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="text-ink underline underline-offset-2 hover:text-ink-muted"
          >
            {siteConfig.contact.email}
          </a>
          .
        </p>

        <p className="mt-12 text-sm text-ink-muted">
          This policy may be updated as the site changes. Last updated when
          this page was published.
        </p>
      </div>
    </section>
  );
}
