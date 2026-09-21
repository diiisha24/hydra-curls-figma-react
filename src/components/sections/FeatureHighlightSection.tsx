import { Container } from '@/components/layout/Container'
import { GradientButton } from '@/components/layout/GradientButton'
import { loremFeatures } from '@/data/content'
import { cn } from '@/lib/utils'

// The second card carries the real product-lineup shot (per the Figma
// reference, only the right-hand block has imagery — the left one is
// text-only). Index-based rather than id-based since `loremFeatures` is a
// fixed two-item tuple.
const PRODUCT_IMAGE_INDEX = 1

export function FeatureHighlightSection() {
  return (
    <section className="relative isolate overflow-hidden bg-brand-tint pt-16 sm:pt-20">

      {/*
        Thin, low-opacity decorative line at the top boundary — reuses the
        same stroked squiggle asset used elsewhere in this project
        (public/images/curlyhair.svg: single path, stroke-opacity 0.2, no
        fill). Deliberately not the solid WaveDivider band: per the Figma
        reference this seam is a thin thread, not a filled shape.
      */}
      <img
        src="/images/curlyhair.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-6 w-full -translate-y-1/2 object-cover opacity-80 select-none sm:h-10"
      />

      <Container className="relative grid max-w-none gap-6 px-0 sm:px-0 lg:px-0 md:grid-cols-2">
        {loremFeatures.map((feature, index) => {
          const hasProductImage = index === PRODUCT_IMAGE_INDEX

          return (
            <article
              key={feature.id}
              className={cn(
                'flex flex-col justify-center gap-4 overflow-hidden bg-brand-tint/90 bg-[length:100%_auto] bg-top bg-no-repeat p-6 pb-0 sm:p-8 sm:pb-0',
                // Subtle separator between the two zones — a hairline, not
                // a card border, since both sit on the same shared texture.
                hasProductImage &&
                  'md:border-l md:border-brand-navy/10 md:pl-6 lg:pl-10',
              )}
              style={{ backgroundImage: "url('/images/rightcontentbackground.webp')" }}
            >
              <h3 className="text-2xl font-bold text-brand-navy sm:text-3xl">
                {feature.title}
              </h3>
              <p className="max-w-md text-base leading-relaxed text-muted-foreground">
                {feature.body}
              </p>
              <GradientButton className="w-fit rounded-full px-5 py-2.5 text-sm">
                Learn More
              </GradientButton>

              {hasProductImage ? (
                <img
                  src="/images/feature-product-lineup.webp"
                  alt={feature.imageAlt}
                  loading="lazy"
                  className="mt-4 w-full max-w-md self-center object-contain md:mt-auto md:pt-8"
                />
              ) : null}
            </article>
          )
        })}
      </Container>
    </section>
  )
}
