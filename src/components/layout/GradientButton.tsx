import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

// A fixed-shape CTA (label + trailing icon) that renders as either a link
// or a button. It intentionally doesn't use the shadcn Button `asChild`
// (Radix Slot) pattern, because Slot requires exactly one child element —
// injecting the trailing icon alongside `children` breaks that contract.
type CommonProps = {
  className?: string
  withIcon?: boolean
  children: ReactNode
}

type GradientButtonProps = CommonProps &
  (
    | ({ href: string } & AnchorHTMLAttributes<HTMLAnchorElement>)
    | ({ href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>)
  )

const baseClasses =
  'inline-flex h-auto items-center justify-center gap-2 rounded-[10px] px-5 py-3 text-base font-medium shadow-sm transition-opacity hover:opacity-90'

export function GradientButton({
  className,
  withIcon = true,
  children,
  href,
  ...props
}: GradientButtonProps) {
  const classes = cn(
    baseClasses,
    'bg-[linear-gradient(135deg,#00d5fd_0%,#02d3fc_100%)] text-white',
    className,
  )
  const content = (
    <>
      {children}
      {withIcon ? <ArrowRight className="size-5" /> : null}
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      type="button"
      className={classes}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  )
}

type OutlineButtonProps = CommonProps &
  (
    | ({ href: string } & AnchorHTMLAttributes<HTMLAnchorElement>)
    | ({ href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>)
  )

export function OutlineButton({
  className,
  children,
  href,
  ...props
}: OutlineButtonProps) {
  const classes = cn(
    baseClasses,
    'border border-brand-cyan text-brand-cyan hover:bg-brand-cyan/10',
    className,
  )

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      type="button"
      className={classes}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  )
}
