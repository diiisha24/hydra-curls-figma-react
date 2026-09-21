import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function SectionHeading({
  eyebrow,
  eyebrowUnderline = false,
  title,
  accent,
  subtitle,
  align = 'left',
  tone = 'dark',
  className,
}: {
  eyebrow?: string
  /** Thread-like hand-drawn squiggle beneath the eyebrow, instead of a
   * plain underline — matches the accent used on some eyebrow labels in
   * the design (e.g. "Premium Ingredients"). Off by default since most
   * eyebrows in the design don't carry it. */
  eyebrowUnderline?: boolean
  title: string
  accent?: string
  subtitle?: ReactNode
  align?: 'left' | 'center'
  tone?: 'dark' | 'light'
  className?: string
}) {
  return (
    <div
      className={cn(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            'font-script relative inline-block text-xl tracking-wide sm:text-2xl',
            tone === 'dark' ? 'text-brand-navy' : 'text-white',
          )}
        >
          {eyebrow}
          {eyebrowUnderline ? (
            <svg
              viewBox="0 0 180 10"
              aria-hidden="true"
              className="absolute -bottom-1.5 left-0 h-2 w-full opacity-60"
            >
              <path
                d="M1 5C15 2 25 8 40 5C55 2 65 8 80 5C95 2 105 8 120 5C135 2 145 8 160 5C168 3.5 172 6 179 4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          ) : null}
        </p>
      ) : null}
      <h2
        className={cn(
          'mt-2 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl',
          tone === 'dark' ? 'text-brand-navy' : 'text-white',
        )}
      >
        {title}
        {accent ? (
          <>
            <br />
            <span className="text-brand-cyan">{accent}</span>
          </>
        ) : null}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            'font-script mt-4 text-base sm:text-lg',
            tone === 'dark' ? 'text-muted-foreground' : 'text-white/70',
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  )
}
