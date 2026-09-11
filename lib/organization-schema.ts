import { siteConfig } from "@/lib/site-config";

/**
 * Deliberately minimal: only facts the business actually has. No street
 * address or phone (training happens at various fields, confirmed after
 * booking, not a fixed storefront), no aggregateRating/review (none exist),
 * no openingHours (that's Cal.com's live availability, not a fixed
 * schedule), no sameAs (no social profiles are established yet). Add these
 * only when the underlying fact exists — never to fill out the schema.
 */
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: new URL("/brand/logo-horizontal-on-dark.png", siteConfig.url).toString(),
  description: siteConfig.description,
  email: siteConfig.contact.email,
  areaServed: siteConfig.location.serviceArea,
  founder: {
    "@type": "Person",
    name: siteConfig.coach.name,
  },
};
