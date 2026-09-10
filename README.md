# Legacy Lacrosse Training

Marketing + booking site for a personalized lacrosse goalie training business
serving Ann Arbor, Ypsilanti, and Metro Detroit.

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) (theme defined in `app/globals.css`)
- [Cal.com](https://cal.com) for booking/availability, embedded (not
  custom-built) at `/book`. Cal.com owns scheduling entirely; see
  [Booking (Cal.com) setup](#booking-calcom-setup) for the account
  configuration still required before it's live.
- [Resend](https://resend.com) for transactional email — sends one
  notification to Legacy when the `/contact` form is submitted; see
  [Contact form (Resend) setup](#contact-form-resend-setup)
- [Vercel](https://vercel.com) for deployment and cookieless web analytics
  (`@vercel/analytics`, mounted once in `app/layout.tsx`)
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
  book/page.tsx            Booking page: service selector + Cal.com embed
  contact/page.tsx          Contact page: form + business context
  contact/actions.ts          Server Action: validates and emails a
                               contact submission (the public write boundary
                               for this route)
  privacy/page.tsx           Privacy policy page
  icon.png                 App icon (brand mark), auto-served by Next.js
  globals.css               Tailwind v4 theme (colors, fonts)
components/            Reusable and page-level components
  ui/                     Generic UI primitives (Button)
  booking/                 ServiceSelector (server) + CalBookingEmbed
                            (client boundary for the Cal.com widget)
  contact/                 ContactForm (client boundary: controlled fields,
                            accessible pending/success/error states)
lib/                    Typed, non-visual source-of-truth data
  site-config.ts          Brand copy, nav links, service-area, coach name
  services.ts              Training offerings, single source of truth for
                            the homepage summary, Training page, and
                            booking (each offering's Cal.com event slug
                            lives here as `calSlug`)
  cal.ts                    Builds a Cal.com booking link from a service;
                             the one place that knows the Cal.com username
  contact.ts                Contact form shape, topic allowlist, and the
                             authoritative server-side validation, shared by
                             the Server Action and its tests
  resend.ts                  Server-only: sends the contact notification
                              email via Resend; never imported by client code
public/images/          Production photography (see below)
public/brand/            Logo family (see Brand assets below)
e2e/                    Playwright end-to-end tests
```

No route groups (e.g. `(marketing)`) — nearly the whole site is marketing
content, so a flat `app/` structure is clearer. Don't add generic wrapper
components (`Card`, `Container`, etc.) or new abstractions unless there's
real duplication to justify them.

## Future integrations

Add Supabase, Stripe, authentication, or a database only when a concrete
feature needs them, e.g. a lead CRM, session history, or payment records.
This is a small coaching business site, not an enterprise app; prefer
boring, managed functionality over custom infrastructure unless custom
behavior materially improves the customer experience or the business.
Cal.com (booking) and Resend (contact notifications) are already
integrated; see [Booking (Cal.com) setup](#booking-calcom-setup) and
[Contact form (Resend) setup](#contact-form-resend-setup) for what's still
required.

## Booking (Cal.com) setup

`/book` embeds Cal.com inline; the app never talks to Cal.com's API
directly and owns no scheduling logic. Cal.com owns availability, conflict
detection, time zones, booking creation, rescheduling, cancellations,
limits, buffers, location, and booking questions.

**Configuration status: complete.** Three independent Cal.com event types
exist under the `jackson-mckeigue-nhhaaa` account (default in `lib/cal.ts`;
override with `NEXT_PUBLIC_CAL_USERNAME` if the account ever changes, see
[Environment variables](#environment-variables)):

| Offering (`lib/services.ts` slug) | Cal.com event slug (`calSlug`) | Duration |
| --- | --- | --- |
| Private Goalie Training (`private`) | `private-goalie-training` | 60 minutes |
| Partner Training (`partner`) | `partner-goalie-training` | 75 minutes |
| Small Group Training (`small-group`) | `small-group-goalie-training` | 90 minutes |

Each offering's `duration` in `lib/services.ts` is the exact session length
and the single source of truth for that value on the site; don't re-type a
duration anywhere else. Cal.com's own event-type duration is the source of
truth for actual scheduling and should be kept in sync with the table above
if it ever changes there first.

All three event types use the `America/Detroit` time zone, closed-group
booking (Cal.com's seats feature is off, so one parent books the whole
Partner/Small Group slot and supplies the group's info), and the booking
questions below. Cal.com remains the source of truth for all of it:
availability, conflict detection, buffers, minimum notice, booking horizon,
cancellation/rescheduling policy, and location.

**Booking questions**, configured per event type (keep it minimal and
parent/guardian-first; stable identifiers in parentheses):
- Parent/Guardian Name, required (`parent-guardian-name`)
- Parent/Guardian Email, required (`parent-guardian-email`)
- Phone, optional (`phone`)
- Athlete First Name, required (`athlete-first-name`)
- Graduation Year, required (`graduation-year`)
- School/Club, optional (`school-club`)
- Experience Level, optional (`experience-level`)
- Training goals, optional (`session-goals`)

No home address, full date of birth, medical information, or other
information the business doesn't operationally need is collected.

**Still open**: a real recurring training location (the booking page
currently reads "Ann Arbor / Southeast Michigan, confirmed after booking"
rather than a residential address; once a real location exists, set it in
each event type's Cal.com location field), and switching Partner/Small
Group to open enrollment later, if ever decided, which is a Cal.com
configuration change, not a code change.

Verified live in a real browser against all three real events: the
calendar, available dates, and time slots render correctly with no console
errors, in both the `month_view` desktop layout and the
`useSlotsViewOnSmallScreen` mobile layout. `npm run test:e2e` still only
checks this app's own state (selector, URL handling, summary text) and
intentionally does not depend on Cal.com's production availability, so
re-run the live check above if the account or event types change.

The embed uses Cal.com's own namespaced pattern
(`getCalApi({ namespace })` / `<Cal namespace .../>`, namespace = the
offering's `calSlug`), matching the snippet Cal.com's dashboard generates
for this account. An earlier version that omitted the namespace threw an
"iframe doesn't exist" error from inside `@calcom/embed-react` itself;
namespacing resolved it.

## Contact form (Resend) setup

`/contact` is a minimal form (name, email, phone, topic, message) submitted
through a Next.js Server Action (`app/contact/actions.ts`), not a generic
API route. That action is a public security boundary: `lib/contact.ts`
re-validates everything server-side (required fields, email format, topic
against a fixed allowlist, max lengths) regardless of what client-side
`required`/`maxLength` attributes already enforce, and a hidden honeypot
field silently short-circuits to a fake success response for basic bots
without sending an email.

A valid submission sends exactly one plain-text notification email to
Legacy via Resend (`lib/resend.ts`, server-only — never imported by a
Client Component). The sender and recipient are fixed by configuration;
visitor input can only set the reply-to address, never `from`/`to`. There
is no database: submissions are not persisted anywhere, and only the error
message (never form content) is logged on failure. No automated
acknowledgement email is sent back to the visitor in this phase.

Requires `RESEND_API_KEY` (see [Environment variables](#environment-variables))
in any environment that should actually deliver email; without it, the form
correctly renders its accessible error state instead of crashing. CI and
local dev intentionally run without a real key, so `npm run test:e2e` never
sends a live email — coverage for `/contact` exercises validation and the
deterministic error path, and delivery itself is verified manually against
a real Resend configuration.

## Brand assets

The logo family lives in `public/brand/`, sourced from finished exports
(not the raw design-tool SVGs, which reference an external raster texture
file that isn't part of the delivered asset set):

| File                              | Use                                     |
| ---------------------------------- | ------------------------------------------ |
| `logo-horizontal-on-dark.png`       | Header wordmark (site header is always on `bg-ink`) |
| `logo-horizontal-on-light.png`       | Wordmark for paper/light surfaces, not currently used in the UI |
| `logo-mark-on-dark.png`               | Emblem only, for dark surfaces |
| `logo-mark-on-light.png`               | Emblem only, for light surfaces; also the source for `app/icon.png` (favicon/app icon) |

The canonical brand blue is `#0b486d`, available as the `--color-brand-blue`
token in `app/globals.css`. It's the logo's own color, not a replacement
for the site's `ink` color; don't swap `ink` usages to it without a concrete
visual reason. Don't recolor, distort, or add effects (glow, shadow,
gradient, animation) to the logo files themselves.

## Photography

Production photos live in `public/images/`, named semantically (not by
camera/export filename) and referenced directly via `next/image`:

| File                              | Used on              |
| ---------------------------------- | --------------------- |
| `homepage-hero-goalie-game.jpg`     | Homepage hero          |
| `jackson-mckeigue-headshot.jpg`      | Homepage "Meet Your Coach" + About Coaching Experience section |
| `training-hero-goalie-save.jpg`       | Training hero banner      |
| `training-save-technique.jpg`          | Training philosophy section |
| `training-goalie-clearing.jpg`          | Training "complete goalie development" section |
| `jackson-collegiate-goalie.jpg`          | About playing-background section |
| `coach-on-field.jpg`                      | About hero |

When cropping a new photo with `object-position`, check the crop against the
source at desktop and mobile widths — a container aspect ratio far from the
source's native ratio can crop out the subject. Still needed: business phone
number (email is set in `lib/site-config.ts`).

## Environment variables

| Variable                   | Required | Purpose                                                        |
| --------------------------- | -------- | ---------------------------------------------------------------- |
| `NEXT_PUBLIC_CAL_USERNAME`   | No | Cal.com username/team slug; see [Booking (Cal.com) setup](#booking-calcom-setup). Defaults to the real account (`jackson-mckeigue-nhhaaa`) in `lib/cal.ts`; only set this if the account changes. |
| `RESEND_API_KEY`             | Yes, to actually send contact emails | Server-only Resend API key; never prefix with `NEXT_PUBLIC_`. Without it, `/contact` still works but renders its error state instead of delivering mail. |
| `RESEND_FROM_EMAIL`          | No | Fixed `from` address for contact notifications. Defaults to a Resend sandbox address in `lib/resend.ts`; set once a sending domain is verified in Resend. |
| `CONTACT_TO_EMAIL`           | No | Fixed recipient for contact notifications. Defaults to the email in `lib/site-config.ts`. |

- Keep secrets in an untracked `.env.local` (the `.gitignore` already
  excludes `.env*`).
- Prefix only variables that must be readable in the browser with
  `NEXT_PUBLIC_`; keep everything else server-only.
- Document each new variable's name and purpose in this section as it's
  introduced.

## Deployment

Deployed on Vercel. Pushes to `main` and pull requests run CI
(`.github/workflows/ci.yml`): install, lint, typecheck, production build,
and the Playwright e2e suite. The workflow is scoped to read-only
repository permissions (`permissions: contents: read`). Vercel builds and
deploys `main` on merge.

Baseline response security headers (`X-Content-Type-Options`,
`Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options`) are set for
every route in `next.config.ts`. There is intentionally no Content-Security-
Policy yet: the `/book` route embeds Cal.com in an iframe, and a CSP added
without first inventorying and testing Cal.com's actual requirements (in a
Report-Only pass, verified against real `/book` traffic on desktop and
mobile) risks silently breaking booking. Add one only after that process,
not as a default hardening step.
