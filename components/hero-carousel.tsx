'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { site } from '@/lib/site'

const SLIDE_MS = 6500

/**
 * Efecto que sigue al mouse sobre el hero (solo en compu, en celular no aplica):
 * - 'glass': lente de vidrio esmerilado que sigue al cursor y se agranda sobre los botones.
 * - 'spotlight': luz suave alrededor del cursor, el resto de la foto queda en penumbra.
 * - 'none': sin efecto.
 */
const CURSOR_EFFECT: 'glass' | 'spotlight' | 'none' = 'none'

const slides = [
  { src: '/my-sandy-hero.png', alt: 'Campaña MY SANDY', label: 'Nueva temporada', position: 'object-center' },
  { src: '/my-sandy-events.png', alt: 'Accesorios MY SANDY', label: 'Accesorios', position: 'object-left' },
  { src: '/my-sandy-story.png', alt: 'Detalle de prendas MY SANDY', label: 'Esenciales', position: 'object-right' },
]

export function HeroCarousel() {
  const [active, setActive] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const tiltRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const lensRef = useRef<HTMLDivElement>(null)
  const spotRef = useRef<HTMLDivElement>(null)

  const goTo = useCallback(
    (next: number) => {
      if (next === active) return
      setPrev(active)
      setActive(next)
    },
    [active],
  )

  // Avance automático. Se reinicia cada vez que cambia el slide (también si lo cambia el usuario).
  useEffect(() => {
    const id = setTimeout(() => goTo((active + 1) % slides.length), SLIDE_MS)
    return () => clearTimeout(id)
  }, [active, goTo])

  // Parallax: el fondo baja más lento que el scroll y el texto se desvanece.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    const update = () => {
      frame = 0
      const y = Math.min(window.scrollY, window.innerHeight)
      if (bgRef.current) bgRef.current.style.transform = `translate3d(0, ${y * 0.35}px, 0)`
      if (contentRef.current) {
        contentRef.current.style.transform = `translate3d(0, ${y * 0.15}px, 0)`
        contentRef.current.style.opacity = String(1 - y / (window.innerHeight * 0.7))
      }
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  // Efecto de cursor + leve movimiento de la foto según la posición del mouse.
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const target = { x: 0, y: 0 }
    const pos = { x: 0, y: 0 }
    let scale = 1
    let targetScale = 1
    let inside = false
    let frame = 0

    const tick = () => {
      // Interpolación suave: el efecto "persigue" al cursor con un pequeño retraso.
      pos.x += (target.x - pos.x) * 0.14
      pos.y += (target.y - pos.y) * 0.14
      scale += (targetScale - scale) * 0.12

      const rect = section.getBoundingClientRect()
      if (lensRef.current) {
        lensRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%) scale(${scale})`
      }
      if (spotRef.current) {
        spotRef.current.style.background = `radial-gradient(circle 420px at ${pos.x}px ${pos.y}px, transparent 0%, rgba(0,0,0,0.5) 100%)`
      }
      if (tiltRef.current) {
        const dx = (pos.x / rect.width - 0.5) * -24
        const dy = (pos.y / rect.height - 0.5) * -16
        tiltRef.current.style.transform = `translate3d(${dx}px, ${dy}px, 0)`
      }
      const settled = Math.abs(target.x - pos.x) < 0.3 && Math.abs(target.y - pos.y) < 0.3 && Math.abs(targetScale - scale) < 0.005
      frame = inside || !settled ? requestAnimationFrame(tick) : 0
    }
    const start = () => {
      if (!frame) frame = requestAnimationFrame(tick)
    }

    const onMove = (e: PointerEvent) => {
      const rect = section.getBoundingClientRect()
      target.x = e.clientX - rect.left
      target.y = e.clientY - rect.top
      targetScale = (e.target as Element).closest('a, button') ? 1.6 : 1
      start()
    }
    const onEnter = (e: PointerEvent) => {
      inside = true
      const rect = section.getBoundingClientRect()
      // Al entrar, el efecto aparece donde está el mouse (no viaja desde la esquina).
      pos.x = target.x = e.clientX - rect.left
      pos.y = target.y = e.clientY - rect.top
      section.dataset.cursor = 'on'
      start()
    }
    const onLeave = () => {
      inside = false
      delete section.dataset.cursor
    }

    section.addEventListener('pointermove', onMove)
    section.addEventListener('pointerenter', onEnter)
    section.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(frame)
      section.removeEventListener('pointermove', onMove)
      section.removeEventListener('pointerenter', onEnter)
      section.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <section ref={sectionRef} id="inicio" className="group/hero relative flex h-svh min-h-[560px] flex-col justify-end overflow-hidden bg-black">
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        <div ref={tiltRef} className="absolute inset-0 scale-[1.04]">
          {slides.map((slide, i) => (
            <div
              key={slide.src}
              aria-hidden={i !== active}
              className={cn(
                'absolute inset-0 transition-opacity duration-[1400ms] ease-in-out',
                i === active ? 'z-10 opacity-100' : 'z-0 opacity-0',
              )}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                className={cn(
                  'object-cover',
                  slide.position,
                  // El zoom-out se mantiene en el slide saliente para que no "salte" mientras se desvanece.
                  (i === active || i === prev) && 'animate-ken-burns',
                )}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-b from-black/50 via-black/5 to-black/80" />

      {CURSOR_EFFECT === 'spotlight' && (
        <div ref={spotRef} className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-700 group-data-[cursor=on]/hero:opacity-100" />
      )}
      {CURSOR_EFFECT === 'glass' && (
        <div
          ref={lensRef}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 z-40 h-36 w-36 rounded-full border border-white/35 bg-white/[0.06] opacity-0 shadow-[inset_0_1px_12px_rgba(255,255,255,0.25),0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur-md backdrop-saturate-150 transition-opacity duration-500 group-data-[cursor=on]/hero:opacity-100"
        />
      )}

      <div ref={contentRef} className="relative z-30 mx-auto flex w-full max-w-6xl flex-col items-center px-6 pb-28 text-center md:pb-32">
        <p className="hero-reveal mb-5 font-mono text-[10px] uppercase tracking-[0.45em] text-white/80">
          {site.tagline} / {site.city}
        </p>
        <h1 className="hero-reveal font-serif text-[18vw] leading-[0.8] tracking-[-0.06em] text-white [animation-delay:150ms] md:text-[13rem]">
          MY SANDY
        </h1>
        <div className="hero-reveal mt-10 flex flex-wrap items-center justify-center gap-4 [animation-delay:300ms]">
          <a href="#historia" className="bg-white px-7 py-4 font-mono text-[10px] uppercase tracking-[0.25em] text-black transition-colors hover:bg-white/80">
            Conocenos
          </a>
          <a href="#ubicacion" className="border border-white/40 px-7 py-4 font-mono text-[10px] uppercase tracking-[0.25em] text-white transition-colors hover:border-white hover:bg-white/10">
            Cómo llegar
          </a>
        </div>
      </div>

      {/* Indicadores del carrusel con barra de progreso */}
      <div className="absolute inset-x-0 bottom-0 z-30 mx-auto flex max-w-6xl gap-4 px-6 pb-8 md:gap-8 md:px-12">
        {slides.map((slide, i) => (
          <button
            key={slide.label}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Ver ${slide.label}`}
            aria-current={i === active}
            className="group/dot flex-1 cursor-pointer text-left"
          >
            <span className="relative block h-px w-full overflow-hidden bg-white/25">
              <span
                key={i === active ? `on-${active}` : 'off'}
                className={cn('absolute inset-y-0 left-0 bg-white', i === active ? 'animate-slide-progress' : 'w-0')}
                style={{ animationDuration: `${SLIDE_MS}ms` }}
              />
            </span>
            <span className={cn('mt-3 block font-mono text-[10px] uppercase tracking-[0.25em] transition-colors', i === active ? 'text-white' : 'text-white/45 group-hover/dot:text-white/80')}>
              0{i + 1} — {slide.label}
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}
