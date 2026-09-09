export type Testimonial = {
  quote: string;
  attribution: string;
};

type TestimonialsProps = {
  testimonials: Testimonial[];
};

export default function Testimonials({ testimonials }: TestimonialsProps) {
  if (testimonials.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
      {testimonials.map((t) => (
        <figure key={t.attribution} className="border-t border-line pt-6">
          <blockquote className="font-display text-xl leading-snug text-ink/90">
            &ldquo;{t.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-4 text-xs font-semibold uppercase tracking-[0.15em] text-ink-muted">
            {t.attribution}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
