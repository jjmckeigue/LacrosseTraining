/**
 * Single source of truth for site-wide brand and navigation content.
 * Service/pricing details live separately once the Training page is built.
 */

export const siteConfig = {
  name: "Legacy Lacrosse Training",
  shortName: "Legacy",
  tagline: "Personalized Goalie Development",
  description:
    "Private and small-group lacrosse goalie training for youth and high school athletes in Ann Arbor, Ypsilanti, and Metro Detroit.",
  url: "https://legacylacrossetraining.com",
  coach: {
    name: "Jackson McKeigue",
  },
  location: {
    base: "Ann Arbor, Michigan",
    serviceArea: [
      "Ann Arbor",
      "Ypsilanti",
      "Plymouth",
      "Canton",
      "Novi",
      "Northville",
      "Brighton",
      "Metro Detroit",
    ],
  },
  contact: {
    email: "legacylacrossetraining@gmail.com",
    phone: "",
  },
} as const;

export type NavLink = {
  label: string;
  href: string;
};

export const primaryNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Training", href: "/training" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const bookingCta: NavLink = { label: "Book Training", href: "/book" };
