import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import AnimatedContent from '@/components/AnimatedContent'
import BlurText from '@/components/BlurText'
import SpotlightCard from '@/components/SpotlightCard'
import SectionHeading from '@/components/SectionHeading'
import ModelModal from '@/components/ModelModal'
import { models, type CarModel } from '@/data/models'

export default function Products() {
  const [selected, setSelected] = useState<CarModel | null>(null)

  return (
    <section id="productos" className="relative mx-auto max-w-7xl px-6 py-28 sm:py-36">
      <SectionHeading index="02" label="Productos" title="Yooudooo 6" />

      <BlurText
        text="Tres versiones del mismo todoterreno: dos de gasolina y una diésel. Elige la que mejor encaje con tu día a día y consulta la ficha técnica completa."
        animateBy="words"
        direction="bottom"
        delay={35}
        className="mt-8 max-w-2xl text-base leading-relaxed text-white/55"
      />

      <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {models.map((model, i) => (
          <AnimatedContent key={model.id} distance={90} duration={0.9} delay={i * 0.14} scale={0.97}>
            <SpotlightCard
              className="group !h-full !border-ink-line !bg-ink-card/70 !p-0 transition-colors duration-500 hover:!border-lime/40"
              spotlightColor="rgba(185, 233, 1, 0.16)"
            >
              <button
                type="button"
                onClick={() => setSelected(model)}
                aria-label={`Ver especificaciones de ${model.name} ${model.trim} ${model.fuel}`}
                className="flex h-full w-full cursor-pointer flex-col text-left"
              >
                <div className="relative aspect-[16/11] overflow-hidden">
                  <img
                    className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    src={model.image}
                    alt={`Yooudooo 6 ${model.trim} ${model.fuel}`}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-card via-ink-card/20 to-transparent" />

                  <span
                    className={`absolute top-4 left-4 rounded-full border px-3 py-1 text-xs font-semibold tracking-[0.18em] uppercase backdrop-blur-sm ${
                      model.fuel === 'Diésel'
                        ? 'border-white/30 bg-ink/50 text-white'
                        : 'border-lime/50 bg-lime/15 text-lime'
                    }`}
                  >
                    {model.fuel}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-7">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-2xl text-white">{model.name}</h3>
                      <p className="mt-1 text-sm font-semibold tracking-[0.15em] text-lime uppercase">
                        {model.trim}
                      </p>
                    </div>
                    <ArrowUpRight className="size-5 shrink-0 text-white/30 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-lime" />
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-white/50">{model.tagline}</p>

                  <ul className="mt-6 space-y-2">
                    {model.highlights.map(item => (
                      <li key={item} className="flex items-center gap-2.5 text-sm text-white/65">
                        <span className="size-1 shrink-0 rounded-full bg-lime" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex items-end justify-between gap-4 border-t border-ink-line pt-6">
                    <div>
                      <p className="text-xs tracking-[0.15em] text-white/35 uppercase">
                        Potencia
                      </p>
                      <p className="text-accent-italic mt-1 text-3xl text-lime">
                        {model.power}
                        <span className="ml-1 text-base">CV</span>
                      </p>
                    </div>
                    {model.price ? (
                      <p className="text-right text-sm font-medium text-white/70">{model.price}</p>
                    ) : (
                      <p className="text-right text-sm text-white/40">Consultar precio</p>
                    )}
                  </div>

                  <span className="mt-6 block w-full rounded-full border border-white/15 py-3 text-center text-xs font-bold tracking-[0.15em] text-white uppercase transition-colors duration-300 group-hover:border-lime group-hover:bg-lime group-hover:text-ink">
                    Ver especificaciones
                  </span>
                </div>
              </button>
            </SpotlightCard>
          </AnimatedContent>
        ))}
      </div>

      <ModelModal model={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
