import { Container } from '@/components/layout/Container'
import { GradientButton, OutlineButton } from '@/components/layout/GradientButton'
import { revolutionStats } from '@/data/content'

export function NewsletterCtaSection() {
  return (
    <section
      className="relative z-10 -mt-8 overflow-hidden pt-24 pb-16 text-white sm:-mt-12 sm:pt-28 sm:pb-20 lg:-mt-16 lg:pt-32"
    >
      <svg
        viewBox="0 0 1920 500"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 size-full text-brand-navy"
      >
        <path
          d="M0 28C180 42 300 24 470 34C650 46 770 66 960 70C1150 66 1270 46 1450 34C1620 24 1740 42 1920 28V500H0V28Z"
          fill="currentColor"
        />
      </svg>
      <Container className="relative grid items-center gap-10 lg:grid-cols-[1.3fr_0.7fr]">
        <div>
          <h2 className="text-3xl font-bold sm:text-4xl">
            Join the Curly Hair Revolution
          </h2>
          <p className="font-script mt-4 max-w-xl text-lg text-white/70">
            Transform your curly hair journey with expert guidance, premium
            products, and a supportive community.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <GradientButton href="#products">Explore Products</GradientButton>
            <OutlineButton
              href="#curly-girl-method"
              className="border-white/40 text-white hover:bg-white/10 hover:text-white"
            >
              Learn Curly Girl Method
            </OutlineButton>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-6">
          {revolutionStats.map((stat) => (
            <div key={stat.label}>
              <dt className="text-3xl font-bold text-brand-cyan">{stat.value}</dt>
              <dd className="mt-1 text-sm text-white/70">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  )
}
