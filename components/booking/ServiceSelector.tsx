import Link from "next/link";
import { services } from "@/lib/services";

type ServiceSelectorProps = {
  selectedSlug?: string;
};

export default function ServiceSelector({ selectedSlug }: ServiceSelectorProps) {
  return (
    <nav aria-label="Training format">
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {services.map((s) => {
          const isSelected = s.slug === selectedSlug;
          return (
            <li key={s.slug}>
              <Link
                href={`/book?service=${s.slug}`}
                aria-current={isSelected ? "true" : undefined}
                className={`block border px-6 py-5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                  isSelected
                    ? "border-accent-deep bg-accent/10"
                    : "border-line hover:border-ink/40"
                }`}
              >
                <span className="flex items-start justify-between gap-3">
                  <span className="font-display text-lg tracking-tight text-ink">
                    {s.name}
                  </span>
                  {isSelected && (
                    <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.1em] text-accent-deep">
                      Selected
                    </span>
                  )}
                </span>
                <span className="mt-1 block text-xs font-medium uppercase tracking-[0.06em] text-ink-muted">
                  {s.athleteCount} &middot; {s.duration}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
