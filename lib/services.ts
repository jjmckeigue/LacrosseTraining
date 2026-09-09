/**
 * Single source of truth for training offerings. Backs the homepage summary
 * today and will back the future Training page and booking integration.
 */

export type ServiceOffering = {
  index: string;
  name: string;
  format: string;
  description: string;
};

export const services: ServiceOffering[] = [
  {
    index: "01",
    name: "Private Goalie Training",
    format: "One athlete · ~60 minutes",
    description:
      "Fully personalized reps built around the athlete's specific footwork, hands, and habits — with detail no group setting can offer.",
  },
  {
    index: "02",
    name: "Partner Training",
    format: "Two athletes · ~60–75 minutes",
    description:
      "Competitive, position-specific reps at a lower per-player cost. Ideal for two goalies who push each other.",
  },
  {
    index: "03",
    name: "Small Group Training",
    format: "3–5 goalies · ~75–90 minutes",
    description:
      "Station-based, game-speed training that mirrors the pace and pressure of a real game.",
  },
];
