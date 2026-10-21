'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

// Los títulos son nuestros; los textos son los que mandó el cliente, sin cambios.
const pillars = [
  {
    title: 'Mucho más que moda',
    text: 'Nuestro propósito es crear un espacio donde cada cliente encuentre mucho más que moda: encuentre atención genuina, confianza y una experiencia que lo haga sentir valorado.',
  },
  {
    title: 'La atención como respeto',
    text: 'Entendemos la atención como un acto de respeto. Significa observar antes de recomendar, escuchar antes de hablar y comprender antes de vender. Porque cuando una persona se siente realmente vista, la elección deja de ser una compra para convertirse en una experiencia.',
    // Se muestra como tres palabras destacadas dentro del pilar.
    mantra: [
      ['Observar', 'antes de recomendar'],
      ['Escuchar', 'antes de hablar'],
      ['Comprender', 'antes de vender'],
    ],
  },
  {
    title: 'Curaduría con sensibilidad',
    text: 'Cada prenda que seleccionamos, cada detalle del local y cada conversación buscan reflejar esa misma convicción: construir vínculos duraderos a través del cuidado, la calidez y una curaduría realizada con criterio y sensibilidad.',
  },
]

export function PurposeAccordion() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="border-t border-white/15">
      {pillars.map((pillar, i) => {
        const isOpen = open === i
        return (
          <div key={pillar.title} className="border-b border-white/15">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={`pilar-${i}`}
              className="group flex w-full cursor-pointer items-center gap-5 py-5 text-left"
            >
              <span className={cn('font-mono text-[10px] tracking-[0.2em] transition-colors', isOpen ? 'text-white' : 'text-white/40')}>0{i + 1}</span>
              <span className={cn('flex-1 font-serif text-xl transition-all duration-300 md:text-2xl', isOpen ? 'text-white' : 'text-white/60 group-hover:translate-x-1 group-hover:text-white')}>
                {pillar.title}
              </span>
              <span
                aria-hidden="true"
                className={cn('relative h-3 w-3 shrink-0 transition-transform duration-500', isOpen && 'rotate-[135deg]')}
              >
                <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-white/70" />
                <span className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-white/70" />
              </span>
            </button>
            <div
              id={`pilar-${i}`}
              role="region"
              className={cn('grid transition-all duration-500 ease-out', isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0')}
            >
              <div className="min-h-0 overflow-hidden">
                {pillar.mantra && (
                  <ul className="mb-5 grid gap-3 sm:grid-cols-3">
                    {pillar.mantra.map(([verb, rest], j) => (
                      <li
                        key={verb}
                        style={{ transitionDelay: isOpen ? `${150 + j * 120}ms` : '0ms' }}
                        className={cn('border border-white/15 px-4 py-3 transition-all duration-500', isOpen ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0')}
                      >
                        <span className="block font-serif text-lg italic text-white">{verb}</span>
                        <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.18em] text-white/50">{rest}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <p className="max-w-xl pb-6 pl-9 text-sm leading-7 text-white/60">{pillar.text}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
