import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `About ${siteConfig.coach.name}`,
  description: `${siteConfig.coach.name}, founder of ${siteConfig.name}, is a four-year NCAA Division III varsity goalie (Hanover College) who has coached goalies since 2016, including a state championship with the South Bend Bears and a #2 national Scoring Defense ranking at Trine University.`,
};

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink text-paper">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-10 lg:py-32">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
              About the Coach
            </p>
            <h1 className="mt-6 font-display text-5xl leading-[1.05] tracking-tight sm:text-6xl">
              {siteConfig.coach.name}
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-paper/70">
              Founder of Legacy Lacrosse Training — a four-year NCAA
              Division III varsity goalie, Hanover College, now coaching
              the next generation of goalies across Ann Arbor and Metro
              Detroit.
            </p>
          </div>

          <div className="relative aspect-square w-full max-w-md overflow-hidden border border-line-invert bg-ink-2">
            <Image
              src="/images/jackson-mckeigue-headshot.jpg"
              alt={`${siteConfig.coach.name} professional headshot`}
              fill
              priority
              sizes="(min-width: 1024px) 448px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Playing background */}
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20 lg:px-10 lg:py-32">
          <div className="relative aspect-[4/3] w-full overflow-hidden border border-line bg-paper-2">
            <Image
              src="/images/jackson-collegiate-goalie.jpg"
              alt="Collegiate lacrosse goalie making a save near the pipe"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
              style={{ objectPosition: "25% 35%" }}
            />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">
              Playing Background
            </p>
            <h2 className="mt-4 font-display text-4xl tracking-tight text-ink">
              Four years in the crease, start to finish.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/65">
              I played goalie for four years at the NCAA Division III level
              at Hanover College. Like most goalies, I ended up at the
              position because nobody else wanted to stand in front of a
              hard rubber ball — and I stayed because I fell in love with
              everything about it: the angles, the footwork, the
              split-second reads, the pressure of being the last line of
              defense. Four years of college reps taught me things about
              this position that you can&apos;t pick up from a few extra
              shots at the end of field practice.
            </p>
          </div>
        </div>
      </section>

      {/* Why Legacy exists */}
      <section className="border-b border-line bg-paper-2/60">
        <div className="mx-auto max-w-3xl px-6 py-24 lg:px-10 lg:py-32">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">
            Why Legacy Lacrosse Training Exists
          </p>
          <h2 className="mt-4 font-display text-4xl tracking-tight text-ink">
            Goalies get an afterthought. I wanted to fix that.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-ink/65">
            Most youth and high school practices are built for the other
            nine guys on the field. The goalie gets handed a bucket of balls
            at the end of practice and told to have fun. That&apos;s not
            coaching — it&apos;s just shots. Legacy Lacrosse Training exists
            because I remember being that goalie, figuring things out on my
            own with no one around who actually understood the position. I
            started this to give athletes what I didn&apos;t have:
            dedicated, position-specific coaching from someone who has
            actually played in the crease.
          </p>
        </div>
      </section>

      {/* Why goalie-specific coaching matters */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-3xl px-6 py-24 lg:px-10 lg:py-32">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">
            Why Goalie-Specific Coaching Matters
          </p>
          <h2 className="mt-4 font-display text-4xl tracking-tight text-ink">
            The position isn&apos;t the rest of the field, slowed down.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-ink/65">
            A goalie&apos;s footwork, hand mechanics, and decision-making
            have almost nothing in common with the rest of the field. A
            coach who never played the position can feed you shots, but
            they can&apos;t tell you why your hips are drifting on a
            low-to-high save, how to reset your angle after a skip shot, or
            how to talk yourself down when the shots start piling up. That
            only comes from having stood in the crease yourself.
          </p>
        </div>
      </section>

      {/* Coaching philosophy */}
      <section className="border-b border-line bg-ink text-paper">
        <div className="mx-auto max-w-3xl px-6 py-24 lg:px-10 lg:py-32">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Coaching Philosophy
          </p>
          <h2 className="mt-4 font-display text-4xl tracking-tight">
            Technical detail. Honest feedback. No wasted reps.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-paper/70">
            Every session is built around fundamentals — footwork, hands,
            angles — because those are what hold up when a game gets fast
            and chaotic. I&apos;ll tell you directly what&apos;s working
            and what isn&apos;t; athletes improve faster when they&apos;re
            not guessing where they stand. And every rep has a purpose: no
            standing around, no generic drills borrowed from a field-player
            practice plan. If we&apos;re on the clock, we&apos;re working.
          </p>
        </div>
      </section>

      {/* What to expect */}
      <section className="border-b border-line bg-paper-2/60">
        <div className="mx-auto max-w-3xl px-6 py-24 lg:px-10 lg:py-32">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">
            What To Expect
          </p>
          <h2 className="mt-4 font-display text-4xl tracking-tight text-ink">
            Structured sessions. Real coaching attention.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-ink/65">
            Expect a warm-up built around footwork and hand speed, focused
            technical work on whatever we&apos;re correcting that week, and
            game-speed reps that build toward the pace of a real game. I
            keep the group sizes small — private, partner, or small group —
            so every athlete gets real attention, not just volume of shots.
          </p>
        </div>
      </section>

      {/* Coaching experience / leadership */}
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-20 lg:px-10 lg:py-32">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">
              Coaching Experience
            </p>
            <h2 className="mt-4 font-display text-4xl tracking-tight text-ink">
              Coaching goalies since 2016.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/65">
              Alongside another coach, I&apos;ve worked with high school and
              youth goalies since 2016 — from first-time goalies learning
              the basics to varsity athletes preparing for college
              recruitment. The last two years, I coached the South Bend
              Bears high school team to a state championship. Last season, I
              coached goalies at Trine University, where the team finished
              the 2025–26 NCAA Division III men&apos;s lacrosse season
              ranked #2 nationally in Scoring Defense, allowing just 5.63
              goals per game.
            </p>
          </div>

          <div className="relative aspect-[3/4] w-full max-w-md overflow-hidden border border-line bg-paper-2">
            <Image
              src="/images/coach-on-field.jpg"
              alt="Coach addressing players on a lacrosse field"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center lg:px-10 lg:py-28">
          <h2 className="mx-auto max-w-2xl font-display text-4xl tracking-tight sm:text-5xl">
            Ready to work with me directly?
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
