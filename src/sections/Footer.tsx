import { Phone, MapPin } from 'lucide-react'
import { dealer } from '@/data/models'

const links = [
  { href: '#quienes-somos', label: 'Quiénes somos' },
  { href: '#productos', label: 'Productos' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Footer() {
  return (
    <footer className="relative bg-ink">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col gap-10 border-b border-ink-line pb-12 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex items-baseline gap-2.5">
              <span className="text-accent-italic text-3xl text-lime">212</span>
              <span className="font-display text-base font-bold tracking-[0.2em] text-white uppercase">
                Bizkaia
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">
              {dealer.company} · {dealer.claim}, con {dealer.warrantyYears} años de garantía oficial
              y servicio postventa propio.
            </p>
          </div>

          <nav aria-label="Secciones">
            <p className="text-xs font-semibold tracking-[0.22em] text-white/55 uppercase">
              Secciones
            </p>
            <ul className="mt-4 space-y-1">
              {links.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="flex min-h-11 items-center text-sm text-white/75 transition-colors duration-300 hover:text-lime"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-xs font-semibold tracking-[0.22em] text-white/55 uppercase">
              Contacto
            </p>
            <a
              href={`tel:${dealer.phoneLink}`}
              className="mt-4 flex min-h-11 items-center gap-2.5 text-lime transition-colors duration-300 hover:text-lime-bright"
            >
              <Phone className="size-4 shrink-0" strokeWidth={2.4} />
              <span className="text-accent-italic text-xl">{dealer.phone}</span>
            </a>
            <p className="mt-2 flex items-start gap-2.5 text-sm text-white/75">
              <MapPin className="mt-0.5 size-4 shrink-0" strokeWidth={1.8} />
              <span>
                {dealer.street}
                <br />
                {dealer.zip} {dealer.city}
              </span>
            </p>
          </div>
        </div>

        <p className="pt-8 text-xs text-white/55">
          © {new Date().getFullYear()} {dealer.company}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
