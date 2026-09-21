import { useId } from 'react'
import { cn } from '@/lib/utils'

/**
 * Solid wave-shaped divider band between sections — the cyan ribbon at
 * ~1920x169 in the Figma file (Rectangle 190, fill #00D5FD), with a wavy
 * top edge and a flat bottom edge that meets the next section.
 *
 * Optionally carries an infinitely-looping brand marquee along a separate,
 * gentler curve than the visible fill shape — matching the production
 * site's exact markup (two distinct paths: one invisible curve purely for
 * text placement, one visible filled wave).
 *
 * Safe to render multiple times on the same page: the marquee's `<path id>`
 * is generated per-instance via `useId()`, so two instances never collide
 * via `url(#id)`/`href="#id"` references.
 */
export function WaveDivider({
  color = 'currentColor',
  flip = false,
  className,
  marqueeText,
  marqueeColor = '#003d4d',
}: {
  color?: string
  flip?: boolean
  className?: string
  marqueeText?: string
  marqueeColor?: string
}) {
  const reactId = useId()
  const textPathId = `wave-text-path-${reactId}`

  return (
    <svg
      viewBox="0 0 1920 169"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={cn('block aspect-[1920/169] w-full', flip && 'rotate-180', className)}
    >
      {marqueeText ? (
        <defs>
          <path
            id={textPathId}
            d="M0 50C0 50 303.465 109 502 121C805.808 133 964.431 35 1268 42C1410.69 45 1494.97 71 1637.5 79C1750.69 86 1920 69 1920 69"
            fill="none"
            stroke="none"
          />
        </defs>
      ) : null}

      <path
        d="M0 0C0 0 303.465 69.6789 502 75.1339C805.808 83.4814 964.431 -12.1539 1268 2.5C1410.69 9.38802 1494.97 31.9794 1637.5 41.6876C1750.69 49.3971 1920 24.1876 1920 24.1876V114.688C1920 114.688 1776.29 123.638 1663 117.688C1521.03 110.231 1410.12 86.5088 1268 82.9999C964.239 75.5005 805.833 172.235 502 168.688C304.206 166.378 0 101.188 0 101.188V0Z"
        fill={color}
      />

      {marqueeText ? (
        <text
          className="font-sans text-[34px] font-bold tracking-[6px] md:text-[30px] md:tracking-[10px]"
          fill={marqueeColor}
          dominantBaseline="middle"
        >
          <textPath href={`#${textPathId}`} startOffset="0%" method="align" spacing="auto">
            {marqueeText.repeat(2)}
            <animate
              attributeName="startOffset"
              from="0%"
              to="-100%"
              begin="0s"
              dur="22s"
              repeatCount="indefinite"
            />
          </textPath>
        </text>
      ) : null}
    </svg>
  )
}
