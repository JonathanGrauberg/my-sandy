'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Aparece suavemente (fade + subida) la primera vez que entra en pantalla. */
export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) return setVisible(true)
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        'transition-all duration-1000 ease-out',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
        className,
      )}
    >
      {children}
    </div>
  )
}

/**
 * Contenedor con efecto parallax: el contenido (normalmente una <Image fill />)
 * se desplaza más lento que el scroll. `speed` = cuánto se mueve (0.05 sutil, 0.14 máximo
 * antes de que se vean los bordes de la imagen).
 */
export function Parallax({ children, className, speed = 0.1 }: { children: ReactNode; className?: string; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    let frame = 0
    const update = () => {
      frame = 0
      const el = ref.current
      const inner = innerRef.current
      if (!el || !inner) return
      const rect = el.getBoundingClientRect()
      // -1 cuando el elemento está abajo de la pantalla, 1 cuando ya pasó arriba.
      const raw = (window.innerHeight / 2 - (rect.top + rect.height / 2)) / (window.innerHeight / 2 + rect.height / 2)
      const progress = Math.max(-1, Math.min(1, raw))
      inner.style.transform = `translate3d(0, ${(progress * speed * 100).toFixed(2)}%, 0)`
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [speed])

  return (
    <div ref={ref} className={cn('relative overflow-hidden', className)}>
      <div ref={innerRef} className="absolute inset-x-0 -bottom-[20%] -top-[20%] will-change-transform">
        {children}
      </div>
    </div>
  )
}
