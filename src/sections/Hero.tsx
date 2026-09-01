import { ArrowDown, MapPin } from 'lucide-react'
import ScrollExpand from '@/components/ScrollExpand'
import { dealer } from '@/data/models'

export default function Hero() {
  return (
    <section id="inicio" className="relative">
      <ScrollExpand
        useWindowScroll
        mediaType="video"
        src="/media/hero.mp4"
        startWidth={38}
        startHeight={64}
        startRadius={28}
        mediaZoom={1.45}
        scrollDistance={1.15}
        holdDistance={0.85}
        overlayScrim={0.6}
        title={
          <span className="flex flex-col items-center gap-[0.55em]">
            <span className="font-display text-[0.17em] leading-none font-semibold tracking-[0.4em] text-white/60 uppercase">
              {dealer.company}
            </span>
            <span className="font-display leading-[0.9] font-black tracking-[-0.04em] uppercase">
              Yooudooo <span className="text-lime">212</span>
            </span>
          </span>
        }
        scrollHint={
          <span className="inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase">
            <ArrowDown className="size-3.5 animate-bounce" />
            Desplázate
          </span>
        }
      >
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-7">
          <span className="rounded-full border border-lime/40 bg-lime/10 px-4 py-1.5 text-[0.7rem] font-semibold tracking-[0.25em] text-lime uppercase backdrop-blur-sm">
            Yooudooo 212 · {dealer.region}
          </span>

          <h1 className="font-display text-[clamp(1.75rem,4.1vw,3.5rem)] font-black text-balance text-white [text-shadow:0_4px_40px_rgba(0,0,0,0.6)]">
            El único concesionario oficial de Yooudooo en{' '}
            <span className="text-lime">Bizkaia</span>
          </h1>

          <p className="max-w-2xl text-sm leading-relaxed text-balance text-white/70 sm:text-base">
            Hazte con un todoterreno que redefine la libertad de la mano de {dealer.company}, un
            equipo que acompaña al cliente antes, durante y después de la compra. Asesoramiento sin
            prisas, entrega con garantía oficial de {dealer.warrantyYears} años y un servicio
            postventa propio en {dealer.city}.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="#productos"
              className="rounded-full bg-lime px-7 py-3.5 text-sm font-bold tracking-wide text-ink uppercase transition-all duration-300 hover:bg-lime-bright hover:shadow-[0_0_40px_-6px_var(--color-lime)]"
            >
              Ver modelos
            </a>
            <a
              href="#contacto"
              className="flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-sm font-bold tracking-wide text-white uppercase backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white/10"
            >
              <MapPin className="size-4" />
              Visítanos
            </a>
          </div>
        </div>
      </ScrollExpand>
    </section>
  )
}
