import type { Metadata } from "next";
import CalBookingEmbed from "@/components/booking/CalBookingEmbed";
import ServiceSelector from "@/components/booking/ServiceSelector";
import { getCalLink } from "@/lib/cal";
import { getServiceBySlug } from "@/lib/services";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Book Training",
  description:
    "Choose a private, partner, or small-group goalie training format and schedule a session online.",
};

export default async function Book(props: PageProps<"/book">) {
  const searchParams = await props.searchParams;
  const serviceParam = Array.isArray(searchParams.service)
    ? searchParams.service[0]
    : searchParams.service;
  const selectedService = getServiceBySlug(serviceParam);

  return (
    <>
      {/* Hero */}
      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
            Book Training
          </p>
          <h1 className="mt-6 max-w-2xl font-display text-5xl leading-[1.05] tracking-tight sm:text-6xl">
            {selectedService ? selectedService.name : "Choose a training format."}
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-paper/70">
            Pick the format that fits, then schedule a session below. Every
            session is coached personally by {siteConfig.coach.name}.
          </p>
        </div>
      </section>

      {/* Service selector */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <ServiceSelector selectedSlug={selectedService?.slug} />
        </div>
      </section>

      {selectedService && (
        <>
          {/* Selected service summary */}
          <section className="border-b border-line bg-paper-2/60">
            <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
              <div className="max-w-2xl">
                <h2 className="font-display text-2xl tracking-tight text-ink">
                  {selectedService.name}
                </h2>
                <p className="mt-2 text-sm font-medium uppercase tracking-[0.06em] text-ink-muted">
                  {selectedService.athleteCount} &middot;{" "}
                  {selectedService.duration}
                </p>
                <p className="mt-4 text-base leading-relaxed text-ink/65">
                  {selectedService.description}
                </p>
              </div>
            </div>
          </section>

          {/* Cal.com scheduler */}
          <section className="border-b border-line">
            <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
              <div
                key={selectedService.slug}
                className="min-h-[700px] w-full border border-line"
              >
                <CalBookingEmbed
                  calLink={getCalLink(selectedService)}
                  namespace={selectedService.calSlug}
                />
              </div>
              <p className="mx-auto mt-8 max-w-2xl text-sm leading-relaxed text-ink-muted">
                Training location: Ann Arbor / Southeast Michigan, confirmed
                after booking.
              </p>
            </div>
          </section>
        </>
      )}
    </>
  );
}
