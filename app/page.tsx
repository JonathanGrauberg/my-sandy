import Image from 'next/image'
import { HeroCarousel } from '@/components/hero-carousel'
import { Parallax, Reveal } from '@/components/motion'
import { SiteHeader } from '@/components/site-header'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { site, whatsapp } from '@/lib/site'

// Eventos ocultos por ahora: el cliente los suma el año que viene. Para mostrarlos, poner en true.
const SHOW_EVENTS = false

const events = [
  { title: 'Black Matter', date: '18.04.24', imagePosition: 'object-left' },
  { title: 'After Hours', date: '02.05.24', imagePosition: 'object-center' },
  { title: 'The Edit', date: '24.05.24', imagePosition: 'object-right' },
]

const marquee = ['Nueva temporada', 'Moda urbana', 'MY SANDY', site.address, 'Paraná', 'Entre Ríos']

// Imágenes en B&N que toman color al pasar el mouse (solo en dispositivos con mouse; en el celu se ven a color).
const hoverColor = 'transition-[filter,transform] duration-1000 [@media(hover:hover)]:grayscale [@media(hover:hover)]:group-hover:grayscale-0'

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <HeroCarousel />

      {/* Cinta en movimiento */}
      <div className="relative z-10 overflow-hidden border-y border-white/10 bg-black py-5" aria-hidden="true">
        <div className="flex w-max animate-marquee">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0">
              {[...marquee, ...marquee].map((word, i) => (
                <span key={i} className="flex items-center font-serif text-2xl italic text-white/80 md:text-3xl">
                  <span className="px-8">{word}</span>
                  <span className="text-xs not-italic text-white/30">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section id="historia" className="relative z-10 grid md:grid-cols-2">
        <div className="group relative min-h-[60vh] overflow-hidden bg-muted md:min-h-[760px]">
          <Parallax speed={0.12} className="absolute inset-0">
            <Image src="/my-sandy-story.png" alt="Detalle de textura y joyería de la campaña MY SANDY" fill sizes="(min-width: 768px) 50vw, 100vw" className={`object-cover group-hover:scale-105 ${hoverColor}`} />
          </Parallax>
          <span className="absolute left-6 top-6 font-mono text-[10px] uppercase tracking-[0.3em] text-white/70">MS / Historia</span>
        </div>
        <div className="flex flex-col justify-between bg-charcoal p-8 md:p-16 lg:p-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted-foreground">La historia</p>
          <Reveal className="py-20 md:py-0">
            <h2 className="max-w-lg font-serif text-5xl leading-[0.94] tracking-[-0.04em] text-white md:text-7xl">Donde el estilo encuentra su lugar.</h2>
            <p className="mt-10 max-w-sm text-sm leading-7 text-white/60">Creemos en la moda con identidad propia. Una mirada precisa, prendas pensadas para usarse de verdad y una atención cercana, de las que ya no quedan.</p>
            <a href="#contacto" className="group mt-10 inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-white/80 transition-colors hover:text-white">
              Vení a conocernos <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </Reveal>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">{site.city}</p>
        </div>
      </section>

      {/* Banda de imagen con parallax y frase */}
      <section className="group relative z-10 flex min-h-[70vh] items-center justify-center overflow-hidden bg-black">
        <Parallax speed={0.14} className="absolute inset-0">
          <Image src="/my-sandy-hero.png" alt="" fill sizes="100vw" className="object-cover opacity-70" />
        </Parallax>
        <div className="absolute inset-0 bg-black/40" />
        <Reveal className="relative px-6 text-center">
          <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.4em] text-white/70">Seguinos</p>
          <p className="font-serif text-6xl italic leading-[0.9] tracking-[-0.04em] text-white md:text-9xl">Vestí lo que sos.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {site.social.map((s) => (
              <a key={s.href} href={s.href} target="_blank" rel="noreferrer" className="border border-white/40 px-6 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-white transition-colors hover:bg-white hover:text-black">
                {s.label} ↗
              </a>
            ))}
          </div>
        </Reveal>
      </section>

      {SHOW_EVENTS && <section id="eventos" className="bg-carbon px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 flex items-end justify-between border-b border-white/15 pb-6">
            <h2 className="font-serif text-5xl tracking-[-0.04em] text-white md:text-7xl">Eventos</h2>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/45">Agenda / {new Date().getFullYear()}</span>
          </div>
          <div className="grid gap-12 md:grid-cols-3 md:gap-6">
            {events.map((event, index) => (
              <article key={event.title} className="group">
                <div className="relative mb-6 aspect-[4/5] overflow-hidden bg-muted">
                  <Image src="/my-sandy-events.png" alt={`Imagen del evento ${event.title}`} fill className={`object-cover grayscale transition duration-700 group-hover:scale-105 ${event.imagePosition}`} />
                  <span className="absolute left-4 top-4 font-mono text-[10px] text-white/70">0{index + 1}</span>
                </div>
                <div className="flex items-start justify-between border-b border-white/15 pb-5">
                  <div><h3 className="font-serif text-2xl text-white">{event.title}</h3><p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">{event.date} / Invitación</p></div>
                  <a href="#contacto" className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/60 transition-colors hover:text-white">Ver más ↗</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>}

      <section className="relative z-10 border-t border-white/10 bg-charcoal px-6 py-16 md:px-12">
        <Reveal className="mx-auto flex max-w-6xl flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.35em] text-white/45">Trabajá con nosotros</p>
            <p className="font-serif text-3xl text-white md:text-4xl">¿Querés sumarte al equipo?</p>
          </div>
          <a href={`mailto:${site.email}?subject=CV`} className="group inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/80 transition-colors hover:text-white">
            Mandanos tu CV a {site.email} <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </Reveal>
      </section>

      <footer id="contacto" className="relative z-10 bg-black px-6 pb-28 pt-24 md:px-12 md:pt-32">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-16 flex flex-col justify-between gap-10 md:flex-row">
            <div><p className="font-serif text-4xl tracking-[0.2em] text-white">MS</p><p className="mt-5 max-w-xs text-sm leading-6 text-white/50">Un espacio para vestir lo que sos. Visitanos, escribinos, encontrá tu próxima prenda.</p></div>
            <div className="flex flex-wrap gap-x-10 gap-y-4 font-mono text-[10px] uppercase tracking-[0.25em] text-white/60">
              {site.social.map((s) => (
                <a key={s.href} href={s.href} target="_blank" rel="noreferrer" className="transition-colors hover:text-white">{s.label} ↗</a>
              ))}
              <a href={whatsapp.mujer.href} target="_blank" rel="noreferrer" className="transition-colors hover:text-white">WhatsApp ↗</a>
            </div>
          </Reveal>
          {/* Mapa real en tono oscuro: toma color al pasar el mouse */}
          <div id="ubicacion" className="scroll-mt-28" />
          <Reveal className="group relative mb-16 h-64 overflow-hidden border border-white/10 bg-charcoal md:h-80">
            <iframe
              src={site.mapsEmbed}
              title={`Mapa: MY SANDY, ${site.address}, ${site.city}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0 [filter:grayscale(1)_invert(0.92)_contrast(0.9)] transition-[filter] duration-700 group-hover:[filter:none]"
            />
            <a href={site.mapsLink} target="_blank" rel="noreferrer" className="absolute bottom-4 left-4 flex items-center gap-3 bg-black/80 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/80 backdrop-blur-sm transition-colors hover:text-white">
              <span className="inline-block h-2 w-2 rounded-full bg-white" /> {site.address} / Paraná ↗
            </a>
          </Reveal>
          <div className="flex flex-col justify-between gap-8 border-t border-white/15 pt-8 md:flex-row md:items-end">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/50">
              <p>{site.address}, {site.city}</p>
              <p className="mt-2">{site.hours ?? 'Horarios: consultanos por WhatsApp'}</p>
              <p className="mt-2"><a href={site.phone.href} className="transition-colors hover:text-white">Tel. {site.phone.label}</a></p>
            </div>
            <a href={whatsapp.mujer.href} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center bg-white px-7 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-black transition-colors hover:bg-white/80">Contactanos por WhatsApp</a>
          </div>
          <p className="mt-16 font-mono text-[9px] uppercase tracking-[0.2em] text-white/25">© {new Date().getFullYear()} MY SANDY — Modas urbanas</p>
        </div>
      </footer>

      <WhatsAppButton />
    </main>
  )
}
