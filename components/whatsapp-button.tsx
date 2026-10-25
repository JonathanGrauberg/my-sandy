'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { site, whatsapp } from '@/lib/site'
import { InstagramIcon, WhatsAppIcon } from '@/components/social-icons'

/**
 * Botones flotantes, siempre a mano: Instagram (cuenta principal) y WhatsApp.
 * El de WhatsApp, al tocarlo, deja elegir entre la línea de Mujer y la de Hombres.
 */
export function WhatsAppButton() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const close = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [open])

  return (
    <div ref={ref} className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 md:bottom-8 md:right-8">
      <div className={cn('flex flex-col items-end gap-2 transition-all duration-300', open ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0')}>
        {Object.values(whatsapp).map((line) => (
          <a
            key={line.href}
            href={line.href}
            target="_blank"
            rel="noreferrer"
            tabIndex={open ? 0 : -1}
            className="bg-white px-5 py-3 text-sm font-medium text-black shadow-lg transition-colors hover:bg-[#25D366] hover:text-white"
          >
            {line.label}
          </a>
        ))}
      </div>
      <a
        href={site.social[0].href}
        target="_blank"
        rel="noreferrer"
        aria-label={`Seguinos en Instagram ${site.social[0].handle}`}
        title={`Instagram ${site.social[0].handle}`}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_107%,#fdf497_0%,#fd5949_45%,#d6249f_60%,#285AEB_90%)] text-white shadow-lg shadow-black/40 transition-transform hover:scale-105"
      >
        <InstagramIcon className="h-7 w-7" />
      </a>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Escribinos por WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/40 transition-transform hover:scale-105"
      >
        <WhatsAppIcon className="h-7 w-7" />
      </button>
    </div>
  )
}
