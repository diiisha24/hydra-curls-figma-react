import { useId } from 'react'

/**
 * A word repeated around a full circle (e.g. "Hydra Curls" looping),
 * matching the rotating circular text badge used as a section-boundary
 * accent in the design. Renders inside a dark circular backdrop.
 */
export function CircularBadge({
  text,
  size = 160,
  className,
}: {
  text: string
  size?: number
  className?: string
}) {
  const pathId = useId()
  const radius = 42
  const repeated = ` ${text} `.repeat(3)

  return (
    <div
      role="img"
      aria-label={text}
      className={className}
      style={{ width: size, height: size }}
    >
      <div className="flex size-full items-center justify-center rounded-full bg-brand-navy shadow-lg">
        <svg
          viewBox="0 0 100 100"
          className="size-[78%]"
          aria-hidden="true"
        >
          <defs>
            <path
              id={pathId}
              d={`M50,50 m-${radius},0 a${radius},${radius} 0 1,1 ${radius * 2},0 a${radius},${radius} 0 1,1 -${radius * 2},0`}
            />
          </defs>
          <text className="fill-white text-[9px] tracking-[2px] uppercase" fontWeight={500}>
            <textPath href={`#${pathId}`}>{repeated}</textPath>
          </text>
        </svg>
      </div>
    </div>
  )
}
