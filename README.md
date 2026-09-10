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
  book/page.tsx            Booking page: service selector + Cal.com embed
  icon.png                 App icon (brand mark), auto-served by Next.js
  globals.css               Tailwind v4 theme (colors, fonts)
components/            Reusable and page-level components
  ui/                     Generic UI primitives (Button)
  booking/                 ServiceSelector (server) + CalBookingEmbed
                            (client boundary for the Cal.com widget)
lib/                    Typed, non-visual source-of-truth data
  site-config.ts          Brand copy, nav links, service-area, coach name
  services.ts              Training offerings, single source of truth for
                            the homepage summary, Training page, and
                            booking (each offering's Cal.com event slug
                            lives here as `calSlug`)
  cal.ts                    Builds a Cal.com booking link from a service;
                             the one place that knows the Cal.com username
public/images/          Production photography (see below)
public/brand/            Logo family (see Brand assets below)
e2e/                    Playwright end-to-end tests
```

No route groups (e.g. `(marketing)`) — nearly the whole site is marketing
content, so a flat `app/` structure is clearer. Don't add generic wrapper
components (`Card`, `Container`, etc.) or new abstractions unless there's
real duplication to justify them.

## Future integrations

Add Supabase, Stripe, Resend, a Contact page, or a contact form only when a
concrete feature needs them, e.g. a lead CRM, session history, or payment
records. This is a small coaching business site, not an enterprise app;
prefer boring, managed functionality over custom infrastructure unless
custom behavior materially improves the customer experience or the
business. Cal.com (booking) is already integrated; see
[Booking (Cal.com) setup](#booking-calcom-setup) for what's still required.

## Booking (Cal.com) setup

`/book` embeds Cal.com inline; the app never talks to Cal.com's API
directly and owns no scheduling logic. Cal.com owns availability, conflict
detection, time zones, booking creation, rescheduling, cancellations,
limits, and buffers.

**Still required from the business owner before this goes live:**

1. **Cal.com account**: done. The live account is `jackson-mckeigue-nhhaaa`
   (default in `lib/cal.ts`; override with `NEXT_PUBLIC_CAL_USERNAME` if it
   ever changes, see [Environment variables](#environment-variables)).
2. **Event types**: only one exists today, `lacrosse-training`, and all
   three offerings in `lib/services.ts` point at it for now (each
   offering's `calSlug` field). To give each format its own event type
   (recommended so Cal.com can enforce per-format duration/limits), create
   two more event types and update `calSlug` for Partner and Small Group
   to their new slugs; Private can keep using `lacrosse-training` or move
   to a dedicated slug too, up to you.
3. **Add booking questions** to each event type (keep it minimal and
   parent/guardian-first; suggested stable identifiers in parentheses):
   - Parent/Guardian Name, required (`parent-guardian-name`)
   - Parent/Guardian Email, required (`parent-guardian-email`)
   - Phone, optional (`phone`)
   - Athlete First Name, required (`athlete-first-name`)
   - Graduation Year, required (`graduation-year`)
   - School/Club, optional (`school-club`)
   - Experience Level, optional (`experience-level`)
   - What would you like to work on?, optional (`session-goals`)

   Don't collect a home address, full date of birth, medical information,
   or other information the business doesn't operationally need.
4. **Decide the Partner/Small Group capacity model** and configure Cal.com
   to match; the app makes no assumption either way:
   - **Closed group** (default-friendly): one parent books the whole slot
     and supplies the group's info. No Cal.com "seats" needed.
   - **Open enrollment**: separate families independently book seats in
     the same slot. Enable Cal.com's seats feature on the Partner and
     Small Group event types and set the seat count there.

   Private Goalie Training should always stay a single booking/athlete
   slot regardless of which model is chosen for the other two.
5. **Confirm scheduling settings** in Cal.com (not in this app): the live
   event currently shows `America/New York`, functionally the same UTC
   offset as `America/Detroit` but worth explicitly setting the latter (or
   whichever is correct) rather than leaving it as a default. Also confirm:
   a connected conflict calendar, real evening/weekend availability, a
   sensible booking horizon, minimum notice, before/after session buffers,
   and a rescheduling/cancellation policy.
6. **Location**: the booking page currently reads "Ann Arbor / Southeast
   Michigan, confirmed after booking" rather than a residential address.
   Once a real recurring location exists, move it into each event type's
   Cal.com location field instead of (or in addition to) this page copy.

Verified live in a real browser against the real account: the calendar,
available dates, and time slots all render correctly with no console
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
| `jackson-mckeigue-headshot.jpg`      | Homepage + About hero    |
| `training-hero-goalie-save.jpg`       | Training hero banner      |
| `training-save-technique.jpg`          | Training philosophy section |
| `training-goalie-clearing.jpg`          | Training "complete goalie development" section |
| `jackson-collegiate-goalie.jpg`          | About playing-background section |
| `coach-on-field.jpg`                      | About coaching-experience section |

When cropping a new photo with `object-position`, check the crop against the
source at desktop and mobile widths — a container aspect ratio far from the
source's native ratio can crop out the subject. Still needed: business phone
number (email is set in `lib/site-config.ts`).

## Environment variables

| Variable                   | Required | Purpose                                                        |
| --------------------------- | -------- | ---------------------------------------------------------------- |
| `NEXT_PUBLIC_CAL_USERNAME`   | No | Cal.com username/team slug; see [Booking (Cal.com) setup](#booking-calcom-setup). Defaults to the real account (`jackson-mckeigue-nhhaaa`) in `lib/cal.ts`; only set this if the account changes. |

When further integrations (Resend, etc.) are added:

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
