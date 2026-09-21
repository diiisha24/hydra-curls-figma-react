import { useEffect, useRef, useState } from 'react'
import { ChevronDown, ChevronUp, Star } from 'lucide-react'
import { BeforeAfterSlider } from '@/components/layout/BeforeAfterSlider'
import { CircularBadge } from '@/components/layout/CircularBadge'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { testimonials } from '@/data/content'

/** Roughly one card's worth of scroll distance (card height + stack gap),
 * used as a sane fallback before the first card has been measured. */
const FALLBACK_SCROLL_STEP = 220
const STACK_GAP_PX = 16

/** Fixed per-card tilt (alternating left/right) that makes the stack read as
 * interlocked photos rather than a plain list, on top of which a
 * scroll-driven tilt is added/subtracted as each card moves through the
 * container — cards flatten out as they near the center and lean further
 * as they scroll toward the top/bottom edge. */
const BASE_TILT_DEG = 2.5
const SCROLL_TILT_DEG = 4
const BASE_OFFSET_PX = 8

const SWIRL_PATH =
  'M354.114 32.296C397.652 73.6992 412.959 153.027 355.578 218.477C317.488 261.924 255.113 272.867 194.801 266.055C207.71 299.6 224.494 327.633 239.514 341.917C262.677 363.944 293.689 378.505 293.998 378.652C298.117 380.663 301.314 384.276 302.903 388.716C304.492 393.155 304.345 398.066 302.496 402.394C300.646 406.722 297.24 410.122 293.01 411.864C288.779 413.605 284.062 413.55 279.871 411.709C278.398 411.027 243.515 394.728 216.084 368.642C193.032 346.72 169.966 305.868 155.158 259.05C109.099 247.985 68.0216 227.839 45.0125 205.958C17.5813 179.871 3.96841 141.458 3.44035 139.878C0.0559208 129.766 -2.3226 122.979 3.70529 119.449C9.56545 116.021 13.8882 123.774 20.5016 131.599C20.7262 131.862 35.8893 152.62 66.1004 181.35C81.0862 195.601 111.655 208.287 144.825 218.578C132.851 156.827 137.575 91.4519 175.47 48.2282C233.171 -17.6044 310.577 -9.10722 354.114 32.296ZM182.539 227.766C237.199 237.519 296.357 232.354 329.917 194.075C377.216 140.125 355.489 82.6105 330.684 59.0213C305.887 35.4402 248.78 18.2635 201.122 72.6227C167.773 110.662 168.265 172.144 182.539 227.766Z'

/**
 * The same scribble/loop motif reused at different sizes, rotations, and
 * opacities to scatter it around the section (per the Figma reference,
 * which repeats this exact swirl rather than using distinct artwork per
 * spot) instead of needing a unique SVG per doodle.
 */
function SwirlDoodle({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 393 414"
      fill="none"
      aria-hidden="true"
      className={cn('pointer-events-none absolute h-auto select-none', className)}
    >
      <path d={SWIRL_PATH} fill="white" fillOpacity="0.15" />
    </svg>
  )
}

export function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLElement | null)[]>([])
  const [atTop, setAtTop] = useState(true)
  const [atBottom, setAtBottom] = useState(false)
  const [tilts, setTilts] = useState<number[]>(() => testimonials.map(() => 0))

  const updateScrollState = () => {
    const el = scrollRef.current
    if (!el) return
    // 1px tolerance guards against sub-pixel rounding keeping a button
    // permanently (and incorrectly) enabled/disabled.
    setAtTop(el.scrollTop <= 1)
    setAtBottom(el.scrollTop + el.clientHeight >= el.scrollHeight - 1)

    const containerRect = el.getBoundingClientRect()
    const containerCenter = containerRect.top + containerRect.height / 2
    setTilts(
      cardRefs.current.map((card, i) => {
        if (!card) return 0
        const cardRect = card.getBoundingClientRect()
        const cardCenter = cardRect.top + cardRect.height / 2
        const normalizedDistance = Math.max(
          -1,
          Math.min(1, (cardCenter - containerCenter) / (containerRect.height / 2)),
        )
        const sign = i % 2 === 0 ? 1 : -1
        return sign * BASE_TILT_DEG + normalizedDistance * SCROLL_TILT_DEG
      }),
    )
  }

  const scrollByCard = (direction: 1 | -1) => {
    const el = scrollRef.current
    if (!el) return
    const step = (cardRefs.current[0]?.offsetHeight ?? FALLBACK_SCROLL_STEP) + STACK_GAP_PX
    el.scrollBy({ top: direction * step, behavior: 'smooth' })
  }

  // Establish the initial up/down disabled state and tilt values (and keep
  // them correct across viewport/content size changes) rather than relying
  // only on onScroll, which never fires until the user actually scrolls.
  useEffect(() => {
    updateScrollState()
    const el = scrollRef.current
    if (!el) return
    const observer = new ResizeObserver(updateScrollState)
    observer.observe(el)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className="relative isolate overflow-hidden py-16 sm:py-20">
      <img
        src="/images/testimonials-bg-waves.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 size-full object-cover select-none"
      />

      {/* Scattered swirl doodles layered over the wavy background, clipped
          by the section's own overflow-hidden — sizes/rotations/positions
          approximate the Figma reference's scattered layout. */}
      <SwirlDoodle className="-top-16 right-0 w-96 sm:w-[34rem]" />
      <SwirlDoodle className="top-8 left-[-60px] w-40 -rotate-[35deg] opacity-70 sm:w-56" />
      <SwirlDoodle className="top-1/3 right-[4%] w-32 rotate-[20deg] opacity-60 sm:w-48" />
      <SwirlDoodle className="bottom-4 left-[6%] w-48 rotate-[150deg] opacity-50 sm:w-64" />
      <SwirlDoodle className="bottom-0 left-1/2 w-32 -translate-x-1/2 rotate-[80deg] opacity-40 sm:w-40" />

      {/* Rotating "Hydra Curls" corner accent, overlapping the section's
          background in the top-right corner — clipped by overflow-hidden. */}
      <CircularBadge
        text="Hydra Curls"
        size={110}
        className="absolute -top-6 -right-6 z-10 sm:-top-8 sm:-right-8"
      />

      <Container className="relative grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <BeforeAfterSlider
          beforeSrc="/images/testimonial-before.webp"
          afterSrc="/images/testimonial-after.webp"
          beforeAlt="Hair before using Hydra Curls"
          afterAlt="Hair after using Hydra Curls"
          className="aspect-[4/5] w-full"
        />

        <div className="relative">
          <p className="font-script text-lg text-muted-foreground">
            Real Women, Real Results
          </p>
          <h2 className="mt-2 text-3xl font-bold text-brand-navy sm:text-4xl">
            Hear from Our <span className="text-brand-cyan">Community</span>
          </h2>

          {/* Larger decorative ring motif, mostly hidden off the section's
              right edge and behind the card stack — low opacity, no
              explicit z-index so it paints beneath the (later-in-DOM,
              default-stacked) card column below. */}
          <CircularBadge
            text="Hydra Curls"
            size={260}
            className="pointer-events-none absolute top-1/2 -right-28 hidden -translate-y-1/2 opacity-15 sm:-right-36 sm:block"
          />

          <div className="relative z-10 mt-8 flex items-start gap-3">
            <div
              ref={scrollRef}
              onScroll={updateScrollState}
              className={cn(
                'flex max-h-[480px] w-full max-w-md flex-col gap-4 overflow-y-auto scroll-smooth pr-1',
                '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
              )}
            >
              {testimonials.map((testimonial, i) => (
                <article
                  key={testimonial.name}
                  ref={(el) => {
                    cardRefs.current[i] = el
                  }}
                  className="shrink-0 rounded-2xl bg-brand-navy p-6 text-white shadow-lg transition-transform duration-300 ease-out will-change-transform"
                  style={{
                    transform: `translateX(${i % 2 === 0 ? BASE_OFFSET_PX : -BASE_OFFSET_PX}px) rotate(${tilts[i] ?? 0}deg)`,
                  }}
                >
                  <div className="flex gap-1" aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star key={starIndex} className="size-4 fill-brand-cyan text-brand-cyan" />
                    ))}
                  </div>
                  <blockquote className="mt-4 text-base leading-relaxed text-white/80">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <div className="mt-6 flex items-center gap-3">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="size-12 rounded-full object-cover"
                      loading="lazy"
                    />
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-white/60">{testimonial.location}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="flex flex-col gap-3 pt-1">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-white shadow-md disabled:opacity-40"
                aria-label="Scroll testimonials up"
                onClick={() => scrollByCard(-1)}
                disabled={atTop}
              >
                <ChevronUp className="size-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-white shadow-md disabled:opacity-40"
                aria-label="Scroll testimonials down"
                onClick={() => scrollByCard(1)}
                disabled={atBottom}
              >
                <ChevronDown className="size-5" />
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
