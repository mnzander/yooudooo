import { Phone } from 'lucide-react'
import AnimatedContent from '@/components/AnimatedContent'
import ScrollReveal from '@/components/ScrollReveal'
import SectionHeading from '@/components/SectionHeading'
import { dealer } from '@/data/models'

export default function About() {
  return (
    <section id="quienes-somos" className="relative mx-auto max-w-7xl px-6 py-28 sm:py-36">
      <SectionHeading index="01" label="Quiénes somos" title="Oyarzabal Automotive" />

      <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <ScrollReveal
            baseOpacity={0.08}
            baseRotation={2}
            blurStrength={5}
            containerClassName="!my-0"
            textClassName="!text-[clamp(1.3rem,2.4vw,1.9rem)] !font-medium !leading-[1.4] font-sans text-white"
          >
            {`Hazte con un todoterreno que redefine la libertad de la mano de ${dealer.company}, un equipo que acompaña al cliente antes, durante y después de la compra.`}
          </ScrollReveal>

          <AnimatedContent distance={60} duration={0.9} delay={0.1}>
            <p className="mt-8 text-base leading-relaxed text-white/55">
              Asesoramiento sin prisas, entrega con garantía oficial de {dealer.warrantyYears} años
              y un servicio postventa propio en {dealer.street}, {dealer.city}.
            </p>

            <a
              href={`tel:${dealer.phoneLink}`}
              className="mt-9 inline-flex items-center gap-2.5 rounded-full border border-lime/40 bg-lime/10 px-6 py-3 text-sm font-bold tracking-wide text-lime uppercase transition-all duration-300 hover:border-lime hover:bg-lime hover:text-ink"
            >
              <Phone className="size-4" strokeWidth={2.4} />
              {dealer.phone}
            </a>
          </AnimatedContent>
        </div>

        <AnimatedContent distance={80} duration={1} scale={0.96}>
          <figure className="relative overflow-hidden rounded-3xl border border-ink-line">
            <img
              src="/media/modelos/y6-gasolina.jpg"
              alt="Yooudooo 6 en versión gasolina sobre terreno de arena"
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
    </section>
  )
}
