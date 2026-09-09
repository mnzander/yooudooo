import { useEffect, useState } from 'react'
import { Phone, Menu, X } from 'lucide-react'
import WhatsAppGate from '@/components/WhatsAppGate'
import { WhatsAppIcon } from '@/components/BrandIcons'
import { dealer } from '@/data/models'

const links = [
  { href: '#quienes-somos', label: 'Quiénes somos' },
  { href: '#productos', label: 'Productos' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? 'border-b border-ink-line bg-ink/85 py-3 backdrop-blur-xl'
          : 'border-b border-transparent py-6'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <a
          href="#inicio"
          className="-my-2 flex min-h-11 items-baseline gap-2 py-2"
          onClick={() => setOpen(false)}
        >
          <span className="text-accent-italic text-2xl leading-none text-lime">212</span>
          <span className="font-display text-sm font-bold tracking-[0.2em] text-white/90 uppercase">
            Bizkaia
          </span>
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {links.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group flex min-h-11 items-center text-sm font-medium text-white/65 transition-colors duration-300 hover:text-white"
              >
                <span className="relative after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-lime after:transition-transform after:duration-300 group-hover:after:scale-x-100">
                  {link.label}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${dealer.phoneLink}`}
            className="flex min-h-11 items-center gap-2 rounded-full border border-lime/40 bg-lime/10 px-4 text-sm font-semibold text-lime transition-all duration-300 hover:border-lime hover:bg-lime hover:text-ink"
          >
            <Phone className="size-4" strokeWidth={2.4} />
            <span className="hidden sm:inline">{dealer.phone}</span>
          </a>

          {/* Neutro a propósito: el lima queda reservado para la llamada, que
              sigue siendo la acción principal del concesionario. */}
          <WhatsAppGate className="grid size-11 place-items-center rounded-full border border-white/15 text-white transition-colors duration-300 hover:border-lime hover:text-lime">
            <WhatsAppIcon className="size-4" />
            <span className="sr-only">Escribir por WhatsApp</span>
          </WhatsAppGate>

          <button
            type="button"
            onClick={() => setOpen(v => !v)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            className="grid size-11 place-items-center rounded-full border border-white/15 text-white transition-colors duration-300 hover:border-white/40 md:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      {open ? (
        <ul className="mt-4 border-t border-ink-line px-6 duration-300 animate-in fade-in slide-in-from-top-2 md:hidden">
          {links.map(link => (
            <li key={link.href} className="border-b border-ink-line last:border-0">
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-4 text-base font-medium text-white/75 transition-colors duration-300 hover:text-lime"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </header>
  )
}
