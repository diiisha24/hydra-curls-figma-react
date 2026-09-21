import { Container } from '@/components/layout/Container'
import { ScallopWaveDivider } from '@/components/layout/ScallopWaveDivider'
import { promiseFeatures } from '@/data/content'

export function PromiseSection() {
  return (
    <section
      // No `overflow-hidden` here (unlike an earlier version) — it silently
      // broke the bottom wave: `overflow` != visible prevents margin
      // collapsing, so the wave's negative `-mb-*` (meant to pull
      // IngredientsSection up into an overlap) instead just shrank this
      // section's own auto-height by that same amount, which then clipped
      // the wave's own now-overflowing pixels clean off. The background SVGs
      // below are `absolute inset-0 size-full`, pinned exactly to this
      // section's box either way, so they don't need clipping to stay
      // contained.
      className="relative z-10 -mt-5 sm:-mt-20 lg:-mt-32"
    >
      <svg
        viewBox="0 0 3840 2895"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        className="absolute inset-0 block size-full md:hidden"
      >
        <path
          d="M0 0H3840V2757.99L0 2757.99V0Z"
          fill="#DAF6FF"
        />
      </svg>
      <svg
        viewBox="0 0 3840 2895"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        className="absolute inset-0 hidden size-full md:block"
      >
        <path
          d="M0 0C0 0 144.858 196.655 268 288.999C423.411 405.541 535.167 366.229 719 428.998C936.673 503.322 1057.09 619.35 1284 656.997C1516.35 695.547 1622.48 728.464 1858 726.997C2079.92 725.615 2260.75 634.386 2480 599.998C2762.51 555.688 2918.07 611.437 3181 498.998C3471.57 374.737 3840 0 3840 0V2757.99L0 2757.99V0Z"
          fill="#DAF6FF"
        />
      </svg>

      <Container className="relative z-10 mt-10 px-4 pt-[clamp(140px,18vw,280px)] pb-16 sm:px-6 sm:pb-20 lg:px-10 lg:pt-[clamp(180px,25vw,360px)]">
        <div className="mx-auto max-w-2xl px-1 text-center">
          <p className="font-script relative inline-block text-base text-muted-foreground sm:text-lg">
            The Hydra Curls Promise
            {/* Hand-drawn squiggle underline, not a straight rule — traces
                loosely under the text rather than a uniform dashed line. */}
            <svg
              viewBox="0 0 180 10"
              aria-hidden="true"
              className="absolute -bottom-1.5 left-0 h-2 w-full text-muted-foreground/60"
            >
              <path
                d="M1 5C15 2 25 8 40 5C55 2 65 8 80 5C95 2 105 8 120 5C135 2 145 8 160 5C168 3.5 172 6 179 4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          </p>
          <h2 className="mt-3 text-2xl leading-tight font-bold text-brand-navy sm:text-4xl">
            Clinically Proven <span className="text-brand-cyan">48-Hour Hydration</span>
          </h2>
          <p className="font-script mx-auto mt-3 max-w-[20rem] text-sm leading-relaxed text-muted-foreground sm:mt-4 sm:max-w-xl sm:text-base">
            Our advanced formula with Hyaluronic Acid doesn&apos;t just coat
            your hair; it penetrates the cuticle to lock in moisture from the
            inside out, providing continuous hydration for two full days.
          </p>
        </div>

        <div className="mt-8 grid items-center gap-8 sm:mt-10 sm:gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16">
          <dl className="relative mx-auto grid max-w-sm gap-5 py-1 pl-6 text-left sm:gap-6 sm:pl-7 lg:mx-0 lg:max-w-none">
            {/* Continuous wavy connector running past both feature items,
                rather than a separate icon per row — a single hand-drawn
                line threading the list together. The list is a single
                stacked column (not side-by-side) so this one overlay can
                actually pass by both rows' bullet markers. */}
            <svg
              viewBox="0 0 20 140"
              preserveAspectRatio="none"
              aria-hidden="true"
              className="pointer-events-none absolute top-0 left-0 h-full w-5 text-brand-cyan/40"
            >
              <path
                d="M10 4C4 20 16 36 10 52C4 68 16 84 10 100C6 112 12 124 10 136"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>

            {promiseFeatures.map((feature) => (
              <div key={feature.title} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-1.5 size-2.5 shrink-0 rotate-45 border-2 border-brand-cyan"
                />
                <div>
                  <dt className="font-semibold text-brand-navy">
                    {feature.title}
                  </dt>
                  <dd className="mt-1 text-sm text-muted-foreground">
                    {feature.body}
                  </dd>
                </div>
              </div>
            ))}
          </dl>

          <div className="relative mx-auto flex flex-col items-center text-center">
            {/* Plain curved connector arrow from the feature list toward the
                stat, matching the thin hand-drawn arrow accent in the design
                (solid stroke, not dashed). Authored directly tail-to-head
                (tail trails left toward the feature list, arrowhead points
                in at the clock/48) rather than via a mirror transform, so
                the arrowhead reliably lands pointing at the stat. */}
            <svg
              viewBox="0 0 160 80"
              aria-hidden="true"
              className="pointer-events-none absolute top-6 -left-28 hidden h-16 w-40 text-brand-cyan/60 lg:block"
            >
              <path
                d="M6 46C30 50 44 24 70 28C90 31 86 50 108 46C120 44 116 26 136 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M124 14L136 20L126 30"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <img
              src="/icons/promise-clock.gif"
              alt=""
              aria-hidden="true"
              className="pointer-events-none size-16 object-contain sm:size-20"
            />

            <div className="relative mt-2 flex items-start">
              <span className="text-6xl font-extrabold text-brand-navy sm:text-7xl">
                48
              </span>
              <span className="mt-1 -ml-1 rounded-full bg-brand-cyan px-2.5 py-1 text-xs font-bold text-white">
                Hours
              </span>
            </div>

            <p className="mt-2 max-w-[180px] text-xs font-medium tracking-wide text-muted-foreground uppercase">
              of continuous curl hydration and frizz control
            </p>
          </div>
        </div>
      </Container>

      {/* Wavy bottom transition into the white IngredientsSection below —
          same technique as HairTypeSection's bottom wave (see
          ScallopWaveDivider): a small tileable wave period rather than a
          single stretched path, so amplitude stays consistent at any
          viewport width. Filled white to match IngredientsSection (which
          carries no background of its own, so it shows the page's base
          white), with this section's own `#DAF6FF` background showing
          through the gaps between wave peaks. Requires the background SVG
          shapes above to have a FLAT bottom edge (they did not originally —
          see their `d` paths) since layering this on top of an already-wavy
          edge produced two conflicting waves at once. */}
      <ScallopWaveDivider color="white" className="relative z-10 -mb-10 sm:-mb-12" />
    </section>
  )
}
