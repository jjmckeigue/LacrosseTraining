# Legacy Lacrosse Training

Marketing + booking site for a personalized lacrosse goalie training business
serving Ann Arbor, Ypsilanti, and Metro Detroit.

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) (theme defined in `app/globals.css`)
- [Cal.com](https://cal.com) for booking/availability (planned — embedded, not
  custom-built)
- [Resend](https://resend.com) for transactional email (planned)
- [Vercel](https://vercel.com) for deployment
- [Playwright](https://playwright.dev) for end-to-end testing

Supabase, Stripe, and a custom database are intentionally **not** part of the
MVP — see [Future integrations](#future-integrations).

## Local setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The homepage auto-updates
as you edit `app/page.tsx`.

## Commands

| Command              | Description                                     |
| --------------------- | ------------------------------------------------ |
| `npm run dev`          | Start the local dev server                       |
| `npm run build`        | Production build                                 |
| `npm run start`        | Serve a production build locally                 |
| `npm run lint`         | Run ESLint                                       |
| `npm run typecheck`    | Run `next typegen && tsc --noEmit`               |
| `npm run test:e2e`     | Run Playwright end-to-end tests                  |

`npm run build` starts a local Playwright web server automatically when
`npm run test:e2e` is invoked outside of CI (see `playwright.config.ts`).

## Project structure

```
app/                  App Router routes, layouts, and global styles
  layout.tsx           Root layout: fonts, metadata, skip link, Header/Footer
  page.tsx              Homepage
  training/page.tsx      Training page (formats, philosophy, CTA)
  about/page.tsx          About page (coach background, philosophy, CTA)
  globals.css            Tailwind v4 theme (colors, fonts)
components/            Reusable and page-level components
  ui/                     Generic UI primitives (Button, PlaceholderImage)
lib/                    Typed, non-visual source-of-truth data
  site-config.ts          Brand copy, nav links, service-area, coach name
  services.ts              Training offerings — single source of truth for
                            the homepage summary and the Training page
e2e/                    Playwright end-to-end tests
```

No route groups (e.g. `(marketing)`) — nearly the whole site is marketing
content, so a flat `app/` structure is clearer. Don't add generic wrapper
components (`Card`, `Container`, etc.) or new abstractions unless there's
real duplication to justify them.

## Future integrations

Add Supabase, Stripe, Cal.com, Resend, a Contact page, a contact form, or
booking functionality only when a concrete feature needs them — e.g. a lead
CRM, session history, or payment records. This is a small coaching business
site, not an enterprise app; prefer boring, managed functionality over
custom infrastructure unless custom behavior materially improves the
customer experience or the business.

## Assets needed from the business owner

Pages use labeled placeholder blocks (`components/ui/PlaceholderImage.tsx`)
wherever real photography is required. Drop finished files into
`public/images/` and swap the corresponding `PlaceholderImage` for a
`next/image` call. Needed so far:

- Homepage hero — goalie mid-save, game action shot
- Coach portrait (used on the homepage and the About page hero)
- Jackson playing goalie at Hanover College (About page)
- Jackson coaching a goalie on the field (About page)
- Training page hero — coach running a live session
- One action photo per training format on the Training page (private,
  partner, small group)
- Business phone number (email is set in `lib/site-config.ts`)

## Environment variables

No environment variables are required yet. When integrations (Cal.com,
Resend, etc.) are added:

- Keep secrets in an untracked `.env.local` (the `.gitignore` already
  excludes `.env*`).
- Prefix only variables that must be readable in the browser with
  `NEXT_PUBLIC_`; keep everything else server-only.
- Document each new variable's name and purpose in this section as it's
  introduced.

## Deployment

Deployed on Vercel. Pushes to `main` and pull requests run CI
(`.github/workflows/ci.yml`): install, lint, typecheck, production build,
and the Playwright e2e suite. Vercel builds and deploys `main` on merge.
