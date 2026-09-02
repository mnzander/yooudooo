import { Phone, ShieldCheck, Wrench, MapPin, ArrowUpRight } from 'lucide-react'
import AnimatedContent from '@/components/AnimatedContent'
import ShinyText from '@/components/ShinyText'
import SectionHeading from '@/components/SectionHeading'
import { dealer } from '@/data/models'

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${dealer.street}, ${dealer.zip} ${dealer.city}`
)}`

const perks = [
  {
    icon: ShieldCheck,
    title: `${dealer.warrantyYears} años de garantía`,
    body: 'Garantía oficial de la marca en todos los vehículos, desde el día de la entrega.',
  },
  {
    icon: Wrench,
    title: 'Servicio postventa',
    body: 'Mantenimiento, revisiones y recambios originales en nuestras instalaciones.',
  },
]

export default function Contact() {
  return (
    <section id="contacto" className="relative mx-auto max-w-7xl px-6 pb-28 sm:pb-36">
      {/* Manchas de color que el backdrop-blur de las tarjetas difumina:
          sobre un fondo liso el efecto glass no se apreciaría */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 -right-20 size-[28rem] rounded-full bg-lime/25 blur-[110px]" />
        <div className="absolute right-1/4 bottom-0 size-[22rem] rounded-full bg-moss/20 blur-[100px]" />
        <div className="absolute top-1/2 left-1/3 size-[18rem] rounded-full bg-ink/10 blur-[90px]" />
      </div>

      <SectionHeading index="03" label="Contacto" title="Hablemos" tone="light" />

      <p className="relative mt-8 max-w-2xl text-base leading-relaxed text-ink/70">
        Resolvemos tus dudas sobre cualquiera de las tres versiones del Yooudooo 6, concertamos una
        prueba sin compromiso o te preparamos una oferta a medida.
      </p>

      <div className="relative mt-16 grid gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
        {/* Tarjeta oscura: ancla la identidad de marca dentro del bloque claro
            y es el único sitio donde el lima tiene contraste suficiente */}
        <AnimatedContent distance={70} duration={0.9} className="lg:h-full">
          <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-ink/85 p-9 shadow-[0_20px_60px_-25px_rgba(5,5,5,0.5)] backdrop-blur-2xl sm:p-12">
            <div className="absolute -top-32 -right-32 size-80 rounded-full bg-lime/10 blur-3xl" />

            <p className="relative text-xs font-semibold tracking-[0.3em] text-lime uppercase">
              Llámanos
            </p>

            <a
              href={`tel:${dealer.phoneLink}`}
              aria-label={`Llamar al ${dealer.phone}`}
              className="text-accent-italic relative mt-5 block py-1 text-[clamp(2.6rem,6.5vw,4.5rem)] leading-none"
            >
              <ShinyText
                text={dealer.phone}
                color="#b9e901"
                shineColor="#ffffff"
                speed={3.2}
                delay={1.4}
                spread={100}
              />
            </a>

            <p className="relative mt-6 max-w-sm text-base leading-relaxed text-white/60">
              Te atendemos personalmente y sin prisas. Si lo prefieres, pásate por el concesionario
              y lo vemos con calma.
            </p>

            <div className="relative mt-auto flex flex-wrap gap-3 pt-10">
              <a
                href={`tel:${dealer.phoneLink}`}
                className="flex min-h-11 items-center gap-2.5 rounded-full bg-lime px-7 text-sm font-bold tracking-wide text-ink uppercase transition-all duration-300 hover:bg-lime-bright hover:shadow-[0_0_40px_-6px_var(--color-lime)]"
              >
                <Phone className="size-4" strokeWidth={2.4} />
                Llamar ahora
              </a>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="flex min-h-11 items-center gap-2.5 rounded-full border border-white/25 px-7 text-sm font-bold tracking-wide text-white uppercase transition-all duration-300 hover:border-lime hover:text-lime"
              >
                <MapPin className="size-4" />
                Cómo llegar
              </a>
            </div>
          </div>
        </AnimatedContent>

        <div className="grid gap-5">
          <AnimatedContent distance={70} duration={0.85} delay={0.12}>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="group flex items-start justify-between gap-6 rounded-3xl border border-white/70 bg-white/55 p-9 shadow-[0_12px_40px_-20px_rgba(5,5,5,0.35)] backdrop-blur-2xl transition-colors duration-500 hover:border-ink/25 hover:bg-white/75"
            >
              <div>
                <MapPin className="size-6 text-moss" strokeWidth={1.8} />
                <p className="mt-6 text-xs font-semibold tracking-[0.22em] text-ink/60 uppercase">
                  Dónde estamos
                </p>
                <p className="mt-3 text-xl font-semibold text-ink">{dealer.street}</p>
                <p className="mt-1 text-ink/70">
                  {dealer.zip} {dealer.city} · {dealer.region}
                </p>
              </div>
              <ArrowUpRight className="size-5 shrink-0 text-ink/35 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-moss" />
            </a>
          </AnimatedContent>

          {perks.map((perk, i) => (
            <AnimatedContent
              key={perk.title}
              distance={70}
              duration={0.85}
              delay={0.24 + i * 0.12}
            >
              <article className="flex h-full items-start gap-5 rounded-3xl border border-white/70 bg-white/55 p-9 shadow-[0_12px_40px_-20px_rgba(5,5,5,0.35)] backdrop-blur-2xl transition-colors duration-500 hover:border-ink/25 hover:bg-white/75">
                <perk.icon className="mt-0.5 size-6 shrink-0 text-moss" strokeWidth={1.8} />
                <div>
                  <h3 className="text-xl text-ink">{perk.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70">{perk.body}</p>
                </div>
              </article>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  )
}
