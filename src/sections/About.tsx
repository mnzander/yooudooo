import { ShieldCheck, Wrench, MapPin } from 'lucide-react'
import AnimatedContent from '@/components/AnimatedContent'
import ScrollReveal from '@/components/ScrollReveal'
import CountUp from '@/components/CountUp'
import SectionHeading from '@/components/SectionHeading'
import { dealer } from '@/data/models'

const pillars = [
  {
    icon: ShieldCheck,
    title: 'Garantía oficial',
    body: `${dealer.warrantyYears} años de garantía oficial en cada vehículo entregado.`,
  },
  {
    icon: Wrench,
    title: 'Servicio postventa',
    body: 'Taller y recambios propios para mantener tu Yooudooo siempre listo.',
  },
  {
    icon: MapPin,
    title: 'Único en Bizkaia',
    body: `Punto oficial de la marca en ${dealer.city}, sin desplazamientos fuera del territorio.`,
  },
]

export default function About() {
  return (
    <section id="quienes-somos" className="relative mx-auto max-w-7xl px-6 py-28 sm:py-36">
      <SectionHeading index="01" label="Quiénes somos" title="Oyarzabal Automotive" />

      <div className="mt-16 grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <ScrollReveal
            baseOpacity={0.08}
            baseRotation={2}
            blurStrength={5}
            containerClassName="!my-0"
            textClassName="!text-[clamp(1.35rem,2.6vw,2rem)] !font-medium !leading-[1.35] font-sans text-white"
          >
            Somos el único concesionario oficial de Yooudooo en Bizkaia. Traemos a Bilbao un
            todoterreno que redefine la libertad: robusto, potente y preparado para cualquier
            terreno.
          </ScrollReveal>

          <AnimatedContent distance={60} duration={0.9} delay={0.1}>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-white/55">
              Detrás de Yooudooo 212 está Oyarzabal Automotive, un equipo que acompaña al cliente
              antes, durante y después de la compra: asesoramiento sin prisas, entrega con garantía
              oficial de {dealer.warrantyYears} años y un servicio postventa propio en{' '}
              {dealer.street}, {dealer.city}.
            </p>
          </AnimatedContent>

          <div className="mt-12 grid grid-cols-3 gap-6 border-t border-ink-line pt-10">
            {[
              { to: dealer.warrantyYears, suffix: '', label: 'Años de garantía' },
              { to: 1, suffix: '', label: 'Concesionario en Bizkaia' },
              { to: 217, suffix: ' CV', label: 'Potencia máxima' },
            ].map(stat => (
              <div key={stat.label}>
                <div className="text-accent-italic text-4xl text-lime sm:text-5xl">
                  <CountUp to={stat.to} duration={1.6} />
                  {stat.suffix}
                </div>
                <p className="mt-2 text-xs leading-snug tracking-wide text-white/45 uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <AnimatedContent distance={80} duration={1} scale={0.96}>
          <figure className="relative overflow-hidden rounded-3xl border border-ink-line">
            <img
              src="/media/concesionario.jpg"
              alt="Yooudooo 6 rotulado con la información de Yooudooo 212 Bizkaia"
              className="aspect-[4/3] w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 p-6 text-sm text-white/70">
              Yooudooo 6 · {dealer.street}, {dealer.city}
            </figcaption>
          </figure>
        </AnimatedContent>
      </div>

      <div className="mt-20 grid gap-4 sm:grid-cols-3">
        {pillars.map((pillar, i) => (
          <AnimatedContent key={pillar.title} distance={70} duration={0.8} delay={i * 0.12}>
            <article className="group h-full rounded-2xl border border-ink-line bg-ink-card/60 p-7 transition-colors duration-500 hover:border-lime/40">
              <pillar.icon
                className="size-6 text-lime transition-transform duration-500 group-hover:scale-110"
                strokeWidth={1.8}
              />
              <h3 className="mt-5 text-lg text-white">{pillar.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-white/50">{pillar.body}</p>
            </article>
          </AnimatedContent>
        ))}
      </div>
    </section>
  )
}
