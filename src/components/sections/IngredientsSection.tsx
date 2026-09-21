import { Check } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { benefitBadges, ingredientCards } from '@/data/content'

export function IngredientsSection() {
  return (
    <section className="py-16 sm:pb-20">
      <Container>
        <SectionHeading
          eyebrow="Premium Ingredients"
          eyebrowUnderline
          title="Powered by"
          accent="Best Ingredients"
          align="center"
          subtitle="Our formulations combine scientifically-proven active ingredients with natural extracts for superior curl care."
          className="mx-auto"
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ingredientCards.map((ingredient) => (
            <article
              key={ingredient.id}
              className="relative flex min-h-[360px] flex-col justify-center overflow-hidden rounded-[20px] bg-white/30 p-8 shadow-sm backdrop-blur-md"
            >
              {/* Subtle looping background video per ingredient, matching
                  production's low-opacity motion texture behind the card
                  content. */}
              <video
                src={ingredient.video}
                autoPlay
                loop
                muted
                playsInline
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 size-full object-cover opacity-15"
              />

              <div className="relative z-10 mb-5 flex size-[72px] items-center justify-center overflow-hidden rounded-full bg-sky-300/20">
                <img
                  src={ingredient.icon}
                  alt=""
                  aria-hidden="true"
                  className="size-16 object-contain"
                  loading="lazy"
                />
              </div>

              <h3 className="relative z-10 text-lg font-bold text-brand-navy">
                {ingredient.title}
              </h3>
              <p className="font-script relative z-10 mt-2 text-base leading-relaxed text-muted-foreground">
                {ingredient.description}
              </p>

              <p className="relative z-10 mt-4 text-sm font-bold tracking-widest text-brand-navy uppercase">
                Premium Ingredients
              </p>
              <ul className="relative z-10 mt-3 space-y-2">
                {ingredient.features.map((feature) => (
                  <li
                    key={feature}
                    className="font-script flex items-center gap-2 text-base text-muted-foreground"
                  >
                    <Check className="size-5 shrink-0 text-brand-cyan" />
                    {feature}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <ul className="mt-10 flex flex-wrap items-center justify-around gap-x-8 gap-y-3 rounded-[20px] border border-black/15 bg-white/[0.08] px-6 py-4">
          {benefitBadges.map((badge) => (
            <li
              key={badge}
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground"
            >
              <Check className="size-4 text-brand-cyan" />
              {badge}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
