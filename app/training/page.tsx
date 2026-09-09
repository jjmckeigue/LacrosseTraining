import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Lacrosse Goalie Training in Ann Arbor & Metro Detroit",
  description:
    "Private, partner, and small-group lacrosse goalie training for youth and high school athletes across Ann Arbor, Ypsilanti, and Metro Detroit — footwork, hand speed, angles, and game-speed decision-making.",
};

const focusAreas = [...new Set(services.flatMap((s) => s.focusAreas))];

export default function Training() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink text-paper">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-10 lg:py-32">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
              Training
            </p>
            <h1 className="mt-6 font-display text-5xl leading-[1.05] tracking-tight sm:text-6xl">
              Three ways to train. One standard of coaching.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-paper/70">
              Every format below is built around the same goalie-specific
              curriculum — the difference is group size, pace, and cost.
              Find the format that fits, then book a session.
            </p>
            <div className="mt-10">
              <Button href="/book" variant="primary">
                Book Training
              </Button>
            </div>
          </div>

          <PlaceholderImage
            tone="dark"
            label="Coach running a live training session"
            spec="Landscape or square, high-resolution"
            className="aspect-[4/5] w-full lg:aspect-[3/4]"
          />
        </div>
      </section>

      {/* Philosophy */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-3xl px-6 py-24 lg:px-10 lg:py-32">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">
            The Approach
          </p>
          <h2 className="mt-4 font-display text-4xl tracking-tight text-ink">
            Goalie training, not field training with extra saves.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-ink/65">
            A goalie&apos;s job has almost nothing in common with the other
            nine positions on the field — the footwork is different, the
            hand mechanics are different, and the decisions happen in a
            fraction of a second. Every session here is built specifically
            around the crease: angles and positioning, hand speed and save
            technique, rebound control, clearing, and the reads that turn a
            good goalie into a great one. Nothing borrowed from a general
            practice plan.
          </p>
          <p className="mt-6 text-base leading-relaxed text-ink/65">
            The three formats below deliver that same curriculum at
            different group sizes and intensities, so you can pick the one
            that fits your athlete&apos;s goals and schedule.
          </p>
        </div>
      </section>

      {/* Offerings */}
      {services.map((s, i) => {
        const reversed = i % 2 === 1;
        const image = (
          <PlaceholderImage
            label={`${s.name} in progress`}
            spec="Landscape or square, high-resolution"
            className="aspect-[4/3] w-full"
          />
        );
        const copy = (
          <div>
            <span className="font-display text-sm text-accent-deep">
              {s.index}
            </span>
            <h3 className="mt-3 font-display text-3xl tracking-tight text-ink">
              {s.name}
            </h3>
            <p className="mt-2 text-sm font-medium uppercase tracking-[0.06em] text-ink-muted">
              {s.athleteCount} · {s.duration}
            </p>
            <p className="mt-6 text-base leading-relaxed text-ink/65">
              {s.description}
            </p>
            <ul className="mt-6 flex flex-col">
              {s.focusAreas.map((area) => (
                <li
                  key={area}
                  className="border-t border-line py-3 text-sm leading-relaxed text-ink/75 last:border-b"
                >
                  {area}
                </li>
              ))}
            </ul>
            <Button href="/book" variant="outline-dark" className="mt-8">
              Book Training
            </Button>
          </div>
        );

        return (
          <section key={s.slug} id={s.slug} className="border-b border-line">
            <div
              className={`mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-24 lg:items-center lg:gap-20 lg:px-10 lg:py-28 ${
                reversed
                  ? "lg:grid-cols-[1.1fr_0.9fr]"
                  : "lg:grid-cols-[0.9fr_1.1fr]"
              }`}
            >
              {reversed ? (
                <>
                  {copy}
                  {image}
                </>
              ) : (
                <>
                  {image}
                  {copy}
                </>
              )}
            </div>
          </section>
        );
      })}

      {/* What athletes work on */}
      <section className="border-b border-line bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              In Every Session
            </p>
            <h2 className="mt-4 font-display text-4xl tracking-tight">
              What athletes work on during sessions.
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3">
            {focusAreas.map((area, i) => (
              <div key={area} className="border-t border-line-invert pt-4">
                <span className="text-xs font-semibold text-paper-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-1 text-sm font-medium text-paper/85">
                  {area}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="border-b border-line bg-paper-2/60">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">
              Which Format Fits
            </p>
            <h2 className="mt-4 font-display text-4xl tracking-tight text-ink">
              Who each format is appropriate for.
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-12">
            {services.map((s) => (
              <div key={s.slug} className="border-t border-line pt-6">
                <h3 className="font-display text-xl tracking-tight text-ink">
                  {s.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/65">
                  {s.bestFor}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center lg:px-10 lg:py-28">
          <h2 className="mx-auto max-w-2xl font-display text-4xl tracking-tight sm:text-5xl">
            Pick a format and get on the schedule.
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
