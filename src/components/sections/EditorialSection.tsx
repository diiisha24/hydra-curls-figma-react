import type { CSSProperties } from 'react'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { editorialCards } from '@/data/content'
import { cn } from '@/lib/utils'

export function EditorialSection() {
  return (
    <section id="curly-girl-method" className="bg-white pt-16 sm:pt-20">
      <Container>
        <SectionHeading
          eyebrow="Learn & Grow"
          title="Your Curly Hair"
          accent="Journey Starts Here"
          align="center"
          subtitle="Access expert guides, styling tips, and a community of women who celebrate their natural curls."
          className="mx-auto"
        />
      </Container>

      {/* Full-bleed breakout: escapes the Container's max-w-7xl so the split
          cards span the full viewport width edge-to-edge, matching the
          production reference (px-0 alone doesn't do this — max-w-7xl still
          caps and centers the row at 1280px). */}
      <div className="relative left-1/2 right-1/2 mt-10 w-screen -mx-[50vw] overflow-x-hidden">
        <div className="flex flex-col">
          {editorialCards.map((card, index) => {
            const photoOnLeft = card.photoSide === 'left'
            // Photo always bleeds a plain 2rem past the row's true midpoint
            // — this is just the safety margin that guarantees photo
            // content backs the color panel's wave motif (see the color
            // half below); it does NOT need to track the color panel's own
            // width.
            const photoWidthClass = 'sm:w-[calc(50%+2rem)]'
            // Even rows (row 2 of 3, 1-indexed) get a wider color panel than
            // odd rows — a deliberate stagger so this row's wave doesn't
            // land at the exact same x as rows 1/3. The wave's own
            // backgroundPosition offset stays a fixed `2rem` (unchanged
            // below) rather than scaling with this width: since the offset
            // is measured from THIS panel's own edge, widening the panel
            // while holding the offset fixed is exactly what moves the
            // wave's absolute position — that's the whole mechanism the
            // shift relies on. (Scaling the offset to match the width, as
            // an earlier version did, cancels the shift out entirely and
            // just enlarges the invisible safety margin instead.) 2rem of
            // photo backing is still enough to cover the wave whether it's
            // sitting at the row's true midpoint or shifted further out by
            // this panel's extra width, since the shift moves the wave
            // toward the photo's own (untouched, still-2rem-deep) territory,
            // not away from it.
            const isEvenRow = index % 2 === 1
            const colorWidthClass = isEvenRow
              ? 'sm:w-[calc(50%+3.7rem)]'
              : 'sm:w-[calc(50%+2rem)]'

            return (
              <article
                key={card.id}
                className="relative flex flex-col sm:h-[440px] lg:h-[500px]"
              >
                {/* Photo half.
                    At `sm:` and up both halves switch to `absolute` (inside
                    this `relative` article) instead of a flex row, and BOTH
                    grow to `calc(50%+2rem)` — 2rem past the row's true
                    midpoint on their own side — so photo and color always
                    overlap in a fixed, center-anchored 4rem-wide zone,
                    regardless of which side either one is on. See the color
                    half below for why this matters (it's what the wave
                    actually needs behind it). Below `sm:`, this stays plain
                    `relative` flow so the halves just stack via the
                    article's `flex flex-col`. */}
                <div
                  className={cn(
                    'relative z-0 order-1 aspect-[4/5] w-full overflow-hidden',
                    'sm:absolute sm:inset-y-0 sm:order-none sm:aspect-auto',
                    photoWidthClass,
                    photoOnLeft ? 'sm:left-0' : 'sm:right-0',
                  )}
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    loading="lazy"
                    className="absolute inset-0 size-full object-cover"
                  />
                </div>

                {/* Color half with text content */}
                <div
                  className={cn(
                    // z-10: flex items with the default `z-index:auto` paint
                    // in ORDER-MODIFIED document order, not raw DOM order —
                    // so when this panel is visually first (`sm:order-1`,
                    // photoOnLeft === false), it would otherwise paint BEHIND
                    // the photo panel (`sm:order-2`) in their shared overlap
                    // zone, hiding this panel's wavy edge under the opaque
                    // photo. An explicit z-index pulls it into its own
                    // stacking context so it always paints on top, regardless
                    // of which side it's on for a given card. (Now that both
                    // halves are `absolute`, `order` no longer affects paint
                    // order anyway — but z-10 is kept as the explicit,
                    // no-longer-order-dependent source of truth.)
                    //
                    // Why BOTH panels need a symmetric 2rem overlap around
                    // the true center, not just this one: an earlier version
                    // only widened this panel (`calc(50%+2rem)`, pulled
                    // toward the photo with `-ml-8`/`-mr-8`) while the photo
                    // stayed a plain `w-1/2`. Because that bleed was mirrored
                    // (left for photoOnLeft, right otherwise), the seam
                    // landed at 50%-32px for cards 1/3 but 50%+32px for card
                    // 2 — misaligned between stacked rows. Removing the
                    // bleed entirely (both halves flush at a plain 50%) fixed
                    // the alignment but broke something else: the wave SVG's
                    // own fill pulls back from this panel's edge in places
                    // (that's what makes it a "wave" and not a straight
                    // line), and with zero overlap there was no longer any
                    // photo underneath to show through those gaps — just the
                    // page's own white background leaking through. Giving
                    // The photo panel's own `calc(50%+2rem)` bleed (above)
                    // guarantees photo content sits behind this panel's
                    // entire wave motif whether this row is shifted or not.
                    // The wave itself is anchored `2rem` in from THIS
                    // panel's own near edge (see backgroundPosition below) —
                    // for odd rows that lands it exactly at the row's true
                    // midpoint (edge at 50%+2rem, minus the 2rem offset);
                    // for the even row, this panel's edge moves out to
                    // 50%+3.7rem while the offset stays a fixed 2rem, which
                    // is what shifts that row's wave 1.7rem past center.
                    'relative z-10 order-2 flex w-full flex-col justify-center bg-[var(--panel-color)] px-6 py-10 text-white',
                    'sm:absolute sm:inset-y-0 sm:order-none sm:h-auto sm:bg-transparent sm:px-10 sm:py-0 lg:px-14',
                    colorWidthClass,
                    photoOnLeft ? 'sm:right-0' : 'sm:left-0',
                  )}
                  style={{ '--panel-color': card.color } as CSSProperties}
                >
                  {/* Wavy seam pulled directly from production
                      (hydracurls.co/images/{first,second,third}background.svg,
                      saved locally as editorial-wave-*.svg) — each is a
                      solid rect filled with this card's own color, with a
                      wobbly edge on the side that meets the photo, instead of
                      a flat straight seam. Only shown at sm+, since panels
                      stack (no vertical seam to speak of) on mobile.

                      Sized to `auto 100%` (match the panel's height, let
                      width scale proportionally) rather than `cover` —
                      production's own box is exactly as tall as the SVG's
                      `viewBox` (632px), so height-matching reproduces the
                      wave at its true, intended amplitude. `cover` would
                      instead scale by whichever dimension our differently-
                      proportioned panel needs more, which can shrink the
                      ~16px-wide wave motif down to just a couple of visible
                      pixels — reads as "no wave" even though the image is
                      loading correctly.

                      backgroundPosition uses the standard CSS edge-offset
                      syntax (`left 2rem center` / `right 2rem center`) —
                      this is a literal, unambiguous "2rem in from that edge"
                      offset (unlike a percentage, which would go through the
                      container-minus-image formula), landing the wave at
                      this panel's own-edge-plus-2rem, which is exactly the
                      row's true midpoint given the matching 2rem bleed
                      above. */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 hidden bg-no-repeat sm:block"
                    style={{
                      backgroundImage: `url(${card.waveBackground})`,
                      backgroundSize: 'auto 100%',
                      backgroundPosition: photoOnLeft ? 'left 2rem center' : 'right 2rem center',
                    }}
                  />
                  <div className="relative">
                    <p className="font-script relative inline-block w-fit text-lg tracking-wide sm:text-xl">
                      {card.eyebrow}
                      <svg
                        viewBox="0 0 180 10"
                        aria-hidden="true"
                        className="absolute -bottom-1.5 left-0 h-2 w-full text-white/70"
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
                    <h3 className="mt-4 text-2xl font-bold sm:text-[28px]">{card.title}</h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-white/85 sm:text-base">
                      {card.description}
                    </p>
                    <button
                      type="button"
                      className="group mt-6 inline-flex w-fit items-center gap-2 text-sm font-bold tracking-wide uppercase transition-opacity hover:opacity-80"
                    >
                      Explore Now
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
