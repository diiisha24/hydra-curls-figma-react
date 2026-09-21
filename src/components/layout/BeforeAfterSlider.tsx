import { useCallback, useRef, useState } from 'react'

/**
 * Draggable before/after image comparison. Both images stack full-bleed;
 * the "after" image is revealed up to the drag position via `clip-path`,
 * matching production's exact technique (two absolutely-positioned images,
 * inset clip-paths, a vertical divider line, and a round drag handle) —
 * rather than a library, since it's a straightforward pointer-driven clip.
 */
export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt = 'Before',
  afterAlt = 'After',
  className,
}: {
  beforeSrc: string
  afterSrc: string
  beforeAlt?: string
  afterAlt?: string
  className?: string
}) {
  const [position, setPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const draggingRef = useRef(false)

  const updateFromClientX = useCallback((clientX: number) => {
    const container = containerRef.current
    if (!container) return
    const rect = container.getBoundingClientRect()
    const ratio = ((clientX - rect.left) / rect.width) * 100
    setPosition(Math.min(100, Math.max(0, ratio)))
  }, [])

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true
    event.currentTarget.setPointerCapture(event.pointerId)
    updateFromClientX(event.clientX)
  }

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return
    updateFromClientX(event.clientX)
  }

  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = false
    event.currentTarget.releasePointerCapture(event.pointerId)
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') setPosition((p) => Math.max(0, p - 5))
    if (event.key === 'ArrowRight') setPosition((p) => Math.min(100, p + 5))
  }

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ touchAction: 'none' }}
    >
      <div
        role="slider"
        tabIndex={0}
        aria-label="Before and after comparison"
        aria-valuenow={Math.round(position)}
        aria-valuemin={0}
        aria-valuemax={100}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onKeyDown={onKeyDown}
        className="relative size-full min-h-[320px] cursor-ew-resize overflow-hidden rounded-2xl select-none"
      >
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <img
            src={afterSrc}
            alt={afterAlt}
            draggable={false}
            className="absolute inset-0 size-full object-cover"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 0 0 ${position}%)` }}
        >
          <img
            src={beforeSrc}
            alt={beforeAlt}
            draggable={false}
            className="absolute inset-0 size-full object-cover"
            style={{ filter: 'grayscale(15%) brightness(0.88) contrast(0.92)' }}
          />
        </div>

        <div
          className="pointer-events-none absolute top-0 bottom-0 z-10 w-0.5 bg-white"
          style={{ left: `${position}%` }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute top-1/2 z-20 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-1 rounded-full bg-white shadow-lg"
          style={{ left: `${position}%` }}
          aria-hidden="true"
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18L9 12L15 6"
              stroke="#374151"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 18L15 12L9 6"
              stroke="#374151"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
