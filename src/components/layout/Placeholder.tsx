import type { CSSProperties } from 'react'
import { cn } from '@/lib/utils'

type PlaceholderTone = 'brand' | 'navy' | 'light' | 'warm'

const toneStyles: Record<PlaceholderTone, string> = {
  brand: 'from-cyan-400/40 via-cyan-300/20 to-transparent text-brand-navy',
  navy: 'from-brand-navy/90 via-brand-navy/70 to-brand-navy/40 text-white',
  light: 'from-white/60 via-brand-cyan/10 to-transparent text-brand-navy',
  warm: 'from-amber-300/40 via-rose-200/30 to-transparent text-brand-navy',
}

/**
 * Stand-in for real Figma-exported product/model photography, which
 * hasn't been shared yet. Swap the call site for a real <img> once
 * assets are available — the label/alt text is preserved either way.
 */
export function Placeholder({
  label,
  tone = 'light',
  className,
  style,
  rounded = 'xl',
}: {
  label: string
  tone?: PlaceholderTone
  className?: string
  style?: CSSProperties
  rounded?: 'xl' | '2xl' | 'full' | 'none'
}) {
  const radius = {
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    full: 'rounded-full',
    none: '',
  }[rounded]

  return (
    <div
      role="img"
      aria-label={label}
      style={style}
      className={cn(
        'flex items-center justify-center bg-gradient-to-br border border-black/5 p-3 text-center text-xs font-medium leading-snug',
        toneStyles[tone],
        radius,
        className,
      )}
    >
      <span className="opacity-70">{label}</span>
    </div>
  )
}
