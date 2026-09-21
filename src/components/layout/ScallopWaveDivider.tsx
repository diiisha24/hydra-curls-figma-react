import { useId } from 'react'
import { cn } from '@/lib/utils'

/**
 * A clean, evenly-repeating scalloped wave boundary between two sections —
 * one smooth wave period tiled via an SVG `<pattern>` (colorable through the
 * same `color`/`currentColor` + wrapping `text-*` convention `WaveDivider`
 * uses), rather than a single path stretched with `preserveAspectRatio`
 * across the container's full width.
 *
 * That distinction matters: a stretched single path necessarily changes
 * amplitude/spacing as the container's width changes (fine for a one-off
 * ribbon shape, but a real bug for a boundary that's meant to look like a
 * uniform repeating wave — the amplitude drifted per viewport width and, at
 * some widths, nearly vanished). Tiling one period at a fixed pixel size
 * keeps the wave identical at every width, matching how this kind of
 * boundary is actually built in the Figma reference.
 */
export function ScallopWaveDivider({
  color = 'currentColor',
  tileWidth = 160,
  tileHeight = 40,
  className,
}: {
  color?: string
  /** Width of one repeated wave period, in px. */
  tileWidth?: number
  /** Height of the wave band, in px — also the tile's amplitude range. */
  tileHeight?: number
  className?: string
}) {
  const patternId = useId()
  const midY = tileHeight * 0.5
  const peakY = tileHeight * 0.2
  const troughY = tileHeight * 0.8
  const quarter = tileWidth * 0.25
  const half = tileWidth * 0.5
  const threeQuarter = tileWidth * 0.75

  return (
    <svg
      aria-hidden="true"
      className={cn('block w-full', className)}
      style={{ height: tileHeight }}
      preserveAspectRatio="none"
    >
      <defs>
        <pattern
          id={patternId}
          x="0"
          y="0"
          width={tileWidth}
          height={tileHeight}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={`M0,${midY} C${quarter},${peakY} ${quarter},${peakY} ${half},${midY} C${threeQuarter},${troughY} ${threeQuarter},${troughY} ${tileWidth},${midY} L${tileWidth},${tileHeight} L0,${tileHeight} Z`}
            fill={color}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  )
}
