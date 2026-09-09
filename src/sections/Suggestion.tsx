import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import AnimatedContent from '@/components/AnimatedContent'
import SectionHeading from '@/components/SectionHeading'
import Y3MaxModal from '@/components/Y3MaxModal'
import { y3max } from '@/data/y3max'

export default function Suggestion() {
  const [open, setOpen] = useState(false)

  return (
    <section id="sugerencia" className="relative mx-auto max-w-7xl px-6 pb-28 sm:pb-36">
      <SectionHeading index="04" label="Sugerencia" title={y3max.name} tone="light" />

      <p className="mt-8 max-w-2xl text-base leading-relaxed text-ink/70">
        Si buscas algo más de diario y con etiqueta cero, también trabajamos este enchufable.
      </p>

      <AnimatedContent distance={70} duration={0.9}>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          className="group mt-12 block w-full overflow-hidden rounded-3xl border border-ink-line bg-ink-soft text-left transition-colors duration-500 hover:border-lime/40"
          style={{
            backgroundImage:
              'radial-gradient(ellipse 62% 48% at 50% 38%, #33372c 0%, #1b1d18 45%, transparent 72%)',
          }}
        >
          <div className="grid items-center gap-6 p-8 sm:p-10 lg:grid-cols-[1fr_1.1fr] lg:gap-10">
            <div>
              <span className="text-xs font-semibold tracking-[0.25em] text-lime uppercase">
                {y3max.kind}
              </span>
              <h3 className="mt-3 text-4xl text-white sm:text-5xl">{y3max.name}</h3>
              <p className="mt-5 max-w-md text-base leading-relaxed text-white/60">
                {y3max.tagline}
              </p>

              <span className="mt-8 inline-flex min-h-11 items-center gap-2.5 rounded-full bg-lime px-7 text-sm font-bold tracking-wide text-ink uppercase transition-colors duration-300 group-hover:bg-lime-bright">
                Ver información
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>

            <img
              src={y3max.image}
              alt={`${y3max.name}, híbrido enchufable, vista tres cuartos delantera`}
              className="w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              loading="lazy"
              decoding="async"
            />
          </div>
        </button>
      </AnimatedContent>

      <Y3MaxModal open={open} onClose={() => setOpen(false)} />
    </section>
  )
}
