"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import Button from "@/components/ui/Button";
import { bookingCta, primaryNav, siteConfig } from "@/lib/site-config";

const DESKTOP_NAV_BREAKPOINT = 1024; // matches the `lg` Tailwind breakpoint

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuId = useId();
  const isBookingCurrent = pathname === bookingCta.href;

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const handleResize = () => {
      if (window.innerWidth >= DESKTOP_NAV_BREAKPOINT) setOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line-invert bg-ink text-paper">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
          <span className="sr-only">{siteConfig.name}</span>
          <Image
            src="/brand/logo-horizontal-on-dark.png"
            alt=""
            width={1474}
            height={443}
            priority
            className="h-10 w-auto sm:h-12"
          />
        </Link>

        <nav className="hidden items-center gap-10 lg:flex" aria-label="Primary navigation">
          <ul className="flex items-center gap-8 text-sm font-medium uppercase tracking-[0.08em]">
            {primaryNav.map((link) => {
              const isCurrent = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isCurrent ? "page" : undefined}
                    className={`transition-colors hover:text-paper ${
                      isCurrent ? "text-paper" : "text-paper/80"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Button
            href={bookingCta.href}
            variant="primary"
            aria-current={isBookingCurrent ? "page" : undefined}
          >
            {bookingCta.label}
          </Button>
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls={menuId}
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

      <div
        id={menuId}
        className={`border-t border-line-invert lg:hidden ${open ? "block" : "hidden"}`}
      >
        <nav
          className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-6"
          aria-label="Mobile navigation"
        >
          {primaryNav.map((link) => {
            const isCurrent = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isCurrent ? "page" : undefined}
                onClick={() => setOpen(false)}
                className="border-b border-line-invert py-4 text-lg font-medium text-paper/90"
              >
                {link.label}
              </Link>
            );
          })}
          <Button
            href={bookingCta.href}
            variant="primary"
            className="mt-6 w-full"
            aria-current={isBookingCurrent ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            {bookingCta.label}
          </Button>
        </nav>
      </div>
    </header>
  );
}
