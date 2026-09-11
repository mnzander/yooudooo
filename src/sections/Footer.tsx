import { Phone, Mail, MapPin, ArrowUpRight, ArrowUp } from 'lucide-react'
import WhatsAppGate from '@/components/WhatsAppGate'
import { InstagramIcon, WhatsAppIcon } from '@/components/BrandIcons'
import { dealer } from '@/data/models'

const links = [
  { href: '#quienes-somos', label: 'Quiénes somos' },
  { href: '#productos', label: 'Productos' },
  { href: '#contacto', label: 'Contacto' },
]

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${dealer.street}, ${dealer.zip} ${dealer.city}`
)}`

export default function Footer() {
  return (
    <footer className="relative z-20 -mt-6 rounded-t-[2rem] bg-ink sm:-mt-10 sm:rounded-t-[3.5rem]">
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-16">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <a href="#inicio" className="inline-flex min-h-11 items-baseline gap-2.5 py-1">
              <span className="text-accent-italic text-4xl leading-none text-lime">212</span>
              <span className="font-display text-lg font-bold tracking-[0.2em] text-white uppercase">
                Bizkaia
              </span>
            </a>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/55">
              {dealer.company}. {dealer.claim}, con {dealer.warrantyYears} años de garantía oficial
              y servicio postventa propio en {dealer.city}.
            </p>
          </div>

          <nav aria-label="Secciones" className="md:col-span-3">
            <h2 className="text-xs font-semibold tracking-[0.22em] text-white/55 uppercase">
              Secciones
            </h2>
            <ul className="mt-5">
              {links.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group flex min-h-11 items-center gap-2 text-sm text-white/75 transition-colors duration-300 hover:text-lime"
                  >
                    <span className="h-px w-0 bg-lime transition-all duration-300 group-hover:w-4" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <h2 className="text-xs font-semibold tracking-[0.22em] text-white/55 uppercase">
              Contacto
            </h2>

            <a
              href={`tel:${dealer.phoneLink}`}
              className="mt-5 flex min-h-11 items-center gap-3 text-lime transition-colors duration-300 hover:text-lime-bright"
            >
              <Phone className="size-4 shrink-0" strokeWidth={2.4} />
              <span className="text-accent-italic text-2xl leading-none">{dealer.phone}</span>
            </a>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="group mt-3 flex min-h-11 items-start gap-3 text-sm text-white/75 transition-colors duration-300 hover:text-white"
            >
              <MapPin className="mt-0.5 size-4 shrink-0" strokeWidth={1.8} />
              <span>
                {dealer.street}
                <br />
                {dealer.zip} {dealer.city} · {dealer.region}
              </span>
              <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-white/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-lime" />
            </a>

            <a
              href={`mailto:${dealer.email}`}
              className="mt-3 flex min-h-11 items-center gap-3 text-sm break-all text-white/75 transition-colors duration-300 hover:text-lime"
            >
              <Mail className="size-4 shrink-0" strokeWidth={1.8} />
              {dealer.email}
            </a>

            <WhatsAppGate className="flex min-h-11 items-center gap-3 text-sm text-white/75 transition-colors duration-300 hover:text-lime">
              <WhatsAppIcon className="size-4 shrink-0" />
              WhatsApp
            </WhatsAppGate>

            <a
              href={dealer.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="group flex min-h-11 items-center gap-3 text-sm text-white/75 transition-colors duration-300 hover:text-lime"
            >
              <InstagramIcon className="size-4 shrink-0" />
              @{dealer.instagram}
              <ArrowUpRight className="size-4 shrink-0 text-white/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-lime" />
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col-reverse items-start justify-between gap-6 border-t border-ink-line pt-8 sm:flex-row sm:items-center">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <p className="text-xs text-white/55">
              © {new Date().getFullYear()} {dealer.company}. Todos los derechos reservados.
            </p>
            {/* Páginas HTML sueltas en public/: la web no tiene enrutador y así
                no hacen falta reglas de reescritura en el hosting. */}
            <nav aria-label="Información legal" className="flex items-center gap-5">
              <a
                href="/aviso-legal.html"
                className="text-xs text-white/55 underline-offset-4 transition-colors duration-300 hover:text-lime hover:underline"
              >
                Aviso legal
              </a>
              <a
                href="/politica-privacidad.html"
                className="text-xs text-white/55 underline-offset-4 transition-colors duration-300 hover:text-lime hover:underline"
              >
                Política de privacidad
              </a>
            </nav>
          </div>

          <a
            href="#inicio"
            className="group flex min-h-11 items-center gap-2 text-xs font-semibold tracking-[0.18em] text-white/55 uppercase transition-colors duration-300 hover:text-lime"
          >
            Volver arriba
            <span className="grid size-8 place-items-center rounded-full border border-ink-line transition-colors duration-300 group-hover:border-lime">
              <ArrowUp className="size-3.5" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  )
}
