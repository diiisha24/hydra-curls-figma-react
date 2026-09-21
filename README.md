# Assignment 1 — Figma to Responsive React Page

Recreation of the "Hydra Curls" (Parachute Advanced) hair-care landing page
from the provided Figma file, as a responsive React application.

Figma: https://www.figma.com/design/Yqq9qC4hZqj0adhv5kJUNG/Untitled?node-id=1-503

## Tech stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4
- shadcn/ui (Radix primitives) — Button, Card, Badge, Input, Separator, Carousel, Sheet
- Self-hosted fonts via Fontsource (Poppins, Kaushan Script) — no external font CDN calls

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to dist/
npm run preview  # preview the production build
```

## Project structure

```
src/
  components/
    ui/         shadcn primitives
    layout/     Header, Footer, Container, SectionHeading, GradientButton, Placeholder, WaveDivider
    sections/   One component per landing-page section (hero, product intro, ingredients, testimonials, ...)
  data/
    content.ts  Single source of truth for all copy/content, extracted from the Figma file
  App.tsx       Composes the sections in page order
```

Each landing-page section is its own component, and all copy lives in
`src/data/content.ts` rather than being hardcoded inline, so content edits
and future CMS/API wiring don't require touching JSX.

## Hero background video

The hero reproduces the live site's scroll-scrubbed product animation: the
video doesn't autoplay — `src/components/sections/HeroSection.tsx` maps
scroll position within a tall pinned (`sticky`) wrapper onto the video's
`currentTime`, so the bottle animates in as you scroll, matching
hydracurls.co's behavior. It falls back to a static frame when
`prefers-reduced-motion` is set. The source files
(`public/media/hero-scroll-{desktop,mobile}.mp4`) are re-encoded,
web-optimized copies of the brand's own production video, used here only
to accurately recreate their own design for this assignment.

## Known limitation — placeholder imagery

Real exported product/model photography for the rest of the page (product
bottles, ingredient icons, testimonial portraits, influencer grid, etc.)
wasn't available to pull via the Figma API during development (no
collaborator access at the time of building). Every such slot is rendered
by a `<Placeholder>` component (`src/components/layout/Placeholder.tsx`) —
a labelled gradient block sized to the correct aspect ratio — so the
layout, spacing, and responsive behavior match the design even without
final assets. Swapping in real assets is a drop-in replacement of
`<Placeholder>` with `<img>` at each call site; no layout changes needed.

## Responsiveness

Verified with Playwright screenshots at desktop (1440px), tablet (834px),
and mobile (390px) viewports — no horizontal overflow, no console/runtime
errors, mobile navigation via a slide-in sheet with a hamburger trigger.

## AI tools used

- **Claude Code** (Sonnet 5) — used for the full build: component
  architecture, Tailwind/shadcn setup, translating the Figma reference
  into responsive React components, and automated verification (type
  checking, production build, and Playwright-driven visual/responsive
  checks across breakpoints).

## Total development time

[TBD — fill in actual hours spent before submission]
