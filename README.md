# Assignment 1 — Figma to Responsive React Page

Recreation of the "Hydra Curls" (Parachute Advanced) hair-care landing page
from the provided Figma file, as a fully responsive React application.

Figma: https://www.figma.com/design/Yqq9qC4hZqj0adhv5kJUNG/Untitled?node-id=1-503

- **Live URL:** https://hydra-curls-figma-react.vercel.app/
- **Repository:** https://github.com/diiisha24/hydra-curls-figma-react

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

No environment variables or backend services are required — this is a fully static site.

## Deployment

Static Vite build, deployable on Vercel with zero config (framework preset
auto-detects Vite; build command `npm run build`, output directory `dist`).

## Project structure

```
src/
  components/
    ui/         shadcn primitives
    layout/     Header, Footer, Container, SectionHeading, GradientButton,
                WaveDivider, ScallopWaveDivider, CurvedTagline, CircularBadge,
                BeforeAfterSlider
    sections/   One component per landing-page section (hero, product intro,
                ingredients, testimonials, editorial, ...)
  data/
    content.ts  Single source of truth for all copy/content, extracted from the Figma file
  App.tsx       Composes the sections in page order
```

Each landing-page section is its own component, and all copy lives in
`src/data/content.ts` rather than being hardcoded inline, so content edits
and future CMS/API wiring don't require touching JSX.

## Notable implementation details

A few things worth calling out from the build, beyond a straight Figma-to-JSX
translation:

- **Full-bleed breakout pattern.** Several sections need edge-to-edge content
  inside an otherwise centered, max-width container. Solved with a reusable
  `relative left-1/2 right-1/2 w-screen -mx-[50vw]` pattern rather than
  restructuring the page layout around each exception.
- **`ScallopWaveDivider`** (`src/components/layout/ScallopWaveDivider.tsx`) —
  a reusable, evenly-repeating wave boundary between sections, built as an
  SVG `<pattern>` tiled at a fixed pixel size and colorable via `currentColor`
  (same convention as `WaveDivider`). This replaced an earlier approach of
  stretching a single bezier path across the full section width, which
  distorted the wave's amplitude unpredictably depending on viewport width.
- **Production-accurate assets where Figma alone fell short.** A couple of
  decorative wave-seam SVGs were pulled directly from the live production
  site's asset URLs (not scraped/reverse-engineered markup, just public
  static image assets) to get pixel-accurate shapes Figma export didn't
  provide cleanly; content/copy itself always comes from Figma, never from
  production.
- **Two real CSS spec gotchas debugged and fixed**, both confirmed with
  direct DOM measurement rather than guesswork:
  - Setting `overflow-x-hidden` without an explicit `overflow-y` forces the
    latter's *computed* value to `auto` (not `visible`) per the CSS Overflow
    spec — even if you explicitly write `overflow-y-visible` yourself, that
    substitution still happens. This produced an unwanted nested scrollbar
    on one section; fixed by scoping `overflow-x-hidden` to the specific
    breakout wrapper that actually needs it, not the whole section.
  - `overflow: hidden` on a parent prevents margin collapsing, which broke a
    negative-margin section-overlap technique used for wave transitions: the
    parent's auto-height shrank to absorb the negative margin instead of
    letting it overlap the next section, silently clipping the wave.
  - A flexbox `order`-vs-paint-order quirk: items with `z-index: auto` paint
    in *order-modified* document order, not raw DOM order, which caused one
    (but not all) of a repeated card layout's decorative elements to render
    behind its sibling instead of in front. Fixed with an explicit `z-index`
    rather than relying on DOM order.
- **Mobile-specific fixes verified with real rendering, not just code
  review** — a fixed-pixel carousel control offset that overlapped the
  center item on narrow viewports, and a curved SVG tagline whose font size
  was set in real pixels independent of the SVG's own viewBox scaling
  (clipping on small screens). Both confirmed via headless Chromium
  screenshots at multiple breakpoints (320–1440px) before and after.

## Responsiveness

Verified via headless Chromium screenshots across desktop (1440px), tablet
(834px), and mobile (320–430px) viewports — no horizontal overflow, no
unintended nested scroll regions, mobile navigation via a slide-in sheet with
a hamburger trigger.

## AI tools used

- **Claude Code** (Sonnet 5) — primary tool for the full build: component
  architecture, Tailwind/shadcn setup, translating the Figma reference into
  responsive React components, dispatching parallel background agents for
  independent section rebuilds, and automated verification (`tsc`,
  production build, and headless-Chromium visual/responsive checks across
  breakpoints, including direct DOM/computed-style inspection to root-cause
  CSS bugs rather than guessing from screenshots alone).
- **GitHub Copilot** — inline completion during manual edits/review.
- **Figma MCP / plugin integration** — used at the start of the build to
  pull initial design context (layout, spacing, component structure) from
  the Figma file as a starting scaffold, refined by hand and with Claude
  Code from there.

## Total development time

Approximately **10–15 hours**, across multiple sessions — full section-by-section
build plus substantial iterative refinement (responsive fixes, cross-breakpoint
verification, and the CSS/stacking-context debugging noted above).
