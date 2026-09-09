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
| `npm run typecheck`    | Run `tsc --noEmit`                               |
| `npm run test:e2e`     | Run Playwright end-to-end tests                  |

`npm run build` starts a local Playwright web server automatically when
`npm run test:e2e` is invoked outside of CI (see `playwright.config.ts`).

## Project structure

```
app/                  App Router routes, layouts, and global styles
  layout.tsx           Root layout: fonts, metadata, skip link, Header/Footer
  page.tsx              Homepage
  globals.css            Tailwind v4 theme (colors, fonts)
components/            Reusable and page-level components
  ui/                     Generic UI primitives (Button, PlaceholderImage)
lib/                    Typed, non-visual source-of-truth data
  site-config.ts          Brand copy, nav links, service-area data
  services.ts              Training offerings (shared with the future
                            Training page and booking flow)
e2e/                    Playwright end-to-end tests
```

No route groups (e.g. `(marketing)`) — nearly the whole site is marketing
content, so a flat `app/` structure is clearer. Don't add generic wrapper
components (`Card`, `Container`, etc.) or new abstractions unless there's
real duplication to justify them.

## Future integrations

Add Supabase, Stripe, Cal.com, Resend, or new pages (Training/About/Contact,
a contact form, booking) only when a concrete feature needs them — e.g. a
lead CRM, session history, or payment records. This is a small coaching
business site, not an enterprise app; prefer boring, managed functionality
over custom infrastructure unless custom behavior materially improves the
customer experience or the business.

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
(`.github/workflows/ci.yml`): install, lint, typecheck, and production
build. Vercel builds and deploys `main` on merge.
