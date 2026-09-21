import { Container } from '@/components/layout/Container'
import { GradientButton, OutlineButton } from '@/components/layout/GradientButton'
import { featureBadges } from '@/data/content'

// Icons matched 1:1 to `featureBadges` order (content.ts): SLS-free claim,
// hydration claim, hair-type claim. Assets pulled from the production site.
const badgeIcons = [
  { src: '/icons/charm_circle-tick.svg', alt: 'Checkmark' },
  { src: '/icons/ic_outline-water-drop.svg', alt: 'Water drop' },
  { src: '/icons/boxicons_sparkles.svg', alt: 'Sparkle' },
]

export function ProductIntroSection() {
  return (
    <section
      id="new-launch"
      className="relative overflow-hidden bg-brand-tint pt-16 sm:pt-20">
      <img
        src="/images/leaves.webp"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 w-40 select-none opacity-80 sm:w-56 md:w-72"
      />

      <Container className="relative z-20 grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-4">
        <div className="order-2 flex flex-col gap-4 lg:order-1">
          <div className="flex flex-col items-center gap-1 md:items-start">
            <p className="font-script text-xl text-brand-navy">New In Store</p>
            <img
              src="/images/curlyline.svg"
              alt=""
              aria-hidden="true"
              className="h-auto w-24"
            />
            <div className="mt-1 w-28 sm:w-32 md:w-36">
              <img
                src="/images/hydracurllaunchlogo.webp"
                alt="Parachute Advansed Hydra Curls"
                className="h-auto w-full"
              />
            </div>
          </div>

          <p className="font-script text-center text-lg leading-relaxed text-muted-foreground sm:text-xl md:text-left">
            Introducing a revolutionary hair care range specially designed for
            Arab curly, coily &amp; wavy hair. Experience{' '}
            <span className="text-brand-cyan">48-hour hydration</span> with
            natural ingredients like Hyaluronic Acid, Coconut &amp; Avocado.
          </p>

          <div className="relative w-full py-2">
            <img
              src="/images/curlyhair.svg"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-0 -z-10 h-auto w-full -translate-y-1/2 opacity-60 select-none"
            />
            <ul
              className="relative z-10 flex flex-wrap justify-center gap-1.5 sm:gap-2 md:justify-start"
              aria-label="Product benefits"
            >
              {featureBadges.map((badge, index) => {
                const icon = badgeIcons[index % badgeIcons.length]
                return (
                  <li
                    key={badge.label}
                    className="inline-flex h-8 items-center gap-1.5 rounded-[8px] bg-[#00d5fd0f] px-2.5 py-1"
                  >
                    <img src={icon.src} alt="" aria-hidden="true" className="size-4" />
                    <span className="text-[11px] font-bold tracking-[2px] text-[#737373] uppercase sm:text-sm">
                      {badge.label}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="flex w-full flex-col items-center gap-2 pt-3 sm:flex-row sm:gap-3 md:items-start">
            <GradientButton
              href="#products"
              withIcon={false}
              className="uppercase tracking-[2px]"
            >
              Explore Products
              <img
                src="/icons/buynowrightarrow.svg"
                alt=""
                aria-hidden="true"
                className="size-5"
              />
            </GradientButton>
            <OutlineButton href="#curly-girl-method" className="uppercase tracking-[2px]">
              Learn Curly Girl Method
            </OutlineButton>
          </div>
        </div>

        <div className="relative order-1 flex min-h-[300px] items-center justify-center sm:min-h-[380px] lg:order-2 lg:min-h-[560px]">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center select-none">
            <img
              src="/images/water-splash.webp"
              alt=""
              aria-hidden="true"
              className="w-[90%] max-w-[628px] object-contain opacity-80 sm:w-[80%] lg:w-full"
            />
          </div>
          <div className="pointer-events-none absolute -top-[10%] right-[20%] z-20 w-[140px] origin-top-left rotate-[19.60deg] transform select-none md:right-[30%] md:w-[200px]">
            <img
              src="/images/SHAMPOO.webp"
              alt="Hydra Curls Shampoo bottle"
              className="h-auto w-full object-contain"
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
