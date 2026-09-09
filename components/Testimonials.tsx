type Testimonial = {
  quote: string;
  attribution: string;
};

type TestimonialsProps = {
  testimonials: Testimonial[];
};

export default function Testimonials({ testimonials }: TestimonialsProps) {
  if (testimonials.length === 0) {
    return (
      <div className="border border-line px-8 py-16 text-center">
        <p className="font-display text-2xl text-ink/80">
          Now booking first sessions in Ann Arbor and Metro Detroit.
        </p>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink/55">
          Testimonials from athletes and families will appear here as the first
          training cycles wrap up. Book a session and be among the first.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
      {testimonials.map((t) => (
        <figure key={t.attribution} className="border-t border-line pt-6">
          <blockquote className="font-display text-xl leading-snug text-ink/90">
            &ldquo;{t.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-4 text-xs font-semibold uppercase tracking-[0.15em] text-ink/45">
            {t.attribution}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
