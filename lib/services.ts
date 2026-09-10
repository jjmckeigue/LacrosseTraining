/**
 * Single source of truth for training offerings. Backs the homepage summary
 * and the Training page today, and will back the future booking flow.
 */

export type ServiceOffering = {
  slug: string;
  index: string;
  name: string;
  athleteCount: string;
  duration: string;
  description: string;
  bestFor: string;
  focusAreas: string[];
  /** Cal.com event-type slug. Combined with the Cal.com username in
   * lib/cal.ts to form the booking link. Each slug must exist as a real
   * event type in Cal.com before booking will work for that offering.
   *
   * Only one event type exists in Cal.com today ("lacrosse-training"), so
   * all three offerings point at it for now. Once dedicated Private/
   * Partner/Small Group event types are created in Cal.com, update each
   * offering's calSlug to its own slug. */
  calSlug: string;
};

export const services: ServiceOffering[] = [
  {
    slug: "private",
    index: "01",
    name: "Private Goalie Training",
    athleteCount: "1 athlete",
    duration: "~60 minutes",
    description:
      "Fully personalized reps built around the athlete's specific footwork, hands, and habits, with detail no group setting can offer.",
    bestFor:
      "Goalies who want maximum one-on-one attention and faster correction of specific technical habits.",
    focusAreas: [
      "Footwork & positioning",
      "Hand speed & save technique",
      "Individual habit correction",
    ],
    calSlug: "lacrosse-training",
  },
  {
    slug: "partner",
    index: "02",
    name: "Partner Training",
    athleteCount: "2 athletes",
    duration: "~60–75 minutes",
    description:
      "Competitive, position-specific reps at a lower per-player cost. Ideal for two goalies who push each other.",
    bestFor:
      "Two goalies at a similar level who want competitive reps and a training partner to push their pace.",
    focusAreas: [
      "Competitive shot reps",
      "Angles under pressure",
      "In-crease communication",
    ],
    calSlug: "lacrosse-training",
  },
  {
    slug: "small-group",
    index: "03",
    name: "Small Group Training",
    athleteCount: "3–5 goalies",
    duration: "~75–90 minutes",
    description:
      "Station-based, game-speed training that mirrors the pace and pressure of a real game.",
    bestFor:
      "Teams or friend groups who want game-speed pressure, rotation, and realistic in-game pacing.",
    focusAreas: [
      "Station-based reps",
      "Game-speed shot volume",
      "Rebound control & clearing",
    ],
    calSlug: "lacrosse-training",
  },
];

export function getServiceBySlug(slug: string | undefined): ServiceOffering | undefined {
  return services.find((service) => service.slug === slug);
}
