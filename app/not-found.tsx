import type { Metadata } from "next";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <section className="bg-ink text-paper">
      <div className="mx-auto max-w-3xl px-6 py-24 text-center lg:px-10 lg:py-32">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
          404
        </p>
        <h1 className="mt-6 font-display text-4xl tracking-tight sm:text-5xl">
          That page isn&apos;t on the schedule.
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-paper/70">
          The page you were looking for doesn&apos;t exist, or may have
          moved. Head back to the homepage, check out training options, or
          get on the schedule.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          <Button href="/" variant="primary">
            Back to Home
          </Button>
          <Button href="/training" variant="outline-light">
            View Training Options
          </Button>
          <Button href="/book" variant="outline-light">
            Book Training
          </Button>
        </div>
      </div>
    </section>
  );
}
