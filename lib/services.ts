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
};

export const services: ServiceOffering[] = [
  {
    slug: "private",
    index: "01",
    name: "Private Goalie Training",
    athleteCount: "1 athlete",
    duration: "~60 minutes",
    description:
      "Fully personalized reps built around the athlete's specific footwork, hands, and habits — with detail no group setting can offer.",
    bestFor:
      "Goalies who want maximum one-on-one attention and faster correction of specific technical habits.",
    focusAreas: [
      "Footwork & positioning",
      "Hand speed & save technique",
      "Individual habit correction",
    ],
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
  },
];
