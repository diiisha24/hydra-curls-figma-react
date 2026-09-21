import { useEffect, useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { WaveDivider } from '@/components/layout/WaveDivider'

// The overlay stays fully visible until this point in the ~7s clip — the
// moment the bottle cap just breaks the water's surface — then fades out
// over TEXT_FADE_SECONDS. Keep the fade itself a meaningful span — too
// small and it resolves within a single scroll-wheel tick and reads as an
// instant cut rather than a fade.
const TEXT_HOLD_SECONDS = 1
const TEXT_FADE_SECONDS = 1.5

/**
 * The live site scrubs the hero product video by scroll position instead of
 * autoplaying it (the bottle rises into frame as you scroll), and collapses
 * the logo/tagline overlay early — by ~3s into the clip — so the video reads
 * as a clean backdrop for the rest of the scrub. We reproduce both: a tall
 * wrapper gives scroll room, a `sticky` inner viewport pins the video/copy
 * in place, and a scroll listener maps scroll progress within that range
 * onto `video.currentTime` and the overlay's opacity/translate.
 *
 * The cyan wave divider is deliberately NOT inside the pinned box: like the
 * production site, it's a normal-flow element right after the hero, pulled
 * up with a negative margin to overlap the hero's bottom edge with a higher
 * z-index. That also means it only scrolls into view once the pin releases
 * (i.e. once the scrub has finished) — no extra scroll-linked logic needed.
 */
export function HeroSection() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const video = videoRef.current
    const overlay = overlayRef.current
    if (!wrapper || !video || !overlay) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    let duration = 0
    const onLoadedMetadata = () => {
      duration = video.duration || 0
    }
    video.addEventListener('loadedmetadata', onLoadedMetadata)

    if (prefersReducedMotion) {
      // Respect the user's motion preference: show a single static frame
      // and keep the overlay visible rather than animating it away.
      video.currentTime = 0.01
      return () => video.removeEventListener('loadedmetadata', onLoadedMetadata)
    }

    let rafId = 0
    const updateFrame = () => {
      rafId = 0
      const rect = wrapper.getBoundingClientRect()
      const scrollableDistance = wrapper.offsetHeight - window.innerHeight
      if (scrollableDistance <= 0) return

      const scrolled = Math.min(Math.max(-rect.top, 0), scrollableDistance)
      const progress = scrolled / scrollableDistance

      const timeSeconds = duration ? progress * duration : 0
      if (duration) video.currentTime = timeSeconds

      const exitProgress = Math.min(
        Math.max((timeSeconds - TEXT_HOLD_SECONDS) / TEXT_FADE_SECONDS, 0),
        1,
      )
      overlay.style.opacity = String(1 - exitProgress)
      overlay.style.transform = `translateY(${-exitProgress * 56}px)`
      overlay.style.pointerEvents = exitProgress >= 1 ? 'none' : 'auto'
    }

    const onScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(updateFrame)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    updateFrame()

    return () => {
      video.removeEventListener('loadedmetadata', onLoadedMetadata)
      window.removeEventListener('scroll', onScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div ref={wrapperRef} id="home" className="relative h-[220vh]">
        <section className="sticky top-0 flex h-dvh flex-col justify-center overflow-hidden bg-[#2c1a4d] pt-[72px] sm:pt-20">
          <video
            ref={videoRef}
            className="absolute inset-0 -z-20 size-full object-cover"
            poster="/media/hero-scroll-poster.jpg?v=2"
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
          >
            <source media="(max-width: 767px)" src="/media/hero-scroll-mobile.mp4?v=2" type="video/mp4" />
            <source src="/media/hero-scroll-desktop.mp4?v=2" type="video/mp4" />
          </video>
          <div className="absolute inset-0 -z-10 bg-black/30" aria-hidden="true" />

          <div
            ref={overlayRef}
            className="relative z-10 flex flex-col items-center"
            style={{ willChange: 'opacity, transform' }}
          >
            <Container className="relative z-10 flex flex-col items-center gap-4 text-center">
              <img
                src="/images/hero-logo.png"
                alt="Parachute Advansed Hydra Curls"
                className="h-auto w-40 object-contain sm:w-48"
              />
              <p className="font-script max-w-2xl text-3xl leading-snug text-white drop-shadow-sm sm:text-4xl lg:text-5xl">
                Pure ingredients. Real results.
                <br />
                Every drop matters.
              </p>
            </Container>

            <ChevronDown
              className="relative z-10 mx-auto mt-10 size-7 animate-bounce text-white/80"
              aria-hidden="true"
            />
          </div>
        </section>
      </div>

      {/*
        Percentage margins resolve against the containing block's WIDTH (a
        CSS quirk for vertical margins), and the wave's own height is also
        width-driven (`aspect-[1920/169]`) — so a margin of exactly
        -(169/1920 * 100)% always cancels the wave's rendered height at any
        viewport width. That matters here: with fixed-pixel margins (the
        previous `-mt-16 sm:-mt-24 lg:-mt-32`), the pull-up amount and the
        wave's actual height drift apart between breakpoints, leaving a strip
        with nothing painted behind it — which exposed the hero video poking
        through beneath the wave. Full-height cancellation makes the wave
        sit flush with zero gap, no matter the width.
      */}
      <div className="relative z-20 mt-4 w-full -mb-8 text-brand-cyan md:-mt-9 md:-mb-12 lg:-mt-12 lg:-mb-16 xl:-mt-14 2xl:-mt-14">
        <div className="relative w-full overflow-hidden" style={{ zIndex: 10, marginTop: '-44px' }}>
          <WaveDivider
            color="currentColor"
            className="h-[clamp(60px,10vw,120px)] w-full md:h-[clamp(80px,12vw,260px)] lg:h-[clamp(60px,10vw,120px)] xl:h-[clamp(60px,10vw,120px)] 2xl:h-[clamp(60px,10vw,120px)]"
          />
        </div>
      </div>
    </>
  )
}
