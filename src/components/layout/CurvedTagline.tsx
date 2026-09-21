import { useId } from 'react'

/**
 * Tagline text set along a gentle downward arc, matching the production
 * site's treatment (an SVG `<textPath>` along a smile-shaped bezier curve)
 * rather than a straight line of script text.
 */
export function CurvedTagline({
  text,
  color = '#858B8C',
  className,
}: {
  text: string
  color?: string
  className?: string
}) {
  const pathId = useId()

  return (
    <svg
      viewBox="0 40 1200 240"
      className={className}
      style={{ overflow: 'visible' }}
      role="img"
      aria-label={text}
    >
      <defs>
        <path id={pathId} d="M20,55 C350,360 850,360 1180,55" />
      </defs>
      <text
        className="font-script text-3xl sm:text-[3.5rem]"
        fill={color}
        opacity={0.92}
        letterSpacing="2.5"
        dominantBaseline="middle"
        aria-hidden="true"
      >
        <textPath href={`#${pathId}`} startOffset="50%" textAnchor="middle">
          {text}
        </textPath>
      </text>
    </svg>
  )
}
