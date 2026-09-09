import Button from "@/components/ui/Button";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import Testimonials from "@/components/Testimonials";
import { siteConfig } from "@/lib/site-config";

const offerings = [
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

const differentiators = [
  "Position-specific instruction every session — not general stick-skill drills built for the rest of the field.",
  "Small athlete-to-coach ratios, always.",
  "Game-speed shot volume from realistic angles and release points.",
  "College-level technical detail on footwork, hands, and angles.",
  "Mental game: communication, reads, and composure under pressure.",
];

const methodology = [
  "Positioning & Angles",
  "Footwork",
  "Hand Speed",
  "Ball Tracking",
  "Save Technique",
  "Rebound Control",
  "Clearing",
  "Communication",
  "Decision-Making",
  "Game-Speed Reps",
  "Confidence & Goalie IQ",
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink text-paper">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-10 lg:py-32">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
              {siteConfig.tagline}
            </p>
            <h1 className="mt-6 font-display text-5xl leading-[1.05] tracking-tight sm:text-6xl lg:text-6xl">
              Coaching built for the crease.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-paper/70">
              Private and small-group training for youth and high school
              goalies across Ann Arbor, Ypsilanti, and Metro Detroit — built
              around footwork, hand speed, angles, and the decision-making
              that separates good goalies from great ones.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Button href="/book" variant="primary">
                Book Training
              </Button>
              <Button href="/training" variant="outline-light">
                View Training Options
              </Button>
            </div>
            <p className="mt-10 text-sm text-paper/50">
              Coached by a four-year NCAA Division III collegiate goalie,
              Hanover College.
            </p>
          </div>

          <PlaceholderImage
            tone="dark"
            label="Goalie mid-save, game action shot"
            spec="Portrait or square orientation, high-resolution"
            className="aspect-[4/5] w-full lg:aspect-[3/4]"
          />
        </div>
      </section>

      {/* Coach intro */}
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-24 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-20 lg:px-10 lg:py-32">
          <PlaceholderImage
            label="Coach portrait"
            spec="Square, well-lit, on-field or headshot"
            className="aspect-square w-full max-w-md"
          />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/45">
              Meet Your Coach
            </p>
            <h2 className="mt-4 font-display text-4xl tracking-tight text-ink">
              Trained by someone who has played the position.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/65">
              Legacy Lacrosse Training was built around a simple idea: goalies
              need dedicated, position-specific coaching, not leftover reps at
              the end of field practice. Our coach is a four-year varsity
              starter and NCAA Division III collegiate goalie, a graduate of
              Hanover College, who has spent years refining the technical and
              mental sides of the position — and now brings that same
              approach to youth and high school goalies across the Ann Arbor
              and Metro Detroit area.
            </p>
            <Button href="/about" variant="outline-dark" className="mt-8">
              More About the Coach
            </Button>
          </div>
        </div>
      </section>

      {/* Training offerings */}
      <section className="border-b border-line bg-paper-2/60">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/45">
              Training Offerings
            </p>
            <h2 className="mt-4 font-display text-4xl tracking-tight text-ink">
              Three ways to train, one standard of coaching.
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-12">
            {offerings.map((o) => (
              <div key={o.index} className="border-t border-line pt-6">
                <span className="font-display text-sm text-accent-deep">
                  {o.index}
                </span>
                <h3 className="mt-3 font-display text-2xl tracking-tight text-ink">
                  {o.name}
                </h3>
                <p className="mt-2 text-sm font-medium uppercase tracking-[0.06em] text-ink/45">
                  {o.format}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-ink/65">
                  {o.description}
                </p>
              </div>
            ))}
          </div>

          <Button href="/training" variant="outline-dark" className="mt-16">
            See Full Training Details
          </Button>
        </div>
      </section>

      {/* Why specialized training */}
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-24 lg:grid-cols-[1fr_1.3fr] lg:gap-20 lg:px-10 lg:py-32">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/45">
              Why Goalie-Specific Training
            </p>
            <h2 className="mt-4 font-display text-4xl tracking-tight text-ink">
              Goalkeeping isn&apos;t taught like the rest of the field.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-ink/65">
              Most practices are built for the other nine players on the
              field. Goalies get a few extra shots and are expected to figure
              the rest out. Legacy Lacrosse Training exists to close that
              gap.
            </p>
          </div>

          <ul className="flex flex-col">
            {differentiators.map((point) => (
              <li
                key={point}
                className="border-t border-line py-6 text-base leading-relaxed text-ink/75 last:border-b"
              >
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Methodology */}
      <section className="border-b border-line bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Coaching Methodology
            </p>
            <h2 className="mt-4 font-display text-4xl tracking-tight">
              Every session works toward the same eleven fundamentals.
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3 lg:grid-cols-4">
            {methodology.map((item, i) => (
              <div key={item} className="border-t border-line-invert pt-4">
                <span className="text-xs font-semibold text-paper/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-1 text-sm font-medium text-paper/85">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/45">
            What Families Are Saying
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-4xl tracking-tight text-ink">
            Built on trust, one session at a time.
          </h2>
          <div className="mt-16">
            <Testimonials testimonials={[]} />
          </div>
        </div>
      </section>

      {/* Service area */}
      <section className="border-b border-line bg-paper-2/60">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center lg:px-10 lg:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/45">
            Service Area
          </p>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl tracking-tight text-ink">
            Training goalies throughout Ann Arbor and Metro Detroit
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink/60">
            {siteConfig.location.serviceArea.join(" · ")}
          </p>
          <p className="mx-auto mt-4 max-w-md text-sm text-ink/45">
            Don&apos;t see your town? Reach out — travel may be available for
            small-group sessions.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center lg:px-10 lg:py-28">
          <h2 className="mx-auto max-w-2xl font-display text-4xl tracking-tight sm:text-5xl">
            Ready to raise your game between the pipes?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-paper/65">
            Spots are limited by design — every athlete gets real coaching
            attention, every session.
          </p>
          <div className="mt-10 flex justify-center">
            <Button href="/book" variant="primary">
              Book Training
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
