import { Container } from '@/components/layout/Container'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { influencerPosts } from '@/data/content'
import { cn } from '@/lib/utils'

// Tile mat colors from the Figma palette, cycled across the grid.
const TILE_COLORS = ['#5365BB', '#76468A', '#009ABA'] as const

// Same chevron-notch shapes used for the seam between EditorialSection's
// photo/color panels, reused here for the wavy joint down the middle of the
// grid — cut into each tile's colored mat rather than the grid gap, so
// adjoining tiles interlock instead of just touching along a straight line.
const leftEdgeNotch = '[clip-path:polygon(0_0,100%_0,100%_100%,0_100%,0_54%,4%_50%,0_46%)]'
const rightEdgeNotch = '[clip-path:polygon(0_0,100%_0,100%_46%,96%_50%,100%_54%,100%_100%,0_100%)]'
const noNotch = '[clip-path:none]'

/**
 * The grid is 2 columns on mobile and 4 columns on desktop, so the vertical
 * center line lands on a different pair of tiles at each breakpoint. This
 * picks the right notch (or none, for tiles that sit on an outer edge at
 * that breakpoint) for both column counts based on the tile's index.
 */
function centerJointClip(index: number) {
  switch (index % 4) {
    case 0:
      return cn(rightEdgeNotch, `sm:${noNotch}`)
    case 1:
      return cn(leftEdgeNotch, `sm:${rightEdgeNotch}`)
    case 2:
      return cn(rightEdgeNotch, `sm:${leftEdgeNotch}`)
    default:
      return cn(leftEdgeNotch, `sm:${noNotch}`)
  }
}

export function InfluencerGridSection() {
  return (
    <section className="overflow-x-hidden bg-white py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Influencer Approved"
          title="See What The"
          accent="Experts Are Saying"
          align="center"
          className="mx-auto"
        />
      </Container>

      {/* Full-bleed breakout: escapes the Container's max-w-7xl + side padding
          so the grid spans the full viewport width, flush edge-to-edge. */}
      <div className="relative left-1/2 right-1/2 mt-10 w-screen -mx-[50vw]">
        <div className="grid grid-cols-2 sm:grid-cols-4">
          {influencerPosts.map((post, i) => (
            <div
              key={post.id}
              className={cn('', centerJointClip(i))}
              style={{ backgroundColor: TILE_COLORS[i % TILE_COLORS.length] }}
            >
              <img
                src={post.image}
                alt={post.caption}
                className="aspect-[3/4] w-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
