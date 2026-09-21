import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/layout/Container'
import { CurvedTagline } from '@/components/layout/CurvedTagline'
import { WaveDivider } from '@/components/layout/WaveDivider'
import { cn } from '@/lib/utils'
import { products } from '@/data/content'

const PRODUCT_COUNT = products.length

// Shortest signed distance from `selected` to `index` around the cycle, so
// clicking "next" from the last item always animates forward into the
// first item instead of spinning back the long way around.
function cyclicOffset(index: number, selected: number) {
  let diff = index - selected
  if (diff > PRODUCT_COUNT / 2) diff -= PRODUCT_COUNT
  if (diff < -PRODUCT_COUNT / 2) diff += PRODUCT_COUNT
  return diff
}

export function ProductShowcaseCarousel() {
  const [selected, setSelected] = useState(0)

  const previous = () =>
    setSelected((current) => (current - 1 + PRODUCT_COUNT) % PRODUCT_COUNT)
  const next = () => setSelected((current) => (current + 1) % PRODUCT_COUNT)

  return (
    <>
      {/*
        Decorative cloud silhouette sitting above the cyan wave that leads
        into the dark bowl-shaped carousel section below — matches the
        production site's "essential-clouds" treatment at this boundary.
      */}
      <div className="relative z-10 -mb-6 mr-auto w-2/3 sm:-mb-15 sm:w-1/2 lg:w-2/5">
        <img
          src="/images/cloudsimage.webp"
          alt=""
          aria-hidden="true"
          className="pointer-events-none h-auto w-full select-none"
        />
      </div>

      {/*
        Percentage margin (resolves against width, same as the wave's own
        `aspect-[1920/169]` height) so the overlap amount scales consistently
        across viewport widths — see HeroSection.tsx for the full rationale.
        -3.802% here is a smaller overlap than the hero/brand-banner waves'
        exact -8.802% cancellation, by request; that leaves a bit of the
        section above showing through beneath the wave rather than a flush
        seam.
      */}
      <div className="relative z-20 -mb-[3.802%] text-brand-cyan">
        <WaveDivider color="currentColor" />
      </div>

      {/*
        Three nested decorative ellipses, all `#76468A`, at decreasing
        opacity from outer to inner (100% / 38% / 20%) — per the exact Figma
        layer values — behind the main content bowl, giving the edge a soft
        rim-glow instead of a hard single-color curve.
      */}
      <div className="relative">
        <div
          className="absolute inset-0 rounded-b-[50%_100%] bg-[#76468A]/20"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-[0.6%] top-0 bottom-[2.5%] rounded-b-[50%_100%] bg-[#76468A]/38"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-[1.2%] top-0 bottom-[5%] rounded-b-[50%_100%] bg-[#76468A]"
          aria-hidden="true"
        />

        <section
          id="products"
          className="relative mx-[2.4%] overflow-hidden rounded-b-[50%_100%] pt-8 pb-16 text-white sm:pt-65 sm:pb-24"
        >
        <Container>
          {/*
            Custom focus-carousel: every product is absolutely stacked and
            positioned purely by its offset from `selected` (translateX +
            scale + blur + opacity), so advancing `selected` animates every
            item's transform in one continuous motion — the previous center
            item shrinks/blurs into a side slot, the side item that becomes
            the new center grows sharp, and the next one slides in — rather
            than swapping discrete slide components in and out.
          */}
          <div className="relative mx-auto flex h-[340px] max-w-4xl items-center justify-center pb-20 sm:h-80 sm:pb-[200px]">
            {products.map((product, index) => {
              const offset = cyclicOffset(index, selected)
              const isCenter = offset === 0
              const visible = Math.abs(offset) <= 1

              return (
                <button
                  key={product.id}
                  type="button"
                  aria-label={`Show ${product.name}`}
                  aria-current={isCenter}
                  onClick={() => setSelected(index)}
                  className="absolute flex flex-col items-center gap-2 transition-[transform,filter,opacity] duration-500 ease-out sm:gap-4"
                  style={{
                    transform: `translateX(${offset * 145}%) scale(${isCenter ? 1 : 0.65})`,
                    filter: isCenter
                      ? `drop-shadow(0 20px 30px ${product.tint}55)`
                      : 'blur(2px)',
                    opacity: visible ? (isCenter ? 1 : 0.55) : 0,
                    zIndex: isCenter ? 30 : 10,
                    pointerEvents: visible ? 'auto' : 'none',
                  }}
                  tabIndex={visible ? 0 : -1}
                >
                  <div className="relative flex h-[340px] w-44 items-center justify-center sm:h-[500px] sm:w-64">
                    {/* Background and image are independently sized, not
                        one driving the other's box via inset-0 on both — the
                        pill is shorter than the wrapper, shifted up and
                        tilted, while the product image is taller than the
                        pill and sits centered on top of it via z-index, so
                        the bottle visually crosses past the pill's top and
                        bottom edges instead of being contained inside it. */}
                    {/* The border ring is a separate, slightly larger
                        outline with the filled pill inset inside it (via
                        padding), not a `border` on the fill itself — that
                        gives a visible gap between the outline and the
                        color, including at the top, rather than the border
                        sitting flush against the fill's own edge. */}
                    <div
                      className="absolute top-1/2 z-0 h-[260px] w-full -translate-y-[58%] rotate-[-6deg] rounded-[230px] border border-white/40 p-2 sm:h-[380px]"
                      aria-hidden="true"
                    >
                      <div
                        className="size-full rounded-[220px]"
                        style={{ backgroundColor: product.tint }}
                      />
                    </div>
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="absolute top-1/2 z-10 h-[340px] w-full -translate-y-1/2 object-contain p-4 sm:h-[500px] sm:p-6"
                    />
                  </div>
                  <p
                    className={cn(
                      'text-lg font-semibold transition-opacity duration-300',
                      isCenter ? 'opacity-100' : 'opacity-0',
                    )}
                  >
                    {product.name}
                  </p>
                </button>
              )
            })}

            {/* Arrows sit at the outer edges, next to the ghost items,
                rather than clustered under the center product. Positioned
                explicitly (not relying on the flex parent's centering,
                since `absolute` takes them out of flow) a bit below center
                and closer inward than the container's true edges. */}
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="absolute top-[58%] left-4 -translate-y-1/2 rounded-full border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white sm:left-55"
              aria-label="Previous product"
              onClick={previous}
            >
              <ChevronLeft className="size-5" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="absolute top-[58%] right-4 -translate-y-1/2 rounded-full border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white sm:right-55"
              aria-label="Next product"
              onClick={next}
            >
              <ChevronRight className="size-5" />
            </Button>
          </div>

          <div
            className="mt-6 flex justify-center gap-3 sm:gap-4"
            role="tablist"
            aria-label="Products"
          >
            {products.map((product, index) => (
              <button
                key={product.id}
                type="button"
                role="tab"
                aria-selected={selected === index}
                aria-label={product.name}
                onClick={() => setSelected(index)}
                className={cn(
                  'size-10 shrink-0 overflow-hidden rounded-full border-2 bg-white/10 p-1 transition-colors sm:size-12',
                  selected === index ? 'border-brand-cyan' : 'border-white/30',
                )}
              >
                <img
                  src={product.thumbnail}
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full rounded-full object-cover"
                />
              </button>
            ))}
          </div>
        </Container>
        </section>
      </div>

      {/*
        Sits outside the bowl's `overflow-hidden` clip on purpose: the deep
        elliptical bottom curve (`rounded-b-[50%_100%]`) narrows the visible
        width fast near the edges, so wide content positioned near the
        bottom gets unevenly cut off if it's nested inside. Production keeps
        this tagline as a separate element overlapping the bowl's bottom
        edge from outside, on the white background below, instead.
      */}
      {/*
        Negative bottom margin compensates for the tagline SVG's own
        `overflow: visible` — the curved-text path dips below its declared
        viewBox, leaving dead space under the box before the next section's
        own top padding stacks on top of it. Without this, section six's top
        reads as a much bigger empty gap than intended.
      */}
      <Container className="relative z-30 -mb-8 sm:-mb-12">
        <CurvedTagline
          text="Experience the power of hydration in every drop."
          className="mx-auto mt-2 block h-auto w-full max-w-4xl sm:-mt-12"
        />
      </Container>
    </>
  )
}
