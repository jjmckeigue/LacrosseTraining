import type { ServiceOffering } from "@/lib/services";

/**
 * Cal.com owns scheduling (availability, conflicts, time zones, booking
 * questions, buffers, limits). This file only knows how to name a Cal.com
 * event type, never how to schedule one.
 *
 * NEXT_PUBLIC_CAL_USERNAME overrides the account below; set it if the
 * Cal.com username ever changes so it isn't hard-coded at the source.
 */
export const calUsername =
  process.env.NEXT_PUBLIC_CAL_USERNAME || "jackson-mckeigue-nhhaaa";

export function getCalLink(service: ServiceOffering): string {
  return `${calUsername}/${service.calSlug}`;
}
