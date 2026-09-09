"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { bookingCta, primaryNav, siteConfig } from "@/lib/site-config";

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line-invert bg-ink text-paper">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link href="/" className="flex flex-col leading-none" onClick={() => setOpen(false)}>
          <span className="font-display text-2xl tracking-tight">
            {siteConfig.shortName}
          </span>
          <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-paper/55">
            Lacrosse Training
          </span>
        </Link>

        <nav className="hidden items-center gap-10 lg:flex">
          <ul className="flex items-center gap-8 text-sm font-medium uppercase tracking-[0.08em]">
            {primaryNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-paper/80 transition-colors hover:text-paper"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button href={bookingCta.href} variant="primary">
            {bookingCta.label}
          </Button>
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span
            className={`h-px w-6 bg-paper transition-transform duration-200 ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-paper transition-transform duration-200 ${
              open ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {open && (
        <div className="border-t border-line-invert lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-6">
            {primaryNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-line-invert py-4 text-lg font-medium text-paper/90"
              >
                {link.label}
              </Link>
            ))}
            <Button
              href={bookingCta.href}
              variant="primary"
              className="mt-6 w-full"
              onClick={() => setOpen(false)}
            >
              {bookingCta.label}
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
