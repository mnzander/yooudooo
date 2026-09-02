import { Phone } from 'lucide-react'
import AnimatedContent from '@/components/AnimatedContent'
import ScrollReveal from '@/components/ScrollReveal'
import SectionHeading from '@/components/SectionHeading'
import { dealer } from '@/data/models'

export default function About() {
  return (
    <section id="quienes-somos" className="relative mx-auto max-w-7xl px-6 py-28 sm:py-36">
      <SectionHeading index="01" label="Quiénes somos" title="Oyarzabal Automotive" tone="light" />

      <div className="mt-16 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch lg:gap-16">
        <div className="flex flex-col lg:justify-between">
          <ScrollReveal
            baseOpacity={0.08}
            baseRotation={2}
            blurStrength={5}
            containerClassName="!my-0"
            textClassName="!text-[clamp(1.6rem,2.6vw,2.15rem)] !font-black !leading-[1.15] !tracking-tight !normal-case font-display text-ink"
          >
            {'El único concesionario oficial de Yooudooo en Bizkaia'}
          </ScrollReveal>

          <AnimatedContent distance={60} duration={0.9} delay={0.1}>
            <p className="mt-10 max-w-lg text-[1.0625rem] leading-[1.75] text-ink/70 lg:mt-0 lg:text-lg">
              Hazte con un todoterreno que redefine la libertad de la mano de {dealer.company}, un
              equipo que acompaña al cliente antes, durante y después de la compra. Asesoramiento
              sin prisas, entrega con garantía oficial de {dealer.warrantyYears} años y un servicio
              postventa propio en {dealer.city}.
            </p>

            <a
              href={`tel:${dealer.phoneLink}`}
              className="mt-9 inline-flex min-h-11 items-center gap-2.5 rounded-full bg-ink px-6 text-sm font-bold tracking-wide text-lime uppercase transition-colors duration-300 hover:bg-moss hover:text-bone"
            >
              <Phone className="size-4" strokeWidth={2.4} />
              {dealer.phone}
            </a>
          </AnimatedContent>
        </div>

        <AnimatedContent distance={80} duration={1} scale={0.96} className="lg:h-full">
          <figure className="relative h-full min-h-[22rem] overflow-hidden rounded-3xl border border-bone-line">
            <img
              src="/media/modelos/y6-gasolina.jpg"
              alt="Yooudooo 6 en versión gasolina sobre terreno de arena"
              className="size-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 p-6 text-sm text-white/70">
              Yooudooo 6 · {dealer.street}, {dealer.city}
            </figcaption>
          </figure>
        </AnimatedContent>
      </div>
    </section>
  )
}
