import { CircularBadge } from '@/components/layout/CircularBadge'
import { Container } from '@/components/layout/Container'
import { ScallopWaveDivider } from '@/components/layout/ScallopWaveDivider'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { hairTypes } from '@/data/content'

export function HairTypeSection() {
  return (
    <section className="relative bg-brand-tint pt-28 sm:pt-60">
      {/*
        Diagonal slant + clouds transition from the section above, with a
        rotating circular "Hydra Curls" badge centered on the seam — matches
        the boundary treatment used going into this section in the design.
      */}
      <div
        className="absolute inset-x-0 top-0 -mt-px h-40 bg-white sm:h-56"
        style={{ clipPath: 'polygon(0px 0px, 100% 0px, 100% 0%, 0px 123%)' }}
        aria-hidden="true"
      />
      <img
        src="/images/cloudsimage.webp"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 w-1/2 max-w-sm select-none sm:w-2/5"
      />
      <CircularBadge
        text="Hydra Curls"
        size={130}
        className="absolute top-4 left-1/2 z-10 -translate-x-1/2 sm:top-20"
      />

      <Container>
        <SectionHeading
          eyebrow="Designed For You"
          title="Perfect for Arab"
          accent="Curly, Coily & Wavy Hair"
          align="center"
          subtitle="Our range is specifically formulated to meet the unique needs of Arab hair textures, providing targeted care for types 2, 3, and 4."
          className="mx-auto"
        />

        {/* Full-bleed breakout: escapes the Container's max-w-7xl + side padding
            so the photo grid spans the full viewport width edge-to-edge.
            `overflow-x-hidden` lives here (not on the outer `<section>`) —
            per the CSS overflow spec, when one axis is non-`visible` and the
            other isn't explicitly set, the other's COMPUTED value is forced
            to `auto` (not `visible`), even if you explicitly write
            `overflow-y-visible` yourself — that substitution can't be
            opted out of. Putting `overflow-x-hidden` on the outer section
            was silently turning its `overflow-y` into `auto`, and since the
            wave's drop-shadow below pushes the section's own paint slightly
            past its layout box, that showed up as a real, if tiny, nested
            scrollbar for this whole section. Scoping it to just this
            breakout div (which has no reason to overflow vertically) avoids
            the whole problem — matches the same pattern already used in
            EditorialSection.tsx and InfluencerGridSection.tsx. */}
        <div className="relative left-1/2 right-1/2 mt-10 mb-8 w-screen -mx-[50vw] overflow-x-hidden sm:mb-10">
          <div className="grid gap-6 sm:grid-cols-3">
            {hairTypes.map((type) => (
              <article key={type.id} className="group relative overflow-hidden">
                <img
                  src={type.image}
                  alt={`Woman with ${type.label.toLowerCase()} hair`}
                  loading="lazy"
                  className="aspect-[3/4] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <p className="font-script text-lg text-white">{type.label}</p>
                  <p className="text-xs text-white/70">{type.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>

      {/*
        Wavy bottom transition into the white EditorialSection below, so this
        section doesn't end in an abrupt flat cut — matches the Figma
        reference's clean, evenly-repeating scalloped wave. Filled white
        (matching EditorialSection below) so this section's own
        `bg-brand-tint` shows through the gaps between wave peaks unbroken —
        same masking idea as the rest of this codebase's wave boundaries.
        Sits flush right after the photo grid (the section itself carries no
        bottom padding) rather than after a flat padding gap. */}
      <ScallopWaveDivider color="white" className="relative z-10 -mb-10 sm:-mb-12" />
    </section>
  )
}
