import Link from "next/link";
import Button from "@/components/ui/Button";
import { bookingCta, primaryNav, siteConfig } from "@/lib/site-config";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line-invert bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <span className="font-display text-2xl tracking-tight">
              {siteConfig.name}
            </span>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-paper/60">
              {siteConfig.description}
            </p>
            <Button href={bookingCta.href} variant="outline-light" className="mt-8">
              {bookingCta.label}
            </Button>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-paper/45">
              Site
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              {primaryNav.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-paper/75 hover:text-paper">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-paper/45">
              Serving
            </p>
            <p className="mt-4 text-sm leading-relaxed text-paper/75">
              {siteConfig.location.serviceArea.join(" · ")}
            </p>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-paper/45">
              Contact
            </p>
            <p className="mt-4 text-sm text-paper/75">
              <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-paper">
                {siteConfig.contact.email}
              </a>
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line-invert pt-8 text-xs text-paper/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
          <p>Based in {siteConfig.location.base}.</p>
        </div>
      </div>
    </footer>
  );
}
