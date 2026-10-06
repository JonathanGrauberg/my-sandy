'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

const links = [
  { href: '#historia', label: 'Historia' },
  { href: '#ubicacion', label: 'Ubicación' },
  { href: '#contacto', label: 'Contacto' },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled || open ? 'border-b border-white/10 bg-black/75 py-4 backdrop-blur-md' : 'py-6',
      )}
    >
      <div className="flex items-center justify-between px-6 md:px-12">
        <a href="#inicio" aria-label="MY SANDY inicio" className="font-serif text-lg tracking-[0.28em] text-white" onClick={() => setOpen(false)}>
          MS
        </a>
        <nav className="hidden gap-10 md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="group relative font-mono text-[10px] uppercase tracking-[0.24em] text-white/70 transition-colors hover:text-white">
              {link.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          className="relative flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span className={cn('h-px w-6 bg-white transition-transform duration-300', open && 'translate-y-[3.5px] rotate-45')} />
          <span className={cn('h-px w-6 bg-white transition-transform duration-300', open && '-translate-y-[3.5px] -rotate-45')} />
        </button>
      </div>
      <nav className={cn('grid overflow-hidden px-6 transition-all duration-500 md:hidden', open ? 'grid-rows-[1fr] pt-8 pb-4' : 'grid-rows-[0fr]')}>
        <div className="flex min-h-0 flex-col gap-6">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="font-serif text-4xl tracking-[-0.03em] text-white">
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
}
