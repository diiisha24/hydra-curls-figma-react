import { useEffect, useState } from 'react'
import { Menu } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { navItems } from '@/data/content'
import { cn } from '@/lib/utils'

const HIDE_THRESHOLD_PX = 24

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      // One-way latch: hide almost immediately on any scroll away from the
      // top (a couple of seconds into the hero video), and keep it hidden —
      // including while scrolling back up through the hero — so it doesn't
      // flicker in and out while the hero video is being scrubbed. It only
      // reappears once the user is back at the very top of the page.
      setHidden(window.scrollY > HIDE_THRESHOLD_PX)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 h-[72px] border-b border-white/30 bg-brand-navy transition-transform duration-100 ease-in-out sm:h-20',
        hidden && '-translate-y-full',
      )}
    >
      <Container className="flex h-full items-center justify-between">
        <a href="#home" className="text-lg font-bold text-white">
          Hydra <span className="text-brand-cyan">Curls</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-10 lg:flex">
          {navItems.map((item, index) => (
            <a
              key={item.label}
              href={item.href}
              className={
                index === 0
                  ? 'text-base font-medium text-white'
                  : 'text-base font-medium text-white/60 transition-colors hover:text-white'
              }
            >
              {item.label}
            </a>
          ))}
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10 hover:text-white lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-xs bg-brand-navy">
            <SheetHeader>
              <SheetTitle className="text-white">
                Hydra <span className="text-brand-cyan">Curls</span>
              </SheetTitle>
            </SheetHeader>
            <nav
              aria-label="Mobile"
              className="flex flex-col gap-1 px-4 pb-6"
            >
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </Container>
    </header>
  )
}
