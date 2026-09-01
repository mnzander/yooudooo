import { Phone, ShieldCheck, Wrench, MapPin } from 'lucide-react'
import AnimatedContent from '@/components/AnimatedContent'
import SectionHeading from '@/components/SectionHeading'
import { dealer } from '@/data/models'

const services = [
  {
    icon: ShieldCheck,
    title: `${dealer.warrantyYears} años de garantía`,
    body: 'Garantía oficial de la marca en todos los vehículos, con cobertura completa desde la entrega.',
  },
  {
    icon: Wrench,
    title: 'Servicio postventa',
    body: 'Mantenimiento, revisiones y recambios originales en nuestras propias instalaciones.',
  },
]

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${dealer.street}, ${dealer.zip} ${dealer.city}`
)}`

export default function Contact() {
  return (
    <section id="contacto" className="relative mx-auto max-w-7xl px-6 py-28 sm:py-36">
      <SectionHeading index="03" label="Contacto" title="Hablemos" />

      <div className="mt-16 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <AnimatedContent distance={70} duration={0.9}>
          <div className="relative h-full overflow-hidden rounded-3xl border border-lime/25 bg-gradient-to-br from-lime/12 via-ink-card to-ink-card p-9 sm:p-12">
            <div className="absolute -top-24 -right-24 size-64 rounded-full bg-lime/10 blur-3xl" />

            <p className="relative text-xs font-semibold tracking-[0.3em] text-lime uppercase">
              Llámanos
            </p>

            <a
              href={`tel:${dealer.phoneLink}`}
              className="text-accent-italic relative mt-5 block text-[clamp(2.6rem,7vw,5rem)] leading-none text-lime transition-colors duration-300 hover:text-lime-bright"
            >
              {dealer.phone}
            </a>

            <p className="relative mt-6 max-w-md text-base leading-relaxed text-white/60">
              Resolvemos tus dudas sobre cualquiera de las tres versiones del Yooudooo 6, concertamos
              una prueba o te preparamos una oferta a medida.
            </p>

            <div className="relative mt-9 flex flex-wrap gap-3">
              <a
                href={`tel:${dealer.phoneLink}`}
                className="flex items-center gap-2.5 rounded-full bg-lime px-7 py-3.5 text-sm font-bold tracking-wide text-ink uppercase transition-all duration-300 hover:bg-lime-bright hover:shadow-[0_0_40px_-6px_var(--color-lime)]"
              >
                <Phone className="size-4" strokeWidth={2.4} />
                Llamar ahora
              </a>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 rounded-full border border-white/20 px-7 py-3.5 text-sm font-bold tracking-wide text-white uppercase transition-all duration-300 hover:border-lime hover:text-lime"
              >
                <MapPin className="size-4" />
                Cómo llegar
              </a>
            </div>

            <div className="relative mt-10 border-t border-ink-line pt-7">
              <p className="text-xs tracking-[0.2em] text-white/35 uppercase">Dónde estamos</p>
              <p className="mt-3 text-lg font-medium text-white">{dealer.street}</p>
              <p className="text-white/55">
                {dealer.zip} {dealer.city} · {dealer.region}
              </p>
            </div>
          </div>
        </AnimatedContent>

        <div className="grid gap-5">
          {services.map((service, i) => (
            <AnimatedContent key={service.title} distance={70} duration={0.85} delay={0.12 + i * 0.12}>
              <article className="group h-full rounded-3xl border border-ink-line bg-ink-card/70 p-9 transition-colors duration-500 hover:border-lime/40">
                <service.icon
                  className="size-7 text-lime transition-transform duration-500 group-hover:scale-110"
                  strokeWidth={1.7}
                />
                <h3 className="mt-6 text-2xl text-white">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/50">{service.body}</p>
              </article>
            </AnimatedContent>
          ))}
        </div>
      </div>

      <footer className="mt-24 flex flex-col items-center justify-between gap-5 border-t border-ink-line pt-10 sm:flex-row">
        <div className="flex items-baseline gap-2.5">
          <span className="text-accent-italic text-2xl text-lime">212</span>
          <span className="font-display text-sm font-bold tracking-[0.2em] text-white/80 uppercase">
            Bizkaia
          </span>
        </div>
        <p className="text-center text-xs text-white/35 sm:text-right">
          © {new Date().getFullYear()} {dealer.company} · {dealer.claim}
        </p>
      </footer>
    </section>
  )
}
